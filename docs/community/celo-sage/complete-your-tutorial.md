---
title: How to Complete your Tutorial
description: Step-by-step instructions to submit your Celo Sage Tutorial
---

# 🌱 How to Complete your Tutorial

Step-by-step instructions to complete your Celo Sage tutorial.

---

## Getting Started

After submitting your tutorial, it will be reviewed by a team member from the Celo Foundation. After review your tutorial submission will either be accepted, rejected, or you will receive feedback on how to improve the idea.

- **Accepted**: Move forward with instructions below on how to complete your tutorial.
- **Rejected**: This idea does not meet the legel standards or best practices for a Celo Sage tutorial.
- **Improve**: The idea may need some additional support before getting started. Please address the feedback you receive and work with the team until your idea is **Accepted**.

:::tip

Check out the [Contribution Guidelines](contribution-guidelines) and [Tutorial Structure](tutorial-structure) for best practices while completing your tutorial.

:::

## Tutorial Creation Process

- Move the [Trello Card](https://trello.com/b/IVRaj2QO/celo-sage) for your tutorial from **Todo** to **In progress**
- Follow the link in the Trello card to access the Google Doc where you’ll write your tutorial content
- Once you have completed your tutorial, move your Trello Card from **In progress** to **Review** and please wait as we review your tutorial and address any comments from your reviewer.
- Once approved, we will move your Trello Card into the **Approved** column. From here you can convert your tutorial to markdown and **submit a PR** to the docs repo.

:::tip

After your PR is approved, please follow the instructions detailed in the email titled Celo Sage Payments and KYC to ensure you receive payment for your contribution.

:::

## How to **Create a PR**

- Fork the [https://github.com/celo-org/docs](https://github.com/celo-org/docs) repo.
- Create a branch name with syntax - `sage/<tutorial-title>`
- Create a PR from your branch to `main` branch. Make sure to add `?template=celo-sage-template` at the end of the PR URL to get the template for the PR.

Example - `<https://github.com/celo-org/docs/compare/main>...<branchname>?template=celo-sage-template`

:::tip

If you have issue getting the PR Template, you can get the template from here - [Celo Sage PR Template](https://gist.github.com/viral-sangani/ac48d47da93d808b2b59bd415d11ae09).

:::

## Best Practices

- Before creating a PR, make sure to pull the code from `main` branch - **`git pull upstream main`.**
- Add your article in the `src/data-tutorials/users.tsx` file.
- Make sure to add the `celosage` tag in your article's frontmatter and `src/data-tutorials/users.tsx` file
- Don't use any `#` tag in your article. Please use `##` for titles, `###` for subtitles.
- Don't use `**` or `***` in your titles or subtitles. Use `##` or `###` instead. `##` and `###` will automatically bold the text.
- Add a header image just after frontmatter. The image should look something like this - `![header](../src/data-tutorials/showcase/<beginner/intermediate/advance>/<image-name>.png)`
- Please run the prettier in your markdown file before creating a PR. You can use the prettier extension in VS Code or you can use the prettier online tool - [Prettier Online](https://prettier.io/playground/).
- To use prettier in VSCode, you can press `Cmd/Ctrl + shift + p` and search for `Format Document with` and select `Prettier - Code formatter`.
- If you have images in your articles, then create a folder in `blogs/` directory, and add the markdkown file and images in `images/` folder.
- If the paragraph is too big, then please break it into multiple lines. It will help in reviewing the PR.
- If you want to be nested lists, follow [this](https://linuxhint.com/markdown-nested-lists/) article.
- Don't add the title of your article to your blog, as it will be added automatically.
- Before creating a PR, make sure your code is well formatted and there are no errors in the console.
- Make sure to add a header image of your article in `src/data-tutorials/users.tsx`. You can get the header image from your Trello card.
