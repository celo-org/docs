---
title: Bridges
description: How to bridge assets between Celo and other blockchain networks such as Ethereum, Polygon, and Solana.
---

# Bridges

Bridging allows users to transfer assets between the Celo network and other blockchain networks such as Ethereum, Polygon, and Solana. This section provides an overview of available bridging and swapping options.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

:::warning

Be sure you understand and review the risks when bridging assets between chains.

:::

## Bridges To and From Celo

### Popular Bridges

- [Squid Router V2](https://v2.app.squidrouter.com/?chains=10%2C42220&tokens=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee%2C0x471ece3750da237f93b8e339c536989b8978a438)
- [LayerZero](https://layerzero.network/)
- [Jumper Exchange](https://jumper.exchange/?fromChain=10&fromToken=0x0000000000000000000000000000000000000000&toChain=42220&toToken=0x471EcE3750Da237f93B8E339c536989b8978a438)
- [Portal Bridge (Wormhole)](https://portalbridge.com/)
- [AllBridge](https://app.allbridge.io/bridge?from=ETH&to=CELO&asset=ABR)
- [Satellite (Axelar)](https://satellite.money/)
- [Transporter (Chainlink CCIP)](https://www.transporter.io/)
- [Mach Exchange](https://www.mach.exchange/)

### Gasless Bridges

- [SmolRefuel](https://smolrefuel.com/?outboundChain=42220)

### Native Bridges


Native bridging refers to the process of transferring assets directly between Layer 2 (L2) networks without the need for intermediary networks or tokens. This method is designed to be more secure, efficient and cost-effective, leveraging the security and scalability of L2 solutions.

- [Superbridge Celo Mainnet](https://superbridge.app/celo)
- [Superbridge Alfajores Testnet](https://testnets.superbridge.app/celo-alfajores)
- [Superbridge Baklava Testnet](https://testnets.superbridge.app/celo-baklava)


#### Natively Bridged Tokens on Mainnet

import Tokens from "./bridged_tokens/tokens.md"

<Tokens />

## Cross-Chain Messaging

In addition to token bridges, there are also protocols that enable cross-chain messaging and interoperability:

- [Chainlink CCIP](https://chain.link/cross-chain)
- [Hyperlane](https://www.hyperlane.xyz/)
- [Wormhole](https://wormhole.com/)
- [Layer Zero](https://layerzero.network/)
- [Axelar Network](https://axelar.network/)
