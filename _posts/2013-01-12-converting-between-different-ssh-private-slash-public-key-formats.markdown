---
layout: post
title: "Converting between different SSH private/public key formats."
date: 2013-01-12 16:00
comments: true
categories: [ssh, putty]
---

## PuTTY --> SSH

* PuTTY private key to SSH public key and private key.  
`puttygen` supports exporting to an OpenSSH compatible format.
	1. Open PuttyGen
	1. Click Load
	1. Load your private key
	1. Go to `Conversions->Export OpenSSH` and export your private key
	1. Copy your private key to `~/.ssh/id_dsa` (or `id_rsa`).
	1. Create the RFC 4716 version of the public key using `ssh-keygen`:<br />
`ssh-keygen -e -f ~/.ssh/id_dsa > ~/.ssh/id_dsa_com.pub`
	1. Convert the RFC 4716 version of the public key to the OpenSSH format:<br />
`ssh-keygen -i -f ~/.ssh/id_dsa_com.pub > ~/.ssh/id_dsa.pub`
* PuTTY public key to SSH public key  
If all you have is a public key from a user in PuTTY-style format, you can convert it to standard openssh format like so:  
`ssh-keygen -i -f keyfile.pub > newkeyfile.pub`

See [this][1] and [this][2] for more information.


  [1]: http://linux-sxs.org/networking/openssh.putty.html
  [2]: http://www.wellsi.com/sme/ssh/ssh.html
