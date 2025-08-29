# Registering a Community RPC provider

Step-by-step instructions on how to register a RPC node on chain to be eligible for rewards.

---

:::info **Terminology**
The term "validator" is used in the code and corresponding explanation due to historical reasons, but refers to the community RPC providers.
:::

## Prerequisites

### Software Requirements

Install the Celo CLI following the [Command Line Interface (CLI)](/cli/) setup instructions. Ensure you're using Node.js version 18 or higher.

### Staking Requirements

To register as a community RPC provider, you need:

- **10,000 CELO** to register an RPC node
- **10,000 CELO per member RPC** to register an RPC Group

If you don't have enough CELO, you can practice the registration process on the [Celo Sepolia Testnet](/network/celo-sepolia). Use the [testnet faucet](https://faucet.celo.org/celo-sepolia) to get test CELO - select "Advanced Needs" when requesting funds for RPC provider testing.

### Key Management

:::danger
Private keys are the central primitive of any cryptographic system and need to be handled with extreme care. Loss of your private key can lead to irreversible loss of assets.
:::

This guide contains a large number of keys, so it is important to understand the purpose of each key. [Read more about key management.](/what-is-celo/about-celo-l1/validator/key-management/summary)

### Account and Signer Keys

Running an RPC node involves managing multiple keys with different security levels and permissions. Keys used frequently (like those for updating URLs) are more vulnerable to compromise and therefore have limited permissions. Keys used less often (such as for locking CELO) can be stored more securely and have broader permissions.

Below is a summary of the different keys used in the Celo network and their specific permissions:

| Name of the key        | Purpose                                                                                                                                                                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account key            | This is the key with the highest level of permissions, and is thus the most sensitive. It can be used to lock and unlock CELO, and authorize vote, validator, and attestation keys. Note that the account key also has all of the permissions of the other keys. |
| Validator signer key   | This is the key that has permission to register and manage a node or a Group.                                                                                                                                     |
| Vote signer key        | This key can be used to vote in Validator elections and on-chain governance.                                                                                                                                                                                     |

## Addresses Used

In this guide, the following addresses will be used:

| Address name           | Purpose                                                                                                | Owner entity  | Recommended storage |
|------------------------|--------------------------------------------------------------------------------------------------------|---------------|---------------------|
| CELO_GROUP_ADDRESS     | Address representing a group, with up to five nodes. It's the account that will receive votes.         | Group         | Cold                |
| CELO_NODE_ADDRESS      | Address that represent a node.                                                                         | Node          | Cold                |
| CELO_VALIDATOR_SIGNER | Address authorized to generate signers or deregister members or join/leave a group. It can be rotated. | Node operator | Hot                 |

Groups and validators may be run by different entities. This guide assumes they are running by the same entity, but you can skip those if not relevant to your specific setup.

## Setting Up Accounts

This amount (10,000 CELO) represents the minimum amount needed to be locked in order to register a Validator and Validator group.

:::warning
Note that you will want to be sure to leave enough CELO unlocked to be able to continue to pay transaction fees for future transactions (such as those issued by running some CLI commands).
:::

Check that your CELO was successfully locked with the following commands:

```bash
celocli lockedcelo:show $CELO_GROUP_ADDRESS
celocli lockedcelo:show $CELO_NODE_ADDRESS
```

### Setting Up the Group Account

#### Lock CELO

Lock up CELO for both accounts to secure the right to register a Validator and Validator Group. You need 10,000 CELO to register a node. This CELO stays locked for approximately 60 days after deregistration.

```bash
celocli lockedcelo:lock --from $CELO_GROUP_ADDRESS --value 10000e18
```

:::info
The Celo CLI needs an RPC address. You can use the Celo Community RPC gateway with `-n https://rpc.celo-community.org`.
:::

:::info
You can use the Celo CLI with a Ledger hardware wallet (see [CLI docs](/wallet/ledger/to-celo-cli)) or pass a private key directly with the `--privateKey` flag. Both options work with any transaction-signing command.
:::

### Setting Up the Node Account

#### Lock CELO

Lock up CELO for the node account to secure the right to register a Validator. You need 10,000 CELO to register a node. This CELO stays locked for approximately 180 days after removal of the Nth validator from the group.

```bash
celocli lockedcelo:lock --from $CELO_NODE_ADDRESS --value 10000e18
```

#### Create a Validator Signer

To register as a node, you need to generate a validator signer key. You can create this account by:

- Exporting a private key from a wallet (like MetaMask)
- Using a hardware wallet
- Running the command below:

```bash
# On the validator machine
celocli account:new
```

:::warning
Make sure to safely store the signer key.
:::

#### Create a Validator Signer Proof-of-Possession

Next, create a proof-of-possession to verify you control the validator signer private key. This involves signing a message containing the validator account address.

```bash
celocli account:proof-of-possession --signer $CELO_VALIDATOR_SIGNER_ADDRESS --account $CELO_NODE_ADDRESS
```

#### Register Node Metadata On-Chain

Before proceeding with the election process, you need to register your node's metadata on-chain. This step is critical - nodes without proper metadata are at risk of being slashed.

For detailed instructions on registering your node URL and metadata, see [Registering the Node URL](#registering-the-node-url).

## Register the Nodes and Group

To participate in elections as an RPC provider, you must register both your group and individual node. When registering a Group, you'll need to specify a [commission](/what-is-celo/about-celo-l1/protocol/pos/validator-groups#group-share) - this is the percentage of epoch rewards that group members pay to the group.

Since we want to keep our account key secure, we'll first authorize the validator signing key instead of using the account key for validation:

#### Authorize Signer

```bash
celocli account:authorize --from $CELO_NODE_ADDRESS --role validator --signature 0x$CELO_VALIDATOR_SIGNER_SIGNATURE --signer 0x$CELO_VALIDATOR_SIGNER_ADDRESS
```

Confirm by checking the authorized Validator signer for your Validator:

```bash
celocli account:show $CELO_NODE_ADDRESS
```

#### Registering the Group

Register your Group using the following command. Since we haven't authorized a validator signer for the Group account, use the account key for registration.

```bash
celocli validatorgroup:register --from $CELO_GROUP_ADDRESS --commission 0.1
```

View your Validator Group information:

```bash
celocli validatorgroup:show $CELO_GROUP_ADDRESS
```

#### Registering the Node

Register your node with the following command. Since we authorized a validator signer, this step can be performed on the validator machine. Running it locally avoids installing the [Celo CLI](/cli/) on the validator machine.

```bash
celocli validator:register --from $CELO_NODE_ADDRESS --ecdsaKey $CELO_VALIDATOR_SIGNER_PUBLIC_KEY
```

#### Affiliate the Node to the Group

Link your node to your Group. Note that you won't be a group member until the Group accepts the affiliation. This command can also be run from the validator signer on the validator machine.

```bash
celocli validator:affiliate $CELO_GROUP_ADDRESS --from $CELO_NODE_ADDRESS
```

Accept the affiliation request:

```bash
celocli validatorgroup:member --accept $CELO_NODE_ADDRESS --from $CELO_GROUP_ADDRESS
```

Verify that your node is now a member of your Group:

```bash
celocli validator:show $CELO_NODE_ADDRESS
celocli validatorgroup:show $CELO_GROUP_ADDRESS
```

## Registering the Node URL

To register your node as an RPC provider, you must register a public HTTPS URL on-chain through a signed metadata file in your Celo Account.

The `--from` flag in the CLI commands can use either the validator account itself or the validator signer.

#### Create Metadata File

Create a new metadata file for your node. If you need to update an existing metadata file, download it instead of creating a new one.

```bash
celocli account:create-metadata ./metadata.json --from $CELO_VALIDATOR_SIGNER_ADDRESS
```

#### Claim RPC URL

Register your public RPC URL in the metadata file:

```bash
celocli account:claim-rpc-url ./metadata.json --from $CELO_VALIDATOR_SIGNER_ADDRESS --rpcUrl $RPC_URL
```

#### Upload Metadata

Upload the metadata file to a publicly available URL with high availability.

#### Register Metadata URL

Link the metadata URL to your validator Celo account:

```bash
celocli account:register-metadata --url $METADATA_URL --from $CELO_NODE_ADDRESS
```

:::info
If your account is a [ReleaseGold contract](/what-is-celo/using-celo/manage/release-gold), use the command `celocli releasecelo:set-account` instead. Documentation can be found [here](/cli/releasecelo#celocli-releaseceloset-account).
:::

#### Verify Registration

Confirm that the metadata registration was successful:

```bash
celocli account:get-metadata $CELO_NODE_ADDRESS
```

You can also list all registered RPC URLs on the network:

```bash
celocli network:rpc-urls
```

## Voting

As an optional step, you can use both accounts to vote for your Group.

#### Vote With All Accounts

Since we haven't authorized a vote signer for either account, these transactions must be sent using the account keys.

:::info
You can only run these commands with accounts you control. All commands are listed here for the sake of completeness.
:::

```bash
celocli election:vote --from $CELO_NODE_ADDRESS --for $CELO_GROUP_ADDRESS --value 10000e18
celocli election:vote --from $CELO_GROUP_ADDRESS --for $CELO_GROUP_ADDRESS --value 10000e18
```

Verify that your votes were cast successfully:

```bash
celocli election:show $CELO_NODE_ADDRESS --voter
celocli election:show $CELO_GROUP_ADDRESS --group
celocli election:show $CELO_GROUP_ADDRESS --voter
```

#### Activate Your Votes

Users voting in the Celo protocol receive epoch rewards only after submitting a special transaction to activate their votes. This must be done every time new votes are cast, and can only be executed after the most recent epoch has ended. Use the following command, which waits until the epoch ends before sending the transaction:

```bash
# Note: This may take time as the epoch needs to end before votes can be activated
celocli election:activate --from $CELO_NODE_ADDRESS --wait && 
celocli election:activate --from $CELO_GROUP_ADDRESS --wait
```

Confirm that your votes were activated by running:

```bash
celocli election:show $CELO_NODE_ADDRESS --voter
celocli election:show $CELO_GROUP_ADDRESS --voter
```

## Watching the Election Process

You're all set! Elections are finalized at the end of each epoch, roughly once a day on Mainnet. If elected, your node will start participating. After the first epoch of participation, you'll receive your first epoch rewards.

You can view current election status and the minimum votes needed on [Mondo](https://mondo.celo.org/).

Inspect the current validator elections:

```bash
celocli election:list
```

Check your node's status, including election status:

```bash
celocli validator:status --validator $CELO_NODE_ADDRESS
```

View additional node information, including uptime score:

```bash
celocli validator:show $CELO_NODE_ADDRESS
```

## Rewards

### CELO Rewards

If your Validator Group elects validators, you'll receive epoch rewards as additional Locked CELO voting for your Validator Group. You can monitor these rewards using the previous commands and:

```bash
celocli lockedcelo:show $CELO_GROUP_ADDRESS
celocli lockedcelo:show $CELO_NODE_ADDRESS
```

### cUSD Rewards

Active validators receive cUSD rewards based on their validator score, calculated as part of the L2 epoch rewards process (see `EpochRewards.calculateTargetEpochRewards()`). For more details, refer to the [L2 Epoch Rewards documentation](../../what-is-celo/using-celo/protocol/epoch-rewards/index.md).

For reward claiming instructions, see [Claiming Rewards](./community-rpc-node#claiming-rewards).
