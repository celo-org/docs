# Running a Community RPC Node

After Celo Mainnet transitions to L2, validators that are eligible, registered and elected must run RPC nodes in order to be eligible for rewards.

## Registering

To register as an RPC provder, follow [the instructions](/cel2/operators/registering-as-rpc-node)

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

##### Generating Validator and Validator Group Keys

First, you'll need to generate account keys for your Validator and Validator Group.

:::warning

These keys will control your locked CELO, and thus should be handled with care.
Store and back these keys up in a secure manner, as there will be no way to recover them if lost or stolen.

:::

```bash
# On your local machine
mkdir celo-accounts-node
cd celo-accounts-node
docker run -v $PWD:/root/.celo --rm -it $CELO_IMAGE account new
docker run -v $PWD:/root/.celo --rm -it $CELO_IMAGE account new
```

This will create a new keystore in the current directory with two new accounts.
Copy the addresses from the terminal and set the following environment variables:

```bash
# On your local machine
export CELO_VALIDATOR_GROUP_ADDRESS=<YOUR-VALIDATOR-GROUP-ADDRESS>
export CELO_VALIDATOR_ADDRESS=<YOUR-VALIDATOR-ADDRESS>
```


### Start your Accounts node

Next, we'll run a node on your local machine so that we can use these accounts to lock CELO and authorize the keys needed to run your validator. To do this, we need to run the following command to run the node.

```bash
# On your local machine
mkdir celo-accounts-node
cd celo-accounts-node
docker run --name celo-accounts -it --restart always --stop-timeout 300 -p 127.0.0.1:8545:8545 -v $PWD:/root/.celo $CELO_IMAGE --verbosity 3 --syncmode full --http --http.addr 0.0.0.0 --http.api eth,net,web3,debug,admin,personal --datadir /root/.celo
```

:::danger

**Security**: The command line above includes the parameter `--http.addr 0.0.0.0` which makes the Celo Blockchain software listen for incoming RPC requests on all network adaptors. Exercise extreme caution in doing this when running outside Docker, as it means that any unlocked accounts and their funds may be accessed from other machines on the Internet. In the context of running a Docker container on your local machine, this together with the `docker -p 127.0.0.1:localport:containerport` flags allows you to make RPC calls from outside the container, i.e from your local host, but not from outside your machine. Read more about [Docker Networking](https://docs.docker.com/network/network-tutorial-standalone/#use-user-defined-bridge-networks) here.

:::

### Hardware requirements

The recommended Celo Validator setup involves continually running three instances:

- 1 **Validator node**: should be deployed to single-tenant hardware in a secure, high availability data center
- 1 **Validator Proxy node**: can be a VM or container in a multi-tenant environment (e.g. a public cloud), but requires high availability
<!-- - 1 **Attestation node**: can be a VM or container in a multi-tenant environment (e.g. a public cloud), and has moderate availability requirements -->

Celo is a proof-of-stake network, which has different hardware requirements than a Proof of Work network. proof-of-stake consensus is less CPU intensive, but is more sensitive to network connectivity and latency. Below is a list of standard requirements for running Validator and Proxy nodes on the Celo Network:

#### Validator node

- CPU: At least 4 cores / 8 threads x86_64 with 3ghz on modern CPU architecture newer than 2018 Intel Cascade Lake or Ryzen 3000 series or newer with a Geekbench 5 Single Threaded score of >1000 and Multi Threaded score of > 4000
- Memory: 32GB
- Disk: 512GB SSD or NVMe (resizable). Current chain size at August 16th is ~190GB, so 512GB is a safe bet for the next 1 year. We recommend using a cloud provider or storage solution that allows you to resize your disk without downtime.
- Network: At least 1 GB input/output Ethernet with a fiber (low latency) Internet connection, ideally redundant connections and HA switches.

Some cloud instances that meet the above requirements are:

- GCP: n2-highmem-4, n2d-highmem-4 or c3-highmem-4
- AWS: r6i.xlarge, r6in.xlarge, or r6a.xlarge
- Azure: Standard_E4_v5, or Standard_E4d_v5 or Standard_E4as_v5