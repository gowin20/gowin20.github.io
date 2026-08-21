---
title: home
layout: root-page.njk
---

# About me

Hi, I'm George Owen - also known as Gwen. I'm a software engineer and developer evangelist at Esri. I build ArcGIS products and I talk about them.

I'm passionate about:

* 🌱 Open source ecosystems
* 💻 Interactive web apps
* 🔒 Security and data privacy
* 🗺️ Maps that power the world
* 🖼️ Art preservation

This domain hosts my blog, resume, and assorted web projects 🌇.

{% from "components/image-slideshow.njk" import imageCarousel %}
{% set images = [
    '3.24.25-portraits-13-crop.jpg',
    'uc-2025.jpg',
    'go-graduation-stand.jpg',
    'san-diego-nonbinary-flag.jpg'
] %}
{{ imageCarousel('/images/frontpage/', images) }}

# What I do

I build technical documentation and open source plugins at Esri. Projects of note:

* [MapLibre ArcGIS](https://github.com/Esri/maplibre-arcgis)
* [Security and authentication guide](https://developers.arcgis.com/documentation/security-and-authentication/)
* [CesiumJS x ArcGIS guide](https://developers.arcgis.com/cesiumjs/)
* [OpenLayers x ArcGIS guide](https://developers.arcgis.com/openlayers/)
* [Esri Leaflet guide](https://developers.arcgis.com/esri-leaflet/)

In my free time I'm invested in art preservation:

* [The Wall](https://wall.gowen.dev/)
* [Galleria services](https://galleria.gowen.dev/)

See my [portfolio](/projects) for more.


# Contact

- Discord: `@gowin`
- Email: `gbo.owen@gmail.com`