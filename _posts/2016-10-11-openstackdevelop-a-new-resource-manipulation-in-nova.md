---
layout: post
title: Develop a new resource manipulation in Nova
date: 2016-10-11 10:37
tags:
- OpenStack
- Nova
categories:
- Tech
---
<h2>Solution:</h2>

There are may ways to deal with a resource in OpenStack, e.g. disk, ram, etc. However, an easy way is providing the information of a new resource that does not need to modify the API is providing through extra_spec of flavor. In the scope of this blog, we will go with this solution and using a new resource called "VietStack".

We are going to use extra_spec of flavor to store information of VietStack and use this information to spawn instances.

Note that, all the codes below are samples created to demonstrate the behavior of Nova flow in dealing with a new resource. The real implementation is up to the resources and their behavior.

<h2>Overview of json schema validation flow</h2>

When we put it into extra_spec of flavor, we expect the json schema validation.
When novaclient sends REST API, the URL will be mapped to the “action” methods on the “controller” class by initiating the ApiRouter in nova/api/openstack/<strong>init</strong>/ApiRouter.
The “controller” here implies the .py files in nova/api/openstack/compute/.

For example the file nova/api/openstack/compute/servers.py and inside we can see the ServersController(). The “action” method means the methods of the ServersController, for instance, when we create a new virtual machine, the URL will be mapped to the method “create” inside ServersController().

Back to the story of ApiRouter when it is initiated (<strong>init</strong>() constructor), there is an WSGI app (it is class Resource() in wsgi.py) that will be triggered to read the routing information supplied by RoutesMiddleware then call the requested “action” method upon its “controller”. This WSGI app will deserialize the body to JSON and then this JSON-based body will be validated when the “action” of “controller” is executed.

Now, the json schema validation comes to play. The body that is deserialized into JSON above will be parsed into the “validation.schema” decorator when the action “create” of ServersController is executed. In this validation process, the body is checked and it raises errors if there are.

If we are going to use extra_spec of flavor to provide the information of VietStack, we should add the json schema validation for these information of VietStack in nova/api/openstack/compute/schemas/flavors_extraspecs.py in order to use v2.0
Overview of implementation in Nova code

We are going to take 'numa_topology' entry in Nova to be the reference of VietStack_request. Firstly, we should change the nova/objects folder in order to insert new information of VietStack_request, for example: In the objects/instance.py, we see the numa_topology field that is representative of numa_topology of instance. In the objects/compute_node.py, we also see the field of numa_topology. This value will be representative of numa_topology of compute_node.
In database, we need to change the model to insert “VietStack_request” entry.
In scheduling, the value of VietStack_request should be honored.
In resource_tracker, we also have to change the methods that have affect to VietStack_request. We will take entry of numa_topology for reference.

<h3>1. Change model in database</h3>

********nova/db/sqlalchemy/models.py *********

{% highlight python %}
class InstanceExtra(BASE, NovaBase, models.SoftDeleteMixin):
    __tablename__ = 'instance_extra'
    __table_args__ = (
        Index('instance_extra_idx', 'instance_uuid'),)
    id = Column(Integer, primary_key=True, autoincrement=True)
    instance_uuid = Column(String(36), ForeignKey('instances.uuid'),
                           nullable=False)
    numa_topology = orm.deferred(Column(Text))
    pci_requests = orm.deferred(Column(Text))
    flavor = orm.deferred(Column(Text))
    vcpu_model = orm.deferred(Column(Text))
    migration_context = orm.deferred(Column(Text))
    VietStack_request = orm.deferred(Column(Text))

In this table, I am going to create another column called “VietStack_request” that stores the information of VietStack_request in InstanceExtra table in nova database.


<h3>2. Changes in nova/objects</h3>

<strong>2.1 Creation of InstanceVietStackRequest</strong>
We are going to create a new object called “InstanceVietStackRequest” inside /nova/objects/instance_VietStack_request.py. NOTE that, this object is used for representing VietStack usage of instances, NOT host. See the object of “instance_numa_topology” for more details.


{% highlight python %}
@base.NovaObjectRegistry.register
class InstanceVietStackRequest(base.NovaObject):
    # Version 1.0: Initial version
    VERSION = '1.0'
 
    fields = {
        'field1': fields.IntegerField(),
        'field2': fields.ObjectField('Object_name, nullable=True)
        ….. 
 
    @classmethod
    def obj_from_primitive(cls, primitive, context=None):
        raise NotImplementedError
 
    @classmethod
    def obj_from_db_obj(cls, instance_uuid, db_obj):
        raise NotImplementedError
 
    @base.remotable
    def create(self):
        self._save()
    def _save(self):
        raise NotImplementedError    
 
    @classmethod
    def delete_by_instance_uuid(cls, context, instance_uuid):
        raise NotImplementedError
 
    @base.remotable_classmethod
    def get_by_instance_uuid(cls, context, instance_uuid):
        raise NotImplementedError
{% endhighlight %}

NOTE:
- The number of fields and the their values are dependent on the information provided in extra_spec of flavor.
- The other methods are optional based on the purpose of using the object. If a method is not remoteable (e.g. def obj_from_db_obj), it is not tied to the object versioning.
- The below structure is a sample of creating “InstanceVietStackRequest” object. In each of them, we need to provide other methods based on the purposes of each object as above.

{% highlight python %}
@base.NovaObjectRegistry.register
class InstanceVietStackRequest(base.NovaObject):
    """
    -'vnics': List of vnics including neutron_network and sriov_network
    """
    fields = {
        'vnics': fields.ListOfObjectsField('VietStackFlow')
    }
 
@base.NovaObjectRegistry.register
class VietStackFlow(base.NovaObject):
    """
    - Each of vnic has the VietStack of outbound and inbound
    """
    fields = {
    'outbound': fields.ListOfObjectsField('VietStackPerVnic')
    'inbound':fields.ListOfObjectsField('VietStackPerVnic')
 
    }
@base.NovaObjectRegistry.register
class VietStackPerVnic(base.NovaObject):
    """
    - Each inbound/outbound includes information of type, physical_network,etc.
    """
    fields = {
        'type': fields.StringField(nullable=True)
        'physical_network': fields.StringField(nullable=True)
        'rate': fields.IntegerField(default=0)
        'size': fields.IntegerField(default=0)
    }
{% endhighlight %}

<strong>2.2 Modification of RequestSpec</strong>
We also have to add a new field in request_spec that will point to this “InstanceVietStackRequest” as below sample:

{% highlight python %}
@base.NovaObjectRegistry.register
class RequestSpec(base.NovaObject):
    # Version 1.0: Initial version
    # Version 1.1: ImageMeta version 1.6
    # Version 1.2: SchedulerRetries version 1.1
    # Version 1.3: InstanceGroup version 1.10
    # Version 1.4: ImageMeta version 1.7
    # Version 1.5: Added get_by_instance_uuid(), create(), save()
    VERSION = '1.5'
 
    fields = {
        'id': fields.IntegerField(),
        'image': fields.ObjectField('ImageMeta', nullable=True),
        'numa_topology': fields.ObjectField('InstanceNUMATopology',
                                            nullable=True),
        'pci_requests': fields.ObjectField('InstancePCIRequests',
                                           nullable=True),
        'VietStack_requests': fields.ObjectField('InstanceVietStackRequest',nullable=True)
    }
{% endhighlight %}

<ul>
<li>The request_spec will be created and sent to scheduler for selecting hosts and also sent to nova-compute through queue to provisioning instance.</li>
<li>After creating a new field for VietStack_request, it is necessary to deal with the VietStack_request information in the methods of RequestSpec object. See the usage of numa_topology for reference to see how the numa_topology is used.</li>
</ul>

<strong>2.3 Modification of Instance.py</strong>

{% highlight python %}
@base.NovaObjectRegistry.register
class Instance(base.NovaPersistentObject, base.NovaObject,
               base.NovaObjectDictCompat):
    # Version 2.0: Initial version
    # Version 2.1: Added services
    VERSION = '2.1'
 
    fields = {
        'id': fields.IntegerField(),
 
        'user_id': fields.StringField(nullable=True),
        'project_id': fields.StringField(nullable=True),
        ………
 
        'VietStack_request': fields.ObjectField('InstanceVietStackRequest', nullable=True)
{% endhighlight %}


We need to add a new field of VietStack_request that will point to the InstanceVietStackRequest object that is representative for VietStack topology of instance.

Since in the data model, we create a new column called VietStack_request in the table of InstanceExtra. Therefore, we have to add a new parameter of VietStack_request in the list of instance_extra_fields in instance.py:

<span style="color:#ff0000;">_INSTANCE_EXTRA_FIELDS = ['numa_topology', 'pci_requests','flavor',</span>
<span style="color:#ff0000;"> 'vcpu_model','migration_context','VietStack_request']</span>

&nbsp;

<strong>2.4 VietStackStat object</strong>

We should create a new object for reprentation of VietStack of compute host. This object called VietStackStat in the new file of node_VietStack.py. The below is a sample of VietStackStat.

{% highlight python %}
@base.NovaObjectRegistry.register
class VietStackStat(base.NovaObject):
    # Version 1.0: Initial version
    VERSION = '1.0'
    fields = {
        'nics': fields.ListOfObjectsField('VietStackPerNic', nullable=True)
        }
 
@base.NovaObjectRegistry.register
class VietStackPerNic(base.NovaObject):
     # Version 1.0: Initial version
    VERSION = '1.0'
 
    fields = {
        'rate': fields.IntegerField(default=0)
        'size': fields.IntegerField(default=0)
        …….
    }
{% endhighlight %}


<strong>2.5 Change of ComputeNode</strong>
In compute_node.py, we need to add a new field inside ComputeNode to point to VietStackStat object:

{% highlight python %}
@base.NovaObjectRegistry.register
class ComputeNode(base.NovaPersistentObject, base.NovaObject,
                  base.NovaObjectDictCompat):
    fields = {
        'id': fields.IntegerField(read_only=True),
        'uuid': fields.UUIDField(read_only=True),
        'service_id': fields.IntegerField(nullable=True),
        'host': fields.StringField(nullable=True),
        …....
        'VietStack_stat': fields.ObjectField('VietStackStat', nullable=True)
{% endhighlight %}

Besides, we need to modify the methods inside Compute_Node object to deal with “VietStackStat” value. See the usage of “numa_topology” and “pci_device_pools” for reference.

<strong>2.6 Migration_Context</strong>
We need to add a new field of VietStack resources of each instance for instance migration in objects/migration_context.py.

&nbsp;

{% highlight python %}
@base.NovaObjectRegistry.register
class MigrationContext(base.NovaPersistentObject, base.NovaObject):
    VERSION = '1.0'
    fields = {
        'instance_uuid': fields.UUIDField(),
        'migration_id': fields.IntegerField(),
        'new_numa_topology': fields.ObjectField('InstanceNUMATopology',
                                                nullable=True),
        'old_numa_topology': fields.ObjectField('InstanceNUMATopology',
                                                nullable=True),
        'old_VietStack_stat': fields.ObjectField('InstanceVietStackRequest',
                                nullable=True),
        'new_VietStack_stat': fields.ObjectField('InstanceVietStackRequest',
                                nullable=True)
            }
{% endhighlight %}

<h3>3. Scheduling</h3>

Check out the file host_manager.py and follow the usage of numa_topology as reference in order to map the VietStack_request usage.

Add VietStack_filter to the FilterScheduler. Check the implementation of other filters in Nova and based on the information that VietStack entry provides, we can easily write a new filter for it. It really depends on definition of VietStack and parameters it provides.

<h3>4. Updating resource_tracker.py</h3>

We need to update the information of VietStack of physical nics that are defined in nova.conf. These information we could not get from hypervisor itself like other values such as memory, disk, numa_topology, etc.
Assume that in nova.conf, we have an option [VietStack] as in nova.conf. The resource update should be like below:

{% highlight python %}
def update_available_resource(self, context):
 
    ….
    resource['value1'] = CONF.VietStack.val1
    resource['value2'] = CONF.VietStack.val2
    resource['value3'] = CONF.VietStack.val3
{% endhighlight %}


The method _verify_resources() is used for verifying the resources. If we would like to make sure about the appearance of VietStack_stat, we can put it in to resource_keys in _verfify_resource()
We need to update the method _update_usage_from_instance() that will calculate the usage of resouces of each instance on compute node. The calcualation of usage of VietStack of each instance should be calculated in method of _update_usage() that is triggered inside _update_usage_from_instance(). The method of _update_usage_from_instance() include the calcualtion of compute host usage based on the usage of each instance. The VietStack_stat usage of compute host should be also calculated here.
Besides, we should update the method of instance_claim() to let nova understand the requested VietStack that should be fit to the free VietStack of compute host in case of success instance spawning.

<p style="text-align:center;">
<span style="color:#ff0000;">instance_ref.VietStack_request. = claim.claimed_VietStack_request</span></p>

The parameter of claimed_VietStack_request should be assigned in the Claim object (claim.py). Check the below information for claim.py
Check other “method_name”_claim() methods resource_trackers. These methods will treat resources such as pci_device, numa_topology based on “method”. Check out 'numa_topology' for reference of VietStack_request.

<h3>5. Modification of claim.py</h3>

The claim object also needs to be modified to take 'VietStack_request' as a parameter of claim of an instance build operation. On the other hands, we also need to change other objects related to Claim such as MoveClaim. See numa_topology of instance for reference. Check out the file claim.py then we have to update the objects inside it such as Claim object, MoveClaim object.

<h3>6. Modification of conductor in live_migrate</h3>

If live-migrate is supported, we should take care of the method of _find_destination() in conductor/tasks/live-migrate.py. See the numa_topology implementation for reference.

11/10/2016

VietStack
