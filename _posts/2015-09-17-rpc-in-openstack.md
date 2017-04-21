---
layout: post
title: RPC in OpenStack
date: 2015-09-17 16:23:44.000000000 +07:00
type: post
published: true
status: publish
categories:
- Hướng dẫn - Kinh Nghiệm
- OpenStack
- Tech
tags:
- RPC
meta:
  _wpcom_is_markdown: '1'
  _edit_last: '61498925'
  geo_public: '0'
  _publicize_job_id: '14886349382'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:large;"><b>OpenStack RPC</b></span></span></p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><b>RabbitMQ</b></span></span></p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">- RabbitMQ broker stays between internal components of each service in OpenStack (e.g. nova-conductor, nova-scheduler in Nova service) and allow them to communicate each other in the loosely coupled way.</span></span></p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">- RabbitMQ runs on controller as a process that will get the message from Invoker (API or scheduler) through rpc.call() or rpc.cast().</span></span></p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">rpc.cast – don’t wait for result (one-way)</span></span></p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">rpc.call – wait for result (when there is something to return) (request + response)</span></span></p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">- In one-way messaging, client thread sends a request that includes a message. The client thread does not wait for the reply of server but still continues processing. The request is sent to transport layer from where the server will get the request. The request is not immediately executed but stays in a queue until transport layer sends it to server. After the request is accepted by transport layer, client is not notified about the failure of server (if there exists) when it tries to execute request. For example, server refuses request due to authentication but client is not notified about this problem.</span></span></p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">- Oslo.messaging is used to create a RPC interface that includes RPCClient and RPCServer methods. For instance, in Nova service, when nova scheduler wants to talk with nova compute, it will call a RPCClient defined inside oslo.messaging. That RPCClient will trigger rpc.call(), rpc.cast() and send the messages into a queue that is responsible for transferring the message queuing/receiving response to/from RPCServer. RPCServer method is implemented in other components of Nova such as nova-network, nova-compute, etc. How is that queue created? It is the task of RabbitMQ.</span></span></p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><b>Short overview of RPC over RabbitMQ</b></span></span></p>
<p>“ <span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">According to the AMQP spec there’s a direct exchange with no public name to which every queue must be bound by default using the queue name as routing key. Our server has to use this exchange to reply to its clients, publishing the messages with said routing key. The next piece in our puzzle is the “</span></span><em><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">reply-to” </span></span></em><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">property from AMQP messages. When our client publishes a request, it will send the queue name via the ”</span></span><em><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">reply-to” </span></span></em><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">property. Once the request is published it will wait and listen into its own anonymous queue. Once the RPC server gets the reply ready, it will send it to the exchange and it will finally arrive to our client. Easy…</span></span></p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Here’s an image to further illustrate the point”:</span></span></p>
<p><a href="https://vietstack.files.wordpress.com/2015/09/rpc-overrmq.png"><img class="aligncenter size-full wp-image-592" src="{{ site.baseurl }}/pictures/rpc-overrmq.png" alt="RPC-OverRMQ" width="598" height="241" /></a></p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">                                                                Source: <a href="http://videlalvaro.github.io/2010/10/rpc-over-rabbitmq.html">http://videlalvaro.github.io/2010/10/rpc-over-rabbitmq.html</a></span></span></p>
<p>&nbsp;</p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><b>OpenStack Nova and RPC</b></span></span></p>
<p>“<span style="color:#3e4349;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Every Nova component connects to the message broker and, depending on its personality (for example a compute node or a network node), may use the queue either as an Invoker (such as API or Scheduler) or a Worker (such as Compute or Network). Invokers and Workers do not actually exist in the Nova object model, but we are going to use them as an abstraction for sake of clarity. An Invoker is a component that sends messages in the queuing system via two operations: 1) rpc.call and ii) rpc.cast; a Worker is a component that receives messages from the queuing system and reply accordingly to rpc.call operations.</span></span></span><span style="color:#3e4349;">“</span></p>
<p><span style="color:#3e4349;"><span style="font-family:Arial, sans-serif;"><span style="font-size:small;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">(Source: <a href="http://docs.openstack.org/developer/nova/devref/rpc.html">http://docs.openstack.org/developer/nova/devref/rpc.html</a>)</span></span></span></span></span></p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Otherwise, in Nova service, inside each component, the mechanism of communicate among component factors is also using RPC. Most of Nova components have a python module that handles the marshaling of RPC process. For example, nova-network has /nova/network/api.py or nova-conductor has nova/conductor/api.py or nova-compute has /nova/compute/api.py. When those nova components are initiated, nova will run /nova/service.py to create the RPCServer for each of them. </span></span></p>
<blockquote><p><span style="color:#000000;"> <span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">target</span></span><span style="font-family:Arial, sans-serif;"><span style="color:#000000;"> = messaging.Target(topic=</span><span style="color:#000000;"><i>self</i></span><span style="color:#000000;">.topic, server=</span><span style="color:#000000;"><i>self</i></span><span style="color:#000000;">.host)</span></span></span></p>
<p align="left"><span style="color:#000000;"> <span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">endpoints = [</span></span></span></p>
<p align="left"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><span style="color:#000000;"><i>     self</i></span><span style="color:#000000;">.manager,</span></span></span></p>
<p align="left"><span style="color:#000000;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">     baserpc.BaseRPCAPI(</span><span style="color:#000000;"><i>self</i></span><span style="color:#000000;">.manager.service_name, </span><span style="color:#000000;"><i>self</i></span><span style="color:#000000;">.backdoor_port)</span></span></span></p>
<p align="left"><span style="color:#000000;"> <span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">]</span></span></span></p>
<p align="left"><span style="color:#000000;"> <span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">endpoints.extend(</span><span style="color:#000000;"><i>self</i></span><span style="color:#000000;">.manager.additional_endpoints)</span></span></span></p>
<p align="left"><span style="color:#000000;"> <span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">serializer = objects_base.NovaObjectSerializer()</span></span></span></p>
<p align="left"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><span style="color:#000000;"><i>self</i></span><span style="color:#000000;">.rpcserver = rpc.get_server(</span><span style="color:#000000;">target</span><span style="color:#000000;">, endpoints, serializer)</span></span></span></p>
<p align="left"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><span style="color:#000000;"><i>self</i></span><span style="color:#000000;">.rpcserver.start()</span></span></span></p>
</blockquote>
<p align="left">
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Each RPC process marshalling handler will hear the REST API command of HTTP service then marshal up the content of that command into function call and send to the corresponding RPCServer by writing to AMQP queue. For example, when we boot an instance, nova-api server will get the request in the form of REST API. Compute-api will trigger conductor-api that will call Conductor RPCClient to send message to Conductor RPCServer about the process of instance building. Then, Conductor RPCServer (conductor/manager.py) will trigger SchedulerClient to do an additional work that is selecting destination for instance.</span></span></p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">SchedulerClient is a Client library for placing calls to the scheduling operations. Those methods in this Client library reference to the actual actions that in fact, are the operations of Scheduler RPCClient (/scheduler/client/query.py, /scheduler/client/report.py).</span></span></p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Generally, It depends on what action get from python-novaclient so that those APIs will have different process flow.</span></span></p>
<p>&nbsp;</p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><b>And now....</b></span></span></p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">In this below experiment, I will show you a simple example of using RPC with oslo.messaging. You can download python oslo.messaging module here: <a href="https://pypi.python.org/pypi/oslo.messaging/1.4.2">https://pypi.python.org/pypi/oslo.messaging/1.4.2</a>.</span></span></p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Here I create a OpenStack environment by using devstack on vagrant. I was quite lazy so it seemed good to me when I decided to utilize oslo.messaging implemented in devstack environment.</span></span></p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">I created two files, one represents for RPCClient, one for RPCServer and put them into directory of python2.7 in order to use oslo.messaging.</span></span></p>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Then take a coffee, run test_server.py, test_client.py and enjoy RPC.</span></span></p>
<p>test_client.py:</p>
<p><a href="https://vietstack.files.wordpress.com/2015/09/run.png"><br />
</a> <a href="https://vietstack.files.wordpress.com/2015/09/test_client.png"><img class="aligncenter size-full wp-image-589" src="{{ site.baseurl }}/pictures/test_client.png" alt="test_client" width="630" height="458" /></a></p>
<p>test_server.py:</p>
<p><a href="https://vietstack.files.wordpress.com/2015/09/test_server.png"><img class="aligncenter size-full wp-image-590" src="{{ site.baseurl }}/pictures/test_server.png" alt="test_server" width="630" height="415" /></a></p>
<p>Result:</p>
<p><img class="aligncenter size-full wp-image-588" src="{{ site.baseurl }}/pictures/run.png" alt="run" width="630" height="76" /></p>
