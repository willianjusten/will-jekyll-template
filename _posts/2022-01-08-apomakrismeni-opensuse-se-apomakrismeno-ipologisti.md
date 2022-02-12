---
layout: post
title: "Εγκατάσταση openSUSE σε απομακρυσμένο υπολογιστή"
date: 2022-01-08 12:00:00
description: Πως γίνεται εγκατάσταση του openSUSE σε απομακρυσμένο υπολογιστή; Μια λύση είναι το VNC και η άλλη το ssh.
tags:
- openSUSE
- εγκατάσταση
- απομακρυσμένη
- remote
- ρυθμίσεις
categories:
- openSUSE
- Απομακρυσμένη
- Remote
twitter_text: 'Εγκατάσταση openSUSE σε απομακρυσμένο υπολογιστή'
---

![openSUSE](/post_images/opensuse/small-lamp.jpg "openSUSE"){:height="200px" width="200px"}


# ΠΡΟΒΛΗΜΑ
========

Είστε γνώστης του λειουργικού Linux και εδώ και ένα χρόνο έχετε "πρήξει" τον φίλο σας πόσο καλό είναι, έτσι ώστε να το εγκαταστήσει και αυτός. Όμως είναι ανένδοτος παραθυράς.  
  
Σας τυχαίνει μια θέση εργασίας που είναι μακρυά από τον τόπο κατοικίας σας (είτε στην ίδια χώρα είτε σε άλλη). Προφανώς δέχεστε και μετακομίζετε.  
  
Αφού έχετε τακτοποιήσει τη ζωή σας, δέχεστε ένα τηλέφωνο από τον φίλο σας και σας λέει να εγκαταστήσετε γι'αυτόν μια διανομή Linux στον υπολογιστή του. Τώρα φίλε μου είναι αργά....  
  
**ΗΘΙΚΟ ΔΙΔΑΓΜΑ:** Εάν έχετε ένα φίλο που ασχολείται με το άθλημα και εσείς του απαντάτε κάτι του στυλ: "Μου αρέσουν πολύ τα Linux και η όλη φιλοσοφία. Όταν πάρω νέο laptop θα σου δώσω το παλιό να μου περάσεις τα Linux για να πειραματιστώ" ([δείτε και άλλες παρόμοιες δικαιολογίες](https://eiosifidis.blogspot.com/2017/01/megaluteres-kotsanes-ever.html)), τότε μην περιμένετε ποτε θα πάρετε το νέο laptop. Μπορεί να ΜΗΝ αγοράσετε ΠΟΤΕ νέο laptop. Μπορεί όταν το πάρετε, ο φίλος σας να έχει μετακομίσει ή απλά να μην έχει και τόσο ελεύθερο χρόνο να σας διαθέσει αφού μπορεί να έχει κάνει οικογένεια.  
  
THE END...  
  
Ο λόγος του άρθρου αυτού είναι δεν καταλήγει στο παραπάνω δίδαγμα. Θα δείξουμε πως μπορεί κάποιος να κάνει εγκατάσταση openSUSE σε απομακρυσμένο υπολογιστή.  
  
**ΤΙ ΘΑ ΧΡΕΙΑΣΤΕΙ**  

*   Υπολογιστής (host) που θα γίνει η εγκατάσταση  
*   Λήψη του DVD εγκατάστασης [openSUSE](https://www.opensuse.org/) (είτε [Leap](https://get.opensuse.org/leap), είτε [Tumbleweed](https://get.opensuse.org/tumbleweed))  
*   Ένα στικάκι 8GB+  
*   Υπολογιστής (remote)  
*   Να προηγηθεί το ξεκαθάρισμα του χώρου που θα εγκατασταθεί (αν είναι dual boot τότε να γίνει χώρος μέσα από τα Windows. Μπορεί και από το Linux αλλά χρειάζεται να έχει προηγηθεί defragment)  
*   Να υπάρχει γνώση πως κάνουμε port forward στο router  

## ΠΡΟΕΤΟΙΜΑΣΙΑ

* Λήψη του DVD εγκατάστασης [openSUSE](https://www.opensuse.org/) (είτε [Leap](https://get.opensuse.org/leap), είτε [Tumbleweed](https://get.opensuse.org/tumbleweed)).  
  
* Επειδή το DVD είναι περίπου 4.5GB θα χρειαστεί ένα στικάκι από 8GB και πάνω. Μπορείτε να περάσετε το ISO στο USB με 2 τρόπους. Ο ένας είναι με τη [χρήση του Etcher](https://www.balena.io/etcher/), ενώ ο άλλος είναι με τη [χρήση του Ventoy](https://www.ventoy.net/). Προσωπικά προτιμώ το Ventoy γιατί μπορώ να βάλω στο στικάκι και άλλες διανομές. Να μην πάει χαμένος χώρος. Εσείς επιλέξτε ότι σας βολεύει.  
  
* Εάν έχετε BIOS, αγνοήστε αυτό το βήμα. Απενεργοποιείστε το **Secure Boot** ενώ μπορείτε να αφήσετε το **UEFI**.  
  
* Εάν δεν κάνετε εγκατάσταση dual boot (Windows και Linux), τότε αγνοήστε. Πρέπει να φτιάξετε τα partitions μέσα από τα windows. Ανοίξτε το Disk Management και επιλέξτε τον δίσκο που θα κάνετε εγκατάσταση το Linux. Εκεί θα πρέπει να μικρύνετε το partition και να φτιάξετε ένα νέο partition.  
  
* Κάνετε εκκίνηση του υπολογιστή από το USB. Επιλέξτε Installation.  

![Ετοιμασία για εγκατάσταση με VNC](/post_images/opensuse/vnc-ssh/vnc-installation.png "Ετοιμασία για εγκατάσταση με VNC")
  
* Εκεί θα πρέπει να γράψετε τα εξείς:  

{% highlight ruby %}
netsetup=1 vnc=1
{% endhighlight %}

![Παράμετροι για εγκατάσταση με VNC](/post_images/opensuse/vnc-ssh/vnc-installation-values.png "Παράμετροι για εγκατάσταση με VNC")
  
Ας αναλύσουμε το παραπάνω.  

## ΔΙΚΤΥΟ

### **netsetup=τιμη**  

Εδώ ουσιαστικά ενεργοποιούμε το δίκτυο στην εγκατάσταση. Με την τιμή 1, απλά του λέμε ότι θέλουμε να το ενεργοποιήσουμε. Σε επόμενη φάση, θα μας ρωτήσει αν θέλουμε να ρυθμιστεί αυτόματα το DHCP.  

![Ερώτηση για αυτόματη ρύθμιση DHCP](/post_images/opensuse/vnc-ssh/vnc-question-dhcp.png "Ερώτηση για αυτόματη ρύθμιση DHCP")

Άλλες τιμές είναι οι εξής:  
- **netsetup=dhcp**: Εδώ του λέμε ότι θέλουμε να γίνει αυτόματη λήψη στοιχείων μέσω DHCP. Θα εμφανιστεί η παρακάτω οθόνη, και θα συνεχίσει η διαδικασία.  

![Αυτόματη λήψη ρυθμίσεων DHCP](/post_images/opensuse/vnc-ssh/vnc-enable-dhcp.png "Αυτόματη λήψη ρυθμίσεων DHCP")

- **netsetup=-dhcp**: Εδώ του λέμε ότι θέλουμε να εισάγουμε εμείς τις ρυθμίσεις δικτύου. Θα εμφανιστεί η παρακάτω οθόνη, και θα συνεχίσει η διαδικασία.  

![Χειροκίνητη εισαγωγή ρυθμίσεων DHCP](/post_images/opensuse/vnc-ssh/vnc-manual-dhcp.png "Χειροκίνητη εισαγωγή ρυθμίσεων DHCP")

Εκτός της IP, θα σας ζητήσει και την διεύθυνση geteway, name server.  
  
## VNC

### **vnc=1**  
Εδώ ουσιαστικά ενεργοποιούμε τον VNC server κατά την εγκατάσταση. Θα μας εμφανιστεί η οθόνη για να εισάγουμε το συνθηματικό.  

![Εισαγωγή συνθηματικού για το VNC](/post_images/opensuse/vnc-ssh/vnc-password.png "Εισαγωγή συνθηματικού για το VNC")

Αυτό μπορεί να μην εμφανιστεί εάν εισάγετε το συνθηματικό (πχ opensuse) στην αρχή. Δηλαδή εάν δώσετε την εντολή:

{% highlight ruby %}
vnc=1 vncpassword=opensuse
{% endhighlight %}

Τελικά, θα καταλήξετε στην παρακάτω οθόνη.  

![Το σύστημα openSUSE είναι έτοιμο για εγκατάσταση](/post_images/opensuse/vnc-ssh/vnc-network.png "Το σύστημα openSUSE είναι έτοιμο για εγκατάσταση")
  
* [Port foward](https://portforward.com/) στο Router σας. Ποιες πόρτες πρέπει να ανοίξουν; Για αρχή πρέπει να ανοίξετε τις **TCP 5901** και **TCP 5801** για την διεπαφή μέσω browser. Όπως βλέπετε στην παραπάνω φωτογραφία, λέει ότι θα χρησιμοποιηθεί η πόρτα **TCP 5801**.  
  
Εάν δεν θέλετε να στέλνετε την εξωτερική σας IP (δεν συνίσταται), καλό είναι να στήσετε ένα ddns και να δώσετε αυτό στον φίλο σας.  
  
* Αφού δώσετε στον φίλο σας την εξωτερική IP σας (ή το ddns), τον κωδικό που εισάγατε στο vnc, τότε αυτός ξεκινάει την δράση.  
  
**Υπάρχουν δυο επιλογές:**  
- Η πρώτη επιλογή είναι να χρησιμοποιήσει το vnc από τερματικό. Αν ο απομακρυσμένος υπολογιστής είναι ubuntu, πρέπει να εγκαταταθεί ένα προγραμματάκι:  

{% highlight ruby %}
sudo apt install gvncviewer
{% endhighlight %}

Αφού ανοίξει το τερματικό και θα δώσει (αν η IP είναι η 192.168.1.100 όπως την θέσαμε παραπάνω):  

{% highlight ruby %}
**Για Ubuntu:**  
gvncviewer 192.168.1.100:1  
  
**Για openSUSE:**  
vncviewer 192.168.1.100:1
{% endhighlight %}

Η παραπάνω πόρτα είναι η 5801.  

![Σύνδεση με VNC για εγκατάσταση openSUSE](/post_images/opensuse/vnc-ssh/vnc-vncviewer-connect.png "Σύνδεση με VNC για εγκατάσταση openSUSE")

  
Αφού εισάγει το συνθηματικό που ορίστηκε στην αρχή στο σύστημα host, τότε περιμένει να γίνει η σύνδεση και θα δεί την παρακάτω εικόνα.  

![Εκκίνηση εγκατάστασης openSUSE μέσω VNC](/post_images/opensuse/vnc-ssh/vnc-vncviewer-install.png "Εκκίνηση εγκατάστασης openSUSE μέσω VNC")

Εδώ βλέουμε στα δεξιά το απομακρυσμένο σύστημα (είναι σε VirtualBox για τις δοκιμές ώστε να γραφτεί το άρθρο), στα αριστερά είναι το τερματικό του απομακρυσμένου υπολογιστή και στο κέντρο είναι αυτό που βλέπει ο απομακρυσμένος χρήστης για να προχωρήσει στην εγκατάσταση.  
  
- Αντίστοιχα, μπορεί να ανοίξετε το Gnome-boxes και να δημιουργήσει νέα σύνδεση σε απομακρυσμένο υπολογιστή. Στο παράθυρο που θα ανοίξει, πληκτρολογεί:  

{% highlight ruby %}
vnc://192.168.1.100:5901
{% endhighlight %}

![Σύνδεση μέσω gnome boxes](/post_images/opensuse/vnc-ssh/vnc-boxes-connect.png "Σύνδεση μέσω gnome boxes")

Και αφού εισάγει το συνθηματικό του vnc του host, τότε θα συνδεθεί.  

![Εγκατάσταση openSUSE με χρήση gnome boxes](/post_images/opensuse/vnc-ssh/vnc-boxes-install.png "Εγκατάσταση openSUSE με χρήση gnome boxes")

- Πιο όμορφο είναι μέσω browser. Όπως μας έχει πει παραπάνω, πρέπει να μπορεί να εκτελεί προγράμματα Java. Εδώ πρέπει να χρησιμοποιήσει την IP διεύθυνση που δώσατε κατά την ρύθμιση DHCP (192.168.1.100):  

{% highlight ruby %}
192.168.1.100:5801
{% endhighlight %}

![Σύνδεση μέσω browser](/post_images/opensuse/vnc-ssh/vnc-browser.png "Σύνδεση μέσω browser")

Εδώ πατάει σύνδεση και του ζητείται το συνθηματικό.  

![Εισαγωγή συνθηματικού για εγκατάσταση μέσω browser](/post_images/opensuse/vnc-ssh/vnc-browser-connect.png "Εισαγωγή συνθηματικού για εγκατάσταση μέσω browser")

Και καταλήγουμε στην εικόνα να ξεκινήσουμε την εγκατάσταση.  

![Εγκατάσταση openSUSE μέσω browser](/post_images/opensuse/vnc-ssh/vnc-browser-install.png "Εγκατάσταση openSUSE μέσω browser")

## BONUS ssh

Η εγκατάσταση μπορεί να γίνει και μέσω ssh. Είναι προτιμότερη μέσω ssh δίοτι είναι πιο ασφαλές περιβάλλον. Πως γίνεται αυτό; Ουσιαστικά είναι ίδια διδικασία. Κατά την έναρξη, δίνετε τα παρακάτω:  

{% highlight ruby %}
netsetup=1 ssh=1 ssh.password=opensuse
{% endhighlight %}

![Ρύθμιση openSUSE για εγκατάσταση με ssh](/post_images/opensuse/vnc-ssh/ssh-values-net.png "Ρύθμιση openSUSE για εγκατάσταση με ssh")

Με την ίδια λογική για το netsetup. Το έχω δοκιμάσει και χωρίς το netsetup και δουλεύει μια χαρά.  
  
- **ssh=1**: Ενεργοποιεί την εγκατάσταση μέσω ssh.  
  
- **ssh.password=κωδικός**: Καθορίζει το συνθηματικό SSH του χρήστη root για την εγκατάσταση.  
  
![Έτοιμο σύστημα για σύνδεση μέσω ssh](/post_images/opensuse/vnc-ssh/ssh-network.png "Έτοιμο σύστημα για σύνδεση μέσω ssh")

Και τώρα θα δούμε επίσης 2 τρόπους.  
  
**1ος τρόπος: GNOME-BOXES**  
  
Στο Gnome Boxes πρέπει να δημιουργήσει νέα σύνδεση σε απομακρυσμένο υπολογιστή. Στο παράθυρο που θα ανοίξει, πληκτρολογεί:  

![Σύνδεση μέσω GNOME boxes](/post_images/opensuse/vnc-ssh/ssh-gnome-boxes-connect.png "Σύνδεση μέσω GNOME boxes")

Θα ανοίξει ένα παράθυρο, όπου πρέπει να αποδεχτεί το κλειδί και να πληκτρολογήσει το συνθηματικό (είχαμε δώσει opensuse).  

![Εισαγωγή συνθηματικού και είσοδος στο openSUSE μέσω gnome boxes](/post_images/opensuse/vnc-ssh/ssh-gnome-boxes-password.png "Εισαγωγή συνθηματικού και είσοδος στο openSUSE μέσω gnome boxes")

Στη συνέχεια για να ξεκινήσει η εγκατάσταση, βλέπουμε τι μας λέει και εκτελούμε την εντολή:  

{% highlight ruby %}
yast.ssh
{% endhighlight %}

![Εγκατάσταση openSUSE με βοήθεια του yast](/post_images/opensuse/vnc-ssh/ssh-gnome-boxes-install.png "Εγκατάσταση openSUSE με βοήθεια του yast")

**2ος τρόπος: Τερματικό**  
  
Στο τερματικό εκτελούμε την παρακάτω εντολή:  

{% highlight ruby %}
ssh root@IP
{% endhighlight %}

Θα μας ζητήσει το συνθηματικό και θα μπούμε. Επόμενο βήμα να εκτελέσουμε την εντολή:  

{% highlight ruby %}
yast.ssh
{% endhighlight %}

![Είσοδος με χρήση ssh μεσω τερματικού εγκατάσταση openSUSE](/post_images/opensuse/vnc-ssh/ssh-terminal-yast.png "Είσοδος με χρήση ssh μεσω τερματικού εγκατάσταση openSUSE")


Και είμαστε έτοιμοι να εγκαταστήσουμε το openSUSE.  

![Εγκατάσταση με χρήση ssh μέσω τερματικού και εγκατάσταση openSUSE](/post_images/opensuse/vnc-ssh/ssh-terminal-install.png "Εγκατάσταση με χρήση ssh μέσω τερματικού και εγκατάσταση openSUSE")

Για το πως θα γίνει η εγκατάσταση, υπάρχουν πολλοί οδηγοί στην σελίδα μου αλλά μπορείτε να [βρείτε και εδώ](https://opensuse-guide.org/installation.php).  
  
Πηγές για περισσότερη μελέτη:  
1. Wiki [https://en.opensuse.org/SDB:Remote\_installation](https://en.opensuse.org/SDB:Remote_installation).   
2. Παράμετροι για την εκκίνηση [https://doc.opensuse.org/documentation/leap/startup/html/book-startup/cha-boot-parameters.html](https://doc.opensuse.org/documentation/leap/startup/html/book-startup/cha-boot-parameters.html) 

  
Αρχική δημοσίευση:  
[https://eiosifidis.blogspot.com/2021/09/apomakrismeni-opensuse-se-apomakrismeno-ipologisti.html](https://eiosifidis.blogspot.com/2021/09/apomakrismeni-opensuse-se-apomakrismeno-ipologisti.html)
