---
layout: post
title: Show All Running Processes in Linux
date: 2013-01-13 00:01
published: true
comments: true
fullview: true
categories: [linux,process,list]
---

[Permalink](http://www.cyberciti.biz/faq/show-all-running-processes-in-linux/ "Permalink to Show All Running Processes in Linux")

How do I see all running process in Linux?  
  
You need to use the ps command. It provide information about the currently running processes, including their process identification numbers (PIDs). Both Linux and UNIX support ps command to display information about all running process. ps command gives a snapshot of the current processes. If you want a repetitive update of this status, use top command.

## ps command

Type the following **ps command** to display all running process:  
`# ps aux | less`  
Where,

*   -A: select all processes
*   a: select all processes on a terminal, including those of other users
*   x: select processes without controlling ttys

## Task: see every process on the system

`# ps -A# ps -e`

## Task: See every process except those running as root

`# ps -U root -u root -N`

## Task: See process run by user vivek

`# ps -u vivek`

## Task: top command

The top program provides a dynamic real-time view of a running system. Type the top at command prompt:  
`# top`  
Output:

![Fig.01: top command: Display Linux Tasks](/images/2013/01/13/linux-unix-top-command.png)  
Fig.01: top command: Display Linux Tasks

To quit press **q**, for help press **h**.

### Task: display a tree of processes

pstree shows running processes as a tree. The tree is rooted at either pid or init if pid is omitted. If a user name is specified, all process trees rooted at processes owned by that user are shown.  
`$ pstree`  
Sample outputs:

![Fig.02: pstree - Display a tree of processes](/images/2013/01/13/linux-unix-pstree-command.png)  
Fig.02: pstree - Display a tree of processes


### Task: Print a process tree using ps

`#  ps -ejH# ps axjf`

### Task: Get info about threads

Type the following command:  
`# ps -eLf# ps axms`

### Task: Get security info

Type the following command:  
`# ps -eo euser,ruser,suser,fuser,f,comm,label# ps axZ# ps -eM`

### Task: Save Process Snapshot to a file

Type the following command:  
`# top -b -n1 &gt; /tmp/process.log`  
Or you can email result to yourself:  
`# top -b -n1 | mail -s 'Process snapshot' you@example.com`

## Task: Lookup process

Use pgrep command. pgrep looks through the currently running processes and lists the process IDs which matches the selection criteria to screen. For example display firefox process id:  
`$ pgrep firefox`  
Sample outputs:

    3356

Following command will list the process called sshd which is owned by a user called root:  
`$ pgrep -u root sshd`

## Say hello to htop and atop

htop is interactive process viewer just like top, but allows to scroll the list vertically and horizontally to see all processes and their full command lines. Tasks related to processes (killing, renicing) can be done without entering their PIDs. To install htop type command:  
`# apt-get install htop`  
or  
`# yum install htop`  
Now type the htop command at the shell prompt:  
`# htop`  
Sample outputs:  
![Fig.03: htop - Interactive Linux / UNIX process viewer](/images/2013/01/13/linux-unix-htop-command.png)  
Fig.03: htop - Interactive Linux / UNIX process viewer

### atop program

The program atop is an interactive monitor to view the load on a Linux system. It shows the occupation of the most critical hardware resources (from a performance point of view) on system level, i.e. cpu, memory, disk and network. It also shows which processes are responsible for the indicated load with respect to cpu- and memory load on process level; disk- and network load is only shown per process if a kernel patch has been installed. Type the following command to start atop:  
`# atop`  
