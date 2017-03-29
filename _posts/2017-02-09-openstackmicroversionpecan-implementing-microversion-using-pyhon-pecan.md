---
layout: post
title: "[OpenStack][Microversion][Pecan] Implementing microversion using pyhon pecan"
date: 2017-02-09 22:22:22.000000000 +07:00
type: post
published: true
status: publish
tags:
- OpenStack
- Microversion
- Pecan
categories:
- Tech
meta:
  _wpcom_is_markdown: '1'
  _oembed_0a42293ac3c92c7dbbff533b766deb93: "{{unknown}}"
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '1675691668'
  _oembed_2b11b57a774e4fbbec9eb014e6499ddf: "{{unknown}}"
  _oembed_68dc9b9872d31f47c143c6c8facc0234: "{{unknown}}"
  _oembed_8c8d0b85431b9dad95e76e3cdcfd8598: "{{unknown}}"
  _oembed_02354fe3f321524a9e88ca234395fd90: "{{unknown}}"
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>In a nut shell, when we send a request to a routed method, an API version object that includes a required API version is also sent along within the request. A new object called "versionedmethod" is going to be created that takes the API version objects (min_version, max_version) as well as the routed method. A new, dynamic mapping called "versioned_methods" is created to store the "versionedmethod"s and it automatically checks and returns the match one. The below information is the summary of each element design in the overall design of microversion.</p>
<ul>
<li>API Version will be implemented as an object (e.g. min_version, max_version are Version object). This object will provide the built-in methods of compare/less_than/greater_than/matches, etc. that will ease the comparison operations between version.</li>
</ul>
<p>This object will get the mis_version, max_version from headers provided in API.</p>
<p>{% highlight python %}</p>
<p>Class Version(object):</p>
<p>	def __init__(self, headers, min_ver, max_ver):<br />
		raise NotImplementedError<br />
	def __eq__(self, other):<br />
		pass<br />
	def __lt__(self, other):<br />
		pass<br />
	def __gt__(self, other):<br />
		pass<br />
	....<br />
 	def matches(self, start_version, end_version):<br />
		pass<br />
{% endhighlight %}</p>
<ul>
<li>The methods of each controller that are versioned (so called VersionedMethod) will be implemented as VerisonedMethod() instance. It will take the value of each function of controller as well as its start/end_version. Later on we will collect each version of the function and compare its version with the version provided in header.</li>
</ul>
<p>{% highlight python %}</p>
<p>Class VersionedMethod(object):<br />
	def __init__(self, name, start_version, end_version, function):<br />
		raise NotImplementedError<br />
{% endhighlight %}</p>
<ul>
<li>Each controller will be inherited from a base controller that will handle all the processes related to the microversion such as checking versions, collecting versioned methods, etc. This base controller includes the method of api_version() that will be used as decorator in routed controller. For instance:</li>
</ul>
<p>{% highlight python %}</p>
<p>class Controller():<br />
	…..<br />
	@classmethod<br />
	def api_version(cls, min_ver, max_ver=None):<br />
		def decorator(f):<br />
			….<br />
			return f<br />
		return decorator<br />
{% endhighlight %}</p>
<p>In the routed controller, for each method, we need to put the decorator of api_version() at the most outer as showed as below example:</p>
<p>{% highlight python %}</p>
<p>from pecan import expose</p>
<p>class RoutedController(Controller):<br />
	@Controller.api_version(‘1.1’, ‘1.10’)<br />
	@expose()<br />
	def post():<br />
		return “This method supports version from 1.1 to 1.10”</p>
<p>	@Controller.api_version(‘1.11’)<br />
	@expose()<br />
	def post():<br />
		return “This method only supports version 1.11”<br />
{% endhighlight %}</p>
<ul>
<li>The base controller design:</li>
</ul>
<p>The base controller is designed to automatically check the version of exposed methods in request and return the match one based. For example, in the RoutedController, we support two post() method, each of them supports a range of versions. When we route a request to the POST method companying with a specific version, the base controller will collect the number of post() method that request may be routed to and choose the right one that fits the requirement of version.</p>
<p>In this design, we create a parameter so called versioned_methods. The requirement of this parameter is that the value of versioned_methods that contain the number of routed methods needs to be automatically, dynamically changed, therefore we implement a built-in <strong>getattribute</strong> method along with metaclass. The reason why we use metaclass is deeply explained later.</p>
<p>Besides, as we mentioned above that the version of each method will be implemented as an object and sent along with request, in the base controller, we will take it out from request and execute the comparison operation.</p>
<p><span style="color:#ff0000;">NOTE: Why do we implement <strong>metaclass</strong> here?</span></p>
<p>As we know that metaclass is used in API implementation (check the Django ORM source code), metaclass is creating classes therefore all the members/instances/inheritances get possibility to customize the classes. So that metaclass is used when we want to implement the automatic modification methods of class inheritances to class attributes.</p>
<p>In the above implementation, we see that, we need to modify the value of versioned_methods (it is a mapping) of class Controller() whenever there is a function that is decorated with api_version(). This versioned_methods mapping maps the name of each versioned_method with number of its versioned object. Since the decorator api_version() is used in multiple times with multiple methods, the value of versioned_methods has to have ability to automatically change. This is the result of implementing metaclass here.</p>
<p>USAGE:</p>
<ul>
<li>I attached a github link that contain the demo code of microversioning using pecan. You can download it, unzip and follow the below instructions for testing/demo:</li>
</ul>
<p>https://github.com/vietstacker/Pecan_Microversioning</p>
<ul>
<li>We can test this demo inside virtualenv to not affect to the local working environment. In my virtualenv, i use port 8085.</li>
<li>
<p>Execute command “pecan serve config.py” to run a webserver using apache mod_wsgi. For more information about basic pecan and apache mod_wsgi webserver, check the below blog:</p>
</li>
</ul>
<p>https://vietstack.wordpress.com/2016/11/11/openstackcloudappwebserver-using-apache-mod_wsgi-and-pecan-in-publisher-subcriber/</p>
<ul>
<li>Run the command to send the request to the above webserver:</li>
</ul>
<p style="padding-left:30px;">This method uses version 1.6 of API, It will return the result: “This method supports version from 1.1 to 1.10”</p>
<p><span style="color:#ff0000;">curl -i -H "Accept:application/json" -H "X-Vietstack-Api-Version: Microversion 1.6" -X POST http://127.0.0.1:8085/api/v1 -H "Content-Type: application/json" -d ‘’</span></p>
<p style="padding-left:30px;">This method uses version 1.11 of API, It will return the result: “This method only supports version 1.11”</p>
<p><span style="color:#ff0000;">curl -i -H "Accept:application/json" -H "X-Vietstack-Api-Version: Microversion 1.11" -X POST http://127.0.0.1:8085/api/v1 -H "Content-Type: application/json" -d ‘’</span></p>
<p>&nbsp;</p>
<p><img class="alignnone size-full wp-image-1134" src="{{ site.baseurl }}/assets/pecan_microversion.png" alt="pecan_microversion" width="1855" height="432" /></p>
<p>&nbsp;</p>
<ul>
<li>The header of microversion is MANDATORY. The form of header is “X-Vietstack-Api-Version: Microversion ”. The error of HttpNotAcceptable is raised if the header is not provided or the key of header (X-Vietstack-Api-Version) is not True.</li>
</ul>
<p>VietStack team</p>
<p>2/2017</p>
