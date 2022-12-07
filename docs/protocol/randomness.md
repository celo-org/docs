---
title: Celo Randomness
description: How unpredictable pseudo-randomness is achieved on the Celo blockchain.
---

# Randomness

How unpredictable pseudo-randomness is achieved on the Celo blockchain.

---

## Requesting New Attestations

As mentioned previously, when requesting new attestations, random validators are selected to perform phone number verification. This selection needs to be unpredictable to prevent Eve from creating an attestation for a phone number she doesn’t control. Suppose, for example, that instead validators were selected in a round robin fashion. Eve could request an attestation when it was the turn of a validator she controls to perform verification. Instead of sending an SMS to the phone number \(since she doesn’t own it\) she could just produce the correct verification code since she has access to the validator’s private key.

## Producing Pseudo-randomness

Producing unpredictable pseudo-randomness without a trusted third party is not trivial. Several solutions for this problem exist or are being currently researched. They include Verifiable Random Functions \(for example, based on BLS threshold signatures\), Verifiable Delay Functions, and commit-reveal schemes. Currently, Celo implements a simple commit-reveal scheme which is secure enough for the purposes of validator selection. A more sophisticated solution might be implemented as the network evolves, especially if randomness becomes necessary for other purposes that require stronger assumptions about the randomness’s security \(for example if it was decided that a randomized leader election algorithm should replace the current round robin\).

In a proposed block, the proposer attaches two values related to the randomness scheme - randomness corresponding to their previous commitment, and a new commitment to freshly generated random bytes that will be revealed in the future. The revealed randomness is added to an entropy pool accessible on-chain from the Random smart contract.

## Randomness Equation

More formally, the $$n*{th}$$ block proposed by a given validator contains values $$(r_n, s_n)$$ such that $$\text{keccack256}(r_n) = s*{n-1}$$. The one exception to this is the validator’s first block, the case where $$n = 1$$, since they have not previously committed to randomness yet. Here, the protocol instead requires that $$r_1 = 1$$.

## Using Onchain Randomness

This randomness can be used by any smart contracts deployed to a Celo network.

```solidity
import "celo-monorepo/packages/protocol/identity/interfaces/IRandom.sol";
import "celo-monorepo/packages/protocol/common/interfaces/IRegistry.sol";

contract Example {
    function test() external view returns (bytes32 randomness) {
        randomness = IRandom(
            IRegistry(0x000000000000000000000000000000000000ce10)
                .getAddressFor(keccak256(abi.encodePacked("Random")))
        ).random();
    }
}
```

Alternatively, through inheritance of [UsingRegistry](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/common/UsingRegistry.sol).

```solidity
import "celo-monorepo/packages/protocol/common/UsingRegistryV2.sol";

contract Example is UsingRegistryV2 {
    function test() external view returns (bytes32 randomness) {
        randomness = getRandom().random();
    }
}
```
