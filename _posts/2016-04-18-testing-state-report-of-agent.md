---
layout: post
title: "[OpenStack] Testing state report of agent"
date: 2016-04-18 15:35:25.000000000 +07:00
type: post
published: true
status: publish
categories:
- Tech
- News
tags:
- Agent
meta:
  _wpcom_is_markdown: '1'
  _oembed_5525fca2bce7fc13458a6807d2945bcf: "{{unknown}}"
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '21910515042'
  _oembed_7dfbd72af4f6f4ad9e41b76ce91e53b8: "{{unknown}}"
  _oembed_cd0540518fa433c5f059f0844b216080: "{{unknown}}"
  _oembed_22689ab06d22d21fa651a20276d60884: "{{unknown}}"
  _oembed_d67130f1f9f2729cd383dc8c43a59184: "{{unknown}}"
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>As we know that OpenStack is desgined as a microservice structure. In each service, we can easily see that it consists of multiple components that form a structure called multi-agents. Imagine that from the standpoint of controller, it sees nova-compute service running as a multi-agent terminology on each compute node. The situation as the same with other agents like neutron l3-agent, metadata-agent, etc.</p>
<p>The desgin agent platform is important in multi-agent structure in distributed system. It affects to the performance of communicating between agents as well as the synchronization in actions between agents and server. Heartbeat is one of them.</p>
<p>Heartbeat is a term to indicate the existance of agent. When agent reports the heartbeat to server, it implicitely declare that it is still alive. There are multiple drivers that do fencing for heartbeat such as Zookeepr, Reddis, etc. and a new thing is Tooz service that is nothing else but the abstraction/wrapper of these drivers. We can see that in OpenStack, each agent reports its state and stores it into the database. It also periodically updates the status of itself based on the report_interval time.</p>
<p>Here we have a look to a scenario of how nova-compute reports its status to db. The mechanism of reporting basically is the same to other agents.</p>
<p>So, back to nova-compute, when its daemon is created and runs on compute-node, periodically (the default report_interval is 10 second) it will reports back to db about its status by triggering an event through the nova_conductor. When it triggers, a new evenlet thread is created in background and does the report action. The flow can be seen inside the source code of Nova (/nova/service.py and /nova/servicegroup). The small snippet below is the simulation of how it works:</p>
<p>&nbsp;</p>
<p align="left">
<p>https://github.com/vietstacker/-OpenStack-Simulation-of-status_reporting-of-agent-</p>
<p>Have FUNNNN !!!</p>
<p>&nbsp;</p>
<p>18-4-2016</p>
<p>VietStack team</p>
