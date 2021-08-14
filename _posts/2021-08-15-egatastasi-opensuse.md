---
layout: post
title: "Εγκατάσταση και ρυθμίσεις openSUSE Leap/Tumbleweed"
date: 2021-08-15 12:30:00
description: Αναλυτικές οδηγίες εγκατάστασης openSUSE Leap/Tumbleweed
tags:
- openSUSE
- εγκατάσταση
- ρυθμίσεις
categories:
- openSUSE
twitter_text: 'Εγκατάσταση και ρυθμίσεις openSUSE'
---

![openSUSE](/post_images/opensuse/openSUSE-round.png "openSUSE"){:height="250px" width="350px"}

Το παρόν άρθρο αποτελεί ένα σύνολο των ενεργειών που προτείνονται μετά την εγκατάσταση της έκδοσης [openSUSE Leap](https://en.opensuse.org/Portal:Leap) ή της [openSUSE Tumbleweed](https://en.opensuse.org/Portal:Tumbleweed).  

Η έκδοση Leap αποτελεί την πρώτη υβριδική έκδοση. Τα βασικά εργαλεία τα παρέχει η SUSE (με όλες τις αναβαθμίσεις που παρέχει στους εταιρικούς πελάτες της) ενώ το γραφικό περιβάλλον το συντηρεί η κοινότητα openSUSE.  

Οι ενέργειες που αναφέρω **ΔΕΝ** είναι απαραίτητες για να λειτουργήσει ο υπολογιστής σας. Οι περισσότερες ενέργειες είναι προσωπικές επιλογές.  

## ΛΗΨΗ

Η λήψη του του ISO γίνεται από την ιστοσελίδα [https://www.opensuse.org/](https://www.opensuse.org). Η κοινότητα προτείνει να χρησιμοποιήσετε το DVD ή καλύτερα το NET install ώστε να ληφθούν οι τελευταίες ενημερώσεις του λογισμικού. H μόνη αρχιτεκτονική που θα υποστηρίζεται στην Leap είναι η 64bit. Εάν θέλετε να χρησιμοποιήσετε 32bit, επιλέξτε το [openSUSE Tumbleweed](https://el.opensuse.org/Portal:Tumbleweed).  

## ΕΓΚΑΤΑΣΤΑΣΗ

Δείτε τα παρακάτω βίντεο. Παρουσιάζουν πως γίνεται η εγκατάσταση του openSUSE (με KDE και με GNOME).  

* [Φίλοι με το Linux - Μέρος 1 - openSUSE Leap 15.1](https://youtu.be/zo66AELv1RQ)   
* [Εγκατάσταση του openSUSE Leap](https://youtu.be/cIwJZD1N3Tk)   
  
Η εγκατάσταση δεν διαφέρει από τις άλλες εκδόσεις. Θα εστιάσω σε 3 σημεία.

1. **Γλώσσα**: Εάν εγκαθιστάτε από το DVD, στην αρχή που σας εμφανίζει την άδεια χρήσης, μπορείτε να επιλέξετε Ελληνικά. Σε περίπτωση που είστε από NET install, καλύτερα να επιλέξετε Αγγλικά και στη συνέχεια να αλλάξετε σε Ελληνικά.  

2. **Γραφικό περιβάλλον**: Σε περίπτωση που χρησιμοποιείτε το DVD, είναι διαθέσιμα τα GNOME, KDE, XFCE, ICEWM, server. Σε περίπτωση που χρησιμοποιείτε το NET Install μπορείτε να επιλέξετε και άλλα γραφικά περιβάλλοντα. Παράδειγμα, για να εγκαταστήσετε το MATE, επιλέξτε Minimal και στην περίληψη, πατήστε το link Software. Στην οθόνη που θα βγάλει, επιλέξτε αυτά που βλέπετε και στην εικόνα. 

![Εγκατάσταση MATE](/post_images/opensuse/MATE_NET_install_software.png "Εγκατάσταση MATE"){:height="480px" width="640px"}

Όταν ανοίξει, μπείτε στο YaST και αλλάξτε το twm σε lightDM.  


3. **Κατατμήσεις**: Γενικά προτείνονται 3 κατατμήσεις. Εάν κάνετε νέα εγκατάσταση, πατώντας απλά το Επόμενο, θα δημιουργηθούν 3 κατατμήσεις (root, swap, home). Τα ερωτήματα προκύπτουν όταν έχετε και windows. Πάλι θα σας προτείνει κάτι που είναι βιώσιμο. Τέλος, σε περίπτωση που επιθυμείτε διαφορετικό σύστημα αρχείων από το προτεινόμενο, απλά μπορείτε να μεταβείτε στο **Expert Partitioner** και να αλλάξετε ότι θέλετε από σύστημα αρχείων ή και μέγεθος κατάτμησης.   

4. Σε περίπτωση που έχετε κάποιον άλλο υπολογιστή και θέλετε να έχετε τα ίδια προγράμματα, μπορείτε να ακολουθήσετε τις οδηγίες.

Από σύστημα που χρησιμοποιείτε ήδη, μπορείτε να τα πάρετε όλα σαν μια λίστα με την εντολή:

{% highlight ruby %}
rpm -qa
{% endhighlight %}

μάλιστα μπορείτε να τα σώσετε σε αρχείο.

{% highlight ruby %}
rpm -qa > installed-software.bak
{% endhighlight %}

Ωραία. Τώρα έχετε μια λίστα με τα προγράμματα. Το αρχείο αποθηκεύστε το σε ένα USB ή στο Git σας και στη συνέχεια μεταφέρετέ το σε ένα σύστημα που έχετε μόλις εγκαταστήσει. Με την παρακάτω εντολή θα εγκατασταθούν όλα τα προγράμματα που έχετε εγκατεστημένα.

{% highlight ruby %}
sudo zypper install $(cat installed-software.bak)
{% endhighlight %}
  

## ΓΡΑΦΙΚΑ ΠΕΡΙΒΑΛΛΟΝΤΑ

Όπως προαναφέρθηκε, υπάρχον αρκετά δημοφιλή γραφικά περιβάλλοντα, για όλα τα γούστα. Στο παρόν άρθρο θα μιλήσουμε για GNOME. Όπως αναφέρεται και στο βίντεο, η εταιρία SUSE κυκλοφορεί το εμπορικό προϊόν της με το γραφικό περιβάλλον GNOME. Οπότε στην έκδοση Leap θα έχετε την καλύτερη εμπειρία χρήστη. Μπορείτε να χρησιμοποιήσετε και τα υπόλοιπα γραφικά περιβάλλοντα. Ανάλογα τις προτιμήσεις που έχει ο κάθε χρήστης.  

# ΜΕΤΑ ΤΗΝ ΕΓΚΑΤΑΣΤΑΣΗ

1. **Αναβάθμιση**  

Εάν εγκαθιστάτε από NET Install είστε εντάξει. Εάν εγκαθιστάτε από DVD πρέπει να κάνετε μια αναβάθμιση με την εντολή:  

{% highlight ruby %}
Σε Leap χρησιμοποιήστε την εντολή:
sudo zypper up

Σε Tubleweed χρησιμοποιήστε την εντολή:
sudo zypper up
{% endhighlight %}

2. **Εγκατάσταση CODECS**  

Αυτό γίνεται εύκολα με το 1-click-install (υπάρχει αντίστοιχο και σε KDE ενώ το παρακάτω ισχύει και για XFCE-MATE):  

[http://opensuse-community.org/codecs-gnome.ymp](http://opensuse-community.org/codecs-gnome.ymp)  

3. **Εγκατάσταση προγραμμάτων**  

Σε περίπτωση που θέλετε ένα πρόγραμμα που δεν μπορείτε να βρείτε στα αποθετήρια (YaST), επισκεφθείτε την σελίδα:  

[http://software.opensuse.org](http://software.opensuse.org)

Πληκτρολογήστε το πρόγραμμα που θέλετε και επιλέξτε την έκδοση openSUSE που έχετε και προτιμήστε να εγκαταστήσετε το πρόγραμμα με το 1-click-install. Θα σας ζητήσει τον κωδικό σας και στη συνέχεια θα σας πληροφορήσει ποια αποθετήρια θα προσθέσει, ποια προγράμματα και απλά θα τα εγκαταστήσει (χωρίς κόπο).  

4. **Προγράμματα κλειστού κώδικα και αλλά χρήσιμα προγράμματα**  

Θα παραθέσω μια λίστα με προγράμματα που χρησιμοποιώ εγώ. ΔΕΝ είναι απαραίτητο να εγκαταστήσετε για να χρησιμοποιήσετε το σύστημά σας.  

### FLATPAK

Πολλά προγράμματα δουλεύουν καταπληκτικά με την χρήση του flatpak.  

ΕΓΚΑΤΑΣΤΑΣΗ

1. Εγκατάσταση του flatpak.

{% highlight ruby %}
sudo zypper install flatpak
{% endhighlight %}

2. Εισαγωγή του αποθετηρίου flatpak.

{% highlight ruby %}
sudo flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
{% endhighlight %}

3. Επανεκκίνηση του συστήματος

Για εγκατάσταση εφαρμογών, μπορείτε να χρησιμοποιήσετε την ιστοσελίδα:

[https://flathub.org/apps](https://flathub.org/apps)

Eφαρμογές που εγκαθιστώ:

{% highlight ruby %}
flatpak install com.viber.Viber chat.rocket.RocketChat com.anydesk.Anydesk com.axosoft.GitKraken com.github.junrrein.PDFSlicer com.jetbrains.IntelliJ-IDEA-Community com.microsoft.Teams com.slack.Slack de.haeckerfelix.Fragments im.riot.Riot org.codeblocks.codeblocks org.gtk.Gtk3theme.Yaru-dark org.kde.KStyle.Adwaita org.kde.kdenlive org.onlyoffice.desktopeditors org.signal.Signal org.telegram.desktop org.x.Warpinator us.zoom.Zoom com.github.xournalpp.xournalpp com.obsproject.Studio com.uploadedlobster.peek org.wireshark.Wireshark com.stremio.Stremio dev.alextren.Spot com.spotify.Client org.flameshot.Flameshot io.github.seadve.Kooha org.shotcut.Shotcut org.olivevideoeditor.Olive com.getferdi.Ferdi io.dbeaver.DBeaverCommunity net.codeindustry.MasterPDFEditor org.openshot.OpenShot org.raspberrypi.rpi-imager org.eclipse.Java
{% endhighlight %}


* [Skype](https://www.skype.com/el/download-skype/skype-for-computer/): Μετά την αλλαγή που έγινε, μπορείτε να εγκαταστήσετε το rpm είτε να εγκαταστήσετε το πρόσθετο για [firefox](https://addons.mozilla.org/el/firefox/addon/skype-addon/) είτε για [Chrome](https://chrome.google.com/webstore/detail/skype/lifbcibllhkdhoafpjfnlhfpfgnpldfl)  
  
* [Teamviewer](http://www.teamviewer.com/el/download/linux.aspx). Καλύτερα να χρησιμοποιήσετε το Anydesk.  

Το Teamviewer τρέχει μια υπηρεσία μόνιμα. Επειδή δεν χρειάζεται, μπορείτε να την απενεργοποιήσετε με την εντολή:  

{% highlight ruby %}
sudo systemctl disable teamviewerd
{% endhighlight %}

Την εντολή αυτήν, θα την προσθέσουμε στο bashrc μας (θα δείτε παρακάτω). Πριν τρέξετε το Teamviewer, θα εκτελέσετε το alias που έχετε εισάγει στο bashrc και μετά θα εκτελείτε το Teamviewer.  

* [SmartGithg](https://www.syntevo.com/smartgit/download/) ή από το flatpak με την εντολή **flatpak install com.syntevo.SmartGit**. Όμως αντί αυτού, χρησιμοποιώ το GitKraken.  
 
* [Virtualbox](https://www.virtualbox.org/wiki/Linux_Downloads) (αν και υπάρχει το GNOME BOXES, υπάρχουν περιπτώσεις που έχω ήδη εγκατεστημένο κάποιο εικονικό σύστημα. Μην ξεχάσετε να εγκαταστήσετε το [Extension Pack](https://www.virtualbox.org/wiki/Downloads) για να έχετε υποστήριξη USB).  

* [Chromimum](http://software.opensuse.org/package/chromium) ή με το flatpak με την εντολή **flatpak install org.chromium.Chromium** ή εγκατάσταση του [Chrome](https://tools.google.com/chrome)  

* [Yandex.disk](https://disk.yandex.com/download/?referer=webinterface) (εκτέλεση yandex-disk setup)  

Τα παρακάτω προγράμματα πιθανό τα χρησιμοποιώ προσωπικά. Πιθανό να μην σας χρειάζονται όλα (πιθανό να αλλάξω μερικά με τον καιρό). Οπότε πράξτε ανάλογα.  

{% highlight ruby %}
sudo zypper install audacity mc gtranslator poedit gnome-subtitles gparted meld git hplip youtube-dl smplayer easytag gnome-common dconf-editor gcc aria2 imagewriter gnome-boxes make sox htop megatools filezilla gnome-gmail-notifier photorec testdisk powertop typelib-1_0-Vte-2.91 alacare nano hexchat libfuse2 simplescreenrecorder epiphany vlc alpine menulibre live-fat-stick live-grub-stick live-usb-gui openjpeg openjpeg2 gimp-save-for-web aspell-el python3-tk
{% endhighlight %}


5. **Ρυθμίσεις δίσκου SSD**  

Εάν διαθέτετε δίσκο SSD, τότε [δείτε αυτό το άρθρο](http://eiosifidis.blogspot.gr/2013/08/ssd.html).  

6. **Επεξεργασία του bashrc**  

Δώστε την εντολή:  

{% highlight ruby %}
nano .bashrc
{% endhighlight %}

Και μετά επικολλήστε στο τέλος τα παρακάτω (αυτά χρησιμοποιώ εγώ. [Trim είναι για δίσκους SSD αλλά μπορεί να μπει και στο fstab](http://eiosifidis.blogspot.gr/2013/08/ssd.html)):  

{% highlight ruby %}
#zypper alias
alias update="sudo zypper up && sudo zypper clean && sudo zypper purge-kernels && sudo rm /tmp/* -rf && sudo journalctl --vacuum-time=1d"
alias upgrade="sudo zypper dup && flatup && flatclean && flatclear" 
alias search="sudo zypper se"
alias install="sudo zypper in" 
alias trim="trimroot && trimhome"
alias trimroot="sudo /usr/sbin/fstrim -v /"
alias trimhome="sudo /usr/sbin/fstrim -v /home"
alias team="sudo systemctl start teamviewerd"
alias mega="megacopy --local megatools --remote /Root/Uploads"
alias ar="sudo zypper ar -f -n"
alias net="nmap -sP 192.168.1.1/24"
alias shutdown="sudo shutdown -h now"
alias youtube="youtube-dl --extract-audio --audio-format mp3 --username eiosifidis"
alias istoriko="cat /var/log/zypp/history"
alias upbash=". ~/.bashrc"
alias myip="ip -br -c a"
alias my-ip="curl ipinfo.io/ip"
alias verify="sudo zypper verify"
alias orphaned="sudo zypper pa --orphaned"
alias flatup="sudo flatpak update"
alias flatclean="sudo flatpak uninstall --unused"
alias flatclear="sudo rm -rf /var/tmp/flatpak-cache*"
alias clean="sudo zypper cc"
alias protonc="sudo protonvpn connect"
alias protons="sudo protonvpn c -f"
alias protonst="sudo protonvpn disconnect"
alias server="python -m SimpleHTTPServer 8000"
alias libre="free -h && sudo sysctl -w vm.drop_caches=3 && sudo sync && echo 3 | sudo tee /proc/sys/vm/drop_caches && free -h"
alias opensuse="wget http://download.opensuse.org/tumbleweed/iso/openSUSE-Tumbleweed-GNOME-Live-x86_64-Current.iso"
alias covid="curl snf-878293.vm.okeanos.grnet.gr"
alias weather="curl http://wttr.in/Thessaloniki"
alias kairos="curl http://wttr.in/Athens"
alias disk="ncdu"
alias py="python2"
alias doker="sudo systemctl start docker"
alias metefrase="trans -t el "
alias enose="pdfunite *.pdf out.pdf"
alias libre="free -h && sudo sysctl -w vm.drop_caches=3 && sudo sync && echo 3 | sudo tee /proc/sys/vm/drop_caches && free -h"
alias png2pdf="convert *.png out.pdf"
#SAGEMATH
alias sagemathstart="sudo docker run -p8888:8888 sagemath/sagemath:latest sage-jupyter"
alias sagemathstop="sudo docker ps | grep sagemath | awk '{print $1}' | xargs docker stop"
{% endhighlight %}

7. **Extensions για το GNOME**  

Σε αρκετούς δεν αρέσει το GNOME όπως είναι. Υπάρχει τρόπος να κάνετε αλλαγές με τα [extensions](https://extensions.gnome.org/). Εδώ είναι μερικά που χρησιμοποιώ εγώ. Έχετε υπόψιν ότι μπορεί η έκδοση GNOME που έχετε να διαφέρει από αυτήν που είναι διαθέσιμο το extension και έτσι να μην μπορείτε να το ενεργοποιήσετε.  

Πάμε λοιπόν:  

* [Dash to Dock](https://extensions.gnome.org/extension/307/dash-to-dock/). Την μπάρα dash την εμφανίζει όταν έχετε σε πρώτο πλάνο το παράθυρο που δουλεύετε και μετακινήσετε το mouse στην άκρη. Επίσης όταν δεν έχετε ανοικτό κάποιο παράθυρο, εμφανίζει την μπάρα (σαν το Unity). Μπορείτε να την ρυθμίσετε βέβαια όπως θέλετε (μέγεθος κλπ). Τελευταία προστέθηκε να μετακινήσετε την μπάρα κάτω, δεξιά ή ακόμα και επάνω.  

* [Dash to Panel](https://extensions.gnome.org/extension/1160/dash-to-panel/): Μπορείτε να μεταφέρετε την επάνω μπάρα και αυτή με τα αγαπημένα κάτω και να το κάνετε "σαν windows" ένα πράγμα.  

* [Drop Down Terminal](https://extensions.gnome.org/extension/442/drop-down-terminal/). Η χρήση του τερματικού είναι συχνή. Στο GNOME μπορείτε να χρησιμοποιήσετε αυτό το extension. Ως προεπιλογή είναι του κουμπί επάνω από το tab (το ~). Μπορείτε να το αλλάξετε σε F12\. Θα κατεβαίνει λοιπόν ένα παράθυρο και χρησιμοποιείτε το terminal.  

* [User Themes](https://extensions.gnome.org/extension/19/user-themes/): Ενεργοποιεί την φόρτωση θεμάτων από τον κατάλογο του χρήστη.  

* [Impatience](https://extensions.gnome.org/extension/277/impatience/): Επιταχύνει το animation.  

* [Application Menu](https://extensions.gnome.org/extension/6/applications-menu/): Τοποθετεί τις εφαρμογές αντί για το Δραστηριότητες. Υπάρχει και το αντίστοιχο με του Cinnamon menu που λέγεται [Gno-Menu](https://extensions.gnome.org/extension/608/gnomenu/). Χρησιμοποιείστε όποιο σας βολέψει.  
Επίσης αντί για τα πάνω, μπορείτε να χρησιμοποιήσετε το [TaskBar](https://extensions.gnome.org/extension/584/taskbar/). Τοποθετεί μια μπάρα δίπλα στις δραστηριότητες όπου μπορείτε να βάλετε εφαρμογές από το dash (favourites), εφαρμογές που εκτελούνται, εικονίδιο που εμφανίζει την επιφάνεια εργασίας κλπ.  

* [Trash](https://extensions.gnome.org/extension/48/trash/): όταν διαγράφετε ένα αρχείο, αυτό πάει στον κάδο ανακύκλωσης. Όταν υπάρχουν αρχεία προς άδειασμα από τον κάδο, εμφανίζεται επάνω δεξιά, ένας κάδος ανακύκλωσης που σας ενημερώνει ότι έχετε αρχεία προς διαγραφή. Είναι αρκετά χρήσιμο.  

* [EasyScreenCast](https://extensions.gnome.org/extension/690/easyscreencast/): το GNOME μπορεί να εγγράψει το desktop σας σε ένα βίντεο με την χρήση των πλήκτρων **ALT+CONTRL+SHIFT+R**. Με το πρόσθετο αυτό μπορείτε να έχετε περισσότερες ρυθμίσεις σχετικά με την λειτουργία αυτή του GNOME.  

* [Activities Configurator](https://extensions.gnome.org/extension/358/activities-configurator/): με αυτό το πρόσθετο, μπορείτε να αλλάξετε την λέξη Δραστηριότητες επάνω αριστερά με αυτήν της αρεσκείας σας ή ακόμα και με εικονίδιο (πχ της διανομής σας). Επίσης μπορείτε να κάνετε διαφανή την μπάρα (όπως το παραπάνω πρόσθετο που κάνει μόνο αυτό).  

