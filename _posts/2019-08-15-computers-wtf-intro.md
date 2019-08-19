---
layout: post
title: Computers, WTF? - Intro
---
Hello, my sweet babies! I've got an impending need to polish my knowledge on 
how the hell **Computer Systems** work. Come along with me on this amazing 
journey – you'll help me learn, and maybe you'll learn something as well!

I'm envisioning this as a series of blog posts that provide a tiny 
"under-the-hood" look at what the hell a computer does when you give it some 
fancy code to run. We'll talk about spooky assembly, dangerous C, and boring, 
pedestrian Java (and how boring, pedestrianess (aka abstractions) save you 
from a lot of those dangerous C situations).

*Please* send me angry emails when I am wrong. I want you to correct me if I
am wrong. Being wrong is okay, but only if you accept it and fix your mental 
models up when you're told how they're broken.

🥬 begin.

### What the Hell is a Computer System, Anyways? (and why should I care?)

I'm glad you asked! The short answer is that a **Computer System** is a useful 
way to think about the machine that's actually doing the computing, mathy 
stuff. It's a mental model, an abstraction, of the elecromagnetic realities of 
CPUs, RAM, I/O devices, and all their tiny transistor-thingies.

I'm not an electronic engineer, and I'm not really interested in *becoming* 
one, so a Computer System is how I want to think about computers, and all of 
the lovely features given to us by Operating System kernels, CPU 
architectures, compilers, interpreters, and even programming language standard 
libraries (and third-party libraries) allow me to do that, to great extent and 
effect.

Why do I care, then, if all of those lovely things allow me to effectively 
ignore the system itself?

Idle curiosity!

But, more seriously, I believe that a deeper understanding of any abstraction 
that you put to use can only empower you as a user of that abstraction, and 
enable you to compare that abstraction to competing abstractions. This gives 
you the tools to make the big architectural decisions, such as framework and 
language decisions, if that's what you want to do, without falling back on 
tropes, comfort, or hearsay as your decision-making process.

It also gives you another great way to bore people in cafés and pubs.

### Building a Computer System from Mental-Model Legos

A Computer System is an abstraction, but a Computing Machine is a physical 
thingy with sprockets and doo-dads and other technical stuff and you have to 
wear a special static-safety wristband if you want to touch it in a no-no 
place.

Certain parts of the computer do the actual work of letting you create, laugh 
at, and upload memes. There are a few good "sub-abstractions" we can think of 
to typify these parts: I/O, CPU, and Memory.

#### I/O

I/O is short for **Input/Output** and mentally encompasses any way that the 
System interacts with the "outside world". Examples of I/O are storage 
(HDDs, SSDs, tape-drives, stone tablets, *etc*), input hardware 
(keyboards, joysticks, USB steering wheel (if you're me speed-running Dark 
Souls)), network communications, sensors and shit, you get the idea. 

#### CPU

Hopefully you've heard of a CPU before. The CPU does the work – it performs 
the instructions that transform data into other types of data.

#### Memory

Memory, usually some form of RAM, is where the Computing System stores 
(almost) all of the data and values it is working with. It's also where sets 
of instructions are stored and where the CPU reads them from.

#### The Hungry Human as a Computing System

Here's a (hopefully) useful metaphor: following the directions on a box of 
Kraft Dinner to make yourself your poor, milennial lunch (also extensible to 
instant ramen).

You order a 6-pack of KD at a reasonable rate from [Amazon](https://www.amazon.ca/KRAFT-Dinner-Easy-Macaroni-Cheese/dp/B005FHMYYI/ref=sr_1_6) 
(this is not an affiliate link, I am not being paid to advertise KD on 
Amazon).  It takes a certain amount of time (say, same-day delivery) for your 
KD to arrive (I/O).

Once the box has arrived, you pull out a pouch and read the instructions. 
You've got a pretty good memory, and the instruction are pretty simple, so you 
only need to read them once to remember them (I/O -> Memory). You also make a 
mental note to add ketchup, as everything is better with ketchup (this is 
objective fact, not an opinion) (Compiler optimization).

You follow the directions as you remember them to make yourself a delicious 
snack (Memory -> CPU), which you then consume (I/O).

At some point in the future, you visit the washroom, as your all-KD diet has 
resulted in *terrible* IBS (Segmentation Fault: core dumped).

### Oh, the Memories

Next time, I'll dive a bit deeper into [**Memory**]({{ site.baseurl }}{% post_url 2019-08-15-computers-wtf-1-memory %}), which is pretty 
straightforward as far as computing abstractions go. There is a bit of 
Lovecraftian horror going on behind the scenes, but we can just ignore that...
