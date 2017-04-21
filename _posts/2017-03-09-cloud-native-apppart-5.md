---
layout: post
title: "[Cloud Native App][Part 5]"
date: 2017-03-09 02:41:28.000000000 +07:00
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
  _publicize_job_id: '2649627340'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p><strong>CONTAINER</strong></p>
<p>Như section 1 đã đề cập đến cấu trúc microservice trong việc phát triển các cloud native app, section 2 ta sẽ thảo luận về việc làm thế nào để triển khai, quản lý các cloud native app này dựa trên nền tảng công nghệ container. Trong nội dung của phần 2 này, khi nhắc đến container, ta mặc định ám chỉ đến Linux Container (LXC).</p>
<p>Các component trong cấu trúc microservice có thể được phát triển, đóng góp và vận chuyển (deliver) thông qua rất nhiều tool. Một trong những giải pháp hiện nay đang nhận được rất nhiều sự quan tâm cũng như phù hợp với môi trường cloud chính là việc dùng Linux container để thực thi cấu trúc microservice. Một điểm khác biệt mấu chốt giữa việc dùng Linux Container và các giải pháp ảo hóa chính là các container sẽ chia sẻ một single OS trong khi đó các máy ảo trong ảo hóa sẽ cần phải có một OS riêng chạy trên nền của hypervisor của máy chủ (host machine). Điều đó đem lại việc khởi động cũng như xóa các container nhanh hơn rất nhiều (vì container không cần phải boot up một OS riêng cho chính nó) so với máy ảo (máy ảo cần thời gian để boot up các OS riêng của nó). Tuy nhiên về mặt lý thuyết thì nếu ta break được một container và modify Linex kernel thì ta có thể kiểm soát được các containers còn lại. Điều này không xuất hiện trong ảo hóa.</p>
<p>Có rất nhiều thông tin viết về sự ưu việt của container so với ảo hóa, tuy nhiên các bạn nên thực sự cẩn thận với rất nhiều bài viết trên Internet để tránh nhầm tưởng rằng, container là một thứ gì đó thực sự tốt đẹp, vượt trội so với ảo hóa. Điều nổi bật duy nhất khi nhắc đến container để so sánh với ảo hóa chính là việc tiêu tốn RAM khá ít. Điều này rất dễ hiểu khi với ảo hóa, các máy ảo phải boost OS riêng cho nó nhưng với container (đặc biệt là với các “application” container thông qua việc sử dụng các container manager như Docker) thì không. Ngoài ra bản thân container có một vài bất cập mà nổi cộm chính là việc live-migration. Live-migration trong container có downtime (chính xác hơn là freeze time) khá lớn so với ảo hóa (e.g. KVM). Ví dụ KVM đã support live-migration với đơn vị tính đến hàng năm trời, tất nhiên là vẫn sẽ có high CPU trong quá trình live migration nhưng downtime thì dường như không có (thực chất là có nhưng do freeze time quá ngắn, do đó việc nhận thấy downtime là hoàn toàn chấp nhận được). Ở mặt đối lập thì live-migration trong containers gặp vấn đề về freeze time khá lớn vì về mặt bản chất, live-migration của container dựa trên cơ chế snapshot. Chưa kể đến vấn đề về port-forwarding cho container khi ta phải thực hiện nó bằng tay cho container sau khi đã live-migrate sang destination host.</p>
<p>[To be continued ...]</p>
<p>VietStack team</p>
