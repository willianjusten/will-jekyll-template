---
layout: post
title: "[OPNFV] Architecture Proposal of Doctor Project"
date: 2016-03-09 10:42:09.000000000 +07:00
type: post
published: true
status: publish
categories: []
tags: []
meta:
  _wpcom_is_markdown: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '20581943006'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p align="center"><span style="color:#00000a;"><span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:large;"><b><br />
</b></span></span></span></span></span></p>
<ol>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:large;"><b>Overview</b></span></span></span></li>
</ol>
<p><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Doctor project is nothing else but a framework of fault management and maintenance. The biggest problem currently is the gaps of OpenStack that is chose to be the VIM in Doctor and the process of choosing/analyzing the suitable monitoring tools that are able to fit the requirements of Doctor.</span></span></span></p>
<ol start="2">
<li><span style="color:#00000a;"> <span style="font-family:'Times New Roman', serif;"><span style="font-size:large;"><b>Doctor Functionalites:</b></span></span></span></li>
</ol>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Manages the failures of virtualized resources.</span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Plans the maintenance actions based on the above failures.</span></span></span></li>
</ul>
<p><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">They may affect to a VNF/application and the Customer should ASAP react to the failures, e.g., by switching to the STBY mode. With the app supported by HA, the impact is so serious, how much the network service is impacted by the failures depends on how the service is implemented.</span></span></span></p>
<p><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">OpenStack is the target upstream of VIM where the new functional elements (Controller, Notifier, Monitor and Inspector) are expected to implemented. Some of these elements may sit outside of OpenStack and offer a northbound interface to the OpenStack.</span></span></span></p>
<ol start="3">
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;"><b>General Features in Doctor:</b></span></span></span></li>
</ol>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Monitor: Monitors the physical and virtual resources.</span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Detection: Detects the unavailability of physical resources.</span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Correlation and Cognition: Correlates faults and identifies the affected virtual resources.</span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Notification: Notifies unavailable virtual resources to the Customers.</span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Fencing: Shutdowns or isolates the failed virtual resources (VM, virtual network, virtual storages).</span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Recovery: Executes action to process fault recovery and maintenance.</span></span></span></li>
</ul>
<p><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">These features are processed in sequence from the top to the bottom. The time interval from the step1 to step4 is less than 1s.</span></span></span><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">.</span></span></span></p>
<ol start="4">
<li><span style="color:#00000a;"><span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:large;"><b>VIM Interfaces</b></span></span></span></span></span></li>
</ol>
<ol type="a">
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;"><u>VIM South-bound interface</u></span></span></span></li>
</ol>
<p><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">There is no south-bound interface that defines the generic format of data models that caught from monitoring solutions. Each monitoring solution results the different data formats, especially the 3rd party solutions such as zabbix, Nagios, Munin, etc. </span></span></span></p>
<p><span style="color:#00000a;"><span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;"><span style="font-family:'Times New Roman', serif;">In our current vanilla OpenStack (as a VIM), there is no any interface that communicates with 3rd party monitoring solutions. </span></span></span></span></p>
<ol start="2" type="a">
<li>
<p align="justify"><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;"><u>VIM North-bound Interface</u></span></span></span></p>
</li>
</ol>
<p><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">VIM has to notify the user about the unavailability of resources triggered by NFVI. VIM accepts the message from admin and marks the affected resources. The problem (gap) is that VIM user can not get the maintenance notification.</span></span></span></p>
<ol start="5">
<li><span style="color:#00000a;"> <span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:large;"><b>Doctor Design Proposal in Fault management</b></span></span></span></span></span></li>
</ol>
<p><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;"><u><b>General design:</b></u></span></span></span></p>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Using sqlalchemy for ORM and mysql/postgres for the db of each component.</span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Each service will run as a daemon in threading. It should utilize the multi-cooperative/asynchronous threading as using greenthread and RPC inter-process communication technique to achieve this.</span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">The internal API between the services will be the RPC API, the external should be the REST API</span></span></span></li>
</ul>
<p><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;"><u><b>Cooperation with OpenStack components:</b></u></span></span></span></p>
<p><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">By this option, it needs to follow the architecture of OpenStack to make other components then can internally interact each other.</span></span></span></p>
<ol>
<ol type="a">
<li><strong><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Monitor: </span></span></span></strong></li>
</ol>
</ol>
<p><span style="text-decoration:underline;"><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Description:</span></span></span></span></p>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;"><em>To-be</em>: A module that monitors the resources of NFVI.</span></span></span></li>
</ul>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;"><span style="font-family:'Times New Roman', serif;"><em>Implementation:</em> It varies in implementation with various solutions (OpenStack Ceilometer, 3</span><sup><span style="font-family:'Times New Roman', serif;">rd</span></sup><span style="font-family:'Times New Roman', serif;"> party monitor solutions such as Zabbix, Nagios)</span></span></span></span></li>
</ul>
<ul>
<li><em><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Challenges:</span></span></span></em></li>
</ul>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Each tool has advantages and disadvantages (e.g. Ceilometer is not recommended for the medium and big size deployments) so that the choice of monitoring solutions should depend on the use cases of deployment. Thus, it is necessary to support multiple monitoring solutions. </span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">The current OpenStack monitoring solution is Ceilometer but it has many problems, two of them are the high resource consumption and the lack of supporting streamed data. In the future, Ceilometer may decrease these scenarios with TSDB or InfluxDB.</span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">It is good if a chosen tool has Python plugin driver so that the Inspector can query since the Doctor source code will be written in Python.</span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">The output format should be pre-defined and readable for Inspector.</span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Monasca supports streaming alarm engine, hundreds of thousands of metrics per second. However, it has the complexity in alarm dependency of failure.</span></span></span></li>
</ul>
<ul>
<li><em><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Candidates:</span></span></span></em></li>
</ul>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Ceilometer, Zabbix, Monsaca</span></span></span></li>
</ul>
<ol>
<ol start="2" type="a">
<li><strong><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Controller:</span></span></span></strong></li>
</ol>
</ol>
<p><span style="text-decoration:underline;"><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Description:</span></span></span></span></p>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;"><em>To-be:</em> A module that maintains the information database of physical and virtual resources.</span></span></span></li>
<li><em><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Implementation: </span></span></span></em></li>
</ul>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">It can be the OpenStack services (Nova, Neutron, Cinder). In this case, Resource Map will be the database of those OpenStack services. </span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;"><span style="font-family:'Times New Roman', serif;">All of the actions of finding and updating the state of affected virtual resources will be executed through API of OpenStack. These actions are triggered by Inspector.</span></span></span></span></li>
<li><span style="color:#00000a;"> <span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;"><span style="font-family:'Times New Roman', serif;">It should maintain its database that stores the state of resources. This database can be designed as the same way of OpenStack db by using sqlalchemy as an ORM and supports access through an API.</span></span></span></span></li>
</ul>
<ul>
<li><em><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Challenges: </span></span></span></em></li>
</ul>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">There is a spec of Nova that marks the state of vm down when it realizes crashed compute host/OS. </span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;"><span style="font-family:'Times New Roman', serif;">Besides, there is also another spec of forcing down the services and another spec of updating server state immediately in Nova in order to support manual orders from Consumers (See in Neutron, Cinder)</span></span></span></span></li>
</ul>
<ul>
<li><em><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Candidates:</span></span></span></em></li>
</ul>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Nova, Neutron, Cinder</span></span></span></li>
</ul>
<ol>
<ol start="3" type="a">
<li><strong><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">The Inspector:</span></span></span></strong></li>
</ol>
</ol>
<p><span style="text-decoration:underline;"><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Description: </span></span></span></span></p>
<ul>
<li><em><span style="color:#00000a;"><span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;">To-be:</span></span></span></em></li>
</ul>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Able to receive various failure notifications from monitors regarding of physical resources.</span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;"><span style="font-family:'Times New Roman', serif;">Able to update the affected VM by querying the Resource Map from the Controller.</span></span></span></span></li>
</ul>
<ul>
<li><em><span style="color:#00000a;"><span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;">Implementation:</span></span></span></em></li>
</ul>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;"><span style="font-family:'Times New Roman', serif;">It is able to understand various types of failure notifications of monitoring solutions such as 3rd party solutions, ceilometer, etc. In case of 3rd party, it can use Python specific modules designed for each solution (e.g. PyZabbix for Zabbix) to communicate. In case of OpenStack monitor solution such as Ceilometer, we can query the ceilometer client to get results. Generally, we can create an abstraction layer between Inspector and monitor solutions. The specific monitoring drivers can be provided in the configuration file. The abstraction layer will talk with APIs of monitoring solutions and Inspector will abstract this abstraction layer.</span></span></span></span></li>
</ul>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;"><span style="font-family:'Times New Roman', serif;">It is able to talk with OpenStack services APIs by querying them to find the affected Vms. </span></span></span></span></li>
</ul>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Updating the state of virtual/physical resources in the resource map should be the action of updating the DBs of OpenStack services such as Nova, Neutron, Cinder, etc.</span></span></span></li>
</ul>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;"><span style="font-family:'Times New Roman', serif;">It can directly send the alarms/alerts to Notifier by querying its API.</span></span></span></span></li>
</ul>
<ul>
<li><em><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Candidates: </span></span></span></em></li>
</ul>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Monasca</span></span></span></li>
</ul>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">A central engine that collects data from Monitor, maps the physical host and affected VMs in the Controller DB, triggers the VM state updating actions on Controller.</span></span></span></li>
</ul>
<ol>
<ol start="4" type="a">
<li><strong><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Notifier:</span></span></span></strong></li>
</ol>
</ol>
<p><span style="text-decoration:underline;"><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Desciption:</span></span></span></span></p>
<ul>
<li><em><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">To-be:</span></span></span></em></li>
</ul>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">It should receive the failure notification from Controller/Inspector.</span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">It should send the notification (alarms, alerts) to the Consumers.</span></span></span></li>
</ul>
<ul>
<li><em><span style="color:#00000a;"><span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;">Implementation:</span></span></span></em></li>
</ul>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">One candidate for this module is Ceilometer. It is able to receive the notifications (alarms, alerts) that are sent by Controller/Inspector. It means, each time Controller/Inspector would like to send notifications, they will trigger the module of Notifier so called NotificationSender to send notifications to a central notification collector of Notifier. </span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">It needs an API through that Consumers can query the information. Ideally, this API design is a RestAPI. Otherwise, it may have CLI for the usage of Consumer.</span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">This Notifier should support the south-bound interfaces (e.g. RestAPI, client interface) for others services that can query and a north-bound API (RestAPI) for consumer who can query and set the alarm policies.</span></span></span></li>
</ul>
<ul>
<li><em><span style="color:#00000a;"><span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;">Challenges:</span></span></span></em></li>
</ul>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;">The format/definition of notification that Notifier sends to Customer needs to be pre-defined</span></span></span></li>
</ul>
<ul>
<li><em><span style="color:#00000a;"><span style="font-family:'Liberation Serif', 'Times New Roman', serif;"><span style="font-size:medium;">Candidates:</span></span></span></em></li>
</ul>
<ul>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">Ceilometer</span></span></span></li>
<li><span style="color:#00000a;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;">A NotificationEngine that includes a NotificationReceiver to get the notification from Controller/Inspector and a NotificationSender that send the notification to Consumer.</span></span></span></li>
</ul>
<p class="western">
<p class="western">9/3/2016</p>
<p class="western">VietStack team</p>
