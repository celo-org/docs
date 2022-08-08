---
title: Oblivious Decentralized Identifier Service (ODIS)
---

import PageRef from '@components/PageRef'

The Oblivious Decentralized Identifier Service (ODIS) allows for privacy preserving [phone number mappings](/protocol/identity/odis-use-case-phone-number-privacy), [password hardening](/protocol/identity/odis-use-case-key-hardening), and other use cases by implementing a rate limited oblivious pseudorandom function (OPRF).
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
As a result, 5 of the 7 parties must cooperate in order to produce an output from the (P)OPRF function, and as long as at least 3 are honest and secure, no unauthorized requests will be served.

<!-- TODO(victor): Once the new set is in production, information about the 7 operators should be included here -->

### Security properties

The goal the distributed key generation is to make it harder for a hacker, or a corrupt ODIS operator, to compromise the security of ODIS.
In particular, if an attacker has control over any less then the threshold $$k$$ of keys, they cannot make an unauthorized computation (e.g. querying the pepper for a phone number without quota) of the OPRF function.
Additionally, as long as $$k$$ operators remain honest and have access to their keys, honest users will continue to be able to use the service even if $$m-k$$ corrupt operators are refusing their requests.

For example, consider the phone number privacy protocol when there are 7 ODIS operators and the required threshold is 5. An attacker may compute the pepper for all phone numbers if 5 operators are compromised or corrupt. If 3 are corrupt or taken offline (e.g. by DDoS attack) then an attacker may prevent the rest of the operators from generating the pepper for users.

In the case that a single key is compromised, user data will remain private and the service operational; however, it's important that we can detect and perform a key rotation before the number of keys compromised exceeds $$k$$ or $$m - k + 1$$ (whichever is lower).

## Rotating keys

If a key held by one of the operators is leaked, or if the operator becomes corrupt, a key rotation can allow the group to generate a new set of keys. Once the new keys are in place, operators can destroy their old keys, preventing any use from the compromised key.
Key rotation can also allow new ODIS operators to be added, by creating new keys for all the existing operators as well as the newly added operator.

To rotate keys, a new DKG ceremony must be performed with at least $$k$$ of the $$m$$ original keys.
These newly generated keys will not be compatible with the old keys; however if $$k$$ of the old keys are used, an attacker may still reach the necessary threshold.
Therefore, it's extremely important that all of the old keys are destroyed after a successful key rotation.
This DKG ceremony also provides the opportunity to change the values for $$k$$ and $$m$$, adding or removing operators, or changing the threshold required to compute the OPRF.
Note that this process for key rotation does not change the public key the client uses to [verify](#verification) the results.

## Blinding

When a client queries ODIS to get an OPRF evaluation, the client first blinds the phone number locally using a secret one-time key.
This blinding process preserves the privacy of underlying message (e.g. a mobile number or password) such that ODIS nodes won't learn any of the user's sensitive information.
In addition to protecting the user's privacy, it reduces the risk of targeted censorship.
ODIS operators compute the OPRF against this hidden input value, and return a result which is also hidden from the operators.
After the application receives the response, it unblinds it to receive the final evaluation result.
Note that this blinding process provides privacy to the user _even_ if all of the ODIS operators where corrupted.
This blinding process is what makes the oblivious pseudo random function (OPRF) "oblivious".

## Verification

Query results from ODIS can be verified against the services public key, which is shared with users along with the client library.
By verifying the results, the client can be sure that the service computed the OPRF correctly and that no one could have intercepted and changed the result.

## Combiner

To facilitate the communication needed for the $$k$$ of $$m$$ OPRF evaluation, ODIS includes a combiner service which performs this orchestration for the convenience of wallets and other clients building on Celo.
Like the ODIS operators, the combiner only receives the blinded message and therefore it cannot learn anything about the user's sensitive information.
The combiner also verifies the response from each operator to ensure a corrupt operator cannot affect the resulting pepper.
Clients can additionally verify the response they get from the combiner to ensure the combiner could not have tampered with it.

Anyone can run a combiner, for their own use or for the public.
Currently, cLabs operates one such combiner that may be used by any project building on Celo.

## Rate limiting

As part of its core function, ODIS enforces rate limits on user queries.
Rate limits depend on the application context in which ODIS is being used (e.g. the rate limit is much higher for deriving peppers for phone numbers than for hardening a 6-digit PIN)

### Phone number privacy

The original API, targeted for phone number privacy, enforces a rate limit based on the actions, balance, and verification status or the user on the Celo blockchain.
In order to measure the quota for a given requester, ODIS must check their on-chain account information.
To prove ownership over their account, the POST request contains an Authorization header with the signed message body.
When ODIS nodes receive the request, it authenticates the user by recovering the message signer from the header and comparing it to the value in the message body.

### Domains

In the newer domain separated API, the rate limit can depend on a variety of factors configured to each domain type.
More information about the domains API and the implemented domain types can be found in the respective pages.

- [Domains](/protocol/identity/odis-domain)
- [Sequential Delay Domain](/protocol/identity/odis-domain-sequential-delay-domain)

A full specification of the Domains API can be found in CIP-40.

- [CIP-40](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0040.md)

## Request flow diagram

![request flow diagram](https://storage.googleapis.com/celo-website/docs/ODIS-flow-diagram.svg)

## Architecture

![architecture diagram](https://storage.googleapis.com/celo-website/docs/ODIS-architecture-diagram.svg)

The hosted architecture is divided into two components, the combiner and the signers.
Currently the combiner is a cloud function and the signers are independent NodeJS servers run by the operators.
Both services leverage the [Celo Threshold BLS library](https://github.com/celo-org/celo-threshold-bls-rs) which has been compiled to [a Web Assembly module](https://github.com/celo-org/blind-threshold-bls-wasm).

The combiner and signers maintain some minimal state in a SQL database, mainly related to quota tracking.

For storage of the BLS signing key, the signers currently support three cloud-based keystores: Azure Key Vault, AWS Secret Manager, and Google Secret Manager.
