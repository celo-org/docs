---
title: Wallet Connection Demo
id: wallet-test
---

import WalletConnectWrapper from '@components/WalletConnectWrapper'

## Connect to MetaMask

```jsx live
function MetamaskUtils() {
  const CUSD_PARAMS = {
    type: "ERC20",
    options: {
      address: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
      symbol: "cUSD",
      decimals: 18,
    },
  };

  const CEUR_PARAMS = {
    type: "ERC20",
    options: {
      address: "0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73",
      symbol: "cEUR",
      decimals: 18,
    },
  };

  const CREAL_PARAMS = {
    type: "ERC20",
    options: {
      address: "0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787",
      symbol: "cREAL",
      decimals: 18,
    },
  };

  const NETWORK_PARAMS = {
    chainId: "0xa4ec",
    chainName: "Celo",
    nativeCurrency: {
      name: "Celo",
      symbol: "CELO",
      decimals: 18,
    },
    rpcUrls: ["https://forno.celo.org"],
    blockExplorerUrls: ["https://explorer.celo.org/"],
    iconUrls: ["future"],
  };

  async function connectMetamask() {
    await window.ethereum.enable();
  }

  async function addCUSD() {
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: CUSD_PARAMS,
    });
  }

  async function addCEUR() {
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: CEUR_PARAMS,
    });
  }

  async function addCREAL() {
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: CREAL_PARAMS,
    });
  }

  async function addNetwork() {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [NETWORK_PARAMS],
    });
  }

  return (
    <div>
      <button onClick={connectMetamask}>Connect Metamask</button>
      <br />
      <button onClick={addNetwork}>Connect to Celo Mainnet</button>
      <br />
      <button onClick={addCUSD}>Add cUSD (mainnet)</button>
      <br />
      <button onClick={addCEUR}>Add cEUR (mainnet)</button>
      <br />
      <button onClick={addCREAL}>Add cREAL (mainnet)</button>
    </div>
  );
}
```

```jsx live
function MetamaskUtils() {
  const CUSD_PARAMS = {
    type: "ERC20",
    options: {
      address: "0x874069fa1eb16d44d622f2e0ca25eea172369bc1",
      symbol: "cUSD",
      decimals: 18,
    },
  };

  const CEUR_PARAMS = {
    type: "ERC20",
    options: {
      address: "0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f",
      symbol: "cEUR",
      decimals: 18,
    },
  };

  const CREAL_PARAMS = {
    type: "ERC20",
    options: {
      address: "0xC5375c73a627105eb4DF00867717F6e301966C32",
      symbol: "cREAL",
      decimals: 18,
    },
  };

  const NETWORK_PARAMS = {
    chainId: "0xa4ec",
    chainName: "Celo",
    nativeCurrency: {
      name: "Celo",
      symbol: "CELO",
      decimals: 18,
    },
    rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
    blockExplorerUrls: ["https://explorer.celo.org/"],
    iconUrls: ["future"],
  };

  async function connectMetamask() {
    await window.ethereum.enable();
  }

  async function addCUSD() {
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: CUSD_PARAMS,
    });
  }

  async function addCEUR() {
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: CEUR_PARAMS,
    });
  }

  async function addCREAL() {
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: CREAL_PARAMS,
    });
  }

  async function addNetwork() {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [NETWORK_PARAMS],
    });
  }

  return (
    <div>
      <button onClick={connectMetamask}>Connect Metamask</button>
      <br />
      <button onClick={addNetwork}>Connect to Celo Alfajores Testnet</button>
      <br />
      <button onClick={addCUSD}>Add cUSD (Alfajores Testnet)</button>
      <br />
      <button onClick={addCEUR}>Add cEUR (Alfajores Testnet)</button>
      <br />
      <button onClick={addCREAL}>Add cREAL (Alfajores Testnet)</button>
    </div>
  );
}
```

## Get a Smart contract

```jsx live
```
