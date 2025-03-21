---
title: ODIS Domains
---

import PageRef from '@components/PageRef'

:::tip

Domain API features described here are not deployed to Mainnet ODIS as of April 1, 2022.

:::

In order to support use cases such as password hardening, and future applications, ODIS implements Domains.
A Domain instance is structured message sent to ODIS along with the secret blinded message.
Unlike the blinded message, the Domain instance is visible to the ODIS service and allows the client to specify context information about their request.
This context information is used to decide what rate limit and/or authentication should be applied to the request, and is combined into the result to ensure output is unique to the context.
The Domain instance and blinded message are both passed to the ODIS partially oblivious pseudorandom function (POPRF), which is a new construction extending upon the [OPRF function](/protocol/identity/odis) used in the [phone number privacy service](/protocol/identity/odis-use-case-phone-number-privacy).

As an example, a Domain for hashing an account password might specify an application username of "vitalik.eth" (context) and a cap of 10 password attempts (rate-limiting parameter).
These would be combined with the user's password (blinded input) in the POPRF, which acts as a one-way function, to form the final output.
As a result the rate limiting parameters, in this case allowing a total of 10 queries, can be set to arbitrary values but are effectively binding once chosen.
This allows the parameters to be tuned to the needs of the individual user or application and prevents potential overlap of different use cases.

Queries with distinct domain specifiers will receive uncorrelated output.
For example, output from ODIS with the phone number domain and message `18002738255` will be distinct from and unrelated to the output when requesting with a password domain and message `18002738255`.

In order to make this scheme flexible, allowing for user-defined tuning of rate-limits and the introduction of new rate limiting and authorization rules in the future, domains are defined as serializeable structs.
New domain types, with associated rate-limiting rules, may be added in the future to meet the needs of new applications.

## Specification

A full specification of Domains and the related ODIS APIs is available in CIP-40.

- [CIP-40](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0040.md)

## Implemented Domains

- [Sequential Delay Domain](/protocol/identity/odis-domain-sequential-delay-domain)

## Creating a Domain Type

The Domains interface is designed to be flexible to facilitate new applications for the ODIS POPRF function.
If you have an application that would benefit from a new Domain type and rate limiting ruleset, the first step is to open an extension to the CIP-40 standard.

New Domain types are standardized through a lighter version of the [general CIP process](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0000.md).
Open a PR against the celo-org/celo-proposals repository to add a specification for your new domain to the [CIP-40 extensions folder](https://github.com/celo-org/celo-proposals/tree/master/CIPs/CIP-0040).
As an example for what you should include, take a look at the [specification](https://github.com/celo-org/celo-proposals/blob/master/CIPs/CIP-0040/sequentialDelayDomain.md) for the `SequentialDelayDomain`.
When it is ready for review, contact a [CIP editor](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0000.md#cip-editors) to help get reviews from the ODIS core development team.

Implementing a new Domain type, which includes new rate limiting to be enforced by the ODIS operators, requires an upgrade to the ODIS server implementation.
Once the new domain type is standardized, this implementation can be written and deployed to the staging and production ODIS service operators.
