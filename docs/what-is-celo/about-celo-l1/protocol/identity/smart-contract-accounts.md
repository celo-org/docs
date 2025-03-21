---
title: Smart Contract Accounts
---

Smart contract accounts are used to enable features beyond what can be accomplished with an externally owned account (EOA) alone.
In this document, we'll describe some of the features and considerations associated with smart contract accounts in general, and the architecture used by the Valora wallet in particular as an example of how smart contract accounts can be used.

EOAs are what most people think of when they imagine a blockchain wallet.
EOAs are comprised of an ECDSA public/private key pair from which the on-chain address is derived.
The account address is derived from the public key, and transactions are authorized by the private key.
In most wallets, the EOA is generated and stored on the user's mobile device and backed up via a BIP-39 mnemonic phrase.

A smart contract account on the other hand is a smart contract that can be used to interact with other smart contracts on behalf of the owner.
Celo provides an open-source implementation of a smart contract account; the [meta-transaction wallet](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/common/MetaTransactionWallet.sol) (MTW).
In general, ownership can be determined in arbitrary ways, but most commonly an EOA is designated as the owner and can authorize transactions my signing a meta-transaction containing the details of the authorized transaction.
This is how the meta-transaction wallet works.
In this case you can think of the smart contract account as the primary account, and the EOA as the controller of this account.

## Benefits of a smart contract account

### Separation of signer and payer

When new users create a wallet, they start with an empty balance.
This makes it difficult for the new users to verify their phone number as they need to pay for both the Celo transactions and the Attestation Service fees ([see here for more details](/protocol/identity/)).
To make this experience more intuitive and frictionless for new users, cLabs operates an [onboarding service called Komenci](https://github.com/celo-org/komenci/) that pays for the transactions on behalf of the user.
It does this by first deploying a meta-transaction wallet contract and setting the wallet EOA address as the signer.
At this point, the EOA can sign transactions and submit them to Komenci.
Komenci will wrap the signed transaction into a meta-transaction, which it pays for and submits to the network.

In general, smart contract accounts allow the someone other than the account owner to pay for the transaction fees required to submit a transaction to the blockchain, enabling a number of useful operations not otherwise possible.

### Account recovery

Smart contract accounts can also be useful if a user ever loses their phone and recovery phrase.
Unlike EOAs, smart contract accounts can support account recovery methods that do not rely solely on recovering the underlying keys.
The meta-transaction wallet implements [a function](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/common/MetaTransactionWallet.sol#L101-L108) to assign another Celo address as the Guardian of the account.
This Guardian can be a simple backup key or a smart contract implementing social recovery, [KELP](https://eprint.iacr.org/2021/289), or another account recovery protocol.
With the authorization of the Guardian, the meta-transaction wallet will update the owner of the account to replace the lost key.
Any funds or privileges held by the meta-transaction wallet are then recovered to the user who can control the account using their new key.

### Transaction batching

With smart contract accounts, including the meta-transaction wallet, transactions can be batched together to execute atomically.
This makes for a better user experience, as transactions can be guaranteed to execute all together or entirely revert.
It can also prevent some cases where front-running would be possible by splitting the user's transactions.

## Valora accounts

Behind every Valora wallet are two types of accounts: an externally owned account (EOA) and a meta-transaction wallet.
Valora generates the EOA during onboarding, and has a meta-transaction wallet deployed for it by Komenci with the generated EOA as the signer.
Using this configuration, Valora users gain the benefits listed above, including having Valora pay for the transaction fees associated with onboarding.

## Sending to a Valora wallet

When performing a payment to a Valora wallet, it's important that the address that is receiving funds is the EOA, and not the MTW since funds in the MTW are not displayed or directly accessible to Valora users.
To look up a wallet using a phone number:

1. Use ODIS to query the phone number pepper
2. Use the phone number pepper to get the on-chain identifier
3. Use the on-chain identifier to get the account address
4. Use the account address to get the wallet address (EOA)

The first two steps are covered extensively in [this guide](/developer/contractkit/odis).

To get the account address (step 3) you can use the [Attestation contract method `lookupAccountsForIdentifier`](https://github.com/celo-org/celo-monorepo/blob/e6fdaf798a662ffe2c12f9a74b28e0fa1c1f8101/packages/sdk/contractkit/src/wrappers/Attestations.ts#L472).

To get the wallet address from the account (step 4) you can use the [Account contract method `getWalletAddress`](https://github.com/celo-org/celo-monorepo/blob/e6fdaf798a662ffe2c12f9a74b28e0fa1c1f8101/packages/sdk/contractkit/src/wrappers/Accounts.ts#L318).

It may also be necessary to lookup the data encryption key (ex. [for comment encryption](/protocol/transaction/tx-comment-encryption)). This key can similarly be queried with the account by using the [Account contract method `getDataEncryptionKey`](https://github.com/celo-org/celo-monorepo/blob/e6fdaf798a662ffe2c12f9a74b28e0fa1c1f8101/packages/sdk/contractkit/src/wrappers/Accounts.ts#L310).

You can view a working example of this all tied together in [the `celocli` command `identity:get-attestations`](https://github.com/celo-org/celo-monorepo/blob/master/packages/cli/src/commands/identity/get-attestations.ts).

## Enabling Valora to interact with your dApp

### Signatures

Since all Valora users will have the use a meta-transaction wallet, it's important to keep in mind that transactions may originate from an EOA as well as a smart contract.
If your contract relies upon EIP-712 signed typed data, be sure to also support typed data originating from contracts.
This data can't be signed by the `msg.sender` since it's originating from a contract, but is implicitly authorized by originating from the contract.

## Implementation

The implementation of the meta-transaction wallet can be [found here](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/common/MetaTransactionWallet.sol).
