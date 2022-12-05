---
title: Create a fractal SVG animation
tags: tutorial
category: frontend
description: Learn how to programmatically create an animated SVG
---

1. The end goal

1. SVG animation basics


1. Creating an animation by hand

{% include "content/fractal-svg/iter1.njk" %}

{% caption "click the line!" %}

## Creating an svg programmatically

In order to create fractals of any desired depth, we need to generate the HTML comprising the fractal programmatically. Let's start by making a basic program that creates the fractal we just made and saves it to a new file.

### Create an SVG file

```js
    function makeMinkowski(iter) {
        let svg = `<svg width="192" height="128" id="iter1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>`

        saveToFile(svg,iter)
    }

    makeMinkowski(1)
```

5. Recursion, baby!

ID names

ID format: `#1234`
- each chacter at the index gives the component piece a direction for that iteration. based on the iteration number, they will move a specified distance


events that fire after each iteration

{% image "./src/images/sausage-5-filled.svg","Minkowski sausage fractal, depth 5" %}

bet