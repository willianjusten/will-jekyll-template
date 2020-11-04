---
layout: post
title: "Εγκατάσταση SageMath σε διανομές GNU/Linux"
date: 2020-11-04 12:30:00
description: Το SageMath είναι ένα ελεύθερο (δωρεάν) λογισμικό μαθηματικών ανοιχτού κώδικα. Πως γίνεται η εγκατάσταση σε Linux;
tags:
- sagemath
- flatpak
- opensuse
- ubuntu
- arch linux
- linux mint
- debian
- εγκατάσταση
- jupyter
- porto
- notebook
- python
- math
categories:
- SageMath
- openSUSE
- Ubuntu
- Linux Mint
- Arch Linux
- Debian
twitter_text: 'Πως να κάνετε εγκατάσταση #SageMath σε διανομές #GNU / #Linux'
---

![SageMath Logo](/post_images/sagemath/sagemath_logo.png "SageMath.org")

# ΠΡΟΛΟΓΟΣ

Πολλοί φοιτητές των Ελληνικών Πανεπιστημίων, διδάσκονται μαθηματικά λογισμικά που πιθανό να τα χρησιμοποιήσουν στην εργασία τους. Από τη στιγμή που διδάσκονται, πρέπει να δίνεται η δυνατότητα να εξασκηθούν στο σπίτι. Εάν τα λογισμικά αυτά είναι εμπορικά, αυτό σημαίνει ότι χρειάζεται και άδεια χρήσης. Η άδεια αυτή κοστίζει αρκετά χρήματα, ειδικά αν πρέπει να δοθεί και στους φοιτητές.

Στον αντίποδα, υπάρχουν μαθηματικά λογισμικά ανοικτού κώδικα που μπορούν να αντικαταστήσουν τα εμπορικά λογισμικά στην διαδικασία της διδασκαλίας. Ίσως, να μπορεί να γίνει η αντικατάσταση αυτή και στον παραγωγικό τομέα, αφού οι περισσότεροι απόφοιτοι θα γνωρίζουν τον χειρισμό ΜΟΝΟ των λογισμικών ανοικτού κώδικα. Ένα από αυτά είναι το **SageMath**. Εδώ θα δούμε πως μπορεί να εγκατασταθεί στο Linux.

# ΕΙΣΑΓΩΓΗ

Το [Sage (System for Algebra and Geometry Experimentation)](https://www.sagemath.org/) είναι ένα ελεύθερο (δωρεάν) λογισμικό μαθηματικών ανοιχτού κώδικα που υποστηρίζει αριθμητικούς υπολογισμούς, και γενικά την έρευνα και τη διδασκαλία στην άλγεβρα, στη γεωμετρία, στην θεωρία αριθμών, στην κρυπτογραφία, και σε συναφείς τομείς. Καλείται συχνά και **Sagemath** καθώς η λέξη Sage είναι πολύ κοινή.

Συνδυάζει τις δυνατότητες πολλών υπαρχόντων πακέτων ανοιχτού κώδικα (*NumPy, SciPy, matplotlib, Sympy, Maxima, GAP, FLINT, R* κ.τ.λ.) σε µία κοινή διεπαφή βασισμένη στη γλώσσα **Python**. Είναι λογισμικό γενικής χρήσης, με δυνατότητες αναλυτικών και αριθμητικών υπολογισμών καθώς και γραφικών.

Ο γενικός στόχος του Sage, σύμφωνα με τον δημιουργό του, είναι να δημιουργηθεί μια βιώσιμη, δωρεάν, ανοιχτού κώδικα εναλλακτική λύση απέναντι στα μαθηματικά λογισμικά: *Maple, Mathematica, Magma, και MATLAB*.

Η πρώτη δημόσια έκδοση παρουσιάστηκε τον Φεβρουάριο του 2005 ως ελεύθερο λογισμικό. Ο δημιουργός της είναι ο William Stein, καθηγητής μαθηματικών στο University of Washington. 

# Εγκατάσταση σε Debian/Ubuntu/Linux Mint

Η εγκατάσταση σε Debian/Ubuntu είναι εύκολη, καθώς υπάρχουν στο αποθετήριο. Μπορείτε εύκολα να τα εγκαταστήσετε με την εντολή:

{% highlight ruby %}
sudo apt install sagemath sagemath-jupyter sagemath-doc-en
{% endhighlight %}

Ο διακομιστής Sage Jupyter Notebook θα εκκινήσει αμέσως μόλις εκκινήσετε την εφαρμογή, είτε από το GUI είτε από το τερματικό.<br /><br />

## Εγκατάσταση σε Debian/Ubuntu από συμπιεσμένο αρχείο

* Μεταβείτε στην [ιστοσελίδα των λήψεων](http://ftp.ntua.gr/pub/sagemath/linux/index.html) και κατεβάστε την έκδοση που αντιστοιχεί στο λειτουργικό σας.

* Στη συνέχεια αποσιμπιέστε το αρχείο **.tar.bz2** που κατεβάσατε. 
**ΣΥΜΒΟΥΛΗ:** Φτιάξτε ένα κατάλογο **bin** μέσα στον προσωπικό σας φάκελο. Εκεί να αποθηκεύετε τα προγράμματα που θέλετε να εγκαταστήσετε (όπως το SageMath). Με αυτό τον τρόπο θα γνωρίζετε ότι πρόκειται για προγράμματα και δεν θα τον πειράζετε. Επίσης δεν θα είστε σίγουροι ότι δεν υπάρχει κάποιος Ελληνικός χαρακτήρας στο path που μπορεί να προκαλέσει κάποιο πρόβλημα.<br /><br />

* Αφού το συμπιέσατε, μεταβείτε στον κατάλογο *SageMath* και εκτελέστε το πρόγραμμα *sage*

{% highlight ruby %}
./sage
{% endhighlight %}

* Την πρώτη φορά που θα εκτελεστεί το Sage θα σας δώσει μια εικόνα όπως το παρακάτω μήνυμα:

{% highlight ruby %}
Rewriting paths for your new installation directory
===================================================

This might take a few minutes but only has to be done once.

patching ...  (long list of files)
{% endhighlight %}

Από εδώ και πέρα, δεν μπορείτε να μετακινήσετε το Sage.

* Τελευταία κίνηση είναι η δημιουργία συντόμευσης ώστε να μπορείτε να εκτελέσετε το Sage από το τερματικό. Τώρα μπορείτε να δημιουργήσετε την συντόμευση με την εντολή: 

{% highlight ruby %}
$ sudo ln -s /path/to/SageMath/sage /usr/local/bin/sage
{% endhighlight %}

Όπου /path/to/ είναι το πλήρες path που εγκαταστήσατε το SageMath.

Μπορείτε να βρείτε περισσότερες πληροφορίες στο [wiki του Ubuntu](https://help.ubuntu.com/community/SAGE).

# Εγκατάσταση σε Arch Linux

* Εγκατάσταση με την εντολή:

{% highlight ruby %}
sudo packam -S sagemath sagemath-jupyter sagemath-doc
{% endhighlight %}

* Το SageMath παρέχει και το Jupyter Notebook. Εκτελέστε την εντολή:

{% highlight ruby %}
$ jupyter notebook
{% endhighlight %}

και επιλέξτε "SageMath" από το αναδυόμενο μενού "New...".

## Εκκίνηση

Εκτέλεση στο τερματικό με την εντολή:

{% highlight ruby %}
$ sage -c "notebook(automatic_login=True)"
{% endhighlight %}

Μεταβείτε στην διεύθυνση [http://localhost:8080/](http://localhost:8080/) και εκεί θα μπορείτε χρησιμοποιήσετε το Jupiter Notebook. Επειδή θα χρησιμοποιείτε μόνο εσείς το SageMath, μπορείτε να το εκτελέσετε χωρίς κωδικό. 

Για περισσότερες πληροφορίες, μπορείτε να [δείτε το Arch Linux wiki](https://wiki.archlinux.org/index.php/SageMath).

# Εγκατάσταση και χρήση Docker

Όμως τι γίνεται αν έχετε κάποια άλλη διανομή (όπως έγώ με openSUSE); Η λύση είναι η χρήση Docker.

Ψάχντοντας στο hub, βρήκα την διευθυνση:
[https://hub.docker.com/r/sagemath/sagemath/](https://hub.docker.com/r/sagemath/sagemath/)

Οπότε εδώ θα δούμε πως θα κάνουμε λήψη, ενεργοποίηση και χρήση του SageMath.

* Λήψη του θα την κάνετε με την εντολή:

{% highlight ruby %}
sudo docker pull sagemath/sagemath
{% endhighlight %}

* Αφού κατέβει, μπορείτε να δείτε την λίστα με τα images με την εντολή:

{% highlight ruby %}
sudo docker images
{% endhighlight %}

* Εκκίνηση του SageMath μαζί με το Jupyter Notebook.

{% highlight ruby %}
sudo docker run -p8888:8888 sagemath/sagemath:latest sage-jupyter
{% endhighlight %}

Αφού εκτελεστεί, δείτε λίγο τα μηνύματα που θα βγάλει. Θα σας εμφανίσει ένα token. Αυτό θα το χρειαστείτε για να κάνετε είσοδο από την διεύθυνση [http://localhost:8888](http://localhost:8888) ή την τύπου http://IP:8888.


![SageMath Window](/post_images/sagemath/sagemath.jpg "SageMath window")

* Αφού τελειώσετε, πρέπει να τερματίσετε τον server και να τερματίσετε το docker. Θα βρείτε το CONTAINER_ID με την εντολή:

{% highlight ruby %}
sudo docker container ps
{% endhighlight %}

Δείτε το ID της και μπορείτε να τερματίσετε με το ID της με την εντολή (αν πχ το ID είναι 3b40632adb78):
{% highlight ruby %}
sudo docker container stop 3b40632adb78
{% endhighlight %}

# ONLINE

Υπάρχει και η δυνατότητα να μην εγκαταστήσετε τιποτα. Μπορείτε να βρείτε online τις εξής λύσεις:

* [https://cocalc.com/](https://cocalc.com/): Η λύση αυτή είναι επι πληρωμή. Υπάρχει το δωρεάν πλάνο αλλά δεν είναι και τόσο γρήγορο. Μπορεί να περιμένετε αρκετή ώρα μέχρι να έχετε αποτέλεσμα.

* [https://sagecell.sagemath.org/](https://sagecell.sagemath.org/): Ακόμα μια λύση, καλύτερη από το cocalc.

# Σημειωματάριο PORTO

Εναλλακτικά του Jupyter μπορείτε να εγκαταστήσετε το Porto από το flathub.

[https://flathub.org/apps/details/org.cvfosammmm.Porto](https://flathub.org/apps/details/org.cvfosammmm.Porto)

Ή εκτελέστε την εντολή

{% highlight ruby %}
sudo flatpack install org.cvfosammmm.Porto
{% endhighlight %}

[Δείτε πως μπορείτε να κάνετε εγκατάσταση από το πηγαίο αρχείο.](https://doc.sagemath.org/html/en/installation/source.html)

