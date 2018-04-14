---
layout: post
title:  "Fix the very old msys or cygwin under win10."
published: true
fullview: true
categories: [tornado,gcc,msys,cygwin]
---

## Introduction
For some very old cygwin/msys toolchain, such as Tornado 2.2 （GCC) or Msys 1.0.11(1000.11.0.0)
They may not works properly under Win10.
Reporting error such as
For msys
```
      0 [main] us 0 init_cheap: VirtualAlloc pointer is null, Win32 error 487
AllocationBase 0x0, BaseAddress 0x71110000, RegionSize 0x4E0000, State 0x10000
~\msys\bin\make.exe: *** Couldn't reserve space for cygwin's heap, Win32 error 0
```
or GCC directly failed.


Refering to http://stackoverflow.com/questions/14840572/win32-error-8-during-ccppc-compile-on-windows-7-x86
Opening Visual Studio Command Tools Command Prompt

We can fixes Tornado 2.2(GCC by following command):

```
cd /d C:\Tornado2.2\host\x86-win32\lib\gcc-lib\i586-wrs-vxworks\2.9-PentiumIII-010221


dumpbin /HEADERS cc1.exe
        17D78400H size of stack reserve
        400 000 000(10进制) size of stack reserve

editbin /STACK:67108864 cc1.exe
changed to be
        400 0000H size of stack reserve (64MB)
        67108864(10进制) size of stack reserve

dumpbin /HEADERS cc1plus.exe
        17D78400H size of stack reserve
        400 000 000(10进制) size of stack reserve

editbin /STACK:67108864 cc1plus.exe
changed to be
        400 0000H size of stack reserve (64MB)
        67108864(10进制) size of stack reserve
```

And for Msys 1.0.11

We can using following command to fixies issues:
Before you rebase dlls, you should make sure it is not in use:
```
tasklist /m msys-1.0.dll
```
And *make a backup*:
```
copy msys-1.0.dll msys-1.0.dll.bak
```

With later Visual Studio (VS2015) you can do it this way (don’t seem to have rebase.exe around)
Opening Visual Studio Command Tools Command Prompt

```
editbin /rebase:base=0x50000000 msys-1.0.dll
```

For earlier version of Visual Studio:

```
rebase.exe -b 0x50000000 msys-1.0.dll
```

For showing the modification result:
```
dumpbin /headers msys-1.0.dll
```