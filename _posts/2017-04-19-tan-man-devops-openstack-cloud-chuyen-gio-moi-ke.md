---
layout: post
title: [Tản mạn][Devops][OpenStack Cloud] Chuyện giờ mới kể
date: 2017-04-14 16:03:13.0000000 +07:0
type: post
published: true
status: publish
categories:
- Bài dịch - Tài liệu
- Chia sẻ kinh nghiệm
- Hướng dẫn - Kinh Nghiệm
- Tài liệu tham khảo
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

Thưa các bạn, trong bài viết này tôi xin phép được chia sẻ với các bạn những trải nghiệm của tôi với khái niệm DevOps. Trong quãng thời gian làm tại Ericsson và Nokia, tôi ngoài công việc của một engineering, tôi cũng có giai đoạn làm scrummaster , product owner, architect nên tôi nghĩ tôi may mắn khi có cái nhìn đa chiều về việc này. Tôi sẽ kể cho các bạn nghe vài câu chuyện về cái gọi là DevOps này :D.

DevOps là gì? Có quá nhiều định nghĩa về nó nhưng tôi thích một cách ngắn gọn thế này: DevOps là một QUÁ TRÌNH mà làm sao thông qua nó, sản phẩm được đến tay khách hàng một cách sớm nhất, đáp ứng mọi kỳ vọng mà khách hàng yêu cầu. Và hiện tại thì cái QUÁ TRÌNH này dựa trên rất nhiều lý thuyết về Agile. Mấy thứ này các bạn dễ dàng có được thông tin trên Internet.

Lúc tôi ở Ericsson để phát triển Ericsson Cloud Environment, có rất nhiều chuyện diễn ra làm cho nhóm kỹ sư vô cùng thất vọng. Từ những việc như chạy hệ thống CI, chia các branch cho dự án (master, develop branch, etc.) cho đến chuyện sự phối hợp giữa các team về dev và ops, nó thực sự đau đầu. Tôi đơn cử thế này, vì một lý do nào đó mà hardening security (e.g. ssh, authentication, etc.) trong môi trường  cloud phải thay đổi, nhóm ops phải viết lại Ansible, tuy nhiên các dev ko biết, đâm ra vẫn sử dụng các parameter cũ. Do đó khi một loạt commit sử dụng các parameter cũ của các dev được đưa lên CI sẽ break luôn cả CI, gây ra một loạt bug. Mà CI break nghĩa là sản phẩm không chạy được, không giao cho khách hàng được. Do đó chúng tôi lại phải ngồi lại với nhau, xem log là lỗi ở đâu, trong khi đó một nhóm khác vẫn tiếp tục công việc để hoàn thành sprint.

Những tưởng thế là xong phải không các bạn, nhưng ví dụ cái lỗi này nó xuất hiện gần lúc deadline phải gửi release mới cho khách hàng thì các bạn tính sao. Trong khi đó, khi theo lý thuyết Agile thì các bạn phải cố gắng hết sức để hoàn thành sprint, nhưng nếu chia team ra để tìm lỗi thì lấy đâu người để hoàn thành sprint. Do đó, nó sẽ đẻ ra cái gọi là: Stop the line. Tức là thế này, dừng toàn bộ việc dev cho sprint lại, tập trung nguồn lực fix bug, trouble shooting để đảm bảo CI phải chạy, kịp deadline cho release, còn lại sprint goal thì ta sẽ tính toán lại và tất nhiên việc tính toán lại này sẽ làm chậm việc hoàn thành các feature tiếp theo mà khách hàng mong muốn. Lúc này thì product owner, project manager phải làm cách nào đó để thuyết phục khách hàng cho mình giao sản phẩm chậm lại. Thật là mệt mỏi vì sau đó nhóm kỹ sư lại phải họp với nhau, thiết kế lại sprint goal, chính lại các task, một loạt meeting cho việc này. Quả thực là lằng nhằng và mệt mỏi. Chưa kể nhiều lúc vì lí do bắt buộc mà vừa phải fix bug, vừa phải hoàn thành features, qua thực mệt mỏi.

Mà bi hài hơn lại là thế này nữa. Có những lúc vì lý do nào đó mà một commit lỗi lại được nhóm manager merge chỉ vì kịp cho release, đảm bảo giao feature cho khách hàng cho dù nó lỗi. Xong cái một loạt bug gửi về vì cái commit này mà rõ ràng nhóm kỹ sư ko merge nó. Xong rồi cái quy trình phía trên được lặp lại, nào là "Stop the line", trouble shooting, etc.

Những lý do kiểu này nếu tích tụ dần sẽ đem lại vô cùng nhiều ức chế cho các kỹ sư.
Đến với Nokia, tôi lại gặp một tình trạng thế này: Sprint quá ngắn, quá ít product owner (PO). Các bạn đã biết là, với Agile thì sprint goal cực kỳ quan trọng. Trong mỗi một sprint, các kỹ sư phải thiết lập các task làm sao để hoàn thành feature được đưa ra từ PO. Vấn đề là sprint quá ngắn với 1 tuần, trong khi thứ 2 thì toàn meeting, còn lại 4 ngày trong tuần, chưa kể có người ốm người không, làm thế nào để hoàn thành bây giờ. Ví dụ thế này, khi sprint này ko hoàn thành, tuần tới chúng tôi lại họp vừa để thiết kế lại các task cho feature cũ, vừa phải thiết kế luôn cho cả feature mới. Khổ nỗi nếu feature mới priority của nó cao hơn (tức là feature này cần phải giao cho khách hàng sớm hơn cái cũ), thế là chúng tôi gạt cái cũ qua một bên, làm cái mới. Cái cũ làm được một nửa, chưa đầu vào đâu thì lại có cái mởi, giả sử tuần tới lại có cái mới khác mà priority cao hơn cả thì sao :(. Thế là sự việc này nó cứ tiếp diễn dài hơi, cái sau chống chéo cái trước, mỗi thứ làm được một ít, chả cái nào hoàn chỉnh, chả ra đâu vào đâu cả :(.

Chưa kể đến việc, số lượng PO quá ít, một PO ko bao quát toàn bộ một team (nếu team đó đủ lớn), do đó việc thiết kế các user story của PO bị chậm lại, delay luôn cả sprint (vì các task phải dựa trên user story của PO), hoặc là làm chậm thời gian cho release, hoặc là vô hình chung đặt áp lực lên kỹ sư phải làm cật lực để hoàn thành.

Mà tình trạng trên thì nó cứ thường xuyên diễn ra, ai cũng kêu ca. Tôi cũng đã đề xuất là tại sao không tằng sprint thành 2 tuần. Khổ nỗi là giờ tự nhiên có một thằng Tây nó đến nhà các bạn, nó bảo các bạn ăn khoai tây chiên, không được ăn cơm, các bạn có nghe không :(.

Ấy chết, mình phải đi chợ, nấu cơm phát, lễ phục sinh nên đường xá vắng tanh :(. Hẹn các bạn khi khác nha :)

14/04/2017

VietStack
