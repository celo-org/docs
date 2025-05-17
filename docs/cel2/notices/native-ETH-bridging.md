# SuperBridgeETHWrapper: Bridging Native ETH to Celo

This document provides a minimal overview of the `SuperBridgeETHWrapper.sol` contract and its deployed addresses.

## Purpose

The `SuperBridgeETHWrapper.sol` contract allows users to bridge native ETH from an L1 network (like Ethereum or Holesky) to the Celo L2 network, where it arrives as WETH.

> **Disclaimer:** When using Superbridge, this entire process is abstracted away from the user.

### How it Works (Simplified):

1.  User sends ETH to this contract on L1 (calls `wrapAndBridge` function).
2.  Contract wraps ETH into WETH on L1.
3.  Contract uses the L1 Standard Bridge to send this WETH to Celo L2.
4.  WETH arrives on Celo L2.

## Deployed Contract Addresses

**Note:** For Alfajores and Baklava, the L1 is the Holesky testnet. For Celo Mainnet, the L1 is Ethereum Mainnet.

### Alfajores (L1: Holesky)

| Description                                   | Address                                      |
| :-------------------------------------------- | :------------------------------------------- |
| L1 WETH Address (WETH_ADDRESS_LOCAL)          | `0x94373a4919B3240D86eA41593D5eBa789FEF3848` |
| L2 WETH Address (WETH_ADDRESS_REMOTE on Celo Alfajores) | `0x4EE7Ea447197c6b7BE0ab1A068F55c74a3390F33` |
| L1 Standard Bridge Proxy (STANDARD_BRIDGE_ADDRESS) | `0xD1B0E0581973c9eB7f886967A606b9441A897037` |
| Deployed SuperBridgeETHWrapper Address (on Holesky) | `0x78fb67119c4a055d6eb497b1aa5d09f7124225e5` |

### Baklava (L1: Holesky)

| Description                                   | Address                                      |
| :-------------------------------------------- | :------------------------------------------- |
| L1 WETH Address (WETH_ADDRESS_LOCAL)          | `0x94373a4919B3240D86eA41593D5eBa789FEF3848` |
| L2 WETH Address (WETH_ADDRESS_REMOTE on Celo Baklava) | `0xBEcfCB91527166382187D5EE80ac07433D01549e` |
| L1 Standard Bridge Proxy (STANDARD_BRIDGE_ADDRESS) | `0x6fd3fF186975aD8B66Ab40b705EC016b36da0486` |
| Deployed SuperBridgeETHWrapper Address (on Holesky) | `0x6b7FAa7cC86DCd14e78F6a78F2dCfC76f8042e58` |

### Mainnet (L1: Ethereum)

| Description                                   | Address                                      |
| :-------------------------------------------- | :------------------------------------------- |
| L1 WETH Address (WETH_ADDRESS_LOCAL)          | `0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2` |
| L2 WETH Address (WETH_ADDRESS_REMOTE on Celo Mainnet) | `0xD221812de1BD094f35587EE8E174B07B6167D9Af` |
| L1 Standard Bridge Proxy (STANDARD_BRIDGE_ADDRESS) | `0x9C4955b92F34148dbcfDCD82e9c9eCe5CF2badfe` |
| Deployed SuperBridgeETHWrapper Address (on Ethereum Mainnet) | `0x3bC7C4f8Afe7C8d514c9d4a3A42fb8176BE33c1e` |
