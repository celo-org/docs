# Smart Contract Upgradeability

​Smart contracts deployed to an EVM blockchain like Celo are immutable. To allow for improvements, new features, and bug fixes, the Celo codebase uses the Proxy Upgrade Pattern. All of the core contracts owned by Governance are proxied. Thus, a smart contract implementation can be upgraded using the standard onchain governance process.​

## Upgrade risks

​The core contracts define critical behavior of the Celo network such as CELO and Celo Dollar asset management or validator elections and rewards. Malicious or inadvertent contract bugs could compromise user balances or potentially cause harm, irreversible without a blockchain hard fork.

Great care must be taken to ensure that any Governance proposal that modifies smart contract code will not break the existing system. To this end, the contracts have a well defined release process, which includes soliciting security audits from reputable third-party auditors.

As Celo is a decentralized network, all Celo network participants are invited to participate in the governance proposals discussions on the forum.

## Governance Hotfix Process

The Governance Hotfix process uses a multisig approach to handle critical security patches that need to be deployed quickly without going through the standard governance timeline.

The cadence and transparency of the standard onchain governance protocol make it poorly suited for proposals that patch issues that may compromise the security of the network, especially when the patch would reveal an exploitable bug in one of the core contracts. Instead, these sorts of changes are better suited for the more responsive hotfix protocol.

The current process requires approval from both an approver multisig and the Security Council multisig. The list of Security Council signers remains fixed, which simplifies the approval process. If a hotfix is not executed within the specified execution time limit, it must be reset and re-approved.

## Celo Blockchain Software Upgrades

Some changes cannot be made through the onchain governance process alone. Examples include changes to the underlying consensus protocol and changes which would result in a hard-fork.
