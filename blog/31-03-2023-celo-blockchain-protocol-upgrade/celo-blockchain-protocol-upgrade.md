---
title: Celo Blockchain Protocol Upgrade  
description: A step by step guide to upgrading the Celo blockchain protocol
authors:
  - name: Adewale Emmanuel
    title: Software Developer, Technical writer @Celo Foundation
    url: https://github.com/Manuel-dre
    image_url: https://avatars.githubusercontent.com/u/69092079?s=400&u=f34c84ee03afb9a51b163652b750419e98ed7456&v=4
tags: [celo, intermediate, celosage, solidity, 'smartcontract']
hide_table_of_contents: true
slug: /tutorials/celo-blockchain-protocol-upgrade
---

## CELO BLOCKCHAIN PROTOCOLS UPGRADES: A DEEP DIVE

![header](../../src/data-tutorials/showcase/intermediate/celo-blockchain-protocol-upgrade.png)

CELO is a blockchain platform that enables its users to send and receive cryptocurrency and other digital assets. One of the unique features of CELO is its focus on financial inclusion i.e., availability and equal exposure to opportunities of accessing financial services. The CELO network is designed to support a variety of decentralized applications which allows developers to explore and build on the network. Like all blockchain networks, CELO is constantly evolving and improving, as new features are added and bugs are fixed, the protocols undergo specific upgrades to ensure that the network remains secure, scalable and functional. The purpose of the tutorial Is to provide an in-depth analysis of the process for upgrading the CELO protocol, including the CELO governance process, network upgrades and backward compatibility which is the major challenge developers face in implementing protocol upgrades.

### WHAT ARE BLOCKCHAIN PROTOCOLS?
For computing devices to exchange information, there must be pre-existing agreement as to how the information will be structured for unambiguity and smooth communication. Protocols in the computing field are a set of rules or procedures that defines how data is allowed to be transferred between electronic devices such as computer systems.
Blockchain Protocols are crucial components of Blockchain technologies that enable information to be shared automatically across cryptocurrency networks safely and reliably. The blockchain generally is a type of distributed database which functions as a ledger tracking every crypto transaction with the blockchain network’s computing power acting as a wall constantly securing it. Blockchain developers and miners do the work of maintaining this chain, they would need to follow some protocols to work in the network. These protocols are crucial to the internet's operation as they serve as a standard framework for governing data creation, validation and transfer within the blockchain network. It is important to understand how blockchain protocols affect network performance and what limitations they can impose. 

### KEY FEATURES OF BLOCKCHAIN PROTOCOLS
Blockchain protocols possess certain characteristics that enable them to power decentralized digital currencies like Ethereum and Bitcoin. They are also utilized for various purposes in different industries such as supply chain management, record keeping, and identity verification. The key features of blockchain protocols include decentralization, immutability, security, transparency, consensus mechanism, smart contracts, privacy, and scalability. 
The consensus mechanism ensures that all network participants agree on the blockchain's current state, and smart contracts automate complex business processes. Blockchain protocols also offer privacy features to keep transactions and data confidential. Scalability is a challenge for blockchain protocols due to the processing power required for transaction validation, although some blockchain protocols are executing solutions like SHARDING and SIDECHAINS. Overall, blockchain protocols have contributed positively to how trust and security are perceived in computer science. 
Some of the key features are discussed as follows;

1) Decentralization: Decentralization is the sole purpose of blockchain technology and one of the most critical features of blockchain protocols is that they are decentralized, they operate without a central authority or intermediary. Instead, participants in the network collectively validate and confirm transactions and maintain the integrity of the blockchain.
2) Immutability: The blockchain is an immutable ledger such that once a transaction is recorded on the blockchain, it cannot be altered or deleted. This makes the blockchain a tamper-proof record of all transactions and data stored on the network.
3) Consensus Mechanism: Blockchain protocols use a consensus mechanism to ensure that all participants in the network agree on the state of the blockchain. This is typically achieved through proof-of-work, proof-of-stake, or other consensus mechanisms, which reward participants who contribute to the network's security. For instance, if the need for an upgrade is identified on the CELO network, it can be initiated by the CELO protocol development team, community members, or other stakeholders and this mechanism represents the method used to achieve agreement, trust, and security across the network. 
4) Smart Contracts: Smart contracts are self-executing contracts with the terms of the agreement between buyer and seller being directly written into lines of code programmed to trigger when the stated conditions of the agreement are met.

### TYPES OF BLOCKCHAIN PROTOCOLS.

![image](images/networks-and-protocols.jpg)

There are different types of blockchain protocols, each with its unique features and characteristics. In this section, we will explore four main types of blockchain protocols: Public, Private, Federated, and Hybrid blockchain protocols. 

PUBLIC BLOCKCHAIN PROTOCOLS

Public blockchain protocols are open to anyone who wants to participate and can be accessed by anyone with access to an internet connection. Participants in a public blockchain network can read, write, and validate transactions (Validators), they are called miners and are rewarded with cryptocurrency for contributing to the network's security. Examples of public blockchain protocols include Bitcoin and Ethereum.

Public blockchain protocols have the following features:

1) Total Decentralization: No central authority or intermediary is controlling the network. Participants work together to validate transactions and maintain the integrity of the blockchain.
2) Permissionless: Anyone can participate in the network, and no approval or permission is required.
3) Transparency: Transactions and data stored on the blockchain are public and visible to all participants.
4) Immutability: Once a transaction is recorded on the blockchain, it cannot be altered or deleted.
5) Consensus Mechanism: Public blockchain protocols use a consensus mechanism, such as proof-of-work or proof-of-stake, to validate transactions and reach an agreement on the state of the blockchain.


PRIVATE BLOCKCHAIN PROTOCOLS

Private blockchain protocols are designed for use within a specific organization or group of organizations. Access to the network is restricted, and participants are pre-approved by the network administrators. Private blockchain protocols are usually used for internal business processes, such as supply chain management, identity verification, or record keeping.

Private blockchain protocols have the following features:

1) Centralization: Private blockchain networks are controlled by a central authority or group of authorities called administrators.
2) Permissioned: Access to the network is restricted, and participants are pre-approved by the network administrator.
3) Confidentiality: Transactions and data stored on the blockchain are only visible to approved participants.
4) Consensus Mechanism: Private blockchain protocols also use a consensus mechanism, such as a vote-based system or a consensus algorithm, to validate transactions and reach an agreement on the state of the blockchain.


FEDERATED BLOCKCHAIN PROTOCOLS

Federated blockchain protocols are a type of hybrid protocol combining public and private blockchain protocols. Here, multiple organizations are given access to participate in the network, but access to the network is restricted to a group of pre-approved organizations. Participants in a federated blockchain network can view, write, and validate transactions, and are rewarded with cryptocurrency for contributing to the network's security.

Federated blockchain protocols have the following features:

1) Centralization: Federated blockchain networks are controlled by a group of pre-approved organizations.
2) Permissioned: Access to the network is restricted to a group of pre-approved organizations.
3) Confidentiality: Transactions and data stored on the blockchain are only visible to approved participants.
4) Consensus Mechanism: Like every other blockchain protocol, Federated blockchain protocols use a consensus mechanism, such as a vote-based system or a consensus algorithm, to validate transactions and reach a consensus on the state of the blockchain.

HYBRID BLOCKCHAIN PROTOCOLS

Hybrid blockchain protocols combine the features of public and private blockchain protocols. This protocol allows for both public and private transactions, and participants can choose the level of access they want into the network, this level of access determines the respective features the chain will possess. Hybrid blockchain protocols and smart contracts are typically used in industries where data privacy and security are critical, such as healthcare, and the transformation of corporate structures in financing and gaming applications.

Hybrid blockchain protocols have the following features: 

1) Centralization: Hybrid blockchain networks can be controlled by a central authority or a group of authorities, depending on the level of access chosen by participants.
2) Permissioned and permissionless: Participants can choose the level of access they want to the network.
3) Confidential: Transactions and data stored on the blockchain can be made public or kept private, depending on the level of access chosen by participants.
4) Consensus mechanism: Hybrid blockchain protocols use a consensus mechanism, such as a vote-based system or a consensus algorithm, to validate transactions like the private and public blockchain protocols. 

## PROCESS FOR UPGRADING THE CELO BLOCKCHAIN PROTOCOLS

![image](images/blockchain-protocol.jpg)

The CELO protocol is a blockchain protocol built on the Ethereum network that aims to create a more inclusive financial system by enabling fast, low-cost, and secure transactions. The CELO protocol is open-source, which means that anyone can contribute to its development and improvement. Therefore, in this regard, the process of upgrading the CELO protocol by adding new blocks of code is a critical aspect of the development process.
The following is the summary of the steps to be followed to implement an upgrade on the CELO blockchain.

1)	Identify the need for an upgrade
2)	Create a proposal for the upgrade 
3)	Outline the changes to be made 
4)	Highlight the benefits of the upgrade 
5)	Outline and study the Potential risk involved 
6)	Submit the proposal to the CELO governance for review and approval 
7)	Developing and testing the code 
8)	Deployment 
9)	Data analysis and network monitoring for thorough testing and performance check 

The first step in the process is to identify the need for an upgrade. This can be initiated by the CELO protocol development team, community members, interested parties, crypto enthusiasts or other stakeholders. Once the need for an upgrade has been identified, the protocol development team creates a proposal for the upgrade, outlining the changes to be made, the benefits of the upgrade, and the potential risks involved. The next step is to submit the proposal to the CELO governance system for review and approval. CELO governance is a decentralized system that allows CELO holders to vote on proposals related to the protocol's development and improvement. The proposal must have a majority of votes from the community to be approved. After the proposal is approved, the development team creates the blocks of code that will implement the upgrade and ensure its compatibility with the chain. The code is thoroughly tested to ensure that it functions as intended and does not introduce any new vulnerabilities to the network. Once the code has been tested, it is deployed on the CELO network by creating a new block on the blockchain that includes the upgrade code. The updated code is then distributed to all network participants, and the new block is added to the blockchain. After the upgrade has been deployed, the CELO protocol undergoes a period of monitoring to ensure that the upgrade is working as intended and that there are new issues or vulnerabilities in the network. Every important key metric is measured through data analysis to monitor network performance, transaction speeds, gas fee deduction etc. 
Upgrading the CELO protocol with blocks of code is a complex process that involves multiple steps and requires collaboration between the CELO development team and the CELO community to ensure that upgrades are beneficial and secure and that the overall functionality of the protocol is greatly improved.

## BACKWARD COMPATIBILITY: THE MAJOR CHALLENGE DEVELOPERS FACE IN IMPLEMENTING PROTOCOL UPGRADE
Backward compatibility refers to the ability of a software or hardware system to work with data, applications, features, or devices that were designed for earlier versions of the same system. Backward compatibility allows newer versions of a system or upgrades to a system to work with the previous version. 
For instance, a software application that is backwards compatible with an earlier version would be able to open and work with files created by that earlier version. Similarly, in Blockchain protocol upgrades, Backward compatibility allows existing nodes which serve as the custodians of the chain to continue to participate in the network without requiring them to upgrade their software. To avoid a split in the network or other disruptions in a situation whereby some nodes are using the newly upgraded protocol while some are using the old protocol, developers always try to maintain backward compatibility while upgrading the protocol. 
Backward compatibility in a blockchain protocol typically involves careful consideration of the data structures, message formats and consensus rules used by the protocol. 

### HOW TO ACHIEVE BACKWARD COMPATIBILITY 
Several strategies can be used to maintain backward compatibility in a blockchain protocol upgrade some of which are listed below. 
1) Introduce new features in a way that does not conflict with existing features, such that nodes running in the previous version can ignore the upgraded features without disruptions.
2) Introduce new features as optional or as soft forks, therefore allowing nodes in the old version and new version of the protocol to run smoothly and independently. 
3) Feature flags which allow developers to enable or disable new features based on compatibility 
4) Introduce new features as side chains which allow developers to create a separate blockchain that is pegged to the main blockchain and later integrated into the main blockchain once the new features are proven to be stable and functional. 


## CONCLUSION. 
Congratulations on coming this far in this tutorial, where we discussed certain terminologies in blockchain upgrade, we also described the concept of implementing a blockchain upgrade. We have also covered the major challenges faced by developers while implementing an upgrade and strategies to overcome those challenges. Overall upgrading the CELO protocol with blocks of code is a complex process that requires a lot of steps and involvement by developers. Blockchain protocols serve as a major recipe in blockchain technology while the upside has a very huge potential to revolutionize many industries. 

## About the Author 
ADEWALE EMMANUEL is a crypto enthusiast and a Web 3.0 content creator. He is devoted to the mission of helping organizations with potential blockchain projects create educational content to attract and interest people in prospective decentralized financial infrastructures. 
Connect with him on [Twitter through the link](https://twitter.com/Walemaths___?t=28jbNdJ5hBxGMRdS1JzXUQ&s=09) 


