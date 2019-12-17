---
layout: post
title: Inheriting the Technical Interview
---
_N.b., This is an homage to Aphyr's series of "Technical Interview" posts, which are excellent and can be read [here](https://aphyr.com/posts/340-reversing-the-technical-interview), [here](https://aphyr.com/posts/341-hexing-the-technical-interview), and [here](https://aphyr.com/posts/342-typing-the-technical-interview). I do not pretend to have even a fraction of the original author's wit and depth of understanding._

He begins to draw. His style is rough, untrained, but you can see that a fragment of his soul is that of an _artiste_, buried years ago to appease his new gods and shun the Old Ones. What results is a crude, incomplete pictogram of _Yggdrasil_, its branches straining to contain the unworthy weight of the world, its roots, once strong, reduced to fevered memories. It has been turned on its head.

“So, er,” he stumbles. You know his next words before they come to him, and you mentally fill in the gaps: Kevin wishes you to recant (TODO)

Kevin walks around to stand beside you. He looks slightly confused, as if the desk hadn't _always_ been a standing desk.

“Language?” you ask, customarily, eyebrows raised.

“Whatever you're comfortable with.” The words leave Kevin's mouth before he has fully weighed them. The implications of this incantation suddenly fill his eyes with fear.

You intertwine your fingers and flex them, arms outstretch. Then, tapping the top left key three times for luck, begin:

```
#lang racket
```

You feel Kevin balk. His aura shivers. A slight cold wind wriggles through the standing hairs on the back of his neck, but he says nothing.

_Say something to allay his concerns_. “It's quite expressive.” You optimistically assume he has been soothed. “Let's start at the bottom — build our way up slowly.”

```
(define Object (λ (msg) (void)))
```

“Is that a… a _lambda_” he stammers.

“The old names are the most succint” you reply, as way of explanation. He seems to accept that.

“And, you've called it ‘Object’, even though it's a function?”

“What is an object? A miserable pile of secrets.”

“Erm.”

You continue:

```
(define (obj superobj fields)
  (λ (msg)
    (let ([field (assoc msg fields)])
      (if field
          (second field)
          (superobj msg)))))
```

“If what we search for is not present, we defer to our ancestors” you say, glancing upward. The LED ceiling lights blink conspiratorily, bringing you a smile. Kevin shakes a dusting of spring snow from his tufts.

```
(define Leaf
  (obj
    Object
     (list (list 'name "")
           (list 'printName
                 (λ (self depth)
                   (printf "~a~n" (self 'name)))))))
```

“An entity is nothing unless it can speak its name.”

Kevin has a question: “This is an awful lot of lists. I think I see what you're going for, but why the nested lists?”

You smile. Finally, he is beginning to engage. “Well,” you keep your tone at a level befitting one of Kevin's esteem and status, ”we could use a varietal of map, but lists have such pedigree, and a map is just a list with pretension.”

“I was just, wondering…” Kevin trails off as you run your fingers ritualistically across the keyboard. The round face of the room's touchscreen thermostat begins to frown.

```
(define Composite
  (obj
    Leaf
    (list (list 'children empty)
          (list 'printName
                (λ (self depth)
                  (begin
                    (printf "~a/~n" (self 'name))
                    (map
                      (λ (child)
                        (begin
                          (printf "~a" (string-append* (make-list (+ depth 1) "    ")))
                          ((child 'printName) child (+ depth 1))))
                      (self 'children))
                    (void)))))))
```

“The basic worldbuilding is complete,” you say, bowing slightly in the direction of the Common Lisp in thanks. “Let us provide the specifics of this iteration of the tale.” You apologize for the epithet, invoke the indentation guardian, and turn to Kevin. “What were they, again?”

He removes his glasses with one hand to breathe the ice from them while gesturing vaguely toward the whiteboard with the other, opening and closing his fingers as if grasphing for a lifeline or a piece of bread.

“Ah yes, thank you Kevin.”

```
(define file1 (obj Leaf (list (list 'name "file1"))))
(define file2 (obj Leaf (list (list 'name "file2"))))
(define file3 (obj Leaf (list (list 'name "file3"))))

(define dir1 (obj Composite (list (list 'name "dir1")
                                  (list 'children
                                        (list file1 file2)))))
(define dir3 (obj Composite (list (list 'name "dir3")
                                  (list 'children
                                        (list file3)))))
(define dir2 (obj Composite (list (list 'name "dir2")
                                  (list 'children
                                        (list dir1 dir3)))))

((dir2 'printName) dir2 0)
```

You perform a quick hand mantra to commit your incantation and direct Kevin's warbling attention to the console.

```
dir2/
    dir1/
        file1
        file2
    dir3/
        file3
>
```

Kevin speaks as if the words are a molasses, struggling for regurgitation. “That's the right output, but, uh, all I see are a bunch of functional calls, a crazy amount of lists, and some weird strings with only one quote mark. It's a bit incomprehensible.”

“My apologies,” you bow deeply. The desk shivers. “Symbols are only as powerful as their interpreters,” you say. “Perhaps I can attempt a translation into a tongue that will be more familiar to you, and you can take a gander?” You smile inwardly.

Kevin squints and swallows, you think you hear a slightly defensive hiss, but he assents with a nod. “Yeah… we still have some time.”

You begin again, this time with even more vigour.

```
(define-syntax-rule (-> obj msg args ...)
  ((obj (quote msg)) obj args ...))

(define-syntax-rule (get obj msg)
  (obj (quote msg)))

(define-syntax-rule (new objname [(f v) ...])
  (obj objname (list (list (quote f) v) ...)))

(define-syntax class
  (syntax-rules (extends)
    [(_ name [(f v) ...]) (define name (new Object [(f v) ...]))]
    [(_ name extends super [(f v) ...]) (define name (new super [(f v) ...]))]))
```

Kevin may have given up, or he may have laid an egg. His expression is unreadable, but his energy is a focused pinprick.

You begin to rewrite some of your previous work:

```
(class Leaf
  [(name "")
   (printName
     (λ (self depth)
       (printf "~a~n" (get self name))))])

(class Composite extends Leaf
  [(children empty)
   (printName
     (λ (self depth)
       (begin
         (printf "~a/~n" (get self name))
         (map
           (λ (child)
             (begin
               (printf "~a" (string-append* (make-list (+ depth 1) "    ")))
               (-> child printName (+ depth 1))))
           (get self children))
         (void))))])
```

“Does that help?”

He hunkers down, warming his clutch. The threat is beginning to pass.

```
(define file1 (new Leaf ([name "file1"])))
(define file2 (new Leaf ([name "file2"])))
(define file3 (new Leaf ([name "file3"])))

(define dir1 (new Composite ([name "dir1"]
                             [children (list file1 file2)])))
(define dir3 (new Composite ([name "dir3"]
                             [children (list file3)])))
(define dir2 (new Composite ([name "dir2"]
                             [children (list dir1 dir3)])))

(-> dir2 printName 0)
```

The output is the same. Of course it is — wearing a mask changes not the wearer, only the awareness.

Kevin is weary and wary. He is either satisfied or has completely retreated into his nest.
