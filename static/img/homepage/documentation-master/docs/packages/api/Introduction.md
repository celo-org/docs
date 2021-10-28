---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /api
---

<a href="https://github.com/agile-ts/agile">
  <img src="https://img.shields.io/github/license/agile-ts/agile.svg?label=license&style=flat&colorA=293140&colorB=4a4872" alt="GitHub License"/></a>
<a href="https://npm.im/@agile-ts/api">
  <img src="https://img.shields.io/npm/v/@agile-ts/api.svg?label=npm&style=flat&colorA=293140&colorB=4a4872" alt="npm version"/></a>
<a href="https://npm.im/@agile-ts/api">
  <img src="https://img.shields.io/bundlephobia/min/@agile-ts/api.svg?label=minified%20size&style=flat&colorA=293140&colorB=4a4872" alt="npm minified size"/></a>
<a href="https://npm.im/@agile-ts/api">
  <img src="https://img.shields.io/npm/dt/@agile-ts/api.svg?label=downloads&style=flat&colorA=293140&colorB=4a4872" alt="npm total downloads"/></a>

<br />
<br />

:::warning

WIP Package!

:::

> Promise based HTTP request API

## ❓ `api` 

The `api` package is a Promise based HTTP/s request API, with a simple syntax.

### ⏰ Short Example
```ts
// Let't create our API
const api = new API({
  baseURL: 'https://myapp.com', // Base Route to the Host
  timeout: 10000, // After which amount of time a request times out
  options: { credentials: 'include' } // Http/s Request Options from type RequestInit
});

// Now we can create our first Request to 'https://myapp.com/hello'
const response = await api.get('/hello');
console.log(response);
/* 
  {
      data: {hello: "Jeff"}; // Response Data
      timedout: false; // If Request has timedout
      status: 200; // Response Status Code
      raw: Response; // Raw Response from type Response
      type: "application/json"; // Response Type
  }
*/
```
