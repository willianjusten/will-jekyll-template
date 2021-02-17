---
layout: post
title: "Συγχώνευση .ipynb αρχείων και χρήση στο SageMath"
date: 2021-02-03 12:30:00
description: Πως μπορείτε να κάνετε συγχώνευση αρχείων .ipynb σε ένα;
tags:
- sagemath
- jupyter
- notebook
- python
- μαθηματικά
- ipynb
- tip
categories:
- SageMath
twitter_text: 'Πως να κάνετε ενώσετε αρχεία του #SageMath σε ένα με την χρήση τερματικού'
---

![SageMath Logo](/post_images/sagemath/sagemath_logo.png "SageMath.org")

Σε συνέχεια της ανάρτησης περί [Εγκατάστασης Μαθηματικού Λογισμικού SageMath σε διανομές GNU/Linux](/sagemath-linux), δημιουργήθηκε η ανάγκη για να γραφτεί η παρούσα ανάρτηση.


# ΠΡΟΛΟΓΟΣ

Το [SageMath](https://www.sagemath.org/) δέχεται έτοιμα αρχεία .ipynb (σημειωματάριο [Jupyter](https://jupyter.org/)) για την εκτέλεση έτοιμων σεναρίων-προβλημάτων.

Κατά τη διάρκεια του εξαμήνου που πέρασε, συγκεντρώθηκαν περίπου 10 αρχεία. Η ερώτηση ήταν, μπορούν όλα τα αρχεία να συγχωνευτούν σε ένα; Η απάντηση ήταν προφανώς και γίνεται.

# Η ΛΥΣΗ

Η λύση ήρθε μετά από λίγο ψάξιμο και με την βοήθεια του τερματικού (αγαπάμε τερματικό).

* Εφόσων έχετε εγκατεστημένη την python (προφανώς και θα την έχετε), εγκαταστήστε το πακέτο:  


{% highlight ruby %}
sudo pip install nbmerge
{% endhighlight %}

* Μεταβείτε στον φάκελο που έχετε αποθηκευμένα τα αρχεία .ipynb και εκτελέστε την παρακάτω εντολή:

{% highlight ruby %}
nbmerge file_1.ipynb file_2.ipynb file_3.ipynb > merged.ipynb
{% endhighlight %}

Το μέγεθος του αρχείου είναι μεν μικρό αλλά η πληροφορία μέσα είναι αρκετή. Οπότε θα αργήσει να ανοίξει λίγο. Περιμένετε μέχρι να το επεξεργαστεί ο server που εκτελείται το SageMath.

Πλήρης τεκμηρίωση βρίσκεται εδώ [https://github.com/jbn/nbmerge](https://github.com/jbn/nbmerge)  

Εάν σας άρεσε αυτό το tip, ενημερώστε και τους φίλους σας, ώστε να το έχουν υπόψιν τους για μελλοντικές ανάγκες τους.

Αρχικό post:  
[https://eiosifidis.blogspot.com/2021/01/sigxonefsi-ipynb-arxeion-sagemath.html](https://eiosifidis.blogspot.com/2021/01/sigxonefsi-ipynb-arxeion-sagemath.html)
