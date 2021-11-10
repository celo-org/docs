---
title: Celo Protocol
description: Introduction to the Celo protocol, its implementation, and its relationship to Ethereum.
slug: /celo-codebase/protocol
---
import PageRef from '@components/PageRef'

# Celo Protocol

Introduction to the Celo protocol, its implementation, and its relationship to Ethereum.

___

## What is the Celo Protocol?

Celo's blockchain reference implementation is based on go-ethereum, the Go implementation of the Ethereum protocol. The project team is indebted to the Geth community for providing these shoulders to stand on and, while recognizing that Ethereum is an independent project with its own trajectory, hopes to contribute changes where it makes sense to do so.

In addition to the blockchain client, some core components of the Celo protocol are implemented at the smart contract level and even off-chain (e.g. phone number verification via SMS).

## Protocol Upgrades

There are a number of substantial changes and additions have been made in service of Celo's product goals, including the following:

<PageRef url="/celo-codebase/protocol/consensus" pageName="Consensus" />
<PageRef url="/celo-codebase/protocol/proof-of-stake" pageName="Proof-of-Stake" />
<PageRef url="/celo-codebase/protocol/governance" pageName="Governance" />
<PageRef url="/celo-codebase/protocol/stability" pageName="Stability Mechanism" />
<PageRef url="/celo-codebase/protocol/transactions" pageName="Transactions" />
<PageRef url="/celo-codebase/protocol/identity" pageName="Identity" />
<PageRef url="/celo-codebase/protocol/optics" pageName="Optics" />
<PageRef url="/celo-codebase/protocol/plumo" pageName="Plumo Ultralight Sync" />
