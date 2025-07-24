# Operating a Community RPC Node

This guide covers how to operate a community RPC node on Celo.

---

:::info **Terminology**
The term "validator" appears in code and documentation due to historical reasons, but refers to community RPC providers.
:::

To be eligible for rewards, registered and elected nodes must operate independent RPC endpoints. This guide assumes your node has been properly [registered](/cel2/operators/registering-as-rpc-node).

## Running the RPC Service

To operate the required RPC endpoint, follow the [Running a node guide](run-node.md).

## Rewards

### Claiming Rewards

Validator rewards for RPC nodes must be explicitly claimed each epoch. Use the following CLI command to claim rewards:

```bash
celocli epochs:send-validator-payment --from $YOUR_ADDRESS --for $VALIDATOR_ADDRESS
```

Where:

- `$YOUR_ADDRESS` is your Celo account address sending the transaction
- `$VALIDATOR_ADDRESS` is your validator's Celo account address

Note: anyone can run this command, but rewards distribute according to your validator group's commission rate.

### Verifying Rewards

Confirm successful reward distribution by checking for `ValidatorEpochPaymentDistributed` events on a block explorer like [CeloScan](https://celoscan.io/address/0xf424b5e85b290b66ac20f8a9eab75e25a526725e).

### Tracking Rewards

For accounting purposes, you can:

- Query Celo nodes for `ValidatorEpochPaymentDistributed` events.
- Query the [EpochManager contract](/contracts/core-contracts) for `validatorPendingPayments` to view total allocated payments.

### Group Commission Settings

Validator rewards distribution is affected by the validator group's commission rate. A commission rate of `1` means the entire reward goes to the validator group. Ensure you understand your group's commission settings to correctly anticipate reward allocations.

Check commission settings with:

```bash
celocli validatorgroup:show $CELO_GROUP_ADDRESS
```

Update commission settings with the [celocli validatorgroup:commission](/cli/validatorgroup) command.
