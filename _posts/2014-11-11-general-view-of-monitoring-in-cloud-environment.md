---
layout: post
title: General view of Monitoring in cloud environment
date: 2014-11-11 11:32:14.000000000 +07:00
type: post
published: true
status: publish
categories:
- Bài dịch - Tài liệu
- Chia sẻ kinh nghiệm
- Tech
tags:
- Monitoring
meta:
  _edit_last: '61498925'
  geo_public: '0'
  _publicize_pending: '1'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>When cloud computing exploded as a new trend in IT areas, many people think that it can solve the existing problems such large scaling in virtualization, automatic hardware assignment, etc. but who is going to be sure that cloud can take all it's advantages without any problems. In fact, all the key advantages of cloud such as self-service, flexibility, automatic provisioning, etc. are always going with the complexity of the application layer. When a provisioned instance is added in order to scale up, there are still hidden impacts to the application layer, explicitly the running instances. Those hidden impacts may only be checked at the underlying shared infrastructure.</p>
<p>The functions of automatic provisioning or management of cloud may allow us regardless of the relationships and links between instances. However, there are still applications running on those instances hardware, that means they can impact directly or indirectly each other. Suppose that couple of applications running on an instances, it can happen that they can steal the CPU time, RAM capacity from each other. And in this situation, the customers do not have authority to access to the cloud infrastructure for troubleshooting. Of course, at the view point of customers, they want to be assured of states of services, applications at any time. The visibility is that a mean that can monitor cloud infrastructure and applications as well.</p>
<p>Since cloud is a complex composition of IT elements so that the traditional monitoring solutions are not capable. They are not well-equipped to monitor both the performances of physical infrastructures, virtual components and the applications as well.  The monitoring solutions must be capable of monitoring physical hardwares (e.g based on utility of resources) and dynamically monitoring virtual machines on which applications are running. Otherwise, they can also send alarms, alerts of issues to the cloud operator and customers (in case of need) too. Nowadays, each cloud vendor has their own monitoring solution. For example, Amazon AWS has Cloudwatch, Rackspace has monitoring tool implemented in their cloud that help tenants to keep tracks of their utility . However, the visibility of application performance monitoring is still failed. In a nut shell, monitoring solutions for infrastructure and platform are available, some metrics of performance of explicit applications are also get from application related platform monitoring (for example, Google applications metrics can get from Google platform monitoring solution), but a specific monitoring solution for application is still an exercise.</p>
<p><strong>Infrastructure Monitoring</strong></p>
<p>This is the interested area of cloud vendor. The performances of cloud infrastructure include the performance of physical hardwares, cloud services such as Network, Storage, etc. and virtual machines. The topology of this monitoring type depends on the need of cloud vendors. The abstractions of definitions of performances are based on interactive behaviors of virtual machines and hardware. A virtual machine can be defined "down" if it can not give back the response to the operator in a given time. Another way may be the mutual request between services and the requests are not complete in a given time, something can also be defined "down", etc.</p>
<p>Generally, there are so many ways of cloud infrastructure monitoring. If the giant vendors such as Rackspace or Amazon have their own cloud monitoring solutions, the open-source tool kit for cloud such as Openstack is on the way to find out the relevant solutions. Some monitor solutions of Openstack-based clouds are the simple utility of traditional monitoring tool like Nagios, Shinken, Zabbix, etc. Others are the combinations of such previous traditional monitoring tools with metering services of Openstack Ceilometer. Another solution of Openstack is Monitor as a service (MOaaS) are still at "blueprint" state. Whether the solution are vary, they must have some following key requirements to be identified:</p>
<p>- Support but not to be dependent to the applications architecture like they can monitor as many applications as possible.</p>
<p>- Dynamically identify the performances of physical and virtual resources.</p>
<p>- Support multiple platforms such as Hyper-V, Xen, VMware, etc.</p>
<p>- Automatically discover and alert about new added applications and new infrastructure.</p>
<p>&nbsp;</p>
<p><strong>Application Monitoring</strong></p>
<p>All of the performances of applications running on cloud. This is the concern of customer whose applications are running. Up to now, we have only known and monitored the utility of resources used for running applications, but the applications are very dynamical so we need to track them down every time. As the view point of customer, we need to know how the applications are running, the appearance of congestion or any performance properties. We have just only some factors to understand the state of application is Response Time. It is the time taken for the application to response to the user's requests.</p>
<p>Summary, an effective solution for a cloud environment has been solved at the level of platform. To get into application performance monitoring, there are still challenges waiting ahead for cloud-chaser.</p>
<p>This is the 1st post introduce to monitoring in Cloud Computing environment. The upcoming blog post series will lead us to some case-study monitoring solutions as well as the state-of-the-art of monitoring technique.</p>
<p>&nbsp;</p>
<p>11/11/2014</p>
<p>VietStack Team.</p>
