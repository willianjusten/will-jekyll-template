---
layout: post
title: "Αποστολή αρχείου στον κοινόχρηστο φάκελο του Nextcloud Hub με τερματικό!!!"
date: 2020-10-29 12:30:00
description: Μάθαμε να ανεβάζουμε τα αρχεία στο Nextcloud Hub από το browser. Πως ανεβαίνουν από το τερματικό;
tags:
- nextcloud
- nextcloud hub
- file drop
- τερματικό
- cloud
- tips
categories:
- Nextcloud
- Cloud
twitter_text: 'Πως μπορείτε να χρησιμοποιήσετε το "file drop" στο #Nextcloud μέσω #τερματικού...'
---

![Nextcloud Logo](/post_images/nextcloud/nextcloud-blue-clouds.png "Awesome Nextcloud")

# Γιατί να μου στείλουν αρχεία σε κοινόχρηστο φάκελο;

Έχω αναφερθεί πολλές φορές στο [Nextcloud Hub](https://iosifidis.github.io/tags/#nextcloud), το οποίο χρησιμοποιώ σε καθημερινή βάση επειδή παρέχει πολλές ευκολίες. Μια από αυτές είναι ο κοινόχρηστος φάκελος με κάποιον που δεν διαθέτει λογαριασμό στην δικιά μου εγκατάσταση Nextcloud Hub. Σε περίπτωση που δεν υπάρχει άλλος τρόπος να μου στείλουν αρχεία, τους ζητώ να μου ανεβάσουν τα αρχεία αυτά στον κοινόχρηστο φάκελο.

Μέχρι εδώ καλά. Ο καλύτερος τρόπος αποστολής των αρχείων είναι να ανοίξουν με τον browser την διεύθυνση που τους έστειλα και να κάνουν την μεταφόρτωση εκεί. Το πλεονέκτημα είναι ότι σε περίπτωση που ανεβάζουν πολλά αρχεία, μπορούν να βλέπουν την πρόοδο αυτών.

Όμως τελευταία ανακάλυψα και την μέθοδο με το τερματικό. Δουλεύει ακόμα (τουλάχιστον μέχρι να την απαγορεύσουν). Πως γίνεται αυτό;

Έστω ότι η διεύθυνση του φακέλου διαμοιρασμού είναι η:

{% highlight ruby %}
https://yourdomain.com/index.php/s/xxxxxxx
{% endhighlight %}

Ανοίξτε το τερματικό στον κατάλογο των αρχείων προς αποστολή, και πληκτρολογήστε την εντολή:

{% highlight ruby %}
curl -k -T FILEPATH -u "USERNAME:" -H 'X-Requested-With: XMLHttpRequest' -X PUT https://yourdomain.com/public.php/webdav/FILENAME
{% endhighlight %}

Όπου:
* **FILEPATH**: είναι το όνομα αρχείου στον δίσκο σας
* **USERNAME**: είναι το χαρακτηριστικό του φακέλου από την αρχική διεύθυνση (στο παράδειγμα είναι το xxxxxxx)
* **FILENAME**: είναι το όνομα αρχείου που θέλετε να αποθηκευτεί στο Nextcloud Hub
* **ΠΡΟΣΟΧΗ** στο URL διότι μόνο το αρχικό domain είναι ίδιο. Μετά αλλάζει από index σε public κλπ

Για να μην γράφετε δυο φορές το αρχείο, μπορείτε να το κάνετε μια φορά με την παρακάτω εντολή:

{% highlight ruby %}
FILE = "[ReplaceWithFileInCurrentDir]"

curl "https://yourdomain.com/public.php/webdav/$FILE" \
    -u "xxxxxxx:" \
    --compressed \
    -X PUT \
    --upload-file $FILE \
    -H 'X-Requested-With: XMLHttpRequest'
{% endhighlight %}

Αλλάξτε το **ReplaceWithFileInCurrentDir** με το όνομα του αρχείου (και τον ακριβή φάκελο) που θέλετε να ανεβάσετε.

Προσοχή διότι μπορεί να καταργηθεί το feature αυτό.
