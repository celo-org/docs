# Running community RPC node

After Celo mainnet transitions to Celo L2, validators that are registered and elected can continue to receive rewards by running PRC nodes. These steps outline how validators can publish the URL of their RPC node in order to be eligible for rewards. To reduce the risk of slashing, these steps should be followed before the L2 upgrade.

## Registering

If you're not yet a validator, you must first register. You can follow the instructions to do so  [here](/cel2/network/mainnet/run-validator#registering-as-a-validator).


## Run a node

If you're not yet running a node, see the [following instructions](/cel2/operators/docker-node).

## Register as a community RPC provider

To register as a RPC provider, a public https url needs to be registered on-chain. To do this, we will register the rpc url in a signed metadata file that's used to share additional information about Celo accounts.

> Make sure to be in CLI in version at least `6.0.0-beta.5`
> 

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
