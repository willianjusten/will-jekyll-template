---
layout: post
comments: true
title: "#4 - API Catalogues, package registeries and developers"
date: 2019-07-17 03:32:44
image: '/assets/img/'
description: 'The package registries are huge enablers of the API economy, bigger than famous API catalogues such as ProgrammableWeb'
tags:
- DX 
- 100DaysDX
categories:
- DX
- 100DaysDX
twitter_text: 'The package registries are huge enablers of the API economy, bigger than famous API catalogues such as ProgrammableWeb'
---

## Are package operators key players in the ecosystem?

Some measure the growth of API economy by looking at the stats and charts in API catalogues such as ProgrammableWeb. These catalogues list public APIs which someone has bothered to register. The catalogues provide some idea of the amount of APIs, that’s about it. They have little value for the daily developer work. In my opinion the catalogues are more like marketing stunt nowadays than something else. Of course they promote and enable some level of discovery of APIs so they are not worthless. 

If you are creating APIs driven tool or service to be used in application development (or alike), add your APIs to catalogues. Not a big effort, but that alone is not going to be enough. Developers want ease of use, instant value, instant usage from own code. That's where the package registries become handy. NPM packages are installed from command line, which the must have/learn environment for all developers. With [simple search command](https://docs.npmjs.com/cli/search.html) ``` npm search stripe ```` you get needed listing and details of available packages

<img itemprop="image" src="{{site.baseurl}}/assets/img/day4/stripe2.png" alt="{{site.name}}">

Next step is to run for example ``` npm install stripe ```. After that developer can use your service from own code. Of course they need credentials but those are acquired from Stripe's portal, not from API catalogues. Even I can do the above and I'm only "spaghetti code developer" not a proper developer.   

Yes, some developers spend a lot their time in IDEs and even some of those enable package installation with ease and without need to visit any frigging websites. Now think again. Do I expect my consumers to search my libraries or other tools from Google or do I provide methods to achieve developer's goals from within their normal tools and environments? It's not that fucking hard, you know.   


## Package registries 

Successful code libraries and components are productized just like APIs and you should take advantage of the distribution channels such as npm (javascript) and pypi (python). Npm alone serves over one billion requests for JavaScript packages per day to approximately 11 million developers worldwide (source).

Pypi serves around 80 million requests for python packages per day (source). As an example, AWS command-line interface (awscli) and Amazon S3 Transfer Manager for Python (s3transfer) are among of the most downloaded packages in Pypi driven Python ecosystem. As we all know, AWS is APIs driven as result of famous API Mandate by Jeff Bezos.

<img itemprop="image" src="{{site.baseurl}}/assets/img/day4/pypi.png" alt="{{site.name}}">

This takes us to an interesting hypothesis:

> if significant amount of NPM and pypi packages are libraries which use APIs, then the package registries are huge enablers of the API economy, bigger than famous API catalogues such as ProgrammableWeb. 

If the hypothesis is true, then the true impact of API economy can be measured with help of the code libarary distribution channel stats. Of course this hypothesis should be confirmed by analyzing the libraries and components disctributed by npm and pypi to see which amount of those packages use web APIs behind the scenes. It would also be interesting to see correlation between popular APIs in catalogues and libraries in code package ecosystems. 

## Libraries-driven API economy?

Some of the biggest success stories of API economy are Stripe, Twilio and AWS. They do not push raw APIs to application developers. Instead they rely and promote use of command-line interfaces and libraries. With help of these ready-made packages any application developer can utilize API driven services (among other things) more easily and with only a few steps. This was discussed in details previously.

<img itemprop="image" src="{{site.baseurl}}/assets/img/day4/stripe.png" alt="{{site.name}}">


In the above screenshot is the famous "5 lines of code" Stripe library example. Of course the above is more of marketing and sugar coating than practival tool for daily usage. It's a showroom for Stripe's APIs driven product. Again in the example above library ``` const stripe = require('stripe') ``` is used rather than raw APIs. The example uses NPM package which is the library ("stripe").  

Twilio has 40 000+ customers and create 400 million revenue with 5+ APIs. Stripe has around 100 000 customers, handles 100 billion worth transactions and creates 1,5 billion revenue with 1 API.