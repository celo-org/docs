---
title: Build an AI-Powered Token Swap Agent on Celo Using GOAT SDK
---


# Build an AI-Powered Token Swap Agent on Celo Using GOAT SDK

This article provides a detailed guide on how to build an AI-powered token swap agent on the Celo blockchain using GOAT SDK. You'll learn how to create an interactive agent capable of performing token swaps through natural language prompts.

## Understanding GOAT SDK for Token Swapping

GOAT SDK provides tools to simplify on-chain interactions for AI agents. This example demonstrates how to use GOAT to swap ERC-20 tokens on Celo. You can use this approach with any EVM-compatible blockchain by simply changing the chain configuration and RPC URL.

Let's examine the code step-by-step:

### 1. Importing Libraries

```javascript
import readline from "node:readline";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { http } from "viem";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celo } from "viem/chains"; // Using Celo chain
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { cUSD, CELO, erc20 } from "@goat-sdk/plugin-erc20"; // Celo tokens
import { uniswap } from "@goat-sdk/plugin-uniswap";
import { sendETH } from "@goat-sdk/wallet-evm";
import { viem } from "@goat-sdk/wallet-viem";
require("dotenv").config();
```

#### Library Descriptions:

- **readline**: This Node.js module is used to create an interactive command-line interface, allowing the user to input prompts and interact with the agent.
- **@ai-sdk/openai and ai**: These libraries facilitate the integration with OpenAI's models (like gpt-4o-mini) to generate text responses and process natural language prompts.
- **viem**: A popular Javascript library for interacting with Ethereum-compatible blockchains, including Celo.
- **http, createWalletClient, privateKeyToAccount**: These are viem modules used to create a wallet client for blockchain interactions.
- **celo**: This imports the chain configuration for the Celo blockchain.
- **@goat-sdk**: This SDK provides tools to simplify on-chain interactions for AI agents.
- **getOnChainTools**: A function to bundle various on-chain tools for the agent.
- **@goat-sdk/plugin-erc20, erc20, cUSD, CELO**: Modules for handling ERC20 tokens on Celo.
- **@goat-sdk/plugin-uniswap, uniswap**: Modules for interacting with decentralized exchanges.
- **@goat-sdk/wallet-evm, viem**: Wallet adapters to connect viem wallet client with @goat-sdk tools.
- **dotenv**: This library loads environment variables from a .env file.

### 2. Wallet Client Creation

```javascript
// 1. Create a wallet client
const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);

const walletClient = createWalletClient({
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chain: celo, // Using Celo chain configuration
});
```

This section creates a viem wallet client:

- It retrieves the private key from the `WALLET_PRIVATE_KEY` environment variable.
- `privateKeyToAccount` converts the private key into a viem account object.
- `createWalletClient` initializes a wallet client connected to the Celo blockchain using the RPC URL from the `RPC_PROVIDER_URL` environment variable.

### 3. Setting Up On-Chain Tools for Token Swapping

```javascript
// 2. Get your onchain tools for your wallet
const tools = await getOnChainTools({
    wallet: viem(walletClient),
    plugins: [
        sendETH(), // Enable CELO transfers (native token)
        erc20({ tokens: [cUSD, CELO] }), // Enable Celo token operations
        uniswap({
            baseUrl: process.env.UNISWAP_BASE_URL as string,
            apiKey: process.env.UNISWAP_API_KEY as string,
        }),
    ],
});
```

`getOnChainTools` is used to assemble the tools the AI agent can use for token swapping:

- `wallet: viem(walletClient)`: Provides the viem wallet client to the toolset.
- `plugins`: An array of plugins that extend the agent's capabilities:
  - `sendETH()`: Enables sending native CELO (although named ETH in the function, it handles the native token).
  - `erc20({ tokens: [cUSD, CELO] })`: Enables ERC20 token operations for Celo-specific tokens.
  - `uniswap(...)`: Enables interaction with Uniswap, configured with a baseUrl and apiKey from environment variables.

### 4. Command Line Interface and AI Interaction Loop

```javascript
// 3. Create a readline interface to interact with the agent
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

while (true) {
  const prompt =
    (await new Promise()) <
    string >
    ((resolve) => {
      rl.question('Enter your prompt (or "exit" to quit): ', resolve);
    });

  if (prompt === "exit") {
    rl.close();
    break;
  }

  console.log("\n-------------------\n");
  console.log("TOOLS CALLED");
  console.log("\n-------------------\n");
  try {
    const result = await generateText({
      model: openai("gpt-4o-mini"),
      tools: tools,
      maxSteps: 10, // Maximum number of tool invocations per request
      prompt: prompt,
      onStepFinish: (event) => {
        console.log(event.toolResults);
      },
    });

    console.log("\n-------------------\n");
    console.log("RESPONSE");
    console.log("\n-------------------\n");
    console.log(result.text);
  } catch (error) {
    console.error(error);
  }
  console.log("\n-------------------\n");
}
```

This sets up the interactive loop where users can input natural language prompts to swap tokens:

- The agent accepts commands like "Swap cUSD for CELO" or "Check my token balance"
- `generateText()` processes these commands through the AI model (gpt-4o-mini)
- The AI determines which tools to call to fulfill the request
- Results are returned in natural language

## Setting Up Your Celo Token Swap Agent

Follow these steps to set up your own token swap agent on Celo:

### 1. Clone the Repository

```bash
git clone https://github.com/goat-sdk/goat.git && cd goat
```

### 2. Install and Build Dependencies

```bash
cd typescript
pnpm install
pnpm build
```

### 3. Navigate to the Example Directory

```bash
cd examples/by-use-case/evm-swap-tokens
```

### 4. Configure Environment Variables

Create a `.env` file with your credentials:

```bash
cp .env.template .env
```

Edit the `.env` file to include:

```plaintext
OPENAI_API_KEY=your_openai_api_key
WALLET_PRIVATE_KEY=your_wallet_private_key
RPC_PROVIDER_URL=https://forno.celo.org  # Celo Mainnet
# or use https://alfajores-forno.celo-testnet.org for Testnet
UNISWAP_BASE_URL=provided_value  # Will be populated from template
UNISWAP_API_KEY=provided_value   # Will be populated from template
```

For production use, you can get your own Uniswap API key from [Uniswap Hub](https://www.uniswap.org/developers).

### 5. Run the Interactive CLI

```bash
pnpm ts-node index.ts
```

## Using the Token Swap Agent on Celo

Once your agent is running, you can interact with it using natural language. Here are some examples specifically for Celo tokens:

```
Swap cUSD for CELO
Swap CELO for cUSD
Check my token balance
What's the current exchange rate between cUSD and CELO?
```

The agent will interpret your commands, call the appropriate tools, and execute the token swaps on your behalf.

## Production Considerations for Token Swap Agents

When deploying token swap agents in production environments, consider using smart wallets to:

### Enhance Security with Programmable Permissions

- Limit fund amounts for transactions
- Restrict contract interactions to trusted protocols
- Define required signatures for high-value transactions

### Maintain Regulatory Compliance with Non-Custodial Wallets

- Ensure agent platforms never have access to users' wallets
- Avoid money transmitter license requirements
- Improve user trust and control

### Celo-Specific Considerations

When implementing token swap functionality on Celo, keep these additional considerations in mind:

- **Gas Fees**: Celo uses CELO as gas for transactions, so ensure your wallet has sufficient CELO.
- **Liquidity Sources**: Consider using Celo-specific DEXes like Ubeswap or Uniswap.
- **Stable Tokens**: Celo offers several stable tokens (cUSD, cEUR, cREAL) that might be useful for your swap use cases.

## Conclusion

By following this guide, you've learned how to create an AI-powered token swap agent on Celo using GOAT SDK. This agent can understand natural language commands and execute token swaps on your behalf, providing a seamless bridge between AI and blockchain functionality.

As Celo continues to grow as an ecosystem, these types of AI agents can significantly improve user experience by abstracting away the complexities of interacting with DeFi protocols and token swaps, making blockchain technology more accessible to everyone.
