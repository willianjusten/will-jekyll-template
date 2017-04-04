---
layout: post
title: Tổng quan về Hybrid Cloud
date: 2015-03-08 11:36:56.000000000 +07:00
type: post
published: true
status: publish
categories:
- Chia sẻ kinh nghiệm
- Hướng dẫn - Kinh Nghiệm
- Tech
tags:
- Hybrid
- Cloud
meta:
  _edit_last: '61498925'
  _publicize_pending: '1'
  geo_public: '0'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<ul>
<li class="western" style="text-align:justify;"><strong>Hybrid Cloud là gì</strong></li>
</ul>
<p class="western">Có rất nhiều ý kiến xung quanh về khái niệm “Hybrid Cloud”. Hybrid Cloud là public cloud sử dụng private cloud? Hybrid Cloud có phải là việc kết hợp on-premise private cloud với off-premise public cloud? Chúng ta có thể thống nhất một câu trả lời đó là: Hybrid Cloud chính là một dạng kết hợp public cloud với private cloud hoặc/và dedicated hosts. Với việc sử dụng Hybrid Cloud, ta có thể lựa chọn các môi trường khác nhau (private hoặc public) để thực hiện các workload (e.g. bao gồm một hoặc nhiều ứng dụng) sao cho việc lựa chọn môi trường phù hợp nhất với các ứng dụng đó.</p>
<ul>
<li class="western"><strong>Mô hình cấu trúc chung của Hybrid Cloud </strong></li>
</ul>
<ol>
<li>Kế thừa cấu trúc ứng dụng của Private Cloud:</li>
</ol>
<p class="western">Trong cấu trúc của Hybrid Cloud, các nguyên tắc về cấu trúc ứng dụng của Private Cloud vẫn được bảo tồn. Hệ thống Physical Servers tại lớp Infrastructure nằm trong Private Cloud vẫn được thiết kế với đầy đủ tính năng cần thiết như HA, Storage Cluster, etc.</p>
<p class="western">     2. Việc tiêu thụ resources của Load</p>
<p class="western">Một trong những ưu điểm của cloud computing chính là người dùng sử dụng nó theo phương pháp on-demand, người dùng sẽ chỉ phải chi trả cho số lượng resources được dùng theo đơn vị thời gian. Tuy nhiên nếu người dùng sử dụng các app/workload quy mô lớn (tiêu thụ nhiều resource) trên public cloud mà không có các dedicated resource (trong trường hợp không kiểm soát được resources cần dùng cho các app/workload) thì việc người dùng phải chi trả nhiều hơn so với số lượng resources được tiêu thụ là hoàn toàn xảy ra. Việc thiếu kiểm soát các resources một phần là do sự thay đổi liên tục các resources cần tiêu thụ (phục vụ cho nhu cầu sử dụng các app/workload lớn), phần khác có thể tính đến việc downtime hay delay của network (vì một lý do nào đó) làm cho quá trình cung cấp resources bị gián đoạn hoặc việc bảo trì, nâng cấp các resources (chưa kể đến một số tác vụ khác của các nhà cung cấp nhưng vẫn được tính vào hóa đơn của người dùng).</p>
<p class="western">Bên cạnh đó, việc kiểm soát số lượng resources tiêu thụ được thực hiện một cách hiệu quả hơn (chưa tính đến khả năng bảo mật cũng như network) trong private cloud so với public cloud . Chính vì vậy, đối với các load mà số lượng resource tiêu thụ không thay đổi, ta nên thực hiện các load đó trong môi trường private cloud và dành public cloud cho các yêu cầu về resource lớn, hay các yêu cầu luôn thay đổi -- các elastic apps. Điều này cũng hoàn toàn đúng với các app có data lớn và luồng data bất định. Đây chính là một ưu điểm rõ rệt của Hybrid Cloud.</p>
<p class="western">      3. Tối ưu hóa hiệu năng</p>
<p class="western">Trong bất kỳ dịch vụ/ứng dụng nào được ứng dụng ảo hóa, ngoài các lợi ích của ảo hóa thì vấn đề overhead ảnh hưởng tới timing và access thông qua hypervisor vẫn luôn tồn tại. Việc timing và access sẽ tác động rất lớn đến quá trình provising các resources, do đó làm tăng chi phí cho người sử dụng dịch vụ cloud. Tuy nhiên việc này sẽ chỉ có ý nghĩa với các yêu cầu (request) về resources ngắt quãng, không liên tục. Với công nghệ phần cứng phát triển như hiện nay thì khả năng các yêu cầu (request) này bị ngắt quãng trở nên ngày một thấp. Bên cạnh đó, với Hybrid Cloud thì ta vừa có thể sử dụng công nghệ ảo hóa ngay tại Private Cloud, vừa có sự linh hoạt trong việc cung cấp các resources trên Public Cloud, e.g. cung cấp VCPUs , VRAM có dung lượng lớn.</p>
<p class="western">Ở một khía cạnh khác, vẫn còn nhiều vấn đề cần nghiên cứu về tính linh động trong việc cung cấp và provisioning các resources sao cho đảm bảo được hiệu năng của các ứng dụng trong Hybrid Cloud. Một cách tổng thể hơn, nếu một Private Cloud kết hợp với một số Public Cloud thay vì một Public Cloud duy nhất, thì tính linh động trong resources provisioning cần phải được đưa lên thành khái niệm ở mức cao nhất, tức là các resources có thể được provisioned ở quy mô inter-cloud. Hiện nay, Docker đang nổi lên như một giải pháp khá hiệu quả cho vấn đề này. (Xem thêm tài liệu về sự kết hợp của Murano và Kubernetes)</p>
<p class="western">      4. Đảm bảo yêu cầu về security</p>
<p class="western">Security luôn là vấn đề phức tạp trong cloud. đặc biệt với môi trường multi-tenant. Đối với Public Cloud, giải pháp về security cho traffic hay data storage vẫn chưa đem lại sự an toàn cao cho nhà cung cấp cũng như người sử dụng. Hybrid Cloud sẽ giải đáp phần nào cho câu hỏi này. Ta có thể tương đối dễ dàng abstract các (phần) workload “nhạy cảm” hoặc lưu trữ những (phần) dữ liệu “nhạy cảm” vào trong Private Cloud hoặc các dedicated hosts để đảm bảo security tùy theo yêu cầu của khách hàng. Ngoài ra, ta cũng có thể dễ dàng quản lý lưu lượng ra/vào của traffic từ Private Cloud đến Public Cloud và ngược lại.</p>
<ul>
<li class="western"><strong>Thách thức đặt ra cho Hybrid Cloud</strong></li>
</ul>
<p class="western">Mặc dù Hybrid Cloud có rất nhiều ưu điểm nhưng việc triển khai được một Hybrid Cloud khả dụng (hoặc hoàn hảo) đặt ra một thách thức lớn đối với các nhà triển khai và cung cấp dịch vụ cloud. Việc quản lý hệ thống vừa “private” vừa “public” đưa ra những sự khó khăn về tính tích hợp, tính bền vững trong quá trình hoạt động, etc. sẽ mang lại sự phức tạp cho các hoạt động liên quan như monitoring, bảo trì hệ thống, security, etc.</p>
<p class="western">Bên cạnh đó, việc tích hợp dữ liệu (data integration) của các dịch vụ public và internal mặc dù trở nên dễ dàng và đáng tin cậy hơn so với data integration từ các resources của public cloud nhưng nó vẫn tồn tại những khó khăn phụ thuộc vào nhu cầu, đòi hỏi về thông tin, dữ liệu của khách hàng (doanh nghiệp). Ta có thể nhận thấy được khuynh hướng lưu trữ và xử lý các dữ liệu “nhạy cảm” sẽ được thực hiện trong private cloud (dữ liệu “trivial” có thể được thực hiện trên public cloud), tuy nhiên việc tích hợp các dữ liệu (nhạy cảm) đó đòi hỏi các nhà cung cấp dịch vụ phải nắm được trọn vẹn yêu cầu về dữ liệu của khách hàng để đảm bảo được chất lượng (quality) và bảo mật (security) của dữ liệu. Quá trình của toàn bộ các tác vụ đối với dữ liệu trong cả private và public cloud, việc tích hợp chúng như thế nào ngoài vấn đề kiểm soát công nghệ, năng lực kỹ thuật của các nhà cung cấp thì còn phụ thuộc rất nhiều vào sự hợp tác, “hiểu nhau” giữa các nhà cung cấp và các doanh nghiệp nói riêng, khách hàng nói chung.</p>
<p class="western">Ngoài ra, trong trường hợp nhiều Public Cloud trong Hybrid Cloud, tính tương đồng và khả năng tích hợp các SaaS giữa các Public Cloud và Private Cloud đã và đang là một bài toán chưa có câu trả lời.</p>
<p class="western">
<p class="western">8/3/2015</p>
<p class="western">Vietstack Team</p>
