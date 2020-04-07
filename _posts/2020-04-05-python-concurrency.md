---
layout: post
title: Concurrency in Python – A Primer
---

*This was originally published on the [Work in Progress](https://wiki.mitchellburton.ca) wiki ahead of a chat I had with a couple of friends where I introduced the topic. I'm reposting it here for personal archiving purposes.*

There are a few different ways of accomplishing concurrency in Python: threads, processes, and event loop based solutions like `asyncio` or supplied by various packages.

I'll talk briefly about the differences between threads and processes, and how to leverage each in Python.

## Threads

Threads are the "classic" way of accomplishing concurrency. I remember hearing once that their creation was prompted by Edsger Dijkstra's existential dread of the callback hell resulting from interrupt-based concurrency (an even older way of doing it), but I can't seem to find anything to back me up on that.

A "thread" is so-called because it's a path of execution steps that the processor follows. Every bit of code you've written is at least single-threaded, because a single thread is the default execution paradigm (we don't just randomly execute lines of assembly in whatever order we feel like). Multi-threading is when you have multiple sets of instructions that are allowed to execute independently. Switching between them is accomplished by the OS kernel (or sometimes at the processor level, if you're lucky) in a move called "context switching". Basically the current thread's state is saved and another thread's state is loaded. The intimate details are out-of-depth for this piece.

When do we switch between threads? Basically, the threads let us know by performing actions: **yielding**, **blocking**, and **preempting**.

**Yielding** is when a thread voluntarily "yields" control of the processor, allowing whatever other thread is ready to take over next, and putting itself at the end of the queue.

**Blocking** is pretty similar to yielding. The only effective difference is that blocking usually occurs when a call is made to another resource (I/O usually) and the thread has to wait for that resource to "call back".

**Preemption** is when a thread steals the processor from another thread. This'll happen for high-priority signals, mostly.

Basic threading in Python is accomplished using the [`threading`](https://docs.python.org/3/library/threading.html) library module, which was introduced prior to Python version 2.6. Threading in Python is handicapped, though, due to the [Global Interpreter Lock](https://docs.python.org/3/glossary.html#term-global-interpreter-lock), which effectively restricts true concurrency. Only a single Python thread can run within a Python process at one time, no matter how many cores or processors you have, which means threads in Python are pretty much only useful for I/O-related concurrency.

Therefore, this section serves primarily to introduce concurrency in general. Pretty much everything here also applies to processes, and the basic Python library for using multiple processes mirrors a lot of `threading`'s API. If that is the case, then what's the difference between a thread and a process?

## Processes

Processes are, for execution purposes, pretty much identical to threads. The real difference is the memory model.

When you create a new thread, it is within the same process as the parent thread, so it shares the same memory. This means it can read and write the same memory as any of the other threads within the same process. This is both convenient and dangerous.

It's convenient because you can act like everything that existed for the parent thread (that hasn't been cleaned up or garbage collected) exists for the child thread. It's dangerous because threads can attempt to change memory simultaneously, *even during the execution of a single line of code*, which leads to undefined behaviour, segfaults, and so many other possible fun things. Code where, if it were to run concurrently, could cause problems, is called a **critical section**.

To help mitigate these issues, we can use special constructs like **Semaphores**, **Locks**, and **Conditions** around our critical sections. In explaining these, I'll be using the word "process", but all of this also applies to threads.

**Semaphores** are atomic counters that count down whenever they are acquired by a process, and increment whenever they are released. The atomicity is important – it means two processes can't modify the semaphore at the same time. If the counter is at zero when a process attempts to acquire it, the process blocks until it is incremented. Releasing a semaphore increments the counter. Semaphores are useful when you need to limit how many different processes are doing the same thing at the same time.

**Locks**, also called **Mutexes** (short for "mutual exclusion"; they aren't exactly the same as locks, always, but in Python they are), are kind of like a semaphore with a max value of 1 – only a single process can possess them at a given time. All other processes who try to acquire a lock will block until the process currently holding it releases it. Only one of the blocked processes will acquire it though, and the rest must continue waiting.

Using locks or semaphores in Python generally looks like this:

```python
lock.acquire()

# critical section of code here

lock.release()
```

You can also use a `with` context block to automatically acquire and release
the block:

```python
with lock:
    # critical section of code here
```

The major benefit of using a `with` is that the lock or semaphore will be automatically released, even if the critical section code raises an exception.

**Conditions** are special objects that wrap locks and let us synchronize processes, in a way. A process can wait on a condition, which means it blocks until another process notifies on the same condition variable. The process that notifies can choose how many waiting processes to notify, or notify all of them. Like locks and semaphores, conditions need to be acquired before anything can be done with them. This prevents duplicate signaling from occurring.

```python
# in one thread
with condition:
    condition.wait()

# in another thread
if something:
    # fire up the waiters
    with condition:
        condition.notify_all()
```

A lot of the problems that these tools help with result because threads share memory on which they can stomp all over. Processes, on the other hand, each get their own memory space. This space is created by copying the parent process's memory when the subprocess is created (forked, we usually say). This isn't to say that processes cannot share memory, they just need to do so using special structures like pipes, queues, and manager objects, most of which have concurrency-safety built in. Because of this, the only time you may need locks and the like is when you have multiple processes modifying the same thing that lives outside of memory, like an I/O stream or a file.

Granted, memory usage is lower with threads, as there's no copying of the parent's memory. They are also more performant when switching, but we're using Python here, so who cares about performance?

Python's multiprocessing library is called (you guessed it) [`multiprocessing`](https://docs.python.org/3/library/multiprocessing.html). It's a long name, so I usually `import multiprocessing as mp` for brevity. It was introduced in Python version 2.6, so it's well stable.

## Python's `concurrent.futures`

In Python version 3.2, the [`concurrent.futures`](https://docs.python.org/3/library/concurrent.futures.html) library module was introduced. This module includes an abstract Executor class, which has two possible concrete implementations that only differ on whether they use threads or processes.

An Executor is an object that is instantiated with some settings, then has functions and their arguments submitted, runs them concurrently using either threads or processes, and returns a Future. A Future is kind of like a promise, in that you can attach a callback to it, but that single callback handles both the success and failure cases.

A really basic pattern of usage for an Executor would be:

```python
from concurrent.futures import ProcessPoolExecutor

def my_callback(f):
    # f is a Future
    result = f.result()

    if isinstance(result, Exception):
        # error handling
    else:
        # do something with result

with ProcessPoolExecutor as executor:
    future = executor.submit(my_async_task, arg1, arg2)
    future.add_done_callback(my_callback)
```

All of the same memory and I/O safety caveats of threads and processes apply to Executors (depending on which type is used). They are most convenient when you need to spin off a concurrent or async task that you *know* has a limited lifespan.

## Postscript 1: Process Pools

Process pools are a way of creating a group of processes that handle tasks as they are submitted to the pool. For example, a multi-thread or -process web server that hands requests off to the pool to be handled. Workers in the pool execute their task handler, then return to blocking on the pool task queue. I may write more about this in the future, as it's a higher-level way to organize concurrency, and is especially useful for batch processes where bits of work come in at a variable rate.

## Postscript 2: Event loops

Event loops are asynchronous without being actually concurrent, just like threads or processes running on a single core. The main difference is that the scheduling of execution in an event loop happens entirely in the runtime. The OS is not involved. This means that there is no preemption. Event handlers begin and end execution at predictable, deterministic points, generally when they perform I/O or otherwise dispatch a new event. Basically, whenever you would expect a thread or a process to yield, that's where an event's execution ends and the next event in the queue takes over.

A (in)famous implementation of a JavaScript event loop is Node.js. Python, as of version 3.4, has the [asyncio](https://docs.python.org/3/library/asyncio.html) library module, which can be used to implement an event loop, though it can also be used for other kinds of "true" concurrency. Examples of Python packages that implement event loops are [Twisted](https://twistedmatrix.com/trac/) and [Tornado](http://www.tornadoweb.org/en/stable/).

If you're interested in learning more about event loops in Python, please let me know, and maybe I'll write a full extension to this primer.
