---
title: Celo Contributor Guidelines
description: Join a community of developers, designers, dreamers, and doers building prosperity for everyone.
---

# Contributors

Guidelines for submitting contributions to the Celo community.

---

import PageRef from '@components/PageRef'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Celo is open source and we welcome open participation. We strive to fulfill our [Community Tenets](https://celo.org/community) by being an open and inclusive community where everyone feels welcome and empowered to contribute. This also means following some ground rules and abiding by Celo’s [Code of Conduct](https://celo.org/code-of-conduct).

- [Raise an issue](https://github.com/celo-org/docs/issues/new) - fill in the requested information and paste your contribution.
- [Create a pull request](https://github.com/celo-org/docs) - Clone the repo and follow the guidelines below to submit your contribution.

:::tip

A list of active contributors can be found at [celo.org/about](https://celo.org/about#contributors)

:::

## How to Contribute

Our community includes a group of contributors that help develop, write, translate, and improve Celo. Anyone is welcome to join the community and contribute their skills to help empower other community members and grow the Celo ecosystem.

- [Code](/community/guidelines#%EF%B8%8F-code)
- [CIPs](/community/guidelines#-cips)
- [Docs](/community/guidelines#-docs)
- [Tutorials](/community/guidelines#-tutorials)
- [Translations](/community/guidelines#-translations)

## Contributor Guidelines

There are a few basic ground rules for contributing:

- PRs \(pull requests\) are preferred to issues, especially for small changes such as typos. Issues should be used for missing features and for broad-based changes.
- For on-going work, use your own side-branch and not the master branch.
- For non-trivial amounts of work, we encourage you to submit PRs regularly to solicit feedback.
- Please double check your work before submitting it. Submissions with typos, spelling, and grammatical errors may not be merged until fixed.
- Try to remain as objective and fact-based as possible.

## Submitting PRs

We encourage you to PR \(pull request\) your work regularly and often to solicit feedback and to ensure everyone has an idea of what you’re working on. If you’ve just started, we suggest creating a PR with “WIP” \(Work In Progress\) in the title and let us know when it’s ready to review in the comments.

## 🖥️ Code

Code Contributors are developers in the Celo community that contribute to the [Celo monorepo](https://github.com/celo-org/celo-monorepo) or the [core protocol code](https://github.com/celo-org/celo-blockchain). They help improve the protocol and infrastructure by fixing bugs and designing new features that help improve the Celo platform.

#### How to Get Started

Find an area that is of interest and you would like to help with. Look for issues that are tagged as "[good first issue](https://github.com/celo-org/celo-monorepo/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)", "[help wanted](https://github.com/celo-org/celo-monorepo/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)" and "[1 hour tasks](https://github.com/celo-org/celo-monorepo/issues?q=is%3Aopen+is%3Aissue+label%3A%221+hour+tasks%22)" to get started. If you’d like to dig deeper, feel free to look at other labels and TODO’s in code comments. If there’s an issue you’re interested in contributing to or taking over, assign yourself to it and add a comment with your plans to address and target timeline. If there’s already someone assigned to it, please check with them before adding yourself to the assignee list.

Tasks range from minor to major improvements. Based on your interests, skillset, and level of comfort with the code-base feel free to contribute where you see appropriate. Our only ask is that you follow the guidelines below to ensure a smooth and effective collaboration.

#### Please make sure your PR

- Requests the appropriate reviewers. When in doubt, consult the CODEOWNERS file for suggestions.
- Provides a comprehensive description of the problem addressed and changes made.
- Explains dependencies and backwards incompatible changes .
- Contains unit and end-to-end tests and a description of how these were run.
- Includes changes to relevant documentation.

If you are submitting an issue, please double check that there doesn’t already exist and issue for the work you have in mind.

#### Please make sure your issue

- Is created in the correct repository.
- Has a clear detailed title such that it can’t be confused with other Celo issues.
- Provides a comprehensive description of the current and expected behavior including, if relevant, links to external references and specific implementation guidelines.
- Is tagged with the relevant labels.
- Is assigned if you or someone else is already working on it.

## 🤝 CIPs

Celo’s Improvement Proposals \(CIPs\) describe standards for the Celo platform, including the core protocol specifications, SDK, and contract standards. A CIP is a design document that should provide background information, a rationale for the proposal, detailed solution including technical specifications, and, if any, a list of potential risks. The proposer is responsible for soliciting community feedback and for driving consensus.

#### Submitting CIPs

Draft all proposals following the template below and submit to the [CIPs repository](https://github.com/celo-org/celo-proposals) via a PR \(pull request\).

#### CIP template

- **Summary:** Describe your proposal in 280 characters or less.
- **Abstract**: Provide a short description of the technical issue being addressed.
- **Motivation:** Clearly explain why the proposed change should be made. It should layout the current Celo protocol shortcomings it addresses and why doing so is important.
- **Specification:** Define and explain in detail the technical requirements for new features and/or changes proposed.
- **Rationale**: Explain the reasoning behind your approach. It should cover alternative approaches considered, related work, and trade-offs made.
- **Implementation:** For all proposals going through the governance process, this section should reference the code implementing the proposed change. It’s recommended to get community feedback before writing any code.
- **Risks:** Highlight any risks and concerns that may affect consensus, proof-of-stake, governance, protocol economics, the stability protocol, security, and privacy.

## 📄 Docs

Technical writers support the Celo community by educating developers about Celo through engaging, informative, and insightful documentation.

[Watch the Video ↗️](https://www.youtube.com/watch?v=DaAenTNv668&feature=emb_title)

#### Edit an existing page

To edit an existing page in the documentation, create a fork of the repo, commit your edits and submit a PR.

- Go to the page in the docs
- Click **Edit this page** at the bottom of the page
- Edit the page directly on GitHub
- Describe the edit in the commit
- Select “Create a new branch and start a pull request”
- Describe changes in the Pull Request (PR)
- Select “joenyzio” as a reviewer
- Changes must be approved and pass all of the site build checks before being merged.

#### Add/remove pages

To add a new page to the documentation, create a fork, add the new pages and update the table of contents file to include your new pages in the appropriate location and submit a PR.

- Add or delete pages directly in Github
- Put new pages where you think makes the most sense, we can move them later
- Create a PR to have your changes added to the live version of the site
- Update the file called “sidebars.js” in the main folder
- This file contains the site layout that you see on the left side of the docs site
- Add or remove the appropriate files from the list

## 🎓 Tutorials

Write about your experience as a member of the Celo community, whether you're a CELO owner, developer, or a project founder. Your experience and perspective is valuable and can help others.

#### File naming

Creating a new post in the blog is straightforward. Create a new file in the [blog directory](https://github.com/celo-org/docs/tree/main/blog) in the documentation repository. Filenames follow the format of `YYYY-MM-DD-post-name.md`. For example, this post was written November 8th, 2021 so it has the filename `2021-11-08-contributing.md`.

#### Front Matter

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

#### Post summary

Pages can also include a `<!--truncate-->` tag that specifies what text will be shown along with the post title on the post list page. Any text above `<!--truncate-->` will appear as the post summary.

#### Adding static assets

If you would like to include images or other static assets in a post, you can create a folder following the naming convention described above (YYYY-MM-DD-post-name). The contents of the folder can include the images and the post (with filename index.md).

## 🌐 Translations

Translators support the community expanding Celo to non-English speaking communities by translating and sharing content in different languages.

#### How to Contribute

- Go to [https://celo.crowdin.com/](https://celo.crowdin.com/)
- Create an account
- Start translating!
- Submit questions with Crowdin Messages
- Translation request form

:::tip

For questions, comments, and discussions please use the [Celo Forum](https://forum.celo.org/) or [Discord](https://chat.celo.org/).

:::
