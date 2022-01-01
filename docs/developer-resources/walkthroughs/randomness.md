---
title: 'Use onchain randomness'
description: How to use onchain randomness in your smart contracts.
slug: /developer-guide/start/randomness
---

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
Alternatively, through inheritance of `UsingRegistry`.

```solidity
import "celo-monorepo/packages/protocol/common/UsingRegistryV2.sol";

contract Example is UsingRegistryV2 {
    function test() external view returns (bytes32 randomness) {
        randomness = getRandom().random();
    }
}
```