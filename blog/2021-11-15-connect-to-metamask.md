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
image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: false
---

Let's see how we can interact with Metamask from the code playground. We can connect to Metamask, switch networks and add tokens to the Metamask asset list.

<!--truncate-->

## Connect to Metamask

The following example shows how to connect Metamask to this browser page.

:::note

This function will only trigger an action if Metamask is not yet connect to the site. If you've already connected, nothing will happen.

:::

```jsx live
function connect(){

    async function connectMetamask(){
      await window.ethereum.enable()
    }

    return (
      <div>
        <button onClick={connectMetamask}>Connect Metamask</button><br/>
      </div>
    )
}
```

### Switch Networks

This example shows how you can prompt a user to connect to a specific Celo network. This component renders two buttons, one to connect to Celo mainnet and one to connect to the Alfajores testnet. If you try to connect to a network that you are already connected to, nothing happens.

Try it out:

```jsx live
function MetamaskUtils(){

    const NETWORK_PARAMS = { 
      chainName: 'Celo', 
      nativeCurrency: { 
        name: 'Celo', 
        symbol: 'CELO', 
        decimals: 18 
      } 
    }

    const MAINNET_PARAMS = {
      ...NETWORK_PARAMS,
      chainId: '0xa4ec', // 42220
      rpcUrls: ['https://forno.celo.org'], 
      blockExplorerUrls: ['https://explorer.celo.org/']
    }

    const ALFAJORES_PARAMS = {
      ...NETWORK_PARAMS,
      chainId: '0xaef3', // 44787
      rpcUrls: ['https://alfajores-forno.celo-testnet.org'], 
      blockExplorerUrls: ['https://alfajores-blockscout.celo-testnet.org/']
    }

    async function addMainnet(){
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [MAINNET_PARAMS],
        });      
    }

    async function addAlfajores(){
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [ALFAJORES_PARAMS],
        });         
    }

    return (
      <div>
        <button onClick={addMainnet}>Connect to Celo Mainnet</button><br/>
        <button onClick={addAlfajores}>Connect to Alfajores Testnet</button><br/>
      </div>
    )
}
```

### Add Tokens

```jsx live
function MetamaskUtils(){
    const CUSD_PARAMS = {
      type: 'ERC20',
      options: {
        address: '0x765DE816845861e75A25fCA122bb6898B8B1282a',
        symbol: 'cUSD',
        decimals: 18
      }
    }

    async function addToken(){
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: CUSD_PARAMS
        });    
    }

    return (
      <div>
        <button onClick={connectMetamask}>Connect Metamask</button><br/>
        <button onClick={addNetwork}>Connect to Celo Mainnet</button><br/>
        <button onClick={addToken}>Add cUSD (mainnet)</button>
      </div>
    )
}
```

```jsx live

function test(){

  const web3 = new Web3('https://alfajores-forno.celo-testnet.org')

  console.log(web3)

  return (
    <p></p>
  )
}

```

Check out this post to see how you can initiate Metamask transactions using web3.js.
