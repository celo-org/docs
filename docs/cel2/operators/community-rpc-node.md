# Running a Community RPC Node

After Celo Mainnet transitions to L2, validators that are eligible, registered and elected must run RPC nodes in order to be eligible for rewards.

## Registering

To register as a validator, follow [the instructions](/validator/run/mainnet#registering-as-a-validator). The only difference is that BLS signatures are not required.

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
    $ celocli account:create-metadata ./metadata.json --from $VALIDATOR_SIGNER`
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

    If your account is based of a [ReleaseGold contract](/holder/manage/release-gold), you should use the command `$ celocli releasecelo:set-account`. Docs can be found [here](/cli/releasecelo#celocli-releaseceloset-account).

    :::

5. Verify that the metadata registration was successful by retrieving it:

    ```bash
    $ celocli account:get-metadata $ACCOUNT_ADDRESS
    ```

6. To list all registered RPC URLs:

    ```bash
    $ celocli network:rpc-urls [--node $NETWORK]
    ```
