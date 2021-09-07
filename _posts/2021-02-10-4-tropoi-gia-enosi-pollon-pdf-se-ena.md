---
layout: post
title: "4 τρόποι για να ενώσετε πολλά .pdf σε ένα μεγάλο"
date: 2021-02-10 12:30:00
description: Έχετε συγκεντρώσει πολλά pdf και θέλετε να τα ενώσετε σε ένα αρχείο ώστε να αναζητάτε πληροφορίες ευκολότερα; Δείτε πόσοι τρόποι υπάρχουν...
tags:
- pdf
- merge
- tips
categories:
- PDF
twitter_text: '4 τρόποι για να ενώσετε πολλά #pdf σε ένα μεγάλο'
---

![PDF](/post_images/misc/pdf.png "PDF")

# ΤΟ ΠΡΟΒΛΗΜΑ  

Έστω ότι συγκεντρώνετε πολλά αρχεία pdf. Είτε σχολή λέγεται αυτό, είτε εργασία; Το πρόβλημα που αντιμετωπίζουν πολλοί είναι η εύρεση της πληροφορίας όταν την χρειάζονται. Σίγουρα μπορεί να γίνει και μέσα από το λειτουργικό σύστημα αλλά αρκετές φορές δεν έχει επιτυχία. Οπότε μια καλή λύση είναι η ένωση σε ένα αρχείο, όλων των pdf που έχουν το ίδιο αντικείμενο, ώστε να αναζητάτε μέσα από το πρόγραμμα ανάγνωσης pdf. Εδώ θα εξετάσουμε πως μπορείτε με μια κίνηση, να ενώσετε πολλά pdf.  

# Η ΛΥΣΗ  

Μέχρι στιγμής, βρήκα 4 λύσεις:  

## ΛΥΣΗ 1: 

Εγκαταστήστε το poppler-utils με την παρακάτω εντολή:  

{% highlight ruby %}
* Σε openSUSE  
sudo zypper in poppler-utils  

* Σε Ubuntu/Linux Mint  
sudo apt install poppler-utils  

* Σε Arch Linux  
sudo pacman -S poppler  
{% endhighlight %}

Στη συνέχεια, στον κατάλογο με τα pdf, εκτελέστε την εντολή:

{% highlight ruby %}
pdfunite *.pdf out.pdf
{% endhighlight %}

## ΛΥΣΗ 2: 

Εγκαταστήστε το πρόγραμμα pdftk με την παρακάτω εντολή:  

{% highlight ruby %}
* Σε openSUSE  
sudo zypper in pdftk  
  
* Σε Ubuntu/Linux Mint  
sudo apt install pdftk  

* Σε Arch Linux  
sudo pacman -S pdftk  
{% endhighlight %}

Έστω ότι είστε φοιτητής και έχετε οργανώσει τις διαλέξεις ανά φάκελο (με ότι πιθανά αρχεία να σας έχουν δώσει). Δώστε την παρακάτω εντολή:

{% highlight ruby %}
pdftk lecture?/*.pdf cat output lecturesall.pdf
{% endhighlight %}

Αυτό που θα κάνει είναι να μπει σε ένα ένα φάκελο, θα δει αν έχει κάποιο αρχείο pdf και θα το ενώσει σε ένα pdf.

## ΛΥΣΗ 3:  

Χρήση latex. Εγκαταστήστε το παρακάτω πακέτο.

{% highlight ruby %}
* Σε openSUSE
sudo zypper in texlive-latex-base

* Σε Ubuntu/Linux Mint
sudo apt install texlive-latex-base

* Σε Arch Linux
sudo pacman -S texlive-latexextra
{% endhighlight %}

Εστω ότι έχετε τα αρχεία file1.pdf και file2.pdf στον ίδιο φάκελο. Φτιάξτε το αρχείο **output.tex** με το περιεχόμενο:

{% highlight ruby %}
\documentclass{article}
\usepackage{pdfpages}
\begin{document}
\includepdf[pages=-]{file1}
\includepdf[pages=-]{file2}
\end{document}
{% endhighlight %}

Εκτελέστε την εντολή:

{% highlight ruby %}
pdflatex output.tex
{% endhighlight %}

## ΛΥΣΗ 4:

Μπορείτε να κατασκευάσετε ένα script στο Nautilus:
Εγκαταστήστε το πακέτο (εάν δεν το έχετε):

{% highlight ruby %}
* Σε openSUSE  
sudo zypper in poppler-utils  

* Σε Ubuntu/Linux Mint  
sudo apt install poppler-utils  

* Σε Arch Linux  
sudo pacman -S poppler  
{% endhighlight %}

Κατασκευάστε ένα αρχείο μέσα στον κατάλογο nautilus/scripts

{% highlight ruby %}
nano ~/.local/share/nautilus/scripts/merge_pdfs.sh
{% endhighlight %}

Στην συνέχεια προσθέστε το παρακάτω κώδικα:

{% highlight ruby %}
#!/bin/sh
CLEANED_FILE_PATHS=$(echo $NAUTILUS_SCRIPT_SELECTED_FILE_PATHS | sed 's,.pdf /home/,.pdf\\n/home/,g')
echo $CLEANED_FILE_PATHS | bash -c 'IFS=$'"'"'\n'"'"' read -d "" -ra x;pdfunite "${x[@]}" merged.pdf'
{% endhighlight %}

Το αρχείο αυτό κάντε το εκτελέσιμο (πατήστε δεξί πλήκτρο πάντω του > Ιδιότητες > Δικαιώματα > Να επιτρέπεται η εκτέλεση του αρχείου ως προγράμματος). Εναλλακτικά δώστε την παρακάτω εντολή:

{% highlight ruby %}
chmod +x ~/.local/share/nautilus/scripts/merge_pdfs.sh
{% endhighlight %}

Τώρα για να ενώσετε τα αρχεία, φωτίστε τα στον φάκελο στο Nautilus, πατήστε **δεξί πλήκτρο > Δέσμες ενεργειών (scripts)** και επιλέξτε το merge_pdfs.sh για να σας εξάγει ένα αρχείο pdf.

Εάν βρήκατε κάποιον τρόπο εύκολο στην χρήση, ενημερώστε και τους φίλους σας ώστε να μην παιδεύονται.

Αρχικό post:  
[https://eiosifidis.blogspot.com/2021/02/4-tropoi-gia-enosi-pollon-pdf-se-ena.html](https://eiosifidis.blogspot.com/2021/02/4-tropoi-gia-enosi-pollon-pdf-se-ena.html)
