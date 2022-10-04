---
title: Optics Add New Token
description: How to add a new token to Optics v2.
---

import YouTube from '@components/YouTube';
import ImageWrapper from '@components/ImageWrapper'

# Add New Token to Optics

How to add a new token to Optics v2.

---

## Getting Started

Optics is a cross-chain communication system designed for use on any EVM chain. The Token Bridge xApp (an application built on top of Optics) facilitates the transfer of tokens between chains. Adding a new token to the Optics Bridge UI can be done at any time using the [optics-bridge-gui-community](https://github.com/celo-org/optics-bridge-gui-community) GitHub repository.

:::info

View [PR#20](https://github.com/celo-org/optics-bridge-gui-community/pull/20/commits/e33b7692b346993c323426418b9b6bba0f5c2096) to view an example of the updates required to add the PACT token.

:::

### Steps to Add a New Token

- **Step 1:** Add Token Identifier
- **Step 2:** Add Token Symbol
- **Step 3:** Add Representation Address

## Add Token Identifier

Add the Token Identifier in `src/config/tokens.environment.ts`.

- **Testnet:** [tokens.dev.ts](https://github.com/celo-org/optics-bridge-gui-community/blob/new-deployment/src/config/tokens.dev.ts)
- **Mainnet:** [tokens.mainnet.ts](https://github.com/celo-org/optics-bridge-gui-community/blob/new-deployment/src/config/tokens.main.ts)

```jsx
export type TokenIdentifier = {
  domain: string | number
  id: string
}

export type mainTokenName =
  'TOKEN'

// IMPORTANT make name same as tokens[token].symbol value
const TOKEN: TokenIdentifier = {
  domain: 'celo',
  id: ''
}

export default {
  TOKEN,
}
```

## Add Token Details

Add the token details to the token list in `src/config/config.environment.ts`

- **Testnet:** [config.dev.ts](https://github.com/celo-org/optics-bridge-gui-community/blob/new-deployment/src/config/config.dev.ts)
- **Mainnet:** [config.main.ts](https://github.com/celo-org/optics-bridge-gui-community/blob/new-deployment/src/config/config.main.ts)
- **Community Testnet:** [config.stagingCommunity.ts](https://github.com/celo-org/optics-bridge-gui-community/blob/new-deployment/src/config/config.stagingCommunity.ts)
- **Community Mainnet:** [config.mainnetCommunity.ts ](https://github.com/celo-org/optics-bridge-gui-community/blob/new-deployment/src/config/config.mainnetCommunity.ts)

```jsx
import TOKEN from '../assets/token-logos/token.png'

import mainnetTokens from './tokens.main'
import { TokenMetadata, NetworkMetadata } from './config.types'
import representationsMain from './representations.main'

// Add TOKEN details here
export const tokens: { [key: string]: TokenMetadata } = {
  TOKEN: {
    nativeNetwork: '',
    symbol: '',
    name: '',
    icon: ,
    decimals: ,
    coinGeckoId: '',
    tokenIdentifier: ,
    nativeOnly: ,
    minAmt:
  },
}

```

## Add Representation Addresses

Add the representation addresses in `src/config/representations.environment.ts`.

- **Testnet:** [representations.dev.ts](https://github.com/celo-org/optics-bridge-gui-community/blob/new-deployment/src/config/representations.dev.ts)
- **Mainnet:** [representations.main.ts](https://github.com/celo-org/optics-bridge-gui-community/blob/new-deployment/src/config/representations.main.ts)

```jsx
const ethereum = {
  TOKEN: "",
};

const celo = {
  TOKEN: "",
};

const polygon = {
  TOKEN: "",
};

export default {
  celo,
  ethereum,
  polygon,
};
```
