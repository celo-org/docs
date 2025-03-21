---
title: Phone Number Privacy
---

import PageRef from '@components/PageRef'

Celo's [identity protocol](/protocol/identity) allows users to associate their phone number with one or more addresses on the Celo blockchain.
This allows users to find each other on the Celo network using phone number instead of cumbersome hexadecimal addresses.
The Oblivious Decentralized Identifier Service (ODIS) was created to help preserve the privacy of phone numbers and addresses.

- [ODIS](/protocol/identity/odis)

## Understanding the problem

When a user sends a payment to someone in their phone's address book, the mobile client must look up the identifier for that phone number on-chain to find the corresponding Celo blockchain address.
This address is needed in order to create a payment transaction, and the user may only know the phone number of the person they want to pay.
If cleartext phone numbers were used as identifiers directly on the Celo network, then anyone would be able to associate all phone numbers with blockchain accounts and balances (e.g. After searching for addresses with a high balance, they could look up the associated phone number to [phish](https://wikipedia.org/wiki/Phishing) the account owner).
If instead, the identifier was the hash of the recipient's phone number, attackers would still be able to associate phone numbers with accounts and balances via a [rainbow table attack](https://wikipedia.org/wiki/Rainbow_table).

## The solution

The basis of the solution is to derive a user's identifier from both their phone number and a secret pepper that is provided by the Oblivious Decentralized Identifier Service (ODIS).
In order to associate a phone number with a Celo blockchain address, the mobile wallet first queries ODIS for the pepper.
It then uses the pepper to compute the unique identifier that's used on-chain.

Peppers produced by ODIS are cryptographically strong, and so cannot be guessed in a brute force or rainbow table attack.
ODIS imposes a rate limit controlling how many peppers any individual can request, and so prevents an attacker from scanning a large number of phone numbers in an attempt to compromise user privacy.

### Pepper request rate limiting

ODIS imposes a rate limit on requests for peppers in order to limit the feasibility of rainbow table attacks.
When ODIS receives a request for a pepper, it authenticates the request and ensures the requester has not exceeded their quota.
Since blockchain accounts and phone numbers are not naturally Sybil-resistant (i.e. individuals can have many accounts or phone numbers), ODIS bases request quota on the following factors:

- Requester transaction history
- Requester phone number attestation count and success rate
- Requester account balance

The requirements for these factors are configured to make it prohibitively expensive to scrape large quantities of phone numbers while still allowing typical user flows to remain unaffected.
In particular, it should be possible for a user to look up their contacts in order to send them payments.
