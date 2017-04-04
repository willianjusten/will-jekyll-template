---
layout: post
title: Introduction of Metadata service in Openstack
date: 2014-09-27 12:09:06.000000000 +07:00
type: post
published: true
status: publish
categories:
- Bài dịch - Tài liệu
- Cloud Computing
- Tech
- News
tags:
- Metadata
meta:
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _wpas_skip_facebook: '1'
  _wpas_skip_google_plus: '1'
  _wpas_skip_twitter: '1'
  _wpas_skip_linkedin: '1'
  _wpas_skip_tumblr: '1'
  _wpas_skip_path: '1'
  _edit_last: '61498925'
  geo_public: '0'
  _oembed_d04cd5e4a7eca371d891162fbd7b7ae4: "{{unknown}}"
  _oembed_67690b5407e322e7056c04ff5445df28: "{{unknown}}"
  _oembed_30c8b9362ff69cd49d198c9abfd81844: "{{unknown}}"
  _oembed_d81ddda7bc3fdc6bda36280388db7c5a: "{{unknown}}"
  _oembed_7254684e6fef3bb50ba9637d5ca808f6: "{{unknown}}"
  _wpcom_is_markdown: '1'
  _publicize_job_id: '27496387342'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>[This blog was inspired by my colleague: Bence Romsics in Ericsson. His email:bence.romsics@ericsson.com]</p>
<p><strong>Problem Abstract:</strong></p>
<p>Suppose that if any client in an Openstack instance wants to know the own information like:</p>
<ul>
<li>What is my public IP/hostname?</li>
<li>
<p>What is the ssh public key that i got?</p>
</li>
<li>
<p>Give me a random seed</p>
</li>
<li>
<p>Give me the metadata that tenant provides at the boot time: nova boot …. –user-data —-</p>
</li>
</ul>
<p>Those are reasons for the existing of metadata service. This service will handle such above requests of client.</p>
<p><strong>Overview of metadata service:</strong></p>
<p><a href="https://tuantuluong.files.wordpress.com/2014/09/neutron-metadata-dhcp-agent.png"><img class="alignnone size-medium wp-image-108" src="{{ site.baseurl }}/pictures/neutron-metadata-dhcp-agent.png?w=204&amp;h=300" alt="Neutron-metadata-dhcp-agent" width="204" height="300" /></a></p>
<p>Pic 1. Metadata service operation diagram with neutron-dhcp-agent (Source: bence.romsics@ericsson.com)</p>
<p><a href="https://tuantuluong.files.wordpress.com/2014/09/neutron-metadata-l3-agent.png"><img class="alignnone size-medium wp-image-109" src="{{ site.baseurl }}/pictures/neutron-metadata-l3-agent.png?w=184&amp;h=300" alt="Neutron-metadata-l3-agent" width="184" height="300" /></a></p>
<p>Pic 2.  Metadata service operation diagram with neutron-L3-agent <span style="line-height:1.7;">(Source: bence.romsics@ericsson.com)</span></p>
<p>Theoretically, Openstack provides metadata service through nova-api on controller node (up-to-now), by default listening at: nova-api-IP:8775. This IP is specified to metadata service differently to other nova-api-IPs. Neutron proxies the metadata requests of client in Openstack instance to nova metadata service. Inside an Openstack instance, the  HTTP client sends the requests to a link-local address (169.254.169.254:80) which is allocated for metadata service without any authenticating or identifying. From now on, it is the work of neutron.</p>
<p>Inside neutron node, because the requests sent to it without neither authenticating nor identifying, neutron has to do something to identify the source of those requests. There are two elements responsible for that. The first one is Neutron-metadata-proxy laying in Neutron dhcp namespace, another one is neutron-metadata-agent. They are running on the same host and connected by unix socket.</p>
<p>The question is came out that why do we need 2 metadata components for that? Because neutron-metadata-proxy laying in neutron dhcp (Pic.1) or router (Pic.2) namespace can see the IP of the source that sends the requests so that it can handle the overlapping tenant subnets in multiple tenant network by knowing the tenant network where the requests come from. For example, you have 2 tenant network. What if there are two instances which have the same IP address i.e 10.0.0.1 (because they are isolated network then their IPs are independent, that is reason they can be the same) send request? The namespaces in Neutron will handle this. Each tenant network has the own namespace in neutron so that neutron-metadata-proxy knows exactly what the source of request is. And then it adds HTTP headers, Neutron-Network-ID… of the source and passes to neutron-metadata-agent. Neutron-metadata-agent queries public Openstack APIs for the source instances UUID and it adds UUID as a HTTP header.</p>
<p>Metadata service can operate in separately independent methods: via DHCP-agent (Pic.1) or L3-agent (Pic.2). Whatever method it works, the mechanism is the same, only the difference in configuration.</p>
<p><strong>Config </strong></p>
<p>These following configs are the same whether using dhcp or l3-agent:</p>
<p><strong><em>/etc/nova/nova.conf:</em></strong></p>
<p>enabled_apis = osapi_compute,metadata</p>
<p>service_neutron_metadata_proxy = True</p>
<p>neutron_metadata_proxy_shared_secret = SECRET_KEY</p>
<p><em><strong>/neutron/metadata_agent.ini:</strong></em></p>
<p>[DEFAULT]<br />
auth_url = <a href="http://controller:5000/v2.0" rel="nofollow">http://controller:5000/v2.0</a><br />
auth_region = RegionOne<br />
admin_tenant_name = service<br />
admin_user = neutron<br />
admin_password = admin_pass<br />
nova_metadata_ip = controller<br />
metadata_proxy_shared_secret = SECRETE_KEY</p>
<p><strong><em>1. <strong>For usi</strong>ng qdhcp namespace (dhcp agent):</em></strong></p>
<p><em>/neutron/dhcp_agent.in:</em></p>
<p>enable_metadata_network = True</p>
<p>enable_isolated_metadata = True</p>
<p><em>/neutron/l3_agent.ini:</em></p>
<p>enable_metadata_proxy = False</p>
<p><em><strong>2. For using qrouter namespace (l3-agent):</strong></em></p>
<p><em>/neutron/dhcp_agent.ini:</em></p>
<p>enable_metadata_network = True</p>
<p>enable_isolated_metadata = False</p>
<p><em>/neutron/l3_agent.ini:</em></p>
<p>enable_metadata_proxy = True</p>
<p>metadata_port = 9697</p>
<p>metadata_proxy_socket = /var/lib/neutron/metadata_proxy</p>
<p>&nbsp;</p>
<p><em><strong>Contact: vietstack@gmail.com</strong></em></p>
<p><em><strong>Facebook Groups: https://www.facebook.com/groups/vietstack/</strong></em></p>
<p><em><strong>TW: @vietstack</strong></em></p>
