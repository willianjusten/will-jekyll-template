---
layout: post
title: IPv6 OpenStack
date: 2015-06-24 15:45:24.000000000 +07:00
type: post
published: true
status: publish
categories:
- Tech
tags:
- IPV6
meta:
  _edit_last: '61498925'
  geo_public: '0'
  _publicize_job_id: '11993629405'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p class="western">Theo báo cáo của Cisco năm 2010 thì tài nguyên IPv4 đã cạn kiệt. Quay ngược thời gian , số lượng các IPv4 đã chạm đến ngưỡng giới hạn vào năm 1992 nhưng với sự ra đời của CIDR đã giúp nó vẫn tồn tại gần 20 chục năm. Do đó việc sử dụng IPv6 là yêu cầu vô cùng cấp thiết với các ISP và hãy thử xem IPv6 được đưa vào ứng dụng trong cloud, cụ thể là OpenStack như thế nào.</p>
<p class="western"><strong>1. Các lưu ý về IPv6</strong></p>
<ul>
<li class="western">Trong IPv6, ta không có khái niệm Class như trong IPv4. Ta chia 128 bits địa chỉ của IPv6 thành 2 phần, bao gồm Prefix và Interface ID. Prefix sẽ có nhiệm vụ nhận dạng network hoặc subnet, trong khi đó Interface ID sẽ nhận dạng địa chỉ của host trong subnet được nhận biết trong Prefix. Thực tế hiện nay trong subnetting, Interface ID có kích thước 64 bit.</li>
</ul>
<p style="padding-left:60px;">Có 2 phương pháp để determine 64-bit Interface ID:</p>
<p class="western" style="padding-left:60px;">- Thông qua Mac Address của Host: Host sẽ determine Interface ID bằng cách lấy 48-bit địa chỉ Mac của mình và extend thành 64-bit.</p>
<p class="western" style="padding-left:60px;">- Randomly Generating (RFC 3041): Host sẽ determine Interface ID bằng cách tự khởi tạo một cách ngẫu nhiên một dãy số 64-bit</p>
<ul>
<li class="western">Một trong 2 dạng địa chỉ IPv6 đó chính là Temporary Transient Address. Dạng địa chỉ này thay đổi theo thời gian và được cung cấp thông qua DHCP server (sử dụng phương pháp RFC 3041 theo một chu kỳ nhất định) hoặc cơ chế tự động config sử dụng ID giao diện bất kì (RFC 3041).</li>
<li class="western">Trong mạng IPv4, TCP/IP sử dụng ARP(Address Resolution Protocol) để dịch địa chỉ IPv4 tới địa chỉ MAC. Nói cách khác ARP sẽ map địa chỉ IPv4 tại layer 3 vào MAC tại layer 2. NDP thực hiện vai trò tương tự với ARP trong IPv6.</li>
<li class="western">Vấn đề về VXLAN:</li>
</ul>
<p class="western" style="padding-left:60px;">Nếu ta sử dụng VXLAN thì MTU của packet sẽ được đẩy lên với giá trị cao hơn, được tính bằng Ethernet payload 1500 bytes và overhead Một số vendor cho rằng 50 bytes cho overhead là cần thiết (bao gồm 20 bytes cho IPv4 header, 8 bytes UDP header, 8 bytes VXLAN header, 14 bytes MAC header), do đó MTU lúc này sẽ là 1550 bytes (trong trường hợp không sử dụng extension như VLAN tag).</p>
<p class="western" style="padding-left:60px;">Nếu ta dùng IPv6 thì header của nó được cố định với giá trị 40 bytes, do đó MTU lúc này ít nhất đạt được 1570 bytes. Sự thay đổi của MTU kéo theo sự thay đổi cần thiết của các thiết bị ảo hóa như vSwitch hay thiết bị vật lý như TOR switch, routers, etc.</p>
<p class="western"><strong>2. IPv6 trong OpenStack </strong></p>
<p class="western">Khi ta tạo subnet trong OpenStack, ta sẽ có thêm 2 attributes đó là: ipv6_ra_mode và ipv6_address_model.</p>
<table style="height:395px;" width="567" cellspacing="0" cellpadding="3">
<colgroup>
<col width="215" />
<col width="216" />
<col width="215" /> </colgroup>
<tbody>
<tr valign="top">
<td bgcolor="#ffffff" width="215">
<p class="western">Attribute</p>
</td>
<td bgcolor="#ffffff" width="216">
<p class="western">Chức năng</p>
</td>
<td bgcolor="#ffffff" width="215">
<p class="western">Giá trị</p>
</td>
</tr>
<tr valign="top">
<td bgcolor="#ffffff" width="215">
<p class="western">ipv6_ra_mode</p>
</td>
<td bgcolor="#ffffff" width="216">
<p class="western">Quyết định bit AMO và phương pháp gửi RA (Routing Advertise)(RA sẽ được gửi bởi Neutron router hay router vật lý?)</p>
</td>
<td bgcolor="#ffffff" width="215">
<p class="western">dhcpv6-statefull</p>
<p class="western">dhcpv6-stateless</p>
<p class="western">SLAAC (Stateless Address Autoconfiguration)</p>
</td>
</tr>
<tr valign="top">
<td bgcolor="#ffffff" width="215">
<p class="western">ipv6_address_model</p>
</td>
<td bgcolor="#ffffff" width="216">
<p class="western">Quyết định cách thức máy ảo nhận dạng gateway, địa chỉ IPv6 và các thông tin khác</p>
</td>
<td bgcolor="#ffffff" width="215">
<p class="western">dhcpv6-statefull</p>
<p class="western">dhcpv6-stateless</p>
<p class="western">SLAAC (Stateless Address Autoconfiguration)</p>
</td>
</tr>
</tbody>
</table>
<p class="western"><span style="text-decoration:underline;">Cách thức hoạt động của SLAAC:</span></p>
<p class="western"><b>- </b>SLAAC là default model của IPv6</p>
<p class="western">- Máy ảo sẽ khởi tạo một Interface ID như là một địa chỉ EUI-64 dựa trên địa chỉ MAC của máy ảo.</p>
<p class="western">- IPv6 Prefix sẽ được cung cấp cho máy ảo thông qua RA (Routing Table). RA chứa các Prefix, default gateway, Prefix lifetime của subnet.</p>
<p class="western">- Các RA sẽ được gửi theo chu kì bởi router để refresh lifetime.</p>
<p class="western">- Sự kết hợp các attributes của subnet khi sử dụng SLAAC:</p>
<table style="height:419px;" width="577" cellspacing="0" cellpadding="3">
<colgroup>
<col width="215" />
<col width="216" />
<col width="215" /> </colgroup>
<tbody>
<tr valign="top">
<td bgcolor="#ffffff" width="215">
<p class="western">ipv6_ra_mode</p>
</td>
<td bgcolor="#ffffff" width="216">
<p class="western">ipv6_address_mode</p>
</td>
<td bgcolor="#ffffff" width="215">
<p class="western">Kết qủa</p>
</td>
</tr>
<tr valign="top">
<td bgcolor="#ffffff" width="215">
<p class="western">SLAAC</p>
</td>
<td bgcolor="#ffffff" width="216">
<p class="western">Not specified</p>
</td>
<td bgcolor="#ffffff" width="215">
<p class="western">Đánh địa chỉ (addressing) sử dụng Neutron router</p>
</td>
</tr>
<tr valign="top">
<td bgcolor="#ffffff" width="215">
<p class="western">Not specified</p>
</td>
<td bgcolor="#ffffff" width="216">
<p class="western">SLAAC</p>
</td>
<td bgcolor="#ffffff" width="215">
<p class="western">Đánh địa chỉ (addressing) sử dụng router ngoài (router vật lý)</p>
</td>
</tr>
<tr valign="top">
<td bgcolor="#ffffff" width="215">
<p class="western">SLAAC</p>
</td>
<td bgcolor="#ffffff" width="216">
<p class="western">SLAAC</p>
</td>
<td bgcolor="#ffffff" width="215">
<p class="western">Đánh địa chỉ (addressing) sử dụng Neutron router</p>
</td>
</tr>
</tbody>
</table>
<p class="western">- Mô hình triển khai SLAAC:</p>
<p class="western"><a href="https://vietstack.files.wordpress.com/2015/06/slaac.png"><img class="aligncenter size-full wp-image-496" src="{{ site.baseurl }}/pictures/slaac.png" alt="slaac" width="288" height="151" /></a></p>
<p class="western" style="text-align:center;">Source: Cisco</p>
<p class="western">Ngoài ra việc sử dụng SLAAC sẽ tác động đến radvd agent trong việc gửi RA. Thiết lập giá trị cho address configuration flag trong RA sẽ cho phép các phương thức gửi RA thông qua Neutron router.</p>
<p class="western"><span style="text-decoration:underline;">Cách thức hoạt động của DHCPv6:</span></p>
<p class="western">- Ta phải cấu hình cho network để không cung cấp SLAAC prefix.</p>
<p class="western">- Cấu hình cho máy ảo để nhận DHCPv6 thay vì SLAAC (thiết lập bit 'M' để RA chứa flag)</p>
<p class="western">- DHCPv6 hoạt động tương tự như DHCPv4. Máy ảo sẽ yêu cầu một địa chỉ IPv6 từ DHCPv6 server và nhận 1 phản hồi với địa chỉ IPv6 được chứa bên trong và các thông tin khác như domain name, DNS resolver.</p>
<ul>
<li class="western" style="padding-left:30px;">DHCPv6 stateless</li>
</ul>
<table style="height:349px;" width="562" cellspacing="0" cellpadding="4">
<colgroup>
<col width="213" />
<col width="214" />
<col width="213" /> </colgroup>
<tbody>
<tr valign="top">
<td bgcolor="#ffffff" width="213">
<p class="western">ipv6_ra_mode</p>
</td>
<td bgcolor="#ffffff" width="214">
<p class="western">ipv6_address_mode</p>
</td>
<td bgcolor="#ffffff" width="213">
<p class="western">Kết quả trong việc đánh địa chỉ</p>
</td>
</tr>
<tr valign="top">
<td bgcolor="#ffffff" width="213">
<p class="western">DHCPv6-stateless</p>
</td>
<td bgcolor="#ffffff" width="214">
<p class="western">Not specified</p>
</td>
<td bgcolor="#ffffff" width="213">
<p class="western">Sử dụng dịch vụ DHCP ngoài và Neutron router</p>
</td>
</tr>
<tr valign="top">
<td bgcolor="#ffffff" width="213">
<p class="western">Not specified</p>
</td>
<td bgcolor="#ffffff" width="214">
<p class="western">DHCPv6-stateless</p>
</td>
<td bgcolor="#ffffff" width="213">
<p class="western">Sử dụng Neutron DHCP và router ngoài</p>
</td>
</tr>
<tr valign="top">
<td bgcolor="#ffffff" width="213">
<p class="western">DHCPv6-stateless</p>
</td>
<td bgcolor="#ffffff" width="214">
<p class="western">DHCPv6-stateless</p>
</td>
<td bgcolor="#ffffff" width="213">
<p class="western">Sử dụng Neutron router và Neutron DHCP</p>
</td>
</tr>
</tbody>
</table>
<p class="western" style="padding-left:30px;">Mô hình triển khai DHCPv6 stateless<a href="https://vietstack.files.wordpress.com/2015/06/stateless.png"><img class="aligncenter  wp-image-497" src="{{ site.baseurl }}/pictures/stateless.png" alt="stateless" width="571" height="156" /></a></p>
<p class="western" style="text-align:center;">Source: Cisco</p>
<p style="padding-left:30px;"><span lang="en-US">Tương tự như SLAAC trong việc thiết lập address configuration flag.</span></p>
<ul>
<li style="padding-left:30px;">DHCPv6 Statefull</li>
</ul>
<table style="height:281px;" width="578" cellspacing="0" cellpadding="4">
<colgroup>
<col width="213" />
<col width="214" />
<col width="213" /> </colgroup>
<tbody>
<tr valign="top">
<td bgcolor="#ffffff" width="213">
<p class="western">ipv6_ra_mode</p>
</td>
<td bgcolor="#ffffff" width="214">
<p class="western">ipv6_address_mode</p>
</td>
<td bgcolor="#ffffff" width="213">
<p class="western">Kết quả trong việc đánh địa chỉ</p>
</td>
</tr>
<tr valign="top">
<td bgcolor="#ffffff" width="213">
<p class="western">DHCPv6-statelful</p>
</td>
<td bgcolor="#ffffff" width="214">
<p class="western">Not specified</p>
</td>
<td bgcolor="#ffffff" width="213">
<p class="western">Sử dụng dịch vụ DHCP ngoài</p>
</td>
</tr>
<tr valign="top">
<td bgcolor="#ffffff" width="213">
<p class="western">Not specified</p>
</td>
<td bgcolor="#ffffff" width="214">
<p class="western">DHCPv6-statelful</p>
</td>
<td bgcolor="#ffffff" width="213">
<p class="western">Sử dụng Neutron DHCP</p>
</td>
</tr>
<tr valign="top">
<td bgcolor="#ffffff" width="213">
<p class="western">DHCPv6-stateful</p>
</td>
<td bgcolor="#ffffff" width="214">
<p class="western">DHCPv6-statelful</p>
</td>
<td bgcolor="#ffffff" width="213">
<p class="western">Sử dụng Neutron DHCP</p>
</td>
</tr>
</tbody>
</table>
<p class="western" style="padding-left:30px;">Tương tự, ta cũng cần lưu trong việc thiết lập address configuration flag</p>
<p class="western"><b>3. Thách thức của IPv6 trong Openstack:</b></p>
<p class="western">- Một trong những giới hạn của OpenStack hiện tại đó chính là đáp ứng được nhu cầu của các ứng dụng sử dụng IPv6. Các nhà cung cấp dịch vụ cloud tin rằng IPv6 sẽ tạo nên sự khác biệt đáng kể trong việc đáp ứng được nhu cầu về traffic ngày một gia tăng của thị trường các thiết bị thông minh. Hầu hết các ứng dụng đều nằm ở tầng SaaS và việc cung cấp sự truy cập các ứng dungj cho hàng tỷ các thiết bị trong tương lai đòi hỏi sự tích hợp vô cùng cấp thiết IPv6 trong Cloud. IoT (Internet of Thing) cần các tiền đề của Cloud nhưng IoT chỉ thực hiện được khi và chỉ khi IPv6 được sử dụng.</p>
<p class="western">- IPv6 sẽ ảnh hưởng rất nhiều đến các yếu tố về mặt cấu trúc của OpenStack đã được xây dựng xoay quanh IPv4 như cấu trúc không gian địa chỉ, security. IPv6 sẽ ảnh hưởng mạnh mẽ nhất đến Nova và Neutron.</p>
<p class="western">- Việc security của IPv6 cần phải được hỗ trợ trong OpenStack. Đã có một số sự thay đổi trong security group của OpenStack chính là việc sử dụng ICMPv6. Bên cạnh đó, OpenStack không hỗ trợ IPv6 floating IP như IPv4 floating IP nhằm giải quyết vấn đề về Duplicate Address Detection (DAD) trong các message multicast khi sử dụng SLAAC.</p>
<p class="western">24-6-2015</p>
<p class="western">VietStack Team</p>
