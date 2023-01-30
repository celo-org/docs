---
title: How to Build Car Marketplace dapp Using React
description: Learn how to build a Car Marketplace on the Celo Blockchain with React as frontend framework
authors:
- name: Daniel Ogbuti
  title: Web3 Developer, 
  url: https://github.com/dahnny
  image_url: https://github.com/dahnny.png
tags: [solidity, react, celo]
hide_table_of_contents: true
slug: /tutorials/how-to-build-car-marketplace-dapp-with-react
---

# How to Build a Car Marketplace dapp using React

## Introduction
Celo blockchain enables fast, secure, and low-cost financial transactions. It is built on top of the Ethereum Virtual Machine (EVM), which is a standardized environment for running smart contracts (self-executing code that can be used to facilitate, verify, and enforce the negotiation or performance of a contract). 
One of the main features of Celo is its use of proof-of-stake (PoS) consensus, which means that the network is secured by a group of "validators" who stake (or pledge) a certain amount of the platform's native cryptocurrency  in order to participate in the validation of transactions. 

## Prerequisites
This tutorials exposes you to how building a simple fullstack dapp (decentralized application) using react. You will need to have familiarity of the following:

- Prior knowledge of javascript
- Familiarity with the command line
- Basic understanding of blockchain concepts
- Have some knowledge on solidity and its concepts
- Have a basic understanding of **[React](https://react.org)**. Knowledge on JSX, props, state and hooks.

## Requirements
- **[NodeJS](https://nodejs.org/en/download)** from V12.or higher
- A code editor or text editor. **[VSCode](https://code.visualstudio.com/download)** is recommended
- A terminal. **[Git Bash](https://git-scm.com/downloads)** is recommended
- An Internet Browser and good internet connection
- **[Remix](https://remix.ethereum.org)**
- **[Celo Extension Wallet](https://chrome.google.com/webstore/detail/celoextensionwallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh?hl=en)**.

## Let's Begin

Here is a screenshot of what our dapp would look like

![image](images/1.png)

_In this tutorial, I have the assumption that the person following has a basic understanding of React and has react already downloaded and fully setup. If you don't, I would highly suggest you have a grasp of React. You can start **[here](https://reactjs.org/docs/getting-started.html)**._

## Smart Contract Development

We would begin this segment by building our smart contract first using Remix. Remix is a web based IDE that allows developers to write, test and deploy smart contracts on the Celo blockchain. 

Here is a preview of the Remix IDE:
![image](images/2.png)

On Remix, We would create a new workspace and then a new file which we would name `cardealer.sol`


Starting out in the first line, you include a statement that specifies the license under which the code is being released.

```js
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
```

This license governs how the code can be used, and it is important to ensure that the correct license is used to avoid any legal issues. A resource such as SPDX can be used to help identify a suitable license.

To ensure the smart contract can run without any issues and is protected by a license, it's important to indicate the version of the compiler and the license it uses. This can be done by specifying the compiler version with the `pragma` keyword, and the license used, by including a statement that specifies the license at the beginning of the contract code.


Next up, we define an `IERC20Token` interface which enables us to interact with the celo stablecoin (cUSD). 

```js
// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

ERC-20 tokens are a widely-used standard for creating digital assets on the Ethereum blockchain, and cUSD is one of them.

These tokens have pre-defined functions and events that can be easily used in contracts, and do not require any additional implementation. For example, you will be using the ERC-20 token's interface to interact with it, so that your contract can communicate with the token.

You can find more information on how to use these functions and events in the Celo **[documentation](https://docs.celo.org/developer-guide/celo-for-eth-devs)**. The documentation also provides more details on how to interact with ERC-20 tokens and how to use them with the Celo network.



Following this, You define your smart contract by giving it a name. In our case our contract name is `CarDealer`. You can name it anything you want but ensure you keep it descriptive.

```js
contract CarDealer{
    
    uint internal carLength = 0;
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
  ...
```

In the next line, you define a state variable carLength, this is going to keep track of the cars in our contract. It is of a `uint` type which means it can only store integer values. [(Learn more about data types in solidity)](https://docs.soliditylang.org/en/latest/types.html)
We also define the visibility of our variable to `internal` which means it cannot be accessed from external smart contracts or addresses and can only be modified within the smart contract. ([Learn more about visiblity](https://docs.soliditylang.org/en/latest/contracts.html#visibility-and-getters))

Next, To interact with the cUSD ERC-20 token on the Celo alfajores test network, you need to know the address of the token.


After defining the single variables used in the contract, you want to create a "model" for a car, give the car its properties and group variables together.

```js
    struct Car{
        address payable owner;
        string carName;
        string carDescription;
        string carImage; 
        uint price;
        bool isUsed; 
        bool isBought;
    }
    
    mapping (uint => Car) internal cars;
```

To do this, you would require a struct data type with the keyword `struct` and give it multiple properties. ([Learn about structs here](https://docs.soliditylang.org/en/latest/types.html#structs))

For this tutorial, these would be the variables that you would store in the struct:
1. owner - This would store the address of the owner of a particular car as all cars in the marketplace would be owned by someone. It is of the address type
2. carName - This stores the name of the car. It is of type string
3. carImage - stores the url of the car. Type string
4. carDescription - car description.  Type string
5. price - This stores the price of the car. Its a number so its of type uint
6. isUsed - This would store if the car is used or not. It would be a boolean type. True or false
7. isSale - This keeps track of when a car is on sale or not. Boolean type
8. isBought - This keeps track of when a car has been bought. Boolean type


To handle multiple cars, a mapping is needed where you can access the value of a car through their key. Just like dictionaries in python or objects in Javascript.
To create a mapping, you use the keyword `mapping` and assign a key type to a value type. In this case, your key would be an integer and the value would be the struct Car we just created.


In the next section, you will define a function to add the car to the smart contract.

```js
    function setCar(
        string memory _carName,
        string memory _carDescription,
        string memory _carimage,
        bool _isUsed,
        uint _price
    )public {
        cars[carLength] = Car(
              payable(msg.sender),
              _carName,
              _carDescription,
              _carimage,
              _price,
              _isUsed,
              false
        );
        carLength++;
    }
```

You have to specify the parameters type in the function. In this case, we need to pass the name, description, image, price and isUsed (all with an underscore to differentiate them from the struct values) as parameters to the function. Name the function `setCar` with a visibility of public.

Next, associate the key carLength with a new Car structure in the cars mapping.

The first field of the struct is the address of the owner who can receive payments. The msg.sender function returns the address of the entity that initiated the call and is capable of receiving payments. This address will be stored as the owner's address.
You also need to assign values to the other variables using the provided parameters.

The isBought value should be set to false, because on creating a car alias, the car default state should be for sale.


Up next, you would create a function that would read the products created in the preceding function.

```js
    function getCar (uint _index) public view returns (
        address payable,
        string memory,
        string memory,
        string memory,
        uint,
        bool,
        bool
    ) {
        Car storage car = cars[_index];
        return(
          car.owner,
          car.carName,
          car.carDescription,
          car.carImage,
          car.price,
          car.isUsed,
          car.isBought
        );
    }
```

This function will carry a parameter of _index to be able to get a particular car alias. You also need to specify the variables you will return with the function. 
In this case, it would be a tuple corresponding to the variables declared in the struct. 
The function needs to return the address of the owner, the strings and the boolean values of `isUsed` and `isBought`


Proceeding, you need to create a function that enables a user buy a car from your contract. 

```js
    function buyCar(uint _index) public  payable {
        require(cars[_index].isBought == false,"Not for Sale");
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            cars[_index].owner,
            cars[_index].price
          ),
          "This transaction could not be performed"
        );
        
        // change owner
        cars[_index].owner = payable(msg.sender);
        // change the sale  status
        cars[_index].isBought = true;
        
    }
```

The "buyCar" function, which is public and payable, takes in an index of type uint as a parameter.

This function uses the require function to ensure that the cUSD transaction is successful. It then uses the ERC-20 token interface and the stored address to call the transferFrom method to transfer cUSD.

The first parameter is the address of the sender, accessed using the msg.sender method, the second parameter is the recipient of the transaction, which is the owner of the car at the given index, and the final parameter is the price of the car at the given index. 

If the transaction is unsuccessful, an error message will be displayed. If successful, the owner of the car then becomes the sender of the transaction and the status of isBought changes to `true`.


In the final section of the smart contract, you would create a function to sell a car and also get the total cars

```js
    function sellCar(uint _index) public {
        require(msg.sender == cars[_id].owner,"Accessible only to the owner");
        cars[_index].isBought = false;
    }
    
    // function to get the length of the car array
    function getCarLength() public view returns (uint) {
        return (carLength);
    }
```

The `sellCar` function is a public function because we need it to be accessed outside the contract.

The function will use the require function to make sure that the sender of this transaction is actually the owner of the car if not return an error.

If that succeeds, then change the isBought function to false so others now  have the opportunity to buy it.

Next in line, create a public function that will iterate over the stored cars in the frontend and return the total number of cars.

Here is the full code:


```js
// SPDX-License-Identifier: MIT  

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract CarDealer{
    
    uint internal carLength = 0;
    
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct Car{
        address payable owner;
        string carName;
        string carDescription;
        string carImage; 
        uint price;
        bool isUsed; 
        bool isBought;
    }
    
    mapping (uint => Car) internal cars;
   
    function setCar(
        string memory _carName,
        string memory _carDescription,
        string memory _carimage,
        bool _isUsed,
        uint _price
    )public {
        cars[carLength] = Car(
              payable(msg.sender),
              _carName,
              _carDescription,
              _carimage,
              _price,
              _isUsed,
              false
        );
        carLength++;
    }
    
    // this function reads a particular car data
    function getCar (uint _index) public view returns (
        address payable,
        string memory,
        string memory,
        string memory,
        uint,
        bool,
        bool
    ) {
        Car storage car = cars[_index];
        return(
          car.owner,
          car.carName,
          car.carDescription,
          car.carImage,
          car.price,
          car.isUsed,
          car.isBought
        );
    }
    
    // function to buy a car
    function buyCar(uint _index) public  payable {
        require(cars[_index].isBought == false,"Not for Sale");
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            cars[_index].owner,
            cars[_index].price
          ),
          "This transaction could not be performed"
        );
        
        // change owner
        cars[_index].owner = payable(msg.sender);
        // change the sale  status
        cars[_index].isBought = true;
        
    }

    // function for user to sell his own car
    function sellCar(uint _index) public {
        require(msg.sender == cars[_index].owner,"Accessible only to the owner");
        cars[_index].isBought = false;
    }
    
    // function to get the length of the car array
    function getCarLength() public view returns (uint) {
        return (carLength);
    }

} 
```

## Contract Deployment

To deploy the contract, we would need:
1. [CeloExtensionWallet]((https://chrome.google.com/webstore/detail/celoextensionwallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh?hl=en))
2. [ Celo Faucet](https://celo.org/developers/faucet) 
3. Celo Remix Plugin

Download the Celo Extension Wallet from the Google chrome store using the link above. After doing that, create a wallet, store your key phrase in a very safe place to avoid permanently losing your funds.

After downloading and creating your wallet, you will need to fund it using the Celo Faucet. Copy the address to your wallet, click the link to the faucet above and the paste the address into the text field and confirm.

Next up, on remix, download and activate the celo plugin from the plugin manager. Connect your wallet and deploy your contract.


## Frontend Development

To get setup with building your react dapp, you would have to setup your new react project. 
1.  - Run this on your terminal
```bash 
    npx create-react-app cardealer
```
This should take a few minutes to complete depending on your internet connection. 
2.  - Navigate to the directory created
3.  - Open the directory using your code editor. In this case, it would be vscode and you would run this on your terminal
```bash
    code cardealer
```
This should open a vscode window with the cardealer directory.

4. In the `package.json` file, replace the existing code with this:

```json
    {
      "name": "cardealer",
      "version": "0.1.0",
      "private": true,
      "dependencies": {
        "@celo/contractkit": "^1.2.4",
        "@testing-library/jest-dom": "^5.11.4",
        "@testing-library/react": "^11.1.0",
        "@testing-library/user-event": "^12.1.10",
        "react": "^17.0.2",
        "react-dom": "^17.0.2",
        "react-error-overlay": "^6.0.9",
        "react-router-dom": "^5.3.0",
        "react-scripts": "4.0.3",
        "web-vitals": "^1.0.1"
      },
      "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
      },
      "eslintConfig": {
        "extends": [
          "react-app",
          "react-app/jest"
        ]
      },
      "browserslist": {
        "production": [
          ">0.2%",
          "not dead",
          "not op_mini all"
        ],
        "development": [
          "last 1 chrome version",
          "last 1 firefox version",
          "last 1 safari version"
        ]
      }
    }

```
  This is to make sure the dependencies required to build the frontend are in place
  
5. Install all dependencies
  ```bash
    npm install 
  ```
6. Start a server
  ```bash
    npm start
  ```

## The HTML part of the Dapp
In the next step of the tutorial, you will begin building the foundation of your decentralized application (DApp) using HTML.

First off, you would add the following folder name `assets2` to the public folder. This has some CSS properties and images that you would be using to enable you build your dapp swiftly. ([Download it here](https://github.com/dahnny/CeloDealer/tree/main/public/assets2))

Open the index.html file located in the public folder of your project, and let's begin.

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>CeloDealer</title>
```
Start by declaring the document type, then add an HTML tag, create a head element, and include meta tags. 

Afterwards, you will import some external stylesheets.

```html
  <!-- site favicon -->
  <link rel="shortcut icon" type="image/png" href="assets2/image/favicon.jpg"/>
  <!-- fontawesome css link -->
  <link rel="stylesheet" href="assets2/css/fontawesome.min.css">
  <!-- bootstrap css link -->
  <link rel="stylesheet" href="assets2/css/bootstrap.min.css">
  <!-- lightcase css link -->
  <link rel="stylesheet" href="assets2/css/lightcase.css">
  <!-- animate css link -->
  <link rel="stylesheet" href="assets2/css/animate.css">
  <!-- nice select css link -->
  <link rel="stylesheet" href="assets2/css/nice-select.css">
  <!-- datepicker css link -->
  <link rel="stylesheet" href="assets2/css/datepicker.min.css">
  <!-- wickedpicker css link -->
  <link rel="stylesheet" href="assets2/css/wickedpicker.min.css">
  <!-- jquery ui css link -->
  <link rel="stylesheet" href="assets2/css/jquery-ui.min.css">
  <!-- owl carousel css link -->
  <link rel="stylesheet" href="assets2/css/owl.carousel.min.css">
  <!-- main style css link -->
  <link rel="stylesheet" href="assets2/css/main.css">
</head>
```
From our `assets2` folder, we import some stylesheets that will be used to give our frontend a specific feel.

_Disclaimer: This method of importing css files is not recommended for building large scale applications and is only used here for the purpose of keeping this tutorial simple and concise._

Up next, you would add the body of the html and add specific script tags which would give our dapp some functionality.

```html
<body>

  <!-- preloader start -->
  <div id="preloader"></div>
  <!-- preloader end -->   

      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
      <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    --></div>
    <!-- jquery js link -->
    <script src="assets2/js/jquery-3.3.1.min.js"></script>
    <!-- jquery migrate js link -->
    <script src="assets2/js/jquery-migrate-3.0.0.js"></script>
    <!-- bootstrap js link -->
    <script src="assets2/js/bootstrap.min.js"></script>
    <!-- lightcase js link -->
    <script src="assets2/js/lightcase.js"></script>
    <!-- wow js link -->
    <script src="assets2/js/wow.min.js"></script>
    <!-- nice select js link -->
    <script src="assets2/js/jquery.nice-select.min.js"></script>
    <!-- datepicker js link -->
    <script src="assets2/js/datepicker.min.js"></script>
    <!-- wickedpicker js link -->
    <script src="assets2/js/wickedpicker.min.js"></script>
    <!-- owl carousel js link -->
    <script src="assets2/js/owl.carousel.min.js"></script>
    <!-- jquery ui js link -->
    <script src="assets2/js/jquery-ui.min.js"></script>
    <!-- main js link -->
    <script src="assets2/js/main.js"></script>
  </body>
  
  </html>
```

## App.js
The App.js file is the starting point for the React frontend of the application. The App component is responsible for the layout and organization of the other components. It includes the App component, which acts as a container for all other components. 
At the beginning of the App.js file, necessary libraries, components and hooks are imported.

```js
import React, { useState, useEffect } from 'react';

import Web3 from 'web3'
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from "bignumber.js";

const ERC20_DECIMALS = 18;

const contractAddress = "0x83dce46765c4420b8E93eE1b2e9Fc79d254E9212";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
```

You will start  off by importing standard react hooks like `useState` and `useEffect` from the react library.

Then we import the web3, contractkit and bignumber js objects from their libraries.

Celo's operations often deal with numbers that are too large for Javascript to handle. To handle these numbers, we will use bignumber.js.

Create a variable called `ERC20_DECIMALS` and set its value to 18. By default, the ERC20 interface uses 18 decimal places.

On Remix, after the deployment of your contract, you will find the address to that contract which you need to interact with the functionality in your smart contract.
Create a variable called `contractAddress` and assign it the contract address gotten from remix.

Create a variable called `cUSDContractAddress` for the cUSD contract address.


```js
import cardealer from './abis/car.abi.json';
import erc20 from './abis/irc.abi.json';
```
In the src folder, create an `abis` folder. This folder would contain two files. 

The first file would be called `car.abi.json`. It would be used to store the abi for your contract.
The second file would be called `irc.abi.json`. It would store the abi for the IERC20 interface.

To interact with a smart contract that is deployed in bytecode, an interface known as the ABI (Application Binary Interface) is required for the contractKit to interpret the bytecode. ([Learn about ABIs](https://docs.soliditylang.org/en/develop/abi-spec.html))

The ABI allows for the execution of functions and the reading of data. When using Remix to compile a contract, the ABI is also generated in the form of a JSON file. 

This JSON file should be copied and saved into the "car.abi.json" file within the "abis" folder of the project.


```js
import './App.css';
import Header from './components/Header';
import SalesCars from './components/SalesCars';
import AddCar from './components/AddCar';
import MyCar from './components/MyCar';
```

Next, import the css files from `App.css`.

For the next lines, a `components` folder would need to be created inside the `src` folder for the various components of our application. 
Create the files in the components folder as seen above. `Header.js`, `SalesCars.js`, `AddCar.js`, `MyCar.js`. 
These sections would be discussed later.

Next up, we would be using useState to keep track of some variables through out the dapp. 


```js
function App() {

  const [celoBalance, setCeloBalance] = useState(0);
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [cars, setCars] = useState([]);
  const [myCars, setMyCars] = useState([]);
...
```

useState is a Hook in React that allows you to add state to functional components. It is a way to manage and update the state of a component. 

useState returns an array with two elements: the current state, and a function to update it. The first argument passed to useState is the initial state, and the second argument is an optional callback function to run after the state is updated. ([Learn more about useState](https://reactjs.org/docs/hooks-state.html))

The next task is to create an asynchronous function called connectCeloWallet that allows a user to connect to the Celo Blockchain and read the balance of their account. The function will perform several checks and actions to ensure that the user has the necessary tools and permissions to interact with the Celo Blockchain.

```js
...
  const connectCeloWallet = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);

      } catch (error) {
        console.log('There is an error')
        console.log({ error });
      }
    } else {
      console.log("please install the extension");
    }
  };
```


The first step is to check if the user has the CeloExtensionWallet installed by checking if the "window.celo" object exists. If it does not exist, the function will use the console to inform the user that they need to install the wallet.

If the "window.celo" object does exist, a notification will be sent to the user in the console to approve this DApp and try the window.celo.enable() function. This will open a pop-up dialogue in the UI that asks for the user's permission to connect the DApp to the CeloExtensionWallet.

If an error is caught during this process, the user would be informed that they must approve the dialogue to use the DApp.

After the user approves the DApp, create a web3 object using the window.celo object as the provider. This web3 object can then be used to create a new kit instance, which will be saved to the kit state. This kit instance will have the functionality to interact with the Celo Blockchain.

You would then access the user's account by utilizing the web3 object and kit instance that have been created. 

After creating the new kit instance, use the method kit.web3.eth.getAccounts() to get an array of the connected user's addresses. Use the first address from this array and set it as the default user address by using kit.defaultAccount. This will allow the address to be used globally in the DApp.

Now, create an asynchronous function called `getBalance` that retrieves the user's balance and updates the corresponding state variables

```js
  const getBalance = async () => {
    
    const balance = await kit.getTotalBalance(address);
    const celoBalance = balance.CELO.shiftedBy(-ERC20_DECIMALS).toFixed(2);
    const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

    const contract = new kit.web3.eth.Contract(cardealer, contractAddress);
    setcontract(contract);
    setCeloBalance(celoBalance);
    setcUSDBalance(USDBalance);
  };
```
Start by calling the `kit.getTotalBalance(address)` method, passing in the user's address. This method returns the user's balance in the form of an object that contains the amounts of CELO and cUSD tokens. The returned balance is then stored in the `balance` variable.

The next step is to extract the CELO and cUSD balance from the "balance" object by using the `.CELO` and `.cUSD` properties respectively. Then it's shifted the value by -ERC20_DECIMALS which is a way to represent the balance in terms of smaller units in our case 18 decimal places, and then it's converting the value to fixed 2 decimal points. These values are stored in the `celoBalance` and `USDBalance` variables.

Next, create a contract instance by calling the "new kit.web3.eth.Contract(cardealer, contractAddress)" , with your abi and contract address (created earlier) as arguments.

Update the state by calling `setcontract(contract); setCeloBalance(celoBalance); setcUSDBalance(USDBalance);`. 


Up next, create a function called `getCars` that retrieves the cars information from the smart contract and updates the corresponding state variables.

```js
 const getCars = async function () {
    const carLength = await contract.methods.getCarLength().call();
    const _cars = [];

    for (let index = 0; index < carLength; index++) {
      let _car = new Promise(async (resolve, reject) => {
        let c = await contract.methods.getCar(index).call();
        resolve({
          index: index,
          owner: c[0],
          carName: c[1],
          carDescription: c[2],
          carImage: c[3],
          price: new BigNumber(c[4]),
          isUsed: c[5],
          isBought: c[6],
        })
      });

      _cars.push(_car);
    }
    const cars = await Promise.all(_cars);   
    setCars(cars);
    console.log(cars);
    // return cars that have been bought
    const _myCars = cars.filter((car)=>{
      return (car.owner === address && (car.isBought === true ));
    })    
    setMyCars(_myCars);
    
  }
```

Start by calling the `contract.methods.getCarLength().call()` method, which returns the number of cars that are stored in the smart contract. This value is stored in the `carLength` variable.

You will then create an empty array called `_cars` that will be used to store the car objects. It uses a for loop to iterate through the cars stored in the smart contract, starting from index 0 up to the `carLength` value.

For each iteration, the function creates a new promise called `_car`, which retrieves the car information for the current index by calling the `contract.methods.getCar(index).call()` method. This method returns an array of values, such as owner, carName, carDescription, carImage, price, isUsed, isSale and isBought. These values are then stored in an object that is passed to the resolve function of the promise, along with the index.

The `_car` promise is then pushed to the `_cars` array. After the loop is finished, wait for all promises in the `_cars` array to be resolved by calling `await Promise.all(_cars)`, this will make sure that all the cars have been retrieved before moving on. Then it's updating the state with the cars array, by calling `setCars(cars);`

The next step is filtering the cars that have been bought by the user by checking the car.owner value and the isBought value and storing the result in _myCars variable, then it's updating the state with the _myCars variable.


After creating these functions, you would need a way for them to be implemented in the application. In this case, the functions would need to be called every time the application starts. You would need to retrieve the balance and get the cars already created.
For this, you would use the useEffect Hook.

```js
  useEffect(() => {
    connectCeloWallet();
  }, []);

  useEffect(() => {
    if (kit && address) {
      return getBalance();
    } else {
      console.log("no kit or address");
    }
  }, [kit, address]);

  useEffect(() => {
    if (contract) {
      getCars()
    };
  }, [contract]);
```

The first useEffect hook runs the `connectCeloWallet()` function as a side-effect. we want the effect to run once when the component is rendered.

The second useEffect hook calls the `getBalance()` function earlier created only when the kit and address are valid. This prevents unwanted errors.

The third useEffect hooks calls the `getCars()` function when a contract is available so the function can use the contract to find the cars available.


Next would be creating a function that allows users to add a car to the smart contract. You could call this function `addToCars()`

```js
  const addtoCars = async (_name, _description, _image, _price, _isUsed) => {
    try {
      const price = new BigNumber(_price)
        .shiftedBy(ERC20_DECIMALS).toString();


      await contract.methods
        .setCar(
          _name,
          _description,
          _image,
          _isUsed,
          _isRent,
          price
        )
        .send({ from: address });
      getCars();
    } catch (error) {
      console.log(error);
    }

  }
```

You start by creating a new BigNumber instance with the _price argument, and then it's shifting it by ERC20_DECIMALS, this is a way to represent the price in terms of smaller units. Then it's converting the value to a string and storing it in the "price" variable.

Then you use the `contract.methods.setCar(..)` method to add the car to the smart contract. You also use the "send" method, passing in the user's address as the "from" property. This sends the transaction to the smart contract and adds the car to the smart contract.

If the function completes successfully, it calls the "getCars()" function to retrieve the updated list of cars from the smart contract. If an error occurs, it will be caught and logged in the console.


After this function, we would add two functions which would be to initiate the buy and the sell function in our smart contract.

```js
  const buyCar = async (_price, _index) => {
    try {
      const cUSDContract = new kit.web3.eth.Contract(erc20, cUSDContractAddress);
      const cost = new BigNumber(_price).shiftedBy(ERC20_DECIMALS).toString();

      const result = await cUSDContract.methods
        .approve(contractAddress, cost)
        .send({ from: address });

      await contract.methods.buyCar(_index).send({ from: address });
      // return result
      getBalance();
      getCars();
    } catch (error) {
      console.log({ error });
    }
  };



  const sellCar = async (index) => {
    try {

      await contract.methods.sellCar(index).send({ from: address });

      getCars();
    } catch (error) {
      console.log({ error });
      alert("Something went wrong");
    }
  };
```

The "buyCar" function takes two arguments: _price, and _index. The function starts by creating a new cUSD contract instance using the ERC20 ABI and cUSD contract address. Then it creates a new BigNumber instance with the _price argument, and then it's shifting it by ERC20_DECIMALS, this is a way to represent the price in terms of smaller units. Then it's converting the value to a string and storing it in the "cost" variable.

The function then uses the "cUSDContract.methods.approve(contractAddress, cost)" method to approve the spending of cUSD tokens to the contract address, passing in the cost variable as an argument, and the user's address as the "from" property.

The next step is using the "contract.methods.buyCar(_index)" method to buy the car on the smart contract, passing in the _index argument. And using the "send" method, passing in the user's address as the "from" property.

If the function completes successfully, it calls the `getBalance()` and `getCars()` functions to retrieve the updated balance and list of cars from the smart contract. If an error occurs, it will be caught and logged in the console.

The "sellCar" function takes one argument: index, it's using the "contract.methods.sellCar(index)" method to make the car available for sale on the smart contract, passing in the index argument. And using the "send" method, passing in the user's address as the "from" property.

If the function completes successfully, it calls the "getCars()" function to retrieve the updated list of cars from the smart contract. If an error occurs, it will be caught and logged in the console, and an alert message will appear.


Next up will be the return statement with the following components which we would implement soon.

```js
  return (

    <div className="content">
      <Header balance={cUSDBalance} celo = {celoBalance}/>
      <SalesCars cars={cars} buyCar = {buyCar}/>
      <AddCar addToCars={addtoCars} />
      <MyCar cars = {myCars} sellCar = {sellCar} />
    </div>

  );
```

## Header.js

For this component, we would display the CUSD and CELO balance and also the design. Copy the code below!

```js

const Header = props => {
    return (
        <>
            <header className="header-section">

                <div className="header-bottom">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg p-0">
                            <a className="site-logo site-title" href="index.html"><h2>CeloDealer</h2></a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span style={{ color: "black" }} className="menu-toggle" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav main-menu mr-auto">

                                    <li><a href="#">USD Balance: ${props.balance}CUSD |||| Celo Balance: ${props.celo}</a></li>

                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>{/* header-bottom end */}
            </header>
            <section className="banner-section bg_img" data-background={slideImg1}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-7">
                            <div className="banner-content">
                                <h1 className="title">Best Car Dealer</h1>
                                <p>We offer the best car service in the city. Dont miss out on this oppurtunity to be a car owner</p>
                                <a href="#0" className="cmn-btn">Sell/Rent your car</a>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="banner-img">
                                {/* <img src=alt="image" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}

export default Header
```


## SalesCars.js

This would represent the cars which are for sale. It checks if the item is for sale using the properties passed from App.js. If the item is for sale, we would display the item. 

```js

const SalesCars = props => {

    return (
        <>
            <section className="choose-car-section pt-120 pb-120 section-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="section-header text-center">
                                <h2 className="section-title">Cars for Sale</h2>
                                <p> Look through our equisite selection of cars and get one that fits your choice</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        {props.cars.map(car => ( car.isBought === false) && <div className="car-item col-lg-4 col-md-6 col-sm-12">
                            <div className="thumb">
                                <img src={car.carImage} alt="item" />
                            </div>
                            <div className="car-item-body">
                                <div className="content">
                                    <h4 className="title">{car.carName}</h4>
                                    <span className="price">Price:${car.price / 10 ** 17}</span>
                                    <p>{props.car.carDescription}</p>
                                    <a onClick={() => props.buyCar(car.price / 10 ** 17, car.index)} className="cmn-btn">Buy Car</a>
                                </div>
                                <div className="car-item-meta">
                                    <ul className="details-list">
                                        <li><i className="fa fa-sliders" />{(car.isUsed === 'true' || car.isUsed === true) ? 'Used' : 'New'}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>)}

                    </div>
                </div>
            </section>

            <section className="features-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="section-header text-center">
                                <h2 className="section-title">our awesome features</h2>
                                <p>These is what makes us at CeloDealer special</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-none-30">
                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-item text-center">
                                <div className="icon"><i className="fa fa-user" /></div>
                                <div className="content">
                                    <h4 className="title">New/Used Cars</h4>
                                    <p>We offer you the choice to choose between used and new cars</p>
                                </div>

                            </div>
                        </div>{/* icon-item end */}
                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-item text-center">
                                <div className="icon"><i className="fa fa-rocket" /></div>
                                <div className="content">
                                    <h4 className="title">fast services</h4>
                                    <p>All our services are time and speed efficent </p>
                                </div>
                            </div>
                        </div>{/* icon-item end */}
                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-item text-center">
                                <div className="icon"><i className="fa fa-volume-control-phone" /></div>
                                <div className="content">
                                    <h4 className="title">customer support</h4>
                                    <p>We offer 24/7 customer support </p>

                                </div>
                            </div>
                        </div>{/* icon-item end */}
                    </div>
                </div>
            </section>

        </>


    );
}

export default SalesCars;
```

## MyCar.js
This component would be used to retrieve the user's bought  cars on the frontend

```js
const MyCar = props => {
    return (
        <>
            <section className="choose-car-section pt-120 pb-120 section-bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="section-header text-center">
                                <h2 className="section-title">Bought Cars</h2>

                            </div>
                        </div>
                    </div>
                    <div className="row">

                        {props.cars.map(car => <div className="car-item col-lg-4 col-md-6 col-sm-12">
                            <div className="thumb">
                                <img src={car.carImage} alt="item" />
                            </div>
                            <div className="car-item-body">
                                <div className="content">
                                    <h4 className="title">{car.carName}</h4>
                                    <span className="price">Price:${car.price / 10 ** 17}</span>
                                    <p>{car.carDescription}</p>
                                    {(car.isBought === true) ? <div>
                                        <a onClick={() => props.sellCar(car.index)} className="cmn-btn">Sell Car</a>
                                    </div> : <p>This car is bought!!</p>}

                                </div>
                                <div className="car-item-meta">
                                    <ul className="details-list">
                                        <li><i className="fa fa-car" />model 2014ib</li>
                                        <li><i className="fa fa-tachometer" />32000 KM</li>
                                        <li><i className="fa fa-sliders" />auto</li>
                                    </ul>
                                </div>
                            </div>
                        </div>)}

                    </div>
                </div>
            </section>
            <div className="footer-bottom" style={{ backgroundColor: "#363636" }}>
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-sm-6">
                            <p className="copy-right-text"><a href="#">CeloDealer</a></p>
                        </div>
                        <div className="col-sm-6">
                            <ul className="payment-method d-flex justify-content-end">
                                <li>We accept</li>
                                <li><img src={"put your own image"} alt="one" /></li>
                                <li><img src={"put your own image"} alt="two" /></li>
                                <li><img src={"put your own image"} alt="three" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyCar;
```

## AddCar.js
This component is used to add a car to the smart contract. The convertToBool function is a helper function that is used to convert a string to boolean.
```js
import { useState } from 'react';

const AddCar = props => {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState();
    const [isUsed, setIsUsed] = useState('false');
    const [description, setDescription] = useState('')

    const submitHandler = (event) => {
        event.preventDefault();
        props.addToCars(name, description, image, price, isUsed);
        setName('');
        setImage('');
        setPrice('');
        setDescription('');
    }
    const convertToBool = (text)=>{
        if(text === 'true'){
          return true
        }else if(text === 'false'){
          return false;
        }
      }

    return (

        <section id = "0" className=" pt-120 pb-120">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Add Car</h2>
                    {/* <p> Look through our equisite selection of cars and get one that fits your choice</p> */}
                </div>
                <form className="reservation-form" onSubmit = {submitHandler}>
                    <div className="content-block">
                    </div>
                    <div className="content-block">
                        <div className="row">
                            <div className="col-lg-6 form-group">
                                <input type="text" placeholder="Name" required value = {name} onChange = {(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="col-lg-6 form-group">
                                <input type="text" placeholder="Image URL" required value = {image} onChange = {(e)=>setImage(e.target.value)}/>
                            </div>
                            <div className="col-lg-6 form-group">
                                <input type="number" placeholder="Price" required value = {price} onChange = {(e)=>setPrice(e.target.value)} />
                            </div>
                            <div className="col-lg-6 form-group">
                                <select onChange = {(e)=>setIsUsed(convertToBool(e.target.value))}>
                                    <option>is Used</option>
                                    <option value = "true">True</option>
                                    <option value = "false">False</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="content-block">
                        <div className="row">
                            <div className="col-lg-12 form-group">
                                <textarea value = {description} placeholder="Car Description" onChange = {(e)=>setDescription(e.target.value)} />
                            </div>
                            <div className="col-lg-12">
                                <button type="submit" className="cmn-btn">Add your Car</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>

    );
}

export default AddCar;
```

Now try to compile your react dapp to see if it is working fine. If it is, you can deploy your dapp on github pages  or netlify.
You can follow or use this project as a reference to edit yours and get the required files, images e.t.c. <https://github.com/dahnny/cardealer-tutorial>

## Conclusion

Congratulations 🎉, you were able to build your fullstack dapp using solidity and react on the celo smart contract. Great JOB!!

## Next steps
You can challenge yourself by adding more functions and implementing them using react on the frontend. You can also look at various celo smart contracts and see if you can build a dapp using react

## About the Author
Daniel Ogbuti is a web3 developer with a passion for teaching as well as learning. I would love to connect on Twitter @daniel_ogbuti

See you soon!