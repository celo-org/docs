---
title: Celo Eclair Testnet
description: Collection of resources to get started with Celo Eclair Testnet.
---

# Eclair Testnet

Get started with Celo Eclair Testnet.

---

## What is the Eclair Testnet?

The **Eclair Testnet** is the first testnet to demonstrate the integration of OP Succinct Lite ZK Fault Proofs with support for EigenDA v2.

This testnet is the result of close collaboration between cLabs, Succinct, and EigenLabs; demonstrating what’s possible when modular infrastructure, zk-SNARK security, and scalable data availability come together.

Below you find an overview, details about the implantation and information about how to try it out.

:::warning

The Celo Eclair Testnet is designed for testing and experimentation. Its tokens hold no real world economic value. The testnet software will be upgraded and the entirety of its data reset on a regular basis. This will erase your accounts, their balance and your transaction history.

:::

## What's Live

The Celo Eclair Testnet was announced at EthCC 2025. It features:

- An EVM-compatible chain with Celo-native functionality like token duality.
- OP Succinct Lite, a ZK-powered fault proof system that enhances finality and dispute resolution.
- EigenDA v2, offering scalable, low-cost, and high-throughput data availability.

The system is built on Optimism’s [Kona execution engine](https://github.com/celo-org/celo-kona), powered by Succinct’s high-performance zkVM ([SP1](https://github.com/succinctlabs/sp1)), and secured by the Succinct Prover Network. The result is a more efficient, secure, and modular rollup design.

## Key Benefits of Succinct Lite

cLabs chose the OP Succinct Lite zk-powered fault proof system due to its non-interactive nature which offers faster finality while keeping proving and transaction costs down, an important consideration for Celo's stablecoin and payment focused use cases. Key benefits of Succinct Lite include:

- Faster and configurable finality, with proofs generated only during disputes
- ZK-powered resolution, simplifying and accelerating the dispute process
- AltDA support, enabling integration with alternative data availability layers like EigenDA

## Engineering Work Under the Hood

To build the Eclair testnet, the cLabs engineering team ported key Celo features from Go to Rust within the Kona codebase to integrate with OP Succinct Lite. This significant engineering effort also moves Celo closer to supporting multiple client implementations, a decentralization milestone few chains have reached.

The EigenDA team’s Hokulea project enabled the extension of fault proofs to AltDA derivation, making native integration with both Kona and Succinct possible.

## Powered by EigenDA v2 (Blazar Upgrade)

This testnet runs on EigenDA v2, also known as Blazar, which introduces several important improvements:

- Near real-time confirmation, reducing latency from minutes to seconds by allowing rollups to reference blocks in their own logic without waiting for L1 confirmation
- Higher throughput and improved network performance through more efficient chunk distribution, optimized request routing, and horizontal scalability of DA nodes

## Next Steps

While there’s more work ahead before this architecture could be considered for mainnet, including sourcing feedback from the broader Celo community as you engage with Eclair, this testnet lays important groundwork. We're looking forward to continued discussion and iteration as we move toward that future together.

## Using the Testnet

To use the testnet you can use the following RPC endpoints:

- L1: https://rpc.l1.eclair.celo-testnet.org
- L2: https://rpc.l2.eclair.celo-testnet.org

The L1 block explorer is hosted at https://eclair.celo-testnet.org.
[Here is a completed dispute game](https://eclair.celo-testnet.org/address/0x8E9534e3aD167386Ea1A3aEc6E5E05394c10BDe8?tab=txs).
