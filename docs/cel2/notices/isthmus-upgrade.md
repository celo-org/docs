# L2 Isthmus Hardfork

This page outlines breaking changes related to the Isthmus network upgrade for node operators.

:::info

This page will be kept updated with key information about the hardfork.

- Baklava testnet activation tentatively planned on block [37277000](https://celo-baklava.blockscout.com/block/countdown/37277000), June 4, 2025, 15:00 UTC.
- Alfajores testnet activation tentatively planned on block [48699000](https://celo-alfajores.blockscout.com/block/countdown/48699000), June 11, 2025, 15:00 UTC. 
- **Mainnet** activation planned on block [**38963000**](https://celo.blockscout.com/block/countdown/38963000), June 25, 2025, 15:00 UTC.

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
