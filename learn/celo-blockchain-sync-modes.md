# CELO Blockchain Sync Modes

This guide explains the different synchronization modes available for CELO blockchain nodes, their differences, use cases, and configuration instructions.

## Overview

CELO blockchain supports multiple sync modes that allow nodes to synchronize with the network in different ways, each optimized for specific use cases and resource constraints. Understanding these modes is crucial for developers and node operators to choose the right configuration for their needs.

## Sync Modes

### 1. Full Sync Mode

**Description**: Downloads and validates the complete blockchain history from the genesis block to the current state.

**Characteristics**:
- Downloads all blocks, transactions, and state data
- Validates every transaction and block
- Maintains complete blockchain history
- Highest security and data integrity
- Requires significant storage space and time

**Use Cases**:
- Archive nodes for historical data analysis
- Block explorers and analytics platforms
- Applications requiring complete transaction history
- Maximum security requirements

**Configuration**:
```bash
# Using CELO CLI
celocli node:sync --mode=full

# Using geth directly
geth --syncmode=full --celo.networkid=42220
```

**Storage Requirements**: ~500GB+ (and growing)
**Sync Time**: Several days to weeks depending on network speed

### 2. Fast Sync Mode

**Description**: Downloads recent state without processing all historical transactions, then catches up with full validation.

**Characteristics**:
- Downloads block headers and recent state
- Skips validation of older transactions
- Faster initial synchronization
- Good balance of speed and security
- Default mode for most use cases

**Use Cases**:
- Standard node operation
- DApp backends
- Wallet services
- General development and testing

**Configuration**:
```bash
# Using CELO CLI (default mode)
celocli node:sync --mode=fast

# Using geth directly
geth --syncmode=fast --celo.networkid=42220
```

**Storage Requirements**: ~200-300GB
**Sync Time**: Several hours to 1-2 days

### 3. Light Sync Mode

**Description**: Downloads only block headers and requests data on-demand from full nodes.

**Characteristics**:
- Minimal initial download
- Requests data from other nodes as needed
- Relies on network of full nodes
- Lower storage requirements
- Suitable for resource-constrained environments

**Use Cases**:
- Mobile applications
- IoT devices
- Development environments with limited storage
- Quick setup for testing

**Configuration**:
```bash
# Using CELO CLI
celocli node:sync --mode=light

# Using geth directly
geth --syncmode=light --celo.networkid=42220
```

**Storage Requirements**: ~1-5GB
**Sync Time**: Minutes to hours

### 4. Lightest Sync Mode

**Description**: Minimal data download optimized for basic operations and maximum efficiency.

**Characteristics**:
- Absolute minimum data download
- Optimized for basic blockchain interactions
- Fastest initial setup
- Lowest resource requirements
- Limited functionality compared to other modes

**Use Cases**:
- Simple wallet operations
- Basic transaction sending/receiving
- Minimal resource environments
- Quick prototyping and testing

**Configuration**:
```bash
# Using CELO CLI
celocli node:sync --mode=lightest

# Using geth directly with custom flags
geth --syncmode=light --light.maxpeers=10 --celo.networkid=42220
```

**Storage Requirements**: <1GB
**Sync Time**: Minutes

## Comparison Table

| Mode | Storage | Sync Time | Security | Use Case |
|------|---------|-----------|----------|----------|
| Full | 500GB+ | Days-Weeks | Highest | Archives, Analytics |
| Fast | 200-300GB | Hours-Days | High | General Use |
| Light | 1-5GB | Minutes-Hours | Medium | Mobile, IoT |
| Lightest | <1GB | Minutes | Basic | Wallets, Testing |

## Performance Considerations

### Network Requirements
- **Full/Fast**: High bandwidth for initial sync
- **Light/Lightest**: Lower bandwidth, but requires reliable peers

### Hardware Requirements
- **Full**: High-end server with large storage
- **Fast**: Standard server or powerful desktop
- **Light**: Standard desktop or laptop
- **Lightest**: Any modern device

### Security Trade-offs
- **Full**: Maximum security, validates everything
- **Fast**: High security after initial sync
- **Light**: Depends on trusted peers
- **Lightest**: Basic security, suitable for low-value operations

## Configuration Examples

### Mainnet Configuration
```bash
# Full node for production
geth --syncmode=fast \
     --celo.networkid=42220 \
     --datadir=/data/celo \
     --rpc \
     --rpcaddr=0.0.0.0 \
     --rpcport=8545

# Light node for development
geth --syncmode=light \
     --celo.networkid=42220 \
     --datadir=/data/celo-light \
     --rpc \
     --rpcport=8545
```

### Testnet (Alfajores) Configuration
```bash
# Fast sync on testnet
geth --syncmode=fast \
     --celo.networkid=44787 \
     --datadir=/data/alfajores \
     --bootnodes=enode://...
```

## Switching Between Modes

**Important**: Switching sync modes typically requires re-synchronization from scratch.

```bash
# Stop the node
pkill geth

# Remove existing data (backup if needed)
rm -rf /data/celo/geth

# Start with new sync mode
geth --syncmode=light --celo.networkid=42220
```

## Monitoring Sync Progress

### Using CELO CLI
```bash
# Check sync status
celocli node:synced

# Monitor sync progress
celocli node:status
```

### Using RPC Calls
```bash
# Check if node is syncing
curl -X POST -H "Content-Type: application/json" \
     --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' \
     http://localhost:8545

# Get current block number
curl -X POST -H "Content-Type: application/json" \
     --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
     http://localhost:8545
```

## Troubleshooting

### Common Issues

1. **Slow Sync**: Check network connectivity and peer count
2. **Disk Space**: Ensure adequate storage for chosen mode
3. **Memory Issues**: Adjust cache settings for your hardware
4. **Peer Connection**: Verify firewall and network settings

### Optimization Tips

```bash
# Increase cache for faster sync
geth --cache=2048 --syncmode=fast

# Limit memory usage
geth --cache=512 --syncmode=light

# Increase peer connections
geth --maxpeers=50 --syncmode=fast
```

## Best Practices

1. **Choose the Right Mode**: Match sync mode to your use case
2. **Monitor Resources**: Keep track of storage and bandwidth usage
3. **Regular Backups**: Backup important data before mode changes
4. **Network Stability**: Ensure stable internet connection for sync
5. **Hardware Planning**: Plan storage and compute resources accordingly

## Additional Resources

- [CELO Node Documentation](https://docs.celo.org/validator-guide/overview)
- [Geth Sync Modes](https://geth.ethereum.org/docs/interface/sync-modes)
- [CELO Network Parameters](https://docs.celo.org/network)
- [Node Monitoring Guide](https://docs.celo.org/validator-guide/monitoring)

## Contributing

Found an issue or want to improve this documentation? Please open an issue or submit a pull request to the [CELO docs repository](https://github.com/celo-org/docs).

---

*Last updated: October 2025*
