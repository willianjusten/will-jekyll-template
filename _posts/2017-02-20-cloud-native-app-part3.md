---
layout: post
title: Cloud Native App [Part3]
date: 2017-02-20 21:30
tags:
- Devops
- Native App
categories:
- Tech
- News
---

Tiếp theo phần 2, phần 3 sẽ cung cấp cho các bạn một số cái nhìn về những keyword khác trong yêu cầu về cấu trúc microservice của cloud native app:

SCALING UP HORIZONTALLY

Các instance của một app sẽ phải có khả năng được thêm vào hoặc delete một cách linh động trên môi trường (phân tán) cloud. Việc start up/delete một instance phải được hoàn thành trong thời gian có thể chấp nhận được đối với từng app (e.g. các dịch vụ viễn thông rất nhiều cái chỉ chấp nhận delay khoảng 500ms). Tính chất horizontal scaling cũng là một ý nhỏ trong khái niệm “stateless” được trình bày trong phần 2.

Tuy nhiên, một vấn đề ở đây là khi ta start up một instance mới, instance này phải cần thời gian để load các configs từ CM, điều này sẽ làm chậm quá trình thực thi dịch vụ của instance mới này. Một trong những giải pháp là các dữ liệu của CM sẽ được “đóng gói” vào trong image của máy ảo hoặc image của container mà instance mới này dùng để booted up (vấn đề về container ta sẽ thảo luận trong các phần tiếp theo). Cách này sẽ làm giảm thời gian mà instance mới load CM data lúc startup. Điều này đồng nghĩa với việc nếu CM data có thay đổi thì các image mới cũng cần phải được tạo ra để phục vụ quá trình startup của các instance mới.


HARDENING SECURITY

Hardening security luôn quan trọng trong việc tối ưu hệ thống. Với CNA, các app được packaged và triển khai cũng với image (thông thường thì CI/CD sẽ tạo ra các image (e.g. iso file) đã chứa các package của app nằm trong đó) một số các tính năng cơ bản như user authentication/authorization hay các dịch vụ ngoài khác như SSH, HA, etc. cũng cần phải được đảm bảo. Lúc này tùy theo từng yêu cầu của các app mà image của các app sẽ được tạo ra với các yêu cầu cụ thể về hardening security.

Ngoài ra, nếu CNA chỉ đơn thuần là source code, được packaged riêng, không tích hợp trong image, thi yêu cầu hardening security được chuyển qua cho PaaS. Lúc này, các PaaS phải đảm bảo các yêu cầu trên cho CNA.

BACKUP AND RESTORE

Nếu một ứng dụng cloud đảm bảo tính stateless thì bản thân ứng dụng đó không cần thiết backup và restore. Như ta đã thảo luận trong phần 2 về stateless thì một external database là cần thiết cho việc bảo toàn dữ liệu trong quá trình transaction diễn ra. Nếu một instance của ứng dụng bị delete, một instance khác được start up, tiếp tục thực hiện các transaction session mà instance bị delete lúc trước đang thực hiện dở. Do đó ta không cần một quá trình backup/restore riêng biệt.

Tuy nhiên, với statefull app thì các backup và restore cần phải được lưu ý. Một database cần phải có backup và restore riêng biệt (thực ra là một database riêng biệt). Database này sẽ lưu các giá trị database “cần thiết và quan trọng” - cụm từ này thực sự nhạy cảm vì nó phụ thuộc vào tính chất của từng thông tin trong db đối với app. Các instance của các app sẽ có một cache lưu các thông tin được tải từ database ngoài (external db) ở trên. Nếu có bất cứ sự thay đổi nào từ external db, các cache sẽ tự động cập nhật và update nó.

VietStack team
