---
title: Building image mosaics - Beyond the traditional grid
description: A mathematical approach to image tiling and mosaic galleries
tags:
    - math
    - gallery software
date: 2025-12-01
image: image-tiling-ideas/bouwkamp-square.png
---

## Introduction

Modern digital collections—whether art archives, comic panels, research datasets, or large media libraries—often require presenting hundreds or thousands of images in a cohesive visual layout. Creating these mosaics manually is time-consuming and error-prone, and most traditional tools (like Photoshop) quickly become unwieldy at scale.

This article explores the challenge of algorithmically generating large image mosaics, showcases my `gallery-image` package as an automated solution, and then examines more advanced tiling strategies, including “squaring the rectangle,” an elegant mathematical approach to dynamic layout generation. Along the way, we’ll explore why the classic grid layout dominates—and what opportunities lie beyond it.

---

## Image mosaics are harder than they look

I maintain a large collection of images—sometimes thousands at a time—that often need to be combined into a single, high-resolution mosaic. At first glance, this might seem as simple as dropping everything into Photoshop and aligning the layers. In practice, however, this approach quickly breaks down. Filesystems treat each image as its own object, and manually organizing them into a large canvas becomes tedious and error-prone.

{% image "./src/images/image-tiling-ideas/note-tile-1.jpeg", "Sample tiling of 15 post-it notes" %}
{% caption "Cropping this by hand took me 15+ minutes." %}

Even assembling a relatively small mosaic of fifteen images can take 15-20 minutes of careful dragging and resizing. Scaling that process to thousands of images or more becomes completely impractical without automation.

## Automating the process: Introducing `gallery-image`

To solve this, I built an NPM package called [**`gallery-image`**](https://www.npmjs.com/package/gallery-image), which programmatically assembles collections of images into cohesive mosaics. The tool generates large composite outputs and automatically produces IIIF (International Image Interoperability Framework) tiles, enabling the resulting images to be viewed efficiently in standard art or archival viewers.

When paired with the **`gallery-viewer`** client, these mosaics become zoom-friendly, interactive, and enriched with metadata on specific regions. This provides a scalable and performant way to display anything from comic book panels to densely packed archival collections.

To learn more about these, check out the [landing page](https://gowen.dev/projects/gallery-software). For now, though, with the core functionality of my project nearly complete, I've begun exploring a deeper question:  
**Does the gallery always need to use a standard square grid?**

---

## Reimagining image layouts

While the grid layout covers the vast majority of use cases, it is far from the only way to arrange images. Alternative tiling techniques can produce more dynamic, aesthetically interesting, or space-efficient results—though they often introduce new algorithmic challenges.

There's a range of problems and solutions available here that vary in complexity. We'll get as technical as you like, depending on the questions you ask.

## Common layout strategies

### 1. Uniform grid tiling

The simplest method: each image is cropped or resized to a uniform dimension and placed on a consistent grid. It’s predictable, visually stable, and easy to compute, though often visually monotonous.

{% image "./src/images/image-tiling-ideas/standard-grid.png", "Standard square grid" %}
{% caption "Standard grid layout for image galleries, typically represented by a 2d array." %}

### 2. Offset or “Brickwork” layouts

Some platforms use brick-like offsets to add visual variety. Each row or column becomes an independent unit as long as width limits are respected.

{% image "./src/images/image-tiling-ideas/offset-gallery.png", "Image gallery with offset" %}
{% caption "Image gallery with an offset between columns of images." %}

Simple to create and effective for stock photography, but less suitable where images share semantic relationships.

### 3. Photomosaic layouts (“Fake Mosaics”)

These layouts arrange thousands of tiny images to form a single large picture. They can be visually striking, and are certainly possible to create using my software. However, individual images tend to lose their identity as part of the greater picture.

{% image "./src/images/image-tiling-ideas/photomosaic.png", "Photomosaic image" %}
{% caption "Image credit: https://www.picturemosaics.com/blog/top-three-donts-photo-mosaic-design/" %}

Personally, I'm not a fan at all. It feels artificial, and has no place in archival work.

## Pythagorean tiling - a new option

Moving into uncommon, and dare-i-say-even-mathematical territory, we have the option of Pythagorean tiling. This is a geometric pattern created by alternating two square sizes in a checkerboard pattern. It's named for its relationship to the Pythagorean theorem, and is often used to construct visual proofs of the very same. [GeoGebra](https://www.geogebra.org/m/gtauzhrm) has a nice interactive viewer that visualizes this.

{% image "./src/images/image-tiling-ideas/pythagorean-tile.png", "Pythagorean tiling" %}
{% caption "Pythagorean tiling with squares of two sizes." %}


Pythagorean tiling offers several interesting differences to the traditional layout. Some notable advantages include:

* Disrupts the monotony of typical grids
* Highlights certain pieces while others can play supporting roles
* Works well especially in horizontal-scrolling galleries
* Easy to generate algorithmically without complex overhead
* Visual behavior remains predictable and easy to scan 

I'd like to enhance gallery-image to generate Pythagorean tiles eventually. Expect this functionality to be released in version 2 or 3 of my REST API. For now though, we keep on dreaming.

## Squaring the rectangle: A deeper mathematical approach

To explore more flexible and expressive layouts, we encounter a well-studied mathematical problem known as **squaring the rectangle**—subdividing a rectangle into a series of non-overlapping squares. This problem offers several appealing properties for image mosaic generation. 

### Perfect squaring

The most appealing problem to me is known as **Perfect Squaring** - an algorithm that ensures that every square has a unique size.

This approach produces visually compelling arrangements where no two regions are identical, creating a visually unique layout that well suited for promotional imagery.

{% image "./src/images/image-tiling-ideas/square-rectangle-1.png", "Perfect squaring" %}
{% caption "Squaring the rectangle with squares." %}


This could be used to great effect when combined with my image software.

Somewhat counterintuitively, the "Perfect squaring" algorithm need not be applied using squares. Any consistent aspect ratio can be used, allowing images with rectangular frames to be tiled in this manner as well. It's wonderful!

{% image "./src/images/image-tiling-ideas/square-rectangle-2.png", "Perfect rectangling" %}
{% caption "Squaring the rectangle with rectangles. Image credit: https://christophernoessel.medium.com/squared-rectangles-a-space-efficient-layout-for-ranked-graphics-de19bccb2a2d" %}

### A complex problem

Generating mathematically valid square-tilings is computationally complex. Fortunately, resources such as **squaring.net** provide catalogs of known squared rectangles, and their **Bouwkamp code** notation offers a standardized description format. While the problem of generating valid tilings is certainly interesting, my software will rely on perfect square tilings that already exist for now.

Even beyond this initial problem, applying these square tilings to images is nontrivial. Just to name a few problems:

- Programmatically interpreting Bouwkamp codes
- Translating Bouwkamp codes to image pixel coordinates
- Assembling a mosaic without collisions
- Preserving image orientation and original resolution    
- Upscaling and downscaling images across tile sizes
- Aligning image aspect ratios with tile shapes
- Mapping annotations with metadata to specific screen regions

Despite this complexity (or perhaps because of it?), this project is very appealing to me. As I continue refining `gallery-image`, I can't help but think of adding in this functionality. These techniques will push the boundaries of what digital galleries can look like—bringing mathematical elegance into practical, real-world design. 
## Conclusion: Wait a bit!

While there is no timeline for these features, eventually several of these novel layout designs will become available in `gallery-image`. I'm particularly excited about pythagorean tiling and bouwkamp codes. Stay tuned, and we'll see what happens in the next several major versions!
