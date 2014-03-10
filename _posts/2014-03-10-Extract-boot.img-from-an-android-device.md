---
layout: post
title:  "Extract boot.img from an android device, unpack/repack it, and write it back to the android device."
published: true
---

## Extract boot.img from an android device, unpack/repack it, and write it back to the android device.
I did this on my rooted, boot-unlocked Nexus 7 II running Android 4.4.2 under Windows.

[This tutorial](http://android-dls.com/wiki/index.php?title=HOWTO:_Unpack%2C_Edit%2C_and_Re-Pack_Boot_Images "HOWTO: Unpack, Edit, and Re-Pack Boot Images") pointed me in the right direction.

I did:

```
$ adb pull /dev/mtd/mtd2 boot-from-android-device.img
```

Then put it right back using:

```
$ adb reboot bootloader
[wait for bootloader to come up]
$ sudo ./fastboot flash boot boot-from-android-device.img
$ sudo ./fastboot reboot
```
I use [Boot\Recovery RePacker ](http://boot-repacker.blogspot.sg/p/blog-page.html "Boot\Recovery RePacker ") to unpack the boot.img and repack it.