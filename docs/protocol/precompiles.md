---
title: Crypto Precompiles
description: Efficient cryptography using Celo-specific precompiles
---

# Crypto Precompiles

It is possible to implement cryptographic functions in Solidity, but this leads to a slow and expensive execution compared to using cryptographic functions that are built into the blockchain client ("precompiles"). In addition to those provided by Ethereum, Celo provides many useful and efficient cryptographic precompiles.
___

## Available Precompiles

The full list of Celo-specific precompiles can be found in the CIP specification documents:

* [CIP-20: Hash functions](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0020.md)
* [CIP-30: BLS12-377 curve operations](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0030.md)
* [CIP-31: BLS12-381 curve operations](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0031.md)

## Precompile Wrappers

The precompiles can be used by executing the `staticcall` opcode with the address of the precompile. The correct packing of the input data for each precompile is tedious and error-prone. To make it easier, Celo provides a set of precompile wrappers written in Solidity which take care of this work.

These wrappers can be obtained from [celo-monorepo's common contracts](https://github.com/celo-org/celo-monorepo/tree/master/packages/protocol/contracts/common). The Solidity libraries are

* CIP20Lib for CIP-20 hash functions
* B12_377Lib (in B12.sol) for CIP-30/BLS12-377 curve operations
* B12_381Lib (in B12.sol) for CIP-31/BLS12-381 curve operations

## Usage Example

If you would like to use the `sha3_256` hash function, just include the `CIP20Lib` and attach its functions to the `bytes` with `using CIP20Lib for bytes`. Then you can call the hash functions like methods on you `bytes` typed variables.

```solidity
import "CIP20Lib.sol";

contract Cip20Example {
  using CIP20Lib for bytes;

  function sha3_256(bytes calldata input) external view returns (bytes memory) {
    return input.sha3_256();
  }
}
```

For example usages of the BLS12 curve operations, see the [BLS12Passthrough test file](https://github.com/celo-org/celo-monorepo/blob/master/packages/protocol/contracts/common/test/BLS12Passthrough.sol).
