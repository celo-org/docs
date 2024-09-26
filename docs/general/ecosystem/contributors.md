---
title: Open Source Contribution on Celo
description: How to contribute to the Celo ecosystem as a member of the community.
---
import ColoredText from '/src/components/ColoredText';

# Code Contributors

How to contribute to open source projects and further the growth of the Celo ecosystem.

---

## How to Contribute

Contributing to the Celo ecosystem through open-source projects is a valuable way to support public goods and connect with the community. Whether you're new to open-source or an experienced contributor, the guidelines below will help you get started.

:::tip
For quick questions, check the docs or create a ticket in the [Celo Discord](https://discord.com/invite/celo). Please avoid filing an issue on GitHub just to ask a question; using the resources above will provide faster responses.
:::

### Prerequisites

To contribute to Celo, the following accounts are necessary:

- <ColoredText>[GitHub:](https://github.com/celo-org)</ColoredText> Required for raising issues, contributing code, or editing documentation.
- <ColoredText>[Discord:](https://discord.com/invite/celo)</ColoredText> Required for engaging with the Celo community.

## Repositories to Get Started

Browse the code, raise an issue, or contribute a pull request.

- [Monorepo GitHub Page](https://github.com/celo-org/celo-monorepo)
- [Celo Client GitHub Page](https://github.com/celo-org/celo-blockchain)
- [Celo Developers Page](https://celo.org/developers)

Look for issues that are taged as "[good first issue](https://github.com/celo-org/celo-monorepo/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)", "[help wanted](https://github.com/celo-org/celo-monorepo/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)", or "[1 hour tasks](https://github.com/celo-org/celo-monorepo/issues?q=is%3Aopen+is%3Aissue+label%3A%221+hour+tasks%22)". These labels will help you find appropriate starting points. If you want to dive deeper, explore other labels and TODOs in the code.

#### To work on an issue:

1. Assign yourself to the issue.
2. Add a comment outlining your plan and timeline.
3. If someone is already assigned, check with them before assigning yourself.
4. Ensure no duplicate issues exist for the work you're planning.

### Submitting Issues

If you're interested in creating a new issue, first explore existing projects and ensure that the issue doesn't already exist. When submitting a new issue, follow these guidelines:

1. Ensure the issue is placed in the correct repository.
2. Provide a clear and specific title.
3. Include a comprehensive description outlining the current and expected behavior.
4. Add relevant labels to categorize the issue.

Tasks range from minor to major improvements. Based on your interests, skillset, and level of comfort with the code-base feel free to contribute where you see appropriate. Our only ask is that you follow the guidelines below to ensure a smooth and effective collaboration. 

### Contribution Workflow

Celo uses a standard "contributor workflow" where changes are made through pull requests (PRs). This workflow enables peer review, easy testing, and social collaboration.

Following these guidelines will help ensure that your pull request (PR) gets approved. Each protocol may have its own specific guidelines, so review them before contributing. Celo-specific contribution guidelines can be found <ColoredText>[here](./guides//guidelines.md)</ColoredText>. 

#### To contribute:

1. <ColoredText>Fork the repository</ColoredText>. Make sure you also [add an upstream](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) to be able to update your fork.
2. <ColoredText>Clone your fork</ColoredText> to your computer.
3. <ColoredText>Create a topic branch</ColoredText> and name it appropriately. Starting the branch name with the issue number is a good practice and a reminder to fix only one issue in a Pull-Request (PR).
4. <ColoredText>Make your changes</ColoredText> adhering to the coding conventions described below.  In general a commit serves a single purpose and diffs should be easily comprehensible. For this reason do not mix any formatting fixes or code moves with actual code changes.
5. <ColoredText>Commit your changes</ColoredText>  see [How to Write a Git Commit Message](https://cbea.ms/git-commit/) article by Chris Beams.
6. <ColoredText>Test your changes locally</ColoredText> before pushing to ensure that what you are proposing is not breaking another part of the software. Check the repository for the needed tests. Your PR should contain unit and end-to-end tests and a description of how these were run.
7. <ColoredText> Include changes to relevant documentation.</ColoredText>. You should update the documentation based on your changes. 
8. <ColoredText>Push your changes</ColoredText> to your remote fork (usually labeled as  origin).
9. <ColoredText>Create a pull-request (PR)</ColoredText> on the repository. If it's not ready to review, make it a <ColoredText>`Draft` PR</ColoredText>. If the PR addresses an existing issue, include the issue number in the PR title in square brackets (for example,  [#2374]). 
10. Provide a <ColoredText>comprehensive description </ColoredText> of the problem addressed and changes made. Explains dependencies and backwards incompatible changes .
11. <ColoredText>Add labels</ColoredText> to identify the type of your PR.  For example, if your PR fixes a bug, add the "bug" label.
12. If the PR address an existing issue, comment in the issue with the PR number.
13. <ColoredText>Ensure your changes are reviewed</ColoredText>. Request the appropriate reviewers. When in doubt, consult the CODEOWNERS file for suggestions. Let the project you are contributing to know in the issue comments on GitHub or using the Discord sever chat channels that your PR is ready for review. If you are a maintainer, you can choose reviewers, otherwise this will be done by one of the maintainers.
14. <ColoredText>Make any required changes</ColoredText> on your contribution from the reviewers feedback.  Make the changes, commit to your branch, and push to your remote fork.
15. <ColoredText>When your PR is approved, validated</ColoredText>, all tests pass and your branch has no conflicts, it can be merged. Again, this action needs to be done by a maintainer - usually the same person who approves will also merge it.


You contributed to Celo! Congratulations and Thanks!

:::tip

If you've commented on an existing issue and have been waiting for a reply, or want to message us for any other reason, please use the [Celo Forum](https://forum.celo.org/) or [Discord](https://chat.celo.org/).

:::

