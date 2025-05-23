---
title: Granda Mento
description: Introduction to Granda Mento (CIP 38), its design, and how to manage exchange proposals.
---

# Granda Mento

Introduction to Granda Mento (CIP 38), its design, and how to manage exchange proposals.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## What is Granda Mento?

Granda Mento, described in [CIP 38](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0038.md), is a mechanism for exchanging large amounts of CELO for Celo stable tokens that aren't suitable for [Mento](doto) or over-the-counter (OTC).

Mento has proven effective at maintaining the stability of Celo's stable tokens, but the intentionally limited liquidity of its constant-product market maker results in meaningful slippage when exchanging tens of thousands of tokens at a time. Slippage is the price movement experienced by a trade. Generally speaking, larger volume trades will incur more slippage and execute at a less favorable price for the trader.

Similar to Mento, exchanges through Granda Mento are effectively made against the reserve. Purchased stable tokens are created into existence ("minted"), and sold stable tokens are destroyed ("burned"). Purchased CELO is taken from the reserve, and sold CELO is given to the reserve. For example, a sale of 50,000 CELO in exchange for 100,000 cUSD would involve the 50,000 CELO being transferred to the reserve and the 100,000 cUSD being created and given to the exchanger.

At the time of writing, exchanging about 50,000 cUSD via Mento results in a slippage of about 2%. Without Granda Mento, all launched Celo stable tokens can only be minted and burned using Mento, with the exception of cUSD that is minted as validator rewards each epoch. Granda Mento was created to enable institutional-grade liquidity to mint or burn millions of stable tokens at a time.

The Mainnet Granda Mento contract address is `0x03f6842B82DD2C9276931A17dd23D73C16454a49` ([link](https://explorer.celo.org/address/0x03f6842B82DD2C9276931A17dd23D73C16454a49)), was introduced in [Contract Release 5](https://github.com/celo-org/governance/blob/main/CGPs/cgp-0037.md), and activated in [CGP 31](https://github.com/celo-org/governance/blob/main/CGPs/cgp-0031.md).

## How it works

A Granda Mento exchange requires rough consensus from the Celo community and, unlike the instant and atomic Mento exchanges, involves the exchanger locking their funds to be sold for multiple days before they are exchanged.

### Design

At a high level, the life of an exchange is:

1. Exchanger creates an "exchange proposal" on-chain that locks their funds to be sold and calculates the amount of the asset being purchased according the current oracle price and a configurable spread.
2. If rough consensus from the community is achieved, a multi-sig (the "approver") that has been set by Governance approves the exchange proposal on-chain.
3. To reduce trust in the approver multi-sig, a veto period takes place where any community member can create a governance proposal to "veto" an approved exchange proposal.
4. After the veto period has elapsed, the exchange is executable by any account. The exchange occurs with the price locked in at stage (1).

### Processes

Processes surrounding Granda Mento exchanges, like how to achieve rough consensus from the community, are outlined in [CIP 46](https://github.com/celo-org/celo-proposals/blob/master/CIPs/cip-0046.md). At the minimum, it takes about 7 days to achieve rough consensus.

The approver multi-sig that is ultimately responsible for approving an exchange proposal that has achieved rough consensus from the community is `0xf10011424A0F35B8411e9abcF120eCF067E4CF27` ([link](https://explorer.celo.org/address/0xf10011424A0F35B8411e9abcF120eCF067E4CF27/transactions)) and has the following signers:

| **Name**        | **Affiliation**               | **Discord Handle**        | **Address**                                  |
| --------------- | ----------------------------- | ------------------------- | -------------------------------------------- |
| Andrew Shen     | Bi23 Labs                     | `Shen \| Bi23 Labs #6675` | `0xBecc041a5090cD08AbD3940ab338d4CC94d2Ed3c` |
| Pinotio         | Pinotio                       | `Pinotio.com #5357`       | `0x802FE32083fD341D8e9A35E3a351291d948a83E6` |
| Serge Kiema     | DuniaPay                      | `serge_duniapay #5152`    | `0xdcac99458a3c5957d8ae7b92e4bafc88a32b80e4` |
| Will Kraft      | Celo Governance Working Group | `Will Kraft #2508`        | `0x169E992b3c4BE08c42582DAb1DCFb2549d9C23E1` |
| Zviad Metreveli | WOTrust                       | `zm #1073`                | `0xE267D978037B89db06C6a5FcF82fAd8297E290ff` |
| human           | OpenCelo                      | `human #6811`             | `0x91f2437f5C8e7A3879e14a75a7C5b4CccC76023a` |
| Deepak Nuli     | Kresko                        | `Deepak \| Kresko#3647`   | `0x099f3F5527671594351E30B48ca822cc90778a11` |
