# Celo Documentation

Official documentation for Celo, built with [Mintlify](https://mintlify.com).

## 🔍 Documentation Validation

We have automated checks for errors and broken links that run on every push and pull request.

### Quick Validation

Before committing, run local validation:

```bash
# Run all validation checks
./scripts/validate-docs.sh

# Check for broken links using Mintlify CLI
mint broken-links
```

### CI/CD Workflows

- ✅ **Broken Links Check** - Automatically scans for broken internal/external links
- ✅ **Structure Validation** - Validates docs.json syntax and structure
- ✅ **MDX File Verification** - Ensures all referenced files exist
- ✅ **Syntax Checking** - Detects common MDX/JSX syntax errors
- ✅ **PR Comments** - Automatically comments on PRs with validation results

See [DOCS_VALIDATION.md](./DOCS_VALIDATION.md) for complete documentation validation guide.

## Development

Install the [Mintlify CLI](https://www.npmjs.com/package/mint) to preview your documentation changes locally:

```bash
npm i -g mintlify
```

Run the following command at the root of your documentation, where your `docs.json` is located:

```bash
mint dev
```

View your local preview at `http://localhost:3000`.

## Publishing changes

Install our GitHub app from your [dashboard](https://dashboard.mintlify.com/settings/organization/github-app) to propagate changes from your repo to your deployment. Changes are deployed to production automatically after pushing to the default branch.

**Important:** All PRs must pass validation checks before merging.

## Contributing

1. **Before committing:**
   - Run `./scripts/validate-docs.sh` to check for errors
   - Test your changes locally with `mint dev`
   - Ensure all links work correctly

2. **Creating a PR:**
   - Wait for automated checks to complete
   - Review any validation warnings or errors
   - Fix issues before requesting review

3. **For reviewers:**
   - Check that all validation checks pass
   - Review any warnings in PR comments
   - Verify changes render correctly

## Need help?

### Troubleshooting

- **Dev environment not running:** Run `mint update` to ensure you have the most recent version of the CLI
- **Page loads as 404:** Make sure you are running in a folder with a valid `docs.json`
- **Validation fails:** Check [DOCS_VALIDATION.md](./DOCS_VALIDATION.md) for detailed troubleshooting
- **Broken links detected:** Review the validation output and fix referenced files or URLs

### Resources
- [Celo Documentation](https://docs.celo.org)
- [Documentation Validation Guide](./DOCS_VALIDATION.md)
- [Mintlify Documentation](https://mintlify.com/docs)
- [Mintlify Community](https://mintlify.com/community)
- [Celo Discord](https://discord.com/invite/celo)
