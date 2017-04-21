---
layout: post
title: 'Kolla-Kubernetes: A good buddy pair in deploying OpenStack'
date: 2016-06-23 18:05:57.000000000 +07:00
type: post
published: true
status: publish
categories:
- Tech
tags:
- Kolla
- K8S
meta:
  _wpcom_is_markdown: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '24123166084'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>Recently, we can easily see how active Kolla and Kubernetes are in the era of Docker container. There are so many hypes, definitions, abstractions, etc. about Kolla and Kubernetes and you can easily get the information of them by some mouse clicks on Google. However, there is still no any proofs for the cooperation between them in the story of OpenStack deployment, especially in scaling/upgrade/downgrade OpenStack.</p>
<p>Imagine that with Kolla, we can easily deploy OpenStack with the help of Ansible and all the OpenStack services are run in Docker containers. However, Kolla has a drawback of scaling. It is not comfortable for Kolla to scale OpenStack services, each time we have to run again Ansible plays. In contrast, Kubernetes (K8s) has a quite friendly CLI for docker containers management. It has support of multiple operations for containers and containers can be managed in the cluster model of K8s. I will not going deeply into these two projects, you can search on Internet about them, there are so many docs, instructions.</p>
<p>Let's have a look to their cooperation. See the below picture:</p>
<p><img class="alignnone size-full wp-image-787" src="{{ site.baseurl }}/pictures/kube.png" alt="kube" width="916" height="477" /></p>
<p style="text-align:center;">(Source: http://devopsbox.es/)</p>
<p style="text-align:left;">As you can see here, we have a Docker registry where we store and distribute Docker images. The K8s cluster will be dockerized and its image is also stored in the registry. The dockerized K8s cluster can be on virtual machine using vagrant, vmware, etc. and the source code of K8s is cloned from github.</p>
<p style="text-align:left;">The question is, what is the role of Kolla in this model? It is nothing else just provide docker images (stored in registry) of each OpenStack service and initialize config files of OpenStack services. Then K8s will take those OpenStack docker images, config files and deploy OpenStack services on top of K8s cluster.</p>
<p style="text-align:left;">Based on the above idea, i have made a test on my local machine. And bingo, we have all OpenStack services dockers running. I would like to give a big thank to Liyi Meng - my colleague who help me to fulfill it (hope you have time to read this line :D).</p>
<p style="text-align:left;"><img class="alignnone size-full wp-image-805" src="{{ site.baseurl }}/pictures/kolla_kube.png" alt="kolla_kube" width="1300" height="741" /></p>
<p style="text-align:left;">23/6/2016</p>
<p style="text-align:left;">VietStack</p>
<p>&nbsp;</p>
