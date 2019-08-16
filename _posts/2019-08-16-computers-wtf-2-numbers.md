---
layout: post
title: Computers, WTF? Part 2 - Paint By Numbers
---
Last week on the podcast we talked a little bit about memory addressing (it 
was actually yesterday and a blog post, but let me dream). But what does a 
computing system actually *store* in its memory? If you have some experience 
programming, your answer is probably along the lines of: "the values of 
variables, I/O buffers, whatever the fuck is in all my Chrome tabs". You're 
not *wrong*, but neither are you entirely *right*, either.

Your lack of rightness comes from the fact that I'm being entirely pedantic 
here – the only real thing that can be stored in memory is an electromagnetic 
state that can be interpreted as either "on" or "off". Our "lowest-order" 
level of abstraction is to interpret these states as, respectively, 1 or 0. A 
few more abstraction levels up gets us to what you normally think of as 
"data": representations of things we actually care about – the values of 
variables, I/O buffers, whatever the fuck is in all your Chrome tabs.

### How to Represent Things When All You Have Is a Series of Levers
Previously, I described how each memory address points to a specific byte of 
memory. A byte, in short, is eight bits, and a bit is either a 1 or a 0. We 
have a couple of standard choices for how we represent a byte:

  * binary: a base-2 number set that only has ones and zeros - *e.g.,* 
    `0b00001001`. Takes up a lot of writing space, but makes explicit the 
    *exact* value of each bit in the byte.
  * octal: a base-8 number set (using characters `0–7`) - *e.g.,* the binary 
    above in octal is `0o011`. Each octal character represents 3 bits, so it 
    takes up less space when written than binary.
  * hexadecimal: a base-16 number set (using characters `0–9` and `a–f`). the 
    binary above in hexadecimal is `0x09`. Each hexadecimal character 
    represents 4 bits (half a byte, called a "nibble"/"nybble"), so it's a 
    pretty concise way of representing bytes and is the usual standard.

But, life as a Computing System would be pretty boring if you were restricted 
to data that could be represented in a single byte. That's why data, besides 
having a memory address that it resides at, also has a *size* – a number of 
contiguous bytes, starting at the memory address, that should be interpreted as 
part of the same atomic "piece" of data. We do this because, if data were 
restricted in size to a single byte, the largest (unsigned) integer value we 
would be able to represent would be `0xff` (255 in decimal).

Let's start by talking about numbers – beautiful whole numbers – the kind you 
use to try to prevent me from going through the express checkout with too many 
items, because Computing Systems have a really straightforward way of 
representing integers using bytes. Here's a table of common integer data types, 
and what they are called in our reference languages (C, Java, and Assembly):

<table class="post-table">
  <thead>
    <tr>
      <th>bytes</th>
      <th>bits</th>
      <th>C</th>
      <th>Java</th>
      <th>Asm</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>8</td>
      <td>char</td>
      <td>byte</td>
      <td><strong>b</strong> byte</td>
    </tr>
    <tr>
      <td>2</td>
      <td>16</td>
      <td>short</td>
      <td>short</td>
      <td><strong>w</strong> word</td>
    </tr>
    <tr>
      <td>4</td>
      <td>32</td>
      <td>int</td>
      <td>int</td>
      <td><strong>l</strong> long</td>
    </tr>
    <tr>
      <td>8</td>
      <td>64</td>
      <td>long</td>
      <td>long</td>
      <td><strong>q</strong> quad</td>
    </tr>
  </tbody>
</table>

If the Assembly language terms for these data sizes seem a little strange, it's 
because they are! They don't reference a relationship to numbers (none of 
them are called "int") and "word" seems to imply some kind of letter-related 
data. This is just historical convention, as far as I'm aware, so deal with it, 
and in dealing with it, you will become a stronger person.

I'm not going to talk about converting binary to hexadecimal, two's complement 
representation of negative numbers, and stuff like that, but those are 
important topics you should look up if you don't already know about them! My 
reluctance to talk about them here is because they are more of a math topic 
than about how Computer Systems actually work (though, two's complement will 
almost certainly come up in the future). At this point, we're just talking 
about how numbers are stored in memory – not how math is done on the values.

### The Big-inning of the Little End
While it seems natural, obvious, and maybe even the will of some deity that a 
given (unsigned) integer, say, 3735928559, should be represented in memory as 
the series of bytes (represented in hexadecimal as) `0xdeadbeef`, sometimes, 
more often than not, we instead do it a little differently and represent it as 
`0xefbeadde` instead.

Now, you might be saying "hold up, new number representation system, who 
dis?", and your confusion would be temporarily justified. The first 
representation, `0xdeadbeef`, puts the byte with the highest value (or 
"order"), `0xde`, at the start of the 4-byte representation of the integer, 
similar to how we put the highest value, 3, at the start of 3735928559. This 
is called "big-endian", as the "biggest" byte comes first. Another way to write 
this hefty value would be 9558295373, and we would both know we were still 
talking about the same number if I explained to you that it was just backwards. 
Similarly, `0xefbeadde`, is just `0xdeadbeef` "backwards", with the highest 
value byte, `0xde`, at the right end, and the lowest value byte, `0xef`, at 
the left end. This is called "little-endian", and is very common in Computer 
System architectures.

Why would presumable intelligent Computer System architects choose the 
(ass-)backward little-endian representation? There are a couple of reasons, 
but a pretty good one is for ease of conversion between different data sizes. 
If we decided that we just wanted to convert `0x00000001` from a C/Java `int` 
(with 32-bits) to a C `char` (or Java `byte`). If `0x00000001` is stored as 
shown (big-endian), then we have to go to its memory address, then move over 3 
more bytes to get to `0x01`, the one-byte representation of the same number. 
If, instead, it were stored as `0x01000000` (little-endian), we can just grab 
the byte at the given memory address – `0x01` – to get the one-byte 
representation.

### Chaotic-Neutral Address Alignment
In our next campaign, we'll be tackling the dreaded byte-beast, the arbiter of 
overlapping data, the devourer of memory, and the shifter of bits!
