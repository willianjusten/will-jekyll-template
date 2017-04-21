---
layout: post
title: Using Tooz in OpenStack
date: 2015-08-08 13:39:54.000000000 +07:00
type: post
published: true
status: publish
categories:
- Hướng dẫn - Kinh Nghiệm
- OpenStack
- Tài liệu tham khảo
- Tech
tags:
- Tooz
meta:
  _wpcom_is_markdown: '1'
  _edit_last: '61498925'
  geo_public: '0'
  _oembed_7f8fde2e57a9843d08f1a482a410bb59: "{{unknown}}"
  _oembed_ee6ee95b71ce48204ac56fb60cc94f8c: "{{unknown}}"
  _oembed_577c7a6896b3f53b02fa66b64ac42a02: "{{unknown}}"
  _publicize_job_id: '13527230864'
  _oembed_055ea65cdfe1864d1a00cc8f11bd44c8: "{{unknown}}"
  _oembed_084cbd5d2109b763f03ffda556fe94cc: "{{unknown}}"
  _oembed_33ef39690c12e5784dfe6c421f3c45d0: "{{unknown}}"
  _oembed_d6db352deb850c8f438ab2f21da4b311: "{{unknown}}"
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>At first, I do like the idea of this guy about solutions of encountered problem in OpenStack that is Synchronization of multiple distributed workers (<a href="https://julien.danjou.info/blog/2014/python-distributed-membership-lock-with-tooz">https://julien.danjou.info/blog/2014/python-distributed-membership-lock-with-tooz</a>).</p>
<p>We can see that there is a lots of dependencies and interactions between services of OpenStack. It does really take time for services cooperating for each wanted task, for example, if we want to boot an instance, Nova has to make a lots of calls to Neutron, Glance, Storage and does a lots of internal self actions like conducting, scheduling, etc. In the distributed architecture of OpenStack, some internal components of each service are distributed (e.g Nova compute, l3-agent, etc.). We have some solutions for distributed systems such as Zookeeper, Redis, Memcached, etc. and their roles are reporting to controllers about the status of members in the group that they take care about (which one is online, which one is responding, which one is offline, leaving the group, etc.). But the main problem is that not all of the solutions have the same robustness, functionalities. The fact that if we implement only one solution for all of the services, it does not utilize the advantages of others or even make some obstacles for implementing new applications, plugins to OpenStack environment. On the other hand, if we use multiple solutions for each service, it will create some of asynchronization, uncooperative between them.</p>
<p>The idea for this concept is creating a general solution by which developers, operators can choose whichever backend to use due to the purpose of usage or applications, plugins implementation. Tooz is nothing else but the abstraction layers for some current supported backends such as memcached, zookeeper, etc.(<a href="http://docs.openstack.org/developer/tooz/drivers.html">http://docs.openstack.org/developer/tooz/drivers.html</a>).</p>
<p>In this below example, I will show you how to use zookeeper backend with Tooz on localhost:</p>
<p>I use magic vagrant to boot a virtual machine with Trusty image of Ubuntu and do some below steps:</p>
<blockquote><p>1. Down load zookeeper package:</p>
<ul>
<li>wget <a href="http://xenia.sote.hu/ftp/mirrors/www.apache.org/zookeeper/zookeeper-3.4.6/zookeeper-3.4.6.tar.gz">http://xenia.sote.hu/ftp/mirrors/www.apache.org/zookeeper/zookeeper-3.4.6/zookeeper-3.4.6.tar.gz</a></li>
</ul>
<p>2. Execute the following instructions:</p>
<ul>
<li>tar -xvf zookeeper-3.4.6.tar.gz</li>
<li>mkdir -p /var/lib/zookeeper</li>
</ul>
<p>3. Put the “1” to myid in /var/lib/zookeeper/myid (or any id number if you want but you must provide the same ID in zoo.cfg):</p>
<ul>
<li>echo “1” &gt; /var/lib/zookeeper/myid</li>
</ul>
<p>4. Put the following configs to conf/zoo.cfg in zookeeper directory:</p>
<p style="text-align:left;"><em>tickTime=2000</em></p>
<p style="text-align:left;"><em>dataDir=/var/lib/zookeeper</em></p>
<p style="text-align:left;"><em>clientPort=2181</em></p>
<p style="text-align:left;"><em>server.1=127.0.0.1:2888:3888</em></p>
<p>Note that the above values are default of zookeeper except server ID and host (127.0.0.1). You can change the tickTime or ports if you want.</p>
<p>5. Activate zookeeper:</p>
<ul>
<li>cd zookeeper-3.4.6</li>
<li>bin/zkServer.sh start</li>
<li>bin/zkCli.sh -server 127.0.0.1:2181</li>
</ul>
<p>If you see some errors, that means Java is not installed in your Ubuntu:</p>
<ul>
<li>apt-get install -y python-software-properties</li>
<li>add-apt-repository ppa:webupd8team/java</li>
<li>apt-get update</li>
<li>apt-get install -y oracle-java8-installer</li>
</ul>
<p>Run again:</p>
<ul>
<li>bin/zkCli.sh -server 127.0.0.1:2181</li>
</ul>
<p><a href="https://vietstack.files.wordpress.com/2015/08/zookeeper.png"><img class="aligncenter size-full wp-image-553" src="{{ site.baseurl }}/pictures/zookeeper.png" alt="zookeeper" width="630" height="200" /></a></p></blockquote>
<p>&nbsp;</p>
<blockquote><p>6. Install Tooz:</p>
<ul>
<li>pip install tooz</li>
</ul>
<p>7. Check the list of backends of tooz:</p>
<p>&gt;&gt;&gt; from pkg_resources import iter_entry_points</p>
<p>&gt;&gt;&gt; for object in iter_entry_points( group='tooz.backends', name=None):</p>
<p>...             print object</p>
<p>...</p>
<p>ipc = tooz.drivers.ipc:IPCDriver</p>
<p>postgresql = tooz.drivers.pgsql:PostgresDriver</p>
<p>kazoo = tooz.drivers.zookeeper:KazooDriver</p>
<p>zookeeper = tooz.drivers.zookeeper:KazooDriver</p>
<p>redis = tooz.drivers.redis:RedisDriver</p>
<p>zake = tooz.drivers.zake:ZakeDriver</p>
<p>file = tooz.drivers.file:FileDriver</p>
<p>mysql = tooz.drivers.mysql:MySQLDriver</p>
<p>memcached = tooz.drivers.memcached:MemcachedDriver</p>
<p>8. I use zookeeper in this example so I will use kazoo driver. Install kazoo:</p>
<ul>
<li>pip install kazoo</li>
</ul>
<p>9. Using zookeeper to call tooz:</p>
<p>&gt;&gt;&gt; from tooz import coordination</p>
<p>&gt;&gt;&gt; coordinator = coordination.get_coordinator('kazoo://127.0.0.1:2181', b'host-1')</p>
<p>&gt;&gt;&gt; coordinator.start()</p></blockquote>
<p>&nbsp;</p>
<blockquote><p>10. Check with zookeeper cli:</p>
<ul>
<li>bin/zkCli.sh -server 127.0.0.1:2181</li>
</ul>
<p><a href="https://vietstack.files.wordpress.com/2015/08/zk_tooz.png"><img class="aligncenter size-full wp-image-552" src="{{ site.baseurl }}/pictures/zk_tooz.png" alt="zk_tooz" width="630" height="245" /></a></p></blockquote>
<p>&nbsp;</p>
<p>You can extend this example by using this below instruction:</p>
<p><a href="http://docs.openstack.org/developer/tooz/tutorial/index.html">http://docs.openstack.org/developer/tooz/tutorial/index.html</a></p>
<p>Otherwise, this Tooz is now useful for solving the problems of group membership, leader election for distributed components in OpenStack. We can easily contribute more for Tooz project or write plugins to enforce Tooz to do more fucntions such as VM monitoring, host monitoring, etc.</p>
<p>In Nova, there is a spec that will replace service group primitives such as Zookeeper, Memcached by Tooz. Actually, tooz is now implemented in Ceilometer, Nova is on its way:</p>
<p>http://specs.openstack.org/openstack/nova-specs/specs/liberty/approved/service-group-using-tooz.html</p>
<p>&nbsp;</p>
<p>8/8/2015</p>
<p>VietStack team</p>
<p>&nbsp;</p>
