---
title: Smart contract security on Celo with Securify
description: Analyze smart contracts using free securify2
authors:
  - name: Isaac Jesse
    title: Web3, Smart Contract Developer
    url: https://github.com/bobeu
    image_url: https://github.com/bobeu.png
tags: [celosage, intermediate, smartcontract, solidity]
hide_table_of_contents: true
slug: /tutorials/smart-contract-security-on-celo-with-securify
---

![header](../../src/data-tutorials/showcase/intermediate/smart-contract-security-on-celo-with-securify.png)

## Introduction

Smart contracts are self-executing pieces of code deployed on a blockchain. EVM-based blockchain like Celo is free from censorship, downtime, and third-party interference, and has since invented changed how software is perceived. However, as exciting as smart contracts are, they introduce known and probably undetected bugs and risks ranging from low to critical in severity. It is crucial for developers to thoroughly scrutinize contract code before deployment.

## Prerequisites​
This guide introduces you to working with a security tool called Securify2 which is the current version of the **[Securify security scanner](https://github.com/eth-sri/securify)**. You must at least be an intermediate working with smart contracts using solidity. If you're new in this space, I recommend starting from **[here](https://docs.celo.org/blog/tutorials/building-a-solidity-smart-contract-for-nft-royalty-fees-a-step-by-step-guide)** and **[here](https://docs.celo.org/blog/tutorials/best-practices-for-writing-smart-contracts-with-real-world-examples)**.

## Requirements​

This tutorial assumes you already have **[docker](https://linuxhint.com/run-docker-in-wsl-without-docker-desktop/)** and **[wsl](https://linuxhint.com/run-docker-in-wsl-without-docker-desktop/)** installed.
The following tools are recommended and should be installed prior to this stage.

- [Python](https://python.org)
- Install an editor/IDE. VSCode preferably

**What is Securify?**
Securify is a security scanner for the Ethereum smart contracts and is supported by the Ethereum foundation. This indicates that we can employ the tool to improve smart contract development on most platforms that are compatible with the EVM.  With Securify, developers can detect vulnerabilities in smart contracts code written in solidity within seconds for better optimization.

Securify is a security tool for analyzing smart contracts. There are other smart contracts platforms such as TRON and so on. But this guide focuses on the Celo blockchain - `a platform acting as a global payment infrastructure for cryptocurrencies that aims to target mobile users, highly compatible with the Ethereum Virtual Machine. So if you write contracts that target the Celo platform, it is very important to prioritize security. This helps to detect and avoid a range of smart contract issues such as integer overflow/underflow, owner-overwrite-to-Ether-withdrawal, and many others.

**Installing Securify**

To use Securify is Python based hence Python must be installed on your machine. We are going to make use of the Python package manager - Pip. To install Securify, run the following commands.

**Steps**

1. 
```bash
  sudo docker build -t securify .
```
This will build the image in the root project.

Thereafter, you can run the container.

2. 
```bash
    sudo docker run -it -v <contract-dir-full-path>:/share securify /share/<contract>.sol
```

> Note: _to run the code via Docker with a Solidity version that is different than 0.5.12, you will need to modify the variable ARG SOLC=0.5.12 at the top of the Dockerfile to point to your version. After building with the correct version, you should not run into errors._

**Install other dependencies**

Securify requires a few dependencies to be installed on the system:

- 
```bash
sudo add-apt-repository ppa:ethereum/ethereum
```

```bash
sudo apt-get update
```

```bash
sudo apt-get install solc
```

- Install Graphviz.

```bash
sudo apt install graphviz
```

Now, let's set up the virtual environment. Create one and name it as you wish. I called mine `env`. I have Python 3.8 installed, so you should the version of Python you have. 

- First, check that Python is installed:

```bash
python3 --version
```

```bash
virtualenv --python=/usr/bin/python3.8 venv

```

- Activate the virtual environment.
```bash
source venv/bin/activate
```

- Set the library path

```bash
cd <securify_root>/securify/staticanalysis/libfunctors
```

- Export the path

```bash
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:`pwd`
```

- Let's complete the project setup by installing a few dependencies for this project. Run the following commands from the `<securify_root>` folder:

```bash
    pip install --upgrade pip
```

```bash
pip install -r requirements.txt
```

```bash
pip install -e .
```

At this stage, we are ready to start using Securify.

**Example**

Before we proceed, be aware that online scanners function by experimental and especially trial and error methods perhaps heuristics hence it cannot detect vulnerabilities and bugs beyond its predefined list which an experienced audit team could offer. It is advisable to not consider them as a replacement for a thorough or extensive audit task where necessary. Always Be very mindful that the more money your smart contract features or handles, the higher the risk when something goes wrong.

> Note: For analyzers that work based on heuristic play, the expectation is to report beyond the threshold rather than to underreport potential security violations. So be mindful that some false positives will be expected which then the smart contract developer should work towards identifying if an attack vector has found its way.

Let's consider a naive implementation of a wallet via smart contract — which holds a keccak256 hashed value acting as the password to allow retrieval of Celo from this contract:

Create a `.sol` file and paste the following code.

```js
    pragma solidity ^0.6.0;
    contract ExampleWallet {
        
        bytes32 hash;
        
        function makeCommit(bytes32 _hash) public payable {
            require(msg.value > 0 && hash == 0x0);
            hash = _hash;
        }
        
        function retrieveFund(bytes32 _text) public {
            require(keccak256(abi.encodePacked(_text)) == hash);
            msg.sender.transfer(address(this).balance);
        }
        
        function getHash(bytes32 _text) public pure returns (bytes32) {
            return keccak256(abi.encodePacked(_text));
        }
    }
```

To analyze this contract, run the following command substituting where necessary. You may have additional arguments which though are optional.

```bash
securify <contract_path>.sol [--use-patterns Pattern1 Pattern2 ...]
```

To see a list of supported vulnerabilities in Securify, run the command. The list reads about 37 vulnerabilities.

```bash
    securify --list
```

After invoking Securify on the contract, you would notice a total of 5 issues are reported.

**High severity issues**

1. Transaction order affects Ether amount.
    > The amount of Ether transferred must not be influenced by other transactions

This probably could be an over-approximation or an oversight. Here, we are sending out the full balance in the contract without recourse to first calculating the amount that should be sent. The contract, therefore, will either send the `full amount` in weight or absolutely `nothing`. What though could happen is in the same block, given that two valid transactions, the first transaction will get the full weight amount whereas the second transaction may get nothing.

I expect a `Transaction Ordering Dependency` flag to be raised where the receiver will appear, such that the contract is handling a substantial amount of value, it could become worthwhile to listen for a transaction relating to this address with plain data, then front-running with a transaction of my own with a higher gas value.

2. Insecure coding pattern.
    > Contract fields that can be modified by only the User must be inspected

3. Missing input validation.
    > Method arguments must be sanitized before they are used in computations

**Warnings**

4. Unrestricted Ether flow
    > The execution of Ether flow should be restricted to an authorized set of users

5. Dependence on unsafe inputs
    > Unsafe call to Untrusted Contract

## Conclusion​

My experience with using Securify was really average in rating compared to previous tools I wrote about **[here]()** and **[here]()**. Although Securify provides a handful of information, but the process of getting Securify running is a bit cumbersome, even as at the time of writing this tutorial, the web page wasn't working considering that it is a public free tool.

So far, we have learned how to :

- Install and set up Securify.
- Analyze smart contracts and catch vulnerabilities using the same tool.

## What next?

Compare the initial and recent code. Did you notice any change? Try to explore more vulnerabilities in the contract, and share with us on **[Discord](https://discord.gg/celo)**.

To learn how to deploy your dream project on the Celo blockchain, visit the **[Celo documentation](https://docs.celo.org/tutorials)**

## About the Author​

**Isaac Jesse** , aka _Bobelr_ is a smart contract/Web3 developer. He has been in the field since 2018, worked as an ambassador with several projects like Algorand and so on as a content producer. He has also contributed to Web3 projects as a developer.

## References​

- [Celo developers resources](https://docs.celo.org/developer/)
- [Source code](https://github.com/bobeu/smart-contract-security-on-celo-with-securify)
- [Securify](https://github.com/eth-sri/securify2)
