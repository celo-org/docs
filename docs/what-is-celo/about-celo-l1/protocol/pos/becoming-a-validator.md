# Becoming a Validator

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

To participate in the network, an operator must put up a slashable commitment of locked CELO, register as a validator, and join a validator group. A minimum stake of one CELO and a notice period of 60 days is required to be a validator in the Alfajores Testnet.

Any account that meets the minimum stake and notice period requirements can register as a validator. By doing so, the locked funds on that account become ‘at risk’: a fraction of the stake can be slashed automatically for an evolving set of misbehaviors. In addition, the community can use governance proposals to slash funds, which avoids having to anticipate and encode in the protocol every possible misbehavior. As long as the CELO staked for a validator account is not slashed, it’s eligible to earn rewards like any other Locked Gold account.

A validator joins a validator group by affiliating itself with it. However, to avoid untrusted or malicious validators joining a group, the validator group must accept the affiliation. Once done, the validator is added to the list of validators in the group. A validator can remove itself from a validator group at any time. Changes only take effect at the next subsequent election, so if the validator is currently participating in consensus, it’s expected to do so until the end of the epoch in which it deregisters itself.
