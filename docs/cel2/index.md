# Overview

## Celo L2 Mainnet 

:spiral_calendar: Celo L2 Mainnet Date: March 26, 2025, 3:00 AM UTC

:chains: Hardfork Block Height: 31056500

**Node Operators:** Please refer to the mainnet releases below and [Node Operator Guide](./operators/overview.md) for additional migration instructions. 

* Minimum `celo-blockchain` version: [v1.8.9](https://github.com/celo-org/celo-blockchain/releases/tag/v1.8.9)
* `op-geth`: [celo-v2.0.0](https://github.com/celo-org/op-geth/releases/tag/celo-v2.0.0)
* `op-node`: [celo-v2.0.0](https://github.com/celo-org/optimism/releases/tag/celo-v2.0.0)

Celo is currently operating two Layer 2 testnets, Alfajores and Baklava, both of which have been successfully migrated from Layer 1.


## Celo’s Transition to Ethereum Layer 2

Celo is transitioning from a standalone EVM-compatible Layer 1 blockchain to an Ethereum Layer 2.
This shift, [proposed by cLabs in July
2023](https://forum.celo.org/t/clabs-proposal-for-celo-to-transition-to-an-ethereum-l2/6109), aims
to maintain the seamless user experience that Celo is known for—characterized by speed, low costs,
and ease of use—while leveraging Ethereum’s security and ecosystem.  As part of this transition,
Celo is currently operating a Layer 2 testnet, Alfajores, which launched on September 26, 2024.

:::info
While most applications should remain unaffected, node operators, validators, and RPC providers must ensure their systems are prepared for the transition to maintain seamless operations.

See the following documents for more details:

* [Celo L2 migration](notices/l2-migration.md)
* [Pectra upgrade for Alfajores](notices/pectra-upgrade.md)

:::

## What does this mean for our ecosystem?

Celo's evolution from an L1 EVM-compatible chain to an L2 solution marks a significant milestone in our ongoing relationship with the Ethereum ecosystem. As an L1 chain, Celo has always maintained close ties with Ethereum, sharing its commitment to decentralization, security, and innovation. By transitioning to an L2, Celo strengthens this bond, allowing our developers and protocols to immerse themselves even deeper into the vibrant, collaborative Ethereum community. This integration enhances opportunities for open-source contributions, joint initiatives, and the development of public goods, ensuring that Celo's impact resonates widely across the blockchain space.

### Technical Changes

From a technical standpoint, this shift brings substantial benefits. Native bridging between Celo and Ethereum, which was previously not possible, will now be a reality. This advancement significantly enhances the security of token transfers by reducing reliance on external bridges, which have often been a point of vulnerability. With native bridging, Celo can offer a more secure and streamlined experience for users, ensuring that transactions within our ecosystem are both safe and reliable. In essence, becoming an L2 not only aligns Celo more closely with Ethereum's expansive network but also empowers our community to innovate with greater confidence and reach.

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

:::note
These dates are subject to change. This documentation will be continuously updated as new dates become available.
:::

#### Early July, 2024: Dango L2 Testnet Launch

The Dango Testnet announced on the 7th of July 2024, Celo’s first L2 public test network, went live. Dango allowed developers and infrastructure providers to familiarize themselves with the L2 environment. It was shut down on the 9th of October 2024.

#### 26th September, 2024: Alfajores L2 Testnet Launch

The Celo L2 testnet, Alfajores, went live! This provides a testing environment for node operators and developers to ensure compatibility before the Mainnet launch.

#### October 2024: Code Freeze and Audits

The core dev team froze all feature development by mid-October and underwent a thorough external audit. The result is available at https://celo.org/audits.

#### 20th February, 2025: Baklava L2 Testnet Launch

Using the final audited release, the Celo validator community will perform a dry run of the L2 upgrade on the Baklava network.

#### 25th March, 2025: Celo L2 Mainnet Launch

Following a successful Baklava upgrade, the Celo L2 Mainnet will officially go live. All nodes must be updated by this time to avoid disruption.

## Useful Links

* [Layer 2 Specification](https://specs.celo.org/root.html)
* [Node Operator Guide](./operators/overview.md)
* [What's Changed?](./whats-changed/overview.md)
* [Cel2 Code](https://github.com/celo-org/optimism)
* [FAQ](/cel2/faq)
