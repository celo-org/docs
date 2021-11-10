---
title: MetaMask Manual Setup on Celo
description: How to manually add a Celo network to your existing MetaMask wallet. 
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Manual Setup

How to manually add a Celo network to your existing MetaMask wallet. 

___

:::tip

If you're a dApp developer and want to set up your wallet this programmatically, view [programmatic setup](programmatic-setup).

:::


## **Setup**

Make sure to have MetaMask installed. See [here](https://metamask.io/download.html) to download. Then, follow the instructions to create an account. Make sure to save your seed phrase safely!

## **Adding a Celo Network to MetaMask**

1. Open MetaMask, click your profile image on the top right corner, and then click "Settings". Next, scroll down to "Networks" and click. Finally, press the "Add Network" button.
2. Fill in the following values depending on which Celo network you would like to connect to: Alfajores, Baklava, or Mainnet.


<Tabs
    defaultValue='celo'
    values={[
        {label: 'Celo Mainnet', value: 'celo'},
        {label: 'Alfajores Testnet', value: 'alfajores'},
        {label: 'Baklava Testnet', value: 'baklava'},
    ]}
>
<TabItem value='celo'>

```text
Network Name: Celo (Mainnet)
New RPC URL: https://forno.celo.org
Chain ID: 42220
Currency Symbol (Optional): CELO
Block Explorer URL (Optional): https://explorer.celo.org
```

</TabItem>
<TabItem value='alfajores'>

```text
Network Name: Celo (Alfajores Testnet)
New RPC URL: https://alfajores-forno.celo-testnet.org
Chain ID: 44787
Currency Symbol (Optional): CELO
Block Explorer URL (Optional): https://alfajores-blockscout.celo-testnet.org
```

</TabItem>
<TabItem value='baklava'>

```text
Network Name: Celo (Baklava Testnet)
New RPC URL: https://baklava-forno.celo-testnet.org
Chain ID: 62320
Currency Symbol (Optional): CELO
Block Explorer URL (Optional): https://baklava-blockscout.celo-testnet.org
```

</TabItem>
</Tabs>

3. Press "Save". The Celo network you just configured should now show up under MetaMask's "Networks" dropdown list.

## **Adding Tokens \(e.g. cUSD, cEUR\)**

1. From MetaMask's Home screen, click on "Add Token" in the "Assets" tab.
2. Click "Custom Token", and fill in the value for "Token Contract Address" for the token you'd like to add. The "Token Symbol" and "Decimals of Precision" should be filled in automatically.

The following are examples for cUSD and cEUR.

<Tabs
    defaultValue='celo'
    values={[
        {label: 'Celo Mainnet', value: 'celo'},
        {label: 'Alfajores Testnet', value: 'alfajores'},
        {label: 'Baklava Testnet', value: 'baklava'},
    ]}
>
<TabItem value='celo'>

* Token Contract Address for cUSD: `0x765de816845861e75a25fca122bb6898b8b1282a`
* Token Contract Address for cEUR: `0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73`

</TabItem>
<TabItem value='alfajores'>

* Token Contract Address for cUSD: `0x874069fa1eb16d44d622f2e0ca25eea172369bc1`
* Token Contract Address for cEUR: `0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f`

</TabItem>
<TabItem value='baklava'>

* Token Contract Address for cUSD: `0x62492A644A588FD904270BeD06ad52B9abfEA1aE`
* Token Contract Address for cEUR: `0xf9ecE301247aD2CE21894941830A2470f4E774ca`

</TabItem>
</Tabs>

## Sending assets to Metamask

Celo addresses have the same format as Ethereum addresses, so copying and pasting an address into the "to" field should work for most applications.

:::warning

If you are scanning a QR code to populate transaction information some applications may give you an error. For example, Metamask prefixes addresses in QR codes with "ethereum:". This can cause problems when trying to send CELO to Metamask when scanning your Metamask address QR code with the Coinbase mobile application. To avoid this issue, simply copy and paste the address rather than use the QR code scanner.

:::
