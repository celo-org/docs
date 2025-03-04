## Tutorial: Build an AI Agent to Send Tokens on Celo

This tutorial will guide you through creating an AI-powered agent capable of sending tokens on the Celo blockchain. We will adapt the provided code, which demonstrates sending tokens on the Sepolia test network, to function seamlessly on Celo. This will allow you to build an interactive agent that can send both native CELO and ERC20 tokens based on natural language prompts.

We will utilize `@ai-sdk/openai` for AI capabilities, `viem` for blockchain interaction, and `@goat-sdk` to simplify the development of our on-chain agent. We will be using `@goat-sdk/wallet-evm` for sending native tokens and `@goat-sdk/plugin-erc20` for handling ERC20 tokens.

### Understanding the Code: AI Agent for Sending Tokens

Let's dissect the provided code, which forms the foundation for our token sending agent.

**1. Importing Libraries:**

```javascript
import readline from "node:readline";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

import { http } from "viem";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains"; // We will change 'baseSepolia' to 'celo'

import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";
import { PEPE, USDC, erc20 } from "@goat-sdk/plugin-erc20";

import { sendETH } from "@goat-sdk/wallet-evm"; // We will adapt sendETH for CELO
import { viem } from "@goat-sdk/wallet-viem";

require("dotenv").config();
```

- **Libraries:** The imports are similar to previous examples, including `readline`, `@ai-sdk/openai`, `ai`, `viem`, and `@goat-sdk`.
- **Chain Import:** `baseSepolia` is imported from `viem/chains`, which we will replace with `celo` to target the Celo network.
- **Token Imports:** `PEPE` and `USDC` are imported from `@goat-sdk/plugin-erc20`. We will need to ensure these or similar tokens are relevant and available on Celo, or configure for other ERC20 tokens on Celo.
- **`sendETH` Import:** `sendETH` from `@goat-sdk/wallet-evm` is imported to enable sending native tokens. We will adapt this to send CELO.

**2. Wallet Client Creation:**

```javascript
// 1. Create a wallet client
const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);

const walletClient = createWalletClient({
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chain: baseSepolia, // We will change 'baseSepolia' to 'celo'
});
```

- **Wallet Client Setup:** This section sets up a `viem` wallet client, retrieving the private key from the `WALLET_PRIVATE_KEY` environment variable and connecting to the blockchain using the `RPC_PROVIDER_URL`. We will modify `chain` to `celo` for Celo.

**3. Getting On-Chain Tools (Token Sending Focus):**

```javascript
// 2. Get your onchain tools for your wallet
const tools = await getOnChainTools({
  wallet: viem(walletClient),
  plugins: [
    sendETH(), // Enable ETH transfers - Adapt for CELO
    erc20({ tokens: [USDC, PEPE] }), // Enable ERC20 token operations - Review for Celo tokens
  ],
});
```

- **On-Chain Tools for Token Sending:** This section configures the tools for sending tokens:
  - `sendETH()`: Enables sending native ETH on Sepolia. We will adapt this to send native CELO on Celo.
  - `erc20({ tokens: [USDC, PEPE] })`: Enables ERC20 token operations for USDC and PEPE. We will need to review and potentially replace these tokens with relevant ERC20 tokens on Celo.

**4. Command Line Interface and AI Interaction Loop:**

```javascript
// 3. Create a readline interface to interact with the agent
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
})();
```

- **Interactive Loop:** This section sets up the command-line interface and the AI interaction loop, identical to previous examples, using `generateText` to process prompts and interact with the configured tools.

### Setup Guide for Celo Token Sending Agent

Follow these steps to set up the AI-powered token sending agent on Celo:

**1. Clone Repository and Navigate to Example Directory:**

Follow steps 1-5 from the NFT minting tutorial (or previous tutorials) to clone the GOAT repository, navigate to the `typescript` directory, install dependencies, build the project, and go to the example directory: `examples/by-use-case/evm-mint-nft`. You can reuse this directory or create a new one if you prefer.

**2. Configure Environment Variables:**

```bash
cp .env.template .env
```

Copy `.env.template` to `.env` and populate the following environment variables in the `.env` file:

- **`OPENAI_API_KEY`**: Your OpenAI API key from [OpenAI](https://www.google.com/url?sa=E&source=gmail&q=https://platform.openai.com/).
- **`WALLET_PRIVATE_KEY`**: Your private key for the wallet that will send tokens on Celo. **Security Best Practices:** Use a test wallet and handle private keys with extreme caution.
- **`RPC_PROVIDER_URL`**: The RPC URL for the Celo network. Use a Celo Alfajores Testnet RPC URL for testing (e.g., `https://alfajores-forno.celo-testnet.org`). Refer to previous articles for more Celo RPC options.

**Example `.env` file (for Celo Alfajores Testnet):**

```
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
WALLET_PRIVATE_KEY=YOUR_PRIVATE_KEY
RPC_PROVIDER_URL=[https://alfajores-forno.celo-testnet.org](https://alfajores-forno.celo-testnet.org)
```

**Note:** We only need `OPENAI_API_KEY`, `WALLET_PRIVATE_KEY`, and `RPC_PROVIDER_URL` for this token sending agent.

**3. Adapt Code for Celo Token Sending:**

1.  **Chain Configuration:** In `index.ts`, replace `baseSepolia` with `celo` from `viem/chains`:

    ```javascript
    import { celo } from "viem/chains"; // Import Celo chain

    // ...

    const walletClient = createWalletClient({
      account: account,
      transport: http(process.env.RPC_PROVIDER_URL),
      chain: celo, // Use Celo chain configuration
    });
    ```

2.  **Adapt `sendETH()` to `sendCELO()`:** The `@goat-sdk/wallet-evm` might have a function specifically for sending CELO. Check the `@goat-sdk` documentation for `sendCELO()`. If it exists, replace `sendETH()` with `sendCELO()` in the `plugins` array:

    ```javascript
    plugins: [
      sendCELO(), // Enable CELO transfers (if available in @goat-sdk)
      erc20({ tokens: [USDC, PEPE] }), // ERC20 token operations - Review tokens for Celo
      // ...
    ];
    ```

    If `sendCELO()` is not directly available in `@goat-sdk/wallet-evm`, it's likely that `sendETH()` is designed to be chain-aware and will send the native token of the configured chain (`celo` in this case). In that case, you might not need to change `sendETH()`. **Test sending CELO after setup to confirm if `sendETH()` works for CELO or if you need to find an alternative.** If `sendETH()` does not work for CELO, you might need to create a custom tool using `viem`'s `sendTransaction` function to send CELO directly.

3.  **Review ERC20 Tokens for Celo:** `USDC` and `PEPE` might not be ideal for Celo. Research popular ERC20 tokens on Celo Alfajores Testnet or Celo Mainnet (e.g., `cUSD`, `cEUR`, `USDT`, `DAI` on Celo). Update the `erc20` plugin configuration with relevant tokens:

    ```javascript
    erc20({ tokens: [cUSD, cEUR, USDT] }), // Example: Use cUSD, cEUR, USDT if relevant on Celo
    ```

    You might need to define or import configurations for `cUSD`, `cEUR`, `USDT` similar to `USDC` and `PEPE`, potentially using their token contract addresses on Celo. For a more generic approach, you can remove the `tokens` array to allow the agent to handle any ERC20 token specified by symbol or address in the prompt.

**4. Usage Instructions:**

1.  **Run the Interactive CLI:**

    From the `examples/by-use-case/evm-mint-nft` directory (or your chosen directory), run:

    ```bash
    pnpm ts-node index.ts
    ```

2.  **Chat with the Agent for Token Sending:**

    Interact with the agent using natural language prompts to send tokens. Here are example prompts:

    - **Send CELO:**
      - `"Send 1 CELO to 0xRecipientAddressHere"` (Replace `0xRecipientAddressHere` with a Celo address)
      - `"Transfer 0.5 CELO to my friend at 0xFriendAddress"`
    - **Send ERC20 Tokens (e.g., cUSD, cEUR, USDT - adjust based on your configuration):**
      - `"Send 10 cUSD to 0xRecipientAddress"` (Assuming `cUSD` is configured)
      - `"Transfer 5 EURC to address 0xAnotherAddress"` (Assuming `cEUR` is configured)
      - `"Send 2 USDT to 0xYetAnotherAddress"` (Assuming `USDT` is configured)

**Example Interaction:**

```
Enter your prompt (or "exit" to quit): Send 0.1 CELO to 0xRecipientAddressHere
-------------------
TOOLS CALLED
-------------------
// Output of tool calls will be logged here (from onStepFinish callback) - will show details of the sendETH/sendCELO tool execution.
-------------------
RESPONSE
-------------------
// AI agent's response based on the prompt and tool execution - will confirm the token sending action or indicate success/failure.
-------------------
Enter your prompt (or "exit" to quit): exit
```

### Conclusion

This tutorial has guided you through building an AI-powered agent capable of sending tokens on the Celo blockchain. By adapting the provided code, configuring for Celo, and utilizing the `@goat-sdk/wallet-evm` and `@goat-sdk/plugin-erc20` tools, you can create an interactive agent that can understand natural language prompts to send both native CELO and ERC20 tokens. Remember to test thoroughly on the Celo Alfajores Testnet before using on Mainnet and always handle private keys securely. Explore the `@goat-sdk` documentation to understand more advanced configurations and error handling for your token sending agent on Celo\!

```

Let me know if you have any more questions or require further assistance!
```
