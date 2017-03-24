---
layout: post
title: "Cấu trúc blog VietStack"
date: 2017-03-24 9:21:35
image: '/assets/img/'
description: 'Mô tả về cấu trúc blog của VietStack.'
tags:
- news
categories:
- news
- vietstack
twitter_text: 'Put your twitter description here.'
---

Blog của VietStack được xây dựng trên nền tảng `JEKYLL` và host trên github.com. Các bài viết của blog sử dụng cú pháp `markdown` và tuân theo cú pháp sau:

- Các bài viết được đặt trong thư mục `_post` trong repos.
- Mỗi bài viết được đặt tên theo dạng `year_month_day_Tieudebaiviet`
- Trong mỗi bài viết gồm 2 phần chính: Phần `mở đầu` và phần `nội dung chính`

{% highlight ruby %}
---
layout: post
title: "Cấu trúc blog VietStack"
date: 2017-03-24 9:21:35
image: '/assets/img/'
description: 'Mô tả về cấu trúc blog của VietStack.'
tags:
- news
categories:
- news
- vietstack
twitter_text: 'Put your twitter description here.'
---
{% endhighlight %}


Tiếp theo là phần nội dung chính của blog, phần nội dung này được soạn theo cú pháp của markdown

```
đặt cú pháp markdown vào đây
```

Trong đó: 

- Các `tags` được đặt theo nhu cầu của tác giả, gợi ý: đặt tag theo các từ khóa kỹ thuật để tìm kiếm khi cần.
- Các `categories` được đặt theo quy định của nhóm, có các `categories` sau: 
  - tech: Các bài viết về kỹ thuật
  - news: Phân loại các bài viết về tin tức
  - vietstack: phân loại các bài viết về VietStack
