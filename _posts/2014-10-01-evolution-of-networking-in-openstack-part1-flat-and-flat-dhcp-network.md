---
layout: post
title: 'Evolution of networking in Openstack (Part1: Flat and Flat DHCP network)'
date: 2014-10-01 14:45:21.000000000 +07:00
type: post
published: true
status: publish
categories:
- Bài dịch - Tài liệu
- Chia sẻ kinh nghiệm
- Hướng dẫn - Kinh Nghiệm
- Tài liệu tham khảo
tags: []
meta:
  _wpas_skip_facebook: '1'
  _wpas_skip_google_plus: '1'
  _wpas_skip_twitter: '1'
  _wpas_skip_linkedin: '1'
  _wpas_skip_tumblr: '1'
  _wpas_skip_path: '1'
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
<p>In the frame of this paper, i will summary the process of evolution of networking in Openstack. Firstly, we will revise the evolution of networking agility in virtualization. Networking virtualization solutions started from the VLAN approach that was applied and configured on physical switches. It had some limitations such as static, complex, manual, tenant state requirement in physical network. We call this solution is "Manual End-to-End". Then it improved to a new state called "Reactive End-to-End" and then Virtual Network Overlays. All of the features of each period in network virtualization evolution is described in Pic.1.</p>
<p><!--more--></p>
<p><a href="https://vietstack.files.wordpress.com/2014/09/openstack-networking-and-automation-4-638.jpg"><img class="aligncenter size-large wp-image-328" src="{{ site.baseurl }}/assets/openstack-networking-and-automation-4-638.jpg?w=630" alt="openstack-networking-and-automation-4-638" width="630" height="472" /></a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p style="text-align:center;">Pic 1. Evolution of Network Virtualization (Source: Midokura)</p>
<p>     In current versions of Openstack, Neutron is implemented as a main networking solution. Before Neutron, Nova-networking was only the network solution prior Quantum/Neutron. Nowadays, it is still available in Openstack versions but it seems phased out because of its limitations. In some blogs of Mirantis, the term "Network manager" is used generally to have a more precise overview of Openstack networking so that i would love to use that term in this blog. A network manager defines the network topology depending on Openstack deployment requirements. Initially, Nova-networking had only FLAT network manager, FLAT DHCP network manager. Then it evolved to VLAN network manager and when Neutron was born, it took responsible for Openstack networking from Nova-networking. Step by step, we will go though each Openstack networking solution. In this paper, i will present about FLAT and FLAT DHCP network manager.</p>
<p>&nbsp;</p>
<p><strong>FLAT Network:</strong></p>
<p>What is "FLAT" network?</p>
<p>In a nutshell, A FLAT network is the network in which all the devices operate on the same bandwidth, share broadcast domain and have the ability to affect the throughput of other devices so that cause the delay in the traffic flow.</p>
<p>&nbsp;</p>
<p><a href="https://vietstack.files.wordpress.com/2014/09/10fig08.gif"><img class="aligncenter size-full wp-image-320" src="{{ site.baseurl }}/assets/10fig08.gif" alt="10fig08" width="350" height="162" /></a></p>
<p style="text-align:center;">Pic 2. Flat network topology (Source: etutorial.org)</p>
<p>&nbsp;</p>
<p>In Pic 2, we can see here the existing of a switch.  Initially, a hub is implemented to the FLAT network but in the high bandwidth network or numerous users network with traffic-intensive applications, a switch is preferred than a hub. Since a hub works at physical Layer 1, a switch works at physical Layer 2 so it segments network into smaller collision domains to reduce the delay in traffic flow. That means at the same time, there are a number of devices that can compete for bandwidth than in the hub, all the devices can compete for bandwidth so that it causes the congestion.</p>
<p>Summary, in the FLAT network, there is no hierarchy, every device performs the same job, at the same level so that FLAT network is easy to managed and implemented. Otherwise, a FLAT network is not divided into layers, modules but it has small problem in trouble shooting or isolation. They are still in control as long as FLAT network stays small and manageable.</p>
<p>&nbsp;</p>
<p><strong>FLAT manager and FLAT DHCP manager in Openstack:</strong></p>
<p>Flat network or FlatDHCP network are based on the same model. The concept here is networking through bridge. All the instances spawned are attached to this bridge (here this example is Linux bridge). This single Linux bridge per physical host is attached to a single physical NIC (here is eth0). Multiple instances are present per bridge. Instances share single L2 broadcast domain with all other instances and physical hosts. The idea laying behind them is to have a “flat” IP address pool defined throughout the cluster. This IP address pool is shared among instances regardless of tenant. That means that whichever tenant instances belong to, the tenant can grab available IP addresses in the pool.</p>
<p>&nbsp;</p>
<p style="text-align:center;"><a href="https://vietstack.files.wordpress.com/2014/09/generic-bridge-config-2.png"><img class="aligncenter size-full wp-image-329" src="{{ site.baseurl }}/assets/generic-bridge-config-2.png" alt="generic-bridge-config-2" width="255" height="296" /></a></p>
<p style="text-align:center;">Pic 3. Flat network manager in single-host network model (Source: Mirantis)</p>
<p>&nbsp;</p>
<p><strong>FLAT manager:</strong></p>
<p>As mentioned above, in Flat networking, the instances are attached to Linux bridge without any actions of IP configuration of instances. That means the Flat manager only has to attach instances to bridge, nothing more. The IP assignment process is the task of administrator or DHCP server or other means (Pic 3). Generally, in FLAT manager, there are two models: single-host network and multi-host network.</p>
<p>&nbsp;</p>
<p style="text-align:center;"><a href="https://vietstack.files.wordpress.com/2014/09/single-host.png"><img class="aligncenter size-large wp-image-332" src="{{ site.baseurl }}/assets/single-host.png?w=630" alt="single-host" width="630" height="383" /></a></p>
<p style="text-align:center;">Pic 4. FLAT network manager model</p>
<p>     In the single-host network (Pic 4), nova-network ( mostly runs on controller node) runs as a daemon providing L3 services, for example, through this L3 services, instances can connect to the internet. In this case, the nova-network host acts as a gateway for instances. But if nova-network host dies so that all the L3 services are down too. This is a limitation of single-host network model.</p>
<p>In the multi-host network, the routing to external world (L3 services) are moved from the central server to each compute host independently to prevent the single-point failure for L3 services. To do this, Nova-network daemon is added to each Nova-compute host. In this case, Linux bridge acts as gateway for instances so that nova-network maintains the IP assignments to Linux bridge and instances to nova-databaase. But this solution requires two NICs per compute host. In addition, it adds the complexity to each compute host.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><a href="https://vietstack.files.wordpress.com/2014/09/screenshot-from-2014-09-30-215629.png"><img class="aligncenter size-large wp-image-331" src="{{ site.baseurl }}/assets/screenshot-from-2014-09-30-215629.png?w=630" alt="Screenshot from 2014-09-30 21:56:29" width="630" height="380" /></a></p>
<p>&nbsp;</p>
<p style="text-align:center;">Pic 5. Multi-host network (Source: Mirantis)</p>
<p>&nbsp;</p>
<p><strong>FLAT DHCP manager:</strong></p>
<p>In Pic 6, FLAT DHCP manager plugs instances to the bridge and on top of that adds the DNSMasq service. This DNSMasq provides a DHCP server to dynamically creates "static addresses" that are assigned to instances. In this case, Linux bridge is give an ip address from IP pool and acts as a gateway of instances. The DNSMasq listens the ip address of bridge and creates static addresses to instances. To do this process, the default gateway of dnsmasq is set to the ip address of bridge and the data of each instance is put into DHCP lease file. As mentioned above, FLAT DHCP manager has only difference with FLAT manager that it has DNSMasq service on bridge. In FLAT manager, ip addresses are assigned from external DHCP server or from any means but in FLAT DHCP manager, ip addresses are assigned by DNSMasq service.</p>
<p>&nbsp;</p>
<p style="text-align:center;"><a href="https://vietstack.files.wordpress.com/2014/09/flat_dhcp_manager.png"><img class="aligncenter size-large wp-image-333" src="{{ site.baseurl }}/assets/flat_dhcp_manager.png?w=630" alt="FLAT_DHCP_MANAGER" width="630" height="250" /></a></p>
<p style="text-align:center;">Pic 6. FLAT DHCP manager (Source: Mirantis)</p>
<p><strong>Features and Limitations of Flat Manager:</strong></p>
<ul>
<li> Network configuration can be done in /etc/network/interfaces.</li>
<li>Its operation is simple, easy to configure and reliable.</li>
<li>Needed to manually add bridges to attach instances.</li>
<li>Utilize large IP pool and L2 broadcast domain. That makes limitation in scalability and security.</li>
<li>In FLAT DHCP Manager, there are loads and complexity of DNSMasq service on compute. It still uses IP pool and single broadcast domain and has problems of isolation.</li>
</ul>
<p>Source: mirantis.com , midokura ... and google !</p>
