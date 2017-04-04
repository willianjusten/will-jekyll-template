---
layout: post
title: Hướng dẫn cài đặt OpenStack Havana theo devstack
date: 2014-02-14 17:41:37.000000000 +07:00
type: post
published: true
status: publish
categories:
- Hướng dẫn cài đặt
tags:
- devstack
- openstack
- vietsi
- vietstack
meta:
  _edit_last: '53965886'
  _publicize_pending: '1'
  _oembed_168b07b38995d9188e6aa728281f2182: "{{unknown}}"
  _oembed_377e9ce90c9bb9119c574df7cf6c7317: "{{unknown}}"
  _oembed_9ccb1fdf1b21c9317c94a521718b654b: "{{unknown}}"
  _oembed_ef4d81358ce2d1bc831814762467be1b: "{{unknown}}"
  _oembed_bec5ffb098286842352a24ba21983728: "{{unknown}}"
  _oembed_ba875e1c7b8a659ab52a11214e97b274: "{{unknown}}"
  _oembed_f1f9b9511cb686566752d02638a7ff06: "{{unknown}}"
  _oembed_7aeb083a3fe47cb8bc84f21365cf3db1: "{{unknown}}"
  _oembed_e0eff851394cdf2284821d96056b1d81: "{{unknown}}"
author:
  login: jackvietsi
  email: jackvietsi@gmail.com
  display_name: jackvietsi
  first_name: ''
  last_name: ''
---
<p>Hướng dẫn cài đặt Openstack - Hanana theo kịch bản của devstack, áp dụng với mô hình All In One (tất cả các thành phần của Openstack trong 1 máy chủ).</p>
<p>Giới thiệu:<!--more--><br />
Chuẩn bị: Dựng máy ảo Ubuntu để cài đặt Openstack<br />
Bước 1: Kiểm tra cấu hình Ubuntu trước khi cài<br />
Bước 2: Tạo tài khoản stack và phân quyền<br />
Bước 3: Tải devstack từ github<br />
Bước 4: Khai báo các thông số cho file localrc để cài đặt openstack<br />
Bước 5: Thực thi file stack.sh<br />
Bước 6: Truy cập vào web và đăng nhập để dùng thử</p>
<p>Bước 1: Cài đặt ubuntu server 12.04 trên vmware workstation, đặt IP và kiểm tra kết nối ra internet.</p>
<p>Bước 2: Tạo tài khoản stack và phân quyền<br />
- Tạo tài khoản stack:<br />
$ adduser stack</p>
<p>- Cấp quyền cho user stack để khi thực thi sudo không cần hỏi mật khẩu.<br />
$ echo "stack ALL=(ALL) NOPASSWD: ALL" &gt;&gt; /etc/sudoers</p>
<p>Bước 3: Chuyển sang tài khoản root, tải gói git và tải devstack từ github.<br />
- Từ tài khoản root chuyển sang tài khoản stack bằng lệnh<br />
$ su - stack</p>
<p>- Tải gói git bằng lệnh:<br />
$ sudo apt-get install git -y</p>
<p>- Tải devstack từ github bằng lệnh:<br />
git clone <a href="https://www.facebook.com/l.php?u=https%3A%2F%2Fgithub.com%2Fopenstack-dev%2Fdevstack.git&amp;h=qAQF8cv-w&amp;enc=AZNXGeBl-Ng8CFMuuq-mh-myf1LSHSwxHEpXs0U4WG34zX2zks9QPHqrHaz1q50D6bnOR2y-brzYXrG5YNzZU5F8qMlkF8kv38fg7rYiwww-y0TQ1lmsvbWH_aw2ZweOaDNH5EaLmUyEeU40RrItgphGl1y2OlC-EZJOMdDqI5JwwQ&amp;s=1" target="_blank" rel="nofollow">https://github.com/openstack-dev/devstack.git</a></p>
<p>- Di chuyển vào thư mục devstack<br />
cd devstack</p>
<p>Bước 4: Copy file localrc từ /devstack/samples/localrc ra thư mục hiện tại và sửa đổi file localrc cho phù hợp.</p>
<p>- Copy file localrc bằng lệnh<br />
$ cp samples/localrc localrc</p>
<p>- Mở file localrc vừa tạo bằng vi hoặc công cụ mà bạn quen dùng.<br />
$ vi localrc</p>
<p>- Sửa file localrc: xóa hoặc comment từ dòng 26 đến dòng 29 và thêm nội dung dưới vào</p>
<p># KHAI BAO CAC THONG SO<br />
HOST_IP=192.168.1.21<br />
FLOATING_RANGE=192.168.10.0/24<br />
FIXED_RANGE=192.168.70.0/24<br />
FIXED_NETWORK_SIZE=256<br />
FLAT_INTERFACE=eth0<br />
ADMIN_PASSWORD=passw0rd<br />
MYSQL_PASSWORD=passw0rd<br />
RABBIT_PASSWORD=passw0rd<br />
SERVICE_PASSWORD=passw0rd<br />
SERVICE_TOKEN=admintoken</p>
<p>Bước 5: Sau khi sửa xong, lưu file localrc lại và thực thi file stack.sh<br />
$ ./stack.sh</p>
<p>Bước 6:<br />
Chờ đợi quá trình cài đặt, file stack.sh sẽ thực hiện các bước cần thiết thể tải các gói cho openstack.</p>
<p>Bước 7: Nhào vô vào dashboard để dùng thử openstack.<br />
http://Ip_may_ubuntuserver/</p>
<p>Chú ý: các thông số về IP cần áp dụng đúng với mô hình mạng của bạn. Chi tiết hơn xem tại devstack.org</p>
<p>Link down tài liệu:<br />
<a href="https://dl.dropboxusercontent.com/u/76793585/Huong%20dan%20cai%20dat%20Openstack%20-%20havana%20theo%20devstack_v1.pdf" target="_blank" rel="nofollow">https://dl.dropboxusercontent.com/u/76793585/Huong%20dan%20cai%20dat%20Openstack%20-%20havana%20theo%20devstack_v1.pdf</a></p>
