---
title: Verify with Remix
description: How to verify a Smart Contract on Celo using Remix
---

# Verify Smart Contract using Remix

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

- Verifying a smart contract allows anyone to review your code from within the Celo Block Explorer. This can be done using the Remix Sourcify Plugin.
- Navigate back to the **Remix IDE**, select **Plugin Manager** from the left side menu.
- Search for **Sourcify**, click Activate, and open the newly installed **Sourcify Plugin**.
- Choose Verifier, select the dropdown menu, and choose the location for your deployed contract (example **Celo (Alfajores)**).
- Paste your contract address into the **Contract Address** field and select **Verify**.

:::tip

The source code of the contract that you are verifying will need to be in Remix. Contracts deployed with Hardhat, and other tools can also be verified using the Remix Sourcify plugin, but you will need to copy your contract source code into Remix first.

:::

![github](/img/doc-images/deploy-remix/image5.png)

- Navigate to the **Contract Address Details Page** in the block explore to, use the **Code, Read Contract**, and **Write Contract** panels to view and interact with your deployed smart contract.
