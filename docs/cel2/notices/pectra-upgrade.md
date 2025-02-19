# Preparing for Pectra L1 hardfork

This page outlines breaking changes related to the Ethereum Pectra (Prague-Electra) L1 hard fork for node operators on the Celo Alfajores L2 testnet.

See also the [Optimism Pectra update information](https://docs.optimism.io/notices/pectra-changes).

:::info
This page will be updated continuously with information and timelines. Ethereum L1 clients are currently scheduled to have a release by Feb 13th.

The Pectra upgrade for Holesky L1 is proposed for slot: 3710976 (Mon, Feb 24 at 21:55:12 UTC).
:::

## For node operators on Alfajores

Node operators will need to upgrade to the respective releases before the activation dates.

The following versions are necessary for every node operator:

* `op-geth`: [celo-v2.0.0-rc4](https://github.com/celo-org/op-geth/releases/tag/celo-v2.0.0-rc4)
* `op-node`: [celo-v2.0.0-rc4](https://github.com/celo-org/optimism/releases/tag/celo-v2.0.0-rc4)

### Breaking changes

This version includes a fix which requires breaking changes to the configuration in `rollup.json`. You need to add the new `chain_op_config` field. You can do this by adding the following field to `rollup.json` or by downloading the [updated config](https://storage.googleapis.com/cel2-rollup-files/alfajores/rollup.json).

```json
"chain_op_config": {
	"eip1559Elasticity": 5,
	"eip1559Denominator": 400,
	"eip1559DenominatorCanyon": 400
}
```

## For node operators on Baklava

The releases for the Baklava L2 upgrade already include the changes required for Pectra compatibility. Please follow the [L2 migration instructions](./l2-migration.md).
