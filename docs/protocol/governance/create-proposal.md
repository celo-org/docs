---
title: Create Proposal for Governance
description: How to Create a Proposal in Celo Governance- A Detailed Guide
---

## Prerequisites

Before diving into the Celo governance process and creating a proposal, there are several prerequisites that need to be met:

1. **Celo CLI Knowledge:** Familiarity with the Celo Command Line Interface (CLI) is crucial. The CLI is the primary tool for interacting with the Celo network, including proposal submission.
2. **Minimum Amount of CELO Needed:** Proposers must have at least 100 CELO tokens. A token requirement ensures that proposers have a stake in the network and helps to prevent spam proposals. The staked CELO will be refunded to the proposer if the proposal reaches the Approval stage. If a proposal has been on the queue for for more than 4 weeks, it expires and the deposit is forfeited.
3. **Multi-Signature Wallet:** If the proposal requests funds from the treasury, receipt of the funds into a multisig wallet is advisable. Multisig signers are also advised to self-identify on the corresponding Forum post. Multisig wallets add a layer of security and trust, as multiple parties must agree to execute transactions. Multiple parties self-identifying their involvement in a wallet also demonstrates more oversight over the usage of any requested funds.

## Life Cycle of a Proposal on Celo

### Step 1: Drafting the Proposal

The initial phase in the lifecycle of a governance proposal is the drafting stage. Here, you must comprehensively outline the proposal's purpose, scope, and impact. This should include:

- **Objective**: Clearly state what the proposal aims to achieve.
- **Rationale**: Explain why this proposal is necessary and the problems it addresses.
- **Technical Specifications**: If applicable, provide technical details or code changes.
- **Budget and Funding**: Outline any financial requirements, including a detailed breakdown of costs.

Setting up a secure multisig wallet is recommended for proposals requesting funds, as it ensures enhanced security and trust within the community.

### Step 2: Posting the Proposal on Celo Forum

Once your proposal is drafted, post it on forum.celo.org to initiate community discussion. This post should:

- **Detail the Proposal**: Share every aspect of the proposal, leaving no ambiguity.
- **Include Multisig Information**: If requesting funds, provide the multisig wallet details.
- **Solicit Feedback**: Encourage community input to refine and improve the proposal.
- **Respond and Iterate**: Actively engage with the community, addressing queries and incorporating feedback to strengthen the proposal.

### Step 3: Applying for the Governance Community Call

To further socialize your proposal, apply to present it during the Celo Governance Community Call by:

- **Booking a Slot**: Comment on the GitHub governance repo issue for the next upcoming Governance call to reserve your presentation slot.
- **Join a Governance Call Discussion**: Discuss your proposal in depth and answer questions from the community and approvers.

### Step 4: Publishing the Proposal on GitHub

After refining your proposal through community feedback, the next step is to formalize it by publishing on GitHub. This involves:

- **Create a Pull Request (PR)**: Submit your proposal as a PR to the **`celo-org/governance`** repository. This should include the proposal in markdown format and any associated code in a JSON file. Review previous proposal that are similar to your proposal for hints on how the code should be structured.
- **Celo Governance Proposal (CGP) Editors' Review**: CGP editors will review your submission to ensure it meets the required standards and provide feedback or request changes if necessary. The CGP Editors will assign an id.
- **Acceptance of PR**: Once the CGP editors approve the PR, it signals that your proposal is ready to be submitted on-chain.
- **On-chain Submission**: Accepted proposals can then be submitted on-chain through the Celo CLI for formal voting by the community.

:::danger

Wait for PRs to be merged on proposals prior to submitting on chain

:::

### Step 5: Formal Proposal Submission On-Chain

The formal submission of your proposal to the blockchain will be covered in a separate section but involves using **`celocli`** to submit your proposal on-chain for approval and voting.

:::info

Additionally, when submitting on-chain: the CGP markdown title will not update on celo.stake.id. While the body of the document can be edited if necessary, it is best to ensure all details are correct before submission.

:::

### Step 6: Voting

After submission, your proposal enters the voting phase, which consists of:

- **Upvoting**: If multiple proposals are submitted at the same time in a 24 hour period, then they must receive upvotes. Anyone, including yourself, can upvote proposals. The highest upvoted proposal moves automatically to the Referendum stage.
- **Approval Voting**: Approvers review the proposal for any security risks or potential harm to the network. They may follow up with questions so ensure you are easy to contact via your profile on forum or via a connection with a CGP Editor.
- **Referendum Voting**: Once a proposal is in Referendum stage, all CELO holders may vote on the proposal. They can vote “Yes” to support the proposal, “No” to reject the proposal, and “Abstain” to acknowledge but defer the vote to the remaining community.
- **Quorum**: For a proposal to pass successfully, the total number of CELO voted must meet or exceed Quorum. “Yes”, “No”, and “Abstain” votes all count towards quorum. A successfully proposal must receive a 60% majority of votes above quorum. Quorum needed for proposals is dynamic and depends on previous number of votes on recent proposals.
- **Conclusion**: Approvers have until the proposal’s deadline to approve any passing proposals. Once approved, “Yes” votes exceed 60% of necessary quorum, then they may be Executed.

### Step 7: **Execution**

If the proposal passes the voting phase, it moves to execution. This involves enacting the changes or transferring the funds as outlined in the proposal. Detailed steps for execution will be provided in a subsequent section.

By following these steps, your proposal will go through the necessary stages from conception to execution in the Celo governance process. Proposals must be executed within 3 days from the referendum stage or they will be rejected automatically by the system.

:::info

Warning: Anyone on the network can execute a successful proposal at any time.

:::

## Creating On-Chain Proposal

### **Step 1: Create the Proposal File (mainnet.json)**

In your proposal file in [Governance repository](https://github.com/celo-org/governance/) that is either merged or waiting to be merged, create a folder with your proposal number inside the CGPs folder and create a file called mainnet.json. Check [this](https://github.com/celo-org/governance/blob/main/CGPs/cgp-0075/mainet.json) for example -

Inside this file, paste the following content:

```json
[
 {
  "contract": "GoldToken",
  "function": "approve",
  "args": [
   "0xE1061b397cC3C381E95a411967e3F053A7c50E70",
   "5980314000000000000000000"
  ],
  "value": "0"
 }
]
```

:::info

💡 If requesting funds from Treasury

:::

```json
{
    "contract": "StableToken",
    "address": "0x765DE816845861e75A25fCA122bb6898B8B1282a",
    "function": "increaseAllowance",
    "args": [
      "0x71f433514957d00287A9d33Da759f1e0C1732381",
      "1700000000000000000000000"
    ],
    "value": "0"
  }
```

:::info

💡 If making contract call from Governance Contract

:::

Make sure to replace your address and the amount of CELO you want to approve. Save this file and add it to CGPs folder in the Governance repository.

### Step 2: Submit the Proposal On-Chain

After your PR is merged, we can submit the proposal on-chain.

#### Step 2.1: Install celocli

In your terminal, run the following command to install the [Celo CLI](https://docs.celo.org/cli):

```bash
npm install -g @celo/celocli
```

#### Step 2.2: Target the json file

We will submit the proposal using the `mainnet.json` file you created earlier. To do this, in your terminal:

```bash
cd governance // repository folder
cd CGPs
cd cgp-(your proposal number)
cat mainnet.json
```

Once you see the content of your `mainnet.json`  file in the terminal output, you can submit the proposal using:

```bash
celocli governance:propose --jsonTransactions=mainnet.json  --deposit=100e18 --descriptionURL=https://github.com/celo-org/governance/blob/main/CGPs/cgp-<YOUR_PROPOSAL_ID_IN_GITHUB>.md --from=<YOUR_ADDRESS> --privateKey=<PRIVATE_KEY>
```

Replace the --descriptionURL, --from fields with your proposal Github file URL.

:::info

💡 Note that 100 CELO tokens are required inthe account to submit a proposal. This amount will be refunded to the proposer if the proposal reaches the Approval stage. If a proposal has been on the queue for for more than 4 weeks, it expires and the deposit is forfeited.

:::

:::info

💡 You can see your proposal ID in the terminal output. Save this ID for future use. To see you proposal in detail, run the following command in your terminal: `celocli governance:show --proposalID <number>`

:::

### Step 3: Execute the Proposal

Once the proposal passes the series of votes, you need to execute it. Connect your ledger to your computer and run the following command in your terminal:

```bash
celocli governance:execute --proposalID <number>  --from=<address> --privateKey=<PRIVATE_KEY>
```

Replace `number` with the proposal ID.

## **Best Practices for Creating a Proposal**

- **Clarity and Justification**: Ensure your proposal is clearly written, with straightforward language and a strong justification for why it's needed. Provide as much detail as possible about what you are proposing and why it is beneficial for the Celo ecosystem.
- **Community Engagement**: Engage with the community early on. Seek feedback and address concerns before formal submission. This not only improves your proposal but also builds community support.
- **Security Assessment**: If your proposal involves smart contract code, conduct a thorough security audit. Include the audit report in your proposal to increase credibility and trust.
- **Transparency**: Be transparent about your affiliations and intentions. If your proposal involves funding, detail how the funds will be used.
- **Follow Governance Structure**: Adhere strictly to the governance process as laid out by Celo, including any templates or formats required for proposals.

## **What to Expect in Governance Calls**

- **Presentation Slot**: Be prepared to present your proposal succinctly. Typically, you may be allocated a specific time slot, such as 5 minutes for presentation and 5 minutes for Q&A.
- **Technical Questions**: Expect technical questions from the community, especially if your proposal involves code changes. Be ready to explain complex concepts in accessible language.
- **Community Feedback**: Governance calls are an opportunity for the community to provide direct feedback. Take notes and be open to incorporating this feedback into your proposal.
- **Approval Indicators**: Use these calls as a temperature check on your proposal's likelihood of passing. Positive engagement and constructive feedback are good indicators.
- **Networking**: These calls are an excellent opportunity to network with other members of the Celo ecosystem, which can be valuable for building future support.

Each of these elements is important for navigating the governance calls effectively and maximizing the chance of your proposal's success.

### **FAQ Section for Celo Governance**

1. **What is a multisig wallet, and why is it recommended for proposals?**
    - A multisig wallet requires multiple signatures to authorize transactions, providing increased security and trust for proposals involving treasury funds.
2. **Who are the Governance approvers?**
    - Governance approvers are individuals or entities with the authority to review and approve proposals before they go to a community vote, ensuring they meet certain criteria and standards.
3. **Who are the CGP editors?**
    - CGP (Celo Governance Proposal) editors are responsible for reviewing and managing the content of governance proposals submitted on GitHub to ensure clarity, completeness, and adherence to the format.
4. **How to reach CGP editors?**
    - To reach CGP editors, you can use the Celo Discord channel. They are available to assist with questions and provide guidance on the proposal process.
5. **Can I submit the proposal again?**
    - If a proposal is rejected or needs significant revisions, it may be resubmitted after addressing the community's feedback and making necessary adjustments.
6. **What if I made a mistake in the proposal?**
    - If you discover a mistake in your proposal, it's important to communicate this to the community and CGP editors as soon as possible. Depending on the stage of the proposal, you may need to withdraw and resubmit it with corrections.

## How to create Multisig with Safe and withdraw fund from Treasury?

### **Step: 1 Log in to your Safe**

Log in and click `New Transaction` on the left hand side of the page. This wil bring up a modal, click `Contract Interation`.

> Note: Don't use [https://safe.celo.org/](https://safe.celo.org/) as it is not officilly supported. Use official Safe at - [https://safe.global/](https://safe.global/)

![Governance Safe Creation process step 1](/img/doc-images/governance/governance-safe-multisig-01.png)

### Step 2: **Enter ABI**

Enter the Celo Proxy Address.

![Governance Safe Creation process step 2](/img/doc-images/governance/governance-safe-multisig-2.png)

### Step **3. Change the ABI to the CELO Contract**

Step 2 will auto populate the ABI with the proxy ABI. We will want to change that to the actual CELO ERC20 ABI to access the transferFrom function

> For the image below
>
> 1. This is the Celo Token Proxy Address(0x471ece3750da237f93b8e339c536989b8978a438)
> 2. The ABI of the CELO Token Contract
> 3. This is where our contract interaction is being sent to and this will be the CELO Token proxy.
> 4. The method we want to interact with(We specify the transferFrom)

![Governance Safe Creation process step 3](/img/doc-images/governance/governance-safe-multisig-3.png)

### **Step 4 Fill in the the appropriate addresses**

You will now need to add the addresses you are wishing to interact with

> For the image below:
>
>
> 5. from(address): This is the Celo Governance Contract(0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972)
> 6. to(address): This is the address you are wishing to transfer funds from the Governance contract to. It could be the multisig you are using to do this interaction from or any other address.
> value(uint256)*: The wei amount of funds you are wishing to transfer. eg 1 CELO = 10 ** 18
> you can use [this](https://eth-converter.com/) webpage to easily convert CELO to the wei value

![Governance Safe Creation process step 4](/img/doc-images/governance/governance-safe-multisig-4.png)

### Step 5: **Create Transaction**

Click `Add Transaction`, and after that other multisig signers will need to confirm the transaction. Once the required number of signers have confirmed the transaction, it will be executed. You can also add a description to the transaction to help other signers understand the purpose of the transaction.
