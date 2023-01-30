---
layout: post
title: Computers, WTF? Part 3 - Chaotic-Neutral Alignment
---
In our last [very special episode]({% post_url 2019-08-16-computers-wtf-2-numbers %}), 
I did an awful lot of typing about number representation in main memory (or in 
general, I guess – number representation extends beyond just computers). And 
all of that is fantasic: we picked up some jargon that we can use to impress 
our friends and confound our foes and conpress our foends. However, we can't 
just be throwing numbers into memory willy-nilly, similar to how you leave 
your laundry on that certain chair in your room. At some point, the messiness 
starts to give you problems (usually mold and general undateability).

To make sure things stored in memory are tidy, and to increase the efficiency 
with which we can access things, we try our very best to maintain *alignment*.

Imagine that you have one of those green LEGO sheets that are used for the 
base layer of many awesome and attractive LEGO<sup>&reg;</sup> projects. But 
for some reason (probably because you've died and gone to hell), all you have 
are those 2&times;2 square pieces that are flat on the top, and 4&times;2 
square pieces that are flat on top. Your task, given to you by glorious Satan 
himself, is to connect as many of these ridiculous pieces on the base board as 
you are able to (you are doing this as an unpaid internship to gain 
"experience").

If you just start slapping flatties all over the place with no strategic 
approach, there's no way you'll optimize this properly, and Satan will 
probably mete out his harshest punishment on you – maintaining a legacy LAMP 
stack. If, instead, you place the larger pieces so that one or two smaller 
pieces can always fit around them, you begin to approach the concept of data 
alignment.

### The Number of the Beast
Let's apply what we've learned from the example above to storing data in 
memory. This is simpler, because we can think of memory as a one-dimensional 
list of memory addresses.

If you have a good memory (pun, fuck, sorry!), then you'll remember that we 
have a few different size options when storing values in memory. I'm going to 
stick to the C names for these for reasons that will never become apparent: 
`char` (1 byte), `short` (2 bytes), `int` (4 bytes), and `long` (8 bytes). In 
a toddler-ish manner, it should be obvious that 2 `chars` fit in a `short`, 
two `shorts` in an `int`, *etc*.

If we restrict ourselves, and our memory, to only placing `ints` at memory 
addresses that are *aligned* to 4 bytes (those that end in `0x0`, `0x4`, 
`0x8`, and `0xc`), then we will always have room around them for other `ints`, 
and therefore room for multiple `chars` and `shorts`, or no room. Sometimes, 
we'll even have room for `longs`. We extend this pattern to other sizes of 
data by aligning them to addresses that are multiples of their sizes: `0x0`, 
`0x2`, `0x4`, ... for `shorts`, `0x0`, `0x8`, ... for `longs` and just 
whatever for those 1-byte `chars`. This regularity allows the System to 
arrange memory in **blocks** of known size, which simplifies memory reads and 
writes by using block numbers and offsets instead of always using absolute 
memory addresses.

### It's Just a Shift to the Left...
The above is pretty dry and honestly is not all that directly useful when 
you're more focused on building the next *big thing* or todo list app, so 
here's something that's probably just as useless but at least it has something 
to do with actual code: bitshifts!

Bitshifts are a type of **bitwise operation**, which are spooky scary things 
you can do to the underlying binary representation of values to get new, 
(sometimes) different values! Of the various bitwise ops, I'm only going to 
talk about bitshifts right now, as they are somewhat related to number 
representation (not that the others aren't!) and I don't want to put too much 
on my plate just yet.

Without any ado, here's some C (woot):

    int main(void) {
      int x = 6;
      int y = x >> 1;
      printf("y: %d\n", y);
    }

This outputs `y: 3`. What the hell did `>>` do to my `x`. It *appears* to have 
divided it by two, and that's true, but it's a little sneakier than all that:

  * The binary representation of `int x` is `0b0110` (I've omitted the 
    leftmost 28 `0`-bits for cleanliness reasons)
  * `<val> >> <int>` moves all the bits in `<val>` to the right `<int>` 
    places, so `0b0110 >> 1 == 0b0011`. Any bits that "fall off" the right 
    edge vanish.
  * `0b0011` is the binary representation of the decimal value 3.

So we've divided by two by moving everything over to the right once. This 
makes sense, because every "place" in a binary representation is worth two 
times the "place" to its right. Now let's go the other direction:

    int main(void) {
      int x = 6;
      int y = x << 1;
      printf("y: %d\n", y);
    }

This, predictably, prints `y: 12`. Shifting left one position multiplied the 
value of `x` by two. Let's do something one more time:

    int main(void) {
      int x = -6;
      int y = x >> 1;
      printf("y: %d\n", y);
    }

This prints `y: -3`, which is to be expected, considering shifting to the 
right once divides by two. However, is this really as obvious a thing to 
happen as it seems it should be?

  * The hexadecimal representation of `int x` here is `0xfffffffa`. I've used 
    hex here to illustrate all of those leading `f`s. `0xf` in binary is 
    `0x1111`, so you can see that `0xfffffffa` has a whole bunch of leading 
    ones until we get to `a`. `0xa` is the hexadecimal representation of the 
    decimal value 10, and `0xa - 0xf - 0x1 == 10 - 15 - 1 == -6`. More on how 
    negatives are represented very shortly.
  * `x >> 1 == 0xfffffffa >> 1 == 0xfffffffd`. What? Well, the last four 
    digits of the binary representation of `-6` are `0b1010` (with only ones 
    to the left of them). `0b1010 >> 1 == 0b1101 == 0xd` (the extra one comes 
    from all those extras to the left).
  * `0xfffffffd` is the hexadecimal representation of the decimal value `-3`: 
    `0xd - 0xf - 0x1 == 13 - 15 - 1 == -3`

Hopefully you can see that, when a value who's representation's *leftmost bit* 
is a one is shifted to the right, the "spaces" created on the left side are 
filled with ones. If the leftmost bit is a zero, then those spaces are filled 
with zeroes. This is called an **arithmetic shift**.

Now, Java (and some other languages) also include a `>>>` operator that 
*forces* the spaces created at the left end to be filled with zeroes, 
regardless of the original value of the leftmost bit. This is called a 
**logical shift**, and not recognizing the difference can make you crazy, but 
it's the pelvic thrust that really drives you insane.

Similarly, say we have a `char` of value `0xf1 == -15` and we decide that we'd 
rather have it as an `int`. That is, we **cast** it to type `int`:

    char x = 0xf1;
    int y = x;
    printf("0x%x\n", y);

This outputs `0xfffffff1`. The **expansion** from `char` to `int` pads the 
left side of the representation with ones, same as an arithmetic shift. If 
instead we had `char x = 0x01`, the output would be `0x00000001` (or just 
`0x1`, as `printf` by default does not include leading zeroes, but trust me 
it's the longer version under the hood).

#### P.S., My Two's Complements to the Chef
*Many* Computing Systems use [two's complement](https://en.wikipedia.org/wiki/Two's_complement) 
to represent negative numbers. Here's a *real* brief explanation of the 
concept.

For a **signed** version of a given representation, say, a `signed int` (the 
default for an `int` in many languages), the leftmost bit is called the 
**sign bit**. If the sign bit is a one, then the represented value is 
negative, if it's zero, it's positive. This is simple, on its own, but to make 
certain mathematical operations easier, we actually change the whole 
representation to get the negative version of a number, using the following 
steps:

  * Take the positive representation of the number, say `0x00000005 == 5`
  * "Flip" the bits (set all zeros to ones and all ones to zeros), which gives 
    us `0xfffffffa` (`0x5` is `0b0101`, so flipping it results in `0b1010`, 
    which is `0xa == 10`)
  * Add one, giving us `0xfffffffb`, the two's complement representation of -5.

### Let's Do the Time Warp Again
Phew! That was a lot of stuff. I mean a *lot*, by my standards. But we made 
it! Next time, I'll introduce [what the hell a CPU does]({% post_url 2019-08-18-computers-wtf-4-cpus %}), 
at a very basic level (I don't want to get bogged down in the details, CPUs 
are hella complicated!).  Thanks for joining!
