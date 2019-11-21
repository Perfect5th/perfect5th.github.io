---
layout: post
title: Zombie Aggregation Theory
---
Please pardon my insanity.

I've been thinking about zombies, the kind that eat humans to make more zombies. Zombies have been observed moving in groups (in media, obviously not real life (?)). But, here's the question that I ask myself, and maybe also pose to you – how does an individual zombie choose to join a group? I can think of a few basic decision models for this one:

  1. New Zombie (_NZ_) joins the same group as their Parent Zombie (_PZ_)
  2. _NZ_ joins a different, nearby group
  3. _NZ_ creates their own new group

Now, if option 1 were the definite case, then, assuming a single zombie patient zero, there would only be one, enormous shambling horde. The horde may be split into subgroups at a later time due to an external force: say, the military shows up and cuts a swath through it with some sort of actually effective weaponry. Does a split horde rejoin, if it can? Do the sub-hordes go their own separate ways?

Another problem with option 1 is the assumption that _NZ_ knows where _PZ_ is. Maybe zombies have some sort of pheromone-based clumping factor that lets them find large groups of zombies, or find their _PZ_ like some salmon finding the stream it grew up in. Uncertain.

In any case, if _NZ_ can't join _PZ_, it either finds another nearby group (possibly using aforementioned clumping factor) or it strikes out on its zombie-own, either until it finds a group to join, or gets killed by some human asshole with a chainsaw-hand.

To throw a bit of flavour into the mix, let's assume that _NZ_ has a non-zero chance of selecting any of the options above. These chances are not equal, though – option 1 has the highest chance, followed by option 2, and lastly option 3. Lets also assume that once _NZ_ has made this decision, it is a decision made for life (or, unlife, I guess). If the probability that _NZ_ joins _PZ_'s group is a combination of some fixed factor (say, affinity for _PZ_), the size of _PZ_'s existing group, and the distance to _PZ_, and the probability that _NZ_ joins a different group is the same, minus the affinity factor, then we get a kind of approximation of [scale-free network](https://en.wikipedia.org/wiki/Scale-free_network).

A scale-free network has a degree distribution that follows a power law (pretty much lifted that straight from the first sentence on Wikipedia). In other words, as our zombie problem gets out of hand, we will have a few large-to-very-large hordes, a smattering of mediumish hordes, quite a few zombie collectives, and many, many smaller zombie conga-lines. This is similar to what we see in a lot of networks, like the internet, where a small number of sites get linked to a _lot_. People often call this an application of the [Pareto distribution](https://en.wikipedia.org/wiki/Pareto_distribution) or the "80-20 rule".

Anyways, that's my treatise on how zombie aggregation is an example of a scale-free network. Obviously my priors are up for debate, and I've made a lot of assumptions about the nature of zombies. Feel free to disagree, but remember that zombies are fictitious and can work however I want them to to illustrate my point.

Thanks for coming to my UnTed Talk!

— Mitch
