---
title: What's changed?
description: Changes from L1 to L2 and from op-stack to L2
---

# Celo L1 → L2

## Deprecated transactions

Sending these transaction types will no longer be supported, however you will still be able to retrieve any historical instances of these transactions.

* __Type 0 (`0x0`) _Celo_ legacy transaction__. These are type 0 transactions that had some combination of the following fields set ("feeCurrency", "gatewayFee", "gatewayFeeRecipient") and "ethCompatible" set to false.
* __Type 124 (`0x7c`) Celo dynamic fee transaction__.

## Consensus

The BFT consensus protocol will be removed and replaced with a centralized sequencer. Although there will be no more need for validators the validator set, election mechanism and voting will remain, however validators will not need to run any infrastructure for the L2.

This is a temporary situation, after Mainnet launch we will be looking at re-introducing active roles for validators.  

## Validator fees and staking rewards

Transaction fees will now go to the sequencer.

Validator and staking rewards will remain, previously rewards were emitted on epoch blocks, Celo L2 does not have epoch blocks so reward emissions will be handled through a smart contract that can be called to periodically distribute rewards.
The amount of rewards to be distributed has not been decided, however during the time that validators are no longer required to run infrastructure rewards will likely be less than in the Celo L1.

## Hardforks

See [here](https://specs.celo.org/l2_migration.html#changes-for-contracts-developers) for the list of hardforks that will be enabled in the first block of the L2.

## Precompiled contracts

All Celo specific precompiles removed except for the transfer precompile which supports Celo [token duality](https://specs.celo.org/token_duality.html) (the native asset Celo is also an ERC20 token)

## Randomness

The random contract removed, if randomness is needed then the PREVRANDAO opcode can be used, more details [here](https://specs.celo.org/l2_migration.html#deactivated-random-contract).

## Blocks

* Block interval changed from 5s to 1s
* Block gas changed from 50m to 30m

:::note
Note this results in a 300% increase in gas per second due to the shortened block time
:::

### Added fields
* __withdrawals__ & __withdrawalsRoot__ - these fields are inherited from Ethereum but not used by the op-stack or Celo, withdrawals will always be an empty list, `withdrawalsRoot` will always be the empty withdrawals root (`0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421`)
* __blobGasUsed__ & __excessBlobGas__ - these fields are also inherited from Ethereum but not used by the op-stack or Celo, they will always be zero.
* __parentBeaconBlockRoot__ - set to the `parentBeaconRoot` of the L1 origin block.

### Removed fields
* __randomness__ - not needed since the [randomness](#randomness) feature is being removed
* __epochSnarkData__ - not needed since there will be no [Plumo](https://docs.celo.org/protocol/plumo) support in the Celo L2.
* __extraData__ - will have the BLS aggregated signature removed, this simplifies the L2 implementation and since we already trust those blocks and distributed rewards for them, the BLS signature is no longer required.

## EIP1559 implementation

Previously our implementation used a smart contract [(here)](https://github.com/celo-org/celo-monorepo/blob/faca88f6a48cc7c8e6104393e49ddf7c2d7d20e3/packages/protocol/contracts-0.8/common/GasPriceMinimum.sol#L162) to calculate the base fee which allowed for governable parameters. Now we use the the standard EIP1559 algorithm with the parameter values being defined in the chain config.

The parameters we are using are:

- Alfajores
  - EIP-1559 elasticity multiplier: 5
  - EIP-1559 denominator: 400
  - EIP-1559 floor: 25 Gwei (Note that the floor is not part of the original EIP-1559 specification, but it did exist in the Celo L1 smart contract implementation)

## RPC API

### Pre-transition data

Old blocks, transactions, receipts and logs will still be accessible via the RPC API but they will differ a bit from the corresponding objects retrieved from the L1 RPC API.

In general the changes involve additional extra unset fields that have been added upstream but were not present on historical Celo L1 objects, and the removal of some unnecessarily set fields on Celo L1 objects.

For in depth details of what is changed see here - (TODO add section in specs covering this)

### Pre-transition execution and state access

RPC API calls for pre-transition blocks that are performing execution or accessing state will not be directly supported by the new Celo L2 implementation, however if this is required you can configure your Celo L2 node to proxy to an archive Celo L1 node for these calls. See [here](./l2-operator-guide#supporting-historical-execution)


# Optimism → Celo L2

## Blocks

Celo L2 block times are 1s as opposed to 2s for optimism, the gas limit per block remains the same.

## Native token
The native token is Celo as opposed to Eth. The native token is also an ERC20 token.

## New transaction type

Type 123 (`0x7b`) transaction type allows paying for gas in currencies other than the native asset (Celo). It has an additional field `feeCurrency` which allows the sender to chose the currency they pay gas in a chosen fee currency.

The fee currencies available at mainnet launch will be:

 - USDC (USDC)
 - Tether USD (USD₮)
 - PUSO (PUSO)
 - ECO CFA (eXOF)
 - Celo Kenyan Shilling (cKES)
 - Celo Dollar (cUSD)
 - Celo Euro (cEUR)
 - Celo Brazilian Real (cREAL)

## L1 fees

In the optimism model, an extra fee is added on to user transactions in order to cover the cost of the L1, this can be surprising to users since they have no visibility about what that fee may be since it is not included in the results of calling estimate_gas.

The Celo L2 always keeps the L1 fee at zero. This doesn't however mean that we will not charge fees to cover the cost of the L1, just that we won't do it via the L1 fees mechanism. Instead we may raise or lower the [base fee floor](#eip1559-implementation-1) accordingly to match the L1 fees.

## EIP1559 implementation

The Celo L2 adds a base fee floor, which imposes a lower limit on the base fee. This is currently configured in through chain config.

The starting value is:

- Alfajores:
  - base fee floor: 25 Gwei


## MaxCodeSize

The hardcoded protocol parameter `MaxCodeSize` is raised from 24576 to 65536.

## Block receipt

Historically the Celo L1 generated a block receipts when system contract calls generated logs, although the Celo L2 doesn't produce block receipts, the pre-existing block receipts are retrievable via the RPC API `eth_getBlockReceipt` call passing the hash of the block in question.

## Improved finality guarantees

The Celo L2 blocks only reference L1 blocks that are finalized, this means that the Celo L2 is protected from re-orgs that could occur due to L1 re-orgs, this is in contrast to the optimism L2 blocks which reference L1 blocks 4 blocks behind the L1 chain head.
