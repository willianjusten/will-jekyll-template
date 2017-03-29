---
layout: post
title: The evolution of IO Virtualization and DPDK-OVS implementation in Linux
date: 2016-01-24 15:29:05.000000000 +07:00
type: post
published: true
status: publish
categories: []
tags: []
meta:
  _wpcom_is_markdown: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '19075165284'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p><span style="color:#000000;"><del></del><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><span lang="en-US">IO Virtualization can be carried on in three implementation layers: System call (from application to Guest OS), Driver call (interface between Guest OS and IO device drivers of Guest OS) and IO Operation (interface between IO device drivers of Guest OS and hypervisor of host (or VMM – Virtual Machine Monitor)). In case of IO virtualization at driver call layer, the IO device driver in Guest OS is modified and it is the base of paravirtualization. At this layer, an optimization method of IO virtualization is created, which is virtio. Initially, </span><span lang="en-US">the </span><span lang="en-US">virtio </span><span lang="en-US">backend </span><span lang="en-US">is implemented in userspace, then the abstraction of vhost appears, </span><span lang="en-US">it moves the virtio backend out and puts it into KVM. Finanlly, DPDK (Data Plane Development Kit) takes the vhost out of KVM and puts it into a separate userspace.</span></span></span></span></p>
<p><span style="color:#000000;"><strong>1. VIRTIO</strong></span></p>
<p class="western"><span style="font-family:Arial, sans-serif;color:#000000;"><span style="font-size:medium;">Virtio is an important element in paravirtualization support of kvm. </span></span></p>
<p class="western"><span style="color:#000000;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">By definition: </span></span><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Virtio is a virtualization standard for network and disk device drivers where just the guest's device driver "knows" it is running in a virtual environment, and cooperates with the hypervisor. This enables guests to get high performance network and disk operations, and gives most of the performance benefits of paravirtualization.</span></span><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">(Source: </span></span><span lang="zxx"><u><a style="color:#000000;" href="http://wiki.libvirt.org/page/Virtio"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">http://wiki.libvirt.org/page/Virtio</span></span></a></u></span><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">)</span></span></span></p>
<p class="western"><span style="color:#000000;"><img class="alignnone size-full wp-image-643" src="{{ site.baseurl }}/assets/virtio.jpg" alt="virtio" width="388" height="304" /></span></p>
<p class="western"><span style="color:#000000;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Picture 1. Virtio Implementation. (Source:</span></span><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><a style="color:#000000;" href="http://www.myexception.cn/operating-system/1241886.html">www.myexception.cn</a></span></span><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">)</span></span></span></p>
<p class="western"><span style="color:#000000;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">In picture [1], virtio implementation has two side of virtio drivers, guest OS side so called front-end driver and QEMU side which is back-end driver. Besides, the host implementation is laid in userspace (qemu) so that there is no need of driver in host, only the guest OS side awares of virtio driver (front-end driver). It may be the reason that in many graphs of virtio, we only see the virtio driver on the side of guest OS ?. </span></span><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">More information of virtio can be taken from this link: http://www.ibm.com/developerworks/library/l-virtio/</span></span></span></p>
<p class="western"><strong><span style="font-family:Arial, sans-serif;color:#000000;"><span style="font-size:medium;">2. Vhost</span></span></strong></p>
<p class="western"><span style="font-family:Arial, sans-serif;color:#000000;"><span style="font-size:medium;">In the initial structure of paravirtualization, virtio backend lays inside of qemu, but when vhost appears the virtio back-end now is inside kernel. The abstraction of virtio back-end inside kernel is vhost [picture 2].</span></span></p>
<p class="western"><span style="font-family:Arial, sans-serif;color:#000000;"><span style="font-size:medium;">Before vhost implementation (only kvm with/without virtio), both of data plane and control plane are done in qemu (user space). Any data transfer must go through qemu and qemu emulates I/O accesses back and forth to guest. In this case, virtio emulation code is implemented in qemu (user space). When vhost is born, it puts the virtio emulation code into kernel space. Vhost driver itself is not a self-container virtio device virtualization, it only relates to virtqueue (A part of memory space shared between qemu and guests to accelerate data access) . It means that user space still handles the control plane and kernel takes care of data plane.</span></span></p>
<p class="western"><img class="alignnone size-full wp-image-652" src="{{ site.baseurl }}/assets/vhost-architecture.png" alt="vhost-architecture" width="347" height="400" /></p>
<p class="western"><span style="font-family:Arial, sans-serif;color:#000000;"><span style="font-size:medium;">Picture 2. Vhost Implementation. (Source: http://blog.vmsplice.net/2011/09/qemu-internals-vhost-architecture.html)</span></span></p>
<p class="western"><span style="color:#000000;"><strong><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">3. DPDK + OVS</span></span></strong></span></p>
<p class="western"><span style="font-family:'Liberation Serif', serif;color:#000000;"><span style="font-size:medium;"><span style="font-family:Arial, sans-serif;">All the theory about DPDK, you can search in its official website (<a style="color:#000000;" href="http://dpdk.org/doc/guides/prog_guide/index.html">http://dpdk.org/doc/guides/prog_guide/index.html</a>). Here I only sum up some main points about DPDK+OVS implementation and its difference in the evolution of IO virtualization.</span></span></span></p>
<p class="western"><span style="font-family:Arial, sans-serif;color:#000000;"><span style="font-size:medium;">In legacy vhost implementation, vhost is tied to kvm. However, in the DPDK implementation, it takes out vhost from kvm and make it run in a separate userspace next to qemu, it means that, vhost does not depend on kvm any more.</span></span></p>
<p class="western"><span style="font-family:Arial, sans-serif;color:#000000;"><span style="font-size:medium;">In vhost implementation, there is a virtqueue shared between qemu and guest. In the DPDK+OVS implementation, there is another virtqueue shared between OVS datapath and guest. Note that, from the viewpoint of DPDK, OVS is an application running on top of it. So, in comparison to vhost implementation in KVM, DPDK takes the vhost abstraction (in fact, it implements a virtio-net device in user space called vhost or user space vhost) out of KVM and let it runs in a separate user space. </span></span></p>
<p class="western"><img class="alignnone size-full wp-image-702" src="{{ site.baseurl }}/assets/slide_9.jpg" alt="slide_9" width="1280" height="720" /></p>
<p class="western">Picture3. Vhostnet and DPDK Implementation (Source: Intel)</p>
<p class="western"><span style="color:#000000;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">In picture[3], it is clear about the difference of datapath between legacy vhost-net and DPDK implementation. In case of vhost-net (KVM+vhost), the datapath (usually called packet path for socket application) starts from user space of virtual machine, goes through kernel of virtual machine. Inside the kernel of virtual machine, data is stored in virtioqueues and is polled by vhost in KVM of host machine frequently. Then data is transferred to OVS datapath inside kernel of host machine and tied to physical device. In case of DPDK+OVS implementation, datapath from virtual machine is transferred to OVS datapath running in a separate user space next to qemu of host machine. Then DPDK transfers data to physical devices.</span></span></span></p>
<p class="western"><span style="font-family:Arial, sans-serif;color:#000000;"><span style="font-size:medium;">There are two methods of communicating between guest and host: IVSHMEM and Userspace vHost. More information about them is below: (Source: <a style="color:#000000;" href="https://github.com/01org/dpdk-ovs/blob/development/docs/00_Overview.md">https://github.com/01org/dpdk-ovs/blob/development/docs/00_Overview.md</a>)</span></span></p>
<blockquote>
<h4 class="western"><span style="color:#000000;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><b>IVSHMEM</b></span></span></span></h4>
<p class="western"><span style="color:#000000;"><strong><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><b>Suggested use case:</b></span></span></strong><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"> Virtual Appliance running Linux with an Intel® DPDK based application.</span></span></span></p>
<ul>
<li>
<p class="western"><span style="color:#000000;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Zero copy between guest and switch.</span></span></span></p>
</li>
<li>
<p class="western"><span style="color:#000000;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Option when applications are trusted and highest small packet throughput required.</span></span></span></p>
</li>
<li>
<p class="western"><span style="color:#000000;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Option when applications do not need the Linux network stack.</span></span></span></p>
</li>
<li>
<p class="western"><span style="color:#000000;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Opportunity to add VM to VM security through additional buffer allocation (via </span></span><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><code>memcpy</code></span></span><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">).</span></span></span><a style="color:#000000;" name="user-content-userspace-vhost"></a></p>
</li>
</ul>
<h4 class="western"><span style="color:#000000;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><b>Userspace vHost</b></span></span></span></h4>
<p class="western"><span style="color:#000000;"><strong><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"><b>Suggested use cases:</b></span></span></strong><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;"> Virtual Appliance running Linux with an Intel® DPDK based application, or a legacy VirtIO based application.</span></span></span></p>
<ul>
<li>
<p class="western"><span style="color:#000000;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Option when applications are not trusted and highest small packet throughput required.</span></span></span></p>
</li>
<li>
<p class="western"><span style="color:#000000;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Option when applications either do or do not need the Linux network stack.</span></span></span></p>
</li>
<li>
<p class="western"><span style="color:#000000;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Single memcpy between guest and switch provides security.</span></span></span></p>
</li>
<li>
<p class="western"><span style="color:#000000;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Single memcpy for guest to guest provides security.</span></span></span></p>
</li>
<li>
<p class="western"><span style="color:#000000;"><span style="font-family:Arial, sans-serif;"><span style="font-size:medium;">Option when using a modified QEMU version is not possible.</span></span></span></p>
</li>
</ul>
</blockquote>
<p class="western"><span style="font-family:Arial, sans-serif;color:#000000;"><span style="font-size:medium;">In Userspace vHost methods, there are two vhost implementations inside vhost library: vhost cuse and vhost user. More details can be seen in the below link: http://dpdk.org/doc/guides/prog_guide/vhost_lib.html</span></span></p>
<p class="western"><span style="color:#000000;">23/1/2016</span></p>
<p class="western"><span style="color:#000000;">VietStack</span></p>
