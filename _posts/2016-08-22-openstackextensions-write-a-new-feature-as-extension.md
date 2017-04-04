---
layout: post
title: "[OpenStack][Extensions] Write a new feature as extension"
date: 2016-08-22 15:20:07.000000000 +07:00
type: post
published: true
status: publish
categories:
- OpenStack
tags: []
meta:
  _wpcom_is_markdown: '1'
  _rest_api_published: '1'
  _oembed_1a82f996aa18bda6e3c92ee84a882ad3: "{{unknown}}"
  _oembed_d82850b769ff3af9015d6273ddf912ab: "{{unknown}}"
  _rest_api_client_id: "-1"
  _publicize_job_id: '26036397091'
  _oembed_77f85147e99c9c00128e3cb8d5d8ecf6: "{{unknown}}"
  _oembed_84fcc82f2ebbc2bc62be2ab6e7ad8bd8: "{{unknown}}"
  _oembed_d3374c4740d60a73f831c2cbee255a15: "{{unknown}}"
  _oembed_a76adac362d14b7b1f158f64d5349ab1: "{{unknown}}"
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>The first question is why we need extensions?</p>
<p>OpenStack as other architectures that support user interaction via API needs to have standard, stable API and another feature that supports innovation, capability for adding new specification based on use cases – it is called extensibility. This extensibility in API allows developing new API based on the needs of different, niche use cases but does not affect to the base, standard API. In a nut shell, a developer wants to add a new feature that returns some information of instance running on cloud, he/she can put it into extension of API then user can query and this modification does not make any problems of standard API that is defined before. If this modification is not needed, it can be removed easily. It looks like pluggability. Otherwise, extensions in API are important for testing new features before these feature become standard.</p>
<p>However, in the next releases of OpenStack, extensions will be removed and replaced by API microversion. Since some new features are developed before with API extensions due to the need of use case, developers still need to maintain and uplift them if needed.</p>
<p>In OpenStack, the folder includes extensions is …/contrib. For example, in novaclient, we can easily find the directory of novaclient/v2/contrib/. In client.py of novaclient (novaclient/client.py), we should see the discovery of extension as below. One of the extension provider is through contrib path:</p>
<p><img class="alignnone size-full wp-image-880" src="{{ site.baseurl }}/assets/discovery.png" alt="discovery" width="1300" height="469" /></p>
<p>&nbsp;</p>
<p>Let's have a quick test with it. I am going to create a new CLI that is called “vietstack” as below:</p>
<p><img class="alignnone size-full wp-image-868" src="{{ site.baseurl }}/assets/vietstack.png" alt="vietstack" width="1855" height="1056" /></p>
<p>What we are going to do is understanding a flow of creating a new feature and put it into API extension. Here I chose Nova for presenting.</p>
<p>The below addition is necessary for novaclient as we type “nova vietstack”.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><img class="alignnone size-full wp-image-877" src="{{ site.baseurl }}/assets/contrib.png" alt="contrib" width="1300" height="801" /></p>
<p>Since we have the additional feature in novaclient, each time we trigger “vietstack” command as “nova vietstack”, this command will talk to the <strong>nova-api</strong> and call the appropriate feature that we are going to define for extension. We have to put a new feature called “vietstack” in <strong>/nova/api/openstack/compute/contrib/vietstack.py</strong>. What you want to develop vietstack.py that will execute some actions when you call "nova vietstack".</p>
<p>You can re-write live-migration or offline-migration and rename it “vietstack” - we will charge you if you use it for copyright :D – or you can develop the new feature. That is actually up to you. Take the below instruction for reference:</p>
<p>http://docs.openstack.org/developer/nova/api_plugins.html</p>
<p>Have fun :D</p>
<p>&nbsp;</p>
<p>22/08/2016</p>
<p>VietStack team</p>
<h6></h6>
