---
layout: post
title: "Εγκατάσταση και χρήση flatpak στο openSUSE"
date: 2019-12-26 12:30:00
description: Τελευταία εμφανίστηκαν πακέτα flatpak, snap, appimage. Εδώ θα δούμε πως γίνεται η εγκατάσταση του flatpak και βασική χρήση.
tags:
- openSUSE
- GNOME
- flatpak
- εγκατάσταση
- χρήση
categories:
- openSUSE
- GNOME
- flatpak
- leap
- tumbleweed
twitter_text: 'Πως να κάνετε εγκατάσταση του #flatpak στο #openSUSE'
---

![openSUSE και flatpak](/post_images/opensuse/opensuse-flatpak.png "openSUSE και flatpak")

Τελευταία εμφανίστηκαν πακέτα flatpak, snap, appimage. Πιστεύω ότι και τα τρία επιτελούν ένα καλό σκοπό. Εδώ θα δούμε πως μπορείτε να εγκαταστήσετε και να χρησιμοποιήσετε flatpak. Επειδή οι εντολές τερματικού ισχύουν για όλες τις διανομές, μπορείτε να τις χρησιμοποιήσετε και εσείς. Στην αρχή γίνεται εγκατάσταση για openSUSE

# ΕΓΚΑΤΑΣΤΑΣΗ

* Εγκατάσταση του flatpak.

{% highlight ruby %}
  sudo zypper install flatpak
{% endhighlight %}

* Εισαγωγή του αποθετηρίου flatpak.

{% highlight ruby %}
  sudo flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
{% endhighlight %}

* Επανεκκίνηση του συστήματος

Εναλλακτικά του αποθετηρίου, μπορείτε να κάνετε την εγκατάσταση από την ιστοσελίδα

> [https://flathub.org/apps](https://flathub.org/apps)


# ΕΝΤΟΛΕΣ ΤΕΡΜΑΤΙΚΟΥ

**Αναζήτηση**

{% highlight ruby %}
  flatpak search
{% endhighlight %}

"Δυστυχώς" το όνομα της εφαρμογής πρέπει να είναι ακριβές. Θα σας επιστρέψει τα αποτελέσματα που ταιριάζουν στο ερώτημά σας.

> ΠΑΡΑΔΕΙΓΜΑ
{% highlight ruby %}
  flatpak search libreoffice
{% endhighlight %}

**Εγκατάσταση**

Η γενική εντολή για να εγκαταστήσετε κάποιο πρόγραμμα είναι η εξής:

{% highlight ruby %}
  sudo flatpak install
{% endhighlight %}

Για παράδειγμα στην προηγούμενη εντολή αναζήτησης, θα λάβατε το ID της εφαρμογής και το όνομα του αποθετηρίου. Μπορείτε να χρησιμοποιήσετε αυτή την πληροφορία για να εγκαταστήσετε την εφαρμογή με την παρακάτω εντολή:

{% highlight ruby %}
  sudo flatpak install flathub org.libreoffice.LibreOffice
{% endhighlight %}

Μερικοί προγραμματιστές παρέχουν το δικό τους αποθετήριο. Έτσι πρέπει να χρησιμοποιήσετε την ακριβή διαδρομή για το αρχείο flatpakref και να εγκαταστήσετε την εφαρμογή (πχ *Spotify*).

{% highlight ruby %}
  sudo flatpak install --from https://flathub.org/repo/appstream/com.spotify.Client.flatpakref
{% endhighlight %}

**Εγκατάσταση από ένα αρχείο flatpakref**

Εάν κατεβάσατε το αρχείο *file.flatpakref* από το Flathub ή από αποθετήριο προγραμματιστή, μπορείτε να εγκαταστήσετε την εφαρμογή με την ακόλουθη εντολή:

{% highlight ruby %}
  sudo flatpak install file.flatpakref
{% endhighlight %}

Πρέπει να είστε στον ίδιο κατάλογο που έχετε κατεβάσει το αρχείο fltapakref (λογικά ο φάκελος των λήψεων), και χρειάζεται να εισάγετε το ακριβές όνομα του αρχείου flatpakref, μετά την λέξη install.

**Εκτέλεση ενός Flatpak**

Για να εκτελέσετε μια εφαρμογή Flatpak, μπορείτε να χρησιμοποιήσετε την παρακάτω εντολή:

{% highlight ruby %}
  flatpak run
{% endhighlight %}

**Εμφάνιση λίστας των εγκατεστημένων εφαρμογών Flatpak**

Μπορείτε να δείτε όλες τις εγκατεστημένες εφαρμογές Flatpak στο σύστημά σας με την εντολή:

{% highlight ruby %}
  flatpak list
{% endhighlight %}

**Απεγκατάσταση εφαρμογής Flatpak**

Μπορείτε να απεγκαταστήσετε μια εφαρμογή κάνοντας χρήση του id που είναι εγκατεστημένη, με την χρήση της εντολής:

{% highlight ruby %}
  sudo flatpak uninstall org.gimp.GIMP
{% endhighlight %}

**Ενημερώστε τις εφαρμογές Flatpak με την μια εντολή**

Χρήση της παρακάτω εντολής:

{% highlight ruby %}
  sudo flatpak update
{% endhighlight %}

Ενώ μπορείτε να κάνετε και αναβάθμιση μια-μια, πχ

{% highlight ruby %}
sudo flatpak update org.gimp.GIMP
{% endhighlight %}

**Ελευθερώστε χώρο, αφαιρώντας Flatpak που δεν χρησιμοποιείτε**

Είναι σοφό να καθαρίσετε το σύστημά σας από καιρό σε καιρό. Αυτό μπορείτε να το κάνετε αφαιρώντας Flatpak που δεν χρησιμοποιείτε με την εντολή:

{% highlight ruby %}
sudo flatpak uninstall --unused
{% endhighlight %}

Η παραπάνω εντολή δημιουργεί μια λίστα με αχρησιμοποίητα προγράμματα και σας δίνει την επιλογή να τα αφαιρέσετε.

# ΑΠΛΗ ΕΠΙΛΥΣΗ ΠΡΟΒΛΗΜΑΤΩΝ

Σίγουρα δεν είναι δυνατό να αναφερθούν όλα τα προβλήματα εδώ. Όμως τα πιο κοινά μπορεί να είναι τα εξής:

* Επιδιόρθωση Flatpak Installation Error

Συνήθως θα δείτε το παρακάτω σφάλμα:

{% highlight ruby %}
error: runtime/org.freedesktop.Platform/x86_64/1.6 not installed
{% endhighlight %}

Μπορείτε πολύ εύκολα να το διορθώσετε ως εξής:

{% highlight ruby %}
flatpak update -v
{% endhighlight %}

Επίσης μπορεί να λάβετε κάποιο σφάλμα κατά την εγκατάσταση εάν πχ έχετε χάλια σύνδεση στο διαδίκτυο ή έχει τερματίσει ο υπολογιστής κατά την εγκατάσταση. Μια απλή ενημέρωση των αποθετηρίων Flatpak συνήθως διορθώνει το σφάλμα.
