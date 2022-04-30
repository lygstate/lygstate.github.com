---
layout: post
title:  "How to properly installing Microsoft Visual Studio 2010 and patches under Windows XP properly"
published: true
fullview: true
categories: [tornado,gcc,msys,cygwin]
---

## Instruction

An update to the Windows SDK for Windows 7 and .NET Framework 4 (Windows SDK 7.1) is now available. This update addresses the issue where Visual C++ Compilers and libraries that are installed with the Windows SDK are removed when Visual Studio 2010 Service Pack 1 is installed.

Our recommended install order is:

1. Visual Studio 2010
  en_visual_studio_2010_ultimate_x86_dvd_509116.iso

2. Uinstall
  Microsoft Visual C++ 2010 x86 Redistributable
  Microsoft Visual C++ 2010 x64 Redistributable
  Why:
  <https://stackoverflow.com/questions/19366006/error-when-installing-windows-sdk-7-1>
  This issue occurs when you install the Windows 7 SDK on a computer that has a newer version of the Visual C++ 2010 Redistributable installed.

3. Windows SDK 7.1
  2010-05-19 <https://www.microsoft.com/en-us/download/details.aspx?id=8442>
  Folder: IDE/Microsoft SDKs/Windows SDK 7.1/
  x86 ISO File Name: GRMSDK_EN_DVD.iso
  CRC#: 0xBD8F1237
  SHA1: 0xCDE254E83677C34C8FD509D6B733C32002FE3572
  ================================================
  x64 ISO File Name: GRMSDKX_EN_DVD.iso
  CRC#: 0x04F59E55
  SHA1: 0x9203529F5F70D556A60C37F118A95214E6D10B5A
  ================================================
  Itanium ISO File Name: GRMSDKIAI_EN_DVD.iso
  CRC#: 0x50EFE61D
  SHA1: 0x2093EE439193EF79A1629FD9A826CE8D4DE9A93D

4. Visual Studio 2010 SP1
  mu_visual_studio_2010_sp1_x86_dvd_651704.iso

5. Microsoft Visual C++ 2010 Service Pack 1 Compiler Update for the Windows SDK 7.1
  2011-03-20 <https://www.microsoft.com/en-us/download/details.aspx?id=4422>
  IDE/Microsoft SDKs/Windows SDK 7.1/VC-Compiler-KB2519277.exe

6. Microsoft Visual Studio 2010 Service Pack 1 MFC Security Update
  2011-08-09 <https://www.microsoft.com/en-us/download/details.aspx?id=27049>
  VS10SP1-KB2565057-x86

Visual C++ 2010 SP1 Compiler Update for the Windows SDK 7.1
You must have installed Windows SDK 7.1 in order to install the update.  However, you do NOT have to have installed VS 2010 + SP1 – this update is also applicable to the standalone SDK.

## Failure recovery

  If installing failed, you may uninstall Visual Studio 2010 first.
  <https://blogs.msdn.microsoft.com/heaths/2010/08/23/visual-studio-2010-uninstall-utility/>
