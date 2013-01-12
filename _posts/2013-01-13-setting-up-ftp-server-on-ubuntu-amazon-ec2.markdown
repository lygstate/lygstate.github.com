---
layout: post
title: "Setting up FTP Server on Ubuntu - Amazon EC2"
date: 2013-01-13 02:16
comments: true
categories: 
---

[Permalink](http://curiousdeveloper.blogspot.com/2008/07/setting-up-ftp-server-on-ubuntu-amazon.html "Permalink to Setting up FTP Server on Ubuntu - Amazon EC2")

File Transfer Protocol (FTP) is a TCP protocol for uploading and downloading files between computers. FTP works on a client/server model. The server component is called an *FTP daemon*. It continuously listens for FTP requests from remote clients. When a request is received, it manages the the login and sets up the connection. For the duration of the session it executes any of commands sent by the FTP client.  


Access to an FTP server can be managed in two ways:  


In the Anonymous mode, remote clients can access the FTP server by using the default user account called 'anonymous" or "ftp" and sending an email address as the password. In the Authenticated mode a user must have an account and a password. User access to the FTP server directories and files is dependent on the permissions defined for the account used at login. As a general rule, the FTP daemon will hide the root directory of the FTP server and change it to the FTP Home directory. This hides the rest of the file system from remote sessions.  


## Amazon EC2: Unblock FTP port  


FTP works on port 21 by default. This port is blocked by the AWS firewall. You must unblock this port (21) by changing the instance permissions prior to setting up FTP so that you can access FTP remotely. This can be done using the AWS EC2 Elastic Fox client. Please refer to my other post about Unblocking ports on the Amazon EC2 for more details.  


## vsftpd - FTP Server Installation  


vsftpd is an FTP daemon available in Ubuntu. It is easy to install, set up, and maintain. To install **vsftpd** you can run the following command:  
`sudo apt-get install vsftpd`

## vsftpd - FTP Server Configuration  


You can edit the vsftpd configuration file, `sudo vi /etc/vsftpd.conf`, to change the default settings. By default only anonymous FTP is allowed. If you wish to disable this option, you should change the following line:  
`anonymous_enable=YES`  
to  
`anonymous_enable=NO`

By default, local system users are not allowed to login to FTP server. To change this setting, you should uncomment the following line:  
`#local_enable=YES`

By default, users are allowed to download files from FTP server. They are not allowed to upload files to FTP server. To change this setting, you should uncomment the following line:  
`#write_enable=YES`

Similarly, by default, the anonymous users are not allowed to upload files to FTP server. To change this setting, you should uncomment the following line:  
`#anon\_upload\_enable=YES`

The configuration file consists of many configuration parameters. The information about each parameter is available in the configuration file. Alternatively, you can refer to the man page, **man 5 vsftpd.conf** for details of each parameter.

Once you configure **vsftpd** you can start the daemon. You can run following command to run the **vsftpd** daemon:  

`sudo /etc/init.d/vsftpd start`  

Please note that the defaults in the configuration file are set as they are for security reasons. Each of the above changes makes the system a little less secure, so make them only if you need them.  