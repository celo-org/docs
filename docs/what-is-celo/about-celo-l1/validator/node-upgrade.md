---
title: Upgrade a Celo Node
description: How to upgrade to the newest available version of a Celo node.
---

# Upgrade a Node

How to upgrade to the newest available version of a Celo node.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## Recent Releases

- [You can view the latest releases here.](https://github.com/celo-org/celo-blockchain/releases)

## When an upgrade is required

Upgrades to the Celo node software will often be optional improvements, such as improvements to performance, new useful features, and non-critical bug fixes. Occasionally, they may be required when the upgrade is necessary to continue operating on the network, such as hard forks, or critical bug fixes.

## Upgrading a non-validating node

Use these instructions to update non-validating nodes, such as your account node or your attestation node on the Baklava testnet. Also use these instructions to upgrade your proxy node, but remember not to stop the proxy of a running validator.

### Pull the latest Docker image

```bash
export CELO_IMAGE=us.gcr.io/celo-org/geth:mainnet
docker pull $CELO_IMAGE
```

### Stop and remove the existing node

Stop and remove the existing node. Make sure to stop the node gracefully (i.e. giving it time to shut down and complete any writes to disk) or your chain data may become corrupted.

Note: The `docker run` commands in the documentation have been updated to now include `--stop-timeout 300`, which should make the `-t 300` in `docker stop` below redundant. However, it is still recommended to include it just in case.

```bash
docker stop -t 300 celo-fullnode
docker rm celo-fullnode
```


## Upgrading a Validating Node

Upgrading a validating node is much the same, but requires extra care to be taken to prevent validator downtime.

One option to complete a validating node upgrade is to perform a key rotation onto a new node. Pull the latest Docker image, as mentioned above, then execute a Validator signing key rotation, using the latest image as the new Validator signing node. A recommended procedure for key rotation is documented in the [Key Management](/what-is-celo/about-celo-l1/validator/key-management/key-rotation) guide.

A second option is to perform a hot-swap to switch over to a new validator node. The new validator node **must** be configured with the same set of proxies as the existing validator node.

### Hotswapping Validator Nodes

:::info

Hotswap is being introduced in version 1.2.0. When upgrading nodes that are not yet on 1.2.0 refer to the guide to perform a key rotation.

:::

Validators can be configured as primaries or replicas. By default validators start as primaries and will persist all changes around starting or stopping. Through the istanbul management RPC API the validator can be configured to start or stop at a specified block. The validator will participate in consensus for block numbers in the range `[start, stop)`.

:::warning

Note that the replica node **must** use the same set of proxies as the primary node. If it does not it will not be able to switchover without downtime due to needing to the complete the announce protocol from scratch. Replicas behind the same set of proxies as the primary node will be able to switchover without downtime.

:::

#### RPC Methods

- `istanbul.start()` and `istanbul.startAtBlock()` start validating immediately or at a block
- `istanbul.stop()` and `istanbul.stopAtBlock()` stop validating immediately or at a block
- `istanbul.replicaState` will give you the state of the node and the start/stop blocks
- `istanbul.validating` will give you true/false if the node is validating

:::info

`startAtBlock` and `stopAtBlock` must be given a block in the future.

:::

#### Geth Flags

- `--istanbul.replica` flag which starts a validator in replica mode.

On startup, nodes will look to see if there is a `replicastate` folder inside it's data directory. If that folder exists the node will configure itself as a validator or replica depending on the previous stored state. The stored state will take precedence over the command line flags. If the folder does not exists the node will stored it's state as configured by the command line. When RPC calls are made to start or stop validating, those changes will be persisted to the `replicastate` folder.

:::warning

If reconfiguring a node to be a replica or reusing a data directory, make sure that the node was previously configured as replica or that the `replicastate` folder is removed. If there is an existing `replicastate` folder from a node that was not configured as a replica the node will attempt to start validating.

:::

#### Steps to upgrade

1. Pull the latest docker image.
2. Start a new validator node on a second host in replica mode (`--istanbul.replica` flag). It should be otherwise configured exactly the same as the existing validator.
   - It needs to connect to the existing proxies and the validator signing key to connect to other validators in listen mode.
   - If reconfiguring a node to be a replica or reusing a data directory, make sure that the node was previously configured as replica or that the `replicastate` folder is removed.
3. Once the replica is synced and has validator enode urls for all validators, it is ready to swapped in.
   - Check validator enode urls with `istanbul.valEnodeTableInfo` in the geth console. The field `enode` should be filled in for each validator peer.
4. In the geth console on the primary run `istanbul.stopAtBlock(xxxx)`
   - Make sure to select a block number comfortably in the future.
   - You can check what the stop block is with `istanbul.replicaState` in the geth console.
   - You can run `istanbul.start()` to clear the stop block
5. In the geth console of the replica run `istanbul.startAtBlock(xxxx)`
   - You can check what the start block is with `istanbul.replicaState` in the geth console.
   - You can run `istanbul.stop()` to clear the start block
6. Confirm that the transition occurred with `istanbul.replicaState`
   - The last block that the old primary will sign is block number `xxxx - 1`
   - The first block that the new primary will sign is block number `xxxx`
7. Tear down the old primary once the transition has occurred.

Example geth console on the old primary.

```bash
> istanbul.replicaState
{
  isPrimary: true,
  startValidatingBlock: null,
  state: "Primary",
  stopValidatingBlock: null
}
> istanbul.stopAtBlock(21000)
null
> istanbul.replicaState
{
  isPrimary: true,
  startValidatingBlock: null,
  state: "Primary in given range",
  stopValidatingBlock: 21000
}
> istanbul.replicaState
{
  isPrimary: false,
  startValidatingBlock: null,
  state: "Replica",
  stopValidatingBlock: null
}
```

Example geth console on the replica being promoted to primary. Not shown is confirming the node is synced and connected to validator peers.

```bash
> istanbul.replicaState
{
  isPrimary: false,
  startValidatingBlock: null,
  state: "Replica",
  stopValidatingBlock: null
}
> istanbul.startAtBlock(21000)
null
> istanbul.replicaState
{
  isPrimary: false,
  startValidatingBlock: 21000,
  state: "Replica waiting to start",
  stopValidatingBlock: null
}
> istanbul.replicaState
{
  isPrimary: true,
  startValidatingBlock: null,
  state: "Primary",
  stopValidatingBlock: null
}
```

### Upgrading Proxy Nodes

:::danger

Release 1.2.0 is backwards incompatible in the Validator and Proxy connection. Validators and proxies must be upgraded to 1.2.0 at the same time.

:::

With multi-proxy, you can upgrade proxies one by one or can add newly synced proxies with the latest Docker image and can remove the old proxies. If upgrading the proxies in place, a rolling upgrade is recommended as the validator will re-assign direct connections as proxies are added and removed. These re-assignments will allow the validator to continue to participate in consensus.
