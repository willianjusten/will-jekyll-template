---
layout: post
title: Cloud Native App [Part2]
date: 2017-02-16 00:48
comments: true
tags:
- Devops
- Native App
- TOSCA
- CI/CD
categories:
- Tech
- News
---
Tiếp theo phần 1, link dưới đây:

https://blog.vietstack.vn/cloud-native-app-part1/

Trong phần 2 ta sẽ thảo luận với các keywords khác của CNA:

<strong>Enviroment Parity</strong>

Trong giai đoạn hiện nay của việc phát triển các app, CI/CD đóng vai trò không thể thiếu để rút ngắn quá trình testing, packaging, kiểm tra sự đồng bộ hóa giữa các components trong một app, etc. Tuy nhiên, sẽ rất nguy hiểm nếu hệ thống CI/CD khác với hệ thống thực trong production.

Điều này đồng nghĩa với việc, trong quá trình phát triển app, CI/CD bắt buộc phải được thiết kế tương tự như hệ thống thực. Nhưng mục tiêu này lại gặp phải một vấn đề nan giải chính là, làm thế nào để đảm bảo cho app chạy trên nhiều môi trường cloud? Điều này đem đến gánh nặng về việc triển khai các CI/CD cho các môi trường cloud để test các app.

Ta có thể hình dung thế này, ta phải thiết kế các app chạy trên Google Cloud, Amazon, Vcloud, OpenStack cloud, etc. Rồi chưa kể đến các phiên bản của từng môi trường cloud (e.g. OpenStack Mitaka, OpenStack Newton, etc.), mỗi một môi trường như vậy ta cần phải có một hệ thống thật để test các app. Qua đó ta thấy, sẽ vô cùng tốn kém nguồn lực (server, storage, etc.) để đầu tư cho vấn đề này.

<strong>Configuration management (CM)</strong>

Dữ liệu của CM phải được tách rời với code base, điều này đem lại thuận lợi cho việc triển khai các instance của CNA trên nhiều môi trường cloud khác nhau.

Các CNA sử dụng dữ liệu CM như những dữ liệu ngoài (external data), và các dữ liệu ngoài này được các app đọc on-the-fly. Điều đó đồng nghĩa với việc bản thân CM là một app chạy độc lập với CNA, e.g. Redis. Với việc ứng dụng CM, ta sẽ mang đến khả năng linh hoạt cho việc quản lý config của các app. Yếu tố linh hoạt ở đây chính là việc các app có thể re-load các config tại runtime mà không gây ra hậu quả.

Để ứng dụng CM, ta cần phải sử dụng một số template để định nghĩa các model của configuration. YANG và TOSCA là 2 templates phổ biến hiện nay. OpenDayLight là project ứng dụng YANG cho việc định nghĩa các network configuration của các ứng dụng trong khi TOSCA vô cùng phổ biến trong NFV. Một ví dụ cụ thể dưới đây cho việc sử dụng CM (e.g Redis) với YANG như sau:

<ul>
<li>Ta dùng YANG để định nghĩa các model của network configuration.</li>
<li>Khởi tạo các model thành các file XML/Json, etc..</li>
<li>Transfer và Serialize XML/Json file vào trong Redis sử dụng các protocols, e.g. NETCONF.</li>
<li>Các ứng dụng đọc các data của nó từ redis và thực thi các tác vụ liên quan đến các data đó.</li>
</ul>

<p>Quá trình CM model được serialized và lưu trong Redis sẽ thuận tiện cho việc rolling back khi ta upgrade fails vì các new version và old version đều có thể sử dụng CM model.

<strong>Stateless</strong>

State của thông tin mà CNA truyền tải trong quá trình transaction cần phải được bảo toàn và nằm ngoài cấu trúc của CNA như là external data. Điều này đồng nghĩa với việc, khi CNA được triển khai trên cloud (nhiều CNA instance, tập trung/phân tán trên nhiều môi trường cloud) thì thông tin được truyền phải được bảo toàn trong các session giao tiếp giữa các instance của CNA. Nói ngắn gọn, trong cùng một session của việc trao đổi thông tin, các instances của cùng một app đều có khả năng xử lý thông tin đó.

Ta lấy ví dụ thế này, Skype là một ứng dụng sử dụng SIP protocol cho việc bảo toàn thông tin thông qua Internet. Tuy nhiên nếu ta phát triển một CNA nào đó sử dụng VoIP (như Skype) với nhiều instance nằm phân tán trên nhiều môi trường cloud thì ta phải đảm tất cả các CNA instances đó đều dó khả năng xử lý thông tin. Ngoai ra, việc ứng dụng SIP trong môi trường cloud cho CNA là một thách thức không nhỏ. Cá nhân tôi không nắm sâu về SIP, các bạn có thể coi đây là một câu hỏi mở mà các nhà phát triển phần mềm liên quan đến VoIP cần phải xử lý.

... to be continued

VietStack team
