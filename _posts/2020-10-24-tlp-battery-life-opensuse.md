---
layout: post
title: "Όρια φόρτισης μπαταρίας και διαχείριση ισχύος στο openSUSE με TLP"
date: 2020-10-24 12:30:00
description: Στους περισσότερους φορητούς υπολογιστές, η μπαταρία είναι το πρόβλημα. Πως θα αυξήσετε τη διάρκεια της μπαταρίας σας;
tags:
- opensuse
- tlp
- μπαταρία
categories:
- openSUSE
- tlp
twitter_text: 'Όρια φόρτισης #μπαταρίας και διαχείριση ισχύος στο @openSUSE με #TLP'
---

![openSUSE Lamp](/post_images/opensuse/small-lamp.jpg "openSUSE Leap")

# Πρόλογος

Οι μπαταρίες είναι ένα σημαντικό στοιχείο στη βιωσιμότητα των φορητών υπολογιστών. Αξίζει ειδική μεταχείριση για την παράταση της διάρκειας ζωής τους. Μια ειδική μεταχείριση λοιπόν είναι με την προσαρμογή των ορίων φόρτισης μπαταρίας.  

Τα όρια φόρτισης μπαταρίας είναι ένας μηχανισμός διακοπής φόρτησης, προτού να φορτιστεί πλήρως η μπαταρία και συνέχιση φόρτησης όταν αρχίσει να αδειάζει. Χωρίς ποτέ φόρτιση της μπαταρίας να πάει στο 100%, η διάρκεια ζωής της μπαταρίας μεγαλώνει. Ρυθμίστε για διακοπή της φόρτισης, εάν η χωρητικότητα της μπαταρίας είναι 85% και επανέναρξη όταν η μπαταρία είναι 75%. Μπορείτε να προσαρμόσετε αυτήν την ποσοστιαία τιμή όπως θέλετε.

{% highlight ruby %}
START_CHARGE_THRESH_BAT0="75"
STOP_CHARGE_THRESH_BAT0="85"

START_CHARGE_THRESH_BAT1="75"
STOP_CHARGE_THRESH_BAT1="85"
{% endhighlight %}

Αυτή η δυνατότητα διαχείρισης ενέργειας είναι αρκετά ολοκληρωμένη όταν χρησιμοποιείτε το ThinkVantage σε λειτουργικό σύστημα Windows. Προφανώς, το ThinkVantage είναι ένα ξεχωριστό χαρακτηριστικό της σειράς φορητών υπολογιστών Thinkpad. Το λογισμικό ThinkVantage δεν είναι διαθέσιμο στο λειτουργικό σύστημα GNU / Linux.  

Μία εφαρμογή που μπορεί να εκτελέσει το καθήκον του καθορισμού ορίων φόρτισης μπαταρίας είναι το TLP. Αυτό το λογισμικό είναι άμεσα διαθέσιμο σε πολλά αποθετήρια διανομών GNU / Linux.

# Εγκατάσταση TPL

Βλέποντας στον επίσημο ιστότοπο TLP στον σύνδεσμο [https://linrunner.de/tlp/](https://linrunner.de/tlp/) , τα βήματα εγκατάστασης και η εκτέλεση του είναι αρκετά εύκολα.

{% highlight ruby %}
sudo zypper in tlp-rdw
sudo systemctl enable tlp
{% endhighlight %}

# Διαμόρφωση TPL

Η διαμόρφωση του TLP γίνεται αλλάζοντας τις ρυθμίσεις στο αρχείο του TLP στη διεύθυνση: /etc/tlp.conf. Χρησιμοποιήστε το αγαπημένο σας πρόγραμμα επεξεργασίας κειμένου. Εδώ είναι η διαμόρφωση η δικιά μου:

{% highlight ruby %}
--- TLP 1.3.1 --------------------------------------------
+++ Configured Settings:
/etc/tlp.conf L0026: TLP_ENABLE="1"
/etc/tlp.conf L0038: TLP_PERSISTENT_DEFAULT="0"
/etc/tlp.conf L0050: DISK_IDLE_SECS_ON_AC="0"
/etc/tlp.conf L0051: DISK_IDLE_SECS_ON_BAT="2"
/etc/tlp.conf L0056: MAX_LOST_WORK_SECS_ON_AC="15"
/etc/tlp.conf L0057: MAX_LOST_WORK_SECS_ON_BAT="60"
/etc/tlp.conf L0100: CPU_ENERGY_PERF_POLICY_ON_AC="balance_performance"
/etc/tlp.conf L0101: CPU_ENERGY_PERF_POLICY_ON_BAT="balance_power"
/etc/tlp.conf L0128: SCHED_POWERSAVE_ON_AC="0"
/etc/tlp.conf L0129: SCHED_POWERSAVE_ON_BAT="1"
/etc/tlp.conf L0135: NMI_WATCHDOG="0"
/etc/tlp.conf L0150: DISK_DEVICES="sda"
/etc/tlp.conf L0158: DISK_APM_LEVEL_ON_AC="254 254"
/etc/tlp.conf L0159: DISK_APM_LEVEL_ON_BAT="128 128"
/etc/tlp.conf L0198: SATA_LINKPWR_ON_AC="med_power_with_dipm max_performance"
/etc/tlp.conf L0199: SATA_LINKPWR_ON_BAT="med_power_with_dipm min_power"
/etc/tlp.conf L0219: AHCI_RUNTIME_PM_TIMEOUT="15"
/etc/tlp.conf L0264: WIFI_PWR_ON_AC="off"
/etc/tlp.conf L0265: WIFI_PWR_ON_BAT="on"
/etc/tlp.conf L0270: WOL_DISABLE="Y"
/etc/tlp.conf L0276: SOUND_POWER_SAVE_ON_AC="0"
/etc/tlp.conf L0277: SOUND_POWER_SAVE_ON_BAT="1"
/etc/tlp.conf L0283: SOUND_POWER_SAVE_CONTROLLER="Y"
/etc/tlp.conf L0291: BAY_POWEROFF_ON_AC="0"
/etc/tlp.conf L0292: BAY_POWEROFF_ON_BAT="0"
/etc/tlp.conf L0302: RUNTIME_PM_ON_AC="on"
/etc/tlp.conf L0303: RUNTIME_PM_ON_BAT="auto"
/etc/tlp.conf L0323: USB_AUTOSUSPEND="1"
/etc/tlp.conf L0342: USB_BLACKLIST_PHONE="0"
/etc/tlp.conf L0354: USB_BLACKLIST_WWAN="0"
/etc/tlp.conf L0374: RESTORE_DEVICE_STATE_ON_STARTUP="0"
/etc/tlp.conf L0442: NATACPI_ENABLE="1"
/etc/tlp.conf L0443: TPACPI_ENABLE="1"
/etc/tlp.conf L0444: TPSMAPI_ENABLE="1"
/etc/tlp.conf L0032: TLP_DEFAULT_MODE="AC"
/etc/tlp.conf L0076: CPU_SCALING_GOVERNOR_ON_AC="powersave"
/etc/tlp.conf L0077: CPU_SCALING_GOVERNOR_ON_BAT="powersave"
/etc/tlp.conf L0425: START_CHARGE_THRESH_BAT0="80"
/etc/tlp.conf L0426: STOP_CHARGE_THRESH_BAT0="90"
/etc/tlp.conf L0431: START_CHARGE_THRESH_BAT1="80"
/etc/tlp.conf L0432: STOP_CHARGE_THRESH_BAT1="90"
{% endhighlight %}

# Εκτέλεση TLP

Αφού πραγματοποιήσετε τη ρύθμιση που θέλετε, το TLP είναι έτοιμο για εκτέλεση.


{% highlight ruby %}
sudo systemctl restart tlp
sudo tlp start #εκκίνηση tlp
sudo tlp-stat -s #προβολή κατάστασης tlp
sudo tlp-stat -c #για να δείτε ποια ρύθμιση εκτελείται
{% endhighlight %}

Υλικό ανάγνωσης:  
[https://www.tecmint.com/tlp-increase-and-optimize-linux-battery-life/](https://www.tecmint.com/tlp-increase-and-optimize-linux-battery-life/)
