---
layout: post
title: "Εγκατάσταση Code::Blocks σε διανομές GNU/Linux"
date: 2020-11-11 12:30:00
description: Το Code::Blocks είναι ένα δωρεάν εργαλείο για ανάπτυξη κώδικα C, C++ και Fortran. Πως όμως γίνεται εγκατάσταση σε διανομές GNU/Linux;
tags:
- codeblocks
- flatpak
- opensuse
- ubuntu
- arch linux
- linux mint
- εγκατάσταση
- γλώσσα προγραμματισμού C
categories:
- Code::Blocks
- openSUSE
- Ubuntu
- Linux Mint
- Arch Linux
- Γλώσσα προγραμματισμού C
twitter_text: 'Πως να κάνετε εγκατάσταση του #CodeBlocks σε διανομές #GNU / #Linux'
---

![Code:Blocks Logo](/post_images/codeblocks/code-blocks.png "codeblocks.org")

# ΠΡΟΛΟΓΟΣ

Το [Code::Blocks](http://www.codeblocks.org) είναι ένα δωρεάν εργαλείο με περιβάλλον ανάπτυξης κώδικα C, C ++ και Fortran, κατασκευασμένο για να ικανοποιεί τις πιο απαιτητικές ανάγκες των χρηστών του. Είναι σχεδιασμένο να είναι πολύ επεκτάσιμο και πλήρως διαμορφώσιμο.

Στο Code::Blocks μπορούν να ενεργοποιηθούν πολλά πρόσθετα. Για παράδειγμα, η λειτουργία μεταγλώττισης και εντοπισμού σφαλμάτων παρέχεται ήδη από πρόσθετα!

Εδώ θα δούμε πως εγκαθιστάτε το Code::Blocks πολύ εύκολα σε διανομές Linux. Για αρχή, υπάρχει η ιστοσελίδα [λήψεων εδώ](http://www.codeblocks.org/downloads/binaries).

# Εγκατάσταση με χρήση flatpak

Η πιο σίγουρη λύση για εγκατάσταση είναι μέσω του [flatpak](https://eiosifidis.blogspot.com/search/label/flatpak).
Ανοίξτε τερματικό και εκτελέστε την εντολή:

{% highlight ruby %}
sudo flatpak install org.codeblocks.codeblocks
{% endhighlight %}

# Εγκατάσταση σε openSUSE

Στο openSUSE η εγκατάσταση είναι πολύ απλή. Θα χρησιμοποιήσετε την τεχνολογία 1-click-install. Μετακινηθείτε στην σελίδα:

[https://software.opensuse.org/package/codeblocks](https://software.opensuse.org/package/codeblocks)

Εκεί επιλέξτε την έκδοση που έχετε εγκατεστημένη (μπορείτε να πατήσετε και εδώ επάνω στην έκδοσή σας):

* [openSUSE Tumbleweed](https://software.opensuse.org/ymp/devel:tools:ide/openSUSE_Factory/codeblocks.ymp?base=openSUSE%3AFactory&amp;query=codeblocks)
* [openSUSE Leap 15.2](https://software.opensuse.org/ymp/devel:tools:ide/openSUSE_Leap_15.2/codeblocks.ymp?base=openSUSE%3ALeap%3A15.2&amp;query=codeblocks)

Και θα ανοίξει ένα ymp αρχείο, θα προσθέσει το αποθετήριο **devel:tools:ide**, από όπου θα γίνει η εγκατάσταση του Code:Blocks.

Εναλλακτικά με τερματικό, μπορείτε να χρησιμοποιήσετε τις εντολές:

- Για openSUSE Leap 15.2:

{% highlight ruby %}
su -
zypper ar http://download.opensuse.org/repositories/devel:/tools:/ide/openSUSE_Leap_15.2/ devel:tools:ide<br />
zypper in codeblocks
{% endhighlight %}

# Εγκατάσταση σε Arch Linux

Ανοίξτε το τερματικό και πληκτρολογήστε:

{% highlight ruby %}
sudo pacman -S codeblocks
{% endhighlight %}

# Εγκατάσταση σε Ubuntu/Linux Mint

Σε Ubuntu, θα βρείτε τα πάντα στην διεύθυνση [https://launchpad.net/~codeblocks-devs](https://launchpad.net/~codeblocks-devs). Μάλιστα εντύπωση που έκανε που το διατηρεί Ελληνας.

Εδώ θα πρέπει να προσθέσετε το αποθετήριο και μετά να κάνετε μια ενημέρωση των αποθετηρίων, καταλήγοντας στην εγκατάσταση με τις παρακάτω εντολές:

{% highlight ruby %}
sudo add-apt-repository ppa:codeblocks-devs/release
sudo apt-get update
sudo apt-get install codeblocks codeblocks-contrib
{% endhighlight %}

Ελπίζουμε να μην βρήκατε ιδιαίτερα δύσκολη την εγκατάσταση του Code::Blocks.

![Code:Blocks Logo](/post_images/codeblocks/codeblocks.png "codeblocks.org")

Αφού εγκαταστήσαμε το Code::Blocks και γράψαμε τους πρώτους κώδικες σε C, επόμενη κίνηση ήταν να βρούμε ένα όμορφο χρώμα για τα παράθυρά μας, που να ταιριάζει και να μην κουράζει το μάτι. Δυστυχώς από τα υπάρχοντα, δεν μου άρεσε κάποιο, οπότε ξεκίνησε το ψάξιμο για αλλαγή του θέματος.

Στο αρχείο [default.conf](/post_images/codeblocks/default.conf), έχει πολλά θέματα, όμως που έπρεπε νααποθηκευτούν; Όπως είδατε, υπάρχουν δυο τρόποι.

1. Εάν το εγκαταστήσετε από το πακέτο ή αποθετήριο της διανομής σας, τότε μπορείτε να αποθηκεύσετε το αρχείο **default.conf** στον φάκελο όπως βλέπετε παρακάτω:  
  
{% highlight ruby %}
# Κρατήστε αντίγραφο ασφαλείας  
cp ~/.codeblocks/default.conf ~/.codeblocks/default.conf.bak  
  
# Αντιγράψτε το αρχείο default.conf από τον φάκελο που το κατεβάσατε, στον παρακάτω φάκελο  
cp default.conf ~/.codeblocks/
{% endhighlight %}
  
2. Εάν το εγκαταστήσετε από το αποθετήριο flatpak, τότε ο φάκελος είναι διαφορετικός. Αποθηκεύστε το αρχείο default.conf στον φάκελο όπως βλέπετε παρακάτω:  
  
{% highlight ruby %}
# Κρατήστε αντίγραφο ασφαλείας  
cp ~/.var/app/org.codeblocks.codeblocks/config/codeblocks/default.conf ~/.var/app/org.codeblocks.codeblocks/config/codeblocks/default.conf.bak  
  
# Αντιγράψτε το αρχείο default.conf από τον φάκελο που το κατεβάσατε, στον παρακάτω φάκελο  
cp default.conf ~/.var/app/org.codeblocks.codeblocks/config/codeblocks/
{% endhighlight %}

Τέλος, μετακινηθείτε στο **Settings->Editor->Syntax highlighting->Colour theme**. Ορίστε το στο επιθυμητό θέμα.  

Αρχικό post:  
[https://eiosifidis.blogspot.com/2020/11/codeblocks-gnulinux.html](https://eiosifidis.blogspot.com/2020/11/codeblocks-gnulinux.html)
