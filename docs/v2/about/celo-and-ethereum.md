---
title: Differences between Ethereum and Celo
---

import ColoredText from '/src/components/ColoredText';

## Differences between Ethereum and Celo


Celo is designed to be EVM-compatible, meaning that it closely mirrors Ethereum in terms of how contracts are written and executed. Most Solidity smart contracts and Ethereum-based tooling will work seamlessly on Celo without modification. However, Celo includes a few unique features and transaction types that are important to consider when developing on the platform.

## Transaction Types on Celo

### Ethereum Compatible Transaction Types

To achieve a high level of compatibility with Ethereum, Celo supports all relevant Ethereum transaction (tx) types for a Layer 2 solution. The following transaction types are fully compatible with Ethereum and require no changes to client libraries or tooling:

- <ColoredText>[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) (recommended)</ColoredText>, type 2
- <ColoredText>[EIP-2930](https://eips.ethereum.org/EIPS/eip-2930)</ColoredText>, type 1
- <ColoredText>Legacy Ethereum transaction as described in the [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf)</ColoredText>, type 0

### Celo-Specific Transaction Types

In addition to Ethereum-compatible transaction types, Celo introduces Celo-specific tx types that support its Fee Abstraction feature. Fee abstraction allows users to pay transaction fees with tokens other than CELO, making transactions more accessible for users in emerging markets.

- <ColoredText>[CIP-64](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0064.md) (recommended)</ColoredText>, type 123: Introduces support for Celo’s advanced fee abstraction capabilities.
- <ColoredText>[CIP-66](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0066.md) (coming soon)</ColoredText>, type 122: Will further enhance fee abstraction features when it is released.

### Unsupported Transaction Types

#### Ethereuem-Specific Transaction Types

- <ColoredText>EIP-4844</ColoredText> type 3, which provides blobs for data availability on Ethereum, is not currently supported by Celo.

#### Celo-Specific Transaction Types

::: warning
These transactions won't be supported after the L2 update.  
:::

- <ColoredText>[CIP-42](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0042.md)</ColoredText>, type 1254
- <ColoredText>Legacy Celo transaction</ColoredText>, type 0, but with different fields than the Ethereum legacy transactions. 


## Gas and Optimization Differences

While Celo largely mirrors Ethereum’s gas structure, it introduces <ColoredText>[Fee Abstraction](../tools/fee-abstraction)</ColoredText>, which allows users to pay for gas fees in stablecoins like cUSD, making it more user-friendly. Celo uses similar gas costs to Ethereum, but developers should be aware of Celo’s unique optimization techniques to minimize transaction costs. These techniques can differ slightly from Ethereum due to the flexibility provided by Fee Abstraction.


## For More Information
For more details on how to handle these transaction types and any differences between Ethereum and Celo, refer to the documentation on <ColoredText>transaction types</ColoredText> and <ColoredText>Fee Abstraction</ColoredText> on docs.celo.org.
