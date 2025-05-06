# Running a Community RPC Node

After Celo Mainnet transitions to L2, validators that are eligible, registered and elected must run RPC nodes in order to be eligible for rewards.

## Registering

To register as a validator, follow [the instructions](/what-is-celo/about-celo-l1/validator/run/mainnet#registering-as-a-validator). The only difference is that BLS signatures are not required.

## Run a node

See the guides for [running a node](run-node.md) or the guide on [how to migrate a L1 node](migrate-node.md).

## Register as RPC provider

To register as a RPC provider, a public HTTPS URL needs to be registered on-chain, in a signed metadata file in the Celo Account.

:::info

Make sure to use [Celo CLI](/cli/index.md) at version `6.1.0` or later

:::

The `--from`  flag in the CLI can either be the validator account itself, or the validator signer.

1. Create a new metadata file. If, instead, you want to update an existing one, download it instead of creating it.

    ```bash
    $ celocli account:create-metadata ./metadata.json --from $VALIDATOR_SIGNER
    ```

2. Register your public RPC URL:

    ```bash
    $ celocli account:claim-rpc-url ./metadata.json --from $VALIDATOR_SIGNER --rpcUrl $RPC_URL
    ```

3. Upload this metadata file to a publicly available URL with high availability.
4. Now link this URL to the validator Celo account:

    ```bash
    $ celocli account:register-metadata --url $METADATA_URL --from $ACCOUNT_ADDRESS
    ```

    :::info

    If your account is a [ReleaseGold contract](/what-is-celo/using-celo/manage/release-gold), you should use the command `$ celocli releasecelo:set-account`. Docs can be found [here](/cli/releasecelo#celocli-releaseceloset-account).

    :::

5. Verify that the metadata registration was successful by retrieving it:

    ```bash
    $ celocli account:get-metadata $ACCOUNT_ADDRESS
    ```

6. To list all registered RPC URLs:

    ```bash
    $ celocli network:rpc-urls [--node $NETWORK]
    ```

## Validator Rewards

### Claiming Validator Rewards

To receive validator rewards for running RPC nodes, the allocated epoch payment must be explicitly claimed using the CLI command below. Note that this command can be run by anyone, but rewards will be distributed according to the validator group's set commission rate.

To claim validator rewards use [celocli epochs:send-validator-payment](https://docs.celo.org/cli/epochs#celocli-epochssend-validator-payment):

```bash
$ celocli epochs:send-validator-payment --from $YOUR_ADDRESS --for $VALIDATOR_ADDRESS
```

Replace:

- `$YOUR_ADDRESS` with your Celo account address from which the transaction is sent.
- `$VALIDATOR_ADDRESS` with your validator's Celo account address.

### Verifying Reward Distribution

After claiming, you can verify that rewards were successfully distributed by checking for the `ValidatorEpochPaymentDistributed` event on a blockchain explorer like [CeloScan](https://celoscan.io/address/0xf424b5e85b290b66ac20f8a9eab75e25a526725e).

### Tracking rewards distributions

Some use cases may require validators to track their CELO reward distribution for accounting purposes. Since the reward block no longer exists, validators can query Celo nodes for `ValidatorEpochPaymentDistributed` events and query the [EpochManager contract](https://docs.celo.org/contracts/core-contracts) for `validatorPendingPayments` to get the total payments that have been allocated to their validators.

### Group Commission Considerations

Validator rewards distribution is affected by the validator group's commission rate. A commission rate of `1` means the entire reward goes to the validator group. Ensure you understand your group's commission settings to correctly anticipate reward allocations. Commision can be queried with [celocli validatorgroup:show](https://docs.celo.org/cli/validatorgroup#celocli-validatorgroupshow-arg1) and updated with [celocli validatorgroup:commission](https://docs.celo.org/cli/validatorgroup#celocli-validatorgroupcommission).
