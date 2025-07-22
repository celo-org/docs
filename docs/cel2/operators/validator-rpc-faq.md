---
title: Community RPC Provider FAQ
description: Frequently Asked Questions about Community RPC Providers
---

### Where can I see all the Community RPC Providers?

- Install [Celo CLI](/cli/index.md) at version 6.1.0 or later. Then run: `celocli network:community-rpc-nodes`.
- [Vido Node Explorer](https://dev.vido.atalma.io/celo/rpc)
- [Celo Community RPC Gateway](https://celo-community.org/)

### After the migration, validators will no longer validate any blocks, but they’ll still hold CELO, receive delegations, and vote on governance, is that correct?

Correct. Validators will move to become Community RPC providers.

### Does migrating a validator node to an RPC node automatically transfers the stake? Is that enabled by the token duality mechanism?

The status onchain does not change after the migration, only the kind of node you’re supposed to run will change. This is not related to token duality.

### Can operators migrate after the hardfork (i.e. register an RPC node after March 26th, 3:00AM UTC)?

Operators will need to register their RPC or deregister completely before the migration block, however, the actual RPC node can only be started after the L2 starts.
[See Running a Community RPC Node](https://docs.celo.org/cel2/operators/community-rpc-node#register-as-rpc-provider)

### Are there any penalties, of any kind, for validators who chose not to migrate/register RPC nodes? Slashing, jailing, any impact on staked funds?

If a validator chooses to not run the RPC nodes after the transition, and does not deregister, they will get slashed and rewards will eventually drop to zero for the voters and the validators.

### In order to fulfill the role of an RPC provider, does the RPC node need to be a full node, an archive node, or a L1 legacy node?

Only full node or archive node.

### For those who do not migrate, do they continue operating as validators alongside RPC nodes, just without any validating responsibilities?

No, there will no longer be any validator nodes on the L2.

### How will rewards be distributed after the hard fork, will earnings be limited to delegators (stakers) and RPC node operators?
  
Rewards are limited to validators who register as a community RPC provider. There is a proposal in draft that will outline all thhe details on the monitoring.

### What will happen to the staked CELO if a validator does not migrate the validator node by March March 26th, 3:00AM UTC?

Migrations need to happen by the time the L2 is activated. If RPC is consistently offline / unregistered, it will eventually get slashed.

### If validators who haven’t migrated are subject to slashing, would they need to deregister their validator before the hard fork?

You can make the group ineligible for election by removing all its members, after that you can move forward with deregistering and waiting for the unlock period.

### Are there penalties for validators who choose not to migrate to RPC nodes, can they remain in their current state and continue earning rewards from their staked CELO?

If validators choose to not run the RPC nodes after the transition, rewards will eventually drop to zero for the voters and the validators.
