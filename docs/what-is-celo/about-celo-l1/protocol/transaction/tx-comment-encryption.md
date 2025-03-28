---
title: Celo Encrypted Payment Comments
description: Overview of encrypted payment comments and its technical details related to symmetric and asymmetric encryption.
---

# Encrypted Payment Comments

Overview of encrypted payment comments and its technical details related to symmetric and asymmetric encryption.

:::warning
As of block height 31,056,500 (March 26, 2025, 3:00 AM UTC), Celo is no longer a standalone Layer 1 blockchain—it is now an Ethereum Layer 2!
Some documentation may be outdated as updates are in progress. If you encounter issues, please [file a bug report](https://github.com/celo-org/docs/issues/new/choose).

For the most up-to-date information, refer to our [Celo L2 documentation](https://docs.celo.org/cel2).
:::

---

### Introduction to Comment Encryption

As part of Celo’s identity protocol, a public encryption key is stored along with a user’s address in the `Accounts` contract.

Both the address key pair and the encryption key pair are derived from the backup phrase. When sending a transaction the encryption key of the recipient is retrieved when getting his or her address. The comment is then encrypted using a 128 bit hybrid encryption scheme \(ECDH on secp256k1 with AES-128-CTR\). This system ensures that comments can only be read by the sending and receiving parties and that messages will be recovered when restoring a wallet from its backup phrase.

### Comment Encryption Technical Details

A 128 bit randomly generated session key, sk, is generated and used to symmetrically encrypt the comment. sk is asymmetrically encrypted to the sender and to the recipient.

‌`Encrypted = ECIES(sk, to=pubSelf) | ECIES(sk, to=pubOther) | AES(ke=sk, km=sk, comment)`

#### ‌Symmetric Encryption \(AES-128-CTR\)

- Takes encryption key, ke, and MAC key, km, and the data to encrypt, plaintext
- Cipher: AES-128-CTR using a randomly generated iv
- Authenticate iv \| ciphertext using HMAC with SHA-256 and km
- Return iv \| ciphertext \| mac

#### Asymmetric Encryption \(ECIES\)

1.  Takes data to encrypt, plaintext, and the public key of the recipient, pubKeyTo
2.  Generate an ephemeral keypair, ephemPubKey and ephemPrivKey
3.  Derive 32 bytes of key material, k, from ECDH between ephemPrivKey and pubKeyTousing ConcatKDF \(specified as NIST 800-56C Rev 1 One Step KDF\) with SHA-256 for H\(x\)
4.  The encryption key, ke, is the first 128 bits of k
5.  The MAC key, km, is SHA-256 of the second 128 bits of k
6.  Encrypt the plaintext symmetrically with AES-128-CTR using ke, km, and a random iv
7.  Return ephemPubKey \| AES-128-CTR-HMAC\(ke, km, plaintext\) where the public key needs to be uncompressed \(current limitation with decrypt\).
