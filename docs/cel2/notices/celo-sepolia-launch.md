# Celo Sepolia Testnet Launch

This page announces the launch of Celo Sepolia, a new developer testnet that will replace Alfajores following the planned Holesky sunset.

:::info Key Information

This page will be kept updated with key information about the transition.

- **Chain ID**: 11142220
- **Status**: Live (early access phase)
- **Built on**: Ethereum Sepolia L1
- **Phases**:
  - **Early access**: Currently live, focusing on stability and internal testing
  - **Public announcement**: Planned for September 1, 2025
  - **Migration period**: September 2025, until Holesky deprecation
  - **Alfajores sunset**: Aligned with Holesky deprecation in September 2025

:::

## What is Celo Sepolia?

Celo Sepolia is the new developer testnet for Celo, running as an Ethereum Layer 2 on top of Ethereum Sepolia. This testnet has been launched to replace Alfajores given the planned deprecation of the Holesky testnet in September 2025.

It starts with a clean slate, meaning it does not inherit any state from Alfajores. This allows developers to test applications in a fresh environment without legacy data or contracts. The testnet is designed for long-term use as a Celo testnet, following Ethereum Sepolia's testnet lifecycle, with a primary focus on developer testing and application development.

## Timeline and Transition

### Early Access :round_pushpin: We Are Here

Celo Sepolia is currently live and operational, with an internal transition underway involving key ecosystem partners. This private rollout phase is designed to ensure stability and thorough testing before broader adoption by the developer community.

### Upcoming Phases

- **Public announcement**: Planned for September 1, 2025
- **Migration period**: September 2025, during which developers and ecosystem partners will be encouraged to transition from Alfajores to Celo Sepolia.
- **Alfajores sunset**: Aligned with Holesky deprecation in September 2025

## For Node Providers

We are requesting node providers to support both Alfajores and Celo Sepolia in parallel for the next four weeks to ensure a smooth transition for developers and ecosystem teams.

### Setup Information

Refer to the instructions on running a [Celo node](/cel2/operators/run-node) for details on how to set up a node for Celo Sepolia.

Release versions:

- `op-geth` at [v2.1.1](https://github.com/celo-org/op-geth/releases/tag/celo-v2.1.1)
- `op-node` at [v2.1.0](https://github.com/celo-org/optimism/releases/tag/celo-v2.1.0)
- `eigenda-proxy` at [v1.8.2](https://github.com/layr-labs/eigenda/pkgs/container/eigenda-proxy/437919973?tag=v1.8.2)

## For Developers

- **New chain ID**: Update applications to support chain ID 11142220
- **Contract redeployment**: All contracts will need to be redeployed

Since Celo Sepolia starts with a clean slate, there is no historical data or contracts carried over from Alfajores, providing a pristine testing environment.

Developers should begin testing their applications on Celo Sepolia to familiarize themselves with the new testnet infrastructure.

## Key Characteristics and Resources

- Chain ID: **11142220**
- L1 Foundation: Ethereum Sepolia
- EigenDA: v2 (Blazar)
- Contracts: [see the L1 and L2 contracts in the specification](https://specs.celo.org/core_contracts.html?#celo-sepolia-testnet)
- RPC endpoint: [Celo Sepolia Forno](https://forno.celo-sepolia.celo-testnet.org)
- Block explorer: [Blockscout](https://celo-sepolia.blockscout.com)
- Faucet: WIP, reach out on Discord in the [#celo-L2-support](https://discord.com/channels/600834479145353243/1286649605798367252) channel for testnet CELO
- Bridge: [Superbrige Celo Sepolia Testnet](https://testnets.superbridge.app/?fromChainId=11155111&toChainId=11142220)

## Key Differences from Alfajores

| Aspect | Alfajores | Celo Sepolia |
|--------|-----------|--------------|
| L1 Foundation | Ethereum Holesky | Ethereum Sepolia |
| Chain ID | 44787 | 11142220 |
| State | Historical from L1 migration | Fresh start |
| Longevity | Sunset planned Sept 2025 | Long-term testnet |

---

:::warning
This is an early announcement for internal coordination. Public documentation and resources are being prepared and will be available with the broader rollout.
:::
