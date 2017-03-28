---
title: Lệnh đổi mật khẩu cho tài khoản trong OpenStack
comments: true
date: 2014-02-15 8:21:35
tags:
- news
categories:
- news
- vietstack
---
Trong khi cái đặt OpenStack theo cách thủ công, devstack, RDO ... thường thường sẽ có ít nhất 2 tài khoản được tạo ra, đó là admin và demo.  Và tùy vào hướng dẫn mà tác giả  hoặc kịch bản sẽ khai báo mật khẩu trước hoặc sinh ra mật khẩu ngẫu nhiên. Do vậy muốn thay đổi mật khẩu ta có thể sử dụng lênh sau: (tài khoản này được tạo khi cài keystone)<!--more-->

keystone user-password-update &lt;ten_user&gt;

Ví dụ: đổi password cho tài khoản demo

<em>keystone user-password-update demo</em>

Sau đó tại cửa sổ ssh sẽ yêu cầu nhập lại password 2 lần để xác nhận. Sau khi đổi thành công hãy thử đăng nhập vào dashboard qua trình duyệt.

Lưu ý rằng, sau khi thay đổi thì cần sửa lại các file khai báo đường dẫn với mật khẩu mới, bởi vì lúc chạy lệnh source để load biến môi trường thì mật khẩu mới sẽ được thay đổi, lúc này mới có thể dùng các lệnh của OpenStack.

- Ngoài ra còn lệnh <em>keystone user-password-update --pass &lt;password&gt; &lt;user id&gt; </em> để đổi password bằng 1 dòng.

Cũng có thể sử dụng dashboard để thay đổi password - với điều kiện kích hoạt chức năng change password trên dashboard.

Chúc các bạn vui !
