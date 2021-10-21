---
title: ODIS Domains
slug: /celo-codebase/protocol/odis/domains
---
import PageRef from '@components/PageRef'

In order to support use cases such as password hardening, and future applications, ODIS implements Domains.
A Domain instance is structured message sent to ODIS along with the secret blinded message.
Unlike the blinded message, the Domain instance is visible to the ODIS service and allows the client to specify context information about their request.
This context information is used to decide what rate limit and/or authentication should be applied to the request, and is combined into the result to ensure output is unique to the context.

As an example, a Domain for hashing an account password might specify an application username of "vitalik.eth" (context) and a cap of 10 password attempts (rate-limiting parameter).
These would be combined with the user's password (blinded input) in the OPRF, which acts as a one-way function, to form the final output.
As a result the rate limiting parameters, in this case allowing a total of 10 queries, can be set to arbitrary values but are effectively binding once chosen.
This allows the parameters to be tuned to the needs of the individual user or application.

Queries with distinct domain specifiers will receive uncorrelated output.
For example, output from ODIS with the phone number domain and message `18002738255` will be distinct from and unrelated to the output when requesting with a password domain and message `18002738255`.

In order to make this scheme flexible, allowing for user-defined tuning of rate-limits and the introduction of new rate limiting and authorization rules in the future, domains are defined as serializeable structs.
New domain types, with associated rate-limiting rules, may be added in the future to meet the needs of new applications.

## Specification

A full specification of Domains and the related ODIS APIs is available in CIP-40.

<PageRef url="https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0040.md" pageName="CIP-40" />

## Implemented Domains

<PageRef url="/celo-codebase/protocol/odis/domains/sequential-delay-domain" pageName="Sequential Delay Domain" />
