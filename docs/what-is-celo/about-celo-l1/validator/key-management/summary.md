---
title: Celo Key Management Summary
description: Introduction to the philosophy and account roles related to key management on Celo.
---

# Summary

Introduction to the philosophy and account roles related to key management on Celo.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## Philosophy

The Celo protocol was designed with the understanding that there is often an inherent tradeoff between the convenience of accessing a private key and the security with which that private key can be custodied. In general Celo is unopinionated about how keys are custodied, but also allows users to authorize private keys with specific, limited privileges. This allows users to custody each private key according to its sensitivity (i.e. what is the impact of this key being lost or stolen?) and usage patterns (i.e. how often and under which circumstances will this key need to be accessed).

## Summary

The table below outlines a summary of the various account roles in the Celo protocol. Note that these roles are often _mutually exclusive_. An account that has been designated as one role can often not be used for a different purpose. Also note that under the hood, all of these accounts) are based on secp256k1 ECDSA private keys with the exception of the BLS signer. The different account roles are simply a concept encoded into the Celo proof-of-stake smart contracts, specifically [Accounts.sol](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/common/Accounts.sol).

For more details on a specific key type, please see the more detailed sections below.

| Role                                | Description                                                                                      | Ledger compatible |
| ----------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------- |
| Celo Account                        | An account used to send transactions in the Celo protocol                                        | Yes               |
| Locked CELO Account                 | Used to lock and unlock CELO and authorize signers                                               | Yes               |
| Authorized vote signer              | Can vote on behalf of a Locked CELO Account                                                      | Yes               |
| Authorized validator (group) signer | Can register and manage a validator group on behalf of a Locked CELO Account                     | Yes               |
| Authorized validator signer         | Can register, manage a validator, and sign consensus messages on behalf of a Locked CELO Account | No                |
| Authorized validator BLS signer     | Used to sign blocks as a validator                                                               | No                |
| Authorized attestation signer       | Can sign attestation messages on behalf of a Locked CELO account                                 | No                |

:::warning

A Locked CELO Account may have at most one authorized signer of each type at any time. Once a signer is authorized, the only way to deauthorize that signer is to authorize a new signer that has never previously been used as an authorized signer or Locked CELO Account. It follows then that a newly deauthorized signer cannot be reauthorized.

:::
