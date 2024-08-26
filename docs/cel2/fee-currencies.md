---
title: Fee Abstraction on Cel2
---

## Fee Abstraction Addresses

Celo allows paying gas fees in currencies other than the native currency. The tokens that can be used to pay gas fees are controlled via governance and the list of tokens allowed is maintained in `FeeCurrencyWhitelist.sol` contract.

Alternate fee currency works with EOAs, no paymaster is required!

### Get a list of whitelisted Fee Currencies

```bash
celocli network:whitelist --node https://forno.dango.celo-testnet.org
```

### Using Fee Abstraction with Celo CLI

Transfer 1 USDC using USDC as fee currency, with the [`celocli`](https://docs.celo.org/cli) using the `--gasCurrency` flag

```bash
celocli transfer:erc20 --erc20Address 0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B --from 0x22ae7Cf4cD59773f058B685a7e6B7E0984C54966 --to 0xDF7d8B197EB130cF68809730b0D41999A830c4d7 --value 1000000 --gasCurrency 0x4822e58de6f5e485eF90df51C41CE01721331dC0 --privateKey [PRIVATE_KEY]
```

| Symbol |                   Token                    |                  Adapter                   |
| :----: | :----------------------------------------: | :----------------------------------------: |
|  cUSD  | 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1 |                                            |
|  cEUR  | 0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F |                                            |
| cREAL  | 0xE4D517785D091D3c54818832dB6094bcc2744545 |                                            |
|  cKES  | 0x1E0433C1769271ECcF4CFF9FDdD515eefE6CdF92 |                                            |
|  USDC  | 0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B | 0x4822e58de6f5e485eF90df51C41CE01721331dC0 |
|  USD₮  | 0xC4f86E9B4A588D501c1c3e25628dFd50Bc8D615e |                                            |
|   G$   | 0x03d3daB843e6c03b3d271eff9178e6A96c28D25f |                                            |


### Using Fee Abstraction with Programmatically

You can use Fee Abstraction by specifying a token/adapter address as a value for the `feeCurrency` property in the transaction object. The `feeCurrency` property in the transaction object is exclusive to Celo and allows paying gas fees using assets other than the native currency of the network.

:::info
Wallets will overwrite the `feeCurrency`, which is why this is recommended for wallet developers or backend developers. 
:::

For using Fee Abstraction for a wallet or inside your dApp we recommend using [viem](https://viem.sh/docs/introduction.html) or [wagmi](https://wagmi.sh/).

:::warning
Currently, ethers.js and web3.js don't support the `feeCurrency` property
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
