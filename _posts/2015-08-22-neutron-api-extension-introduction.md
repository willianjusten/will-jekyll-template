---
layout: post
title: Neutron API Extension Introduction
date: 2015-08-22 08:45:48.000000000 +07:00
type: post
published: true
status: publish
categories: []
tags: []
meta:
  _wpcom_is_markdown: '1'
  _edit_last: '61498925'
  geo_public: '0'
  _publicize_job_id: '13975853812'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p><strong>Overview:</strong></p>
<p>All of the requests coming from neutron-client of dashboard will be tranfered to neutron-server using REST API. Those requests are passed to a URL defined in neutron-server. Neutron-server will read that URL, revoke the correspoding methods in plugin then map the corresponding actions like (show, list, delete, etc.) based on methods (POST, GET, DELTE, etc.) defined in URL.</p>
<p>If you have your own plugin and you want neutron-server read URL (e.g. /myextension) with your own plugin, all that you have to do is writing the new plugin inside the plugins folder of neutron. Neutron allows the third party vendors to customize their own methods specific to their plugins with the help of API extensions.</p>
<p>This example will introduce to you the basic steps about writing an API extension.</p>
<ul>
<li> In the folder plugins, i create a "myplugin" tree as below:</li>
</ul>
<p><a href="https://vietstack.files.wordpress.com/2015/08/screenshot-from-2015-08-22-101943.png"><img class=" wp-image-567 alignleft" src="{{ site.baseurl }}/assets/screenshot-from-2015-08-22-101943.png" alt="Screenshot from 2015-08-22 10:19:43" width="510" height="252" /></a></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<ul>
<li>In myextension.py, we need to define two things: a RESOURCE_ATTRIBUTE_MAP dictionary and a class called Myextension called. RESOURCE_ATTRIBUTE_MAP what we put inside this new extended attributes, myextension.py seems like below:</li>
</ul>
<blockquote><p><a href="https://vietstack.files.wordpress.com/2015/08/screenshot-from-2015-08-22-103515.png"><img class="aligncenter wp-image-569" src="{{ site.baseurl }}/assets/screenshot-from-2015-08-22-103515.png" alt="Screenshot from 2015-08-22 10:35:15" width="1000" height="1084" /></a></p></blockquote>
<p>&nbsp;</p>
<ul>
<li>After create the myextension file, we need to tell Neutron the path of extension file. In /etc/neutron/neutron.conf, inside the section DEFAULT:</li>
</ul>
<p><span style="color:#ff0000;">api_extensions_path = /usr/lib/python2.7/dist-packages/neutron/plugins/myplugin/extensions</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<ul>
<li>Create database for extensions</li>
</ul>
<p><em>          models.py: Defines how those properties in database</em></p>
<p>&nbsp;</p>
<blockquote><p><span style="color:#ff0000;"><span style="font-size:medium;">import sqlalchemy as sa</span></span></p>
<p><span style="color:#ff0000;"><span style="font-size:medium;">from neutron.db import model_base</span></span></p>
<p><span style="color:#ff0000;"><span style="font-size:medium;">class MyExtension(model_base.BASEV2):</span></span></p>
<p><span style="color:#ff0000;"> <span style="font-size:medium;">'''</span></span></p>
<p><span style="color:#ff0000;"> <span style="font-size:medium;">A simple table to store the myextension properties </span></span></p>
<p><span style="color:#ff0000;"> <span style="font-size:medium;">'''</span></span></p>
<p><span style="color:#ff0000;"><span style="font-size:medium;">     __tablename__ = 'myextension'</span></span></p>
<p><span style="color:#ff0000;"><span style="font-size:medium;">    name = sa.Column(sa.String(255),</span></span></p>
<p><span style="color:#ff0000;"><span style="font-size:medium;">    primary_key=True, nullable=False)</span></span></p>
<p><span style="color:#ff0000;"><span style="font-size:medium;">    id = sa.Column(sa.Integer)</span></span></p>
<p>&nbsp;</p></blockquote>
<p><em>            db.py: Provides a number of methods to read, write properties of database such as READ, WRITE, UPDATE, GET, etc. Each method will be executed through the database session. The database session will be provided by neutron api request context.</em></p>
<p>&nbsp;</p>
<blockquote><p>&nbsp;</p>
<p><u>For example:</u></p>
<p><span style="color:#ff0000;">def add_something(db_session, arg1*, arg2*):</span></p>
<p><span style="color:#ff0000;">            with db_session.begin (subtransactions=True):</span></p>
<p><span style="color:#ff0000;">                      do_something</span></p>
<p><span style="color:#ff0000;">                         ...</span></p>
<p><u>A simple sample of plugin.py can be written like below:</u></p>
<p><span style="color:#ff0000;">from neutron.db import db_base_plugin_v2</span></p>
<p><span style="color:#ff0000;">class MyPlugin(db_base_plugin_v2.NeutronDbPluginV2):</span></p>
<p><span style="color:#ff0000;"> # We need to define a data member to tell Neutron Server about our plugin.</span></p>
<p><span style="color:#ff0000;"> # Name of alias should be the same with get_alias() in myextension.py</span></p>
<p><span style="color:#ff0000;">      _supported_extension_aliases = ['Test-Ex']</span></p>
<p><span style="color:#ff0000;">      def __init__(self):</span></p>
<p><span style="color:#ff0000;">          pass</span></p>
<p><span style="color:#ff0000;">     def create_myextension(self, context, myextension):</span></p>
<p><span style="color:#ff0000;">          return myextension</span></p>
<p><span style="color:#ff0000;">     def update_myextension(self, context, id, myextension):</span></p>
<p><span style="color:#ff0000;">          return myextension</span></p>
<p><span style="color:#ff0000;">     def get_myextension(self, context, id):</span></p>
<p><span style="color:#ff0000;">          myextension = {}</span></p>
<p><span style="color:#ff0000;">          return myextension</span></p>
<p><span style="color:#ff0000;">     def delete_myextension(self, context, id):</span></p>
<p><span style="color:#ff0000;">          return id</span></p>
<p>Restart neutron server by running “service neutron-server restart”, check “/var/log/neutron/server.log” we will see the “Test-Ex” loaded “Loaded extension: Test-Ex”.</p>
<p>&nbsp;</p></blockquote>
<p>Reference: http://control-that-vm.blogspot.hu/2014/05/writing-api-extensions-in-neutron.html</p>
<p>&nbsp;</p>
<p>22/08/2015</p>
<p>VietStack Team</p>
