---
layout: post
title: "Πως να κανετε build το Kali Nethunter για το τηλεφωνο One Plus One"
date: 2016-11-19 16:09:34
description: Κατασκευή του Nethunter από το github αποκλειστικά για το τηλέφωνο One Plus One
tags:
- kali
- nethunter
- one plus one
- 1 + 1
- build
categories:
- Kali Linux tips
- Mobile hacking
twitter_text: 'Πως να κάνετε build το Kali Nethunter για το τηλέφωνο One Plus One'
---

# Πως να κάνετε build το Kali Nethunter για το τηλέφωνο One Plus One

Εδώ και καιρό, φίλος με το κινητό One Plus One και γνώστης-κολλημένος με το Kali Linux, έψαχνε να περάσει το Kali Nethunter στο κινητό του. Μετά από πολλές προσπάθειες από οδηγούς που έβρισκε στο Internet αποφασίσαμε να χτίσουμε, σύμφωνα με οδηγίες, το Nethunter για το τηλέφωνό του. Τα αρχεία που χρησιμοποιούσαμε ως τώρα ήταν generic και ίσως γι'αυτό να μην δουλεύανε στο κινητό του. Άλλοτε δεν έκανε αναβαθμίσεις, άλλοτε έβγαζε failed κατά την εγκατάσταση.

Ακολουθήσαμε τις οδηγίες που βρήκαμε στο [wiki](https://github.com/offensive-security/kali-nethunter/wiki). Χρησιμοποιήσαμε τον υπολογιστή του που έχει εγκατεστημένο το kali linux.

Ακολουθείστε τις παρακάτω οδηγίες, εάν θέλετε να χτίσετε το Nethunter για το δικό σας τηλέφωνο.

Αρχικά κάντε clone το αποθετήριο.

{% highlight ruby %}
root@kali:~# git clone https://github.com/offensive-security/kali-nethunter
root@kali:~# cd kali-nethunter/nethunter-installer 
{% endhighlight %}

Προετοιμάστε το περιβάλλον: Πριν ξεκινήσετε να χτίζετε το Nethunter, πρέπει να κάνετε την αρχικοποίηση των συσκευών του αποθετηρίου (θα χρειαστεί στην επόμενη εντολή). Θα σας γίνουν κάποιες ερωτήσεις. Δώστε την εντολή:

{% highlight ruby %}
./bootstrap.sh 
{% endhighlight %}

Ωραία, τώρα είναι η στιγμή που θα χτίσει το αρχείο για το one plus one. Για βοήθεια, δώστε την εντολή

{% highlight ruby %}
python build.py -h
{% endhighlight %}

Η σύνταξη της εντολής έχει ως εξής:

{% highlight ruby %}
usage: build.py [-h] [--device DEVICE] [--kitkat] [--lollipop] [--marshmallow]
[--nougat] [--forcedown] [--uninstaller] [--kernel]
[--nokernel] [--nosu] [--generic ARCH] [--rootfs SIZE]
[--release VERSION]
{% endhighlight %}

Εδώ παίζονται όλα τα λεφτά. Επιλέξτε την συσκευή που διαθέτετε (-d) καθώς και την έκδοση Cyanogen Mod που έχετε εγκατεστημένο στο τηλέφωνό σας Εμείς για την συσκευή one plus one με Cyanogen Mod 13, δώσαμε την εντολή:

{% highlight ruby %}
python build.py -d oneplus1 -m -fs full
{% endhighlight %}

Θα περιμένετε αρκετή ώρα (επειδή χρησιμοποιήσαμε το full). Εάν βαριέστε να περιμένετε (ή δεν μπορείτε να το χτίσετε), μπορείτε να κατεβάσετε το αρχείο [nethunter-oneplus1-marshmallow-kalifs-full-20161017_165407.zip](http://adf.ly/6023302/nethunter-oneplus1-marshmallow).

ΠΡΟΣΟΧΗ: Ανοίξτε κανονικά το τηλέφωνό σας και εισάγετε λογαριασμούς-σύνδεση με το ασύρματο κλπ. Στην συνέχεια κλείστε το και ανοίξτε το σε Recovery Mod. Εκεί θα φλασάρετε το παραπάνω αρχείο. Κάνει αρκετή ώρα. Όταν ανοίξετε το κινητό σας, θα κάνει επίσης αρκετή ώρα (5 λεπτά maximum). Οπότε μην ανησυχείτε.

Για περισσότερες πληροφορίες για το πως μπορείτε να χτίσετε το Nethunter για άλλες συσκευές, δείτε τον σύνδεσμο
[https://github.com/offensive-security/kali-nethunter/wiki/Building-Nethunter](https://github.com/offensive-security/kali-nethunter/wiki/Building-Nethunter)

Πρωτοδημοσιεύτηκε στο [iBlog Efstathios Iosifidis](http://eiosifidis.blogspot.gr/2016/10/build-kali-nethunter-one-plus-one.html).

![One Plus One](/post_images/kalinethunter/1plus1-nethunter.png)
