---
title: Celo Baklava Testnet
description: Collection of resources to get started with Celo Baklava Testnet (Celo's Node Operator Testnet).
---

# Baklava Testnet (L1)

Collection of resources to get started with Celo Baklava Testnet (Celo's Node Operator Testnet).

---

## What is the Baklava Testnet?

The Baklava Testnet is a non-production Testnet for the Validator community.

**It serves several purposes:**

- **Operational excellence**: Build familiarity with the processes used on Mainnet, and to verify the security and stability of your infrastructure with the new software.
- **Detecting vulnerabilities**: Discover bugs in new software releases before they reach Mainnet.
- **Testing ground**: Experiment with new infrastructure configurations in a low-risk environment.

:::warning

The Baklava Testnet is designed for testing and experimentation by developers. Its tokens hold no real world economic value. The testnet software will be upgraded and the entirety of its data reset on a regular basis. This will erase your accounts, their balance and your transaction history. The testnet software will be upgraded on a regular basis. You may encounter bugs and limitations with the software and documentation.

:::

Please help the community to improve Celo by asking questions on [Discord](https://chat.celo.org) the [Forum](https://forum.celo.org/c/testnets/baklava-testnet/16)!

:::info

# Baklava Testnet (L2)

# Registering

How to register as Validator, same instructions as in the [current docs](https://docs.celo.org/network/mainnet/run-validator#registering-as-a-validator). The only  difference is that BLS signatures are not required.

# Run a node

See https://github.com/celo-org/simple-celo-node.

# Register as RPC provider

To register as a RPC provider, a public https url needs to be registered on-chain. To do this, we will register the rpc url in a signed metadata file in the Celo Account.

> Make sure to be in CLI in version at least `6.0.0-beta.5`
> 

The `--from`  flag in the CLI can either be the validator account itself, or the validator signer. 

1. Create a new metadata file. If, instead, you want to update an existing one, download it instead of creating it.
    
    `$ celocli account:create-metadata ./metadata.json --from $VALIDATOR_SIGNER`
    
2. Register your public RPC url:
    
    `$ celocli account:claim-rpc-url ./metadata.json --from $VALIDATOR_SIGNER --rpcUrl $RPC_URL`
    
3. Upload this metadata file to a publicly available URL with high availability.
4. Now link this URL to the validator Celo account:
    
    `$ celocli account:register-metadata --url $METADATA_URL --from $ACCOUNT_ADDRESS` 
    
5. Verify that the metadata registration was successful by retrieving it:
    
    `$ celocli account:get-metadata $ACCOUNT_ADDRESS`


## Useful links

- [Baklava Faucet Request Form](https://forms.gle/JTYkMAJWTAUQp1sv9) - to request faucetted funds to become a Validator on the Baklava network.
- [Baklava Network Block Explorer](https://baklava-blockscout.celo-testnet.org) - explore the history of the blockchain and view transaction details
