---
title: Build with DeFi
description: A beginner's guide to building DeFi applications on Celo
---

# Build with DeFi

In this guide you can explore tooling and infrastructure for building DeFi on Celo.

## Overview  

Stablecoins play a crucial role in decentralized finance (DeFi) by providing price stability, reducing volatility, and enabling seamless financial transactions. Celo has built an ecosystem optimized for stablecoins, making it a leading platform for real-world DeFi applications. With a focus on financial inclusion, building on Celo means enabling accessible and affordable financial tools for people around the world.  

## Why Stablecoins Matter  

Stablecoins are digital assets pegged to a stable reserve, such as fiat currency or a basket of assets. They provide key benefits in DeFi and financial transactions and financial inclusion:  

- **Price Stability** – Unlike volatile cryptocurrencies, stablecoins maintain a predictable value.  
- **Low-Cost Transactions** – Sending stablecoins on Celo costs significantly less than on traditional blockchains.  
- **Borderless Access** – Users can send and receive stablecoins globally, without needing a bank account.  
- **Programmability** – Stablecoins can be used in smart contracts to enable lending, savings, and remittances.  
- **Financial Inclusion** – Stablecoins empower unbanked and underbanked populations with access to digital financial services.  

Celo is uniquely positioned to advance the adoption of stable digital assets through the [Mento](https://www.mento.org/) Protocol—a decentralized stablecoin platform built on Celo. [Mento](https://www.mento.org/) enables the creation of local stablecoins that are algorithmically stabilized and backed by crypto collateral. This approach helps users access a price-stable digital currency that is aligned with their local economy.

The goal of Mento is simple: to provide a stable asset for every country in the world. These stable assets can be used for everyday payments, savings, remittances, and commerce—empowering individuals in regions with high inflation or limited access to traditional banking infrastructure.

### Celo Stablecoin Ecosystem  

Celo offers multiple stablecoin options for different use cases:  

| Stablecoin       | Issuer                                             | Use Case                                          |
| ---------------- | -------------------------------------------------- | ------------------------------------------------- |
| **cUSD**         | [Mento](https://www.mentolabs.xyz/products)        | US Dollar-pegged digital cash                        |
| **cEUR**         | [Mento](https://www.mentolabs.xyz/products)        | Euro-pegged stablecoin                            |
| **cREAL**        | [Mento](https://www.mentolabs.xyz/products)        | Brazilian Real-pegged stablecoin                  |
| **eXOF**         | [Mento](https://www.mentolabs.xyz/products)        | CFA Franc-pegged stablecoin                       |
| **cKES**         | [Mento](https://www.mentolabs.xyz/products)        | Kenya Shilling-pegged stablecoin                  |
| **PUSO**         | [Mento](https://www.mentolabs.xyz/products)        | Philippine Peso-pegged stablecoin                 |
| **cCOP**         | [Mento](https://www.mentolabs.xyz/products)        | Colombia Peso-pegged stablecoin                   |
| **cGBP**         | [Mento](https://www.mentolabs.xyz/products)        | British Pound-pegged stablecoin                   |
| **cCAD**         | [Mento](https://www.mentolabs.xyz/products)        | Canadian Dollar-pegged stablecoin                   |
| **cAUD**         | [Mento](https://www.mentolabs.xyz/products)        | Australian Dollar-pegged stablecoin                   |
| **cZAR**         | [Mento](https://www.mentolabs.xyz/products)        | South African Rand-pegged stablecoin                   |
| **cGHS**         | [Mento](https://www.mentolabs.xyz/products)        | Ghanaian Cedi-pegged stablecoin                   |
| **cNGN**         | [Mento](https://www.mentolabs.xyz/products)        | Nigerian Naira-pegged stablecoin                   |
| **cJPY**         | [Mento](https://www.mentolabs.xyz/products)        | Japanese Yen-pegged stablecoin                   |
| **cCHF**         | [Mento](https://www.mentolabs.xyz/products)        | Swiss Franc-pegged stablecoin                   |
| **USDT**         | [Tether](https://tether.to/en/)                    | Popular stablecoin on multiple blockchains        |
| **USDC**         | [Circle](https://www.circle.com/usdc)              | Widely used stablecoin with high liquidity        |
| **Glo Dollar**   | [Glo Foundation](https://www.glodollar.org/)       | Impact-driven stablecoin supporting global causes |
| **Good Dollar**  | [GoodDollar](https://www.gooddollar.org/)          | UBI-focused stablecoin for financial inclusion    |
| **USDM**         | [Mountain Protocol](https://mountainprotocol.com/) | Yield-bearing stablecoin                          |
| **BRLA Digital** | [BRLA](https://brla.digital/)                      | Brazil-based stablecoin                           |

### Examples of DeFi Applications on Celo  

Celo supports a vibrant ecosystem of DeFi protocols that utilize stablecoins:  

#### Lending & Borrowing  

- **[Aave](https://aave.com/)** – Decentralized lending and borrowing using stablecoins.  

#### Decentralized Exchanges (DEX)

Find all Exchanges [here](/what-is-celo/using-celo/exchanges). For cross-chain exchanges check out the [bridges](/developer/bridges) and [cross-chain messaging](/developer/bridges/cross-chain-messaging) pages. 

- **[Velodrome](https://velodrome.finance/)** – Velodrome is a decentralized exchange where you can execute low-fee swaps, deposit tokens to earn rewards, and actively participate in the onchain economy.
- **[Uniswap](https://app.uniswap.org/)** – Swaps and liquidity pools for stablecoins.  
- **[Ubeswap](https://ubeswap.org/)** – A Celo-native DEX optimized for mobile users.  
- **[Carbon DeFi by Bancor](https://www.carbondefi.xyz/)** – Empowering users with onchain automation and superior orderbook-like features. 
- 

#### Liquidity Incentives  

- **[Steer Protocol](https://steer.finance/)** – Automated liquidity strategies.  
- **[Merkl](https://app.merkl.xyz/)** – Rewarding liquidity providers with stablecoin incentives.
- **[Icchi](https://www.ichi.org/)** – Automated Liquidity Strategies for DeFi Yield.

### Oracles

Oracles are a crucial part to get real time price information on tokens. Speed is crucail when it comes to building DeFi applicaations and you should not rely on web2 APIs for price feeds. Find all Oracles in the [tooling section](/developer/oracles).

- [RedStone Oracles](/developer/oracles/redstone)
- [Chainlink, Price Feed Oracles](https://docs.chain.link/data-feeds/price-feeds/addresses?network=celo)

### Human-Centered Security Tools

- **[Noves](https://docs.noves.fi/reference/api-overview)** - Deciphering on-chain activity and standardizing the results
  - Human‑readable DeFi, ReFi & bridge txs
  - Pre‑sign safety simulations in any Celo wallet
  - Real‑time CELO / cUSD / stCELO pricing

## Get Started  

Developers and entrepreneurs can leverage Celo's infrastructure to build next-generation stablecoin applications.  

By building on Celo, you're not just creating DeFi applications—you're enabling real-world financial inclusion and empowering users globally.  
