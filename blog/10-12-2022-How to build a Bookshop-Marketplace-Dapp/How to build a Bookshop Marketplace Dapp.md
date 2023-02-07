---
title: How to build a Bookshop Marketplace Dapp on Celo Blockchain
description: Learn how to build a bookshop marketplace platform on celo blockchain
authors:
- name: Tevin Isaac
  title: Blockchain Developer, Dacade Evangelist
  url: https://github.com/Tevin-Isaac
  image_url: https://github.com/Tevin-Isaac.png
tags: [celosage,celowallet, celo, solidity, html, remix, smartcontract, intermediate]
hide_table_of_contents: false
slug: /tutorials/how-to-build-a-bookshop-marketplace-dapp
---

![header](../../src/data-tutorials/showcase/intermediate/how-to-build-a-bookshop-marketplace-dapp.png)

## Introduction​

Celo is a mobile-first blockchain that makes decentralized financial (DeFi) tools and services accessible to anyone with a mobile phone.

## Prerequisites​

Celo has a documentation for developers for you to install all the tools that you need to build on Celo. Here is the link: <https://docs.celo.org/developer>
Celo is similar to Ethereum. Both networks run the Ethereum Virtual Machine (EVM) to support smart contract functionality. This means that all programming languages, developer tooling and standards that target the EVM are relevant for both Celo and Ethereum.

## Requirements​

- Installations
- NPM from V12.or higher
- Node.js from  V10. or higher
- Solidity
- Celo contractkit

## Tutorial

Here is a preview of what we are about to create.
![1_zspF9bqV7Z4m0_MsdyNbGQ](https://user-images.githubusercontent.com/81568615/206859476-c5f8f03c-b471-4442-9d31-2566b9bd5aa5.gif)

## Step 1: Creating our Smart Contract

First we are going to build our smart contract and with this you will be required to have a bit of  knowledge of Solidity. To learn more about solidity contracts and the structures of a contract you can check out [this link](https://docs.soliditylang.org/en/v0.8.17/structure-of-a-contract.html).

We are also going to use Remix as our IDE. Remix is mainly used to write Solidity contracts for Ethereum but can also be used to write Solidity contracts for Celo. The Remix IDE is an open source tool that helps you write Solidity contracts in your browser.

Click [here](https://remix.ethereum.org/) to open your remix IDE.
![1_Cz8GoBKaBuW5va1_0EBtWA](https://user-images.githubusercontent.com/81568615/206859320-d9c490d3-5807-42b6-94f3-ab12702060b2.gif)

While the development of Celo on Remix is quite similar to Ethereum on Remix, there are some differences. The main difference is that you must use Celo or cUSD for transactions and gas prices instead of Ether. Additionally, you will deploy to the Celo blockchain and the Celo testnets, Alfajores, instead of the Ethereum Blockchain or its testnets. To do that, you will use a Celo plugin for Remix, where you can compile, test, and deploy Solidity contracts for Celo.

Next we are going to set up our solidity file on Remix. Create a file on solidity and let's name it marketplace.sol

Contracts in Solidity are similar to classes in object-oriented languages. Each contract can contain declarations of [State Variables](https://docs.soliditylang.org/en/v0.8.17/structure-of-a-contract.html#structure-state-variables), [Functions](https://docs.soliditylang.org/en/v0.8.17/structure-of-a-contract.html#structure-functions), [Function Modifiers](https://docs.soliditylang.org/en/v0.8.17/structure-of-a-contract.html#structure-function-modifiers), [Events](https://docs.soliditylang.org/en/v0.8.17/structure-of-a-contract.html#structure-events), [Errors](https://docs.soliditylang.org/en/v0.8.17/structure-of-a-contract.html#structure-errors), [Struct Types](https://docs.soliditylang.org/en/v0.8.17/structure-of-a-contract.html#structure-struct-types) and [Enum Types](https://docs.soliditylang.org/en/v0.8.17/structure-of-a-contract.html#structure-enum-types). Furthermore, contracts can inherit from other contracts.

Click [here](https://docs.soliditylang.org/en/v0.8.17/structure-of-a-contract.html#enum-types) to learn about the structure of a contract.

Our Overall `marketplace.sol` smart contract will look like this:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >= 0.7 .0 < 0.9 .0;
interface IERC20Token {
    function transfer(address, uint256) external returns(bool);

    function approve(address, uint256) external returns(bool);

    function transferFrom(address, address, uint256) external returns(bool);

    function totalSupply() external view returns(uint256);

    function balanceOf(address) external view returns(uint256);

    function allowance(address, address) external view returns(uint256);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * -- Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns(uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }
}
contract Marketplace {
    uint internal productsLength = 0;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    address public adminAddress;

    using SafeMath
    for uint;
    struct Product {
        address payable owner;
        string name;
        string image;
        string description;
        string location;
        uint price;
        uint sold;
        bool verified;
    }
    constructor() {
        adminAddress = msg.sender;
    }
    modifier isVerified(uint _index) {
        require(products[_index].verified == true, "this product is not verified");
        _;
    }
    modifier isAdmin() {
        require(msg.sender == adminAddress, "only callable by admin");
        _;
    }
    mapping(uint => Product) public products;

    function writeProduct(
        string memory _name,
        string memory _image,
        string memory _description,
        string memory _location,
        uint _price
    ) public {
        require(bytes(_image).length > 0, "Please enter a valid image URL");
        require(bytes(_description).length > 0, "Please enter a valid description");
        require(bytes(_name).length > 0, "Please enter a valid name");
        require(_price > 0, "enter a valid price");
        uint _sold = 0;
        bool _verified = false;
        products[productsLength] = Product(
            payable(msg.sender),
            _name,
            _image,
            _description,
            _location,
            _price,
            _sold,
            _verified
        );
        productsLength = productsLength.add(1);
    }

    function buyProduct(uint _index) public payable isVerified(_index) {
        require(products[_index].owner != address(0), "enter a valid product index");
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                products[_index].owner,
                products[_index].price
            ),
            "Transfer failed."
        );
        products[_index].sold = products[_index].sold.add(1);
    }

    function getProductsLength() public view returns(uint) {
        return (productsLength);
    }
    // admin can verify a product
    function verifyProduct(uint _index) public isAdmin {
        products[_index].verified = true;
    }

    function revokeOwnership(address _address) public isAdmin {
        adminAddress = _address;
    }
}
```

## Defining Our Smart Contract

In reference to the smart contract above let us define the meaning of each structure on the smart contract and what it means.

```solidty
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
```

In the first line, you specify the license the contract uses. Here is a comprehensive list of the available licenses <https://spdx.org/licenses/.So> remember the first line is always the license Identifier.

On the next structure of the smart contract it looks like this.

```solidty
interface IERC20Token {
    function transfer(address, uint256) external returns(bool);

    function approve(address, uint256) external returns(bool);

    function transferFrom(address, address, uint256) external returns(bool);

    function totalSupply() external view returns(uint256);

    function balanceOf(address) external view returns(uint256);

    function allowance(address, address) external view returns(uint256);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

## What is a Token?

Tokens can represent virtually anything in Ethereum:

- Reputation points in an online platform
- Skills of a character in a game
- Lottery tickets
- Financial assets like a share in a company
- A fiat currency like USD
- An ounce of gold
- and more…

Such a powerful feature of Ethereum must be handled by a robust standard, right? That’s exactly where the ERC-20 plays its role! This standard allows developers to build token applications that are interoperable with other products and services.

## What is ERC-20?

The ERC-20 introduces a standard for Fungible Tokens, in other words, they have a property that makes each Token be exactly the same (in type and value) as another Token. For example, an ERC-20 Token acts just like the ETH, meaning that 1 Token is and will always be equal to all the other Tokens.

## Prerequisites

- [Accounts](https://ethereum.org/en/developers/docs/accounts)
- [Smart Contracts](https://ethereum.org/en/developers/docs/smart-contracts/)
- [Token standards](https://ethereum.org/en/developers/docs/standards/tokens/)

The ERC-20 (Ethereum Request for Comments 20), proposed by Fabian Vogelsteller in November 2015, is a Token Standard that implements an API for tokens within Smart Contracts.

Example functionalities ERC-20 provides:

- Transfer tokens from one account to another
- Get the current token balance of an account
- Get the total supply of the token available on the network
- Approve whether an amount of token from an account can be spent by a third-party account

If a Smart Contract implements the following methods and events it can be called an ERC-20 Token Contract and, once deployed, it will be responsible to keep track of the created tokens on Ethereum.

## Interface

Interfaces are similar to abstract contracts and are created using interface keyword.

Characteristics of an interface.

- Interface can not have any function with implementation.
- Functions of an interface can be only of type external.
- Interface can not have constructor.
- Interface can not have state variables
- Interface can have enum, structs which can be accessed using interface name dot notation.

## Methods

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256_value) public returns (bool success)
function transferFrom(address _from, address_to, uint256_value) public returns (bool success)
function approve(address _spender, uint256_value) public returns (bool success)
function allowance(address _owner, address_spender) public view returns (uint256 remaining)
```

## Events

```solidity
event Transfer(address indexed _from, address indexed_to, uint256_value)
event Approval(address indexed _owner, address indexed_spender, uint256_value)
```

I hope you now have a basis of how an ERC20 token will always look like.

Next on our smart contract code is this line :

```solidity
library SafeMath {
    /** * @dev Returns the addition of two unsigned integers, reverting on * overflow. * * Counterpart to Solidity's `+` operator. * * Requirements: * * -- Addition cannot overflow. */
    function add(uint256 a, uint256 b) internal pure returns(uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }
}
```

The SafeMath library validates if an arithmetic operation would result in an integer overflow/underflow. If it would, the library throws an exception, effectively reverting the transaction.

Since Solidity 0.8, the overflow/underflow check is implemented on the language level — it adds the validation to the bytecode during compilation.

You don’t need the `SafeMath` library for Solidity 0.8+. You’re still free to use it in this version, it will just perform the same validation twice (one on the language level and one in the library)

And it’s strongly recommended to use it in 0.7, since the validation is not performed on the language level in this version yet.

So if you allow your contract to be compiled in both versions, you should include the library.

Next we will now define our contract name with this line.

```solidity
contract Marketplace {
    uint internal productsLength = 0;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    address public adminAddress;
    using SafeMath
    for uint;
    struct Product {
        address payable owner;
        string name;
        string image;
        string description;
        string location;
        uint price;
        uint sold;
        bool verified;
    }
```

You define your contract with the keyword contract and give it a name.

You need to specify the type of the variable on the contract.If in this case, it’s a string ([Learn more about types](https://docs.soliditylang.org/en/latest/types.html)). You can define the visibility of the variable with the keyword public because you want users to access it from outside the contract and use an automatically generated getter function ([Learn more about visibility](https://docs.soliditylang.org/en/latest/contracts.html#visibility-and-getters)). A good example is this line of code

```solidity
contract Marketplace { string public product = “Book”; }
```

You will enable your contract to make transactions via the Celo stablecoin cUSD, an ERC-20 token.

You need to know the address of the cUSD ERC-20 token on the Celo Alfajores test network so you can interact with it.

Here it is below.

<https://explorer.celo.org/alfajores/address/0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1/transactions>

## Structs

Structs are custom defined types that can group several variables (see [Structs](https://docs.soliditylang.org/en/v0.8.17/types.html#structs) in types section).

In Solidity, you use structs to define new types that can group variables. A struct behaves similar to an object in javascript ([Learn more about structs](https://docs.soliditylang.org/en/latest/types.html#structs)).

Next line we have a constructor

```solidity
constructor() { adminAddress = msg.sender; }
```

Constructor is a special function declared using `constructor` keyword. It is an optional function and is used to initialize state variables of a contract.

Characteristics of a constructor:

- A contract can have only one constructor.
- A constructor code is executed once when a contract is created and it is used to initialize contract state.
- After a constructor code executed, the final code is deployed to blockchain. This code include public functions and code reachable through public functions. Constructor code or any internal method used only by constructor are not included in final code.
- A constructor can be either public or internal.
- A internal constructor marks the contract as abstract.
- In case, no constructor is defined, a default constructor is present in the contract.

The `msg.sender` is the address that has called or initiated a function or created a transaction. Now, this address could be of a contract or even a person like you and me.

Next our in our line of code is this:

```
modifier isVerified(uint _index) {
    require(products[_index].verified == true, "this product is not verified");
    _;
}
modifier isAdmin() {
    require(msg.sender == adminAddress, "only callable by admin");
    _;
}
```

Function `modifiers` can be used to amend the semantics of functions in a declarative way (see [Function Modifiers](https://docs.soliditylang.org/en/v0.8.17/contracts.html#modifiers) in the contracts section).

Overloading, that is, having the same modifier name with different parameters, is not possible. Like functions, modifiers can not be [overridden](https://docs.soliditylang.org/en/v0.8.17/contracts.html#modifier-overriding).

Next we have mappings on our contract with this line of code:

```solidity
mapping (uint => Product) public products;
```

Mappings can map keys to values. You will get a collection of key-value pairs, so you can handle multiple products. You can access the value of the product through their key. ([Learn more about mappings](https://docs.soliditylang.org/en/latest/types.html#mappings)).

To create a mapping you use the keyword mapping and assign a key type to a value type. You will use an unsigned integer (non-negative), an uint as the key type for the index and a string type for the value, your product. You need to define the visibility, in this case, internal or public and a name for the mapping. You can call it public products.

Next we have this line of code

```solidity
function writeProduct(string memory _name, string memory _image, string memory _description, string memory _location, uint _price) public {
    require(bytes(_image).length > 0, "Please enter a valid image URL");
    require(bytes(_description).length > 0, "Please enter a valid description");
    require(bytes(_name).length > 0, "Please enter a valid name");
    require(_price > 0, "enter a valid price");
    uint _sold = 0;
    bool _verified = false;
    products[productsLength] = Product(payable(msg.sender), _name, _image, _description, _location, _price, _sold, _verified);
    productsLength = productsLength.add(1);
}
```

The first variable that you will store is of the type address. You can then add a payable modifier that allows your contract to send tokens to this address. This variable will be named owner because it’s the address of the user who submitted the product.

Next, create string variables for the `name`, `image`, `description` and `location` of the product and the uint type for price and sold, since they will never be negative.

When a user adds a new product to your marketplace contract, you set `_sold` to the value 0, because it tracks the number of times the product was sold. Of course, this is initially always zero, and therefore you don't need a parameter.

You have to specify the type of parameters of the function. In this case, it’s just a string. A string is technically a special type of array. For arrays, you have to annotate the location where it is stored. For public function parameters, use memory. ([Learn more about data location](https://docs.soliditylang.org/en/latest/types.html?highlight=memory#data-location)) Don’t worry about the data location for now.

In computing, the term endianness corresponds to how bytes are ordered (and stored) in a computer or any machine. Therefore, it defines the internal ordering of the memory.

We refer to `multi-byte` data types as type of data (`uint`, `float`, `string`, etc…). There are two ways for ordering `multi-byte` data types in computer: in `little-endian` or `big-endian` format (where format = order).

Bytes: <https://jeancvllr.medium.com/solidity-tutorial-all-about-bytes-9d88fdb22676>

Next we have this line of code

```solidity
function buyProduct(uint _index) public payable isVerified(_index) {
    require(products[_index].owner != address(0), "enter a valid product index");
    require(IERC20Token(cUsdTokenAddress).transferFrom(msg.sender, products[_index].owner, products[_index].price), "Transfer failed.");
    products[_index].sold = products[_index].sold.add(1);
}
```

You create a `buyProduct` function, you need a parameter for the index of the type `uint`. The function is public and payable so that you can make transactions with it.

Now you can use a require function to ensure valid conditions. In this case, you want to ensure that the cUSD transaction was successful ([Learn more about error handling](https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions)).

Use the interface of the ERC-20 token and the address where it is stored, and call its `transferFrom` method, to transfer cUSD.

For the first parameter, you need the address of the sender. In this case, you need the entity executing the transaction. You can access the address using the msg.sender method.

The second parameter is the recipient of the transaction. Here it is the entity who created the product, `products[_index].owner`.

Finally, you need the amount of cUSD token that will be transferred, which, in this case, is the price of the product `products[_index].price`.

If there was a problem with the transaction, display an error message. Otherwise, increase the number of `products[_index].sold` for the product that was sold.

Next we have this line of code

```solidity
function getProductsLength() public view returns (uint) { return (productsLength); }
```

When the first product is created, `productsLength` is 0, so the index where this product is stored is 0. After it is saved, `productsLength` is set to 1. `productsLength` represents how many products you have stored and you can use it as the index of the next product you will store.

This function simply gets the arrays structures of the product eg the `name`, `location`, `price`, `description` etc.

```solidity
// admin can verify a product function verifyProduct(uint _index) public isAdmin { products[_index].verified = true; }
```

This line basically makes sure that admin can verify a product for it to be purchased.

Finally our last line of smart contract is this

```solidity
function revokeOwnership(address _address) public isAdmin {
    adminAddress = _address;
}
```

This function shows that admin has the rights to revoke ownership of the product.

## Step 2: Compiling and Deploying Smart Contract

Now that we have created our celo contract we now need to deploy it.

But first you will create a Celo wallet and deploy your contract to the Celo testnet alfajores.

- Install the [CeloExtensionWallet](https://chrome.google.com/webstore/detail/celoextensionwallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh?hl=en) from the Google Chrome Store.

- Create a wallet
![celo_install_celo_extension_wallet](https://user-images.githubusercontent.com/81568615/206867627-595d5f4b-009a-45a3-a624-de0090e5bbe6.gif)

- Get Celo token for the alfajores testnet from <https://faucet.celo.org>

![celo_get_token_from_faucet](https://user-images.githubusercontent.com/81568615/206867828-910e3f67-85e3-468d-9fc0-e024083c130a.gif)

![celo_create_wallet](https://user-images.githubusercontent.com/81568615/206867880-99866ed5-832c-4931-b5db-1429d751ec99.gif)

- Install the Celo plugin on remix then compile and deploy your contract

![celo_install_remix_plugin_and_deploy_contract (1)](https://user-images.githubusercontent.com/81568615/206871674-33ec8922-c000-42a6-8707-3cd976ebc940.gif)

Congratulations on reaching this stage so far, You have successfully created your smart contract and deployed it on the Celo blockchain.

## Step 3

Now we are going to build our front end.You can use different libraries to build your front end such as react etc.

For easier learning we are going to build our front end using web 3.js. You should have installed node.js 10 or higher.

So first create a folder on your pc. Open your terminal and run this commands below.

```bash
mkdir Bookshop
cd Bookshop
npm init -y
npm install --save-dev webpack webpack-cli
```

- Create `webpack.config.js` in the root and copy the contents of the generated file
- Create folders `src` and inside it create `main.js` file and also create a utils folder and create a file named `constants.js` inside the `utils` folder.
- Create `public` folder and inside create `index.html` file
- Create `contract` folder and inside create `erc20.abi.json` file and `marketplace.json` file and `marketplace.sol` file
- Create a `docs` folder also where we will input our javascript and html code for deployment of the site.

Alternatively if that is a challenge to you, you can view this dacade repository, clone it and use the `package.json` files and dependencies inside it:

On your terminal run:

```bash
git clone https://github.com/dacadeorg/celo-boilerplate-web-dapp
```

Our `package.json` file will look like this:

```
{
    "main": "index.js",
    "dependencies": {
        "@celo/contractkit": "¹.0.2",
        "bignumber.js": "⁹.0.1"
    },
    "devDependencies": {
        "friendly-errors-webpack-plugin": "1.7.0",
        "html-webpack-plugin": "3.2.0",
        "webpack": "⁴.29.6",
        "webpack-cli": "³.1.2",
        "webpack-dev-server": "³.11.3"
    },
    "scripts": {
        "dev": "node index.js",
        "build": "webpack"
    }
}
```

Our `index.js` file will look like this:

```
let path = require("path");
let webpack = require("webpack");
let webpackDevServer = require("webpack-dev-server");
let webpackConfig = require("./webpack.config");
let webpackDevServerOptions = {
    publicPath: "/",
    contentBase: path.join(process.cwd(), "dist"),
    historyApiFallback: true,
    hot: true,
    host: "0.0.0.0"
};

webpackDevServer.addDevServerEntrypoints(webpackConfig, webpackDevServerOptions);
let webpackCompiler = webpack(webpackConfig);
let app = new webpackDevServer(webpackCompiler, webpackDevServerOptions);
let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on ${port}`));
```

To shorten your work view all the installed files on this repository.click
here:<https://github.com/Tevin-Isaac/Dacade-Bookshop>

I am hoping you have all that code in your project now.

Lets Define some code in our Front-End

You can modify how you want your interface to look like. Mine is just simple with a navbar and a footer and a header photo. You can always structure yours however you want.

You are going to use the `contractKit` library to interact with the Celo Blockchain. ContractKit includes `web3.js`, a very popular collection of libraries also used for ethereum, that allows you to get access to a web3 object and interact with node’s JSON RPC API ([Learn more about contractKit](https://docs.celo.org/developer-guide/contractkit)).

```js
import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit' 
import BigNumber from "bignumber.js" 
const ERC20_DECIMALS = 18 let kit
```

The above shows you will establish a connection to the Celo Blockchain and read out the cUSD balance of your connected account.

```js
const connectCeloWallet = async function() {
    if (window.celo) {
        notification("⚠️ Please approve this DApp to use it.") try {
            await window.celo.enable() notificationOff() const web3 = new Web3(window.celo) kit = newKitFromWeb3(web3)
        } catch (error) {
            notification(`⚠️ ${error}.`)
        }
    } else {
        notification("⚠️ Please install the CeloExtensionWallet.")
    }
}
```

This code above enables you to connect to the Celo extension wallet.

```js
const getBalance = async function() {
    const totalBalance = await kit.getTotalBalance(kit.defaultAccount) const cUSDBalance = totalBalance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2) document.querySelector("#balance").textContent = cUSDBalance
}
```

This code  enables you to get the account balance and display it.

```js
window.addEventListener('load', async () => {
    notification("⌛ Loading...");
    await connectCeloWallet();
    await getBalance();
    notificationOff()
});
```

Finally, make this function asynchronous and call `connectCeloWallet()` and `getBalance()` using `await`.

Great job now you can test your dapp.

Finally we will connect our smart contract with the front end.
In order to interact with your smart contract that is deployed in bytecode, you need an interface, the ABI (Application Binary Interface), so that the contractKit can understand the bytecode. The ABI allows you to call functions and read data ([Learn more about the ABI](https://docs.soliditylang.org/en/develop/abi-spec.html)).

When you compile your contract in Remix, Remix also creates the ABI in the form of a JSON for your contract. Copy the JSON and save it into the marketplace.abi.json file of the contracts folder in your project.

After the deployment of your marketplace contract, you will receive the address of the contract which you need in order to find your contract and interact with it.

Import the json files on the main.js file from the contract folder that you created.

```js
import marketplaceAbi from "../contract/marketplace.abi.json"
import erc20Abi from "../contract/erc20.abi.json"
```

This simple code enables you to import the ABI files to function on the front end.

To check if you have done it correctly check out this link:<https://github.com/Tevin-Isaac/Dacade-Bookshop/tree/master/contract>

Run your dapp and test it.if its working well you can deploy and host it on github pages.
simply run npm run build  on your terminal
and it will build automatically on github pages.

Now, you should have an HTML and JS file inside the docs folder of your project.

Upload your project to a new GitHub repository.
Once inside your repository, click on settings and scroll down to a section called GitHub Pages.
Select the master branch and the docs folder as the source for your GitHub pages.

It might take a few minutes until you are able to visit your DApp under the URL that is displayed in the GitHub Pages section. If you haven’t already, create a readme file for your project that explains your Dapp and include a link to your Dapp.

## Conclusion​

That’s it! Congratulations! You are done with the tutorial and have built your  DApp! on Celo blockchain🎉 .

## Next Steps​

For your learning purpose you can challenge yourself further by adding the delete book function on the front end and on the smart contract that way a user or admin can be able to delete a book that was created.

## About the Author​

I am a Mobile and Web 3 Developer who is always building on blockchain technology.You can always Reach me here.

Github:<https://github.com/Tevin-Isaac>
