---
layout: post
title: "Make your Raspberry Pi a seedbox, an IRC bouncer and ddns"
date: 2018-11-13 00:50:00
description: How to setup your Raspberry Pi as seedbox, IRC bouncer and ddns
tags:
- seedbox
- transmission
- ddns
- irc bouncer
- arch linux
- ARM
- raspberry pi
categories:
- Seedbox
- Raspberry Pi
- Transmission
twitter_text: 'How to setup your Raspberry Pi as seedbox, IRC bouncer and ddns'
---

# Raspberry Pi personal setup guide

I use Raspberry Pi B+ as IRC bouncer and seedbox-torrent server. I used Arch Linux because it provides me with the latest rolling versions of the software I need. This is a tutorial how to full set it up, mostly for me, just in case I want to make the same settings again.

This tutorial has the following sections:

- Create the SD card using Arch Linux
- Setup static ip
- Install some extra software
- Setup no-ip or inadyn client
- Install and setup ZNC (IRC Bouncer)
- Install Transmission (seedbox)

---

### 1. Create the SD card

Follow the [official tutorial] (http://archlinuxarm.org/platforms/armv6/raspberry-pi)

Replace sdX in the following instructions with the device name for the SD card as it appears on your computer.

You can find the dev name using the command:

{% highlight ruby %}
$ cat /proc/partitions
{% endhighlight %}

Unmount the SD card and start fdisk to partition the SD card:

{% highlight ruby %}
$ sudo fdisk /dev/sdX
{% endhighlight %}

At the fdisk prompt, delete old partitions and create a new one:

- Type `o`. This will clear out any partitions on the drive.
- Type `p` to list partitions. There should be no partitions left.
- Type `n`, then p for primary, `1` for the first partition on the drive, press `ENTER` to accept the default first sector, then type `+100M` for the last sector.
- Type `t`, then `c` to set the first partition to type W95 FAT32 (LBA).
- Type `n`, then `p` for primary, `2` for the second partition on the drive, and then press `ENTER` twice to accept the default first and last sector.
- Write the partition table and exit by typing `w`.

Create and mount the FAT filesystem:

{% highlight ruby %}
sudo mkfs.vfat /dev/sdX1
mkdir boot
sudo mount /dev/sdX1 boot{% endhighlight %}

Create and mount the ext4 filesystem:

{% highlight ruby %}
sudo mkfs.ext4 /dev/sdX2
mkdir root
sudo mount /dev/sdX2 root
{% endhighlight %}

Download and extract the root filesystem (as root, not via sudo):

* For Raspberry Pi 1

{% highlight ruby %}
wget http://archlinuxarm.org/os/ArchLinuxARM-rpi-latest.tar.gz
sudo bsdtar -xpf ArchLinuxARM-rpi-latest.tar.gz -C root
sudo sync
{% endhighlight %}

* For Raspberry Pi 2

{% highlight ruby %}
wget http://archlinuxarm.org/os/ArchLinuxARM-rpi-2-latest.tar.gz
sudo tar -xpf ArchLinuxARM-rpi-2-latest.tar.gz -C root
sudo sync
{% endhighlight %}

Move boot files to the first partition:

{% highlight ruby %}
sudo mv root/boot/* boot
{% endhighlight %}

Unmount the two partitions:

{% highlight ruby %}
sudo umount boot root
{% endhighlight %}

Insert the SD card into the Raspberry Pi, connect ethernet, and apply 5V power. Use the serial console or SSH to the IP address given to the board by your router.
Login as the default user `alarm` with the password `alarm`.
The default `root` password is `root`.

You can change the default passwrds using the command `passwd`.

---

### 2. Setup static ip

Edit the file eth0.network. Systemd-networkd uses *.network files.

{% highlight ruby %}
$ nano /etc/systemd/network/eth0.network
{% endhighlight %}

paste the following (for static IP `192.168.1.100`)

{% highlight ruby %}
[Match]
Name=eth0

[Network]
Address=192.168.1.100/24
Gateway=192.168.1.1
DNS=8.8.8.8
DNS=8.8.4.4
{% endhighlight %}

You will then need to disable netcl. To find out what is enabled that is netctl related, run this:

{% highlight ruby %}sudo systemctl list-unit-files{% endhighlight %}

Once you identify all netctl related stuff. Go through and disable all netctl related stuff. You may have more to disable than just the below:

{% highlight ruby %}sudo systemctl disable netctl@eth0.service{% endhighlight %}

You will then need systemd-networkd enabled:

{% highlight ruby %}sudo systemctl enable systemd-networkd{% endhighlight %}

Login with 

{% highlight ruby %}ssh alarm@192.168.1.100{% endhighlight %}

---

### 3. Install some extra software (AUR and more)

The system is fully usable but I prefer to add some extra programs-tools (some might be already installed)

{% highlight ruby %}
sudo pacman -S mc make wget fakeroot sudo packer htop ntfs-3g pkg-config
{% endhighlight %}

#### AUR

After some changes on pacman, there are some workarounds on how to install AUR.

Add users to a group with the gpasswd command as root:

{% highlight ruby %}sudo gpasswd -a alarm wheel{% endhighlight %}

Go to sudoers

{% highlight ruby %}sudo nano /etc/sudoers{% endhighlight %}

and change the wheel line

{% highlight ruby %}
## Uncomment to allow members of group wheel to execute any command
%wheel ALL=(ALL) ALL
{% endhighlight %}

Reboot the system and give the follwing commands as user

{% highlight ruby %}
wget https://aur.archlinux.org/cgit/aur.git/snapshot/package-query.tar.gz
tar -xvzf package-query.tar.gz
cd package-query
makepkg -si
{% endhighlight %}

You can do the same with yaourt

{% highlight ruby %}
wget https://aur.archlinux.org/cgit/aur.git/snapshot/yaourt.tar.gz
tar -xvzf yaourt.tar.gz
cd yaourt
makepkg -si
{% endhighlight %}

ALTERNATIVE yaourt installation:

Open the file

{% highlight ruby %}sudo nano /etc/pacman.conf{% endhighlight %}

And add

{% highlight ruby %}
[archlinuxfr]
SigLevel = Optional TrustAll
Server = http://repo.archlinux.fr/arm/
{% endhighlight %}

Then install yaourt (as root):

{% highlight ruby %}sudo pacman -Sy yaourt{% endhighlight %}

Then delete the archlinuxfr repo.

To delete the user from wheel group, first execute the command as root:

{% highlight ruby %}sudo gpasswd -d alarm wheel{% endhighlight %}

and then go to sudoers

{% highlight ruby %}sudo nano /etc/sudoers{% endhighlight %}

and change the wheel line (add #)

{% highlight ruby %}
## Uncomment to allow members of group wheel to execute any command
# %wheel ALL=(ALL) ALL
{% endhighlight %}

---

### 4. Setup no-ip or inadyn client

no-ip is the service I use for DDNS. It can be installed from AUR (`yaourt -S noip`). 
There were some changes on how to install AUR and that's why I did it manually.

Most of the routers support it no-ip. You can use your router's service. But what if you want 2 different host names on the same IP? Let's say you have different ARM boards on the same router or you have a server etc.

First of all, install the needed programs to build the service (same as I did with ZNC)

{% highlight ruby %}
sudo pacman -S gcc git make
{% endhighlight %}

Then

{% highlight ruby %}
$ mkdir noip
$ cd noip
{% endhighlight %}

Download the program

{% highlight ruby %}
wget http://www.no-ip.com/client/linux/noip-duc-linux.tar.gz
{% endhighlight %}

and decompress it

{% highlight ruby %}
tar vzxf noip-duc-linux.tar.gz
{% endhighlight %}

Go to the directory

{% highlight ruby %}
cd noip-2.1.9-1
{% endhighlight %}

Compile and install

{% highlight ruby %}
make
make install
{% endhighlight %}

While it installs the software you will prompted to enter the username & password. Once that is done it will ask you teh refresh interval … leave it.. to have the default value. You are required to answer some more questions … just answer NO and you should be good to go.

Start the client

{% highlight ruby %}
/usr/local/bin/noip2
{% endhighlight %}

To check if the service is running, use the command:

{% highlight ruby %}
/usr/local/bin/noip2 -S
{% endhighlight %}

and the results should be like

{% highlight ruby %}
1 noip2 process active.

Process 1516, started as noip2, (version 2.1.9)
Using configuration from /usr/local/etc/no-ip2.conf
Last IP Address set EXTERNAL IP
Account USERNAME
configured for:
host HOSTNAME
Updating every 30 minutes via /dev/eth0 with NAT enabled.
{% endhighlight %}

**Auto start the client on reboot**

But what if you reboot? You want to start the client everytime you reboot. This can be done with systemd.

Create the service file. 

{% highlight ruby %}
sudo nano /usr/lib/systemd/system/noip.service
{% endhighlight %}

Add the following content.

{% highlight ruby %}
[Unit]
Description=No-IP Dynamic DNS Update Client
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/bin/noip2

[Install]
WantedBy=multi-user.target
{% endhighlight %}

Start the service

{% highlight ruby %}
sudo systemctl start noip.service
{% endhighlight %}

and enable the service

{% highlight ruby %}
sudo systemctl enable noip.service
{% endhighlight %}

**ALTERNATIVE**

If you installed AUR, here is how you can setup no-ip service.

Install No-IP Client with yaourt.

{% highlight ruby %}
yaourt -S noip
{% endhighlight %}

*Configure No-IP Back-end*

Create the configuration file.

{% highlight ruby %}
noip2 -C
{% endhighlight %}

Enter the relevant details when prompted. All settings can be modified individually later.
 
Modify the update interval.

{% highlight ruby %}
noip2 -U 30
{% endhighlight %}

Interval that the IP will be updated is set with -U option in minutes. Default is 30 minutes.
 
Modify No-IP username.

{% highlight ruby %}
noip2 -u username
{% endhighlight %}

Modify No-IP password.

{% highlight ruby %}
noip2 -p password
{% endhighlight %}

Start noip service.

{% highlight ruby %}
sudo systemctl start noip2
{% endhighlight %}

Enable noip serive.

{% highlight ruby %}
sudo systemctl enable noip2
{% endhighlight %}

---
### 5. Install and setup ZNC (IRC Bouncer)

ZNC is the software I use as IRC bouncer. I'm 24/7 online, keep logs of the channels I'm in. Raspberry Pi is the perfect solution for that since I don't need CPU or GUI. Arch has the latest version that supports more than one server for a single user. Here is how to install-setup.

Install with the command:

{% highlight ruby %}
sudo pacman -S znc
{% endhighlight %}

As user (alarm), run the command

{% highlight ruby %}
znc --makeconf
{% endhighlight %}

and follow step by step the qustions to setup username-pass, port, channels, servers etc.

ZNC will run. If you want to start automatic, you have to add it as systemd service. I prefer to run it manually (`znc`) everytime I boot my Raspberry Pi. It's easier to understand if the system was down or not.

When you run the IRC program, you have to add the username and server. The password shoud be like

{% highlight ruby %}
username/freenode:password
{% endhighlight %}

You can also open your browser and go to `http://IPSERVER:PORT` to edit your settings.

---

### 6. Install Transmission (seedbox)

My SD card is 16GB. The total space to download files is about 14GB. It's enough for everyday use.

I choose Transmission for this, because it is simple, fast and stable. Transmission has a good webinterface, plus it allows access from remote clients with the transmission-remote gui packages.

First install it with pacman:

{% highlight ruby %}
sudo pacman -Syu transmission-cli
{% endhighlight %}

Enable the service at startup:

{% highlight ruby %}
sudo systemctl enable transmission
{% endhighlight %}

Start the service:

{% highlight ruby %}
sudo systemctl start transmission
{% endhighlight %}

Now create a folder where your user and the transmission group (where the transmission user belongs to) can read and write:

{% highlight ruby %}
mkdir -p /mnt/torrents/{incomplete,complete,torrentfiles}
sudo chown -R alarm:transmission /mnt/torrents
sudo chmod -R 775 /mnt/torrents
{% endhighlight %}

In my example the folder /mnt/torrents is a folder. You can mount an external USB harddrive which can be mounted via /etc/fstab at boot. Remember to change alarm to your Pi username (if it's different).

Stop the daemon to make sure the config file edits stick:

{% highlight ruby %}
sudo systemctl stop transmission
{% endhighlight %}

Edit the default config file to allow remote access to the daemon (or do not do that and use an ssh tunnel every time) and update the downloads path:

{% highlight ruby %}
sudo nano /var/lib/transmission/.config/transmission-daemon/settings.json
{% endhighlight %}

Change the following parameters:

{% highlight ruby %}
    # From
    "download-dir": "/var/lib/transmission/Downloads",
    # To
    "download-dir": "/mnt/torrents/complete",

    # From:
    "incomplete-dir": "/var/lib/transmission/Downloads",
    # To
    "incomplete-dir": "/mnt/torrents/incomplete",

    # From
    "incomplete-dir-enabled": false,
    # To
    "incomplete-dir-enabled": true,

    # From
    "rpc-whitelist": "127.0.0.1",
    # To
    "rpc-whitelist": "*.*.*.*",
{% endhighlight %}

This sets the correct download folders and allows access from everywhere to the transmission webinterface. You can also list a range there (192.168.1.0/24) or just one IP address.

If you do not udate the ACL you get a nice error message when connecting:

```
403: Forbidden

Unauthorized IP Address.

Either disable the IP address whitelist or add your address to it.

If you're editing settings.json, see the 'rpc-whitelist' and 'rpc-whitelist-enabled' entries.

If you're still using ACLs, use a whitelist instead. See the transmission-daemon manpage for details.
```

If all went well you should be able to connect to `http://YOUR-PI-IP:9091` and see the nice transmission webinterface.

If you want more info on Transmission on Arch Linux, read up on the [arch wiki](https://wiki.archlinux.org/index.php/Transmission).

* Android: Download [Transdrone](https://play.google.com/store/apps/details?id=org.transdroid.lite) to add new torrents to your server.
* Filezilla: To get the downloaded files, use SFTP.

---

External links:
* [Arch Wiki](https://wiki.archlinux.org/index.php/Raspberry_Pi)
