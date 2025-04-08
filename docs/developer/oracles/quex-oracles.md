---
title: Using Quex Oracles
description: Tutorial on how to use the Quex Oracles on Celo
---

By the end of this tutorial, you'll understand how to integrate your dApp built on Celo with Quex oracles.

This document covers:

- What is Quex?
- How to use Quex oracles?
- Examples

## 🚀 What is Quex?

Quex is an oracle protocol designed to securely transfer verifiable off-chain data to on-chain smart contracts using confidential computing proofs. Quex oracles enable dApps on Celo to securely and reliably access real-world data, allowing developers to create advanced, trust-minimized financial applications, parametric tokens, prediction markets, and more.

Key benefits of using Quex:

- Confidential Computing: Ensures data integrity through verifiable cryptographic proofs.
- Flexible Data Sources: Easily connect and verify data from any off-chain HTTPS API.
- Cost-efficient: Optimized oracle callbacks reduce on-chain storage costs and improve transaction efficiency.
- Post-processing: Flexible on-chain data transformation using programmable response filters (e.g., jq scripts).

You can explore more about Quex on the [official documentation page](https://docs.quex.tech).

## 📈 What data is available?

Unlike traditional oracles, Quex allows you to securely make verifiable API calls to virtually any off-chain data source, including private APIs protected by credentials. This means you can literally access the entire internet with no limitations!

## 🔥 How to use Quex oracles?

IMPORTANT: Quex contracts are currently undergoing security audits and infrastructure security improvements. Before using Quex oracles in production dApps, please reach out to us [on Discord](https://discord.com/invite/NsuE32xHvj). We'll be happy to assist you with the integration and, if needed, set up a dedicated data oracle pools if there is a need.

Please refer to this [short documentation](https://docs.quex.tech/developers/getting_started2) to learn how to integrate your dApp with Quex oracles.

## 🔥 How to use Quex oracles?

IMPORTANT: Quex contracts are currently undergoing a security audit, and we are actively working on infrastructure security improvements. Before using Quex oracles in production dApps, please reach out to us [on Discord](https://discord.com/invite/NsuE32xHvj). We’ll be happy to assist you with integration and, if necessary, set up a dedicated pool of data provider nodes.

Please read this [short getting started guide](https://docs.quex.tech/developers/getting_started2) to learn how to integrate your dApp with Quex oracles.

## 👨‍💻 Code examples

- [SDK Repository](https://github.com/quex-tech/quex-v1-interfaces)
- [Examples Repository](https://github.com/quex-tech/quex-v1-examples)
- [Parametric Token Emission Example](https://github.com/quex-tech/quex-v1-examples/tree/main/tvl-emission)

## 🙋‍♂️ Need help?

Feel free to reach out to the Quex team [on Discord](https://discord.com/invite/NsuE32xHvj) if you have any questions.