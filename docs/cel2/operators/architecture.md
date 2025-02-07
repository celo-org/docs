# Node architecture

This page reviews node architecture for all nodes running on the Celo network. All L2 Celo nodes are composed of two core software services, the Rollup Node and the Execution Client. Celo also optionally supports a third component, Legacy L1 Celo, that can serve stateful queries for blocks and transactions created before the L2 Upgrade.

## Rollup node

The Rollup Node is responsible for deriving L2 block payloads from L1 data and passing those payloads to the Execution Client. The Rollup Node can also optionally participate in a peer-to-peer network to receive blocks directly from the Sequencer before those blocks are submitted to L1. The Rollup Node is largely analogous to a [consensus client](https://ethereum.org/en/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) in Ethereum.

## Execution client

The Execution Client is responsible for executing the block payloads it receives from the Rollup Node over JSON-RPC via the standard [Ethereum Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md#engine-api----common-definitions). The Execution Client exposes the standard JSON-RPC API that Ethereum developers are familiar with, and can be used to query blockchain data and submit transactions to the network. The Execution Client is largely analogous to an [execution client](https://ethereum.org/en/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) in Ethereum.

## Next steps

- To get your node up and running, start with the [run a node from docker guide](docker-node.md).
- If you've already got a Celo node up and running, check out [how to migrate it to a L2 node](migrate-node.md).
