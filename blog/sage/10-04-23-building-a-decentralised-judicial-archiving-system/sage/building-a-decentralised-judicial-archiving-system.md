---
title: Building A Decentralised Judicial Archiving System
description: This tutorial teaches how you can create a decentralised application for  managing judicial archives
authors:
  - name: Emiri Udogwu
    title: Tech Ethusiast, Smart Contract Developer 
    url: https://github.com/emiridbest
    image_url: https://avatars.githubusercontent.com/u/6362475?v=4
tags: [celosage, celo, intermediate]
hide_table_of_contents: true
slug: /tutorials/building-a-decentralised-judicial-archiving-system
---

![header](../../src/data-tutorials/showcase/intermediate/building-a-decentralised-judicial-archiving-system.png)

## Introduction​

A decentralized judicial archiving system is a type of blockchain-based system that enables the secure and transparent storage of legal documents and records. By utilizing blockchain technology, the system provides a tamper-proof and decentralized database that can be accessed by authorized parties from anywhere in the world. The decentralized nature of the system ensures that all records are stored in a distributed network of nodes, preventing data loss or manipulation. With a decentralized judicial archiving system, legal professionals, judges, and other authorized parties can access legal documents quickly and easily, increasing efficiency and transparency in the judicial process. Additionally, the system provides a secure and transparent method of storing and sharing sensitive legal information, reducing the risk of fraud and corruption. 
In this tutorial we shall be looking at code examples and a step by step guide to setting up a simple archiving system.

## Prerequisite

   - Node.js should be installed along with a node package manager(npm)
   - A basic understanding of Celo and smart contracts
   - A Celo Wallet address:
   - To create Alfajores wallet, go to Alfajores wallet
   - To get testnest funds, go to Celo faucet
   - A text editor such as Visual Studio Code installed on your computer
   - Remix IDE
   - Metamask
   - A Pinata account

You can clone this project on github by running:
```
git clone https://github.com/emiridbest/Judicial_Archiving_System.git
```

## Let’s Begin…
This is what our Dapp will look like:

![Judiciary](https://github.com/emiridbest/docs/assets/6362475/5c678065-2fbf-41de-ba31-1546ded0e5b9)

- Step 1: Write your Smart Contract and Deploy on Remix IDE

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Library {
    struct document {
        uint256 id;
        string title;
        string pinataCID; // Pinata CID for the PDF file
        uint256 timestamp;
    }

    enum Role {
        Owner,
        Admin,
        licencedUser
    }

    modifier onlyAdmin() {
        require(
            roles[msg.sender] == uint256(Role.Admin),
            "Only Admin can call this."
        );
        _;
    }

    modifier onlyOwner() {
        require(
            roles[msg.sender] == uint256(Role.Owner),
            "Only Owner can call this."
        );
        _;
    }

    mapping(address => uint256) public roles;
    mapping(address => uint256) public userCount;

    document[] private documentList;
    mapping(uint => address) public owner;
    uint256 public documentCount;

    event DocumentAdded(uint256 id, string title, string pinataCID, uint256 timestamp);
    event RoleAssigned(address user, string role);

    function assignRole(address user, string memory role) public onlyOwner {
        if (keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked("Admin"))) {
            roles[user] = uint256(Role.Admin);
        } else if (keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked("licencedUser"))) {
            roles[user] = uint256(Role.licencedUser);
        } else {
            revert("Invalid role");
        }
        emit RoleAssigned(user, role);
    }



    function addDocument(string memory title, string memory pinataCID, uint256 timestamp) public onlyAdmin {
        uint256 id = documentList.length;
        documentList.push(document(id, title, pinataCID, timestamp));
        owner[id] = msg.sender;
        emit DocumentAdded(id, title, pinataCID, timestamp);
    }

    function getAllDocuments() public view returns (document[] memory) {
        return documentList;
    }

    function getDocument(uint256 id) public view returns (document memory) {
        return documentList[id];
    }
}
```



Now, we compile this contract then deploy on Injected web3 provider. This pops up our already install metamask wallet, make sure to choose Alfajores containing wallet. On deploying, a link to Alfajores Explorer pops up at the top of your browser. You can now copy out your contract address and save it somewhere as web3.js needs this address to interact with this particular contract. Also, go back to remix and copy out you contract ABI save it somewhere.

## Now Let’s code the frontend:

- Step 2: Set up your new react project.

Run this on your terminal

```bash
npx create-react-app legal
```

This should take a few minutes to complete depending on your internet connection. Navigate to the directory created Open the directory using your code editor. In this case, it would be vscode and you would run this on your terminal;

```bash
Code legal
```

This should open a vscode window with the legal directory.

- Step 3: Update package.json file.

Now, update the content of the `package.json` by copying and pasting this;

```json
{
  "name": "legal",
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
  },
  "resolutions": {
	"react-error-overlay": "6.0.9"
  }
}
```

Step 4: Install all dependencies

```bash
npm install
```

Step 5: Start development server

```bash
npm start
```

## Update the App.js file

This is the file that will contain codes that interact with our smart contract and also house all the components of the frontend. The App.js file should look like this:

```js
import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import "./App.css";
import { contractABI, contractAddress } from "./utils/const";
import {
  AddDocument,
  Archive,
  AssignRole,
  Navbar,
  Welcome,
} from "./components/Index";
import "./App.css";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [contract, setContractInstance] = useState(null);
  const [kit, setKit] = useState(null);
  const [formData, setFormData] = useState({ address: "", role: "" });
  const [role, setRole] = useState("");

  const [documents, setDocuments] = useState([]);

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
  }, [contractAddress]);

  useEffect(() => {
    if (currentAccount) {
      initContract();
    }
  }, [currentAccount, initContract]);

  //connect wallet
  async function connectToWallet() {
    try {
      if (!window.ethereum) throw new Error("Wallet extension not detected");

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("Please install Celo Wallet extension");
    }
  }

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  //assign role
  async function assignRole(address, role) {
    try {
      await contract.methods
        .assignRole(address, role)
        .send({ from: currentAccount, gasLimit: 3000000 });
      setRole(role);

      alert(`Role assigned to ${address} successfully!`);
    } catch (error) {
      console.error(error);
    }
  }

  //add document
  async function addDocument(title, pinataCID) {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const tx = await contract.methods
        .addDocument(title, pinataCID, timestamp)
        .send({ from: currentAccount });
      console.log(tx);
    } catch (error) {
      console.error("Error details:", error);
    }
  }

  //get document count
  async function getDocumentCount() {
    try {
      const count = await contract.methods.getDocumentCount().call();
      console.log(count);
    } catch (error) {
      console.log(error);
    }
  }

  //get document
  async function getDocument(id) {
    try {
      const document = await contract.methods.getDocument(id).call();
      console.log(document);
      const url = "https://ipfs.io/ipfs/" + document.pinataCID;
      window.open(url, "_blank");
    } catch (error) {
      console.log(error);
    }
  }

  //get documents
  async function getAllDocuments() {
    try {
      const documents = await contract.methods.getAllDocuments().call();
      console.log(documents);
      setDocuments(documents); // Update the state here
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="">
        <Welcome
          connectToWallet={connectToWallet}
          currentAccount={currentAccount}
        />
      </div>
      <div className="components">
        <AssignRole
          formData={formData}
          assignRole={assignRole}
          handleChange={handleChange}
        />
        <AddDocument
          formData={formData}
          addDocument={addDocument}
          handleChange={handleChange}
        />
        <Archive
          documents={documents}
          getDocumentCount={getDocumentCount}
          getAllDocuments={getAllDocuments}
          getDocument={getDocument}
        />
      </div>
    </div>
  );
}

export default App;
```

Now let’s break this down;

   - Step 6: Import all dependencies

```js
import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import "./App.css";
import { contractABI, contractAddress } from "./utils/const";
import {
  AddDocument,
  Archive,
  AssignRole,
  Navbar,
  Welcome,
} from "./components/Index";
import "./App.css";
...
```

Here, we imported all the dependencies and then also imported our `contractABI` and `contractAddress` which we save earlier when we deployed our contract. This serves as the link between our frontend and the already deployed contract.

We also imported the react components which we will be seeing more of in this tutorial.

- Step 7: Let’s use useState to keep track of some variables throughout the dapp.

```js
...
  const [currentAccount, setCurrentAccount] = useState("");
  const [contract, setContractInstance] = useState(null);
  const [kit, setKit] = useState(null);
  const [formData, setFormData] = useState({ address: "", role: "" });
  const [role, setRole] = useState("");
  const [documents, setDocuments] = useState([]);
  ...
  ```
- Step 8: Create functions for connecting to the network

```js
...
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
  }, [contractAddress]);

  useEffect(() => {
    if (currentAccount) {
      initContract();
    }
  }, [currentAccount, initContract]);

  //connect wallet
  async function connectToWallet() {
    try {
      if (!window.ethereum) throw new Error("Wallet extension not detected");

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("Please install Celo Wallet extension");
    }
  }
...
```

The `initContract` is a function that initializes a contract instance and sets the currentAccount and kit state variables. It uses the useCallback hook to memoize the function and the async/await syntax to handle asynchronous calls to the Celo blockchain. initContract takes no arguments, but it depends on the contractAddress state variable.

`connectToWallet` is a function that connects to the Celo Wallet extension using the window.ethereum object. It sets the currentAccount state variable if the connection is successful. If the extension is not detected or if an error occurs, an error message is logged and an error is thrown.

- Step 9: Create functions to call our smart contract functions

The `assignRole` function

```js
 async function assignRole(address, role) {
    try {
      await contract.methods
        .assignRole(address, role)
        .send({ from: currentAccount, gasLimit: 3000000 });
      setRole(role);

      alert(`Role assigned to ${address} successfully!`);
    } catch (error) {
      console.error(error);
    }
  }
  ...
  ```
  
  It takes two inputs: `address`  and `role`.

  The function asks the blockchain to update the user's role, using the `assignRole` command.
  
The `addDocument` function

```js
...
 async function addDocument(title, pinataCID) {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const tx = await contract.methods
        .addDocument(title, pinataCID, timestamp)
        .send({ from: currentAccount });
      console.log(tx);
    } catch (error) {
      console.error("Error details:", error);
    }
  }
...
```

This function takes two inputs: `title` and `pinataCID`for storing files on IPFS).

It generates a timestamp representing the current time.

Then, it sends a transaction to the blockchain using a contract method named `addDocument`. This transaction requests the blockchain to add the provided document details.

- Other Functions

```js
...
  //get document count
  async function getDocumentCount() {
    try {
      const count = await contract.methods.getDocumentCount().call();
      console.log(count);
    } catch (error) {
      console.log(error);
    }
  }

  //get a document
  async function getDocument(id) {
    try {
      const document = await contract.methods.getDocument(id).call();
      console.log(document);
      const url = "https://ipfs.io/ipfs/" + document.pinataCID;
      window.open(url, "_blank");
    } catch (error) {
      console.log(error);
    }
  }

  //get a list of all the documents
  async function getAllDocuments() {
    try {
      const documents = await contract.methods.getAllDocuments().call();
      console.log(documents);
      setDocuments(documents); // Update the state here
    } catch (error) {
      console.log(error);
    }
  }
  ...
  ```
  
- Step 10: Renders a user interface with various sub-components

```js
...
 return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="">
        <Welcome
          connectToWallet={connectToWallet}
          currentAccount={currentAccount}
        />
      </div>
      <div className="components">
        <AssignRole
          formData={formData}
          assignRole={assignRole}
          handleChange={handleChange}
        />
        <AddDocument
          formData={formData}
          addDocument={addDocument}
          handleChange={handleChange}
        />
        <Archive
          documents={documents}
          getDocumentCount={getDocumentCount}
          getAllDocuments={getAllDocuments}
          getDocument={getDocument}
        />
      </div>
    </div>
  );
}

export default App;
```

- Step 11: Create the Components and the import them into `App.js`. To do this we have to create a new folder called components in the src folder.

### AssignRole.js

```js
import React from "react";

const Input = ({ placeholder, name, type, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    name={name} // Add the 'name' attribute here
    onChange={(e) => handleChange(e, name)}
    className=""
  />
);

const AssignRole = ({ formData, assignRole, handleChange }) => {
  const handleSubmit = (e) => {
    const { address, role } = formData;
    e.preventDefault();
    if (!address || !role) return;
    console.log("Submitting:", formData); // Add a console log here to see the formData
    assignRole(address, role);
  };

  return (
    <div className="add">
      <label className="">Roles</label>

      <div className="">
        <Input
          placeholder="Address"
          name="address"
          type="text"
          handleChange={handleChange}
        />
        <select
          name="role"
          onChange={(e) => handleChange(e, "role")}
          className="role"
        >
          <option value="Admin">Admin</option>
          <option value="licencedUser">licencedUser</option>
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

### AddDocument.js

```js
import React, { useState } from "react";

const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;
const pinataSecretApiKey = process.env.REACT_APP_PINATA_API_SECRET;

const Input = ({ placeholder, name, type, value, handleChange, id }) => (
  <input
    id={id}
    name={name}
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => handleChange(e)}
    className=""
  />
);

const AddDocument = ({ addDocument }) => {
  const [title, setTitle] = useState("");
  const [pinataCid, setPinataCid] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      default:
        console.error(`Invalid input field name: ${name}`);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("pinataMetadata", JSON.stringify({ name: file.name }));
    formData.append("pinataOptions", JSON.stringify({ cidVersion: 0 }));

    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
        body: formData,
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log("File added to IPFS with CID:", result.IpfsHash);
      setPinataCid(result.IpfsHash);
    } else {
      console.error("Error uploading file to IPFS:", response.status);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !pinataCid) return;

    addDocument(title, pinataCid);
  };

  return (
    <div className="add">
            <label className="">Add Document</label>

      <div className="">
        <Input
          placeholder="Documment Title"
          name="title"
          type="text"
          value={title}
          handleChange={handleChange}
        />
        <input
          placeholder="pdf here"
          type="file"
          id="pdfFileInput"
          accept="application/pdf"
          onChange={handleFileChange}
          className="white-glassmorphism"
        />
      </div>
      <div />
      <button type="button" onClick={handleSubmit}>
        Add Document
      </button>
    </div>
  );
};

export default AddDocument;
```

### Archive.js

```js
import React from "react";

const Archive = ({ documents, getAllDocuments, getDocument }) => {
  const handleGetDocuments = async () => {
    try {
      await getAllDocuments();
    } catch (error) {
      console.error("Error retrieving document list:", error);
    }
  };

  return (
    <div className="docs">
      <h2>Document List</h2>
      <button onClick={handleGetDocuments}>Refresh List</button>
      <table>
        <thead>
          <tr>
            <th>Document ID</th>
            <th>Title</th>
            <th>Document Identifier</th>
            <th>Time Modified</th>
          </tr>
        </thead>
        <tbody>
          {documents &&
            Array.isArray(documents) &&
            documents.map((document, index) => (
              <tr key={index}>
                <td>{document.id}</td>
                <td>{document.title}</td>
                <td>{document.pinataCID}</td>
                <td>{new Date(document.timestamp * 1000).toLocaleString()}</td>
                <td>
                  <button onClick={() => getDocument(document.id)}>
                    Retrieve document
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Archive;
```

### Welcome.js

```js
import React from "react";

const Welcome = ({ connectToWallet, currentAccount }) => {
  return (
    <div>
      <div className="welcome">
        <h1 className="">
          Retrieve all the Documents <br />
          You Ever Wanted
        </h1>
        <p className="">Explore The World Of Decentralized Judicial Archives</p>
      </div>
      <div className="connect">
        {!currentAccount && (
          <button type="button" onClick={connectToWallet}>
            <p className="button"> Connect Wallet</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default Welcome;
```

### Navbar.js

```js
import React from "react";

import logo from "./logo512.png";

const NavbarItem = ({ title, classprops }) => <li>{title}</li>;

const Navbar = () => {
  return (
    <div className="nav">
      <nav className="navbar">
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

Now, let’s bundle all the components into one file in the component folder so we can batch export them as one;

### Index.js

```js
export { default as Welcome } from "./Welcome";
export { default as Navbar } from "./Navbar";
export { default as AssignRole } from "./AssignRole";
export { default as AddDocument } from "./AddDocument";
export { default as Archive } from "./Archive";
```



  There you go, our Dapp is ready.

Here is [Source Code](https://github.com/emiridbest/Judicial_Archiving_System.git)

## Conclusion​

In conclusion, this tutorial has shown how to use Jblockchain to implement a judicial archiving system. Mastering these skills will help you become adept at building decentralized applications, making the most of blockchain's security, transparency and reliability.

## Next Steps​

- One possible next step for the platform could be to introduce a subscription model or payable functions that would allow users to pay for retrieving documents.

## About the Author​

Emiri Udogwu, a licensed medical doctor with a burning passion for technology and gifted with skills for spreading knowledge and propagating ideas. A web3 and frontend developer.

## References​

    - [Web3.js Documentation](https://web3js.readthedocs.io/en/v1.8.2/web3-eth.html)
    - [Solidity Documentation](https://docs.soliditylang.org/_/downloads/en/latest/pdf/)
    - [Contract Kit](https://docs.celo.org/developer/contractkit)
    - [Pinata](https://docs.celo.org/developer/contractkit)

