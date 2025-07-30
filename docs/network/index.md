---
title: Network Information
description: How to choose a Celo network based on your needs and objectives.
---

Overview of Celo Mainnet and the Alfajores, Baklava, and Celo Sepolia Testnets.

---

## Celo Mainnet

| Name                       | Value                                                                                                                                                                                                     |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Network Name               | Celo Mainnet                                                                                                                                                                                              |
| Description                | The production Celo network                                                                                                                                                                               |
| Chain ID                   | 42220                                                                                                                                                                                                     |
| Currency Symbol            | CELO                                                                                                                                                                                                      |
| RPC Nodes                  | <ul><li>[List of RPC providers](node/overview.md#as-a-service)</li><li>[Celo L2 Mainnet Day 1 Node and RPC providers](https://docs.celo.org/cel2/notices/day-1-partners#node-and-rpc-providers)</li></ul> |
| RPC Endpoint (best effort) | https://forno.celo.org <br/> Note: [Forno](node/forno.md#celo-mainnet) is rate limited, as your usage increases consider options that can provide the desired level of support (SLA).                          |
| Block Explorers            | <ul><li>[https://explorer.celo.org](https://explorer.celo.org)</li><li>[https://celoscan.io](https://celoscan.io)</li></ul>                                                                               |
| Bridge Link                | [List of bridges](/developer/bridges/bridges.md)                                                                                                                                                             |

## Celo Alfajores Testnet

| Name                       | Value                                                                                                                                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Network Name               | Celo Alfajores                                                                                                                                                                                                                 |
| Description                | The Developer Testnet network                                                                                                                                                                                                  |
| Chain ID                   | 44787                                                                                                                                                                                                                          |
| Currency Symbol            | CELO                                                                                                                                                                                                                           |
| RPC Nodes                  | [List of RPC providers](node/overview.md#as-a-service)                                                                                                                                                                         |
| RPC Endpoint (best effort) | [https://alfajores-forno.celo-testnet.org/](https://alfajores-forno.celo-testnet.org/)                                                                                                                                         |
| Block Explorer             | <ul><li>[https://celo-alfajores.blockscout.com/](https://celo-alfajores.blockscout.com/)</li><li>[https://alfajores.celoscan.io/](https://alfajores.celoscan.io/)</li></ul>                                                    |
| Bridge Link                | [https://testnets.superbridge.app/celo-alfajores](https://testnets.superbridge.app/celo-alfajores) <br/> Note: Ensure you enable Testnet in settings                                                                           |
| Faucet Link                | [https://faucet.celo.org](https://faucet.celo.org) <br/> For large Faucet requests you can apply [here](https://docs.google.com/forms/d/e/1FAIpQLSfpt3WikYt5-TsDHmUgfFCbZjmZMcWr9bO5H0csHcmMrl9sFw/viewform).                  |

:::info

Your use of the Alfajores Testnet is subject to the [Alfajores Testnet Disclaimer](/network/alfajores/disclaimer).

:::

## Celo Baklava Testnet

| Name                       | Value                                                                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Network Name               | Celo Baklava                                                                                                                                             |
| Description                | The Node Operator Testnet network                                                                                                                        |
| Chain ID                   | 62320                                                                                                                                                    |
| Currency Symbol            | CELO                                                                                                                                                     |
| RPC Endpoint (best effort) | [https://baklava-forno.celo-testnet.org/](https://baklava-forno.celo-testnet.org/)                                                                       |
| Block Explorer             | [https://celo-baklava.blockscout.com/](https://celo-baklava.blockscout.com/)                                                                             |
| Bridge Link                | [https://testnets.superbridge.app/celo-baklava](https://testnets.superbridge.app/celo-baklava) <br/> Note: Ensure you enable Testnet in settings         |
| Faucet Request Form        | [https://forms.gle/JTYkMAJWTAUQp1sv9](https://forms.gle/JTYkMAJWTAUQp1sv9)                                                                               |

The Baklava Testnet is a non-production Testnet for the Validator community.

**It serves several purposes:**

- **Operational excellence**: Build familiarity with the processes used on Mainnet, and to verify the security and stability of your infrastructure with the new software.
- **Detecting vulnerabilities**: Discover bugs in new software releases before they reach Mainnet.
- **Testing ground**: Experiment with new infrastructure configurations in a low-risk environment.

:::warning

The Baklava Testnet is designed for testing and experimentation by developers. Its tokens hold no real world economic value. The testnet software will be upgraded and the entirety of its data reset on a regular basis. This will erase your accounts, their balance and your transaction history. The testnet software will be upgraded on a regular basis. You may encounter bugs and limitations with the software and documentation.

:::

:::info

Your use of the Baklava Testnet is subject to the [Baklava Testnet Disclaimer](/network/baklava/disclaimer).

:::

## Celo Sepolia Testnet

| Name                       | Value                                                                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Network Name               | Celo Sepolia                                                                                                                                             |
| Description                | The New Developer Testnet network (replacing Alfajores)                                                                                                  |
| Chain ID                   | 11142220                                                                                                                                                 |
| Currency Symbol            | CELO                                                                                                                                                     |
| RPC Endpoint (best effort) | [https://forno.celo-sepolia.celo-testnet.org](https://forno.celo-sepolia.celo-testnet.org)                                                               |
| Block Explorer             | [https://celo-sepolia.blockscout.com/](https://celo-sepolia.blockscout.com/)                                                                             |
| Bridge Link                | [https://testnets.superbridge.app/celo-baklava](https://testnets.superbridge.app/?fromChainId=11155111&toChainId=11142220) <br/> Note: Ensure you enable Testnet in settings |
| Faucet Link                | Coming soon                                                                                                                                              |

The Celo Sepolia Testnet is Celo's new developer testnet built on Ethereum Sepolia, designed to replace Alfajores following the planned Holesky deprecation in September 2025.

**Key Features:**

- **Fresh State**: Starts with a clean slate, no state inheritance from Alfajores
- **L1 Foundation**: Built on Ethereum Sepolia for enhanced stability
- **Developer-Focused**: Provides the same developer experience as Alfajores

:::info

Celo Sepolia is currently in early access phase with internal transition and key partners. Public rollout is planned for the coming weeks. For the latest updates, see the [Celo Sepolia launch notice](/cel2/notices/celo-sepolia-launch).

:::

:::warning

The Celo Sepolia Testnet is designed for testing and experimentation by developers. Its tokens hold no real world economic value. The testnet software will be upgraded on a regular basis. This will erase your accounts, their balance and your transaction history. You may encounter bugs and limitations with the software and documentation.

:::

:::info

Your use of the Celo Sepolia Testnet is subject to the [Celo Sepolia Testnet Disclaimer](/network/celo-sepolia/disclaimer).

:::
