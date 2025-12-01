---
title: Optimizing Java's GC for mid-sized minecraft servers
tags: 
    - minecraft
    - linux
    - sysadmin
description: my experience hosting an ubuntu linux server for the Enigma SMP
image: java-gc/jstat-heap.png
date: 2022-12-06
---

I currently host a dedicated Minecraft server that can support 10-15 concurrent players. To accomplish this, I had to learn in detail about the Java Garbage Collector. What follows are my tips for how to optimize Java's garbage collection for Minecraft servers.

### My flags

```

java -Xms$MAXRAM -Xmx$MINRAM -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=40 -XX:G1MaxNewSizePercent=50 -XX:G1HeapRegionSize=16M -XX:G1ReservePercent=15 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=20 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -jar $JAR

```

### Resources

[Tuning Java GC for minecraft](https://mcflags.emc.gs)

[Fundamentals of Java GC (video)](https://www.youtube.com/watch?v=UnaNQgzw4zY)

[Etil minecraft flags](https://github.com/etil2jz/etil-minecraft-flags)

[Aikar's Flags (papermc)](https://docs.papermc.io/paper/aikars-flags)


For large servers, I reccommend checking out [Folia](https://github.com/PaperMC/Folia), the new project by PaperMC. It groups server chunks by region to allow multithreading.