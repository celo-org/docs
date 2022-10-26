---
title: Celo Sage Structure
description: Tutorial Structure to be followed for Celo Sage Tutorials
---

# 🌱 Structure for Celo Sage Tutorials

## Introduction

The Introduction heading **must** be H1: # Introduction

This section is for you to explain the context for this tutorial and why it matters, what we're going to build and learn in this tutorial.

- Explain this section like you're explaining it to 5-year-old (**[ELI5](https://www.dictionary.com/e/slang/eli5/)**)
- Explain everything in 5-6 lines maximum.

_For example:_

A lot of blockchain projects promise to build a new financial system,but few have thought about mainstream adoption as hard as Celo. With a mobile-first approach where a phone number is all you need to participate in the network, Celo makes cryptocurrency user-friendly and simplifies access to global financial services. Plus, it’s compatible with Ethereum!

## Prerequisites

The Prerequisites heading **must** be H1: # Prerequisites

This section is for you to explain any prior knowledge needed or any existing tutorials that need to be completed first, any tokens that are needed, mention them here.

_For example:_

- In this tutorial, we're going to build a Voting dApp on Celo so before we proceed further make sure to complete the first tutorial "Connect to Celo using hardhat".
- Complete the Example Tutorial, first.

## Requirements

The Requirements heading **must** be H1: # Requirements

**OPTIONAL :** Embed any video content in this section, if your tutorial has any.

Any technology that needs to be installed **prior** to starting the tutorial and that the tutorial will not cover (`Metamask`, `node`, `truffle`, etc). Do not list packages that will be installed during the tutorial.

_For example:_

- We'll need Metamask in this tutorial, install it from [HERE](https://metamask.io/).
- Make sure to have NodeJS 12.0.1+ version installed.

## Body of the Tutorial

- Please do not use "Body of the Tutorial" as a heading, use your own heading that is relevant to the material. "Getting started" is acceptable if you can't think of anything else 😉
- Add any text content necessary to guide readers through your tutorial, and **_remember to proofread your content_** for spelling and grammar before you submit your tutorial. [Grammarly](http://grammarly.com) is a good free program that can help you to avoid spelling and grammar problems.

Points to remember:

- Keep all sub-headings at H2**,** don't go into H3 or lower**:**
- Add only necessary comments in code blocks. **_Do not_** add # style comments to terminal input code blocks.
- Add all relevant code blocks:
- Markdown syntax for code blocks is three backticks at the beginning and the end of the code block. Also make sure that all code blocks have a newline before and after the backticks. _For example_:

````text
  ```js
  const testVariable = 'some string';
  someFunctionCall();
  ///```
````

- ALL code blocks **_must_** have a syntax highlighting type, use ```text if you are not sure.

- ` ```bash ` should _only_ be used for code blocks where you need to have # style comments. This must be done carefully because in many situations the # character will render as a markdown heading.

- Do not use `pre-formatted text` for emphasis - only use **bold** or _italic_ text for emphasis.
- Add Images or code blocks to reflect expected terminal output.

- Take an error-driven approach when writing your tutorial: Add common errors and steps to troubleshoot the errors, _for example:_

> **Not able to connect to the Celo Node, getting an error on executing `node connect.js`**

Let's check for some common causes:
First, make sure you have the `.env` file saved and it's in the correct format as given in the tutorial.

If you're getting an error message like `UnauthorizedError: {"message": "Invalid authentication credentials"}` then make sure to replace the `<API_KEY>` with your correct API key which you copied from the DataHub Dashboard.

Make sure to have the `.env` file saved in your project root folder.

Make sure `NODE_URL` in the `.env` file is correct.

>

## Conclusion

The Conclusion heading **must** be H1: # Conclusion

This section should summarize what was learned in the tutorial, reinforce key points and also congratulate the learner for completing the tutorial. Use a maximum of 5-6 lines.

## Next Steps

The Next Steps heading **must** be H1: # Next Steps

Use this section to explain what can be done next after this tutorial for continued learning.
Feel free to add recommended projects and articles here which are related to this tutorial.
If you're working on any other advanced tutorials, you can briefly mention them here.

## About the Author

The About the Author heading **must** be H1: # About the Author

Keep it short. One or two lines at most. You can include a link to your GitHub profile + Twitter profile.

## References

The References heading **must** be H1: # References

This section **_must_** be present if you have taken any help in writing this tutorial from other documents, GitHub repos and existing tutorials.

Credit sources by adding their name and a link to the document when possible.
