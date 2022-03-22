---
layout: post
title: "Τρόποι σύνδεσης από Linux, σε εικονική μηχανή Windows στην υπηρεσία ~okeanos"
date: 2022-03-10 12:00:00
description: Η υπηρεσία ~okeanos παρέχει εικονικούς server στην πανεπιστημιακή κοινότητα. Εδώ θα δούμε πως συνδεόμαστε σε Windows server από υπολογιστή με Linux
tags:
- MySQL
- workbench
- εγκατάσταση
- MariaDB
- Docker
categories:
- MySQL
- Εγκατάσταση
- Workbench
- MariaDB
- Docker
twitter_text: 'Τρόποι σύνδεσης από Linux, σε εικονική μηχανή Windows στην υπηρεσία ~okeanos'
---

![~okeanos logo](/post_images/okeanos/okeanos.png "~okeanos logo"){:height="79px" width="450px"}

Η υπηρεσία [~okeanos](https://okeanos.grnet.gr/) είναι υπηρεσία που καλείται Synnefo. Το [Synnefo](http://www.synnefo.org/) είναι λογισμικό ανοιχτού κώδικα cloud, που σχεδιάστηκε και αναπτύχθηκε από το ΕΔΕΤ. Χρησιμοποιεί το [Google Ganeti](http://code.google.com/p/ganeti/) και άλλο λογισμικό ανοιχτού κώδικα τρίτων. Είχε σχεδιαστεί ως IaaS για παροχή εικονικού server σε όλους τους φοιτητές, ώστε να βοηθήσει την εκπαιδευτική διαδικασία. Στην πορεία των χρόνων, αυτό άλλαξε. Λόγω της μεγάλης ζήτησης, η υπηρεσία περιορίστηκε σε [διαφορετικά projects](https://accounts.okeanos.grnet.gr/ui/projects) όπου φιλοξενούν διάφορες εικονικές μηχανές.  
  
Αν και οι περισσότεροι servers στο διαδίκτυο είναι βασισμένοι σε Linux, παρόλα αυτά, υπάρχουν και μερικά μηχανήματα με Windows. Για το λόγο αυτό οι φοιτητές πρέπει να γνωρίζουν την χρήση τους ώστε να μπορούν να προσφέρουν τις υπηρεσίες τους, σε περίπτωση που κληθούν να διαχειριστούν τέτοιους servers. Γι'αυτό και στον ~okeanos θα βρούμε και την επιλογή για δημιουργία εικονικού server με Windows.  
  
Όταν δημιουργηθεί, πρέπει να συνδεθεί ο χρήστης με κάποιον τρόπο. Η επιλογή που δίνει η υπηρεσία είναι ένα αρχείο τύπου rdp ([Remote Desktop Protocol](https://en.wikipedia.org/wiki/Remote_Desktop_Protocol), ΣΗΜΕΙΩΣΗ: χρήση **port 3389**). Σε Windows 10, με διπλό κλικ και ζητάει να εισάγετε το συνθηματικό (που σας υπέδειξε κατά τη δημιουργία ο ~okeanos). Εισάγοντάς το, μπορείτε να διαχειριστείτε το περιβάλλον. Επίσης είναι **γνωστή η IP** που θα έχει ο εικονικός διακομιστής windows και ο χρήστης που δημιουργείται από προεπιλογή, είναι ο **Administrator**.  

# Όμως τι γίνεται εάν έχετε Linux;

Υπάρχουν κάποιες λύσεις τόσο γραφικά όσο και μέσω τερματικού.

## Τερματικό

Στο τερματικό χρησιμοποιήστε το πρόγραμμα [rdesktop](http://www.rdesktop.org/).  
  
**ΕΓΚΑΤΑΣΤΑΣΗ** Η εγκατάσταση, ανάλογα με τη διανομή που έχετε, γίνεται με τον παρακάτω τρόπο:  

{% highlight ruby %}
# zypper install rdesktop \[σε openSUSE\]   
# pacman -S rdesktop \[σε Arch Linux\]   
# yum install rdesktop \[σε Fedora\]  
# dnf install rdesktop \[σε Fedora\]  
# apt install rdesktop \[σε Debian/Ubuntu\]
{% endhighlight %}
  
Στη συνέχεια, το μόνο που έχετε να κάνετε είναι να δώστε την εντολή:  

{% highlight ruby %}
rdesktop -g 1024x768 -u Administrator IP
{% endhighlight %}
  
* -g 1024x768 είναι η ανάλυση που θέλετε να έχετε.  
* **Administrator** είναι ο προεπιλεγμένος χρήστης  
* Όπου IP θα βάλετε την IP που πήρατε από την σελίδα του ~okeanos.  
  
**ΣΗΜΕΙΩΣΗ:** Επειδή οι επιθέσεις γίνονται πάνω στον χρήστη με το όνομα Administrator, καλό θα είναι να δημιουργήσετε έναν χρήστη με άλλο όνομα και δικαιώματα administrator. Με αυτό τον τρόπο θα είναι λίγο δύσκολο να βρουν τον χρήστη. Επίσης μην ξεχνάτε να εισάγετε ένα δύσκολο συνθηματικό.  
  
![Εισαγωγή συνθηματικού](/post_images/okeanos/rdesktop-password.png "Εισαγωγή συνθηματικού")

Αφού εισάγετε το συνθηματικό, θα ανοίξει η επιφάνεια εργασίας, όπου μπορείτε να δουλέψετε...  

![Απομακρυσμένη επιφάνεια εργασίας Windows](/post_images/okeanos/rdesktop-desktop.png "Απομακρυσμένη επιφάνεια εργασίας Windows")


## Γραφικό

Εδώ θα δούμε 3 τρόπους.  
  
### Gnome Connections

Παλιά συνδεόμουν με SSH με το GNOME Boxes. Τώρα νομίζω το έχουν αλλάξει και έχουν φτιάξει το [GNOME Connections](https://wiki.gnome.org/Apps/Connections). Το τελευταίο έχει συνδέσεις με το RDP και VNC.  
  
**ΕΓΚΑΤΑΣΤΑΣΗ**  
  
Η εγκατάσταση, ανάλογα με τη διανομή που έχετε, γίνεται με τον παρακάτω τρόπο:  

{% highlight ruby %}
# zypper in gnome-connections \[σε openSUSE\]  
# pacman -S gnome-connections \[σε Arch Linux\]
{% endhighlight %}
  
**Flatpak**  
Για όλες τις διανομές.  

{% highlight ruby %}
Αν δεν έχετε εγκατεστημένο το flatpak:  
flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo  
  
flatpak install org.gnome.Connections
{% endhighlight %}
  
**Χρήση**  
Από την υπηρεσία ~okeanos, έχουμε λάβει μια IP που ακούει το εικονικό μηχάνημα, ξέρουμε την πόρτα που ακούει, την _3389_ (αν και δεν θα χρειαστεί εδώ), ξέρουμε τον χρήστη που είναι ο **Administrator** καθώς και το συνθηματικό που μας έδωσε κατά την εγκατάσταση.  
  
Ανοίγουμε το GNOME Connections και εισάγουμε την IP με επιλεγμένο το RDP.  

![GNOME Connections νέα σύνδεση](/post_images/okeanos/connections-new.png "GNOME Connections νέα σύνδεση")

Στη συνέχεια θα ζητήσει να εισάγετε τον χρήστη (Administrator) και το συνθηματικό.  

![GNOME Connections εισαγωγή συνθηματικού](/post_images/okeanos/connections-credentials.png "GNOME Connections εισαγωγή συνθηματικού")

Αφού τα εισάγετε, περιμένετε να συνδεθεί.  

![GNOME Connections αναμονή για είσοδο στα Windows](/post_images/okeanos/connections-connecting.png "GNOME Connections αναμονή για είσοδο στα Windows")

Και αφού εισέλθετε στα Windows, μπορείτε να χρησιμοποιήσετε κανονικά το σύστημα.  

![GNOME Connections επιφάνεια εργασίας Windows](/post_images/okeanos/connections-desktop.png "GNOME Connections επιφάνεια εργασίας Windows")

### Remmina

Το λογισμικό [Remmina](https://remmina.org/) χρησιμοποιείται για απομακρυσμένη σύνδεση, είτε με VNC, είτε με SSH αλλά και με RDP.  
  
**ΕΓΚΑΤΑΣΤΑΣΗ**  
  
Η εγκατάσταση, ανάλογα με τη διανομή που έχετε, γίνεται με τον παρακάτω τρόπο:  

{% highlight ruby %}
# zypper in remmina remmina-plugin-rdp remmina-plugin-vnc remmina-plugin-www \[σε openSUSE\]  
# pacman -S remmina libvncserver freerdp \[σε Arch Linux\]
{% endhighlight %}
  
**Flapak**  
Για όλες τις διανομές.  

{% highlight ruby %}
Αν δεν έχετε εγκατεστημένο το flatpak:  
flatpak remote-add --user --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo  
  
# Για να έχετε τα codecs H.264 flatpak install org.freedesktop.Platform  
flatpak install org.freedesktop.Platform.openh264  
flatpak install --user flathub org.remmina.Remmina  
flatpak run --user org.remmina.Remmina
{% endhighlight %}
  
**Snap**  
Για διανομές Ubuntu based ή που χρησιμοποιούν snap.  

{% highlight ruby %}
# sudo snap install remmina
{% endhighlight %}
  
**Χρήση**  
Η υπηρεσία ~okeanos μας έχει δώσει ένα αρχείο .rdp. Πατώντας διπλό κλικ επάνω του, ανοίγει το πρόγραμμα Remmina. Θα χρειαστεί να εισάγουμε αρχικά το συνθηματικό (το έχουμε λάβει και αυτό κατά την δημιουργία).  

![Remmina: Προτροπή για συνθηματικό](/post_images/okeanos/remmina-connect.png "Remmina: Προτροπή για συνθηματικό")

Αφού εισάγουμε το συνθηματικό, θα περιμένουμε να μπει.  

![Remmina: Συνδέθηκε στα windows](/post_images/okeanos/remmina-connected.png "Remmina: Συνδέθηκε στα windows")

Δυστυχώς δεν βρήκα πως μπορώ να φτιάξω την ανάλυση (ο υπολογιστής μου δεν έχει και την καλύτερη κάρτα γραφικών). Πιθανό να μπορώ να το κάνω στις ρυθμίσεις του Remmina αλλιώς μπορώ να αλλάξω την ανάλυση από τα windows. Η εικόνα έχει ληφθεί από το πρόγραμμα Remmina.  

![Remmina: Απομακρυσμένη επιφάνεια εργασίας Windows](/post_images/okeanos/remmina.png "Remmina: Απομακρυσμένη επιφάνεια εργασίας Windows")

### Vinagre

Το πρόγραμμα [Vinagre](https://wiki.gnome.org/Apps/Vinagre) είναι προεγκατεστημένο στο GNOME. Εδώ πρέπει να εισάγουμε τα στοιχεία για να συνδεθούμε. Πρέπει να εισάγουμε την IP που έχουμε λάβει από την υπηρεσία ~okeanos, τον Administrator.  
  
![Vinagre: Eισαγωγή στοιχείων σύνδεσης](/post_images/okeanos/Vinagre-connect.png "Vinagre: Eισαγωγή στοιχείων σύνδεσης")

Με την σύνδεση, θα σταλεί το πιστοποιητικό το οποίο πρέπει να αποδεχτούμε.  

![Vinagre: αποδοχή πιστοποιητικού](/post_images/okeanos/Vinagre-auth.png "Vinagre: αποδοχή πιστοποιητικού")

Και τέλος θα μας ζητηθεί να εισάγουμε το συνθηματικό μας.  

![Vinagre: Εισαγωγή συνθηματικού](/post_images/okeanos/Vinagre-password.png "Vinagre: Εισαγωγή συνθηματικού")

Αν έχετε καταφέρει να συνδεθείτε με άλλο πρόγραμμα, αφήστε ένα μήνυμα για να συμπεριληφθεί και αυτό στο άρθρο ώστε να είναι πιο πλήρες.
 
Αρχική δημοσίευση:  
[https://eiosifidis.blogspot.com/2022/03/linux-sindesi-rdp-okeanos.html](https://eiosifidis.blogspot.com/2022/03/linux-sindesi-rdp-okeanos.html)
