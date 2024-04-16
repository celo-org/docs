---
title: Deploy with Foundry
description: How to deploy a Smart Contract to Celo using Foundry
---

# Deploy on Celo with Foundry

How to deploy a smart contract to Celo testnet, mainnet, or a local network using [Foundry](https://book.getfoundry.sh/).

---

## Introduction to Foundry

Foundry is a smart contract development toolchain.

Foundry manages your dependencies, compiles your project, runs tests, deploys, and lets you interact with the chain from the command-line and via Solidity scripts.

## Prerequisites

You will need the Rust compiler and Cargo, the Rust package manager. The easiest way to install both is with [rustup.rs](https://rustup.rs).

## Using Foundryup

Foundryup is the Foundry toolchain installer. You can find more about it here.

Open your terminal and run the following command:

```bash
curl -L https://foundry.paradigm.xyz | bash
```

This will install Foundryup, then simply follow the instructions on-screen, which will make the foundryup command available in your CLI.

Running `foundryup` by itself will install the latest (nightly) precompiled binaries: `forge`, `cast`, `anvil`, and `chisel`.

## Create a new project using Forge

To start a new project with Foundry, use:

```bash
forge init hello_foundry
```

:::info
If you initializing project in an already initialized git repo use:

```bash
forge init project_name --no-git
```

:::

## Adding a dependency

To add a dependency, use:

```bash
forge install openzeppelin/openzeppelin-contracts
```

### Remapping dependencies

Forge can remap dependencies to make them easier to import. Forge will automatically try to deduce some remappings for you

```bash
$ forge remappings

ds-test/=lib/solmate/lib/ds-test/src/
forge-std/=lib/forge-std/src/
solmate/=lib/solmate/src/
weird-erc20/=lib/weird-erc20/src/
```

These remappings mean:

- To import from `forge-std` we would write: import `forge-std/Contract.sol`;
- To import from `ds-test` we would write: import `ds-test/Contract.sol`;
- To import from `solmate` we would write: import `solmate/Contract.sol`;
- To import from `weird-erc20` we would write: import `weird-erc20/Contract.sol`;

You can customize these remappings by creating a `remappings.txt` file in the root of your project.

### Removing dependencies

You can remove dependencies using

```bash
forge remove openzeppelin/openzeppelin-contracts
```

## Adding Celo specific config to `foundry.toml`

Add the following configuration to `foundry.toml` file in the root level of your project.

```toml
[rpc_endpoints]
celo-alfajores = "https://alfajores-forno.celo-testnet.org"
celo = "https://forno.celo.org"
```

## Deploying contract

Forge can deploy smart contracts to a given network using:

The below example deploys `Counter` contract at location `src/Counter.sol` in the project to the Celo Alfajores Testnet.

```bash
forge create --rpc-url celo-alfajores --private-key <your_private_key> src/Counter.sol:Counter
```

:::info
Notice the contract name after `:`, this is because a single solidity file can have multiple contracts.

It is recommended to use `--verify` flag so that the contract gets verified right after deployment, this requires [etherscan configuration](../verify/foundry.md) in the `foundry.toml` file.
:::

On successful deployment, you should a following output!

![github](/img/doc-images/deploy-foundry/image1.png)
