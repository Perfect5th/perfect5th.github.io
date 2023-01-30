---
layout: post
title: Computers, WTF? Part 6 - Static Shock
---
Variables, you probably know about them already, right? You know them as the 
names of values you use in your programs. You declare them, define them, and 
get really annoyed when JavaScript tells you that they're `undefined`. Today 
we are going to go a little bitter deeper into variables, specifically those 
of the **statically allocated** type. You may already be familiar with the 
keyword `static` as used in some languages. Depending on the language, this is 
a related concept. Also depending on the language, it is not a related concept 
(yay, semantic inconsistency).

What I'm trying to lay down here is the concept of **static allocation**. 
**Allocation** is the decision of where in memory a value will be stored. 
Static allocation is when this decision is made once for the value, then is 
not changed for the rest of the runtime of the program. This generally means 
that the memory address is decided by the compiler when it turns your code 
into an executable.

### Freeze, Sucka
Here's some C. I know you were begging for some code after looking at 
assembly [last time]({% post_url 2019-08-19-computers-wtf-5-basic-asm %}).

```
int a;
int b[10];

int main(void) {
  a = 0;
  b[a] = a;
}
```

In the code above, `a` and `b` are initialized as an `int` and an array of ten 
`ints` at the top. Then, in `main`, some of the values are changed. However, 
these references to `a` and `b` still refer to the exact same variables. The 
location and size of these variables can be inferred at compilation time, so 
the compiler statically allocates them. The x86 assembly for this allocation 
might look like:

```
.comm   a,4
.comm   b,40
```

`.comm` means a "common symbol", which can also be thought of as a kind of 
global variable. `a,4` is a common symbol named `a` of size 4 bytes. `b,40` is 
a common symbol named `b` of size 40 bytes (10 4-byte `ints`).

Alternatively, we can also just use labels to statically allocate our 
variables, but this requires we give them initial values:

```
a:
  .int 0
b:
  .int 0
  .int 1
  .int 2
  # <3..8>
  .int 9
```

The memory addresses allocated for the members of the array `b` are sequential 
– they come one after another. When a member of `b` is accessed, say, like 
`b[2]`, the integer provided is multiplied by the size of one member of `b` to 
get the memory offset from the start of `b` for that member. Say `b` is laid 
out in memory like so:

````
address   value
0x1000    b[0]
0x1004    b[1]
0x1008    b[2]
...
0x1024    b[9]
````

The aforementioned `b[2]` gets translated to "the data at memory address 
`0x1000` + 2&times;4 = `0x1000` + 8 = `0x1008`", as 4 bytes is the size of a 
member of `b`, an `int`. This is why both the type of an array and its size 
must be known at compile time for it to be statically allocated.

In x86-64 assembly, the instructions for accessing `b[2]` might look like 
this, assuming we have a label `b`:

```
mov $b, %rax       # Store the address of b in rax
mov 8(%rax), %rax  # Store b[2] in rax
```

The `8(%rax)` syntax tells the CPU to move the value found in memory 8 bytes 
after the start of the address stored in `rax` into `rax`. 8 bytes is the size 
of two `ints`, so we get `b[2]`.

### Lost in Translation
Next time, we'll try translating the above C code into assembly. The code 
itself doesn't have any output, and neither will our assembly(!), but it 
should run just fine, and it's good practice because I say it is. Later!
