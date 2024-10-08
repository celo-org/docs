# Optimism → Celo L2

## Blocks

Celo L2 block times are 1s as opposed to 2s for optimism, the gas limit per block remains the same.

## Native token
The native token is CELO as opposed to ETH. The native token is also an ERC20 token.

## New transaction type

Type 123 (`0x7b`) transaction type allows paying for gas in currencies other than the native asset (CELO). It has an additional field `feeCurrency` which allows the sender to chose the currency they pay gas in a chosen fee currency. See [here](https://specs.celo.org/fee_abstraction.html) for details on using fee currencies.

The fee currencies available at mainnet launch will be:

 - USDC (USDC)
 - Tether USD (USD₮)
 - PUSO (PUSO)
 - ECO CFA (eXOF)
 - Celo Kenyan Shilling (cKES)
 - Celo Dollar (cUSD)
 - Celo Euro (cEUR)
 - Celo Brazilian Real (cREAL)

More details on supported transaction types [here](https://specs.celo.org/tx_types.html).

## L1 fees

In the Optimism model, an extra fee is added on to user transactions in order to cover the cost of the L1, this can be surprising to users since they have no visibility about what that fee may be since it is not included in the results of calling `eth_estimateGas`.

The Celo L2 always keeps the L1 fee at zero. This doesn't however mean that we will not charge fees to cover the cost of the L1, just that we won't do it via the L1 fees mechanism. Instead we may raise or lower the [base fee floor](#eip1559-implementation-1) accordingly to match the L1 fees.

## EIP1559 implementation

The Celo L2 adds a base fee floor, which imposes a lower limit on the base fee. This is currently configured through chain config.

The starting value is:

- Alfajores testnet:
  - base fee floor: 25 gwei


## MaxCodeSize

The hardcoded protocol parameter `MaxCodeSize` is raised from 24576 to 65536.

## Block receipt

Historically the Celo L1 generated a block receipts when system contract calls generated logs, although the Celo L2 doesn't produce block receipts, the pre-existing block receipts are retrievable via the RPC API `eth_getBlockReceipt` call passing the hash of the block in question.

## Improved finality guarantees

The Celo L2 blocks only reference L1 blocks that are finalized, this means that the Celo L2 is protected from re-orgs that could occur due to L1 re-orgs, this is in contrast to the Optimism L2 blocks which reference L1 blocks 4 blocks behind the L1 chain head.