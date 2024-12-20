# Bridging with Wormhole

## Introduction to Wormhole

Wormhole is a generic message-passing protocol that enables secure and efficient communication between blockchains. It allows for seamless data transfers between different networks, breaking down the barriers that traditionally separate these ecosystems. With Wormhole, developers can build cross-chain applications that leverage the unique features of multiple blockchains.

Below, we have two guides linked: one for cross-chain messaging from Avalanche Fuji to Celo Alfajores and another for token transfers. Before diving into these guides, here are some resources to find all Celo-specific addresses and information when using Wormhole:

### Celo-Specific Considerations

While Wormhole’s integration works similarly across EVM-compatible blockchains, there are a few specifics to note when working with Celo:

#### Chain IDs

- Wormhole uses its own chain-agnostic IDs for each network, which differ from the usual blockchain chain IDs.
- Celo’s Wormhole chain ID can be found in the [**Wormhole Chain ID Reference**](https://wormhole.com/docs/build/reference/chain-ids/).

#### Core Contract Address

- Each chain connected to Wormhole has a specific core contract address.
- The core contract address for Celo, along with others, is listed in the [**Wormhole Contract Address Reference**](https://wormhole.com/docs/build/reference/contract-addresses/).

---

### Cross-Chain Messaging from Avalanche to Celo

For developers looking to implement cross-chain messaging from Avalanche to Celo, a comprehensive guide is available:

**[Demo: Wormhole Messaging](https://github.com/wormhole-foundation/demo-wormhole-messaging/tree/31944a2aca3e10a780bdf980c9a8731d1c02e2b1)**

**Key Points:**
- The integration of Celo requires deploying and adding Celo to the `config.json` file.
- The process for Celo is similar to other EVM-compatible blockchains.

### Token Transfers from Avalanche to Celo

For transferring tokens between Avalanche and Celo, you can refer to the following guide:

**[Demo: Cross-Chain Token Transfer](https://github.com/wormhole-foundation/demo-cross-chain-token-transfer)**

---

## Additional Resources

- [Wormhole Documentation](https://wormhole.com/docs/)
- [Celo Documentation](https://docs.celo.org/)
- [Wormhole GitHub Repositories](https://github.com/wormhole-foundation/)

For any further questions or detailed guidance, feel free to explore the references or connect with the community.

