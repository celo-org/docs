---
title: Celo General Integration Information
description: General information about integrations regardless of your service or use case.
---

# General

This document provides general information about integrating with the Celo network, applicable to various services and use cases.

---

import ColoredText from '/src/components/ColoredText';


## Accessing the Chain

There are several ways to access chain data:

### Forno

<ColoredText>Forno</ColoredText> is a hosted node service that allows users to interact with the Celo network without running their own node. It can be used as an `Http Provider` with the Celo [`ContractKit`](../../tools/libraries-and-sdks/sdks/contractkit/overview.md).

Since Forno is a public node, you must sign transactions locally with your private key, as Forno does not store them. However, `ContractKit` will manage this process for you.

:::warning
Forno should not be used in production. 
:::

Forno networks:

```
Alfajores = 'https://alfajores-forno.celo-testnet.org'

Baklava = 'https://baklava-forno.celo-testnet.org'

Mainnet = 'https://forno.celo.org'
```

### Blockscout

We also expose data on the cLabs run blockscout instance. Blockscout itself exposes an API.

```
Alfajores = 'https://alfajores-blockscout.celo-testnet.org'

Baklava = 'https://baklava-blockscout.celo-testnet.org'

Mainnet = 'https://explorer.celo.org/'
```
