---
layout: post
title: "[How-To] Remote debugging OpenStack Neutron"
date: 2016-04-12 01:17:33.000000000 +07:00
type: post
published: true
status: publish
categories:
- Devstack
- OpenStack
- Python
- Tech
- News
tags:
- devstack
- github
- vietstack
- DevOps
- Neutron
meta:
  _wpcom_is_markdown: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '21694791561'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>Following is the contributed tutorial from @namnh, a member of our Vietnam OpenStack Community. Please ping us if you have any questions.</p>
<p>This tutorial was created based on the last video tutorial "How to setup remote debugging with OpenStack Nova". Please see this video for more details:</p>
<p>https://www.youtube.com/watch?v=Z0PmKyeZjjA</p>
<p>And here is the tutorial for neutron:</p>
<blockquote><p>In this archive, I will guide configuration to debug Neutron project by Pycharm-Pro5. And configuration with other projects are similar to Neutron project.</p>
<p><strong>Step 1: Setup environment</strong></p>
<p>We need two machines and topology as below:</p>
<p><img class="alignnone  wp-image-735" src="{{ site.baseurl }}/pictures/untitled.png" alt="Untitled" width="469" height="273" /></p>
<p>- Machine 1 (called "Pycharm-Pro5"): Installing Pycharm-Pro5.</p>
<p>- Machine 2 (called "VM"): Installing Openstack-AIO by Devstack.</p>
<p><em><strong>Note:</strong></em></p>
<p>- We will use Devstack to install Openstack-AIO. This is [local.conf](https://github.com/NguyenHoaiNam/Debuging_Openstack_with_Pycharm-Pro5/blob/master/local.conf) file.</p>
<p><strong>Step 2: Configuration Pycharm on Pycharm-Pro5</strong></p>
<p><strong>Step 2.1: Setup Deverlopment by clicking Tools --&gt; Deployment --&gt; Configuration then click "+" to create a "Devstack".</strong></p>
<p><img class="alignnone  wp-image-736" src="{{ site.baseurl }}/pictures/untitled1.png?w=300" alt="Untitled" width="604" height="516" /></p>
<p>(1): Type of connect to VM. We will choose SFTP.</p>
<p>(2): The address of VM.</p>
<p>(3): The account of VM.</p>
<p>(4): The password of VM.</p>
<p><em><strong>Note</strong></em>: In this step, we should check to connect to VM by choice "Test SFTP connection..."</p>
<p>Then we jump "Mappings" tab. To configure mapping between Pycharm-Pro5 and VM is like image:</p>
<p><img class="alignnone  wp-image-737" src="{{ site.baseurl }}/pictures/untitled2.png" alt="Untitled" width="586" height="500" /></p>
<p>(5): This is local path on Pycharm-Pro5.</p>
<p>(6): This is path on VM.</p>
<p>Click OK.</p>
<p><strong>Step 2.2: Setup project by clicking File --&gt; Settings then choose "Project: neutron" (in this case, I am setting debug with neutron project, with other projects are similar.)</strong></p>
<p>Choice "Project Interpreter" to add an interpreter remote by choice "Add remote":</p>
<p><img class="alignnone  wp-image-747" src="{{ site.baseurl }}/pictures/687474703a2f2f692e696d6775722e636f6d2f6a7864374e54382e706e67.png" alt="687474703a2f2f692e696d6775722e636f6d2f6a7864374e54382e706e67" width="585" height="372" /></p>
<p>After choice "Add remote", we have image:</p>
<p><img class="alignnone  wp-image-738" src="{{ site.baseurl }}/pictures/untitled3.png" alt="Untitled" width="519" height="319" /></p>
<p>Change to "Deployment configuration" then click "ssh://stack@10.10.10.30:22" to connect to VM. In this time, we will receive message "Successfully ...."</p>
<p><img class="alignnone  wp-image-739" src="{{ site.baseurl }}/pictures/untitled4.png" alt="Untitled" width="522" height="321" /></p>
<p>We need to wait for a few time so that Pycharm download packet from VM.</p>
<p><strong>Step 2.3: Configuration Python Debugger. In "Settings", we choose "Build, Execution, Deployment" --&gt; "Python Debugger" then select "Gevent compatible"</strong></p>
<p><img class="alignnone  wp-image-740" src="{{ site.baseurl }}/pictures/untitled5.png" alt="Untitled" width="544" height="394" /></p>
<p>After done, we click OK.</p>
<p><strong>Step 3: Configuration debug with Neutron prject</strong></p>
<p>In this step, I will configure debug with neutron-server. With other component or other project, they are similar.</p>
<p><strong>Step 3.1: Create tab debug by clicking Run --&gt; Edit Configurations then create a neutron-server debug like that:</strong></p>
<p><img class="alignnone  wp-image-741" src="{{ site.baseurl }}/pictures/untitled6.png" alt="Untitled" width="565" height="368" /></p>
<p><strong>Step 3.2: Configuration API-worker on VM</strong></p>
<p>Because Pycharm-Pro5 debug only one process so we have to configure on VM so that neutron-server run only one process.</p>
<p>Edit configure file /etc/neutron/neutron.conf. At first line we change api_workers = -1 (note that in nova api configuration, the config for only one process api worker is osapi_worker = 1. The nova API daemon does not accept negative value).</p>
<p><strong>Step 3.3: After changing configuration file, turn off neutron-server process on VM. (Hint: you can use rejoin-stack to do that).</strong></p>
<p><strong>Step 4: Start debugging</strong></p>
<p>After finishing all steps. We can start debug by click "debug" button. Have fun !!!</p>
<p>Optional: If you want to locally debugging your openstack neutron, please apply monkey patch for eventlet for collecting debug information from openstack process. In neutron, edit file __init__.py in neutron/common/eventlet_utils.py and modify line 32 from:</p>
<pre>eventlet.monkey_patch()</pre>
<p>to:</p>
<pre>eventlet.monkey_patch(os=False, thread=False)</pre>
<p>&nbsp;</p>
<p>Happy debugging !</p></blockquote>
<p><a href="https://github.com/vietstacker/Debuging_Openstack_with_Pycharm-Pro5" target="_blank">Click here to view this tutorial source on GitHub</a></p>
<p>04/2016</p>
<p>VietStack team.</p>
