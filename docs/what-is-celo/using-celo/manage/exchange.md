---
title: Exchange Celo Assets
description: How to use the Celo exchange bot to exchange CELO and Celo stable tokens.
---

# Exchange Celo Assets

How to use the Celo exchange bot to exchange CELO and Celo stable tokens.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

:::warning
The celo-exchange-bot is currently not being maintained. If you want to use please check and update dependencies to solve potential security vulnerabilities of old dependencies
:::

## Celo Exchange Bot

CELO (previously Celo Gold) can be exchanged for Celo stable tokens (e.g. Celo Dollar or Celo Euro) using Mento, an automated market maker that powers the [stability protocol](/what-is-celo/about-celo-l1/protocol/stability/doto). Mento is a Constant Product Market Maker (CPMM) that allows you to exchange CELO for Celo stable tokens and vice versa. Sales of Celo stable tokens to Mento in exchange for CELO burn the Celo stable tokens from supply, and sales of CELO to Mento in exchange for Celo stable tokens mint Celo stable tokens into supply. Trades with Mento incur slippage, meaning that Mento exchanges move the price out of favor of the trader. Generally, larger trade amounts incur more significant amounts of slippage. Mento also resets the price of CELO quoted in the Celo stable token every few minutes according to a [price oracle](/what-is-celo/about-celo-l1/protocol/stability/oracles).

Because of slippage and the Mento price occasionally changing according to a price oracle, those who wish to mint Celo stable tokens into supply may wish to slowly sell CELO for Celo stable tokens over time, rather than in a single exchange. Executing a smaller volume exchange every few seconds over a period of time is likely to result in less slippage when minting Celo stable tokens. [celo-exchange-bot](https://github.com/celo-org/celo-exchange-bot) was created to easily allow community members to exchange CELO for Celo stable tokens over a period of time to avoid incurring significant amounts of slippage.

## Running the bot

[celo-exchange-bot](https://github.com/celo-org/celo-exchange-bot) is intended to be operated by the exchanger as it requires access to the source key, which must own CELO funds to exchange and is the account that performs the exchanges. Operating the bot requires some technical knowledge of dealing with keys and operating infrastructure. Currently, the bot requires the source key to be an HSM in Azure's Key Vault service. Information on how to use an Azure Cloud HSM can be found [here](/integration/cloud-hsm).

See the repository's [README](https://github.com/celo-org/celo-exchange-bot) for information on building a Docker image and configurating the bot. Example infrastructure using Azure's [Container Instances](https://azure.microsoft.com/en-gb/services/container-instances/) is also provided in the repository [here](https://github.com/celo-org/celo-exchange-bot/tree/master/infrastructure-example). While the bot does require Azure Key Vault to be used for the source key and the provided example infrastructure is ran on Azure, the bot itself can be ran from anywhere as long as it's able to access its Azure Key Vault Cloud HSM.
