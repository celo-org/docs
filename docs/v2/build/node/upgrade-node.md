---
title: Upgrade a Celo Node
description: How to upgrade to the newest available version of a Celo node.
---

# Upgrade a Node

How to upgrade to the newest available version of a Celo node.

---

## Recent Releases

- [You can view the latest releases here.](https://github.com/celo-org/celo-blockchain/releases)

## When an upgrade is required

Upgrades to the Celo node software will often be optional improvements, such as improvements to performance, new useful features, and non-critical bug fixes. Occasionally, they may be required when the upgrade is necessary to continue operating on the network, such as hard forks, or critical bug fixes.

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

### Start the new node

Start the new node using `docker run` as detailed in the appropriate section of the getting started guide. Remember to recover any environment variables, if using a new terminal, before running the documented commands.
