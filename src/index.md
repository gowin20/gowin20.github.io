---
title: home
layout: root-page.njk
---

My name is Gwen.

Web engineer 💻 GIS specialist 🗺️ Digital gallery manager 🖌️🖼️

This domain hosts my blog and assorted web projects. For more photos of me, see [Instagram](https://www.instagram.com/gowinnnn/) 🌇.

{% from "components/image-slideshow.njk" import imageCarousel %}
{% set images = [
    'uc-2025.jpg',
    'devsummit-2024.png',
    'go-graduation-stand.jpg'
] %}
{{ imageCarousel('/images/frontpage/', images) }}

# About me

Hi! I'm Gwen. I'm currently employed with Esri building [technical documentation](https://developers.arcgis.com/documentation/) for ArcGIS products.

I'm passionate about:

* 💻 Building websites
* ☝️ Creating interactive art
* 🗺️ Designing maps
* 🧑‍🤝‍🧑 Fostering community

# Contact

- Discord: `@gowin`
- Email: `gbo.owen@gmail.com`