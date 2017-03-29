---
layout: post
title: PYTHON MEMORY LEAK INVESTIGATION
date: 2016-01-09 14:46:59.000000000 +07:00
type: post
published: true
status: publish
categories: []
tags: []
meta:
  _wpcom_is_markdown: '1'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '18575291429'
author:
  login: vnstack
  email: vietstack@gmail.com
  display_name: vietstack
  first_name: Viet
  last_name: Stack
---
<p class="western" align="center"><span style="font-family:'Times New Roman', serif;"><span style="font-size:x-large;"><b>PYTHON MEMORY LEAK INVESTIGATION</b></span></span></p>
<p class="western"><span style="font-family:'Times New Roman', serif;"><span style="font-size:large;"><b>I. Overview of memory leak in Python</b></span></span></p>
<p class="western"><span style="font-family:'Times New Roman', serif;">Memory leak is a gradual increase in the physical RAM usage of a process. The usage of RAM can be seen by some values of VIRT, RES that are virtual memory usage and physical memory usage respectively. However, only RES value is taken into account of considering the memory leak scenario. There are many reasons that leads to this scenario, some of them are listed below:</span></p>
<ul>
<li><span style="font-family:'Times New Roman', serif;">The given overload consumes more RAM than the existing one</span></li>
<li><span style="font-family:'Times New Roman', serif;">The memory fragmentation (heap) fragmentation in Python</span></li>
<li><span style="font-family:'Times New Roman', serif;">Memory management in Python code structure (code quality, race condition, the usage of external function calls such as socket, database, etc.)</span></li>
</ul>
<p class="western"><span style="font-family:'Times New Roman', serif;"><span style="font-size:large;"><b>II. Python memory leak deep-dive</b></span></span></p>
<ol>
<li><span style="font-family:'Times New Roman', serif;"><b>Memory Fragmentation:</b></span></li>
</ol>
<p class="western"><span style="font-family:'Times New Roman', serif;">In 32-bit OS, so YES. The main problem that we have only 2^32 is the biggest chunk of memory (it can be seen as a virtual memory (VM) – called VIRT) that can be delivered from OS when a request demands memory. Besides, in python, all the objects and references of objects are stored in heap that is used for memory dynamic allocation. Those above reasons can make the memory (infact, it is heap) fragmentation in this following way: Meanwhile we have available free contigous memory (it resides inside VM) that is in small blocks for our process. Those small blocks are not suitable for the large memory request then it calls more memory for the request from OS. When that memory is returned, it is splitted up into the smaller blocks then when the next memory request comes; a new memory amount needs to be requested from OS. In another way, if a request of memory arrives, in side the heap of VM, it does not have enough contigous memory block, the demanding process halts to wait for the contigous memory block that can be returned back from other processes. This loop happens multiple times plus the memory splitting above in the long term running process, it probably cause memory fragmentation.</span></p>
<p class="western"><span style="font-family:'Times New Roman', serif;">Besides, Python by default use Cpython that does not allow to move objects around to compact memory so that it can avoid the memory fragmentation. One of the solutions is remove Cpython but it is really risky and take a lots of efforts. </span></p>
<p class="western"><span style="font-family:'Times New Roman', serif;">In 64-bit OS, the answer is NO. Since this is the case happening in 32-bit OS but in 64-bit OS, it has maximum 2^64 byte chunk of virtual memory (VM). Since </span><span style="color:#262626;"><span style="font-family:'Times New Roman', serif;">Python VM does its own internal memory management so that </span></span><span style="font-family:'Times New Roman', serif;">It may happen in 64-bit OS but in the next thousand years of running process, not by second or minute.</span></p>
<p class="western"><span style="font-family:'Times New Roman', serif;">Otherwise, in the worst case if this scenario happens, what we expect is that the VM is filled up gradually or extremely but the real physical memory usage seems no change. In our case, both of VM and real physical memory instances and in the long period of running, it reaches the VM capacity.</span></p>
<ol start="2">
<li><span style="font-family:'Times New Roman', serif;"><b>Race conditions between multiple threads:</b></span></li>
</ol>
<p class="western"><span style="font-family:'Times New Roman', serif;">First,</span><span style="color:#222426;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:medium;"> the potential for race conditions will increase the memory leak dramatically.</span></span></span><span style="font-family:'Times New Roman', serif;"> What we can agree on that GIL is working well in this case. GIL ensures the non-concurrency of working between multi threads that mean only one thread is executed at once. Besides, each thread in our service source code has its own tasks and they neither over-write nor reference any variables, any values, etc. at the same time. It avoids the possibility of race conditions between working threads.</span></p>
<ol start="3">
<li><span style="font-family:'Times New Roman', serif;"><b>Sqlalchemy session</b></span></li>
</ol>
<p class="western"><span style="font-family:'Times New Roman', serif;">As we know that, the Session object itself is not thread-safe but thread-local. In some processes, it can use multithread to access (it may happen at the same time) to mysql through sqlalchemy. In order to manage threads and session due to the non-concurrency of multiplethreads, it is recommended to use scoped_session that does the simple task, which is holding the underlying Session object for whose who (here is working thread) ask for it. By using scope_session object, it can avoid the concurrency of mysql access happening among threads at the same time.</span></p>
<p class="western"><span style="font-family:'Times New Roman', serif;">Besides, sqlalchemy is considered as a standard and useful object-relational mapper (ORM) for python to be used as a layer of mysql access. The problem of memory leak in sqlalchemy usage seems not relevant.</span></p>
<ol start="4">
<li><span style="font-family:'Times New Roman', serif;"><b>Code quality in sense of memory management in Python</b></span></li>
</ol>
<p class="western"><span style="color:#272a34;"><span style="font-family:'Times New Roman', serif;">One of the challenges in writing python for large scale program is that keeping as small as possible the memory usage. Python internally manages memory itself and all of the objects are managed by using a reference count system. It will free the assigned memory back to OS when the object's reference count falls down to zero.</span></span></p>
<p class="western"><span style="color:#272a34;"><span style="font-family:'Times New Roman', serif;">In Python programming, a recursive function can cause the memory leak. An object's memory is only freed when the its reference count falls down to zero. In the recursive function, it probably has problem of inter-reference among objects (e.g, foo.x → bar, bar.y → foo) that causes the reference count is stuck inside a circular link and it never reaches zero.</span></span></p>
<p class="western"><span style="color:#272a34;"><span style="font-family:'Times New Roman', serif;">Besides, when we assign a variable to an object in python and then delete the variable (e.g. b = object1, del b), only the reference is deleted but the object is not, it causes the overhead in memory usage.</span></span></p>
<p class="western"><span style="color:#272a34;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:large;"><b>III. Investigation schedule in memory leak</b></span></span></span></p>
<ol>
<li><span style="color:#272a34;"><span style="font-family:'Times New Roman', serif;"><b>Overview:</b></span></span></li>
</ol>
<p class="western"><span style="color:#272a34;"><span style="font-family:'Times New Roman', serif;">Our service is written in multithreaded and there are so many interactions among those threads. It also uses sqlalchemy to access mysql and calls OpenStack nova service to get the information of nodes. The process runs as a daemon as uses Python 2.7.3 version</span></span></p>
<ol start="2">
<li><span style="color:#272a34;"><span style="font-family:'Times New Roman', serif;"><b>Investigation tools</b></span></span></li>
</ol>
<ul>
<li><span style="color:#272a34;"><span style="font-family:'Times New Roman', serif;">Python garbage collector was useful to trace the number of objects and count their size. It can be easily import from python library by “import gc”. For more information, it can be referenced in this link: https://docs.python.org/2/library/gc.html</span></span></li>
</ul>
<ul>
<li><span style="color:#272a34;"><span style="font-family:'Times New Roman', serif;">Memory profiler is a python module written for monitoring the memory usage of a process and line-by-line analysis of memory consumption for service source code. The source code of memory profiler can be achieved from this below link: </span></span><span style="color:#ff0000;"><span style="font-family:'Times New Roman', serif;">https://github.com/fabianp/memory_profiler</span></span></li>
</ul>
<p class="western"><span style="color:#272a34;"><span style="font-family:'Times New Roman', serif;"><span style="font-size:large;"><b>IV. RESULT:</b></span></span></span></p>
<ul>
<li><span style="font-family:'Times New Roman', serif;">No memory fragmentation happens here due to the 64-bit OS.</span></li>
<li><span style="font-family:'Times New Roman', serif;">Sqlalchemy usage seems working well without any clues to memory leak.</span></li>
<li><span style="font-family:'Times New Roman', serif;">The service source code seems to be designed well in sense of avoiding recursive functions, race condition among threads and other programming errors that may cause memory leak.</span></li>
<li><span style="font-family:'Times New Roman', serif;">The suspicion now is on to a thread inside the service. The below code is the source code of the run() method of the thread. It shows that the ‘for’ loop only stops when it gets the ‘stop’ event. The ‘stop’ event is the flag that the daemon sends back to the thread if and only if by chance the ‘while’ loop of event execution of threads do not run. </span><span style="font-family:'Times New Roman', serif;">In fact, the thread daemon does not stop running. Each time this thread polls nova service, it will yield the result from generator and it takes memory allocation for generator. This memory usage only returns to OS if the generator is closed and this scenario in fact does not happen.</span></li>
</ul>
<blockquote>
<p class="western"><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;">def run(self):</span></span></p>
<p class="western"><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;">LOG.info('%s starting', self)</span></span></p>
<p class="western"><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;">    generator = self._generator(self._client, self._queue)</span></span></p>
<p class="western"><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;">    for _ in generator:</span></span></p>
<p class="western">        # Do something here</p>
<p class="western"><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;">    if self._stop.wait(next_time - now):</span></span></p>
<p class="western"><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;">    break</span></span></p>
<p class="western"><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;">    LOG.info('%s stopping', self)</span></span></p>
<p class="western"><span style="font-family:'Times New Roman', serif;"><span style="font-size:small;">    generator.close()</span></span></p>
</blockquote>
<p class="western">9/1/2016</p>
<p class="western">VietStack team</p>
