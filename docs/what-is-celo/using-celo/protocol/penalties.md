---
title: Community RPC Provider Penalties
description: Introduction to validator penalties, enforcement mechanisms, and conditions.
---

# Community RPC Provider Penalties

Introduction to community RPC provider penalties, enforcement mechanisms, and conditions.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

:::info
This page is a work in progress based on the [proposal for validator engagement during the transition to L2](https://forum.celo.org/t/proposal-validator-engagement-during-the-transition-to-celo-l2/9700). For updates make sure to refer to the [Celo Forum](https://forum.celo.org). 
:::

## Validator Operations

### 1. How It Works

Validators who register an RPC will be allocated 82.19178082 cUSD per day at a perfect score (1). These allocations can later be claimed by each validator (link). Scores are monitored off-chain by an independent working group of validators (the Score Management Committee) running custom software based on the Community RPCs page at Vido by Atalma. This committee will create a Safe Multisig which itself has permissions to manage the on-chain `ScoreManager.sol` smart contract.

Every week, the Score Management Committee will collate their measurements, aggregate, and average their scores for each validator for the week prior. If the score is 1 (100%), no adjustments need to be made for that validator. If a validator’s score is less than 1, their score will be updated by the committee and will apply to their payments for the following week, at which time the score will be adjusted again.

Registering a validator RPC is not optional. If you do not have a configured RPC with sufficient uptime, you will be slashed. The Score Management Committee’s multisig will also be given permissions to slash validators.

### 2. The Score Management Committee

The Score Management Committee will control a multisig which has the power given by Governance to call functions on the `ScoreManager` and `GovernanceSlasher` contract.


**Responsibilities:**

- Running and maintaining additional infrastructure including DB and indexer for uptime tracking. The stack utilized will be open-sourced for anyone to verify.
- Dedicated time for performance evaluation, collaboration, multisig operations, and transparent communication.
- To cover operational expenses for monitoring uptime, maintaining additional infrastructure, and managing Scoring and Slashing, each committee member will receive $2k cUSD per month.

### 3. Metrics

Validator rewards will be allocated automatically after each epoch based on the score defined by the `ScoreManager` contract and can afterwards be claimed manually by the validator.

The committee is proposing the following weekly score breakdown:

| RPC Uptime | Score |
|------------|-------|
| 100% - 80% | 1.00  |
| 79% - 60%  | 0.80  |
| 59% - 40%  | 0.60  |
| 39% - 20%  | 0.40  |
| 19% - 0%   | 0 and Slash |

Validators with uptime below 20% for 7 days will be slashed. Running a community RPC node is mandatory for elected validators. If an elected validator does not run a properly configured RPC node, they will be slashed, and a portion of their locked Celo will be forfeited.

Additionally, after the transition to Layer 2, we propose a 1-week grace period for validators to configure their RPC nodes. After that, the performance scoring system will be fully enforced.

### 4. Other Considerations

- We opted for a weekly cadence as daily updates and multi-sig coordination is outside the scope of a single small team.
- We opted for only 5 sets of scores in a range, to avoid the transaction and workload of precisely updating validators every week.
- Validator slashing remains part of the process. The idea behind this process is to maintain a competent and secure set of technical contributors for potential future operations. If a validator cannot continuously maintain this load, then they need to be ejected from the elected set and be replaced with someone who can.
- This process will run for 6 months, or until decentralized sequencing has been introduced, to allow us to learn and adapt, and potentially change the management structure.
- Future technical solutions that could be explored include: updating the Celo stats websocket push from full nodes and manage performance through that site (which would require work to update the code), or even integrating natively with Lavanet - a decentralized RPC management protocol that allows custom incentives for RPC providers.
- RPC requests to community nodes will eventually be semi-random and include state queries etc., so that bad faith validators cannot simply proxy `eth_blockNumber` from another node - even Forno itself.

### 5. References

- [Overview of rewards and epochs in L2](https://specs.celo.org/smart_contract_updates_from_l1.html#overview-of-rewards-and-epochs-in-l2)
- [Scoring](https://specs.celo.org/smart_contract_updates_from_l1.html#scoring)
- [Slashing](https://specs.celo.org/smart_contract_updates_from_l1.html#slashing)