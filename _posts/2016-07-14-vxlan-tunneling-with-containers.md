---
layout: post
title: VXLAN tunneling with containers
date: 2016-07-14 08:58:33.000000000 +07:00
type: post
published: true
status: publish
categories: []
tags: []
meta:
  _wpcom_is_markdown: '1'
  _oembed_5fa4c0dde1830b3ecd5bb140b84849e6: "{{unknown}}"
  _oembed_892927d077043689479b044011c674d6: "{{unknown}}"
  _oembed_78776e46a8b2511d0dfa13e69d10dd9c: "{{unknown}}"
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '24772523281'
  _oembed_0c314b8f7f119cc66bab9cb6fd98af46: "{{unknown}}"
  _oembed_0d674b765256196540ac74279d79c7db: "{{unknown}}"
  _oembed_e4367f8f1fa9b64e4c42b1e9cb47fec3: "{{unknown}}"
  _oembed_f05e6e5eba5f3317682e2a3c0b3dc129: "{{unknown}}"
  _oembed_2090797090a7c4400f10d99d52246fe8: "<div class=\"embed-vmwarevsphereblog\"><blockquote
    class=\"wp-embedded-content\"><a href=\"http://blogs.vmware.com/vsphere/2013/04/vxlan-series-different-components-part-1.html\">VXLAN
    Series &#8211; Different Components &#8211; Part 1</a></blockquote><script type='text/javascript'><!--//--><![CDATA[//><!--\t\t!function(a,b){\"use
    strict\";function c(){if(!e){e=!0;var a,c,d,f,g=-1!==navigator.appVersion.indexOf(\"MSIE
    10\"),h=!!navigator.userAgent.match(/Trident.*rv:11./),i=b.querySelectorAll(\"iframe.wp-embedded-content\");for(c=0;c<i.length;c++)if(d=i[c],!d.getAttribute(\"data-secret\")){if(f=Math.random().toString(36).substr(2,10),d.src+=\"#?secret=\"+f,d.setAttribute(\"data-secret\",f),g||h)a=d.cloneNode(!0),a.removeAttribute(\"security\"),d.parentNode.replaceChild(a,d)}else;}}var
    d=!1,e=!1;if(b.querySelector)if(a.addEventListener)d=!0;if(a.wp=a.wp||{},!a.wp.receiveEmbedMessage)if(a.wp.receiveEmbedMessage=function(c){var
    d=c.data;if(d.secret||d.message||d.value)if(!/[^a-zA-Z0-9]/.test(d.secret)){var
    e,f,g,h,i,j=b.querySelectorAll('iframe[data-secret=\"'+d.secret+'\"]'),k=b.querySelectorAll('blockquote[data-secret=\"'+d.secret+'\"]');for(e=0;e<k.length;e++)k[e].style.display=\"none\";for(e=0;e<j.length;e++)if(f=j[e],c.source===f.contentWindow){if(f.removeAttribute(\"style\"),\"height\"===d.message){if(g=parseInt(d.value,10),g>1e3)g=1e3;else
    if(~~g<200)g=200;f.height=g}if(\"link\"===d.message)if(h=b.createElement(\"a\"),i=b.createElement(\"a\"),h.href=f.getAttribute(\"src\"),i.href=d.value,i.host===h.host)if(b.activeElement===f)a.top.location.href=d.value}else;}},d)a.addEventListener(\"message\",a.wp.receiveEmbedMessage,!1),b.addEventListener(\"DOMContentLoaded\",c,!1),a.addEventListener(\"load\",c,!1)}(window,document);//--><!]]></script><iframe
    sandbox=\"allow-scripts\" security=\"restricted\" src=\"http://blogs.vmware.com/vsphere/2013/04/vxlan-series-different-components-part-1.html/embed\"
    width=\"600\" height=\"338\" title=\"&#8220;VXLAN Series &#8211; Different Components
    &#8211; Part 1&#8221; &#8212; VMware vSphere Blog\" frameborder=\"0\" marginwidth=\"0\"
    marginheight=\"0\" scrolling=\"no\" class=\"wp-embedded-content\"></iframe></div>"
  _oembed_time_2090797090a7c4400f10d99d52246fe8: '1476774878'
  _oembed_e194007c1befd5553e845ca52a97bcb4: "{{unknown}}"
  _oembed_c8c7d6ed98f0f8ba8901294a604a6f4d: "<div class=\"embed-vmwarevsphereblog\"><blockquote
    class=\"wp-embedded-content\"><a href=\"http://blogs.vmware.com/vsphere/2013/04/vxlan-series-different-components-part-1.html\">VXLAN
    Series &#8211; Different Components &#8211; Part 1</a></blockquote><script type='text/javascript'><!--//--><![CDATA[//><!--\t\t!function(a,b){\"use
    strict\";function c(){if(!e){e=!0;var a,c,d,f,g=-1!==navigator.appVersion.indexOf(\"MSIE
    10\"),h=!!navigator.userAgent.match(/Trident.*rv:11./),i=b.querySelectorAll(\"iframe.wp-embedded-content\");for(c=0;c<i.length;c++)if(d=i[c],!d.getAttribute(\"data-secret\")){if(f=Math.random().toString(36).substr(2,10),d.src+=\"#?secret=\"+f,d.setAttribute(\"data-secret\",f),g||h)a=d.cloneNode(!0),a.removeAttribute(\"security\"),d.parentNode.replaceChild(a,d)}else;}}var
    d=!1,e=!1;if(b.querySelector)if(a.addEventListener)d=!0;if(a.wp=a.wp||{},!a.wp.receiveEmbedMessage)if(a.wp.receiveEmbedMessage=function(c){var
    d=c.data;if(d.secret||d.message||d.value)if(!/[^a-zA-Z0-9]/.test(d.secret)){var
    e,f,g,h,i,j=b.querySelectorAll('iframe[data-secret=\"'+d.secret+'\"]'),k=b.querySelectorAll('blockquote[data-secret=\"'+d.secret+'\"]');for(e=0;e<k.length;e++)k[e].style.display=\"none\";for(e=0;e<j.length;e++)if(f=j[e],c.source===f.contentWindow){if(f.removeAttribute(\"style\"),\"height\"===d.message){if(g=parseInt(d.value,10),g>1e3)g=1e3;else
    if(~~g<200)g=200;f.height=g}if(\"link\"===d.message)if(h=b.createElement(\"a\"),i=b.createElement(\"a\"),h.href=f.getAttribute(\"src\"),i.href=d.value,i.host===h.host)if(b.activeElement===f)a.top.location.href=d.value}else;}},d)a.addEventListener(\"message\",a.wp.receiveEmbedMessage,!1),b.addEventListener(\"DOMContentLoaded\",c,!1),a.addEventListener(\"load\",c,!1)}(window,document);//--><!]]></script><iframe
    sandbox=\"allow-scripts\" security=\"restricted\" src=\"http://blogs.vmware.com/vsphere/2013/04/vxlan-series-different-components-part-1.html/embed\"
    width=\"600\" height=\"338\" title=\"&#8220;VXLAN Series &#8211; Different Components
    &#8211; Part 1&#8221; &#8212; VMware vSphere Blog\" frameborder=\"0\" marginwidth=\"0\"
    marginheight=\"0\" scrolling=\"no\" class=\"wp-embedded-content\"></iframe></div>"
  _oembed_time_c8c7d6ed98f0f8ba8901294a604a6f4d: '1476775868'
  _oembed_2a1f36f26739c328f379edca647f8d2c: "{{unknown}}"
  _oembed_922919aaab518a78b8fdb07e723c6c17: "<div class=\"embed-vmwarevsphereblog\"><blockquote
    class=\"wp-embedded-content\"><a href=\"http://blogs.vmware.com/vsphere/2013/04/vxlan-series-different-components-part-1.html\">VXLAN
    Series &#8211; Different Components &#8211; Part 1</a></blockquote><script type='text/javascript'><!--//--><![CDATA[//><!--\t\t!function(a,b){\"use
    strict\";function c(){if(!e){e=!0;var a,c,d,f,g=-1!==navigator.appVersion.indexOf(\"MSIE
    10\"),h=!!navigator.userAgent.match(/Trident.*rv:11./),i=b.querySelectorAll(\"iframe.wp-embedded-content\");for(c=0;c<i.length;c++)if(d=i[c],!d.getAttribute(\"data-secret\")){if(f=Math.random().toString(36).substr(2,10),d.src+=\"#?secret=\"+f,d.setAttribute(\"data-secret\",f),g||h)a=d.cloneNode(!0),a.removeAttribute(\"security\"),d.parentNode.replaceChild(a,d)}else;}}var
    d=!1,e=!1;if(b.querySelector)if(a.addEventListener)d=!0;if(a.wp=a.wp||{},!a.wp.receiveEmbedMessage)if(a.wp.receiveEmbedMessage=function(c){var
    d=c.data;if(d.secret||d.message||d.value)if(!/[^a-zA-Z0-9]/.test(d.secret)){var
    e,f,g,h,i,j=b.querySelectorAll('iframe[data-secret=\"'+d.secret+'\"]'),k=b.querySelectorAll('blockquote[data-secret=\"'+d.secret+'\"]');for(e=0;e<k.length;e++)k[e].style.display=\"none\";for(e=0;e<j.length;e++)if(f=j[e],c.source===f.contentWindow){if(f.removeAttribute(\"style\"),\"height\"===d.message){if(g=parseInt(d.value,10),g>1e3)g=1e3;else
    if(~~g<200)g=200;f.height=g}if(\"link\"===d.message)if(h=b.createElement(\"a\"),i=b.createElement(\"a\"),h.href=f.getAttribute(\"src\"),i.href=d.value,i.host===h.host)if(b.activeElement===f)a.top.location.href=d.value}else;}},d)a.addEventListener(\"message\",a.wp.receiveEmbedMessage,!1),b.addEventListener(\"DOMContentLoaded\",c,!1),a.addEventListener(\"load\",c,!1)}(window,document);//--><!]]></script><iframe
    sandbox=\"allow-scripts\" security=\"restricted\" src=\"http://blogs.vmware.com/vsphere/2013/04/vxlan-series-different-components-part-1.html/embed\"
    width=\"600\" height=\"338\" title=\"&#8220;VXLAN Series &#8211; Different Components
    &#8211; Part 1&#8221; &#8212; VMware vSphere Blog\" frameborder=\"0\" marginwidth=\"0\"
    marginheight=\"0\" scrolling=\"no\" class=\"wp-embedded-content\"></iframe></div>"
  _oembed_time_922919aaab518a78b8fdb07e723c6c17: '1478865493'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>When I had meeting with SDN guys about the SDN implementation in cloud, it recalled me VXLAN that by somehow I forgot quite a long time. In fact, tunneling/overlay network solution has an indispensable role in SDN solution, especially when we would like to implement SFC in Network Function Virtualization.</p>
<p>In this blog, I would not show you the VXLAN implementation in SDN solution, I only have time to show you a small test bed for VXLAN in a play of a tunneling between containers running on multiple hosts.</p>
<p>The role of VXLAN is extending layer 2 that is basically put the containers (in this blog) or virtual machines across multiple hosts on the same layer 2 network or subnet. Of course it depends on the overlay network types that will entail caveats or issues (overhead, MTU, latency, etc.).</p>
<p>Here I will use LXC containers (you can use docker containers later if you want), KVM since it has OVS (virtualbox has another type of networking virtualization, a little bit complicating than KVM) and of course Linux kernel support VXLAN with both of multicast and unicast. I am going to boot two virtual machines that running on the same subnet, on each of them, I boot one LXC. Since LXC container only can connect to the host where it is running and other containers running on the same host, then if we want to connect them running on multiple hosts, we need tunneling to connect their networks together.</p>
<p>I did a small experiment for VXLAN with unicast, for the multicast, I will do it later if I have free time:D.</p>
<p>Here is the link of github where i put my instruction on, check it out:<br />
https://github.com/vietstacker/LXC-with-VXLAN-tunneling</p>
<p>Otherwise, if you have time, check the below blogs for VXLAN and network:</p>
<p>http://blogs.vmware.com/vsphere/2013/04/vxlan-series-different-components-part-1.html</p>
<p><a href="http://blog.scottlowe.org/">http://blog.scottlowe.org/</a></p>
<p><a href="http://www.ipspace.net/Main_Page">http://www.ipspace.net/Main_Page</a></p>
<p>13/07/2016</p>
<p>VietStack</p>
