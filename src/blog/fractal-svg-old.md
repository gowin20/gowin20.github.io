---
title: Generate fractal SVGs
tags: tutorial, math
category: frontend
description: Recusrively generate quadratic koch curves using Javascript
image: sausage-5-filled.svg
date: 2022-12-04
---

This article is out of date. It will be hidden as soon as I implement hiding functionality.

## basics of SVG drawing

- explain how to use `<path>`, `H`, `V` lines

## generate SVG files

```
  const fs = require('fs');

  function saveToFile(svg,depth) {
      fs.writeFile("minkowski-sausage-"+"-"+depth+".svg",svg,function (err){
          if (err) throw err;
      });
  }
```

```
  let svg = `<svg width="${width}" height="${width}" id="iter1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="${path}" fill="${fill}" stroke="black"/></g></svg>`
  saveToFile(svg,depth)
```

## encode the pattern

```
  turns:[
      turnLeft,
      turnRight,
      turnRight,
      straight,
      turnLeft,
      turnLeft,
      turnRight
      ]
```

## handle different directions

```
let heading = "+x";

// makes a 90deg left turn
const turnLeft = () => {
    switch (heading) {
      case "+x":
        heading = "-y";
        break;
      case "-y":
        heading = "-x";
        break;
      case "-x":
        heading = "+y";
        break;
      case "+y":
        heading = "+x";
        break;
    }
}

// makes a 90deg right turn
const turnRight = () => {
  switch (heading) {
    case "+x":
      heading = "+y";
      break;
    case "+y":
      heading = "-x";
      break;
    case "-x":
      heading = "-y";
      break;
    case "-y":
      heading = "+x";
      break;
  }
}

const straight = () => {return;}

```

## generate the pattern

function to draw the pattern
`drawSegment` just draws a line segment for now hehe

```
    function drawPattern(size,depth,max) {
        let section = ``;
        //creates eight segments - a single fractal unit
        pattern.turns.forEach(turn => {
        section += drawSegment(size,depth,max);
        turn();
        })
        section += drawSegment(size,depth,max);
        return section;
    }
```

`drawsegment` draws a line based on the current heading

```
    // draws a line based on the current heading and step size
    function drawSegment(size,depth,max) {
        let line = ``
        switch (heading) {
        case "+x":
            line += `h ${size} `;
            break;
        case "+y":
            line += `v ${size} `;
            break;
        case "-x":
            line += `h -${size} `;
            break;
        case "-y":
            line += `v -${size} `;
            break;
        }
        return line
    } 
    }
```

## apply mutual recursion

call `drawPattern` within `drawSegment`

```
    function drawSegment(size,depth,max) {
    if (depth < max) {
        return drawPattern(size/pattern.scale,depth+1,max)
    }

    // ... code hidden for clarity ...
    }
```

easy!

## make some fractals!

```
makeMinkowski()

```