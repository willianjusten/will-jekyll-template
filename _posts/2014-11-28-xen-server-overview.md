---
layout: post
title: Xen Server Overview
date: 2014-11-28 16:21:29.000000000 +07:00
type: post
published: true
status: publish
categories:
- Bài dịch - Tài liệu
- Tài liệu tham khảo
- Tech
tags:
- Xen
- Virtualization
meta:
  _wpas_skip_facebook: '1'
  _wpas_skip_google_plus: '1'
  _wpas_skip_twitter: '1'
  _wpas_skip_linkedin: '1'
  _wpas_skip_tumblr: '1'
  _wpas_skip_path: '1'
  _edit_last: '61498925'
  geo_public: '0'
  _oembed_25741cdcc16af491edb7640fb10ee4d4: "{{unknown}}"
  _oembed_384d9a97b4901a4dee11ce242454a435: "{{unknown}}"
  _oembed_90c805459c323c4b77bd98c366c3bac1: "{{unknown}}"
  _oembed_df5ba52c706fd740e568ed4769018412: "{{unknown}}"
  _publicize_pending: '1'
  enclosure: |
    https://xen-orchestra.com/pictures/videos/adjust.mp4
    248644
    video/mp4
  _oembed_0f2056e8076d14228eaddb835b283f5c: "{{unknown}}"
  _oembed_13901a3e97e80878a9167bcfd8449e3e: "{{unknown}}"
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p style="text-align:justify;" align="justify">Trước khi đọc blog post, mời các bạn đọc các bài post có liên quan trước đó:</p>
<ul>
<li style="text-align:justify;"><a href="https://manthang.wordpress.com/2014/06/18/kvm-qemu-do-you-know-the-connection-between-them/">KVM &amp; QEMU Connection by Thang Man</a></li>
<li style="text-align:justify;"><a href="http://vietstack.wordpress.com/2014/10/03/introduction-of-virtualization/">Introduction of Virtualization by VietStack</a></li>
</ul>
<p style="text-align:justify;" align="justify">Bài viết này sẽ giới thiệu tổng quan về Xen Server - một distro sử dụng Xen Hypervisor và các thành phần bên trong module Storage cùng một chút overview về Virtualization Driver của Xen. Các module khác như Network, Resource Compute &amp; Monitor của Xen sẽ được nhắc đến trong các post sau.</p>
<p style="text-align:justify;" align="justify">Dưới đây là video demo nói về một trong những tính năng khá đặc biệt của Xen Server, thay đổi cấu hình máy ảo trong khi máy vẫn đang ở trạng thái running. Video chỉ mang tính chất gợi mở về các tính năng khá hay của Xen Server.</p>
<p style="text-align:justify;" align="justify">[embed]https://xen-orchestra.com/pictures/videos/adjust.mp4[/embed]</p>
<p style="text-align:justify;" align="justify"><b>1. Giới thiệu:</b></p>
<p style="text-align:justify;" align="justify">Xen Server là distro sử dụng Xen hypervisor, trong đó Xen hypervisor là hypervisor kiểu I dạng microkernel (xem lại bài về virtualization), hỗ trợ hai chế độ ảo hoá full virtualization và para-virtualization. Toàn bộ thao tác điều khiển của Xen Server thông qua một máy ảo chính được gọi là Domain 0. Bản thân máy ảo Domain 0 có chứa toàn bộ driver tương tác với hạ tầng vật lý bên dưới và các service, thư viện hỗ trợ quản lý, tương tác với máy ảo (VM). Các máy ảo tạo ra trên nền tảng của Xen hypervisor có tên chung là domain U (dom U).</p>
<p style="text-align:justify;" align="justify">Kiến trúc của Xen Server như sau:</p>
<p style="text-align:justify;" align="justify"><a href="https://vietstack.files.wordpress.com/2014/11/1.png"><img class=" wp-image-382 aligncenter" src="{{ site.baseurl }}/pictures/1.png?w=300" alt="1" width="408" height="305" /></a></p>
<p style="text-align:justify;" align="justify">
<p style="text-align:center;" align="justify">Hình 1. Kiến trúc Xen Server (nguồn: xenserver.org)</p>
<p style="text-align:left;" align="justify"><b>2. Chức năng chính:</b></p>
<p style="text-align:left;" align="justify">Bảng dưới liệt kê các tính năng chính của Xen Server, bạn có thể so sánh với khả năng support của OpenStack trong <a href="https://wiki.openstack.org/wiki/HypervisorSupportMatrix">link này</a>.</p>
<table class=" aligncenter" width="500" cellspacing="0" cellpadding="2">
<colgroup>
<col width="239" />
<col width="513" /> </colgroup>
<tbody>
<tr style="background-color:gray;">
<td style="text-align:center;color:white;" width="239"><strong>Tính năng</strong></td>
<td style="text-align:center;color:white;" width="513">
<p align="center"><strong>Mô tả</strong></p>
</td>
</tr>
<tr>
<td width="239">XenServer hypervisor</td>
<td width="513">
<p align="center">Sử dụng Xen hypervisor (phiên bản mới nhất 4.4)</p>
</td>
</tr>
<tr>
<td width="239">IntelliCache</td>
<td width="513">
<p align="center">Tính năng kết hợp giữa shared storage và local storage, cho phép cache master image từ shared storage trên local storage.</p>
</td>
</tr>
<tr>
<td width="239">Resilient distributed management architecture</td>
<td width="513">
<p align="center">Tính năng cho phép phân tán dữ liệu quản trị server trong một pool.</p>
</td>
</tr>
<tr>
<td width="239">VM disk snapshot and revert</td>
<td width="513"></td>
</tr>
<tr>
<td width="239">XenCenter management</td>
<td width="513">
<p align="center">Tool trên Windows hỗ trợ quản lý máy ảo.</p>
</td>
</tr>
<tr>
<td width="239">Conversion tools</td>
<td width="513">
<p align="center">Cung cấp nhiều tools để chuyển đổi giữa các định dạng máy ảo, chuyển đổi máy vật lý thành máy ảo.</p>
</td>
</tr>
<tr>
<td width="239">XenMotion® live Migration</td>
<td width="513">
<p align="center">Live migration với down time thấp.</p>
</td>
</tr>
<tr>
<td width="239">Heterogeneous pools</td>
<td width="513">
<p align="center">Pool với cấu hình các host là đồng bộ.</p>
</td>
</tr>
<tr>
<td width="239">Dynamic Memory Control</td>
<td width="513">
<p align="center">Tăng giảm RAM tự động khi máy ảo đang chạy.</p>
</td>
</tr>
<tr>
<td width="239">Performance alerting and reporting</td>
<td width="513">
<p align="center">Tính năng monitor.</p>
</td>
</tr>
<tr>
<td width="239">Distributed virtual switching management tool</td>
<td width="513">
<p align="center">Open vSwitch support</p>
</td>
</tr>
<tr>
<td width="239">High availability</td>
<td width="513"></td>
</tr>
<tr>
<td width="239">Automated VM protection and recovery</td>
<td width="513">
<p align="center">Đặt lịch snapshot. (retired trên bản 6.2)</p>
</td>
</tr>
<tr>
<td width="239">Host power management</td>
<td width="513">
<p align="center">Quản lý mức độ tiêu thụ điện và hiệu năng làm việc của CPU. (CPU P-State – performance, CPU C-State – Idle).</p>
</td>
</tr>
<tr>
<td width="239">Live memory snapshot and revert</td>
<td width="513"></td>
</tr>
<tr>
<td width="239">Role-based administration</td>
<td width="513">
<p align="center">Phân quyền xác thực khi sử dụng dịch vụ Xen.</p>
</td>
</tr>
<tr>
<td width="239">Dynamic workload balancing</td>
<td width="513">
<p align="center">Tự động chuyển máy ảo giữa các host để cân bằng tải cho host.(retired trên bản 6.2)</p>
</td>
</tr>
<tr>
<td width="239">Provisioning services (virtual)</td>
<td width="513">
<p align="center">Utility cung cấp máy ảo.</p>
</td>
</tr>
<tr>
<td width="239">StorageLink</td>
<td width="513">
<p align="center">Support Citrix StorageLink.</p>
</td>
</tr>
<tr>
<td width="239">Web self-service with delegated admin</td>
<td width="513">
<p align="center">Giao diện quản trị Xen qua web tích hợp với AD và hỗ trợ phân quyền. (retired trên bản 6.2)</p>
</td>
</tr>
<tr>
<td width="239">Site recovery</td>
<td width="513"></td>
</tr>
<tr>
<td width="239">Lab manager with self-service portal</td>
<td width="513">
<p align="center">Giao diện quản trị Xen qua web.(retired trên bản 6.2)</p>
</td>
</tr>
<tr>
<td style="text-align:center;" width="239">Provisioning services (physical)</td>
<td width="513">
<p style="text-align:center;" align="center">Utility cài đặt và triển khai Xen Server host</p>
</td>
</tr>
</tbody>
</table>
<p align="justify"><b>3. Khái niệm</b></p>
<p align="justify">Dưới đây là một số khái niệm khi làm việc với Xen Server</p>
<ul>
<li>SR: storage repositories, IDE, SATA, SCSI, SAS, iSCSI, NFS, FC.</li>
<li>VDI: virtual disk images của guest VM</li>
<li>PBD: physical block devices, connector cho phép SR link tới một Xen host.</li>
<li>VBD: virtual block devices, connector hỗ trợ link giữa VDIs và Vms. Lưu trong local/domain/device/vbd/id</li>
<li>VHD: virtual hard disk, Connectix data virtual disk (File-based và LVM-based); có thể là một chuỗi các file VHD liên kết với nhau với độ dài tối đa là 30 disk (parent disk thường được sử dụng chủ yếu để clone ra các VM tương tự, các thay đổi thường được ghi lên child disk). Cơ chế tương tự như việc lưu và restore từ snapshot của Virtual Box và VMWare.</li>
<li>PIF: physical network interface, thể hiện các tham số, cấu hình của network card vật lý trên server.</li>
<li>VIF: virtual interface, thể hiện tham số và cấu hình của card ảo tạo ra cho các VM.</li>
<li>Network: virtual ethernet switches, mỗi network được cấu hình bởi các pif và vif được sử dụng trong network ấy. Các network có pif gọi là external, không pif là internal. Ví dụ, có thể tạo ra 1 network đi qua 2 card pif (bonding), cũng có thể tạo ra 1 network chỉ giao tiếp nội bộ giữa các VM.</li>
<li>Event Channel: kênh giao tiếp chính giữa các thành phần trong Xen Server.</li>
</ul>
<p align="justify"><b>4. Các</b><strong> thành phần bên trong Storage module Xen Server:</strong></p>
<ul>
<li>
<p align="justify"><strong>BlkFron</strong><b>t (domU, Xen BlkIf Protocol)</b></p>
<p align="justify">Virtual device (driver) được quản lý bởi Xen blkfront, các thao tác đọc ghi trên dom U được blkfront ghi nhận và forward sang dom 0 qua Xen Bus (trong Event Channel) và giao thức blkif chuyên biệt. Blkfront nằm trong kernel space.</p>
<p align="justify">Mỗi khi Dom U thực hiện thao tác đọc ghi sẽ được Dom 0 cấp quyền riêng biệt thông qua một bảng là bảng Grant Table.</p>
<p align="justify">blkif được cấu tạo như một ring với 32 slot dùng chung cho request và response, giới hạn tối đa 11 segs, mỗi seg 4KiB trên một ring. Có thể cấu hình multi-page rings để support hiệu năng cao hơn.</p>
</li>
<li>
<p align="justify"><b>BlkBack (dom0)</b></p>
</li>
</ul>
<p align="justify"><b> </b>Được cài đặt ở dom 0, nhận các thao tác đọc ghi từ dom U và chuyển xuống hạ tầng storage phần cứng bên dưới thông qua giao thức xen blkif. Sau đó, blkback sẽ thực hiện các thao tác đọc ghi trên các device driver.</p>
<p align="justify"><a href="https://vietstack.files.wordpress.com/2014/11/2.png"><img class=" wp-image-388 aligncenter" src="{{ site.baseurl }}/pictures/2.png?w=300" alt="2" width="615" height="203" /></a></p>
<p align="justify">
<p style="text-align:center;" align="justify">Hình 2: Flow BlkBack (nguồn: Citrix Xen Project - Felipe Franciosi)</p>
<ul>
<li>
<p align="justify"><b>BlkTap1/2 (tap, tapdisk1/2 - Xen Server 6.2.0) </b></p>
<p align="justify">Từ phiên bản 6.2.0, Xen Server cài đặt 2 cách thức đảm bảo đọc ghi mới, thay vì blkback thao tác IO trực tiếp lên device driver sẽ thông qua một interface là blktap để chuyển các thao tác IO lên một device ảo là tap.</p>
<p align="justify">Tại Dom 0, trên user space sẽ có một process là tapdisk handle toàn bộ các IO trong tap và chuyển tới device driver vật lý.</p>
<p align="justify">Nguyên nhân sinh ra tapdisk là để chuyển một phần thao tác lên phía user space trong Linux kernel, tạo ra nhiều tùy chỉnh mềm dẻo hơn với nhà phát triển và tăng cường hiệu năng cho đọc ghi từ VM.</p>
<p align="justify">Tham khảo: http://wiki.xenproject.org/wiki/Blktap</p>
</li>
</ul>
<p><a href="https://vietstack.files.wordpress.com/2014/11/3.png"><img class=" wp-image-389 aligncenter" src="{{ site.baseurl }}/pictures/3.png?w=300" alt="3" width="609" height="206" /></a></p>
<p>&nbsp;</p>
<p style="text-align:center;">Hình 3: Flow với BlkTap Hình 2: Flow BlkBack (nguồn: Citrix Xen Project - Felipe Franciosi)</p>
<ul>
<li>
<p align="justify"><b>BlkTap3 (tapdisk3/qemu-qdisk)</b></p>
</li>
</ul>
<p align="justify">BlkTap3 là phiên bản nâng cấp từ blktap2, hiện chưa được implement trong Xen. BlkTap3 đưa tapdisk process lên hoàn toàn nằm trong user space và connect trực tiếp vào blkfront của DomU.</p>
<p align="justify">Tham khảo <a href="http://wiki.xenproject.org/wiki/Blktap3"> http://wiki.xenproject.org/wiki/Blktap3 </a></p>
<p align="justify"><a href="https://vietstack.files.wordpress.com/2014/11/4.png"><img class=" wp-image-390 aligncenter" src="{{ site.baseurl }}/pictures/4.png?w=300" alt="4" width="617" height="198" /></a></p>
<p align="justify">
<p style="text-align:center;" align="justify">Hình 4. Flow với BlkTap3 Hình 2: Flow BlkBack (nguồn: Citrix Xen Project - Felipe Franciosi)</p>
<p align="justify"><b>3. Virtualization mode và performance - PV Driver trong Xen:</b></p>
<p align="justify"><a href="https://vietstack.files.wordpress.com/2014/11/10.png"><img class="aligncenter  wp-image-407" src="{{ site.baseurl }}/pictures/10.png?w=150" alt="10" width="543" height="304" /></a></p>
<p align="justify">
<p style="text-align:center;" align="justify">Hình 5: Các chế độ virtualization của Xen. (nguồn: xen.org)</p>
<ul>
<li>
<p align="justify">HVM (Full-Virtualization): toàn bộ phần cứng của guest được ảo hóa, guest không nhận biết được là mình đang chạy trên phần cứng ảo hóa, bởi vậy các thao tác đọc ghi ổ cứng, instruction của CPU, network read/write, memory page … đều phải thông qua hypervisor rồi mới đi xuống hạ tầng vật lý bên dưới. điều này gây đến hiệu suất rất chậm.</p>
</li>
<li>
<p align="justify">PV: guest phải được customized để biết được mình đang được chạy trên phần cứng ảo hóa, do vậy, quá trình thao tác sẽ không phải để cho hypervisor chịu nhiều tải nữa. Đây là mode có hiệu năng cao nhất nhưng có yêu cầu khó vì phải customize guest nhiều.</p>
</li>
<li>
<p align="justify">PVHVM: ảo hóa một phần, cho phép guest đọc ghi disk và network cùng các interrupts, timer của CPU thông qua interface của PV driver. Các thông số khác như emulated boot, privileges, page tables chạy trên FV mode.</p>
</li>
<li>
<p align="justify">PVH: là PVHVM ảo hóa thêm motherboard và legacy boot, tăng cường hiệu năng cho guest.</p>
</li>
</ul>
<ul>
<li>
<p align="justify">PV driver: driver của Xen do Citrix phát triển cài trên Dom U, cho phép Dom U hiểu rằng mình đang được ảo hóa (PV mode) và có thể communicate với Dom 0 cùng các thành phần khác của Xen.</p>
</li>
<li>
<p align="justify">Xen Store: Lưu trữ toàn bộ các thông tin bao gồm thông tin về bộ nhớ, hiện trạng của event channel giữa Dom 0 và Dom U. Thường lưu ở local/domain/device/vif.</p>
<p align="justify">Các máy ảo chạy ở chế độ HVM thường có hiệu suất rất chậm và khiến cho Dom 0 phải chịu tải rất lớn (trong trường hợp tồi nhất, máy ảo HVM có thể chiếm mất 50% CPU khiến hệ thống quá tải). Các storage và network card ảo (IDE và Realtek 8139) chạy trên HVM mode được cung cấp cũng có hiệu năng chậm. Ngoài ra, một số tính năng khác của Hypervisor sẽ không được tận dụng như live migration, live snapshot. Bởi vậy, Citrix khuyến khích các máy ảo DomU cài thêm một plugin bên trong máy ảo để chuyển đổi sang chế độ PV hoặc PVHVM giúp tăng hiệu năng hệ thống.</p>
<p align="justify">Mô hình tổng quan của Xen PV driver trên Windows</p>
</li>
</ul>
<p><a href="https://vietstack.files.wordpress.com/2014/11/5.png"><img class=" wp-image-391 aligncenter" src="{{ site.baseurl }}/pictures/5.png?w=300" alt="5" width="626" height="275" /></a></p>
<p>&nbsp;</p>
<p style="text-align:center;">Hình 6. Xen PV Driver trên Windows (nguồn: xen.org)</p>
<p style="padding-left:30px;" align="justify">PV driver trên Xen 6.1</p>
<p style="padding-left:30px;" align="justify"><a href="https://vietstack.files.wordpress.com/2014/11/6.png"><img class=" wp-image-392 aligncenter" src="{{ site.baseurl }}/pictures/6.png?w=300" alt="6" width="627" height="373" /></a></p>
<p style="padding-left:30px;" align="justify">
<p style="padding-left:30px;text-align:center;" align="justify">Hình 7. Kiến trúc PV Driver trên Xen Server 6.1 (nguồn: xen.org)</p>
<ul>
<li>
<p align="justify">Event channel giao tiếp giữa các Dom.</p>
</li>
</ul>
<p><a href="https://vietstack.files.wordpress.com/2014/11/7.png"><img class=" wp-image-393 aligncenter" src="{{ site.baseurl }}/pictures/7.png?w=300" alt="7" width="513" height="324" /></a></p>
<p>&nbsp;</p>
<p style="text-align:center;">Hình 8. Event Channel trong Xen (nguồn: xen.org)</p>
<ul>
<li>
<p align="justify">Xend/XAPI</p>
</li>
</ul>
<p><a href="https://vietstack.files.wordpress.com/2014/11/8.png"><img class=" wp-image-394 aligncenter" src="{{ site.baseurl }}/pictures/8.png?w=300" alt="8" width="509" height="289" /></a></p>
<p>&nbsp;</p>
<p style="text-align:center;">Hình 9. Xend trong Xen hypervisor (nguồn: xen.org)</p>
<p style="padding-left:30px;" align="justify">Daemon (viết bằng python) nắm nhiệm vụ quản lý chung cho toàn hệ thống Xen, giao tiếp trực tiếp với Xen Hypervisor thông qua thư viện C libxenctrl. Toàn bộ các giao tiếp giữa Xend thông qua giao thức XML RPC và sử dụng các CLI như xm hoặc xe.</p>
<ul>
<li>
<p align="justify">libxenctrl</p>
<p align="justify">Thư viện C giúp Xend có thể giao tiếp với hypervisor trong Dom 0 thông qua một driver đặc biệt là privcmd.</p>
</li>
</ul>
<p><a href="https://vietstack.files.wordpress.com/2014/11/9.png"><img class=" wp-image-395 aligncenter" src="{{ site.baseurl }}/pictures/9.png?w=300" alt="9" width="500" height="285" /></a></p>
<p>&nbsp;</p>
<p style="text-align:center;">Hình 10. Thư viện libxenctrl (nguồn: xen.org)</p>
<ul>
<li>
<p align="justify">Xen virtual firmware</p>
<p align="justify">Là một virtual bios được đính kèm với mỗi Dom U chạy ở chế độ HVM (Full-virtualization) để bảo đảm rằng OS cài trên guest có thể nhận được các chỉ dẫn start-up từ môi trường Xen xung quanh. Được OpenStack và CloudStack sử dụng để truyền các parameter cấu hình cho Linux VM như host name, IP...</p>
</li>
</ul>
<p>Trên đây là các vấn đề cơ bản nhất về Xen Server cùng các thành phần bên trong module Storage của Xen. Thời gian tới, nhóm sẽ tiếp tục viết và cung cấp thêm các kiến thức về module Network và Resource Monitoring của Xen.</p>
<p>&nbsp;</p>
<p>VietStack Team.</p>
<p>&nbsp;</p>
