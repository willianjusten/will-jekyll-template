---
layout: post
title: VXLAN tunneling with containers
date: 2016-07-14 08:58:33.000000000 +07:00
type: post
published: true
status: publish
categories:
- Tech
tags:
- VXLAN
- Container
meta:
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>When I had meeting with SDN guys about the SDN implementation in cloud, it recalled me VXLAN that by somehow I forgot quite a long time. In fact, tunneling/overlay network solution has an indispensable role in SDN solution, especially when we would like to implement SFC in Network Function Virtualization.</p>
<p>In this blog, I would not show you the VXLAN implementation in SDN solution, I only have time to show you a small test bed for VXLAN in a play of a tunneling between containers running on multiple hosts.</p>
<p>The role of VXLAN is extending layer 2 that is basically put the containers (in this blog) or virtual machines across multiple hosts on the same layer 2 network or subnet. Of course it depends on the overlay network types that will entail caveats or issues (overhead, MTU, latency, etc.).</p>
<p>Here I will use LXC containers (you can use docker containers later if you want), KVM since it has OVS (virtualbox has another type of networking virtualization, a little bit complicating than KVM) and of course Linux kernel support VXLAN with both of multicast and unicast. I am going to boot two virtual machines that running on the same subnet, on each of them, I boot one LXC. Since LXC container only can connect to the host where it is running and other containers running on the same host, then if we want to connect them running on multiple hosts, we need tunneling to connect their networks together.</p>
<p>I did a small experiment for VXLAN with unicast, for the multicast, I will do it later if I have free time:D.</p>
<p>Here is the link of github where i put my instruction on, check it out:<br />
https://github.com/vietstacker/LXC-with-VXLAN-tunneling</p>
<p>Otherwise, if you have time, check the below blogs for VXLAN and network:</p>
<p>http://blogs.vmware.com/vsphere/2013/04/vxlan-series-different-components-part-1.html</p>
<p><a href="http://blog.scottlowe.org/">http://blog.scottlowe.org/</a></p>
<p><a href="http://www.ipspace.net/Main_Page">http://www.ipspace.net/Main_Page</a></p>
<p>13/07/2016</p>
<p>VietStack</p>
