---
title: Celo MCP Server
---

The **Celo MCP Server** is a Model Context Protocol (MCP) server that provides comprehensive access to the Celo blockchain. This powerful tool enables AI assistants and development environments to interact directly with Celo blockchain data, execute token operations, manage NFTs, handle smart contract interactions, process transactions, and participate in governance operations.

## Key Features

- 🔗 **Blockchain Data Access**: Real-time access to blocks, transactions, and account information
- 💰 **Token Operations**: Complete ERC20 and Celo stable token support (cUSD, cEUR, cREAL)
- 🖼️ **NFT Management**: Support for ERC721 and ERC1155 standards with metadata fetching
- 📄 **Smart Contract Interactions**: Call functions, estimate gas, and manage ABIs
- 📊 **Transaction Handling**: Gas estimation, EIP-1559 support, and transaction simulation
- 🏛️ **Governance Operations**: Access to Celo governance proposals and voting data

## Prerequisites

- Python 3.11 or higher
- Git (v2.38 or higher)
- An IDE that supports MCP (Cursor or Claude Desktop)

## Installation

### Method 1: Direct Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/celo-org/celo-mcp
cd celo-mcp
pip install -e .
```

### Method 2: Using pipx (Recommended)

```bash
pip install pipx
pipx install celo-mcp
```

## Configuration

Set up optional environment variables for custom RPC endpoints:

```bash
export CELO_RPC_URL="https://forno.celo.org"  # Default: Celo mainnet
export CELO_TESTNET_RPC_URL="https://forno.celo-sepolia.celo-testnet.org/"  # Celo Sepolia testnet
```

## MCP Client Integration

### Cursor IDE Setup

Add the following configuration to your MCP settings file (`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "celo-mcp": {
      "command": "uvx",
      "args": ["--refresh", "celo-mcp"]
    }
  }
}
```

The `--refresh` flag ensures the latest code is always loaded when the MCP server starts.

### Claude Desktop Setup

For Claude Desktop, add this configuration to your MCP settings file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "celo-mcp": {
      "command": "uvx",
      "args": ["--refresh", "celo-mcp"]
    }
  }
}
```

## Available Tools

### Blockchain Data Operations

#### Network and Block Information

- **`get_network_status`**: Get current network status and connection information
- **`get_block`**: Fetch block information by number, hash, or "latest"
- **`get_latest_blocks`**: Get information about recent blocks (up to 100)

#### Account and Transaction Data

- **`get_account`**: Get account information including balance and nonce
- **`get_transaction`**: Get detailed transaction information by hash

### Token Operations

#### Token Information and Balances

- **`get_token_info`**: Get detailed token information (name, symbol, decimals, supply)
- **`get_token_balance`**: Get token balance for a specific address
- **`get_celo_balances`**: Get CELO and stable token balances for an address

### NFT Operations

#### NFT Management

- **`get_nft_info`**: Get NFT information including metadata and collection details
- **`get_nft_balance`**: Get NFT balance for an address (supports ERC721 and ERC1155)

### Smart Contract Operations

#### Contract Interactions

- **`call_contract_function`**: Call read-only contract functions
- **`estimate_contract_gas`**: Estimate gas for contract function calls

### Transaction Operations

#### Transaction Management

- **`estimate_transaction`**: Estimate gas and cost for transactions
- **`get_gas_fee_data`**: Get current gas fee data including EIP-1559 fees

### Governance Operations

#### Celo Governance

- **`get_governance_proposals`**: Get Celo governance proposals with pagination
- **`get_proposal_details`**: Get detailed information about specific governance proposals

## Development

### Running Tests

```bash
# Install development dependencies
pip install -e ".[dev]"

# Run tests
pytest

# Run with coverage
pytest --cov=celo_mcp
```

### Code Quality

```bash
# Format code
black src/
isort src/

# Lint code
flake8 src/
mypy src/
```

## Running the Server

Start the MCP server directly:

```bash
# Run the MCP server
python -m celo_mcp.server

```
