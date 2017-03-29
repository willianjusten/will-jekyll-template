---
layout: post
title: "[OpenStack][CloudApp][WebServer] Using Apache mod_wsgi and Pecan in Publisher-Subcriber"
date: 2016-11-11 18:57:57.000000000 +07:00
type: post
published: true
status: publish
tags:
- WebServer
- CloudApp
- OpenStack
categories:
- Tech
- News
meta:
  _wpcom_is_markdown: '1'
  _oembed_266fb18732fef1f6706d5575d488de9f: "<div class=\"embed-giantflyingsaucer\"><blockquote
    class=\"wp-embedded-content\"><a href=\"http://www.giantflyingsaucer.com/blog/?p=4834\">Building
    a (simple) REST application with Pecan (pecanpy)</a></blockquote><script type='text/javascript'><!--//--><![CDATA[//><!--\t\t!function(a,b){\"use
    strict\";function c(){if(!e){e=!0;var a,c,d,f,g=-1!==navigator.appVersion.indexOf(\"MSIE
    10\"),h=!!navigator.userAgent.match(/Trident.*rv:11./),i=b.querySelectorAll(\"iframe.wp-embedded-content\");for(c=0;c<i.length;c++)if(d=i[c],!d.getAttribute(\"data-secret\")){if(f=Math.random().toString(36).substr(2,10),d.src+=\"#?secret=\"+f,d.setAttribute(\"data-secret\",f),g||h)a=d.cloneNode(!0),a.removeAttribute(\"security\"),d.parentNode.replaceChild(a,d)}else;}}var
    d=!1,e=!1;if(b.querySelector)if(a.addEventListener)d=!0;if(a.wp=a.wp||{},!a.wp.receiveEmbedMessage)if(a.wp.receiveEmbedMessage=function(c){var
    d=c.data;if(d.secret||d.message||d.value)if(!/[^a-zA-Z0-9]/.test(d.secret)){var
    e,f,g,h,i,j=b.querySelectorAll('iframe[data-secret=\"'+d.secret+'\"]'),k=b.querySelectorAll('blockquote[data-secret=\"'+d.secret+'\"]');for(e=0;e<k.length;e++)k[e].style.display=\"none\";for(e=0;e<j.length;e++)if(f=j[e],c.source===f.contentWindow){if(f.removeAttribute(\"style\"),\"height\"===d.message){if(g=parseInt(d.value,10),g>1e3)g=1e3;else
    if(~~g<200)g=200;f.height=g}if(\"link\"===d.message)if(h=b.createElement(\"a\"),i=b.createElement(\"a\"),h.href=f.getAttribute(\"src\"),i.href=d.value,i.host===h.host)if(b.activeElement===f)a.top.location.href=d.value}else;}},d)a.addEventListener(\"message\",a.wp.receiveEmbedMessage,!1),b.addEventListener(\"DOMContentLoaded\",c,!1),a.addEventListener(\"load\",c,!1)}(window,document);//--><!]]></script><iframe
    sandbox=\"allow-scripts\" security=\"restricted\" src=\"http://www.giantflyingsaucer.com/blog/?p=4834&#038;embed=true\"
    width=\"500\" height=\"282\" title=\"&#8220;Building a (simple) REST application
    with Pecan (pecanpy)&#8221; &#8212; Giant Flying Saucer\" frameborder=\"0\" marginwidth=\"0\"
    marginheight=\"0\" scrolling=\"no\" class=\"wp-embedded-content\"></iframe></div>"
  _oembed_6aef8c26e0f761586e701e2f8f039dfa: "{{unknown}}"
  _oembed_ba168d44dae944fc62fe048570c0db1f: "{{unknown}}"
  _oembed_a22f32c0cdf5a966d370fecb3811a62f: "{{unknown}}"
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '28801143612'
  _oembed_d470c8e9f126f8afe3d4e7a49732d010: "{{unknown}}"
  _oembed_360f6bfd4e86b35d1fa4fac0dd3db2bb: "{{unknown}}"
  _oembed_time_266fb18732fef1f6706d5575d488de9f: '1478865518'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>Pecan (https://pypi.python.org/pypi/pecan): It is another entry of Python web framework. It is a lean, light weight solution in order to implement web framework in comparison with home-grown WSGI framework. There are some projects in OpenStack now that are using Pecan such as Ceilometer, Ironic, etc.</p>
<p>The reason why changing to python Pecan is essential is below:<br />
https://specs.openstack.org/openstack/neutron-specs/specs/kilo/pecan-switch.html</p>
<p>I am not going to details what is inside pecan but you can search for that easily. In this example, let’s have something interesting into how to use pecan and mod_wsgi to implement a web server – based service.</p>
<p>The question is why we need mod_wsgi? What is the story of implementing web server – based service here relating to cloud?</p>
<p>First of all, the case study here is not about OpenStack infrastructure but it is about how to create a service that deploys cloud app onto OpenStack based cloud environment. Imagine that, a client will use GUI and by clicking some options on the GUI, he/she then has cloud app running on top of OpenStack cloud. Therefore you need to have a service A that will help you to take the requests from clients then execute the actions of deploying cloud app. Then it will send the notifications to service B that then executes notification actions such as alarm-creation, alarm-sending, etc. In the architect of pattern software architect, we can think about it as Publisher-Subcriber model. In order to make service A (Publisher) light-weight, easy-to-interoperate, one solution is making it running as web server using apache. In this case, service A is written in Python, uses Pecan for python web framework and Apache will wrap service A and run it as web server by using Apache mod_wsgi.</p>
<p>Apache mod_wsgi: It is a module that implements a simple to use Apache module which hosts the Python application that supports Python WSGI interface. Of course in our environment of OpenStack, the alternative Pecan truly supports WSGI interface. Therefore, it is a relevant approach in this case.</p>
<p>Note that, in Debian-base distros like Ubuntu, It is called Apache, in Redhat-based distros (Centos, Fedora, Redhat), it is called httpd.</p>
<p><strong>So, here we go:</strong></p>
<ul>
<li>In my example, I use ubuntu 16.04 Xenial Xerus and create virtualenv for running this test bed.</li>
<li>
<p>Firstly, you should install mod_wsgi:</p>
</li>
</ul>
<p><span style="color:#ff0000;">apt-get install libapache2-mod-wsgi</span></p>
<ul>
<li>Then, using the Apache virtual host to host the domain where Python pecan application runs. I create my own file called pecan_test.conf, you can change it as whatever name you would like</li>
</ul>
<p><em>/etc/apache2/sites-available/pecan_test.conf: </em></p>
<p>Listen 127.0.0.1:8080<br />
ServerName pecan_test</p>
<p>WSGIDaemonProcess pecan_test threads=5 user=tuan<br />
WSGIPassAuthorization On<br />
WSGIScriptAlias / /var/www/pecan_test/app.wsgi<br />
WSGIProcessgroup pecan_test<br />
WSGIApplicationgroup %{GLOBAL}<br />
Order deny,allow<br />
Allow from all<br />
You can see that, the WSGIScriptAlias will point to the app.wsgi that points to the config file of a python pecan application. To understand the pecan usage, it is your homework:)</p>
<p><em>/var/www/pecan_test/app.wsgi:</em></p>
<p>from pecan.deploy import deploy</p>
<p>application = deploy('/var/www/pecan_test/config.py')</p>
<p><em>/var/www/pecan_test/config.py:</em></p>
<p>#Server Specific Configurations<br />
server = {<br />
'port': '8080',<br />
'host': '0.0.0.0'<br />
}</p>
<p>#Pecan Application Configurations<br />
app = {<br />
'root': 'pecanrest.controllers.root.RootController',<br />
'modules': ['pecanrest'],<br />
'static_root': '%(confdir)s/public',<br />
'template_path': '%(confdir)s/pecanrest/templates',<br />
'debug': True,<br />
'errors': {<br />
404: '/error/404',<br />
'<strong>force_dict</strong>': True<br />
}<br />
}</p>
<p>You can see that, in the ‘root’ keyword, the code where pecan python app uses in under pecanrest/controllers/root folder. You can follow the below link to see how to use pecan in a simple example:</p>
<p>http://www.giantflyingsaucer.com/blog/?p=4834</p>
<p>Finally, when you have all the thing set up, you should enable mod_wsgi:</p>
<p><span style="color:#ff0000;">(pecan_test) tuan@tuan-luong:/etc/apache2/sites-available$ sudo a2enmod wsgi</span><br />
<span style="color:#ff0000;"> Enabling module wsgi.</span><br />
<span style="color:#ff0000;"> To activate the new configuration, you need to run:</span><br />
<span style="color:#ff0000;"> service apache2 restart</span></p>
<p>Then restarting apache2:</p>
<p><span style="color:#ff0000;">service apache2 restart</span></p>
<p>Now, checking the result:</p>
<p><img class="alignnone size-full wp-image-1063" src="{{ site.baseurl }}/assets/result.png" alt="result" width="1920" height="1080" /></p>
<p>You can see the result of each action of GET/POST/PUT<br />
Have fun!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1</p>
<p>12/11/2016</p>
<p>VietStack team</p>
