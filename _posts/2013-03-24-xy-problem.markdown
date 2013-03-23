---
layout: post
title: "XY Problem"
date: 2013-03-24 01:52
comments: true
categories: 
---

### "XY Problem" explanations by various people:
- You want to do X, and you think Y is the best way of doing so. Instead of asking about X, you ask about Y. <br>
— from ["Re: sequencial file naming"](http://www.perlmonks.org/index.pl?node_id=87035)

- You're trying to do X, and you thought of solution Y. So you're asking about solution Y, without even mentioning X. The problem is, there might be a better solution, but we can't know that unless you describe what X is. <br>
— from [Re: How do I keep the command line from eating the backslashes?](http://www.perlmonks.org/index.pl?node_id=430320) by revdiablo

- Someone asks how to do Y when they really want to do X. They ask how to do Y because they believe it is the best way to accomplish X. People trying to help go through many iterations of "try this", followed by "that won't work because of". That is, depending on the circumstances, other solutions may be the way to go. <br>
— from [Re: Re: Re: Re: regex to validate e-mail addresses and phone numbers](http://www.perlmonks.org/index.pl?node_id=327963) by Limbic~Region

- To answer question Y, without understanding larger problem (the context) X, will most likely *not* help them entirely with X. <br>
— from [The XY problem (was Re: CGI.pm: controlling Back & Reload)
](https://groups.google.com/forum/?fromgroups=#!msg/comp.lang.perl.misc/rCCGCpipjH0/TBQOCAT9154J) by [Randal L. Schwartz](http://www.stonehenge.com/merlyn/)

- A.k.a. "premature closure": the questioner wanted to solve some not very clearly stated X, they concluded that Y was a component of a solution, and now they're asking how to implement Y. <br>
— from [Re: CGI.pm: controlling Back & Reload](https://groups.google.com/forum/?fromgroups=#!msg/comp.lang.perl.misc/rCCGCpipjH0/awehJE2Ck5YJ) by Alan J. Flavell

- The XY problem is when you need to do X, and you think you can use Y to do X, so you ask about how to do Y, when what you really should do is state what your X problem is. There may be a Z solution that is even better than Y, but nobody can suggest it if X is never mentioned. <br>
— from [Re: Compound scalar names?](https://groups.google.com/forum/?fromgroups=#!msg/comp.lang.perl.misc/KGEh9CXPwQ0/TLmvdqBDV_AJ) by Tad McClellan

- When people come \[in here\] asking how to do something stupid, I'm never quite sure what to do. I can just answer the question as asked, figuring that it's not my problem to tell people that they're being stupid. . . . But if I do that, people might jump on me for being a smart aleck, which has happened at times. ("Come on, help the poor guy out; if you know what he really need why don't you just give it to him?") <br>
. . . <br>
On the other hand, I could try to answer on a different level, present a better solution, and maybe slap a little education on 'em. That's nice when it works, but if it doesn't it's really sad to see your hard work and good advice ignored. Also, people tend to jump on you for not answering the question. ("Who are you to be telling this guy what he should be doing? Just answer the question.")  <br>
. . . <br>
I guess there's room for both kinds of answer. Or maybe there isn't room for either kind. <br>
— from [Why it's stupid to *use a variable as a variable name*](https://groups.google.com/forum/?fromgroups=#!msg/comp.programming/ygCTx6AN7ds/3S9Ei9saEbUJ) by Mark-Jason Dominus 

- The questions I like the best are the ones that go like this:

		I want to accomplish X.
		
		I thought that the following code fragment would do it:
		
		...
		
		But instead it does Y.
		
		Why is that?
This one is also pretty good:

		I want to accomplish X.
		
		I thought I might be able to use facility Y.
		
		But Y doesn't seem like it's quite right, 
		because of Z.
		
		What should I use instead of Y, or how can I overcome Z?
— from [Re: system() question](https://groups.google.com/forum/?fromgroups=#!msg/comp.lang.perl/wu0T7a9orc0/3Q4PVIbEzZUJ "I never get answers to questions in newsgroups.") by Mark-Jason Dominus

- TIP: How to post good questions
In article <fl_aggie-2406981247580001@aggie.coaps.fsu.edu>, I R A Aggie <fl_aggie@thepentagon.com> wrote:
    >Dominus wrote:
    >>``How do I use X to accomplish Y?'' There's nothing wrong with this,
    >>except that sometimes X is a chocolate-covered banana and Y is the
    >>integration of European currency systems.

A less abominable example of this that comes up all the time is

	I have an array of strings.  How do I check whether the array
	contains a certain string?
Usually (not always, but usually) the best answer is to `unask the question`:

    You should be using a hash, not an array.
I wish I had a convenient term for this kind of mistake. The general case is:

 1. Someone wants to accomplish task Y.
 2. They determine that a way to accomplish Y is to use facility X.
 3. There is a sub-task of Y, say Z, for which X is ill-suited.
 4. They come into the group and ask `"how can I use X to accomplish Z?"`

This is a problem for people here trying to answer the real question, which is:

	How can I accomplish Y?
— from [TIP: How to post good questions](http://perl.plover.com/Questions3.html) by Mark-Jason Dominus

- Too bad that the more general problem, X, is often considered off topic for this forum. Y has more of a chance to look like a Perl problem. <br>
— from [The XY problem (was Re: CGI.pm: controlling Back & Reload)](https://groups.google.com/forum/?fromgroups#!msg/comp.lang.perl.misc/rCCGCpipjH0/VUXQwCG8ICkJ) by Bart Lateur