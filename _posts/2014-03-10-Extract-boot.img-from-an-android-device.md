---
layout: post
title:  "Extract boot.img from an android device, unpack/repack it, and write it back to the android device."
published: true
fullview: true
categories: []
---

I did this on my rooted, boot-unlocked Nexus 7 II running Android 4.4.2 under Windows.

[This tutorial](http://android-dls.com/wiki/index.php?title=HOWTO:_Unpack%2C_Edit%2C_and_Re-Pack_Boot_Images "HOWTO: Unpack, Edit, and Re-Pack Boot Images") pointed me in the right direction.

I did:

```
;use the following commands to found the boot partition,note:msm_sdcc.1 is different on different android device
adb shell
ls -l /dev/block/platform/
;now we know the device platform is msm_sdcc.1
ls -l /dev/block/platform/msm_sdcc.1/by-name
; now we know the boot partition is cat mmcblk0p14 by [boot -> /dev/block/mmcblk0p14]
;use the following command to retrieve the boot.img
su
cat /dev/block/mmcblk0p14 > /sdcard/boot-from-android-device.img
chmod 0666 /sdcard/boot-from-android-device.img
```

Then put it right back using:

```
adb reboot-bootloader
;[wait for bootloader to come up]
fastboot flash boot boot-from-android-device-repacked.img
fastboot reboot
```

I use 
I use [Android Image Kitchen](http://forum.xda-developers.com/showthread.php?t=2073775 "Android Image Kitchen -- Unpack/Repack Kernel+Recovery Images, and Edit the ramdisk.") to unpack the boot.img and repack it to boot-from-android-device-repacked.img.

###Repack Instructions

```
1) Unzip
2) Either use the command-line "unpackimg <image-filename.img>", or simply drag-and-drop the image. This will split the image and unpack the ramdisk to a subdirectory.
3) Alter the ramdisk as you like.
4) The repackimg batch script requires no input and simply recombines the previously split zImage with the newly packed modified ramdisk using all the original image information (which was also split and saved).
5) The cleanup batch script resets the folder to its initial state, removing the split_img+ramdisk directories and any new packed ramdisk or image files.
```
