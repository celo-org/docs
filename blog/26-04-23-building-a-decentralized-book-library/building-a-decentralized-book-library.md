---
title: Building a Decentralized Book Library
description: This tutorial teaches how tobuild a decentralized book library
authors:
  - name: Emiri Udogwu
    title: Tech Ethusiast, Smart Contract Developer
    url: https://github.com/emiridbest
    image_url: https://avatars.githubusercontent.com/u/6362475?v=4
tags: [celosage, celo, intermediate]
hide_table_of_contents: true
slug: /tutorials/building-a-decentralized-book-library
---

![header](../../src/data-tutorials/showcase/intermediate/building-a-decentralized-book-library.png)

## Introduction​

In the age of digital transformation, the way we access and consume information is rapidly evolving. Traditional libraries, with their centralized control and restricted access, face numerous challenges in adapting to the digital landscape. As a result, the emergence of decentralized libraries would be a viable solution to promote improved access to information, preserve cultural heritage, and ensure data privacy. This article will provide an in-depth guide on building a decentralized library by exploring key concepts such as blockchain technology and distributed storage. By understanding the importance and potential of decentralized libraries, we can work together to create a more open and inclusive future for knowledge sharing.
In this article, we will explore how `Celo`, a blockchain platform focused on financial inclusion and decentralized governance, and `Pinata`, a popular decentralized storage solution based on the InterPlanetary File System (IPFS), can be combined to create a robust, accessible, and secure decentralized library. By understanding the potential of these technologies and their synergistic applications, we can work together to build a more open and inclusive future for knowledge sharing.

You can clone this project on github by running:

```bash
git clone https://github.com/emiridbest/Library_Management_System.git
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
- [A Pinata account](https://app.pinata.cloud)

## Let’s Begin…

This is what our Dapp will look like:

![library](https://user-images.githubusercontent.com/6362475/234569964-4886a018-f4f1-4acf-a253-cbcf9f222b3b.png)

- Step 1: Write your Voting Smart Contract and Deploy on Remix IDE

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Library {
   struct Book {
       uint id;
       string title;
       string author;
       string pinataCid; // Pinata CID for the PDF file
       uint availableCopies;
       address borrower;
   }

   Book[] private bookList;

   mapping(uint => address) public owner;

   event BookAdded(address recipient, uint bookId);
   event BookBorrowed(address borrower, uint bookId);
   event BookReturned(address borrower, uint bookId);

   //function to add a new book
   function addBook(
       string memory title,
       string memory author,
       string memory pinataCid,
       uint availableCopies
   ) public {
       uint bookId = bookList.length;
       bookList.push(
           Book(bookId, title, author, pinataCid, availableCopies, address(0))
       );
       owner[bookId] = msg.sender;
       emit BookAdded(msg.sender, bookId);
   }

   //function to retrieve the list of all the book
   function getAllBooks() public view returns (Book[] memory) {
       return bookList;
   }

   //function to borrow a  book
   function borrowBook(uint bookId) public {
       require(bookId >= 0 && bookId < bookList.length, "Invalid Book ID");
       require(bookList[bookId].availableCopies > 0, "No available copies.");
       require(
           msg.sender != owner[bookId],
           "You cannot borrow your own book."
       );
       require(
           bookList[bookId].borrower != msg.sender,
           "You already borrowed this book."
       );

       bookList[bookId].borrower = msg.sender;
       bookList[bookId].availableCopies--;
       emit BookBorrowed(msg.sender, bookId);
   }


   //function to get the total number of books we have
   function getBookCount() public view returns (uint256) {
       return bookList.length;
   }


   //function to return a borrowed  book
   function returnBook(uint bookId) public {
       require(bookId >= 0 && bookId < bookList.length, "Invalid Book ID");
       require(
           bookList[bookId].borrower == msg.sender,
           "You didn't borrow this book"
       );


       bookList[bookId].borrower = address(0);
       bookList[bookId].availableCopies++;


       emit BookReturned(msg.sender, bookId);
   }


   //function to get the list of all the books we borrowed
   function readingList(address user) public view returns (uint[] memory) {
       uint count = 0;


       for (uint i = 0; i < bookList.length; i++) {
           if (bookList[i].borrower == user) {
               count++;
           }
       }


       uint[] memory borrowedBookIds = new uint[](count);
       count = 0;
       for (uint i = 0; i < bookList.length; i++) {
           if (bookList[i].borrower == user) {
               borrowedBookIds[count] = i;
               count++;
           }
       }


       return borrowedBookIds;
   }


   //function to retrieve a particular book and its content from our decetralized storage
   function getBookCID(uint bookId) public view returns (string memory) {
       require(bookId >= 0 && bookId < bookList.length, "Invalid Book ID");


       Book storage book = bookList[bookId];
       return book.pinataCid;
   }
}
```

Now, we compile this contract then deploy on Injected web3 provider. This pops up our already install metamask wallet, make sure to choose Alfajores containing wallet. On deploying, a link to Alfajores Explorer pops up at the top of your browser.YOu can now copy out your contract address and save it somewhere as web3.js needs this address to interact with this particular contract. Also, go back to remix and copy out you contract ABI save it somewhere.

## Now Let’s code the frontend:

- Step 2: Set up your new react project.

Run this on your terminal

```bash
npx create-react-app library
```

This should take a few minutes to complete depending on your internet connection. Navigate to the directory created Open the directory using your code editor. In this case, it would be vscode and you would run this on your terminal

```bash
Code library
```

This should open a vscode window with the supplyChain directory.

- Step 3: Update package.json file.

Now, update the content of the `package.json` by copying and pasting this;

```json
{
  "name": "library",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@celo-tools/use-contractkit": "^3.1.0",
    "@celo/contractkit": "^1.5.1",
    "@pinata/sdk": "^2.1.0",
    "@testing-library/jest-dom": "^5.16.1",
    "@testing-library/react": "^12.1.2",
    "@testing-library/user-event": "^13.5.0",
    "@web3uikit/core": "^0.2.45",
    "@web3uikit/web3": "^0.2.2",
    "blob-to-buffer": "^1.2.9",
    "react": "^18.2.0",
    "react-bootstrap": "^2.5.0",
    "react-dom": "^18.2.0",
    "react-error-overlay": "6.0.9",
    "react-scripts": "4.0.3",
    "web-streams-polyfill": "^3.2.1",
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

## Update the App.js file

This is the file that will contain codes that interact with our smart contract and also house all the components of the frontend. The `App.js` file should look like this:

```js
import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import "./App.css";
import { contractABI, contractAddress } from "./utils/const";
import {
  Navbar,
  Welcome,
  AddBook,
  BookList,
  ReadingList,
} from "./components/Index";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [books, setBooks] = useState([]);
  const [bookCount, setBookCount] = useState(0);
  const [contract, setContractInstance] = useState(null);
  const [kit, setKit] = useState(null);
  const [userBorrowedBooks, setUserBorrowedBooks] = useState([]);
  const [bookCIDs, setBookCIDs] = useState([]);
  const [selectedCID, setSelectedCID] = useState("");

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
  useEffect(() => {
    checkIfWalletIsConnected();
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

  const addBook = async (title, author, pinataCid, availableCopies) => {
    try {
      console.log(
        "title:",
        title,
        "author:",
        author,
        "pinataCid:",
        pinataCid,
        "availableCopies:",
        availableCopies
      );

      await contract.methods
        .addBook(title, author, pinataCid, availableCopies)
        .send({ from: currentAccount, gasLimit: 2000000 });

      const bookCount = await contract.methods.getBookCount().call();
      setBookCount(bookCount);

      const newBook = await contract.methods.getAllBooks().call();
      setBooks([...books, newBook]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBooks = async () => {
    try {
      if (!contract) return;
      const bookCount = await contract.methods.getBookCount().call();
      const booksArray = await contract.methods.getAllBooks().call();

      setBooks(booksArray);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [contract]);

  const borrowBook = async (bookId) => {
    try {
      await contract.methods
        .borrowBook(bookId)
        .send({ from: currentAccount, gasLimit: 2000000 });
      const updateBooks = books.map((book) => {
        if (book.id === bookId) {
          return { ...book, availableCopies: book.availableCopies - 1 };
        }
        return book;
      });
      setBooks(updateBooks);
    } catch (error) {
      console.error("Error borrowing the book:", error);
    }
  };

  const readingList = async () => {
    try {
      const borrowedBooks = await contract.methods
        .readingList(currentAccount)
        .call();
      setUserBorrowedBooks(borrowedBooks);
    } catch (error) {
      console.error("Error fetching reading list:", error);
    }
  };
  useEffect(() => {
    if (currentAccount && contract) {
      readingList();
    }
  }, [currentAccount, contract, readingList]);

  const getBookCIDs = async () => {
    const bookCIDs = await Promise.all(
      userBorrowedBooks.map(async (bookId) => {
        const pinataCid = await contract.methods.getBookCID(bookId).call();

        return { bookId, pinataCid };
      })
    );

    setBookCIDs(bookCIDs);
  };

  useEffect(() => {
    if (userBorrowedBooks.length > 0) {
      getBookCIDs();
    }
  }, [userBorrowedBooks]);

  const openPDF = (pinataCid) => {
    setSelectedCID(pinataCid);
  };

  const returnBook = async (bookId) => {
    try {
      await contract.methods
        .returnBook(bookId)
        .send({ from: currentAccount, gasLimit: 200000 });
      const updatedBooks = books.map((book) => {
        if (book.id === bookId) {
          return { ...book, availableCopies: book.availableCopies + 1 };
        }
        return book;
      });
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error returning the book:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome
          connectToWallet={connectToWallet}
          currentAccount={currentAccount}
        />
      </div>
      <AddBook addBook={addBook} />
      <BookList
        books={books}
        borrowBook={borrowBook}
        readingList={readingList}
      />
      <ReadingList
        borrowedBooks={userBorrowedBooks}
        bookCIDs={bookCIDs}
        openPDF={openPDF}
        selectedCID={selectedCID}
        returnBook={returnBook}
      />
    </div>
  );
}
export default App;
```

#### Now let’s break this down;

- Step 6: Import all dependencies

```js
import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import "./App.css";
import { contractABI, contractAddress } from "./utils/const";

import {
 Navbar,
 Welcome,
 AddBook,
 BookList,
 ReadingList,
} from "./components/Index";
...
```

Here, we imported all the dependencies and then also imported our `contractABI` and `contractAddress` which we save earlier when we deployed our contract. This serves as the link between our frontend and the already deployed contract.

We also imported the react components which we will be seeing more of in this tutorial.

- Step 7: Let’s use useState to keep track of some variables throughout the dapp.

```js
...
function App() {
 const [currentAccount, setCurrentAccount] = useState("");
 const [books, setBooks] = useState([]);
 const [bookCount, setBookCount] = useState(0);
 const [contract, setContractInstance] = useState(null);
 const [kit, setKit] = useState(null);
 const [userBorrowedBooks, setUserBorrowedBooks] = useState([]);
 const [bookCIDs, setBookCIDs] = useState([]);
 const [selectedCID, setSelectedCID] = useState("");
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
 useEffect(() => {
   checkIfWalletIsConnected();
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
...
```

The above 3 functions serves very vital purpose in our dapp interaction with the network.
The `initContract` function is responsible for initializing a Celo contract by creating a new instance of the Web3 library, requesting permission to access the user's account, and setting the current account and contract instance. This function is typically called once during the initialization of the app. We also need to add the associated useEffect hooks for the `initContract` function to ensure that function are called once only when a currentAccount is available

The `checkIfWalletIsConnected` function is used to check if the wallet extension is installed and retrieve the current account information. This function can be called at any point in the app to check if the user is still connected to their Celo wallet extension. The useEffect hook also calls the `checkIfWalletIsConnected` function when the component mounts to check if there is a wallet connected to the app.

The `connectToWallet` function is used to connect to the wallet extension by requesting permission to access the user's account and retrieving the current account information. This function is typically called when the user initiates an action that requires access to their Celo account.

- Step 9: Create functions to call our smart contract functions

The `addBook` function:

```js
...
const addBook = async (title, author, pinataCid, availableCopies) => {
   try {
     console.log(
       "title:",
       title,
       "author:",
       author,
       "pinataCid:",
       pinataCid,
       "availableCopies:",
       availableCopies
     );

     await contract.methods
       .addBook(title, author, pinataCid, availableCopies)
       .send({ from: currentAccount, gasLimit: 2000000 });

     const bookCount = await contract.methods.getBookCount().call();
     setBookCount(bookCount);


     const newBook = await contract.methods.getAllBooks().call();
     setBooks([...books, newBook]);
   } catch (error) {
     console.error(error);
   }
 };
...
```

The `addBook` function is an asynchronous function for adding a book record to the EVM. Note that only the book record is added to the EVM as we wouldn’t want to clog the EVM with so files hence the need for a decentralized storage. We shall be delving into how the book is stored in the `AddBook` component.
It takes four arguments: `title`, `author`, `pinataCid`, and `availableCopies`. The function sends a transaction to call the `addBook` method of the smart contract, updates the book count, and retrieves all books, including the newly added one. If an error occurs, it is caught and logged to the console.

The `fetchBook` function

```js
...
const fetchBooks = async () => {
   try {
     if (!contract) return;
     const bookCount = await contract.methods.getBookCount().call();
     const booksArray = await contract.methods.getAllBooks().call();

     setBooks(booksArray);
   } catch (error) {
     console.error("Error fetching books:", error);
   }
 };

 useEffect(() => {
   fetchBooks();
 }, [contract]);
...
```

This function is called whenever the contract mounts. It calls the `getBookCount` method of the contract to get the number of books stored on the blockchain, then calls the `getAllBooks` method of the contract to retrieve an array of all books.

It updates the state of the component by returning the total list of books already added to the library.

The `borrowBook` function

```js
...

 const borrowBook = async (bookId) => {
   try {
     await contract.methods
       .borrowBook(bookId)
       .send({ from: currentAccount, gasLimit: 2000000 });
     const updateBooks = books.map((book) => {
       if (book.id === bookId) {
         return { ...book, availableCopies: book.availableCopies - 1 };
       }
       return book;
     });
     setBooks(updateBooks);
   } catch (error) {
     console.error("Error borrowing the book:", error);
   }
 };
...
```

The `returnBook` function

```js
...
const returnBook = async (bookId) => {
   try {
     await contract.methods
       .returnBook(bookId)
       .send({ from: currentAccount, gasLimit: 200000 });
     const updatedBooks = books.map((book) => {
       if (book.id === bookId) {
         return { ...book, availableCopies: book.availableCopies + 1 };
       }
       return book;
     });
     setBooks(updatedBooks);
   } catch (error) {
     console.error("Error returning the book:", error);
   }
 };
...
```

The `readingList` function

```js
...
const readingList = async () => {
   try {
     const borrowedBooks = await contract.methods
       .readingList(currentAccount)
       .call();
     setUserBorrowedBooks(borrowedBooks);
   } catch (error) {
     console.error("Error fetching reading list:", error);
   }
 };
 useEffect(() => {
   if (currentAccount && contract) {
     readingList();
   }
 }, [currentAccount, contract, readingList]);
...
```

This function is called to return all the books borrowed by a particular user` currently interacting with the contract.

It does this by making a call to the smart contract using the `contract.methods.readingList(currentAccount).call()` method. This retrieves the borrowed books for the given `currentAccount`. When the data is retrieved successfully, it updates the state with the borrowed books using the setUserBorrowedBooks(borrowedBooks) function.

The `getBookCIDs` function

```js
...
const getBookCIDs = async () => {
   const bookCIDs = await Promise.all(
     userBorrowedBooks.map(async (bookId) => {
       const pinataCid = await contract.methods.getBookCID(bookId).call();

       return { bookId, pinataCid };
     })
   );

   setBookCIDs(bookCIDs);
 };

 useEffect(() => {
   if (userBorrowedBooks.length > 0) {
     getBookCIDs();
   }
 }, [userBorrowedBooks]);

 const openPDF = (pinataCid) => {
   setSelectedCID(pinataCid);
 };
...
```

The purpose of this code is to fetch Book Content Identifiers (CIDs) from the smart contract and store them in the component state. It also includes a function to open PDF files using the fetched CIDs.

The `getBookCIDs` function retrieves CIDs for each book in the `userBorrowedBooks` array.

And with the `openPdf` function, we are able to open a pdf file retrieve by its CID from IPFS.

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
     <AddBook addBook={addBook} />
     <BookList
       books={books}
       borrowBook={borrowBook}
       readingList={readingList}
     />
     <ReadingList
       borrowedBooks={userBorrowedBooks}
       bookCIDs={bookCIDs}
       openPDF={openPDF}
       selectedCID={selectedCID}
       returnBook={returnBook}
     />
   </div>
 );
}
export default App;
```

- Step 11: Create the Component and the import them into App.js To do this we have to create a new folder called `components` in the `src` folder.

### AddBook.js

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
    step="1"
    value={value}
    onChange={(e) => handleChange(e)}
    className="white-glassmorphism"
  />
);

const AddBook = ({ addBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [availableCopies, setAvailableCopies] = useState("");
  const [pinataCid, setPinataCid] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "availableCopies":
        setAvailableCopies(value);
        break;
      default:
        break;
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
    if (!title || !author || !pinataCid || !availableCopies) return;

    addBook(title, author, pinataCid, availableCopies);
  };

  return (
    <div className="white-glassmorphism">
      <div className="blue-glassmorphism">
        <Input
          placeholder="Book Title"
          name="title"
          type="text"
          value={title}
          handleChange={handleChange}
        />
        <Input
          placeholder="Book Author"
          name="author"
          type="text"
          value={author}
          handleChange={handleChange}
        />
        <Input
          placeholder="Number of Copies"
          name="availableCopies"
          type="number"
          value={availableCopies}
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
        Add Book
      </button>
    </div>
  );
};

export default AddBook;
```

The `handleFileChange` function handles the file input change event, uploads the selected PDF file to IPFS using the Pinata API, and updates the pinataCid state variable.

We also need to generate and parse our `pinataApiKey`, `pinataSecretApiKey` correctly to authenticate the API call.

### BookList.js

```js
import React from "react";

const BookList = ({ books, borrowBook, readingList }) => {
  // The function that handles borrowing a book and updating the reading list
  const handleBorrowBook = async (bookId) => {
    try {
      // Call the borrowBook function and wait for it to complete
      await borrowBook(bookId);

      // After successfully borrowing the book, update the reading list
      await readingList();
    } catch (error) {
      console.error(
        "Error borrowing the book and updating the reading list:",
        error
      );
    }
  };

  return (
    <div className="books">
      <h2> Book List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Available Copies</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.availableCopies}</td>
              <td>
                <button onClick={() => handleBorrowBook(book.id)}>
                  Borrow Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
```

### ReadingList.js

```js
import React from "react";

const ReadingList = ({
  bookCIDs = [],
  openPDF,
  selectedCID,
  returnBook,
  borrowedBooks,
}) => {
  return (
    <div>
      <h2> Reading List</h2>
      {borrowedBooks?.map((bookId, index) => {
        const bookCID = bookCIDs.find((book) => book.bookId === bookId);
        return (
          <div key={index}>
            <button onClick={() => openPDF(bookCID.pinataCid)}>
              Open Book {bookId}
            </button>
            <button onClick={() => returnBook(bookId)}>
              Return Book {bookId}
            </button>
          </div>
        );
      })}
      {selectedCID && (
        <iframe
          title="PDF Viewer"
          src={`https://gateway.pinata.cloud/ipfs/${selectedCID}`}
          width="100%"
          height="600"
        />
      )}
    </div>
  );
};
export default ReadingList;
```

### Navbar.js

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
          {[
            "About Us",
            "Mission",
            "FAQ",
            "Partners",
            "Contact",
            "Return Policy",
            "Terms of Use",
          ].map((item, index) => (
            <NavbarItem key={item + index} title={item} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
```

### Welcome.js

```js
import React from "react";

const Welcome = ({ connectToWallet, currentAccount }) => {
  return (
    <div>
      <div>
        <h1 className="text-gradient">
          Borrow all the Books <br />
          You Ever Wanted
        </h1>
        <p className="text-gradient ">
          Explore The World Of Peer2Peer Library Management
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

Now, let’s bundle all the components into one file in the component folder so we can batch export them as one;

### Index.js

```js
export { default as Welcome } from "./Welcome";
export { default as Navbar } from "./Navbar";
export { default as BookList } from "./BookList";
export { default as AddBook } from "./AddBook";
export { default as ReadingList } from "./ReadingList";
```

There you go, our Dapp is ready.

Here is [Source Code](https://github.com/emiridbest/Library_Management_System.git)

## Conclusion​

In conclusion, this tutorial has provided a solid foundation for creating a library management system on the Celo blockchain. By following the steps outlined in this tutorial, you can design and implement a secure and decentralized library system that can offer various benefits such as transparency, immutability, and easy tracking of books and patrons.

## Next Steps​

- One possible next step for the platform could be to introduce a subscription model or payable functions that would allow authors to earn revenue from renting out their books.
- Additionally, incorporating timing functions could encourage timely returns of books, ensuring that other users have access to them as well.

## About the Author​

Emiri Udogwu, a licensed medical doctor with a burning passion for technology and gifted with skills for spreading knowledge and propagating ideas. A web3 and frontend developer.

## References​

- [Web3.js Documentation](https://web3js.readthedocs.io/en/v1.8.2/web3-eth.html)
- [Solidity Documentation](https://docs.soliditylang.org/_/downloads/en/latest/pdf/)
- [Contract Kit](https://docs.celo.org/developer/contractkit)
- [Pinata](https://app.pinata.cloud)
