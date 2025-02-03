# Developers & Builders

## I use or need a node provider

The following node providers are available for Alfajores L2:

- [Infura](https://www.infura.io/networks/celo)
- [dRPC](https://drpc.org/chainlist/celo)

If none of the above work for you, you can use cLabs best effort hosted node: [Forno](https://docs.celo.org/network/node/forno).

## I use ContractKit or Fee Abstraction (ERC-20 gas tokens)

**Required** versions for SDK and libraries:

- [@celo/connect >=6.1.0](https://www.npmjs.com/package/@celo/connect)
- [@celo/contractkit >=8.1.1](https://www.npmjs.com/package/@celo/contractkit)
- [@celo/celocli >=5.1.1](https://www.npmjs.com/package/@celo/celocli)
- [@viem >=2](https://www.npmjs.com/package/viem)

Additionally, have a look at the [ContractKit Celo L2 Guide](https://docs.google.com/document/d/1F-9OtZeFOhB7SbgWyUHjOgxBwF-749URZDK0OpgtAqE/edit)
  
## Getting help

Reach out to us!

- Technical question? [celo-org discussions on GitHub](https://github.com/orgs/celo-org/discussions/categories/cel2)
- Any type of question? Reach out on [Discord](https://chat.celo.org) in the #celo-L2-support channel

Also check out these resources:
  
- [Celo Docs](../welcome.md)
- [Celo L2 Specifications](https://specs.celo.org/)
- [Transaction types on Celo](https://github.com/celo-org/txtypes)
- [Celo Forum](https://forum.celo.org/)
  
## Add Celo L2 Testnet to Metamask

Follow this quick guide to add Alfajores to your MetaMask wallet and start playing around with it. You can get funds from the [Alfajores Faucet](https://faucet.celo.org/alfajores).

1. Open Metamask

![](/img/doc-images/add-cel2-testnet-network-to-metamask/1.png)

2. Go to settings

![](/img/doc-images/add-cel2-testnet-network-to-metamask/2.png)

3. Select Networks

![](/img/doc-images/add-cel2-testnet-network-to-metamask/3.png)

4. Add info about Celo L2 Alfajores Testnet

:::info
If you never added a new Network before then you need click on "Add a Network"
:::

Insert the following details:

- Network Name: Celo Alfajores Testnet
- New RPC URL: `https://alfajores-forno.celo-testnet.org`
- Chain ID: 44787
- Currency Symbol: CELO
- Block explorer URL: `https://explorer.celo.org/alfajores`

![](/img/doc-images/add-cel2-testnet-network-to-metamask/4.png)

5. Click "Save"
