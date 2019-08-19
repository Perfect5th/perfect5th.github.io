---
layout: post
title: Computers, WTF? Part 4 - I, CPU
---
In the [last issue]({{ site.baseurl }}{% post_url 2019-08-17-computers-wtf-3-alignment %}) 
of this series, we uncovered the top layer of mysteries regarding memory 
alignment and arithmetic and logical bit shifting. It was a bit lengthy, but 
sometimes covering these topics takes time! Today, we'll talk about the phases 
a CPU goes through when we tell it to do something, and *how* we tell it to do 
that something. This should start to get us a little lower-level than your 
typical programming language.

### Playing Fetch, Decode, Execute
CPUs do a lot of things, but those myriad things can be separated into 
three distinct phases. These phases are repeated ad infinitum, kind of like 
how you'll probably do the same boring things over and over again until you 
die or have a serious existential crisis.

Crises aside, here are the three stages of the CPU "cycle":

  1. Fetch: the CPU loads the next **instruction** from memory
  2. Decode: the CPU interprets what the instruction tells it to do
  3. Execute: the CPU performs the task the instruction encodes

An **instruction** is a discrete operation that the CPU is capable of 
performing. A series of instructions make up a **procedure** or **program**. 
An instruction is *very* simplistic. Think like, instead of a recipe (if you 
even cook for yourself like a *real* adult) telling you "sauté the onions on 
medium heat until slightly transparent", it was broken down into "turn the 
knob on your stove to the middlest number. Remove a medium size pan from your 
cupboard. Place the pan right-side-up on the element corresponding to the knob 
you turned. Remove a bottle of cooking oil from your cupboard. Unscrew the cap 
of the bottle and remove it. Hold the bottle above the pan. Tilt the bottle 
until two tablespoons worth of oil has poured out of it into the pan. Put the 
cap back on the bottle and screw it on tightly. Place the bottle back into the 
cupboard. Place the pieces of onion into the pan. Wait one minute. Move the 
onion pieces around using a spatula or tongs. Wait one minute. Move the onion 
pieces around using a spatula or tongs. *etc.*"

You can see how this can be exhausting. Well, CPUs are dumb, and CPU 
instructions are generally *very* basic – things like "add two numbers", 
"perform a bitwise operation on two numbers", and "read a value from memory". 
CPUs contain a section called the **Arithmetic and Logic Unit** (ALU) that 
they use to carry out instructions – one instruction at a time.

### Computer Programs for a CPU Dummy
So, how do we produce instructions for the CPU to fetch, decode, and execute? 
There are a few different ways: writing and compiling Assembly, writing and 
compiling a specific programming language, and writing and interpreting a 
specific programming language. There are some other ways, too, ones that 
employ the dark arts of bug exploitation to inject instructions into running 
software.

We'll start with Assembly language, the "lowest" level of programming. It's 
sometimes referred to as programming "on the metal", as, when manually writing 
Asm, you manually write each individual instruction that you want the CPU to 
execute. This is different from using a programming language, where a single 
statement in a compiled language (like C) often results in multiple Assembly 
instructions. Even Assembly isn't technically the "lowest" you can get. 
Individual Assembly instructions get compiled to literal binary that is read 
and interpreted as said instructions by the CPU. If you wanted to, and you 
were particularly masochistic (or you have a very specific use case), you 
can write your CPU instructions as those binary values instead of as Assembly 
instructions.

### Language Barriers, CPUs, and You
One barricade that higher-level languages (or really compilers and 
interpreters) usually save us from is the concept of a **CPU Architecture 
Instruction Set**. Basically, different CPUs have different sets of 
instructions that are defined in their instruction set. For the purposes of 
simplicity and maintenance of my sanity, all the assembly I'll be talking 
about is for the [`x86_64` instruction set](https://en.wikipedia.org/wiki/X68-64), 
and I'll probably only touch on a very small subset of that instruction set at 
that. I've selected `x86_64` because it's common, and it's the architecture of 
the CPU of the computer I'm writing most of these posts on, so I'll be able to 
test any assembly I present.

### License and Registration
Before we actually get into assembly, let's cover CPU structure a little bit 
more.

In a 64-bit system, the amount of addressable memory can be huge. I mentioned 
this when we talked about memory addresses, and if you don't remember, I no 
longer love you. My point, though, is that, sometimes it can take quite awhile 
(on the scale of CPU time) to access specific memory addresses. For this 
reason, CPUs have **registers**: on-chip memory that we can load values from 
main memory into. Accessing registers is *way* faster than accessing main 
memory all the time, so we generally use a lot of instructions that interact 
with the registers and only load from or store into main memory when we have 
to. Registers are usually large enough to hold 64 bits or 32 bits on 64-bit 
and 32-bit systems, respectively.

Some registers are set aside for *special* tasks. These registers are like 
your parent's favourite child (definitely not you, even if you're an only 
child) and they're given the cushy chores and sometimes the bigger allowances:

  * **Program Counter** (PC): contains the memory address of the next 
    instruction to be executed
  * **Instruction Register** (IR): holds loaded instructions. can be 
    subdivided to hold different "parts" of the instructions.

There are others, but these are the only ones we need concern ourselves with 
for now.

### Avengers, Assembly!
Now that I've laid down the groundwork, we can actually introduce some x86_64 
assembly code and demonstrate how to write it and test it out! Just kidding, 
we're doing that next time, not now! You probably already knew that by judging 
how much writing there was left on the page, but I'm still going to pretend 
I've tricked you. I aim for a max 1000-ish words for each of these posts, so 
as not to overwhelm (myself or you). See you next time!
