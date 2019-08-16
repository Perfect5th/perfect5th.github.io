---
layout: post
title: Computers, WTF? Part 1 - Oh, the Memory
date: 2019-08-15 15:30:00
---

Welcome back! Of *course* I remember who you are. Oh, your name? Well I've 
definitely *seen* you before, but I can't exactly put a name to that face 
that's floating around in my memory… Steve? Is that right? Damn it.

Okay, before the metaphor above gets too convoluted, I'd better disentangle 
it, for your sake and mine. Here's a situation where you remember someone – 
you *know* that you know them – but, you can't for the love of Trotsky's ghost 
remember their name. This happens to me way too often, and my current 
conclusion is that I'm a terrible person, because I clearly do not put any 
onus on the remembrance of a given person's name. I have a general idea of 
*who* someone is, as I know I've [seen/talked to/insulted them by forgetting 
their name] before, but I can't do the thing where I remember their name and 
now I have the social anxiety.

The above (hopefully relatable) situation is analogous to the following 
Computer System related memory error:

  1. You're *pretty sure* you have a piece of information – you have a 
  *reference* that you should be able to follow to find it
  2. When you follow that reference (*dereference* it), there's nothing there, 
  just the void, and, boy, does the void stare back. If you're especially 
  lucky/unlucky, the wrong name is there, and now you've dug a deeper hole.

To take this all the way from metaphor to Computer Systems speak: In step 1, 
you have a variable that is a pointer (or reference) to a piece of data. In 
step 2, you dereference that pointer to get at the value that it points to, so
that you may use it, but, that memory address is no longer in use, or (when 
you get the wrong name) has been overwritten by other data.

Now, ignoring the incorrect/missing data aspect of the above, here's how this 
may look in Java:

    class Main {
      static class A {
        int i;

        A() {
          i = 1;
        }
      }

      public static void main(String[] args) {
        A a = new A();
        System.out.printf("a.i = %d\n", a.i);
      }
    }

The output is, of course, `a.i = 1`. What's happening here? I know it's pretty
obvious from an *effects* perspective. But what's happening in Memory?

  * `A a = new A()` creates a new object of type `A`, and sets `a` to be a
    reference to it. That is, the *value* of `a` is the *memory address* of an 
    object created using the template `class A`.
  * `a.i` implicitly dereferences `a`. It accesses the memory at the address 
    that `a` references and, using a known offset, fetches the value of its `i` 
    member variable.

Here's the same rigamarole (or similar enough), in C:

    struct A {
      int i;
    };

    struct A as = { 1 };

    int main() {
      struct A* a = &as;
      printf("as.i = %d\n", a->i);
      return 0;
    }

The difference here is that there's nothing *implicit* about the 
dereferencing – we do it with the `->` operator, accessing `as.i`. The output 
is `as.i = 1`.

Okay, we get all that, the crowd grumbles. The part that is interesting and 
(maybe for you) new is this concept of a *memory address*. What is it? What 
does it tell us about how memory is organized? What do valid memory address 
values look like? Can I put one in my Kraft Dinner?

*All* valid questions. Let's address them in the order presented here.

### Memory Addresses: Numbers That Let You Find Other, More Meaningful Numbers

A memory address is simply an integer. To be more specific, it's a positive 
integer. If you modified the C code above to `printf("a = 0x%x\n", a)`, you'd 
get output something like `a = 0x601030` (or some other value). It points to a 
specific spot in the Computer System's main Memory. Memory itself can be 
thought of, most simply, as just a big collection of bytes, in one long list. 
The memory address 0x1 (the integer 1) might refer to the first byte in that 
list. The memory address 0xf (the unsigned integer 15) might refer to the 15th 
byte in that list.

As previously established, a valid memory address is an unsigned integer. But 
how big can that integer be? This is where things become slightly 
architectural: how much memory do we think we'll need? The larger we allow a 
valid memory address to be, the more memory we can accommodate. Say we decide, 
somewhat arbitrarily, or by popular vote (where only the writer of this blog 
gets a vote) that we want to use 16 bits for our memory addresses. This means 
we have 0b1111111111111111 (in binary), or 0xffff (in hex), or 65535 (in 
decimal) possible memory addresses (zero doesn't count as valid, more on that 
later). That may sound like a lot, but if each address represents a byte of 
memory, that's only about 64 KiB of data. Good luck running your Fornite on 
that, you darn kids and your video games that I do not hold nostalgia for.

Want to know why your accidentally installed 32-bit pirated version of Windows 
7 can only support 4 GiB of RAM? It's because a 32-bit unsigned integer's max 
value is 0xffffffff, which is about 4.3&times;10<sup>9</sup>, allowing for 
only that many possible memory addresses (4 GiB). A system that can use 64-bit 
integers has a maximum possible memory address of 0xffffffffffffffff, which is
1.8&times;10<sup>19</sup>, allowing for up to 16 EiB of memory. Which would 
just be absolutely bonkers to actually produce, but extra room is good.

Oh, and you can definitely put a memory address in your Kraft Dinner. I 
recommend spelling out the hex with alphagetti.

### What *Is* a Number, Anyways?

Next time on the podcast, we're going back to kindergarten – what are numbers? 
How does a computer remember them? Is anarchy really the *worst* thing that 
can happen to our society. All this, and more!
