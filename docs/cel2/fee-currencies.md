---
title: Fee Abstraction on Cel2
---

## Fee Abstraction Addresses

### Get list of whitelisted Fee Currencies

```bash
celocli network:whitelist --node https://forno.dango.celo-testnet.org
```

### Using Fee Abstraction

Transfer 1 USDC using USDC as fee currency

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
