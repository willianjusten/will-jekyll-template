---
layout: post
title: "Απενεργοποίηση ήχου κάμερας κατά την λήψη screenshot"
date: 2021-09-07 12:30:00
description: Πως μπορούμε να απενεργοποιήσουμε τον ήχο της κάμερας κατά την λήψη στιγμιότυπου οθόνης;
tags:
- ήχος
- κάμερα
- απενεργοποίηση ήχου
- διανομές
categories:
- απενεργοποίηση ήχου
- ήχος
- κάμερα
- διανομές
twitter_text: 'Απενεργοποίηση ήχου κάμερας κατά την λήψη screenshot'
---

![Camera](/post_images/misc/camera.png "Camera")


# ΠΡΟΒΛΗΜΑ 

Σε συνέχεια του άρθρου [Ένωση πολλών εικόνων σε ένα .pdf](/enosi-eikonon-se-pdf), θα δουμε πως μπορούμε να απενεργοποιήσουμε τον ήχο κάμερας που κάνει ο υπολογιστής με το πάτημα του πλήκτρου **PrtScr**. Αν δεν βγάζετε πολλά στιγμιότυπα οθόνης, δεν θα σας πειράζει, αλλά αν τυχόν βγάζετε συχνά, θα δείτε ότι είναι ενοχλητικό. 

# ΛΥΣΗ 

Όσο και να έψαξα κάποια ρύθμιση, δεν βρήκα κάτι. Η λύση δόθηκε με την «διαγραφή» του ήχου και αντικατάστασή του με ένα κενό ήχο. Πως γίνεται αυτό; Για αρχή μετονομάστε τον ήχο για να το έχετε σε περίπτωση που θέλετε να τον επαναφέρετε.   

Αυτό γίνεται με την εντολή (μία γραμμή):

{% highlight ruby %}
sudo mv /usr/share/sounds/freedesktop/stereo/camera-shutter.oga /usr/share/sounds/freedesktop/stereo/camera-shutter-backup.oga
{% endhighlight %}

Αντικαταστήστε το με ένα κενό ήχο (μία γραμμή).

{% highlight ruby %}
sudo ffmpeg -f lavfi -i anullsrc -t 0.5 -c:a libvorbis /usr/share/sounds/freedesktop/stereo/camera-shutter.oga
{% endhighlight %}

Σε περίπτωση που θέλετε να επαναφέρετε τον ήχο της κάμερας, απλά δώστε την εντολή (μία γραμμή):

{% highlight ruby %}
sudo mv /usr/share/sounds/freedesktop/stereo/camera-shutter-backup.oga /usr/share/sounds/freedesktop/stereo/camera-shutter.oga
{% endhighlight %}

Αν έχετε βρει κάποιον άλλο τρόπο, αφήστε τον στα σχόλια.
