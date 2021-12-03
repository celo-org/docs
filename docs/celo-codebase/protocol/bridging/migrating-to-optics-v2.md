---
title: Migrating to Optics v2
description: How to migrate tokens from Optics v1 to v2.

---

# Migrating to Optics v2

This tutorial will guide you from Optics v1 to Optics v2.


---

The v2 Optics Bridge is live! The launch of v2 was announced in [this post to the Celo Forum](https://forum.celo.org/t/optics-v2-is-live/2554).

Due to issues highlighted in an earlier [Celo Forum post](https://forum.celo.org/t/optics-recovery-mode/2452/34), tokens bridged using [Optics v1 Bridge](https://optics.app) should be migrated to unaffected tokens or to Optics v2 tokens.

You have two migration options:

[Option 1](#option-1): You can swap your affected v1 tokens to a token unaffected by v1 on Celo using Ubeswap, Mobius, or Sushiswap, then swap those tokens for Optics v2 tokens. Please note that as more tokens are bridged out of v1, it will become harder and possibly more expensive to swap your tokens.



* 1a &mdash; [Swap Affected Token for Unaffected Token](#1a---swap-affected-tokens-for-unaffected-tokens)
* 1b &mdash; [Swap Unaffected Tokens for Optics v2 Tokens](#1b---swap-unaffected-tokens-for-optics-v2-tokens)

[Option 2](#option-2): You can bridge your affected v1 tokens to Ethereum or Polygon, and then back to Celo over the Optics v2 Bridge.



* 2a &mdash; [Bridge Affected Tokens Out and Back](#2a---bridge-affected-tokens-out-and-back)
* 2b &mdash; [Bridge Back to Celo](#2b---bridge-back-from-ethereum-to-celo-using-optics-v2)

Depending on the available liquidity on AMMs, gas fees on the Ethereum network, and the total amount of tokens to be migrated, and the amount of effort you’re willing to spend you must 

choose whichever option makes the most sense.


---


## Option 1

### 1a - Swap Affected Tokens for Unaffected Tokens

You can migrate to Optics v2 by first swapping affected tokens for unaffected tokens like cUSD, cEUR, CELO, cBTC, or cETH.

Swapping helps you save on gas fees from bridging out and bridging back to Celo.

There are several AMMs you may use to perform these swaps: Mobius, Ubeswap, and Sushiswap are the primary methods for performing these swaps on the Celo network.


#### [Mobius](https://mobius.money) 



* cUSDC (Optics) → cUSD
* wETH (Optics) → cETH
* wBTC (Optics) → cBTC

_cETH and cBTC tokens may be unwrapped by visiting wrapped.com. At this time, only institutions and accredited investors may apply for an account. For others, they will be offering OTC unwrapping in early December 2021._


#### [Sushi](https://sushi.com) 

You can use Sushi to swap the following pairs:



* wETH (Optics) → cUSD
* wETH (Optics) → cEUR 
* wETH (Optics) → CELO
* DAI (Optics) → cUSD


#### [Ubeswap](https://ubeswap.org) 

You can use Ubeswap to swap the following pairs:



* TFBX (Optics) → UBE → cUSD
* CRV (Optics) → cUSD
* AAVE (Optics) → cUSD
* SUSHI (Optics) → cUSD
* USDC (Optics) → CELO
* WBTC (Optics) → cUSD
* WBTC (Optics) → CELO
* WETH (Optics) → cUSD
* WETH (Optics) → CELO

:::warning

As liquidity on v1 pools is removed, the market depth will decrease and the price impact for making these swaps will increase dramatically. Pay close attention to slippage, price impact, and overall cost when making a swap.

:::


---


### 1b - Swap Unaffected Tokens for Optics v2 Tokens

As Optics v2 Liquidity Pools come online on Mobius, Sushi, and Ubeswap you may swap your cUSD, cEUR, CELO, cBTC, cETH for wBTC, wETH and other v2 tokens.

To find a list of tokens supported by Optics v2, you may visit Optics v2, [https://optics.app](https://optics.app).



* Connect using Metamask
* Tap or click on your wallet address
* View the list of available v2 tokens and their smart contract addresses.



![alt_text](/img/doc-images/migrating-optics-v2/token-list.png "A list of tokens available on Optics v2 web UI")



---


# Option 2

### 2a - Bridge Affected Tokens Out and Back


#### Bridge Tokens from Celo back to Ethereum or Polygon using Optics v1

You may send wETH (Optics), wBTC (Optics), DAI, USDC  (Optics), TFBX, SUSHI, CRV, AAVE, or other tokens back to Ethereum by using the original Optics v1 interface.



* Install Metamask from [metamask.io](https://metamask.io/)
* Make sure you have the desired token in your Celo account
* Go to the [Optics Bridge v1 app](https://old.optics.app/)
    * Connect **Metamask**
    * Make sure Metamask is connected to the **Celo network**
    * In the **From** section, select the desired token on **Celo**. This indicates that you want to send the desired token currently on Celo.
    * Enter the **amount**, **destination chain** (Ethereum in this case), and **destination address**. The sending address is filled in by default.



![alt_text](/img/doc-images/migrating-optics-v2/weth-to-ethereum.png "An example, bridging WETH from Celo to Ethereum")




* Click **Bridge** and confirm the transaction from the MetaMask Notification. This approves the Optics Bridge to send WETH on your behalf.


![alt_text](/img/doc-images/migrating-optics-v2/connect-metamask.png "An example, connecting metamask")




* Once the approval transaction is confirmed, Metamask will ask for you to confirm the desired token transfer to the bridge. Select **Confirm**.



![alt_text](/img/doc-images/migrating-optics-v2/confirm-transaction.png "An example, confirming a bridging transaction")




* Wait for Optics to send your assets to the destination network

:::note

Once your transaction is approved your transaction details may not appear in the transaction history immediately. This does not mean that your transaction wasn’t successful. If you don’t see your transaction details, check a block explorer of the source network to verify that your transaction to the bridge was successful.

:::


### 2b - Bridge back from Ethereum to Celo using Optics v2

Next, bridge your Ethereum network tokens back to Celo using Optics v2 will follow the same path as v1. v2 smart contract representations will be different from v1.



* Install Metamask from [metamask.io](https://metamask.io/)
* Check that you have the desired token in your account
* Go to the [Optics Bridge v2](https://optics.app/)
    * Connect **Metamask**
    * Make sure Metamask is connected to **Ethereum Mainnet**.
    * In the **From** section, select the desired token on **Ethereum**. This indicates that you want to send the desired token that is currently on Ethereum.
    * Enter the **amount**, **destination chain** (Celo in this case), and **destination address**. The sending address is filled in by default.


![alt_text](/img/doc-images/migrating-optics-v2/ethereum-to-celo.png "An example, bridging Eth from Ethereum to Celo")


* Click **Bridge** and confirm the transaction using the MetaMask Notification


![alt_text](/img/doc-images/migrating-optics-v2/estimated-gas.png "An example, confirming transaction from Ethereum to Celo")




* Click **Confirm**
* Once your transaction is confirmed, you will be taken to the Transaction History tab where you can see your pending transactions through the bridge
    * You can view the status of the transfer by mousing over the **Status** of the transaction



![alt_text](/img/doc-images/migrating-optics-v2/transaction-history.png "An example, of Transaction history using Optics")




* Wait for the desired token to be bridged. Your desired token will show up at the specified account address when bridging is complete.

:::note

Once your transaction is approved your transaction details may not appear in the transaction history immediately. This does not mean that your transaction wasn’t successful. If you don’t see your transaction details, check a block explorer of the source network to verify that your transaction to the bridge was successful.

:::
