---
path: "/posts/form-labels"
date: "2019-02-03"
title: "Usability Hacks: Remember Your Form Labels"
blurb: "A small tweak makes forms easier to use"
---

Consider the following two simple HTML forms:

<form class="example">
<legend>Example 1</legend>
<p><label>Name: </label> <input type="text" name="name_a" /></p>
<p><label>Email: </label> <input type="email" name="email_a" /></p>
<p>Email frequency:</p>
<ul>
  <li><input type="radio" name="freq_a" value="daily" /> <label>Daily</label></li>
  <li><input type="radio" name="freq_a" value="weekly" /> <label>Once a week</label></li>
  <li><input type="radio" name="freq_a" value="monthly" /> <label> Once a month</label></li>
</ul>
</form>

<form class="example">
<legend>Example 2</legend>
<p><label>Name: <input type="text" name="name_b" /></label></p>
<p><label>Email: <input type="email" name="email_b" /></label></p>
<p>Email frequency:</p>
<ul>
  <li><label><input type="radio" name="freq_b" value="daily" /> Daily</label></li>
  <li><label><input type="radio" name="freq_b" value="weekly" /> Once a week</label></li>
  <li><label><input type="radio" name="freq_b" value="monthly" /> Once a month</label></li>
</ul>
</form>

Notice a difference? Here's a hint—try playing around with the email frequency options. Notice how with the top one you have to click on the actual radio button itself, but on the bottom example you can click the label. The bottom one is easier to work with, isn't it?

If you don't already know this trick, here's the HTML. For the first, less-convenient version:

```html
<label>Form label</label> <input />
```

For the version with improved usability, there's actually two ways to accomplish this:

```html
<!--variation one-->
<label>Form label wrapping input <input /></label>

<!--variation two-->
<label for="input_id">Form label</label> <input id="input_id" />
```

This is also covered over at [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label).

So nothing really earth-shattering here. This is, really, a pretty small tweak that seems like it should go without saying. And yet, I've seen enough times where this is overlooked—whether out in the wild, or during code reviews, or when interviewing candidates for a front-end role—that I think it is worth calling attention to. A lot of people seem to genuinely not know about this, so my first hope with this post is that if this is new to you, now you know and can incorporate it into your web forms going forward.

My second hope with this post is to nudge a bit of reflection on usability and its importance. I think there are probably at least a handful of developers out there who, even if they're aware that labels _can_ be associated with form elements, don't see what the big deal is. As long as the form is transmitting data to the back end and it looks like the mockup, job done, right?

I'd suggest this is too narrow a definition of "working." Web forms are central to how our users interact with and experience our programs. The data we ask users to provide through them informs how our systems operate, and the quality of their experience here colors their perception of our systems as a whole. A user who finds a form frustrating is more likely to skip over or inaccurately fill in form elements, or even abandon the form altogether, meaning we receive inaccurate data or no data at all. A form with suboptimal usability is a form with suboptimal functionality.

If we're taking the time to implement such quick and easy usability wins as properly associating labels with input, hopefully this means we're already in the general mindset that takes usability seriously as defining whether our software "works" or not. Conversely, if we're skipping even such simple improvements to the user experience, we're likely overlooking other, larger areas as well.
