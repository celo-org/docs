`celocli identity`
==================

Interact with ODIS and the attestations service

* [`celocli identity:withdraw-attestation-rewards`](#celocli-identitywithdraw-attestation-rewards)

## `celocli identity:withdraw-attestation-rewards`

Withdraw accumulated attestation rewards for a given currency

```
USAGE
  $ celocli identity:withdraw-attestation-rewards --from 0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d [-k
    <value> | --useLedger | ] [-n <value>] [--gasCurrency
    0x1234567890123456789012345678901234567890] [--ledgerAddresses <value> ]
    [--ledgerLiveMode ] [--globalHelp] [--tokenAddress
    0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d]

FLAGS
  -k, --privateKey=<value>
      Use a private key to sign local transactions with

  -n, --node=<value>
      URL of the node to run commands against or an alias

  --from=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      (required) Address to withdraw from. Can be the attestation signer address or the
      underlying account address

  --gasCurrency=0x1234567890123456789012345678901234567890
      Use a specific gas currency for transaction fees (defaults to CELO if no gas
      currency is supplied). It must be a whitelisted token.

  --globalHelp
      View all available global flags

  --ledgerAddresses=<value>
      [default: 1] If --useLedger is set, this will get the first N addresses for local
      signing

  --ledgerLiveMode
      When set, the 4th postion of the derivation path will be iterated over instead of
      the 5th. This is useful to use same address on you Ledger with celocli as you do on
      Ledger Live

  --tokenAddress=0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d
      The address of the token that will be withdrawn. Defaults to cUSD

  --useLedger
      Set it to use a ledger wallet

DESCRIPTION
  Withdraw accumulated attestation rewards for a given currency

FLAG DESCRIPTIONS
  -n, --node=<value>  URL of the node to run commands against or an alias

    Can be a full url like https://forno.celo.org or an alias. default:
    http://localhost:8545
    Alias options:
    local, localhost => 'http://localhost:8545'
    alfajores => Celo Alfajores Testnet,
    testnet, celo-sepolia => Celo Sepolia Testnet,
    mainnet, celo, forno => Celo Mainnet chain',
```

_See code: [src/commands/identity/withdraw-attestation-rewards.ts](https://github.com/celo-org/developer-tooling/tree/%40celo/celocli%407.1.0-beta.1/packages/cli/src/commands/identity/withdraw-attestation-rewards.ts)_
