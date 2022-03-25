---
layout: post
title: "Προτεινόμες ρυθμίσεις και προγράμματα μετά την εγκατάσταση openSUSE"
date: 2022-03-10 12:00:00
description: Η υπηρεσία ~okeanos παρέχει εικονικούς server στην πανεπιστημιακή κοινότητα. Εδώ θα δούμε πως συνδεόμαστε σε Windows server από υπολογιστή με Linux
tags:
- openSUSE
- ρυθμίσεις
categories:
- openSUSE
- Ρυθμίσεις
twitter_text: 'Προτεινόμες ρυθμίσεις και προγράμματα μετά την εγκατάσταση openSUSE'
---

![openSUSE](/post_images/opensuse/openSUSE-round.png "openSUSE")

# Εγκατάσταση

Η εγκατάσταση είναι αρκετά απλή. Είναι ίδια εδώ και χρόνια. Το μόνο σημείο προσοχής (όπως και με την εγκατάσταση άλλων διανομών) είναι το σημείο με τις κατατμήσεις. Στο σημείο αυτό σίγουρα μια κατάτμηση πρέπει να είναι το efi partition περίπου 50ΜΒ και μετά χωρίζουμε σε / με όλο το λειτουργικό σύστημα περίπου 40GB, το swap να είναι διπλάσιο της φυσικής μνήμης μέχρι 8GB και ότι άλλο μείνει σε κατάτμηση /home.

## Ενημέρωση

Αφού έγινε η εγκατάσταση, πρέπει να κάνουμε αναβάθμιση.

{% highlight ruby %}
Για openSUSE Leap
sudo zypper patch  && sudo zypper up

Για openSUSE Tumbleweed  
sudo zypper dup
{% endhighlight %}

## Εγκατάσταση codecs

Το επίσημο ISO δεν περιέχει codecs για αναπαραγωγή αρχείων πολυμέσων, η επόμενη κίνηση είναι η εγκατάσταση του αποθετηρίου της κοινότητας Packman και η ενημέρωση των προγραμμάτων από εκεί. Επισκεφθείτε την διεύθυνση:

[https://www.opensuse-community.org/](https://www.opensuse-community.org/)

Και επιλέξτε για KDE ή GNOME (MATE, XFCE).

## Εγκατάσταση Flatpak

* Εγκατάσταση του flatpak.

{% highlight ruby %}
sudo zypper install flatpak
{% endhighlight %}

* Εισαγωγή του αποθετηρίου flatpak.

{% highlight ruby %}
sudo flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
{% endhighlight %}

* Επανεκκίνηση του συστήματος

Για εγκατάσταση εφαρμογών, μπορείτε να χρησιμοποιήσετε την ιστοσελίδα:

[https://flathub.org/apps](https://flathub.org/apps)

## Επαναφορά εγκατεστημένων προγραμμάτων

Μπορείτε να λάβετε ένα αρχείο με τα εγκατεστημένα προγράμματα με την εντολή:

{% highlight ruby %}
rpm -qa > installed-software.bak
{% endhighlight %}

Και η εγκατάστασή τους γίνεται με την εντολή:

{% highlight ruby %}
sudo zypper install $(cat installed-software.bak)
{% endhighlight %}

## Εγκατάσταση προγραμμάτων από τα επίσημα αποθετήρια

Εγκατάσταση προγραμμάτων από τα αποθετήρια. Αν δεν χρειάζεστε κάποια, απλά μην τα εγκαθιστάτε.

{% highlight ruby %}
sudo zypper install audacity mc gtranslator poedit meld gnome-subtitles gparted git hplip youtube-dl smplayer easytag gnome-calendar gnome-connections gnome-common dconf-editor gcc aria2 imagewriter gnome-boxes make sox htop megatools filezilla gnome-gmail-notifier photorec testdisk powertop typelib-1_0-Vte-2.91 alacare nano hexchat libfuse2 simplescreenrecorder epiphany vlc alpine menulibre live-fat-stick live-grub-stick live-usb-gui openjpeg2 gimp-save-for-web aspell-el python3-tk ntfs-3g dia python-nautilus-common-files pdfarranger pdftk cmake traceroute nmap translate-shell rar libgtop virtualbox sensors cool-retro-term health-check remmina remmina-plugin-rdp remmina-plugin-vnc rdesktop gnome-multi-writer projectlibre thunderbolt-user-space bolt
{% endhighlight %}

## Εγκατάσταση προγραμμάτων από το Flatpak

Επίσης εάν δεν τα χρειάζεστε όλα, μην τα εγκαθιστάτε.

{% highlight ruby %}
flatpak install chat.rocket.RocketChat com.anydesk.Anydesk com.axosoft.GitKraken com.discordapp.Discord com.github.junrrein.PDFSlicer com.microsoft.Teams com.slack.Slack org.codeblocks.codeblocks org.gtk.Gtk3theme.Yaru-dark org.kde.KStyle.Adwaita org.onlyoffice.desktopeditors org.signal.Signal org.telegram.desktop us.zoom.Zoom com.github.xournalpp.xournalpp com.uploadedlobster.peek org.wireshark.Wireshark com.stremio.Stremio io.github.seadve.Kooha org.raspberrypi.rpi-imager org.eclipse.Java com.google.AndroidStudio com.notepadqq.Notepadqq io.github.liberodark.OpenDrive dev.Cogitri.Health com.jgraph.drawio.desktop org.blender.Blender im.riot.Riot
{% endhighlight %}

Προσοχή στο discord, για να μπορείτε να στέλνετε αρχεία από το home, πρέπει να δώσετε την εντολή:

{% highlight ruby %}
sudo flatpak override --filesystem=home com.discordapp.Discord
{% endhighlight %}

Αλλιώς θα πρέπει να χρησιμοποιείτε τους φακέλους Φωτογραφιών και Εγγράφων μόνο.

## Εγκατάσταση τρίτων εφαρμογών

### GOOGLE CHROME

Για εγκατάσταση του Google Chrome, μπορείτε αφενός να κατεβάσετε το αρχείο από την [σελίδα του Google Chrome](https://www.google.com/intl/el_GR/chrome/) ή να προσθέσετε το αποθετήριο και να κάνετε ανανέωση των αποθετηρίων όπως βλέπετε παρακάτω:

{% highlight ruby %}
sudo zypper addrepo http://dl.google.com/linux/chrome/rpm/stable/x86_64 Google-Chrome

sudo zypper refresh
{% endhighlight %}

Πατήστε **yes**. Στη συνέχεια πρέπει να κατεβάσετε και να εισάγετε το κλειδί με τις 2 παρακάτω εντολές.

{% highlight ruby %}
wget https://dl.google.com/linux/linux_signing_key.pub

sudo rpm --import linux_signing_key.pub
{% endhighlight %}

Και στη συνέχεια εγκαταστήσετε το google chrome.

{% highlight ruby %}
sudo zypper install --no-confirm google-chrome-stable
{% endhighlight %}

### Εγκατάσταση Viber

Το Viber μπορεί να εγκατασταθεί τόσο από το flatpak όσο και μέσω της σελίδας [https://www.viber.com/en/download/](https://www.viber.com/en/download/).

Κατεβάστε το αρχείο [https://download.cdn.viber.com/desktop/Linux/viber.AppImage](https://download.cdn.viber.com/desktop/Linux/viber.AppImage) μέσα στον φάκελο bin που έχετε μέσα στο home. Μπορείτε με διπλό κλικ να το ανοίξετε. Αν δεν σας βολεύει τόσο, μπορείτε να προσέσετε μια καταχώρηση με την χρήση του **menulibre**.

### Εγκατάσταση Virtual Box

Συνήθως κατεβάζω το Virtual Box από την διεύθυνση [https://www.virtualbox.org/](https://www.virtualbox.org/). Τελευταία το εγκατέστησα από τα αποθετήρια ως εξής:

{% highlight ruby %}
sudo zypper install virtualbox
{% endhighlight %}

Στην συνέχεια πρόσθεσα τον χρήστη (your-user) στην ομάδα vboxusers.

{% highlight ruby %}
sudo gpasswd -a your-user vboxusers
{% endhighlight %}

Έκανα μια επανεκκίνηση και ήταν έτοιμο.

## Επεξεργασία του bashrc

Το τελευταίο bashrc θα το βρείτε στην [διεύθυνση μου στο Github](https://github.com/iosifidis/dot-files/blob/master/openSUSE/.bashrc). Εσείς μπορείτε να αντιγράψετε αυτό στο δικό σας.

{% highlight ruby %}
#zypper aliases
# UPDATE
alias update="sudo zypper dup && sudo zypper clean && sudo zypper purge-kernels && sudo rm /tmp/* -rf && sudo journalctl --vacuum-time=1d && flatup && flatclear && flatclean"
alias upgrade="sudo zypper dup" 
alias flatup="sudo flatpak update"
alias flatclean="sudo flatpak uninstall --unused"
alias flatclear="sudo rm -rf /var/tmp/flatpak-cache*"
alias pipup="pip install --upgrade pip"
alias upbash=". ~/.bashrc"
alias orphaned="sudo zypper pa --orphaned"
alias clean="sudo zypper cc"
alias verify="sudo zypper verify"
alias libre="free -h && sudo sysctl -w vm.drop_caches=3 && sudo sync && echo 3 | sudo tee /proc/sys/vm/drop_caches && free -h"

#TRIM
alias trim="trimroot && trimhome"
alias trimroot="sudo /usr/sbin/fstrim -v /"
alias trimhome="sudo /usr/sbin/fstrim -v /home"

#PROTON
alias protonc="sudo protonvpn connect"
alias protons="sudo protonvpn c -f"
alias protonst="sudo protonvpn disconnect"

#MISC
alias search="sudo zypper se"
alias install="sudo zypper in" 
alias team="sudo systemctl start teamviewerd"
alias mega="megacopy --local megatools --remote /Root/Uploads"
alias ar="sudo zypper ar -f -n"
alias net="nmap -sP 192.168.1.1/24"
alias shutdown="sudo shutdown -h now"
alias youtube="youtube-dl --extract-audio --audio-format mp3"
alias playlist="youtube-dl -cit https://www.youtube.com/playlist?list="
alias youtubefile="youtube-dl -f best -a "
alias istoriko="cat /var/log/zypp/history"
alias myip="ip -br -c a"
alias my-ip="curl ipinfo.io/ip"
alias server="python -m SimpleHTTPServer 8000"
alias doker="sudo systemctl start docker"
alias metefrase="trans -t el "
alias enose="pdfunite *.pdf out.pdf"
alias png2pdf="convert *.png out.pdf"
alias opensuse="wget http://download.opensuse.org/tumbleweed/iso/openSUSE-Tumbleweed-GNOME-Live-x86_64-Current.iso"
alias covid="curl snf-878293.vm.okeanos.grnet.gr"
alias weather="curl http://wttr.in/Thessaloniki"
alias kairos="curl http://wttr.in/Athens"
alias disk="ncdu"
alias py="python2"
{% endhighlight %}

## Πρόσθετα GNOME

Το GNOME για να γίνει λίγο πιο λειτουργικό, χρειάζεται κάποια πρόσθετα:

* Προσθέτει τα εικονίδια πάνω στην μπάρα [https://extensions.gnome.org/extension/2890/tray-icons-reloaded/](https://extensions.gnome.org/extension/2890/tray-icons-reloaded/)  
* Επιτρέπει στον χρήστη να παίξει με δικά του θέματα [https://extensions.gnome.org/extension/19/user-themes/](https://extensions.gnome.org/extension/19/user-themes/)  
* Βολεύει να αποκρύπτει την μπάρα με τις εφαρμογές και να την εμφανίζει όταν μετακινείται το ποντίκει εκεί [https://extensions.gnome.org/extension/307/dash-to-dock/](https://extensions.gnome.org/extension/307/dash-to-dock/)  
* Το tweaks και το extensions, τα τοποθετεί στις επιλογές χρήστη (πάνω δεξιά) [https://extensions.gnome.org/extension/1653/tweaks-in-system-menu/](https://extensions.gnome.org/extension/1653/tweaks-in-system-menu/)  
* Μου αρέσει το πρόσθετο vitals αλλά δεν δείχνει το μέγεθος δίσκου. Οπότε εναλλακτικά το resource-monitor κάνει την δουλειά [https://extensions.gnome.org/extension/1634/resource-monitor/](https://extensions.gnome.org/extension/1634/resource-monitor/)
