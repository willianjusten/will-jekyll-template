---
layout: post
title: Cận cảnh cái nhìn về opensource cloud (cloud mã nguồn mở)
date: 2015-11-22 11:17:30.000000000 +07:00
type: post
published: true
status: publish
categories: []
tags: []
meta:
  _wpcom_is_markdown: '1'
  _edit_last: '61498925'
  geo_public: '0'
  _publicize_job_id: '17093159504'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p><strong>1.Cái nhìn toàn cảnh về OpenSource Cloud và OpenStack</strong></p>
<p>Tầm quan trọng của cloud mã nguồn mở và sự "nổi dậy" của OpenStack trong những năm gần đây là vô cùng mạnh mẽ. Ta có thể nhận thấy, câu chuyện về công nghệ thời thượng trong lĩnh vực IT hiện nay chính là xoay quanh 3 chủ đề: Cloud, BigData, IoT. Tuy nhiên, thông tin trên mạng rầm rộ với nhiều ý kiến đánh giá, bình luận đôi lúc khiến ta trở nên khó nhận biết được thật giả, đúng sai. Điều này ảnh hưởng trực tiếp đến các kỹ sư đã và đang làm cloud và sâu rộng hơn, nó ảnh hưởng vô cùng sâu sắc đến chiến lược phát triển công nghệ lâu dài của các công ty, tập đoàn IT, viễn thông.</p>
<p>Cloud là một ý niệm (abstraction) bao trùm rất nhiều mảng của nền tri thức IT. Bản thân open source cloud rất linh động, "nhạy cảm", luôn thay đổi về hệ sinh thái, đem lại cho cả các vendor và người dùng sự phức tạp và tính bất ổn của nó. Một số ông lớn nhận thấy được tầm quan trọng của opensource cloud đã và đang đổ rất nhiều sức người, sức của với mong muốn chiếm lĩnh được thị phần công nghệ này trong tương lai. Và tất nhiên OpenStack là "công cụ" không thể thiếu trong cuộc chơi này. Chỉ có điều.......</p>
<ul>
<li>Trong một số cuộc họp trước đây của toàn nhân viên mảng cloud trên toàn thế giới của Ericsson, giám đốc mảng cloud có nói một câu khiến toàn bộ nhân viên "câm nín": Chúng ta cũng không biết là dự án phát triển hệ thống cloud của chúng ta sẽ đi đến đâu, tôi cũng không rõ nữa. Thôi, chúng ta cứ làm thôi, hãy để tương lai trả lời. Một tương lai vô cùng bất định.</li>
<li>HP đã chính thức rời bỏ cuộc chơi Public Cloud. Với một đại gia như HP, tưởng chừng việc chiếm lĩnh thị phần cloud này sẽ có nhiều ưu thế nhưng trạng lại hoàn toàn khác biệt. Việc HP không có tính chất "đặc thù, đặc chủng" trong sản phẩm về cloud của họ khiến họ loay hoay tìm lối ra trong suốt những năm qua và cuối cùng đành "khai tử" Public Cloud. Tính "đặc thù, đặc chủng" là gì? Đối với Huawei, Ericsson chính là Telco Cloud với nền tảng telco chống lưng. Một loạt các tập đoàn telco trên thế giới như AT&amp;T (Mỹ), Docomo (Nhật Bản), Telefonica (Tây Ban Nha), etc. đã và đang sử dụng các legacy product của Ericsson, hiện tại cũng đang phải chuyển dịch lên cloud vì một lý do đơn giản: Gần như chỉ có duy nhất Ericsson mới nắm được công nghệ telco.</li>
<li>OpenStack quy chung lại cũng chỉ là một "công cụ" nguồn mở, được dùng để xây dựng cái gọi là "cloud nguồn mở". Trong cuộc chiến dài hơi trước đó với CloudStack, Eucalyptus hay bây giờ với Juju, OpenStack đã và đang cho thấy sự ưu việt của mình. Tuy nhiên, đó chỉ là sự "ưu việt" đối với các opensource cloud platform khác, còn đối với cloud nói chung, OpenStack vẫn chỉ là cậu bé mới chập chững những bước đầu tiên. Với kế hoạch marketing rầm rộ, OpenStack khiến người dùng rất dễ dàng rơi vào cạm bẫy "mơ hồ", đại loại như: OpenStack là một thứ gì đó cao siêu, thời đại này là thời đại OpenStack, chỉ cần cài đặt OpenStack là sẽ có cloud, etc. Thực tế chỉ ra rằng, chỉ cần chúng ta có cái nhìn ngược lại một chút với các mệnh đề trên, ta sẽ thấy được thực trạng của OpenStack và cloud nguồn mở.</li>
<li>Một ông lớn khác trong công nghệ phần mềm là SAP, đối với opensource cloud, họ đã và đang dùng OpenStack, tuy nhiên mới chỉ là mức độ "thăm dò". Họ vẫn tin tưởng cloud của VMware, toàn bộ sản phẩm phần mềm của SAP vẫn chủ yếu chạy trên đó. Dưới góc độ của IT, opensource cloud vẫn là một cái gì đó cần được kiểm chứng????</li>
</ul>
<p><strong>2.Vấn đề về đưa các ứng dụng lên nền tảng cloud</strong></p>
<p>Trong quá trình làm việc trực tiếp với opensource cloud, chúng tôi nhận được rất nhiều câu hỏi về việc "chuyển các ứng dụng từ legacy system lên nền tảng cloud". Các câu hỏi đều hướng đến một nội dung chung: Làm cách nào để người dùng có thể đưa các ứng dụng của họ chạy trên nền tảng cloud? Làm cách nào để có thể chuyển một ứng dụng chạy trên nền tảng cloud này sang nền tảng cloud khác? Liệu ta đã có quy chuẩn chung nào về cái gọi là "quy chuẩn cho các ứng dụng chạy trên cloud"? etc.</p>
<p>Một câu chuyện khá thú vị là một hôm trong lúc đang làm việc, một kỹ sư của mảng ứng dụng chạy lên gặp tôi hỏi một loạt câu hỏi về infrastructure cho việc ảo hóa ứng dụng của anh ta. Hiện tại ứng dụng này được chạy trên một máy ảo với nền tảng cloud OpenStack, tất nhiên là dùng một loạt các kỹ thuật như CPU pinning, NUMA topology, hay network trunking, VLAN, etc để phục vụ cho chính bản thân ứng dụng đó. Anh ta hỏi tôi về một việc đó là: Làm thế nào để quản lý được network bandwidth vì tính năng này vô cùng cần thiết cho anh ta. Sau một hồi thảo luận thì chúng tôi đều thống nhất ý kiến trong việc này, đó là hãy lưu ý đến SDN và mời anh xuống phòng SDN để hỏi thêm về kỹ thuật vì rõ ràng là tại thời điểm hiện tại, infrastructure không thể làm được việc này.</p>
<p>Qua đây ta mới thấy, rất nhiều người dùng cloud (tại tầng ứng dụng) luôn áp đặt/cjo rằng/mong muốn IaaS sẽ giải quyết toàn bộ bài toán về hạ tầng, ta chỉ cần thay vì chạy ứng dụng trên legacy, đưa nó lên cloud là chạy được. Thực tế lại khác. Với các ứng dụng đơn giản, không đòi hỏi nhiều yêu cầu khắt khe về resource thì việc chạy trên một hoặc nhiều máy ảo của cloud không phải là bài toán khó. Tuy nhiên với một loạt các ứng dụng phức tạp như ứng dụng trong ngành tài chính, ngân hàng, viễn thông, etc. thì đây là một thách thức vô vùng lớn. SaaS hi vọng IaaS sẽ cung cấp tất cả các giải pháp cho các yêu cầu về ảo hóa, chức năng mạng, etc. nhưng dưới quan điểm của IaaS, bản thân SaaS cũng cần phải được thay đổi, thiết kế lại để phù hợp với ảo hóa. Và việc thiết kế lại ứng dụng, tránh trường hợp phụ thuộc/chờ đợi vào IaaS chính là giải pháp tối ưu tại thời điểm này. Thay vì việc chờ đợi sự tiến bộ, hoàn thiện của tầng dưới, đối với các nhà cung cấp phần mềm, việc thiết kế, phát triển lại sản phẩm sao cho phù hợp với môi trường ảo hóa chính là việc vô cùng cấp thiết, cần phải được lên kế hoạch và thực hiện dài hơi. Chỉ có như thế, ta mới làm chủ được quá trình chuyển đổi ứng dụng lên hạ tầng cloud.</p>
<p><strong>3.Tạo ra thành tựu trong lĩnh vực opensource cloud</strong></p>
<p>Có rất nhiều công ty, tập đoàn đa lĩnh vực hiện nay đã và đang tiếp cận việc ứng dụng opensource cloud nhằm phục vụ mục đích của chính các đơn vị đó. Chúng tôi cũng đã tranh luận rất nhiều về việc: Nếu như ta nâng cấp hạ tầng của đơn vị mình lên cloud xong, sau đó thì làm gì? Thay vì quản lý, bảo trì hệ thống cũ, giờ ta quản lý, bảo trì cloud? Câu hỏi này vô cùng nhạy cảm và rất khó để trả lời, xin nhường lại cho các CEO và CTO, có chăng chúng ta có thể đồng ý với nhau tại một số điểm dưới đây:</p>
<ul>
<li>Opensource cloud là tổng hòa của rất nhiều thành phần tri thức của nền IT, do đó, thành tựu về cloud cũng chính là thành tựu của các thành phần này (Có hay chăng, nếu ta coi các tool như Fuel (Mirantis), Compass (Alibaba) cũng là "thành tựu" về opensource cloud?) thì rõ ràng, thế giới đã và đang thực hiện tư tưởng này với một sự cạnh tranh gay gắt và vô cùng khốc liệt. Ta cũng nhận thấy rằng, cho dù chỉ với các tool như Fuel, đó không phải công sức của 1,2 người, của một nhóm nhỏ mà là công sức của cả một tập thể với sự đầu tư lớn cho mảng nghiên cứu và phát triển.</li>
<li>Các startup thành công trong lĩnh vực cloud có xu hướng chọn một trong những mảng nhỏ của cloud như ảo hóa, networking, storage, etc. với mong muốn tạo ra được thành tựu, đem lại giá trị sử dụng cho người dùng, tuy nhiên ta cần phải nhận thức được rằng, xuất phát điểm của các startup đó đều rất bền vững về mặt kỹ thuật cũng như tài nguyên về vốn cũng như cơ sở vật chất.</li>
<li>Opensource cloud vẫn còn quá non trẻ. Việc mạnh dạn đầu tư vào lĩnh vực này cũng như canh bạc 50/50. Thành công ta có Mirantis, Aptira, Midokura, Platform 9, thất bại thì không kể siết. Có hay chăng, cuộc chơi này cấm chỉ định cho người yếu tim, chỉ dành cho những ai dám thách thức, nuôi hoài bão công nghệ.</li>
</ul>
<p>Qua đó ta có thể thấy được rằng, cuộc chơi về cloud không dành cho cá nhân, không dành cho tập thể với sự đầu tư hời hợt, mà phải là 1 tập thể vững mạnh về nguồn lực kỹ thuật cũng như sự đầu tư dài hạn về vật chất và chiến lược phát triển. Mong muốn tạo ra được thành tựu, các giá trị sử dụng đối với người dùng luôn là đích đến của mọi ngành nghề trong lĩnh vực IT. Ta hãy chờ xem, ai sẽ là người chiến thắng!</p>
<p>&nbsp;</p>
<p>21/11/2015</p>
<p>VietStack team</p>
