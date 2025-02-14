---
title: Building an App with Thirdweb
---

Create and deploy your own Web3 app effortlessly with Thirdweb and Celo. 🚀

## Objectives

By the end of this tutorial, you will:  

* Have a set of **NFT Drops**.
* Build an **NFT gallery** with **`Thirdweb`** and **`Celo`**.

## Prerequisites

* Node (v20 or higher)
* A wallet with some test tokens (more on this later)

## Fund Your Wallet  

1. Ensure you have sufficient funds to cover the transaction fees.  
2. Visit the [Alfajores Faucet](https://faucet.celo.org/alfajores) to claim test tokens using your wallet address. ***Remember to claim only what you need.***

## Create a Contract on Thirdweb  

1. Visit [Thirdweb](https://thirdweb.com/login) and log in or create a new account.  
2. Navigate to **`Contracts`** and click **`Deploy Contract`**.  
3. Since multiple smart contracts have already been audited, we don’t need to write them from scratch.  
4. Select **`NFT Drop`** and click **`Deploy`**.  
5. Configure your token by setting its **Name** (mandatory), **Symbol**, and optionally adding an **Image** and **Description**.  
6. In the **Deploy Options** section, choose **`Celo Alfajores`** as the Chain (if not selected by default).  
7. Click **`Deploy Now`** to finalize the process.  
8. After deployment, you’ll be redirected to the dashboard to upload your NFTs.  
9. Provide a **name**, upload an **image**, add a **description**, and define **traits** for your NFT.  
10. **Lazy Mint** your NFT.  
11. Repeat steps 9 and 10 a few times—we need at least **3 NFTs**.  
12. Copy your **`contract address`** from the NFT dashboard.  

## Get a Thirdweb Client ID  

1. Open the **Thirdweb Dashboard** and click **`Add New`** in the **Projects** section.  
2. Select **`Project`** from the dropdown menu.  
3. Enter a **project name** and add **`localhost:5173`** under **`Allowed Domains`**. Click **`Create`**.  
4. A **`Client ID`** and **`Secret ID`** will be generated. Copy both to a secure location—we’ll only need the **`Client ID`**.  

## Clone the Thirdweb Celo NFT Repository  

1. Clone the repository: 
 
   ```sh
   git clone https://github.com/atejada/thirdweb-celo-nft
   cd celo-token-agent
   ```
2. Install dependencies:


	```sh
	npm install
	```
3. Create a .env file with the following content:


	```sh
	VITE_CLIENTID=your_thirdweb_client_id
	VITE_ADDRESS=your_nft_contract_address
	```	
	
4. Run the project:


	```sh
   npm run dev
	```
	
Once the project is running, you’ll see the first NFT displayed along with a dropdown menu. You can select any other NFT from your collection to view its image, name, and description.

## Join Build with Celo - Proof of Ship

1. Create your application using an audited contract on Thirdweb.
2. Check the Github repo [Proof-of-Ship](https://github.com/celo-org/Proof-of-Ship?tab=readme-ov-file).
3. Sign up to join [Build with Celo - Proof of Ship](https://celo.lemonade.social/e/4JkhOXcD).
4. You can win up to **`5k cUSD`**.
5. Build with **`Celo`**.
