---
title: Celo Listing Integrations
description: Guidance for digital asset exchanges or ranking sites on running a Celo node and auditing your setup.
---

# Listings

Guidance for digital asset exchanges or ranking sites on running a Celo node and auditing your setup.

---

## Support

For any questions or assistance with these instructions, please contact cLabs or inquire in [Celo's Discord server](https://chat.celo.org/). Note that Discord is a public channel: never disclose recovery phrases (also known as backup keys or mnemonics), private keys, unsanitized log output, or personal information.

This guide provides comprehensive information on brand assets, integration with Celo, and useful listing information, as well as support resources.

## Celo Brand Assets for Listing

If you are listing Celo on your exchange, you will need access to the Celo Platform brand assets, available [here](https://celo.org/brand-kit).

Ensure that your use of the Celo Platform assets complies with the brand policy found [here](https://celo.org/brand-kit-policy).

## How To's

### Integrating Celo With Your Infrastructure

There are several methods to integrate the Celo Platform with your infrastructure.

A general overview of relevant integrations for listing Celo Platform is available [here](/integration/general).

For specific use-cases for exchanges, please refer to the [Custody and Exchange Integration Guide](/integration/custody).

## Important Information

### Celo Native Asset and Stable Value Currencies

The Celo network features key assets, including the Celo native asset (CELO) and Celo-powered Stable Value Currencies, such as Celo Dollar (cUSD) and Celo Euro (cEUR). CELO was formerly known as Celo Gold (cGLD) when the contract was deployed, so references to Celo Gold and CGLD may still appear in the codebase. For more information, please read [this](/developer/migrate/from-ethereum#the-celo-native-asset-and-the-celo-dollar) section of the documentation.

You can also view the forum post about the name change [here](https://forum.celo.org/t/proposal-to-rename-celo-gold-to-celo-native-asset/528).

## Resources

### Addresses for CELO and Stable Value Currencies

- CELO (\$CELO) - [`0x471ece3750da237f93b8e339c536989b8978a438`](https://explorer.celo.org/address/0x471ece3750da237f93b8e339c536989b8978a438/transactions)
- Celo Dollar (\$cUSD) - [`0x765de816845861e75a25fca122bb6898b8b1282a`](https://explorer.celo.org/address/0x765de816845861e75a25fca122bb6898b8b1282a/transactions)
- Celo Euro (\$cEUR) - [`0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73`](https://explorer.celo.org/address/0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73/transactions)
- Celo Brazilian Real (\$cREAL) - [`0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787`](https://explorer.celo.org/address/0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787/transactions)

### Useful API Endpoints

The following API endpoints are useful for listing CELO and cUSD digital assets.

#### CELO and Stable Value Currencies

##### Total CELO Supply

To query the API for the total coins in circulation in CELO, use the following endpoint:

```sh
$ curl https://thecelo.com/api/v0.1.js?method=ex_totalcoins
{"code":"200","msg":"success","data":{"CELO":608485841.9959723,"cUSD":10250632.56099673}}
```

##### Stable Value Currencies

###### cUSD Circulating Supply

Circulating Supply refers to the number of coins circulating in the market and in the general public's hands.

```sh
$ curl https://thecelo.com/api/v0.1.js?method=ex_cusd_circulating
11353464.550486518
```

###### cEUR Circulating Supply

This endpoint is not yet available.

#### CP-DOTO (Stability Algorithm)

Information on CP-DOTO can be found [here](/protocol/stability/doto).

For API endpoints useful for listing that follow [CMC requirements](https://docs.google.com/document/d/1S4urpzUnO2t7DmS_1dc4EL4tgnnbTObPYXvDeBnukCg/edit#)

##### Mento Addresses

- cUSD/CELO contract - [`0x67316300f17f063085Ca8bCa4bd3f7a5a3C66275`](https://explorer.celo.org/address/0x67316300f17f063085Ca8bCa4bd3f7a5a3C66275/transactions)
- cEUR/CELO contract - [`0xE383394B913d7302c49F794C7d3243c429d53D1d`](https://explorer.celo.org/address/0xE383394B913d7302c49F794C7d3243c429d53D1d/transactions)
- cREAL/CELO contract - [`0x8f2cf9855C919AFAC8Bd2E7acEc0205ed568a4EA`](https://explorer.celo.org/address/0x8f2cf9855C919AFAC8Bd2E7acEc0205ed568a4EA/transactions)

##### Summary

Summary overview of market data for all tickers and all markets. These endpoints do not yet support cEUR.

```sh
$ curl https://thecelo.com/api/v0.1.js?method=ex_summary

{"trading_pairs":"CELO_CUSD","last_price":2.6143,"lowest_ask":2.5933609958506225,"highest_bid":2.5676,"base_volume":37524.32000000003,"quote_volume":14714.520000000002,"price_change_percent_24h":3.7027120070382127,"highest_price_24h":2.649,"lowest_price_24h":2.4787}}
```

##### Assets

In-depth details of the assets available on the exchange.

```sh
$ curl https://thecelo.com/api/v0.1.js?method=ex_assets

{"code":"200","msg":"success","data":{"CELO":{"name":"CELO","unified_cryptoasset_id":"5567","can_withdraw":"true","can_deposit":"true","min_withdraw":"0.000000000000000001","max_withdraw":"0.000000000000000001","maker_fee":"0.00","taker_fee":"0.005"},"CUSD":{"name":"Celo Dollars","unified_cryptoasset_id":"825","can_withdraw":"true","can_deposit":"true","min_withdraw":"0.000000000000000001","max_withdraw":"0.000000000000000001","maker_fee":"0.00","taker_fee":"0.005"}}}
```

##### Ticker

24-hour rolling window price change statistics.

```sh
$ curl https://thecelo.com/api/v0.1.js?method=ex_ticker

{"code":"200","msg":"success","data":{"CELO_CUSD":{"base_id":"5567","quote_id":"825","last_price":2.6124,"quote_volume":14789.520000000002,"base_volume":37720.30000000003,"isFrozen":"0"}}}
```

##### Orderbook

Market depth of a trading pair. One array contains a list of ask prices and another array contains bid prices.

```sh
$ curl https://thecelo.com/api/v0.1.js?method=ex_orderbook

{"code":"200","msg":"success","data":{"timestamp":1601061465962,"bids":[["2.5964","100"]],"asks":[["2.622606871230003","100"]]}}
```

##### CELO cUSD

Recently completed (past 24h) trades.

```sh
$ curl https://thecelo.com/api/v0.1.js?method=ex_celocusd

{"code":"200","msg":"success","data":{"CELO_CUSD":[{"trade_id":2697341,"timestamp":1601061491,"price":0.38238291620515147,"quote_volume":25,"base_volume":65.37948987916423,"type":"Sell"},{"trade_id":2697336,"timestamp":1601061466,"price":0.382293821845672,"quote_volume":25,"base_volume":65.39472670341044,"type":"Sell"}]}}
```

### Whitepapers

To learn about the Celo Protocol, please refer to the [whitepaper](/general/whitepapers).

For more information on other aspects of the Celo Protocol, visit the [useful links](/general/) page.

To learn more about the Stability Mechanism, refer to [this page](/protocol/stability/doto). The [Stability Analysis Whitepaper](https://celo.org/papers/Celo_Stability_Analysis.pdf) and [blog post](https://medium.com/celohq/a-look-at-the-celo-stability-analysis-white-paper-part-1-23edd5ef8b5) provide additional information on the stability algorithm.

For information about the Celo Reserve, a diversified portfolio of cryptocurrencies supporting the Celo protocol's ability to expand and contract the supply of Celo stable assets, visit [https://celoreserve.org](https://celoreserve.org).

### GitHub

The Celo Protocol GitHub repository is located [here](https://github.com/celo-org/).

### Audits

All security audits on the smart contracts, security, and economics of the Celo Platform can be found [here](https://celo.org/audits).
