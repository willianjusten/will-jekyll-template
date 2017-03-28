---
layout: post
title: A quick look at RCA service under OpenStack umbrella.
date: 2016-10-18 07:01
tags:
- OpenStack
- Vitrage
- RCA
categories:
- Tech
---
As OpenStack keep expanding, this year welcome <a href="https://github.com/openstack/governance/commit/b78e7bd0e2e42d212b6e9271ceccf2c5c25688c7" target="_blank">Vitrage take a first step in Big Tent model</a>. Thus, Newton will be the first official release of Vitrage under OpenStack umbrella.

This blog post will bring an overview of Vitrage, what it did in the last development cycle and the current pros/cons of Vitrage.

For short, Vitrage is the OpenStack RCA (Root Cause Analysis) service for organizing, analyzing and expanding OpenStack alarms and events, yielding insights regarding the root cause of problems and deducing their existence before they are directly detected.

And as you noticed, RCA is a method of problem solving used for identifying the root causes of faults or problems. RCA sounds like <a href="https://en.wikipedia.org/wiki/Computer_forensics" target="_blank">Computer Forensics</a>, in case you are familiar with this term.


Vitrage RCA collects monitoring information from internal services of OpenStack (Nova, Neutron, Cinder, Heat..) and external monitoring solutions (Nagios, Zabbix..), combined them all together, make some magic evaluate progress and bring  the darkness to light.

For installing Vitrage within DevStack testbed, you can follow the official <a href="https://github.com/openstack/vitrage/blob/master/devstack/README.rst" target="_blank">Vitrage documentations</a> and <a href="https://github.com/openstack/vitrage-dashboard/blob/master/README.rst/" target="_blank">Vitrage Horizon plugin docs</a> (although this doc is just WIP, as usual). Install Nagios via OMD (you can use our <a href="https://hub.docker.com/r/hieulq/omd/" target="_blank">Docker images</a> for quickly spin up OMD container just for testing) and Zabbix from official repo.

Let's take a look at Vitrage architecture in below figure:

<img class=" size-full wp-image-1013 aligncenter" src="https://vietstack.files.wordpress.com/2016/10/screenshot_1.png" alt="screenshot_1" width="1024" height="713" />

Here we can see that Vitrage collect metrics from various data-sources including Nova, Nagios, Zabbix, Physical Resource (Switch, Router..), Cinder, Heat, Neutron, Monasca, then storing them all in a topology graph via <a href="https://networkx.github.io/" target="_blank">NetworkX </a>- as in-memory database for further processing. With each alarm/event occurs, Vitrage do evaluator via a set of RCA templates which is manually defined, then update to topology and expose to end-user. You can see the workflow of Vitrage evaluator module in below diagram.

<img class=" size-full wp-image-1029 aligncenter" src="https://vietstack.files.wordpress.com/2016/10/untitled.png" alt="untitled" width="486" height="588" />


Hence, with an in-memory storing engine like that, the <strong>performance</strong> of Vitrage is the problem here. And with the manually self-defined templates, we see that it's very challenge for sysadmins to either <strong>validate the templates</strong> or <strong>coverage the root cause of the whole system</strong>.

Another problem is the overlapping scenario solver of Vitrage. As in our testbed, we deployed Vitrage along with Nagios, Zabbix with full-stack of others OpenStack components, our testbed will be monitored from 2 external systems and bring two different information/metrics into Vitrage if alarms/events occur. The unexpected result is that Vitrage act strangely with RCA process from overlapping information. Luckily that Vitrage team have realized this problems and draft the specific solutions <a href="https://etherpad.openstack.org/p/vitrage-overlapping-templates-support-design" target="_blank">here</a>.


Vitrage is quite young and has some exciting challenges ahead, with the rapid evolution of Big Tent model, hope that we can see some sparkling future of Vitrage.

Thanks <a href="https://github.com/tovin07" target="_blank">Tovin Seven</a> for contributing in this blog post.

10/2016.

VietStack team.

All images in this post are copy-lefted from Vitrage documentations.
