---
title: Contributing to the Blog
description: How to contribute to the blog
slug: blog-contributions
authors:
  - name: Josh Crites
    title: Developer Relations, cLabs
    url: https://github.com/critesjosh
    image_url: https://github.com/critesjosh.png
tags: [contribute]
image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: false
---

Contribute to Celo.

## Open Source

Celo is an open source project and without community contributions from people like you Celo wouldn't exist. We welcome contributions to our [codebase](https://github.com/celo-org), [documentation](https://github.com/celo-org/docs), [translations](https://celo.crowdin.com/) and [blog](https://github.com/celo-org/docs/blog).

It can be difficult to find ways to meaningfully contribute to a new project, but writing a guest post on our blog is a great way to get started!

Write about your experience as a member of the Celo community, whether you're a CELO owner or a project founder. Your experience and perspective is valuable and can help others.

<!--truncate-->

## Blog Ideas

Here are some topics that you could write about:

- Document your experience onboarding to Celo
- Share how Celo has impacted your life
- Using DeFi on Celo
- Minting tokens on Celo
- How to build a product or service on Celo
- How to debug transactions using the Truffle debugger
- Getting events using the Graph protocol
- How to contribute to specific Celo packages
- Project spotlights (your own project or researching another)

## How to Contribute

### File naming

Creating a new post in the blog is straightforward. Create a new file in the [blog directory](https://github.com/celo-org/docs/tree/main/blog) in the documentation repository. Filenames follow the format of `YYYY-MM-DD-post-name.md`. For example, this post was written November 8th, 2021 so it has the filename `2021-11-08-contributing.md`.

### Front Matter

Posts are written in [Markdown](https://www.markdownguide.org/). Posts include front matter. Front matter is file metadata at the top of the file that provides more information about the post. The front matter for this post looks like this:

```md
---
title: Contributing to the Blog
description: How to contribute to the blog
slug: blog-contributions
authors:
  - name: Josh Crites
    title: Developer Relations, cLabs
    url: https://github.com/critesjosh
    image_url: https://github.com/critesjosh.png
tags: [contribute]
image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: false
---
```

### Post summary

Pages can also include a `<!--truncate-->` tag that specifies what text will be shown along with the post title on the post list page. Any text above `<!--truncate-->` will appear as the post summary.

### Adding static assets

If you would like to include images or other static assets in a post, you can create a folder following the naming convention described above (YYYY-MM-DD-post-name). The contents of the folder can include the images and the post (with filename index.md).

For examples of how other posts do this and to see how other features are implemented (like [live coding](./2021-11-15-code-playground.md)), check out other posts source code in the [blog directory on GitHub](https://github.com/celo-org/docs/tree/main/blog).

## Reach out

If you have any questions, feel free to join our Discord server at [https://chat.celo.org](https://chat.celo.org) and feel free to reach out to me. My username is joshc#0001.
