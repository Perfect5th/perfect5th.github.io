---
layout: post
title: Javascript Madness
---
The main reason I created this website was to let me flex out some web design
muscles. Most of my current work is back-end stuff, so getting to mess
with UI is a treat I don't often get to enjoy.

You may have noticed that I've started animating the site. I'm doing most of
this in [jQuery](http://jquery.com/), mainly because I have a passing
familiarity with it, and there's no real back-end to this blog.

My experience so far with using jQuery for animations is good! I ran into a
couple of issues that I had to hack around, though.

The biggest problem was animating the width of these posts back to `auto`. Turns
out you can't do that using jQuery's `animate()`. I got around it by wrapping my
post title headers in `<span>` tags to prevent them from expanding to match the
entire post div width, then animating the div back to that width. Worked a
treat, but I'm sure there's an easier way, if I just asked around.

I wanted the index page to load fast. Planning ahead for the possibility of lots
and lots of blog posts, I opted to use
[jQuery Ajax](http://api.jquery.com/category/ajax/) rather than render all of
the post content at index GET. Each time you click a post title, it kicks off an
async request for the post content.

I'm having a lot of fun messing around here, and I'm sure I'll put a lot more
time into this. I'm also starting some work on a single-page React app, but I'm
sure I can juggle the two.

— M
