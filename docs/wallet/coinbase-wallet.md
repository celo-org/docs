---
title: Coinbase Wallet Programmatic Setup on Celo
description: How dApp developers can use Coinbase Wallet to interact with the Celo network.
---

## Adding a Celo Network to Coinbase Wallet

To add a Celo Network to your dApp, you can use Coinbase's RPC API's `wallet_addEthereumChain` method. \([See documentation](https://docs.cloud.coinbase.com/wallet-sdk/docs/switching-chains#switching-or-adding-alternative-evm-compatible-chains)\).

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
  blockExplorerUrls: ["https://celo-alfajores.blockscout.com/"],
  iconUrls: ["future"],
};
```

## Adding Tokens \(e.g. cUSD, cEUR\)

To watch an asset on a Celo netowork \(e.g. cUSD, cEUR\) in your dApp, you can use MetaMask's RPC API's `wallet_watchAsset` method. \([See documentation](https://docs.cloud.coinbase.com/wallet-sdk/docs/tracking-assets#calling-wallet_watchasset)\).

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

View available token addresses for Celo assets to add to Coinbase Wallet [here](/contracts/token-contracts).
