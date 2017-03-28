---
layout: post
title: OpenStack-Mistral - Black magic in workflow and action
date: 2016-12-04 00:58
tags:
- Mistral
categories:
- Tech
---
In Mistral, we have keywords that should be taken care of such as action, workflow, yaql. In fact, we can easily create customized actions, workflows to execute processes we want and use yaql language to filter, process or access to some data. We also have documentation to describe it as below:

<ul>
    <li> YAQL: https://wiki.openstack.org/wiki/Mistral/UsingYAQL </li>
    <li> ACTION PLUGIN: http://docs.openstack.org/developer/mistral/developer/creating_custom_action.html</li>
</ul>

In this blog, what we can go through is nothing else just getting familiar with customizing/developing your own actions, workflows to fulfill the purpose of your requirements. In the source code of mistral, there is a base class that define action which is mistral/actions/base.py. If we want to write a new action plugin, based on the documentation of mistral, we should subclass it. However, this class is nothing else just a class that built on top of metaclass and it defines some abstract methods such as “run”, “test” that should be re-define in a action plugin, therefore we can rewrite another base class for action if we would like to have.  Note that, the action will be triggered to run through the executor. Check the file of mistral/engine/default_executor.py to see the action.run() triggered.

The environment for this test bed is ubuntu 14.04 and devstack newton. So let’s moving on.

Based on the instruction of writing custom action in mistral, we have to subclass the Action() class which is a base of every action in mistral. This custom class example uses the action base of mistral:

```sh
from mistral.actions import base
class CustomClass(base.Action):
    def __init__(self):
        pass

	# Here we have to re-define the run() method which is the abstract method in the action base
    def run():
        pass
	# Here we have to re-define the test() method which is the abstract method in the action base
    def test():
	pass
```sh

Besides, if we would like we can re-write an action base to be not dependent on that base of Mistral. The below is such an example:

```sh
from abc import ABCMeta, abstractmethod
from six import add_metaclass
 
@add_metaclass(ABCMeta)
class VietStackAction():
    def __init__(self):
        #self.logger = getLogger(__name__)
        pass
 
    def run(self):
        return self._run()
 
 
    """
    - Class VietStackAction could not be initiated if all the abstracmethod is not overridden.
    - This overridden can be done through the super method.
    """
    @abstractmethod
    def _run(self):
        pass
```

I created a folder call ‘openstack_access’ to put the method get_client() into which is the way to connect to Nova client. The below is get_client()

For the action, we can create something very basic as below. Here I do not want to depend on the base class of mistral (actually, we have to depend on the run() and test() methods if we use mistral action base), therefore I use my own action base class as VietStackAction() and create other actions Action1 and Action2 as below:

```sh
from openstack_access import get_client
 
class Action1(VietStackAction):
    def __init__(self):
        super(Action1, self).__init__()
        self.name = ""
        self.unit = {}
 
    def add_str1(self):
        self.name += "Viet "
        self.unit["Location"] = "Vietnam"
        return self
 
    def add_str2(self):
        self.name += "Stack"
        self.unit["Organization"] = "Vietnam OpenStack Community"
        return self
 
    def _run(self):
        return self.name, self.unit
 
 
 
class Action2(VietStackAction):
    def __init__(self):
        super(Action2, self).__init__()
        self._nova = get_client()
 
    def _get_vms_id(self, host, status_active):
        opts = {'all_tenants': 1}
        if host is not None:
            opts['host'] = host
 
        if status_active:
            opts['status'] = 'ACTIVE'
 
        vms = self._nova.servers.list(detailed=True,
                                     search_opts=opts)
        sorted_vms = sorted(vms, key=lambda vm: getattr(vm, 'created'))
        return [vm.id for vm in sorted_vms]
 
    def get_vms_id(self, host=None, status_active=False):
        return self._get_vms_id(host, status_active)
 
    def _run(self):
        host = "vagrant-ubuntu-trusty-64.localdomain"
        status_active = "ACTIVE"
        return self.get_vms_id(host=host, status_active)
```

And now, we can write our own workflow which is actually a yaml file. After finishing our own workflow, put it into the mistral/resources/workflows and re-run mistral db-manage (check it on Internet) to store its information in to db. (db-manage is also needed after finishing the action). The below is a simple example of workflow. Note that in the workflow (especially in inputs of actions) we can use yaql to filter or access to the value of inputs.

```sh
--
version: '2.0'
 
vietstack_main_action:
  input:
    - name
    - unit
 
  tasks:
    task1:
      action: vietstack.vietstack_action1
      input:
        name: <% $.name %>
        unit: <% $.unit %>
 
      on-success:
        - task2
 
    task2:
      action: vietstack.vietstack_action2
```

Problem: When we try to write custom workflow, we would like to have something so called validator that validate the jsonschema of inputs of each workflow. Inside the architect of mistral, there is nothing to validate for inputs of each action. This problem is also given out to discuss in the mistral community.

Have fun!!!!!!

3/12/2016

VietStack team
