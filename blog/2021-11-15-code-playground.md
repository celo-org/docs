---
title: Intro to the Code Playground
description: Playing with Code
slug: code-playground
authors:
  - name: Josh Crites
    title: Developer Relations, cLabs
    url: https://github.com/critesjosh
    image_url: https://github.com/critesjosh.png
tags: [code playground]
image: https://dl.airtable.com/.attachmentThumbnails/a7e530eb72ac8f30f37c0a3447ef0e7d/72e944da
hide_table_of_contents: false
---

This post provides an introduction to the live code editor that is included as a feature in this blog. It allows you to see working examples of things like connecting to the Celo network with Metamask and initiating user transactions with the SDK.

If you have any suggestions for examples that you'd like to see, or if you'd like to create one yourself and have it included in the blog, please reach out to me at [josh@clabs.co](mailto:josh@clabs.co) or on Discord at joshc#0001.

## Live coding

This is a live, editable code block. You can update the code right on this page and it will be compiled and executed as you updated it. This is a powerful feature for learning and testing code in real time--you get immediate feedback about what works and what doesn't.

:::note

The code is rendered using [React Live](https://github.com/FormidableLabs/react-live). This means that the code is rendered as a React component, which gives you access to React features like hooks, but also limits what is possible.

:::

<!--truncate-->
### Hello World

Try it out:

```jsx live
function helloWorld(){

  return <p>Hello World!</p>

}
```

Edit the code to return some new text. Try rendering different HTML.

You can see that the result is a simple rendering of the return statement, which is just HTML. The component must include a return statement, although you can return an empty string. You can also log stuff to your browser console from the environment.

### Logging

See this example that returns an empty string and logs the browser `Window` object.

```jsx live
function logger(){
  console.log(window)
  return ""
}
```

Cool!

This is just a small preview into what code sharing and learning experiences we can build with this tool. Check out this post about [Connecting to Metamask](2021-11-16-connect-to-metamask.md) to learn more.
