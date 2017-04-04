---
layout: post
title: "[Tản mạn]Câu chuyện về dịch chuyển ứng dụng lên cloud"
date: 2016-08-10 15:49:48.000000000 +07:00
type: post
published: true
status: publish
categories:
- Tech
- News
tags:
- Migrate
- CloudApp
meta:
  _wpcom_is_markdown: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '25654887312'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>Trong dự án gần đây nhất khi VietStack triển khai nền tảng cloud dùng OpenStack cho một tập đoàn công nghệ tại Việt Nam trong năm 2016, chúng tôi gặp lại câu hỏi:</p>
<ul>
<li>Thế vấn đề triển khai các ứng dụng trên OpenStack như thế nào? Liệu nếu dùng nó thì có thể triển khai cái A,B,C, etc. được không.</li>
</ul>
<p>VietStack cũng đã được hỏi rất nhiều câu hỏi liên quan đến việc triển khai các ứng dụng trên nền tảng cloud trong những lần tư vấn cho NetNam, CMC Việt Nam, Đại học Đại Nam, etc. tuy nhiên ta cần phải nhìn nhận lại rằng, câu trả lời cho vấn đề này không chỉ liên quan đến các nhà cung cấp dịch vụ cloud, mà quan liên quan chặt chẽ đến bản thân khách hàng - những người có nhu cầu sử dụng dịch vụ cloud.</p>
<p>Khoan hãy nói về các nhà cung cấp dịch vụ cloud, lần này VietStack muốn hướng đến chính bản thân những người dùng cloud và câu chuyện về sự liên quan chặt chẽ giữa người dùng và công cuộc chuyển dịch các ứng dụng lên nền tảng cloud.</p>
<p>Một trong những người bạn của VietStack nhận được một lời đề nghị sang làm việc cho Walt Disney với nhiệm vụ tích hợp các giải pháp cloud để triển khai các domain của Walt Disney. Nói nôm na là ông Walt Disney muốn dùng AWS, Google Cloud, OpenStack để triển khai các ứng dụng về webserver và một số các ứng dụng khác của riêng họ. Câu hỏi đặt ra là: Tại sao họ lại phải dùng nhiều môi trường cloud để triển khai các app? Tại sao ứng dụng A chạy trên AWS cho output là input cho ứng dụng B chạy trên Google cloud, sao không cho chúng nó chạy trên luôn một cloud cho khỏe (mặc dù AWS hỗ trợ vô cùng tốt các tính năng cho ảo hóa hiện thời và liên tục nghiên cứu, phát triển các tính năng mới) :s? vân vân và vân vân sự thắc mắc khi chúng tôi trao đổi thông tin với nhau. Ta có thể nhận thấy một điều rõ ràng rằng phải có lý do nào đó mà Walt Disney không triển khai trên cùng một cloud, phải chăng AWS không đáp ứng được yêu cầu nên phải dùng Google Cloud? Câu trả lời này hi vọng các bạn sẽ tự tìm được cho riêng bản thân mình.</p>
<p>Bên cạnh đó, dạo gần đây một thành viên trong VietStack nhận được lời mời sang Nokia làm việc, một trong những nhiệm vụ của anh ta là phải phát triển được một sản phẩm giúp người dùng triển khai các app một cách dễ dàng trên nền tảng OpenStack. Vấn đề đặt ra ở đây là các app nó muôn hình vạn trạng, có quá nhiều yêu cầu hệ thống, network, dữ liệu, etc. để đảm bảo các app chạy và “sống” tốt trên môi trường OpenStack. Tuy nhiên để làm được điều này thì điều tiên quyết đầu tiên chính là việc phải tìm hiểu thật cặn cẽ các app mà sản phẩm này được yêu cầu hỗ trợ, e.g. app A đòi hỏi clustering giữa các máy ảo, I/O throughput phải đặt tốc độ X, độ trể Y, các virtual CPU phải được pin chính xác theo thứ tự a,b,c nào đó, etc. Quả thực là một thách thức rất thú vị cho anh bạn của nhóm VietStack chúng tôi.</p>
<p>Quay trở lại câu chuyện về Ericsson - nơi mà một thành viên khác trong VietStack đang “ngụp lặn”, họ đang dần dần chuyển dịch các ứng dụng của họ lên trên sản phẩm Ericsson Cloud. Anh bạn Ericsson của chúng tôi có trao đổi về những khó khăn mà đội ngũ infrastructure gặp phải trong công cuộc hỗ trợ đội ngũ ứng dụng “lên mây”. Rất nhiều tình huốn, lỗi về kỹ thuật diễn ra mà nguyên do chính là các thành viên của team ứng dụng - dưới cái nhìn là end-user của cloud - họ sử dụng cloud không đúng cách. Một phần là họ chưa hiểu hết về Ericsson Cloud, một phần nữa là họ chưa thực sự hiểu hết được các yêu cầu về infrastructure cho một ứng dụng telco cụ thể (xin nhắc lại là Telco app là một trong những ứng dụng vô cùng phức tạp). Chính vì điều này mà tốn rất nhiều thời gian trao đổi qua lại giữa các bên.</p>
<p>Qua các usecase cụ thể này ta mới thấy được mối quan hệ chặt chẽ giữa người dùng và quá trình chuyển dịch app lên cloud, điều kiện tiên quyết đầu tiên là người dùng phải hiểu thật rõ app của mình. Có rất nhiều app không cần quá nhiều hỗ trợ đặc biệt từ infrastructure như webserver, email nội bộ, etc. nhưng cũng có rất nhiều app rất phức tạp, e.g. các app đặc trưng của các ngành nghề như banking, telco, etc. đòi hỏi người triển khai các app phải nắm thật kỹ càng, rõ ràng các yêu cầu của các app. Các câu hỏi như: Liệu dùng OpenStack hay các giải pháp cloud mã nguồn mở có triển khai được ứng dụng ngân hàng không, tài chính không, etc. sẽ trở nên vô nghĩa nếu như người dùng không biết cụ thể các app đó cần cái gì từ infrastructure đề có thể hoạt động được. Nếu bài toán này được giải quyết thì việc đặt câu hỏi cho các cloud vendor cho hoặc tự đặt câu hỏi cho chính mình trong quá trình chọn lựa giải pháp cloud mới thực sự sâu sát và đem lại hiệu quả cao.</p>
<p>Một yếu tố khác nữa chính là đến thời điểm này, chưa có một giải pháp cloud nào phù hợp cho toàn bộ các app hiện có. Do đó để chọn lựa một giải pháp cloud nào đó phù hợp để triển khai app, người dùng cần phải hiểu được thật chi tiết các sản phẩm cloud, đặc biệt là cloud mã nguồn mở. Đối với các ứng dụng phức tạp thì việc có một đội ngũ kỹ sư cloud là một điều rất đáng lưu ý.</p>
<p>9-8-2016</p>
<p>VietStack</p>
