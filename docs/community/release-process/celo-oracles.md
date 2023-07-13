---
title: Celo Oracles Release Process
description: Details of the release process for updating the Celo Oracles for the Mento Stability Protocol
---

# Celo Oracles Release Process

Details of the release process for updating the Celo Oracles Client for the Mento Stability Protocol.

# Versioning

Releases of are made as needed. Releases are numbered according to semantic versioning, as described at [semver.org](https://semver.org).

Development builds should be identified with a `-dev` suffix, and only one commit should exist with a released version `x.y.z` for any `(x, y, z)`. Release candidates should be identified with a `-rCX` suffix, where X is the version of the release candidate.

## Documentation

Documentation is maintained in the [celo-org/docs](https://github.com/celo-org/docs) repo and is hosted on [docs.celo.org](/validator/attestation).

## Identifying releases

### Git branches

Code for the client is stored in the [Celo Oracles GitHub repository](https://github.com/celo-org/celo-oracle). Development is done on the `main` branch, which corresponds to the next major or minor version.

### Git tags

Each release should be [created on Github](https://github.com/celo-org/celo-oracle/releases) and tagged with the version number, e.g. `X.Y.Z`. Each release should include a summary of the release contents, including links to pull requests and issues with detailed description of any notable changes. Tags should be [annotated tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging#_annotated_tags).

Tags should be signed and can be verified with the following command.

```bash
git verify-tag vX.Y.Z
```

On Github, each release tag should have attached signatures that can be used to verify the Docker images.

### Docker tags

Docker images are stored in the repository ` us-west1-docker.pkg.dev/celo-testnet-production/celo-oracle` repository, stored in Google Cloud Platform Artifact Registry. Commits there are tagged with `celo-oracle-X.Y.Z` and `celo-oracle-<commithash>`. Just as a Git tag immutably points to a commit hash, the Docker tag should immutably point to an image hash.

## Testing

As well as automated CI tests, all releases are expected to go through manual testing as needed to verify security properties, accuracy of documentation, and compatibility with current node operators production set up.

## Promotion process

Cherry picked branch changes shall be added to a `releases` protected branch. When merging code to this branch, the version number should be updated accordingly.

### Source control

### Distribution

<table>
  <tr>
    <td>Date</td>
    <td>Action</td>
  </tr>
  <tr>
    <td>T-1w</td>
    <td>
      <ol>
        <li>Deploy release candidate build to Alfajores testnet</li>
        <li>Monitor metrics and behavior</li>
      </ol>
    </td>
  </tr>  
  <tr>
    <td>T</td>
    <td>
      <ol>
        <li>Tag the release and publish Docker image as described in this document</li>
        <li>Inform the community of the new release via Discord and the Celo Forum</li>
      </ol>
    </td>
  </tr>
  <tr>
    <td>T+1w onwards</td>
    <td>
      <ol>
        <li>Confirm Mainnet services have upgraded without issues</li>
        <li>Continue monitoring dashboards for user issues</li>
      </ol>
    </td>
  </tr>
</table>

### Emergency Patches

Security fixes or hotfixes may not have a public commit attached to them in case the vulnerability needs to be patched before disclosing to the general public to prevent an attacker to exploit a vulnerability before operators patch their services. Emergency patches will be distributed using the same method described in [Git tags](#git-tags)

## Vulnerability Disclosure

Vulnerabilities in Celo Oracles should be disclosed according to the [security policy](https://github.com/celo-org/celo-monorepo/blob/master/SECURITY.md).
