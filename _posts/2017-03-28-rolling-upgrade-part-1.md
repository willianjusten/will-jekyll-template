---
layout: post
title: Rolling-Upgrade [Part 1]
date: 2017-03-28 16:03:13.000000000 +07:00
type: post
published: true
status: publish
categories:
- Bài dịch - Tài liệu
- Chia sẻ kinh nghiệm
- Hướng dẫn - Kinh Nghiệm
- Tài liệu tham khảo
tags: []
meta:
  _wpcom_is_markdown: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '3356809424'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p><b>Rolling upgrade in microservice architecture of OpenStack services [Part 1][Overview]</b></p>
<p>&lt;Bài viết do thành viên Đặng Văn Đại đóng góp từ quá trình tìm hiểu và kiểm thử rolling-upgrade trong OpenStack&gt;</p>
<p>Trong vài năm gần đây, giới công nghệ nổi lên một xu hướng về mặt kiến trúc là micro-service. Xét qua đôi chút về mặt lịch sử, micro-service là sự tổng hợp về mặt kinh nghiệm như SOA, Message Bus và sự tiến bộ về công nghệ như Cloud Computing hay Container. Tuy nhiên, theo như định lý CAP, việc thiết kế một giải pháp theo kiến trúc micro-service không thể đảm bảo được tính hoàn hảo mà bắt buộc phải hi sinh một trong 3 sự đảm bảo của CAP. Bởi vậy, nếu như so sánh với một kiến trúc nguyên khối (monolithic architecture), việc nâng cấp dịch vụ thường chỉ tập trung tại một khối thì nay với micro-service, nâng cấp/cập nhật (upgrade/update) là cả một cơn ác mộng. Thử hình dung một hệ thống có tới hàng nghìn, thậm chí hàng triệu service được chạy production, làm sao để có thể upgrade hệ thống lên phiên bản mới mà downtime thấp nhất có thể. Liệu có thể nâng cấp lần lượt từng service và làm thế nào bảo đảm được tính tương thích giữa các phiên bản cũ/mới của một trong hàng nghìn service hoặc giữa các service với nhau.</p>
<p>Câu chuyện update và upgrade với kiến trúc micro-service sẽ được trình bày trong loạt bài blog này, với các chủ đề xoay quanh mô hình Rolling-Upgrade - Uprade lần lượt từng module nhỏ trong hệ thống.</p>
<p><b>Rolling upgrade là gì?</b></p>
<p><b><img class=" aligncenter" title="" src="{{ site.baseurl }}/assets/image.jpeg" alt="" width="321" height="229" /></b></p>
<p>Xuyên suốt quá trình phát triển và bảo trì bất kỳ hệ thống nào, dù to hay nhỏ, luôn có ít nhất vài lần người vận hành hệ thống cần nâng cấp (upgrade) hoặc cập nhật (update) hệ thống. Thông thường, quá trình nâng cấp sẽ diễn ra với các bước như sau:</p>
<ol>
<li>Sao lưu dữ liệu và các cấu hình cần thiết.</li>
<li>Tắt tất cả các dịch vụ hay tiến trình đang chạy của hệ thống.</li>
<li>Cập nhật cơ sở dữ liệu hệ thống nếu cần thiết.</li>
<li>Cập nhật mã nguồn mới.</li>
<li>Khởi động lại ứng dụng…</li>
</ol>
<p>Tuy nhiên, đây là một quá trình chứa nhiều rủi ro cả về mặt công nghệ cũng như về mặt kinh doanh bởi vì chúng ta có thể đối mặt với các vấn đề nghiêm trọng như:</p>
<ul>
<li>Không thể phục vụ người dùng trong quá trình cập nhật.</li>
<li>Có khả năng gặp phải các vấn đề về mất mát dữ liệu, không nhất quán dữ liệu hay sự không tương thích với các ứng dụng bên thứ ba sau khi nâng cấp/câp nhật (update/upgrade).</li>
</ul>
<p><img class=" aligncenter" title="" src="{{ site.baseurl }}/assets/image1.jpeg" alt="" width="333" height="222" /></p>
<p>Tuy nhiên, công nghệ mỗi ngày lại có những bước tiến rõ rệt và các chiến lược mới để nâng cấp cũng ra đời với mục đích đảm bảo quá trình nâng cấp có thời gian downtime là nhỏ nhất, không phải lo ngại về mất mát dữ liệu và điều quan trọng nhất là người dùng vẫn có thể tiếp tục sử dụng các dịch vụ trong suốt quá trình cập nhật ứng dụng. Một trong số các chiến lược đó là “rolling upgrade”.</p>
<p>Vậy Rolling upgrade là gì? Ưu và nhược điểm của chiến lược này ra sao?</p>
<p>Trước tiên, hãy xem xét lại các chiến lược nâng cấp ứng dụng tương đồng như <b>canary mode</b> và <b>blue/green mode.</b></p>
<p>Về cơ bản, khi áp dụng chiến lược <b>blue/green mode</b> cho nâng cấp services có nghĩa là chúng ta triển khai phiên bản mới và cả backend mới(cơ sở dữ liệu, các thư viện phụ thuộc, phần cứng,...) song song với phiên bản hiện tại, sau đó chuyển hết toàn bộ requests của người dùng sang phiên bản mới thông qua việc cấu hình lại DNS chẳng hạn.</p>
<p><img class=" aligncenter" title="" src="{{ site.baseurl }}/assets/image.png" alt="" width="357" height="228" /></p>
<p style="text-align:center;">Nguồn: https://martinfowler.com/bliki/BlueGreenDeployment.html</p>
<p>Mọi thứ cũng tương tự khi chúng ta sử dụng <b>canary mode,</b> tuy nhiên chúng ta chỉ nâng cấp với một số lượng nhỏ các services và không hoàn toàn chuyển toàn bộ requests mới sang phiên bản mới mà chỉ chuyển dần dần các requests sang phiên bản mới. Ví dụ, ban đầu chúng ta điều hướng 10% requests tới phiên bản mới của các services và theo dõi hoạt động của phiên bản mới. Nếu mọi thứ OK, chúng ta tiếp tục tăng lượng requests vào các phiên bản mới và lặp lại các bước kiểm tra → Cứ thế cho tới lúc lượng requests chuyển tới phiên bản mới đã đủ đủ lớn (95% requests được xử lý bới phiên bản mới chặng hạn), chúng ta có thể yên tâm chuyển hẳn requests sang phiên bản mới. Điều này cho phép chúng ta kiểm tra các tính năng mới trước khi áp dụng phiên bản mới trên diện rộng; Facebook, Github áp dụng chiến lược này để kiểm thử các tính năng mới mỗi khi áp dụng trên diện rộng (các tính năng mới thường tiếp cận nhóm khác hàng Mỹ trước khi áp dụng ở Việt Nam là một ví dụ).</p>
<p style="text-align:center;">Nguồn: https://blog.snap-ci.com/blog/2015/06/22/continuous-deployment-strategies/<img title="" src="{{ site.baseurl }}/assets/image1.png" alt="" width="266" height="228" /></p>
<p>Với cả hai cách trên, chúng ta thực sự không phải quan tâm nhiều về kiến trúc mã nguồn bởi lẽ đơn giản là chúng ta có backend mới với thiết kế mới và mã nguồn mới của dịch vụ độc lập với phiên bản cũ, sau đó chuyển các requests có thể xử lý được cho các phiên bản mới theo các cách khác nhau. Điều này có nghĩa là chúng ta cần thêm nhiều tài nguyên (server mới, container mới,...) cho việc nâng cấp hệ thông hoặc sẽ có một hệ thống hiệu năng thấp nếu như cố sử dụng một cách nào đó để cài hai phiên bản lên cùng một máy chủ nhằm tiết kiệm tài nguyên. Hai chiến lược này đều có downtime và downtime phụ thuộc vào quá trình routing, chuyển hướng requests của người dùng giữa hai cụm máy có phiên bản (version) khác nhau.</p>
<p>Nếu như những việc trên ảnh hưởng nhiều tới khách hàng của chúng ta, có một lựa chọn khác để giảm thiểu các vấn đề trên, đó chính là “rolling upgrade”. Với “rolling upgrade”, chúng ta không cần thêm tài nguyên, không cần thêm cơ sở dữ liệu hay tác động vào DNS hay tầng HA/LB để điều hướng các requests với đúng phiên bản. Để làm được điều này, “rolling upgrade” cần phải tuân thủ một số phương pháp trong kiến trúc mã nguồn để hoàn thiện sứ mệnh đã nêu trên cũng như giảm thiểu các vấn đề của các chiến lược còn lại. Cụ thể, “rolling upgrade” yêu cầu khả năng tương thích ngược của phiên bản mới với phiên bản cũ (API, DB, Message..) và một giải pháp nâng cấp cơ sở dữ liệu đang sử dụng để đảm bảo khả năng đọc hiểu cơ sở dữ liệu của cả hai phiên bản cũng như không có thời gian chết của cơ sở dữ liệu.</p>
<p>Trên thực tế, tôi là một người hâm mộ OpenStack và Cloud Computing nói chung, vậy nên tôi sẽ lấy OpenStack như một ví dụ mặc định và cùng xem xét các vấn đề trong ngữ cảnh của OpenStack. Thực ra, mọi chuyện cũng hoàn toàn tương tự khi chúng ta có hàng triệu ứng dụng, cũng ngần ấy các máy ảo và đối tượng dữ liệu trong môi trường OpenStack cloud production. Khách hàng (người dùng các tài nguyên trên đám mây) liên tục truy cập vào các dữ liệu của họ và đương nhiên không muốn có bất kỳ một chút thời gian chết nào (có thể họ sẽ chấp nhận với một thời gian chết rất nhỏ) và họ cũng chả quan tâm chúng ta đang phải nâng cấp, bảo trì hay làm gì đối với hệ thống bên dưới nền tảng mà chúng ta cung cấp cho họ (hay có thể hiểu: việc nâng cấp hệ thống sẽ "trong suốt" đối vói người dùng). Vậy rõ ràng OpenStack cần phải có “rolling upgrade” và thực tế thì cộng đồng OpenStack đã và đang phát triển tính năng “rolling upgrade” trong một số projects của OpenStack.</p>
<p>Thật vậy, lấy một ví dụ cụ thể trong kiến trúc microservice của OpenStack, với việc rolling-upgrade các thành phần trong dự án Nova.</p>
<ul>
<li>Điều mong đợi trong suốt quá trình nâng cấp: Người dùng vẫn có thể tạo mới, truy cập, sử dụng và xóa máy ảo bình thường.</li>
<li>Điều cần đạt được trong quá trình nâng cấp:
<ul>
<li>Nova-api tiếp tục giao tiếp với các dịch vụ khác (Glance, Cinder) một cách bình thường.</li>
<li>Các service bên trong Nova (phiên bản cũ và mới) có thể giao tiếp với nhau.</li>
<li>Nova-conductor (phiên bản cũ và mới) hoạt động tốt với sơ đồ cơ sở dữ liệu mới (Quá trình nâng cấp thường được thực hiện với sơ đồ cơ sở dữ liệu trước và tiếp đến là thành phần nova-conductor, sau đó mới là các thành phần còn lại).</li>
</ul>
</li>
</ul>
<p><img title="null" src="{{ site.baseurl }}/assets/image2.png" alt="null" width="624" height="409" /></p>
<p>Đó là lý do tại sao “rolling upgrade” yêu cầu các khả năng như đã nói ở trên.</p>
<p>Chung quy lại, chúng ta có thể so sánh rolling-upgrade với Blue/green và Canary model ở một số đặc điểm chính như sau:</p>
<table>
<tbody>
<tr>
<td></td>
<td>
<p style="text-align:center;">Rolling upgrade</p>
</td>
<td>
<p style="text-align:center;">Blue/green – Canary Model</p>
</td>
</tr>
<tr>
<td>Same database</td>
<td>
<p style="text-align:center;">Yes</p>
</td>
<td>
<p style="text-align:center;">No</p>
</td>
</tr>
<tr>
<td>Require backward compatible in self service</td>
<td>
<p style="text-align:center;">Yes</p>
</td>
<td>
<p style="text-align:center;">No</p>
</td>
</tr>
<tr>
<td>Interact with external layer (HA/LB, DNS)</td>
<td>
<p style="text-align:center;">No need too much</p>
</td>
<td>
<p style="text-align:center;">Mandatory</p>
</td>
</tr>
<tr>
<td>Require many physical resources for upgrading process</td>
<td>
<p style="text-align:center;">No</p>
</td>
<td>
<p style="text-align:center;">Yes</p>
</td>
</tr>
<tr>
<td>Have downtime?</td>
<td>
<p style="text-align:center;">Yes</p>
</td>
<td></td>
</tr>
</tbody>
</table>
<p>Vậy OpenStack đã làm gì để hỗ trợ quá trình “rolling upgrade”?</p>
<p>Câu trả lời là danh sách tám tính năng xung quanh việc implement để giúp cho việc thực hiện “rolling upgrade” trong OpenStack.</p>
<ol>
<li><b>Online Schema Migration - Cho phép thay đổi lược đồ cơ s</b>ở dữ liệu mà không yêu cầu tắt dịch vụ (không hỗ trợ thay đổi về phiên bản cũ hơn).</li>
<li><b>Maintenance Mode – </b>Để ngăn việc giao tiếp từ bên ngoài tới service đang được đặt ở chế độ mainternance mode.</li>
<li><b>Live Migration - Nâng cao việc </b>chuyển dịch dữ liệu/tài nguyên đang sử dụng tới nơi khác mà không ảnh hưởng tới quá trình sử dụng của người dùng.</li>
<li><b>Multi-version Interoperability - Cho phép </b>nhiều . phiên bản khác nhau của các service trong cùng một project OpenStack có thể nói chuyện với nhau (RPC / HTTP). Ví dụ cinder-volume Mitaka có thể trao đổi, giao tiếp bình thường với cinder-scheduler của Ocata.</li>
<li><b>Graceful Shutdown - Đảm bảo các requests đã nhận trước khi thực sự tắt dịch vụ </b>được xử lý hết.</li>
<li>Upgrade Orchestration:
<ul>
<li><b>Deploy – Tạo ra kịch bản cho việc “rolling upgrade”.</b></li>
<li><b>Remove - Tạo ra kịch bản cho việc xóa bỏ các phiên ban cũ và các dữ liệu liên quan.</b></li>
<li><b>Tooling - Các công cụ hỗ trợ để vừa upgrade vừa có thể truy cập tới tài nguyên đám mây và tài nguyên vật lý.</b></li>
</ul>
</li>
<li><b>Upgrade Gating – Phát triển project để phục vụ cho việc kiểm tra khả năng “rolling upgrade” m</b>ỗi khi có code mới được merge từ developer trên toàn thế giới.</li>
<li><b>Project Tagging - Gắn </b>tag cho các projects đã hoàn thiện việc hỗ trợ “rolling upgrade”, giúp tổ chức các project tiện lợi hơn.</li>
</ol>
<p>Có thể thấy đây gần như là các tính năng cần thiết để phát triển khả năng “rolling upgrade” vào các services nói chung chứ không riêng gì OpenStack bởi các vấn đề trong ”upgrade” và sứ mệnh của chính “rolling upgrade”.</p>
<p>Trong bài tiếp theo của loạt bài (series) này, chúng ta sẽ xem xét vào chi tiết của mỗi tính năng với kiến trúc, các phương pháp hiện nay và những câu thần chú huyền thoại (mê tín xíu ^^) để đạt được “rolling upgrade”.</p>
<p>VietStack team.</p>
<p>Hanoi 03/2017.</p>
