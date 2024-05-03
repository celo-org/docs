---
title: Create Proposal for Governance
description: How to Create a Proposal in Celo Governance- A Detailed Guide
---

## Prerequisites

Before you begin, you will need:

- You have a basic understanding of Git and Github.
- Your computer has Node.js installed. If not, you can download it from [here](https://nodejs.org/).
- You have a written proposal (preferably merged) to the Celo governance repository on Github. Check this [proposal](https://github.com/celo-org/governance/blob/main/CGPs/cgp-0075.md) for a reference.
- You own a Ledger Hardware Wallet. Here is a tutorial on how to set it up. (Optional)

## Understanding Celo's Governance Model

Celo uses on-chain governance model, which involves four phases:

- Proposal: Any user can propose a change by paying a deposit in CELO tokens. Proposals are drafted in JSON format and state the proposed changes.
- Approval: A multisig "Governance Approver" contract, initially set to a group of reputable validators, approves proposals that will proceed to a vote.
- Referendum: Once approved, all users can vote on the proposal. Voting power is proportional to a user's locked CELO balance. A proposal is passed if it meets the quorum and approval conditions.
- Execution: Proposals that graduate from the Referendum phase to the Execution phase may be executed by anyone, triggering a call operation code with the arguments defined in the proposal, originating from the Governance smart contract.

## Steps to Create a Proposal

### Step 1: Create the Proposal File (mainnet.json)

In your proposal file in [Governance repository](https://github.com/celo-org/governance/) that is either merged or waiting to be merged, create a folder with your proposal number inside the CGPs folder and create a file called mainnet.json. Check [this](https://github.com/celo-org/governance/blob/main/CGPs/cgp-0075/mainet.json) for example -

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

Make sure to replace your address and the amount of CELO you want to approve. Save this file and add it to CGPs folder in the Governance repository.

### Step 2: Submit the Proposal On-Chain

After your PR is merged, we can submit the proposal on-chain.

#### Step 2.1: Install celocli

In your terminal, run the following command to install the [Celo CLI](https://docs.celo.org/cli):

```bash
npm install -g @celo/celocli
```

If you encounter any errors, try installing Node.js version 12 with the following commands:

```bash
nvm install 12 && nvm use 12
npm install -g @celo/celocli
```

#### Step 2.2: Target the json file

We will submit the proposal using the `mainnet.json` file you created earlier. To do this, in your terminal:

```bash
cd governance // repository folder
cd CGPs
cd cgp-(your proposal number)
cat mainnet.json
```

Once you see the content of your mainnet.json file in the terminal output, you can submit the proposal using:

```bash
celocli governance:propose --jsonTransactions=mainnet.json  --deposit=100e18 --descriptionURL=https://github.com/celo-org/governance/blob/main/CGPs/cgp-0075.md --from=0x48853EB3D2d69232BF28Ab3cFE535d0351ed0000 --useLedger --ledgerAddresses=5
```

Replace the --descriptionURL, --from fields with your proposal Github file URL and Ledger Wallet Address, respectively. Ensure your Ledger device is connected to your computer and the Celo app is open. Approve the transaction on your Ledger device.

:::info

Note that 100 CELO tokens are required inthe account to submit a proposal. This amount will be refunded to the proposer if the proposal reaches the Approval stage. If a proposal has been on the queue for for more than 4 weeks, it expires and the deposit is forfeited.

:::

:::info

If you don't have ledger configured with Celo, follow [this](https://docs.celo.org/wallet/ledger/setup#:~:text=Setting%20up%20the%20Celo%20app,is%20ready%20on%20the%20screen.) guide to set it up.

:::

:::info

Alternatively, you can also use private key instead of Ledger. To do this, replace the --useLedger and --ledgerAddresses fields with --privateKey.

:::

:::info

You can see your proposal ID in the terminal output. Save this ID for future use. To see you proposal in detail, run the following command in your terminal: `celocli governance:show --proposalID <number>`

:::

### Step 3: Execute the Proposal

Once the proposal passes the series of votes, you need to execute it. Connect your ledger to your computer and run the following command in your terminal:

```bash
celocli governance:execute --proposalID <number>  --from=<ledger address> --useLedger --ledgerAddresses=5
```

Replace `number` with the proposal ID and `ledger address` with your Ledger Wallet Address.
