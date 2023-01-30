---
layout: post
title: Computers, WTF? Part 5 - Avengers, Assembly!
---
The [previous post]({% post_url 2019-08-18-computers-wtf-4-cpus %}) 
was very conceptual. To balance things out, this one is going to be very 
practical, but only if you think learning to write (very) basic assembly is 
practical! Personally, I think it's important for understanding what your 
programming language code turns *into*, but I'm not about to spend hours of my 
time solely writing assembly by hand (but I won't knock you if you do! To each 
their own!).

We'll write some x86-64 assembly in [AT&T syntax](https://en.wikipedia.org/wiki/X86_assembly_language#Syntax). 
There are a few different syntaxes that you can use to write assembly, but 
this is the only one I'm really familiar with (as of now) so I'm going to 
stick with it. I'll also be using `gcc` to assemble the assembly on my Ubuntu 
18.04 64-bit system. If you don't have that, you *may* be able to follow 
these steps on a Mac, but I'll be making use of some Linux **system calls** 
and those won't necessarily translate. I'd recommend spinnin' up the ol' 
virtual machine that you created to try out `sudo rm -rf --no-preserve-root /`.

### Hello, Ass-World!
Let's write our first assembly! It'll be a variation on the typical "Hello, 
World!" program. I'll present it here in toto, then go over each line in a 
tick.

#### *hello.s*
    .global _start

    .text
    _start:
      mov $1, %rdi
      mov $message, %rsi
      mov $18, %rdx
      mov $1, %rax
      syscall

      mov $0, %rdi
      mov $60, %rax
      syscall

    message:
      .ascii "Hello, Ass-World!\n"

Here's the line-by-line breakdown:

    .global _start

Things that start with `.` are called **Assembler Directives**. They tell the 
assembler to do something special with the following argument(s). In other 
words, directives mark off things that are not instructions, but still have 
important meanings during assembly. In this case, `.global` tells the 
assembler that the `_start` label is a symbol that is visible to the 
**linker**, the software that connects the assembled object file to other 
object files to make a single executable.

    .text

This directive tells the assembler that what follows should be assembled. You 
can optionally follow it with a "subsection name" if you want to specify 
*where* it should be assembled.

    _start:

This is a **label**, it marks a specific location in the assembly code so that 
it can be easily referred to in other sections of the assembly (such as in 
the `.global` directive). Technically, its value is the memory address of the 
following instruction or piece of data.

    mov $1, %rdi

This is first instruction statement. It combines a CPU instruction, `mov` with 
a couple of operands.

`mov` tells the CPU to copy the value from the first operand to the second 
operand. The `$` character means that we are using the literal value `1`. The 
`%` character means we are referring to a CPU register. The "`r`" at the front 
of "`rdi`" means that this is a 64-bit register (don't ask me why it's an 
"r", I'm sure there's a perfectly good explanation that I don't know about). 
In sum, we are storing the integer `1` in register `rdi`.

A quick aside – a lot of x86 instructions can have a postfix character that 
specifies what size of data is being manipulated. For example, `movb`, `movw`, 
`movl`, and `movq` specify moving a byte, word, long, and quad, respectively. 
Just using `mov` without a prefix leaves the assembler to figure out what size 
the data should be. I've heard moving your quads a lot can lead to really 
toned legs.

    mov $message, %rsi

This instruction moves the value of the label `message:` into register `rsi`. 
`message:` is defined later.

    mov $18, %rdx

Again, moving the literal value 18 into register `rdx`.

    mov $1, %rax

Moving *another* literal 1 into register `rax`.

    syscall

Now, our chickens come home to roost on their nearly assembled eggs, so to 
speak. `syscall` tells the CPU to make a system call to the operating system 
kernel – the big process that makes your computer do the fancy stuff. This is 
where the OS you are working on often makes a difference, as different kernels 
will have different syscall semantics.

Syscalls are used for things like I/O and process management things that the 
kernel handles on your behalf. In linux, *which* syscall gets used is defined 
by the value currently in register `ax`. We've moved the value 1 into `rax`, 
so the syscall we are using is "`write`".

The `write` syscall takes a few arguments. If you've ever used the `write` 
function from C's `unistd.h`, you'll recognize these. We load the number of 
the **file descriptor** (fd) that we want to write to into register `di` (we 
put 1, the fd for **standard out** (`stdout`) into register `rdi`). We load 
the memory address of the first byte we want to write into register `si` (we 
put `$message` into `rsi`). We load the amount of bytes we want to write into 
register `dx` (we put 18 into `rdx`). Finally we make the syscall itself.

At this point in execution, our program should output `Hello, Ass-World!` to 
`stdout`, which is 18 bytes (one byte per character, plus the newline at the 
end).

Back to our line-by-line

    mov $0, %rdi

We move literal zero into `rdi`.

    mov $60, %rax

We move literal 60 into `rax`.

    syscall

Here we make *another* syscall. This time though, we've changed the value in 
`rax` to 60, which indicates that the syscall we want to make is `exit`. 
`exit` takes a code that it exits with, and in UNIX systems, exiting with code 
zero means no errors have occurred, so that's why we moved zero into `rdi`.

    message:

This is the label we talked about earlier – it lets us refer to the memory 
address of the following data in our instructions by this name.

    .ascii "Hello, Ass-World!\n"

This is our payload for our syscall to `write`. The `.ascii` directive 
indicates that it is a string literal.

### Build-A-Binary Workshop
So we've written our assembly, but we want to be able to run it too! 
Programs are as disappointing to us as we are to our parents if they don't 
run, so let's give it a shot:

Save the above assembly as `hello.s` somewhere, anywhere, then assemble and 
run it using: 

    $ gcc -nostdlib -no-pie hello.s && ./a.out

You should see this output:

    Hello, Ass-World!

Yay! It (hopefully) works! We used `gcc`, the GNU C and C++ compiler, to 
assemble our assembly. The `-nostdlib` flag told it not to link the C standard 
library, as we haven't conformed to the requirements for that. The `-no-pie` 
flag tells it not to bake us a pie at the end. Actually it tells it not to 
produce a "position independent executable", which is a binary that can be 
used in shared libraries and the like (position-independentally). We likewise 
haven't conformed to the requirements to make that work. Unfortunately there 
is no `-extra-pie` flag.

### The Ol' Static Shocker
Now that we've gotten some (very) basic assembly under our x86 wings, we can 
take a step back into data and talk a little bit about **Static Variables**. 
What does it mean for a variable to be statically allocated? Where's Waldo? 
We'll be jumping back and forth between Java/C code and assembly to answer 
these questions [next time]({% post_url 2019-08-20-computers-wtf-6-statics %}).
