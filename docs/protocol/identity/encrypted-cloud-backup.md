---
title: PEAR 🍐
---

Pin/Password Encrypted Account Recovery.

---

Secure and reliable account key backups are critical to the experience of non-custodial wallets, and Celo more generally.
Day-to-day, users store their account keys on their mobile device, but if they lose their phone, they need a way to recover access to their account.
Described in this document is a protocol for encrypted backups of a user's account keys in their cloud storage account.

## Summary

Using built-in support for iOS and Android, mobile apps can save data backups to Apple iCloud and Google Drive respectively.
When a user installs the wallet onto a new device, possibly after losing their old device, or reinstalls the app on the same device, it can check the user's Drive or iCloud account for account backup data.
If available, this data can be downloaded and used to initialize the application with the recovered account information.

Access to the user's cloud storage requires logging in to their Google or Apple account.
This provides a measure of security as only the owner of the cloud storage account can see the data, but is not enough to confidently store the wallet's account key.
In order to provide additional security, the account key backup should be encrypted with a secret, namely a PIN or password, that the user has memorized or stored securely.
This way, the users account key backup is only accessible to someone who can access their cloud storage account _and_ knows their secret.

Because user-chosen secrets, especially PINs, are susceptible to guessing, this secret must be [hardened](<https://wikipedia.org/wiki/Hardening_(computing)>) before it can be used as an encryption key.
Using [ODIS](/protocol/identity/odis) for [key hardening](/protocol/identity/odis-use-case-key-hardening), this scheme derives an encryption key for the account key backup that is resistant to guessing attacks.

With these core components, we can construct an account recovery system that allows users who remember their password or PIN, and maintain access to a cloud storage account, to quickly and reliably recover their account while providing solid security guarantees.

Valora is currently working to implement encrypted account recovery, using the user's access PIN for encryption.

### Similar protocols

- [iCloud Keychain](https://support.apple.com/guide/security/secure-icloud-keychain-recovery-secdeb202947/web) uses 6-digit PIN, hardened by an HSM app, and encrypt iCloud Keychain backups.
- [Signal SVR](https://support.apple.com/guide/security/secure-icloud-keychain-recovery-secdeb202947/web) uses a 4-digit PIN or alphanumeric password, hardened by an Intel SGX app, to encrypt contacts and metadata.
- [Coinbase Wallet](https://blog.coinbase.com/backup-your-private-keys-on-google-drive-and-icloud-with-coinbase-wallet-3c3f3fdc86dc) uses a password encrypted cloud backup to store user account keys. It is unclear if any hardening is used.
- [WhatsApp E2E Encrypted Backups](https://engineering.fb.com/2021/09/10/security/whatsapp-e2ee-backups/) uses [OPAQUE](https://datatracker.ietf.org/doc/draft-irtf-cfrg-opaque/) to harden a password encrypted backup
- [MixIn Network TIP](https://github.com/MixinNetwork/tip) uses 6-digit PINs, hardened by a set of signers, to derive account keys

## User experience

Here we describe the user experience of the protocol as designed.
Wallets may alter this flow to suite the needs of their users.

### Onboarding

During onboarding on a supported device, after the PIN or password is set and the account key is created, the user should be informed about the account backup and given a chance opt-out of backup system for their account.
If they opt out, the rest of the setup should be skipped as they will not be using this account recovery system.

On Android, when the user opts-in, they should be prompted to select a Google account that they would like to use to store the backup.
On iOS, the user need not be prompted as there is a single Apple account on the device and the permissions architecture allows access to application-specific iCloud data without prompting the user.

In the background, the chosen PIN or password and a locally generated salt value should be used to query ODIS.
The resulting hardened key should be used to encrypt the BIP-39 account key mnemonic.
The encrypted mnemonic and metadata, including the salt, should be stored in the user's cloud storage.

### Recovery

During recovery, the application should determine if a backup is available in their cloud account.
On iOS, this can be done automatically.
On Android, the user may choose to restore from a cloud backup, at which point they should be prompted to choose their Google account.

If a backup is available the user may select to restore from a cloud backup, at which point they should be asked for their PIN or password.
Given the PIN or password, the application should combine it with the salt value and query ODIS to retrieve the hardened key for decrypting the account key backup.
If successful, the user will be sent to the home screen.
If unsuccessful, the user will be given the option to try again or enter their mnemonic phrase instead.

Users should, by requirement of security, be given a limited number of attempts to enter their PIN or password.
Attempts should be rate limited with a certain number of attempts available immediately (e.g. 3-5 attempts within the first 24 hours), and a limited number of additional attempts available after one or more waiting periods (e.g. up to 10-15 attempts over 3 days).
Once all attempts are exhausted, the backup will become unrecoverable and the user will only be able to recover their account if they have their mnemonic phrase written down.

## Implementation

Client support for the encrypted backup protocol described here is implemented in the [`@celo/encrypted-backup` package](https://github.com/celo-org/celo-monorepo/tree/master/packages/sdk/encrypted-backup).

Creating a backup file consists of a number of steps to derive the encryption key, and assemble the backup file.

1. Generate a random nonce and hash it with the password or PIN input to get the initial key.
2. Generate a random fuse key and hash it with the initial key to get an updated key.
   Encrypt this fuse key to the public key of the circuit breaker service and discard the plaintext fuse key.
3. Send the key as a blinded message to the ODIS to be hashed under a [password hardening domain](/protocol/identity/odis-use-case-key-hardening).
   Use an authentication key derived from the backup nonce such that only a user with access to the backup can make queries to ODIS.
   Hash the response from ODIS together with the key to generate the hardened key.
4. Encrypt the account mnemonic phrase with the hardened encryption key, and assemble it together with the nonce, ODIS domain information, encrypted fuse key, and environment metadata for ODIS and the circuit breaker.

If the implementing service does not wish to include a circuit breaker, which is described in more detail below, step two can be skipped.

The backup file created in this protocol can then be stored by the wallet that implements this protocol in some authenticated storage, such as iCloud or Google Drive.

In order to open the backup and recover the users account mnemonic the encrypted backup file is first retrieved from authenticated storage, then the decryption key is derived in the following steps similar to the steps above.

1. Hash the password or PIN input with the nonce in the backup to get the initial key.
2. Query the circuit breaker to unwrap the encrypted fuse key and hash it with the initial key to get an updated key.
3. Send the key as a blinded message to the ODIS to be hashed under the included [password hardening domain](/protocol/identity/odis-use-case-key-hardening).
   Use an authentication key derived from the backup nonce.
   Hash the response from ODIS together with the key to generate the hardened key.
4. Decrypt the backup data with the hardened decryption key and return it as the account mnemonic.

### Circuit breaker

In order to handle the event of an ODIS service compromise, this is protocol includes a recommended circuit breaker service.
A circuit breaker service is essentially an online decryption service with a well-known public key that can be taken offline if needed to prevent access to the decryption key.
By using a fuse key which is decrypted to the circuit breaker service, and therefore can only be accessed if the service is online, as a step to derive the encryption key for the backup, the circuit breaker service operator is able to disable decryption of backup files in case of an emergency to protect user funds.
In particular, if the ODIS key hardening service is discovered to be compromised, the circuit breaker operator will take their service offline, preventing backups using the circuit breaker from being opened.
This ensures that an attacker who has compromised ODIS cannot leverage their attack to forcibly open backups created with this function.

### PIN Blocklist

When using a 4 or 6 digit PIN code to encrypt a backup, there are a number of PINs that are far more common than common than others.
Sequences (123456), patterns (124578) and important dates (110989) are chosen most frequently.
Within 30 guesses, an attacker has a 5-9% chance of guessing a users first-choice PIN code, as suggested by [research into PIN security](https://this-pin-can-be-easily-guessed.github.io/).
In order to address this, it is highly recommended to block the most easily guessed PINs.
One way to do this is to block PINs that are most popular.
A suggested implementation, which is [implemented by the Valora wallet](https://github.com/valora-inc/wallet/blob/3940661c40d08e4c5db952bd0abeaabb0030fc7a/packages/mobile/src/pincode/authentication.ts#L56-L108), is to create a blocklist from the top 25k most frequently seen PINs in the HIBP Passwords dataset.
