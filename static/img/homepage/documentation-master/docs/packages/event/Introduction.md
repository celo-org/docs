---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /event
---

<a href="https://github.com/agile-ts/agile">
  <img src="https://img.shields.io/github/license/agile-ts/agile.svg?label=license&style=flat&colorA=293140&colorB=4a4872" alt="GitHub License"/></a>
<a href="https://npm.im/@agile-ts/event">
  <img src="https://img.shields.io/npm/v/@agile-ts/event.svg?label=npm&style=flat&colorA=293140&colorB=4a4872" alt="npm version"/></a>
<a href="https://npm.im/@agile-ts/event">
  <img src="https://img.shields.io/bundlephobia/min/@agile-ts/event.svg?label=minified%20size&style=flat&colorA=293140&colorB=4a4872" alt="npm minified size"/></a>
<a href="https://npm.im/@agile-ts/event">
  <img src="https://img.shields.io/npm/dt/@agile-ts/event.svg?label=downloads&style=flat&colorA=293140&colorB=4a4872" alt="npm total downloads"/></a>

<br />
<br />

:::warning

WIP Package currently only supporting React!

:::

> Handy package for emitting UI updates

Events are handy for emitting UI updates and passing data with them.
```ts
const MY_EVENT = new Event(App);
MY_EVENT.on((data) => {console.log("hello there " + data.name)}); // Print 'hello there jeff' if Event gets triggered
MY_EVENT.trigger({name: "jeff"}); // Trigger Event
```
