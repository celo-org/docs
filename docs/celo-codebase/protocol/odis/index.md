---
title: Oblivious Decentralized Identifier Service (ODIS)
slug: /celo-codebase/protocol/odis
---

:::caution
WIP: Inlclude an overview of ODIS explaining at a basic lever what it does, and the applications it
is applied to. Link to page that include more detail for phone number privacy and key hardening.
Possibly link to other applications that use (p)OPRFs such as Privacy Pass, OPAQUE, or Pretty Good
Phone privacy.
:::

The Oblivious Decentralized Identifier Service (ODIS) allows for privacy preserving phone number mappings, password hardening, and other use cases by implementing a rate limited oblivious pseudorandom function (OPRF).
Essentially, it is a service that allows users to compute a limited number of hashes (i.e. PRF evaluations) without letting the service see the data being hashed.
On top of this primitive, many applications can be built, such as privacy protected phone number to account mappings, password hardening, and [captchas for bot detection](https://privacypass.github.io/).

## Distributed Key Generation

For the sake of user privacy and security, no single party should have the ability to unilaterally compute the OPRF function.
To ensure this, ODIS was designed to be decentralized across a set of reputable participants.
Before ODIS was deployed, a set of operators participated in a Distributed Key Generation (DKG) ceremony to generate shared secret, with its pieces split between the operators.
Details of the DKG setup can be found [in the Celo Threshold BLS repository](https://github.com/celo-org/celo-threshold-bls-rs).
Each ODIS node holds a share of the key which can be used to sign the response to the user.
When enough of these signatures are combined, their combination can be used to derive the unique OPRF evaluation (i.e. hash).
The number of key holders ($$m$$) and threshold of signatures required ($$k$$) to construct a full evaluation are both configurable at the time of the DKG ceremony.

## Rotating keys

<!-- Include a section about key resharing as well as rotation? -->

In the case that a key is compromised or a new ODIS operator is added, it will be necessary to perform a key rotation. Before going over the key rotation process, let's take a look at the implications of a compromised key. If the number of keys compromised at a time is less than the threshold $$k$$, the attacker will not be able to reach a sufficient threshold to compute the pepper for all phone numbers. Similarly, as long as $$k$$ other keys remain uncompromised, good users will still be able to perform the pepper lookup as part of ODIS. Therefore, in the case that a single key is compromised, user data will remain private and the service operational; however, it's important that we can detect and perform a key rotation before the number of keys compromised exceeds $$k$$ or $$m - k + 1$$ (whichever is lower). For example, if there are ten ODIS operators and the required threshold is three, then if three of them are compromised an attacker may compute the pepper for all phone numbers. If eight are compromised then an attacker may prevent the rest of the nodes (two in this case) from generating the pepper for users. Note that "compromised" entities in these examples could also be malicious or simply unavailable.

To rotate keys, a new DKG ceremony must be performed with at least $$k$$ of the $$m$$ original keys. These newly generated keys will not be compatible with the old keys; however if $$k$$ of the old keys are used, an attacker may still reach the necessary threshold.Therefore, it's extremely important that all of the old keys are destroyed after a successful key rotation. Note that a DKG ceremony also provides the opportunity to change the values for $$k$$ and $$m$$.

## Blinding

When a client, like the Celo wallet, queries ODIS to retrieve a phone number pepper, the client first blinds the phone number locally. This blinding process preserves the privacy of the mobile number such that ODIS nodes cannot determine what number they're providing a pepper for; reducing risk of targeted censorship and further increasing privacy. After the application receives the response, it unblinds it to compute the pepper.

## Combiner

To facilitate the multi-service communication needed for the K of M signing, ODIS includes a combiner service which performs this orchestration for the convenience of wallets and other clients building on Celo. Like ODIS signer nodes, the combiner only receives the blinded phone number and therefore cannot see what number it's handling. The combiner also validates the response from each signer to ensure a corrupt signer cannot corrupt the resulting pepper.

Anyone who wishes to participate in ODIS service may run a combiner. Currently, cLabs operates one such combiner that may be used by other projects building on Celo.

## Authentication

In order to measure the quota for a given requester, ODIS must check their account information on the Celo blockchain. To prove ownership over their account, the POST request contains an Authorization header with the signed message body. When ODIS nodes receive the request, it authenticates the user by recovering the message signer from the header and comparing it to the value in the message body.

## Request Flow Diagram

![request flow diagram](https://storage.googleapis.com/celo-website/docs/ODIS-flow-diagram.svg)

## Architecture

![architecture diagram](https://storage.googleapis.com/celo-website/docs/ODIS-architecture-diagram.svg)

The hosted architecture is divided into two components, the Combiner and the Signers. Currently the combiner is a cloud function and the signers are independent NodeJs servers. Both services leverage the [Celo Threshold BLS library](https://github.com/celo-org/celo-threshold-bls-rs) which has been compiled to [a Web Assembly module](https://github.com/celo-org/blind-threshold-bls-wasm).

The combiner and signers maintain some minimal state in a SQL database, mainly related to quota tracking.

For storage of the BLS signing key, the signers currently support three cloud-based keystores: Azure Key Vault, AWS Secret Manager, and Google Secret Manager.
