# Builders

The Celo L2 upgrade introduces no breaking changes but many improvements for builders.
Among them are higher compatibility with Ethereum tooling and interfaces, support of the latest EVM versions and integration into the Optimism ecosystem.

Celo L2 enables the [Cancun hardfork](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md) for the EVM, enabling builders to use the latest opcodes to make smart contracts cheaper and more secure. It also enables new use-cases by supporting new precompiles and streamlined bridging to the Celo ecosystem. For more details see the [Celo specs](https://specs.celo.org/l2_migration.html#state-changes-during-the-migration).

## Alfajores testnet

The Alfajores testnet allows you to test the new environment.

- Network Name: Celo Alfajores Testnet
- RPC URL: [https://alfajores-forno.celo-testnet.org](https://alfajores-forno.celo-testnet.org)
- Chain ID: 44787
- Currency Symbol: CELO
- Block explorer: [https://explorer.celo.org/alfajores](https://explorer.celo.org/alfajores)

The following node providers are available for Alfajores:

- [Infura](https://www.infura.io/networks/celo)
- [dRPC](https://drpc.org/chainlist/celo)

If none of the above work for you, you can use cLabs best effort hosted node: [Forno](https://docs.celo.org/network/node/forno).

You can get funds from the [Alfajores Faucet](https://faucet.celo.org/alfajores).

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
  