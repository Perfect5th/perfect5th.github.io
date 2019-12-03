---
layout: post
title: What Is a Monad?
---
I was recently talking to a colleague of mine about functional programming, and he said something to me that I'll approximate as “a lot of programmers can't get their minds around monads.” While I don't think that's necessarily true – that they _can't_ – it does point to a pretty big barrier in the way of wider adoption of functional programming. The problem is one of jargon, which you'd think a lot of programmers have plenty of experience with, but this jargon is different because it's _math jargon_. Even worse than that, it's _category theory jargon_.

So I'm going to try to come descriptively at monads. in an engineeringy kind of way. I'll talk about a certain type of (relatively common) programming problem and we'll try to work out way naturally to producing a structure that solves it (the monad), which should be more than enough of an explanation, really, and not take long at all.

# Contrived Examples Are the Best Examples

Let's start by pretending we have to implement something in a language that has a few peculiarities. Here's the overview:

  1. C-like syntax
  1. Statically typed
  1. No exceptions/exception handling (try-catch stuff)
  1. No pointers
  1. Functions can only return a single value

Our boss, Satan himself, Lord of Darkness, has asked us (nay, commanded us) to produce a function that does some complicated and evil computations that have a decent chance of failure and produce a value with type `damned_soul_t`, and he wants our function to do those computations and return in a way that lets our caller know if this process failed in a sane way.

A C way of going about this is to take as one of our arguments a pointer to a `damned_soul_t` (a `damned_soul_t *`) that we fill up with our new value. What our function _actually_ returns is an integer indicating whether this process was successful. Something like:

    int damn_soul(soul_t new_soul, damned_soul_t *damned) {
      // Perform dark machinations - AVERT YOUR EYES

      if (success) {
        *damned = newly_damned_soul;
        return 0;
      } else {
        return error_reason;
      }
    }

Where `error_reason` is some non-zero value indictating the specific failure reason. This has a few downsides though. The first is that it is documentation-heavy – if the caller wants to do something specific with the error code they need to know what the specific value means. Another is that the caller could ignore the error code, forget to handle it, try to use what they think is now a `damned_soul_t` and end up somewhere worse than hell (like with a segfault).

The most relevant problem to us is that our hellish language doesn't have pointers, so we can't do this at all. And because we don't have exception handling, we can't just `throw new TemptationException("Deathbed confession")` or something of the like.

A way to do this in our language would be to return a structure that our caller can check against before using:

    typedef struct sometimes_sinner {
      int return_value;
      damned_soul_t soul;
    } sometimes_sinner_t;

    sometime_sinner_t damn_soul(soul_t new_soul) {
      // Perform dark machinations - SERIOUSLY DON'T LOOK

      sometimes_sinner_t result = { .return_value = success, .soul = damned_soul };
      return result;
    }

Now our caller can check the `return_value` of the returned struct before they access the `soul`. This still has a problem though: it's not generic. Our caller still needs to know the specific implementation of our function and the structure of our return type. We can do better.

Imagine our language has typechecking. Let's pretend we also have inheritance, using `implements` on our structs, and we can check the actual type of something (not the apparent type) with `typeof(x)`. We can put together a type hierarchy like the following:

    typedef struct sometimes_sinner sometimes_t;

    typedef struct sinner {
      damned_soul_t soul;
    } sinner_t implements sometimes_t;

    typedef struct no_sinner {
      int error_value;
    } no_sinner_t implements sometimes_t;

Now we can write our function a _little_ differently:

    sometimes_t damn_soul(soul_t new_soul) {
      // Perform dark machinations - DO NOT LOOK INTO THE VOID

      if (error) {
        no_sinner_t result;
        result.error_value = error;
        return result;
      } else {
        sinner_t result;
        result.soul = damned_soul;
        return result;
      }
    }

This code ain't great, but it demonstrates my purpose here. Our caller is now (more or less) forced to inspect the return value before using it (let's pretend they can't just cast it).

    sometimes_t could_be_soul = damn_soul(fresh_soul);

    switch (typeof(could_be_soul)) {
      case sinner_t:
        // Stuff that handles the success case
        break;
      case no_sinner_t:
        // Stuff that handles the error case
        break;
      // No default because I say so, and we've handled all cases
    }

This is a somewhat janky iterative example of a monad. A monad is just an abstract type that can be one of two (or possibly more) concrete types. A _really_ generic version of our type hierarchy above could be:

    typedef struct maybe maybe_t;

    typedef struct just {
      T x;
    } just_t implements_maybe_t;

    typedef struct nothing implements maybe_t;

Where T is a generic type. In this case, `nothing` gives us, well, _nothing_, rather than an error code, but that's because this is as generic as I can make it – not everything that might not produce a value need produce something to tell you why it didn't.

# Tying It to Something Real

That's all well and good, but our toy language doesn't really have much to do with the real world and real programming, apart from a bit of syntax. Let's revisit some of our constraints:

  1. Statically typed
  1. ~~No pointers~~ Immutable variables (shhh)
  1. Functions can only return a single value

These two sound a lot like a lot of functional languages you may have heard about. Monads come into play to solve some of the difficulties when you want to play nice with these constraints. Having a data type that wraps a few possible options is useful, especially when your language can effortlessly pattern-match against them, as is the case (heh) in Haskell:

    case x of
       Nothing -> …
       Just y  -> …

If you're interested in reading more about the `Maybe` monad, check out the awesome wiki page [here](https://en.wikibooks.org/wiki/Haskell/Understanding_monads/Maybe). I hope this has been as helpful to you reading it as it has been to me writing it. Remember, a monad is just a present you need to unwrap!
