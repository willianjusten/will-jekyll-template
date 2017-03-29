---
layout: post
title: OpenStack là gì và để làm gì !
date: 2014-02-15 08:16:47.000000000 +07:00
type: post
published: true
status: publish
categories:
- Chia sẻ kinh nghiệm
- Giới thiệu OpenStack
tags: []
meta:
  _edit_last: '53965886'
  _publicize_pending: '1'
  _wpas_skip_6303274: '1'
  _wpas_skip_6303278: '1'
author:
  login: jackvietsi
  email: jackvietsi@gmail.com
  display_name: jackvietsi
  first_name: ''
  last_name: ''
---
<p>Có vẻ là quá thường  nhưng để bắt đầu làm gì đó "to tát" thì hay bắt đầu những việc đơn giản trước. Tôi viết bài này để chia sẻ tới những người mới bắt đầu tìm hiểu và có đam mê.  Chắc hẳn đây cũng không phải là câu hỏi thừa hay thiếu đối với những người mới bắt đầu tìm hiểu về OpenStack nói riêng và Cloud Computing nói chung.<!--more--></p>
<p>Và tôi cũng như mọi người, khi lần đầu tiên được nghe đến nó (tức OpenStack) thì câu hỏi đầu tiên của tôi là: <em>OpenStack là gì và để làm gì nhỉ ? </em>Mới đầu tôi cũng như gà mắc tóc ... tìm tài liệu, đọc, dịch, tra cứu .... Do vậy mục tiêu tôi  tốc ký lại bài này là để chia sẻ và thử sức xem mình đã tìm hiểu được đến đâu về OpenStack, bài viết sẽ không đi quá sâu vào kỹ thuật  và cũng không quảng cáo cho OpenStack mà chỉ giới thiệu sơ lược để cho anh em mới bắt đầu tìm hiểu có thể tiếp cận được. Tôi mong các anh em đã có kinh nghiệm rồi có thể góp ý và đính chính để bài viết hoàn thiện dần dần.</p>
<p>Với đa số dẫn kỹ thuật (CNTT, IT, Computer Science - Khoa học máy tính ...) mà đã đi làm vài năm thì có thể tước khi nghe đến OpenStack thì sẽ nghe qua đến cụm từ  Ảo Hóa (Virtualization) và Điện toán đám mây (Cloud Computing) rồi mới đến OpenStack. Các cụm từ Ảo hóa và Cloud Computing thì có những định nghĩa và bài báo cụ thể nhưng ở đây tôi chỉ lướt qua và tổng hợp theo ý hiểu cá nhân (tôi không làm khoa học nên không viết theo kiểu hàn lâm):</p>
<p><strong>Ảo hóa- tiếng anh là Virtualization:</strong></p>
<p>Từ này tra từ điển Anh - Việt  thì tôi không thấy, nhưng wiki và từ điển Anh - Anh thì có. Và đa số khi nói đến Virtualization thì mọi người đều hiểu là Ảo Hóa. Nôm na mà nói thì Ảo Hóa là kỹ thuật  tạo ra phần cứng, thiết bị  mạng, thiết bị lưu trữ  ... ẢO - không có thật ( và ở góc độ nào đó có thể hiểu là "giả lập" và "mô phỏng" lại các thành phần này). Tức là nhìn thấy nhưng không sờ được, cầm được :).</p>
<p>Đi kèm với Ảo hóa thường có các cụm từ <em>Hardware Virtualization, Platform Virtualization</em>: các cụm từ này ám chỉ việc tạo ra các thành phần phần cứng (ảo) để tạo ra các máy ảo (<em>Virtual Machine</em>), chúng có gần như đầy đủ các thành phần như máy thật (physical machine ) và có thể cài đặt hệ điều hành (Linux, Windows, ....trong network thì có thể có các Router ảo và Switch ảo ) và tất nhiên người dùng có thể sử dụng và khai thác được các máy ảo, thiết bị ảo này. Thường gặp nhất trong hiện tại có thể là các bạn học về Microsoft, Cisco, Juniper ..., sử dụng các chương trình giả lập, hay phần mềm để tạo ra các thiết bị ảo này.</p>
<p>Về lợi ích: Nếu đứng trên góc độ của người dùng thì có vài điểm lợi sau:</p>
<ul>
<li>Kỹ thuật ảo hóa giúp tiết kiệm tiền bạc và tận dụng được tài nguyên phần cứng. Ví dụ khi cần có một máy tính chạy hệ điều hành, thay vì mua thì ta có thể cài đặt và tạo ra các máy ảo trên máy thật của chúng ta.</li>
<li>Linh hoạt trong khi sử dụng: Với các phần mềm để tạo ra các máy ảo, bạn có thể tạo, xóa, hủy các máy ảo này một cách nhanh chóng và tiện lợi (tùy các nền tảng khác nhau và kỹ năng sử dụng của người dùng khác nhau).</li>
<li>Đối với các môi trường thử nghiệm và lab thì kỹ thuật ảo hóa giúp sao lưu và khôi phục hệ thống, khôi phục máy ảo nhanh chóng và thuận tiện.</li>
</ul>
<p>Các kỹ thuật (loại) ảo hóa: Với phạm vi bài viết này thì tôi chưa có cái nhìn tổng quan hết về các loại ảo hóa, xin phép trao đổi trong các bài viết sâu hơn. Nhưng nếu muốn tiếp tục nghiên cứu về OpenStack thì cần phải tìm hiểu, tôi sẽ gợi ý vào keyword để các bạn cùng tìm hiểu về các loại ảo hóa khác nhau: Full-Virtualization, Para-Virtualization, Operating system-level virtualization, Hypervisor.</p>
<p><strong>Cloud Computing</strong></p>
<p>Khái niệm nữa cần phải tìm hiểu đó là Cloud Computing, tại Việt Nam thì đa số hiểu là Điện Toán Đám Mây. Một trong các công nghệ "hot" trong vài năm trở lại đây. Đây cũng là một cụm từ được nhắc đến nhiều trong các bài báo, bài viết của các hãng công nghệ. Nó cũng có nguyên một định nghĩa của Viện tiêu chuẩn  và công nghệ quốc gia  của Mỹ <a href="http://tratu.soha.vn/dict/en_vn/NIST_(National_Institute_of_Standards_and_Technology)">(NIST)</a> , thường được trích ra trong các bài thuyết trình của các chuyên gia (ngoài ra, có nhiều định nghĩa của các hãng tên tuổi khác nhưng tôi không đưa vào đây). Bạn có thể xem nó tại đây:  <a href="http://csrc.nist.gov/publications/nistpubs/800-145/SP800-145.pdf">Định nghĩa về Cloud Computing của NIST</a></p>
<p><span style="line-height:1.5em;"> Nôm na mà nói thì Điện toán đám mây là bước kế tiếp của Ảo hóa. Ảo hóa phần cứng, ảo hóa ứng dụng. là thành phần quản lý và tổ chức, vận hành  các hệ thống ảo hóa trước đó.</span></p>
<p>Định nghĩa lược dịch từ NIST</p>
<blockquote><p><em>Cloud Computing  là mô hình cho phép truy cập qua mạng để lựa chọn và sử dụng tài nguyên  có thể được tính toán (ví dụ: mạng, máy chủ, lưu trữ, ứng dụng và dịch vụ) theo nhu cầu một cách thuận tiện và nhanh chóng; đồng thời cho phép kết thúc sử dụng dịch vụ, giải phóng tài nguyên dễ dàng, giảm thiểu các giao tiếp với nhà cung cấp”</em></p></blockquote>
<p>Cần nắm dược 5 - 4 - 3 trong Cloud Computing: đó là 5 đặc tính, 4 mô hình dịch vụ và 3 mô hình triển khai.</p>
<p><em><strong>5 đặc điểm: (giải thích chi tiết sẽ có bài viết cụ thể hơn)</strong></em></p>
<ul>
<li>Khả năng thu hồi và cấp phát tài nguyên (Rapid elasticity)</li>
<li>Truy nhập qua các chuẩn mạng (Broad network access)</li>
<li>Dịch vụ sử dụng đo đếm được (Measured service,) hay là chi trả theo mức độ sử dụng pay as you go.</li>
<li>Khả năng tự phục vụ (On-demand self-service).</li>
<li>Chia sẻ tài nguyên (Resource pooling).</li>
</ul>
<p><em><strong>4 mô hình dịch vụ (mô hình sản phẩm): cũng sẽ giải thích chi tiết hơn trong bài viết cụ thể</strong></em></p>
<ul>
<li>Public Cloud: Đám mây công cộng (là các dịch vụ trên nền tảng Cloud Computing để cho các cá nhân và tổ chức thuê, họ dùng chung tài nguyên).</li>
<li>Private Cloud: Đám mây riêng (dùng trong một doanh nghiệp và không chia sẻ với người dùng ngoài doanh nghiệp đó)</li>
<li>Community Cloud: Đám mây cộng đồng (là các dịch vụ trên nền tảng Cloud computing do các công ty cùng hợp tác xây dựng và cung cấp các dịch vụ cho cộng đồng. Tôi cũng chưa rõ FB có phải là một dạng này không, cần xác nhận lại.</li>
<li>Hybrid Cloud : Là mô hình kết hợp (lai) giữa các mô hình Public Cloud và Private Cloud (không rõ có Community Cloud nữa không ... :D)</li>
</ul>
<p><strong><em>3 mô hình triển khai: tức là triển khai Cloud Computing để cung cấp:</em></strong></p>
<ul>
<li>Hạ tầng như một dịch vụ (Infrastructure as a Service)</li>
<li>Nền tảng như một dịch vụ (Platform as a Service)</li>
<li>Phần mềm như một dịch vụ (Software as a Service)</li>
</ul>
<p><strong>OPENSTACK là gì và để làm gì !</strong></p>
<p>Cuối cùng là đến OpenStack, vấn đề các bạn có thể quan tâm là ở đây.</p>
<p>Rất ngắn gọn , vì nếu các bạn đã đọc các thông tin ở trên rồi thì rất đơn giản. OpenStack là một phần mềm mã nguồn mở, dùng để triển khai Cloud Computing, bao gồm private cloud và public cloud (nhiều tài liệu giới thiệu là Cloud Operating System). Đúng như với thông tin từ trang chủ http://openstack.org, xin được trích lại như sau:  <em>Open source software for building private and public clouds</em></p>
<p><em></em>Giới thiệu bằng tiếng Anh tại trang chủ:</p>
<blockquote><p>OpenStack is a cloud operating system that controls large pools of compute, storage, and networking resources throughout a datacenter, all managed through a dashboard that gives administrators control while empowering their users to provision resources through a web interface.</p></blockquote>
<p>Hình minh họa nó rất rõ vị trí của OpenStack trong tực tế, nôm na như sau:</p>
<p><img class="aligncenter size-large wp-image-169" alt="openstack-software-diagram" src="{{ site.baseurl }}/assets/openstack-software-diagram.png?w=630" width="630" height="261" /></p>
<ul>
<li>Phía dưới là phần cứng của, đã được ảo hóa để chia sẻ cho ứng dụng, người dùng</li>
<li>Trên cùng là các ứng dụng của bạn, tức là các phần mềm mà bạn sử dụng</li>
<li>Và OpenStack là phần ở giữa 2 phần trên, trong OpenStack có các thành phần, module khác nhau nhưng trong hình minh họa các thành phần cơ bản: Dashboard, Compute, Networking, API, Storage ...</li>
</ul>
<p>Cần hiểu thoáng và nhanh gọn hình này, ở đây OpenStack đã bao trùm cả lên phần ảo hóa, nó chính là trong khối Compute. Do vậy bạn đừng hiểu nhầm sang khía cạnh Ảo hóa.</p>
<p>Một vài thông tin vắn tắt về OpenStack để các bạn nắm được</p>
<ul>
<li>OpenStack là một dự án  mã nguồn mở  dùng để triển khai private cloud và public cloud, nó bao gồm nhiều thành phần (tài liệu tiếng anh gọi là project con) do các công ty, tổ chức ,lập trình viên tự nguyện xây dựng và phát triển. Có 3 nhóm chính tham gia: Nhóm điều hành, nhóm phát triển và nhóm người dùng.</li>
<li>OpenStack hoạt động theo hướng mở: (Open) Công khai lộ trình phát triển, (Open) công khai mã nguồn ...</li>
<li>Tháng 10/2010 Racksapce và NASA công bố phiên bản đầu tiên của OpenStack, có tên là OpenStack Austin, với 2 thành phần chính ( project con) : Compute (tên mã là Nova) và Object Storage (tên mã là Swift)</li>
<li>Các phiên bản OpenStack có chu kỳ 6 tháng. Tức là 6 tháng một lần sẽ công bố phiên bản mới với các tính năng bổ sung.</li>
<li>Tính đến nay có 9 phiên bản của OpenStack bao gồm: Austin, Bexar, Cactus, Diablo, Essex, Folsom, Grizzly, Havana.</li>
<li>Tên các phiên bản được bắt đầu theo thứ tự A, B, C, D ...trong bảng chữ cái.</li>
<li>Dự kiến phiên bản tiếp theo có tên là Icehouse, sẽ công bố vào tháng 04/2014</li>
<li><span style="line-height:1.5em;">Tính đến thời điểm viết bài này phiên bản hiện tại là OpenStack Havana (công bố tháng 10/2013) . </span><a style="line-height:1.5em;" href="https://wiki.openstack.org/wiki/Releases">Tham khảo thêm tại đây về các phiên bản</a> ,</li>
<li>Các thành phần (project con) có tên và có mã dự án đi kèm, với Havana gồm 9 thành phần sau:
<ul>
<li>Compute (code-name Nova)</li>
<li>
<p style="display:inline !important;">Networking (code-name Neutron)</p>
</li>
<li>
<p style="display:inline !important;">Object Storage (code-name Swift)</p>
</li>
<li>
<p style="display:inline !important;">Block Storage (code-name Cinder)</p>
</li>
<li>
<p style="display:inline !important;">Identity (code-name Keystone)</p>
</li>
<li>
<p style="display:inline !important;">Image Service (code-name Glance)</p>
</li>
<li>
<p style="display:inline !important;">Dashboard (code-name Horizon)</p>
</li>
<li>
<p style="display:inline !important;">Telemetry (code-name Ceilometer)</p>
</li>
<li>
<p style="display:inline !important;">Orchestration (code-name Heat)</p>
</li>
</ul>
</li>
</ul>
<p>Tới đây mình xin tạm dừng bài viết, hi vọng các thông tin trên đã phần nào giúp các bạn có thể giải quyết các thắc mắc ban đầu. Mong nhận được phản hồi và góp ý để hoàn thiện bài viết.</p>
<p>jackvietsi@gmail.com</p>
