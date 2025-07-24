## Smart Contract Upgradeability

​Smart contracts deployed to an EVM blockchain like Celo are immutable. To allow for improvements, new features, and bug fixes, the Celo codebase uses the Proxy Upgrade Pattern. All of the core contracts owned by Governance are proxied. Thus, a smart contract implementation can be upgraded using the standard onchain governance process.​

## Upgrade risks

​The core contracts define critical behavior of the Celo network such as CELO and Celo Dollar asset management or validator elections and rewards. Malicious or inadvertent contract bugs could compromise user balances or potentially cause harm, irreversible without a blockchain hard fork.

Great care must be taken to ensure that any Governance proposal that modifies smart contract code will not break the existing system. To this end, the contracts have a well defined release process, which includes soliciting security audits from reputable third-party auditors.

As Celo is a decentralized network, all Celo network participants are invited to participate in the governance proposals discussions on the forum.

## Validator Hotfix Process

The cadence and transparency of the standard onchain governance protocol make it poorly suited for proposals that patch issues that may compromise the security of the network, especially when the patch would reveal an exploitable bug in one of the core contracts. Instead, these sorts of changes are better suited for the more responsive, and less transparent, hotfix protocol.

Anyone can make a proposal in the hotfix protocol by submitting the hash of their proposal to the Governance smart contract. If that hash is approved by the approver and a quorum of validators, the proposer can execute the contents of that proposal immediately.

Note that this means the validators may not always know the contents of the proposal that they are voting on. Revealing the contents of the proposal to all validators may compromise the integrity of the hotfix protocol, as only one validator would need to be malicious in order to exploit the vulnerability or share it publicly. Instead, to convince the validators that the hash represents a proposal that should be executed via the hotfix protocol, the proposer should consider contacting reputable, third party, security firms to publicly vouch for the contents of the proposal.

## Celo Blockchain Software Upgrades

Some changes cannot be made through the onchain governance process (via proposal or hotfix) alone. Examples include changes to the underlying consensus protocol and changes which would result in a hard-fork.
