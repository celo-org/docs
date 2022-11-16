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

| Contract             | Proxy                                      | Implementation                             |
| -------------------- | ------------------------------------------ | ------------------------------------------ |
| Accounts             | 0x7d21685C17607338b313a7174bAb6620baD0aaB7 | 0xd0C0183682102C2a84f37e8C90063A25cCe044fF |
| Attestations         | 0xdC553892cdeeeD9f575aa0FBA099e5847fd88D20 | 0x1EC3366D384ee7996F2F70B67A65C5d54Ce96040 |
| BlockchainParameters | 0x6E10a8864C65434A721d82e424d727326F9d5Bfa | 0xDEfbc89482cd36B98d1b506Cc56Dd2AF74217955 |
| DoubleSigningSlasher | 0x50C100baCDe7E2b546371EB0Be1eACcf0A6772ec | 0x4Bb82B5862Beb483Fdb762EC4A6cB60953568A12 |
| DowntimeSlasher      | 0x71CAc3B31c138F3327C6cA14f9a1c8d752463fDd | 0x9ebB6A46149a43C9D1B12EfdC068b969eCA7246F |
| Election             | 0x8D6677192144292870907E3Fa8A5527fE55A7ff6 | 0xAaa9CB9f0afCc60d8fb21F82D5D47c4557924115 |
| EpochRewards         | 0x07F007d389883622Ef8D4d347b3f78007f28d8b7 | 0x563BA8Ed56bd32a964831aB6AfF1E53238177eDA |
| Escrow               | 0xf4Fa51472Ca8d72AF678975D9F8795A504E7ada5 | 0x7C98cc3Ad12058E8E37160Fb72f8ff557d742a54 |
| Exchange             | 0x67316300f17f063085Ca8bCa4bd3f7a5a3C66275 | 0xEDF3F7e01037e4583de2659C5e243621Ea2501A4 |
| ExchangeEUR          | 0xE383394B913d7302c49F794C7d3243c429d53D1d | 0x622833AB6E9501C9072d2c706c60AaB5Ff0234d9 |
| FeeCurrencyWhitelist | 0xBB024E9cdCB2f9E34d893630D19611B8A5381b3c | 0xc301efebAe9c517eA81f87d2CF2Ff0A87caaBc83 |
| Freezer              | 0x47a472F45057A9d79d62C6427367016409f4fF5A | 0xa79cDb272799175A118A4Ce49ceCBF3eC86649e6 |
| GasPriceMinimum      | 0xDfca3a8d7699D8bAfe656823AD60C17cb8270ECC | 0x7C4194dF1Dbdb5ca737B7d457bB00176f8A52361 |
| GoldToken            | 0x471EcE3750Da237f93B8E339c536989b8978a438 | 0x4DdeB8F7041aB3260c6ec5Afb6FEab0650F4ABB4 |
| Governance           | 0xD533Ca259b330c7A88f74E000a3FaEa2d63B7972 | 0xe6F77e6c1Df6Aea40923659C0415d82119F34882 |
| GrandaMento          | 0x03f6842B82DD2C9276931A17dd23D73C16454a49 | 0x5B2C9E7932B08D8F2Ce70ef9E5c98528256f9aB4 |
| LockedGold           | 0x6cC083Aed9e3ebe302A6336dBC7c921C9f03349E | 0x6B51e3BD4E1E8Df315766F93499B42978B110CEa |
| Random               | 0x22a4aAF42A50bFA7238182460E32f15859c93dfe | 0xE43ea9C641a2af9959CaEEe54aDB089F65457028 |
| Registry             | 0x000000000000000000000000000000000000ce10 | 0x203fdf86A00999107Df531fa00b4bA81d674cb66 |
| Reserve              | 0x9380fA34Fd9e4Fd14c06305fd7B6199089eD4eb9 | 0xc683e6f77B58D814B31F8661331EbDf63785D607 |
| SortedOracles        | 0xefB84935239dAcdecF7c5bA76d8dE40b077B7b33 | 0xaf5D514bB94023C9Af979821F59A5Eecde0986EF |
| StableToken          | 0x765DE816845861e75A25fCA122bb6898B8B1282a | 0x18E6BFDc909063F7445E410a5495264619495bCB |
| StableTokenEUR       | 0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73 | 0x09933e89986FeA776C3Be3556dBF9BA23c240bB3 |
| TransferWhitelist    | 0xb49E4d6F0B7f8d0440F75697E6c8b37E09178BCF |                                            |
| Validators           | 0xaEb865bCa93DdC8F47b8e29F40C5399cE34d0C58 | 0x8dF7ad6a1870766BBC9F0b8C38F8Db73126d2ddc |

## Alfajores Testnet

```jsx
celocli network:contracts --node https://alfajores-forno.celo-testnet.org
```

| Contract             | Proxy                                      | Implementation                             |
| -------------------- | ------------------------------------------ | ------------------------------------------ |
| Accounts             | 0xed7f51A34B4e71fbE69B3091FcF879cD14bD73A9 | 0x7CC2e978a3FF0ebeb3725360d607269c6311cab4 |
| Attestations         | 0xAD5E5722427d79DFf28a4Ab30249729d1F8B4cc0 | 0xcc6fd87e98b5d6e8D44F0154d3cF7b4b9FB8A013 |
| BlockchainParameters | 0xE5aCbb07b4Eed078e39D50F66bF0c80cF1b93abe | 0xbc4c0e92ac0a588DF2712E3425723fe22361966f |
| DoubleSigningSlasher | 0x88A4c203C488E8277f583942672E1aF77e2B5040 | 0xF06EF728067dd7b5CC752DC0C787dABECcBfC82e |
| DowntimeSlasher      | 0xf2224c1d7b447D9A43a98CBD82FCCC0eF1c11CC5 | 0xdF3d2CD57090B3B6C15c18Ec7C1E33DCF565B449 |
| Election             | 0x1c3eDf937CFc2F6F51784D20DEB1af1F9a8655fA | 0xFe93Ce26D492acD1cEEB3a63993C4F3C588BC6A9 |
| EpochRewards         | 0xB10Ee11244526b94879e1956745bA2E35AE2bA20 | 0xd894682B96B1E5954223e0554afad14b2a93cDdb |
| Escrow               | 0xb07E10c5837c282209c6B9B3DE0eDBeF16319a37 | 0x621cf2974c6DBdb8a33b633866795107D47Fe598 |
| Exchange             | 0x17bc3304F94c85618c46d0888aA937148007bD3C | 0xbe632C8756294DbAc9863703eC7E3759141350cF |
| ExchangeBRL          | 0xf391DcaF77360d39e566b93c8c0ceb7128fa1A08 | 0xA34f9A8f5b600085cB3f2056Fe292aD96Aef1c39 |
| ExchangeEUR          | 0x997B494F17D3c49E66Fafb50F37A972d8Db9325B | 0x4A3ACB12178B40d8cA2b719cBa6BCAE0e8E31F4C |
| FeeCurrencyWhitelist | 0xB8641365dBe943Bc2fb6977e6FBc1630EF47dB5a | 0xe7888E7D90d475260970C58d2bB9d181259de505 |
| Freezer              | 0xfe0Ada6E9a7b782f55750428CC1d8428Cd83C3F1 | 0x423A32Ee1AF793DF26c4aEe7e36441C00C29e280 |
| GasPriceMinimum      | 0xd0Bf87a5936ee17014a057143a494Dc5C5d51E5e | 0x6A0F33AD4c641f57ac2B1eA1cD457a83a578f82D |
| GoldToken            | 0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9 | 0xF469829b3b0D7f696720B34BDE0284E628bD448e |
| Governance           | 0xAA963FC97281d9632d96700aB62A4D1340F9a28a | 0x88CdC239B61c5E5e1aCF31ca35AE015FF1a1706f |
| GrandaMento          | 0xEcf09FCD57b0C8b1FD3DE92D59E234b88938485B | 0x9906CC9EfD28892c9d35B8a0711E5222DB9AA36a |
| LockedGold           | 0x6a4CC5693DC5BFA3799C699F3B941bA2Cb00c341 | 0xbd0b5709e863038C6ef388E6c873ae2df00c18F2 |
| Random               | 0xdd318EEF001BB0867Cd5c134496D6cF5Aa32311F | 0x67c6829506DdF66Ed824Fd1cCC40665588Bc4631 |
| Registry             | 0x000000000000000000000000000000000000ce10 | 0x33011E0a33AF1F757396f2a5A1F2158bEd179Dfd |
| Reserve              | 0xa7ed835288Aa4524bB6C73DD23c0bF4315D9Fe3e | 0xbb1CF1ceEe58dcB7Bb2B579B7860E4F25FdD803F |
| SortedOracles        | 0xFdd8bD58115FfBf04e47411c1d228eCC45E93075 | 0x342fBA470eeDA23f0C5411362711c7D2040Bd531 |
| StableToken          | 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1 | 0xD2e63f44565ceD986ce4FcD6119558e5ccF5b7cB |
| StableTokenBRL       | 0xE4D517785D091D3c54818832dB6094bcc2744545 | 0x563A525fF02f7c4a6607c99f3D9C8c62621b7Fc1 |
| StableTokenEUR       | 0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F | 0xfE52C5E855268B48cCcF8f0C68a608bdf4Af3001 |
| TransferWhitelist    | 0x52449A99e3455acB831C0D580dCDAc8B290d5182 |                                            |
| Validators           | 0x9acF2A99914E083aD0d610672E93d14b0736BBCc | 0xbE94e2bA7360677AaC1C8E412C9ED834BA4fE12d |
