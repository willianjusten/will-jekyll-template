---
layout: post
title: Giới thiệu các công cụ phụ trợ khi làm việc với OpenStack
date: 2014-03-29 16:17:41.000000000 +07:00
type: post
published: true
status: publish
categories:
- Chia sẻ kinh nghiệm
- Hướng dẫn - Kinh Nghiệm
- Tech
- News
tags:
- Tools
meta:
  _edit_last: '61498925'
  _publicize_pending: '1'
  _oembed_02bd00057cfdebf2c5670c1435292aa3: "{{unknown}}"
  _oembed_c324488c2b19b7e9b7e3ca4ffeb21dbd: "{{unknown}}"
  _oembed_1c210be4dc6ee7e58a4278830f961812: "{{unknown}}"
  _oembed_77ad150c9b7150af914f584ba8dbdbb9: "{{unknown}}"
  _oembed_6df2e9f5ab03203b6a149d3df0b2bf71: "{{unknown}}"
  _oembed_13eca94536b092b09c0867c0095f11b3: "{{unknown}}"
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>Tóm tắt: Bài viết giới thiệu các công cụ, phần mềm hỗ trợ khi chúng ta tìm hiểu OpenStack. Việc sử dụng thành thạo các công cụ này giúp chúng ta làm việc tốt hơn với OpenStack  nói riêng. Hãy tưởng tượng như bạn có "võ công" tốt rồi nhưng nếu được trang bị "binh khí" ngon thì quả là hoàn hảo !</p>
<p>Lưu ý: Các công cụ này áp dụng trong môi trường windows - OS Windows 7 64 bit Enterprise<!--more--><br />
Chủ để lần này VIETSTACK chia sể với các bạn là về các công cụ làm việc với OpenStack. Nhờ có các công cụ này mà mình làm việc với OpenStack hiệu quả hơn rất nhiều. Mới đầu khi làm quen với công cụ mình cũng mất chút thời gian - nhưng đó là sự trải nghiệm thực tế thú vị. Và đối với anh em làm IT thì sử dụng thành thạo nhiều công cụ phục vụ cho công việc chính là một kỹ năng không thể thiếu. Trong phạm vi bài viết này mình sẽ đưa ra các mô tả về tác dụng, links của các công cụ có liên quan. Việc hướng dẫn cách sử dụng của từng phần mềm không nằm trong phạm vi bài viết này.</p>
<p><strong>Các công cụ tạo máy ảo:</strong><br />
Các công cụ này giúp các bạn tạo ra các máy ảo để lab, để thực hành, chúng sinh ra không phải phục vụ riêng OpenStack :D . Về công cụ tạo máy ảo phục vụ cho việc lab mình xin giới thiệu 2 công cụ dưới. Cá nhân mình đã sử dụng qua cả 2 công cụ này nhưng "bỏ phiếu" cho VMware workstation vì tính ổn định và khả năng tùy biến cao hơn. Bạn có thể cấu hình các chế độ card mạng rất link hoạt và đáp ứng với nhiều tình huống thực tế. Ngoài ra cả 2 công cụ đều có khả năng snapshot - 1 tính năng quá hữu ích đối với việc Lab thường xuyên của các bạn. Nhược điểm của Vmware là phần mềm tính phí.</p>
<ul>
<li><a href="//vmware.com"><em><strong>VMware workstation</strong> </em></a><a href="http://vmware.com">: http://vmware.com</a> (mất phí)</li>
<li><a href="//www.virtualbox.org/"><em><strong>Virtual box</strong> </em></a>: https://www.virtualbox.org/ (miễn phí)</li>
</ul>
<p><strong>Các công cụ remote, ssh tới Linux: </strong><br />
Đây là nhóm công cụ thao tác với Linux nói chung, chúng bao gồm các công cụ để điều khiển và kiểm soát Linux (ssh, remote ...). Trong những điều kiện nhất định, không phải lúc nào các bạn cũng ngồi trước máy chủ và ngồi ngắm nhìn nó, bằng cách sử dụng các công cụ này các bạn có thể thao tác với Linux.</p>
<ul>
<li><em><strong><a href="http://www.putty.org/">Putty(miễn phí)- </a></strong></em>Công cụ ssh tới Linux : Làm việc trong linux chắc chắn bạn phải sử dụng termal để cài đặt và thao tác với nó, công cụ này rất hữu ích, đóng vai trò là phần mềm ssh client, giúp bạn remote tới máy chủ linux ở xa. Link tại đây: http://www.putty.org/</li>
<li><em><strong><a href="http://winscp.net/eng/download.php">WinSCP (miễn phí):</a></strong></em> Đây là một công cụ dạng đồ họa, giúp bạn thuận tiên hơn trong các thao tác copy hoặc duyệt các thư mục trong Linux, nếu bạn "lười" và muốn thực hiện các thao tác kéo thả thì công cụ này cũng không thể thiếu trong khi làm việc với Linux. Ngoài ra, việc duyệt thư mục và chỉnh sửa các file cấu hình trong linux cũng có thể thực hiện bằng WINSCP. Link phần mềm tại đây: http://winscp.net/eng/download.php</li>
<li><a href="https://code.google.com/p/superputty/"><em><strong>Super Putty (miễn phí):</strong></em></a> Nếu như putty đã mạnh rồi thì Super Putty còn mạnh hơn. Đây có thể nói là sự kết hợp khá hoàn hảo và nó giải quyết nhu cầu thực tế của nhiều sysadmin. Bởi vì, mặc định thì putty không cung cấp tính năng có nhiều tab trong một của sổ, nghĩa là khi bạn ssh tới nhiều máy chủ hoặc muốn mở nhiều phiên kết nối linux thì bạn phải bật nhiều cửa sổ rời rạc đồng thời. Nhưng với Supper Putty thì nhu cầu này của bạn đã được giải quyết, bạn có thể có nhiều tab trong một cửa sổ, việc này nhằm tăng hiệu quả và thao tác tốt hơn khi làm việc cùng OpenStack, Linux. Link chi tết tại đây: https://code.google.com/p/superputty</li>
</ul>
<p><strong>Các công cụ soạn thảo và ghi chú, note, task:</strong><br />
Khi làm việc với OpenStack hay bất cứ công việc nào khác, bạn cần phải phân loại được các đầu việc, ghi chép lại các thông tin quan trọng. Đây cũng là một thói quen nên tập và hình thành theo thời gian. Hãy để cho đầu óc bạn đỡ phải ghi nhớ các thông tin không cần thiết.</p>
<ul>
<li><a href="http://notepad-plus-plus.org/"><em><strong>Notepad++ (miễn phí):</strong></em></a> Đây có thể nói là công cụ khá mạnh (theo ý kiến mình) đối với những người làm sysadmin, lập trình :D ... Nó có thể coi là phiên bản nâng cao của notepad huyền thoại mà windows cung cấp. Sử dụng Notepad++ cho việc soạn thảo các shell, chỉnh sửa lại các cấu hình mẫu rất tiện lợi với các tính năng tìm kiếm, thay thế chuỗi ...các phím tắt. Mặc định thì Notepad ++ đã mạnh rồi, nhưng nếu bạn biết khai thác các plugin kèm theo và các phím tắt thì quả là điều tuyệt vời.  Link tại đây: http://notepad-plus-plus.org/</li>
<li><a href="http://pnotes.sourceforge.net/"><em><strong>Pnote (miễn phí)</strong></em>:</a> Đây là công cụ ghi chép các chú ý, các vấn đề quan trọng, nó giống như cuốn sổ tay của bạn (nhưng hoạt động trên máy tính). Mục đích mình sử dụng công cụ này là để ghi chép lại những chú ý quan trọng khi làm việc, nó có thể là một đầu việc gì đó cần phải hoàn thành hoặc một sự kiện gì đó diễn ra vào tương lai .... hay một câu nói gì đó mà mình tâm đắc ... Cụ thể trong OpenStack, mình hay note lại những lệnh quan trọng hoặc các vấn đề còn vướng mắc để giải quyết.</li>
<li><a href="https://en.todoist.com/"><em><strong>Todoist (miễn phí):</strong></em></a> Mới đây, mình có tham khảo các bloger và những người làm việc với OpenStack, họ cũng chia sẻ các tools giúp họ làm việc được thuận lợi hơn và mình biết đến Todoist. Đây là một công cụ khá hay, mục đích của nó giống như người thư kí riêng của bạn, nó sẽ nhắc nhở bạn những việc gì cần làm, việc nào trước, việc nào sau. Điều này rất quan trọng, khi tìm hiểu OpenStack sẽ có rất nhiều vấn đề bạn sẽ vướng mắc, sẽ gặp phải. Vậy làm thế nào để nhớ được và bố trí thời gian hợp lý. Giải pháp của mình là sử dụng công cụ "nhắc việc" và "gán việc" - thuật ngữ gọi là các task. Đặc biệt công cụ này sử dụng trên mọi nền tảng, tích hớp với mail, sử dụng trên điện thoại, add-on cho web ....Bạn có thể tham khảo tại đây: https://en.todoist.com/</li>
</ul>
<p><strong>Các công cụ hỗ trợ từ xa trao đổi, chụp ảnh màn hình, chứa log.</strong><br />
Kể cả trước đây hay bây giờ, mình thường xuyên nhờ hỗ trợ từ cộng đồng và hỏi đáp. Lúc thì mô tả các tình huống, lúc thì gửi lại sự kiện qua mail ... nhưng với các công cụ hiện nay thì việc hỗ trợ sẽ tốt hơn nếu bạn biết khai thác chúng.</p>
<ul>
<li><a href="http://www.teamviewer.com/"><em><strong>Teamviewer (miễn phí):</strong> </em></a>Công cụ điều khiển máy tính từ xa, với các sysadmin thì nó quá phổ biến và nổi tiếng. Nó được sử dụng khi bạn muốn hoặc nhờ ai đó hỗ trợ bạn ngay trên chính máy tính của bạn. Link tại đây: http://www.teamviewer.com/</li>
<li><em><strong><a href="http://www.ammyy.com/en/">Remote Desktop Software- Ammyy (miễn phí)</a>:</strong></em> Công cụ này tương tự như Teamviewer</li>
<li>Codepad.org: Đây là công cụ (ứng dụng web) giúp các bạn lữu  trữ các text cần thiết, mình hay sử dụng nó để lưu các log phục vụ cho việc hỏi đáp và nhờ trợ giúp. Ví dụ bạn muốn gửi log cho nhóm để nhờ phân tích và hỗ trợ, thay vì gửi file cho nhiều người, hãy copy nội dung log và paste vào codepad.org, sau đó gửi cho nhóm.</li>
<li><a href="https://github.com/"><em><strong>Github</strong></em></a>: Công cụ quá nổi tiếng hiện nay, nó cũng là sản phẩm của Cloud mà mình biết. Nếu bạn nào làm phần mềm nhiều có thể biết đến khái niệm SVN (một dạng server quản lý và chia sẻ code, shell ...). Việc sử dụng github đối với các bạn làm việc về OpenStack cũng có phần quan trọng không kém, ít nhất biết đến tác dụng của github và các thao tác để tải các file từ github về. Sâu hơn nữa về github là các thao tác để upload các file (dung lượng nhỏ và nhiều file) lên github. Link https://github.com/</li>
<li><strong><em><a href="http://app.prntscr.com/"> Công cụ chụp ảnh màn hình - Lightsoht:</a></em></strong> Đây là công cụ cần thiết nếu bạn muốn nhờ hỗ trợ, nó giúp bạn chụp màn hình với các thao tác chuột đơn giản, sau đó bạn có thể đánh dấu những điểm quan trọng trong hình (dòng bị lỗi, hoặc nút bị lỗi) rồi gửi hình đó lên mạng. Ứng dụng này có thể áp dụng cho nhiều tình huống nhưng trong lúc làm việc với OpenStack chủ yếu để chia sẻ các ảnh chụp từ màn hình. Anh chụp này sẽ đươc upload tự động, bạn chỉ cần gửi link cho người muốn chia sẻ.</li>
</ul>
<p><strong>Công cụ "bản đồ tư duy"</strong><br />
Các công cụ này giúp các bạn có những cái nhìn tổng quan về vấn đề nào đó hoặc xây dựng ý tưởng, lên timeline cho các công việc.  Ciệc sử dụng các công cụ "bản đồ tư duy" giúp các bạn làm việc nhóm và hình thành ý tưởng tốt hơn. Mình hay sử dụng các công cụ sau:</p>
<ul>
<li><a href="http://www.mindjet.com/"><em><strong>Mindjet (có phí): </strong></em></a>http://www.mindjet.com/</li>
<li><a href="http://www.xmind.net/"><em><strong>X-mind (miễn phí): </strong></em></a>http://www.xmind.net/</li>
</ul>
<p><strong>Công cụ về đồ họa:<br />
</strong>Các công cụ vẽ mô hình là không thể thiếu, mặc dù trong windows mình sử dụng bộ công cụ huyền thoại của MS - Visio nhưng trong bài này mình chia sẻ các công cụ vẽ hình trực tuyến. Điều này có nghĩa rằng, bạn có thể chia sẻ các mô hình qua mạng xã hội, qua email .... Đặc biệt, các công cụ này có các tính năng sử dụng các bộ icon được cung cấp miễn phí.</p>
<ul>
<li>draw.io</li>
<li>https://www.gliffy.com/</li>
</ul>
<p>Trên là một số công cụ làm việc mà mình sử dụng trong quá trình làm việc cùng OpenStack mà mình muốn chia sẻ với các bạn. Trong quá trình tìm hiểu, mình luôn cập nhật và tham khảo các công cụ này từ những người làm việc trực tiếp với OpenStack, hi vọng các công cụ này sẽ giúp các bạn làm việc tốt hơn với OpenStack. Các bạn cũng có thể đóng góp và chia sẻ các công cụ khác cùng mục đích, mình sẽ cập nhật và bổ sung để hoàn thiện.</p>
<p>Cám ơn sự quan tâm của các bạn</p>
<p>VIETSTACK</p>
<p>&nbsp;</p>
