# Envio

Envio is a modern, multi-chain EVM blockchain indexing framework speed-optimized
for querying real-time and historical data.

### Understanding Envio

#### Envio HyperIndex

Envio [HyperIndex](https://docs.envio.dev/docs/overview) is a feature-rich
indexing solution that provides Celo applications with a seamless and
efficient way to index and aggregate real-time or historical blockchain data.
The indexed data is easily accessible through custom GraphQL queries, giving
developers the flexibility and power to retrieve specific information for their
blockchain application.

Envio offers native support for Celo networks (testnet and mainnet) and has been designed
to support high-throughput blockchain applications that rely on real-time data
for their business requirements.

Designed to optimize the developer experience, Envio offers automatic code
generation, flexible language support, quickstart templates, and a reliable
cost-effective [hosted service](https://envio.dev/explorer) with reference implementations. Indexers on Envio can be written in JavaScript, TypeScript, or ReScript.

#### Envio HyperSync

Envio [HyperSync](https://docs.envio.dev/docs/overview-hypersync) is supported on Celo mainnet.

HyperSync is a real-time data query layer for Celo, providing APIs
that bypass traditional JSON-RPC for up to 1000x faster syncing of historical
data. HyperSync is used as the default data source in Envio's indexing framework (HyperIndex),
with standard RPC being optional.

Using HyperSync, Celo developers do not need to worry about RPC URLs,
rate-limiting, or managing their infrastructure - and can easily sync large
datasets in a few minutes, something that would usually take hours or days using
traditional indexing solutions.

HyperSync is also available as a standalone API for data analytic use cases.
Data analysts can interact with the HyperSync API using JavaScript, Python, or
Rust clients and extract data in JSON, Arrow, or Parquet formats, or use the [RPC interface](https://docs.envio.dev/docs/HyperSync/overview-hyperrpc).

## Quick Start

Developers can choose to start from a template (e.g. Blank, ERC-20, etc.), or
use Contract Import, when running the `envio init` command. 

[Contract Import](https://docs.envio.dev/docs/contract-import) is a quick start that allows Celo developers to quickly autogenerate a basic indexer. This walkthrough explains how to initialize an indexer using a single or multiple contracts that are already deployed on Celo. 

This process allows a user to quickly and easily start up a basic indexer and a queryable GraphQL API for their application in less than 5 minutes.

The following files are required to run the Envio indexer:
- Configuration (defaults to `config.yaml`)
- GraphQL Schema (defaults to `schema.graphql`)
- Event Handlers (defaults to `src/EventHandlers.*` depending on the language chosen)

These files are auto-generated according to the template and language chosen by running the `envio init` command. 

#### Intialize your indexer

`cd` into the folder of your choice and run
```bash
envio init
```
Name your indexer
```bash
? Name your indexer:
```
Choose the directory where you would like to setup your project (default is the current directory)
```bash
? Set the directory:  (.) .
```
Select `Contract Import` as the initialization option.
```bash
? Choose an initialization option
  Template
> ContractImport
  SubgraphMigration
[↑↓ to move, enter to select, type to filter]
```
```bash
? Would you like to import from a block explorer or a local abi?
> Block Explorer
  Local ABI
[↑↓ to move, enter to select, type to filter]
```
`Block Explorer` option only requires user to input the contracts address and chain of the contract. If the contract is verified and deployed on one of the supported chains, this is the quickest setup as it will retrieve all needed contract information from a block explorer. 

`Local ABI` option will allow you to point to a JSON file containing the smart contract ABI. The Contract Import process will then populate the required files from the ABI.

#### Select the blockchain that the contract is deployed on
```bash
? Which blockchain would you like to import a contract from?
  arbitrum-one
  arbitrum-nova
  bsc
> celo
  ethereum
  gnosis
v goerli

[↑↓ to move, enter to select, type to filter]
```
#### Enter in the address of the contract to import
```bash
? What is the address of the contract?
[Use the proxy address if your abi is a proxy implementation]
```
Note: if you are using a proxy contract with an implementation, the address should be for the proxy contract.

#### Choose which events to include in the `config.yaml` file
```bash
? Which events would you like to index?
> [x] ClaimRewards(address indexed from, address indexed reward, uint256 amount)
  [x] Deposit(address indexed from, uint256 indexed tokenId, uint256 amount)
  [x] NotifyReward(address indexed from, address indexed reward, uint256 indexed epoch, uint256 amount)
  [x] Withdraw(address indexed from, uint256 indexed tokenId, uint256 amount)
[↑↓ to move, space to select one, → to all, ← to none, type to filter]
```

#### Select the continuation option
```bash
? Would you like to add another contract?
> I'm finished
  Add a new address for same contract on same network
  Add a new network for same contract
  Add a new contract (with a different ABI)
[Current contract: BribeVotingReward, on network: Celo]
```

The `Contract Import` process will prompt the user whether they would like to finish the import process or continue adding more addresses for same contract on same network, addresses for same contract on different network or a different contract.


**Envio Indexer Examples**

View the Envio [Explorer](https://envio.dev/explorer) for reference implementations, or visit the Envio docs for [video and written tutorials](https://docs.envio.dev/docs/HyperIndex/tutorial-op-bridge-deposits). 

**Getting support**

Indexing can be a rollercoaster, especially for more complex use cases. The
Envio engineers are available to help you with your data availability needs.

- [Discord](https://discord.gg/mZHNWgNCAc)
- Email: [hello@envio.dev](mailto:hello@envio.dev)



