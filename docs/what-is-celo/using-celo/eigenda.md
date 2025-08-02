---
title: EigenDA
description: Scaling Data Availability for the Next Generation of Web3 Apps
---


# EigenDA on Celo

Celo is now an Ethereum Layer 2 (L2) designed for fast, low-cost, mobile-first transactions. As part of this upgrade, Celo integrates **EigenDA**, a high-throughput, decentralized data availability (DA) layer built on **EigenLayer**.

This integration,[first proposed on the Celo Forum](https://forum.celo.org/t/proposal-eigenda-integration/6382),solves one of the core challenges facing modern L2s: how to keep transaction fees low and predictable without compromising security or scalability.

---

### Why Celo Uses EigenDA

Before Ethereum’s [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), L2s posted transaction data as calldata, which often accounted for more than 90% of their total fees. While EIP-4844 introduced cheaper blob-based data storage, blob fees can fluctuate significantly based on network congestion.

For a platform like Celo,focused on stablecoins, payments, and access in low-bandwidth environments,fee volatility is not acceptable. EigenDA addresses this by providing a scalable, low-cost alternative to Ethereum’s native blob space.

---

### How EigenDA Works

[EigenDA](https://www.eigenda.xyz) is a modular, off-chain data availability layer. It uses a network of **EigenLayer** operators who store transaction data and attest to its availability. Instead of storing full transaction data on Ethereum, Celo stores only a **DA commitment**,a cryptographic reference to data stored on EigenDA.

This is implemented according to the [Optimism AltDA specification](https://github.com/ethereum-optimism/optimism/blob/develop/specs/alt-da.md), which defines how rollups can integrate non-Ethereum DA layers in a secure and interoperable way.

---

### Benefits of EigenDA on Celo

* **Lower Fees**
  By offloading transaction data storage from Ethereum, Celo can maintain sub-cent transaction fees,even during peak demand.

* **Higher Throughput**
  Internal benchmarks have shown EigenDA’s potential to reach up to 10 MB/s of data throughput, supporting high-volume dApps and global-scale usage.

* **Secure and Decentralized**
  EigenDA leverages Ethereum validators via EigenLayer’s restaking mechanism, aligning security incentives across layers.

---

### EigenDA v2 (Blazar Upgrade)

Celo’s current testnets,[Alfajores](https://docs.celo.org/network/alfajores) and [Baklava](https://docs.celo.org/network/baklava),now run on **EigenDA v2**, also known as the *Blazar upgrade*. This was announced as part of the [Eclair testnet launch](https://forum.celo.org/t/roadmap-update-eclair-testnet-launch/6553), which also introduced modular stack improvements including OP Stack compatibility and Rust-based client infrastructure.

#### Key improvements in v2:

* **Near real-time confirmations**
  Allows rollups to reference blocks without waiting for Layer 1 finality, reducing latency from minutes to seconds.

* **Improved throughput and reliability**
  More efficient chunking, request routing, and horizontal scalability of DA nodes.

* **Full AltDA support**
  Enables native integration with modular L2 architectures like Celo’s.

---

### Developer Notes

* Celo’s testnets use the **EigenDA Holesky testnet**.
* Integration follows the [Optimism AltDA spec](https://github.com/ethereum-optimism/optimism/blob/develop/specs/alt-da.md) for compatibility with the OP Stack.
* You can find testnet contract addresses on [EigenLayer’s testnet deployment page](https://www.eigenlayer.xyz).

---

### What This Means for the Celo Ecosystem

The integration of EigenDA strengthens Celo’s position as a high-performance, low-cost Layer 2. It enables:

* **Predictable gas fees**, crucial for payments and stablecoin use cases
* **Support for high-throughput apps**, including DeFi, gaming, and social platforms
* **Infrastructure grants**, including the **Eigen Foundation’s first strategic grant** awarded to the **Celo Foundation**, supporting development and ecosystem adoption

---

### Learn More

* [Celo Forum: EigenDA Proposal](https://forum.celo.org/t/proposal-eigenda-integration/6382)
* [Celo Forum: Eclair Testnet Launch](https://forum.celo.org/t/roadmap-update-eclair-testnet-launch/6553)
* [EigenDA Overview](https://www.eigenda.xyz)
* [Optimism AltDA Specification](https://github.com/ethereum-optimism/optimism/blob/develop/specs/alt-da.md)
* [EigenLayer Testnet Deployments](https://www.eigenlayer.xyz)

