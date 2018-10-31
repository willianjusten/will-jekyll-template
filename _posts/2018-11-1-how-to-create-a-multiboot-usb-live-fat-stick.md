---
layout: post
title: "Δημιουργία multiboot USB με τη χρήση του live-fat-stick"
date: 2018-11-01 00:50:00
description: Φτιάξτε ένα Live USB με πολλές διανομές με τη χρήση του live-fat-stick στο τερματικό
tags:
- multiboot
- liveUSB
- terminal
- live-fat-stick
categories:
- Create liveUSB
- Create multiboot liveUSB
twitter_text: 'Φτιάξτε ένα Live USB με πολλές διανομές με τη χρήση του live-fat-stick στο τερματικό'
---

# Δημιουργία multiboot USB με τη χρήση του live-fat-stick

![USB grub](/post_images/live-fat-stick/fallout.gif)

Έχουμε δει στο παρελθόν την δημιουργία [multiboot USB με την χρήση τερματικού](/how-to-create-a-multiboot-usb/ "multiboot USB με την χρήση τερματικού") και την δημιουργία ενός [UEFI multiboot USB](https://eiosifidis.blogspot.com/2017/10/multiboot-usb-gpt.html "UEFI multiboot USB").

Εδώ θα δούμε πως μπορεί να γίνει αυτό με την βοήθεια του εργαλείου [live-fat-stick](https://github.com/cyberorg/live-fat-stick). Το καλό με το συγκεκριμένο πρόγραμμα είναι ότι δουλεύει ανεξαρτήτως διανομής.

Η διαδικασία γίνεται τόσο με γραφικό όσο και με τερματικό. Προσωπικά προτιμώ τερματικό και αυτό θα δούμε και εδώ.

Το πρόγραμμα αποτελείται από 3 αρχεία:

* live-fat-stick
* live-grub-stick
* live-usb-gui

<hr>

## ΕΓΚΑΤΑΣΤΑΣΗ

1. Kατεβάστε τα αρχεία από το Git.

2. Αποσυμπιέστε τα. Θα δημιουργηθεί ένας φάκελος με τα παραπάνω αρχεία.

3. Ανοίξτε το τερματικό μέσα στον φάκελο αυτό.

4. Αντιγράψτε τα αρχεία στον κατάλογο **/usr/bin/** 

{% highlight ruby %}
sudo cp live-fat-stick /usr/bin/

sudo cp live-grub-stick /usr/bin/

sudo cp live-usb-gui /usr/bin/
{% endhighlight %}

Στο openSUSE μπορούν να εγκατασταθούν με την τεχνολογία του 1-click-install.

* [live-fat-stick](http://software.opensuse.org/package/live-fat-stick "live-fat-stick")
* [live-grub-stick](http://software.opensuse.org/package/live-grub-stick "live-grub-stick")
* [live-usb-gui](http://software.opensuse.org/package/live-usb-gui "live-usb-gui")

5. Αφού τα αντιγράψετε, χρειάζεται να τα κάνετε εκτελέσιμα.

{% highlight ruby %}
sudo chmod +x /usr/bin/live-fat-stick

sudo chmod +x /usr/bin/live-grub-stick

sudo chmod +x /usr/bin/live-usb-gui
{% endhighlight %}

6. Αντιγράψτε το live-usb-gui.desktop στον φάκελο **/usr/share/applications/** και ενημερώστε την βάση δεδομεων:

{% highlight ruby %}
sudo cp live-usb.gui.desktop /usr/share/applications/

sudo update-desktop-database -q
{% endhighlight %}

και έτσι θα φαίνεται στο μενού.

Στις διανομές Ubuntu ή σε αυτές που δεν έχουν το **xdg-su**, αλλάξτε στο αρχείο live-usb-gui.desktop (**sudo nano /usr/share/applications/live-usb-gui.desktop**)

{% highlight ruby %}
Exec=xdg-su -c "live-usb-gui" 

σε

Exec=gksudo "live-usb-gui"
{% endhighlight %}

Εκτελέστε αυτή την εντολή στο τερματικό ως root (su -, όχι sudo) ή με το Alt+F2 και 

{% highlight ruby %}
xdg-su -c "xterm -e live-usb-gui"
{% endhighlight %}

Επίσης πρέπει να είναι εγκατεστημένα τα grub2, qemu-img και dd_rescue/ddrescue ενώ σε Ubuntu να είναι και το grub-pc-bin.

To DDrescue μπορείτε να το εγκαταστήσετε σε Ubuntuοειδή:

{% highlight ruby %}
Ubuntu 16.04

$ wget https://launchpadlibrarian.net/266151011/ddrescue-gui_1.5.1xenial-0ubuntu1~ppa1_all.deb
$ sudo dpkg -i ddrescue-gui_1.5.1xenial-0ubuntu1~ppa1_all.deb
$ sudo apt-get install -f

Ubuntu 15.10

$ wget https://launchpadlibrarian.net/266150814/ddrescue-gui_1.5.1wily-0ubuntu1~ppa1_all.deb
$ sudo dpkg -i ddrescue-gui_1.5.1wily-0ubuntu1~ppa1_all.deb
$ sudo apt-get install -f

Ubuntu 14.04

$ wget https://launchpadlibrarian.net/266150666/ddrescue-gui_1.5.1trusty-0ubuntu1~ppa1_all.deb
$ sudo dpkg -i ddrescue-gui_1.5.1trusty-0ubuntu1~ppa1_all.deb
$ sudo apt-get install -f
{% endhighlight %}

<hr>

## ΧΡΗΣΗ ΤΟΥ live-fat-stick

Και τώρα να δούμε πως μπορείτε να φτιάξετε ένα multiboot usb με πολλές διανομές.

Καταρχήν φροντίστε να έχετε διαμορφώσει το USB σε vfat/fat32. Θεωρητικά λειτουργούν και τα άλλα συστήματα αρχείων.

Μετακινηθείτε στον φάκελο που έχετε αποθηκευμένα τα iso.

Εκτελέστε τις εντολές ως root (su -).

{% highlight ruby %}
**Για openSUSE:** live-grub-stick --suse /path/to/openSUSE-filename.iso /dev/sdXY
**Για openSUSE με persistence:** live-grub-stick --suse-persistent /path/to/openSUSE-filename.iso /dev/sdXY

**Για Ubuntu-οειδή:** live-grub-stick --ubuntu /path/to/ubuntu-filename.iso /dev/sdXY
**Για Ubuntu-οειδή με persistence:** live-grub-stick --ubuntu-persistent /path/to/ubuntu-filename.iso /dev/sdXY

**Για Mint:** live-grub-stick --mint /path/to/mint-filename.iso /dev/sdXY

**Για Fedora:** live-grub-stick --fedora /path/to/fedora-filename.iso /dev/sdXY

**Για iPXE:** live-grub-stick --ipxe /path/to/ipxe.iso /dev/sdXY

**Για isohybrid:** live-grub-stick --isohybrid /path/to/isohybridimage.iso /dev/sdX
{% endhighlight %}

στις παραπάνω εντολές αλλάζετε το όνομα αρχείου iso (και την τοποθεσία. Αν μετακινηθείτε στον φάκελο με τα iso τότε απλά γράφετε το όνομα αρχείου iso).
Επίσης αλλάξτε το όνομα της συσκευής. Θα το βρείτε με την εντολή

{% highlight ruby %}
lsblk

ή

cat /proc/partitions
{% endhighlight %}

Όταν θα εκκινήσετε το USB θα σας βγάλει ένα σφάλμα ότι δεν βρήκε το θέμα στο

**/boot/grub/themes/*/theme.txt**

Οπότε αυτό που σας μένει είναι να κατεβάσετε κάποια θέματα GRUB. Μερικά που μου άρεσαν είναι:

[Anonymous-Hope Grub Theme](https://www.gnome-look.org/p/1252310/)

[Atomic GRUB Theme](https://www.gnome-look.org/p/1200710/)

[Plasma-dark](https://www.gnome-look.org/p/1195799/)

[Fallout](https://www.gnome-look.org/p/1230882/)

Για να αλλάξετε το θέμα, ακολουθήστε τα εξής:

1. Φτιάξτε ένα φάκελο μέσα στο /boot/grub/ με το όνομα themes.

2. Αποσυμπιέστε στον φάκελο themes το αρχείο που επιλέξατε.

3. Ανοίξτε το αρχείο grub.cfg (**/boot/grub/grub.cfg**).

4. Βρείτε την γραμμή που έχει το /boot/grub/themes/*/theme.txt και αλλάξτε το αστεράκι με το όνομα του φακέλου που δημιουργήθηκε από την αποσυμπίεση. 
Επίσης βρείτε τα menuentry του openSUSE και αλλάξτε το suse σε opensuse για να αναγνωρίζει το εικονιδιάκι από το θέμα που εγκαταστήσατε.
Αποθηκεύστε και είστε έτοιμος...

<hr>

## ΔΙΑΓΡΑΦΗ ή ΑΝΤΙΚΑΤΑΣΤΑΣΗ ΕΝΟΣ .iso

Η διαγραφή ή αντικατάσταση είναι πολύ απλή διαδικασία.

Διαγραφή: Μπείτε στο USB και διαγράψτε το iso. Στην συνέχεια ανοίξτε το αρχείο /boot/grub/grub.cfg και διαγράφω το menuentry.

Αντικατάστασση: Έστω ότι βγήκε νέα έκδοση της διανομής που έχετε εισάγει στο USB. Απλά μετονομάστε το αρχείο iso όπως βρίσκεται στο USB και αντικαταστήστε το στο USB. Αν τυχόν θέλετε να κάνετε αλλαγές στο **/boot/grub/grub.cfg**, μπορείτε να κάνετε και εκεί τις αλλαγές του ονόματος και πως θα φαίνεται.
