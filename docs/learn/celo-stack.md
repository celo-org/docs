# The Celo Stack

Celo is oriented around providing the simplest possible experience for end-users, who may have no familiarity with cryptocurrencies and may be using low-cost devices with limited connectivity. To achieve this, Celo takes a full-stack approach, where each layer of the stack is designed with the end-user in mind while considering other stakeholders (e.g. operators of nodes in the network) involved in enabling the end-user experience.

**The Celo stack is structured into the following logical layers:**

## **Celo Blockchain**

An open cryptographic protocol that allows applications to make transactions with and run smart contracts in a secure and decentralized fashion. The Celo blockchain code has shared ancestry with[ Ethereum](https://www.ethereum.org/) and maintains full EVM compatibility for smart contracts. However, it uses a[ Byzantine Fault Tolerant](http://pmg.csail.mit.edu/papers/osdi99.pdf) (BFT) consensus mechanism rather than Proof-of-Work and has different block format, transaction format, client synchronization protocols, and gas payment and pricing mechanisms.

## **Celo Core Contracts**

A set of smart contracts running on the Celo blockchain that comprise much of the logic of the platform features including ERC-20 stable currencies, identity attestations, proof-of-stake, and governance. These smart contracts are upgradeable and managed by the decentralized governance process.

## **Applications**

Applications for end users built on the Celo Platform. The Celo Wallet app, the first of an ecosystem of applications, allows end-users to manage accounts and make payments securely and simply by taking advantage of the innovations in the Celo Protocol. Applications take the form of external mobile or backend software: they interact with the Celo blockchain to issue transactions and invoke code that forms the Celo Core Contracts’ API. Third parties can also deploy custom smart contracts that their own applications can invoke, which in turn can leverage Celo Core Contracts. Applications may use centralized cloud services to provide some of their functionality: in the case of the Celo Wallet, push notifications, and a transaction activity feed.

The Celo blockchain and Celo Core Contracts together comprise the Celo Protocol.
