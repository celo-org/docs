---
title: Celo ContractKit
description: Overview of ContractKit, its features, purpose, and resources to help you get started.
slug: /developer-guide/contractkit
---

import PageRef from '@components/PageRef'

# ContractKit

Overview of ContractKit, its features, purpose, and resources to help you get started.

---

## What is ContractKit?

ContractKit is a library to help developers and validators to interact with the Celo blockchain and is well suited to developers looking for an easy way to integrate Celo Smart Contracts within their applications.

Contractkit includes common functionality to make it easier to get started building.

**What you can do?**

[ContractKit](../community/release-process/base-cli-contractkit-dappkit-utils) supports the following functionality:

- Connect to a node
- Access Web3 object to interact with node's JSON RPC API
- Send Transaction with Celo's extra fields: (feeCurrency, gatewayFeeRecipient, and gatewayFee)
- Simple interface to interact with CELO and cUSD
- Simple interface to interact with Celo Core contracts
- Local sign transactions
- Utilities
- Query on-chain identifier for a phone number

<PageRef url="/developer-guide/contractkit/setup" pageName="Setup"/>

<PageRef url="/developer-guide/contractkit/usage" pageName="Using the kit"/>
