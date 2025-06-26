# L2 Isthmus Hardfork

This page outlines breaking changes related to the Isthmus network upgrade for node operators.

:::info

This page will be kept updated with key information about the hardfork.

- Baklava testnet activation was executed at timestamp `1749654000` on Wed, Jun 11, 2025, 15:00:00 UTC.
- Alfajores testnet activation was executed at timestamp `1750863600` on Wed, Jun 25, 2025, 15:00:00 UTC.
- **Mainnet** activation is planned at timestamp **`1752073200`** on Wed, Jul 9, 2025, 15:00:00 UTC.

:::warning
Some operators whose nodes reached the Alfajores hardfork (block 49908280)
before upgrading to v2.1.0 have noticed that their nodes get stuck and remain
stuck even after upgrading to v2.1.0.

This can be resolved by upgrading both op-geth and op-node to v2.1.0, stopping
op-node, rewinding the op-geth head to before the hardfork and starting
op-node again.

To rewind the head, you can use:

```
cast rpc -r <op-geth-node-address> debug_setHead 49908270
```
:::
:::

## What's included in Isthmus

Isthmus contains these main changes:

- **Implement Prague features on the OP Stack**: This includes the EIPs that are relevant to the L2 that are being added to Ethereum with its Pectra activation. Learn more about this [here](https://gov.optimism.io/t/proposal-preview-implement-prague-features-on-the-op-stack/9703).

  Notable EIP's included:
  - [EIP-7702](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-7702.md): Set code transaction
  - [EIP-2537](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-2537.md): BLS12-381 precompiles
  - [EIP-2935](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-2935.md): Block hashes contract predeploy
  - [EIP-7623](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-7623.md): Increase calldata cost

- **L2 Withdrawals Root in Block Header**: This lowers the lift for chain operators by allowing them to run a full node to operate op-dispute-mon, making it easier to guarantee the security of the fault proofs for the chains in the Superchain as the number of chains scales. Learn more about this [here](https://gov.optimism.io/t/proposal-preview-l2-withdrawals-root-in-block-header/9730).

For more information on the Isthmus implementation details, please review [OP's Isthmus specification](https://specs.optimism.io/protocol/isthmus/overview.html).

Isthmus additionally enables the [Holocene hardfork](https://docs.optimism.io/notices/holocene-changes) with the following changes:

- **Holocene block derivation**: A set of changes that render the derivation pipeline stricter and simpler, improving worst-case scenarios for the Fault Proof System and Interoperability.
- **EIP-1559 configurability**: The elasticity and denominator EIP-1559 parameters become configurable via the SystemConfig L1 contract, allowing the gas target and gas limit to be configured independently.

For more information on the Holocene details, please review [OP's Holocene specification](https://specs.optimism.io/protocol/holocene/overview.html).

## For node operators

Node operators will need to upgrade to the respective Isthmus releases before the activation dates.

### Update to the latest release

The release contains the activation timestamps for Celo Mainnet, Baklava and Alfajores.

- `op-geth` at [v2.1.0](https://github.com/celo-org/op-geth/releases/tag/celo-v2.1.0)
- `op-node` at [v2.1.0](https://github.com/celo-org/optimism/releases/tag/celo-v2.1.0)

#### Updating the EigenDA proxy

The Isthmus hardfork also prepares the Celo networks for the EigenDA v2 update.

This means that operators need to make sure to upgrade the [EigenDA proxy](https://github.com/Layr-Labs/eigenda-proxy) to version [v1.8.2](https://github.com/Layr-Labs/eigenda-proxy/releases/tag/v1.8.2).

### Verify Your Configuration

Make the following checks to verify that your node is properly configured.

- op-node and op-geth will log their configurations at startup
- Check that the Isthmus time is set to `activation-timestamp` in the `op-node` startup logs
- Check that the Isthmus time is set to `activation-timestamp` in the `op-geth` startup logs
