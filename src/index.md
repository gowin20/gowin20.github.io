---
title: Init
layout: root-page.njk
templateEngineOverride: njk,md
---

<div class="index-content">

{{ quotes | random }}

</div>

<div class="index-content">

# Posts

</div>

{% include "post-list.njk" %}