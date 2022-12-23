---
title: Celo CLI
description: The Command Line Interface allows users to interact with the Celo Protocol smart contracts.
sidebar_position: 1
---

# Celo CLI

Introduction to the Celo Command Line Interface and installation instructions.

## What is the Celo CLI

The Command Line Interface allows users to interact with the Celo Protocol smart contracts.

It’s a command-line interface around the ContractKit. It allows you to interact with the Celo Protocol and smart contracts using command-line tools rather than writing JavaScript. It provides modules for interacting with modules on the ContractKit and is an excellent code reference when defining your own modules. Some common features you may want to consider are helping users participate in elections or in on-chain governance, voting for validators, or helping users interact with multi-sig contracts.

## NPM Package

The Celo CLI is published as a node module on NPM. Assuming you have [npm](https://www.npmjs.com/get-npm) and [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) both installed, you can install the Celo CLI using the following command:

```bash
npm install -g @celo/celocli
```

:::info

We are currently deploying the CLI with only Node.js v12.x. If you are running a different version of Node.js, consider using [NVM](https://github.com/nvm-sh/nvm#installation-and-update) to manage your node versions. e.g. with: `nvm install 12 && nvm use 12`

:::

:::info

If you have trouble installing globally \(i.e. with the `-g` flag\), try installing to a local directory instead with `npm install @celo/celocli` and run with `npx celocli`.

:::

## Commands

The tool is broken down into modules and commands with the following pattern:

```text
celocli <module>:<command> <...args> <...flags?>
```

The `celocli` tool assumes that users are running a node which they have access to signing transactions on, or have another mechanism for signing transactions (such as a Ledger wallet or supplying the private key as an argument to the command). See the documentation on the [config](config.md) module for information about how to set which node commands are sent to.

:::info

All balances of CELO or Celo Dollars are expressed in units of 10^-18.

:::

You can find the Celo CLI package on NPM [here](https://www.npmjs.com/package/@celo/celocli).

To see all available commands, run `celocli commands`.

To see all available flags for a command, add the flag `--globalHelp` to the command.

## Optional: Run a Full Node

Commands need to connect to a Celo node to execute most functionality. You can either use [Forno](/network/node/forno) (this is the easiest way) or run your own full node if you prefer. See the [Running a Full Node](/network/mainnet/run-full-node) instructions for more details on running a full node.

The easiest way to connect `celocli` to the Celo network is by running the following command in your terminal with `celocli` installed:

```bash
celocli config:set --node=https://forno.celo.org
```

You can verify that `celocli` is connected by running

```bash
celocli config:get
```

## Import Accounts

If you are connecting to a remote node (like Forno), Celo CLI will need to sign transactions locally before sending them. To do this, Celo CLI needs access to a private key. There are a couple ways to sign transactions using Celo CLI.

### Import Private Key (less secure)

Add the `--privateKey` flag followed by the private key associated with the sending account. For example:

```shell
celocli transfer:celo --from <accountAddress> --to <addressOfChoice> --value <valueInCeloWei> --privateKey <privateKey> --node https://forno.celo.org
```

Or you can use a Ledger hardware wallet. (preferred, see below)

## Using a Ledger Wallet

The Celo CLI supports using a [Ledger hardware wallet](/wallet/ledger/setup) to sign transactions. Just add the `--useLedger` flag to a command that requires a signature.

You can specify the number of addresses to get for local signing with the `--ledgerAddresses` flag.

You can specify an array of index addresses for local signing. Example `--ledgerCustomAddresses "[4,99]"`.

For example:

```shell
celocli transfer:celo --to <addressOfChoice> --value 1000000 --from <accountAddress> --useLedger
```

## Plugins

Additional plugins can be installed which make the CLI experience smoother. Currently, `celocli` only supports installing plugins published on NPM within the `@celo/*` and `@clabs/*` scopes.

:::danger

Installing a 3rd party plugin can be _dangerous_! Please always be sure that you trust the plugin provider.

:::

The autocomplete plugin adds an interactive autocomplete for `bash` and `zsh` shells. To enable the autocomplete plugin, follow the instructions provided at:

```text
celocli autocomplete
```

The update warning plugin notifies the user if they are using an oudated version of the CLI. This plugin is enabled by default.
