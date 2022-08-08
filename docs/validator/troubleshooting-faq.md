---
title: Celo Validator Troubleshooting FAQ
description: Answers to frequently asked questions while troubleshooting isses as a Validator.
---

# Validator FAQ

Answers to frequently asked questions while troubleshooting isses as a Validator.

---

## How do I reset my local Celo state?

You may desire to reset your local chain state when updating parameters or wishing to perform a clean reset. Note that this will cause the node to resync from the genesis block which will take a couple hours.

```bash
# Remove the celo state directory
sudo rm -rf celo
```

## How do I backup a local Celo private key?

It's important that local accounts are properly backed up for disaster recovery. The local keystore files are encrypted with the specified account password and stored in the keystore directory. To copy this file to your local machine you may use ssh:

```bash
ssh USERNAME@IPADDRESS "sudo cat /root/.celo/keystore/<KEYSTORE_FILE>" > ./nodeIdentity
```

You can then back this file up to a cloud storage for redundancy.

:::warning

It's important that you use a strong password to encrypt this file since it will be held in potentially insecure environments.

:::

## How do I install and use celocli on my node?

To install celocli on a Linux machine, run the following:

```bash
sudo apt-get update
sudo apt-get install libusb-1.0-0 -y
sudo npm install -g @celo/celocli --unsafe-perm
```

To install celocli on a Mac/Windows machine, run the following:

```bash
npm install @celo/celocli
```

You can then run celocli and point it to your local geth.ipc file:

```bash
# Check if node is synced using celocli
sudo celocli node:synced --node geth.ipc
```
