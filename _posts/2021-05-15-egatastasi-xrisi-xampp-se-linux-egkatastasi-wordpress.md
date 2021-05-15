---
layout: post
title: "Πλήρης οδηγός εγκατάστασης και χρήσης XAMPP σε Linux. Παράδειγμα εγκατάστασης Wordpress"
date: 2021-05-15 12:30:00
description: Η χρήση του XAMPP μας βοηθάει στην δοκιμή των σελίδων-εφαρμογών που δουλεύουμε. Πως μπορεί να γίνει εγκατάσταση σε Linux;
tags:
- xampp
- php
- apache
- mysql
- wordpress
- εγκατάσταση
- χρήση
- απεγκατάσταση
- virtual box
- docker
- τερματικό
categories:
- Virtual Box
- XAMPP
- MySQL
- PHP
- Apache
- Wordpress
twitter_text: 'Πλήρης οδηγός εγκατάστασης και χρήσης #XAMPP σε #Linux'
---

![XAMPP logo](/post_images/xampp/XAMPP_logo.png "XAMPP logo")


## Τι είναι το XAMPP  

Το [XAMPP](https://www.apachefriends.org/index.html) αποτελεί ένα πακέτο προγραμμάτων το οποίο περιέχει ένα **εξυπηρετητή ιστοσελίδων** (Apache), μια **βάση δεδομένων** (MySQL) και τις **γλώσσες προγραμματισμού** PHP και Perl. Αποτελεί εργαλείο ανάπτυξης και δοκιμής ιστοσελίδων τοπικά στον υπολογιστή χωρίς να είναι απαραίτητη η σύνδεση στο διαδίκτυο. Ενδείκνυται για δοκιμαστικές εγκαταστάσεις CMS ή άλλων παρόμοιων προγραμμάτων που κάνουν χρήση ενός διακομιστή, μιας βάσης δεδομένων και της γλώσσας PHP.  
  
### Πλεονεκτήματα - Μειονεκτήματα
  
Το ερώτημα που γεννιέται είναι αν είναι καλύτερο έναντι άλλων λύσεων, όπως του [virtual box](https://eiosifidis.blogspot.com/search/q=virtual+box), του docker ή άλλων λύσεων. 

Προσωπική άποψη, στο virtual box, πρέπει να εγκατασταθεί εκ νέου το λειτουργικό σύστημα host, μετά να ακολουθηθεί το tutorial εγκατάστασης του lamp server (Apache, MySQL, PHP) και αν δουλεύει καλά, τότε να δοκιμαστούν οι ιστοσελίδες. Αποτελεί μια πολύ καλή λύση εάν ο προγραμματιστής θέλει να μάθει-γνωρίσει και πως χειρίζεται ο διαχειριστής τον εξυπηρετητή. Δεν την θεωρώ μια πολύ καλή λύση για την εργασία που συζητάμε.  

Η λύση του Docker είναι πολύ καλύτερη γιατί προσομοιάζει τις συνθήκες των συστημάτων στην παραγωγή. Και σε αυτήν την περίπτωση χρειάζονται κάποιες μικρές εξειδικευμένες γνώσεις, που όμως δεν πιστεύω ότι είναι απαγορευτικές για τον προγραμματιστή. 

Στην λύση του XAMPP, δεν χρειάζεται κάποια ειδική γνώση. Όλα γίνονται με γραφικό περιβάλλον. Το καλό είναι ότι μπορεί να χρησιμοποιηθεί και στην εκπαιδευτική διαδικασία γιατί ο χρήστης μπορεί να εγκαταστήσει το XAMPP στο στικάκι του και να μπορεί να εκτελεστεί με τα ίδια αποτελέσματα τόσο σε υπολογιστή της εκπαιδευτικής δομής όσο και στον προσωπικό υπολογιστή στο σπίτι.  
  
### Εγκατάσταση

* Καταρχήν μεταβείτε στην [σελίδα των λήψεων](https://www.apachefriends.org/download.html) και κατεβάστε το αρχείο που είναι για το λειτουργικό Linux. Θα είναι ένα αρχείο με κατάληξη .run (έστω είναι το [xampp-linux-x64-8.0.5-0-installer.run](https://www.apachefriends.org/xampp-files/8.0.5/xampp-linux-x64-8.0.5-0-installer.run)).  

* Αφού κατέβει, μετακινηθείτε στον κατάλογο που έγινε η λήψη. Στη συνέχεια αλλάξτε τα δικαιώματα με την παρακάτω εντολή:  

{% highlight ruby %}
chmod +x xampp-linux-x64-8.0.5-0-installer.run
{% endhighlight %}

Στη συνέχεια εισάγετε την παρακάτω εντολή, ώστε να εκκινήσει η εγκατάσταση:

{% highlight ruby %}
sudo ./xampp-linux-x64-8.0.5-0-installer.run
{% endhighlight %}

* Πατήστε **Next** και περιμένετε:  

![Εγκατάσταση XAMPP](/post_images/xampp/2015-05-15/xampp-install-1.png "Εγκατάσταση XAMPP")

![Εγκατάσταση XAMPP](/post_images/xampp/2015-05-15/xampp-install-2.png "Εγκατάσταση XAMPP")

* Όταν τελειώσει η εγκατάσταση, πατήστε το κουμπί **Finish**.  

![Τερματισμός εγκατάστασης XAMPP](/post_images/xampp/2015-05-15/xampp-install-finish.png "Τερματισμός εγκατάστασης XAMPP")


Αυτό θα έχει ως αποτέλεσμα να ανοίξει το xampp. Αν βλεπετε την παρακάτω εικόνα, έχει ολοκηρωθεί επιτυχώς η εγκατάσταση.  

![XAMPP Manager](/post_images/xampp/2015-05-15/xampp-manager.png "XAMPP Manager")

* Αφού ανοίξει το xampp, καλό είναι να δοκιμάσετε εάν δουλεύει. Πως θα το κάνετε αυτό; Μετακινηθείτε στην καρτέλα **Manage Servers** όπου θα σας εμφανίσει τους servers που πρέπει να ενεργοποιήσετε.

![Διακομιστές XAMPP απενεργοποιημένοι](/post_images/xampp/2015-05-15/xampp-servers-disabled.png "Διακομιστές XAMPP απενεργοποιημένοι")

Επιλέξτε **Apache Web Server** και **MySQL Database** και πατήστε το **Start**. Θα πρέπει να βλέπετε την παρακάτω εικόνα: 

![Διακομιστές XAMPP απενεργοποιημένοι](/post_images/xampp/2015-05-15/xampp-servers-enabled.png "Διακομιστές XAMPP απενεργοποιημένοι")

* Αφού είναι ενεργά, ανοίξτε τον browser και γράψτε **localhost**. Θα πρέπει να βλέπετε την παρακάτω σελίδα: 

![XAMPP localhost](/post_images/xampp/2015-05-15/xampp-localhost.png "XAMPP localhost")

Για να κλείσετε το xampp, πρέπει να κλείσετε τους servers (επιλέξτε τους **Apache Web Server** και **MySQL Database** και πατήστε το Stop). 

### Εκκίνηση

Για να εκκινήσει ο xampp μπορείτε να το κάνετε με 3 τρόπους:  

**1. Τερματικό:** Μπορείτε να εκτελείτε τις εντολές κάθε φορά που ανοίγετε το xampp ή απλά να τις προσθέσετε ως alias στο .bashrc.  

{% highlight ruby %}
**ΕΚΚΙΝΗΣΗ:** sudo /opt/lampp/xampp start  

**ΤΕΡΜΑΤΙΣΜΟΣ:** sudo /opt/lampp/xampp stop
{% endhighlight %}

**2. Τερματικό + Γραφικό:** Εδώ ανοίγετε το τερματικό και γράφετε την παρακάτω εντολή:

{% highlight ruby %}
sudo /opt/lampp/manager-linux.run
{% endhighlight %}

Το ίδιο και εδώ, μπορείτε να προσθέσετε την εντολή αυτή ως alias στο .bashrc.  

**3. Προσθήκη εκκινητή στο menu:** Μετακινηθείτε στον παρακάτω κατάλογο: 

{% highlight ruby %}
cd /usr/share/applications
{% endhighlight %}

Πρέπει να δημιουργήσετε ένα αρχείο xampp.desktop και να το επεξεργαστείτε. 

{% highlight ruby %}
sudo touch xampp.desktop  

sudo gedit xampp.desktop
{% endhighlight %}

Προσθέστε μέσα τα παρακάτω:

{% highlight ruby %}
[Desktop Entry]  
Encoding=UTF-8  
Name=XAMPP Control Panel  
Comment=Start and Stop XAMPP  
Exec=sudo /opt/lampp/manager-linux-x64.run  
Icon=/opt/lampp/htdocs/favicon.ico  
Categories=Application  
Type=Application  
Terminal=true
{% endhighlight %}

Και είστε έτοιμοι.  

### Παράδειγμα εγκατάστασης wordpress

* Κατεβάστε το wordpress από την ιστοσελίδα [https://el.wordpress.org/](https://el.wordpress.org/)  

* Αποσυμπιέστε το αρχείο και μετακινήστε το στον φάκελο που "σερβίρει" το XAMPP.  

{% highlight ruby %}
sudo mv wordpress /opt/lampp/htdocs/
{% endhighlight %}

* Αλλάξτε τα δικαιώματα με την εντολή:  

{% highlight ruby %}
sudo chown -R daemon /opt/lampp/htdocs/wordpress
{% endhighlight %}

* Δημιουργήστε μια βάση δεδομένων. Αφού έχετε εκκινήσει το XAMPP, πρέπει να μετακινηθείτε στην διεύθυνση **http://localhost/phpmyadmin** και πατήστε στην καρτέλα **Βάσεις δεδομένων**. Πχ ονομάστε την wordpress (τι πρωτότυπο) και ως κωδικοποίηση (το ονομάζει Σύνθεση ή Coalition) επιλέξτε είτε **utf8_general_ci** είτε **utf8_unicode_ci**, όπως φαίνεται στην εικόνα.  

![XAMPP δημιουργία βάσης δεδομένων](/post_images/xampp/2015-05-15/xampp-database.png "XAMPP δημιουργία βάσης δεδομένων")

* Εγκαταστήστε το wordpress (http://localhost/wordpress). Στο σημείο που θα χρειαστεί να εισάγετε τα δεδομένα της βάσης, θα χρησιμοποιήσετε τα παρακάτω.  

{% highlight ruby %}
**Database** – wordpress  
**Username** – root  
**Password** – (αφήστε το κενό)
{% endhighlight %}

![Εγκατάσταση wordpress, βάση δεδομένων](/post_images/xampp/2015-05-15/editing-database.jpg "Εγκατάσταση wordpress, βάση δεδομένων")

Στις τελευταίες εκδόσεις, προτού ξεκινήσετε την εγκατάσταση του wordpress, πρέπει να επεξεργαστείτε ένα αρχείο. Αυτό είναι το **wp-config.php** στο οποίο εισάγετε το όνομα της βάσης, τον χρήστη και το συνθηματικό. Οπότε δεν θα χρειαστεί να δείτε την παραπάνω οθόνη.  

### Απεγκατάσταση

Έστω ότι δεν σας βόλεψε ή θέλετε να αλλάξετε σε docker και δεν χρειάζεστε άλλο το XAMPP. Υπάρχουν 3 τρόποι να το απεγκαταστήσετε.  

{% highlight ruby %}
$ sudo /opt/lampp/uninstall  

$ sudo -i cd /opt/lampp ./uninstall  

$ sudo rm -r /opt/lampp
{% endhighlight %}

Επιλέξτε όποιον τρόπο επιθυμείτε.  

Εάν έχετε και εσείς κάποιον φίλο-γνωστό που φοβάται να εγκαταστήσει docker ή έστω ένα virtual box, ενημερώστε τον για τις παραπάνω διαδικασίες.

Αρχικό post:  
[https://eiosifidis.blogspot.com/2021/05/egatastasi-xrisi-xampp-se-linux-egkatastasi-wordpress.html](https://eiosifidis.blogspot.com/2021/05/egatastasi-xrisi-xampp-se-linux-egkatastasi-wordpress.html)
