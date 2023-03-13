---
title: Optimizing Java's GC for mid-sized minecraft servers
tags: minecraft, linux
category: sysadmin
description: my experience hosting an ubuntu linux server for the Enigma SMP
image: java-gc/jstat-heap.png
date: 2022-12-06
---

I currently host a dedicated Minecraft server that can support 10-15 concurrent players. To accomplish this, I had to learn in detail about the Java Garbage Collector. What follows are my tips for how to optimize Java's garbage collection for Minecraft servers.

### My flags

```
TODO paste my flags
```

### Resources

[Fundamentals of Java GC (video)](https://www.youtube.com/watch?v=UnaNQgzw4zY)

[Etil minecraft flags](https://github.com/etil2jz/etil-minecraft-flags)

[Aikar's Flags (papermc)](https://docs.papermc.io/paper/aikars-flags)