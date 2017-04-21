---
layout: post
title: OpenStack CEE Day (6-6-2016) Sumup
date: 2016-06-06 15:48:43.000000000 +07:00
type: post
published: true
status: publish
categories:
- News
tags:
- News
- CEE
meta:
  _wpcom_is_markdown: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '23568259865'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p class="western"><b>1. General:</b></p>
<p class="western">- One interesting use case from Austin meetup is SAP use case. They are trying to move their legacy app (HANA) on the top of OpenStack, using CloudFoundry as a PaaS solution.</p>
<p class="western">- Kubernetes has the biggest percentage in usage of docker container management tool.</p>
<p class="western">- The OpenStack acceptance is mostly in commercial and financial aspects. In fact, the usage of OpenStack has not too many use cases, especially in Europe. Except some use cases of moving legacy infrastructure onto OpenStack of Walmart, Netflix, etc. others still trust on public cloud solutions such as AWS, GoogleCloud.</p>
<p class="western">- The biggest OpenStack based public cloud vendor is Rackspace.</p>
<p class="western">- Motto: Collaborate or die.</p>
<p class="western"><b>2. Cloud Migraion aaS (Coriolis)</b></p>
<p class="western"><u>Overview:</u></p>
<p class="western">- The main goal is migrating VM (vm-centric), other infrastructure features such as volume, network, etc. will be implemeted in the future. In case thee migration fails, the vm is not deleted on the source.</p>
<p class="western">- The problem is vendor lock-in so that we need to migrate the work load to another cloud environment. Somehow this is the battle of openstack and vendor lock-in.</p>
<p class="western">- It migrates all the cloud workloads between cloud environments.</p>
<p class="western"><u>Features:</u></p>
<p class="western">- Architecture of Coriolis is microservice: fault-tolerant, scalable.</p>
<p class="western">- It is managed via keystone, it should be a bigtent of OpenStack.</p>
<p class="western">- Barbican is used for storing and accesing secrets.</p>
<p class="western">- In the real use cases, it has multiple workers that connect to the barbican. Each worker runs on each cloud environment.</p>
<p class="western">- It has 2 process, importing the vms from the source cloud and exporting it onto the destination cloud environment.</p>
<p class="western">- The first importing process, it is nothing else just preparing process for disk migration.</p>
<p class="western">- The second process of exporting includes multiple processes, one of them of removing the source OS-lockin dependencies.</p>
<p class="western">- It needs to store the vm disk on the worker so that it needs the enough cappacity for each worker to store the vm disk. Hence in this case, the numbers of worker increases is a good solution.</p>
<p class="western"><b>3. File shrare, manila</b></p>
<p class="western"><u>Overview:</u></p>
<p class="western">- Netapp is the founder of manila. Nowaday, it is an active OpenStack project.</p>
<p class="western">- Manila supports multiple protocols of file system (NFS, etc.)</p>
<p class="western">Why Manila: 65 % store is sold for the purpose of shared file system. There are so many apps that need file system storage.</p>
<p class="western">- It is simple to see that if we use cinder for storage, up to now each volume is only used for 1 vm (there is a spec for multiple use of volume in vanila OpenStack). If using share, it can be used among multiple Vms.</p>
<p class="western">- It has support of other actions like taking snapshots, backups, etc.</p>
<p class="western">- Manila has so many features such as replicas, sanpshot, backups, consistency group, etc. One of the most advanced features of manila is replication. It is useful to replicate manila shares from some zones to others. It is useful for DR.</p>
<p class="western">- Storage backends support for manila: NFS storage, Netapp, Hitachi, Ceph.</p>
<p class="western"><u>Usecases:</u></p>
<p class="western">- In Bigdata: Integrates with sahara. This is an usecase that has so many interests in the collaboration of OpenStack and Hadoop.</p>
<p class="western">- DbaaS : Integrates with trove.</p>
<p class="western">- Entrprise app: SAP Hana integrates with Manila. Cinder is used for volume booted vms. The shares are mounted on the compute nodes called Hana nodes. The vms access to the Hana features (Hana data, hana logs, etc.) – They are actually are shares of manila that provide the fuctionalitiies of Hana app.</p>
<p class="western">- Dutch Telecom for file shared system for the NFV telco cloud.</p>
<p class="western">- Cross-tenant sharing, hybrid cloud.</p>
<p class="western"><b>4. Kuryr</b></p>
<p class="western"><u>Overview:</u></p>
<p class="western">- It brings the neutron network to the Docker container.</p>
<p class="western">- The containere challenges:</p>
<p class="western">- Reeinventing the networking abstracton.</p>
<p class="western">- There is no the solution for tenant isolation for container networking.</p>
<p class="western">- No solution for networking infrastructure, it means no solution for all Vms, containers, baremetal running on the same infrastructure.</p>
<p class="western"><u>Main Features:</u></p>
<p class="western">- It integrets with different container orchestraion engines such as mesos, swarm, kubernetes.</p>
<p class="western">- It provides the contrainer networking by talking with neutron. It is actually an abstraction layer laying between and maps container networking to neutron.</p>
<p class="western">- It supports libnetwork that is a library supporting for creating, managing networking stacks for container.</p>
<p class="western">- It use VIF to bind the docker libnetwork remote network (actually container namespace) to the neutron port.</p>
<p class="western">- It supports baremetal deployments and nested container deployment.</p>
<p class="western"><u>K8s use case:</u></p>
<p class="western">- In kubernetes, there are master and worker nodes. Master nodes will talk with neutron through k8s API. And kuryr container cluster is running on the worker nodes under the cluster management of k8s.</p>
<p class="western">- What if we have a vms running on compute nodes and nested container deployment. Solution is MidoNet, DragonFlow, OVS. Those solutions are nothing else but abstraction solutions that supports for OpenStack networking infrastructure and container networking solution.</p>
<p class="western">- Enhances with heat template and magnum.</p>
<p class="western">
<p class="western">Budapest 6-6-2016,</p>
<p class="western">VietStack Team</p>
