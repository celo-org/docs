---
title: Programmatic Setup wallet for Celo users
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

## Adding Celo Network

To add a Celo Network to your dApp.

Here is a JavaScript snippet you can use:

```jsx
await window.ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [<INSERT_NETWORK_PARAMS_HERE>],
});
```

Where it says `INSERT_NETWORK_PARAMS_HERE`, please replace with any of the following constants, depending on which network you'd like to connect to.

### Mainnet

```jsx
const CELO_PARAMS = {
  chainId: "0xa4ec",
  chainName: "Celo",
  nativeCurrency: { name: "Celo", symbol: "CELO", decimals: 18 },
  rpcUrls: ["https://forno.celo.org"],
  blockExplorerUrls: ["https://explorer.celo.org/"],
  iconUrls: ["future"],
};
```

### Alfajores

```jsx
const ALFAJORES_PARAMS = {
  chainId: "0xaef3",
  chainName: "Alfajores Testnet",
  nativeCurrency: { name: "Alfajores Celo", symbol: "A-CELO", decimals: 18 },
  rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
  blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org/"],
  iconUrls: ["future"],
};
```

## Adding Tokens \(e.g. cUSD, cEUR\)

To watch an asset on a Celo netowork \(e.g. cUSD, cEUR\) in your dApp.

Here is a JavaScript snippet you can use:

```jsx
await window.ethereum.request({
  method: "wallet_watchAsset",
  params: {
    type: "ERC20",
    options: {
      address: "<INSERT_ADDRESS_HERE>",
      symbol: "<INSERT_SYMBOL_HERE>",
      decimals: 18,
    },
    iconUrls: ["future"],
  },
});
```

- Where it says `INSERT_ADDRESS_HERE`, please replace with any of the following constants, depending on which network and which asset you'd like to connect to.
- Where it says `INSERT_SYMBOL_HERE`, please replace with the correct symbol for the asset you'd like to watch. For Celo Dollars, it's `cUSD` and for Celo Euros, it's `cEUR`.

:::warning

We strongly suggest that you disable your dApp's functionality when a wallet is connected to a non-Celo network. MetaMask has an API for determining what network/chain you're connected to. [See here](https://docs.metamask.io/guide/ethereum-provider.html#methods) for more documentation around that.

:::

## Using Fee Abstraction (only Valora and MiniPay)

Celo allows paying gas fees in currency other than the native currency using Fee Abstraction.

Valora and MiniPay are Celo native wallet which support Fee Abstraction, learn more about how to use it [here](/tools/fee-abstraction).
