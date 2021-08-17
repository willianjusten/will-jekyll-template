---
layout: post
title: "Εγκατάσταση και ενεργοποίηση του flatpak και snap σε openSUSE Leap/Tumbleweed"
date: 2021-08-17 12:30:00
description: Oδηγίες εγκατάστασης flatpak και snap σε openSUSE Leap/Tumbleweed
tags:
- openSUSE
- εγκατάσταση
- ρυθμίσεις
- flatpak
- snap
categories:
- openSUSE
- flatpak
- snap
twitter_text: 'Εγκατάσταση και ενεργοποίηση του flatpak και snap σε openSUSE Leap/Tumbleweed'
---

![openSUSE](/post_images/opensuse/small-lamp.png "openSUSE"){:height="200px" width="200px"}

Στο παρόν άρθρο θα δούμε πως μπορεί κάποιος να εγκαταστήσει το [flatpak](https://flatpak.org/) και το [snap](https://snapcraft.io/) έτσι ώστε να κάνει εγκατάσταση προγραμμάτων από αυτά τα αποθετήρια. Προσωπικά προτιμώ το flatpak.

## FLATPAK

Είδαμε σε προηγούμενο άρθρο [ΕΓΚΑΤΑΣΤΑΣΗ ΚΑΙ ΧΡΗΣΗ FLATPAK ΣΤΟ OPENSUSE](/how-to-install-flatpak-on-openSUSE/).  

Εδώ θα πάρουμε μόνο τις δυο εντολές για την εγκατάσταση και ενεργοποίησή του.

### ΕΓΚΑΤΑΣΤΑΣΗ

* Εγκατάσταση του flatpak.

{% highlight ruby %}
sudo zypper install flatpak
{% endhighlight %}

* Εισαγωγή του αποθετηρίου flatpak.

{% highlight ruby %}
sudo flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
{% endhighlight %}

* Επανεκκίνηση του συστήματος

Για εγκατάσταση εφαρμογών, μπορείτε να χρησιμοποιήσετε την ιστοσελίδα:

[https://flathub.org/apps](https://flathub.org/apps)


## SNAP

Εδώ θα δούμε πως γίνεται η εγκατάσταση και ενεργοποίηση του snap. 

### Εισαγωγή αποθετηρίων

Το Snap μπορεί να εγκατασταθεί από τη γραμμή εντολών στο openSUSE Leap 15 και Tumbleweed.

Πρέπει πρώτα να προσθέσετε το αποθετήριο από το τερματικό. Μπορείτε να βρείτε το ακριβές αποθετήριο για την έκδοσή σας, από [εδώ](https://download.opensuse.org/repositories/system:/snappy/).

{% highlight ruby %}
Για openSUSE Leap 15.3 (μια γραμμή)
sudo zypper addrepo --refresh https://download.opensuse.org/repositories/system:/snappy/openSUSE_Leap_15.3/ snappy

Για openSUSE Tumbleweed (μια γραμμή)
sudo zypper addrepo --refresh https://download.opensuse.org/repositories/system:/snappy/openSUSE_Tumbleweed/ snappy
{% endhighlight %}

Με το αποθετήριο, εισαγάγετε το κλειδί GPG:

{% highlight ruby %}
sudo zypper --gpg-auto-import-keys refresh
{% endhighlight %}

Τέλος, αναβαθμίστε την προσωρινή μνήμη του πακέτου για να συμπεριλάβετε το νέο αποθετήριο snappy:

{% highlight ruby %}
sudo zypper dup --from snappy
{% endhighlight %}

### Εγκατάσταση snap

Το Snap μπορεί τώρα να εγκατασταθεί με τα εξής:

{% highlight ruby %}
sudo zypper install snapd
{% endhighlight %}

### Ενεργοποίηση snapd

Στη συνέχεια, χρειάζεται είτε να κάνετε επανεκκίνηση, αποσύνδεση/σύνδεση ή source /etc/profile για να προσθέσετε /snap/bin στο PATH. Επιπλέον, ενεργοποιήστε και ξεκινήστε τις υπηρεσίες snapd και snapd.apparmor με τις ακόλουθες εντολές:

{% highlight ruby %}
sudo systemctl enable snapd
sudo systemctl start snapd
{% endhighlight %}

Οι χρήστες Tumbleweed πρέπει επίσης να εκτελέσουν τα εξής:

{% highlight ruby %}
sudo systemctl enable snapd.apparmor
sudo systemctl start snapd.apparmor
{% endhighlight %}

Για εγκατάσταση εφαρμογών, μπορείτε να χρησιμοποιήσετε την ιστοσελίδα:

[https://snapcraft.io/store](https://snapcraft.io/store)
