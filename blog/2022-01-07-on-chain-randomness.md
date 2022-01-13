---
title: "Use onchain randomness"
description: How to use onchain randomness in your smart contracts.
slug: /developer-guide/start/randomness
authors:
  - name: Josh Crites
    title: Developer Relations, cLabs
    url: https://github.com/critesjosh
    image_url: https://github.com/critesjosh.png
tags: [solidity, randomness, oracle]
image: https://dl.airtable.com/.attachmentThumbnails/a7e530eb72ac8f30f37c0a3447ef0e7d/72e944da
hide_table_of_contents: false
---

import PageRef from '@components/PageRef';

Onchain randomness is used for selecting validators to perform phone number verification. Read more about how onchain randomness is produced at the provided page.

<!--truncate-->

<PageRef url="/celo-codebase/protocol/identity/randomness" pageName="Randomness" />

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

Alternatively, through inheritance of `UsingRegistry`.

```solidity
import "celo-monorepo/packages/protocol/common/UsingRegistryV2.sol";

contract Example is UsingRegistryV2 {
    function test() external view returns (bytes32 randomness) {
        randomness = getRandom().random();
    }
}
```
