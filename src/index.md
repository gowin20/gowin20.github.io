---
title: home
hideTitle: true
layout: root-page.njk
---

This domain hosts my blog and assorted web projects. For my photography, see [Instagram]() 🌇.

{% from "components/image-slideshow.njk" import imageCarousel %}
{% set images = [
'gwen-neonjacket.jpg',
'rave-step.png',
'gwen-firstwig.jpg',
'gwen-preppy.jpg',
'rave-kick.jpg',
'go-graduation-stand.jpg',
'gwen-crode.jpg',
'desert-profile.jpg'
]%}
{{ imageCarousel('/images/frontpage/',images) }}

{% from "name.njk" import myName %}

# About me

Hiiiii! My name is {{myName}} Owen. I'm a creative who enjoys writing, programming, and more. I use any pronouns but prefer "she".

At any given point you may happen upon me doing the following:
* developing web apps
* writing technical documentation
* drawing on post-it notes
* creating maps
* cultivating virtual community
* doing my nails and makeup
* supporting queer artists


# Socials