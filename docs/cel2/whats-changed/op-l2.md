# Optimism → Celo L2

## Blocks

Celo L2 block times are 1s as opposed to 2s for Optimism. The gas limit per block remains the same.

## Native token

The native token is CELO as opposed to ETH. The native token is also an ERC20 token.

## New transaction type

Type 123 (`0x7b`) transaction type allows paying for gas in currencies other than the native asset (CELO). It has an additional field `feeCurrency` which allows the sender to choose the currency they pay gas in. See [here](https://specs.celo.org/fee_abstraction.html) for details on using fee currencies.

The fee currencies available at Mainnet launch will be:

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

In the Optimism model, an extra fee is added in order to cover the cost of transactions on the L1. This can be surprising to users as it is not included in the results of calling `eth_estimateGas` and is challenging to predict.

The Celo L2 improves upon this experience by always keeping the L1 fee at zero. Instead, we will cover the L1 cost by raising or lowering the [base fee floor](#eip1559-implementation). This approach allows the full transaction cost to be estimated ahead of time.

## EIP1559 implementation

The Celo L2 adds a base fee floor, which imposes a lower limit on the base fee. This is currently configured via the chain config.

The starting base fee floor values are:

- Alfajores testnet:
  - base fee floor: 25 gwei

## MaxCodeSize

The hardcoded protocol parameter `MaxCodeSize` is raised from 24576 to 65536.

## Improved finality guarantees

Celo L2 blocks reference L1 blocks that are finalized, which fully protects against L1 re-orgs. In contrast, Optimism blocks reference only 4 blocks behind the L1 head.
