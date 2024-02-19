---
title: Contract Addresses
id: contract-addresses
---

import YouTube from '@components/YouTube';
import PageRef from '@components/PageRef';

Core contract address proxies and implementations for the Celo network.

---

:::tip

View Celo smart contracts [here](https://github.com/celo-org/celo-monorepo/tree/master/packages/protocol/contracts) contract addresses by searching testnet or mainnet on [celoscan.io](https://celoscan.io/) or [explorer.celo.org](https://explorer.celo.org/).

:::

## Celo Mainnet

```jsx
celocli network:contracts --node https://forno.celo.org
```

| Contract              | Proxy                                      |
| --------------------- | ------------------------------------------ |
| Accounts              | 0x7d21685C17607338b313a7174bAb6620baD0aaB7 |
| Attestations          | 0xdC553892cdeeeD9f575aa0FBA099e5847fd88D20 |
| FederatedAttestations | 0x0aD5b1d0C25ecF6266Dd951403723B2687d6aff2 |
| OdisPayments          | 0xae6b29f31b96e61dddc792f45fda4e4f0356d0cb |
| BlockchainParameters  | 0x6E10a8864C65434A721d82e424d727326F9d5Bfa |
| DoubleSigningSlasher  | 0x50C100baCDe7E2b546371EB0Be1eACcf0A6772ec |
| DowntimeSlasher       | 0x71CAc3B31c138F3327C6cA14f9a1c8d752463fDd |
| Election              | 0x8D6677192144292870907E3Fa8A5527fE55A7ff6 |
| EpochRewards          | 0x07F007d389883622Ef8D4d347b3f78007f28d8b7 |
| Escrow                | 0xf4Fa51472Ca8d72AF678975D9F8795A504E7ada5 |
| Exchange              | 0x67316300f17f063085Ca8bCa4bd3f7a5a3C66275 |
| ExchangeEUR           | 0xE383394B913d7302c49F794C7d3243c429d53D1d |
| FeeCurrencyWhitelist  | 0xBB024E9cdCB2f9E34d893630D19611B8A5381b3c |
| Freezer               | 0x47a472F45057A9d79d62C6427367016409f4fF5A |
| GasPriceMinimum       | 0xDfca3a8d7699D8bAfe656823AD60C17cb8270ECC |
| GoldToken             | 0x471EcE3750Da237f93B8E339c536989b8978a438 |
| Governance            | 0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972 |
| GrandaMento           | 0x03f6842B82DD2C9276931A17dd23D73C16454a49 |
| LockedGold            | 0x6cC083Aed9e3ebe302A6336dBC7c921C9f03349E |
| Random                | 0x22a4aAF42A50bFA7238182460E32f15859c93dfe |
| Registry              | 0x000000000000000000000000000000000000ce10 |
| Reserve               | 0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9 |
| SortedOracles         | 0xefB84935239dAcdecF7c5bA76d8dE40b077B7b33 |
| StableToken           | 0x765DE816845861e75A25fCA122bb6898B8B1282a |
| StableTokenEUR        | 0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73 |
| TransferWhitelist     | 0xb49E4d6F0B7f8d0440F75697E6c8b37E09178BCF |
| Validators            | 0xaEb865bCa93DdC8F47b8e29F40C5399cE34d0C58 |

## Alfajores Testnet

```jsx
celocli network:contracts --node https://alfajores-forno.celo-testnet.org
```

| Contract              | Proxy                                      |
| --------------------- | ------------------------------------------ |
| Accounts              | 0xed7f51A34B4e71fbE69B3091FcF879cD14bD73A9 |
| Attestations          | 0xAD5E5722427d79DFf28a4Ab30249729d1F8B4cc0 |
| FederatedAttestations | 0x70F9314aF173c246669cFb0EEe79F9Cfd9C34ee3 |
| BlockchainParameters  | 0xE5aCbb07b4Eed078e39D50F66bF0c80cF1b93abe |
| DoubleSigningSlasher  | 0x88A4c203C488E8277f583942672E1aF77e2B5040 |
| DowntimeSlasher       | 0xf2224c1d7b447D9A43a98CBD82FCCC0eF1c11CC5 |
| Election              | 0x1c3eDf937CFc2F6F51784D20DEB1af1F9a8655fA |
| EpochRewards          | 0xB10Ee11244526b94879e1956745bA2E35AE2bA20 |
| Escrow                | 0xb07E10c5837c282209c6B9B3DE0eDBeF16319a37 |
| Exchange              | 0x17bc3304F94c85618c46d0888aA937148007bD3C |
| ExchangeBRL           | 0xf391DcaF77360d39e566b93c8c0ceb7128fa1A08 |
| ExchangeEUR           | 0x997B494F17D3c49E66Fafb50F37A972d8Db9325B |
| FeeCurrencyWhitelist  | 0xB8641365dBe943Bc2fb6977e6FBc1630EF47dB5a |
| Freezer               | 0xfe0Ada6E9a7b782f55750428CC1d8428Cd83C3F1 |
| GasPriceMinimum       | 0xd0Bf87a5936ee17014a057143a494Dc5C5d51E5e |
| GoldToken             | 0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9 |
| Governance            | 0xAA963FC97281d9632d96700aB62A4D1340F9a28a |
| GrandaMento           | 0xEcf09FCD57b0C8b1FD3DE92D59E234b88938485B |
| LockedGold            | 0x6a4CC5693DC5BFA3799C699F3B941bA2Cb00c341 |
| Random                | 0xdd318EEF001BB0867Cd5c134496D6cF5Aa32311F |
| Registry              | 0x000000000000000000000000000000000000ce10 |
| Reserve               | 0xa7ed835288Aa4524bB6C73DD23c0bF4315D9Fe3e |
| SortedOracles         | 0xFdd8bD58115FfBf04e47411c1d228eCC45E93075 |
| StableToken           | 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1 |
| StableTokenBRL        | 0xE4D517785D091D3c54818832dB6094bcc2744545 |
| StableTokenEUR        | 0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F |
| TransferWhitelist     | 0x52449A99e3455acB831C0D580dCDAc8B290d5182 |
| Validators            | 0x9acF2A99914E083aD0d610672E93d14b0736BBCc |
