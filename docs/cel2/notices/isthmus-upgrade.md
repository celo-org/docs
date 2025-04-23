# Isthmus hardfork

This page outlines breaking changes related to the Isthmus network upgrade for chain operators and node operators.

:::info
The Isthmus hardfork activation has not been scheduled yet. This page will be updated accordingly.
:::

## What's included in Isthmus

Isthmus contains these main changes:

- **Implement Prague features on the OP Stack**: This includes the EIPs that are relevant to the L2 that are being added to Ethereum with its Pectra activation. Learn more about this [here](https://gov.optimism.io/t/proposal-preview-implement-prague-features-on-the-op-stack/9703).

  Notable EIP's included:
  - [EIP-7702](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-7702.md): Set code transaction
  - [EIP-2537](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-2537.md): BLS12-381 precompiles
  - [EIP-2935](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-2935.md): Block hashes contract predeploy
  - [EIP-7623](https://github.com/ethereum/EIPs/blob/f27ddf2b0af7e862a967ee38ceeaa7d980786ca1/EIPS/eip-7623.md): Increase calldata cost

- **L2 Withdrawals Root in Block Header**: This lowers the lift for chain operators by allowing them to run a full node to operate op-dispute-mon making it easier to guarantee the security of the fault proofs for the chains in the Superchain as the number of chains scales. Learn more about this [here](https://gov.optimism.io/t/proposal-preview-l2-withdrawals-root-in-block-header/9730).

For more information on the Isthmus implementation details, please review [Isthmus specification](https://specs.optimism.io/protocol/isthmus/overview.html).
