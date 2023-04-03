---
title: How to Build a Decentralized Job Board Dapp On The Celo Blockchain Part 2
description: This tutorial covers how to build the front end for our decentralized job board smart contract that we deployed in part 1
authors:
  - name: ✍️ Jonathan Iheme
    url: https://github.com/4undRaiser
    image_url: https://avatars.githubusercontent.com/u/87926451?s=96&v=4
tags: [celosage, solidity, react, celo]
hide_table_of_contents: true
slug: /tutorials/how-to-build-a-decentralized-job-board-dapp-on-the-celo-blockchain-part-2
---

![header](../../src/data-tutorials/showcase/intermediate/how-to-build-a-decentralized-job-board-dapp-on-the-celo-blockchain-part-2.png)

## Introduction

In the first part of the tutorial, We built and explored a simple Job board Smart Contract built on the Celo network using Solidity. The contract enables employers to create job posts and upload to the blockchain.

In this part we will follow up and create a front end for our job board.

Here’s a demo [link](https://rad-nasturtium-7e8d4a.netlify.app/) of what you’ll be creating.

## Prerequisites

To follow this tutorial, you will need the following:

- Solidity, smart-contract and blockchain concepts.
- Basic web Development.

## Requirements

- React.
- Bootstrap.
- NodeJS 12.0.1 upwards installed.
- Celo Extension Wallet.

## Front-end

Click on [this](https://github.com/4undRaiser/celo-job-board-dapp) repo from your github.

- Clone the repo to your computer.
- open the project from from vscode.
- Run `npm install` command to install all the dependencies required to run the app locally.

### App.js

The completed code Should look like this.

```javascript
import "./App.css";
import Home from "./components/home";
import { Jobs } from "./components/Jobs";
import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import jobBoard from "./contracts/jobBoard.abi.json";

const ERC20_DECIMALS = 18;
const contractAddress = "0x31375CB4f0e144E36F9de58C2085C0F0A0CF6627";

function App() {
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [jobs, setJobs] = useState([]);

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

      const contract = new kit.web3.eth.Contract(jobBoard, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  }, [address, kit]);

  const getJobs = useCallback(async () => {
    const jobsLength = await contract.methods.getJobsLength().call();
    const jobs = [];
    for (let index = 0; index < jobsLength; index++) {
      let _jobs = new Promise(async (resolve, reject) => {
        let job = await contract.methods.getJobposts(index).call();

        resolve({
          index: index,
          jobId: job[0],
          employer: job[1],
          jobName: job[2],
          jobDescription: job[3],
          salary: job[4],
        });
      });
      jobs.push(_jobs);
    }

    const _jobs = await Promise.all(jobs);
    setJobs(_jobs);
  }, [contract]);

  const addJob = async (_jobName, _jobDescription, _salary) => {
    try {
      await contract.methods
        .postJob(_jobName, _jobDescription, _salary)
        .send({ from: address });
      getJobs();
    } catch (error) {
      alert(error);
    }
  };

  const removeJob = async (_index) => {
    try {
      await contract.methods.removeJobPost(_index).send({ from: address });
      getJobs();
      getBalance();
      alert("you have successfully removed the job");
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
      getJobs();
    }
  }, [contract, getJobs]);

  return (
    <div className="App">
      <Home cUSDBalance={cUSDBalance} addJob={addJob} />
      <Jobs jobs={jobs} removeJob={removeJob} walletAddress={address} />
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
import { Jobs } from "./components/Jobs";
import { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import jobBoard from "./contracts/jobBoard.abi.json";

const ERC20_DECIMALS = 18;
const contractAddress = "0x31375CB4f0e144E36F9de58C2085C0F0A0CF6627";
```

Here, we import the necessary dependencies and set two constants `ERC20_DECIMALS` and `contractAddress`. `ERC20_DECIMALS` is set to 18, which is the number of decimal places in the cUSD token, and `contractAddress` is set to the address of the deployed smart contract on the Celo network.

```javascript
const [contract, setcontract] = useState(null);
const [address, setAddress] = useState(null);
const [kit, setKit] = useState(null);
const [cUSDBalance, setcUSDBalance] = useState(0);
const [jobs, setJobs] = useState([]);

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
```

In the `App` function, we define state variables using the `useState` hook. `contract`, `address`, `kit`, `cUSDBalance`, and `jobs` are all initialized as null or empty arrays.

We define a function `connectToWallet` that is called when the component mounts. This function checks if the Celo extension is installed in the user's browser and prompts them to connect their wallet if it is. It then initializes a new Web3 instance and sets the `kit` state variable to a new instance of `newKitFromWeb3` using the `web3` instance. The user's account address is set as the defaultAccount in `kit` and the `address` state variable is set to this address.

```javascript
const getBalance = useCallback(async () => {
  try {
    const balance = await kit.getTotalBalance(address);
    const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

    const contract = new kit.web3.eth.Contract(jobBoard, contractAddress);
    setcontract(contract);
    setcUSDBalance(USDBalance);
  } catch (error) {
    console.log(error);
  }
}, [address, kit]);
```

`getBalance` is a callback function that is called when the `kit` and `address` state variables change. It retrieves the user's cUSD balance and sets the `contract` and `cUSDBalance` state variables accordingly.

```javascript
const getJobs = useCallback(async () => {
  const jobsLength = await contract.methods.getJobsLength().call();
  const jobs = [];
  for (let index = 0; index < jobsLength; index++) {
    let _jobs = new Promise(async (resolve, reject) => {
      let job = await contract.methods.getJobposts(index).call();

      resolve({
        index: index,
        jobId: job[0],
        employer: job[1],
        jobName: job[2],
        jobDescription: job[3],
        salary: job[4],
      });
    });
    jobs.push(_jobs);
  }

  const _jobs = await Promise.all(jobs);
  setJobs(_jobs);
}, [contract]);
```

`getJobs` is another callback function that is called when the `contract` state variable changes. It retrieves all existing job postings from the smart contract and sets the `jobs` state variable to an array of job objects. Each job object contains the job ID, employer's address, job name, job description, and salary.

```javascript
const addJob = async (_jobName, _jobDescription, _salary) => {
  try {
    await contract.methods
      .postJob(_jobName, _jobDescription, _salary)
      .send({ from: address });
    getJobs();
  } catch (error) {
    alert(error);
  }
};
```

`addJob` is a function that allows users to post a new job opportunity to the smart contract. It takes in the job name, job description, and salary as parameters, and then calls the `postJob` function on the smart contract with these values. It then calls the `getJobs` function to update the `jobs` state variable with the new job posting.

```javascript
const removeJob = async (_index) => {
  try {
    await contract.methods.removeJobPost(_index).send({ from: address });
    getJobs();
    getBalance();
    alert("you have successfully removed the job");
  } catch (error) {
    alert(error);
  }
};
```

`removeJob` is a function that allows users to remove an existing job posting from the smart contract. It takes in the index of the job posting as a parameter and then calls the `removeJobPost` function on the smart contract with this value. It then calls the `getJobs` and `getBalance` functions to update the `jobs` and `cUSDBalance` state variables, respectively.

```javascript
useEffect(() => {
  connectToWallet();
}, []);
```

This `useEffect` hook is used to call the `connectToWallet` function when the component mounts. This function prompts the user to connect their wallet and sets the `kit` and `address` state variables.

```javascript
useEffect(() => {
  if (kit && address) {
    getBalance();
  }
}, [kit, address, getBalance]);
```

This `useEffect` hook is used to call the `getBalance` function when the `kit` and `address` state variables change.

```javascript
useEffect(() => {
  if (contract) {
    getJobs();
  }
}, [contract, getJobs]);
```

This `useEffect` hook is used to call the `getJobs` function when the `contract` state variable changes.

```javascript
 return (
    <div className="App">
      <Home cUSDBalance={cUSDBalance} addJob={addJob} />
      <Jobs
        jobs={jobs}
        removeJob={removeJob}
        walletAddress={address}
      />
    </div>
  );
}
export default App;
```

Finally, we render the `Home` and `Jobs` components, passing in the necessary state variables and functions as props.

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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");

  const isFormFilled = () => name && description && salary;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">Celo - Job - Board</Navbar.Brand>
          <Navbar.Toggle />
          <Nav className="me-auto">
            <Badge bg="secondary" className="ms-auto">
              Balance {props.cUSDBalance}cUSD
            </Badge>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <Button onClick={handleShow} variant="dark">
              <h5> Add a new Job </h5>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Job</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputName"
              label="Employer name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Name"
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="inputDescription"
              label="Job description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="description"
                style={{ height: "80px" }}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="inputSalary"
              label="Salary per year"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setSalary(e.target.value);
                }}
                placeholder="salary"
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
              props.addJob(name, description, salary);
              handleClose();
            }}
          >
            Add Job
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;
```

The `Home` component is has modal dialog that allows users to add new job postings to the job board. It renders a `Navbar` component with the app title and the user's cUSD balance, and a `Button` component that opens the modal dialog. The modal dialog contains a form with input fields for the employer's name, job description, and salary, and two buttons for submitting the form and closing the dialog. The `useState` hook is used to define state variables for the form input fields and the modal dialog visibility. Finally, the `props.addJob` function is called when the form is submitted to add a new job posting to the job board.

### Jobs.js

Also Navigate into the components folder to access the `Jobs` component.

```javascript
import React from "react";
import { Card, Badge, Col, Stack, Row } from "react-bootstrap";

export const Jobs = (props) => {
  return (
    <Row xs={1} md={3} className="g-4">
      {props.jobs.map((job) => (
        <Col key={job.index}>
          <Card className="h-100">
            <Card.Header>
              <Stack direction="horizontal" gap={2}>
                <Badge bg="secondary" className="ms-auto">
                  {job.index} ID
                </Badge>

                <Badge bg="secondary" className="ms-auto">
                  {job.salary}cUSD/year
                </Badge>
              </Stack>
            </Card.Header>
            <Card.Body className="d-flex  flex-column text-center">
              <Card.Title className="flex-grow-1">{job.jobName}</Card.Title>
              <Card.Text className="flex-grow-1">
                {job.jobDescription}
              </Card.Text>

              {props.walletAddress === job.employer && (
                <button
                  type="button"
                  onClick={() => props.removeJob(job.index)}
                  class="btn btn-dark mt-1"
                >
                  Remove Job
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

The `Jobs` component renders job postings on the job board in a grid layout. It uses the `map` method to iterate over each job posting and render a `Col` component for each one. For each job posting, a `Card` component is rendered containing the job title, description, ID, and salary. The job ID and salary are displayed using `Badge` components. The component also conditionally renders a "Remove Job" button for job postings that were posted by the current wallet address. This button calls the `props.removeJob` function when clicked to remove the corresponding job posting from the job board.

## Conclusion

In this tutorial, we have built the front-end for our Job board DApp using React on the Celo network. employers can list their job openings, for potential applicants.

## Next Steps

I hope you learned a lot from this tutorial. Here are some relevant links that would aid your learning further.

- [Celo Docs](https://docs.celo.org/)
- [Solidity Docs](https://docs.soliditylang.org/en/v0.8.17/)

## About the author

I'm Jonathan Iheme, A full stack block-chain Developer from Nigeria.

Thank You!!
