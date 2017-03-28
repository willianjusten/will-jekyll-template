---
layout: post
title: "How to use"
date: 2015-08-03 03:32:44
image: '/assets/img/'
description: 'First steps to use this template'
tags:
- jekyll 
- template 
categories:
- I love Jekyll
twitter_text: 'How to install and use this template'
---

This is a simple and minimalist template for Jekyll designed for developers that want to write blog posts but don't want to care about frontend stuff.

The Theme features:

- Gulp
- Stylus (Jeet, Rupture, Kouto Swiss)
- Smoothscroll
- Live Search
- Offcanvas Menu
- SVG icons
- Shell Script to create posts
- Tags page
- Series page
- About Me page
- Feed RSS
- Sitemap.xml
- Color Customization
- Info Customization

## Basic Setup

1. [Install Jekyll](http://jekyllrb.com)
2. Fork the [Will Jekyll Template](https://github.com/willianjusten/will-jekyll-template/fork)
3. Clone the repo you just forked.
4. Edit `_config.yml` to personalize your site.
5. Check out the sample posts in `_posts` to see examples for assigning categories and tags, and other YAML data.
6. Read the documentation below for further customization pointers and documentation.

## Site and User Settings

You have to fill some informations on `_config.yml` to customize your site.

{% highlight ruby %}
# Site settings
description: A blog about lorem ipsum dolor sit amet
baseurl: "" # the subpath of your site, e.g. /blog/
url: "http://localhost:3000" # the base hostname & protocol for your site 

# User settings
username: Lorem Ipsum
user_description: Anon Developer at Lorem Ipsum Dolor
user_title: Anon Developer
email: anon@anon.com
twitter_username: lorem_ipsum
github_username:  lorem_ipsum
gplus_username:  lorem_ipsum
disqus_username: lorem_ipsum
{% endhighlight %}

## Color customization

All color variables are in `src/styl/variable`. To change the main color, just set the new value at `main` assignment. Another colors are for texts and the code background color.

## Creating posts

You can use the `initpost.sh` to create your new posts. Just follow the command:

{% highlight bash %}
./initpost.sh -c Post Title
{% endhighlight %}

The new file will be created at `_posts` with this format `date-title.md`.

## Front-matter 

When you create a new post, you need to fill the post information in the front-matter, follow this example:

{% highlight ruby %}
---
layout: post
title: "How to use"
date: 2015-08-03 03:32:44
image: '/assets/img/post-image.png'
description: 'First steps to use this template'
tags:
- jekyll 
- template 
categories:
- I love Jekyll
twitter_text: 'How to install and use this template'
---
{% endhighlight %}


## Running the blog in local

In order to compile the assets and run Jekyll on local you need to follow those steps:

- Install [NodeJS](https://nodejs.org/)
- Run `npm install` 
- Run `gulp`

## Questions

Having a problem getting something to work or want to know why I setup something in a certain way? Ping me on Twitter [@willian_justen](https://twitter.com/willian_justen) or file a [GitHub Issue](https://github.com/willianjusten/will-jekyll-template/issues/new).

## License

This theme is free and open source software, distributed under the The MIT License. So feel free to use this Jekyll theme on your site without linking back to me or using a disclaimer.

If you’d like to give me credit somewhere on your blog or tweet a shout out to [@willian_justen](https://twitter.com/willian_justen), that would be pretty sweet.






