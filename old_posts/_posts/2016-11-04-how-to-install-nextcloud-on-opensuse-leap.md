---
layout: post
title: "How to install Nextcloud on openSUSE Leap"
date: 2016-11-04 23:33:17
description: Official documentation describes installation on Red Hat/CentOS and Ubuntu but not openSUSE Leap. Here's a tutorial...
tags:
- nextcloud
- openSUSE
- leap
- cloud
categories:
- Nextcloud tips and tricks
- openSUSE tips and tricks
- Cloud solutions
twitter_text: 'Tutorial how to install Nextcloud on openSUSE Leap'
---

# Basic Nextcloud installation on openSUSE Leap

I see the official documentation has full tutorial for [RHEL 6 or CentOS 6](https://docs.nextcloud.com/server/10/admin_manual/installation/php_54_installation.html) and [RHEL 7 or CentOS 7](https://docs.nextcloud.com/server/10/admin_manual/installation/php_55_installation.html). The main documentation covers [Ubuntu 14.04 LTS](https://docs.nextcloud.com/server/10/admin_manual/installation/source_installation.html).

This tutorial describes how to install Nextcloud using command line. I followed the [official documentation of Ubuntu 14.04 LTS](https://docs.nextcloud.com/server/10/admin_manual/installation/source_installation.html) installation.

Why choose [openSUSE Leap](https://en.opensuse.org/Portal:Leap)? openSUSE Leap is a brand new way of building openSUSE and is new type of hybrid Linux distribution. Leap uses source from [SUSE Linux Enterprise (SLE)](https://www.suse.com/promo/sle/), which gives Leap a level of stability unmatched by other Linux distributions, and combines that with community developments to give users, developers and sysadmins the best stable Linux experience available. Contributor and enterprise efforts for Leap bridge a gap between matured packages and newer packages found in openSUSE’s other distribution Tumbleweed. You can download openSUSE Leap from the site [https://software.opensuse.org/](https://software.opensuse.org/).

Make sure that [ssh (sshd) is enabled and also the firewall](https://en.opensuse.org/SuSEfirewall2) either is disabled or make an exception to the apache and ssh services. You can also set a static IP ([check out how](http://eiosifidis.blogspot.gr/2015/05/set-static-ip-on-your-opensuse-raspberry-pi.html)).

First of all, let's install the required and recommended modules for a typical Nextcloud installation, using Apache and MariaDB, by issuing the following commands in a terminal:

{% highlight ruby %}
zypper in apache2 mariadb apache2-mod_php5 php5-gd php5-json php5-fpm php5-mysql php5-curl php5-intl php5-mcrypt php5-zip php5-mbstring php5-zlib
{% endhighlight %}

## Create Database

Next step, create a database. First of all start the service.

{% highlight ruby %}
systemctl start mysql.service
systemctl enable mysql.service
{% endhighlight %}

The root password is empty by default. That means that you can press enter and you can use your root user. That's not safe at all. So you can set a password using the command:

{% highlight ruby %}
mysqladmin -u root password newpass
{% endhighlight %}

Where newpass is the password you want.

Now you set the root password, create the database.

{% highlight ruby %}
mysql -u root -p 
(you'll be asked for your root password)

CREATE DATABASE nextcloudb;

GRANT ALL ON nextcloudb.* TO ncuser@localhost IDENTIFIED BY 'dbpass';
{% endhighlight %}

Database user: ncuser
Database name: nextcloudb
Database user password: dbpass

You can change the above information accordingly.

## PHP changes

Now you should edit the php.ini file.

{% highlight ruby %}
nano /etc/php5/apache2/php.ini
{% endhighlight %}

change the values

{% highlight ruby %}
post_max_size = 50G
upload_max_filesize = 25G
max_file_uploads = 200
max_input_time = 3600
max_execution_time = 3600
session.gc_maxlifetime = 3600
memory_limit = 512M
{% endhighlight %}

and finally enable the extensions.

{% highlight ruby %}
extension=php_gd2.dll
extension=php_mbstring.dll
{% endhighlight %}

## Apache Configuration

You should enable some modules. Some might be already enabled.

{% highlight ruby %}
a2enmod php5
a2enmod rewrite
a2enmod headers
a2enmod env
a2enmod dir
a2enmod mime
{% endhighlight %}

Now start the apache service.

{% highlight ruby %}
systemctl start apache2.service
systemctl enable apache2.service
{% endhighlight %}

## Install Nextcloud (option 1, preferable)

Before the installation, create the data folder and give the right permissions (preferably outside the server directory for security reasons). I created a directory in the /mnt directory. You can mount a USB disk, add it to fstab and save your data there. The commands are:

{% highlight ruby %}
mkdir /mnt/nextcloud_data
chmod -R 0770 /mnt/nextcloud_data
chown wwwrun /mnt/nextcloud_data
{% endhighlight %}

Now download [Nextloud](https://nextcloud.com/install/). Then unzip and move the folder to the server directory.

{% highlight ruby %}
wget https://download.nextcloud.com/server/releases/nextcloud-10.0.1.zip
unzip nextcloud-10.0.1.zip
cp -r nextcloud /srv/www/htdocs
chown -R wwwrun /srv/www/htdocs/nextcloud/
{% endhighlight %}

Make sure that everything is OK and then delete the folder nextcloud and nextcloud-10.0.0.zip from the root (user) directory.

Now open your browser to the server IP/nextcloud

![Nextcloud-install](/post_images/nextcloud/nextcloud_install.png)

{% highlight ruby %}
Set your administrator username and password.
Your data directory is: /mnt/nextcloud_data
Regarding database, use the following.
Database user: ncuser
Database name: nextcloudb
Database user password: dbpass
{% endhighlight %}

Wait until it ends the installation. The page you'll see is the following.

![Nextcloud-install](/post_images/nextcloud/nextcloud_first_login.png)


# Install Nextcloud using the respository (option 2)

If you want to have automatic updates of your Nextcloud instance when there's a new version, you can add the repository. There are packages available for openSUSE Leap 42.1, 42.2 and Tumbleweed (we recommend openSUSE Leap 42.1). You should be an administrator, so you can install Nextloud on your server.

* Add the Nextcloud repository.

**openSUSE_Leap_42.2**
{% highlight ruby %}
zypper ar http://download.opensuse.org/repositories/server:/php:/applications/openSUSE_Leap_42.2/ Nextcloud
{% endhighlight %}

**openSUSE_Leap_42.1**
{% highlight ruby %}
zypper ar http://download.opensuse.org/repositories/server:/php:/applications/openSUSE_Leap_42.1/ Nextcloud
{% endhighlight %}

**openSUSE_Leap_Tumbleweed**
{% highlight ruby %}
zypper ar http://download.opensuse.org/repositories/server:/php:/applications/openSUSE_Tumbleweed/ Nextcloud
{% endhighlight %}

* Refresh your repositories
{% highlight ruby %}
zypper refresh
{% endhighlight %}

* Install Nextcloud (be careful you have to install LAMP first and change permissions of the files).
{% highlight ruby %}
zypper install nextcloud
{% endhighlight %}

Open http://serverIP/nextcloud to install your instance (admin user account). Be careful to create another folder with the proper permissions for your data (as described).

Login and use Nextloud.

For more information about Nextcloud on openSUSE, check [openSUSE wiki](https://en.opensuse.org/SDB:Nextcloud).

For more configuration, you can follow the [official documentation](https://docs.nextcloud.com/server/10/admin_manual/contents.html). That was the basic installation on openSUSE Leap.
