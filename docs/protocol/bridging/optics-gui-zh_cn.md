---
title: Optics Bridge GUI - gui-zh-cn
description: Sending ETH From Ethereum to Celo
---
# Optics 跨链桥使用指南

## ETH从以太坊跨链到Celo主网

- 首先您需要已经正确安装了小狐狸钱包 [https://metamask.io](https://metamask.io)。
- 准备跨链之前您需要确保账户里有ETH。
- 进入Optics 跨链桥的界面，如下：[Optics Bridge app](https://optics.app/)。
  - 连接小狐狸钱包
  - 点击小狐狸钱包把网络切换至以太坊主网。
  - 在顶部“发送”位置，选择相应的链和链上的代币“以太坊，ETH”。也就是你希望把以太坊上的ETH跨链到Celo上。
  - 接着依次输入跨链的金额、目标链“Celo”、Celo钱包地址（默认已自动输入）。

![setup eth bridge to celo](https://github.com/critesjosh/images/blob/main/optics-gui/setup%20ETH%20bridge%20to%20celo.png?raw=true)

- 点击“交易”，等待小狐狸钱包弹出确认请求。

![send ETH to bridge.png](https://github.com/critesjosh/images/blob/main/optics-gui/send%20ETH%20to%20bridge.png?raw=true)

- 点击“确认”

- 交易确认后，页面会自动跳转到交易历史，可以看到这笔待处理的跨链交易。
  - 鼠标停留在“状态”栏就可以随时查看跨链历史的状态

![WETH to Celo tx history.png](https://github.com/critesjosh/images/blob/main/optics-gui/WETH%20to%20Celo%20tx%20history.png?raw=true)

- 跨链确认后可能不会立即显示在交易历史中，但并不表示交易已失败，请稍等链上同步状态更新，或去以太坊区块链浏览器中再次确认跨链信息。
- ETH跨链完成后，WETH会显示在您指定的Celo钱包地址。

## Celo主网的WETH跨链到以太坊主网

- 首先您需要已经正确安装了小狐狸钱包 [https://metamask.io](https://metamask.io).
- 准备跨链之前您需要确保Celo账户里有WETH[WETH](https://explorer.celo.org/address/0xE919F65739c26a42616b7b8eedC6b5524d1e3aC4/transactions)。
- 进入Optics 跨链桥的界面，如下：
  - 连接小狐狸钱包
  - 点击小狐狸钱包把网络切换至Celo主网。
  - 在顶部“发送”位置，选择相应的链和链上的代币“Celo，WETH”。也就是你希望把Celo上的WETH跨链到以太坊上。
  - 接着依次输入跨链的金额、目标链“以太坊”、以太坊钱包地址（默认已自动输入）。

![setup WETH celo to eth.png](https://github.com/critesjosh/images/blob/main/optics-gui/setup%20WETH%20celo%20to%20eth.png?raw=true)

- 点击“确认”或“交易”，等待小狐狸钱包弹出请求允许Optics 跨链桥为您转出WETH。

![approve WETH on celo.png](https://github.com/critesjosh/images/blob/main/optics-gui/approve%20WETH%20on%20celo.png?raw=true)

- 确认后，小狐狸钱包弹出请求为您转出WETH。

![send WETH from celo to ETH.png](https://github.com/critesjosh/images/blob/main/optics-gui/send%20WETH%20from%20celo%20to%20ETH.png?raw=true)

- 跨链确认后可能不会立即显示在交易历史中，但并不表示交易已失败，请稍等链上同步状态更新，或去Celo区块链浏览器中再次确认跨链信息。
- 等待Optics跨链完成后，ETH会显示在您指定的以太坊钱包地址。

## Celo主网资产跨链到Polygon(Matic)

Celo主网资产跨链到Polygon(Matic)上的过程与Celo和以太坊主网间跨链一致，步骤如下：

- 首先您需要已经正确安装了小狐狸钱包 [https://metamask.io](https://metamask.io)。
- 接着将Celo主网和Polygon(Matic)主网添加到小狐狸钱包，Celo主网信息、Polygon(Matic)主网信息如下图所示：
- [Add the Celo network to Metamask](../../../getting-started/wallets/using-metamask-with-celo/manual-setup.md)

![add Celo to MM.png](https://github.com/critesjosh/images/blob/main/optics-gui/add%20Celo%20to%20MM.png?raw=true)

- [Add Polygon to Metamask](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/#configure-polygon-on-metamask)

![add polygon network to MM.png](https://github.com/critesjosh/images/blob/main/optics-gui/add%20polygon%20network%20to%20MM.png?raw=true)

- 准备跨链之前您需要确保Celo账户里有资产。
- 进入Optics 跨链桥的界面，如下：
  - 连接小狐狸钱包
  - 点击小狐狸钱包把网络切换至Celo主网。
- 接着依次输入跨链的金额、目标链“Polygon(Matic)”、钱包地址（默认已自动输入）。

![setup CELO to Polygon](https://github.com/critesjosh/images/blob/main/optics-gui/setup%20CELO%20to%20polygon.png?raw=true)

- 允许Optics跨链桥进行交易。

![approve optics to spend CELO.png](https://github.com/critesjosh/images/blob/main/optics-gui/approve%20optics%20to%20spend%20CELO.png?raw=true)

- 点击确认通过Optic跨链交易Celo

![send celo to polygon.png](https://github.com/critesjosh/images/blob/main/optics-gui/send%20celo%20to%20polygon.png?raw=true)

- 您可以交易历史中查看记录
  - 鼠标停留在“状态”栏就可以随时查看跨链历史的状态

![celo to polygon tx history.png](https://github.com/critesjosh/images/blob/main/optics-gui/celo%20to%20polygon%20tx%20history.png?raw=true)

- 跨链确认后可能不会立即显示在交易历史中，但并不表示交易已失败，请稍等链上同步状态更新，或去Celo区块链浏览器中再次确认跨链信息。
- 等待Optics跨链完成后，ETH会显示在您指定的Polygon(Matic)钱包地址。
