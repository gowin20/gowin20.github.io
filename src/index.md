---
title: home
layout: root-page.njk
---

💻 Web engineer 🗺️ GIS specialist 🖌️ Digital gallery manager \🖼️

My name is Gwen.

This domain hosts my blog and assorted web projects. For more photos of me, see [Instagram](https://www.instagram.com/gowinnnn/) 🌇.

{% from "components/image-slideshow.njk" import imageCarousel %}
{% set images = [
    'uc-2025.jpg',
    'devsummit-2024.png',
    'go-graduation-stand.jpg'
] %}
{{ imageCarousel('/images/frontpage/', images) }}

{% from "name.njk" import myName %}

# About me

Hi! I'm Gwen. I'm currently employed with Esri building [technical documentation](https://developers.arcgis.com/documentation/) for ArcGIS products.

I'm passionate about:

* 💻 Building websites
* 🖼️ Creating interactive art
* 🗺️ Cartography
* 🧑‍🤝‍🧑 Community

# Contact

- Discord: `@gowin`
- Email: `gbo.owen@gmail.com`