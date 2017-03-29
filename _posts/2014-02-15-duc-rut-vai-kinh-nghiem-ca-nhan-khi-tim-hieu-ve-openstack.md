---
layout: post
title: Đúc rút vài kinh nghiệm cá nhân khi tìm hiểu về OpenStack
date: 2014-02-15 09:33:49.000000000 +07:00
type: post
published: true
status: publish
categories:
- Chia sẻ kinh nghiệm
tags: []
meta:
  _edit_last: '53965886'
  _publicize_pending: '1'
  publicize_facebook_url: https://facebook.com/1382611462008108
  _wpas_done_6303274: '1'
  _publicize_done_external: a:1:{s:8:"facebook";a:1:{i:100007778017926;b:1;}}
  publicize_twitter_user: VietStack
  publicize_twitter_url: http://t.co/eWLkly3CJS
  _wpas_done_6303278: '1'
  _wpas_skip_6303274: '1'
  _wpas_skip_6303278: '1'
author:
  login: jackvietsi
  email: jackvietsi@gmail.com
  display_name: jackvietsi
  first_name: ''
  last_name: ''
---
<p>Tốc ký bài viết này để chia sẻ với các bạn đang và đã tìm hiểu về OpenStack, đây là kinh nghiệm cá nhân của tôi trong suốt thời gian tìm hiểu về OpenStack nói riêng và các vấn đề trong lĩnh vực nói chung. Trước khi chia sẻ xin gửi các bạn một câu nói hay và ý nghĩa mà tôi được nghe (nhớ tên người nói nhưng không muốn nhắc ra :) <!--more--></p>
<blockquote><p>Điều quan trọng không phải bạn là người đầu tiên làm được việc đó, mà quan trọng là bạn là người làm tốt nhất việc đó.</p></blockquote>
<p>Kết quả của những kinh nghiệm này có thể sẽ giúp các bạn đi sau rút ngắn được thời gian và công sức, hi vọng nhận được chia sẻ của các bạn để chúng ta cùng tìm hiểu.</p>
<p>Để tìm hiểu về OpenStack, tôi đã cần các điều kiện sau: (tôi sẻ bổ sung các kinh nghiệm này trong tương lai)</p>
<p><em><strong>Đam mê, kiên trì, và tin tưởng (tiên quyết)</strong></em></p>
<ul>
<li>Không có đam mê và sự kiên trì thì không làm được các điều dưới.</li>
<li>Tin tưởng vào việc theo đuổi OpenStack, nó là tiền đề để theo đuổi các lĩnh vực và mảng khác.</li>
</ul>
<p><em><strong>Linux:</strong></em></p>
<ul>
<li>Tìm hiểu và sử dụng được các distro linux (Ubuntu và Centos tôi dùng thường xuyên). Phạm vi tìm hiểu là cách cài đặt, phân quyền người dùng, thưc mục.</li>
<li>Sử dụng các công cụ SSH, WINSCP, Notepaste++ để truy nhập và kiểm soát Linux</li>
<li>Sử dụng vi: các lệnh cơ bản, các phím tắt để thao tác trong VI</li>
<li>Biết cách cài đặt các gói phần mềm, kiểm tra việc cài đặt có thành công hay không.</li>
<li>Tìm hiểu về Iptables</li>
<li>Tìm hiểu về storage, LVM, VG trong Linux.</li>
<li>Biết cách thực thi một script đơn giản trong Linux.</li>
<li>Liên tục cập nhật và tìm hiểu các lệnh cho đến khi hiểu thì thôi</li>
</ul>
<p><strong>Ảo hóa</strong></p>
<ul>
<li>Sử dụng tốt các công cụ ảo hóa như: VMware workstation, Virtual Box.</li>
<li>Tìm hiểu lý thuyết về Ảo hóa, Cloud computing.</li>
<li>Đã từng cài đặt thử và sử dụng các nền tảng áo hóa như: KVM, ESX, Citrix ... Tốt nhất là tìm hiểu sử dụng KVM thành thạo.</li>
</ul>
<p><strong>Network</strong></p>
<ul>
<li>Các khái niệm về IP address, subnetmask, defaul gateway.</li>
<li>Khái niệm VLAN, Routing cơ bản (defaul route, RIP, Static Router )</li>
<li>Biết cách cấu hình trên GNS3</li>
</ul>
<p><strong>Kỹ năng</strong></p>
<ul>
<li>Hỏi người đi trước, lắng nghe góp ý người đi sau.</li>
<li>Đọc kỹ các tài liệu và hiểu nhưng gì mình đọc</li>
<li>Đọc 1 tài liệu về OpenStack  mà bạn đang cần tìm hiểu ít nhất 3 lần.</li>
<li>Nghe ngóng liên tục tin tức về OPENSTACK và các nền tảng khác.</li>
<li>Tìm cách liên lạc với tất cả những người gần bạn để trao đổi và thảo luận.</li>
</ul>
