---
layout: post
title: Overview of Benchmark in Cloud and Benchmark as a Service (Rally)
date: 2014-11-20 11:38:35.000000000 +07:00
type: post
published: true
status: publish
categories:
- Bài dịch - Tài liệu
- Chia sẻ kinh nghiệm
- Tài liệu tham khảo
- Tech
tags:
- Rally
meta:
  _edit_last: '61498925'
  geo_public: '0'
  _publicize_pending: '1'
  _wpas_skip_facebook: '1'
  _wpas_skip_google_plus: '1'
  _wpas_skip_twitter: '1'
  _wpas_skip_linkedin: '1'
  _wpas_skip_tumblr: '1'
  _wpas_skip_path: '1'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p style="text-align:justify;padding-left:30px;"><strong>Challenges of Public Cloud</strong></p>
<p style="text-align:justify;">We need to recall a benefit of cloud is utilizing the cloud resources efficiently. We can achieve the high utilization of physical servers of cloud by aggregate the demands from users as many as possible. At the view-point of tenant, it is reasonable that they want to know the capacity of cloud physical servers to get the vision of free CPU capacity in order to utilize their instances in case of scaling out or up. It is definitely necessary for cloud operator as well but as a role of cloud operator, of course, they would not tell the CPU utilization of physical server.</p>
<p style="text-align:justify;">One of the issues in public cloud is over-capacity. Of course when a customer purchase an instance with "unlimited capacity" from any cloud provider, there will not be any information about latency, throughput, etc. The term "unlimited" relating to elasticity does not seem reasonable because there always exist a "limit" even though they are massive cloud providers. For example, Amazon has EC2  to measure the CPU utilization in public cloud. The idea is that it measures the temperature of CPU to get to know the utility of CPU. It is obvious that if a CPU operates at high-capacity, it get hot over time, otherwise if it is idle, it cools off. By the help of thermometer in the modern chips like AMD or Intel, we can easily get the CPU utilization. Back to the issue of limitation, EC2 provides the CPU allocation to the instances over time. Even if the underlying physical server has spare CPU capacity, it would not freely allocate the new cycles of CPU to your instance. Since in public cloud, the isolation is really important to avoid the noise between instances (It is also another issue of public cloud - stability). If this isolation is not proper, another user could be greedy to get the your instance 's CPU capacity. That means it must have any limitation of CPU capacity for instances so that it is very difficult to utilize the CPU of physical servers. The solution for this problem is that all the instances utilize CPU at the same time, but it seems impossible because the usage of applications running on instances fluctuate to be predicted.</p>
<p style="text-align:justify;">The concept of capacity is not latency, throughput but about the ability in which the needs of customer meets the operator threshold. Over-capacity means when the "unlimited" model contracted between cloud provider and customer overwhelm the capacity threshold and they operators have no any solutions to add more capacity to satisfy the needs of customer. Because of above issues, over-capacity is not handled properly.</p>
<p style="text-align:justify;">Summary, in order to build an IaaS, the performance must be taken carefully. It must have the capacity planning (type and amount of resources) for that, QoS must be calculated, etc. to make a decision in deployment. Benchmarking is a solution for that even it is sometimes flawed.</p>
<p style="text-align:justify;padding-left:30px;"><strong>Benchmark as a Service - Openstack Rally</strong></p>
<p style="text-align:justify;">The general concepts, features, etc. of Rally, you can easily reference on the website of Openstack wiki.  I only point out some main features which i think important  here:</p>
<p style="text-align:justify;">+The workflow of Rally:</p>
<p style="text-align:justify;padding-left:30px;"><em>Need a cloud/ Deploy a Openstack cloud  ==&gt; Check if the OS deployment is working ==&gt; Execute the scenarios ==&gt; Generate reports</em></p>
<p style="text-align:justify;">+Rally uses JSON configuration files that means it is easy to modify or create the own conf file.</p>
<p style="text-align:justify;">+It is written in Python and extensively can be re-written with your own classes.</p>
<p style="text-align:justify;">+The "benchmark" part of Rally is Benchmark engine:</p>
<p style="text-align:justify;padding-left:60px;"> - Includes the scenarios</p>
<p style="text-align:justify;padding-left:60px;">- Basic IaaS operations are covered.</p>
<p style="text-align:justify;padding-left:60px;">- The context which runs with scenarios can be programmed with Python and easily extendable.</p>
<p style="text-align:justify;">+ The workflow of Benchmark engine:</p>
<p style="text-align:justify;padding-left:60px;"><em>Context ==&gt; Runner ==&gt; Scenario ==&gt; Context ...</em></p>
<p style="text-align:justify;padding-left:60px;">Context: Gives the context to run with scenario</p>
<p style="text-align:justify;padding-left:60px;">Runner: Tells Rally how to launch scenario instances.</p>
<p style="text-align:justify;padding-left:60px;">Scenario: The actual scenario instance that cloud will execute</p>
<p style="text-align:justify;">Vietstack team</p>
<p style="text-align:justify;">20-11-2014</p>
