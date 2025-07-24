---
title: Transactions on Celo
description: Introduction to transactions on Celo.
---

# Transactions on Celo

In Celo's transition to a Layer 2 (L2) solution, several key changes have been proposed to the network's tokenomics, particularly concerning gas pricing and transaction fee allocation.

---

:::info

This section is a work in progress and based on the ["The Great Celo Halvening - Proposed Tokenomics in the Era of Celo L2"](https://forum.celo.org/t/the-great-celo-halvening-proposed-tokenomics-in-the-era-of-celo-l2/9701/1). Please check the [forum](https://forum.celo.org/) for the latest information.
:::

## Gas Pricing Mechanism

Celo employs a gas pricing model based on **EIP-1559**, which dynamically adjusts the base fee to manage network demand. This mechanism ensures that gas prices respond to network congestion, increasing during high demand periods and decreasing when demand is low. The protocol sets a **base fee floor** to prevent the base fee from falling below a certain threshold, safeguarding the network against spam transactions and uncontrolled state growth. 

## Fee Abstraction

A notable feature of Celo's network is **fee abstraction**, allowing users to pay transaction fees using approved ERC-20 tokens such as USDT, USDC, cUSD, and others, in addition to the native CELO token. This flexibility simplifies the user experience by eliminating the need to hold a separate CELO balance for gas fees. To utilize this feature, transactions include a `feeCurrency` field specifying the token for gas payment. It's important to note that transactions specifying non-CELO gas currencies incur approximately 50,000 additional gas units.

Celo allows paying gas fees in currencies other than the native currency. The tokens that can be used to pay gas fees are controlled via governance and the list of tokens allowed is maintained in FeeCurrencyWhitelist.sol. Fee abstraction on Celo works with EOAs. No paymaster required! Learn all about [fee abstraction](/cel2/guides/fee-abstraction).

## Transaction Fee Allocation Post-L2 Transition

With the shift to L2, the allocation of transaction fees has been restructured to support the network's evolving operational needs:

- **Carbon Offset Fund**: 10% of transaction fees continue to support the carbon offset fund, maintaining Celo's environmental commitment. This adjustment reflects the network's reduced carbon footprint following the L2 upgrade.

- **Network Operations**: The remaining 90% of transaction fees are allocated to essential network operations, including:

  - **Data Availability**: Ensuring that transaction data is accessible and secure.

  - **Layer 1 Fees**: Covering costs associated with interactions between Celo's L2 and the Ethereum mainnet.

  - **Sequencer and Batcher Operations**: Supporting the infrastructure that orders and batches transactions on the network.

  - **Revenue Sharing with the OP-Stack**: Complying with the Superchain Ecosystem requirements, which involve sharing revenue with the OP-Stack. 

This reallocation ensures that transaction fees are utilized effectively to maintain network sustainability and operational efficiency in the L2 environment.

## Conclusion

Celo's transition to L2 introduces significant changes to gas pricing and transaction fee allocation, aligning with the network's goals of sustainability, user accessibility, and robust operational support. These adjustments are designed to enhance the overall efficiency and resilience of the Celo ecosystem. 
