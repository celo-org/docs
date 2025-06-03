# Registering as RPC provider

This documents gives step-by-step instructions about how to register a RPC node on chain to be eligible for rewards, for an overview of how elections work visit [How it works](how-it-works)

## Prerequisites

### Staking Requirements

The current requirement is 10,000 CELO to register a RPC node, and 10,000 CELO _per member RPC_ to register a RPC Group.

If you do not have the required CELO to lock up, you can try out of the process of creating a validator on the Baklava or Alfajores testnets. TODO link to testnets. TODO how to get testnet Celo.

### Software requirements

- **You have celocli installed.**

  See [Command Line Interface (CLI)](/cli/) for instructions on how to get set up.

  TODO set the node to community RPC nodes.

:::info

Make sure to be in node version 18 or higher

:::


:::info

A note about conventions:
The code snippets you'll see on this page are bash commands and their output.

When you see text in angle brackets &lt;&gt;, replace them and the text inside with your own value of what it refers to. Don't include the &lt;&gt; in the command.

:::

### Key Management

Private keys are the central primitive of any cryptographic system and need to be handled with extreme care. Loss of your private key can lead to irreversible loss of assets.

This guide contains a large number of keys, so it is important to understand the purpose of each key. [Read more about key management.](/what-is-celo/about-celo-l1/validator/key-management/summary)

### Summary of keys involved

| Account name           | Purpose                                                                                                | Owner entity  | Recommended storage |
|------------------------|--------------------------------------------------------------------------------------------------------|---------------|---------------------|
| CELO_GROUP_ADDRESS     | Accounts representing a group, with up to five nodes. It's the account that will receive votes.        | Group         | Cold                |
| CELO_NODE_ADDRESS      | Account that represent a node.                                                                         | Node          | Cold                |
| CELO_VALIDATOR_SINGER* | Account authorized to generate signers or deregister members or join/leave a group. It can be rotated. | Node operator | Hot                 |

\* The name "validator" is legacy as it was used for Celo Validators when Celo was an L1.

Groups and validators may be run by different entities. This guide assumes they are running by the same entity, but you can skip those if not relevant to your specific setup.


### Set up the Group Account

#### Lock up CELO

Lock up CELO for both accounts in order to secure the right to register a Validator and Validator Group. The current requirement is 10,000 CELO to register a node. For nodes, this Celo remains locked for approximately 60 days following deregistration.

```bash
# On your local machine
celocli lockedcelo:lock --from $CELO_GROUP_ADDRESS --value 10000e18
```

### Set up the Node Account

#### Lock up CELO

Lock up CELO with the  Group account. The current requirement is 10,000 CELO _per member node_ to register a Validator Group. For groups, this Celo approximately 180 days following the removal of the Nth validator from the group.

```bash
# On your local machine
celocli lockedcelo:lock --from $CELO_NODE_ADDRESS --value 10000e18
```

TODO ledger
TODO foundry migration

#### Create a Validator Signer

To actually register as a node, we'll need to generate a validating signer key. This account can be created in many ways, by exporting a private key from a wallet (like metamask), a hardware wallet or by running the following command:

```bash
# On the validator machine
$ celocli account:new
```

Make sure to store that key safetly.

#### Creating Validator Signer Proof-of-Possession


To actually register as a node, we need to create a proof that we have possession of the Validator signer private key. We do so by signing a message that consists of the Validator account address. 

```bash
# On your local machine
$ celocli account:proof-of-possession --signer $CELO_VALIDATOR_SIGNER_ADDRESS --account $CELO_NODE_ADDRESS
```

TODO ledger or private key

### Lock up CELO

Lock up CELO for both accounts in order to secure the right to register a Node and  Group. The current requirement is 10,000 CELO to register a validator, and 10,000 CELO _per member validator_ to register a Validator Group. For Validators, this Celo remains locked for approximately 60 days following deregistration. For groups, this Celo remains locked for approximately 60 days following the removal of the Nth validator from the group.

```bash
# On your local machine
celocli lockedcelo:lock --from $CELO_GROUP_ADDRESS --value 10000e18
```

:::info

TODO to use a hardware wallet, please use the flags TODO

:::

This amount (10,000 CELO) represents the minimum amount needed to be locked in order to register a Validator and Validator group. **Note that you will want to be sure to leave enough CELO unlocked to be able to continue to pay transaction fees for future transactions (such as those issued by running some CLI commands)**.
Check that your CELO was successfully locked with the following commands:

```bash
# On your local machine
celocli lockedcelo:show $CELO_GROUP_ADDRESS
celocli lockedcelo:show $CELO_NODE_ADDRESS
```

### Run for election

In order to be elected as a RPC provider, you will first need to register your group and the node itself. Note that when registering a Group, you need to specify a [commission](/what-is-celo/about-celo-l1/protocol/pos/validator-groups#group-share), which is the fraction of epoch rewards paid to the group by its members.
We don't want to use our account key for validating, so first let's authorize the validator signing key:

#### Authorize signer
```bash
# On your local machine
celocli account:authorize --from $CELO_NODE_ADDRESS --role validator --signature 0x$CELO_VALIDATOR_SIGNER_SIGNATURE --signer 0x$CELO_VALIDATOR_SIGNER_ADDRESS
```

Confirm by checking the authorized Validator signer for your Validator:

```bash
# On your local machine
celocli account:show $CELO_NODE_ADDRESS
```

#### Register group

Then, register your Group by running the following command. Note that because we did not authorize a Validator signer for our Validator Group account, we register the Validator Group with the account key.

```bash
# On your local machine
celocli validatorgroup:register --from $CELO_GROUP_ADDRESS --commission 0.1
```

You can view information about your Validator Group by running the following command:

```bash
# On your local machine
celocli validatorgroup:show $CELO_GROUP_ADDRESS
```

#### Register the node

Next, register your Validator by running the following command. Note that because we have authorized a Validator signer, this step could also be performed on the Validator machine. Running it on the local machine allows us to avoid needing to install the [`celocli`](https://docs.celo.org/cli) on the Validator machine.

```bash
# On your local machine
celocli validator:register --from $CELO_NODE_ADDRESS --ecdsaKey $CELO_VALIDATOR_SIGNER_PUBLIC_KEY --blsKey $CELO_VALIDATOR_SIGNER_BLS_PUBLIC_KEY --blsSignature $CELO_VALIDATOR_SIGNER_BLS_SIGNATURE
```

#### Affiliate the node to the group

Affiliate your Validator with your Validator Group. Note that you will not be a member of this group until the Validator Group accepts you. This command could also be run from the Validator signer, if running on the validator machine.

```bash
# On your local machine
celocli validator:affiliate $CELO_GROUP_ADDRESS --from $CELO_NODE_ADDRESS
```

Accept the affiliation:

```bash
# On your local machine
celocli validatorgroup:member --accept $CELO_NODE_ADDRESS --from $CELO_GROUP_ADDRESS
```

Next, double check that your Validator is now a member of your Validator Group:

```bash
# On your local machine
celocli validator:show $CELO_NODE_ADDRESS
celocli validatorgroup:show $CELO_GROUP_ADDRESS
```

#### Voting

As an optional step, you can use both accounts to vote for your Validator Group. Note that because we have not authorized a vote signer for either account, these transactions must be sent from the account keys.

```bash
# On your local machine
celocli election:vote --from $CELO_NODE_ADDRESS --for $CELO_GROUP_ADDRESS --value 10000000000000000000000
celocli election:vote --from $CELO_GROUP_ADDRESS --for $CELO_GROUP_ADDRESS --value 10000000000000000000000
```

Double check that your votes were cast successfully:

```bash
# On your local machine
celocli election:show $CELO_GROUP_ADDRESS --group
celocli election:show $CELO_GROUP_ADDRESS --voter
celocli election:show $CELO_NODE_ADDRESS --voter
```

##### Activating the votes

Users voting in the Celo protocol receive epoch rewards for voting in Elections only after submitting a special transaction to enable them. This must be done every time new votes are cast, and can only be made after the most recent epoch has ended. For convenience, we can use the following command, which will wait until the epoch has ended before sending a transaction:

```bash
# On your local machine
# Note that this may take some time, as the epoch needs to end before votes can be activated
celocli election:activate --from $CELO_NODE_ADDRESS --wait && celocli election:activate --from $CELO_GROUP_ADDRESS --wait
```

Check that your votes were activated by re-running the following commands:

```bash
# On your local machine
celocli election:show $CELO_GROUP_ADDRESS --voter
celocli election:show $CELO_NODE_ADDRESS --voter
```

#### Election

You're all set! Elections are finalized at the end of each epoch, roughly once a day in the Mainnet network. After that hour, if you get elected, your node will start participating BFT consensus and validating blocks. After the first epoch in which your Validator participates in BFT, you should receive your first set of epoch rewards.

TODO you can check the minimum for election in Mondo.

You can inspect the current state of the validator elections by running:

```bash
# On your local machine
celocli election:list
```

You can check the status of your validator, including whether it is elected and signing blocks, at [stats.celo.org](https://stats.celo.org/) or by running:

```bash
celocli validator:status --validator $CELO_NODE_ADDRESS
```

You can see additional information about your validator, including uptime score, by running:

```bash
# On your local machine
celocli validator:show $CELO_NODE_ADDRESS
```

#### Rewards

##### Celo

If your Validator Group elects validators, you will receive epoch rewards in the form of additional Locked CELO voting for your Validator Group from your account addresses. You can see these rewards accumulate with the commands in the previous set, as well as:

```bash
# On your local machine
celocli lockedcelo:show $CELO_GROUP_ADDRESS
celocli lockedcelo:show $CELO_NODE_ADDRESS
```

##### cUSD

TODO
