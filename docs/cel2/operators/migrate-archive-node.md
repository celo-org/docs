# Migrating a Celo L1 archive node

## Pre-hardfork archive state access and execution

:::note
It is not recommended to migrate from an L1 archive datadir, as the L2 execution client does not support
executing L1 historical states and it will consume more time and storage.
Instead, run the migration from a full L1 datadir, and if desired, configure the L2 execution client as archive
to run L2 archive requests, and to proxy to a L1 archive node to execute pre-hardfork transactions and state access.
:::

Node operators who were running archive nodes before the migration and wish to maintain execution
and state access functionality for pre-hardfork blocks will need to continue to run their L1 node
and configure their L2 node to proxy pre-hardfork execution and state access requests to the L1 node
by setting the `OP_GETH__HISTORICAL_RPC` in `.env` to the RPC address of their L1 node.
