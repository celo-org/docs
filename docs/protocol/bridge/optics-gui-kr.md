---
title: Optics Bridge GUI - Korean
description: Sending ETH From Ethereum to Celo
---

# Sending ETH From Ethereum to Celo

## Ethereum에서 Celo#로 ETH 전송하기

- Install Metamask from [https://metamask.io](https://metamask.io).
- [https://metamask.io](https://metamask.io)에서 메타마스크를 설치합니다.
- Make sure you have ETH in your account.
- 계정에 ETH가 있는지 확인합니다.

- Go to the Optics Bridge app.
- Optics Bridge 앱으로 이동합니다.
  - Connect Metamask
  - 메타마스크 연결
  - Make sure Metamask is connected to Ethereum Mainnet.
  - 메타마스크가 Ethereum Mainnet에 연결되어 있는지 확인합니다.
  - In the top From section, Select “ETH on Ethereum”. This indicates that you want to send the ETH asset that is currently on Ethereum.
  - 상단 섹션에서 "ETH on Ethereum"을 선택합니다. 이는 현재 Ethereum에 있는 ETH 자산을 전송하고자 함을 나타냅니다.
  - Enter the amount, destination chain (Celo in this case), and destination address. The sending address is filled in by default.
  - 금액, 대상 체인(이 경우 Celo) 및 대상 주소를 입력합니다. 발송 주소는 기본적으로 입력되어 있습니다.

![setup eth bridge to celo](https://github.com/critesjosh/images/blob/main/optics-gui/setup%20ETH%20bridge%20to%20celo.png?raw=true)

- Click “Bridge”. Metamask will pop up asking for confirmation.
- "브리지"를 클릭합니다. 메타마스크에서 확인을 요청하는 메시지가 나타납니다.

![send ETH to bridge.png](https://github.com/critesjosh/images/blob/main/optics-gui/send%20ETH%20to%20bridge.png?raw=true)

- Click “Confirm”.
- 확인을 클릭합니다.
- Once your transaction is confirmed, you will be taken to the Transaction History tab where you can see your pending transactions through the bridge.
- 트랜잭션이 확인되면 브리지에서 보류 중인 트랜잭션을 볼 수 있는 트랜잭션 기록 탭으로 이동합니다.
  - You can view the status of the transfer by mousing over the “Status” of the transaction.
  - 트랜잭션의 "상태" 위에 마우스를 놓으면 전송 상태를 볼 수 있습니다.

![WETH to Celo tx history.png](https://github.com/critesjosh/images/blob/main/optics-gui/WETH%20to%20Celo%20tx%20history.png?raw=true)

- Once your transaction is approved your transaction details may not appear in the transaction history immediately. This does not mean that your transaction wasn’t successful. If you don’t see your transaction details, check a block explorer of the source network to verify that your transaction to the bridge was successful.
- 거래가 승인되면 거래 내역이 즉시 나타나지 않을 수 있습니다. 그렇다고 해서 거래가 성공하지 못한 것은 아닙니다. 트랜잭션 세부 정보가 표시되지 않으면 소스 네트워크의 블록 탐색기를 확인하여 브리지로의 트랜잭션이 성공했는지 확인합니다.
- Wait for your ETH to be bridged. WETH will show up at the specified account address when bridging is complete.
- ETH가 연결되기를 기다립니다. 브리징이 완료되면 WETH가 지정된 계정 주소에 표시됩니다.

## Sending WETH from Celo to Ethereum

### Celo에서 Ethereum#으로 WETH를 보내기

- Install Metamask from [https://metamask.io](https://metamask.io).
- [https://metamask.io](https://metamask.io) 메타마스크를 설치합니다.
- Make sure you have [WETH](https://explorer.celo.org/address/0xE919F65739c26a42616b7b8eedC6b5524d1e3aC4/transactions) in your Celo account.
- Celo 계정에 [WETH](https://explorer.celo.org/address/0xE919F65739c26a42616b7b8eedC6b5524d1e3aC4/transactions)가 있는지 확인합니다.
- Go to the Optics Bridge app.
- Optics Bridge 앱으로 이동합니다.
  - Connect Metamask.
  - 메타마스크를 연결합니다.
  - Make sure Metamask is connected to the Celo network.
  - 메타마스크가 Celo 네트워크에 연결되어 있는지 확인합니다.
  - In the top From section, Select “WETH on Celo”. This indicates that you want to send the WETH asset that is currently on Celo.
  - 상단 시작 섹션에서 "WETH on Celo"를 선택합니다. 이는 현재 Celo에 있는 WETH 자산을 전송하고자 함을 나타냅니다.
  - Enter the amount, destination chain (Ethereum in this case), and destination address. The sending address is filled in by default.
  - 금액, 대상 체인(이 경우 기준) 및 대상 주소를 입력합니다. 발송 주소는 기본적으로 입력되어 있습니다.

![setup WETH celo to eth.png](https://github.com/critesjosh/images/blob/main/optics-gui/setup%20WETH%20celo%20to%20eth.png?raw=true)

- Click “Bridge”. Metamask will pop up asking for you to approve the Optics Bridge to send WETH on your behalf.
- "브리지"를 클릭합니다. 메타마스크에서 WETH를 대신 보낼 Optics Bridge를 승인해 달라는 메시지가 나타납니다.

![approve WETH on celo.png](https://github.com/critesjosh/images/blob/main/optics-gui/approve%20WETH%20on%20celo.png?raw=true)

- Once the approval transaction is confirmed, Metamask will pop up asking for you to confirm the WETH transfer to the bridge.
- 승인 거래가 확인되면 메타마스크에서 브리지로 WETH 전송 확인을 요청하는 팝업창이 나타날 것입니다.

![send WETH from celo to ETH.png](https://github.com/critesjosh/images/blob/main/optics-gui/send%20WETH%20from%20celo%20to%20ETH.png?raw=true)

- Once your transaction is approved your transaction details may not appear in the transaction history immediately. This does not mean that your transaction wasn’t successful. If you don’t see your transaction details, check a block explorer of the source network to verify that your transaction to the bridge was successful.
- 거래가 승인되면 거래 내역이 즉시 나타나지 않을 수 있습니다. 그렇다고 해서 거래가 성공하지 못한 것은 아닙니다. 트랜잭션 세부 정보가 표시되지 않으면 소스 네트워크의 블록 탐색기를 확인하여 브리지로의 트랜잭션이 성공했는지 확인합니다.
- Wait for Optics to send your assets to the destination network.
- Optics가 자산을 대상 네트워크로 보낼 때까지 기다립니다.

## Sending Assets from Celo to Polygon#

### 자산을 Celo에서 Polygon#으로 보내기

We demo how to send assets from Celo to Polygon, but the process is the same for sending between other networks as well.

Celo에서 Polygon으로 자산을 보내는 방법을 시연하지만, 다른 네트워크 간 전송 과정도 동일합니다.

- Install Metamask from [https://metamask.io](https://metamask.io/).
- [https://metamask.io](https://metamask.io/)에서 메타마스크를 설치합니다.
- [Add the Celo network to Metamask](/wallet/metamask/setup)
- [Celo 네트워크를 메타마스크에 추가합니다.](/wallet/metamask/setup)

![add Celo to MM.png](https://github.com/critesjosh/images/blob/main/optics-gui/add%20Celo%20to%20MM.png?raw=true)

- [Add Polygon to Metamask](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/#configure-polygon-on-metamask)
- [메타마스크에 Polygon을 추가하세요](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/#configure-polygon-on-metamask)

![add polygon network to MM.png](https://github.com/critesjosh/images/blob/main/optics-gui/add%20polygon%20network%20to%20MM.png?raw=true)

- Make sure you have Celo assets to send.
- 보낼 Celo 자산이 있는지 확인합니다.
- Go to the Optics Bridge app.
- 앱으로 이동합니다.
- Connect metamask
- 메타마스크를 연결합니다.
- Make sure metamask is connected to the Celo network
- 메타 마스크가 Celo 네트워크에 연결되어 있는지 확인하십시오.
- Enter the amount, destination chain (Polygon in this case) and destination address. The sending address is filled by default.
- 금액, 대상 체인(이 경우 폴리곤) 및 대상 주소를 입력하십시오. 송신 주소는 기본적으로 채워집니다.

![setup CELO to Polygon](https://github.com/critesjosh/images/blob/main/optics-gui/setup%20CELO%20to%20polygon.png?raw=true)

- Allow the bridge application to send CELO on your behalf.
- 브리지 응용 프로그램이 사용자를 대신하여 CELO를 보내도록 허용합니다.

![approve optics to spend CELO.png](https://github.com/critesjosh/images/blob/main/optics-gui/approve%20optics%20to%20spend%20CELO.png?raw=true)

- Approve the transaction to send CELO to the Optics bridge.
- 트랜잭션을 승인하여 CELO를 Optics 브리지로 보냅니다.

![send celo to polygon.png](https://github.com/critesjosh/images/blob/main/optics-gui/send%20celo%20to%20polygon.png?raw=true)

- You can view your transaction history in the corresponding tab.
- 해당 탭에서 트랜잭션 기록을 볼 수 있습니다.
  - You can view the status of the transfer by mousing over the “Status” of the transaction.
  - 트랜잭션의 "상태" 위에 마우스를 놓으면 전송 상태를 볼 수 있습니다.

![celo to polygon tx history.png](https://github.com/critesjosh/images/blob/main/optics-gui/celo%20to%20polygon%20tx%20history.png?raw=true)

- Once your transaction is approved your transaction details may not appear in the transaction history immediately. This does not mean that your transaction wasn’t successful. If you don’t see your transaction details, check a block explorer of the source network to verify that your transaction to the bridge was successful.
- 거래가 승인되면 거래 내역이 즉시 나타나지 않을 수 있습니다. 그렇다고 해서 거래가 성공하지 못한 것은 아닙니다. 트랜잭션 세부 정보가 표시되지 않으면 소스 네트워크의 블록 탐색기를 확인하여 브리지로의 트랜잭션이 성공했는지 확인합니다.

- Wait for Optics to send your assets to the destination network.
- Optics가 자산을 대상 네트워크로 보낼 때까지 기다립니다.
