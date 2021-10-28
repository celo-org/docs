---
title: Encrypted Cloud Backup
---

<!-- TODO(victor): Do we want to use a more creative protocol name here -->
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
This way, the users account key backup is only accessible to someone who can access their cloud storage account *and* knows their secret.

Because user-chosen secrets, especially PINs, are susceptible to guessing, this secret must be [hardened](https://en.wikipedia.org/wiki/Hardening_(computing)) before it can be used as an encryption key.
Using [ODIS](/celo-codebase/protocol/odis) for [key hardening](/celo-codebase/protocol/odis/use-cases/key-hardening), this scheme derives an encryption key for the account key backup that is resistant to guessing attacks.

With these core components, we can construct a cloud backup system that allows users who remember their password or PIN, and maintain access to a cloud storage account, to quickly and reliably recover their account while providing solid security guarantees.

Valora is currently working to implement encrypted cloud backup, using the user's access PIN for encryption.

### Similar protocols

- [iCloud Keychain](https://support.apple.com/guide/security/secure-icloud-keychain-recovery-secdeb202947/web) uses 6-digit PIN, hardened by an HSM app, and encrypt iCloud Keychain backups.
- [Signal SVR](https://support.apple.com/guide/security/secure-icloud-keychain-recovery-secdeb202947/web) uses a 4-digit PIN or alphanumeric password, hardened by an Intel SGX app, to encrypt contacts and metadata.
- [Coinbase Wallet](https://blog.coinbase.com/backup-your-private-keys-on-google-drive-and-icloud-with-coinbase-wallet-3c3f3fdc86dc) uses a password encrypted cloud backup to store user account keys. It is unclear if any hardening is used.
- [MixIn Network TIP](https://github.com/MixinNetwork/tip) uses 6-digit PINs, hardened by a set of signers, to derive account keys

## User experience

Here we describe the user experience of the protocol as designed.
Wallets may alter this flow to suite the needs of their users.

### Onboarding

During onboarding on a supported device, after the PIN or password is set and the account key is created, the user should be informed about cloud backup and given a chance opt-out of cloud backup for their account.
If they opt out, the rest of the setup should be skipped as they will not be using cloud backup.

On Android, when the user opts-in, they should be prompted to select a Google account that they would like to use to store the backup.
On iOS, the user need not be prompted as there is a single Apple account on the device and the permissions architecture allows access to application-specific iCloud data without prompting the user.

In the background, the chosen PIN or password and a locally generated salt value should be used to query ODIS.
The resulting hardened key should be used to encrypt the account key mnemonic.
The encrypted mnemonic and metadata, including the salt, should be stored in the user's cloud storage.

### Recovery

During recovery, the application should determine if a cloud backup is available.
On iOS, this can be done automatically.
On Android, the user may choose to restore from cloud backup, at which point they should be prompted to choose their Google account.

If a backup is available the user may select to restore from cloud backup, at which point they should be asked for their PIN or password.
Given the PIN or password, the application should combine it with the salt value and query ODIS to retrieve the hardened key for decrypting the account key backup.
If successful, the user will be sent to the home screen.
If unsuccessful, the user will be given the option to try again or enter their mnemonic phrase instead.

Users should, by requirement of security, be given a limited number of attempts to enter their PIN or password.
Attempts should be rate limited with a certain number of attempts available immediately (e.g. 3-5 attempts within the first 24 hours), and a limited number of additional attempts available after one or more waiting periods (e.g. up to 10-15 attempts over 3 days).
Once all attempts are exhausted, the backup will become unrecoverable and the user will only be able to recover their account if they have their mnemonic phrase written down.

<!-- TODO(victor): Add detailed information about the key derivation and file structure when the library is implemented and can be referenced -->
