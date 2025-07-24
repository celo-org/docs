---
title: Community RPC Provider Penalties
description: Introduction to Community RPC provider penalties, enforcement mechanisms, and conditions.
---

# Community RPC Provider Penalties

Introduction to Community RPC provider penalties, enforcement mechanisms, and conditions.

---

:::info
This page is a work in progress based on the [proposal for validator engagement during the transition to L2](https://forum.celo.org/t/proposal-validator-engagement-during-the-transition-to-celo-l2/9700) and [Set The Great Celo Halvening Parameters](https://forum.celo.org/t/set-the-great-celo-halvening-parameters/10455/3). For updates make sure to refer to the [Celo Forum](https://forum.celo.org).
:::

## Overview

The Celo community has established penalties for Community RPC providers who fail to maintain their RPC nodes. These penalties ensure providers maintain reliable and consistent service to the network.

## How It Works

Community RPC providers receive 82.19178082 cUSD per day at a perfect score of 1. Scores are monitored off-chain by the Score Management Committee, an independent working group running custom software based on [Vido by Atalma](https://dev.vido.atalma.io/celo/rpc). This committee operates a Safe Multisig with permissions to manage the on-chain `ScoreManager.sol` smart contract.

Weekly, the committee collates measurements and averages scores for each provider. Scores below 1 are updated and apply to the following week's payments.

**Running a Community RPC is mandatory for elected providers.** Insufficient uptime results in slashing - a portion of locked CELO is forfeited.

### The Score Management Committee

The Committee controls a multisig with governance-granted powers to call functions on the `ScoreManager` and `GovernanceSlasher` contracts. Each member receives $2k cUSD monthly for operational expenses.

**Responsibilities:**

- Running open-source and verifiable monitoring infrastructure for uptime tracking
- Performance evaluation, collaboration, and multisig operations
- Transparent communication

### Metrics

Rewards are allocated automatically after each epoch based on `ScoreManager` contract scores and claimed manually by providers.

Weekly score breakdown:

| RPC Uptime | Score |
|------------|-------|
| 80% - 100% | 1.00  |
| 60% - 79%  | 0.80  |
| 40% - 59%  | 0.60  |
| 20% - 39%  | 0.40  |
| 0% - 19%   | 0 and Slash |

Providers with uptime below 20% for 7 days are slashed.

### References in the Specification

- [Overview of rewards and epochs in L2](https://specs.celo.org/smart_contract_updates_from_l1.html#overview-of-rewards-and-epochs-in-l2)
- [Scoring](https://specs.celo.org/smart_contract_updates_from_l1.html#scoring)
- [Slashing](https://specs.celo.org/smart_contract_updates_from_l1.html#slashing)
