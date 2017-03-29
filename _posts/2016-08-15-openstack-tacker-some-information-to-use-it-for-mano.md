---
layout: post
title: "[OpenStack-Tacker] Some information to use it for MANO"
date: 2016-08-15 10:47:22.000000000 +07:00
type: post
published: true
status: publish
categories: []
tags: []
meta:
  _wpcom_is_markdown: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '25803326112'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>Telco cloud is one of the most considering use case that is implemented, leveraged by collaboration of telco cooperation such as Huawei, Nokia, Ericsson, etc. The abstraction of MANO (Management and Network Orchestration) then is created by ETSI ISG NFV that is a combination of entities that manages and orchestrates cloud infrastructure for NFV. For more information, you can have it in the official website of ETSI:</p>
<p><a href="http://www.etsi.org/technologies-clusters/technologies/nfv">http://www.etsi.org/technologies-clusters/technologies/nfv</a></p>
<p>As of today, there are actually a race/competition between telco cloud vendors about MANO implementation. There are some commercial products as below:</p>
<ul>
<li>CloudBand Management System of Alcatel-Lucent</li>
<li>Nokia Cloud Application Manager</li>
<li>
<p>Ericsson Cloud Manager</p>
</li>
<li>
<p>HP NFV Director</p>
</li>
</ul>
<p>Besides, there are some open source MANO projects that are orginally initiated by telco cloud providers. They are OpenMANO of Telefonica – Spain, OpenO under the driving of China Mobile. In addition, there are also some products/projects that are seemed as a part and supports MANO such as Cloudify, Ubuntu Juju, etc. One of them is OpenStack Tacker.</p>
<p>In order to test Tacker, we can try it with Devstack by adding the below line in local.conf:</p>
<p><strong>enable_plugin tacker https://git.openstack.org/openstack/tacker master</strong> (I tried to test with master branch of Tacker on top of Mitaka)</p>
<p>About the description of OpenStack Tacker, you can easily check out on the Internet. Since OpenStack Tacker utilizes TOSCA template and the most important part to use Tacker is how to write the TOSCA template. More information is below:</p>
<p><a href="http://docs.openstack.org/developer/tacker/devref/vnfd_template_description.html">http://docs.openstack.org/developer/tacker/devref/vnfd_template_description.html</a></p>
<p>Have fun,</p>
<p>VietStack team</p>
