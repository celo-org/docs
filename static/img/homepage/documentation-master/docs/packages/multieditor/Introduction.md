---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /multieditor
---

<a href="https://github.com/agile-ts/agile">
  <img src="https://img.shields.io/github/license/agile-ts/agile.svg?label=license&style=flat&colorA=293140&colorB=4a4872" alt="GitHub License"/></a>
<a href="https://npm.im/@agile-ts/multieditor">
  <img src="https://img.shields.io/npm/v/@agile-ts/multieditor.svg?label=npm&style=flat&colorA=293140&colorB=4a4872" alt="npm version"/></a>
<a href="https://npm.im/@agile-ts/multieditor">
  <img src="https://img.shields.io/bundlephobia/min/@agile-ts/multieditor.svg?label=minified%20size&style=flat&colorA=293140&colorB=4a4872" alt="npm minified size"/></a>
<a href="https://npm.im/@agile-ts/multieditor">
  <img src="https://img.shields.io/npm/dt/@agile-ts/multieditor.svg?label=downloads&style=flat&colorA=293140&colorB=4a4872" alt="npm total downloads"/></a>

<br />
<br />

:::warning

WIP Package!

:::

> Simple Form Manager

## ❓ `multieditor` 

The `multieditor` package is an extension for AgileTs, that makes creating reliable forms easy.

### ⏰ Short Example
```ts
// Create Multieditior 
const multiEditor = createMultieditor(editor => ({
    initialData: {
        id: "myId", // Initial Id
        email: undefined, // Inital Email
        name: undefined, // Inital Name
    },
    onSubmit: async (data) => {
        console.log("Submitted ", data);  // <---------
    }, //                                           |
    // Properties that are always passed to the 'onSubmit()' method
    fixedProperties: ["id"],
    validationSchema: {
        // Validation with inbuilt tree shakable validation methods
        email: agileResolver(isString, isEmail, isRequired),
        // Validation with external validatiors like Yup
        name: yupResolver(Yup.string().required().max(10).min(2)),
    }
}));

// Use the Multieditor in any UI-Form
// ..
<label>First Name:</label>
<input
onChange={(e) => signUpEditor.setValue("firstName", e.target.value)}
defaultValue={signUpEditor.getItemInitialValue("firstName")}
/>
<ErrorMessage error={signUpEditor.getStatus("firstName")?.message} />
// ..

// Submit Multieditor and see what the 'onSubmit()' method will log
multiEditor.submit();
// Submited {
//   id: "myId",
//   name: "Jeff",
//   email: "test@test.com"
// }
```

### ⛳️ Sandbox
Test the Multieditor yourself. It's only one click away. Just select your preferred Framework below.
- [React](https://codesandbox.io/s/multieditor-yxt4x)
- Vue (coming soon)

