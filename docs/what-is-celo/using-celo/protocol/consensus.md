---
title: Consensus
description: Introduction to the Celo consensus mechanism.
---

# Consensus

Introduction to the Celo consensus mechanism. This page captures the key points about the proposed Security Council and its role in the Celo L2 Network.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

:::info
This page is a work in progress based on the [proposal for the Celo L2’s Security Council](https://forum.celo.org/t/proposing-celo-l2s-security-council/10578/1). For updates make sure to refer to the [Celo Forum](https://forum.celo.org). 
::: 

### Celo L2 Security Council Overview

- **Purpose**: 
  - To decentralize the Celo L2 Network.
  - Manage key upgrades and security fixes.

- **Responsibilities**:
  - Upgrade L1 protocol contracts for Celo’s L2.
  - Modify designations for roles like sequencers, proposers, and challengers.
  - Execute urgent security fixes via hotfixes.
  - Act independently in urgent situations for the network's best interest.

- **Decentralization Goals**:
  - Prevent any single entity from upgrading the system, modifying rollup state, or censoring transactions.

- **Governance**:
  - Regular Governance Process for Celo Core Contracts and Community Fund remains unchanged.

- **Proposed Multisig Structure**:
  - **2/2 Safe Multisig**:
    - Members: cLabs Multisig and Celo Community Security Council.
      - **cLabs Multisig**: 4 out of 5 multisig with a 75% threshold.
      - **Celo Community Security Council**: 6/8 multisig with members from L2Beat, Hyperlane, Valora, Mento, Nitya Subramanian, Kris Kaczor, Tim Moreton, and Aaron Boyd.
    - Ensures non-cLabs controlled quorum-blocking group.

- **Security Standards**:
  - Follow Optimism multisig security policy.
  - Allow nested multisigs if all signers adhere to the security policy.

