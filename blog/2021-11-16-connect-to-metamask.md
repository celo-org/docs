---
title: Code Playground -- Metamask
description: Playing with Metamask
slug: code-metamask
authors:
  - name: Josh Crites
    title: Developer Relations, cLabs
    url: https://github.com/critesjosh
    image_url: https://github.com/critesjosh.png
tags: [code playground]
image: https://dl.airtable.com/.attachmentThumbnails/a7e530eb72ac8f30f37c0a3447ef0e7d/72e944da
hide_table_of_contents: false
---

Let's see how we can interact with Metamask from the code playground. We can connect to Metamask, switch networks, add tokens to the Metamask asset list and send them to other accounts.

This post uses a live code editor. Check out [this post](2021-11-15-code-playground.md) to learn more about how it works.

:::tip

Make sure that you have have [Metamask installed](https://metamask.io) in your browser.

:::

## Connect to Metamask

The following example shows how to connect Metamask to this browser page.

:::note

This function will only trigger an action if Metamask is not yet connect to the site. If you've already connected, nothing will happen.

:::

```jsx live
function connect() {
  function connectMetamask() {
    ethereum.request({ method: "eth_requestAccounts" });
  }

  return <button onClick={connectMetamask}>Connect Metamask</button>;
}
```

<!--truncate-->

### Switch Networks

This example shows how you can prompt a user to connect to a specific Celo network. This component renders two buttons, one to connect to Celo mainnet and one to connect to the Alfajores testnet. If you try to connect to a network that you are already connected to, nothing happens.

Try it out:

```jsx live
function MetamaskSwitchNetwork() {
  const NETWORK_PARAMS = {
    chainName: "Celo",
    nativeCurrency: {
      name: "Celo",
      symbol: "CELO",
      decimals: 18,
    },
  };

  const MAINNET_PARAMS = {
    ...NETWORK_PARAMS,
    chainId: "0xa4ec", // 42220
    rpcUrls: ["https://forno.celo.org"],
    blockExplorerUrls: ["https://explorer.celo.org/"],
  };

  const ALFAJORES_PARAMS = {
    ...NETWORK_PARAMS,
    chainId: "0xaef3", // 44787
    rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
    blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org/"],
  };

  function addMainnet() {
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [MAINNET_PARAMS],
    });
  }

  function addAlfajores() {
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [ALFAJORES_PARAMS],
    });
  }

  return (
    <div>
      <button onClick={addMainnet}>Connect to Celo Mainnet</button>
      <br />
      <button onClick={addAlfajores}>Connect to Alfajores Testnet</button>
      <br />
    </div>
  );
}
```

### Add Tokens

The following code example shows how you can add the cUSD token on the Alfajores testnet to Metamask. To add other tokens, just update the parameter options. You can read more about the Metamask API [here](https://docs.metamask.io/guide/rpc-api.html#wallet-watchasset).

```jsx live
function MetamaskAddToken() {
  const TOKEN_PARAMS = {
    type: "ERC20",
    options: {
      address: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
      symbol: "cUSD",
      decimals: 18,
    },
  };

  function addToken() {
    window.ethereum.request({
      method: "wallet_watchAsset",
      params: TOKEN_PARAMS,
    });
  }

  return <button onClick={addToken}>Add cUSD (Alfajores)</button>;
}
```

### Send Tokens

Let's try to send some CELO on Alfajores. Make sure you are connected to the Alfajores testnet, you can double check by clicking the `Connect to Alfajores Testnet` button above again.

Make sure you have some Alfajores CELO to send. If you need some, you can get some from [the faucet here](https://celo.org/developers/faucet).

```jsx live
function MetamaskSendCelo() {
  const TX_PARAMS = {
    to: "0x5038ae19CDf0B623e6e8015249ecF58A1165D653",
    from: ethereum.selectedAddress,
    value: "0x11111111111111",
  };

  async function send() {
    let txID = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [TX_PARAMS],
    });
    console.log(txID);
  }

  return <button onClick={send}>Send CELO (Alfajores)</button>;
}
```

Click the button to send some CELO. Once you click submit, the transaction id will be logged in the browser console!

To send cUSD or interact with any other smart contract, you will have to encode the data and include it in the transaction data field. Libraries like [web3.js](https://web3js.readthedocs.io/en/v1.5.2/) and [contractkit](https://www.npmjs.com/package/@celo/contractkit) make this easier. We will go over using web3.js and contractkit in future posts.
