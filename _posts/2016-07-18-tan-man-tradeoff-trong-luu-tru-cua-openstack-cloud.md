---
layout: post
title: "[Tản mạn] Tradeoff trong lưu trữ của OpenStack Cloud"
date: 2016-07-18 17:03:01.000000000 +07:00
type: post
published: true
status: publish
categories:
- Tech
- News
tags:
- Tradeoff
meta:
  _wpcom_is_markdown: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '24902726869'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p style="text-align:justify;"><span style=""><span style=""><span style="font-size:large;">IT tại thời điểm hiên tại chính là ta đang ở trong tình trạng tradeoff. Có quá nhiều sự lựa chọn mà ta không biết phải chọn cái gì phù hợp cho nhu cầu của chính bản thân, dẫn đến một sự mông lung, lúc thừa lúc thiếu, cái cần có thì không có, cái không cần thì lại thừa.</span></span></span></p>
<p style="text-align:justify;"><span style=""><span style="font-size:large;">Tôi không muốn nhắc tới CEPH là gì, ScaleIO là gì hay SAN có những topology nào, etc. Vấn đề mà tôi muốn nhấn mạnh ở đây là việc hiểu các tradeoff để đưa ra những quyết định đúng đắn, phù hopej với nhu cầu của doanh nghiệp. Quay lại vấn đề về storage, có rất nhiều sự lựa chọn hiện tại như SAN, CEPH, ScaleIO, etc. Mỗi giải pháp có ưu nhược điểm khác nhau, trong phạm vi bài viết [tản mạn] này, tôi xin phép được nhắc đến 3 giải pháp bên trên và giải quyết nó trong bài toán cloud.</span></span></p>
<p style="text-align:justify;"><span style=""><span style="font-size:large;">Storage trong IT ban đầu cũng theo xu hướng chung của hệ thống đó là xuất phát trừ centrailzed, xong vì nhu cầu scale out, isolation, tránh vấn đề về single point of failure, etc. do đó giải pháp distributed được ứng dụng rất nhiều trong data centre. Đến thời điểm hiện tại khi distributed system lộ rõ những điểm yếu với phạm vị hệ thống ngày càng lớn, chi phí vận hành, bảo trì cao, thì một khái niệm mới ra đời đó là: hyperconverged system. Hyperconverged system là gì? Cá nhân tôi rất thích định nghĩa sau đây:</span></span></p>
<p style="text-align:justify;"><span style="">“<span style=""><span style="font-size:large;">What makes hyper-convergence fundamentally different is that it makes the storage invisible to people running VMs on top,” Ursi says. “Traditional storage had to be hooked up to servers and managed separately, creating LUNs, zones, masks and so on. With hyper-convergence, the VMs use internal hooks via software that presents the storage as an automated service.”</span></span></span></p>
<p style="text-align:justify;"><span style=""><span style=""><span style="font-size:large;">(Jan Ursi, senior director for channel sales and marketing at Nutanix EMEA.)</span></span></span></p>
<p style="text-align:justify;"><span style=""><span style=""><span style="font-size:large;">Rất nhiều sản phẩm về lưu trữ ra đời phục vụ cho khái niệm hyperconvergence. ScaleIO là một ví dụ điển hình. ScaleIO được ra đời để phục vụ khái niệm hyperconvergence trong lưu trữ và là một implementation của định nghĩa Software Defined Block Storage. ScaleIO phát huy thế mạnh của SAN đó là IOPs, tuy nhiên không ứng dụng các protocol truyền thống như iSCSI hay FC mà bản thân nó sử dụng Gossip protocol - một protocol vô cùng phổ biến trong các ứng dụng về cluster. Với ScaleIO, người dùng chỉ cần giao tiếp với ScaleIO Data Client để thực hiện các thao tác cho block storage mà không cần quan tâm (thực ra là không biết) tới việc dữ liệu của họ được lưu trữ như thế nào, replicated ra sao, etc. ScaleIO được đánh giá là một trong những giải pháp có mechanism về rebuild và rebalance rất tốt. Tuy nhiên, nó cũng bộc lộ một số vấn đề như replication size chỉ là 2 hay bản thân nó không phải là mã nguồn mở, được support bởi cộng đồng. ScaleIO được mua lại bởi EMC và được sử dụng trong khá nhiều môi trường cloud với OpenStack. </span></span></span></p>
<p style="text-align:justify;"><span style=""><span style=""><span style="font-size:large;">Bên cạnh đó, CEPH nổi lên trong thời gian gần đây là một giải pháp lưu trữ multi purpose. Nói một cách đơn giản là người dùng có thể dùng CEPH cho block storage cũng như object, file system storage. CEPH là mã nguồn mở và có một cộng đồng khá active, được sử dụng rất rộng rãi mà không phụ thuộc vào hardware. Tuy nhiên, một trong những điểm yếu của CEPH chính là IOPs khá kém, kém hơn rất nhiều so với SAN truyền thống hay ScaleIO. Tương tự như vậy với latency. Ngoài ra CEPH tiêu tốn khá nhiều RAM trong quá trình vận hành. CEPH được sử dụng vô cùng rộng rãi với OpenStack, tuy nhiên để phục vụ cho hyperconvergence, CEPH cần có sự hỗ trợ của containers:</span></span></span></p>
<p style="text-align:justify;"><span style=""><span style="font-family:Arial, FreeSans, Helvetica, sans-serif;"><span style="font-size:small;"><a style="" href="https://www.sebastien-han.fr/blog/2016/07/11/Quick-dive-into-hyperconverged-architecture-with-OpenStack-and-Ceph/"><span style=""><span style="font-size:large;">https://www.sebastien-han.fr/blog/2016/07/11/Quick-dive-into-hyperconverged-architecture-with-OpenStack-and-Ceph/</span></span></a></span></span></span></p>
<p style="text-align:justify;"><span style=""><span style=""><span style="font-size:large;">Dưới khía cạnh chi phí, sử dụng CEPH đòi hỏi TCO (total cost of ownership) khá cao. </span></span></span></p>
<p style="text-align:justify;"><span style=""><span style=""><span style="font-size:large;">Quay trở lại vấn đề cốt lõi, với tradeoff như vậy thì ta chọn giải pháp nào? Nó chỉ có thể giải quyết nếu như ta trả lời được những câu hỏi sau:</span></span></span></p>
<p style="text-align:justify;"><span style=""><span style=""><span style="font-size:large;">- Ứng dụng mà người dùng cần/ ta cung cấp là ứng dụng nào?</span></span></span></p>
<p style="text-align:justify;"><span style=""><span style=""><span style="font-size:large;">- Ứng dụng đó cần thiết nhất về vấn đề gì? (Performance, scalability, reliability, etc.)</span></span></span></p>
<p style="text-align:justify;"><span style=""><span style=""><span style="font-size:large;">- Với ứng dụng như vậy thì hệ thống nào là phù hợp? (Centralized, distibuted, converged, hyperconverged)</span></span></span></p>
<p style="text-align:justify;"><span style=""><span style=""><span style="font-size:large;">- Với các thiết kế hệ thống như vậy, tổng chi phí như thế nào?</span></span></span></p>
<p style="text-align:justify;"><span style=""><span style=""><span style="font-size:large;">Trên đây chỉ là các thông tin vô cùng cơ bản, còn rất nhiều vấn đề xoay quanh các thiết kế giải pháp lưu trữ (e.g. mix giữ các solution) để phù hợp với nhu cầu của người dùng.</span></span></span></p>
<p style="text-align:justify;"><span style=""><span style=""><span style="font-size:large;">18/07/2016</span></span></span></p>
<p style="text-align:justify;"><span style=""><span style=""><span style="font-size:large;">VietStack</span></span></span></p>
