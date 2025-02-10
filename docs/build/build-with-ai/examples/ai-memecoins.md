---
title: Launching Tokens on Celo using Gaia AI Agent Framework
---

## Prerequisites

- Node (v20 or higher)
- A wallet with some test tokens (more on this later)

## Create a Wallet and get your Gaia API Keys

1. Visit the [Gaia Homepage](https://www.gaianet.ai/) and click **`Launch App`**.  
2. Click **`Connect`**, then install the [MetaMask](https://metamask.io/download/) extension.  
3. Once installed, create your wallet and securely store your recovery keys.  
4. Finally, navigate to [Gaia API Keys](https://www.gaianet.ai/setting/gaia-api-keys) to generate your API keys.

## Create you Celo Private Key

1. Install the [Celo CLI](npm install -g @celo/celocli)
2. Make sure you're working on Alfajores network 
```
celocli config:set --node https://alfajores-forno.celo-testnet.org/
```
3. Create an account and store it well formatted in an .env file 
```
celocli account:new | sed -E 's/: (.+)/="\1"/g' | grep '=' > .env`
source .env
```
4. Copy the account address to your clipboard
```
echo $accountAddress | pbcopy
```
5. Head to the faucet to get some money and paste your account address there
```
open https://faucet.celo.org
```
6. Verify you got money successfully
```
celocli account:balance $accountAddress
```
7. Register your account
```
celocli account:register --from $accountAddress -k $privateKey
```

If you open your **`.env`** file, you will find your **`Celo private key`**

## Clone the Celo Meme Token Generator

1. Clone this repository
```
git clone https://github.com/harishkotra/celo-token-agent
cd celo-token-agent
```
2. Install dependencies
```
npm install
```
3. Create a .env file:
```
PRIVATE_KEY=your_celo_private_key 
GAIA_API_KEY=your_gaia_api_keys
```
4. Compile the contract
```
npx hardhat compile
```
5. Deploy your token
```
node deploy.js
```

The script will

1. Generate a token name
2. Check your balance
3. Deploy the contract
4. Provide you with the contract address and transaction details

## Understanding the Code

The project uses three main components

1. Token Generation **`(tokenGenerator.js)`**
 - Generates creative token names
 - Uses AI with a fallback to random generation
 - Configures initial token supply
2. Contract Deployment **`(tokenDeployer.js)`**
 - Uses ContractKit to interact with Celo
 - Handles gas estimation and transaction monitoring
 - Provides deployment status updates
3. Smart Contract **`(tokenDeployer.js)`**
 - Standard ERC20 implementation
 - Built with OpenZeppelin for security
 - Deployable to Celo's Alfajores testnet
 
## Example response

```
Generated fallback token: { name: 'Mega Gem', symbol: 'MG' }
Reading artifacts from: /Users/blag/Documents/GitHub/celo-token-agent/artifacts/contracts/MemeToken.sol/MemeToken.json
Deploying from account: 0x5A96d23F76440C099F22327D1324786f6abe459A
Account balance:
A-CELO: 1.08303052 A-CELO
Sending deployment transaction...
Transaction sent! Hash: 0x035457c46ef5118db065b0a2ccc6bae1ce62f1c8ef688bbaf2d2596a6dd0fbd8
Deployment confirmed in block: 38170881
Token deployed successfully!
{
  name: 'Mega Gem',
  symbol: 'MG',
  address: '0x5e473F7650ABD9B6A5b28b2B0B64ebBd1ef01D94',
  transactionHash: '0x035457c46ef5118db065b0a2ccc6bae1ce62f1c8ef688bbaf2d2596a6dd0fbd8',
  explorer: 'https://alfajores.celoscan.io/address/0x5e473F7650ABD9B6A5b28b2B0B64ebBd1ef01D94'
}
```

## Support

Join the [Celo Discord server](https://chat.celo.org). Reach out in the #general-dev channel with your questions and feedback.