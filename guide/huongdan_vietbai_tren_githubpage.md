### Hướng dẫn viết bài cho blog VietStack

- Blog của vietstack sử dụng nền tảng `jekyll`, host trên githubpage

### Các bước viết bài cho blog VietStack

#### Bước 1: Fork repos của blog về tại link sau

```sh
https://github.com/vietstacker/vietstacker.github.io
```

- Sau khi fork sẽ có link như sau

```sh
https://vietstackergithub.com/congto/vietstacker.github.io
```

#### Bước 2: Clone về máy cá nhân

- Dùng lệnh clone hoặc tool để clone repos từ git cá nhân về máy tính.

```sh
git clone https://vietstackergithub.com/ten_git_ca_nhan/vietstacker.github.io
```

#### Bước 3: Soạn bài viết theo định dạng `markdown` và đặt tại thư mục `_posts` theo cú pháp sau

##### Đối với tên file đặt theo định dạng

- Đặt tên bài viết theo cú pháp sau: 

```sh
nam_thang_ngay_TENBAIVIET.md
```

- Ví dụ

```sh
2014-03-07-tai-sao-toi-vietstack-theo-duoi-openstack.md
```

##### Đối với nội dung bài viết

- Bài viết có 2 phần: Phần quy tắc đặt tên và phần nội dung.
- Trong phần quy tắc đặt tên thì cần đảm bảo có các mục dưới

```sh
---
title: Tại sao "tôi" (VIETSTACK) theo đuổi OpenStack
date: 2014-03-07 16:42
comments: true
tags:
- news
categories:
- news
- tech
---
```

- Trong đó:
  - `title`: Là tiêu đề của bài viết.
  - `date`: Là thời gian bài viết sẽ hiển thị trên blog, đặt theo cú pháp trong mẫu trên.
  - `comments`: Là tùy chọn có cho phép hiển thị chức năng comment hay không.
  - `tags`: Là tùy chọn để đưa các tag vào bài viết, mục tiêu sau này phân loại và tìm kiếm dễ dàng. Tag này đặt tùy ý theo tác giả, nên đặt các từ khóa trong bài viết hay dùng.
  - `categories`: Là tùy chọn để chỉ ra các categories của blog, trong blog đang phân loại làm 2 categories là `tech` và `news`
  
  
- Sau đoạn quy tắc đặt tên là đoạn nội dung của bài viết, bắt đầu sử dụng cú pháp markdown từ đây.
- Với các đoạn code có trong bài viết thì sử dụng cú pháp dưới để đánh dấu các đoạn code và hiển thị lên blog, đoạn code nằm trong cặp `{% highlight python %}` và `{% endhighlight %}`. Ví dụ:

```sh
{% highlight ruby %}
Đặt code của bạn vào đây
{% endhighlight %}
```

- Sau khi soạn bài xong, thực hiện commit lên git cá nhân và gửi pull sang git của vietstack 



