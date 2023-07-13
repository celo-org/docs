---
title: Celo Sage Contribution Guidelines
description: Contribution Guidelines to be followed while creating content for Celo Sage Program.
---

# 🌱 Contribution Guidelines

## **General tips**

- **Before making the PR, run the code by yourself first** to avoid any obvious errors and to make sure it works as expected.
- **Provide** **pictures or screenshots** to illustrate complicated processes where needed.
- **Do not copy and paste existing content**. Plagiarism is a serious issue and will not be tolerated. If the tutorial is inspired by some existing content (for example forking an Ethereum tutorial to convert it for use on Avalanche), reference it and link to it.
- **Add potential errors and troubleshooting.** Of course, the tutorial shouldn't list all possible errors but make an effort to catch the important or most common ones.
- **Include any walkthrough videos or video content** in the PR by uploading it to Google Drive if needed.
- **Display sample outputs** to help learners know what to expect, in the form of Terminal snippets or screenshots. Trim long outputs.
- **Take an error-driven approach** where you bump into errors on purpose to teach learners how to debug them. For example, if you need to fund an account to be able to deploy a contract, first try and deploy without funding, observe the error that is returned, then fix the error (by funding the account) and try again.
- **Funding of accounts from faucets needs to be explained clearly** as to which account is being funded, from where and why. Do not assume learners can accomplish this on their own!

## How to **structure your tutorial**

- The **Title** should be direct and clear, summarizing the tutorial's goal. Do not add the tutorial title as a heading inside the document, use the markdown document filename. _For example_: If your tutorial was titled "Query Celo data with The Graph", the filename should be `query-celo-data-with-the-graph.md`
- Include an **Introduction** section explaining _why_ this tutorial matters and what the context of the tutorial is. Don't assume that it is obvious.
- Include a **Prerequisites** section explaining any _prior knowledge_ required or any existing tutorials that need to be completed first, any tokens that are needed, etc.
- Include a **Requirements** section explaining any _technology that needs to be installed_ **prior** to starting the tutorial and that the tutorial will not cover such as Metamask, Node.js, Truffle, HardHat, etc. Do not list packages that will be installed during the tutorial.
- Use **subheadings** (H2: ##) to break down your explanations within the body of the tutorial. Keep the Table of Contents in mind when using subheadings, and try to keep them on point.
- If the content below a subheading is short (for example, only a single paragraph and a code block), consider using bold text instead of a subheading.
- Include a **Conclusion** section that summarizes what was learned, reinforces key points and also congratulates the learner for completing the tutorial.
- Include a **What's Next** section pointing to good follow-up tutorials or other resources (projects, articles, etc.)
- Include an **About The** **Author** section at the end.
- A **References** section **must** be present if you have taken any help in writing this tutorial from other documents, GitHub repos and other tutorials.
