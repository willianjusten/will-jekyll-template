---
layout: post
title: "Εγκατάσταση και ρυθμίσεις Arch Linux"
date: 2021-02-20 12:30:00
description: Αναλυτικές οδηγίες εγκατάστασης Arch Linux
tags:
- arch linux
- εγκατάσταση
- ρυθμίσεις
categories:
- Arch Linux
twitter_text: 'Εγκατάσταση και ρυθμίσεις Arch Linux'
---

![Arch Linux](/post_images/arch_linux/Arch_Linux_logo.svg "Arch Linux")

Θεωρώ ότι η εγκατάσταση δεν είναι ιδιαίτερα δύσκολη, αν και οι φήμες την χαρακτηρίζουν ως διανομή δύσκολη στην εγκατάσταση. Η ανάρτηση βασίστηκε στο [Arch Linux wiki](https://wiki.archlinux.org/index.php/Installation_guide_%28%CE%95%CE%BB%CE%BB%CE%B7%CE%BD%CE%B9%CE%BA%CE%AC%29) (ή αν προτιμάτε το [Αγγλικό Wiki του Arch Linux](https://wiki.archlinux.org/index.php/Installation_Guide)).  
  
Αν ψάξετε στο Internet κυκλοφορούν πολλά έτοιμα σκριπτάκια που θα σας βοηθήσουν να εγκαταστήσετε εύκολα την διανομή Arch Linux αλλά και κάποιες διανομές που βασίζονται σε Arch Linux. Η αλήθεια είναι ότι ακολουθώντας τα παρακάτω βήματα, μαθαίνουμε πως ρυθμίζεται μια διανομή και ίσως η γνώση αυτή να μπορεί να εφαρμοστεί σε επίλυση προβλημάτων και σε άλλες διανομές. Εάν έχετε "βαρεθεί" να εγκαθιστάτε με το χέρι ή αν κάποιος δεν μπορεί να ακολουθήσει τον οδηγό εγκατάστασης, σίγουρα έτοιμες διανομές όπως η [Manjaro](https://manjaro.org/), [Endeavour OS](https://endeavouros.com/) κλπ, να είναι μια καλή εναλλακτική λύση.  
  
Στον οδηγό αυτό θα δούμε 3 κομμάτια. Πρώτα την εγκατάσταση, στη συνέχεια τις ρυθμίσεις και τέλος την εγκατάσταση ορισμένων προγραμμάτων (που προσωπικά χρησιμοποιώ). Επειδή πολλά αλλάζουν, θα αναβαθμίζεται με νέα πληροφορία η ανάρτηση αυτή.  
  
# ΕΓΚΑΤΑΣΤΑΣΗ ΣΥΣΤΗΜΑΤΟΣ  
  
* Καταρχήν, κατεβάστε το ISO από την ιστοσελίδα [https://www.archlinux.org/download/](https://www.archlinux.org/download/). Γράψτε το στο USB σας και κάντε boot με αυτό.  
  
* Τώρα, πρέπει να κάνετε τα partition. Με την εντολή **cfdisk** κάνουμε partions στον δίσκο όπου θα εγκαταστήσουμε το Arch. Εάν δεν καταλαβαίνετε τι πρέπει να κάνετε, μπορείτε να πάρετε ένα δισκάκι Manjaro ή openSUSE ή Ubuntu κλπ να ανοίξετε το gparted και να κάνετε τις κατατμήσεις στον δίσκο σας (εάν είναι καινούργιος).  
  
Ποια είναι τα προτεινόμενο σχήμα; Η λογική που ακολουθείται είναι σε περίπτωση ανάγκης επανεγκατάστασης, θα εγκαταστήσουμε ΜΟΝΟ το λειτουργικό σύστημα στην κατάτμηση **/** και το **/home** με τα αρχεία μας, ΔΕΝ θα το διαμορφώσουμε.  
  
**- Εαν έχετε BIOS με MBR τότε:**  
* **/** : το οποίο θα είναι περίπου 40GB  
* **swap** : το οποίο πρέπει να είναι διπλάσιο της φυσικής μνήμης (εάν έχετε από 16GB και πάνω, τότε 8GB swap είναι μια χαρά)  
* **/home** : ο υπόλοιπος χώρος  

**- Εαν έχετε UEFI με GPT τότε:**  
* **/boot/efi** : η κατάτμηση αυτή θα έχει μέγεθος 512ΜΒ και ουσιαστικά δεν χρειάζετε να θέσετε εσείς το σημείο προσάρτησης.   
  
![EFI system](/post_images/arch_linux/arch-linux-EFI-system.png  "EFI system")

* Εάν κάνετε εγκατάσταση **dual boot** με windows, καλό είναι να έχετε εγκατεστημένα πρώτα τα windows. Δημιουργήσετε ένα partition (μέσα από τα windows με το εργαλείο **Disk Management** (Shrink the volume)). Κατά την εγκατάσταση, θα έχετε 4 partition από τα windows και ένα άδειο. ΣΗΜΑΝΤΙΚΟ ότι θα χρησιμοποιήσετε το EFI SYSTEM partition των windows κατά την εγκατάσταση του Arch Linux. Δημιουργήστε ένα partition (**mkdir /mnt/efi**) και στη συνέχεια προσαρτήστε το partition, έστω /dev/sda2 (**mount /dev/sda2 /mnt/efi**). ΠΡΟΣΟΧΗ στην ρύθμιση του GRUB, να δώσετε σωστή διαδρομή του EFI System partition (--efi-directory=/efi).
  
* **/** : το οποίο θα είναι περίπου 40GB
* **swap** : το οποίο πρέπει να είναι διπλάσιο της φυσικής μνήμης (εάν έχετε από 16GB και πάνω, τότε 8GB swap είναι μια χαρά)
* **/home** : ο υπόλοιπος χώρος

![Disk partitions](/post_images/arch_linux/arch-linux-write.png  "Disk partitions")
*cfdisk: Αφού δημιουργήσετε τις κατατμήσεις και ορίσετε τον τύπο των κατατμήσεων, πατήστε στο Write για να αποθηκευτούν οι αλλαγές*

Ο δίσκος προφανώς θα είναι ο **/dev/sda** (εκτός και εάν εγκαταστείτε dual boot). Αφού δημιουργήθηκαν οι κατατμήσεις, πρέπει να τις διαμορφώσουμε και να κάνουμε προσάρτηση για εγκατάσταση. Θα ακολουθήσουμε την εγκατάσταση με **UEFI**. Εάν έχετε BIOS, απλά αγνοήστε την εντολή. Αν είναι κάτι διαφορετικό, τότε θα αναφερθεί.


{% highlight ruby %}
mkfs.fat -F32 /dev/sda1 (είναι το /boot/efi) 
mkfs.ext4 /dev/sda2 (είναι το /)  
mkswap /dev/sda3  
mkfs.ext4 /dev/sda4 (είναι το /home)  

mount /dev/sda2 /mnt  
swapon /dev/sda3  
mkdir /mnt/home  
mount /dev/sda4 /mnt/home  
{% endhighlight %}

Αν υποθέσουμε ότι δεν θέλετε να κάνετε format το /home σας (ή αν έχετε έναν άλλο δίσκο) και έστω ότι είναι το **/dev/sda4**, τότε **ΠΑΡΑΛΕΙΠΕΤΕ** την εντολή *mkfs.ext4 /dev/sda4*. Να έχετε υπόψιν σας ότι πρέπει να χρησιμοποιήσετε τον ίδιο χρήστη και συνθηματικό (θα δείτε παρακάτω πως δημιουργείται).

* Επιλέξτε μόνο τα κοντινά mirrors μπαίνοντας στο αρχείο mirrorlist, διαγράφοντας τα υπόλοιπα (γρήγορη διαγραφή ολόκληρης σειράς με Ctrl+K). Αυτό θα επιταχύνει την διαδικασία της εγκατάστασης.

{% highlight ruby %}
nano /etc/pacman.d/mirrorlist
{% endhighlight %}

Μπορείτε να ενεργοποιήσετε και την υποστήριξη Arch Multilib για το live σύστημα. Ανοίξτε το αρχείο:

{% highlight ruby %}
nano /etc/pacman.conf
{% endhighlight %}

βρείτε και αφαιρέστε το σχόλιο του:

{% highlight ruby %}
[multilib]
Include = /etc/pacman.d/mirrorlist
{% endhighlight %}

Σε περίπτωση που θέλουμε να διατηρήσουμε και τα ξένα, μπορούμε να βρούμε το πιο γρήγορο.

Κάντε μια ενημέρωση με την εντολή:

{% highlight ruby %}
pacman -Sy
{% endhighlight %}

Μετά εγκαταστήστε το reflector.

{% highlight ruby %}
pacman -S reflector
{% endhighlight %}

Και δώστε την παρακάτω εντολή ώστε να αποθηκευτεί η σειρά με τα πιο γρήγορα mirrors.

{% highlight ruby %}
cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.bak #Δημιουργία αντιγράφου ασφαλείας  
  
reflector --verbose -l 200 -p http --sort rate --save /etc/pacman.d/mirrorlist
{% endhighlight %}

* Εγκατασταση βασικού συστήματος.

{% highlight ruby %}
pacstrap /mnt base base-devel linux linux-firmware nano dialog wpa_supplicant sudo reflector wget curl
{% endhighlight %}

* Δημιουργία του fstab.

{% highlight ruby %}
genfstab -U -p /mnt >> /mnt/etc/fstab
{% endhighlight %}

Δείτε λίγο το περιεχόμενο του αρχείου με την εντολή:

{% highlight ruby %}
cat /mnt/etc/fstab
{% endhighlight %}

* Μπείτε ως chroot για ρυθμίσεις συστήματος.

{% highlight ruby %}
arch-chroot /mnt
{% endhighlight %}

* Μέσα στο hostname γράφουμε το όνομα που θέλουμε να έχει ο υπολογιστής μας.

{% highlight ruby %}
nano /etc/hostname
{% endhighlight %}

ή πιο απλά δώστε στο τερματικό την εντολή:

{% highlight ruby %}
echo "mypc" > /etc/hostname
{% endhighlight %}

* Καθορίζουμε το timezone.

{% highlight ruby %}
ln -s /usr/share/zoneinfo/Europe/Athens /etc/localtime
{% endhighlight %}

Εκτελέστε το hwclock για να δημιουργήσετε /etc/adjtime. Το ρολόι hardware να χρησιμοποιεί UTC (συνήθως χρησιμοποιεί τοπική ώρα).

{% highlight ruby %}
hwclock --systohc --utc
{% endhighlight %}

* Εδώ αν το σύστημα θέλουμε να ειναι GR διάγραφουμε το # μπροστά απο το **el_GR.UTF-8**. Προτιμήστε και την **en_US.UTF-8**.

{% highlight ruby %}
nano /etc/locale.gen
{% endhighlight %}

ή πιο απλά δώστε στο τερματικό την εντολή:

{% highlight ruby %}
echo -e "en_US.UTF-8 UTF-8\nel_GR.UTF-8 UTF-8" >> /etc/locale.gen
{% endhighlight %}

* Μέσα στον παρακάτω προορισμό γράφουμε τη γλώσσα που επιλέξαμε και το localtime.

{% highlight ruby %}
nano /etc/locale.conf
{% endhighlight %}

Καλό είναι το τερματικό του συστήματος να είναι στα Αγγλικά (αλλιώς δεν ανοίγει το gnome-terminal όταν προσπαθήσετε να το ανοίξετε):

{% highlight ruby %}
LANG="en_US.UTF-8"  
LC_COLLATE="C"  
LC_TIME="el_GR.UTF-8"
{% endhighlight %}

Εναλλακτικά με σε μία γραμμή εκτελείτε το παρακάτω:

{% highlight ruby %}
echo -e 'LANG="en_US.UTF-8"\nLC_MESSAGES="C"\nLC_TIME="el_GR.UTF-8"' >> /etc/locale.conf
{% endhighlight %}

* Δημιουργούμε το locale.

{% highlight ruby %}
locale-gen
{% endhighlight %}

* Αν και το προσθέσαμε νωρίτερα, ήταν για την live εγκατάσταση. Τώρα πρέπει να το ενεργοποιήσουμε και στο εγκατεστημένο σύστημα. Επομένως ανοίξτε το αρχείο **pacman.conf** (*nano /etc/pacman.conf*) και αφαιρέστε τα σχόλια:

{% highlight ruby %}
[multilib]
Include = /etc/pacman.d/mirrorlist
{% endhighlight %}

Κάντε και μια ενημέρωση:

{% highlight ruby %}
pacman -Syu
{% endhighlight %}

* Ρύθμιση Initramfs με την εντολή.

{% highlight ruby %}
mkinitcpio -P
{% endhighlight %}

* Ρυθμίζουμε το Grub bootloader.

{% highlight ruby %}
pacman -S grub efibootmgr dosfstools os-prober mtools
  
mkdir /boot/efi  
mount /dev/sda1 /boot/efi #Προσάρτηση κατάτμησης FAT32 EFI  

grub-install --target=x86_64-efi --bootloader-id=GRUB --efi-directory=/boot/efi --recheck  

Σε περίπτωση σφάλματος προσθέστε στο τέλος και τα εξής:  
--no-nvram --removable  
{% endhighlight %}

Δημιουργήστε τις ρυθμίσεις του αρχείου GRUB

{% highlight ruby %}
grub-mkconfig -o /boot/grub/grub.cfg
{% endhighlight %}

Αν έχετε BIOS τότε οι εντολές που θα χρησιμοποιήστε είναι οι παρακάτω:

{% highlight ruby %}
pacman -S grub
grub-install /dev/sda --recheck
grub-mkconfig -o /boot/grub/grub.cfg
{% endhighlight %}

* Αλλάζουμε το συνθηματικό του root.

{% highlight ruby %}
passwd root
{% endhighlight %}

* Δημιουργήστε χρήστη (statharas) με δικαιώματα διαχειριστή και να αλλάξει τον κωδικό με την πρώτη είσοδο.

{% highlight ruby %}
useradd -m -g users -G wheel,audio,video,optical,storage,lp,network,uucp -s /bin/bash statharas
passwd statharas #Δώστε τον επιθυμητό κωδικό
chage -d 0 statharas #Εδώ θα αλλάξει κωδικό μετά την είσοδο
{% endhighlight %}

Εφόσον παραπάνω έχετε εγκαταστήσει το sudo και θέλετε να το "χρησιμοποιήσετε", αφού μπείτε στην ομάδα wheel (παραπάνω που δημιουργήσαμε τον χρήστη), πρέπει να ανοίξετε το αρχείο /etc/sudoers (nano /etc/sudoers) και να σβήσετε το # μπροστά από το

{% highlight ruby %}
## Uncomment to allow members of group wheel to execute any command 
%wheel ALL=(ALL) ALL
{% endhighlight %}

Ή απλα εκτελέστε την εντολή:

{% highlight ruby %}
perl -i -pe 's/# (%wheel ALL=\(ALL\) ALL)/$1/' /etc/sudoers
{% endhighlight %}

Μέχρι στιγμής έχετε εγκαταστήσει το βασικό σύστημα.

Θα ακολουθήσει το γραφικό περιβάλλον, δημιουργία χρήστη, ρύθμιση συσκευών κλπ.

# ΠΡΩΤΕΣ ΡΥΘΜΙΣΕΙΣ-ΕΓΚΑΤΑΣΤΑΣΗ ΓΡΑΦΙΚΟΥ

* Εγκατάσταση γραφικών-κάρτας γραφικών.

**X install**

{% highlight ruby %}
pacman -S xorg xorg-server xorg-apps xorg-xinit xorg-twm xorg-xclock xterm
{% endhighlight %}

**Wayland**

{% highlight ruby %}
pacman -S wayland
{% endhighlight %}

Τώρα είναι η ώρα να εγκαταστήσετε τους drivers της κάρτας γραφικών σας. Περισσότερες πληροφορίες δείτε στην ιστοσελίδα του [wiki](https://wiki.archlinux.org/index.php/Installation_Guide#Video_driver).

**Για κάρτες Nvidia**

Εγκαταστήστε τον ανοικτό driver

{% highlight ruby %}
pacman -S xf86-video-nouveau
{% endhighlight %}

Εγκαταστήστε τον κλειστό driver

{% highlight ruby %}
pacman -S nvidia
{% endhighlight %}

**Για κάρτες ΑΤΙ**

Εγκαταστήστε τον ανοικτό driver

{% highlight ruby %}
pacman -S xf86-video-ati
{% endhighlight %}

**Για κάρτες Intel**

Εγκαταστήστε τον ανοικτό driver

{% highlight ruby %}
pacman -S xf86-video-intel
{% endhighlight %}

Σημείωση: Το πακέτο **xf86-video-intel** είναι για chipsets *i810/i830/i9xx* για το 740 υπάρχει το **xf86-video-i740**.

* Εγκατάσταση ήχου.

{% highlight ruby %}
pacman -S alsa-utils alsa-oss pulseaudio pulseaudio-alsa
{% endhighlight %}

* Εγκατάσταση ποντικιού κλπ.

{% highlight ruby %}
pacman -S xf86-input-synaptics xf86-input-evdev
{% endhighlight %}

* Εγκατάσταση Gnome desktop:

{% highlight ruby %}
pacman -S gdm gnome gnome-extra
{% endhighlight %}

Ενεργοποιήστε το GDM να ξεκινάει αυτόματα.

{% highlight ruby %}
systemctl enable gdm.service
{% endhighlight %}

Ενεργοποιήστε και το NetworkManager και το ssh για να υπάρχει δίκτυο.

{% highlight ruby %}
systemctl enable NetworkManager.service
systemctl enable sshd
{% endhighlight %}

* Εγκατάσταση headers.

{% highlight ruby %}
pacman -S linux-headers
{% endhighlight %}

* Αποθήκευση του .bashrc από το github.

{% highlight ruby %}
wget https://raw.githubusercontent.com/iosifidis/dot-files/master/Arch/.bashrc -O .bachrc
{% endhighlight %}

Αφού ολοκληρώθηκε και η εγκατάσταση γραφικών και του περιβάλλοντος, μπορείτε να βγείτε από το chroot και να κλείσετε τον υπολογιστή σας.

{% highlight ruby %}
exit
  
shutdown now
{% endhighlight %}

# ΡΥΘΜΙΣΕΙΣ-ΕΓΚΑΤΑΣΤΑΣΗ ΠΡΟΓΡΑΜΜΑΤΩΝ

* Εγκατάσταση yay για το AUR.

Στον κατάλογό σας, εκτελέστε τις εντολές:

{% highlight ruby %}
git clone [https://aur.archlinux.org/yay.git](https://aur.archlinux.org/yay.git)
cd yay
makepkg -si
{% endhighlight %}

* Εγκατάσταση fonts κλπ.

{% highlight ruby %}
pacman -S font-bh-ttf ttf-dejavu ttf-bitstream-vera
{% endhighlight %}

* Εγκατάσταση [LibreOffice](https://wiki.archlinux.org/index.php/LibreOffice).

{% highlight ruby %}
pacman -S libreoffice-still libreoffice-still-sdk libreoffice-still-el jdk7-openjdk jre7-openjdk
{% endhighlight %}

Σε περίπτωση που θέλετε τη νεότερη έκδοση, μπορείτε να εκγαταστήσετε τα

{% highlight ruby %}
pacman -S libreoffice-fresh libreoffice-fresh-sdk libreoffice-fresh-el jdk7-openjdk jre7-openjdk
{% endhighlight %}

* Εγκατάσταση διαφόρων προγραμμάτων που χρησιμοποιώ προσωπικά. Σβήστε ότι δεν χρειάζεστε.

{% highlight ruby %}
pacman -S cups transmission-gtk subdownloader subtitleeditor gnome-subtitles audacity audacious \
audacious-plugins smplayer smtube mplayer asunder openshot devede mencoder sound-juicer youtube-dl \
easytag inkscape gimp gimp-help-el aspell-el gutenprint gphoto2 numlockx mc davfs2 aria2 filezilla \
firefox firefox-i18n-el thunderbird thunderbird-i18n-el sox subversion meld poedit gtranslator acpid \
htop glances lsof powertop testdisk deja-dup libdvdcss ogmtools xchm gparted stardict gnome-common \
alacarte seahorse virtualbox virtualbox-host-dkms net-tools bchunk gst-libav simplescreenrecorder \
docker docker-compose hplip pdfcrack pkgfile telegram-desktop poppler pdftk texlive-latexextra
{% endhighlight %}

* Προγράμματα από το AUR.
Εγκαταστήσαμε το yay για το AUR (εσείς επιλέξτε όποιον AUR helper θέλετε από [εδώ](https://wiki.archlinux.org/index.php/AUR_helpers)) και στη συνέχεια εγκαταστήστε τα παρακάτω:

{% highlight ruby %}
**AUR HELPER** -S viber smartgit onlyoffice-bin signal-desktop-bin brave-bin skypeforlinux-stable-bin \
teamviewer dropbox nautilus-dropbox menulibre pdfsam luckybackup imagewriter multisystem ubuntu-themes \
virtualbox-ext-oracle humanity-icon-theme yandex-disk unetbootin repacman gconf-editor megatools megasync \
gtk-theme-adwaita-tweaks pacaur google-chrome --noconfirm
{% endhighlight %}

- Το --noconfirm το χρησιμοποιείτε για να μην σας ρωτάει συνέχεια.

Όταν τελειώσει η εγκατάσταση των παραπάνω, όσον αφορά το teamviewer, πρέπει να δώσετε τις εντολές:

{% highlight ruby %}
systemctl start teamviewerd
systemctl enable teamviewerd
{% endhighlight %}


Eπίσης, όσον αφορά το Virtual Box, πρέπει να βάλετε τον χρήστη στην ομάδα vboxusers (δείτε περισσότερες πληροφορίες στο [wiki](https://wiki.archlinux.org/index.php/VirtualBox)):

{% highlight ruby %}
gpasswd -a yourusername vboxusers
{% endhighlight %}

Τέλος, όταν εισάγετε το USB ανοίγει με το Anjuta. Για να το διορθώσετε, δώστε την εντολή:

{% highlight ruby %}
xdg-mime default org.gnome.Nautilus.desktop inode/directory
{% endhighlight %}

Μπορείτε να ρίξετε μια ματιά στις γενικές συστάσεις καθώς και την λίστα προγραμμάτων.

* Εναλλακτικά μπορείτε να χρησιμοποιήσετε και liveDVD άλλης διανομής και να εγκαταστήσετε Arch Linux. Δείτε πως γίνεται κάτι τέτοιο στην ανάρτηση: [Εγκατάσταση Arch Linux με την χρήση liveDVD άλλης διανομής (με χρήση του bootstrap)](http://eiosifidis.blogspot.gr/2015/05/arch-linux-bootstrap.html)  

* Τέλος μπορείτε να χρησιμοποιήσετε ένα σκριπτάκι [Archon](https://github.com/CerebruxCode/Archon) που φτιάχτηκε από Έλληνες. Αφού έχετε ανοίξει με το liveISO τον υπολογιστή σας, δώστε την εντολή:

{% highlight ruby %}
curl -sL https://git.io/archon | tar xz && cd Archon-master
{% endhighlight %}

και για να το εκτελέσετε και να ξεκινήσει η εγκατάσταση:

{% highlight ruby %}
sh archon.sh
{% endhighlight %}

και ακολουθείτε τις οδηγίες.

Εάν έχετε απορίες, μπορείτε να δείτε το βίντεο [Archon: Arch Linux KISS greek installer](https://youtu.be/xzsF8TsHejc)
