---
title: Celo Governance
description: Overview of Celo governance and how the network is managed using the stakeholder proposal process.
---

This overview covers Celo governance and network management through the stakeholder proposal process.

---

## What is Celo Governance?

Celo uses a formal onchain governance mechanism to manage and upgrade the protocol such as for upgrading smart contracts, adding new stable currencies, or modifying the reserve target asset allocation. All changes must be agreed upon by CELO holders. A quorum threshold model is used to determine the number of votes needed for a proposal to pass.

:::info
For a detailed explanation of the entire governance process, and to view the latest proposals and discussions, make sure to check out the [Celo Governance GitHub repository](https://github.com/celo-org/governance).
:::

## Stakeholder Proposal Process

Changes are managed via the Celo `Governance` smart contract. This contract acts as an "owner" for making modifications to other protocol smart contracts. Such smart contracts are termed **governable**. The `Governance` contract itself is governable, and owned by itself.

:::info
Pleas follow [this guide to create a proposal](/what-is-celo/using-celo/protocol/governance/create-governance-proposal), but make sure to go through this page to fully understand the process before you do so.
:::

## Phases

### Overview

The governance process follows three sequential phases, each with specific timing requirements:

1. **Proposal Phase** - **Up to 4 weeks**: Each proposal starts in the proposal queue where community members can upvote it to improve its position relative to other queued proposals. Proposal authors should actively seek community support for upvotes (proposers may upvote their own proposals). The top 3 proposals are automatically promoted to the approval stage daily. Proposals remaining in the queue for 4 weeks will expire.

2. **Approval and Referendum Phase** - in parallel:
   - **Approval** - **24 hours**: During this single day window, the proposal must receive approval from the designated Approvers.

   - **Referendum** - **5 days**: Locked CELO holders vote YES or NO on the proposal during this period.

   Proposals that both meet the required quorum threshold and are successfully approved are promoted to the execution phase.

3. **Execution Phase** - **Up to 3 days**: Any community member may trigger the execution of the approved proposal during this window.

### Proposal

Any user may submit a Proposal to the Governance smart contract, along with a small deposit of CELO. This deposit is required to avoid spam proposals, and is refunded to the proposer if the proposal reaches the Approval stage. A Proposal consists of a list of transactions, and a description URL where voters can get more information about the proposal. It is encouraged that this description URL points to a CGP document in the [celo-org/celo-proposals](https://github.com/celo-org/celo-proposals) repository. Transaction data in the proposal includes the destination address, data, and value. If the proposal passes, the included transactions will be executed by the `Governance` contract.

Submitted proposals are added to the queue of proposals. While a proposal is on this queue, voters may use their Locked CELO to upvote the proposal. Once per day the top three proposals, by weight of the Locked CELO upvoting them, are dequeued and moved into the Approval phase. Note that if there are fewer than three proposals on the queue, all may be dequeued even if they have no upvotes. If a proposal has been on the queue for for more than 4 weeks, it expires and the deposit is forfeited.

#### Types of Proposals

Governance Proposals must fall within one of the following categories to be considered acceptable.

|**Proposal Type**|**Governance Platform**|**Description**|**Submission Requirements**|**Quorum**|**Approval Threshold**|
| --- | --- | --- | --- | --- | --- |
|Celo Protocol Governance|Celo Governance Contracts|Celo Network decisions and Celo Protocol Improvements|Deposit of 10,000 Locked CELO.|Dynamic based on the current Celo Algorithm.|Dynamic based on the current Celo Algorithm.|
|Smart Contract Governance|Celo Governance Contracts|onchain smart contract changes|Deposit of 10,000 Locked CELO.|Dynamic based on the current Celo Algorithm.|Dynamic based on the current Celo Algorithm.|
|Celo Community Treasury Governance|Celo Governance Contracts|Funding proposals that do not fall within a current Celo Public Good Budget or aim to request over $500,000 in value in a single proposal.|Deposit of 10,000 Locked CELO.|Dynamic based on the current Celo Algorithm.|Dynamic based on the current Celo Algorithm.|
|Mento Governance|Celo Governance Contracts|Mento reserve and protocol decisions. To separate once, Mento will establish their own Governance system in 2024.|Deposit of 10,000 Locked CELO.|Dynamic based on the current Celo Algorithm.|Dynamic based on the current Celo Algorithm.|
|Celo Public Goods Governance|Celo Public Goods Snapshot|Program selection within approved Celo Public Goods budgets.|Minimum of 10,000 Locked CELO Balance|2.5M Celo|50%|

#### Feedback and Review

Proposals must be posted in the Celo Forum for review by the Celo community. It is required to post the proposal as a new discussion thread in the [Governance category](https://forum.celo.org/c/governance/12) and to mark it with **[DRAFT]** in the title. Proposal authors are expected to be responsive to feedback.

A proposal needs to be up for discussion for at least **7 full days,** during which responsiveness from the author is mandatory.

After a proposal has received feedback and has been presented on the governance call the proposal author shall update the proposal thread title from [Draft] to [Final]. Authors shall also include a summary of incorporated feedback as a comment on their proposal thread so future reviewers can understand the proposal's progress. If feedback was gathered outside of the Forum (e.g., on Discord), proposal authors should include relevant links.

### Approval

Every day, the top three proposals at the head of the queue pop off and move to the Approval phase. At this time, the original proposers are eligible to reclaim their Locked CELO deposit. In this phase, the proposal needs to be approved by the Approver. The Approver is initially a 3 of 9 multi-signature address held by individuals selected by the Celo Foundation, and will move to a DAO in the future. The Approval phase lasts 1 day and if the proposal is not approved in this window, it is considered expired and does not move on to the "Referendum" phase.

### Referendum

Once the Approval phase is over, approved proposals graduate to the referendum phase. Any user may vote YES, NO, or ABSTAIN on these proposals. Their vote's weight is determined by the weight of their Locked CELO. After the Referendum phase is over, which lasts five days, each proposal is marked as passed or failed as a function of the votes and the corresponding passing function parameters.

In order for a proposal to pass, it must meet a minimum threshold for **participation**, and **agreement**:

- Participation is the minimum portion of Locked CELO which must cast a vote for a proposal to pass. It exists to prevent proposals passing with very low participation. The participation requirement is calculated as a governable portion of the participation baseline, which is an exponential moving average of final participation in past governance proposals.
- Agreement is the portion of votes cast that must be YES votes for a proposal to pass. Each contract and function can define a required level of agreement, and the required agreement for a proposal is the maximum requirement among its constituent transactions.

### Execution

Proposals that graduate from the Referendum phase to the Execution phase may be executed by anyone, triggering a call operation code with the arguments defined in the proposal, originating from the Governance smart contract. Proposals expire from this phase after three days.

## Cool-off period for failed proposals

If a proposal is not accepted, a cool-off period is required for additional conversation and potential changes before the proposal can be resubmitted. There are two situations in which a cool-off period is required:

1. If a proposal is rejected due to not reaching a quorum but having a majority of YES votes, the proposal is moved back to the discussion stage and may be submitted for a vote after waiting for 14 days.

2. If a proposal is rejected and has a majority of NO votes, the proposal is moved back to the discussion stage and may be submitted for a vote after receiving approval from the Governance Guardians and waiting for 28 days.

**Note**: In the event that a proposal meets or exceeds quorum, but is not approved in time, the proposers should be able to re-submit as soon as they are able. This would happen in a rare situations when approvers are unable to approve in the 72 hour window following a referendum vote.
