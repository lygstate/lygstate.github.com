---
layout: post
title: "SFTP Access To Amazon EC2 Using FileZilla"
date: 2013-01-13 02:48
comments: true
categories: 
---

[Permalink](http://www.hermeswritings.com/index.php/2012/05/sftp-access-to-amazon-ec2-using-filezilla/ "Permalink to SFTP Access To Amazon EC2 Using FileZilla « Hermes Writings")

After You can setup EC2 Instance on AWS next step is to upload files onto the server.

I have setup Ubunto instance and using Filezilla to connect to it after installation LAMP.

*   Make sure port 22 is open in your instance’s Security Group in Amazon’s AWS site
*   Add .Pem Keys to FileZilla Click on `Edit >> setting >> SFTP >> Add Key File`
*   Locate your PEM file. At this point FileZilla will ask if you want to convert it to a format it can use. Say `Yes` and tell it where to put the new .PPK file.
*   Close the Settings window.
*   Enter Host: like: `ec2-107-22-137-202.compute-1.amazonaws.com` or the `IP address`, user: `ubuntu` and port: `22`. Then click on Quick connect; It will connect with the following hints:

![FileZilla Connection status](/images/2013/01/13/filezilla.jpg)

`User name` might vary depending on your instance, by default ububtu instance username is ubuntu

Depending on the original AMI the instance is based on, you may want to double check that the correct user name is being used to authenticate.

Amazon Linux: `ec2-user`  
RHEL: `root`  
Ubuntu: `ubuntu`  
