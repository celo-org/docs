# Celo Sepolia Testnet Launch

Celo Sepolia is a new developer testnet that will replace Alfajores when Holesky sunsets in September 2025. The Baklava testnet will also sunset with Holesky, with no replacement planned.

:::info Key Information
This page will be kept updated with key information about the transition.

- **Chain ID**: 11142220
- **Status**: testnet live
- **Built on**: Ethereum Sepolia L1
- **Phases**:
  - Jul 23, 2025: Celo Sepolia launch ✅
  - Jul 24, 2025—Jul 31, 2025: Internal testing ✅
  - Aug 1, 2025—Aug 12, 2025: Early access phase ✅
  - Aug 13, 2025: Public announcement ✅
  - **Aug 14, 2025—Sep 14, 2025: Transition period :round_pushpin:**
  - Sep 30, 2025: Planned Alfajores and Baklava sunset, aligned with Holesky deprecation

**Node Providers**: Please support both Alfajores and Celo Sepolia during the transition period.

**Developers**: Verify that your dependencies support Celo Sepolia, then go ahead and deploy all contracts.
:::

## What is Celo Sepolia?

Celo Sepolia is the new developer testnet for Celo running as an Ethereum Layer 2 on Sepolia. It starts with a clean slate (no inherited state from Alfajores) and is designed for long-term use following Ethereum Sepolia's testnet lifecycle.

## Call to Action

### For Node Providers

Please support both Alfajores and Celo Sepolia in parallel during the early access and transition phases to ensure a smooth migration for developers. See the [node setup guide](/cel2/operators/run-node) for technical details and our recommended [Docker Compose Setup](https://github.com/celo-org/celo-l2-node-docker-compose).

Release versions:

- `op-geth` at [v2.1.2](https://github.com/celo-org/op-geth/releases/tag/celo-v2.1.2)
- `op-node` at [v2.1.0](https://github.com/celo-org/optimism/releases/tag/celo-v2.1.0)
- `eigenda-proxy` at [v1.8.2](https://github.com/layr-labs/eigenda/pkgs/container/eigenda-proxy/437919973?tag=v1.8.2)

### For Developers

- Update applications to support chain ID 11142220.
- Redeploy contracts on Celo Sepolia.
- Get testnet CELO tokens from the faucets.

Since Celo Sepolia starts with a clean slate, there is no historical data or contracts carried over from Alfajores, providing a pristine testing environment.

## Key Characteristics and Resources

- Chain ID: 11142220
- L1 Foundation: Ethereum Sepolia
- EigenDA: v2 (Blazar)
- Contracts: [see the L1 and L2 contracts in the specification](https://specs.celo.org/core_contracts.html?#celo-sepolia-testnet)
- RPC endpoint: [Celo Sepolia Forno](https://forno.celo-sepolia.celo-testnet.org)
- Block explorer: [Blockscout](https://celo-sepolia.blockscout.com)
- Faucets:
  - [Google Cloud Web3 Faucet](https://cloud.google.com/application/web3/faucet/celo/sepolia)
  - [Celo Sepolia Token Faucet](https://faucet.celo.org/celo-sepolia)
- Bridge: [Superbridge for Celo Sepolia](https://testnets.superbridge.app/?fromChainId=11155111&toChainId=11142220)

## Key Differences from Alfajores

| Aspect | Alfajores | Celo Sepolia |
|--------|-----------|--------------|
| L1 Foundation | Ethereum Holesky | Ethereum Sepolia |
| Chain ID | 44787 | 11142220 |
| State | Historical from L1 migration | Fresh start |
| Longevity | Sunset planned Sept 2025 | Long-term testnet |

## Early Adopters

Thank you to the first wave of our ecosystem partners supporting Celo Sepolia already:

- **Google Cloud** – [Google Cloud Web3 Faucet](https://cloud.google.com/application/web3/faucet/celo/sepolia)
- **Blockscout** – [Block Explorer](https://celo-sepolia.blockscout.com/)
- **EigenDA v2** – Data Availability
- **Superbridge** – Bridging Infrastructure
- **Ankr** – Node & RPC Provider
- **AllThatNode by DSRV** – Node & RPC Provider
- **Redstone** – Oracle Services
- **Talent Protocol** – Web3 Professional Network
- **Prosperity Pass** – Celo PG Onchain Access Pass

## Getting Help

Please reach out to our team on [Discord](https://chat.celo.org) in the [#celo-L2-support](https://discord.com/channels/600834479145353243/1286649605798367252) channel if you have any questions.
