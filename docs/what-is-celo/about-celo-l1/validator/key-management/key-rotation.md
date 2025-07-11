---
title: Celo Validator Signer Key Rotation
description: How to manage signer key rotations as a Celo Validator.
---

# Validator Signer Key Rotation

How to manage signer key rotations as a Celo Validator.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

## Why Rotate Keys?

As detailed in [the Celo account roles description page](/what-is-celo/about-celo-l1/validator/key-management/detailed), Celo Locked CELO accounts can authorize separate signer keys for various roles such as voting or validating. This way, if an authorized signer key is lost or compromised, the Locked CELO account can authorize a new signer to replace the old one, without risking the key that custodies funds. This prevents losing an authorized signer key from becoming a catastrophic event. In fact, it is recommended as an operational best practice to regularly rotate keys to limit the impact of keys being silently compromised.

### Validator Signer Rotation

Because the Validator signer key is constantly in use to sign consensus messages, special care must be taken when authorizing a new Validator signer key. The following steps detail the recommended procedure for rotating the validator signer key of an active and elected validator:

1. Create a new Validator instance as detailed in the [Deploy a Validator](/what-is-celo/about-celo-l1/validator/run/mainnet) section of the getting started documentation. When using a proxy, additionally create a new proxy and peer it with the new validator instance, as described in the same document. Wait for the new instances to sync before proceeding. Please note that when running the proxy, the `--proxy.proxiedvalidatoraddress` flag should reflect the new validator signer address. Otherwise, the proxy will not be able to peer with the validator.

:::warning

Before proceeding to step 2 ensure there is sufficient time until the end of the epoch to complete key rotation.

:::

2. Authorize the new Validator signer key with the Locked CELO Account to overwrite the old Validator signer key.

```bash
# With $SIGNER_TO_AUTHORIZE as the new validator signer:

# On the new validator node which contains the new $SIGNER_TO_AUTHORIZE key
docker run -v $PWD:/root/.celo --rm -it $CELO_IMAGE account proof-of-possession $SIGNER_TO_AUTHORIZE $VALIDATOR_ACCOUNT_ADDRESS
docker run -v $PWD:/root/.celo --rm -it $CELO_IMAGE account proof-of-possession $SIGNER_TO_AUTHORIZE $VALIDATOR_ACCOUNT_ADDRESS --bls
```

1. If `VALIDATOR_ACCOUNT_ADDRESS` corresponds to a key you possess:

```bash
# From a node with access to the key for VALIDATOR_ACCOUNT_ADDRESS
celocli account:authorize --from $VALIDATOR_ACCOUNT_ADDRESS --role validator --signer $SIGNER_TO_AUTHORIZE --signature 0x$SIGNER_PROOF_OF_POSSESSION --blsKey $BLS_PUBLIC_KEY --blsPop $BLS_PROOF_OF_POSSESSION
```

2. If `VALIDATOR_ACCOUNT_ADDRESS` is a `ReleaseGold` contract:

```bash
# From a node with access to the beneficiary key of VALIDATOR_ACCOUNT_ADDRESS
celocli releasecelo:authorize --contract $VALIDATOR_ACCOUNT_ADDRESS --role validator --signer $SIGNER_TO_AUTHORIZE --signature 0x$SIGNER_PROOF_OF_POSSESSION --blsKey $BLS_PUBLIC_KEY --blsPop $BLS_PROOF_OF_POSSESSION
```

:::warning

Please note that the BLS key will change along with the validator signer ECDSA key on the node. If the new BLS key is not authorized, then the validator will be unable to process aggregated signatures during consensus, **resulting in downtime**. For more details, please read [the BLS key section of the Celo account role descriptions](/what-is-celo/about-celo-l1/validator/key-management/detailed#authorized-validator-bls-signers).

:::

1. **Leave all validator and proxy nodes running** until the next epoch change. At the start the next epoch, the new Validator signer should take over participation in consensus.

2. Verify that key rotation was successful. Here are some ways to check:
   <!-- TODO: The following URL assumes that the user is running against the Baklava network. This will need to be updated -->

- Open `baklava-blockscout.celo-testnet.org/address/<SIGNER_TO_AUTHORIZE>/validations` to confirm that blocks are being proposed.
- Open `baklava-celostats.celo-testnet.org` to confirm that your node is signing blocks.
- Run `celocli validator:signed-blocks --signer $SIGNER_TO_AUTHORIZE` with the new validator signer address to further confirm that your node is signing blocks.

:::warning

The newly authorized keys will only take effect in the next epoch, so the instance operating with the old key must remain running until the end of the current epoch to avoid downtime.

:::

5. Shut down the validator instance with the now obsolete signer key.
