---
title: How to Connect to a Node on the Celo using Docker 
description: This tutorial teaches how to connect to a node  on the celo blockchain using docker
authors:
  - name: Emiri Udogwu
    title: Tech Ethusiast, Smart Contract Developer 
    url: https://github.com/emiridbest
    image_url: https://avatars.githubusercontent.com/u/6362475?v=4
tags: [celo sage, celo, beginner, cli]
hide_table_of_contents: true
slug: /tutorials/how-to-connect-to-a-node-on-the-celo-using-docker
---

![how-to-connect-to-a-node-on-celo-blockchain-using-docker](https://user-images.githubusercontent.com/69092079/224585198-b09ccdd8-a535-4bad-98f3-b98c382ed714.png)


## Introduction
Celo is an open-source blockchain platform that enables fast, secure, and low-
cost financial transactions. In this article, we will discuss how to set up a node on the Celo network, which is a crucial step to participate in the network as a validator or observer. 

## Prerequisites
- A machine with at least 4 GB of RAM and 50 GB of disk space
- A stable and fast internet connection
- Docker and Docker-Compose installed on your machine
- A valid email address to receive notifications from the Celo network


## Requirements
- [Docker](https://www.docker.com/products/docker-desktop/): Docker is a platform that allows developers to package and run their applications in a standardised way, regardless of the environment in which they are deployed. It is an open-source tool that uses containers to create, deploy, and manage applications.

- [Node v12.22.12](https://nodejs.org/en/download/): an open-source, cross-platform runtime environment that allows developers to run JavaScript code on the server-side. It was first released in 2009 and has since become one of the most popular tools for building scalable and high-performance web applications. 
It runs with the Node Package Manager (NPM), which is a repository of over 1 million open-source packages that can be easily installed and used in Node.js applications.

- [Git/GitHub](https://git-scm.com/downloads): Git is a free and open-source distributed version control system that allows developers to manage and track changes to their source code over time.

- [Celo-cli](https://docs.celo.org/cli): The Command Line Interface allows users to interact with the Celo Protocol smart contracts without having to write lines of javascript.
- [Geth](https://geth.ethereum.org/docs/getting-started/installing-geth): A command line interface for running client nodes on the blockchain. It is used to connect to the different network, download the blockchain, and interact with smart contracts and decentralized applications.

## Getting Started 

* **Step 1**: Clone the Celo repository
The second step is to clone the Celo repository from GitHub. Open a terminal
window and run
the following command:


```bash
$ git clone https://github.com/celo-org/celo-blockchain.git
```


This step creates an identical copy of the repository in our local environment. This enables us to navigate to the directory created by Git and use Git commands to manage the repository, such as making changes to the code, committing those changes, and pushing the changes back up to the remote repository.

The expected output should be;
![cloning-into-celo](https://user-images.githubusercontent.com/69092079/224581769-60032f6a-3881-4929-91c5-22316a8541e6.png)




* **Step 2**: Build the Celo Docker images Using Docker-Compose
Once the repository is cloned, navigate to the repository directory by running the
following command:

```bash
$ cd celo-blockchain
```


We will have to create a new file that helps us run the next line command line.
Docker-Compose is a tool for defining and running multi-container Docker applications. 

This allows us to define the services and their dependencies in a `.yml` or `.yaml` file (called a Docker Compose file), and then use the `docker-compose` command to start, stop, and manage the containers for those services.
We will have to manually create a `docker-compose` by creating a `docker-compose.yaml` file in our `celo-blockchain` folder as running the above code without a `docker-compose.yaml` or `docker-compose.yml` will return an error.
Copy and paste these lines of code into our newly created file:

```YAML  
  celo-node:
	image: us.gcr.io/celo-testnet/celo-node:rc1
	container_name: celo-node
	restart: always
	volumes:
  	- ./data:/root/.celo
  	- ./genesis.json:/genesis.json
  	- ./static-nodes.json:/static-nodes.json
	 
	ports:
  	- "127.0.0.1:8545:8545"
  	- "30303:30303"
  	- "30303:30303/udp"
	environment:
  	- CELO_NODE_TYPE:"full"
  	- CELO_BOOTNODES :"enode://06051a5573c81934c9554ef2898eb13b33a34b94cf36b202b69fde139ca17a85051979867720d4bdae4323d4943ddf9aeeb6643633aa656e0be843659795007a@35.177.226.168:30303"
  	- CELO_VALIDATOR_NAME= "Me"
  	- CELO_VALIDATOR_ADDRESS=
  	- CELO_VALIDATOR_KEY=
  	- CELO_ACCOUNT_ADDRESS=
  	- CELO_ACCOUNT_KEY=
  	- CELO_ATTESTATION_SIGNER_ADDRESS:<>
  	- CELO_ATTESTATION_SIGNER_KEY:<>
  	- CELO_BLOCK_TIME="5"
  	- CELO_NETWORK_ID="42220"
  	- CELO_VERBOSITY="3"
	command: ["docker run --name celo-fullnode -d --restart unless-stopped --stop-timeout 300 -p 127.0.0.1:8545:8545 -p 127.0.0.1:8546:8546 -p 30303:30303 -p 30303:30303/udp -v $PWD:/root/.celo $CELO_IMAGE --verbosity 3 --syncmode full --http --http.addr 0.0.0.0 --http.api eth,net,web3,debug,admin,personal --light.serve 90 --light.maxpeers 1000 --maxpeers 1100 --etherbase $CELO_ACCOUNT_ADDRESS --datadir /root/.celo"]
```


Now that we have created the docker-compose file, we can now run the command that enables docker build the images the file is pointing to.

```bash
$ docker-compose build
```


The expected output after running our code;

![celo-node](https://user-images.githubusercontent.com/69092079/224582017-34c2dfb4-8625-492f-9072-1b91917a30a3.png)

After building the Docker images, start the Celo node using the following
Command:

```bash
$ docker-compose up -d
```


The above command `docker-compose up -d` is used to start Docker containers defined in our Docker Compose file in detached mode as specified by the `-d` flag. 

This ensures `docker-compose` runs in the background while the terminal is free to execute other commands. Since this is the first time of running `docker-compose up`, it will download the images needed for the services from Docker Hub or from the specified container registry as well as  start other linked services.

The expected output;

![pulling-celo](https://user-images.githubusercontent.com/69092079/224582154-60ec8b9c-8ceb-479f-aa6f-5053c4304884.png)





* **Step 3**: Start Running the Celo Node
We do this by running the next line of code:

```bash
$ docker run --name celo-node -d --restart unless-stopped --stop-timeout 300 -p 127.0.0.1:8545:8545 -p 127.0.0.1:8546:8546 -p 30303:30303 -p 30303:30303/udp -v $PWD:/root/.celo $CELO_IMAGE --verbosity 3 --syncmode full --http --http.addr 0.0.0.0 --http.api eth,net,web3,debug,admin,personal --light.serve 90 --light.maxpeers 1000 --maxpeers 1100 --etherbase $CELO_ACCOUNT_ADDRESS --datadir /root/.celo
```


The above command is expected to print out the docker `CONTAINER ID` for our celo-node:

![container-id](https://user-images.githubusercontent.com/69092079/224582252-e8708f9f-5238-4160-b858-c19654344991.png)

- `docker run`: runs a Docker container with the specified image.
- `--name celo-node`: assigns a name to the container (in this case, "celo-node").
- `-d`: runs the container in detached mode.
- `--restart unless-stopped`: automatically restarts the container unless it is explicitly stopped or Docker itself is stopped.
- `--stop-timeout 300`: waits up to 300 seconds for the container to stop gracefully before killing it.
- `-p 127.0.0.1:8545:8545`: maps port 8545 in the container to port 8545 on the host machine's loopback interface.
- `-p 127.0.0.1:8546:8546`: maps port 8546 in the container to port 8546 on the host machine's loopback interface.
- `-p 30303:30303`: maps port 30303 in the container to port 30303 on the host machine.
- `-p 30303:30303/udp`: enables UDP traffic for port 30303.
- `-v $PWD:/root/.celo`: mounts the current working directory as a volume in the container at /root/.celo, allowing the node to persist data across container restarts.
- `$CELO_IMAGE:` replaces this with the name or ID of the Celo node image that you want to run.
- `--verbosity 3`: sets the logging verbosity to level 3 (INFO).
- `-syncmode full`: sets the node to sync with the network in full mode.
- `--http`: enables HTTP-RPC server.
- `--http.addr 0.0.0.0`: listens for HTTP-RPC connections on all available network interfaces.
- `--http.api eth,net,web3,debug,admin,personal`: specifies which APIs to enable for the HTTP-RPC server.
- `--light.serve 90`: serves light clients requests with 90% of its time. .If this node is having trouble catching up to the current block, dropping this to a lower percentage may help.
- `-light.maxpeers 1000`: sets the maximum number of light peers that can be connected to the node. 
- `--maxpeers 1100`: sets the maximum number of peers that can be connected to the node. 
- `--etherbase $CELO_ACCOUNT_ADDRESS`: sets the node's mining address to $CELO_ACCOUNT_ADDRESS.
- `--datadir /root/.celo`: sets the node's data directory to /root/.celo.



* **Step 4**: Verify the node is running
To verify that the node is running, run the following command:

```bash
$ docker ps
```


This command is used to list out  the Docker containers running on our system, like in the image below.

![docker-p](https://user-images.githubusercontent.com/69092079/224582368-ea355ec1-d693-4c22-a0a2-2d3d933d749c.png)


* **Step 5**: Create a Celo Account

To create a celo account, your need to first install the Celo Command Line Interface (celocli). Nodejs is required to do this. 

Run this line of code in your terminal;

```bash
$ npm install -g @celo/celocli@latest
```


The `celocli` tool allows developers to interact with the Celo blockchain and perform various operations, such as deploying contracts, sending transactions, and querying blockchain data. The command instals the latest version of the celocli package globally as specified by the `-g` flag using Node Package Manager (npm).

To confirm if celocli is properly installed, run;

```bash
$ npx celocli
```


The expected output should look like the image below:

![celo-cli](https://user-images.githubusercontent.com/69092079/224582594-bfe2822a-3579-49f7-af1e-2011bd056514.png)

This outputs the various modules available in `celocli`.
We can create a new account by running the code below;

```bash
$ celocli account:new
```


This will output the parameters of your Celo wallet: mnemonic, accountAddress, privateKey, publicKey.

Make sure to save the mnemonic somewhere since it’s not being stored anywhere.

Save this address to an environment variables, so that you can reference it(don't include the braces):

```bash
export CELO_ACCOUNT_ADDRESS=<accountAddress>
```


We can also confirm if celocli is connected to the network by running:

```bash
$ celocli config:get
```


The expected output when node is properly connected is:

![gas-curr](https://user-images.githubusercontent.com/69092079/224582675-f4558a51-fa9a-4ffd-82f2-9e16848fa076.png)

* **Step 6**: Sync with The Network and Receive Blocks
Do this with the next line of command:

```bash
$ geth --syncmode full --bootnodes "$CELO_BOOTNODES"
```

You will start seeing lines that look like this:

![docker](https://user-images.githubusercontent.com/69092079/224582759-ff5ab606-8237-4e95-b09c-74278fb29f8c.png)


***NOTE: The bootnode used in this tutorial contains the enode IDs for a list of publicly available bootnodes that can be used to connect to the Celo network. These bootnodes are maintained by the Celo community and are designed to be shared with others to help new nodes join the network***.

It's important to note that while the `enode ID` for this bootnode is safe to share, your node's own `enode ID` is unique to your node and should be kept private. Sharing your node's `enode ID` could potentially allow others to connect directly to your node and potentially access or interfere with your node's data or operations.

## Conclusion
I hope that this tutorial has been helpful in getting you started with your Celo node. Keep in mind that maintaining a node requires ongoing attention and updates to ensure it stays in sync with the network and stays secure. We encourage you to stay informed about the latest developments in the Celo ecosystem and to join the community of developers, validators, and users who are working together to build a more inclusive and equitable financial system.

## Next Step
- [Configuring and running a validator node](https://docs.celo.org/validator)
- [Earning incentives as a node operator](https://docs.celo.org/protocol/transaction/full-node-incentives)

## About the Author​
I am Dr Emiri Udogwu, a young Nigerian medical doctor who is passionate about blockchain technologies and tech generally. Proficient in Fullstack programming and writing smart contracts. 
Connect with me on [Twitter](http://twitter.com/emiridbest) or [Linkedin](http://linkedin.com/emiridbest)

## References
- [Celo CLI docs](https://docs.celo.org/cli)
- [Ubuntu](https://ubuntu.com/server/docs) 
- [Installing Node](https://codedamn.com/news/nodejs/how-to-uninstall-node-js)


