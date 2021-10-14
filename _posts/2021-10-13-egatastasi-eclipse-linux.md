---
layout: post
title: "Εγκατάσταση Eclipse στο Linux"
date: 2021-10-13 12:00:00
description: Πως μπορούμε να κάνουμε εγκατάσταση το Eclipse σε διανομές Linux για να προγραμματίσουμε σε Java;
tags:
- java
- eclipse
- linux
- εγκατάσταση
- openSUSE
- ubuntu
- linux mint
- arch linux
- flatpak
- snap
- γλώσσα προγραμματισμού
- εγκατάσταση
categories:
- Java
- Eclipse
- openSUSE
- Ubuntu
- Linux Mint
- Εγκατάσταση
- Γλώσσα προγραμματισμού
- Flatpak
- Snap
twitter_text: 'Εγκατάσταση Eclipse στο Linux'
---

![Eclipse Logo](/post_images/eclipse/eclipse-logo.png "Eclipse Logo")


# ΠΡΟΛΟΓΟΣ

Η συγγραφή κώδικα μπορεί να γίνει με πολλούς τρόπους. Υπάρχουν οι hardcore προγραμματιστές που χρησιμοποιούν vim, nano ή gedit (κάποιον επεξεργαστή κειμένου δηλαδή). Υπάρχουν και αυτοί που βρίσκονται στο στάδιο της εκμάθησης, οπότε καλό είναι να μάθουν να χρησιμοποιούν τα εργαλεία, τα IDE που παρέχει η κάθε γλώσσα προγραμματισμού. Βέβαια όταν μάθουν όλους τους αυτοματισμούς και ευκολίες που προσφέρουν, δύσκολα θα μετακινηθούν σε κειμενογράφους τύπου vim (άσχετα αν είναι πολύ δυνατό εργαλείο με πολλές δυνατότητες). Προσωπικά προτιμώ το [Visual Studio Code](https://eiosifidis.blogspot.com/2021/09/visual-studio-code-linux-python-c-java.html) για την συγγραφή κώδικα αλλά υπάρχουν και άλλα IDE, ανάλογα με την γλώσσα προγραμματισμού που δουλεύει ο καθένας. Εμείς εδώ θα δούμε την εγκατάσταση και ρύθμιση του [Eclipse](https://www.eclipse.org/) για χρήση με την γλώσσα Java.  
  

# ΕΓΚΑΤΑΣΤΑΣΗ

Θα δούμε τους τρόπους εγκατάστασης του Eclipse.  
  

## FLATPAK

Τελευταία, όλο και πιο πολύ διαδίδονται οι εγκαταστάσεις μέσω λύσεων flatpak/snap. Προσωπικά προτιμώ το flatpak. Στην λύση αυτή βλέπουμε να κατεβαίνει η έκδοση java που θα συνεργαστεί με το Eclipse. Δεν θα χρειαστεί να ρυθμίσετε τίποτα. Μπορείτε να βρείτε [περισσότερα στην ιστοσελίδα](https://flathub.org/apps/details/org.eclipse.Java).  
  
Η εγκατάσταση γίνεται με την παρακάτω εντολή:  

{% highlight ruby %}
flatpak install flathub org.eclipse.Java
{% endhighlight %}
  
Σε Ubuntu 20.04.x, η έκδοση Flatpak είναι παλιά και δεν μπορείτε να εγκαταστήσετε το Eclipse. Οπότε πρέπει να το αναβαθμίσετε, [προσθέτοντας το παρακάτω αποθετήριο](https://launchpad.net/~alexlarsson/+archive/ubuntu/flatpak).  

{% highlight ruby %}
sudo add-apt-repository ppa:alexlarsson/flatpak     
sudo apt-get update
{% endhighlight %}
  
Είστε έτοιμοι. Απλά ανοίξτε το Eclipse και χρησιμοποιήστε το.  
  
## SNAP

Άλλη μια επιλογή, native για Ubuntu είναι η εγκατάσταση snap πακέτου. Για περισσότερες πληροφορίες, [δείτε στην ιστοσελίδα](https://snapcraft.io/eclipse).  
  
Η εγκατάσταση γίνεται με την παρακάτω εντολή:  

{% highlight ruby %}
sudo snap install eclipse --classic
{% endhighlight %}

Είστε έτοιμοι. Απλά ανοίξτε το Eclipse και χρησιμοποιήστε το.  
  
## ΛΗΨΗ ΑΠΟ ΙΣΤΟΣΕΛΙΔΑ

Εδώ είναι λίγο πιο περίπλοκα τα πράγματα. Πρέπει να βεβαιωθούμε ότι έχουμε εγκαταστήσει την Java και μετά να αποσυμπιέσουμε το πρόγραμμα.  

### ΕΓΚΑΤΑΣΤΑΣΗ Java

Πριν ξεκινήσουμε την εγκατάσταση, ας δούμε τις διαφορές μεταξύ JRE, OpenJDK και Oracle JDK.  

*   **JRE (Java Runtime Environment)** είναι αυτό που χρειάζεται για να εκτελεστεί μια εφαρμογή που βασίζεται σε Java. Αυτό είναι το μόνο που χρειάζεστε εάν δεν είστε προγραμματιστής.  
*   **JDK (Java Development Kit)** είναι αυτό που πρέπει να αναπτύξετε λογισμικό που σχετίζεται με την Java.  
*   H **[OpenJDK](https://openjdk.java.net/)** είναι υλοποίηση ανοικτού κώδικα του **Java Development Kit** ενώ το **[Oracle JDK](https://www.oracle.com/java/technologies/javase-downloads.html)** είναι η επίσημη έκδοση Oracle του Java Development Kit. Ενώ το OpenJDK είναι αρκετό για τις περισσότερες περιπτώσεις, ορισμένα προγράμματα όπως το [Android Studio](https://developer.android.com/studio) προτείνει τη χρήση του [Oracle JDK](https://www.oracle.com/java/technologies/javase-downloads.html) για αποφυγή ζητήματος διεπαφής χρήστη.

Για αρχή δείτε τι έκδοση java έχετε.  

{% highlight ruby %}
java -version
{% endhighlight %}
  
Εάν έχετε εγκατεστημένη την java, τότε σε ένα σύστημα Ubuntu θα δείτε τα παρακάτω:

{% highlight ruby %}
openjdk version "11.0.11" 2021-04-20    
OpenJDK Runtime Environment (build 11.0.11+9-Ubuntu-0ubuntu2.20.04)    
OpenJDK 64-Bit Server VM (build 11.0.11+9-Ubuntu-0ubuntu2.20.04, mixed mode, sharing)
{% endhighlight %}
  
![Έκδοση java σε openSUSE](/post_images/eclipse/eclipse-javaversion.jpg "Έκδοση java σε openSUSE")  

Ενώ σε ένα σύστημα που δεν έχει εγκατεστημένη την java, θα δείτε ένα αποτέλεσμα του τύπου:  

{% highlight ruby %}
The program ‘java’ can be found in the following packages:  
* default-jre  
* gcj-4.6-jre-headless  
* openjdk-6-jre-headless  
* gcj-4.5-jre-headless  
* openjdk-7-jre-headless  
Try: sudo apt-get install
{% endhighlight %}
  
#### Εγκατάσταση JRE σε Debian/Ubuntu

Για εγκατάσταση του Java Runtime Environment  

{% highlight ruby %}
sudo apt install default-jre
{% endhighlight %}

#### Εγκατάσταση OpenJDK σε Debian/Ubuntu

Για εγκατάσταση του OpenJDK  

{% highlight ruby %}
sudo apt install default-jdk
{% endhighlight %}

#### Εγκατάσταση openSUSE

Στο openSUSE να έχετε εγκατεστημένα τα παρακάτω (έκδοση Java 11):  

{% highlight ruby %}
sudo zypper in java-11-openjdk-devel java-11-openjdk java-11-openjdk-headless
{% endhighlight %}
  
#### Εγκατάσταση Oracle JDK

Για εγκατάσταση του [Oracle JDK](https://www.oracle.com/java/technologies/javase-downloads.html), κατεβάστε και εγκαταστείστε το αντίστοιχο αρχείο για την διανομή σας.  
  
Εναλλακτικά σε Ubuntu based διανομές, μπορείτε να εισάγετε το αποθετήριο:  

{% highlight ruby %}
sudo add-apt-repository ppa:webupd8team/java  
sudo apt-get update
{% endhighlight %}
  
Και στη συνέχεια για την java έκδοση 16 (αυτή κυκλοφορεί τελευταία. Αν θέλετε να αλλάξετε έκδοση, απλά αλλάξτε το νούμερο), μπορείτε να την εγκαταστήσετε με τις παρακάτω εντολές:  

{% highlight ruby %}
sudo apt install oracle-java16-installer  
sudo apt install oracle-java16-set-default
{% endhighlight %}
  
Γενικά σε [openSUSE, υπάρχει διαθέσιμη τεκμηρίωση](https://en.opensuse.org/SDB:Installing_Java).  
  
Για Arch Linux, υπάρχει και [τεκμηρίωση στο wiki](https://wiki.archlinux.org/title/java).  
  
### ΕΓΚΑΤΑΣΤΑΣΗ Eclipse

Η εγκατάσταση του Eclipse ακολουθεί. Μετακινηθείτε στην [ιστοσελίδα των λήψεων](https://www.eclipse.org/downloads/). Πατήστε το **Download x86\_64** και θα κατέβει ένα αρχείο με το όνομα **eclipse-inst-jre-linux64.tar.gz**.  
  
Αποσυμπιέστε το και μετακινηθείτε στον φάκελο. Εκεί πατήστε διπλό κλικ στο **eclipse-inst**.  

![Φάκελος στο Nautilus](/post_images/eclipse/eclipse-nautilus.png "Φάκελος στο Nautilus")  

Στο παράθυρο που θα ανοίξει, επιλέξτε **Eclipse IDE for Java Developers**.  

![Eclipse IDE for Java Developers](/post_images/eclipse/eclipse-forjavadevelopers.jpg "Eclipse IDE for Java Developers")  

Στο παράθυρο αυτό, δεν φαινόταν τα γράμματα στο πεδίο _Java 11+ VM_. Μπορεί να φταίει το θέμα από το γραφικό περιβάλλον. Όπως και να έχει, πατήστε στο βελάκι και θα εμφανιστεί η διαδρομή της Java. Αν δεν βλέπετε τίποτα, τότε μάλλον πρέπει να τσεκάρετε πάλι εάν είναι εγκατεστημένη η Java.  

![Διαδρομή Java 11+ VM](/post_images/eclipse/eclipse-openjdk.jpg "Διαδρομή Java 11+ VM")  

Επιλέξτε και εάν θέλετε να προστεθεί εκκινητής στο μενού αλλά και στην επιφάνεια εργασίας. Πατήστε **Install** και περιμένετε.  

![Το Eclipse είναι έτοιμο για εγκατάσταση](/post_images/eclipse/eclipse-ready2install.jpg "Το Eclipse είναι έτοιμο για εγκατάσταση")  
  
Αναμένετε να ολοκληρωθεί η εγκατάσταση.  

![Εγκατάσταση Eclipse](/post_images/eclipse/eclipse-installing.jpg "Εγκατάσταση Eclipse")  

Αφού ολοκληρωθεί η εγκατάσταση, πατήστε στο **Launch** για να εκκινήσει το πρόγραμμα.  

![Εκκίνηση του Eclipse](/post_images/eclipse/eclipse-launch.jpg "Εκκίνηση του Eclipse")  

Θα σας ρωτήσει ποιον φάκελο θέλετε να χρησιμοποιήσετε ως φάκελο για να αποθηκεύετε τα αρχεία που θα φτάχνετε. Μπορείτε να αφήσετε τον φάκελο ως έχει. Πατήστε **Launch** και περιμένετε.  

![Eclipse workspace](/post_images/eclipse/eclipse-workspace.jpg "Eclipse workspace")  
  
Αναμένετε μέχρι να τελειώσει το άνοιγμα του Eclipse.  

![Άνοιγμα Eclipse](/post_images/eclipse/eclipse-opening.jpg "Άνοιγμα Eclipse")  

Αφού ανοίξει, μπορούμε να γράψουμε και το πρώτο πρόγραμμα [Hello world](https://www.programiz.com/java-programming/hello-world) για να δούμε εάν δουλεύει.  

![Hello world](/post_images/eclipse/eclipse-helloworld.png "Hello world")  

Και πλέον είμαστε έτοιμοι για να γράψουμε τα προγράμματά μας στην γλώσσα Java.  
  
Περισσότερες πληροφορίες δείτε στην σελίδα [https://wiki.eclipse.org/Eclipse/Installation](https://wiki.eclipse.org/Eclipse/Installation)  

Μοιράσου την γνώση με κάποιον που δυσκολεύεται να εγκαταστήσει το **Eclipse**.

Αρχική δημοσίευση:  
[https://eiosifidis.blogspot.com/2021/09/egatastasi-eclipse-linux.html](https://eiosifidis.blogspot.com/2021/09/egatastasi-eclipse-linux.html)
