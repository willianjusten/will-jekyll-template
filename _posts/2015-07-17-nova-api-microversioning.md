---
layout: post
title: Nova API Microversioning
date: 2015-07-17 20:10:23.000000000 +07:00
type: post
published: true
status: publish
categories:
- Chia sẻ kinh nghiệm
- Giới thiệu OpenStack
tags: []
meta:
  _wpcom_is_markdown: '1'
  _edit_last: '61498925'
  geo_public: '0'
  _publicize_job_id: '12827472694'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p class="western" lang="sv-SE" align="justify">
<p class="western" align="center"><span style="font-family:'Times New Roman', serif;"><span style="font-size:x-large;"><b>Nova API Microversioning</b></span></span></p>
<p class="western" align="justify">
<ol>
<li>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;"><span style="font-size:large;"><b>Overview</b></span></span></p>
</li>
</ol>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">As the same with other OpenStack core project</span></span><span style="font-family:'Times New Roman', serif;"><span lang="en-US">s</span></span><span style="font-family:'Times New Roman', serif;"><span lang="en-US">, Nova also provides the communication via its REST APIs. However, current Nova API (v2) contains problems of input validation lacking, inconsistent interfaces and difficult to add a new API implementation, etc. To solve these problems, a new version of REST API called "v2.1" was exposed in Juno and being developed in coming OpenStack releases. This new approach will fulfil the term of decentralized API.</span></span></p>
<ol start="2">
<li>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;"><span style="font-size:large;"><b>The user perspectives:</b></span></span></p>
</li>
</ol>
<ul>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">The application needs to works against OpenStack or can be suitably modified even after OpenStack has been upgraded.</span></span></p>
</li>
<li>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">Some new features added to OpenStack need to be exposed through API.</span></p>
</li>
<li>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">The cloud users need to be kept an y</span></p>
</li>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">The application that run on a multiple OpenStack clouds whose single cloud is separately controlled by multiple vendors, even those OpenStack cloud are different in version.</span></span></p>
</li>
</ul>
<p class="western" align="justify">
<ol start="3">
<li>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;"><span style="font-size:large;"><b>Use cases:</b></span></span></p>
</li>
</ol>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">Arcording to the OpenStack official website (source: http://specs.openstack.org/openstack/nova-specs/specs/kilo/implemented/api-microversions.html):</span></span></p>
<ul>
<li>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">Allows developers to modify the Nova API in backwards compatible way and signal to users of the API dynamically that the change is available without having to create a new API extension.</span></p>
</li>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">Allows developers to modify the Nova API in a non-backwards compatible way whilst still supporting the old behaviour. Users of the REST API are able to decide if they want the Nova API to behave in the new or old manner on a per request basis. Deployers are able to make new backwards incompatible features available without removing support for prior behaviour as long as there is support to do this by developers.</span></span></p>
</li>
<li>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">Users of the REST API are able to, on a per request basis, decide which version of the API they want to use (assuming the deployer supports the version they want).</span></p>
</li>
</ul>
<p>&nbsp;</p>
<p class="western" align="justify">
<ol start="4">
<li>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;"><span style="font-size:large;"><b>What is Nova API 2.1</b></span></span></p>
</li>
</ol>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;"><u><b>Definition:</b></u></span></p>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">Nova v2.1 API = v2 compatibility + Validition + Microversioning</span></span></p>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US"><u><b>V2 Compatibility:</b></u></span></span></p>
<ul>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">API v2 has been used from 2011 and there are a lot of apps or SDK using v2 such as Goose(Go), fog(Ruby). If the client is using some applications with API v2 but want to move to v2.1, it does not make any matters. The API endpoint of v2 is /v2 and API endpoint for v2.1 is /v2.1. Kilo uses endpoint of /v2.1, so there is no incompatibility on the default. We still can use the apps/SDKs that are using v2 in Kilo. </span></span></p>
</li>
</ul>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US"><u><b>Validation</b></u></span></span><span style="font-family:'Times New Roman', serif;"><span lang="en-US"><b>:</b></span></span></p>
<ul>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">Some internal errors can be caused by lack of validation. For example, if a client wrongly uses one of the method of API to talk to API v2, some internal errors may happen. V2 will ignore the undefined parameters and only use the available parameters. The response back to the client including HTTP 500 does not contain the reason of error so that both of cloud operator and client need to investigate the reason without any clues. </span></span></p>
</li>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">Oppositely, in v2.1, all the parameter will be defined with types and formats. In case of wrong API usage, e.g. passing extra input request or different types of input request, v2.1 will send back to the client with response included reason/correct error message that may instruct client to correct the error.</span></span></p>
</li>
</ul>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;"><u><b>Microversioning:</b></u></span></p>
<ul>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">There will be more changes in API then consequently it creates some new versions of API so-called microversions. The descent microversion basically is the improvement of previous one by adding some new feature/bug fixes changes. E.g. v2.2 = v2.1 + new change, up to V2.x.</span></span></p>
</li>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">According to the official openstack website, the following definition describes the versioning (source:http://specs.openstack.org/openstack/nova-specs/specs/kilo/implemented/api-microversions.html):</span></span></p>
</li>
</ul>
<blockquote>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">Versioning of the API should be a single monotonic counter. It will be of the form X.Y where it follows the following convention :</span></p>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">X will only be changed if a significant backwards incompatible API change is made which affects the API as whole. That is, something that is only very rarely incremented.</span></span></p>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">Y when you make any change to the API. Note that this includes semantic changes which may not affect the input or output formats or even originate in the API code layer. We are not distinguishing between backwards compatible and backwards incompatible changes in the versioning system. It will however be made clear in the documentation as to what is a backwards compatible change and what is a backwards incompatible one.</span></span></p>
</blockquote>
<ul>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">Up to Kilo, v2.1 API is default microversion and compatible with v2.</span></span></p>
</li>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">The endpoint of Nova is the same /v2.1 but we need the header between App and Nova to specify which version of API is used. Basically, we utilize microversion by changing request header, not changing the endpoint of Nova.</span></span></p>
</li>
</ul>
<blockquote>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">* 2.1 - Initial version. Equivalent to v2.0 code</span></p>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">* 2.2 - Adds (keypair) type parameter for os-keypairs plugin</span></p>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">           Fixes success status code for create/delete a keypair method</span></p>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">* 2.3 - Exposes additional os-extended-server-attributes</span></p>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">           Exposes delete_on_termination for os-extended-volumes</span></p>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">* 2.4 - Exposes reserved field in os-fixed-ips.</span></p>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">* 2.5 - Allow server search option ip6 for non-admin</span></p>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">* 2.6 - Consolidate the APIs for getting remote consoles</span></span></p>
<p class="western" align="justify">
</blockquote>
<ul>
<li>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">Let’s check the API in request and response in Kilo version:</span></p>
</li>
</ul>
<blockquote>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;"><i>$ nova --debug –service-type computev21 list</i></span></span></p>
<p class="western" lang="sv-SE"><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;"><span lang="en-US"><i>DEBUG (session:195) REQ: curl -g -i -X GET http://192.168.50.20:8774/v2.1/87e5126a1c9a4db28482af97450a2e98/servers/detail -H "User-Agent: python-novaclient" -H "</i></span></span></span><span style="color:#ff0000;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;"><span lang="en-US"><i>Accept: application/json</i></span></span></span></span><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;"><span lang="en-US"><i>" -H "X-Auth-Token: {SHA1}1c0e19248ad9acf77edddfc7b35cb806533799b0"</i></span></span></span></p>
<p class="western" lang="sv-SE"><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;"><span lang="en-US"><i>INFO (connectionpool:203) Starting new HTTP connection (1): 192.168.50.20</i></span></span></span></p>
<p class="western" lang="sv-SE"><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;"><span lang="en-US"><i>DEBUG (connectionpool:383) "</i></span></span></span><span style="color:#ff0000;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;"><span lang="en-US"><i>GET /v2.1/87e5126a1c9a4db28482af97450a2e98/servers/detail HTTP/1.1" 200 15</i></span></span></span></span></p>
<p class="western" lang="sv-SE"><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;"><span lang="en-US"><i>DEBUG (session:224) RESP: [200] content-length: 15 x-compute-request-id: req-8d14500c-13a7-4a87-9db7-f5d9095393da vary: </i></span></span></span><span style="color:#ff0000;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;"><span lang="en-US"><i>X-OpenStack-Nova-API-Version connection: keep-alive x-openstack-nova-api-version: 2.1 </i></span></span></span></span><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;"><span lang="en-US"><i>date: Thu, 16 Jul 2015 11:51:35 GMT content-type: application/json</i></span></span></span></p>
<p class="western" align="justify">
</blockquote>
<ul>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">Client would specify the range of microversion in the “Accept” header. If it is not defined, the default value is v2.1. Then server would response with the version range that it can comply with. If not, the default value is v2.1</span></span></p>
</li>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">v3 becomes a global microversion of v2.2 (because of backwards incompatible changes).</span></span></p>
</li>
</ul>
<p class="western" align="justify">
<ol start="5">
<li>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;"><span style="font-size:large;"><b>API Microversioning in Kilo:</b></span></span></p>
</li>
</ol>
<ul>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">With nova command now, there is no way to use microversion because microversion is not supported now in nova-pythonclient.</span></span></p>
</li>
<li>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">With APP/SDK: Specify a microversion in the request header:</span></p>
</li>
</ul>
<p class="western" lang="sv-SE" align="justify"><span style="color:#ff0000;"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">                                    X-OpenStack-Nova-API-Version</span></span></span></p>
<ul>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">If we pass with the “lastest”, Nova will take the maximum version of API. On each request the “X-OpenStack-Nova-API-Version” header string will be converted to an APIVersionRequest object in the “nova/api/openstack/wsgi.py” code.</span></span></p>
</li>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">If a user does not specify a version, they will get the “DEFAULT_API_VERSION” defined in “nova/api/openstack/wsgi.py”.</span></span></p>
</li>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">In the class controller of “nova/api/openstack/wsgi.py”, we define a decorator “api_version” for the methods. If you want to use “api_version” for some method, you should decorate it by “@wsgi.Controller.api_version”.</span></span></p>
</li>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">The validation schemas are put into the “/nova/api/openstack/compute/schemas”. These schemas will check the API version of request object.</span></span></p>
</li>
</ul>
<p>&nbsp;</p>
<p class="western" style="text-align:left;" align="justify"><span style="font-family:'Times New Roman', serif;"><u><b>Changes in code of Kilo:</b></u></span></p>
<ul>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">In the /nova/api/openstack directory, there are two new files named “api_version_request.py” and ”versioned_method.py”</span></span></p>
</li>
<li>
<p class="western" align="justify">“<span style="font-family:'Times New Roman', serif;"><b>api_version_request.py”: </b></span></p>
<ul>
<li>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">Create an APIversionRequest object.</span></p>
</li>
<li>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">APIversionRequest object will be passed into the “api_version” decorator in Controller class of wsgi.py.</span></p>
</li>
</ul>
</li>
</ul>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">                In the /nova/api/openstack/wsgi.py:</span></span></p>
<p class="western" align="justify"><span style="color:#ff0000;"><span style="font-family:'Times New Roman', serif;"><i>               @classmethod</i></span></span></p>
<p class="western" align="justify"><span style="color:#ff0000;"><span style="font-family:'Times New Roman', serif;"><i>               def api_version:</i></span></span></p>
<ul>
<ul>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">This “api_version” decorator is added to the any method that takes the request object as the first parameter and this method belongs to a class that inherits from wsgi.Controller().</span></span></p>
</li>
</ul>
</ul>
<ul>
<li>
<p class="western" align="justify">“<span style="font-family:'Times New Roman', serif;"><b>versioned_method.py”:</b></span></p>
<ul>
<li>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">Versioning information for a single method</span></p>
</li>
<li>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">It will return an object that has the name of method, min_api, max_api and the method.</span></p>
</li>
</ul>
</li>
</ul>
<p>&nbsp;</p>
<ol start="6">
<li>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;"><span style="font-size:large;"><b>API Microversioning in Liberty:</b></span></span></p>
</li>
</ol>
<ul>
<li>
<p class="western" align="justify"><span style="font-family:'Times New Roman', serif;">The v2 will be replaced by v2.1</span></p>
</li>
<li>
<p class="western" lang="sv-SE" align="justify"><span style="font-family:'Times New Roman', serif;"><span lang="en-US">In long-term, v2 will be removed totally to reduce the maintenance most.</span></span></p>
</li>
</ul>
<p class="western" align="justify">
<p class="western" align="justify">
<p class="western" align="justify">
<p class="western" align="justify">
17/07/2015</p>
<p class="western" align="justify">VietStack team</p>
<p class="western" align="justify">
<p class="western" align="justify">
