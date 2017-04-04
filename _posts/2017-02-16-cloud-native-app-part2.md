---
layout: post
title: Cloud Native App [Part2]
date: 2017-02-16 00:48:27.000000000 +07:00
type: post
published: true
status: publish
tags:
- Devops
- Native App
- TOSCA
- CI/CD
categories:
- Tech
- News
meta:
  _wpcom_is_markdown: '1'
  _oembed_c71dd7386bed600fdd2c7de190f96051: "{{unknown}}"
  _oembed_5332dfd2913cd60636e972e8b0b8e995: "{{unknown}}"
  _oembed_3cc6ac1da32f17e58b385fbe1880414b: "{{unknown}}"
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '1892334970'
  _oembed_6ec53f09e847f64118ce338ea135fb4c: "{{unknown}}"
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>Tiếp theo phần 1, link dưới đây:</p>
<p>https://vietstack.wordpress.com/2017/02/13/cloud-native-app-in-cloud-part-1/</p>
<p>Trong phần 2 ta sẽ thảo luận với các keywords khác của CNA:</p>
<p><strong>Enviroment Parity</strong></p>
<p>Trong giai đoạn hiện nay của việc phát triển các app, CI/CD đóng vai trò không thể thiếu để rút ngắn quá trình testing, packaging, kiểm tra sự đồng bộ hóa giữa các components trong một app, etc. Tuy nhiên, sẽ rất nguy hiểm nếu hệ thống CI/CD khác với hệ thống thực trong production.</p>
<p>Điều này đồng nghĩa với việc, trong quá trình phát triển app, CI/CD bắt buộc phải được thiết kế tương tự như hệ thống thực. Nhưng mục tiêu này lại gặp phải một vấn đề nan giải chính là, làm thế nào để đảm bảo cho app chạy trên nhiều môi trường cloud? Điều này đem đến gánh nặng về việc triển khai các CI/CD cho các môi trường cloud để test các app.</p>
<p>Ta có thể hình dung thế này, ta phải thiết kế các app chạy trên Google Cloud, Amazon, Vcloud, OpenStack cloud, etc. Rồi chưa kể đến các phiên bản của từng môi trường cloud (e.g. OpenStack Mitaka, OpenStack Newton, etc.), mỗi một môi trường như vậy ta cần phải có một hệ thống thật để test các app. Qua đó ta thấy, sẽ vô cùng tốn kém nguồn lực (server, storage, etc.) để đầu tư cho vấn đề này.</p>
<p><strong>Configuration management (CM)</strong></p>
<p>Dữ liệu của CM phải được tách rời với code base, điều này đem lại thuận lợi cho việc triển khai các instance của CNA trên nhiều môi trường cloud khác nhau.</p>
<p>Các CNA sử dụng dữ liệu CM như những dữ liệu ngoài (external data), và các dữ liệu ngoài này được các app đọc on-the-fly. Điều đó đồng nghĩa với việc bản thân CM là một app chạy độc lập với CNA, e.g. Redis. Với việc ứng dụng CM, ta sẽ mang đến khả năng linh hoạt cho việc quản lý config của các app. Yếu tố linh hoạt ở đây chính là việc các app có thể re-load các config tại runtime mà không gây ra hậu quả.</p>
<p>Để ứng dụng CM, ta cần phải sử dụng một số template để định nghĩa các model của configuration. YANG và TOSCA là 2 templates phổ biến hiện nay. OpenDayLight là project ứng dụng YANG cho việc định nghĩa các network configuration của các ứng dụng trong khi TOSCA vô cùng phổ biến trong NFV. Một ví dụ cụ thể dưới đây cho việc sử dụng CM (e.g Redis) với YANG như sau:</p>
<ul>
<li>Ta dùng YANG để định nghĩa các model của network configuration.</li>
<li>
<p>Khởi tạo các model thành các file XML/Json, etc..</p>
</li>
<li>
<p>Transfer và Serialize XML/Json file vào trong Redis sử dụng các protocols, e.g. NETCONF.</p>
</li>
<li>
<p>Các ứng dụng đọc các data của nó từ redis và thực thi các tác vụ liên quan đến các data đó.</p>
</li>
</ul>
<p>Quá trình CM model được serialized và lưu trong Redis sẽ thuận tiện cho việc rolling back khi ta upgrade fails vì các new version và old version đều có thể sử dụng CM model.</p>
<p><strong>Stateless</strong></p>
<p>State của thông tin mà CNA truyền tải trong quá trình transaction cần phải được bảo toàn và nằm ngoài cấu trúc của CNA như là external data. Điều này đồng nghĩa với việc, khi CNA được triển khai trên cloud (nhiều CNA instance, tập trung/phân tán trên nhiều môi trường cloud) thì thông tin được truyền phải được bảo toàn trong các session giao tiếp giữa các instance của CNA. Nói ngắn gọn, trong cùng một session của việc trao đổi thông tin, các instances của cùng một app đều có khả năng xử lý thông tin đó.</p>
<p>Ta lấy ví dụ thế này, Skype là một ứng dụng sử dụng SIP protocol cho việc bảo toàn thông tin thông qua Internet. Tuy nhiên nếu ta phát triển một CNA nào đó sử dụng VoIP (như Skype) với nhiều instance nằm phân tán trên nhiều môi trường cloud thì ta phải đảm tất cả các CNA instances đó đều dó khả năng xử lý thông tin. Ngoai ra, việc ứng dụng SIP trong môi trường cloud cho CNA là một thách thức không nhỏ. Cá nhân tôi không nắm sâu về SIP, các bạn có thể coi đây là một câu hỏi mở mà các nhà phát triển phần mềm liên quan đến VoIP cần phải xử lý.</p>
<p>... to be continued</p>
<p>VietStack team</p>
