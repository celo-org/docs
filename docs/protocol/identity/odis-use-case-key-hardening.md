---
title: Key Hardening
---

Passwords are useful primitive in a number of applications, allowing a user to authenticate themselves by knowing the secret information.
Unfortunately, effective offline password cracking techniques limit the use of passwords to derive encryption or authentication keys.
An attacker with access to a signature or encrypted file that used a password, or the hash of a password, as the key can make repeated guesses until they find the password.
Given advanced tools such as [`hashcat`](https://hashcat.net/hashcat/) and extensive experience, hackers are very good at guessing passwords.

Rate-limited or expensive hashing can be used to make it much more difficult to crack a password.
Computationally expensive password hashing functions, such as PBKDF and scrypt, are commonly used for this purpose, but provide [limited protection](https://arxiv.org/abs/2006.05023) and are expensive to run on end-user devices.
ODIS implements hashing (i.e. PRF evaluation) with a rate limit controlled by the committee of ODIS operators, and can be used to harden a password into a stronger cryptographic key.
As long as this committee remains collectively honest and secure, an attacker cannot make more guesses at a users password than ODIS allows, making it extremely unlikely a good password will be broken.

Using ODIS for key hardening allows passwords to be used in a number of applications, including to create [encrypted account backups](/protocol/identity/encrypted-cloud-backup) and as a factor in [smart contract account recovery](/protocol/identity/smart-contract-accounts).

## Rate limiting

Choosing an appropriately restrictive rate limit is crucial.
Using a rate limit that is too restrictive may cause users to become frustrated as their access is denied if they take too many tries to recall their password, and a rate limit that is too loose can allow an attacker a much better chance at guessing the users password.
The appropriate rate limit is related to how much entropy the user secret has.

- A strong user password can tolerate a loose rate limit, allowing millions of attempts without significant chance of attacker success.
- An average user password can tolerate a moderate rate limit, allowing hundreds of attempts.
- A 4 or 6 digit PIN can tolerate tens of attempts before the attacker has a significant chance of success.

Because the right rate limit is context specific, [Domains](/protocol/identity/odis-domain) can be configured to the needs of the user.
The [Sequential Delay Domain](/protocol/identity/odis-domain-sequential-delay-domain) is designed for the use case of PIN and password hashing, and can be used to allow for a fixed number of attempts over a configurable time period (e.g. 15 attempts over 3 days).
The Sequential Delay Domain additionally supports signature-based authentication to prevent quota from being consumed by any except the intended user.

## Salting

Even with the use of ODIS to prevent brute-force guessing of a password, it remains important to include a user-specific value in the hashing request as a salt to prevent [rainbow table attacks](https://wikipedia.org/wiki/Rainbow_table).
A salt can be included in the Domain parameter of the request to ODIS to ensure a rate limit is enforced specific to the user's context.
Using a random salt value is recommended, however a client identifier such as a username or [phone number hash](/protocol/identity/odis-use-case-phone-number-privacy) can also be used.

## Password filtering

In addition to using ODIS to harden passwords chosen by users, it is recommended that the application help the user choose a good password during onboarding.
Password filtering, blocking the user from setting a password which may be weak, can greatly improve the quality of a user's password and prevent it being broken by guessing the most common passwords (e.g. "password").
[NIST 800-63](https://pages.nist.gov/800-63-3/sp800-63-3.html) recommends that passwords should be checked against a list of known compromised passwords, such as [HIBP Passwords](https://haveibeenpwned.com/Passwords).
Additional research has found other [practical techniques for increasing the strength of passwords chosen by users](https://www.andrew.cmu.edu/user/nicolasc/publications/Tan-CCS20.pdf).
