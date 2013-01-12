---
layout: post
title: "Building a SOCKS proxy on EC2"
date: 2013-01-12 21:15
comments: true
categories: [socks, ec2, proxy]
---

[Permalink](http://eric.gerlach.ca/blog/2012/6/19/building-a-socks-proxy-on-ec2-to-get-around-wifi-port-blocki.html)

At the NXNE Mobile Hackathon, we ran into a small problem. The wifi set up in the room would only allow connections over HTTP and HTTPS, which made it impossible to do many things you might want to do at a hackathon, like:

1.  Push to GitHub over SSH
2.  Connect to MongoDB instances
3.  Connect to... anything... that isn't on ports 80 or 443... so a lot.

If you can configure your tools correctly, the easiest way to get around this kind of problem is via a SOCKS proxy. Normally, I'd set up an SSH tunnel and run the SOCKS proxy over that... but no SSH. So the next best thing is to get a SOCKS server running on EC2. Let's go through the steps required to set this up so that if you end up in the same situation, you can help those around you.

Doing this assumes that you temporarily have an internet connection that is unrestricted, like a tethered smartphone or a wired connection. I'm also assuming that you know your way around EC2 a bit.

1. Connect to your unrestricted internet connection
2. Login to EC2
3. Ensure that you have a keypair setup
4. Create an EC2 Security Group that opens ports 22 and 443 to the world
5. Fire up an Ubuntu 12.04 LTS instance (micro will usually do) with your keypair and Security Group
6. SSH into the new machine with the SSH key (default username: ubuntu)
7. Run the following commands at the prompt or in a shell script:

		sudo apt-get install build-essential
		wget http://www.inet.no/dante/files/dante-1.3.2.tar.gz # or another version
		tar -zxvf dante-1.3.2.tar.gz
		cd dante-1.3.2
		./configure
		make
		sudo make install
		$ sudo make me a sandwich
			
8. Put the following config in /etc/sock.conf

		## general configuration (taken from FAQ)
		
		internal: eth0 port = 443
		external: eth0
		method: username none
		user.privileged: root
		user.unprivileged: nobody
		logoutput: stderr
		
		## client access rules
		
		client pass { from: 0.0.0.0/0 to: 0.0.0.0/0 } # address-range on internal nic.
		
		
		## server operation access rules
		
		# block connections to localhost, or they will appear to come from the proxy.
		block { from: 0.0.0.0/0 to: lo log: connect }
		
		# allow the rest
		pass { from: 0.0.0.0/0 to: 0.0.0.0/0 }
	
9.  Run `sudo sockd -D`

Now that we've got the server running, we have to configure our clients to connect to it. Fortunately, this is relatively easy. If you're on linux, run your programs with tsocks. On Windows or Mac, you can try Proxifier (never tried it myself). Remember that the proxy is on port 443.

If you're using PuTTY, you can set your proxy under Connection &gt; Proxy.

This set of steps creates an open proxy that anyone can use to proxy to anywhere. Don't leave it running unless you want really big EC2 bills.

In doing this, I realized that it would be even better to be able to do this via a VPN instead of a SOCKS proxy in order to get better Windows and Mac full capture support. I'm going to play with this idea and post again when I've got something.

