---
title: Celo for Ethereum Developers
description: Overview of the similarities and differences between the Celo and Ethereum blockchains.
---

# Celo for Ethereum Developers

Overview of the similarities and differences between the Celo and Ethereum blockchains.

---

:::tip

For a general overview of the Celo network and architecture, see [the Celo Overview page](/what-is-celo/using-celo/).

:::

## What is Celo's Relationship to Ethereum?

Celo is an Ethereum Layer 2 solution. Since the migration, Celo is an OP stack based L2 on top of Ethereum, extending it by adding fee abstraction, 1 second block finality and a variety of local stablecons. Ethereum’s L2 landscape is becoming a melting pot of philosophies and Celo adds a [values-driven, inclusivity-focused layer](https://app.t2.world/article/cm1eqxyh8151217321mcesuw528v) to that mix, enriching Ethereum's pluralistic fabric. 

In terms of programmability, Celo is similar to Ethereum. Both networks run the Ethereum Virtual Machine (EVM) to support smart contract functionality.
This means that all programming languages, developer tooling and standards that target the EVM are relevant for both Celo and Ethereum.
Developers building on Celo can write smart contracts in [Solidity](https://solidity.readthedocs.io/en/latest/), and
take advantage of smart contract standards that have already been developed for Ethereum.

## The ERC-20 Token Standard

The [ERC20 token standard](https://eips.ethereum.org/EIPS/eip-20) is a standard API for tokens within smart contracts.
This standard interface allows any tokens to be re-used by different applications.
The ERC20 token standard is blockchain agnostic, so ERC20 tokens can be implemented on any blockchain.

The standard includes the **_optional_** functions

```javascript
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
```

and the **_required_** functions

```javascript
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

and includes the following events

```js
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

An **ERC20 compliant contract** must include the required functions and events at _minimum_.
It can include additional functions and events and still be ERC20 compliant.

## The Celo Native Asset and the Celo Dollar

This interface is relevant for two important assets on the Celo network, the Celo native asset (CELO) and the Celo Dollar (cUSD).

CELO was called Celo Gold (cGLD) when the contract was deployed, so you will often see references to Celo Gold in the codebase.
CELO and cGLD are the same thing. You can [view the CELO implementation here.](https://celo.blockscout.com/address/0x8dd4f800851db9dc219fdfaeb82f8d69e2b13582/contracts)

CELO has an ERC20 interface, so users can interact with CELO via the token standard, but it is important to note that not all CELO transfers are required to go through the token contract.
CELO can also be transferred by specifying the value field of a transaction, in the same way that ETH can be transferred in Ethereum.
To properly monitor balance changing operations of CELO, it can be helpful to use [Celo Rosetta.](https://github.com/celo-org/rosetta)
Celo Rosetta provides an easy way to obtain changes that are not easily queryable using the celo-blockchain RPC.

The Celo Dollar (cUSD) is implemented solely as a smart contract, so all cUSD actions are mediated by the smart contract.
You can [view the implementation here.](https://celo.blockscout.com/address/0xaa933baf03cfc55b8e4e0d7de479bcc12f189352/contracts)

## Key differences between Celo and Ethereum

### Features exclusive to Celo

1.  Celo allows users to pay transaction fees in cryptoassets other than the native asset. On Ethereum, users must pay transaction fees in Ether. For example, users can send cUSD, and then pay any transaction fees in cUSD as well.
2.  The Celo protocol uses EigenLayer as the data settlement layer. This allows blocks on Celo to be created in 1 seconds, as compared to ~12+ seconds on Ethereum. In addition, all blocks are finalized immediately, so there is no need to wait for more than 1 block confirmation to ensure that a transaction won't be reverted.

### Things to watch out for

1.  As previously mentioned, CELO transfers are not required to happen via the ERC20 interface. A user's CELO balance may change without any interaction with the CELO contract, as they may transfer CELO natively.

2.  Celo supports a broad range of Ethereum-compatible transaction types to ensure seamless integration with existing Ethereum tooling. In addition to standard Ethereum tx types like legacy (type 0), EIP-2930 (type 1), and EIP-1559 (type 2), Celo also supports OP Stack-specific deposited transactions (type 126) and introduces its own Celo-native tx type (type 123) to enable features like Fee Abstraction. While most Ethereum transactions work out of the box on Celo, developers can also take advantage of extended functionality such as paying gas fees in ERC-20 tokens.  For a more detailed overview, check out the full breakdown of supported (transaction types)[/what-is-celo/using-celo/protocol/transaction/transaction-types].

1)  Mnemonic seed phrases can derive different accounts depending on the key derivation path used. While Ethereum wallets typically use the path `m/44'/60'/0'/0`, Celo defines its own path as `m/44'/52752'/0'/0`. Despite this, **most Celo wallets—including Valora—default to the Ethereum derivation path**, except in the case of some legacy accounts. Ledger Live, when used with the **Celo Ledger app**, strictly uses the Celo path. Tools like the **Celo CLI and the Celo Ledger app**, however, offer flexibility and allow users to specify either path explicitly.

2)  The Valora wallet uses two types of accounts: externally owned accounts and meta-transaction wallets. There are important consequences for wallet developers and dapp developers building on Celo as Valora is one of the main interfaces for Celo users. You can find more information about [Valora accounts here](/what-is-celo/about-celo-l1/protocol/identity/smart-contract-accounts).

## Deploying Ethereum Contracts to Celo

Celo runs the EVM which means that smart contracts written for Ethereum can easily be deployed to Celo, the main difference being that you just need to connect to a Celo node instead of an Ethereum node. You can connect to your own Celo node or to a Celo node service provider like [Quicknode](https://www.quicknode.com/chains/celo).

## Protocol Differences

### OPCODES & Block headers

With the move to an L2, Celo now supports the same OPCODES and Block headers as Ethereum.

### Precompiled Contracts

Celo includes all of the precompiled contracts in Ethereum, but also adds additional contracts. [Here](https://github.com/celo-org/celo-blockchain/blob/v1.3.2/core/vm/contracts.go#L157) is the list of Celo precompiled contracts as of Celo version 1.3.2. You can find the latest updates by selecting the most recent release tag.

### Core Contract Calls

The blockchain client makes some core contract calls at the end of a block, outside of transactions. Many are done on epoch blocks ([epoch rewards](/what-is-celo/about-celo-l1/protocol/pos/epoch-rewards), [validator elections](/what-is-celo/about-celo-l1/protocol/pos/validator-elections), etc.), but not all. For example, the [gas price minimum](/what-is-celo/about-celo-l1/protocol/transaction/gas-pricing) update can happen on any block.
Logs created by these contract changes are included in a single additional receipt in that block, which references the block hash as its transaction hash, even though there is no transaction with this hash. If no logs were created by such calls in that block, no receipt is added.

### Node management APIs

You can find the full list of RPC API endpoints in [this file](https://github.com/celo-org/op-geth/blob/celo-rebase-12/internal/web3ext/web3ext.go).
