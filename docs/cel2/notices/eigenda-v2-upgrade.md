# Ice Cream Hardfork 🍦

This page outlines changes related to the EigenDA v2 upgrade for node operators.

:::info

This page will be kept updated with key information about the upgrade. As this upgrade is activated on the sequencer, no detailed activation times can be given.

- Baklava testnet activation was executed on Wed, Jul 30, 2025.
- Alfajores testnet activation was executed on Wed, Aug 20, 2025.
- **Mainnet** activation is planned for Wed, Sep 10, 2025.

:::

## What is the Ice Cream Hardfork?

As part of [Celo’s continued growth as an Ethereum L2](https://forum.celo.org/t/celo-as-an-ethereum-l2-a-frontier-chain-for-global-impact/11376), Celo is integrating [EigenDA v2](https://docs.eigencloud.xyz/products/eigenda/releases/blazar), also known as [Blazar](https://docs.eigencloud.xyz/products/eigenda/releases/blazar), to further innovate and strengthen the network’s data availability layer.

Blazar represents a major architectural upgrade to the EigenDA protocol, introducing improved system throughput and stability, alongside new capabilities like permissionless DA payments and enhanced resource throttling.

Most notably for Celo:

- End-to-end confirmation latency is significantly reduced, moving from minutes to near real-time. Blazar’s design enables rollups to reference blocks in their own logic without waiting for L1 confirmations.
- System throughput and network stability are greatly improved through more efficient chunk distribution, optimized request routing, and horizontal scalability of DA nodes.
Support for decentralized dispersal is unlocked by eliminating DDoS attack surfaces inherent in the original push-based mode.

## For Node Operators

Node operators need to upgrade the [EigenDA proxy](https://github.com/Layr-Labs/eigenda/tree/master/api/proxy) to version [v1.8.2](https://github.com/Layr-Labs/eigenda/pkgs/container/eigenda-proxy/437919973?tag=v1.8.2) before the activation date. The version is backwards compatible with EigenDA v1 and can be updated beforehand.

The new proxy version will require to *add* the following new flags for each network (remember to fill the `eigenda.v2.eth-rpc` and `eigenda.v2.signer-payment-key-hex` from your own set up)

### Mainnet
```
  --storage.backends-to-enable="V1,V2" \
  --eigenda.v2.disperser-rpc=disperser.eigenda.xyz:443 \
  --eigenda.v2.eth-rpc=<SAME YOU ARE USING FOR V1> \
  --eigenda.v2.signer-payment-key-hex=<SAME YOU ARE USING FOR THE PRIVATE IN V1> \
  --eigenda.v2.max-blob-length="16MiB" \
  --eigenda.v2.cert-verifier-addr="0xE1Ae45810A738F13e70Ac8966354d7D0feCF7BD6" \
  --eigenda.v2.service-manager-addr="0x870679e138bcdf293b7ff14dd44b70fc97e12fc0" \
  --eigenda.v2.bls-operator-state-retriever-addr="0xEC35aa6521d23479318104E10B4aA216DBBE63Ce" \
```

### Alfajores and Baklava
```
  --storage.backends-to-enable="V1,V2" \
  --eigenda.v2.disperser-rpc=disperser-holesky.eigenda.xyz:443 \
  --eigenda.v2.eth-rpc=<SAME YOU ARE USING FOR V1> \
  --eigenda.v2.signer-payment-key-hex=<SAME YOU ARE USING FOR THE PRIVATE IN V1> \
  --eigenda.v2.max-blob-length="16MiB" \
  --eigenda.v2.cert-verifier-addr="0xFe52fE1940858DCb6e12153E2104aD0fDFbE1162" \
  --eigenda.v2.service-manager-addr="0xD4A7E1Bd8015057293f0D0A557088c286942e84b" \
  --eigenda.v2.bls-operator-state-retriever-addr="0xB4baAfee917fb4449f5ec64804217bccE9f46C67" \
```

### Celo Sepolia
```
  --storage.backends-to-enable="V1,V2" \
  --eigenda.v2.disperser-rpc=disperser-testnet-sepolia.eigenda.xyz:443 \
  --eigenda.v2.eth-rpc=<SAME YOU ARE USING FOR V1> \
  --eigenda.v2.signer-payment-key-hex=<SAME YOU ARE USING FOR THE PRIVATE IN V1> \
  --eigenda.v2.max-blob-length="16MiB" \
  --eigenda.v2.cert-verifier-addr="0x73818fed0743085c4557a736a7630447fb57c662" \
  --eigenda.v2.service-manager-addr="0x3a5acf46ba6890B8536420F4900AC9BC45Df4764" \
  --eigenda.v2.bls-operator-state-retriever-addr="0x22478d082E9edaDc2baE8443E4aC9473F6E047Ff" \
```

:::tip Docker Compose
The required configuration for each service can be found in our [Docker Compose Setup](https://github.com/celo-org/celo-l2-node-docker-compose), where every network has a corresponding `<network>.env` file.
:::
