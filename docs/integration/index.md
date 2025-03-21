---
title: Integrate with Celo
description: Collection of resources to help integrate Celo with your service.
---

import PageRef from '@components/PageRef'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Integrate with Celo

## Celo Integrations

With its low fees and fast transactions, the Celo blockchain is a great choice for developers looking to deploy or optimize their dApps. Whether you’re transitioning from Web2 or refining an existing Web3 dApp, this guide will walk you through the key steps for deploying on Celo, including setting up your RPC provider, integrating payment and transparency solutions, and ensuring seamless operation on the network. Let’s explore how Celo can enhance your dApp for global adoption.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## If you are an existing Web3 dApp

## Checklist

- **Deploy on Celo**: Ensure your dApp is deployed on the Celo network.
- **Test with Forno**: Use Forno, a hosted node service, to test your dApp without running your own node.
- **Deployment** : Make sure your RPC provider is on Celo. If not, here is a list of RPC providers:
  - Forno
  - Ankr
  - Infura
  - Quicknode
  - All that node
  - dRPC
- **Indexer**: Set up an indexer to efficiently query blockchain data if your dApp requires it.
- **Gas Fees**: Optimize gas fees by leveraging Celo's low-cost transaction capabilities.
- **Optimizing for Mobile Users**: Celo is designed with mobile-first interactions in mind. Ensure your dApp is optimized for mobile users.
- **Analytics**: Implement analytics to track user behavior and dApp performance.

## What else?

- **Security**: Conduct a security audit and publish the results.
- **User Experience**: Ensure a seamless user experience by integrating with Celo-optimized wallets like Valora and Opera MiniPay.
- **Community Engagement**: Engage with the Celo community for feedback and support.
- **Governance Participation**: Participate in Celo's governance by creating and voting on proposals. Refer to the Celo Governance Guide for detailed steps on how to get involved.
- **Celo Forum**: Join discussions, ask questions, and share your experiences on the Celo Forum. It's a great place to connect with other developers and community members.
- **Celo Discord**: For real-time support and collaboration, join the Celo Discord. Engage with the community, get help from developers, and stay updated on the latest news and events.

## If you are a Web2 dApp

## 2.1 Integrating Payment Solutions

- **Leverage Celo's Stablecoins**: Use Celo's stablecoins (cUSD, cEUR) for fast, low-cost transactions.
- **Step-by-Step Guide**: Integrate payments using smart contracts. Refer to the Celo Integration Guide for detailed steps.

## 2.2 Implementing Transparency Solutionď

- **Introduce Transparency**: Use blockchain to introduce transparency into your app (e.g., audit trails, open data).

## 2.3 Setting Up an Indexer for Your Data

- **Importance of Data Indexing**: Blockchain data indexing is crucial for Web3 transparency and efficiency.
- **Steps to Implement an Indexer**: Choose and implement a suitable indexer for Celo. Refer to the Celo Integration Guide for detailed steps.
																														2
## 2.4 Enhancing User Experience

- **Mobile Optimization:** Edqnsure your dApp is optimized for mobile devices, leveraging Celo's mobile-first design.
- **User-Friendly Wallets**: Integrate with Celo-optimized wallets like Valora and Opera MiniPay to provide a seamless user experience.

## 2.5 Ensuring Security
- **Smart Contract Audits**: Conduct thorough audits of your smart contracts to ensure security and reliability.
- **Security Best Practices**: Follow best practices for secure coding and deployment.

## 2.6 Engaging with the Community

- **Community Feedback**: Engage with the Celo community to gather feedback and support for your dApp.
- **Developer Support**: Utilize Celo's developer support channels for assistance and collaboration opportunities.

## 2.7 Compliance and Legal Considerations

- **Regulatory Compliance**: Ensure your dApp complies with relevant regulations and legal requirements.
- **Privacy Policies**: Implement and publish privacy policies that comply with GDPR or other applicable privacy laws.

## 2.8 Performance Optimization

- **Scalability**: Optimize your dApp for scalability to handle increased user load and transactions.
- **Performance Monitoring**: Implement monitoring tools to track the performance and health of your dApp.

---

Celo equips you with the tools to seamlessly integrate DeFi into your existing mobile application or blockchain service. By integrating with Celo, you can accept payments, send payouts, and manage all your DeFi needs using our global financial infrastructure.

- [General Information](/integration)
- Protocol Integration Guide
- Custody Integrations
- Listings Guide
