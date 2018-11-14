---
layout: post
title: "Transmission (seedbox) over VPN using OpenVPN"
date: 2018-11-14 00:50:00
description: Use VPN (OpenVPN) on Transmission (seedbox)
tags:
- transmission
- seedbox
- vpn
- OpenVPN
categories:
- Seedbox
- Transmission
- Raspberry Pi
twitter_text: 'Transmission (seedbox) over VPN using OpenVPN'
---

![OpenVPN](/post_images/openvpn/openvpn.jpg)

We have seen how to make Raspberry Pi a seedbox using Transmission using [debian based](https://eiosifidis.blogspot.com/2013/03/use-raspberry-pi-as-torrent-download.html) distro, [openSUSE](https://eiosifidis.blogspot.com/2015/05/make-your-opensuse-raspberry-pi-seedbox.html) and [arch linux](https://iosifidis.github.io/raspberry-pi-seedbox-ircbouncer/). Of course there are alternatives such as [Deluge](https://eiosifidis.blogspot.com/2017/01/banana-pi-m3-installation.html) or [rTorrent](https://eiosifidis.blogspot.com/2014/02/seedbox-raspberry-pi-lighttpd-rtorrent-rutorrent.html). All of your network traffic should use your VPN connection, if it is active, so by default Transmission should tunnel all of your torrent traffic over the VPN. That's fine until your VPN connection drops and all of your torrent traffic starts using your regular internet connection, which is kind of what we were trying to avoid with the VPN in the first place. In this tutorial we'll setup Transmission to only route our torrent traffic through the VPN, and if the VPN is not connected Transmission will just stop torrenting until the VPN is reconnected.


## OpenVPN installation


First of all, let's install OpenVPN.

{% highlight ruby %}
sudo apt-get update && sudo apt-get install openvpn{% endhighlight %}

Create a directory in your home directory and download the OpenVPN files from your provider.

{% highlight ruby %}
cd ~/ mkdir vpn cd vpn{% endhighlight %}

We will test with [VPNbook](https://www.vpnbook.com/). But there are plenty of great providers you can choose. 

_FOR VPNBOOK_ 
Download the files that doesn't say **web surfing only; no p2p** (for us it's [PL226 Server OpenVPN Certificate Bundle](https://www.vpnbook.com/free-openvpn-account/VPNBook.com-OpenVPN-PL226.zip) and [DE4 Server OpenVPN Certificate Bundle](https://www.vpnbook.com/free-openvpn-account/VPNBook.com-OpenVPN-DE4.zip). But you better check often for changes). Decompress the zip files and you'll have files such as

{% highlight ruby %}
vpnbook-de4-tcp80.ovpn 
vpnbook-de4-tcp443.ovpn 
vpnbook-de4-udp53.ovpn 
vpnbook-de4-udp25000.ovpn 
vpnbook-pl226-tcp80.ovpn 
vpnbook-pl226-tcp443.ovpn 
vpnbook-pl226-udp53.ovpn 
vpnbook-pl226-udp25000.ovpn{% endhighlight %}

Make sure that those files are in the directory **vpn** in your home directory. Create a file named password.txt in the same directory.

{% highlight ruby %}
nano password.txt{% endhighlight %}

And add the credentials you'll find at vpnbook page.

{% highlight ruby %}
vpnbook 
5bheau6u (that might change){% endhighlight %}

Now open one file

{% highlight ruby %}
nano vpnbook-pl226-udp25000.ovpn{% endhighlight %}

and find the **auth-user-pass** and point it to the txt file

{% highlight ruby %}
auth-user-pass /home/USER/vpn/password.txt{% endhighlight %}

That way you don't need to type the username and password every time you run the command. Then, create a script to start your vpn connection and make it executable:

{% highlight ruby %}touch vpn.sh chmod +x vpn.sh{% endhighlight %}

Now edit your vpn.sh script to look like this:

{% highlight ruby %}
#!/bin/sh 

sudo openvpn --config /home/USER/vpn/vpnbook-pl226-udp25000.ovpn --script-security 2{% endhighlight %}

The name of the ovpn file might be different for you. Now you should be able to execute this script to connect to your vpn:

{% highlight ruby %}./vpn.sh{% endhighlight %}

Now you are connected to the VPN and all of your traffic should tunnel through there. You can check your ip.

{% highlight ruby %}curl ipinfo.io/ip{% endhighlight %}

Sources 
* [Naspberry pi OpenVPN](http://www.naspberrypi.com/openvpn.html) 
* [OpenVPN forums (Password.txt file)](https://forums.openvpn.net/viewtopic.php?p=35777&sid=b4aa2103069af62321bf56e3507eadf6#p35777) 
* [OpenVPN on strech](https://www.raspberrypi.org/forums/viewtopic.php?f=36&t=201688)


* * *


## Transmission Over OpenVPN


We need to create a template of our transmission-daemon setting.json file so that we can update the ip address that we download torrents through every time the VPN connects:

{% highlight ruby %}sudo cp /etc/transmission-daemon/settings.json /etc/transmission-daemon/settings_template.json{% endhighlight %}

Open **/etc/transmission-daemon/settings_template.json**:

{% highlight ruby %}nano /etc/transmission-daemon/settings_template.json{% endhighlight %}

And change the following value:

{% highlight ruby %}
{ ... 

"bind-address-ipv4": "IP_ADDRESS", 

... }{% endhighlight %}

Now setup a new script that OpenVPN will call when a VPN connection is successfully established.

{% highlight ruby %}sudo touch /etc/openvpn/up.sh sudo chmod +x /etc/openvpn/up.sh{% endhighlight %}

Open **/etc/openvpn/up.sh** (as superuser):

{% highlight ruby %}nano /etc/openvpn/up.sh{% endhighlight %}

and set it up like this:

{% highlight ruby %}
#!/bin/sh 

/etc/init.d/transmission-daemon stop 
sed s/IP_ADDRESS/$4/ /etc/transmission-daemon/settings_template.json > /etc/transmission-daemon/settings.json 
/etc/init.d/transmission-daemon start{% endhighlight %}

Now edit your vpn.sh script from the OpenVPN tutorial and update it to look like this:

{% highlight ruby %}
#!/bin/sh 

sudo openvpn --config /home/USER/vpn/vpnbook-pl226-udp25000.ovpn --script-security 2 --up /etc/openvpn/up.sh{% endhighlight %}

From now on, when you connect to the VPN it will force your torrent traffic to use the VPN connection, and if you get disconnected it should stop torrenting until you reconnect. 

Source 
* [Transmission Over OpenVPN](http://www.naspberrypi.com/openvpn-transmission.html)


* * *


## Run in the background


Using **screen** as super user:

{% highlight ruby %}screen -S vpnbook -d -m ./vpn.sh{% endhighlight %}

after that you can quit the terminal, also you can reattach to it by:

{% highlight ruby %}screen -r vpnbook{% endhighlight %}

Another way to run in the background is by adding an &

{% highlight ruby %}/home/USER/vpn/vpn.sh &{% endhighlight %}

But you have to run the command every time you reboot. 

Source 
* [Run Bash script in background and exit terminal](https://superuser.com/a/1077639) 

Some tutorials to check out: 
* [openvpn-install](https://github.com/Angristan/OpenVPN-install) 
* [How to run your own OpenVPN server on a Raspberry PI](https://medium.freecodecamp.org/running-your-own-openvpn-server-on-a-raspberry-pi-8b78043ccdea) 
* [OpenVPN Server raspberry pi /w PiVPN](https://www.youtube.com/watch?v=WA7QTM9hovQ) (video) 


**DISCLAIMER:** 
- All the above are for debian based distro. If you have another distro, check the directory of your json file. 
- Change USER to your username. 
- Download illegal torrents is prohibited. Please do not use this tutorial for illegal reason.
