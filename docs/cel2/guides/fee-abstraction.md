---
title: Fee Abstraction on Celo L2
---

## Fee Abstraction Addresses

Celo allows paying gas fees in currencies other than the native currency. The tokens that can be used to pay gas fees are controlled via governance and the list of tokens allowed is maintained in `FeeCurrencyDirectory.sol`.

Fee abstraction on Celo works with EOAs. No paymaster required!

### Get a list of whitelisted Fee Currencies

```bash
celocli network:whitelist --node https://alfajores-forno.celo-testnet.org
```

### Using Fee Abstraction with Celo CLI

Transfer 1 USDC using USDC as fee currency, with the [`celocli`](https://docs.celo.org/cli) using the `--gasCurrency` flag

```bash
celocli transfer:erc20 --erc20Address 0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B --from 0x22ae7Cf4cD59773f058B685a7e6B7E0984C54966 --to 0xDF7d8B197EB130cF68809730b0D41999A830c4d7 --value 1000000 --gasCurrency 0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B --privateKey [PRIVATE_KEY]
```

| Symbol  | Token                                       | Adapter                                    |
| :----:  | :----------------------------------------:  | :----------------------------------------: |
| cAUD    | 0x7175504C455076F15c04A2F90a8e352281F492F9  |                                            |
| cCAD    | 0xff4Ab19391af240c311c54200a492233052B6325  |                                            |
| cCHF    | 0xb55a79F398E759E43C95b979163f30eC87Ee131D  |                                            |
| cCOP    | 0x8A567e2aE79CA692Bd748aB832081C45de4041eA  |                                            |
| cEUR    | 0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73  |                                            |
| cGBP    | 0xCCF663b1fF11028f0b19058d0f7B674004a40746  |                                            |
| cGHS    | 0xfAeA5F3404bbA20D3cc2f8C4B0A888F55a3c7313  |                                            |
| cJPY    | 0xc45eCF20f3CD864B32D9794d6f76814aE8892e20  |                                            |
| cKES    | 0x456a3D042C0DbD3db53D5489e98dFb038553B0d0  |                                            |
| cNGN    | 0xE2702Bd97ee33c88c8f6f92DA3B733608aa76F71  |                                            |
| cREAL   | 0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787  |                                            |
| cUSD    | 0x765DE816845861e75A25fCA122bb6898B8B1282a  |                                            |
| cZAR    | 0x4c35853A3B4e647fD266f4de678dCc8fEC410BF6  |                                            |
| eXOF    | 0x73F93dcc49cB8A239e2032663e9475dd5ef29A08  |                                            |
| PUSO    | 0x105d4A9306D2E55a71d2Eb95B81553AE1dC20d7B  |                                            |
| USD₮    | 0x0E2A3e05bc9A16F5292A6170456A710cb89C6f72  |                                            |
| USDC    | 0xcebA9300f2b948710d2653dD7B07f33A8B32118C  | 0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B |

When using USDC for fee abstraction, you have to use the adapter address instead of the USDC token address. This is necessary to avoid inaccuracies due to USDC's low number of decimals (6 compared to 18 for the other tokens).

 ### Using Fee Abstraction Programmatically

You can use Fee Abstraction by specifying a token/adapter address as a value for the `feeCurrency` property in the transaction object. The `feeCurrency` property in the transaction object is exclusive to Celo and allows paying gas fees using assets other than the native currency of the network.

:::info
Wallets will overwrite the `feeCurrency`, which is why this is recommended for wallet developers or backend developers.
:::

When using Fee Abstraction for a wallet or inside your dApp we recommend using [viem](https://viem.sh/docs/introduction.html) or [wagmi](https://wagmi.sh/).

:::info
While we recommend viem, [web3.js](https://docs.web3js.org/) has added as of 4.13.1 support for `feeCurrency` via the usage of [plugins](https://docs.web3js.org/#packages--plugins). There is a celo-specific [plugin for web3@4 available on github](https://github.com/celo-org/web3-plugin-transaction-types).

:::warning
Currently, ethers.js doesn't support the `feeCurrency` property
:::

### Sending transaction using Fee Abstraction

Sending transactions with fee currency other than the native currency of the network is pretty straightforward. All you need to do is set the `feeCurrency` property in the transaction object with the address of the token/adapter you want to use to pay for gas fees.

The below code snippet demonstrates transferring 1 USDC using USDC as gas currency.

```js
import { createWalletClient, http } from "viem";
import { celo } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { stableTokenAbi } from "@celo/abis";

// Creating account from private key, you can choose to do it any other way.
const account = privateKeyToAccount("0x432c...");

// WalletClient can perform transactions.
const client = createWalletClient({
  account,

  // Passing chain is how viem knows to try serializing tx as cip42.
  chain: celo,
  transport: http(),
});

const USDC_ADAPTER_MAINNET = "0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B";
const USDC_MAINNET = "0xcebA9300f2b948710d2653dD7B07f33A8B32118C";

/*
  The UI of the wallet should calculate the transaction fees, show it and consider the amount to not be part of the asset that the user i.e the amount corresponding to transaction fees should not be transferrable.
*/
async function calculateTransactionFeesInUSDC(transaction) {
  // Implementation of getGasPriceInUSDC is in the above code snippet
  const gasPriceInUSDC = await getGasPriceInUSDC();

  // Implementation of estimateGasInUSDC is in the above code snippet
  const estimatedGasPrice = await estimateGasInUSDC(transaction);

  return gasPriceInUSDC * estimatedGasPrice;
}

async function send(amountInWei) {
  const to = USDC_MAINNET;

  // Data to perform an ERC20 transfer
  const data = encodeFunctionData({
    abi: stableTokenAbi,
    functionName: "transfer",
    args: [
      "0xccc9576F841de93Cd32bEe7B98fE8B9BD3070e3D",
      // Different tokens can have different decimals, cUSD (18), USDC (6)
      amountInWei,
    ],
  });

  const transactionFee = await calculateTransactionFeesInUSDC({ to, data });

  const tokenReceivedbyReceiver = parseEther("1") - transactionFee;

  /* 
    Now the data has to be encode again but with different transfer value because the receiver receives the amount minus the transaction fee.
  */
  const dataAfterFeeCalculation = encodeFunctionData({
    abi: stableTokenAbi,
    functionName: "transfer",
    args: [
      "0xccc9576F841de93Cd32bEe7B98fE8B9BD3070e3D",
      // Different tokens can have different decimals, cUSD (18), USDC (6)
      tokenReceivedbyReceiver,
    ],
  });

  // Transaction hash
  const hash = await client.sendTransaction({
    ...{ to, data: dataAfterFeeCalculation },

    /*
      In case the transaction request does not include the feeCurrency property, the wallet can add it or change it to a different currency based on the user balance.

      Notice that we use the USDC_ADAPTER_MAINNET address not the token address this is because at the protocol level only 18 decimals tokens are supported, but USDC is 6 decimals, the adapter acts a unit converter.
    */
    feeCurrency: USDC_ADAPTER_MAINNET,
  });

  return hash;
}
```
