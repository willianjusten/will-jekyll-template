---
layout: post
title: "Μετράμε την ταχύτητα δικτύου με το speedtest-cli"
date: 2021-11-17 12:00:00
description: Πως μπορείτε να διορθώσετε το σφάλμα του speedtest-cli όταν εκτελείτε στο τερματικό
tags:
- speedtest-cli
- τερματικό
- openSUSE
- ubuntu
- linux mint
- arch linux
- διόρθωση
categories:
- speedtest-cli
- τερματικό
- openSUSE
- Ubuntu
- Linux Mint
- Εγκατάσταση
- Γλώσσα προγραμματισμού
- διόρθωση
twitter_text: 'Μετράμε την ταχύτητα δικτύου με το speedtest-cli'
---

![Internet Speed](/post_images/misc/internetspeed.png "Internet Speed")


# ΜΕΤΡΗΣΗ ΤΑΧΥΤΗΤΑΣ ΔΙΚΤΥΟΥ

Όπως μερικοί έχουν κόλλημα με τα γρήγορα αυτοκίνητα και με την ταχύτητα, οι περισσότεροι από εμάς, έχουν κόλλημα με την ταχύτητα (bandwith) του δικτύου τους. Πως γίνεται η μέτρηση;  
  
Υπάρχουν εταιρίες που έχουν φτιάξει δικές τους μετρήσεις όπως πχ [https://www.speedtest.gr/](https://www.speedtest.gr/), [cablenet](https://cablenet.speedtestcustom.com/), [npref](https://www.nperf.com/el/) αλλά οι πιο γνωστές είναι οι [Speedtest](https://www.speedtest.net/) και η [fast.com](https://fast.com). To speedtest είναι διαθέσιμο και από τερματικό στις περισσότερες διανομές.  
  

## ΠΡΟΒΛΗΜΑ

Έχω εγκαταστήσει λοιπόν την εφαρμογή από τα επίσημα αποθετήρια. Ξεκινάω να κάνω ένα έλεγχο στο τερματικό με την εντολή.  

{% highlight ruby %}
speedtest-cli
{% endhighlight %}
  
Και λαμβάνω το αποτέλεσμα:  

{% highlight ruby %}
Retrieving speedtest.net configuration...
Traceback (most recent call last):  
  File "/usr/bin/speedtest-cli", line 11, in module  
    load_entry_point('speedtest-cli==2.0.0', 'console_scripts', 'speedtest-cli')()  
  File "/usr/lib/python3/dist-packages/speedtest.py", line 1832, in main  
    shell()  
  File "/usr/lib/python3/dist-packages/speedtest.py", line 1729, in shell  
    secure=args.secure  
  File "/usr/lib/python3/dist-packages/speedtest.py", line 1009, in __init__  
    self.get_config()  
  File "/usr/lib/python3/dist-packages/speedtest.py", line 1081, in get_config  
    map(int, server_config['ignoreids'].split(','))  
ValueError: invalid literal for int() with base 10: ''
{% endhighlight %}
  
  
Δεν είναι ένα πρόγραμμα που εξαρτάται η ζωή μας από αυτό αλλά καλό είναι να μπορούμε να το εκτελούμε.  
  

## ΛΥΣΗ

1. Αφαιρέστε το πρόγραμμα που έχετε εγκαταστήσει  

{% highlight ruby %}
**Για Ubuntu:**  
sudo apt remove speedtest-cli  
  
**Για openSUSE:**    
sudo zypper rm speedtest-cli  
{% endhighlight %}
  
2. Στο τερματικό εκτελέστε την εντολή:  

{% highlight ruby %}
pip3 install speedtest_cli
{% endhighlight %}
  
3. Όταν τελειώσει η εγκατάσταση, στο τερματικό γράψτε την εντολή:  

{% highlight ruby %}
nano ~/.profile
{% endhighlight %}
  
Και στο τέλος του αρχείου προσθέστε την γραμμή:  

{% highlight ruby %}
PATH="$PATH:$HOME/.local/bin"
{% endhighlight %}
  
  
4. Αφού αποθηκεύσετε, εκτελέστε την εντολή:  

{% highlight ruby %}
source ~/.profile
{% endhighlight %} 
  
Είστε έτοιμοι να εκτελέσετε το πρόγραμμα στο τερματικό και να δείτε την ταχύτητα του δικτύου σας.

Αρχική δημοσίευση:  
[https://eiosifidis.blogspot.com/2021/09/diorthosi-speedtest-cli.html](https://eiosifidis.blogspot.com/2021/09/diorthosi-speedtest-cli.html)
