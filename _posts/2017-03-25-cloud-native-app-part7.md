---
layout: post
title: Cloud Native App[Part7]
date: 2017-03-25 17:42
tags:
- Devops
- Native App
categories:
- Tech
- News
---
Nếu theo dõi từ đầu series thì ta có thể dễ dàng thấy được một hướng đi rõ rệt trong việc thiết kế/triển khai các cloud app dưới dạng micro-service và được packaged trong container. Đây là xu hướng được định nghĩa bởi các case studies trong telco SDN/NFV - một trong những lĩnh vực đòi hỏi sự chuyển dịch lên cloud mạnh mẽ nhất trong giai đoạn hiện nay.

Vậy, câu hỏi đặt ra là ta phải thiết kế các app theo cấu trúc micro-service và container như thế nào? Có rất nhiều tranh cãi xung quanh việc tìm ra câu trả lời cho vấn đề này, trong phạm vi bai viết này, tôi xin phép được đưa ra một số lưu ý nhỏ để chúng ta có thể xem xét, thảo luận:

a/ Với việc “tái” cấu trúc một legacy app hay thiết kế một cloud native app mới, các microversice phải phản ánh rõ rệt business logic của app đó. Ta có thể ví dụ thế này: Một app A sẽ được thiết kế với các components cụ thể như:

<ul>
<li>Component1 sẽ là GUI</li>
<li>Component2 sẽ là manager nơi nhận các request từ GUI và thực hiện các thao tác tiếp theo.</li>
<li>Component3,4,5, etc. sẽ là các components nhận các request từ manager và thực hiện các chức năng của nó.</li>
<li>Alarm/alert manager: Xử lý các thao tác liên quan đến alarm/alert.</li>
</ul>

Với mỗi một component như trên thì tùy thuộc vào từng nhu cầu mà ta có thể phân tách nó theo các logic nhỏ hơn nữa, e.g. component2 sẽ chứa các sub-component 2.1, 2.2, etc. Do đó tùy thuộc vào từng thiết kế mà ta có thể định nghĩa microservice, e.g. bản thân component2 có thể là 1 micro-service hoặc mỗi một sub-component trong component2 cũng có thể là một micro-service. Tuy nhiên, nếu như các sub-component giao tiếp với nhau với tấn suất lớn, hiệu năng sẽ giảm sút nếu như ta phân tách các sub-component đó riêng biệt. Chính vì vậy, sự lựa chọn cho bản thân component2 là một micro-service sẽ đem đến hiệu quả tốt hơn.

b/ Một microservice instance nên là một container

Một công thức map từ microservice sang container chính là 1:1, một container package một microservice instance. Việc mapping này sẽ tránh sự phức tạp trong việc quản lý các container cũng như các micro-service vì nếu việc mapping được thực hiện với tỉ lệ cao hơn, vô hình chung ta đã tạo ra nhiều lớp giữa container và micro-service. Quản trị sự giao tiếp giữa thông qua các lớp này không phải là một việc dễ dàng.

Một định nghĩa khá hay xuất phát từ VNF nhưng mình nghĩ ta cũng có thể áp dụng cho các cloud sau này: Một cấu trúc 3 lớp bao gồm: Cloud App =&gt; Vms =&gt; Container. Các micro-service sẽ được package trong các container. Lúc này thì việc quản trị các backend phục vụ cho cloud app sẽ bao gồm: Quản trị infrastructure, vms và container.

c/ Kích cỡ và sự tái cấu trúc tổ chức

Một micro-service nên được nghiên cứu và phát triển bởi một team. Kích cỡ của team thì phụ thuộc vào từng chức năng của micro service. Mình thì thấy (theo kinh nghiệm cá nhân), một team rơi vào tầm khoảng 8-10 người là hợp lý, trong đó có một scrum master, một PO.

d/ Triển khai các cloud native app trong container:

Như ta có nhắc đến phía trên về mô hình liên quan mapping 1:1 giữa container và microservice chính là Cloud App =&gt; Vms =&gt; Container. Đây là mô hình có khả năng hỗ trợ rât nhiều phần cứng khi các container sẽ được chạy trên Vms, không phụ thuộc quá nhiều vào phần cứng. Tuy nhiên trong thực tế thì ta hoàn toàn có thể sử dụng baremetal, do đó ta sẽ có 2 cách triển khai dưới đây:

<ul>
<li>Ta triển khai các container based app trong môi trường native cloud (định nghĩa native cloud)</li>
<li>Ta triển khai các container based app trong môi trường hypervisor cloud (định nghĩa hypervisor cloud)
Nhưng các bạn luôn luôn phải lưu ý rằng, đứng dưới vai trò là nhà cung cấp sản phẩm cloud app, khách hàng sẽ là người chọn hardware chứ không phải các bạn.</li>
</ul>

Ngoài ra còn có rất rất nhiều xoay quanh vấn đề này mà ta cần phải quan tâm trong việc quản trị cấu trúc 3 lớp như đã đề cập ở trên. Các bạn có thể nhận thấy việc quản trị các vms đã là một công việc rất vất vả, bây giờ ta phải quản trị thêm các containers lại càng phức tạp hơn. Trong các bài viết tiếp theo, vietstack sẽ cố gắng đưa ra một số vấn đề liên quan đến sự thống nhất trong việc quản trị 3 lớp này để phù hợp với các yêu cầu của các app.

25/3/2017

VietStack team
