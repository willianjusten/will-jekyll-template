---
layout: post
title: "Αυτόματη εγκατάσταση openSUSE με χρήση του autoyast"
date: 2022-02-08 12:00:00
description: Η εγκατάσταση του openSUSE είναι εύκολη διαδικασία. Όμως γίνεται ακόμα ευκολότερη με τη χρήση του autoyast. Γίνεται αυτόματα, χωρίς χέρια!!!
tags:
- openSUSE
- εγκατάσταση
- αυτόματη
- aytoyast
categories:
- openSUSE
- Εγκατάσταση
- Αυτόματη
- Autoyast
twitter_text: 'Αυτόματη εγκατάσταση openSUSE με χρήση του autoyast'
---

![openSUSE](/post_images/opensuse/opensuse-logo.png "openSUSE"){:height="201px" width="320px"}

# ΠΡΟΒΛΗΜΑ

Έστω ότι έχετε να εγκαταστήσετε πολλούς ίδιους υπολογιστές σε ένα εργαστήριο ή μια εταιρία. Ο παραδοσιακός τρόπος σκέψης είναι είτε να βάλετε να εγκαθίστανται οι υπολογιστές ανά 2 (ώστε να τους προσέχετε), είτε να εγκαταστήσετε ένα υπολογιστή, έτσι όπως το θέλετε (με προγράμματα κλπ), στη συνέχεια να πάρετε το image του δίσκου με το clonezilla ([δείτε πως](https://eiosifidis.blogspot.com/2009/08/clonezilla.html)) και να το περάσετε στους άλλους υπολογιστές.  
  
Ο πιο έξυπνος τρόπος είναι να κάνετε όλη αυτή τη διαδικασία με τη χρήση του [autoyast](https://doc.opensuse.org/projects/autoyast/).  
  
Εδώ θα δούμε αρχικά πως δημιουργείται το αρχείο **autoinst.xml** και στη συνέχεια πως γίνεται η εγκατάσταση χωρίς χέρια.  
  
## ΕΓΚΑΤΑΣΤΑΣΗ autoyast

Πρώτα πρέπει να εγκαταστήσουμε το module.  

{% highlight ruby %}
sudo zypper in autoyast2 autoyast2-installation
{% endhighlight %}

## ΔΗΜΙΟΥΡΓΙΑ ΑΡΧΕΙΟΥ autoinst.xml

Η δημιουργία μπορεί να γίνει με 2 τρόπους. Ο ένας είναι να ξεκινήσετε να γράφετε μόνοι σας το αρχείο αυτό με τη χρήση της τεκμηρίωσης. Δεν το συνιστούμε, γιατί θα πάρει πάρα πολύ χρόνο με τις δοκιμές. Ο άλλος πιο εύκολος τρόπος είναι να εγκαταστήσετε έναν υπολογιστή με [openSUSE](https://www.opensuse.org/) ([Leap](https://get.opensuse.org/leap) ή [Tumbleweed](https://get.opensuse.org/tumbleweed)) και στη συνέχεια να εκτελέσετε μια εντολή, ώστε να λάβετε το αρχείο που θα δημιουργηθεί. Πάμε να δούμε πως γίνεται αυτό και ποιες ιδιαιτερότητες έχει.  
  
Ανοίξτε τερματικό και δώστε την εντολή:  

{% highlight ruby %}
sudo yast2 clone_system
{% endhighlight %}

Όπως λέει και η οθόνη, το αποτέλεσμα, θα βρεθεί στον κατάλογο **/root/autoinst.xml**.  

![Δημιουργία autoinst.xml](/post_images/opensuse/autoyast/autoinstall-initial.png)

Πρέπει να περιμένετε λίγο γιατί κλωνοποιεί όλο το σύστημά σας.  

![Αναμονή για δημιουργία του aytoinst.xml](/post_images/opensuse/autoyast/autoinstall-wait.png)

Μια εναλλακτική λύση είναι η εντολή:  

{% highlight ruby %}
/sbin/yast2 autoyast
{% endhighlight %}

Θα σας ανοίξει το γραφικό YaST για να κάνετε τις ρυθμίσεις και μετά να αποθηκεύσετε.  

![YaST δημιουργία του αρχείου autoinst.xml](/post_images/opensuse/autoyast/autoyast-gui.png)

Επειδή κατά την εγκατάσταση, μπορεί να σας ρωτήσει (δείτε παρακάτω φωτογραφία) για κάποια GPG κλειδιά πχ από το Packman ή άλλα αποθετήρια, μπορείτε να ρυθμίσετε εδώ να τα αποδέχεστε. Μπορείτε να πάρετε και να επεξεργαστείτε το αρχείο, σύμφωνα με τα δεδομένα σας και με ένα απλό επεξεργαστή κειμένου. Απλά δείτε στην τεκμηρίωση που είναι αυτό που θέλετε να αλλάξετε. Υπάρχουν κάποια σημεία που πρέπει να δούμε πιο προσεκτικά, αλλά θα τα εξηγηθούν προς το τέλος.  
  
## ΕΓΚΑΤΑΣΤΑΣΗ ΜΕ ΧΡΗΣΗ ΑΡΧΕΙΟΥ autoinst.xml


Ξεκινήστε τον υπολογιστή με το DVD του [openSUSE](https://www.opensuse.org/) ([Leap](https://get.opensuse.org/leap) ή [Tumbleweed](https://get.opensuse.org/tumbleweed)). Στην οθόνη που εμφανίζεται, πατήστε τα βελάκια να μετακινηθείτε στο **Installation**. Στο πλαίσιο γράψτε την παρακάτω εντολή.  

{% highlight ruby %}
netsetup=1 autoyast=https://raw.githubusercontent.com/iosifidis/dot-files/master/openSUSE/autoinst-t.xml
{% endhighlight %}
 
![Εγκατάσταση με autoyast](/post_images/opensuse/autoyast/autoyast-install.png)

Στην παραπάνω εικόνα, να σημειώσουμε τα εξής:  
  
* Χρησιμοποιείται η έκδοση openSUSE Tumbleweed.  
* Ξεκινάει το δίκτυο με το netsetup=1. Θα μας ρωτήσει εάν θέλουμε να ρυθμίσουμε μόνοι μας το δίκτυο ή να πάρει τις ρυθμίσεις από τον DHCP.  
* Γίνεται χρήση ενός αρχείου από το github. Ποιες είναι πιο σημαντικές τιμές που παίρνει η παράμετρος autoyast;  
  
- **autoyast=usb:///PATH**: Ανακτά το αρχείο ελέγχου από συσκευές USB (το autoyast θα αναζητήσει όλες τις συνδεδεμένες συσκευές USB).  
- **autoyast=https://[user:password@]SERVER/PATH**: Ανακτά το αρχείο ελέγχου από έναν διακομιστή με χρήση HTTPS. Το όνομα χρήστη και το συνθηματικό είναι προαιρετικά.  
  
Περιμένετε λοιπόν να τελειώσει. Θα κάνει και επανεκκίνηση να ξέρετε. Και είστε έτοιμοι.  

![Autoyast κατά την εγκατάσταση](/post_images/opensuse/autoyast/autoyast-installing.png)

## ΠΙΘΑΝΑ ΠΡΟΒΛΗΜΑΤΑ

* **Ερωτήματα κατά την εγκατάσταση**  
  
Όπως ειπώθηκε, αν έχετε προσθέσει και αποθετήρια που είναι εκτός openSUSE, θα ερωτηθείτε εάν αποδέχεστε το κλειδί. Οπότε έτσι "διακόπτεται" η εγκατάσταση χωρίς χέρια.  

![Αποδοχή Untrusted GnuPG key](/post_images/opensuse/autoyast/autoyast-untrusted.png)

Μπορείτε όμως να τα αλλάξετε, όπως είπαμε παραπάνω.  
  
* **Χρήστης και συνθηματικό**  
  
Εάν ο σχεδιασμός των μαζικών εγκαταστάσεων απαιτεί ο κάθε υπολογιστής να έχει διαφορετικό χρήστη, τότε δεν εξυπηρετεί και τόσο. Για να δούμε λίγο τα πράγματα αναλυτικά.  
  
Στο παραπάνω [αρχείο](https://github.com/iosifidis/dot-files/blob/master/openSUSE/autoinst-t.xml), βλέπουμε την γραμμή:  

![Χρήστης autoyast](/post_images/opensuse/autoyast/autoyast-user.png)

Εδώ βλέπουμε τον χρήστη yolo και ως κωδικό βλέπουμε να είναι κρυπτογραφημένο το **suserocks** (πράγματι, το openSUSE rocks). Από την τεκμηρίωση βλέπουμε ότι μπορεί να μπει και χωρίς encryption.  
  
Το ίδιο θα βρείτε (με τον ίδιο κωδικό) και για τον χρήστη root. Όμως τι συμβαίνει αν τυχόν θέλουμε άλλον χρήστη; Αρχικά μπορείτε να αλλάξετε το αρχείο (αναζητείστε στο αρχείο για yolo και αντικαταστήστε με αυτό που θέλετε). Εναλλακτικά μπορείτε να κάνετε την εγκατάσταση, να μπείτε στον χρήστη root και να διαγράψετε τον χρήστη yolo. Στην συνέχεια φτιάξτε έναν χρήστη, όπως θέλετε εσείς.  
  
* **Κατατμήσεις**  
  
Το θέμα των κατατμήσεων είναι το μόνο που μπορεί να αντιμετωπίσετε πρόβλημα. Υπάρχουν πολλά σενάρια. Ένα σενάριο είναι να είναι παλιός υπολογιστής με bios. Άλλο ένα σενάριο είναι ο παλιός υπολογιστής να είναι dual boot. Το άλλο σενάριο είναι να είναι νέου τύπου υπολογιστής με UEFI και τέλος αυτός ο υποογιστής να είναι dual boot. Σε όλες αυτές τις περιπτώσεις φανταστείτε ότι ο χώρος στον δίσκο είναι διαφορετικός κάθε φορά (ειδικά στις περιπτώσεις dual boot) και έτσι θα χρειαστεί διαφορετικό αρχείο autoyast. Μπορείτε να μελετήσετε την τεκμηρίωση [εδώ](https://doc.opensuse.org/projects/autoyast/#CreateProfile-Partitioning) αλλά και από την SUSE [εδώ](https://documentation.suse.com/sles/15-SP2/html/SLES-all/cha-configuration-installation-options.html#CreateProfile-Partitioning).  
  
Στο αρχείο που βρήκατε παραπάνω, οι κατατμήσεις παρουσιάζονται παρακάτω:  

![Κατατμήσεις autoyast](/post_images/opensuse/autoyast/autoyast-partitions.png)
  
Να τα δούμε λίγο αναλυτικά:  
* Κατάτμηση root (/): με σύστημα αρχείων ext4 και χωρητικότητα 30GB.  
* Κατάτμηση swap: με χωρητικότητα 8GB.  
* Κατάτμηση home (/home): με σύστημα αρχείων ext4 και χωρητικότητα στο auto.  
  
Στην τεκμηρίωση αναφέρει ότι το autoyast μπορεί να δημιουργήσει τον προεπιλεγμένο τρόπο εγκατάστασης με το root με σύστημα αρχείων btrfs και το home με σύστημα XFS. Επίσης αναφέρει ότι σε περίπτωση που λείπει κάποια κατάτμηση, μπορεί να την δημιουργήσει αυτό. Επειδή δεν τα έχω δοκιμάσει, δεν μπορώ να εκφέρω γνώμη, αλλά για να το λέει στην επίσημη τεκμηρίωση, μάλλον θα ισχύει.  
  
Πηγές για περισσότερη μελέτη:  
1\. Τεκμηρίωση [https://doc.opensuse.org/projects/autoyast/](https://doc.opensuse.org/projects/autoyast/).  
2\. Παράμετροι για την εκκίνηση [https://doc.opensuse.org/documentation/leap/startup/html/book-startup/cha-boot-parameters.html](https://doc.opensuse.org/documentation/leap/startup/html/book-startup/cha-boot-parameters.html)

  
Αρχική δημοσίευση:  
[https://eiosifidis.blogspot.com/2021/09/automati-egatastasi-opensuse-me-autoyast.html](https://eiosifidis.blogspot.com/2021/09/automati-egatastasi-opensuse-me-autoyast.html)
