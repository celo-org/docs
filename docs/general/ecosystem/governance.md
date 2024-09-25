---
title: Governance
---


This is an overview of Celo governance and how the network is managed using the stakeholder proposal process. Celo ecosystem is evolving and this guide includes Celo network management as well as community funding proposals.

*** 

## What is Celo Governance?
Celo uses a formal onchain governance mechanism to manage and upgrade the protocol such as for upgrading smart contracts, adding new stable currencies, or modifying the reserve target asset allocation. All changes must be agreed upon by CELO holders. A quorum threshold model is used to determine the number of votes needed for a proposal to pass.


## Stakeholder Proposal Process
Changes are managed via the Celo `Governance` smart contract. This contract acts as an "owner" for making modifications to other protocol smart contracts. Such smart contracts are termed **governable**. The `Governance` contract itself is governable, and owned by itself.

The change procedure happens in the following phases:

1. Proposal
2. Approval
3. Referendum
4. Execution

:::info
Pleas follow this [guide to create a proposal](/general/ecosystem/guides/create-proposal), but make sure, to  go through this page, to fully understand the process before.
:::

## Overview of Phases
Each proposal starts on the Proposal Queue where it may receive upvotes to move forward in the queue relative to other queued proposals. Proposal authors should work to find community members to upvote their proposal (proposers may also upvote their proposals). Up to three proposals from the top of the queue are dequeued and promoted to the approval stage automatically per day. Any proposal that remains in the queue for 4 weeks will expire.

- **Approval** lasts 1 days (24 hours), during which the proposal must be approved by the Approver(s). Approved proposals are promoted to the Referendum stage.
- **Referendum** lasts five days, during which owners of Locked Celo vote yes or no on the proposal. Proposals that satisfy the necessary quorum are promoted to the execution phase.
- **Execution** lasts up to three days, during which anybody may trigger the execution of the proposal.

## Proposal
Any user may submit a Proposal to the Governance smart contract, along with a small deposit of CELO. This deposit is required to avoid spam proposals, and is refunded to the proposer if the proposal reaches the Approval stage. A Proposal consists of a list of transactions, and a description URL where voters can get more information about the proposal. It is encouraged that this description URL points to a CGP document in the [celo-org/celo-proposals](https://github.com/celo-org/celo-proposals) repository. Transaction data in the proposal includes the destination address, data, and value. If the proposal passes, the included transactions will be executed by the `Governance` contract.

Submitted proposals are added to the queue of proposals. While a proposal is on this queue, voters may use their Locked Celo to upvote the proposal. Once per day the top three proposals, by weight of the Locked Celo upvoting them, are dequeued and moved into the Approval phase. Note that if there are fewer than three proposals on the queue, all may be dequeued even if they have no upvotes. If a proposal has been on the queue for for more than 4 weeks, it expires and the deposit is forfeited.

### Types of Proposals

Governance Proposals must fall within one of the following categories to be considered acceptable.

|**Proposal Type**|**Governance Platform**|**Description**|**Submission Requirements**|**Quorum**|**Approval Threshold**|
| --- | --- | --- | --- | --- | --- |
|Celo Protocol Governance|Celo Governance Contracts|Celo Network decisions and Celo Protocol Improvements|Deposit of 10,000 Locked Celo.|Dynamic based on the current Celo Algorithm.|Dynamic based on the current Celo Algorithm.|
|Smart Contract Governance|Celo Governance Contracts|onchain smart contract changes|Deposit of 10,000 Locked Celo.|Dynamic based on the current Celo Algorithm.|Dynamic based on the current Celo Algorithm.|
|Celo Community Treasury Governance|Celo Governance Contracts|Funding proposals that do not fall within a current Celo Public Good Budget or aim to request over $500,000 in value in a single proposal.|Deposit of 10,000 Locked Celo.|Dynamic based on the current Celo Algorithm.|Dynamic based on the current Celo Algorithm.|
|Mento Governance|Celo Governance Contracts|Mento reserve and protocol decisions. To separate once, Mento will establish their own Governance system in 2024.|Deposit of 10,000 Locked Celo.|Dynamic based on the current Celo Algorithm.|Dynamic based on the current Celo Algorithm.|
|Celo Public Goods Governance|Celo Public Goods Snapshot|Program selection within approved Celo Public Goods budgets.|Minimum of 10,000 Locked Celo Balance|2.5M Celo|50%|

## Feedback and Review
Proposals must be posted in the Celo Forum for review by the Celo community. It is required to post the proposal as a new discussion thread in the [Governance category](https://forum.celo.org/c/governance/12) and to mark it with **[DRAFT]** in the title. Proposal authors are expected to be responsive to feedback.

A proposal needs to be up for discussion for at least **7 full days,** during which responsiveness from the author is mandatory.


After a proposal has received feedback and has been presented on the governance call the proposal author shall update the proposal thread title from [Draft] to [Final]. Authors shall also include a summary of incorporated feedback as a comment on their proposal thread so future reviewers can understand the proposal’s progress. If feedback was gathered outside of the Forum (e.g., on Discord), proposal authors should include relevant links.

## Approval
Every day the top three proposals at the head of the queue are pop off and move to the Approval phase. At this time, the original proposers are eligible to reclaim their Locked Celo deposit. In this phase, the proposal needs to be approved by the Approver. The Approver is initially a 3 of 9 multi-signature address held by individuals selected by the Celo Foundation, and will move to a DAO in the future. The Approval phase lasts 1 day and if the proposal is not approved in this window, it is considered expired and does not move on to the “Referendum” phase.

## Referendum
Once the Approval phase is over, approved proposals graduate to the referendum phase. Any user may vote yes, no, or abstain on these proposals. Their vote's weight is determined by the weight of their Locked Celo. After the Referendum phase is over, which lasts five days, each proposal is marked as passed or failed as a function of the votes and the corresponding passing function parameters.

In order for a proposal to pass, it must meet a minimum threshold for **participation**, and **agreement**:

- Participation is the minimum portion of Locked Celo which must cast a vote for a proposal to pass. It exists to prevent proposals passing with very low participation. The participation requirement is calculated as a governable portion of the participation baseline, which is an exponential moving average of final participation in past governance proposals.
- Agreement is the portion of votes cast that must be "yes" votes for a proposal to pass. Each contract and function can define a required level of agreement, and the required agreement for a proposal is the maximum requirement among its constituent transactions.

## Execution
Proposals that graduate from the Referendum phase to the Execution phase may be executed by anyone, triggering a call operation code with the arguments defined in the proposal, originating from the Governance smart contract. Proposals expire from this phase after three days.

## Cool-off period for failed proposals

If a proposal is not accepted, a cool-off period is required for additional conversation and potential changes before the proposal can be resubmitted. There are two situations in which a cool-off period is required:

1. If a proposal is rejected due to not reaching a quorum but having a majority of yes votes, the proposal is moved back to the discussion stage and may be submitted for a vote after waiting for 14 days.

2. If a proposal is rejected and has a majority of no votes, the proposal is moved back to the discussion stage and may be submitted for a vote after receiving approval from the Governance Guardians and waiting for 28 days.

**Note**: In the event that a proposal meets or exceeds quorum, but if it is not approved in time, then they should be able to re-submit as soon as they are able. This would happen in a rare situations when approvers are unable to approve in the 72 hour window following a referendum vote.

---

## Smart Contract Upgradeability
​Smart contracts deployed to an EVM blockchain like Celo are immutable. To allow for improvements, new features, and bug fixes, the Celo codebase uses the Proxy Upgrade Pattern. All of the core contracts owned by Governance are proxied. Thus, a smart contract implementation can be upgraded using the standard onchain governance process.​

## Upgrade risks
​The core contracts define critical behavior of the Celo network such as CELO and Celo Dollar asset management or validator elections and rewards. Malicious or inadvertent contract bugs could compromise user balances or potentially cause harm, irreversible without a blockchain hard fork.

Great care must be taken to ensure that any Governance proposal that modifies smart contract code will not break the existing system. To this end, the contracts have a well defined release process, which includes soliciting security audits from reputable third-party auditors.

As Celo is a decentralized network, all Celo network participants are invited to participate in the governance proposals discussions on the forum.

## Validator Hotfix Process
The cadence and transparency of the standard onchain governance protocol make it poorly suited for proposals that patch issues that may compromise the security of the network, especially when the patch would reveal an exploitable bug in one of the core contracts. Instead, these sorts of changes are better suited for the more responsive, and less transparent, hotfix protocol.

Anyone can make a proposal in the hotfix protocol by submitting the hash of their proposal to the Governance smart contract. If that hash is approved by the approver and a quorum of validators, the proposer can execute the contents of that proposal immediately.

Note that this means the validators may not always know the contents of the proposal that they are voting on. Revealing the contents of the proposal to all validators may compromise the integrity of the hotfix protocol, as only one validator would need to be malicious in order to exploit the vulnerability or share it publicly. Instead, to convince the validators that the hash represents a proposal that should be executed via the hotfix protocol, the proposer should consider contacting reputable, third party, security firms to publicly vouch for the contents of the proposal.

## Celo Blockchain Software Upgrades
Some changes cannot be made through the onchain governance process (via proposal or hotfix) alone. Examples include changes to the underlying consensus protocol and changes which would result in a hard-fork.


---

# Governance Tooltik

## Mechanisms for Main Onchain Celo Governance Proposals
* [**Celo Governance Contract**](https://celoscan.io/address/0xd533ca259b330c7a88f74e000a3faea2d63b7972#code): The onchain voting contract for Celo Governance. This is also the address of the Celo Community Treasury.
* [**Celo Mondo**](https://mondo.celo.org/): The new UI friendly interface to Lock, Stake, Delegate and Vote.
* [**Celo.Stake.id**](https://celo.stake.id/#/): A front-end interface for Celo Governance maintained by Staking Fund.
* [**Celo Terminal**](https://celoterminal.com/): A desktop application allowing Celo chain interactions and governance participation.
* [**StakedCelo dApp**](https://app.stcelo.xyz/connect): An application that allows for liquid staking of Celo and voting on Governance proposals.

### Mechanisms for Celo Public Goods Proposals
* **[Celo Public Goods Snapshot](https://snapshot.org/#/celopg.eth):** A locked Celo snapshot to allow votes to occur on Snapshot to decide about Celo Public Goods Proposals.

### Mechanisms for Discussions
* [**The Celo Forum**](https://forum.celo.org/): The platform for governance and community discussion.
* [**Discord**](https://discord.com/invite/celo): For informal governance discussion and feedback.
* [**Github**](https://github.com/celo-org/governance): Governance guidelines and CGP proposals are tracked via Github.

## Implementation and Administration
Celo Governance represented by Celo Governance Guardians and can help answer any questions about the governance process.

## Celo Governance Guardians Overview
The curent Celo Governance Guardians *(Formerly known as CGP Editors)*, actively participating in the Governance Process.

- **Guardian:** 0xj4an (@0xj4an-work, [Twitter](https://twitter.com/0xj4an))
- **Guardian:** Wade (@Wade, [Twitter](https://twitter.com/0xZOZ))
- **Guardian:** 0xGoldo (@0xGoldo, [Twitter.](https://twitter.com/0xGoldo))
- **Advisors Guardians:**
  - Eric (@ericnakagawa, [Twitter](https://twitter.com/ericnakagawa))
  - Anna (@annaalexa, [Twitter]( https://twitter.com/AnnaAlexaK))
