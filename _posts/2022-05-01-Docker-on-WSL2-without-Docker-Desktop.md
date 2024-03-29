---
layout: post
title:  "Docker on WSL2 without Docker Desktop"
published: true
fullview: true
categories: [docker,wsl2,without,desktop]
---

## So, how to run Docker on WSL2 under Windows without Docker Desktop (Debian / Ubuntu)?

  Note, a revise of [Teppo Ruokosalmi]<https://dev.solita.fi/2021/12/21/docker-on-wsl2-without-docker-desktop.html>

* Start by removing any old Docker related installations
  1. On Windows: uninstall Docker Desktop
  2. On WSL2: sudo apt remove docker docker-engine docker.io containerd runc

* Continue on WSL2 with the following
  1. Install pre-required packages

      ```bash
      sudo apt update
      sudo apt install --no-install-recommends apt-transport-https ca-certificates curl gnupg2
      ```

  2. Configure package repository

      ```bash
      source /etc/os-release
      curl -fsSL https://download.docker.com/linux/${ID}/gpg | sudo apt-key add -
      echo "deb [arch=amd64] https://download.docker.com/linux/${ID} ${VERSION_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/docker.list
      sudo apt update
      ```

  3. Install Docker

      ```bash
      sudo apt install docker-ce docker-ce-cli containerd.io
      ```

  4. Add user to group

      ```bash
      sudo usermod -aG docker $USER
      ```

  5. Configure dockerd

      ```bash
      DOCKER_DIR=/var/wsl/shared-docker
      mkdir -pm o=,ug=rwx "$DOCKER_DIR"
      sudo chgrp docker "$DOCKER_DIR"
      sudo mkdir /etc/docker
      sudo <your_text_editor> /etc/docker/daemon.json

      {
        "hosts": ["unix:///var/wsl/shared-docker/docker.sock"]
      }
      ```

    Note! Debian will also need the additional configuration to the same file
      "iptables": false
  6. iptables fixes on ubuntu
    Refer to [WSL fixes for native docker]<https://patrickwu.space/2021/03/09/wsl-solution-to-native-docker-daemon-not-starting/>
    The WSL issue is at [6044]<https://github.com/microsoft/WSL/issues/6044>

* Now you’re ready to launch dockerd and see if it works

  1. Run command `sudo dockerd` - if the command ends with `API listen on /var/wsl/shared-docker/docker.sock`, things are working
  2. You can perform an additional test by opening a new terminal and running

      ```bash
      docker -H unix:///var/wsl/shared-docker/docker.sock run --rm hello-world
      ```

* Ok, things are working? Great!

Then it’s time to create a launch script for dockerd. There are two options, manual & automatic

  1. To always run dockerd automatically
    Add the following to .bashrc or .profile (make sure “DOCKER_DISTRO” matches your distro, you can check it by running “wsl -l -q” in Powershell)

      ```bash
      DOCKER_DISTRO="Ubuntu-22.04"
      DOCKER_DIR=/var/wsl/shared-docker
      DOCKER_SOCK="$DOCKER_DIR/docker.sock"
      export DOCKER_HOST="unix://$DOCKER_SOCK"
      if [ "$( pidof dockerd )" = "" ]; then
        /mnt/c/Windows/System32/wsl.exe -d $DOCKER_DISTRO sh -c "nohup sudo -b dockerd < /dev/null > $DOCKER_DIR/dockerd.log 2>&1"
      fi
      ```

  2. To manually run dockerd
    Add the following to your .bashrc or .profile

      ```bash
      DOCKER_SOCK="/var/wsl/shared-docker/docker.sock"
      test -S "$DOCKER_SOCK" && export DOCKER_HOST="unix://$DOCKER_SOCK"
      ```

* Want to go passwordless with the launching of dockerd?

All you need to do is

  ```bash
  sudo visudo
  %docker ALL=(ALL) NOPASSWD: /usr/bin/dockerd
  ```

* Enable / disable BuildKit (optional)

You may end up wanting to enable/disable [BuildKit]<https://docs.docker.com/develop/develop-images/build_enhancements/>  depending on your use cases (basically to end up with the classic output with Docker), and the easiest way for this is to just add the following to your .bashrc or .profile

  ```bash
  export DOCKER_BUILDKIT=0
  export BUILDKIT_PROGRESS=plain
  ```

* Adding some finishing touches
To wrap things up, you most likely will want to install docker-compose. You can start by checking up the number of the latest stable version from the Docker Compose documentation and doing the following (we’ll be using version 1.29.2 in this example)

  ```bash
  COMPOSE_VERSION=1.29.2
  sudo curl -L "https://github.com/docker/compose/releases/download/$COMPOSE_VERSION/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  ```
