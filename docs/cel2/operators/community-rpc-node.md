# Running a community RPC node

After Celo mainnet transitions to L1, validators that are eligible, registered and elected must run PRC nodes in order to be eligible for rewards.

## Registering

To register as a validator, follow the instructions as in the [current docs](https://docs.celo.org/network/mainnet/run-validator#registering-as-a-validator). The only difference is that BLS signatures are not required.

## Run a node

See the guides for [running a node](run-node.md) or the guide on [how to migrate a L1 node](migrate-node.md).

## Register as RPC provider

To register as a RPC provider, a public https url needs to be registered on-chain. To do this, we will register the rpc url in a signed metadata file in the Celo Account.

:::info

Make sure to be in CLI in version at least `6.0.0-beta.5`

:::

The `--from`  flag in the CLI can either be the validator account itself, or the validator signer. 

1. Create a new metadata file. If, instead, you want to update an existing one, download it instead of creating it.

    `$ celocli account:create-metadata ./metadata.json --from $VALIDATOR_SIGNER`

2. Register your public RPC url:

    `$ celocli account:claim-rpc-url ./metadata.json --from $VALIDATOR_SIGNER --rpcUrl $RPC_URL`

3. Upload this metadata file to a publicly available URL with high availability.
4. Now link this URL to the validator Celo account:

    `$ celocli account:register-metadata --url $METADATA_URL --from $ACCOUNT_ADDRESS` 

5. Verify that the metadata registration was successful by retrieving it:

    `$ celocli account:get-metadata $ACCOUNT_ADDRESS`
