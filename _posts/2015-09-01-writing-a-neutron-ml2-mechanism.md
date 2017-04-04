---
layout: post
title: Writing a Neutron ML2 mechanism
date: 2015-09-01 11:24:17.000000000 +07:00
type: post
published: true
status: publish
categories:
- Chia sẻ kinh nghiệm
- Devstack
tags: []
meta:
  _wpcom_is_markdown: '1'
  _edit_last: '61498925'
  geo_public: '0'
  _oembed_d4fde6c512d89bbe8663c3bce9272404: "{{unknown}}"
  _oembed_66dd8de3b27d35c7b9eef5b8d7f8dec6: "{{unknown}}"
  _oembed_0d65d56873ed05989bc30e3f8d2db4b6: "{{unknown}}"
  _publicize_job_id: '14315141912'
  _oembed_4196083f559752277e59ef2a76f7cce2: "{{unknown}}"
  _oembed_67b2abfb4585cfb27002669ebc6228dc: "{{unknown}}"
  _oembed_7824d59c29256f4335c1a2b670c14ab1: "{{unknown}}"
  _oembed_fa49b5c913dd57787c65c158a2c323da: "{{unknown}}"
  _oembed_da43e64fdae9dfbeeb479b36a59233c1: "{{unknown}}"
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<h3 class="western"></h3>
<p>If you want to get understanding about Neutron ML2 Plugin, you can check the below link:</p>
<p>https://wiki.openstack.org/wiki/Neutron/ML2</p>
<p><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">In this post I will show you how to write a ML2 mechanism driver. What I am going to do is write a driver called mech_vietstack, then create a network. You will see the implementation of mech_vietstack in network creating. In addition, you can extend other functions such as network update, delete or subnet create, etc.</span></span></span></p>
<p>&nbsp;</p>
<h3 class="western"></h3>
<ul>
<li class="western"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:large;"><b>Overview</b></span></span></span></li>
</ul>
<p><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><span style="color:#222222;">One of the key objectives of ML2 is to support multiple mechanism drivers under one plugin. It was previously not possible with a monolithic plugin. Hence if you see in ML2 plugin.py file, it calmly receives the request how any other plugin does. It then performs all the internal operations that it needs to do like updating database entries, setting up the internal services, etc. After doing all that it dispatches the request to all the mechanism drivers you have registered in </span><span style="color:#ff0000;">/etc/neutron/plugins/ml2/ml2_conf.ini </span><span style="color:#222222;">in the following section:</span></span></span></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><b>/neutron/plugins/ml2/plugin.py</b></span></span></span></p>
<p align="left"><a href="https://vietstack.files.wordpress.com/2015/09/screenshot-from-2015-09-01-130903.png"><img class="wp-image-581 aligncenter" src="{{ site.baseurl }}/assets/screenshot-from-2015-09-01-130903.png" alt="Screenshot from 2015-09-01 13:09:03" width="885" height="153" /></a></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Georgia, Utopia, 'Palatino Linotype', Palatino, serif;"><span style="font-size:medium;">(Source: <a href="http://control-that-vm.blogspot.hu/2014/08/writing-your-own-mechanism-driver-for.html">http://control-that-vm.blogspot.hu/2014/08/writing-your-own-mechanism-driver-for.html</a>)</span></span></span></p>
<h3 class="western"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">/neutron/plugins/ml2/driver_api:</span></span></span></h3>
<p><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Includes the definitions of all the methods used in ML2 mechanism drivers. In this file, there are methods that will called the specific methods defined in each ML2 mechanism driver, for example, the method create_network() in driver_api will refer to create_network_precommit(), create_network_commit() methods. The way those methods are defined is specified in each mechanism driver. See the example of mech_vietstack as an easy definition of those methods.</span></span></span></p>
<p>&nbsp;</p>
<ul>
<li><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:large;"><b>Experiment with Devstack stable/Kilo</b></span></span></span></li>
</ul>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">*********************</span></span></span></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><b>/etc/neutron/plugins/ml2/ml2_conf.ini</b></span></span></span></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">[ml2]</span></span></span></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">mechanism_drivers = openvswitch,linuxbridge,vietstack</span></span></span></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">**********************</span></span></span></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><b>/opt/stack/neutron/neutron.egg-info/entry_points.txt</b></span></span></span></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">[neutron.ml2.mechanism_drivers]</span></span></span></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">vietstack = neutron.plugins.ml2.drivers.mech_vietstack:VietstackMechanismDriver</span></span></span></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">The name “vietstack” here will be passed to the mechanism_drivers in ml2_conf and it specifies the path to the mentioned mechanism driver. VietstackMechanismDriver is the class inside the mech_vietstack mechanism driver.</span></span></span></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">******************</span></span></span></p>
<p align="left"><a href="https://vietstack.files.wordpress.com/2015/09/screenshot-from-2015-09-01-130754.png"><img class="aligncenter wp-image-580" src="{{ site.baseurl }}/assets/screenshot-from-2015-09-01-130754.png" alt="Screenshot from 2015-09-01 13:07:54" width="1148" height="535" /></a></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">*****************</span></span></span></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Now, restart neutron-server then boot a network called “vietstack1”</span></span></span></p>
<p align="left">**************</p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">See the logs below to see how “mech_vietstack” is implemented. </span></span></span></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">25573 INFO neutron.plugins.ml2.managers [-] Configured mechanism driver names: ['openvswitch', 'linuxbridge', <span style="color:#ff0000;">'vietstack'</span>]</span></span></span></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">INFO neutron.plugins.ml2.managers [-] Loaded mechanism driver names: ['openvswitch', 'linuxbridge', <span style="color:#ff0000;">'vietstack'</span>]</span></span></span></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">INFO neutron.plugins.ml2.managers [-] Registered mechanism drivers: ['openvswitch', 'linuxbridge', <span style="color:#ff0000;">'vietstack'</span>]</span></span></span></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">INFO neutron.plugins.ml2.drivers.mech_vietstack [-] Initializing</span></span></span></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">INFO <span style="color:#ff0000;">neutron.plugins.ml2.drivers.mech_vietstack</span> [req-537b93a0-f369-40f1-8f38-5462c5555f3f admin admin] <span style="color:#ff0000;">Create Network Precommits with</span> network_id: 89a7527b-b0a6-4428-8e7e-fd52afbd7319, tenant_id: f7f97372bd184eab8588d822ad5b5e18, segment: [{'segmentation_id': 1054L, 'physical_network': None, 'id': u'd27252cb-c0e7-454f-ae55-d7fb021f4b84', 'network_type': u'vxlan'}]</span></span></span></p>
<p align="left"><span style="color:#222222;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">INFO <span style="color:#ff0000;">neutron.plugins.ml2.drivers.mech_vietstack</span> [req-537b93a0-f369-40f1-8f38-5462c5555f3f admin admin] <span style="color:#ff0000;">Create Network Postcommits with</span> network_id: 89a7527b-b0a6-4428-8e7e-fd52afbd7319, tenant_id: f7f97372bd184eab8588d822ad5b5e18</span></span></span></p>
<p align="left">
<p align="left">1/9/2015</p>
<p align="left">VietStack Team</p>
