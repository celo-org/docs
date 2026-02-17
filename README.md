# Celo Documentation

Official documentation for Celo

## Making Changes

Install the [Mintlify CLI](https://www.npmjs.com/package/mint) to preview your documentation changes locally:

```sh
npm i -g mint
```

Run the following command. It will display a preview of you changes at `http://localhost:3000`.

```sh
mint dev
```

## Contributing

1. **Before committing:**
   - Test your changes locally with `mint dev`
   - Check for broken links with `mint broken-links`
   - Ensure all links work correctly

2. **Creating a PR:**
   - Wait for automated checks to complete
   - Review any validation warnings or errors
   - Fix issues before requesting review

3. **For reviewers:**
   - Check that all validation checks pass
   - Review any warnings in PR comments
   - Verify changes render correctly

### Troubleshooting

- **Dev environment not running:** Run `mint update` to ensure you have the most recent version of the CLI
- **Page loads as 404:** Make sure you are running in a folder with a valid `docs.json`
- **Validation fails:** Run `./scripts/validate-docs.sh` and review the output for specific errors
- **Broken links detected:** Review the validation output and fix referenced files or URLs

### Resources

- [Celo Documentation](https://docs.celo.org)
- [Celo Discord](https://discord.com/invite/celo)
- [Mintlify Documentation](https://mintlify.com/docs)
