---
title: Optics Bridge GUI
description: How to send ETH From Ethereum to Celo using the Optics Bridge GUI.
---

# Optics Bridge GUI

How to send ETH From Ethereum to Celo using the Optics Bridge GUI.

---

:::tip

Other translations: [zh_cn](/protocol/bridge/optics-gui-zh-cn), [kr](/protocol/bridge/optics-gui-kr)

:::

## Sending ETH From Ethereum to Celo

- Install Metamask from [https://metamask.io](https://metamask.io).
- Make sure you have ETH in your account.
- Go to the [Optics Bridge app](https://optics.app/).
  - Connect Metamask
  - Make sure Metamask is connected to Ethereum Mainnet.
  - In the top **From** section, Select “ETH on Ethereum”. This indicates that you want to send the ETH asset that is currently on Ethereum.
  - Enter the amount, destination chain (Celo in this case), and destination address. The sending address is filled in by default.

![setup eth bridge to celo](https://github.com/critesjosh/images/blob/main/optics-gui/setup%20ETH%20bridge%20to%20celo.png?raw=true)

- Click “Bridge”. Metamask will pop up asking for confirmation.

![send ETH to bridge.png](https://github.com/critesjosh/images/blob/main/optics-gui/send%20ETH%20to%20bridge.png?raw=true)

- Click “Confirm”.

- Once your transaction is confirmed, you will be taken to the Transaction History tab where you can see your pending transactions through the bridge.
  - You can view the status of the transfer by mousing over the “Status” of the transaction.

![WETH to Celo tx history.png](https://github.com/critesjosh/images/blob/main/optics-gui/WETH%20to%20Celo%20tx%20history.png?raw=true)

- Once your transaction is approved your transaction details may not appear in the transaction history immediately. This does not mean that your transaction wasn’t successful. If you don’t see your transaction details, check a block explorer of the source network to verify that your transaction to the bridge was successful.
- Wait for your ETH to be bridged. WETH will show up at the specified account address when bridging is complete.

## Sending WETH from Celo to Ethereum

- Install Metamask from [https://metamask.io](https://metamask.io).
- Make sure you have [WETH](https://explorer.celo.org/address/0xE919F65739c26a42616b7b8eedC6b5524d1e3aC4/transactions) in your Celo account.
- Go to the Optics Bridge app.
  - Connect Metamask.
  - Make sure Metamask is connected to the Celo network.
  - In the top **From** section, Select “WETH on Celo”. This indicates that you want to send the WETH asset that is currently on Celo.
  - Enter the amount, destination chain (Ethereum in this case), and destination address. The sending address is filled in by default.

![setup WETH celo to eth.png](https://github.com/critesjosh/images/blob/main/optics-gui/setup%20WETH%20celo%20to%20eth.png?raw=true)

- Click “Bridge”. Metamask will pop up asking for you to approve the Optics Bridge to send WETH on your behalf.

![approve WETH on celo.png](https://github.com/critesjosh/images/blob/main/optics-gui/approve%20WETH%20on%20celo.png?raw=true)

- Once the approval transaction is confirmed, Metamask will pop up asking for you to confirm the WETH transfer to the bridge.

![send WETH from celo to ETH.png](https://github.com/critesjosh/images/blob/main/optics-gui/send%20WETH%20from%20celo%20to%20ETH.png?raw=true)

- Once your transaction is approved your transaction details may not appear in the transaction history immediately. This does not mean that your transaction wasn’t successful. If you don’t see your transaction details, check a block explorer of the source network to verify that your transaction to the bridge was successful.
- Wait for Optics to send your assets to the destination network.

## Sending Assets from Celo to Polygon

We demo how to send assets from Celo to Polygon, but the process is the same for sending between other networks as well.

- Install Metamask from [https://metamask.io](https://metamask.io).
- [Add the Celo network to Metamask](/wallet/metamask/setup)

![add Celo to MM.png](https://github.com/critesjosh/images/blob/main/optics-gui/add%20Celo%20to%20MM.png?raw=true)

- [Add Polygon to Metamask](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/#configure-polygon-on-metamask)

![add polygon network to MM.png](https://github.com/critesjosh/images/blob/main/optics-gui/add%20polygon%20network%20to%20MM.png?raw=true)

- Make sure you have Celo assets to send.
- Go to the Optics Bridge app.
  - Connect metamask
  - Make sure metamask is connected to the Celo network
- Enter the amount, destination chain (Polygon in this case) and destination address. The sending address is filled by default.

![setup CELO to Polygon](https://github.com/critesjosh/images/blob/main/optics-gui/setup%20CELO%20to%20polygon.png?raw=true)

- Allow the bridge application to send CELO on your behalf.

![approve optics to spend CELO.png](https://github.com/critesjosh/images/blob/main/optics-gui/approve%20optics%20to%20spend%20CELO.png?raw=true)

- Approve the transaction to send CELO to the Optics bridge.

![send celo to polygon.png](https://github.com/critesjosh/images/blob/main/optics-gui/send%20celo%20to%20polygon.png?raw=true)

- You can view your transaction history in the corresponding tab.
  - You can view the status of the transfer by mousing over the “Status” of the transaction.

![celo to polygon tx history.png](https://github.com/critesjosh/images/blob/main/optics-gui/celo%20to%20polygon%20tx%20history.png?raw=true)

- Once your transaction is approved your transaction details may not appear in the transaction history immediately. This does not mean that your transaction wasn’t successful. If you don’t see your transaction details, check a block explorer of the source network to verify that your transaction to the bridge was successful.
- Wait for Optics to send your assets to the destination network.
