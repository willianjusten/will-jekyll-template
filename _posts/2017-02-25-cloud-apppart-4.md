---
layout: post
title: Cloud Native App [Part 4]
date: 2017-02-25 22:53:48.000000000 +07:00
type: post
published: true
status: publish
tags:
- Devops
- Native App
categories:
- Tech
- News
meta:
  _wpcom_is_markdown: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '2245683598'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p>Tiếp theo phần 3, phần 4 này ta sẽ thảo luận về 2 keyword cuối cùng: Failure degisn và Upgarde.</p>
<p><strong>DESIGN FAIL TOLERANCE</strong></p>
<p>Ta có thể rõ ràng nhận thấy rằng, khi nhiều instance của các app được distributed trên các node khác nhau, việc các instance giao tiếp lẫn nhau (thực chất là service của instance này giao tiếp với các service của instance khác) đều dựa trên IP (e.g. service A của instance1 sẽ send request tới URL của serviceB trên instance2). Do đó, trong môi trường distributed, qua trình propagation của failure sẽ tốn thời gian (e.g. serviceA (đóng vai trò là client) sẽ cần thời gian để nhận biết được request của mình có được thực hiện hay không do serviceB (đóng vai trò là server) bị lỗi). Do đó, các service đóng vai trò là client trong giao tiếp trên cần phải được thiết kế với các yêu cầu như sau:</p>
<ul>
<li>Có khả năng nhận biết các server failure nhanh nhất (đơn vị là giây)</li>
<li>Có khả năng re-send các request tới các server không bị lỗi nằm trên các instance khác cuả app trong môi trường distributed.</li>
</ul>
<p>Do đó, yêu cầu về failure-detection là vô cùng cần thiết để giảm thời gian cho việc client re-send các request tới các server khác. Một trong những kiến trúc cần lưu ý chính là: Circuit breaker design.</p>
<p>Trong circuit breaker design architecture, cần thiết phải có API cho mỗi service. API cần phải có chức năng “health check” của các backend service nằm trên các instance khác nhau của app, nơi mà các request từ client được route tới. API sẽ check xem backend service nào “sống”, service nào “chết” để qua đó gửi request tới nhanh nhất, rút ngắn thời gian thực hiện quá trình trao đổi thông tin hoặc có thể re-send sang một service khác khi nhận thấy service đang gửi “chết”. Có rất nhiều phương pháp cho health check như dùng các script với các protocol như TCP, SNMP hoặc có thể kiểm tra virtual hardware watchdog (với các chipset tân tiến) trong trường hợp muốn nhận biết trạng thái các máy ảo (nơi mà các app instance đang chạy).</p>
<p>Trong OpenStack, tư tưởng circuit breaker design cũng được áp dụng, ví dụ, trong Nova compute, ta sẽ thấy có nova compute api chính là api cập nhật các health check của các nova-compute service, sau đó sẽ update chúng vào trong db thông qua rpc.</p>
<p>Trong trường hợp các instance của các app được chạy trong docker container, ta sẽ cần phải có một số lưu ý khác với máy ảo. Ta sẽ thảo luận vấn đề này trong mục “hệ sinh thái cloud” của series này.</p>
<p><strong>UPGRADE:</strong></p>
<p>Một trong những tài liệu mà cá nhân tôi khá thích thú vì nó được viết rất rõ ràng và đầy đủ về quá trình uprade mà tại thời điểm này được áp dụng rất nhiều chính là quá trình upgrade với elastic resources theo định nghĩa của ETSI. Dưới đây là tổng kết nhanh về quá trình upgrade cho vnf (được triển khai dưới cấu tríc microservice, nhiều máy ảo) mà tôi thực hiện khi làm research cho vấn đề này tại Nokia. Tổng kết được viết bằng tiếng anh, mong các bạn thông cảm:</p>
<p>""""</p>
<p><span style="text-decoration:underline;">When:</span></p>
<p>We upgrade the vnf when the vnf software (running inside vdu) needs to upgrade to the new version since the new one is backward incompatible to the old one.<br />
In this upgrade process, image, flavor, etc. of vdu may/may not to be changed. Their changes depend on the requirement of vnf.</p>
<p>The vnf upgrade process closely depends on the complexity of vnf itself. In case of multiple virtual machine, statefulness, internal redundancy, dependencies ,<br />
it may need a process of clone/backup the old version of vnf.</p>
<p><span style="text-decoration:underline;">How:</span></p>
<p>The traditional upgrade with 2N redundancy in IT cloud has some drawbacks in reliability in Telco cloud environment. It may happen that the upgrade process affects to the serving capacity of vnf software or when it causes the failure, the failure recovery will roll back to the previous (old) version and the whole vnf should be restarted which will cause the service interruption.</p>
<p>Therefore, in order to avoid the above drawback, a new upgrade process technology is introduced with "elastic resources". In the nutshell, it will initiate a one or more instance of new vnf to serve the new traffic request while keeping the old vnf to serve the old traffic request. Then it increases the serving capacity of the new vnf to verify the new vnf with real traffic (may/may not need scale process), the old vnf still serves the old traffic request. The last step is decreasing the capacity of the old version to zero and totally increase the capacity of the new vnf.</p>
<p>More information can be achieved here: http://www.etsi.org/deliver/etsi_gs/NFV-REL/001_099/003/01.01.01_60/gs_NFV-REL003v010101p.pdf</p>
<p><span style="text-decoration:underline;">Summary:</span></p>
<ul>
<li>Upgrade is a process and its implementation depends on the vnf software complexity</li>
<li>In other implementations of vnfm such as Tacker, OpenMano or OPNFV, there is no definition/support/implementation of upgrade. It matches the idea of upgrade that should be a process, not a functionality</li>
<li>The updating process should be developed and supported. The upgrade process should be offload to the operator/integrator.</li>
</ul>
<p>&nbsp;</p>
<p>"""</p>
<p>Tổng kết ngắn về upgrade bên trên bao hàm toàn bộ tính chất backward compatibility của CM, logging, database, etc. Tuy nhiên, để đảm bảo quá trình upgrade cũng backward compatibility cho các yếu tố trên được thực thi một cách hoàn thiện, ta cần phải lưu ý đến các mức ảnh hưởng mà customer có thể chấp nhận nếu một trong những yếu tố trên gặp vấn đề trong lúc upgrade. Ví dụ, trong quá trình database upgrade, database nằm trên các instance (nơi lưu các dữ liệu được down từ external database) cần phải được bảo toàn. Tuy nhiên vì một lý do nào đó mà database này bị mất, ta có thể download lại database này từ external database sau khi upgrade kết thúc. Điều này có thể đòi hỏi cần phải có một external network, CPU, RAM, disk I/O, etc. những thứ mà customer có thể không chấp nhận do yêu cầu khắt khe về đảm bảo performance. Do đó, điều này cần phải được tính toán và lưu ý một cách cẩn thận.</p>
<p>VietStack team</p>
<p>25/2/2017</p>
