# Running a Community RPC Node

After Celo Mainnet transitions to L2, validators that are eligible, registered and elected must run RPC nodes in order to be eligible for rewards. This guide assumes the node has ben properly [registered](/cel2/operators/registering-as-rpc-node).

## Running the RPC node

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

## Rewards

### Claiming Rewards

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

Some use cases may require validators to track their CELO reward distribution for accounting purposes. Since the reward block no longer exists, validators can query Celo nodes for `ValidatorEpochPaymentDistributed` events and query the [EpochManager contract](/contracts/core-contracts) for `validatorPendingPayments` to get the total payments that have been allocated to their validators.

### Group Commission Considerations

Validator rewards distribution is affected by the validator group's commission rate. A commission rate of `1` means the entire reward goes to the validator group. Ensure you understand your group's commission settings to correctly anticipate reward allocations. Commision can be queried with [celocli validatorgroup:show](https://docs.celo.org/cli/validatorgroup#celocli-validatorgroupshow-arg1) and updated with [celocli validatorgroup:commission](https://docs.celo.org/cli/validatorgroup#celocli-validatorgroupcommission).


#### Account Creation

:::info

Please complete this section if you are new to validating on Celo.

:::

##### Account and Signer keys

Running a Celo Validator node requires the management of several different keys, each with different privileges. Keys that need to be accessed frequently (e.g. for signing blocks) are at greater risk of being compromised, and thus have more limited permissions, while keys that need to be accessed infrequently (e.g. for locking CELO) are less onerous to store securely, and thus have more expansive permissions. Below is a summary of the various keys that are used in the Celo network, and a description of their permissions.

| Name of the key        | Purpose                                                                                                                                                                                                                                                          |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account key            | This is the key with the highest level of permissions, and is thus the most sensitive. It can be used to lock and unlock CELO, and authorize vote, validator, and attestation keys. Note that the account key also has all of the permissions of the other keys. |
| Validator signer key   | This is the key that has permission to register and manage a Validator or Validator Group, and participate in BFT consensus.                                                                                                                                     |
| Vote signer key        | This key can be used to vote in Validator elections and on-chain governance.                                                                                                                                                                                     |
| Attestation signer key | This key is used to sign attestations in Celo's lightweight identity protocol.                                                                                                                                                                                   |

Note that Account and all the signer keys must be unique and may not be reused.


## Starting the RPC node

To run the RPC endpoint required in this guide, refer to the  [Running a node guide](run-node.md).