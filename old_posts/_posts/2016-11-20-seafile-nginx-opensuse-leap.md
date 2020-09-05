---
layout: post
title: "Εγκατασταση Seafile με Nginx σε openSUSE Leap"
date: 2016-11-20 14:44:11
description: Εγκατάσταση της λύσης cloud Seafile με Nginx σε openSUSE Leap
tags:
- seafile
- nginx
- openSUSE
- leap
- cloud
categories:
- openSUSE tips and tricks
- Cloud solutions
twitter_text:
---

![Seafile](/post_images/seafile/seafilelogo.png)

# Εγκατάσταση Seafile με Nginx σε openSUSE Leap

Το πρόγραμμα [Seafile](https://www.seafile.com) είναι ένα δωρεάν λογισμικό για φιλοξενία αρχείων με λειτουργικότητα όπως το Dropbox ή το Google Drive. Μπορεί να εγκατασταθεί σε προσωπικό server (είτε στο σπίτι σας είτε σε VPS). Το Seafile έχει άδεια χρήσης ανοικτού κώδικα. Μπορείτε να φτιάξετε ένα δικο σας ασφαλή server και να διαμοιράζεστε κρυπτογραφημένα τα αρχεία σας. Το Seafile είναι γραμμένο με τις γλώσσες C και python.

Εμείς προτιμούμε το Nextcloud αλλά καλό είναι να δούμε και άλλες εναλλακτικές. Σε αυτό εδώ το άρθρο θα δούμε πως στήνεται το Seafile πάνω σε openSUSE Leap. Θα χρησιμοποιήσουμε κρυπτογράφηση πίσω από ένα nginx. Όλο αυτό θα γίνει ουσιαστικά σε 7 βήματα.

## ΒΗΜΑ 1

Βρείτε ποια IP έχει ο server και μπείτε με ssh. Καλό είναι αυτή την IP να την ορίσετε ως στατική μέσα από το YaST.

{% highlight ruby %}
ssh root@192.168.1.100{% endhighlight %}

αφού μπείτε ως διαχειριστής, αλλάξτε το όνομα του υπολογιστή

{% highlight ruby %}
nano /etc/hosts{% endhighlight %}

Επικολλήστε την παρακάτω γραμμή (αντικαταστήστε την IP με την δικιά σας και το hostname με δικό σας όνομα):

{% highlight ruby %}
192.168.1.100   cloud.opensuse.gr    cloud{% endhighlight %}

Στα παραπάνω:

**192.168.1.100** = η IP του διακομιστή<br>
**cloud** = το όνομα του διακομιστή<br>
**opensuse.gr** = το domain name του διακομιστή
<br>
Επιβεβαιώστε το όνομα που δώσατε με τα παρακάτω:

{% highlight ruby %}
hostname
hostname -f
{% endhighlight %}


## ΒΗΜΑ 2

Το Seafile είναι γραμμένο με την γλώσσα python. Έτσι θα χρειαστεί να εγκατασταθούν μερικές βιβλιοθήκες python για την εγκατάσταση. Για την βάση δεδομένων, το seafile υποστηρίζει SQLite και MySQL. Σε αυτό τον οδηγό θα χρησιμοποιήσουμε MySQL που παρέχει καλύτερη απόδοση από την SQLite.

Εγκαταστήστε όλα τα πακέτα που απαιτούνται με την παρακάτω εντολή:

{% highlight ruby %}
zypper in python python-imaging python-MySQL-python python-setuptools mariadb mariadb-client{% endhighlight %}


## ΒΗΜΑ 3

Πριν ξεκινήσουμε με τις βάσεις δεδομένων, το seafile απαιτεί την ύπαρξη 3 βάσεων:

* ccnet database<br>
* seafile database<br>
* seahub database<br>

Στο προηγούμενο βήμα εγκαταστάθηκε ο διακομιστής MySQL/MariaDB, και τώρα θα εκκινήσει με την εντολή:

{% highlight ruby %}
rcmysql start{% endhighlight %}

Ορίστε νέο κωδικό για τον διαχειριστή με την εντολή:

{% highlight ruby %}
/usr/bin/mysqladmin -u root password 'aqwe123'{% endhighlight %}

Όπου **aqwe123** ορίστε τον δικό σας κωδικό.

Τώρα πρέπει να ξεκινήσετε την δημιουργία των 3 βάσεων και ενός νέου χρήστη γι'αυτές τις βάσεις.

{% highlight ruby %}
mysql -u root -p{% endhighlight %}

Εισάγετε τον κωδικό που ορίσατε παραπάνω "aqwe123". Προσοχή, δεν θα φαίνεται ότι γράφετε κάτι.

Δημιουργήστε 3 βάσεις δεδομένων για το seafile, τις εξής: **ccnet_db**, **seafile_db** και **seahub_db**

{% highlight ruby %}
create database ccnet_db character set = 'utf8';
create database seafile_db character set = 'utf8';
create database seahub_db character set = 'utf8';{% endhighlight %}

Τώρα δημιουργήστε το νέο χρήστη **seafilecloud** με τον κωδικό **'seafilecloud@'**:

{% highlight ruby %}
create user seafilecloud@localhost identified by 'seafilecloud@';{% endhighlight %}

Τώρα δώστε πρόσβαση του νέου χρήστη σε όλες τις βάσεις δεδομένων:

{% highlight ruby %}
grant all privileges on ccnet_db.* to seafilecloud@localhost identified by 'seafilecloud@';
grant all privileges on seafile_db.* to seafilecloud@localhost identified by 'seafilecloud@';
grant all privileges on seahub_db.* to seafilecloud@localhost identified by 'seafilecloud@';
flush privileges;{% endhighlight %}

Οι βάσεις είναι έτοιμες για την εγκατάσταση του seafile.


## ΒΗΜΑ 4

Σε αυτό το βήμα θα εγκαταστήσουμε και θα ρυθμίσουμε το seafile. Θα εγκαταστήσουμε το seafile με τον χρήστη seafile και στο δικό του φάκελο. Έτσι θα χρειαστεί να δημιουργήσουμε έναν χρήστη.

{% highlight ruby %}
useradd -m -s /bin/bash seafile{% endhighlight %}

Σημείωση:
-m = Δημιουργεί προσωπικό φάκελο στο "/home/".
-s /bin/bash = Ορίζει το shell για τον χρήστη.

**Λήψη Seafile**

Αλλάξτε χρήστη:

{% highlight ruby %}
su - seafile{% endhighlight %}

Κατεβάστε τον διακομιστή seafile server 6 (στην διεύθυνση των [λήψεων θα βρείτε την τελευταία έκδοση](https://www.seafile.com/en/download/)) με την εντολή:

{% highlight ruby %}
wget https://bintray.com/artifact/download/seafile-org/seafile/seafile-server_6.0.6_x86-64.tar.gz{% endhighlight %}

Αποσυμπιέστε το seafile και μετονομάστε το:

{% highlight ruby %}
tar -xzvf seafile-server_6.0.6_x86-64.tar.gz
mv seafile-server-6.0.6/ seafile-server{% endhighlight %}


# ΒΗΜΑ 5

Μετακινηθείτε στον φάκελο seafile-server και εκτελέστε το αρχείο setup για να εγκατασταθεί το seafile:

{% highlight ruby %}
cd seafile-server/{% endhighlight %}

Θα εγκαταστήσουμε το seafile με βάση δεδομένων MySQL, οπότε εκτελέστε το κατάλληλο αρχείο:

{% highlight ruby %}
./setup-seafile-mysql.sh{% endhighlight %}

Θα ερωτηθείτε για πληροφορίες για τον διακομιστή.

{% highlight ruby %}
server name = χρησιμοποιήστε το hostname που δώσατε παραπάνω (cloud).
Server ip or Domain = θα εισάγετε την ip που δώσατε παραπάνω (192.168.1.100).
Seafile Data direcoty = πατήστε Enter.
Port for seafile file server = πατήστε Enter.{% endhighlight %}

Στη συνέχεια θα ρυθμίσετε την βάση δεδομένων. Επειδή δημιουργήσαμε δικιά μας βάση δεδομένων, εδώ επιλέγουμε το νούμερο **"2"**.

Θα ερωτηθείτε για το προφίλ της βάσης δεδομένων:

{% highlight ruby %}
Host of the mysql = Προεπιλογή είναι το localhost.
Default port = 3306.
MySQL User for seafile = Χρησιμοποιεί τον χρήστη που φτιάξαμε στο βήμα 3 - "seafilecloud".
MySQL password = συνθηματικό για τον χρήστη seafilecloud.
ccnet database = την βάση δεδομένων - ccnet_db.
seafile database = την βάση δεδομένων - seafile_db.
seahub database = την βάση δεδομένων - seahub_db.{% endhighlight %}

Εάν δεν έχουν εμφανιστεί σφάλματα, μπορείτε να επιβεβαιώσετε την εγκατάσταση πατώντας το "Enter".
Περιμένετε έως ότου το script ολοκληρώσει την ρύθμιση (θα σας δώσει την πόρτα που βλέπει το seafile).

Εκκινείστε το Seafile και το Seahub με τις εντολές:

{% highlight ruby %}
./seafile.sh start
./seahub.sh start{% endhighlight %}

Θα σας ζητηθεί να δημιουργήσετε έναν χρήστη admin. Μπορείτε να εισάγετε το email και ένα συνθηματικό.

Σε αυτό το σημείο μπορείτε να μπείτε μέσω browser με την πόρτα <i>8000</i> (αυτήν που έδειξε παραπάνω).


# ΒΗΜΑ 6

Σε αυτό το βήμα γίνεται ρύθμιση του Nginx ως web server. Η επιλογή του γίνεται γιατί είναι ελαφρύς και καταναλώνει λίγη μνήμη και επεξεργαστική ισχύ.


**Εγκατάσταση Nginx**

Εγκατάσταση με την εντολή:
{% highlight ruby %}
zypper in nginx{% endhighlight %}


**Δημιουργία πιστοποιητικού SSL**

Μετακίνηση στο φάκελο του nginx και δημιουργία νέου φακέλου για το πιστοποιητικό SSL. Δημιουργήστε το αρχείο με την εντολή **OpenSSL**. Εάν προτιμάτε το Let's Encrypt, θα βρείτε [οδηγίες εδώ](https://certbot.eff.org/all-instructions/#other-unix-nginx) και πρέπει να συνδυάσετε τις οδηγίες.

{% highlight ruby %}
mkdir -p /etc/nginx/ssl/
cd /etc/nginx/ssl/{% endhighlight %}

Δημιουργήστε το πιστοποιητικό:

{% highlight ruby %}
openssl genrsa -out privkey.pem 4096
openssl req -new -x509 -key privkey.pem -out cacert.pem -days 1095{% endhighlight %}


**Ρυθμίστε τον Virtual Host**

Στον φάκελο του nginx, δημιουργήστε νέο φάκελο με το όνομα **"vhosts.d"** για να αποθηκεύσετε το αρχείο του virtual host.

{% highlight ruby %}
mkdir -p /etc/nginx/vhosts.d/
cd /etc/nginx/vhosts.d/
nano cloud.kuonseafile.conf{% endhighlight %}

Επικολλήστε το παρακάτω κείμενο:

{% highlight ruby %}
server {
        listen       80;
        server_name  cloud.opensuse.gr;    #Domain Name
        rewrite ^ https://$http_host$request_uri? permanent;    # force redirect http to https
    }
    server {
        listen 443;
        ssl on;
        ssl_certificate /etc/nginx/ssl/cacert.pem;        # path to your cacert.pem
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;    # path to your privkey.pem
        server_name cloud.opensuse.gr;                    #Domain Name
        proxy_set_header X-Forwarded-For $remote_addr;

        add_header Strict-Transport-Security "max-age=31536000; includeSubdomains";
        server_tokens off;

        location / {
            fastcgi_pass    127.0.0.1:8000;
            fastcgi_param   SCRIPT_FILENAME     $document_root$fastcgi_script_name;
            fastcgi_param   PATH_INFO           $fastcgi_script_name;

            fastcgi_param   SERVER_PROTOCOL        $server_protocol;
            fastcgi_param   QUERY_STRING        $query_string;
            fastcgi_param   REQUEST_METHOD      $request_method;
            fastcgi_param   CONTENT_TYPE        $content_type;
            fastcgi_param   CONTENT_LENGTH      $content_length;
            fastcgi_param   SERVER_ADDR         $server_addr;
            fastcgi_param   SERVER_PORT         $server_port;
            fastcgi_param   SERVER_NAME         $server_name;
            fastcgi_param   HTTPS               on;
            fastcgi_param   HTTP_SCHEME         https;

            access_log      /var/log/nginx/seahub.access.log;
            error_log       /var/log/nginx/seahub.error.log;
            fastcgi_read_timeout 36000;
        }
        location /seafhttp {
            rewrite ^/seafhttp(.*)$ $1 break;
            proxy_pass http://127.0.0.1:8082;
            client_max_body_size 0;
            proxy_connect_timeout  36000s;
            proxy_read_timeout  36000s;
            proxy_send_timeout  36000s;
            send_timeout  36000s;
        }
        location /media {
            root /home/seafile/seafile-server/seahub;
        }
    }
{% endhighlight %}

Αντικαταστήστε το **cloud.opensuse.gr** στις γραμμές 3 και 11 με το δικό σας όνομα.
Σχετικά με την τοποθεσία των δεδομένων στην γραμμή 47, αντικαταστήστε την διαδρομή της εγκατάστασης του seafile - **'/home/seafile/seafile-server/seahub'**.

Αφού αποθηκεύσετε, δοκιμάστε τις ρυθμίσεις με την εντολή:

{% highlight ruby %}
nginx -t{% endhighlight %}

Σιγουρευτείτε ότι όλα είναι εντάξει.


**Ρυθμίστε το Seafile να χρησιμοποιεί το δικό σας Domain και το HTTPS**

Αλλάξτε στον χρήστη seafile και επεξεργαστείτε τις ρυθμίσεις. Πριν επεξεργαστείτε τις ρυθμίσεις, σταματήστε το seafile και την υπηρεσία seahub.

{% highlight ruby %}
su - seafile
cd seafile-server/
./seafile.sh stop
./seahub.sh stop{% endhighlight %}

Μετακινηθείτε πίσω στον φάκελο του χρήστη και στο φάκελο των ρυθμίσεων ώστε να επεξεργαστείτε τα αρχεία **ccnet.conf** και **seahub_settings.py**.

{% highlight ruby %}
cd ~/
cd conf/{% endhighlight %}

Επεξεργαστείτε το αρχείο ccnet.conf:

{% highlight ruby %}
nano ccnet.conf{% endhighlight %}

Στην γραμμή 5: 'SERVICE_URL' - αντικαταστήστε το όνομα με το δικό σας με https.

{% highlight ruby %}
SERVICE_URL = https://cloud.opensuse.gr/{% endhighlight %}


Τώρα επεξεργαστείτε το αρχείο seahub_settings.py

{% highlight ruby %}
nano seahub_settings.py{% endhighlight %}

Προσθέστε στο τέλος την γραμμή.

{% highlight ruby %}
FILE_SERVER_ROOT = 'https://cloud.opensuse.gr/seafhttp'{% endhighlight %}


# ΒΗΜΑ 7

Έχουν εγκατασταθεί Nginx και MariaDB/MySQL καθώς και ο διακομιστής seafile. Σιγουρευτείτε ότι έχουν εκκινήσει και εκκινούν κατά την εκκίνηση του υπολογιστή.

{% highlight ruby %}
systemctl enable nginx
systemctl enable mysql{% endhighlight %}

Επανεκκινήστε τις υπηρεσίες

{% highlight ruby %}
systemctl restart nginx
systemctl restart mysql{% endhighlight %}

Εκκινήστε και τα seafile και seahub από τον χρήστη seafile:

{% highlight ruby %}
su - seafile
cd seafile-server/
./seafile start
./seahub start-fastcgi{% endhighlight %}

Όλες οι υπηρεσίες έχουν εκκινήσει. Μπορείτε να έχετε πρόσβαση στον διακομιστή από την διεύθυνση (εάν δεν την έχετε αλλάξει):

{% highlight ruby %}
cloud.opensuse.gr{% endhighlight %}

Εισάγετε το όνομα διαχειριστή και συνθηματικό που εισάγατε παραπάνω.
Μπορείτε να χρησιμοποιήσετε τον διακομιστή σας.
<br><br>
Στην ιστοσελίδα των [λήψεων](https://www.seafile.com/en/download/) θα βρείτε και clients για υπολογιστές και κινητά.

ΠΗΓΕΣ:<br>
[http://manual.seafile.com/deploy/](http://manual.seafile.com/deploy/)<br>
[https://www.howtoforge.com/tutorial/ubuntu-15-04-seafile/](https://www.howtoforge.com/tutorial/ubuntu-15-04-seafile)<br>
[http://manual.seafile.com/deploy/https_with_nginx.html](http://manual.seafile.com/deploy/https_with_nginx.html)
