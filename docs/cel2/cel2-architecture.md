---
title: Architecture
---

Celo’s architecture is a multi-layered system that includes a Layer 2 blockchain, core smart contracts, user applications, and a dynamic network topology, all optimized for scalability, security, and ease of use.

---

# Introduction to the Celo Stack

The Celo stack consists of three main components that work together to deliver a seamless blockchain experience:

### Celo Blockchain

The Celo blockchain operates as a Layer 2 (L2) solution using the OP Stack, with distinct layers for optimal performance and security:

- **Execution Layer**: EVM-compatible, allowing easy deployment of Ethereum smart contracts.
- **Data Availability Layer**: Utilizes EigenDA to ensure transaction data is accessible and cost-efficient.
- **Settlement Layer**: Leverages Ethereum to finalize transactions, benefiting from its security.

### Celo Core Contracts

Celo Core Contracts are essential smart contracts on the Celo blockchain, managed through decentralized governance. Key contracts include:

- **Attestations**: Links users' phone numbers to their blockchain addresses for secure identity verification and Social Connect features.
- **Governance**: Allows community voting on protocol upgrades and changes.
- **StableToken** (e.g., cUSD, cEUR): Manages native stablecoin issuance and stability for seamless transactions.
- **Exchange**: Facilitates asset trading and liquidity within the Celo ecosystem.
- **SortedOracles**: Provides external data, like price feeds, critical for stability and DeFi applications.
- **Validators**: Manages validator operations and network security.

### Applications

The Application Layer connects users directly to the blockchain. Developers can build user-friendly applications that are secure, transparent, and decentralized by utilizing Celo’s blockchain.

## Our Network Topology

The Celo network topology consists of various nodes running the Celo blockchain software in different configurations to support the decentralized infrastructure of the network.

### Sequencers

Sequencers replace the traditional validator role in the L2 architecture. They are responsible for:

- Gathering transactions from other nodes
- Executing associated smart contracts to form new blocks
- Submitting these blocks to the Ethereum L1 for final settlement

Sequencers operate on a faster 2-second block time, improving transaction speed and throughput.

### Full Nodes

Full nodes in the Celo L2 network serve multiple important functions:

- Relaying transactions and responding to queries from light clients
- Maintaining a copy of the L2 blockchain state
- Interacting with Ethereum L1 to read and verify L2 block data
- Optionally running an Ethereum node or using a third-party Ethereum node service

Full nodes can join or leave the network at any time, providing a decentralized infrastructure for the network.

### Light Clients

Light clients, such as those running on mobile apps with limited data, continue to play a crucial role:

- Connecting to full nodes to request account and transaction data
- Signing and submitting new transactions
- Operating without maintaining a full copy of the blockchain state

Light clients benefit from the improved speed and lower costs of the L2 architecture while maintaining a similar user experience.

### Data Availability Layer

Celo L2 incorporates EigenDA as its Data Availability (DA) layer:

- Ensures transaction data remains accessible and cost-efficient
- Operates separately from the execution and settlement layers
- Contributes to lower transaction costs and improved scalability
