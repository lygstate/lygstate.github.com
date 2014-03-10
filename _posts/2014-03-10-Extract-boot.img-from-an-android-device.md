---
layout: post
title:  "Extract boot.img from an android device, unpack/repack it, and write it back to the android device."
published: true
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
I use [Boot\Recovery RePacker ](http://boot-repacker.blogspot.sg/p/blog-page.html "Boot\Recovery RePacker ") to unpack the boot.img and repack it to boot-from-android-device-repacked.img.