---
title: home
layout: root-page.njk
---

This domain hosts my blog and assorted web projects. For more photos of me, see [Instagram](https://www.instagram.com/gowinnnn/) 🌇.

{% from "components/image-slideshow.njk" import imageCarousel %}
{% set images = [
'gwen-rift.jpg',
'gwen-neonjacket.jpg',
'rave-step.png',
'go-graduation-stand.jpg',
'gwen-firstwig.jpg',
'gwen-preppy.jpg',
'desert-profile.jpg'
]%}
{{ imageCarousel('/images/frontpage/',images) }}

{% from "name.njk" import myName %}

# About me

Hiiiii! My name is {{myName}} Owen. I'm a creative who enjoys writing, programming, and more. I use any pronouns; ask me for my preferences.

At any given point you may happen upon me doing the following:
* developing web apps
* writing technical documentation
* drawing on post-it notes
* creating maps
* cultivating virtual community
* doing my nails and makeup
* supporting queer artists


# Socials