---
title: Composer Kit MCP Server
---

The **Composer Kit MCP Server** is a Model Context Protocol (MCP) server that provides comprehensive access to Composer Kit UI components documentation, examples, and usage information. This powerful tool enables AI assistants and development environments to access the complete Composer Kit React component library designed for building web3 applications on the Celo blockchain.

## Key Features

- 🧩 **Component Library Access**: Complete documentation for all Composer Kit UI components
- 📚 **Code Examples**: Ready-to-use code snippets and implementation patterns
- 🔍 **Semantic Search**: Find components by functionality or use case
- 🏗️ **Celo Composer Integration**: Template management and project creation guides
- 📖 **Step-by-Step Guides**: Comprehensive tutorials for development and deployment
- 🎯 **Category Organization**: Components organized by functionality and use case

## Prerequisites

- Python 3.11 or higher
- An IDE that supports MCP (Cursor or Claude Desktop)
- Basic knowledge of React and web3 development

## Installation

### Method 1: Using pip

```bash
pip install composer-kit-mcp
```

### Method 2: Using pipx (Recommended for isolation)

```bash
# Install pipx if you haven't already
pip install pipx

# Install composer-kit-mcp in an isolated environment
pipx install composer-kit-mcp
```

### Method 3: Development Installation

```bash
git clone https://github.com/celo-org/composer-kit-mcp
cd composer-kit-mcp
pip install -e .
```

## MCP Client Integration

### Cursor IDE Setup

1. **Install the MCP server** (if not already done):

   ```bash
   pip install composer-kit-mcp
   ```

2. **Configure Cursor** by adding the MCP server to your settings:

   - Open Cursor Settings (Cmd/Ctrl + ,)
   - Navigate to "Features" → "Model Context Protocol"
   - Add a new MCP server:

   ```json
   {
     "mcpServers": {
       "composer-kit-mcp": {
         "command": "uvx",
         "args": ["composer-kit-mcp"]
       }
     }
   }
   ```

3. **Restart Cursor** and verify the setup by asking:
   - "What Composer Kit components are available?"
   - "Show me how to use the Wallet component"
   - "Search for payment-related components"

### Claude Desktop Setup

1. **Install the MCP server**:

   ```bash
   pip install composer-kit-mcp
   ```

2. **Locate your Claude Desktop config file**:

   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

3. **Edit the config file**:

   ```json
   {
     "mcpServers": {
       "composer-kit-mcp": {
         "command": "uvx",
         "args": ["composer-kit-mcp"]
       }
     }
   }
   ```

4. **Restart Claude Desktop** and verify setup by looking for the 🔌 icon

## Available Tools

### Component Information

#### Component Discovery

- **`list_components`**: List all available Composer Kit components with descriptions and categories
- **`get_component`**: Get detailed information about a specific component including source code, props, and usage

#### Component Search

- **`search_components`**: Search for components by functionality, description, or category
- **`get_component_by_category`**: Get all components in a specific category

### Celo Composer Integration

#### Project Management

- **`list_celo_composer_templates`**: List all available Celo Composer templates (Minipay, Valora, Social Connect)
- **`get_celo_composer_template`**: Get detailed information about a specific template
- **`create_celo_composer_project`**: Generate CLI commands for creating new projects

#### Development Guides

- **`get_step_by_step_guides`**: Get comprehensive guides for common development tasks
- **`search_guides`**: Search for specific development guides and tutorials

### Documentation Access

#### Code Examples

- **`get_component_examples`**: Get usage examples for specific components
- **`get_integration_examples`**: Get examples of combining multiple components

## Component Categories

### Core Components

Essential UI components for basic dApp functionality:

- **Address**: Display Ethereum addresses with copy functionality
- **Balance**: Token balance display and management
- **Transaction**: Smart contract interaction components

### Wallet Integration

Components for wallet connection and user management:

- **Wallet**: Complete wallet connection interface
- **Connect**: Simplified wallet connection buttons
- **Avatar & Name**: User identity display components

### Payment & Transactions

Components for handling payments and blockchain transactions:

- **Payment**: Complete payment flow with dialogs and error handling
- **Transaction**: Transaction execution with status tracking
- **Swap**: Token exchange interfaces

### Token Management

Components for token selection and management:

- **TokenSelect**: Token search and selection components
- **Balance**: Advanced balance management with precision control

### NFT Components

Components for NFT display and interaction:

- **NFTCard**: NFT display components
- **NFTMint**: NFT minting interfaces
- **NFTImage & NFTMeta**: NFT metadata display

### Identity Components

Components for user identity and social features:

- **Identity**: User profile display with social links
- **Social**: Integration with Twitter, GitHub, Farcaster

## Celo Composer Templates

### Minipay Template

- **Purpose**: Pre-configured for building mini-payment dApps on Celo
- **Use Cases**: Mobile-first payment applications, micro-transactions, P2P payments
- **Features**: Mobile-optimized UI, payment flow components, PWA support

### Valora Template

- **Purpose**: Designed for easy Valora wallet integration
- **Use Cases**: Valora wallet integration, social payments, DeFi applications
- **Features**: Valora connectivity, social features, multi-token support

### Social Connect Template

- **Purpose**: Applications with social identity features
- **Use Cases**: Social identity verification, phone number authentication
- **Features**: Social Connect integration, identity verification, phone mapping

## Development Features

### Semantic Search

Find components by describing what you need:

- "payment form with error handling"
- "wallet connection button"
- "token swap interface"
- "NFT gallery display"

### Code Generation

Get ready-to-use code snippets:

- Complete component implementations
- Integration patterns
- Best practices examples
- Error handling patterns

### Template Integration

Seamlessly combine Composer Kit with Celo Composer:

- Template-specific configurations
- Component recommendations by use case
- Integration guides and examples

## Running the Server

Start the MCP server directly for testing:

```bash
# Run the MCP server
python -m composer_kit_mcp.server
```
