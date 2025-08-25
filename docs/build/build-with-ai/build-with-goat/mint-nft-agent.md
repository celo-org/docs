---
title: Build an AI-Powered NFT Minting Agent on Celo
---

# Tutorial: Build an AI-Powered NFT Minting Agent on Celo

This tutorial guides you through building an AI-powered agent capable of minting NFTs on the Celo blockchain. We will adapt the structure from the previous [token swapping tutorial](./token-swap-agent.md) to create an agent that can mint NFTs based on natural language prompts.

This approach provides direct control over the minting process and utilizes core blockchain interaction libraries. We will use `@ai-sdk/openai` for AI capabilities, `viem` for direct blockchain interaction, and `@goat-sdk` for agent framework components.

### Understanding the Code: AI Agent for NFT Minting (Direct Contract Interaction)

Let's examine the code structure, building upon the token swapping agent example and focusing on NFT minting.

#### 1. Importing Libraries:

```javascript
import readline from "node:readline";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

import { http } from "viem";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celo } from "viem/chains"; // Using Celo chain

import { getOnChainTools } from "@goat-sdk/adapter-vercel-ai";

import { viem } from "@goat-sdk/wallet-viem";

require("dotenv").config();
```

- **Libraries**: We use the core libraries: readline, @ai-sdk/openai, ai, viem, and @goat-sdk.
- **Chain Import**: We directly import celo from viem/chains to configure for the Celo network.
- **Focused Approach**: We are focusing solely on NFT minting in this version with a generic mintNFT tool.

#### 2. Wallet Client Creation:

```javascript
// 1. Create a wallet client
const account = privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as `0x${string}`);

const walletClient = createWalletClient({
    account: account,
    transport: http(process.env.RPC_PROVIDER_URL),
    chain: celo, // Using Celo chain
});
```

- **Wallet Client**: This section sets up a viem wallet client connected to the Celo network.

#### 3. Getting On-Chain Tools (NFT Minting Focus):

```javascript
// 2. Get your onchain tools for your wallet
const tools = await getOnChainTools({
  wallet: viem(walletClient),
  plugins: [
    // We define a custom mintNFT tool here
    {
      name: "mintNFT",
      description:
        "Use this tool to mint an NFT to a specified address. Input should be the recipient address and (optionally) NFT metadata.",
      async execute({ recipientAddress, metadata }) {
        // Implementation for minting NFT will be added here using viem
        // This is a placeholder - actual minting logic needs to be implemented
        console.log(
          `Minting NFT to address: ${recipientAddress} with metadata:`,
          metadata,
        );
        return "NFT minting initiated (placeholder - not actually minted). Implement actual minting logic in the execute function.";
      },
    },
  ],
});
```

- **On-Chain Tools for NFT Minting**: We define a custom mintNFT tool directly within the plugins array.
  - **name: "mintNFT"**: The name of the tool, which the AI agent will use to identify and call it.
  - **description**: A crucial description that tells the AI agent when and how to use this tool. It specifies that the tool is for minting NFTs and expects recipientAddress and optional metadata as input.
  - **execute(recipientAddress, metadata)**: This is the function that will be executed when the AI agent decides to use the mintNFT tool.
  - **Placeholder Implementation**: Currently, the execute function is a placeholder. It logs a message indicating that NFT minting is initiated but does not contain actual minting logic.
  - **Implementation using viem** (To be added - see "Implementing the mintNFT Tool" section below): The actual implementation of NFT minting within this execute function will involve using viem to interact with an NFT smart contract on Celo. This will include:
    - Connecting to the NFT Contract: Using viem to get an instance of your deployed NFT contract using its address and ABI.
    - Calling the Mint Function: Using viem to call the minting function of your NFT contract. This will likely involve sending a transaction from your walletClient and paying gas fees in CELO.
    - Handling NFT Metadata: If your NFT contract supports metadata, you'll need to incorporate the metadata input into the minting transaction.

#### 4. Command Line Interface and AI Interaction Loop:

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

- **Interactive Loop**: This provides the command-line interface and AI interaction using generateText.

### Setup Guide for Celo NFT Minting Agent

Follow these steps to set up the AI-powered NFT minting agent on Celo:

#### 1. Clone Repository and Navigate to Example Directory:

Follow steps 1-5 from the [previous tutorial](./token-swap-agent.md) to clone the GOAT repository, navigate to the typescript directory, install dependencies, build the project, and go to the example directory: examples/by-use-case/evm-mint-nft.

#### 2. Configure Environment Variables:

```bash
cp .env.template .env
```

Copy .env.template to .env and populate the following environment variables:

- **OPENAI_API_KEY**: Your OpenAI API key from OpenAI.
- **WALLET_PRIVATE_KEY**: Your private key for the wallet that will mint NFTs on Celo. Security Best Practices: Use a test wallet and handle private keys with extreme caution.
- **RPC_PROVIDER_URL**: The RPC URL for the Celo network (e.g., Celo Sepolia Testnet: https://forno.celo-sepolia.celo-testnet.org/). See previous articles for more Celo RPC options.

Example .env file (for Celo Sepolia Testnet):

```
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
WALLET_PRIVATE_KEY=YOUR_PRIVATE_KEY
RPC_PROVIDER_URL=https://forno.celo-sepolia.celo-testnet.org/
```

#### 3. Adapt Code for Celo and NFT Minting:

- **Chain Configuration**: In index.ts, ensure you have celo chain imported and configured in createWalletClient as shown in the code examples above.

- **Implement the mintNFT Tool's execute Function**: This is the crucial step to enable actual NFT minting. You need to replace the placeholder implementation in the mintNFT tool's execute function with the actual logic to interact with your NFT smart contract on Celo using viem.

**Implementing the mintNFT Tool's execute Function (Conceptual Steps):**

```javascript
// ... inside the plugins array in getOnChainTools:
{
    name: "mintNFT",
    description: "...",
    async execute({ recipientAddress, metadata }) {
        try {
            // 1. NFT Contract Address and ABI:
            const nftContractAddress = "YOUR_NFT_CONTRACT_ADDRESS"; // Replace with your NFT contract address on Celo
            const nftContractAbi = [...]; // Replace with your NFT contract ABI (interface)

            // 2. Get Contract Instance using viem:
            const nftContract = getContract({
                address: nftContractAddress,
                abi: nftContractAbi,
                publicClient: walletClient, // or use publicClient if you only need to read
            });

            // 3. Call the mint function (Adapt to your contract's mint function name and parameters):
            const mintTxHash = await walletClient.writeContract({
                address: nftContractAddress,
                abi: nftContractAbi,
                functionName: 'mint', // Replace with your contract's mint function name
                account: walletClient.account,
                args: [recipientAddress, metadata], // Adapt arguments based on your contract's mint function parameters
                gas: 2000000, // Adjust gas limit as needed
            });

            console.log("Mint Transaction Hash:", mintTxHash);
            return `NFT mint transaction initiated. Transaction hash: ${mintTxHash}. (Remember to check transaction status on a Celo block explorer.)`;


        } catch (error) {
            console.error("Error minting NFT:", error);
            return `NFT minting failed. Error: ${error.message}`;
        }
    },
}
```

**Explanation of mintNFT Tool Implementation:**

- **NFT Contract Address and ABI**:

  - **nftContractAddress**: You MUST replace "YOUR_NFT_CONTRACT_ADDRESS" with the actual address of your deployed NFT smart contract on the Celo network (Celo Sepolia testnet or Mainnet).
  - **nftContractAbi**: You MUST replace [...] with the ABI (Application Binary Interface) of your NFT smart contract. The ABI defines how to interact with your contract's functions. You can usually get the ABI from your smart contract compilation output (e.g., from Hardhat or Truffle).

- **getContract**: We use viem's getContract function to create a contract instance, allowing us to interact with your deployed NFT contract. We provide the address, abi, and publicClient (or walletClient if you need to send transactions).

- **walletClient.writeContract**: This is the core viem function to send a transaction to your smart contract to call the minting function.

  - **address**: NFT contract address.
  - **abi**: NFT contract ABI.
  - **functionName**: 'mint': Replace 'mint' with the actual name of your minting function in your NFT contract.
  - **account**: walletClient.account: Specifies the account (your wallet) that will send the transaction.
  - **args**: [recipientAddress, metadata]: Adapt args to match the parameters of your NFT contract's mint function. The example assumes your mint function takes a recipientAddress and metadata. You might need to adjust this based on your contract. Metadata handling will also depend on how your NFT contract stores or handles metadata (e.g., you might pass a URI, or metadata might be handled differently).
  - **gas**: 2000000: Sets a gas limit for the transaction. Adjust this value as needed based on your contract's gas requirements. You can estimate gas using viem functions or start with a generous limit and adjust down if needed.

- **Transaction Hash and Error Handling**: The code logs the transaction hash and returns a message. It also includes basic error handling.

**Important Considerations for mintNFT Implementation:**

- **NFT Contract Deployment**: You need to have a deployed NFT smart contract on Celo (Celo Sepolia testnet or Mainnet) to use this agent. You'll need the contract address and ABI.
- **NFT Contract mint Function**: Understand the exact function name, parameters, and any access control or requirements of your NFT contract's minting function.
- **Metadata Handling**: Determine how your NFT contract handles metadata. You might need to adjust the metadata parameter and how you pass it to the mint function.
- **Gas Fees**: Minting transactions require CELO to pay for gas fees. Ensure your wallet has sufficient CELO.
- **Error Handling**: Implement more robust error handling in the execute function to catch potential issues during contract interaction.
- **Security**: Be extremely cautious when dealing with smart contracts and blockchain transactions, especially in production. Thoroughly test your contract and agent in a test environment before deploying to mainnet.

#### 4. Usage Instructions:

**Run the Interactive CLI:**

From the examples/by-use-case/evm-mint-nft directory, run:

```bash
pnpm ts-node index.ts
```

**Chat with the Agent for NFT Minting:**

Interact with the agent using natural language prompts to mint NFTs. Here are example prompts:

- "Mint an NFT for address 0x1234...5678" - Instruct the agent to mint an NFT to the specified recipient address. (Replace 0x1234...5678 with an actual Celo address).
- "Mint an NFT with metadata `{'name': 'My NFT', 'description': 'A test NFT'}`" - Instruct the agent to mint an NFT with specific metadata. (The exact format of metadata and how it's handled will depend on your mintNFT tool implementation and NFT contract).

**Example Interaction:**

```
Enter your prompt (or "exit" to quit): Mint an NFT for address 0xRecipientAddressHere
-------------------
TOOLS CALLED
-------------------
// Output of tool calls will be logged here (from onStepFinish callback)
-------------------
RESPONSE
-------------------
// AI agent's response based on the prompt and tool execution
-------------------
Enter your prompt (or "exit" to quit): exit
```

### Conclusion

This tutorial has provided a guide to building an AI-powered NFT minting agent on Celo. By directly interacting with an NFT smart contract using viem, you gain more control over the minting process.

Remember that the provided mintNFT tool's execute function is a placeholder. You MUST implement the actual NFT minting logic using viem and your deployed NFT smart contract on Celo as described in the "Implementing the mintNFT Tool" section.

Thoroughly test your agent and smart contract in a test environment before deploying to the Celo mainnet. Explore the viem documentation and experiment with different prompts and metadata handling to create a powerful and user-friendly AI-driven NFT minting experience on Celo!
