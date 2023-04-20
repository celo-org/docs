---
title: How to Build a Supply Chain Management Application on Celo
description: This tutorial teaches how to build a supply chain management application on Celo
authors:
  - name: Emiri Udogwu
    title: Tech Ethusiast, Smart Contract Developer
    url: https://github.com/emiridbest
    image_url: https://avatars.githubusercontent.com/u/6362475?v=4
tags: [celosage, celo, intermediate, contractkit]
hide_table_of_contents: true
slug: /tutorials/how-to-build-a-supply-chain-management-application-on-celo
---

![header](../../src/data-tutorials/showcase/intermediate/how-to-build-a-supply-chain-management-application-on-celo.png)

## Introduction​

In today's globalized and interconnected world, supply chain management (SCM) has emerged as a critical aspect of business operations. Effective SCM applications enable organizations to streamline their logistics, reduce inefficiencies, and enhance overall competitiveness. Blockchain technology, with its decentralized, secure, and transparent nature, has the potential to revolutionize the way supply chain management is conducted. Celo, a mobile-first blockchain platform, is a promising candidate for creating robust, efficient, and accessible SCM applications.

This tutorial will show code examples on a real world use case for SCM.

You can clone this project on github by running:

```bash
git clone https://github.com/emiridbest/supplyChainDapp.git
```

## Prerequisites​

- Node.js should be installed along with a node package manager(npm)
- A basic understanding of Celo and smart contracts
- A Celo Wallet address:
- To create Alfajores wallet, go to [Alfajores wallet](https://celo.org/developers/faucet)
- To get testnest funds, go to [Celo faucet](https://faucet.celo.org/)
- A text editor such as Visual Studio Code installed on your computer
- [Remix IDE](https://remix.ethereum.org/)
- Metamask

## Let’s Begin…

This is what our Dapp will look like:

![supply chain dapp](https://user-images.githubusercontent.com/6362475/232843980-187c8f5b-ea57-45b6-ad85-edd2d5bbcb51.png)

- Step 1: Write your Voting Smart Contract and Deploy on Remix IDE

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {


// Define roles
enum Role {
	Owner,
	Manufacturer,
	Distributor,
	Retailer
}

// Define actors
struct Actor {
	address id;
	Role role;
	string name;
}

// Define item states
enum State {
	Manufactured,
	ShippedToDistributor,
	ShippedToRetailer,
	Sold
}

// Define an item
struct Item {
	string name;
	uint256 price;
	State state;
	Actor manufacturer;
	Actor distributor;
	Actor retailer;
	Actor customer;
}

// Item count for generating IDs
uint256 public itemCount;

// Mapping to store items by ID
mapping(uint256 => Item) public items;

// Mapping for assigning roles to actors
mapping(address => Role) public roles;

// Events
event ItemManufactured(uint256 itemId);
event ItemShippedToDistributor(uint256 itemId);
event ItemShippedToRetailer(uint256 itemId);
event ItemSold(uint256 itemId);


// Owner of the smart contract
address public owner;

constructor() {
	owner = msg.sender; // Set the contract owner as the address deploying the contract
	roles[owner] = Role.Owner; // Assign the Owner role to the contract owner
}


// Modifiers
modifier onlyManufacturer(uint256 itemId) {
	require(
    	items[itemId].manufacturer.id == msg.sender,
    	"Only the manufacturer can perform this action."
	);
	_;
}

modifier onlyDistributor(uint256 itemId) {
	require(
    	items[itemId].distributor.id == msg.sender,
    	"Only the distributor can perform this action."
	);
	_;
}

modifier onlyRetailer(uint256 itemId) {
	require(
    	items[itemId].retailer.id == msg.sender,
    	"Only the retailer can perform this action."
	);
	_;
}

// Functions

function assignRole(address user, Role role) public {
	require(msg.sender == owner, "Only the contract owner can assign roles");
	roles[user] = role;
}

function manufactureItem(
	string memory itemName,
	uint256 itemPrice,
	string memory manufacturerName
) public {
	itemCount++;
	Item memory newItem = Item({
    	name: itemName,
    	price: itemPrice,
    	state: State.Manufactured,
    	manufacturer: Actor(msg.sender, Role.Manufacturer, manufacturerName),
    	distributor: Actor(address(0), Role.Distributor, ""),
    	retailer: Actor(address(0), Role.Retailer, ""),
    	customer: Actor(address(0), Role.Retailer, "")
	});
	items[itemCount] = newItem;
	emit ItemManufactured(itemCount);
}

function shipItemToDistributor(uint256 itemId, address distributorAddress)
	public
	onlyManufacturer(itemId)
{
	items[itemId].distributor.id = distributorAddress;
	items[itemId].distributor.name = "";
	items[itemId].state = State.ShippedToDistributor;
	emit ItemShippedToDistributor(itemId);
}

function shipItemToRetailer(uint256 itemId, address retailerAddress)
	public
	onlyDistributor(itemId)
{
	items[itemId].retailer.id = retailerAddress;
	items[itemId].retailer.name = "";
	items[itemId].state = State.ShippedToRetailer;
	emit ItemShippedToRetailer(itemId);
}

function sellItem(uint256 itemId, string memory customerName)
	public
	onlyRetailer(itemId)
{
	items[itemId].customer.id = msg.sender;
	items[itemId].customer.name = customerName;
	items[itemId].state = State.Sold;
	emit ItemSold(itemId);
}

function trackItem(uint256 itemId) public view returns (State) {
	return items[itemId].state;
}

}
```

The functions included in the contract are:
`assignRole`: assigns a Role to an actor, only accessible by the contract owner.
`manufactureItem`: creates a new item with a specified name, price, and manufacturer name. The item is assigned a unique ID, its state is set to Manufactured, and its manufacturer is set to the caller of the function.
`shipItemToDistributor`: updates the item's state to ShippedToDistributor and sets the distributor's address. Only the manufacturer can call this function.
`shipItemToRetailer`: updates the item's state to ShippedToRetailer and sets the retailer's address. Only the distributor can call this function.
`sellItem`: updates the item's state to Sold and sets the customer's name. Only the retailer can call this function.
`trackItem`: returns the current state of an item.

Now, we compile this contract then deploy on Injected web3 provider. This pops up our already install metamask wallet, make sure to choose Alfajores containing wallet.
On deploying, a link to Alfajores Explorer pops up at the top of your browser.YOu can now copy out your contract address and save it somewhere as web3.js needs this address to interact with this particular contract.
Also, go back to remix and copy out you contract ABI save it somewhere.

## Now Let’s code the frontend:

- Step 2: Set up your new react project.

Run this on your terminal

```bash
npx create-react-app supplyChain
```

This should take a few minutes to complete depending on your internet connection.
Navigate to the directory created
Open the directory using your code editor. In this case, it would be vscode and you would run this on your terminal

```bash
Code supplyChain
```

This should open a vscode window with the supplyChain directory.

- Step 3: Update `package.json` file.

Now, update the content of the `package.json` by copying and posting this;

```json
{
  "name": "supplychain",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@celo-tools/use-contractkit": "^3.1.0",
    "@celo/contractkit": "^1.5.1",
    "@testing-library/jest-dom": "^5.16.1",
    "@testing-library/react": "^12.1.2",
    "@testing-library/user-event": "^13.5.0",
    "@web3uikit/core": "^0.2.45",
    "@web3uikit/web3": "^0.2.2",
    "react": "^18.2.0",
    "react-bootstrap": "^2.5.0",
    "react-dom": "^18.2.0",
    "react-error-overlay": "6.0.9",
    "react-scripts": "4.0.3",
    "web-vitals": "^2.1.4",
    "web3": "^1.7.0",
    "web3uikit": "0.1.159"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "resolutions": {
    "react-error-overlay": "6.0.9"
  }
}
```

- Step 4: Install all dependencies

```bash
npm install
```

- Step 5: Start development server

```bash
npm start
```

- Step 6: Update the App.js file - Import all dependencies

This is the file that will contain codes that interact with our smart contract and also house all the components of the frontend.

```js
import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import "./App.css";

import { contractABI, contractAddress } from "./utils/const";
…
```

Here, we imported all the dependencies and then also imported our `contractABI` and `contractAddress` which we save earlier when we deployed our contract. This serves as the link between our frontend and the already deployed contract.

- Step 7: Let’s use useState to keep track of some variables throughout the dapp.

```js
…
function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
	itemName: "",
	itemPrice: "",
	manufacturerName: "",
	itemId: "",
	distributorAddress: "",
	retailerAddress: "",
	customerName: "",
  });
  const [itemCount, setItemCount] = useState(0);
  const [items, setItems] = useState([]);
  const [role, setRole] = useState(null);
  const [contract, setContractInstance] = useState(null);
  const [kit, setKit] = useState(null);

 const handleChange = (e, name) => {
	setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  …
```

We also added another function whose purpose is to update the `formData` state variable with new form data, in response to user input events which we will be seeing more of in our app components..

- Step 8: Create functions for connecting to the network

```js
…
  const initContract = useCallback(async () => {
	try {
  	if (!window.ethereum) {
    	console.error("Celo Wallet extension not detected");
    	return;
  	}

  	const web3 = new Web3(window.ethereum);
  	const kit = newKitFromWeb3(web3);
  	await window.ethereum.request({ method: "eth_requestAccounts" });
  	const contract = new kit.web3.eth.Contract(contractABI, contractAddress);

  	setCurrentAccount((await kit.web3.eth.getAccounts())[0]);
  	setKit(kit);
  	setContractInstance(contract);
	} catch (error) {
  	console.log(error);
	}
  }, []);

  const connectToWallet = async () => {
	try {
  	if (!window.ethereum)
    	throw new Error("Celo wallet extension not detected");

  	await window.ethereum.enable({ method: "eth_requestAccounts" });
  	const accounts = await window.ethereum.request({
    	method: "eth_accounts",
  	});
  	setCurrentAccount(accounts[0]);
	} catch (error) {
  	console.log(error);
  	throw new Error("Failed to connect to Celo wallet");
	}
  };

  const checkIfWalletIsConnected = () => {
	try {
  	if (!window.ethereum)
    	return alert("Please install the Celo wallet extension");

  	const web3 = new Web3(window.ethereum);
  	web3.eth.getAccounts((err, accounts) => {
    	if (err) {
      	console.error(err);
      	throw new Error("Failed to get accounts");
    	}
    	if (accounts && accounts.length) {
      	setCurrentAccount(accounts[0]);
    	} else {
      	console.log("No accounts found");
    	}
    	console.log(accounts);
  	});
	} catch (error) {
  	console.log(error);
  	throw new Error("No ethereum object");
	}
  };


...
```

The above 3 functions serves very vital purpose in our dapp interaction with the network.
The `initContract` function is responsible for initializing a Celo contract by creating a new instance of the Web3 library, requesting permission to access the user's account, and setting the current account and contract instance. This function is typically called once during the initialization of the app.
The `checkIfWalletIsConnected` function is used to check if the wallet extension is installed and retrieve the current account information. This function can be called at any point in the app to check if the user is still connected to their Celo wallet extension.
The `connectToWallet` function is used to connect to the wallet extension by requesting permission to access the user's account and retrieving the current account information. This function is typically called when the user initiates an action that requires access to their Celo account.

We also need to add the associated `useEffect` hooks for the `initContract` function to ensure that function are called once only when a `currentAccount` is available. The second hook calls the `checkIfWalletIsConnected` function when the component mounts to check if there is a wallet connected to the app.

```js
...
useEffect(() => {
	if (currentAccount) {
  	initContract();
	}
  }, [currentAccount, initContract]);

  useEffect(() => {
	checkIfWalletIsConnected();
  }, []);
...
```

- Step 9: Create functions to call our smart contract functions

```js
...
const assignRole = async (address, role) => {
	try {
  	await contract.methods
    	.assignRole(address, role)
    	.send({ from: currentAccount, gasLimit: 3000000 });
  	setRole(role);

  	alert(`Role assigned to ${address} successfully!`);
	} catch (error) {
  	console.error(error);
	}
  };
...
```

This function takes two parameters, an address and a role. It uses the contract instance to call the `assignRole()` method on the Celo smart contract, passing in the address and role as arguments. The function then sends a transaction with the from the current account and a gas limit of 3,000,000. Once the transaction is confirmed, the function sets the role state variable to the role argument passed into the function and displays a success message to the contract owner.

```js
...
const manufactureItem = async (itemName, itemPrice, manufacturerName) => {
	try {
  	await contract.methods
    	.manufactureItem(itemName, itemPrice, manufacturerName)
    	.send({ from: currentAccount, gasLimit: 3000000 });
  	const itemCount = await contract.methods.itemCount().call();
  	const newItem = await contract.methods.items(itemCount).call();
  	setItemCount(itemCount);
  	setItems([...items, newItem]);
	} catch (error) {
  	console.error(error);
	}
  };

...
```

This function takes three parameters, an `itemName`, an `itemPrice`, and a `manufacturerName`. It uses the contract instance to call the `manufactureItem` method on the Celo smart contract, passing in the `itemName`, `itemPrice`, and `manufacturerName` as arguments. The function then sends a transaction from the current account and a gas limit of 3,000,000. Once the transaction is confirmed, the function retrieves the new item's information by calling the items() method on the smart contract and updates the `itemCount` and `items` state variables with the new information.

```js
...
const shipToDistributor = async (itemId, distributorAddress) => {
	try {
  	await contract.methods
    	.shipItemToDistributor(itemId, distributorAddress)
    	.send({ from: currentAccount, gasLimit: 3000000 });
  	const updatedItem = await contract.methods.items(itemId).call();
  	const updatedItems = [...items];
  	updatedItems[itemId - 1] = updatedItem;
  	setItems(updatedItems);

  	alert(`Item shipped successfully to ${distributorAddress}`);
	} catch (error) {
  	alert("Attempt to ship item failed");
	}
  };

...
```

This function takes two parameters, an `itemId` and a `distributorAddress`. It uses the contract instance to call the `shipItemToDistributor` method on the Celo smart contract, passing in the `itemId` and `distributorAddress` as arguments. The function then sends a transaction with the from account set to the current account and a gas limit of 3,000,000. Once the transaction is confirmed, the function retrieves the updated item information by calling the `items` method on the smart contract and updates the items state variable with the new information.

The rest functions;

```js
...

  const shipToRetailer = async (itemId, retailerAddress) => {
	try {
  	await contract.methods
    	.shipItemToRetailer(itemId, retailerAddress)
    	.send({ from: currentAccount, gasLimit: 3000000 });
  	const updatedItem = await contract.methods.items(itemId).call();
  	const updatedItems = [...items];
  	updatedItems[itemId - 1] = updatedItem;
  	setItems(updatedItems);

  	alert(`Item shipped succesfully to ${retailerAddress}`);
	} catch (error) {
  	alert("Attempt to ship item failed");
	}
  };

  const sellItem = async (itemId, customerName) => {
	try {
  	await contract.methods
    	.sellItem(itemId, customerName)
    	.send({ from: currentAccount, gasLimit: 3000000 });
  	console.log(trackItem);
  	alert(
    	`Item with ID ${itemId} has been sold to ${customerName} successfully`
  	);
	} catch (error) {
  	console.error(error);
  	alert(`Error occurred while selling item with ID ${itemId}`);
	}
  };

  const trackItem = async (itemId) => {
	try {
  	const item = await contract.methods.items(itemId).call();
  	console.log(`Item with ID ${itemId}:`, item);

  	// Format the item information for better readability
  	const formattedItem = formatItem(item);

  	// Display the formatted item information as an alert
  	alert(`Item with ID ${itemId}:\n${formattedItem}`);

  	return item;
	} catch (error) {
  	console.error(
    	`Error occurred while fetching item with ID ${itemId}:`,
    	error
  	);
  	return null;
	}
  };
  function formatItem(item) {
	const formattedItem = `
  	Name: ${item.name}
  	Price: ${item.price}
  	State: ${item.state}
  	Manufacturer: ${item.manufacturer[2]} (Address: ${item.manufacturer[0]}, ID: ${item.manufacturer[1]})
  	Distributor: ${item.distributor[2]} (Address: ${item.distributor[0]}, ID: ${item.distributor[1]})
  	Retailer: ${item.retailer[2]} (Address: ${item.retailer[0]}, ID: ${item.retailer[1]})
  	Customer: ${item.customer[2]} (Address: ${item.customer[0]}, ID: ${item.customer[1]})
	`;
	return formattedItem;
  }
...
```

Notice how the `trackItem` function retrieves the item information and formats it using the `formatItem` function. The formatted item information is then displayed to the user.

- Step 10: Renders a user interface with various sub-components

```js
...
  return (
	<div className="min-h-screen">
  	<div className="gradient-bg-welcome">
    	<Navbar />
    	<Welcome
      	connectToWallet={connectToWallet}
      	currentAccount={currentAccount}
    	/>
  	</div>
  	<div className="container">
    	<AssignRole
      	formData={formData}
      	assignRole={assignRole}
      	handleChange={handleChange}
    	/>
    	<ManufactureItem
      	formData={formData}
      	manufactureItem={manufactureItem}
      	handleChange={handleChange}
    	/>
    	<ShipToDistributor
      	formData={formData}
      	shipToDistributor={shipToDistributor}
      	handleChange={handleChange}
    	/>
    	<ShipToRetailer
      	formData={formData}
      	shipToRetailer={shipToRetailer}
      	handleChange={handleChange} // This function should be already created in App.js
    	/>
    	<SellItem
      	formData={formData}
      	sellItem={sellItem}
      	handleChange={handleChange} // This function should be already created in App.js
    	/>
    	<TrackItem
      	formData={formData}
      	trackItem={trackItem}
      	handleChange={handleChange} // This function should be already created in App.js
    	/>
  	</div>
	</div>
  );
}
export default App;

```

Each of these sub-components receives props such as `formData`, `connectToWallet`, `currentAccount`, `assignRole`, `manufactureItem`, `shipToDistributor`, `shipToRetailer`, `sellItem`, `trackItem`, and `handleChange`.

- Step 11: Create the Component and the import them into App.js
  To do this we have to create a new folder called `components` in the `src` folder.

- NavBar.js

```js
import React from "react";

import logo from "./logo512.png";

const NavbarItem = ({ title, classprops }) => <li>{title}</li>;

const Navbar = () => {
  return (
    <div className="white-glassmorphism">
      <nav className="text-gradient">
        <ul>
          <img src={logo} alt="logo" className="logo" />
          {["About Us", "Mission", "FAQ", "Contact"].map((item, index) => (
            <NavbarItem key={item + index} title={item} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
```

- Welcome.js

```js
import React from "react";

const Welcome = ({ connectToWallet, currentAccount }) => {
  return (
    <div>
      <div>
        <h1 className="text-gradient">
          Track Your Products <br />
          Across The World
        </h1>
        <p className="text-gradient ">
          Explore The World Of Supply Chain Management
        </p>
        {!currentAccount && (
          <button type="button" onClick={connectToWallet} className="button">
            <p> Connect Wallet</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Welcome;
```

- AssignRole.js

```js
import React from "react";

const Input = ({ placeholder, name, type, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    onChange={(e) => handleChange(e, name)}
    className="white-glassmorphism"
  />
);

const AssignRole = ({ formData = {}, assignRole, handleChange }) => {
  const handleSubmit = (e) => {
    const { address, role } = formData;
    e.preventDefault();
    if (!address || !role) return;

    assignRole(address, role);
  };

  return (
    <div className="white-glassmorphism">
      <div className="blue-glassmorphism">
        <Input
          placeholder="Address"
          name="address"
          type="text"
          handleChange={handleChange}
        />
        <label className="text-gradient">Roles</label>
        <select name="role" onChange={(e) => handleChange(e, "role")}>
          <option value="1">Manufacturer</option>
          <option value="2">Distributor</option>
          <option value="3">Retailer</option>
        </select>
      </div>
      <div />
      <button type="button" onClick={handleSubmit}>
        Assign Role
      </button>
    </div>
  );
};

export default AssignRole;
```

- ManufactureItem.js

```js
import React from "react";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.01"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="white-glassmorphism"
  />
);

const ManufactureItem = ({ formData, manufactureItem, handleChange }) => {
  const handleSubmit = (e) => {
    const { itemName, itemPrice, manufacturerName } = formData;
    e.preventDefault();
    if (!itemName || !itemPrice || !manufacturerName) return;

    manufactureItem(itemName, itemPrice, manufacturerName);
  };

  return (
    <div className="white-glassmorphism">
      <div className="blue-glassmorphism">
        <Input
          placeholder="Item Name"
          name="itemName"
          type="text"
          handleChange={handleChange}
        />
        <Input
          placeholder="Amount(Celo)"
          name="itemPrice"
          type="number"
          handleChange={handleChange}
        />
        <Input
          placeholder="Manufacturer"
          name="manufacturerName"
          type="text"
          handleChange={handleChange}
        />
      </div>
      <div />
      <button type="button" onClick={handleSubmit}>
        Add Item
      </button>
    </div>
  );
};

export default ManufactureItem;
```

- ShipToDistributor.js

```js
import React from "react";

const Input = ({ placeholder, name, type, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    onChange={(e) => handleChange(e, name)}
    className="white-glassmorphism"
  />
);

const ShipToDistributor = ({
  formData = {},
  shipToDistributor,
  handleChange,
}) => {
  const handleSubmit = (e) => {
    const { itemId, distributorAddress } = formData;
    e.preventDefault();
    if (!itemId || !distributorAddress) return;

    shipToDistributor(itemId, distributorAddress);
  };

  return (
    <div className="white-glassmorphism">
      <div className="blue-glassmorphism">
        <Input
          placeholder="Item ID"
          name="itemId"
          type="number"
          handleChange={handleChange}
        />
        <Input
          placeholder="CeloAddress"
          name="distributorAddress"
          type="text"
          handleChange={handleChange}
        />
      </div>
      <div />
      <button type="button" onClick={handleSubmit}>
        Ship To Distributor
      </button>
    </div>
  );
};

export default ShipToDistributor;
```

- ShipToRetailer.js

```js
import React from "react";

const Input = ({ placeholder, name, type, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    onChange={(e) => handleChange(e, name)}
    className="white-glassmorphism"
  />
);

const ShipToRetailer = ({ formData, shipToRetailer, handleChange }) => {
  const handleSubmit = (e) => {
    const { itemId, address } = formData;
    e.preventDefault();
    if (!itemId || !address) return;

    shipToRetailer(itemId, address);
  };

  return (
    <div className="white-glassmorphism">
      <div className="blue-glassmorphism">
        <Input
          placeholder="Item ID"
          name="itemId"
          type="number"
          handleChange={handleChange}
        />
        <Input
          placeholder="CeloAddress"
          name="address"
          type="text"
          handleChange={handleChange}
        />
      </div>
      <div />
      <button type="button" onClick={handleSubmit}>
        Ship To Retailer
      </button>
    </div>
  );
};

export default ShipToRetailer;
```

- SellItem.js

```js
import React from "react";

const Input = ({ placeholder, name, type, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    onChange={(e) => handleChange(e, name)}
    className="white-glassmorphism"
  />
);

const SellItem = ({ formData, sellItem, handleChange }) => {
  const handleSubmit = (e) => {
    const { itemID, name } = formData;
    e.preventDefault();
    if (!itemID || !name) return;

    sellItem(itemID, name);
  };

  return (
    <div className="white-glassmorphism">
      <div className="blue-glassmorphism">
        <Input
          placeholder="Item ID"
          name="ItemID"
          type="number"
          handleChange={handleChange}
        />
        <Input
          placeholder="Customer Name"
          name="name"
          type="text"
          handleChange={handleChange}
        />
      </div>
      <div />
      <button type="button" onClick={handleSubmit}>
        Sell Item
      </button>
    </div>
  );
};

export default SellItem;
```

- TrackItem.js

```js
import React from "react";

const Input = ({ placeholder, name, type, value, onChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => onChange(e, name)}
    className="white-glassmorphism"
  />
);

const TrackItem = ({ formData, trackItem, handleChange }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { itemID } = formData;
    if (!itemID) {
      return;
    }
    await trackItem(itemID);
  };

  return (
    <div className="track">
      <Input
        placeholder="Item ID"
        name="itemID"
        type="number"
        value={formData.itemID}
        onChange={handleChange}
      />
      <button type="button" onClick={handleSubmit}>
        Track Item
      </button>
    </div>
  );
};

export default TrackItem;
```

Now, let’s bundle all the components into one file in the component folder so we can batch export them as one;

- Index.js

```js
export { default as Welcome } from "./Welcome";
export { default as ManufactureItem } from "./ManufactureItem";
export { default as Navbar } from "./Navbar";
export { default as SellItem } from "./SellItem";
export { default as ShipToDistributor } from "./ShipToDistributor";
export { default as ShipToRetailer } from "./ShipToRetailer";
export { default as TrackItem } from "./TrackItem";
export { default as AssignRole } from "./AssignRole";
```

Now we import the components into the `App.js` file by adding the next line of code to the top of our App.js file

```js
import {
  ManufactureItem,
  AssignRole,
  Navbar,
  SellItem,
  ShipToDistributor,
  ShipToRetailer,
  TrackItem,
  Welcome,
} from "./components/Index";
```

Now, our App.js file should look like this;

```js
import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import "./App.css";

import { contractABI, contractAddress } from "./utils/const";
import {
  ManufactureItem,
  AssignRole,
  Navbar,
  SellItem,
  ShipToDistributor,
  ShipToRetailer,
  TrackItem,
  Welcome,
} from "./components/Index";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    itemName: "",
    itemPrice: "",
    manufacturerName: "",
    itemId: "",
    distributorAddress: "",
    retailerAddress: "",
    customerName: "",
  });
  const [itemCount, setItemCount] = useState(0);
  const [items, setItems] = useState([]);
  const [role, setRole] = useState(null);
  const [contract, setContractInstance] = useState(null);
  const [kit, setKit] = useState(null);

  const initContract = useCallback(async () => {
    try {
      if (!window.ethereum) {
        console.error("Celo Wallet extension not detected");
        return;
      }

      const web3 = new Web3(window.ethereum);
      const kit = newKitFromWeb3(web3);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const contract = new kit.web3.eth.Contract(contractABI, contractAddress);

      setCurrentAccount((await kit.web3.eth.getAccounts())[0]);
      setKit(kit);
      setContractInstance(contract);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnected = () => {
    try {
      if (!window.ethereum)
        return alert("Please install the Celo wallet extension");

      const web3 = new Web3(window.ethereum);
      web3.eth.getAccounts((err, accounts) => {
        if (err) {
          console.error(err);
          throw new Error("Failed to get accounts");
        }
        if (accounts && accounts.length) {
          setCurrentAccount(accounts[0]);
        } else {
          console.log("No accounts found");
        }
        console.log(accounts);
      });
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const connectToWallet = async () => {
    try {
      if (!window.ethereum)
        throw new Error("Celo wallet extension not detected");

      await window.ethereum.enable({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to connect to Celo wallet");
    }
  };

  const assignRole = async (address, role) => {
    try {
      await contract.methods
        .assignRole(address, role)
        .send({ from: currentAccount, gasLimit: 3000000 });
      setRole(role);

      alert(`Role assigned to ${address} successfully!`);
    } catch (error) {
      console.error(error);
    }
  };

  const manufactureItem = async (itemName, itemPrice, manufacturerName) => {
    try {
      await contract.methods
        .manufactureItem(itemName, itemPrice, manufacturerName)
        .send({ from: currentAccount, gasLimit: 3000000 });
      const itemCount = await contract.methods.itemCount().call();
      const newItem = await contract.methods.items(itemCount).call();
      setItemCount(itemCount);
      setItems([...items, newItem]);
    } catch (error) {
      console.error(error);
    }
  };

  const shipToDistributor = async (itemId, distributorAddress) => {
    try {
      await contract.methods
        .shipItemToDistributor(itemId, distributorAddress)
        .send({ from: currentAccount, gasLimit: 3000000 });
      const updatedItem = await contract.methods.items(itemId).call();
      const updatedItems = [...items];
      updatedItems[itemId - 1] = updatedItem;
      setItems(updatedItems);

      alert(`Item shipped successfully to ${distributorAddress}`);
    } catch (error) {
      alert("Attempt to ship item failed");
    }
  };

  const shipToRetailer = async (itemId, retailerAddress) => {
    try {
      await contract.methods
        .shipItemToRetailer(itemId, retailerAddress)
        .send({ from: currentAccount, gasLimit: 3000000 });
      const updatedItem = await contract.methods.items(itemId).call();
      const updatedItems = [...items];
      updatedItems[itemId - 1] = updatedItem;
      setItems(updatedItems);

      alert(`Item shipped successfully to ${retailerAddress}`);
    } catch (error) {
      alert("Attempt to ship item failed");
    }
  };

  const sellItem = async (itemId, customerName) => {
    try {
      await contract.methods
        .sellItem(itemId, customerName)
        .send({ from: currentAccount, gasLimit: 3000000 });
      console.log(trackItem);
      alert(
        `Item with ID ${itemId} has been sold to ${customerName} successfully`
      );
    } catch (error) {
      console.error(error);
      alert(`Error occurred while selling item with ID ${itemId}`);
    }
  };

  const trackItem = async (itemId) => {
    try {
      const item = await contract.methods.items(itemId).call();
      console.log(`Item with ID ${itemId}:`, item);

      // Format the item information for better readability
      const formattedItem = formatItem(item);

      // Display the formatted item information as an alert
      alert(`Item with ID ${itemId}:\n${formattedItem}`);

      return item;
    } catch (error) {
      console.error(
        `Error occurred while fetching item with ID ${itemId}:`,
        error
      );
      return null;
    }
  };
  function formatItem(item) {
    const formattedItem = `
  	Name: ${item.name}
  	Price: ${item.price}
  	State: ${item.state}
  	Manufacturer: ${item.manufacturer[2]} (Address: ${item.manufacturer[0]}, ID: ${item.manufacturer[1]})
  	Distributor: ${item.distributor[2]} (Address: ${item.distributor[0]}, ID: ${item.distributor[1]})
  	Retailer: ${item.retailer[2]} (Address: ${item.retailer[0]}, ID: ${item.retailer[1]})
  	Customer: ${item.customer[2]} (Address: ${item.customer[0]}, ID: ${item.customer[1]})
	`;
    return formattedItem;
  }

  useEffect(() => {
    if (currentAccount) {
      initContract();
    }
  }, [currentAccount, initContract]);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome
          connectToWallet={connectToWallet}
          currentAccount={currentAccount}
        />
      </div>
      <div className="container">
        <AssignRole
          formData={formData}
          assignRole={assignRole}
          handleChange={handleChange}
        />
        <ManufactureItem
          formData={formData}
          manufactureItem={manufactureItem}
          handleChange={handleChange}
        />
        <ShipToDistributor
          formData={formData}
          shipToDistributor={shipToDistributor}
          handleChange={handleChange}
        />
        <ShipToRetailer
          formData={formData}
          shipToRetailer={shipToRetailer}
          handleChange={handleChange} // This function should be already created in App.js
        />
        <SellItem
          formData={formData}
          sellItem={sellItem}
          handleChange={handleChange} // This function should be already created in App.js
        />
        <TrackItem
          formData={formData}
          trackItem={trackItem}
          handleChange={handleChange} // This function should be already created in App.js
        />
      </div>
    </div>
  );
}
export default App;
```

There you go, our Dapp is ready.

## Conclusion​

In conclusion, this tutorial has just provided a basic framework for implementing a supply chain management system on the Celo blockchain. The contract defines roles for various actors in the supply chain and states for items, and includes functions for manufacturing items, shipping them to distributors and retailers, selling them to customers, and tracking their states. The use of Celo blockchain provides a transparent and immutable record of the supply chain, making it more secure and trustworthy. By using this contract as a foundation, developers can build more complex supply chain systems that can be used across a wide range of industries.

## Next Steps​

- [Web3.js Documentation](https://web3js.readthedocs.io/en/v1.8.2/web3-eth.html)
- [Solidity Documentation](https://docs.soliditylang.org/_/downloads/en/latest/pdf/)
- [Contract Kit](https://docs.celo.org/developer/contractkit)

## About the Author​

Emiri Udogwu, a licensed medical doctor with a burning passion for technology and gifted with skills for spreading knowledge and propagating ideas. A web3 and frontend developer.

## References​

- [Web3.js Documentation](https://web3js.readthedocs.io/en/v1.8.2/web3-eth.html)
- [Solidity Documentation](https://docs.soliditylang.org/_/downloads/en/latest/pdf/)
- [Contract Kit](https://docs.celo.org/developer/contractkit)
