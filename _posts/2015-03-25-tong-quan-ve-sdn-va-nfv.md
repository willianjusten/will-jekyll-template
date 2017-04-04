---
layout: post
title: Tổng quan về SDN và NFV
date: 2015-03-25 20:47:56.000000000 +07:00
type: post
published: true
status: publish
categories:
- Tài liệu tham khảo
- Tech
- News
tags:
- SDN
- NFV
meta:
  _edit_last: '61498925'
  _publicize_pending: '1'
  geo_public: '0'
  _oembed_4fc5247f74f394e54c9ad9ac2bbb3325: "{{unknown}}"
  _oembed_5097bf26a7fea92a583f85cf60d17498: "{{unknown}}"
  _oembed_d77681df9465c293764ea9fc5062d5a7: "{{unknown}}"
  _oembed_bf55b82502f50748571122b66c00f1e5: "{{unknown}}"
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<h3 class="western"><strong>1. Tổng quan về SDN</strong></h3>
<p class="western" style="text-align:center;"><a href="https://vietstack.files.wordpress.com/2015/03/sdn-3layers.gif"><img class="aligncenter wp-image-457 " src="{{ site.baseurl }}/pictures/sdn-3layers.gif?w=300" alt="sdn-3layers" width="435" height="284" /></a></p>
<p class="western" style="text-align:center;">Figure 1. Model 3 lớp của SDN. (Nguồn: opennetworking.org )</p>
<p class="western">Software Defined Network (SDN) là một cấu trúc mới, được thiết kế cho phép hệ thống mạng trở nên linh động và có hiệu quả chi phí hơn (Fig.1). SDN là một khái niệm mang tính lý thuyết, về mặt bản chất, SDN tách riêng các control plane phân tán (distributed) từ các forwarding plane và đưa (offload) các chức năng của control plane vào trong control plane tập trung (centralized). Control plane và forwarding plane là 2 dạng tiến trình mà các thiết bị mạng đều thực hiện. Ví dụ, tại cấu trúc mạng truyền thống, nếu ta truy cập vào router, trực hiện các tác vụ như cấu hình các giao thức gateway, etc. thì các hoạt động này đều được thực hiện trên cùng một thiết bị (trên control plane và forwarding plane của router), do đó các nút (node) trong network hoạt động một cách độc lập dựa trên các cấu hình nội bộ tại chính các nút đó. Điều đó có nghĩa, cho dù cấu trúc mạng có linh động, hiệu quả như thế nào thì kết quả của các tác vụ hoạt động trong mạng phải phụ thuộc vào cấu hình của từng nút. Nếu như số lượng nút nhiều (1000, 10000 nodes) thì đồng nghĩa các nhà vận hành mạng phải quản lý toàn bộ (1000, 10000) control plane ( process quản lý hầu như toàn bộ hoạt động của thiết bị mạng).</p>
<p class="western">Chính vì những khó khăn trên, SDN ra đời nhằm mục đích “chuyển” cấu trúc control plane từ phân tán sang tập trung. Control plane tập trung (SDN controller) cho phép chuyển tiếp các quyết định về flow thông qua SDN domain thay vì phải qua từng hop.</p>
<p class="western">Các tập đoàn lớn như Cisco, HP, IBM, VMware đều tự phát triển các SDN controller riêng của họ. Ngoài ra, còn có một số dự án mã nguồn mở về SDN controller như Floodlight hay OpenDayLight. Trong SDN, controller được ví như “bộ não”, nó thống kế tất cả thông tin từ các flow switch ở trong mạng, cung cấp cái nhìn tổng thể bên trong của network (e.g. trong mạng truyền thống, một switch đơn lẻ sẽ không thể nhận biết toàn cảnh network , sự kết nối giữa các switch với nhau). SDN controller có open northbound (programmatic) và southbound (implementation). SDN controller có thể chạy trên máy ảo được host trên x86 server hoặc có thể chạy trên bare metal (x86 hoặc là một thiết bị nào đó).</p>
<p class="western"><a href="https://vietstack.files.wordpress.com/2015/03/sdn.png"><img class="aligncenter  wp-image-459" src="{{ site.baseurl }}/pictures/sdn.png?w=300" alt="SDN" width="439" height="243" /></a></p>
<p class="western" style="text-align:center;">Figure 2. SDN architecture. (Nguồn: Cisco.com)</p>
<p class="western"><strong>Tóm lược về đặc điểm của SDN:</strong></p>
<p class="western">Phân tách control và forward plane.</p>
<p class="western">Quản lý tập trung (centralized control).</p>
<p class="western">Sử dụng các protocol điều khiển và chuyển tiếp (control and forwarding protocols, e.g. Openflow).</p>
<h3 class="western">2. Tổng quan NFV ?</h3>
<p class="western">Network Functions Virtualization (NFV) chính là việc ảo hóa các chứ năng mạng như firewall, NAT, load balancer, etc. để đạt được tính linh động cao cũng như thúc đẩy việc triển khai các dịch vụ mới trong lĩnh vực cung cấp dịch vụ mạng.</p>
<p class="western">Trong hệ thống mạng truyền thống, nếu nhà cung cấp dịch vụ muốn mở rộng phạm vi khách hàng, hay triển khai, mở rộng hệ thống mạng tại vị trí mới, điều này kéo theo một loạt các yêu cầu cần thiết về thiết bị cuối (end-user device) như router hay CED device. Ngoài ra, một số thiết bị khác cũng cần phải được lắp đặt hay triển khai nếu như nhà cung cấp dịch vụ muốn monitor hay troubleshoot đường truyền cũng như traffic trong mạng.</p>
<p class="western">NFV ra đời giúp các nhà cung cấp dịch vụ mạng giải quyết các vấn đề của hệ thống mạng truyền thống bằng cách ảo hóa các chức năng mạng vào trong các ứng dụng phần mềm chạy trên các máy ảo đang hoạt động trên x86 server. Với NFV, người dùng hay nhà cung cấp có thể quản lý mạng của họ. Kết nối mạng bây giờ sẽ được chuyển từ việc sử dụng toàn bộ các thiết bị phần cứng sang việc sử dụng một số lượng nhỏ cần thiết các thiết bị phần cứng (e.g Home GW), các chức năng còn lại sẽ được ảo hóa và quản lý thông qua phần mềm.</p>
<p class="western"><a href="https://vietstack.files.wordpress.com/2015/03/traditional-nfv.png"><img class="aligncenter  wp-image-460" src="{{ site.baseurl }}/pictures/traditional-nfv.png?w=300" alt="traditional-NFV" width="382" height="218" /></a></p>
<p class="western" style="text-align:center;">Figure 3. NFV model. (Nguồn: moorinsightsstrategy.com)</p>
<p class="western"><strong>Tóm lược về đặc điểm của NFV:</strong></p>
<p class="western">Tận dụng được các máy chủ và switch có sẵn (Leverage commercial servers and switches).</p>
<p class="western">Giảm CAPEX và OPEX.</p>
<p class="western">Thúc đẩy việc cải tiến các dịch vụ.</p>
<h3 class="western">3. Bảng so sánh SDN và NFV:</h3>
<p class="western"><a href="https://vietstack.files.wordpress.com/2015/03/nfv_vs_sdn.png"><img class="aligncenter  wp-image-458" src="{{ site.baseurl }}/pictures/nfv_vs_sdn.png?w=300" alt="NFV_vs_SDN" width="362" height="210" /></a></p>
<p class="western" style="text-align:center;">Figure 4. Bảng so sánh SDN và NFV (Nguồn: Overture Networks)</p>
<h3 class="western">4. Use Cases sử dụng NFV/SDN:</h3>
<p class="western">1. VNF in service chaining.</p>
<p class="western"><a href="https://vietstack.files.wordpress.com/2015/03/service_chaining.png"><img class="aligncenter  wp-image-462" src="{{ site.baseurl }}/pictures/service_chaining.png?w=300" alt="service_chaining" width="531" height="216" /></a></p>
<p class="western" style="text-align:center;">Figure 5. Ứng dụng VNF trong service chaining. (Nguồn: Opennetworking.org )</p>
<p class="western">2. NFVIaaS (NFV infrastructure as a Service)</p>
<p class="western"><a href="https://vietstack.files.wordpress.com/2015/03/nfviaas.png"><img class="aligncenter  wp-image-461" src="{{ site.baseurl }}/pictures/nfviaas.png?w=300" alt="NFVIaaS" width="463" height="207" /></a></p>
<p class="western" style="text-align:center;">Figure 6. NFVIaaS model. (Nguồn: Opennetworking.org )</p>
<p class="western"><strong>Link tham khảo:</strong></p>
<p class="western">https://www.opennetworking.org/images/stories/downloads/sdn-resources/solution-briefs/sb-sdn-nvf-solution.pdf</p>
<p class="western">http://www.opendaylight.org/software</p>
<p class="western">25-3-2015</p>
<p class="western">Vietstack Team</p>
