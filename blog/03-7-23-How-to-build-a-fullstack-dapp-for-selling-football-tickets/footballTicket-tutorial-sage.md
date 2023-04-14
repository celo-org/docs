---
title: How to Build a Full Stack Dapp For Selling Football Tickets on Celo
description: Learn how to build a dapp for seliing football tickets on the celo blockchain
authors:
  - name: Ogoyi Thompson
    title: Technical Writer 
    url:   https://github.com/Ogoyi
    image_url:  https://avatars.githubusercontent.com/u/115812158?v=4
tags: [celo sage, dapp, intermediate, celo]
hide_table_of_contents: true
slug: /tutorials/how-to-build-a-fullstack-dapp-for-selling-football-tickets-on-celo
---


![header](https://user-images.githubusercontent.com/94527318/223388582-2fc82ce3-6ed7-4fa8-9725-055b5be0f7e9.png)



## Introduction

In this tutorial, we will delve into the fascinating world of blockchain football ticketing dapp built on the Celo blockchain. This tutorial will provide you with an introduction to the concept of blockchain football ticket dapp, and guide you through the process of setting up and interacting with this type of application. Upon completion of this tutorial, you will have the knowledge and skills necessary to start building and utilizing your very own blockchain football ticket dapp dapp. Let's begin!

[Live demo](https://zesty-capybara-8b518c.netlify.app/) of what we will be building.

Here is a picture of how our dapp will look like.

![React App - Google Chrome 3_4_2023 9_55_56 AM (2)](https://user-images.githubusercontent.com/94527318/223389414-85aafa20-2195-4c9f-9b23-57dfaed22b44.png)


## Prerequisites

To effectively follow these tutorials, it is recommended that you have a foundational understanding of the following technologies:

- solidity

- smart-contract

- Basic web development

- Blockchain concepts

- React
  
## Requirements

- Solidity.
  
- React.
  
- Bootstrap.
  
- NodeJS 12.0.1 upwards installed.
  
- Celo Extension Wallet.
  
- Remix IDE

Let's get started with writing a smart contract using Remix IDE

The full code:

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

interface IERC20Token {
    function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract Ticketon {
    //Variable used as the index to store all tickets
    uint256 internal ticketsLength = 0;

    //Address of the cUSD erc-20 token
    address internal constant cUsdTokenAddress =
       0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct Ticket {
        address payable owner;
        string image;
        string fixture;
        string venue;
        uint256 price;
        bool forSale;
    }

    //Event that will emit when a new ticket is uploaded
    event newTick(address indexed owner, uint256 index);

    //Even that will emit when a ticket is bought
    event ticketBought(
        address indexed seller,
        uint256 index,
        uint256 price,
        address indexed buyer
    );

    //Mapping that assigns index to all tickets
    mapping(uint256 => Ticket) internal tickets;

    //Modifier that allows only the owner of the ticket to access the functions
    modifier onlyOwner(uint256 _index) {
        require(
            msg.sender == tickets[_index].owner,
            "Only the owner can access this function"
        );
        _;
    }

    modifier checkPrice(uint256 _price) {
        require(_price > 0, "Price needs to be at least one wei");
        _;
    }

    /// @dev Function used to add ticket
    function newTicket(
        string calldata _image,
        string calldata _fixture,
        string calldata _venue,
        uint256 _price
    ) public checkPrice(_price) {
        require(bytes(_image).length > 0, "Empty image");
        require(bytes(_fixture).length > 0, "Empty fixture");
        require(bytes(_venue).length > 0, "Empty venue");

        uint index = ticketsLength;
        Ticket storage tic = tickets[index];
        ticketsLength++;

        tic.owner = payable(msg.sender);
        tic.image = _image;
        tic.fixture = _fixture;
        tic.venue = _venue;
        tic.price = _price;

        emit newTick(msg.sender, index);
    }

    //Returns all the tickets by index
    function getTicket(uint256 _index)
        public
        view
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            uint256,
            bool
        )
    {
        return (
            tickets[_index].owner,
            tickets[_index].image,
            tickets[_index].fixture,
            tickets[_index].venue,
            tickets[_index].price,
             tickets[_index].forSale
        );
    }

    /// @dev Function using which the owner can change the price of the ticket
    function updateTicketCost(uint256 _index, uint256 _price)
        public
        onlyOwner(_index)
        checkPrice(_price)
    {
        tickets[_index].price = _price;
    }

    /// @dev Function using which the owner can change the for sale status of the ticket making it viable for reselling
    function toggleSaleStatus(uint256 _index) public onlyOwner(_index) {
        tickets[_index].forSale = !tickets[_index].forSale;
    }

    /// @dev Function which a use can use to buy the ticket and become the owner of that ticket
    function buyTicket(uint256 _index) public payable {
        Ticket storage currentTicket = tickets[_index];
        require(currentTicket.forSale == true);
        require(
            currentTicket.owner != msg.sender,
            "You can't buy your own ticket"
        );

        address previousOwner = currentTicket.owner;
        currentTicket.owner = payable(msg.sender);
        currentTicket.forSale = false;
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                previousOwner,
                currentTicket.price
            ),
            "Transfer failed."
        );
        emit ticketBought(
            previousOwner,
            _index,
            currentTicket.price,
            msg.sender
        );
    }

    /// @dev Function that returns the total number of ticket
    function getticketsLength() public view returns (uint256) {
        return (ticketsLength);
    }
}
```
## Code Analysis

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

```

To start with, the code contains two directives that serve an important purpose. The first one specifies the open-source license under which the code is released, and the second one defines the version range of Solidity that is compatible with the code. By using these directives, we can ensure that the code is licensed correctly and can be compiled with the intended version of Solidity.

```solidity
interface IERC20Token {
    function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}
```
Futhermore, The code snippet above defines an interface called `IERC20Token`, which specifies the functions and events that a contract must implement in order to be considered an ERC20 token on the Celo blockchain.

ERC20 is a standard interface for tokens on Celo, similar to Ethereum, and it defines the basic functionality that tokens should have, such as the ability to transfer tokens between addresses and to check the token balance of an address. By implementing this interface, a contract can be used as a token on the Celo network, and it can interact with other contracts and wallets that support the ERC20 standard on Celo.

The `IERC20Token` interface specifies the following functions:

- **transfer**: transfers tokens from the sender's address to a specified recipient address.

- **approve**: approves a specified address to spend a specified amount of tokens from the sender's address.
  
- **transferFrom**: transfers a specified amount of tokens from a specified address to another specified address.
  
- **totalSupply**: returns the total supply of tokens.
  
- **balanceOf**: returns the token balance of a specified address.
  
- **allowance**: returns the amount of tokens that an approved address is allowed to spend on behalf of the owner.
The interface also defines two events that should be emitted when the token is transferred or approved, respectively. This is applicable to tokens on the Celo blockchain.

```solidity
contract Ticketon {
    //Variable used as the index to store all tickets
    uint256 internal ticketsLength = 0;

    //Address of the cUSD erc-20 token
    address internal constant cUsdTokenAddress =
       0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct Ticket {
        address payable owner;
        string image;
        string fixture;
        string venue;
        uint256 price;
        bool forSale;
    }

```

The code snippet above defines a smart contract called Ticketon, which includes a state variable `ticketsLength` used as an index to store all tickets.

The contract also defines a `cUsdTokenAddress` variable as the address of the cUSD ERC-20 token, which is a stablecoin on the Ethereum blockchain.

The contract includes a `Ticket struct`, which contains information about a ticket such as the `owner's address`, `image`, `fixture`, `venue`, `price`, and whether or not the ticket is `for sale`.

The owner field is an address payable, which means that it can receive cUsd (the native currency of the Celo blockchain). The forSale field is a boolean that indicates whether the ticket is available for purchase or not.

This contract can be used as a marketplace for buying and selling tickets, where users can create a new ticket and set its price and availability status. Other users can then purchase available tickets by sending the required amount of cUSD tokens to the ticket owner's address.

```solidity
   //Event that will emit when a new ticket is uploaded
    event newTick(address indexed owner, uint256 index);

    //Even that will emit when a ticket is bought
    event ticketBought(
        address indexed seller,
        uint256 index,
        uint256 price,
        address indexed buyer
    );

    //Mapping that assigns index to all tickets
    mapping(uint256 => Ticket) internal tickets;

```

The two events defined in the code snippet are used to notify external entities about important actions that occur within the contract. The `newTick` event is emitted when a new ticket is uploaded, and the `ticketBought` event is emitted when a ticket is bought. Both events contain relevant information such as the ticket owner, index, price, and buyer. The "indexed" keyword is used to mark certain parameters as searchable in the event logs, which can be useful for querying the events later.

Next, we define the mapping named `tickets` that maps a uint256 index to a Ticket struct.
In Solidity, a mapping is a data structure that allows key-value pairs to be stored and retrieved efficiently. In this case, the uint256 index is used as the key, and the Ticket struct is used as the value.

The `internal` visibility modifier is used to restrict access to the mapping to only within the current contract and any contracts that inherit from it.

Proceeding, we add the modifiers.

```solidity
   modifier onlyOwner(uint256 _index) {
        require(
            msg.sender == tickets[_index].owner,
            "Only the owner can access this function"
        );
        _;
    }

    modifier checkPrice(uint256 _price) {
        require(_price > 0, "Price needs to be at least one wei");
        _;
    }
```

The code snippet defines two Solidity modifiers that can be used to add additional checks before a function is executed.

The `onlyOwner` modifier takes a uint256 argument `index` and requires that the sender of the transaction (msg.sender) matches the owner of the ticket with the given index. If the sender is not the owner of the ticket, the function call will revert with an error message `Only the owner can access this function`. If the sender is the owner, the `""` placeholder in the modifier body will be replaced with the function body that follows the modifier.

The `checkPrice` modifier takes a uint256 argument `price` and requires that the price is greater than zero. If the price is not greater than zero, the function call will revert with an error message `Price needs to be at least one wei`. If the price is valid, the "" placeholder in the modifier body will be replaced with the function body that follows the modifier.

Modifiers are a powerful feature of Solidity that allow developers to add reusable checks to their code. By using modifiers, we can write less code, reduce the potential for errors, and increase the security of the smart contracts.

```solidity
 /// @dev Function used to add ticket
    function newTicket(
        string calldata _image,
        string calldata _fixture,
        string calldata _venue,
        uint256 _price
    ) public checkPrice(_price) {
        require(bytes(_image).length > 0, "Empty image");
        require(bytes(_fixture).length > 0, "Empty fixture");
        require(bytes(_venue).length > 0, "Empty venue");

        uint index = ticketsLength;
        Ticket storage tic = tickets[index];
        ticketsLength++;

        tic.owner = payable(msg.sender);
        tic.image = _image;
        tic.fixture = _fixture;
        tic.venue = _venue;
        tic.price = _price;

        emit newTick(msg.sender, index);
    }
```
Next, we add a function function named `newTicket` which will enable users to add a new ticket to the contract. The function takes four arguments: `_image`, `_fixture`, `_venue`, and `_price`. The `checkPrice` modifier ensures that the `_price` argument is greater than zero. After that, the function checks that the `_image`, `_fixture`, and `_venue` arguments are not empty strings. Then, the function creates a new ticket by assigning an index that equals the current length of the `tickets` mapping. After that, the owner of the new ticket is set to the sender of the transaction, and the image, fixture, venue, and price of the ticket are set. Finally, a `newTick` event is emitted to notify external entities that a new ticket has been added to the contract.

```solidity

    //Returns all the tickets by index
    function getTicket(uint256 _index)
        public
        view
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            uint256,
            bool
        )
    {
        return (
            tickets[_index].owner,
            tickets[_index].image,
            tickets[_index].fixture,
            tickets[_index].venue,
            tickets[_index].price,
             tickets[_index].forSale
        );
    }
```

Next, we will create the function called `getTicket` that takes in an index number as an argument and is marked as `public` and `view`, meaning it can be accessed externally without modifying the contract state. The function's purpose is to retrieve specific ticket information from an array of tickets. It returns a tuple consisting of the ticket `owner's` address, the ticket `image`, `fixture` `details`, `venue information`, the `ticket price`, and a flag indicating whether the ticket is up for sale. The values are fetched from the `tickets` array using the specified `index` number. This function can be useful for displaying ticket details or verifying ticket ownership and availability before making a purchase.

```solidity
   function updateTicketCost(uint256 _index, uint256 _price)
        public
        onlyOwner(_index)
        checkPrice(_price)
    {
        tickets[_index].price = _price;
    }

```

The next fucnction is the `updateTicketCost`. updateTicketCost that requires two inputs: _index and _price, both of which are of type uint256.

The function can be accessed by anyone as it is marked as public. However, there are two function modifiers that restrict access to certain users. Firstly, the `onlyOwner(_index)` modifier checks whether the caller of the function is the owner of the ticket at the given index _index. Secondly, the `checkPrice(_price)` modifier ensures that the _price input is valid by checking that it is greater than 0 and less than or equal to a specific maximum value.

If the caller is indeed the owner of the ticket at the given index, and the `_price` input is valid, then the function updates the price of the ticket at the given index with the new _price value. Specifically, the function sets tickets[_index].price equal to _price.

Essentially, this function enables the owner of a ticket to modify the price of their ticket, provided that the new price is valid.

```solidity
 function toggleSaleStatus(uint256 _index) public onlyOwner(_index) {
        tickets[_index].forSale = !tickets[_index].forSale;
    } 
```

This is a function called `toggleSaleStatus` that is defined in our smart contract. It takes one input parameter `_index` of type uint256.

The `onlyOwner(_index)` modifier is used to ensure that the function can only be called by the `owner` of the ticket with index `_index`. This modifier likely checks if the sender of the transaction is the same as the owner of the ticket with index `_index`.

Inside the function, the `forSale` property of the ticket at index `_index` is toggled. If forSale was true, it will be set to false and vice versa. This means that the ticket at index `_index` can be put up for sale or taken off the market by the owner using this function.

Furthermore, we add a unique function that will be used to purchase ticket.

```solidity
   function buyTicket(uint256 _index) public payable {
        Ticket storage currentTicket = tickets[_index];
        require(currentTicket.forSale == true);
        require(
            currentTicket.owner != msg.sender,
            "You can't buy your own ticket"
        );

        address previousOwner = currentTicket.owner;
        currentTicket.owner = payable(msg.sender);
        currentTicket.forSale = false;
        require(
            IERC20Token(cUsdTokenAddress).transferFrom(
                msg.sender,
                previousOwner,
                currentTicket.price
            ),
            "Transfer failed."
        );
        emit ticketBought(
            previousOwner,
            _index,
            currentTicket.price,
            msg.sender
        );
    }
```

This function, called `buyTicket`, allows a user to buy a specific ticket from the `tickets` collection. The function verifies that the ticket is available for purchase and that the buyer is not the current owner of the ticket. The ticket is marked as sold and ownership is transferred to the buyer. The buyer sends a specified amount of a custom ERC20 token to the previous owner of the ticket. Finally, an event is emitted to notify listeners that the ticket has been bought, with details about the previous owner, the index of the ticket, the price, and the buyer.

```solidity
 function getticketsLength() public view returns (uint256) {
        return (ticketsLength);
    }
```

Finally, we the `getticketsLength` function. This is a function called `getticketsLength()`. It is marked as `public` and `view`, meaning it can be called externally without modifying the contract state. The function returns an unsigned integer value of type `uint256`, which is the current value of a variable named `ticketsLength`. This function can be useful for external parties who want to check the number of tickets issued by the contract.

## Contract deployment

To ensure a smooth deployment of our smart contract, it is essential to download the Celo extension wallet from the given link, [Celo Extension wallet](https://chrome.google.com/webstore/detail/celoextensionwallet/kkilomkmpmkbdnfelcpgckmpcaemjcdh?hl=en). Once done, the next step is to fund the wallet that we have created, [Celo faucet](https://faucet.celo.org/). This can be accomplished by accessing the Celo Alfojares faucet using the provided link.

With our wallet funded, we can now proceed to deploy the smart contract using the Celo plugin available in Remix.

## Front End

- Clone the repository to your computer: You can use Git to clone the repository to your local machine. Open a terminal and use the git clone command followed by the repository URL [Click here to clone this project repository](https://github.com/Ogoyi/footballTicketOncelo).

- Open the project in Visual Studio Code: Navigate to the project directory and open it in Visual Studio Code. You can do this by typing `code .` in the terminal.

- Install the necessary dependencies: In the terminal, navigate to the project directory and execute the command `npm install`. This will install all the dependencies listed in the `package.json` file.

Run the application: After installing the dependencies, you can run the application locally by executing the command npm start in the terminal. This will start the development server and open the application in your default browser.

Once you have completed these steps, you should be able to make changes to the code and see the results in your browser.

## App.js

The complete code should look like this.

```js
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";
import IERC from "./contract/IERC.abi.json";
import Ticket from "./contract/Ticket.abi.json";
import CreateTickets from "./components/CreateTickets";
import Tickets from "./components/Tickets";

const ERC20_DECIMALS = 18;

const contractAddress = "0xDAdE3A9E28Ee7a5EE8628F291cB4146f14F88a85";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

function App() {
	const [contract, setcontract] = useState(null);
	const [address, setAddress] = useState(null);
	const [kit, setKit] = useState(null);
	const [cUSDBalance, setcUSDBalance] = useState(0);
	const [tickets, setTickets] = useState([]);

	const connectToWallet = async () => {
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
				console.log(error);
			}
		} else {
			console.log("Error Occurred");
		}
	};

	useEffect(() => {
		connectToWallet();
	}, []);

	useEffect(() => {
		if (kit && address) {
			getBalance();
		}
	}, [kit, address]);

	useEffect(() => {
		if (contract) {
			getTickets();
		}
	}, [contract]);

	const getBalance = async () => {
		try {
			const balance = await kit.getTotalBalance(address);
			const USDBalance = balance.cUSD
				.shiftedBy(-ERC20_DECIMALS)
				.toFixed(2);
			const contract = new kit.web3.eth.Contract(
				Ticket,
				contractAddress
			);
			setcontract(contract);
			setcUSDBalance(USDBalance);
		} catch (error) {
			console.log(error);
		}
	};

	const getTickets = async () => {
		const ticketsLength = await contract.methods.getticketsLength().call();
		console.log(ticketsLength);
		const _tickk = [];
		for (let index = 0; index < ticketsLength; index++) {
			let _tickets = new Promise(async (resolve, reject) => {
				let ticket = await contract.methods.getTicket(index).call();

				resolve({
					index: index,
					owner: ticket[0],
					image: ticket[1],
					fixture: ticket[2],
					venue: ticket[3],
					price: ticket[4],
					forSale: ticket[5]
				});
			});
			_tickk.push(_tickets);
		}
		const _tickets = await Promise.all(_tickk);
		setTickets(_tickets);
		
	};

	const CreateTicket = async (_image, _fixture, _venue, price) => {
		const _price = new BigNumber(price)
			.shiftedBy(ERC20_DECIMALS)
			.toString();
		try {
			await contract.methods
				.newTicket(_image, _fixture, _venue, _price)
				.send({ from: address });
			getTickets();
		} catch (error) {
			console.log(error);
		}
	};
	const UpdateTicketPrice = async (_index, _newPrice) => {
		const newPrice = new BigNumber(_newPrice).shiftedBy(ERC20_DECIMALS).toString();
		console.log(_index);

		
		try {
		  await contract.methods.updateTicketCost(_index, newPrice).send({ from: address });
		  getTickets();
		  getBalance();
		} catch (error) {
		 console.log(error);
		 alert("The Ticket price has succesfully been updated")
		}};
	  
		const toggleSaleStatus = async (_index) => {
			try {
			  await contract.methods.toggleSaleStatus(_index).send({ from: address });
			  getTickets();
			  getBalance();
			} catch (error) {
			  console.log(error);
			}};
		

	 
 
	const buyTicket = async (_index) => {
		try {
			const cUSDContract = new kit.web3.eth.Contract(
				IERC,
				cUSDContractAddress
			);

			await cUSDContract.methods
				.approve(contractAddress, tickets[_index].price)
				.send({ from: address });
			await contract.methods.buyTicket(_index).send({ from: address });
			getTickets();
			getBalance();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
		{address && kit ? (
			<div>
				<Navbar balance={cUSDBalance} />

				<Tickets
					tickets={tickets}
					buyTicket={buyTicket}
					toggleSaleStatus={toggleSaleStatus}
					UpdateTicketPrice={UpdateTicketPrice}
					address={address}
				/>
				<CreateTickets CreateTicket={CreateTicket} />
			</div>
		) : (
			""
		)}
	</>
);
}

export default App;
```

Firstly, we need to analyze the App.js file by examining its components and libraries, which are required to be imported.

```js
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";
import IERC from "./contract/IERC.abi.json";
import Ticket from "./contract/Ticket.abi.json";
import CreateTickets from "./components/CreateTickets";
import Tickets from "./components/Tickets";

const ERC20_DECIMALS = 18;

const contractAddress = "0xDAdE3A9E28Ee7a5EE8628F291cB4146f14F88a85";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
```

- The first two lines import the CSS stylesheets of the application and the Bootstrap library respectively.

- The next line imports the Navbar component from `./components/Navbar`.

- The next line imports two hooks, `useState` and `useEffect`, from the React library.

- The next lines import the Web3 library, which is a JavaScript library used to interact with the celo blockchain and other compatible blockchains.

- The line newKitFromWeb3 imports a function from the `@celo/contractkit` library that creates a new ContractKit instance from a Web3 instance.

- The next line imports the `BigNumber` library, which is used to handle big numbers in JavaScript.

- The next two lines import the `JSON ABI files` of the `IERC` and "Ticket" smart contracts respectively.

- The next two lines import the `CreateTickets` and `Tickets` components from their respective files.

- The constant `ERC20_DECIMALS` is assigned the value of `18`, which represents the number of decimals for the ERC20 token.

- The constant contractAddress is assigned the address of the deployed `Ticket` smart contract.

- The constant cUSDContractAddress is assigned the address of the deployed `cUSD` ERC20 token contract.

```js
function App() {
	const [contract, setcontract] = useState(null);
	const [address, setAddress] = useState(null);
	const [kit, setKit] = useState(null);
	const [cUSDBalance, setcUSDBalance] = useState(0);
	const [tickets, setTickets] = useState([]);

	const connectToWallet = async () => {
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
				console.log(error);
			}
		} else {
			console.log("Error Occurred");
		}
	};

```

Furthermore, The `App` is a function component written in React that creates and initializes several state variables using the `useState`hook. One of these variables is contract, which starts with a value of null. Similarly, address, kit, cUSDBalance, and tickets also start with initial values. The component also includes an asynchronous function called connectToWallet that tries to establish a connection with the Celo wallet. If the connection is successful, it creates new instances of Web3 and kit using the celo object, and retrieves the user's account address. It then sets this address as the default account in the kit instance and updates the address and kit state variables with the new values. Any errors that occur during this process are logged to the console. The kit instance can be used to interact with the Celo blockchain and perform various operations, while the other state variables can be used to store and manipulate application data.

```js
	const getBalance = async () => {
		try {
			const balance = await kit.getTotalBalance(address);
			const USDBalance = balance.cUSD
				.shiftedBy(-ERC20_DECIMALS)
				.toFixed(2);
			const contract = new kit.web3.eth.Contract(
				Ticket,
				contractAddress
			);
			setcontract(contract);
			setcUSDBalance(USDBalance);
		} catch (error) {
			console.log(error);
		}
	};
```

Next, we create an asynchronous function called `getBalance` that retrieves the balance of a specified address and updates the values of contract and `cUSDBalance` using the functions `setcontract` and `setcUSDBalance` respectively.

The function begins by attempting to retrieve the balance using the `getTotalBalance` function on an object called `kit` and passing it the address of the account. If successful, it converts the balance to a human-readable format and stores it in a variable called `USDBalance`.

Next, the function creates a new instance of a Contract object using the web3 property of `kit` and the `ABI` of the smart contract as well as the smart contract address. Finally, the function calls the setcontract and `setcUSDBalance` functions to update the values of contract and `cUSDBalance` respectively.

If there are any errors during the function's execution, it logs them to the console.

```js
const getTickets = async () => {
		const ticketsLength = await contract.methods.getticketsLength().call();
		console.log(ticketsLength);
		const _tickk = [];
		for (let index = 0; index < ticketsLength; index++) {
			let _tickets = new Promise(async (resolve, reject) => {
				let ticket = await contract.methods.getTicket(index).call();

				resolve({
					index: index,
					owner: ticket[0],
					image: ticket[1],
					fixture: ticket[2],
					venue: ticket[3],
					price: ticket[4],
					forSale: ticket[5]
				});
			});
			_tickk.push(_tickets);
		}
		const _tickets = await Promise.all(_tickk);
		setTickets(_tickets);
		
	};

```

The function getTickets() enables the retrieval of all the tickets stored in the contract and then updates the state with the retrieved tickets.

```js
 const CreateTicket = async (_image, _fixture, _venue, price) => {
		const _price = new BigNumber(price)
			.shiftedBy(ERC20_DECIMALS)
			.toString();
		try {
			await contract.methods
				.newTicket(_image, _fixture, _venue, _price)
				.send({ from: address });
			getTickets();
		} catch (error) {
			console.log(error);
		}
	};
	const UpdateTicketPrice = async (_index, _newPrice) => {
		const newPrice = new BigNumber(_newPrice).shiftedBy(ERC20_DECIMALS).toString();
		console.log(_index);

		
		try {
		  await contract.methods.updateTicketCost(_index, newPrice).send({ from: address });
		  getTickets();
		  getBalance();
		} catch (error) {
		 console.log(error);
		 alert("The Ticket price has succesfully been updated")
		}};
	  
		const toggleSaleStatus = async (_index) => {
			try {
			  await contract.methods.toggleSaleStatus(_index).send({ from: address });
			  getTickets();
			  getBalance();
			} catch (error) {
			  console.log(error);
			}};
		
        const buyTicket = async (_index) => {
		try {
			const cUSDContract = new kit.web3.eth.Contract(
				IERC,
				cUSDContractAddress
			);

			await cUSDContract.methods
				.approve(contractAddress, tickets[_index].price)
				.send({ from: address });
			await contract.methods.buyTicket(_index).send({ from: address });
			getTickets();
			getBalance();
		} catch (error) {
			console.log(error);
		}
	};

```

We will now proceed to develop the createTicket(), updatePrice(), buyTicket() and toggleSaleStatus() functions, which enable users to engage with the smart contract.

```js
useEffect(() => {
		connectToWallet();
	}, []);

	useEffect(() => {
		if (kit && address) {
			getBalance();
		}
	}, [kit, address]);

	useEffect(() => {
		if (contract) {
			getTickets();
		}
	}, [contract]);
```

In this React component, `useEffect` is utilized to trigger the execution of `connectToWallet`, `getBalance`, and `getTickets` functions at specific times. These functions are called when certain dependencies change or when the component mounts, which is a common approach in React applications that need to interact with external data sources or APIs.

```js
return (
		<>
		{address && kit ? (
			<div>
				<Navbar balance={cUSDBalance} />

				<Tickets
					tickets={tickets}
					buyTicket={buyTicket}
					toggleSaleStatus={toggleSaleStatus}
					UpdateTicketPrice={UpdateTicketPrice}
					address={address}
				/>
				<CreateTickets CreateTicket={CreateTicket} />
			</div>
		) : (
			""
		)}
	</>
);
}

export default App;
```

finally, we render the App component and return the ticket components with the necessary props.

## Next step

Great job! It's always helpful to provide additional resources for further learning. Don't hesitate to reach out if you have any more questions or if you need further assistance, you can reach out to me on twitter by clicking [this linnk](https://twitter.com/thompsonogoyi). Happy learning!

## Conclusion

Great work on creating a dapp for selling football tickets on the Celo blockchain! Congratulations on your accomplishment! 🎉

## About the author

My name is Ogoyi Thompson, and I'm a web3 developer based in Nigeria. I am enthusiastic about working with blockchain technology.
