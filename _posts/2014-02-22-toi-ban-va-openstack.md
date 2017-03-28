---
title: Tôi, bạn và OpenStack
date: 2014-02-22 09:37
comments: true
categories: 
  - Blog
tags: 
  - Chia sẻ
  - Kinh nghiệm
  - VietStack
---
<em><strong>Tóm tắt nội dung</strong></em>: <em>Bài viết này nhằm mục đích gửi đến những người đang quan tâm về OpenStack có thể hình dung được "Với OpenStack thì tôi, bạn sẽ đóng vai trò gì và  chúng ta có thể làm được gì với OpenStack. Ngoài ra tôi mong muốn phần nào giúp các bạn lựa chọn được hướng đi khi xác định tìm hiểu về OpenStack và sẽ ứng dụng nó vào trong thực tế. Bài viết chỉ là một góc nhìn từ quan điểm cá nhân, do vậy mong các bạn đóng góp ý kiến.</em>

Mới đọc tựa đề này thì có vẻ nhiều độc giải sẽ nghĩ tôi quảng cáo và sùng bái OpenStack quá mức - nhưng hãy khoan nhận xét vội, đơn giản là tôi lấy tựa đề này là do thời điểm này tôi đang quan tâm đến OpenStack (nếu ở thời điểm khác và viết về lĩnh vực khác thì tôi sẽ lấy tên khác chứ không hề ca tụng nó quá mức :D ). Ok, dù thế nào đi chăng nữa tôi vẫn tiếp tục bày tỏ quan điểm cá nhân, do vậy nó cũng không thể thỏa mãn và làm hài lòng tất cả mọi độc giả được, nếu có ý kiến tranh luận xin mời các bạn cứ phản hồi. Giờ tôi sẽ đi vào nội dung chính:<!--more-->

Ngược lại thời gian một chút, cách đây 10 năm tôi bước chân vào lĩnh vực IT  chỉ với vốn liếng ít ỏi tích lũy từ thời phổ thông. Thực sự lúc đó quá bỡ ngỡ, và lúc đó chưa hề định hình được sau này mình làm gì. Một câu hỏi lớn mà tôi luôn kiếm tìm câu trả lời (thậm chí đến hiện tại thi thoảng tôi tự hỏi tôi câu này !). Và khi làm việc với OpenStack hay tìm hiểu bất kỳ vấn đề khác cũng vậy tôi cũng luôn có câu hỏi này đầu tiên. (Ngoài ra còn câu hỏi: Để tìm hiểu về OpenStack (các vấn đề khác) thì tôi cần chuẩn bị gì !, bài trả lời cho câu hỏi  này tôi đã viết bài trước <a href="http://vietstack.wordpress.com/2014/02/15/openstack-la-gi-va-de-lam-gi/">tại đây rồi</a>.) Tôi đoán là nhiều bạn sinh viên khi đọc bài này cũng có tâm trạng như tôi !

Và cách đây hơn một năm, năm 2012, do nhu cầu đọc và sự tò mò của tôi trong lĩnh vực tôi đã biết đến OpenStack (lúc này tôi chưa hề được giao việc là phải tìm hiểu OpenStack như bây giờ và công việc lúc đó chả liên quan gì đến chuyên môn). Tôi cũng đã lang thang trên khắp các diễn đàn, các nhóm trên facebook, twitter, các bloger..., đọc đủ các loại bài viết  chỉ với mục đích đầu tiên là với OpenStack thì TÔI &amp; các BẠN có thể làm được gì với nó. Và sau hơn 1 năm thì giờ tôi có thể trả lời một cách "nôm na" về câu hỏi đó.

Trước khi giải đáp  cụ thể vào vai trò của từng người, từng nhóm khi làm việc với OpenStack thì tôi xin sơ lược một chút về OpenStack để các bạn có đầu mối hình dung. (<a href="http://vietstack.wordpress.com/2014/02/15/openstack-la-gi-va-de-lam-gi/">còn nếu chi tiết hơn mời các bạn tham khảo ở đây trước</a> )
<ul>
	<li>OpenStack là một phần mềm mã nguồn mở (OpenSource) dùng để triển khai Cloud Computing, bao gồm private cloud và public cloud. Một số tài liệu còn gọi nó là Cloud Operating System.</li>
	<li>OpenStack được thiết kế theo dạng modular (mô đun), tức là nó bao gồm nhiều project con, mỗi project đóng vai trò cụ thể và có mối quan hệ với nhau (cần tìm hiểu sâu để biết các project tương tác với nhau như thế nào).</li>
	<li>OpenStack được xây dựng bằng ngôn ngữ Python, là một nền tảng OpenSource,  và nó có sự tham gia và đóng góp chính từ cộng đồng (khoảng 99,99%).  Các công ty tham gia và các nhân xây dựng OpenStack đến từ khắp 5 châu, các công ty hàng đầu trong lĩnh vực như IBM, NASA, Rackspace, Cisco, HP, Ubuntu, RedHat...)</li>
</ul>
Nói tóm lại OpenStack hội tụ đầy đủ những kiến thức, kỹ thuật của các hãng công nghệ trên thế giới và bao trùm lên nhiều nhánh lĩnh vực như: Network, System, Storage, Programming, Database ....Tới đây, phần nào các bạn có thể hình dung được vai trò vủa mình,  định hướng cho bản thân khi tìm hiểu và làm việc với OpenStack. Mặc dù trên website chính thức của OpenStack cũng đã tổng kết rất ngắn gojv vai trò của các cá nhân và tổ chức đối với OpenStack nhưng tại bài viết này tôi xin chốt lại thông tin theo nhận định cá nhân như sau:

<strong>Với tổ chức, doanh nghiệp: </strong><em>(đây là đối tượng tôi nói đến đầu vì họ quan tâm đến kiếm tiền)</em>
<ul>
	<li>Ứng dụng OpenStack để triển khai Cloud Computing nhằm cung cấp các dịch vụ theo hướng: Hạ tầng như một dịch vụ (IaaS), Nền tảng như một dịch vụ (PaaS) và Phần mềm như một dịch vụ (SaaS) <strong><em>để kiếm tiền !</em> </strong>(kiếm tiền thì nhiều người thích).</li>
	<li>Đào tạo về OpenStack trong tương lai (bài toàn dài hạn) .</li>
</ul>
<strong>Với những bạn làm quản trị (tôi thấy ở VIETNAM hay gọi là Sysadmin hay Sysad):</strong>
<ul>
	<li>Tìm hiểu và nắm được cách hoạt động, các thành phần của OpenStack để quản trị, để vận hành hệ thống OpenStack trong thưc tế. Có thể hệ thống này được một bên khác triển khai. Nếu trong tương lai các doanh nghiệp họ triển khai OpenStack ở quy mô nhỏ, họ sẽ yêu cầu bạn có kiến thưc về OpenStack để vận hành nó. Tất nhiên là các dịch vụ chạy trong OpenStack nữa (mail, database, webserver ..).</li>
	<li>Nếu ở mô hình nhỏ và điều kiện thiết bị không cho phép, các bạn có thể cài đặt và ứng dụng với phạm vi hẹp để giải quyết các nhu cầu về cung cấp hạ tầng ảo hóa theo yêu cầu của các sếp.</li>
	<li>Nếu ở mô hình lớn, OpenStack có thể chia vai trò cho từng nhóm: nhóm  phụ trách về network, nhóm phụ trách về Server, nhóm phụ trách về database.</li>
</ul>
<strong style="line-height:1.5em;">Với những bạn làm về lập trình - Deverloper (cả web và ứng dụng khác):</strong>
<ul>
	<li>OpenStack có một project con tên mà Dashboard (tên mã dự án là Horizon), nó dùng để cung cấp giao diện đồ họa  qua giao diện web cho người sử dụng (bao gồm cả người quản trị và người dùng cuối). Horizon sử dụng framework là Django (ngôn ngữ là Python), cơ sở dữ liệu hiện tại Horizon sử dụng là MySQL, do vậy nếu bạn muốn phảt triển hay tùy biến lại giao diện này thì bạn có thể tham gia với vai trò một coder về Web.</li>
	<li>Nói như thế không có nghĩa là bạn biết lập trình web rồi nhưng vẫn phải học Python và Django, MySQL. Bởi vì OpenStack cung cấp các API để các ngôn ngữ và framework khác có thể làm việc, do vậy bạn chỉ cần chắc về 1 nền tảng ngôn ngữ, framework và sử dụng đúng API mà họ cung cấp là bạn có thể tham gia phát triển được.</li>
	<li>Nếu bạn mạnh về Python (ngôn ngữ xây dựng nên OpenStack ngày nay) thì bạn hoàn toàn có thể tham gia xây dựng các project hiện tại và trong tương lai.</li>
</ul>
<strong>Với những bạn làm việc trong lĩnh vực Cloud Computing: </strong>
<ul>
	<li>Vận hành OpenStack nói chung.</li>
	<li>Troubleshoot các hệ thống triển khai bằng OpenStack.</li>
	<li>Thiết kế các hệ thống Cloud Computing bằng OpenStack.</li>
	<li>Khi tìm hiểu về OpenStack, mặc nhiên bạn đã có các kiến thức chung, khi đó nếu bạn đầu tư để tìm hiểu thêm các nền tảng khác thì chắc sẽ đỡ tốn thời gian hơn.</li>
	<li>Năm được điểm mạnh, điểm yếu để so sánh các nền tảng Cloud Computing với nhau.</li>
</ul>
<strong>Với các bạn làm việc trong lĩnh vực bảo mật:</strong>
<ul>
	<li>Hiện nay vấn đề bảo mật trong Cloud Computing rất nóng, và OpenStack cũng mới mẻ do đó sự thiết kế chắc chắn sẽ có những tồn tại về khía cạnh bảo mật. Do thực sự tôi không có kiến thức bảo mật nên cũng không khẳng định vai trò quá sâu đối với mảng công việc này, chỉ biết rằng bảo mật luôn được quan tâm.</li>
</ul>
<strong>Với các bạn làm về đồ họa (Designer):</strong>
<ul>
	<li>Do OpenStack có giao diện web, do vậy bạn có thể tham gia thiết kế giao diện đồ họa này.</li>
	<li>Khi các công ty triển khai OpenStack cho nội bộ hay để cung cấp dịch vụ, họ có thể sử dụng giao diện mà OpenStack cung cấp nhưng vì thói quen hay tính "cá nhân hóa"" họ hoàn toàn có thể xây dựng lại giao diện này cho phù hợp, lúc đó hiểu biết về OpenStack sẽ giúp các bạn làm Designer thiết kế tốt hơn.</li>
</ul>
<strong>Với các bạn sinh viên:</strong>
<ul>
	<li>Các bạn có thể sử dụng OpenStack để làm các báo cáo cho đề tài tốt nghiệp về lĩnh vực Cloud Computing nói chung.</li>
	<li>Tìm hiểu OpenStack để đi tắt đón đầu xu hướng để trong tương lai đi tuyển dụng (nhưng vẫn phải có kiến thức nền tảng trong lĩnh vực nhé).</li>
	<li>Các bạn cần chuẩn bị tốt và có lộ trình cụ thể với OpenStack nói riêng và các lĩnh vực khác nói chung. Đốt cháy giai đoạn là các bạn tự đốt mình.</li>
</ul>
<strong>Với các tổ chức nghiên cứu nhỏ lẻ, các học viện, các nhà nghiên cứu:</strong>
<ul>
	<li>Tìm hiểu OpenStack để bắt kịp xu hướng và cập nhật công nghệ.</li>
	<li>Hình thành nên những nhóm nghiên cứu về OpenStack và phổ biến ra cộng đồng, đây cũng là một cách đóng góp để xây dựng OpenStack theo quan điểm của OpenStack Foundation.</li>
</ul>
<strong>Và cuối cùng là với tôi:</strong>

Với tôi, có lẽ xin chỉ bày tỏ quan điểm là tôi đam mê và tôi xác định OpenStack là cả cuộc chơi dài, là bàn đạp cho các lĩnh vực tiếp theo mà tôi theo đuổi. Điều này cũng không phải là sự ca tụng cho OpenStack nhưng tôi mong có những người đồng hành cùng tôi trong cuộc chơi này. Tôi mong nhận được sự phản hồi và sự liên hệ của các cá nhân, các tổ chức để trao đổi về OpenStack trong tương lai.
