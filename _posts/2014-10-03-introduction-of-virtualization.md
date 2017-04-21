---
layout: post
title: Introduction of Virtualization
date: 2014-10-03 06:59:22.000000000 +07:00
type: post
published: true
status: publish
categories:
- Tài liệu tham khảo
- Tech
- News
tags:
- Virtualization
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
<p><ins datetime="2014-10-02T18:32:10+00:00"></ins><ins datetime="2014-10-02T18:32:10+00:00"></ins>At the first time when i have made friend with cloud computing through Openstack, i was so confused about the term "Virtualization" , what the definition of it, how it is used in cloud computing, etc. That was the trigger that forced me to write this short summary of virtualization.</p>
<p><strong>1. What is virtualization?</strong></p>
<p>The term virtualization appeared a long time ago but it has become a popular concept since the x86 architecture was born. This x86 technology was born for CPU, IOs and memory as well as the trend of virtualization technology development. Hence, when implying about virtualization technology, all the its concepts are related to x86 architecture.<br />
I have read a lots of definition of this concept, for example: "It is a process of simulating 'virtual' versions of infrastructure resources such as computing environment, storage devices, operating system.... as opposed to create those thing in physical ways". It is quite clear or imaginable for IT engineers but with a new comer, it is so blur. So let make it easy. Imagine you are using Mac operating system (OS), but sometime you want to try or feel other features, advantages,etc. of Window OS, so what will you do. For sure you can not uninstall Mac OS and install Window instead. The VirtualBox or VMware or any kinds of virtualization softwares will help you to do that. They will create a virtual machine with Window OS running inside and this virtual machine parallelly runs inside your Apple machine. The question is given out that how they can do that, how they can assign all the features of Window to that virtual machine... Because they use virtualization technology. They 'virtualize'- allow some pieces of your physical resources such as RAM, hard drive... run both Mac OS and Window (in this example ) at the same time. They take amount of your physical resources as you customize when creating a virtual machine to provide for the virtualization.</p>
<p><strong>2.  How does such a thing "virtualization" run on a physical host?</strong></p>
<p>The answer is the following picture:</p>
<p><a href="https://tuantuluong.files.wordpress.com/2014/08/vc_blog_virtualization-illustration_small-300x241.png"><img class="size-full wp-image-66 aligncenter" src="{{ site.baseurl }}/pictures/vc_blog_virtualization-illustration_small-300x241.png" alt="VC_Blog_Virtualization-Illustration_small-300x241" width="300" height="241" /></a></p>
<p style="text-align:center;">Picture 1. Virtualization diagram (Source: Google)</p>
<p>We can see a new layer named "Hypervisor" between the physical hardware and virtual machines. What is hypervisor? We have known 'supervisor' term, literally, hypervisor has more 'authority'. Hypervisor is a piece of software which does the job of Virtual Machine Manager. It allows the virtual machines share a single hardware platform (CPU, RAM, etc.). As we know, 'virtualize' means dividing the resources (RAM, CPU, etc.) of a physical hardware to the independent virtual machines. By which, hypervisor is such an manager that controls and allows the time of  physical resource's usage to virtual machines. Each operating system running on each virtual machine is called Guest OS and if any, the operating system of Hypervisor is called Host OS (Pic 3). Besides, the operating system  has a one-to-one connection to physical hardware, but with the recent multi-core, multi-thread processors and numerous capacity of RAM, using single OS seems wasteful and running  multiple OS-s looks like an easy way.</p>
<p>There are two types of hypervisors:</p>
<p><a href="https://tuantuluong.files.wordpress.com/2014/08/type-1-hypervisor.png"><img class="size-medium wp-image-67 aligncenter" src="{{ site.baseurl }}/pictures/type-1-hypervisor.png?w=300" alt="Type-1-Hypervisor" width="300" height="195" /></a></p>
<p style="text-align:center;">Picture 2. Bare metal type of hypervisor (Source: Flexiant.com)</p>
<p>Type 1 (Pic 2) is so called bare-metal. In this type, the hypervisor runs directly on the host system without any Host OS. It means, it is installed on top of a clean architecture  system. This type is also categorized into 2 sub-type: micro-kernelized hypervisor and monolithic hypervisor. A micro-kernelized hypervisor is a very thin hypervisor when an absolute minimum of software in the hypervisor. Drivers, memory management etc. needed for the Virtual Machines are installed in the parent partition. A monolithic hypervisor is a hypervisor that contains more software and management interfaces. Network drivers and disk drivers for example are part of the hypervisor and not of the parent partition. And you know, Microsoft uses a micro-kernelized hypervisor (Hyper-V) where VMware uses a monolithic hypervisor (ESX).</p>
<p><a href="https://vietstack.files.wordpress.com/2014/10/730-hyperv7.jpg"><img class="size-medium wp-image-349 aligncenter" src="{{ site.baseurl }}/pictures/730-hyperv7.jpg?w=300" alt="730-HyperV7" width="300" height="149" /></a></p>
<p style="text-align:center;">Picture 2.1: Monolithic and Microkernelized Hypervisor. (Source: simple-talk.com)</p>
<p>Type 2 (Pic 3) is hosted architecture. That means hypervisor runs on top of a host OS that runs on a hardware system.</p>
<p><a href="https://tuantuluong.files.wordpress.com/2014/08/type-2-hypervisor.png"><img class="size-medium wp-image-68 aligncenter" src="{{ site.baseurl }}/pictures/type-2-hypervisor.png?w=300" alt="Type-2-Hypervisor" width="300" height="155" /></a></p>
<p style="text-align:center;">Picture 3. Hosted type of hypervisor (Source: Flexiant.com)</p>
<p><strong>3. Types of virtualization.</strong></p>
<p>There are so many elements of the computer system that can be virtualized such as CPU, network, storage devices, computer environments, etc. Among them, there are two main virtualization methods that will be dealt below. They are CPU virtualization and network virtualization.</p>
<ul>
<li><strong><em> CPU Virtualization</em></strong></li>
</ul>
<p><a href="https://tuantuluong.files.wordpress.com/2014/08/privileged_architecture_virtualization.png"><img class="size-medium wp-image-72 aligncenter" src="{{ site.baseurl }}/pictures/privileged_architecture_virtualization.png?w=300" alt="privileged_architecture_virtualization" width="300" height="201" /></a></p>
<p style="text-align:center;">Picture 4. x86 Privileged Architecture (Source: cubrid.org)</p>
<p>CPU in a hardware is only one set but in virtualization when virtual machines also need their own CPU, that means CPU needs to be virtualized. As showed in Picture 4, a x86 architecture is divided in to 4 ring in the manner of privilege. The privilege decreases from top (ring 3) where the user application run to the bottom (ring 0) where the OS runs. In the x86 architecture CPU virtualization, the hypervisor runs on the ring 0 to create and manage virtual machines. Meanwhile, the CPU commands called by OS of virtual machines are sent to hypervisor then it  converts and delivers them to CPU, gets the result and sends back to virtual machines.</p>
<p>This method is also applied for virtual machines. Each virtual machine also requires an own OS and each OS needs the ring 0 authority. But the virtual machine OS can not take the ring 0 directly, so it obtains in other complex methods. These method make the complexity of x86 architecture occurs. The key problem is how the privileged commands requested by guest OS are executed ( on which ring and by whom). To answer this question, CPU virtualization is divided into several methods such as full virtualization and paravirtualization.</p>
<p><em>Full virtualization</em></p>
<p>In Pic 5, as we can see, hypervisor takes privilege of ring 0 meanwhile virtual machine OS runs on ring 1. In the full virtualization, the kernel code of guest OS is converted to kernel code of the host through the binary translation process executed by hypervisor (in Pic.5 is I/O call). The guest OS is fully abstracted from underlying hardware by the hypervisor and it is not aware to be virtualized therefore many types of guest machine ( Window, Linux, etc.) can run on top of hypervisor without modifications but their speed is quite low because of binary translation. . The full virtualization is the only option that requires no hardware assist or operating system assist to virtualize sensitive and privileged instructions.</p>
<p><a href="https://tuantuluong.files.wordpress.com/2014/08/full_virtualization.png"><img class="size-medium wp-image-73 aligncenter" src="{{ site.baseurl }}/pictures/full_virtualization.png?w=300" alt="full_virtualization" width="300" height="174" /></a></p>
<p style="text-align:center;">Picture 5. Full Virtualization (Source: cubrid.org)</p>
<p><em>Paravirtualization</em></p>
<p><a href="https://tuantuluong.files.wordpress.com/2014/08/xen_para_virtualization.png"><img class="size-medium wp-image-75 aligncenter" src="{{ site.baseurl }}/pictures/xen_para_virtualization.png?w=300" alt="xen_para_virtualization" width="300" height="231" /></a></p>
<p style="text-align:center;">Picture 5. Paravirtualization in Xen (Source: cubrid.com)</p>
<p>"Para-" is an English affix which has origin of Greek that means "beside", "along". Paravirtualization refers to the connection between guest OS and hypervisor. The privilege commands of guest machine are delivered to hypervisor by hypercall. Then hypervisor send these hypercalls to hardware and takes back the result. The OS kernel must be modified that the virtual machine OS can use the hypercalls so that paravirtualization does not support the unmodified systems (e.g. Windows 2000/XP). But paravirtualization has an advantage in compared to fullvirtualization that is the privileged commands of guest OS can directly access to hardware, not through a binary translation. That makes paravirtualization method is relatively faster than fullvirtualization.</p>
<p><em>Container-based Virtualization</em></p>
<p><img class="aligncenter" src="{{ site.baseurl }}/pictures/container_based_virtualization.png" alt="" width="500" height="265" /></p>
<p style="text-align:center;">Picture 6. Container-based virtualization (Source: cubrid.com)</p>
<p style="text-align:left;">Container-based virtualization, also called operating system virtualization, is an approach to virtualization in which the virtualization layer runs as an application within the operating system. In this approach, the operating system's kernel runs on the hardware node with several isolated guest virtual machines installed on top of it. The isolated guests are called containers.</p>
<p style="text-align:left;">There are pros and cons for each type of virtualized system. If you want full isolation with guaranteed resources, a full VM is the way to go. If you just want to isolate processes from each other and want to run a ton of them on a reasonably sized host, then container-based VM might be the way to go.</p>
<p><em>Hardware assisted virtualization</em></p>
<p>The hardware vendors are rapidly integrate the new features of computer to simplify the virtualization techniques. The first generations of this type are included in Intel Virtualization Technology (VT-x) and AMD-V processors  of AMD. The new feature is targeting privileged instructions with a new mode of CPU execution that allows hypervisor laying under ring 0 and guest OS is on ring 0. As shown in Pic.6, the requests of quest OS is trapped directly to hypervisor without any binary translation or paravirtualization. This new feature currently has become available on computer systems that are manufactured from 2006.</p>
<p><a href="https://tuantuluong.files.wordpress.com/2014/08/hardware_virtualization.png"><img class="size-medium wp-image-77 aligncenter" src="{{ site.baseurl }}/pictures/hardware_virtualization.png?w=300" alt="hardware_virtualization" width="300" height="205" /></a></p>
<p style="text-align:center;">Picture 7. Hardware assisted virtualization (Source: http://forums.techarena.in/)</p>
<ul>
<li><em><strong>Network virtualization.</strong></em></li>
</ul>
<p>It is well known today that Layer-2 (L2) network has a significant scalability issues. This Ethernet-based network is used in small or medium scale network and it is applied for most modern enterprise data centers while most Internet Service Providers or large cloud services provider use Layer-3 network(L3).</p>
<p>There are numbers of techniques and technologies attempt to solve the scalability, security issues of L2 network such as VLAN, RBridges or SEATTLE but all of them do not still stuck with traditional issues of L2-based network and do not fit the requirements. An emerging solution called network virtualization offers a promise for this problem. This method is the combination of methods and methodologies of L2 and L3 structure that L3 is used for cloud provider and L2 is in the side of consumer.</p>
<p><a href="https://tuantuluong.files.wordpress.com/2014/09/network-virtualization.jpg"><img class="size-medium wp-image-82 aligncenter" src="{{ site.baseurl }}/pictures/network-virtualization.jpg?w=273" alt="Network Virtualization" width="273" height="300" /></a></p>
<p style="text-align:center;">Picture 8. Network Virtualization</p>
<p>Pic.7 is the diagram of network virtualization. It is built with an abstraction layer inserted between L2 network(s) and L3 provider network, provide a separation layer. The L3 provider can efficiently operate L3 topology and methodology while in the viewpoint of consumer, L2 networks are provided. Any consumer with a new application which is designed in cloud can choose L3 network topology to gain the scalability in comparison with former L2 topology. In this regard, L2 means "switching" and L3 means "routing". The reason to use L3 instead of L2 in data centers is improving the scalability.  The following picture will sample a diagram of network virtualization.</p>
<p><a href="https://vietstack.files.wordpress.com/2014/10/l2ol3.png"><img class="aligncenter size-large wp-image-344" src="{{ site.baseurl }}/pictures/l2ol3.png?w=630" alt="l2ol3" width="630" height="285" /></a></p>
<p style="text-align:center;">Picture 9. L2 over L3 diagram (Source: prontosystems.wordpress.com)</p>
<p>L3(router) has proved its ability in scalability meanwhile L2(switch) is only the desire network layer for VM but not scalable. That is the reason of using l3 scheme for data center network that considers scalability is an undispensible factor. As showed in Pic 8, there is a virtualized L2 on the  top of L3. Two virtual switch (vSW) build the virtualized L2 by technique of GRE tunnel to faciliate the flexibity of VMs.</p>
