---
layout: post
title: Getting start with oslo.config library
date: 2015-06-30 12:39:03.000000000 +07:00
type: post
published: true
status: publish
categories: []
tags: []
meta:
  _edit_last: '61498925'
  geo_public: '0'
  _publicize_job_id: '12181750241'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>Oslo is a set of python libraries and used in OpenStack as a common library. Oslo shows its importance as it provides a common library for developers in other services in OpenStack. Before Oslo implementation, the OpenStack projects share the source codes by copying from repositories. In this post, we are going to test the basic usage of oslo.config library – a library for parsing configuration from config file and command line.</p>
<p>I am going to test oslo.config in virtualenv in order to avoid the affects to my host OS (ubuntu 12.04). I install oslo.config and create 2 files – test.conf and test.py.</p>
<p style="padding-left:30px;">$ pip install oslo.config</p>
<p style="padding-left:30px;">$ touch test.conf</p>
<p style="padding-left:30px;">$ touch test.py</p>
<p>First, write some settings for test.conf:</p>
<p style="padding-left:30px;"><span style="color:#ff0000;">[test]</span></p>
<p style="padding-left:30px;"><span style="color:#ff0000;">enable = True</span></p>
<p style="padding-left:30px;"><span style="color:#ff0000;">usr_name = 'VietStack'</span></p>
<p style="padding-left:30px;"><span style="color:#ff0000;">hobby = ['Football', 'Guitar', 'OpenStack']</span></p>
<p style="padding-left:30px;"><span style="color:#ff0000;">friend = {'Maria': 6996, 'Jackie Chan': 60}</span></p>
<p style="padding-left:30px;"><span style="color:#ff0000;">age = 20</span></p>
<p>Let's take a look to the code of test.py:</p>
<p>&nbsp;</p>
{% highlight python %}
from oslo.config import cfg
opt_group = cfg.OptGroup(name='test',
                         title='An example of Test'
                         )
test_opts = [
 cfg.BoolOpt('enable',
              default=False,
             ),
 cfg.StrOpt('usr_name',
              default='No Name',
              help=('Name of user')),
 cfg.ListOpt('hobby',
              default=None,
              help=('List of hobby')),
 cfg.DictOpt('friend',
              default=None,
              help=('List of friends')),
 cfg.IntOpt('age',
             default=69,
             help=('Age'))
]
def parser(conf):
 CONF = cfg.CONF
 CONF.register_group(opt_group)
 CONF.register_opts(test_opts, opt_group)
 CONF(default_config_files=conf)
 return CONF
if __name__ == "__main__":
 CONF=parser(['test.conf'])
 print(CONF.test.enable)
 print(CONF.test.hobby)
 print(CONF.test.friend)
 print(CONF.test.age)
 print(CONF.test.usr_name)
{% endhighlight %}
<p>Meanings of terms used by oslo.config:</p>
<p style="padding-left:30px;">opt_group: Variable that holds the “test” group in test.conf</p>
<p style="padding-left:30px;">test_opts: Variable that holds the options in the “test” group in test.conf</p>
<p>Then, we register the group and group options:</p>
<p style="padding-left:30px;">CONF.register_group(opt_group)</p>
<p style="padding-left:30px;">CONF.register_opts(test_opts, opt_group)</p>
<p>Using the config file:</p>
<p style="padding-left:30px;">CONF(default_config_files=conf)</p>
<p style="padding-left:30px;">
<p><span style="color:#ff0000;">Runs the test.py then magic will happen!</span></p>
<p><strong>NOTE:</strong></p>
<p>1. In this example, I only provide the relative path “CONF=parser(['test.conf'])”. You should provide the absolute path of test.conf to ensure the stability of the file.</p>
<p>2. There are many types of options in oslo.config such as: MultiStrOpt, FloatOpt, etc.</p>
<p>&nbsp;</p>
<p>2015/06/30</p>
<p>VietStack Team</p>
