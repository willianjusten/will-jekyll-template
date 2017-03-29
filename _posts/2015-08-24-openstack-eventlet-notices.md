---
layout: post
title: OpenStack Eventlet Notices
date: 2015-08-24 15:50:27.000000000 +07:00
type: post
published: true
status: publish
categories:
- Hướng dẫn - Kinh Nghiệm
- OpenStack
tags: []
meta:
  _wpcom_is_markdown: '1'
  _edit_last: '61498925'
  geo_public: '0'
  _publicize_job_id: '14045796529'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>OpenStack is built as configurable as working with multiple process workers. Some of satisfactory solutions like multi thread or process are also suitable but the common solution is non-blocking I/O. Eventlet is used nowadays for asynchronous I/O (non-blocking) purpose in OpenStack.</p>
<p><strong>What is non-blocking I/O?</strong></p>
<p>“The first thing to think about is what happens when a process calls a system call like write(). If there’s room in the write buffer, then the data gets copied into kernel space and the system call returns immediately.</p>
<p>But if there isn’t room in the write buffer, what happens then? The default behaviour is that the kernel will put the process to sleep until there is room available. In the case of sockets and pipes, space in the buffer usually becomes available when the other side reads the data you’ve sent.</p>
<p>The trouble with this is that we usually would prefer the process to be doing something useful while waiting for space to become available, rather than just sleeping. Maybe this is an API server and there are new connections waiting to be accepted. How can we process those new connections rather than sleeping?</p>
<p>One answer is to use multiple threads or processes – maybe it doesn’t matter if a single thread or process is blocked on some I/O if you have lots of other threads or processes doing work in parallel.</p>
<p>But, actually, the most common answer is to use non-blocking I/O operations. The idea is that rather than having the kernel put the process to sleep when no space is available in the write buffer, the kernel should just return a “try again later” error. We then using the select() system call to find out when space has become available and the file is writable again.”</p>
<p>(Source: https://blogs.gnome.org/markmc/2013/06/04/async-io-and-python/)</p>
<p><strong>Why Eventlet?</strong></p>
<ul>
<li>Eventlet is good for reducing memory footprint. Source (<a href="https://davidhadas.wordpress.com/2012/05/14/asynchronousio/">https://davidhadas.wordpress.com/2012/05/14/asynchronousio/</a>)</li>
<li>
<p>Openstack uses Eventlet library. Evenlet implements greenthread which is a lightweight thread.</p>
</li>
</ul>
<p><strong>Some terms that we need to make a short, clear knowledge before moving further:</strong></p>
<p><em>- Httplib2:</em> It is one of the Python modules that enables Http connection. By using this module, we can easily define the classes that implement the client side of Http or Https by which we can communicate with RESTful API.</p>
<p><em>- RESTful API: </em><span style="color:#000000;">REST defines a way to design an API with which you can consume its ressources using HTTP methods (GET, POST, etc) over URLs (Source: <a href="http://isbullsh.it/2012/06/Rest-api-in-python/">http://isbullsh.it/2012/06/Rest-api-in-python/</a>). </span><span style="color:#000000;">Each OpenStack service is connected to RESTful Client via RESTful APIs. When we issue some actions like nova boot, rebuild, etc. RESTful Client (here is NovaClient) will send a URL to the Nova RESTful API on Nova API server. The format of the body of URL determines what command you are issuing (boot, rebuild, delete, etc.)</span></p>
<p>Eventlet is used with enabled monkey-patching replacing blocking to non-blocking (async) by using greenthread. Because of using monkey-patch then it does not work within the OS thread, that mean greenthread will be used everywhere in OpenStack. The problem of greenthread is that it does not support for reading from socket at the same time with multiple greenthreads. Before Kilo, (keystone, nova, neutron, cinder) they use Httplib2 to create a socket to connect to API of each service. In Kilo, due to the securing OpenStack client connections, Httplib2 is replaced by requests in some core services (<a href="https://wiki.openstack.org/wiki/SecureClientConnections">https://wiki.openstack.org/wiki/SecureClientConnections</a>). In order to maintain the safety of greenthread, it should come up with the idea of single instance of Http() (Source: <a href="https://eventlet.wordpress.com/2010/03/18/safety/">https://eventlet.wordpress.com/2010/03/18/safety/</a>).</p>
<p>Using client.Client(**kwds) is the way of creating single instance of Http() for each greenthread of each service client (novaclient, neutronclient, etc.) in OpenStack.</p>
<p>Even eventlet seemed to be a de factor in OpenStack but it still has some down sides. There is a plan of replacing evenlet with asyncio module and trollius in OpenStack. ( Source: http://techs.enovance.com/6562/asyncio-openstack-python3)</p>
<p>&nbsp;</p>
<p>24/08/2015</p>
<p>VietStack Team</p>
