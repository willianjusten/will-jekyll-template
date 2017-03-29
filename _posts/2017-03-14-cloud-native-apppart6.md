---
layout: post
title: "[Cloud Native App][Part6]"
date: 2017-03-14 23:36:59.000000000 +07:00
type: post
published: true
status: publish
tags:
- Devops
- Native App
categories:
- Tech
- News
meta:
  _wpcom_is_markdown: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '2860152358'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>Trong nội dung bài viết này, ta sẽ cùng nhau tiếp tục phần 5 trong việc thảo luận qua về linux container. Tôi sẽ chỉ giới hạn nội dung bài viết xoay quanh Linux container.</p>
<p>Ta sẽ tổng kết vấn đề này dưới góc nhìn toàn cảnh của việc hình thành và sử dụng linux container. Có rất nhiều thông tin về topic này, nhiều quá đến nỗi làm người đọc bị loạn mà quên đi mất việc kết nối các thành phần tạo nên bức tranh toàn cảnh về linux container. Ta sẽ tóm gọn nó qua 3 lớp:</p>
<ul>
<li>Features của linux kernel hỗ trợ tạo nên container.</li>
<li>Một layer đặc biệt hay còn gọi là runtime sử dụng các features trên.</li>
<li>Lớp trên cùng - thân thiện với người dùng chính là một wrapper của runtime được add thêm một số công cụ và một số features, ví dụ: Docker chẳng hạn:)</li>
</ul>
<p>a. Linux container được hình thành từ 2 features chính của Linux Kernel, đó chính là Linux Namespaces và Control groups (cgroup). Tóm lược lại, nhiệm vụ chính của namespace chính là “isolate” và “virtualize” các system resouces còn cgroup chính là “tính toán” và “giới hạn” việc sử dụng của các isolated, virtualized system resouces mà namespace thực hiện. Các bạn có thể tìm hiểu rất nhiều thông tin về 2 features này trên Internet.</p>
<p>b. Vậy khi có các features rồi, runtime sẽ như thế nào?</p>
<p>Runtime sẽ sử dụng các features trên của Linux kernel để quản lý các linux containers. Ta sẽ tổng kết nhanh về một số runtime cho linux container.</p>
<ul>
<li>runC: Được hình thành bởi Open Container Initiative (OCI). Nó là một runtime được chuẩn hóa được sử dụng bởi Docker.</li>
<li>liblxc: Là runtime được sử dụng bởi LXC và LXD. Cách đây 2 năm thì Docker cũng dùng nó nhưng giờ đã bị deprecated và thay vào đó là cặp bài trùng libcontainer+runC.</li>
<li>rkt+systemd+nspawn: Được sử dụng như là runtime của rkt. “rkt” được sử dụng đôi lúc hơi “cẩu thả” một chút khi nó vừa được dùng để ám chỉ runtime cũng như là container manager.</li>
</ul>
<p>c. OK, cái ta cần hiện giờ chính là một wrapper của các runtime trên hay còn gọi là container manager.</p>
<p>Các wrapper của runtime cần phải được add thêm các tool cũng như features, e.g. networking, volume để quản lý container. Ngoài ra nó cũng cần thiết phải thân thiện với người dùng vì mục đích của các container manager này chính là cung cấp một API cho người dùng để thực hiện các thao tác tới container.</p>
<ul>
<li>LXC: Là một container manager được sponsor bởi Canonical. Nó sử dụng liblxc làm runtime và được support tới năm 2019.</li>
<li>
<p>LXD: Là một phiên bản upgrade của LXC. Nó cũng dùng liblxc làm runtime. Tuy nhiên nó khác với các container manager khác là nó boots một full linux system ở trong một container (tức là ta sẽ thấy “init” process chạy bên trong container). Nếu đứng tại góc nhìn này thì một LXD container khá là giống một linux system.</p>
</li>
<li>
<p>Rkt: Là một sản phẩm của CoreOS. Bản thân Rkt cũng support các image của Docker</p>
</li>
<li>
<p>Docker: Ông kẹ của container manager, một container manager mạnh nhất trong khoảng 1 năm trở lại đây. Các bạn có thể tìm vô số tài liệu về Docker trên Internet.</p>
</li>
<li>
<p>OCID: Một sự kết hợp của K8s và Redhat nhằm mục đích thay thế Docker.</p>
</li>
</ul>
<p>&nbsp;</p>
<p>14/3/2017<br />
VietStack team</p>
