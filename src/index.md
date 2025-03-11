---
title: home
layout: root-page.njk
---

My name is George Owen, also known as "Gwen".

This domain hosts my blog and assorted web projects. For more photos of me, see [Instagram](https://www.instagram.com/gowinnnn/) 🌇.

{% from "components/image-slideshow.njk" import imageCarousel %}
{% set images = [
'gwen-rift.jpg',
'devsummit-2024.png',
'go-graduation-stand.jpg',
'rave-step.png',
'rave-420.jpg',
'hike-friends.jpg'
]%}
{{ imageCarousel('/images/frontpage/',images) }}

{% from "name.njk" import myName %}

# About me

Hi! I'm Gwen. I'm a creative person who enjoys writing, programming, design, music, etc. I'm currently employed with Esri building [technical documentation](https://developers.arcgis.com/documentation/) for ArcGIS products.

I use any pronouns; ask me for my preferences.

Some things I enjoy include:

* designing websites and apps
* creating interactive art
* listening to hyperpop and EDM
* being in nature
* learning about technical things

If you want to talk then HMU on Discord, it's `@gowin`

# Socials