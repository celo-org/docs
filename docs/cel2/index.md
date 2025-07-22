# Overview

## Celo L2 Mainnet

Celo has transitioned from a standalone EVM-compatible Layer 1 blockchain to an Ethereum Layer 2.
This shift, [proposed by cLabs in July 2023](https://forum.celo.org/t/clabs-proposal-for-celo-to-transition-to-an-ethereum-l2/6109), aims to maintain the seamless user experience that Celo is known for—characterized by speed, low costs, and ease of use—while leveraging Ethereum’s security and ecosystem.

## What does this mean for our ecosystem?

Celo's evolution from an L1 EVM-compatible chain to an L2 solution marks a significant milestone in our ongoing relationship with the Ethereum ecosystem. As an L1 chain, Celo has always maintained close ties with Ethereum, sharing its commitment to decentralization, security, and innovation. By transitioning to an L2, Celo strengthens this bond, allowing our developers and protocols to immerse themselves even deeper into the vibrant, collaborative Ethereum community. This integration enhances opportunities for open-source contributions, joint initiatives, and the development of public goods, ensuring that Celo's impact resonates widely across the blockchain space.

### Technical Changes

The table below summarizes the technical changes involved in transitioning from Celo's Layer 1 to Layer 2:

| **Aspect**          | **Layer 1**                                                                                  | **Layer 2**                                                                                                   |
|----------------------|---------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| **Architecture**    | Single service, providing execution, consensus, and data availability.                      | Multiple services built on the op-stack with separate execution, data availability, and settlement layers.    |
| **Bridging**        | Third-party bridges connecting to various chains.                                            | Additional native bridge with Ethereum alongside existing third-party bridges.                                |
| **CELO Token**      | Lived on the Celo L1.                                                                        | Lives on Ethereum; CELO on L2 represents CELO bridged from Ethereum.                                          |
| **Blocks**          | 5s long, 50M gas.                                                                           | 1s long, 30M gas.                                                                                            |
| **Extra Fields**    | —                                                                                           | Withdrawals & withdrawalsRoot, blobGasUsed & excessBlobGas, parentBeaconBlockRoot.                           |
| **Removed Fields**  | —                                                                                           | Randomness, epochSnarkData.                                                                                  |
| **Validator Duties**| Operated the consensus protocol.                                                            | Validators will temporarily operate community RPC nodes.                                                     |
| **Validator Rewards**| Distributed at epoch blocks.                                                              | Distributed periodically via smart contract execution.                                                       |
| **Sequencing**      | Determined by the output of consensus, run by validators.                                    | Initially handled by a centralized sequencer with plans for decentralized sequencing later.                  |
| **Precompiles**     | —                                                                                           | All Celo precompiles removed except for the transfer precompile which supports token duality.                 |
| **EIP1559**         | Governable implementation on-chain.                                                         | Upgraded implementation with modified parameters across networks.                                            |
| **Hardforks**       | —                                                                                           | Cel2 hardfork for transition to L2 alongside other op-stack hardforks.                                       |
| **Transactions**    | —                                                                                           | Deprecated transactions include Type 0 with feeCurrency field and Type 124.                                  |
| **Finality**        | One block finality, instantaneous once block is produced.                                    | Finality depends on trust in sequencer, batcher, proposer, and eigenDA, or ultimately on Ethereum.            |

For more detailed technical changes, see [Celo's L2 Migration Documentation](https://specs.celo.org/l2_migration.html).

## Important Dates

### Early July, 2024: Dango L2 Testnet Launch

The Dango Testnet announced on the 7th of July 2024, Celo’s first L2 public test network, went live. Dango allowed developers and infrastructure providers to familiarize themselves with the L2 environment. It was shut down on the 9th of October 2024.

### 26th September, 2024: Alfajores L2 Testnet Launch

The Celo L2 testnet, Alfajores, went live! This provides a testing environment for node operators and developers to ensure compatibility before the Mainnet launch.

### October 2024: Code Freeze and Audits

The core dev team froze all feature development by mid-October and underwent a thorough external audit. The result is available at https://celo.org/audits.

### 20th February, 2025: Baklava L2 Testnet Launch

Using the final audited release, the Celo validator community performed a dry run of the L2 upgrade on the Baklava network.

### 26th March, 2025: Celo L2 Mainnet Launch

Following a successful Baklava upgrade, the Celo L2 Mainnet officially went live.

## Useful Links

* [Layer 2 Specification](https://specs.celo.org/root.html)
* [Node Operator Guide](./operators/overview.md)
* [What's Changed?](./whats-changed/overview.md)
* [Cel2 Code](https://github.com/celo-org/optimism)
* [FAQ](/cel2/faq)
