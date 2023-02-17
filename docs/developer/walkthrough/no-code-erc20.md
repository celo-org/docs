---
title: Deploy & Mint a Token
description: How to deploy an ERC20 token contract to Celo.
---

# Deploy an ERC20 token to Celo

How to deploy a token contract that use the ERC20 token standard to Celo without writing code.

---

## Getting Started

In this tutorial, we will go over how to deploy an ERC20 token contract. The process is very similar for deploying other tokens as well.

1. Install [Metamask](https://metamask.io/).
2. [Add the Celo network](/wallet/metamask/setup#adding-a-celo-network-to-metamask) to Metamask. We suggest adding the Alfajores testnet to Metamask as well, so you can test contract deployments before deploying to mainnet.
3. Add a small amount of CELO to your Metamask account. In this example, we will deploy to the Alfajores testnet, so we need Alfajores CELO, which you can get from the faucet [here](https://faucet.celo.org).
4. Go to the [Open Zeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/4.x/wizard).
5. Select `ERC20` as the type of contract that you would like to deploy.

![erc20 empty settings.png](https://github.com/critesjosh/images/blob/main/token_deploy_tutorials/erc20%20empty%20settings.png?raw=true)

6. Name your token. We are calling our token “ProsperityToken” in this example.
7. Select the features for your token. We are making ProsperityToken mintable, burnable and enabling snapshots, so the token may be used for governance. We are also making the contract Ownable, so the deployer of the contract can mint new tokens and distribute them as desired. Ideally, the owner account will be a multi-signature contract, so no single person has control over this token contract.
   If you want the block explorer to recognize your token then leave "Upgradeability" unchecked and do not select one of the two radio options below it. Selecting one of these options will prevent the [Celo block explorer](https://explorer.celo.org/) from recognizing your deployed contract as a token. If you want upgradability and do not care about the block explorer, feel free to make your token contract upgradable.

![erc20 filled settings.png](https://github.com/critesjosh/images/blob/main/token_deploy_tutorials/erc20%20filled%20settings.png?raw=true)

8. Open your contract in Remix by clicking “Open in Remix”. Remix will pop open with the contract code already filled in.
9. Click the big blue button that says “Compile contract-xxxxx.sol”. The contract should compile without error.

![remix compile erc20.png](https://github.com/critesjosh/images/blob/main/token_deploy_tutorials/remix%20compile%20erc20.png?raw=true)

10. Click the Ethereum logo in the left sidebar. This will bring up a new interface for deploying the contract.

![remix deploy erc20.png](https://github.com/critesjosh/images/blob/main/token_deploy_tutorials/remix%20deploy%20erc20.png?raw=true)

11. In the “Environment” section on the top left, select “Injected Web3”. This will connect Remix to Metamask. Now clicking the “deploy” button will deploy the contracts to whichever network Metamask is connected to. You should see a small textbox indicating that Remix is connected to a custom network. The Alfajores network id is 44787.

![select injected web3.png](https://github.com/critesjosh/images/blob/main/token_deploy_tutorials/select%20injected%20web3.png?raw=true)

12. In the Contract dropdown, select the contract that you want to deploy. In this example, it is called ProsperityToken.

![select prosperitytoken erc20 contract.png](https://github.com/critesjosh/images/blob/main/token_deploy_tutorials/select%20prosperitytoken%20erc20%20contract.png?raw=true)

13. Click Deploy. Metamask should pop open.

![deploy prosperity token erc20.png](https://github.com/critesjosh/images/blob/main/token_deploy_tutorials/deploy%20prosperity%20token%20erc20.png?raw=true)

14. Click Confirm. Once the transaction confirms (less than 5 seconds), a contract interface will appear in the bottom left, and transaction details will appear in the console at the bottom.

![deployed prosperity token.png](https://github.com/critesjosh/images/blob/main/token_deploy_tutorials/deployed%20prosperity%20token.png?raw=true)

That’s it! We now have ProsperityToken deployed on Alfajores with the Metamask account as the contract owner.

You can see the contract information on the [Alfajores block explorer](https://alfajores-blockscout.celo-testnet.org/). Copy and paste the contract address or deployment transaction hash from the console output and paste it into the block explorer search bar or look up the deployment transaction info in the Metamask activity.

## Deploying your token on the Mainnet

When you're ready to deploy your token to the Celo Mainnet make sure to change the network of your connected wallet from Alfajores to the Celo Mainnet. Once you have done this you can simply redeploy the contract (you will not need to recompile it).

Note: When deploying to the Mainnet you will need to use real Celo to pay the gas fee (as opposed to using the faucet on the testnet). As of December 2021 this cost is less than $0.01 US. You can learn how to [get Celo here](https://celo.org/buy).

You can read about how to add your new token to the Celo Wallet [here](/blog/add-token-celo-wallet).

## Verify

If you are unable to view your token on the block explorer, you may need to Verify it first. If you are able to see your token, you may skip this section.

Verifying your contract with Remix is straight-forward and allows anyone to read and interact with the contract on the block explorer. You can read more about verifying a contract with Remix on [this page](/developer/deploy/remix#verify-the-smart-contract).

You can find my example contract [here](https://alfajores-blockscout.celo-testnet.org/address/0x97d550A2540F902F4501e21A6c09f12B69173261/transactions).

Let me know what you end up building and reach out if you have any questions, [@critesjosh\_](https://twitter.com/critesjosh_) on Twitter or joshc#0001 on Discord. Join the Celo discord at https://chat.celo.org.
