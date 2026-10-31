---
title: 'Introducing Forkcast: weather planning for long bike trips'
date: 2026-10-30
description: 'Forkcast, a vast.earth project, shows what the weather usually does along a bikepacking route, day by day, so you can plan a trip long before any forecast reaches it.'
---

Forkcast is a vast.earth project. It answers one question:

> If I set off on this route on this date, what weather will I ride into, day by day?

You can try it at [forkcast.vast.earth](https://forkcast.vast.earth).

## What it is about

You tell Forkcast about your trip:

- **the route:** draw it on the map, or import it as a GPX file;
- **the start date;**
- **how far you ride each day,** and at what average speed;
- **how often you rest,** for example ride five days, rest one.

Forkcast works out where you will be on each day of the trip and shows what the weather usually does there at that time of year: the day's high, the night's low, the chance of a rainy day, and how much daylight you have. A chart lays the whole trip out day by day:

![The Forkcast day chart for a 35-day trip in November: one bar per day, from the average low to the average high, coloured from green (cooler) to yellow (warmer), with a thin line through each bar from the coldest lows to the hottest highs of past years. Day 14, Thursday 12 November, is highlighted: 80 km, a low of 9 °C and a high of 18 °C, a 15% chance of rain and 9 h 53 min of daylight. Below, the chance of a rainy day for each day, falling from about 25% to under 10%.](../../../assets/images/news/forkcast-day-chart.png 'The day chart: one bar per day, from an average day’s low to its high. The thin line shows how far the lows and highs reached in past years.')

The map shows the same week across the whole region: the colours are the usual day highs, and the clouds and umbrellas mark how many rainy days a week to expect. So you can see where the warm, dry weather is, and move the route or the dates towards it. Point at your route, and Forkcast tells you which day of the trip you would be there and what the weather usually is on that date:

![The Forkcast map of north-east Spain and south-west France in mid-November, coloured by the usual day high, from green inland to orange along the Mediterranean coast, with cloud and umbrella icons over the Pyrenees and the Atlantic side for rainy days. A route runs down the coast from the French border past Barcelona to Valencia, with a circle at each night's stop. A panel for a point on the route reads: 1,282 km from the start, day 20, Wednesday 18 November; low 10 °C (6 to 14 °C), high 18 °C (15 to 22 °C), a 10% chance of a rainy day, 8.4 mm a day when it rains, 3 h 49 min riding, 9 h 52 min of daylight, at 2 m altitude.](../../../assets/images/news/forkcast-map.png 'Pointing at the route: day 20 of the trip, on the coast south of Barcelona, 1,282 km from the start.')

You don't have to draw your own route: as a convenience, Forkcast comes with all 17 [EuroVelo](https://en.eurovelo.com) routes built in. EuroVelo is the network of long-distance cycle routes across Europe, coordinated by the [European Cyclists' Federation](https://ecf.com): from the North Cape to the Mediterranean and from the Atlantic to the Black Sea, over 90,000 km once complete. Pick one, and you can plan a trip on it straight away.

## Why

The everyday weather forecast, the one on the TV news, in a weather app or on a website, reaches about ten days ahead at most. But a long bike trip is planned months ahead: when to take time off, which direction to ride, which sleeping bag to pack. For that, what matters is what is typical, and how far it can swing. A trip also crosses hundreds of kilometres over several weeks, and the weather changes along the way.

Forkcast is built on 15 years of climate records: [ERA5-Land](https://cds.climate.copernicus.eu/datasets/reanalysis-era5-land) from the [Copernicus Climate Change Service](https://climate.copernicus.eu), 2011 to 2025, on a grid of about 25 km. So it is not a forecast:

> It tells you what is typical, not what a given year will bring.

The [help page](https://forkcast.vast.earth/help/data/) explains where every number comes from and how far to trust it.

## Who it is for

- **Bikepackers and cycle tourists** planning a trip of a few days to a few months: when to leave, which way round to ride, or whether a route is still a good idea in November.
- **Anyone curious** what a place is usually like in a given week.

## Why we made it

Planning our own trips, we kept piecing the weather together by hand: a forecast that didn't reach far enough, and guesses for everything beyond it. Forkcast puts it all on one map, along the route, on the day you'll be there.

It is also what vast.earth is for: something useful, free and open.

- **No accounts, no ads, no tracking.**
- **Your plan lives in the link,** so you can bookmark it or send it to whoever you ride with.
- **Nothing about you or your trip leaves your browser.**
- **The code is [open source on GitHub](https://github.com/vast-ch/forkcast).**

Questions, ideas or a bug to report? [Open an issue](https://github.com/vast-ch/forkcast/issues/new), or come and talk to us on [Discord](https://discord.gg/ZjhUHZCeNr).
