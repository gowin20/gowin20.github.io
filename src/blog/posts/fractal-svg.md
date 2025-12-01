---
title: Fractal SVGs
tags: 
    - tutorial
    - math
    - svg
    - frontend
description: Recusrively generate fractals using Javascript
image: minkowski-cover.png
date: 2023-03-19
---

I love fractals. I see them in everything, and I've spent way too much time watching [Mandelbrot Fractal Zoom](https://www.youtube.com/watch?v=LhOSM6uCWxk) videos on Youtube. It's only natural that I figured out how to generate them programmatically as soon as I learned about SVG Paths.

I created a simple [Fractal SVG Generator](/fractal-svg) that recursively creates self-similar images following a set pattern. 

Here's an example of what I'm talking about. Let's create a fractal out of the following pattern, called the "Minkowski Sausage":

{% image "./src/images/fractal-svg/line150-d1.png", "Minkowski Sausage, Depth 1" %}

A simple squiggle. Now, imagine that every line segmet that comprises the pattern gets replaces by a smaller version of the entire pattern:

{% image "./src/images/fractal-svg/line150-d2.png", "Minkowski Sausage, Depth 2" %}

All eight line segments in the original pattern got replaced by smaller vesions of the pattern. Continuing this infinitely would give us a true fractal. Given the laggy nature of SVGs, we can only generate fractal-like patterns of a relatively small depth before everything starts freezing up. Here's the same Minkowski Sausage at depth 4:

{% image "./src/images/fractal-svg/line150-d4.png", "Minkowski Sausage, Depth 4" %}

Even at such a low depth, it already looks cool! This tool can be used to generate simple SVGs representing fractal patterns, which have many use cases. It is not an attempt to perfectly recreate fractals, and it was created entirely for fun.

This is also a great way to learn more about SVGs. If you want to recreate this program yourself, read onwards!

### Prerequisites

To get the most out of this article, you need:

* A basic understanding of how SVGs work
* A basic understanding of recursion
* A basic understanding of trigonometry

That's pretty much it. This is a simple concept.

### SVG paths

The type of fractals we're interested in take the form of a single line. For a fractal with a depth limit, you can describe that line as a finite series of instructions that explain when to draw and when to turn. Enter the SVG `<path>` option.

For beginner programmers, you can think of a `<path>` similar to a [turtle](https://www.geeksforgeeks.org/turtle-programming-python/) in Python or sprites in [Scratch](https://scratch.mit.edu/). A `<path>` description provides a set of instructions to an invisible agent that draws lines. You control the agent by telling it to move to a set of spatial coordinates, drawing a line as it goes. This is highly simplified, and there are many more complex operations that you can perform using SVG paths. Today we're only going to use the `l` instruction.

```
<path d="l 20 0"></path>
```

This will draw a line from `0,0` to `20,0` in the SVG view box. Let's use this to create an SVG.

```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#000000" viewBox="0 0 20 20">
    <path d="l 20 0"></path>
</svg>
```

This is a simple SVG of a line. 

### Fractal paths

For now, let's focus entirely on generating a `<path>` that represents a fractal. We'll leave the SVG tags behind and enter a JavaScript file to generate SVGs programmatically.

```
function drawPattern() {
    let fractalPath = ``;
    return fractalPath;
}
```

The `drawPattern` function will create the contents of the `d` parameter for a `<path>`. Adding recursion to this function will enable us to generate fractal SVGs.

```
function drawPattern(depth, max) {

    let fractalPath = ``

    if (depth < max) {
        // Recursive call
        fractalPath += drawPattern(depth+1,max)
    }
    else {
        fractalPath += `l 0 5 `
    }

    return fractalPath;
}
```

This introduces recursion, but the output is still trivial. To create a path that looks like a fractal, we need to provide a pattern for the program to follow. That means that we need to create a system of instructions for moving the path around.

I chose to implement a very simple system. All input to the `<path>` will be determined by a list containing two different instructions: `DRAW` and `TURN`. The `"DRAW"` instruction will move the pointer forward a set amount, while any integer input will be interpreted as a number of degrees to turn. Being able to "turn" our lines means we can draw complex fractal patterns. 

Here's an example of a set of instructions that draws a square:

```
["DRAW",90,"DRAW",90,"DRAW",90,"DRAW"]
```

To implement this, we will need to store the current heading of the pointer in a global.

```
let heading = 0;
```

Now, to intepret the different instructions:

```
pattern.forEach(instruction => {
    if (instruction == "DRAW") {
        // Draw a line in the direction of heading
    }
    else {
        heading += instruction;
        heading %= 360;
    }
})
```

We'll use our good friend trigonometry to interpret the `heading` and create a line to the proper coordinates:

```
if (instruction == "DRAW") {

    // Draw a line in the direction of heading
    const headingRad = (Math.PI * heading) / 180;

    const dy = (size * Math.sin(headingRad));
    const dx = (size * Math.cos(headingRad));
    fractalPath += `l ${dx} ${dy} `

}
```

This translates the heading into a pair of vectors `dy` and `dx`, then uses them to add a new `l` instruction to the path. Doing this recursively will create the fractals we are seeking. The only problem remaining is the `size` - we need the size to scale based on the depth in the fractal.

```
const size = 5 * depth
```

Perfect. Let's add everything together into one recursive function:

```
const pattern = ["DRAW",90,"DRAW",90,"DRAW",90,"DRAW"]

function drawPattern(depth, max) {

    const size = 5 * depth;
    let fractalPath = ``;

    pattern.forEach(instruction => {
        if (instruction == "DRAW") {

            if (depth+1 < max) {
                fractalPath += drawPattern(depth+1,max)
            }
            else {
                fractalPath += `l 0 5 `
            }

            // Draw a line in the direction of heading
            const headingRad = (Math.PI * heading) / 180;

            const dy = (size * Math.sin(headingRad));
            const dx = (size * Math.cos(headingRad));
            fractalPath += `l ${dx} ${dy} `
        }
        else {
            heading += instruction;
            heading %= 360;
        }
    })

    return fractalPath;
}
```

And that's the core logic behind the system. Despite how short the code is, there is a large amount of complexity behind how the system works. This function can take in any pattern described in the language of moving and turning, and will generate a fractal version of that pattern. It does so by iteratively replacing each line in the pattern with a smaller version of that pattern. The only requirement for patterns is that they end at the same y-level as they began.

Here's an example of how this function can be used to generate an SVG:

```
// Minkowski Sausage (Fractal dimension 1.5)
const pattern = ["DRAW",90,"DRAW",-90,"DRAW",-90,"DRAW","DRAW",90,"DRAW",90,"DRAW",-90,"DRAW"];
const depth = 4;

// Generate path
const path = drawPattern(0,maxDepth);

// Create SVG element
const fractalSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
const fractalPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

fractalPath.setAttribute('d', path);
fractalSVG.appendChild(fractalPath);

return fractalSVG
```

My [fractal svg](/fractal-svg) site uses this logic to generate many different patterns. If you have any ideas for more patterns please let me know! I'm also looking to expand this system if anyone has suggestions.