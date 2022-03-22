---
layout: post
title: "Εγκατάσταση MySQL Workbench σε Linux και σύνδεση με docker MariaDB"
date: 2022-03-03 12:00:00
description: Πως εγκαθιστούμε το MySQL Workbench σε διανομές Linux και πως το συνδέουμε με MariaDB σε docker
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
twitter_text: 'Εγκατάσταση MySQL Workbench σε Linux και σύνδεση με docker MariaDB'
---

![MySQL Workbench](/post_images/workbench/workbench-logo.png "MySQL Workbench"){:height="201px" width="320px"}

# ΒΑΣΕΙΣ ΔΕΔΟΜΕΝΩΝ

Κάθε μέρα δημιουργούμε δεδομένα τα οποία αναμένουν να "αξιολογηθούν" από κάποιον. Όλα αυτά τα δεδομένα αποθηκεύονται σε μια βάση. Έχουμε σκεφτεί πως φτιάχνονται αυτές οι βάσεις; Υπάρχουν εργαλεία. Ένα από αυτά είναι το MySQL Workbench.  
  
Το [MySQL Workbench](https://www.mysql.com/products/workbench/) είναι εργαλείο ανάπτυξης, διαχείρισης και μοντελοποίησης δεδομένων για την MySQL. Εκτός από την επεξεργασία και την εκτέλεση ερωτημάτων και σεναρίων SQL, υποστηρίζει το σχεδιασμό βάσεων δεδομένων MySQL μέσω διαγράμματος EER, το οποίο στη συνέχεια χρησιμοποιείται για τη δημιουργία SQL scripts. Το Workbench υποστηρίζει επίσης τη μετάβαση από πολλά προϊόντα RDBMS σε MySQL.  
  
Πως λειτουργεί; Καταρχήν θα εγκαταστήσετε το MySQL Workbench με έναν από τους παρακάτω τρόπους. Στην συνέχεια θα πρέπει να εγκαταστήσετε τον server MySQL και να συνδέσετε το MySQL Workbench με τον διακομιστή MySQL.  
  
Μια εναλλακτική λύση είναι το XAMPP ([δείτε σχετικό άρθρο εδώ](https://eiosifidis.blogspot.com/2021/05/egatastasi-xrisi-xampp-se-linux-egkatastasi-wordpress.html)). Μπορείτε να χρησιμοποιήσετε το XAMPP ως μοναδική λύση ή μπορείτε να χρησιμοποιήσετε το XAMPP ώστε να συνδέσετε το MySQL Workbench με τον διακομιστή MySQL από το XAMPP.  
  
Ας δούμε όμως όλες τις εγκαταστάσεις που θα χρειαστούν.  
  
# ΕΓΚΑΤΑΣΤΑΣΗ workbench

Θα δούμε 3 τρόπους εγκατάστασης. Σε αυτή την περίπτωση, εγώ προτίμησα από τα αποθετήρια της διανομής μου.  
  
## ΕΓΚΑΤΑΣΤΑΣΗ snap (Ubuntu)

Εγκατάσταση μέσω snap είναι εύκολη. Η ιστοσελίδα είναι η [https://snapcraft.io/mysql-workbench-community](https://snapcraft.io/mysql-workbench-community) και μπορεί να εγκατασταθεί με την εντολή:  

{% highlight ruby %}
sudo snap install mysql-workbench-community
{% endhighlight %}

Μετά πρέπει να εκτελέσετε την παρακάτω εντολή για να επιτρέψετε στο πακέτο να έχει πρόσβαση στην υπηρεσία.  

{% highlight ruby %}
sudo snap connect mysql-workbench-community:password-manager-service :password-manager-service
{% endhighlight %}

Επειδή δεν το έχω δοκιμάσει προσωπικά με την συγκεκριμένο τρόπο, πιστεύω δεν θα κάνει εγκατάσταση και την MySQL οπότε θα πρέπει να εγκαταστήσετε τον διακομιστή MySQL για να έχετε ολοκληρωμένο το πρόγραμμα.  
  

## ΕΓΚΑΤΑΣΤΑΣΗ ΑΠΟ ΠΑΚΕΤΟ

Στην [σελίδα των λήψεων](https://dev.mysql.com/downloads/workbench/), θα επιλέξετε την διανομή που έχετε και αποθηκεύστε το αρχείο.  
  
Για Ubuntu 20.04 επιλέξτε το mysql-workbench-community\_8.0.26-1ubuntu20.04\_amd64.deb (τη στιγμή που γραφόταν αυτό ήταν διαθέσιμο).  
Για Fedora/openSUSE επιλέξτε το mysql-workbench-community-8.0.26-1.fc34.x86\_64.rpm.  
  
Στην συνέχεια ανοίξτε το τερματικό και μετακινηθείτε στον φάκελο που έχετε αποθηκεύσει τα αρχεία και εκτελέστε την εντολή:  

{% highlight ruby %}
**Για Ubuntu:**  
sudo dpkg -i mysql\*.deb  
  
**Για Fedora, openSUSE:**  
sudo rpm -ivh mysql\*.rpm
{% endhighlight %}
  
Αφού γίνει η εγκατάσταση, είστε έτοιμοι για το επόμενο βήμα (σύνδεση με την MySQL).  
  
## ΕΓΚΑΤΑΣΤΑΣΗ ΑΠΟ TA ΕΠΙΣΗΜΑ ΑΠΟΘΕΤΗΡΙΑ

{% highlight ruby %}
**Για Ubuntu:**  
sudo apt install mysql-workbench-community  
  
**Για openSUSE:**  
sudo zypper in mysql-workbench  
  
**Για Arch Linux:**  
sudo pacman -S mysql-workbench
{% endhighlight %}
  
Ανοίγοντας το Workbench θα εμφανιστεί αυτή η οθόνη.  

![MySQL Workbench](/post_images/workbench/workbench.png "MySQL Workbench")

# ΕΓΚΑΤΑΣΤΑΣΗ MySQL

Ως MySQL προτιμάμε να εγκαταστήσουμε το docker. Ο κύριος λόγος είναι για να μην έχουμε εγκατεστημένο στο σύστημά μας έναν διακομιστή, ο οποίο θα ανοίξει πόρτες προς τα έξω και θα είμαστε ευάλωτοι σε επιθέσεις. Βέβαια αν ξέρεις να προφυλαχτείς, μπορείς να το κάνεις εν μέρη αλλά προτιμάμε docker κυρίως για θέματα ασφαλείας. Επίσης το docker είναι απλά ένα πακέτο, και αν θέλουμε, το διαγράφουμε με 1 εντολή. Τέλος καλό είναι να μαθαίνουμε να χρησιμοποιούμε περισσότερο το docker από ότι μια native εφαρμογή.  
  
Αφού έχετε εγκαταστήσει το docker, μπορείτε απλά να ξεκινήσετε την διαδικασία λήψης του image. Απλά για reference, αν χρειστεί να φτιάξετε την ομάδα docker και να προσθέσετε τον χρήστη σας (εδώ yolo) στην ομάδα docker, μπορείτε να το κάνετε με τις παρακάτω εντολές:  

{% highlight ruby %}
sudo groupadd docker  
  
sudo usermod -a -G docker yolo
{% endhighlight %}

## ΛΗΨΗ MARIADB

Υπάρχει το [image για την MySQL](https://hub.docker.com/_/mysql), όμως τελευταία χρησιμοποιείται η έκδοση MariaDB. Κατά την σύνδεση με το MySQL Workbench διαμαρτύρεται, αλλά λειτουργεί κανονικά. Μπορείτε να επισκευθείτε την διεύθυνση [https://hub.docker.com/\_/mariadb](https://hub.docker.com/_/mariadb). Χρησιμοποιήστε την εντολή:  

{% highlight ruby %}
docker pull mariadb
{% endhighlight %}
  
Περιμένετε μέχρι να κατέβει και θα είστε έτοιμοι. Δείτε το image με την εντολή:  

{% highlight ruby %}
docker images -a
{% endhighlight %}

## ΕΚΤΕΛΕΣΗ MARIADB

Η δημιουργία container γίνεται με την εντολή:  

{% highlight ruby %}
docker run -p 127.0.0.1:3306:3306 --name some-mariadb -e MARIADB\_ROOT\_PASSWORD=my-secret-pw -d mariadb:tag
{% endhighlight %}
  
Εδώ θα δώσω το όνομα **susemaria** και ως κωδικό **opensuse**.  

{% highlight ruby %}
docker run -p 127.0.0.1:3306:3306 --name susemaria -e MYSQL\_ROOT\_PASSWORD=opensuse -d mariadb:latest
{% endhighlight %}
  
Τώρα αν ανοίξετε το MySQL Workbench θα αναγνωρίσει ότι εκτελείται ένας διακομιστής και θα σας προτρέψει να συνδεθείτε. Αν δεν το δείτε, θα πατήσετε το **+** και θα το κάνετε χειροκίνητα. Αφού συνδεθείτε, θα πληκτρολογήσετε τον κωδικό του root (εδώ είναι opensuse) και θα μπείτε στο περιβάλλον εργασίας του MySQL Workbench ([δείτε την τεκμηρίωση για το πως χρησιμοποιείται](https://dev.mysql.com/doc/workbench/en/)).  

![MySQL Workbench environment](/post_images/workbench/workbench-select.png "MySQL Workbench environment")

## ΤΕΡΜΑΤΙΣΜΟΣ MARIADB

Αν και είναι "γνώση" για docker, θα βοηθήσουν όσους δεν γνωρίζουν περί docker.  
  
Δείτε όλα τα containers που εκτελούνται:

{% highlight ruby %}
docker ps -a
{% endhighlight %}
  
Σταματήστε το container που εκτελείται (επειδή το ονομάσαμε susemaria) είναι το μόνο που εκτελείται.  

{% highlight ruby %}
docker container stop susemaria
{% endhighlight %}
  
Διαγράψτε το container που δημιρουγήσατε. Δεν υπάρχει φόβος γιατί αν ξαναδώσετε την παραπάνω εντολή για δημιουργία container, θα δημιουργήσετε άλλο. Υπάρχει τρόπος για να το επαναφέρετε αλλά μην μπλέκεστε με αυτό για τώρα.  

{% highlight ruby %}
docker container rm susemaria
{% endhighlight %}
  
Αρχική δημοσίευση:  
[https://eiosifidis.blogspot.com/2021/09/egatastasi-mysql-workbench-se-linux-sindesi-docker-mariadb.html](https://eiosifidis.blogspot.com/2021/09/egatastasi-mysql-workbench-se-linux-sindesi-docker-mariadb.html)
