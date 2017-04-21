---
layout: post
title: Creating library in Ansible
date: 2015-07-15 15:07:33.000000000 +07:00
type: post
published: true
status: publish
categories:
- Chia sẻ kinh nghiệm
- Hướng dẫn - Kinh Nghiệm
- Tech
tags:
- Ansible
meta:
  _edit_last: '61498925'
  geo_public: '0'
  _wpcom_is_markdown: '1'
  _publicize_job_id: '12755428197'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>Ansible is emerging as a formidable rival to puppet by its simplicity and flexibility. According to official ansible website (ansible.com), it is designed as an order-based, fail-fast system that includes testing. While puppet is an example of pull-based configuration tool, ansible is a kind of push-based tool.</p>
<p>In puppet utilizing, we need agents running nodes where they will be the “hub” to transfer the requests from nodes to the puppet server. The operation process of puppet is executed periodically (says 5-15 mins), nodes will contact to puppet agents and request the latest update of configs, etc. and if it goes wrong, nodes will come back to agents in the next periodic time. From this view-point, puppet is a good solution for the large deployment and system. However, puppet modules depend each other and they show the complexity in order to execute the modules in the right way.</p>
<p>Ansible is push-based tool, pushed the latest version of configs, set of instructions to the nodes in the networks. Ansible still has some issues of scaling or constrained by the network size (e.g if the number of nodes is huge in the network, Ansible tends to be a bottleneck) but it also shows some remarkable advantages of ansible to compare with puppet. It does not have dependency among modules, compatibly integrates to cloud (e.g Ansible's Boto for Amazon AWS), able to group the nodes based on policies and dependencies, etc.</p>
<p>The architecture of ansible, instructions of writing ansible script are not mentioned here. I am going to issue the problem about defining the library in ansible that is not so much written in official website of ansible. In ansible structure, we can easily see that there is a folder called “/library” besides the “/roles”, “/inventory”, etc. What is the main task of “/library”? The library folder will contain the files written in python, bash, ruby, php, etc. that are the modules in the ansible yaml file. For example, you can easily call a module “apt” supported by ansible like this:</p>
<blockquote>
<p style="text-align:left;">- name: Update the node</p>
<p style="text-align:left;">   apt: update_cache=yes</p>
</blockquote>
<p>&nbsp;</p>
<p>It is equivalent of “apt-get update”. But what if we want to issue a module that is not recently supported by ansible, let's say “install_nova_compute”. What we need to do is write a python script named "install_nova_compute.py" and put it in the library folder.</p>
<p>I am going to show you an example of new module called “userinfo.py”. This module will check the existence of a user in node and create that user if the its state is 'absent'. Sorry for my bad wordpress skill of posting python code. It seems easier to me by taking a screenshot:). Notify that this example is only for demonstration of using module, not for production.</p>
<p>&nbsp;</p>
<p><a href="https://vietstack.files.wordpress.com/2015/07/screenshot-from-2015-07-15-164903.png"><img class="aligncenter size-full wp-image-531" src="{{ site.baseurl }}/pictures/screenshot-from-2015-07-15-164903.png" alt="Screenshot from 2015-07-15 16:49:03" width="630" height="295" /></a></p>
<pre>
So, what i have done in this small experiment is below:

- Booting a VM using vagrant (I love this superior tool for lab :) )
- Install ansible 1.9
- Create a playbook with ansible.cfg, test.yml, hosts and /library/userinfo.py.
- Run the command: $ ansible-playbook test.yml
- Get a coffee and see the result, tada :d.

The contents of above files are below, very simple:

1. ansible.cfg:


[defaults]

# Location of inventory files
hostfile = hosts

2. test.yml:


---

- hosts: 127.0.0.1
  connection: local
  tasks:

     - name: Check User info
       userinfo: username={{item}} state='existed'
       with_items:
         - mariaOza
         - vagrant

     - name: Check user and create if not existed before
       userinfo: username=vietstack state='absent'

3. hosts:

127.0.0.1 ansible_connection=local

ansible_python_interpreter=/usr/bin/python2



15/7/2015
VietStack team

</pre>
