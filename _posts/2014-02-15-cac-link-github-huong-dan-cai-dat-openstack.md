---
layout: post
title: Các link - github hướng dẫn cài đặt OpenStack
date: 2014-02-15 09:01:38.000000000 +07:00
type: post
published: true
status: publish
categories:
- Bài dịch - Tài liệu
- Hướng dẫn cài đặt
- News
tags:
- cài đặt
- github
- havana
- vietsi
- VietStack
meta:
  _edit_last: '61498925'
  _wpas_skip_6397889: '1'
  publicize_facebook_url: https://facebook.com/1382583638677557
  _wpas_done_6303274: '1'
  _publicize_done_external: a:1:{s:8:"facebook";a:1:{i:100007778017926;b:1;}}
  publicize_twitter_user: VietStack
  publicize_twitter_url: http://t.co/7II56WVcOd
  _wpas_done_6303278: '1'
  _wpas_skip_6303274: '1'
  _wpas_skip_6303278: '1'
  _oembed_577d68b95086ff9b3df9a564ce023926: "{{unknown}}"
  _oembed_38b37c724864c48fb5f55f79d8311310: "{{unknown}}"
  _oembed_a3be61f96343471b3da5b51b4a194027: "{{unknown}}"
  _oembed_85537c2e8a4d0e6ac787a5900bf5f62f: "{{unknown}}"
  _oembed_b55844c21d6fe8daaa41caa178cb5bfe: "{{unknown}}"
  _oembed_f24f431149dbeba65721c39b8caef7f1: "{{unknown}}"
  _oembed_5e596240345eb3465fff95b380ceaa80: "{{unknown}}"
  _oembed_b1c825dae83fd565e196f95d9f2d0bc8: "{{unknown}}"
  _oembed_0eb843847870ca1a9691ff1482d2ba4c: "{{unknown}}"
  _oembed_42b889247578be2c7c6c386ea07917f5: "{{unknown}}"
  _oembed_3e09dc004fe5896c0e70ddb2af1a47e3: "{{unknown}}"
  _oembed_f672a7fa73d19d0d54c96ba97008c464: "{{unknown}}"
  _oembed_010a90b1684f59287601a56a6f1453a5: "{{unknown}}"
  _oembed_20c2013689fc1d709df5cbe23fb8c1b7: "{{unknown}}"
  _oembed_1d7209e18851329a4ec5e227548cddff: "{{unknown}}"
  _oembed_b516ba77b8fe068ced3fff2f69d60672: "{{unknown}}"
  _oembed_3947e3e2ddd16f7cba217a2862697ab7: "{{unknown}}"
  _oembed_14ab1e4948dd1f4edbb357c040980a9e: "{{unknown}}"
  _oembed_581a1d0e8d495b5f72d9aeb850913d76: "{{unknown}}"
  _oembed_f8442141cb41a178f07a666fef076fd8: "{{unknown}}"
  _oembed_e79405fab15f04b9a43c77567c244f2b: "{{unknown}}"
  _oembed_d3bc7a701d42b71252a6e9a49a3ea1d6: "{{unknown}}"
  _oembed_704ab8d9e871ed6c8c4ddf2ceb3eff38: "{{unknown}}"
  _oembed_8a8ae36d3d19010ec0d8faba89b6d28a: "{{unknown}}"
  _oembed_9a571c8dd863213a52a0923779c266b8: "{{unknown}}"
  _oembed_9da2a8643728cb044cf24db26f6fbf3b: "{{unknown}}"
  _oembed_a722973f31819d76febe8974a6d20e4b: "{{unknown}}"
  _oembed_94c998764a0f221ac8ebb1414aef7a36: "{{unknown}}"
  _oembed_525d4b800d00cc4e885e277aad5fbf7a: "{{unknown}}"
  _oembed_613cb63acb7eb42501fc2478204ee64f: "{{unknown}}"
  _oembed_6e20715e3524f292f4169c841e698a1c: "{{unknown}}"
  _oembed_95ed9a5edee2ba5a49017fdd8acbf1b4: "{{unknown}}"
  _oembed_0cc49c38cbd029cbd9978aac5f28a1f4: "{{unknown}}"
  _oembed_9fd42cd59e239255e44d461a52bee26d: "{{unknown}}"
  _oembed_7c6e68c8da0f8276af90c497d0538eaa: "{{unknown}}"
  _oembed_46658268cd05ff60667f8fe0a164dde8: "{{unknown}}"
author:
  login: jackvietsi
  email: jackvietsi@gmail.com
  display_name: jackvietsi
  first_name: ''
  last_name: ''
---
<p>Khi mới tìm hiểu vấn đề gì đó, chúng ta thường cố gắng tìm các cài đặt và dùng thử để xem tính khả thi và "mắt thấy tay sờ", đây cũng là tâm lý chung, có thể nó không phải là bước đúng đắn khi tìm hiểu vấn đề nhưng tôi cũng đã từng làm như vậy - về sau tôi sẽ sửa lối tư duy này khi tìm hiểu vấn đề gì đó. Vì vậy bài viết này sẽ tập hợp các hướng dẫn giúp cài đặt OpenStack mà tôi tập hợp được và đã trải qua. Hi vọng rút ngắn được thời gian tìm kiếm và  mong rằng sau khi làm theo tôi và các bạn sẽ có những cách cài và kỹ thuật cài chuẩn chỉ. <strong>NHƯNG TÔI KHUYÊN BẠN HÃY TÌM HIỂU VỀ OPENSTACK TRƯỚC KHI CÀI</strong><!--more--></p>
<p><strong>Về cơ bản việc cài đặt OpenStack có vài cách mà tôi đúc rút ra như sau: (nếu thiếu các bạn bổ sung)</strong></p>
<ul>
<li>Cài bằng tay (gõ từng dòng lệnh) - theo tài liệu hướng dẫn từ trang chủ.</li>
<li>Cài bằng các kịch bản do cá nhân tự phát triển - các cá nhân tự viết ra kịch bản cài đặt, các kịch bản shell, python, perl ... Các cá nhân này đã đọc tài liệu và tổng hợp lại các bước vào trong các script. Tùy theo scirpt mà các bước có thể khác nhau</li>
<li>Cài bằng các công cụ do bên thứ 3 phát triển (devstack, rdo, puppet ...) - có thể hiểu là cài tự động.</li>
</ul>
<p>Và trong bài viết này tập hợp các blog, các link trên github ... hướng dẫn giúp cài đặt OpenStack theo dạng 2 - dạng kịch bản  nếu bạn đang tìm hiểu và mong muốn cài được OpenStack để xem hình thù như thế nào thì có thể tham khảo một trong các link này.</p>
<p>Github là một ứng dụng để chứa các mã nguồn, tài liệu, kịch bản dùng trong nhiều mục đích khác nhau rất tiện lợi (đặc biệt với những người sử dụng linux). Do đó các cá nhân thường có những hướng dẫn cài đặt OpenStack theo dạng step by step, các hướng dẫn cài đặt OpenStack này thường được thực hiện bằng các kịch bản (file shell, python, perl ....) và được chứa trên github.</p>
<p>Để cài được OpenStack thì các bạn chỉ cần biết sử dụng linux, đọc các hướng dẫn đi kèm và thực hiện theo hướng dẫn mà các tác giả gửi lên. Đa số các hướng dẫn này được cập nhật và sửa lỗi liên tục, do vậy nếu làm theo hướng dẫn nào đó bạn cần phải đọc kỹ và chắc chắn đã làm đúng (đúng mô hình, đúng bước, đúng nền tảng sử dụng như Ubuntu, Centos, Debian ...</p>
<p><strong>Các chú ý trước khi cài:</strong></p>
<ul>
<li>Các link này được sưu tập và tham khảo trên internet, nên cần học tập và đúc rút ra kinh nghiệm cài.</li>
<li>Mỗi kịch bản cài có thể thiếu các thành phần (project con trong phiên bản OpenStack)</li>
<li>Các hướng dẫn có thể là tham khảo của nhau (tức là tác giả này tham khảo tác giả khác và sửa đổi cho phù hợp)</li>
<li><span style="line-height:1.5em;">Bạn cần biết sử dụng github (tải các kịch bản cài đặt, các script). </span></li>
<li>Cần đọc các script mà các tác giả viết để biết xem có các thành phần nào được cài đặt và các thông số mà họ thiết lập.</li>
<li>Bạn cần sử dụng linux với các lệnh cơ bản để có thể tải về, nếu chưa hiểu lệnh khi thực hiện scrpit thì tra luôn để học và hiểu.</li>
<li>Cần đọc và nắm rõ mô hình cài đặt, số các node -máy vật lý, số card mạng, cách thiết lập IP.</li>
<li>Nếu bạn đã thực hiện thành công theo hướn dẫn nào mà chưa có thì có thể gửi để tôi bổ sung.</li>
<li>Nếu bạn phát hiện lỗi, hay trao đổi và đóng góp với tác giả.</li>
<li>Tôi không đủ thời gian và thiết bị để kiểm tra từng script nên không có khả năng giải quyết các câu hỏi, hãy liên hệ với tác giả để trao đổi.</li>
<li>Hãy học và phát triển các script để cài.</li>
</ul>
<p><strong>Các Link  trên github hướng dẫn cài đặt OpenStack</strong></p>
<ol>
<li>https://github.com/fornyx/OpenStack-Havana-Install-Guide/blob/master/OpenStack-Havana-Install-Guide.rst (một node)</li>
<li>https://github.com/Ch00k/openstack-install-aio/blob/master/openstack-all-in-one.rst (một node - All in one)</li>
<li>https://github.com/kjtanaka/deploy_havana</li>
<li>https://github.com/romilgupta/openstack-scripts (viết bằng python)</li>
<li>https://github.com/DylanYu/Openstack-Havana-Install-Guide/blob/master/OpenStack-Havana-Install-Guide.rst</li>
<li>https://gist.github.com/tmartinx/7019826</li>
<li>https://github.com/jedipunkz/openstack_havana_deploy</li>
<li>https://github.com/HolySparky/OpenStack_Installer</li>
<li>https://github.com/mseknibilel/OpenStack-Grizzly-Install-Guide (Phiên bản được tham khảo khá nhiều, từ hướng dẫn này, các tác giả tham khảo và viết ra các hướng dẫn khác, trong này có đủ các mô hình và các thành phần).</li>
<li>https://github.com/dmitry-teselkin/havana-from-packages</li>
<li>https://github.com/life1347/havana-auto-deploy</li>
<li>https://github.com/alfredcs/OpenStack-Havana</li>
</ol>
<p>Các hướng dẫn khác:</p>
<ol>
<li>http://vlabs.cfapps.io/openstack/installation/overview.html (Link này mới cập nhật, khá hay-10/03/2014 )</li>
<li>http://virtual2privatecloud.com/install-havana-on-ubuntu/</li>
<li>http://www.cloudcraft.cn/openstack-havana-install-in-ubuntu12-04-3/</li>
<li>http://openstack.redhat.com/Quickstart</li>
<li><a href="http://devstack.org/guides/single-machine.html">http://devstack.org/guides/single-machine.html</a> hoặc bài viết trên vietsi đã chia sẻ</li>
<li>http://www.andrewklau.com/getting-started-with-multi-node-openstack-rdo-havana-gluster-backend-neutron/<br />
link2 (3 node trên RDO)</li>
<li>http://blog.csdn.net/ifzing/article/details/9398029 (3 node với Ubuntu, tác giả người tàu)</li>
<li>http://www.server-world.info/en/note?os=CentOS_6&amp;p=openstack_havana&amp;f=1 ( Link hướng dẫn của người Nhật)</li>
<li>http://www.stackinsider.org/wiki/  Trang này có đơn vị quản lý là Stackinsider, họ thực hiện các mục tiêu Deploy as a Service. Họ có các bài viết hướng dẫn cài đặt OpenStack trên devstack, rdo, fule ...</li>
<li>http://www.discoposse.com/index.php/2014/01/26/openstack-havana-all-in-one-lab-on-vmware-workstation/ (trang này rất phù hợp vơi những người chưa biết gì, kể cả vmware workstation).</li>
</ol>
<p><strong><em>(Cập nhật ngày 21/02/2014 với link số 6 và số 7 trong "Các hướng dẫn khác)<br />
</em></strong><strong><em>(Cập nhật ngày 23/02/2014 với link số 8 và số 9"Các hướng dẫn khác)<br />
<strong><em>(Cập nhật ngày 11/03/2014 với link số 1và số 10"Các hướng dẫn khác. Link số 10, 11, 12 cho phần link trên github)</em></strong><br />
</em></strong><br />
Mời các bạn bổ sung tiếp.</p>
