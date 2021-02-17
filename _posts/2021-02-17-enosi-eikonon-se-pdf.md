---
layout: post
title: "Ένωση πολλών εικόνων σε ένα .pdf"
date: 2021-02-11 12:30:00
description: Η ένωση πολλών εικόνων png σε ένα pdf γίνεται με την βοήθεια μιας εντολής. Ποια είναι η αλλαγή στα δικαιώματα του ImageMagick για να το πετύχετε αυτό;
tags:
- pdf
- image
- εικόνα
- συνένωση
- merge
- tip
categories:
- PDF
twitter_text: 'Ένωση πολλών εικόνων σε ένα #pdf'
---

![ImageMagic](/post_images/imagemagic/imagemagic.png "ImageMagic")

# Η ΑΝΑΓΚΗ

Η τηλε-εκπαίδευση μπορεί να ήταν και πολύ βοηθητική για κάποιους, αφού δεν ήταν απαραίτητο να κρατούν σημειώσεις σε χαρτί κατά την ώρα της παράδοσης, αλλά να παρακολουθούν τον καθηγητή και να κατανοούν καλύτερα το αντικείμενο. Η εμπέδωση γίνεται με την επανάληψη των αρχείων που παρέχουν οι καθηγητές μέσω πλαφόρμας ασύγχρονης εκπαίδευσης του κάθε ιδρύματος. Αντί χειρόγραφων σημειώσεων, δίνεται η δυνατότητα της λήψης στιγμιοτύπου οθόνης (screenshot), με ότι πιθανές σημειώσεις έχει γράψει ο καθηγητής. Πως μπορείτε να λάβετε ένα στιγμιότυπο οθόνης; Δείτε παρακάτω για τα διαφορετικά λειτουργικά συστήματα:  

* LINUX: Πατάτε το πλήκτρο PrtScr και ανοίγει το πρόγραμμα λήψης στιγμιοτύπου οθόνης και αποθηκεύει (αυτόματα) όλη την οθόνη σας μέσα στον φάκελο των εικόνων.  
* MAC OSX: Πατήστε το συνδυασμό Command+Shift+3 και σας αποθηκεύει την εικόνα στην επιφάνεια εργασίας σας.  
* Windows: Πατήστε το συνδυασμό Windows key + Print Screen key και θα σας αποθηκεύσει την εικόνα στον φάκελο Εικόνες>Στιγμιότυπα οθόνης.  

Όλες αυτές τις εικόνες (συνήθως png), μπορείτε να τις βλέπετε μια-μια με το πρόγραμμα προβολής εικόνων. Είναι όμως καλύτερα να τις προσθέσετε σε ένα αρχείο pdf. Το αρνητικό και στις δυο περιπτώσεις είναι ότι δεν μπορείτε να κάνετε αναζήτηση ενός όρου, αφού είναι εικόνες.

# ΤΟ ΠΡΟΒΛΗΜΑ  

Μετά από λίγη αναζήτηση στο Internet, η λύση ήταν απλή. Ανοίξτε ένα τερματικό και εκτελέστε την εντολή:

{% highlight ruby %}
convert *.png out.pdf

Αυτό που κάνει η παραπάνω εντολή είναι να πάρει όλα τα αρχεία με κατάληξη .png και τα προσθέτε σε ένα αρχείο .pdf. Όμως με την εκτέλεση αυτής της εντολής, λάμβανα ένα μήνημα σφάλματος:

{% highlight ruby %}
convert: attempt to perform an operation not allowed by the security policy `PDF' @ error/constitute.c/IsCoderAuthorized/408. convert: no images defined `output.png' @ error/convert.c/ConvertImageCommand/3288.
{% endhighlight %}

Μετά από λίγη αναζήτηση, βρήκα στο stackoverflow παρόμοιο πρόβλημα. Να δούμε τι λύση δώσανε λοιπόν.

# Η ΛΥΣΗ  

Ουσιαστικά έπρεπε να δικαιώματα εγγραφής στο ImageMagick. 

{% highlight ruby %}
sudo nano /etc/ImageMagick-6/policy.xml 
{% endhighlight %}

Στην περίπτωσή σας μπορεί να είναι το αρχείο **/etc/ImageMagick-7/policy.xml**, ανάλογα με την έκδοση του ImageMagick που έχετε.

Ουσιαστικά πρέπει να σβήσετε ένα κομμάτι και να προσθέσετε μια γραμμή. Προσωπικά κράτησα με σχόλιο όπως βλέπετε παρακάτω:

{% highlight ruby %}

<policy domain="coder" rights="none" pattern="PS" />
<policy domain="coder" rights="none" pattern="PS2" />
<policy domain="coder" rights="none" pattern="PS3" />
<policy domain="coder" rights="none" pattern="EPS" />
<policy domain="coder" rights="none" pattern="PDF" />
<policy domain="coder" rights="none" pattern="XPS" />

{% endhighlight %}

Και μετά πρόσθεσα την παρακάτω γραμμή:  

{% highlight ruby %}
<policy domain="module" rights="read|write" pattern="{PS,PS2,PS3,EPS,PDF,XPS}">
{% endhighlight %}

Επειδή οι εικόνες είναι πολλές σε αριθμό, μπορεί να μην σας τις προσθέσει όλες με την πρώτη. Καλύτερα είναι να τις προσθέσετε ανά μάθημα και στο τέλος να ενώσετε τα pdf με την εντολή:

{% highlight ruby %}
pdfunite *.pdf out.pdf
{% endhighlight %}

Αυτό υπάρχει στα εργαλεία poppler-utils. Για περισσότερες πληροφορίες πως [μπορείτε να ενώσετε πολλά pdf σε ένα](/2021-02-10-4-tropoi-gia-enosi-pollon-pdf-se-ena), δείτε σε προηγούμενο άρθρο.

Κοινοποιήστε το παρόν άρθρο σε φίλο σας που προσπαθεί να ενώσει πολλές εικόνες σε ένα pdf. Θα του σώσετε αρκετό χρόνο.

Αρχικό post:  
[https://eiosifidis.blogspot.com/2021/02/enosi-eikonon-se-pdf.html](https://eiosifidis.blogspot.com/2021/02/enosi-eikonon-se-pdf.html)
