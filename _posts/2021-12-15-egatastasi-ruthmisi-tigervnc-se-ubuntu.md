---
layout: post
title: "Εγκατάσταση και ρύθμιση διακομιστή TigerVNC σε Ubuntu"
date: 2021-12-15 12:00:00
description: Πως να εγκαταστήσετε και να ρυθμίσετε το TigerVNC. Μόλις το κάνετε, συνδεθείτε απομακρυσμένα με το GNOME Boxes ή το Remmina και ρυθμίστε απομακρυσμένα
tags:
- tigerVNC
- Remmina
- ubuntu
- linux mint
- VNC
- GNOME Boxes
- GNOME
categories:
- tigerVNC
- Remmina
- Ubuntu
- Linux Mint
- VNC
- GNOME Boxes
- GNOME
twitter_text: 'Εγκατάσταση και ρύθμιση διακομιστή TigerVNC σε Ubuntu'
---

![TigerVNC logo](/post_images/tigervnc/TigerVNC_logo.png "TigerVNC logo"){:height="200px" width="200px"}


# ΠΡΟΒΛΗΜΑ

Σας έχει τύχει ποτέ να είστε στο σπίτι σας με την οικογένειά σας και ξάφνου να σας τηλεφωνίσει κάποιος φίλος ή πελάτης και να σας πει **ΚΑΙΓΟΜΑΙ, ΔΕΝ ΔΟΥΛΕΥΕΙ ΤΟ ΠΡΟΓΡΑΜΜΑ. ΒΟΗΘΑ ΜΕ. ΤΙ ΣΕ ΠΛΗΡΩΝΩ;** (το τελευταίο περί πληρωμής αν είναι πελάτης σας). Αυτό είναι μια από τις πολλές περιπτώσεις που αν δεν μπορείτε να μετακινηθείτε για να το δείτε από κοντά (πχ πανδημία), θα πρέπει να συνδεθείτε απομακρυσμένα. Οι λύσεις είναι αρκετές αλλά κάποιες από αυτές είναι περίεργες. Σίγουρα θα σας έχει έρθει στο μυαλό το [Teamviewer](https://www.teamviewer.com/en/products/teamviewer/), όμως τελευταία έχει κάνει αλλαγές στις άδειες χρήσης και πολλοί χρήστες μεταφέρονται στο [Anydesk](https://anydesk.com/el). Προσωπικά δεν το έχω δουλέψει και δεν μπορώ να εκφέρω γνώμη. Υπάρχει και ένα πρόσθετο που λέγεται [Chrome Remote Dekstop](https://remotedesktop.google.com/?pli=1) αλλά πολλά ερωτήματα δημιουργούνται γιατί βρίσκεται στη μέση η Google. Εμείς εδώ θα δούμε τον τρόπο σύνδεσης με το VNC.  

Το VNC είναι ακρωνύμιο του **Virtual Network Computing**. Δεν είναι παρά ένα σύστημα κοινής χρήσης επιφάνειας εργασίας Linux ή ένα σύνολο πρωτοκόλλων για κοινή χρήση της επιφάνειας εργασίας. Κάποιος μπορεί να χρησιμοποιήσει το VNC για να ελέγξει ή να αποκτήσει απομακρυσμένη πρόσβαση στην επιφάνεια εργασίας του Linux. Το VNC λειτουργεί με το μοντέλο πελάτη-διακομιστή. Υπάρχουν πολλές εφαρμογές του πρωτοκόλλου VNC για συστήματα παρόμοια με Linux ή Unix. Μερικά χαρακτηριστικά παραδείγματα είναι τα TigerVNC, TightVNC, Vino (προεπιλογή για επιτραπέζιους υπολογιστές Gnome), x11vnc, krfb (προεπιλογή για επιτραπέζιους υπολογιστές KDE), vnc4server και άλλα. Εδώ θα δούμε πώς να εγκαταστήσετε και να ρυθμίσετε τις παραμέτρους του TigerVNC στο σύστημα Linux για πλήρη πρόσβαση σε επιφάνεια εργασίας του Gnome.  

## Εγκατάσταση TigerVNC

Στο τερματικό εγκαταστήστε τα παρακάτω:  

{% highlight ruby %}
sudo apt install tigervnc-standalone-server tigervnc-xorg-extension tigervnc-viewer
{% endhighlight %} 

## Ρύθμιση TigerVNC

Αρχικά ρυθμίσετε το συνθηματικό για τη σύνδεση vnc:  

{% highlight ruby %}
vncpasswd  
ls -l ~/.vnc/
{% endhighlight %} 

Πρέπει να δημιουργήσετε ένα όνομα αρχείου ~/.vnc/xstartup χρησιμοποιώντας έναν επεξεργαστή κειμένου:  

{% highlight ruby %}
nano ~/.vnc/xstartup
{% endhighlight %} 

Με το παρακάτω περιεχόμενο:  

{% highlight ruby %}
#!/bin/sh  
# Start Gnome 3 Desktop  
[ -x /etc/vnc/xstartup ] && exec /etc/vnc/xstartup  
[ -r $HOME/.Xresources ] && xrdb $HOME/.Xresources  
vncconfig -iconic &  
dbus-launch --exit-with-session gnome-session &
{% endhighlight %} 

## Έναρξη TigerVNC

Η έναρξη γίνεται απλά με την εντολή:  

{% highlight ruby %}
vncserver
{% endhighlight %} 

Αλλά μπορείτε να ρυθμίσετε το βάθος bit επιφάνειας εργασίας, όπως 8, 16, 24, 32 και γεωμετρία επιφάνειας εργασίας σε {width} x {height} ως εξής:  

{% highlight ruby %}
**ΓΕΝΙΚΗ ΣΥΝΤΑΞΗ**  
vncserver -depth {8|16|24|32} -geometry {width}x{height}  

**ΠΑΡΑΔΕΙΓΜΑ**  
vncserver -depth 32 -geometry 1680x1050
{% endhighlight %} 

Εάν θέλετε να εκτελείται πάντα κατά την εκκίνηση, επεξεργαστείτε το αρχείο **/etc/default/vncserver** και προσθέστε τον αριθμό εμφάνισης και τον χρήστη για να ξεκινήσετε ως εξής:  

{% highlight ruby %}
sudo nano /etc/default/vncserver  

VNCSERVERS="1:myusername"
{% endhighlight %} 

Στη συνέχεια, ενεργοποιήστε την υπηρεσία κατά την εκκίνηση με την εντολή:  

{% highlight ruby %}
sudo update-rc.d vncserver defaults
{% endhighlight %} 

Επαληθεύστε ότι εκτελούνται με την εντολή ss και την εντολή pgrep:  

{% highlight ruby %}
pgrep Xtigervnc  

ss -tulpn | egrep -i 'vnc|590'
{% endhighlight %} 

## Διακοπή TigerVNC

Για να σταματήσετε έναν διακομιστή VNC που εκτελείται στη διεύθυνση: 1  

{% highlight ruby %}
vncserver -kill :1
{% endhighlight %} 

Συνήθως θα είναι στη διεύθυνση :1 αλλά καλού-κακού πιάνει και η εντολή:  

{% highlight ruby %}
vncserver -kill :*
{% endhighlight %} 

Και θα δείτε ένα αποτέλεσμα του στυλ:  

{% highlight ruby %}
Killing Xtigervnc process ID 7543... success!
{% endhighlight %} 

## Πως να εμφανίζετε συνεδρίες του TigerVNC

Με την εντολή:  

{% highlight ruby %}
vncserver -list
{% endhighlight %} 

Θα εμφανιστεί ένα αποτέλεσμα του τύπου:  

{% highlight ruby %}
TigerVNC server sessions:

X DISPLAY #	RFB PORT #	PROCESS ID
:1		5901		7543
{% endhighlight %} 

Εδώ το **5901** είναι η πόρτα που μπορούμε να χρησιμοποιήσουμε με την εντολή ssh.  

## Σύνδεση από τον απομακρυσμένο υπολογιστή

Έστω ο υπολογιστής που θέλετε να συνδεθείτε έχει την IP **192.168.1.100**. Μπορείτε να ανοίξετε το τερματικό και με την χρήση της εντολής:  

{% highlight ruby %}
gvncviewer 192.168.1.100:5901
{% endhighlight %} 

θα ανοίξει ένα παράθυρο προτροπής να εισάγετε το συνθηματικό που εισάγατε στις ρυθμίσεις.  

Εναλλακτικά μπορείτε να ανοίξετε το πρόγραμμα GNOME-BOXES και να δημιουργήσετε **νέα σύνδεση σε απομακρυσμένο υπολογιστή**, όπου θα εισάγετε την διεύθυνση:  

{% highlight ruby %}
vnc://192.168.1.100:5901
{% endhighlight %} 

![GNOME Boxes σύνδεση με VNC](/post_images/tigervnc/vnc-gnome-boxes.jpg "GNOME Boxes σύνδεση με VNC")


Τέλος, ένα καλό πρόγραμμα να συνδεθείτε είναι το [Remina](https://remmina.org/). Μπορείτε είτε να δημιουργήσετε μια σύνδεση ή να συνδεθείτε εισάγοντας την διεύθυνση στο πλαίσιο όπως βλέπετε στην εικόνα:  

![Σύνδεση με VNC με το Remmina](/post_images/tigervnc/vnc-remmina.png "Σύνδεση με VNC με το Remmina")

# Συμπέρασμα

Μάθαμε πως να εγκαθιστούμε και να ρυθμίζουμε το TigerVNC. Το πρωτόκολλο VNC δεν είναι και τόσο ασφαλές. Είναι κατά την σύνδεση με εισαγωγή του συνθηματικού αλλά η σύνδεση δεν είναι κρυπτογραφημένη. Πρέπει να μάθετε να κάνετε την επικοινωνία ασφαλή χρησιμοποιώντας το ssh. Πρέπει να συνδεθείτε στο διακομιστή VNC χρησιμοποιώντας tunnel SSH. Πως θα το κάνετε αυτό; Διαβάστε στην τεκμηρίωση παρακάτω ή απλά περιμένετε κάποιο νέο άρθρο. Προς το παρόν διαμοιραστείτε το άρθρο και γράψτε ένα σχόλιο για την εμπειρία σας.  

# ΠΛΗΡΟΦΟΡΙΕΣ

1. [TigerVNC](https://github.com/TigerVNC/tigervnc)   
2. [VNC/Servers](https://help.ubuntu.com/community/VNC/Servers#TigerVNC)   
3. [Connect to another computer](https://help.gnome.org/users/gnome-boxes/stable/connect.html.en)  

Αρχική δημοσίευση:  
[https://eiosifidis.blogspot.com/2021/09/egatastasi-ruthmisi-tigervnc-se-ubuntu.html](https://eiosifidis.blogspot.com/2021/09/egatastasi-ruthmisi-tigervnc-se-ubuntu.html)
