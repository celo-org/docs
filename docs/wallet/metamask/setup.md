---
title: MetaMask Programmatic Setup on Celo
description: How dApp developers can use MetaMask to interact with the Celo network.
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

# Programmatic Setup

How dApp developers can use MetaMask to interact with the Celo network.

---

## Adding a Celo Network to MetaMask

To add a Celo Network to your dApp, you can use MetaMask's RPC API's `wallet_addEthereumChain` method. \([See documentation](https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain)\).

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

### Baklava

```jsx
const BAKLAVA_PARAMS = {
  chainId: "0xf370",
  chainName: "Baklava Testnet",
  nativeCurrency: { name: "Baklava Celo", symbol: "B-CELO", decimals: 18 },
  rpcUrls: ["https://baklava-forno.celo-testnet.org"],
  blockExplorerUrls: ["https://baklava-blockscout.celo-testnet.org/"],
  iconUrls: ["future"],
};
```

## Adding Tokens \(e.g. cUSD, cEUR\)

To watch an asset on a Celo netowork \(e.g. cUSD, cEUR\) in your dApp, you can use MetaMask's RPC API's `wallet_watchAsset` method. \([See documentation](https://docs.metamask.io/guide/rpc-api.html#wallet-watchasset)\).

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

:::tip

View available token addresses for Celo assets to add to MetaMask [here](/token-addresses).

:::

:::warning

We strongly suggest that you disable your dApp's functionality when MetaMask is connected to a non-Celo network. MetaMask has an API for determining what network/chain you're connected to. [See here](https://docs.metamask.io/guide/ethereum-provider.html#methods) for more documentation around that.

:::
