---
title: Oblivious Decentralized Identifier Service (ODIS)
slug: /celo-codebase/protocol/odis
---

:::caution
WIP: Inlclude an overview of ODIS explaining at a basic level what it does, and the applications it
is applied to. Link to page that include more detail for phone number privacy and key hardening.
Possibly link to other applications that use (p)OPRFs such as Privacy Pass, OPAQUE, or Pretty Good
Phone privacy.
:::

<!-- Paragraph below repeats itself a bit -->

The Oblivious Decentralized Identifier Service (ODIS) allows for privacy preserving [phone number mappings](/celo-codebase/protocol/odis/phone-number-privacy), [password hardening](/celo-codebase/protocol/odis/key-hardening), and other use cases by implementing a rate limited oblivious pseudorandom function (OPRF).
Essentially, it is a service that allows users to compute a limited number of hashes (i.e. PRF evaluations), without letting the service see the data being hashed.
Many useful applications are built on top of this primitive, such as privacy protected phone number mappings, password hardening, and [captchas for bot detection](https://privacypass.github.io/).

## Distributed key generation

For the sake of user privacy and security, no single party should have the ability to unilaterally compute the OPRF function.
To ensure this, ODIS was designed to be decentralized across a set of reputable participants.
Before ODIS was deployed, a set of operators participated in a Distributed Key Generation (DKG) ceremony to generate shared secret, with its pieces split between the operators.
Details of the DKG setup can be found [in the Celo Threshold BLS repository](https://github.com/celo-org/celo-threshold-bls-rs).

Each ODIS node holds a share of the key which can be used to calculate a piece of the OPRF evaluation that will be sent to the user.
When enough of these pieces are combined, their combination can be used to derive the unique OPRF evaluation (i.e. hash).
The number of key holders ($$m$$) and threshold of signatures required ($$k$$) to construct a full evaluation are both configurable at the time of the DKG ceremony.

### Production setup

As of October 2021, ODIS operates with 7 signers and a threshold of 5 (i.e. $$m=7, k=5$$).
As a result, 5 of the 7 parties must cooperate in order to produce an output from the OPRF function, and as long as at least 3 are honest and secure, no unauthorized requests will be served.

### Security properties

The goal the distributed key generation is to make it harder for a hacker, or a corrupt ODIS operator, to compromise the security of ODIS.
In particular, if an attacker has control over any less then the threshold $$k$$ of keys, they cannot make an unauthorized computation (e.g. querying the pepper for a phone number without quota) of the OPRF function.
Additionally, as long as $$k$$ operators remain honest and have access to their keys, honest users will continue to be able to use the service even if $$m-k$$ corrupt operators are refusing their requests.

For example, consider the phone number privacy protocol when there are 7 ODIS operators and the required threshold is 5. An attacker may can compute can the pepper for all phone numbers if 5 operators are compromised or corrupt. If 3 are corrupt or taken offline (e.g. by DDoS attack) then an attacker may prevent the rest of the operators from generating the pepper for users.

In the case that a single key is compromised, user data will remain private and the service operational; however, it's important that we can detect and perform a key rotation before the number of keys compromised exceeds $$k$$ or $$m - k + 1$$ (whichever is lower). 

## Rotating keys

If a key held by one of the operators is leaked, or if the operator becomes corrupt, a key rotation can restore the security of ODIS by removing the compromised keys.
Key rotation can also allow new ODIS operators to be added, by creating new keys for all the existing operators as well as the newly added operator.

To rotate keys, a new DKG ceremony must be performed with at least $$k$$ of the $$m$$ original keys. These newly generated keys will not be compatible with the old keys; however if $$k$$ of the old keys are used, an attacker may still reach the necessary threshold. Therefore, it's extremely important that all of the old keys are destroyed after a successful key rotation. Note that a DKG ceremony also provides the opportunity to change the values for $$k$$ and $$m$$.

## Blinding

<!-- CHECKPOINT -->

When a client queries ODIS to get an OPRF evaluation, the client first blinds the phone number locally. This blinding process preserves the privacy of the mobile number such that ODIS nodes cannot determine what number they're providing a pepper for; reducing risk of targeted censorship and further increasing privacy. After the application receives the response, it unblinds it to compute the pepper.

## Verification

<!-- Add some detail about the requirements and properties of verification -->

## Combiner

To facilitate the multi-service communication needed for the K of M signing, ODIS includes a combiner service which performs this orchestration for the convenience of wallets and other clients building on Celo. Like ODIS signer nodes, the combiner only receives the blinded phone number and therefore cannot see what number it's handling. The combiner also validates the response from each signer to ensure a corrupt signer cannot corrupt the resulting pepper.

Anyone who wishes to participate in ODIS service may run a combiner. Currently, cLabs operates one such combiner that may be used by other projects building on Celo.

## Authentication

In order to measure the quota for a given requester, ODIS must check their account information on the Celo blockchain. To prove ownership over their account, the POST request contains an Authorization header with the signed message body. When ODIS nodes receive the request, it authenticates the user by recovering the message signer from the header and comparing it to the value in the message body.

## Request flow diagram

![request flow diagram](https://storage.googleapis.com/celo-website/docs/ODIS-flow-diagram.svg)

## Architecture

![architecture diagram](https://storage.googleapis.com/celo-website/docs/ODIS-architecture-diagram.svg)

The hosted architecture is divided into two components, the Combiner and the Signers. Currently the combiner is a cloud function and the signers are independent NodeJs servers. Both services leverage the [Celo Threshold BLS library](https://github.com/celo-org/celo-threshold-bls-rs) which has been compiled to [a Web Assembly module](https://github.com/celo-org/blind-threshold-bls-wasm).

The combiner and signers maintain some minimal state in a SQL database, mainly related to quota tracking.

For storage of the BLS signing key, the signers currently support three cloud-based keystores: Azure Key Vault, AWS Secret Manager, and Google Secret Manager.
