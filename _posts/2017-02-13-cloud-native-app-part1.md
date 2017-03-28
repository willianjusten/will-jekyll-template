---
layout: post
title: Cloud native app in cloud [part 1]
date: 2017-02-13 15:22
comments: true
tags:
- Devops
- Native App
- microservice
categories:
- Tech
- News
---
<p style="padding-left:180px;">CLOUD NATIVE APP IN MICROSERVICE</p>

Cũng giống như Microservice, Devops, Cloud Native App (CNA) quả thực là một “buzz word”. Trong bài viết này, chúng ta sẽ trao đổi về CNA theo 2 góc nhìn liên quan chặt chẽ dưới đây:

<ul>
<li>CNA dưới góc nhìn của microservice</li>
<li>CNA dưới góc nhìn của microservice trong môi trường cloud và hệ sinh thái xung quanh cloud</li>
</ul>

<span style="text-decoration:underline;">CNA là gì:</span> CNA là một app “thuần” (từ này hơi sloppy :D) cloud. Dưới góc nhìn high level, nó là app được thiết kế để chạy trên môi trường cloud. Nhìn rộng ra thì nó có thể chạy được trên nhiều môi trường cloud, thậm chí có thể được triển khai theo kiến trúc phân tán (distributed) trên nhiều môi trường cloud để tận dụng tối đa các nguồn lực mà cloud mang lại.
Một trong những nơi mà định nghĩa CNA đầu tiên chính là website này: http://pzf.fremantle.org/2010/05/cloud-native.html. Ngoài ra, các bạn có thể tham khảo các nguyên tắc cần thiết cho một CNA ở “the twelve-factor app”. “The twelve-factor app” là một tập hợp các nguyên tắc cần phải có cho một CNA, được các kỹ sư của Heroku - một trong những công ty đi tiên phong trong việc đưa các app lên public cloud. Tuy nhiên, ta nên lưu ý rằng, tập hợp các nguyên tắc này sinh ra để áp dụng cho cloud của Heroku, rất khó để coi đó là defacto chung cho các CNA.
Một cái nhìn khác về CNA chính là thế này:
"A cloud-native application is an application that has been designed and implemented to run on a Platform-as-a-Service installation and to embrace horizontal elastic scaling."
Đây là một khái niệm được đưa ra trong tài liệu: “Beyond the twelve-factor app”. Cá nhân tôi, nói một cách ngắn gọn thì tôi cũng thích khái niệm trên.

Các bạn có thể tham khảo các thông tin về CNA theo website dưới đây:

https://www.cncf.io/
Tuy nhiên, như ở trên đã đề cập, đây là một “buzz word”, tôi cũng không muốn lặp lại những quy tắc trên cho nên trong giới hạn bài viết này ta sẽ đi tìm/định nghĩa khái niệm này thông qua một cái nhìn khác - cái nhìn của microservice và mở rộng hơn là microservice trong môi trường cloud và hệ sinh thái cloud.
<strong>I. CNA dưới góc nhìn của microservice</strong>
<span style="text-decoration:underline;">Tại sao lại liên quan đến microservice ở đây?</span>
Trong thời điểm hiện tại của quá trình phát triển phần mềm, xét về mặt “cảm tính” thì thiết kế các app theo kiến trúc microservice là xu hướng “thời thượng” vì đơn giản rất nhiều sản phẩm của các hãng lớn đã và đang theo con đường này. Đứng dưới góc độ kỹ thuật thì quả thực microservice đem lại rất nhiều lợi ích (các bạn có thể dễ dàng tìm thấy thông tin về lợi/hại về microservice trên Internet).
Một app dưới góc nhìn tổng quát chính là sự tổng hòa của một hoặc nhiều component. CNA cũng không ngoại lệ. Như góc nhìn high-level về CNA ở trên, để nó phù hợp với môi trường cloud thì kiến trúc microservice là điều không thể tránh khỏi khi thiết kế CNA. Việc cần làm hiện nay với CNA chính là tách rời các component đó và tái thiết kế chúng theo kiến trúc microservice.

<span style="text-decoration:underline;">Vậy, microservice là gì?</span>
Theo một nguồn tin không chính thống mà tôi có được (tôi thử search google nhưng không tìm thấy thông tin :)), Vodafone định nghĩa thế này:
“A microservice is a small application implementing an atomic capability (e.g. authorisation or a single node feature) that communicates with other microservices using open, web-type APIs (e.g. HTTP, REST) remotely accessible over IP".
Tuy nhiên, một góc nhìn khác thì nó lại là thế này:D:
"If one believes Homer, Sisyphus was the wisest and most prudent of mortals. According to another tradition, however, he was disposed to practice the profession of highwayman. I see no contradiction in this." (Albert Camus - The Myth of Sysiphus)
Cá nhân tôi thì tôi thích định nghĩa ngắn gọn thế này: Microservice là một specification của SOA (Service Oriented Architecture).

Các bạn có thể dễ dàng nhận thấy tính chất “buzz” của khái niệm microservice rồi chứ. Do đó tôi nghĩ, ta nên “định nghĩa” nó dựa theo các yêu cầu mà nó cần đạt được thay vì đi tìm một định nghĩa “chuẩn mực” nào đó.

<span style="text-decoration:underline;">Yêu cầu (requirement) của microservice là gì?</span>

Câu trả lời cho vấn đề này các bạn cũng dễ dàng có được trên Internet, trong giới hạn của bài viết này, tôi không muốn lặp lại những gì đã có sẵn. Bên cạnh đó, không hề có một quy tắc/quy định toàn cầu nào về việc phân tách một app thành các microservice, do đó tôi nghĩ ta nên quay ngược lại để tìm về bản chất của vấn đề để hiểu sâu hơn, qua đó ta sẽ có cái nhìn tổng hợp hơn, toàn cảnh hơn. Ta sẽ thảo luận về một số các keywords quan trọng trong việc thiết kế microservice, sau khi hiểu được nó rồi, quay lại với các yêu cầu về microservice (được thảo luận rất nhiều trên Internet), ta sẽ có góc nhìn cũng như cảm nhận rõ ràng về nó.

Trước tiên tôi muốn nhắc đến Elasticity và Distributed. Để làm rõ nó, tôi sẽ bắt đầu từ “shard”.

<span style="text-decoration:underline;">Shard:</span>

Là một khái niệm được sử dụng rộng rãi khi nói về kiến trúc của cơ sở dữ liệu. Đây chính là một kỹ thuật trong việc horizontal partition của dữ liệu và được ứng dụng rất nhiều trong search engine vì nó đem lại performance rất tốt khi so sánh với cấu trúc vertical partition (Đây là cấu trúc của việc các row trong cơ sở dữ liệu được split theo các cột). Nó khác ở chỗ: Các shard/partition được lưu trên các server tách biệt và các row của cấu trúc dữ liệu được lưu trên các shard đó thay vì bị split theo column (ta có thể lấy khái niệm sharding trong Mongodb để làm reference cho việc này).

Một trong những lợi ích rõ ràng nhất của việc horizontal partition chính là việc kích cỡ của các table giảm đi, index size cũng giảm đi, tạo ra một performance rất tốt cho các tác vụ tìm kiếm dữ liệu (e.g. search engine). Tuy nhiên nó cũng sẽ có một số nhược điểm như sự lệ thuộc vào liên kết (interconnection) giữa các shard/servers, latency khi query nhiều shard, etc. Những thông tin về shard ta có thể dễ dàng tìm thấy trên internet.

Shard là một khái niệm rất phổ biến hiện nay (mặc dù tư tưởng của nó ra đời khá lâu rồi) và lý do tôi nhắc về nó trước tiên vì nó là một ví dụ điển hình cho khái niệm “Share Nothing Architecture”.

<span style="text-decoration:underline;">Share Nothing Architecture:</span>

Đây là một ý niệm về một cấu trúc phân tán mà mỗi node trong cấu trúc này độc lập, self-sufficient (không biết dịch tiếng Việt :D). Cấu trúc này sẽ loại bỏ single point of contention xảy ra giữa các node. Ý niệm này đem đến một lợi ích lớn nhất chính là Elasticity. Elasticity nói tóm tắt chính là khả năng thay đổi kích cỡ của cluster trong hệ thống phân tán.

Link tham khảo: http://www.zdnet.com/article/shared-nothing-coming-to-open-source/

Quay trở lại với shard ở trên thì shard chính là một ví dụ điển hình cho kiến trúc Share Nothing khi ta áp dụng kiến trúc này vào trong database, mỗi node chính là một shard/partition. Khái niệm sharding được Google “phát minh” và Google sử dụng các lợi ích của nó một cách triệt để cho search engine. Cũng chính vì lý do này mà chiến lược của Google chính là sử dụng các hardware thông thường (không cần quá lớn resources về CPU, RAM, etc.) cho hệ thống của họ.

Với Share Nothing Architecture, ta thấy được rõ rệt nhất 2 yếu tố chính là: Distributed and Elasticity. 2 yếu tố này góp phần tạo nên các yêu cầu cần thiết cho việc thiết kế theo kiến trúc microservice trong software.

<span style="text-decoration:underline;">Keyword tiếp theo chính là Loosely Coupled</span>

Nói một cách đơn giản, loosely coupled là một cụm từ để chỉ về việc các microservice (ta có thể gọi là microservice1, microservice2, etc.) được triển khai, hoạt động, upgrade/downgrade, scale mà không ảnh hưởng tới các microservice khác. Từ đó các microservice đơn lẻ có thể được đóng gói (packaged) và chuyển đi (delivered) một cách độc lập và dễ dàng đến khách hàng.

Đây là một yêu cầu bắt buộc của microservice trong môi trường phân tán cũng như cloud. Nó cũng là một ví dụ điển hình về tính chất của kiến trúc Serverless (Serverless Architecture). Lấy ví dụ cụ thể về OpenStack, khi ta nhìn OpenStack là một phần mềm/app, thì các services như Nova, Neutron, Cinder, etc. chính là các microservice. Việc triển khai, vận hành (nếu cùng chung version hoặc các version hỗ trợ nhau), upgrade, scale của một service đều không ảnh hưởng đến các service còn lại. Nhìn cận cảnh hơn một chút khi bản thân các services (Nova, Neutron, Cinder, etc.) trong OpenStack cũng được cấu thành từ các microservice (e.g. Neutron được cấu thành từ neutron-server và các
agents).

Tuy nhiên, trong nội tại của một microservice, ta cần phải vô cùng lưu ý đến tính high-cohesion (tính gắn kết cao) của các chức năng (functionality) cấu thành nên nó. Các chức năng này phải có mối quan hệ chặt chẽ với nhau, nếu một chức năng nào đó cần thay đổi, ta có thể dễ dàng thực hiện việc thay đổi này trong nội hàm của một microservice mà không gặp quá nhiều vấn đề về implementation.

<span style="text-decoration:underline;">Size of service:</span>

Bản thân size của một microservice không phải là vấn đề quan trọng tối cao trong thiết kế. Cái mà tôi muốn đề cập ở đây chính là ta cần phải tách một app theo kiến trúc microservice có kích cỡ như thế nào là phù hợp.

Một microservice có thể cung cấp một hoặc nhiều functionality. Nếu ta phân tách kích cỡ theo functionality thì liệu nó có đảm bảo sự thuận lợi cho integration, testing, packaging, delivery, etc. Có thể với app này, sự phân tách như thế này là tốt, nhưng không ai dám chắc là với app khác, nó cũng hoạt động tương tự. Thay vào đó, sự phân tách theo kích cỡ không phụ thuộc vào yếu tố kỹ thuật mà phụ thuộc vào yếu tố kinh doanh (business). Đây chính là khái niệm “model around business concepts”.

Trong khái niệm “model around business concept”, các câu hỏi vô cùng quan trọng như: “Kết cấu/tổ chức của công ty như thế nào để phù hợp với kiến trúc hướng dịch vụ?” hay “Kích cỡ của một team như thế nào để phù hợp với việc phát triển một dịch vụ” cần phải được giải đáp.
Định luật Conway chỉ ra rõ ràng mối quan hệ khăng khít giữa cấu trúc/kích cỡ của cơ quan/tổ chức/team với cấu trúc/kích cỡ của các app mà họ đang phát triển. Qua đó việc tổ chức trong cơ quan sẽ phản ánh trực tiếp đến cấu trúc các app mà cơ quan đó đang làm.

<u>Lời kết:</u>

Các keywords trên đấy tôi nghĩ sẽ cho các bạn một số cảm nhận nào đó về microservice. Việc định nghĩa nó như thế nào đó là tùy thuộc vào các bạn, tuy nhiên cá nhân tôi nghĩ, khi ta hiểu được các ý nghĩa cốt lõi thì ta sẽ có chung những quan điểm tại một khía cạnh nào đó của vấn đề.

CNA cần phải được thiết kế theo kiến trúc microservice để phù hợp với môi trường cloud. Với các cloud app được phát triển trong thời gian gần đây, kiến trúc microservice luôn là sự lựa chọn tối ưu. Tuy nhiên, đối với các legacy app, việc tách thành các microservice không phải là một quá trình dễ dàng. Nó có thể làm thay đổi toàn bộ cấu trúc công ty cho nên điều này cần phải được cân nhắc kỹ lưỡng.

...tobe continued

Kỷ niệm sinh nhật 3 năm của VietStack (13/2/2014 - 13/2017),

Vietstack team
