---
title: Locating Nodes
description: How Celo nodes join the network, establish a connection, and communiate their IP address.
---

# Locating Nodes

How Celo nodes join the network, establish a connection, and communiate their IP address.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## V4 Discovery Protocol

All Celo nodes \(including our validators\) are using a variant of Ethereum's V4 discovery protocol to find other nodes within the network. Details of Ethereum's protocol can be found [here](https://github.com/ethereum/devp2p/blob/master/discv4.md).

## Joining the Network

When a node attempts to join the network, it will execute Celo's discovery protocol.

It will first send a request to the bootnodes to retrieve a list of other nodes of the network. The bootnodes will then reply with that list, and then the joining node will then send additional requests to nodes in that list to find additional nodes in the network. The main difference in Celo's discovery protocol compared to Ethereum's is that it will require that the joining node's networkID be the same as the bootnodes' \(and the same as all other network's nodes\).

Also, all of the messages in Celo's discovery protocol must be hashed with a special salt to be accepted by other nodes. The reason why these changes were made is so that each node within a network will only store information of other nodes that have the same networkID (to distinguish nodes from other networks) and the same special salt \(to distinguish nodes from other blockchains, such as Ethereum\).

## Establishing a Connection

Once a joining node finds other nodes, it will establish direct TCP connections to a subset of them. This will allow that node to sync it's blockchain and transactions. Validators will additionally attempt to establish TCP connections to the rest of the validators, so that it can send consensus messages directly to them, instead of via gossip. The reason that the validators do this is to minimize the latency of messages that are sent and received among the validators, and to ultimately help minimize block time.

## Communicating IP Address

The way that validators communicate their IP address to other validators is by periodically gossiping a subprotocol message that we call an _IstanbulAnnounce_ message.

That message will contain `n` copies (where `n` is the total number of validators for the current epoch) of the sending validator's IP address where each copy is encrypted with the other validators' public key. Once a validator receives a gossiped _IstanbulAnnounce_ message, it will decrypt the encrypted IP address that was encrypted with its public key, and then establish a TCP connection to it. All consensus related messages will then sent via those direct TCP connections.

When an epoch ends, a validator will establish new connections with any newly elected validator and disconnect from any removed validators. If the validator itself is removed from the new epoch's validator set, then it will disconnect with all the validators.
