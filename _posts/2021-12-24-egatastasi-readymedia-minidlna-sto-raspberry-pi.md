---
layout: post
title: "Εγκατάσταση και ρύθμιση του ReadyMedia (πρώην MiniDLNA) στο Raspberry Pi"
date: 2021-12-24 12:00:00
description: Το MiniDLNA είναι λογισμικό διακομιστή με στόχο να ενσωματώσει πλήρως με τους πελάτες DLNA/UPnP. Εδώ θα δούμε πως εγκαθίστανται στο Raspberry Pi.
tags:
- raspberry pi
- readyMedia
- miniDLNA
categories:
- Raspberry pi
- ReadyMedia
- MiniDLNA
twitter_text: 'Εγκατάσταση και ρύθμιση του ReadyMedia (πρώην MiniDLNA) στο Raspberry Pi'
---

![Raspberry pi logo](/post_images/raspberrypi/raspberry-pi-logo.png "Raspberry Pi Logo"){:height="200px" width="200px"}


# Τι είναι και γιατί χρειαζόμαστε το MiniDLNA

Το [ReadyMedia (πρώην MiniDLNA)](https://sourceforge.net/projects/minidlna/) είναι λογισμικό διακομιστή με στόχο να ενσωματώσει πλήρως τους πελάτες [DLNA](http://en.wikipedia.org/wiki/Digital_Living_Network_Alliance)/[UPnP](http://en.wikipedia.org/wiki/Universal_Plug_and_Play). Το MiniDNLA στο [Raspberry Pi](https://www.raspberrypi.org/) σας να εξυπηρετεί αρχεία πολυμέσων (μουσική, εικόνες και βίντεο) σε πελάτες σε ένα δίκτυο. Τα παραδείγματα πελατών περιλαμβάνουν εφαρμογές όπως το vlc, kodi και συσκευές όπως φορητές συσκευές αναπαραγωγής πολυμέσων, smartphone και τηλεοράσεις.  
  
## Εγκατάσταση του λογισμικού MiniDLNA στο Raspberry Pi

Σε αυτήν την ενότητα, θα δούμε την διαδικασία εγκατάστασης του λογισμικού MiniDLNA σε ένα Raspberry Pi. Αυτή η διαδικασία είναι σχετικά απλή και θα χρειαστεί μόνο λίγα λεπτά για να ολοκληρωθεί.  
  
1. Πριν εγκαταστήσουμε το MiniDLNA, θα πρέπει πρώτα να διασφαλίσουμε ότι η εγκατάσταση του Raspbian είναι πλήρως ενημερωμένη. Μπορούμε να ενημερώσουμε τόσο τη λίστα πακέτων όσο και όλα τα εγκατεστημένα πακέτα εκτελώντας τις ακόλουθες δύο εντολές.   

{% highlight ruby %}
sudo apt update    
sudo apt upgrade
{% endhighlight %} 

2. Μόλις ολοκληρωθεί η ενημέρωση, μπορούμε τώρα να προχωρήσουμε στην εγκατάσταση του MiniDLNA στο Raspberry Pi.  
  
Επειδή το MiniDLNA είναι διαθέσιμο ως μέρος του αποθετηρίου Raspbian, μπορούμε να το εγκαταστήσουμε χρησιμοποιώντας την παρακάτω εντολή στο τερματικό.  

{% highlight ruby %}
sudo apt install minidlna
{% endhighlight %} 

Μόλις ολοκληρωθεί η διαδικασία εγκατάστασης, μπορούμε τώρα να προχωρήσουμε στη διαμόρφωσή της για τους φακέλους πολυμέσων μας.  
  
## Ρύθμιση MiniDLNA για τα αρχεία πολυμέσων σας

Πριν ξεκινήσουμε αυτήν την ενότητα, θα πρέπει ήδη να έχετε αποθηκεύσει κάπου τα αρχεία σας. Αυτό μπορεί να είναι είτε στην κάρτα SD του Raspberry Pi είτε σε εξωτερικό σκληρό δίσκο.  
  
Σε αυτήν την ενότητα, θα δείτε πώς να διαμορφώσετε το MiniDLNA έτσι ώστε να μοιράζεται τα διαθέσιμα δεδομένα στους φακέλους πολυμέσων σας.  
  
1. Ξεκινήστε την τροποποίηση του αρχείου διαμόρφωσης MiniDLNA χρησιμοποιώντας την ακόλουθη εντολή στο Raspberry Pi.  

{% highlight ruby %}
sudo nano /etc/minidlna.conf
{% endhighlight %}
  
2. Μέσα σε αυτό το αρχείο, πρέπει να βρούμε την ακόλουθη ενότητα. Αυτή η ενότητα είναι όπου θα προσθέσουμε κάθε φάκελο που θέλουμε να σαρώσουμε για τα αρχεία μας.

{% highlight ruby %}
# * "A" for audio (eg. media_dir=A,/var/lib/minidlna/music)   
# * "P" for pictures (eg. media_dir=P,/var/lib/minidlna/pictures)  
# * "V" for video (eg. media_dir=V,/var/lib/minidlna/videos)
{% endhighlight %}
  
3. Κάτω από αυτήν την ενότητα, πρέπει να προσθέσουμε τους φακέλους μας από τους οποίους θέλουμε το MiniDLNA να εξυπηρετεί αρχεία.  
  
Η μορφή για τον καθορισμό ενός φακέλου πολυμέσων είναι η ακόλουθη.  

{% highlight ruby %}
media_dir=[TYPE],[PATH]
{% endhighlight %}
  
Για το [TYPE], έχουμε τρία διαφορετικά γράμματα που μπορούμε να χρησιμοποιήσουμε. Κάθε γράμμα καθορίζει διαφορετικό τύπο μέσου.  
  
- Το γράμμα Α για αρχεία ήχου   
- Το P χρησιμοποιείται για τον καθορισμό εικόνων   
- Τέλος, το V χρησιμοποιείται για φακέλους που περιέχουν βίντεο  
  
Για παράδειγμα, εάν είχαμε έναν φάκελο που ονομάζεται **/mnt/mediaDrive/** που περιείχε ένα φάκελο για τη μουσική, τις εικόνες και τις ταινίες μας, θα μπορούσαμε να προσθέσουμε τα παρακάτω στο αρχείο διαμόρφωσης.  

{% highlight ruby %}
media_dir=A,/mnt/mediaDrive/audio  
media_dir=P,/mnt/mediaDrive/pictures  
media_dir=V,/mnt/mediaDrive/videos
{% endhighlight %}
  
4. Το επόμενο πράγμα που μπορεί να θέλουμε να διαμορφώσουμε είναι το όνομα που παρουσιάζει ο διακομιστής DLNA στους πελάτες του.  
  
Μπορούμε να το αλλάξουμε βρίσκοντας και αλλάζοντας την ακόλουθη γραμμή.  
  
Ψάξτε για:  

{% highlight ruby %}
#friendly\_name=
{% endhighlight %}
  
Και αντικαταστήστε με:  

{% highlight ruby %}
friendly_name=yolo_MiniDLNA
{% endhighlight %}
  
5. Θα έπρεπε τώρα να έχετε ολοκληρώσει τη διαμόρφωση του διακομιστή MiniDLNA στο Raspberry Pi.  
  
Μπορείτε να αποθηκεύσετε αυτό το αρχείο πατώντας **CTRL + X**, ακολουθούμενο από το **Y** και μετά **ENTER**.  
  
6. Καθώς έχετε κάνει αλλαγές στη διαμόρφωση του λογισμικού MiniDLNA, θα χρειαστεί τώρα να επανεκκινήσετε την υπηρεσία με την εντολή.  

{% highlight ruby %}
sudo systemctl restart minidlna
{% endhighlight %}
  
Εάν δεν κάνετε επανεκκίνηση της υπηρεσίας MiniDLNA, καμία από τις αλλαγές σας δεν θα τεθεί σε ισχύ.  
  
7\. Σε αυτό το σημείο, θα πρέπει τώρα να μπορείτε να δείτε τον διακομιστή MiniDLNA του Raspberry Pi να εμφανίζεται στις διάφορες συσκευές σας.  
  

## Έλεγχος της κατάστασης του διακομιστή MiniDLNA

Σε αυτήν την ενότητα, θα δείτε πώς να ελέγχετε γρήγορα την κατάσταση του διακομιστή MiniDLNA μέσω της διεπαφής ιστού του.  
  
1. Για να ξεκινήσουμε αυτήν την ενότητα, θα πρέπει να μάθουμε ποια είναι η τοπική διεύθυνση IP του Raspberry Pi.  
  
Υπάρχουν διάφοροι τρόποι για να λάβετε την τοπική διεύθυνση IP του Pi σας, αλλά ένας από τους ευκολότερους τρόπους είναι να εκτελέσετε την ακόλουθη εντολή στο Raspberry Pi.  

{% highlight ruby %}
hostname -I
{% endhighlight %}
  
2. Με τη διεύθυνση IP του Raspberry Pi, μπορείτε να μεταβείτε στην ακόλουθη διεύθυνση στο αγαπημένο σας πρόγραμμα περιήγησης.  
  
Βεβαιωθείτε ότι αντικαθιστάτε το [IPADDRESS] με το IP που ανακτήσατε στο προηγούμενο βήμα.  

{% highlight ruby %}
http://[IPADDRESS]:8200
{% endhighlight %}
  
3. Μόλις φορτώσει, θα σας υποδεχτεί μια σελίδα που σας δείχνει τον αριθμό των αρχείων που είναι διαθέσιμα στη βιβλιοθήκη πολυμέσων σας, καθώς και μια λίστα με όλα τα συνδεδεμένα προγράμματα -πελάτες.  
  
## ΔΙΑΒΑΣΤΕ ΠΕΡΙΣΣΟΤΕΡΑ:
  
- [MiniDLNA](https://help.ubuntu.com/community/MiniDLNA)  
- [ReadyMedia](https://wiki.archlinux.org/title/ReadyMedia)

Αρχική δημοσίευση:  
[https://eiosifidis.blogspot.com/2021/09/egatastasi-readymedia-minidlna-sto-raspberry-pi.html](https://eiosifidis.blogspot.com/2021/09/egatastasi-readymedia-minidlna-sto-raspberry-pi.html)
