---
title: Build A Decentralized Real Estate Marketplace On The Celo Blockchain Part 2
description: This is a two part tutorial. In this second part of the tutorial, you will learn how to Build the front end for the smart contract using react js.
authors:
  - name: Jonathan Iheme
    url: https://github.com/4undRaiser
    image_url: https://avatars.githubusercontent.com/u/87926451?s=96&v=4
tags: [celosage, react, celo, intermediate]
hide_table_of_contents: true
slug: /tutorials/build-a-decentralized-real-estate-marketplace-on-the-celo-blockchain-part-2
---

![header](../../src/data-tutorials/showcase/intermediate/build_a_decentralized_real_estate_marketplace_on_the_celo_blockchain_part_2.png)

## Introduction

In the first part of the tutorial, we went through a Solidity smart contract that represents a Real Estate Marketplace where properties can be registered, put up for sale, and purchased using Celo cUSD cryptocurrency. This contract is built using the OpenZeppelin library which provides pre-built Solidity contracts for secure smart contract development. The contract implements the ERC-721 standard for non-fungible tokens (NFTs) and uses the Ownable and Pausable contracts for additional security and control. In this part we will follow up and create a front end for our real estate marketplace.

Here’s a demo [link](https://zingy-pony-603f0a.netlify.app/) of what you’ll be creating.

## Prerequisites

To follow this tutorial, you will need the following:

- Solidity, smart-contract and blockchain concepts.
- Basic web Development.
- ReactJS.

## Requirements

- React.
- Bootstrap.
- NodeJS 12.0.1 upwards installed.
- Celo Extension Wallet.

## Front-end

Click on [this](https://github.com/4undRaiser/Celo-Tutorials/tree/main/Real-Estate-Marketplace) repo from your github.

- Clone the repo to your computer.
- open the project from from vscode.
- Run `npm install` command to install all the dependencies required to run the app locally.

### App.js

The completed code Should look like this.

```javascript
import "./App.css";
import Home from "./components/home";
import { Properties } from "./components/Properties";
import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import RealEstateMarketplace from "./contracts/RealEstateMarketplace.abi.json";
import IERC from "./contracts/IERC.abi.json";

import BigNumber from "bignumber.js";

const ERC20_DECIMALS = 18;
const contractAddress = "0x4f43Ab8Cba473D1B38C395EDF0CD5a308Dee19D7";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

function App() {
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [properties, setProperties] = useState([]);

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
      alert("Error Occurred");
    }
  };

  const getBalance = useCallback(async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

      const contract = new kit.web3.eth.Contract(
        RealEstateMarketplace,
        contractAddress
      );
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  }, [address, kit]);

  const getProperties = async () => {
    try {
      const nfts = [];
      const nftsLength = await contract.methods.getAllProperties().call();
      // contract starts minting from index 1
      for (let i = 1; i <= Number(nftsLength); i++) {
        const nft = new Promise(async (resolve) => {
          const property = await contract.methods.getProperty(i).call();
          resolve({
            index: i,
            image: property.image,
            location: property.location,
            id: property.id,
            price: property.price,
            owner: property.owner,
            forSale: property.forSale,
          });
        });
        nfts.push(nft);
      }
      const _nfts = await Promise.all(nfts);
      setProperties(_nfts);
    } catch (e) {
      console.log({ e });
    }
  };

  const addProperty = async (_image, _location, _price) => {
    let price = new BigNumber(_price).shiftedBy(ERC20_DECIMALS).toString();
    try {
      await contract.methods
        .registerProperty(_image, _location, price)
        .send({ from: address });
      getProperties();
    } catch (error) {
      alert(error);
    }
  };

  const changePrice = async (_index, _newPrice) => {
    let newprice = new BigNumber(_newPrice)
      .shiftedBy(ERC20_DECIMALS)
      .toString();
    try {
      await contract.methods
        .updatePropertyPrice(_index, newprice)
        .send({ from: address });
      getProperties();
    } catch (error) {
      alert(error);
    }
  };

  const sellProperty = async (_index, _sellPrice) => {
    let sellprice = new BigNumber(_sellPrice)
      .shiftedBy(ERC20_DECIMALS)
      .toString();
    try {
      await contract.methods
        .putPropertyForSale(_index, sellprice)
        .send({ from: address });
      getProperties();
    } catch (error) {
      alert(error);
    }
  };

  const withdrawSale = async (_index) => {
    try {
      await contract.methods.withdrawProperty(_index).send({ from: address });
      getProperties();
    } catch (error) {
      alert(error);
    }
  };

  const buyProperty = async (_index) => {
    try {
      const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);

      await cUSDContract.methods
        .approve(contractAddress, properties[_index].price)
        .send({ from: address });
      await contract.methods.buyProperty(_index).send({ from: address });
      getProperties();
      getBalance();
      alert("you have successfully sent cusd to this user");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    connectToWallet();
  }, []);

  useEffect(() => {
    if (kit && address) {
      getBalance();
    }
  }, [kit, address, getBalance]);

  useEffect(() => {
    if (contract) {
      getProperties();
    }
  }, [contract, getProperties]);

  return (
    <div className="App">
      <Home cUSDBalance={cUSDBalance} addProperty={addProperty} />
      <Properties
        properties={properties}
        changePrice={changePrice}
        sellProperty={sellProperty}
        withdrawSale={withdrawSale}
        walletAddress={address}
        buyProperty={buyProperty}
      />
    </div>
  );
}

export default App;
```

### Breakdown

The first few lines of the code import the required dependencies and components.

```javascript
import "./App.css";
import Home from "./components/home";
import { Properties } from "./components/Properties";
import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import RealEstateMarketplace from "./contracts/RealEstateMarketplace.abi.json";
import IERC from "./contracts/IERC.abi.json";
import BigNumber from "bignumber.js";
```

In this section, we are importing the required dependencies and initializing some constant values that we will use later on in the code.

**Declaring constants and initializing state:**

We declare some constants for our contracts' addresses and decimals. We also initialize our state using useState hooks.

```javascript
const ERC20_DECIMALS = 18;
const contractAddress = "0x4f43Ab8Cba473D1B38C395EDF0CD5a308Dee19D7";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

function App() {
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [properties, setProperties] = useState([]);
```

In this code, we declare some state variables using the `useState` hook provided by the React library. These variables will be used to store the current contract, user's address, Celo contract kit, user's cUSD balance, and an array of properties respectively.

**Connecting to the user's wallet and get user's balance:**

```javascript
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
    alert("Error Occurred");
  }
};

const getBalance = useCallback(async () => {
  try {
    const balance = await kit.getTotalBalance(address);
    const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

    const contract = new kit.web3.eth.Contract(
      RealEstateMarketplace,
      contractAddress
    );
    setcontract(contract);
    setcUSDBalance(USDBalance);
  } catch (error) {
    console.log(error);
  }
}, [address, kit]);
```

We create a `connectToWallet` function that checks if the Celo extension is available, then connects to the user's wallet, and sets the user's default account.

We also create a `getBalance` function using useCallback to fetch the user's cUSD balance and initialize the freelancer contract.

**Funtions to interact with the smart contract:**

We create a `getProperties` function using `useCallback` to fetch the list of properties from the smart contract and update the state.

```javascript
const getProperties = async () => {
  try {
    const nfts = [];
    const nftsLength = await contract.methods.getAllProperties().call();
    // contract starts minting from index 1
    for (let i = 1; i <= Number(nftsLength); i++) {
      const nft = new Promise(async (resolve) => {
        const property = await contract.methods.getProperty(i).call();
        resolve({
          index: i,
          image: property.image,
          location: property.location,
          id: property.id,
          price: property.price,
          owner: property.owner,
          forSale: property.forSale,
        });
      });
      nfts.push(nft);
    }
    const _nfts = await Promise.all(nfts);
    setProperties(_nfts);
  } catch (e) {
    console.log({ e });
  }
};
```

In this code, we retrieve all the properties from the contract by iterating through the array and adding each property object to an array nfts. We then use a Promise to make the asynchronous call, which is then pushed to the nfts array.

```javascript
const addProperty = async (_image, _location, _price) => {
  let price = new BigNumber(_price).shiftedBy(ERC20_DECIMALS).toString();
  try {
    await contract.methods
      .registerProperty(_image, _location, price)
      .send({ from: address });
    getProperties();
  } catch (error) {
    alert(error);
  }
};
```

In this code, we add a new property to the contract by calling the `registerProperty` function and passing in the `image`, `location`, and `price` of the property. We then updates the properties array by calling the `getProperties` function.

```javascript
const changePrice = async (_index, _newPrice) => {
  let newprice = new BigNumber(_newPrice).shiftedBy(ERC20_DECIMALS).toString();
  try {
    await contract.methods
      .updatePropertyPrice(_index, newprice)
      .send({ from: address });
    getProperties();
  } catch (error) {
    alert(error);
  }
};
```

In this code, we update the price of a property by calling the `updatePropertyPrice` function and passing in the index of the property and its new price. We then updates the properties array by calling the `getProperties` function.

```javascript
const sellProperty = async (_index, _sellPrice) => {
  let sellprice = new BigNumber(_sellPrice)
    .shiftedBy(ERC20_DECIMALS)
    .toString();
  try {
    await contract.methods
      .putPropertyForSale(_index, sellprice)
      .send({ from: address });
    getProperties();
  } catch (error) {
    alert(error);
  }
};
```

In this code, we put a property up for sale by calling the `putPropertyForSale` function and passing in the index of the property and its selling price. We then update the properties array by calling the `getProperties` function.

```javascript
const withdrawSale = async (_index) => {
  try {
    await contract.methods.withdrawProperty(_index).send({ from: address });
    getProperties();
  } catch (error) {
    alert(error);
  }
};
```

In this code, we withdraw a property from sale by calling the `withdrawProperty` function and passing in the index of the property. We then update the properties array by calling the `getProperties` function.

```javascript
const buyProperty = async (_index) => {
  try {
    const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);

    await cUSDContract.methods
      .approve(contractAddress, properties[_index].price)
      .send({ from: address });
    await contract.methods.buyProperty(_index).send({ from: address });
    getProperties();
    getBalance();
    alert("you have successfully sent cusd to this user");
  } catch (error) {
    alert(error);
  }
};
```

In this code we implemented the `buyProperty` function. the function first approve the contract to spend the user's cUSD, we then call the `buyProperty` function and passing in the index of the property. Then we update the properties array and user's cUSD balance by calling the `getProperties` and `getBalance` functions respectively.

**useEffect hooks**:

```javascript
useEffect(() => {
  connectToWallet();
}, []);

useEffect(() => {
  if (kit && address) {
    getBalance();
  }
}, [kit, address, getBalance]);

useEffect(() => {
  if (contract) {
    getProperties();
  }
}, [contract, getProperties]);
```

We use three `useEffect` hooks to automatically connect to the wallet, fetch the user's cUSD balance, and fetch the list of properties when the component is mounted or when any of the relevant state variables change.

**Rendering the components:**

```javascript
return (
  <div className="App">
    <Home cUSDBalance={cUSDBalance} addProperty={addProperty} />
    <Properties
      properties={properties}
      changePrice={changePrice}
      sellProperty={sellProperty}
      withdrawSale={withdrawSale}
      walletAddress={address}
      buyProperty={buyProperty}
    />
  </div>
);
```

In this code, we return the JSX of the component, which consists of a `Home` component and a `Properties` component. The `Home` component displays the user's cUSD balance and allows the user to add a new property. The `Properties` component displays a list of properties and allows the user to change the price of a property, put a property up for sale, withdraw a property from sale, and buy a property.

### Home.js

Navigate into the components folder to access the `Home` component.

```javascript
import React, { useState } from "react";

import {
  Button,
  Modal,
  Form,
  FloatingLabel,
  Nav,
  Badge,
  Container,
  Navbar,
} from "react-bootstrap";

const Home = (props) => {
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const isFormFilled = () => image && location && price;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">Real Estate Marketplace</Navbar.Brand>
          <Navbar.Toggle />
          <Nav className="me-auto">
            <Badge bg="secondary" className="ms-auto">
              Balance {props.cUSDBalance}cUSD
            </Badge>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Button onClick={handleShow} variant="dark">
              <h5> New Property </h5>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Property</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputImage"
              label="Image"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setImage(e.target.value);
                }}
                placeholder="Image"
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="inputLocation"
              label="location"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                placeholder="Enter Location"
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="inputPrice"
              label="price"
              className="mb-3"
            >
              <Form.Control
                type="number"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                placeholder="Enter price"
              />
            </FloatingLabel>
          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!isFormFilled()}
            onClick={() => {
              props.addProperty(image, location, price);
              handleClose();
            }}
          >
            Add new property
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;
```

This code defines the `Home` component of the real estate marketplace DApp. It displays the user's cUSD balance and allows the user to add a new property. The component uses the `useState` hook to store the values entered by the user in the add property form, and a function `isFormFilled` to check if all the fields have been filled out. The component also uses the `Modal`, `Form`, and `Button` components from the react-bootstrap library to create the add property form. The `Home` component returns the JSX that displays a navbar, the user's cUSD balance, and a button to add a new property. When the user clicks the button, a modal pops up with a form that allows the user to enter the details of the new property. When the user submits the form, the `addProperty` function passed in as a prop is called to add the new property to the marketplace, and the modal is closed.

### Properties.js

Also Navigate into the components folder to access the `Properties` component.

```javascript
import React from "react";
import { useState } from "react";
import { Card, Badge, Col, Stack, Row } from "react-bootstrap";

export const Properties = (props) => {
  const [newprices, setNewPrices] = useState([]);
  const [prices, setPrices] = useState([]);

  return (
    <Row xs={1} md={3} className="g-4">
      {props.properties.map((property) => (
        <Col key={property.id}>
          <Card className="h-100">
            <Card.Header>
              <Stack direction="horizontal" gap={2}>
                <Badge bg="secondary" className="ms-auto">
                  {property.id} ID
                </Badge>

                <Badge bg="secondary" className="ms-auto">
                  {property.price / 1000000000000000000} cUSD
                </Badge>
              </Stack>
            </Card.Header>

            <div className=" ratio ratio-4x3">
              <img
                src={property.image}
                alt={property.location}
                style={{ objectFit: "cover" }}
              />
            </div>

            <Card.Body className="d-flex  flex-column text-center">
              <Card.Title className="flex-grow-1">
                {property.location}
              </Card.Title>

              <Badge bg="secondary" className="ms-auto">
                {property.forSale ? "Forsale" : "Not Forsale"}
              </Badge>

              {property.owner === props.walletAddress &&
                property.forSale === true && (
                  <button
                    type="button"
                    onClick={() => props.withdrawSale(property.id)}
                    class="btn btn-dark btn-sm mt-1"
                  >
                    withdraw sale
                  </button>
                )}

              {property.owner === props.walletAddress && (
                <form>
                  <div class="form-r">
                    <input
                      type="number"
                      class="form-control mt-3"
                      value={newprices[property.id] || ""}
                      onChange={(e) => {
                        const newPrices = [...newprices];
                        newPrices[property.id] = e.target.value;
                        setNewPrices(newPrices);
                      }}
                      placeholder="Enter new price"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        props.changePrice(property.id, newprices[property.id])
                      }
                      class="btn btn-dark btn-sm mt-1"
                    >
                      Change Price
                    </button>
                  </div>
                </form>
              )}

              {property.owner === props.walletAddress &&
                property.forSale === false && (
                  <form>
                    <div class="form-r">
                      <input
                        type="number"
                        class="form-control mt-3"
                        value={prices[property.id] || ""}
                        onChange={(e) => {
                          const salePrices = [...prices];
                          salePrices[property.id] = e.target.value;
                          setPrices(salePrices);
                        }}
                        placeholder="enter price"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          console.log(
                            "Price for property ID",
                            property.id,
                            ":",
                            prices[property.id]
                          );
                          props.sellProperty(property.id, prices[property.id]);
                        }}
                        class="btn btn-dark mt-1"
                      >
                        Sell property
                      </button>
                    </div>
                  </form>
                )}

              {property.owner !== props.walletAddress &&
                property.forSale === true && (
                  <button
                    type="button"
                    onClick={() => props.buyProperty(property.id)}
                    class="btn btn-dark mt-1"
                  >
                    Buy Property
                  </button>
                )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
```

The `Properties` component displays a grid of all the properties available for sale in the real estate marketplace. The component uses the `useState` hook to store the state of the new prices and prices entered by the user for each property. The component displays the ID, image, location, and price of each property, and allows users to change the price or put their own property up for sale. If a property is for sale and owned by another user, the component displays a buy button. The component calls `changePrice`, `sellProperty`, `withdrawSale`, and `buyProperty` functions passed in as props when the user interacts with the UI. Overall, the `Properties` component provides a user-friendly interface for buying and selling properties in the marketplace.

## Conclusion

In this tutorial, we have built the front-end for our real estate marketplace DApp using React on the Celo network. Users can mint their properties as nfts and put it up for sale for other users to buy.

## Next Steps

I hope you learned a lot from this tutorial. Here are some relevant links that would aid your learning further.

- [Celo Docs](https://docs.celo.org/)
- [Solidity Docs](https://docs.soliditylang.org/en/v0.8.17/)

## About the author

I'm Jonathan Iheme, A full stack block-chain Developer from Nigeria.

[linkedIn](https://www.linkedin.com/in/jonathan-iheme-31a63718b/)
[Twitter](https://twitter.com/iheme_jonathan)
