---
title: Building a Conversational AI Agent for Celo Transactions with GOAT
description: This tutorial guides you through creating a Node.js application using TypeScript that leverages the GOAT AI agent framework to interact with the Celo blockchain.

authors:
  - name: Viral Sangani
    title: DevRel, Celo Foundation
    url: https://github.com/viral-sangani
    image_url: https://avatars.githubusercontent.com/u/36530381?v=4
tags: ["beginner", "ai", "celo"]
hide_table_of_contents: false
slug: /tutorials/building-a-conversational-ai-agent-for-celo-transactions-with-goat
---

## 🌱 Introduction

This tutorial guides you through creating a Node.js application using TypeScript that leverages the GOAT AI agent framework to interact with the Celo blockchain. GOAT allows you to use natural language prompts to perform on-chain actions, such as transferring tokens and checking allowances. We'll cover setup, configuration, code explanation, and common usage scenarios.

## Prerequisites

Before you begin, ensure you have the following:

- **Node.js (v16 or higher) and npm (or yarn) installed.** You can download Node.js from [https://nodejs.org/](https://nodejs.org/).
- **A Celo wallet with a private key.** You'll need a wallet with some CELO and cUSD for testing. _Never commit your private key to version control._
- **An RPC provider URL for the Celo network.** We'll use [Forno](https://forno.celo.org/) in this example, which is a public provider. For production, consider using a dedicated RPC provider like [Ankr](https://www.ankr.com/), [QuickNode](https://www.quicknode.com/), or others.
- **An OpenAI API key.** GOAT utilizes OpenAI's language models. Obtain an API key from [https://platform.openai.com/](https://platform.openai.com/).
- **A code editor or IDE.** VS Code, Sublime Text, or any other code editor will work.

## Project Setup

1.  **Create a new project directory:**

    ```bash
    mkdir goat-celo-tutorial
    cd goat-celo-tutorial
    ```

2.  **Initialize a Node.js project:**

    ```bash
    npm init -y
    ```

3.  **Install dependencies:**

    ```bash
    npm install typescript @ai-sdk/openai @goat-sdk/adapter-vercel-ai @goat-sdk/plugin-erc20 @goat-sdk/wallet-viem ai dotenv viem @types/node
    ```

    - `typescript`: For using TypeScript.
    - `@ai-sdk/openai`: The OpenAI adapter for AI-SDK.
    - `@goat-sdk/adapter-vercel-ai`: GOAT's adapter for using AI-SDK.
    - `@goat-sdk/plugin-erc20`: GOAT plugin for interacting with ERC-20 tokens.
    - `@goat-sdk/wallet-viem`: GOAT's wallet integration using Viem.
    - `ai`: The core AI-SDK library.
    - `dotenv`: For loading environment variables from a `.env` file.
    - `viem`: A lightweight Ethereum library for interacting with the blockchain.
    - `@types/node`: TypeScript definitions for Node.js.

4.  **Initialize TypeScript configuration:**

    ```bash
    npx tsc --init
    ```

5.  **Configure `tsconfig.json`:**

    Open `tsconfig.json` and update it with the following settings (adjusting paths as needed):

    ```json
    {
      "compilerOptions": {
        "target": "ES2020", // Or a later version if supported by your environment
        "module": "commonjs",
        "lib": ["ESNext"],
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "skipLibCheck": true,
        "outDir": "./dist", // Output directory for compiled JavaScript
        "rootDir": "./src", // Source directory for TypeScript files
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "sourceMap": true
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules"]
    }
    ```

    - `outDir`: Specifies where the compiled JavaScript files will be placed.
    - `rootDir`: Specifies the root directory for your TypeScript source files.
    - `sourceMap`: Enables source map generation, helpful for debugging.
    - `resolveJsonModule`: allows importing JSON files
    - `moduleResolution`: Specifies how modules are resolved. "node" is standard for Node.js projects.

## Project Structure

Organize your project files as follows:

```text
goat-celo-tutorial/
├── src/
│   ├── index.ts       <- Main application file
│   └── tokens.ts       <- Definitions for Celo tokens
├── .env              <- Environment variables (KEEP THIS PRIVATE)
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Code Implementation

### 1. `src/tokens.ts`:

This file defines the Celo tokens we'll be interacting with (CELO, cUSD, and USDC).

```typescript
// src/tokens.ts
import { Token } from "@goat-sdk/plugin-erc20";

export const tokens: Token[] = [
  {
    decimals: 6,
    symbol: "USDC",
    name: "USD Coin",
    chains: {
      "42220": {
        contractAddress: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
      },
    },
  },
  {
    decimals: 18,
    symbol: "CELO",
    name: "Celo",
    chains: {
      "42220": {
        contractAddress: "0x471EcE3750Da237f93B8E339c536989b8978a438",
      },
    },
  },
  {
    decimals: 18,
    symbol: "cUSD",
    name: "Celo Dollar",
    chains: {
      "42220": {
        contractAddress: "0x765de816845861e75a25fca122bb6898b8b1282a",
      },
    },
  },
];
```

### 2. `src/index.ts`:

This is the main application file where we set up GOAT, the wallet, and the interactive prompt.

```typescript
// src/index.ts
import { openai } from "@ai-sdk/openai";
import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { erc20 } from "@goat-sdk/plugin-erc20";
import { viem } from "@goat-sdk/wallet-viem";
import { generateText } from "ai";
import dotenv from "dotenv";
import readline from "node:readline";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celo } from "viem/chains";
import { tokens } from "./tokens";

dotenv.config();

// --- Wallet Setup ---
const account = privateKeyToAccount(
  process.env.WALLET_PRIVATE_KEY as `0x${string}`,
);

const walletClient = createWalletClient({
  account: account,
  transport: http(process.env.RPC_PROVIDER_URL),
  chain: celo,
});

(async () => {
  // --- GOAT Setup ---
  const tools = await getOnChainTools({
    wallet: viem(walletClient),
    plugins: [erc20({ tokens })],
  });

  // --- Interactive Prompt ---
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const prompt = await new Promise<string>((resolve) => {
      rl.question('Enter your prompt (or "exit" to quit): ', resolve);
    });

    if (prompt === "exit") {
      rl.close();
      break;
    }

    try {
      const result = await generateText({
        model: openai("gpt-4o"), // Use "gpt-4o" for better performance, or another model
        tools: tools,
        maxSteps: 10, // Maximum number of tool invocations per request
        prompt: prompt,
        onStepFinish: (event) => {
          console.log(event.toolResults); // Log the results of each tool invocation
        },
      });
      console.log(result.text);
    } catch (error) {
      console.error("An error occurred:", error); // Improved error handling
    }
    console.log("\n-------------------\n");
  }
})();
```

### 3. `.env`

Create a `.env` file in the root of your project and add the following, replacing the placeholders with your actual values:

```bash
WALLET_PRIVATE_KEY=your_wallet_private_key
RPC_PROVIDER_URL=https://forno.celo.org  # Or your preferred provider
OPENAI_API_KEY=your_openai_api_key
```

Important Security Note: Never commit your `.env` file or your private key to version control (e.g., Git). Add `.env` to your `.gitignore` file.

## Running the Application

Compile the TypeScript code:

```bash
pnpm dev
```

The application will start, and you'll see the prompt: `Enter your prompt (or "exit" to quit):`. You can now enter natural language commands.

## Example Prompts and Explanations

Here are some example prompts you can use and explanations of what's happening:

- "Transfer 1 cUSD to 0x13F6b54c5491cd4745fF4cFfaA9EfEe59E628657"

  - GOAT uses the `get_address` tool (implicitly, you don't need to specify it).
  - It then uses `get_token_info_by_symbol` to find the cUSD token details.
  - `convert_to_base_unit` converts 1 cUSD to its base unit (1 \* 10^18).
  - Finally, the `transfer` tool is called with the token address, recipient, and amount.
  - The transaction hash is returned.

- "What is my allowance on USDC?"

  - `get_address` is called to get the user's address.
  - `get_token_info_by_symbol` finds the USDC token.
  - `get_chain` is used to get the current chain
  - `get_token_allowance` is called to check the allowance of your address to spend USDC. The spender, in this case, is also your address, so you get 0. This is by design.
  - The allowance amount is returned.

- "Approve 0x13F6b54c5491cd4745fF4cFfaA9EfEe59E628657 to spend 10 USDC on my behalf"

  - This prompt would use the `approve` tool from the ERC-20 plugin. You'd see similar steps to the transfer, but instead of transferring, it would set an allowance for the specified address to spend your USDC.

- "What is my CELO balance?"

  - `get_address` will be used to get the current user address.
  - `get_token_info_by_symbol` finds the CELO token.
  - `get_balance` is used to get the current address balance.
  - The balance amount is returned.

## Troubleshooting

- `TypeError: Cannot read properties of undefined (reading 'call')` or similar errors: Double-check your `tsconfig.json` settings, particularly `module`, `target`, and `lib`. Make sure your Node.js version is compatible. Reinstall your dependencies (`rm -rf node_modules && npm install`).

- `Error: Invalid ABI`: Ensure your contract addresses in `tokens.ts` are correct for the Celo network (chain ID 42220).

- OpenAI API errors (e.g., 401 Unauthorized): Verify your `OPENAI_API_KEY` is correct and that your OpenAI account has sufficient credits.

- Transaction failures:

  - Check that your wallet has enough CELO to pay for gas.
  - Verify your `RPC_PROVIDER_URL` is correct and functioning.
  - If you're using a custom RPC provider, ensure it supports the necessary methods.

- Type errors after installation: If you encounter persistent type errors, you can try adding `// @ts-ignore` comments above the lines causing issues as a temporary workaround. However, it's best to resolve the underlying type issues if possible. The provided code avoids this, but it's a useful debugging technique.

## Conclusion

This tutorial demonstrated how to build a Celo blockchain AI agent with GOAT, Node.js, and TypeScript. You've learned to set up a project, integrate a wallet, define tokens, and use natural language to execute on-chain actions. This provides a foundation for creating powerful, user-friendly Web3 applications that simplify complex blockchain interactions. Remember to prioritize security and continue exploring the possibilities!

## Next Steps

- Explore more examples and documentation for GOAT and the ERC-20 plugin and ERC-721 plugin.
- Build a more complex application using GOAT and other Celo tools.
- Contribute to the GOAT project and provide feedback.
