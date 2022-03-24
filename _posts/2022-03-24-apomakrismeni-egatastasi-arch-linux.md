---
layout: post
title: "Απομακρυσμένη εγκατάσταση Arch Linux"
date: 2022-03-24 12:00:00
description: Η εγκατάσταση Arch Linux γίνεται κυρίως από τερματικό. Αν δεν μπορείτε να την κάνετε εσείς, μπορεί σίγουρα κάποιος φίλος σας απομακρυσμένα (με ssh).
tags:
- arch linux
- archlinux
- remote
- απομακρυσμένη
- εγκατάσταση
categories:
- Arch Linux
- ArchLinux
- Remote
- Απομακρυσμένη
- Εγκατάσταση
twitter_text: 'Απομακρυσμένη εγκατάσταση Arch Linux'
---

![Arch Linux logo](/post_images/arch_linux/Archlinux-logo.png "Arch Linux logo"){:height="200px" width="200px"}

# ΙΔΕΑ

Η διανομή [Arch Linux](https://eiosifidis.blogspot.com/search/label/arch%20linux) έχει τεράστια αύξηση στη δημοτικότητά της. Αυτό μπορούμε να το παρατηρήσουμε και με την εμφάνιση όλο και περισσότερων διανομών με βάση το Arch Linux, όπως το [Manjaro](https://manjaro.org/), το [EndeavourOS](https://endeavouros.com/) και άλλες ([δείτε στο wiki](https://wiki.archlinux.org/title/Arch-based_distributions)).  
  
Η διανομή Arch Linux είναι μια [rolling έκδοση](https://eiosifidis.blogspot.com/2016/09/rolling-distro-mithos.html). Παλιά υπήρχε η φήμη ότι είναι ασταθή διανομή επειδή είναι rolling. Αυτή η φήμη δεν ισχύει πλέον. Αυτή που ισχύει όμως είναι ότι η διανομή έχει το πιο πλήρες και ενημερωμένο [wiki](https://wiki.archlinux.org/) το οποίο βοηθάει στην επίλυση προβλημάτων σε όλες τις διανομές.  
  
Προσωπικά, όταν ήρθα σε πρώτη επαφή με το Arch Linux, ξεκινούσε με ένα τερματικό. Εν έτη 2021, έχουν βάλει ένα υποτυπώδες script. Όμως κυκλοφορούν οι διανομές που έχουν βάση το Arch Linux με γραφικό εγκαταστάτη και διευκολύνουν πολύ την κατάσταση.  
  
Εδώ θα δούμε πως μπορούμε να κάνουμε εγκατάσταση από απόσταση με χρήση του ssh. Η λύση αυτή προτείνεται σε περιπτώσεις που κάποιος φίλος ζητάει από άλλον να τον βοηθήσει στην εγκατάσταση του Arch Linux στον υπολογιστή του. Δεν έχω δει πουθενά να υπάρχει πχ ένα εργαστήριο υπολογιστών ή μία εταιρία που να έχει σε όλους τους υπολογιστές της Arch Linux. Πάμε να δούμε τι πρέπει να κάνουμε ώστε να δώσουμε πρόσβαση ssh.  
  
## ΠΡΟΕΤΟΙΜΑΣΙΑ

* Αφού κατεβάσετε το ISO και το περάσετε σε ένα USB, εκκινήστε τον υπολογιστή σας με αυτό.  

![Arch Linux grub](/post_images/arch_linux/remote-install/archlinux-grub.png "Arch Linux grub")

* Θα ανοίξει μια οθόνη τερματικού. Εκεί θα πρέπει να ορίσετε το συνθηματικό για τον root με την εντολή.  

{% highlight ruby %}
passwd
{% endhighlight %}

![Αλλαγή συνθηματικού root στο Arch Linux](/post_images/arch_linux/remote-install/archlinux-passwd.png "Αλλαγή συνθηματικού root στο Arch Linux")

* Στη συνέχεια θα πρέπει να ελέξετε εάν η πρόσβαση στον χρήστη root με ssh είναι ενεργοποιημένη.  

{% highlight ruby %}
nano /etc/ssh/sshd\_config
{% endhighlight %}

![Arch Linux Permit Root Login](/post_images/arch_linux/remote-install/archlinux-permitrootlogin.png "Arch Linux Permit Root Login")

* Εκκινήστε την υπηρεσία ssh.  

{% highlight ruby %}
systemctl start sshd
{% endhighlight %}

* Δείτε ποιά IP έχει λάβει το σύστημα (εδώ 192.168.1.106) και ανοίξτε την πόρτα 22 στο ρούτερ σας.  

{% highlight ruby %}
ip add show
{% endhighlight %}

![Arch Linux ποια είναι η IP](/post_images/arch_linux/remote-install/archlinux-ip.png "Arch Linux ποια είναι η IP")

* Συνδεθείτε μέσω SSH και προχωρήστε στην εγκατάσταση.  

{% highlight ruby %}
ssh root@192.168.1.106
{% endhighlight %}

![Arch Linux σύνδεση με ssh](/post_images/arch_linux/remote-install/archlinux-passwd.png "Arch Linux σύνδεση με ssh")

Έχετε πλέον συνδεθεί και είστε έτοιμοι για την εγκατάσταση του Arch Linux. Μπορείτε να ανατρέξετε στον [οδηγό εγκατάστασης](https://eiosifidis.blogspot.com/2013/09/arch-linux-egatastasi.html) είτε στο [wiki](https://wiki.archlinux.org/title/installation_guide). 

Αρχική δημοσίευση:  
[https://eiosifidis.blogspot.com/2021/09/apomakrismeni-egatastasi-arch-linux.html](https://eiosifidis.blogspot.com/2021/09/apomakrismeni-egatastasi-arch-linux.html)
