---
title: Celo's Escrow Contract
description: Introduction to the Celo Escrow contract and how to use it to transfer, withdraw, and revoke funds.
---
# Escrow 

Introduction to the Celo Escrow contract and how to use it to transfer, withdraw, and revoke funds.

___

## Overview

The Escrow smart contract ([escrow.sol](https://github.com/celo-org/celo-monorepo/blob/6b6ce69fde8f4868b54abd8dd267e5313c3ddedd/packages/protocol/contracts/identity/Escrow.sol)) is a [Core Contract](../../../learn/celo-stack#celo-core-contracts) on Celo that lets users make escrowed payments. This is particularly useful when Alice wants to make a payment to Bob, before Bob has a Celo account.

For example, inviting new users to Celo by paying them some CELO prior to joining, is a use case that is enabled by escrowed payments. 

The contract provides two options to make escrowed payments:

1. using the recipient's phone number and attestations, or
2. by sharing a (traditional) private key with the recipient.

The payments are stored in the contract and can be withdrawn by the recipient or the sender.

## Payment flows

For ease of reference, here is some terminology we will use on this page:

- Alice ("sender")
  - has a `private key` and a `public key` referred to as **Keys**, and
  - has an associated `public address`, altogether referred to as an **Account**
- Bob ("recipient")
  - has (or will have) a `private key` and a `public key` referred to as **Keys**, and
  - has (or will have)  an associated `public address`, altogether referred to as an **Account**
- There is
  - a temporary `private key` and `public key` referred to as **Temporary Key**, and
  - an associated `public address` referred to as **`paymentId`**
  - these are generated _randomly_ or _deterministically_ depending on the payment flow choice
- There are
  - proofs of ownership over a phone number referred to as **`attestations`**

### Option 1: Private key-based escrow payment

Scenario:

- Alice wants pay to Bob, but Bob doesn't have an account yet.
- The payment is facilitated by secretly exchanging a private key

[![Flow diagram for private key-based payment and proof of identity](https://mermaid.ink/img/pako:eNqtVU1r3DAQ_SuDLt2AE8KSXHwIpDSHUtrL9mgoY2tsi9iSK8lrTMixt_6E9s_ll3S09u7a620bSpfF6ONJ783M8_hJZEaSiIWjry3pjN4pLCzWiQb-YeaNhftKZTQsNGi9ylSD2gOG5S-YZaYNMwf3w3CJbLCvSfv3MqA-U90Yi7aHD9QvsZnR3jJvgD64zJruyplqiUtN-lvuQfZbkyZ6XGi90W2dkh3mu4jg8vLuLqBi6PhGF2SCN2ElgrT1YQDSkNNvPJS4JUANe8qeRi5LrNUW6Wp9fRPB-vaWH9c3FzMeppklK-brHLz8-DagPhlPYLZkT1GNVVvkvUfqI2jalHdnY5TSknPDLaTlqaJRzFRRiCnomaRvUKMNvPz8fipoBvs3OcccHGwQg0UtTV31UJAmy5e6U-YJ-JW8sDqcGYOdOzRI2Lsrhhofye1ZuOx_LEV0PJdhVSldAE-1y8muLkDphVNPK7EORRgfC2_sLLgpkYOYvx2w2iqEzcdNBDUHiEUgdmS34SQ7HLXxJWvtsL-YZP0VxtzFWVHuweQDfzBGZimUYurzVSKcKjS0TSL-ZqEzhv4P_tnTTUpQoaqPtWtdSMs8cS5kk9tNyipONYX3e1nPTvlSWuzO1_PQlRaBc5pJbY9WcuG4po69PaRTznvT-QY0zBtUchdvSrmxBCX_UU7KcSUiUZOtGcct-ynclQi2QE2JiHkoKce28omIhq2SVFH6YS_0wEQk-pnvaBvJyh6k4j4p4hwrR9EOsOl1JmJvW9qDxu_BiHr-BZ5VEow)](https://mermaid.live/edit#pako:eNqtVU1r3DAQ_SuDLt2AE8KSXHwIpDSHUtrL9mgoY2tsi9iSK8lrTMixt_6E9s_ll3S09u7a620bSpfF6ONJ783M8_hJZEaSiIWjry3pjN4pLCzWiQb-YeaNhftKZTQsNGi9ylSD2gOG5S-YZaYNMwf3w3CJbLCvSfv3MqA-U90Yi7aHD9QvsZnR3jJvgD64zJruyplqiUtN-lvuQfZbkyZ6XGi90W2dkh3mu4jg8vLuLqBi6PhGF2SCN2ElgrT1YQDSkNNvPJS4JUANe8qeRi5LrNUW6Wp9fRPB-vaWH9c3FzMeppklK-brHLz8-DagPhlPYLZkT1GNVVvkvUfqI2jalHdnY5TSknPDLaTlqaJRzFRRiCnomaRvUKMNvPz8fipoBvs3OcccHGwQg0UtTV31UJAmy5e6U-YJ-JW8sDqcGYOdOzRI2Lsrhhofye1ZuOx_LEV0PJdhVSldAE-1y8muLkDphVNPK7EORRgfC2_sLLgpkYOYvx2w2iqEzcdNBDUHiEUgdmS34SQ7HLXxJWvtsL-YZP0VxtzFWVHuweQDfzBGZimUYurzVSKcKjS0TSL-ZqEzhv4P_tnTTUpQoaqPtWtdSMs8cS5kk9tNyipONYX3e1nPTvlSWuzO1_PQlRaBc5pJbY9WcuG4po69PaRTznvT-QY0zBtUchdvSrmxBCX_UU7KcSUiUZOtGcct-ynclQi2QE2JiHkoKce28omIhq2SVFH6YS_0wEQk-pnvaBvJyh6k4j4p4hwrR9EOsOl1JmJvW9qDxu_BiHr-BZ5VEow)

<!-- 
Interim fix for a known bug that adds whitespace to large diagrams: https://github.com/celo-org/docs/pull/331#issuecomment-1155590026

Mermaid diagram: https://mermaid.live/edit#pako:eNqtVU1r3DAQ_SuDLt2AE8KSXHwIpDSHUtrL9mgoY2tsi9iSK8lrTMixt_6E9s_ll3S09u7a620bSpfF6ONJ783M8_hJZEaSiIWjry3pjN4pLCzWiQb-YeaNhftKZTQsNGi9ylSD2gOG5S-YZaYNMwf3w3CJbLCvSfv3MqA-U90Yi7aHD9QvsZnR3jJvgD64zJruyplqiUtN-lvuQfZbkyZ6XGi90W2dkh3mu4jg8vLuLqBi6PhGF2SCN2ElgrT1YQDSkNNvPJS4JUANe8qeRi5LrNUW6Wp9fRPB-vaWH9c3FzMeppklK-brHLz8-DagPhlPYLZkT1GNVVvkvUfqI2jalHdnY5TSknPDLaTlqaJRzFRRiCnomaRvUKMNvPz8fipoBvs3OcccHGwQg0UtTV31UJAmy5e6U-YJ-JW8sDqcGYOdOzRI2Lsrhhofye1ZuOx_LEV0PJdhVSldAE-1y8muLkDphVNPK7EORRgfC2_sLLgpkYOYvx2w2iqEzcdNBDUHiEUgdmS34SQ7HLXxJWvtsL-YZP0VxtzFWVHuweQDfzBGZimUYurzVSKcKjS0TSL-ZqEzhv4P_tnTTUpQoaqPtWtdSMs8cS5kk9tNyipONYX3e1nPTvlSWuzO1_PQlRaBc5pJbY9WcuG4po69PaRTznvT-QY0zBtUchdvSrmxBCX_UU7KcSUiUZOtGcct-ynclQi2QE2JiHkoKce28omIhq2SVFH6YS_0wEQk-pnvaBvJyh6k4j4p4hwrR9EOsOl1JmJvW9qDxu_BiHr-BZ5VEow
-->

<!-- Table version of Pros/Cons below -->

Pro: Privacy preserving (only keys are exchanged)
Con: Private key has to be exchanged off-chain in a secure way

You can _randomly_ generate the `paymentId` (public address), `private key` and `public key` by:

1. calling [`generateKeys()`](https://github.com/celo-org/celo-monorepo/blob/6b6ce69fde8f4868b54abd8dd267e5313c3ddedd/packages/sdk/utils/src/account.ts#L400) from [@celo/utils/lib/account](https://github.com/celo-org/celo-monorepo/blob/6b6ce69fde8f4868b54abd8dd267e5313c3ddedd/packages/sdk/utils/src/account.ts)

    ```ts
    function generateKeys(
        mnemonic: string,
    password?: string,
    changeIndex: number = 0,
    addressIndex: number = 0,
    bip39ToUse: Bip39 = bip39Wrapper,
    derivationPath: string = CELO_DERIVATION_PATH_BASE
    ): Promise<{ privateKey: string; publicKey: string; address: string }> {
        const seed: Buffer = await generateSeed(mnemonic, password, bip39ToUse)
    return generateKeysFromSeed(seed, changeIndex, addressIndex, derivationPath)
    }
    ```

2. converting the `public key` into a `public address` (referred to as the `paymentId` in this context) using [`publicKeyToAddress()`](https://github.com/celo-org/celo-monorepo/blob/6b6ce69fde8f4868b54abd8dd267e5313c3ddedd/packages/sdk/utils/src/address.ts#L38) from [@celo/utils/lib/address](https://github.com/celo-org/celo-monorepo/blob/6b6ce69fde8f4868b54abd8dd267e5313c3ddedd/packages/sdk/utils/src/address.ts).

### Option 2: Phone number-based escrow payment

Scenario:

- Alice wants pay to Bob, but Bob doesn't have an account yet.
- The payment is facilitated by using Bob's phone number

[![Flow diagram for phone number-based payment and proof of identity](https://mermaid.ink/img/pako:eNqlVc1q3DAQfpXBl-xSZ0lDlhIfAilNoRRCoT0agmzNrkVsSZXkXUzIsbc-QvtyeZKOLNvr9W7akPpg9PNp5puZb6SHKFccoySy-L1GmeMHwdaGVakE-ljulIHrUuQYFjQzTuRCM-mA-eU7lueq9jML12F4iNSsqVC6T9yjvmGllWGmgc_YHGJzJZ0hvx56Y3OjtgurykNcprI7XSiJHvheZScWvrTT27rK0Bw_8BzZECdZSWW3UDslR4baFMDp6dWVRyWwJYvWxwVO-ZUYstr5AXCFVp44KNiGqEnoXTbY-TJIwZl1Njs_u4jhfLmk39nFfM8PudnLbkLmLDz9-hFQt8ohqA2aKUobsWG0d49NDLrOaHdvzDg3aO3U15DLBO6l2h71NMK8ubiEt--WnvYSFotFgKLk0wC72MYB-hT1LveCkwqefv885vV10Q10dmEOMkyAo0NTCSks6YOVZQNrlGjIuoVZbYVcQxBXEMF8ymtk6oWsYDacmXuVdTrb6yFPstd_AhW7R9t7-mvh490hH4xnT1NpV2hmcxBy1EgkSQ5WYy5WjccZanth0LvwUtaGrIPaUi5sIXQX7CgTPfFdkc99fbvfpMj_nfC2iC9omzYvJa4cqFVoUE8hN9jaH3XhLI2sWEuodRr9S5HPNMHr5Dj20rVRm2s7SXZA7y63A2YV03ZKy19AI8NU8GtHgTvmhJK2LTtdbx-Rtwnn082DXPdkR7IqmagGMUIo2N5NPtSTLvmMWB3jeCjTrXAFN2w7lWk4PbwFB1kgNaDY7NrDtkF3RaYUaaKxMqqaaHefUm8-npR-06rRV0dOW8EVeMTk8TcizDUTvE2okNRfhaCbDrck_yBO3isziqOKGoTA9BY_eINpRM4qTKOEhhxXrC5dGsVhq0CxLlzY829VGqXykWzUmpPVGy7oPYuSFSstxi3gayPzKHGmxh7UPfQd6vEPwz-9JA)](https://mermaid.live/edit#pako:eNqlVc1q3DAQfpXBl-xSZ0lDlhIfAilNoRRCoT0agmzNrkVsSZXkXUzIsbc-QvtyeZKOLNvr9W7akPpg9PNp5puZb6SHKFccoySy-L1GmeMHwdaGVakE-ljulIHrUuQYFjQzTuRCM-mA-eU7lueq9jML12F4iNSsqVC6T9yjvmGllWGmgc_YHGJzJZ0hvx56Y3OjtgurykNcprI7XSiJHvheZScWvrTT27rK0Bw_8BzZECdZSWW3UDslR4baFMDp6dWVRyWwJYvWxwVO-ZUYstr5AXCFVp44KNiGqEnoXTbY-TJIwZl1Njs_u4jhfLmk39nFfM8PudnLbkLmLDz9-hFQt8ohqA2aKUobsWG0d49NDLrOaHdvzDg3aO3U15DLBO6l2h71NMK8ubiEt--WnvYSFotFgKLk0wC72MYB-hT1LveCkwqefv885vV10Q10dmEOMkyAo0NTCSks6YOVZQNrlGjIuoVZbYVcQxBXEMF8ymtk6oWsYDacmXuVdTrb6yFPstd_AhW7R9t7-mvh490hH4xnT1NpV2hmcxBy1EgkSQ5WYy5WjccZanth0LvwUtaGrIPaUi5sIXQX7CgTPfFdkc99fbvfpMj_nfC2iC9omzYvJa4cqFVoUE8hN9jaH3XhLI2sWEuodRr9S5HPNMHr5Dj20rVRm2s7SXZA7y63A2YV03ZKy19AI8NU8GtHgTvmhJK2LTtdbx-Rtwnn082DXPdkR7IqmagGMUIo2N5NPtSTLvmMWB3jeCjTrXAFN2w7lWk4PbwFB1kgNaDY7NrDtkF3RaYUaaKxMqqaaHefUm8-npR-06rRV0dOW8EVeMTk8TcizDUTvE2okNRfhaCbDrck_yBO3isziqOKGoTA9BY_eINpRM4qTKOEhhxXrC5dGsVhq0CxLlzY829VGqXykWzUmpPVGy7oPYuSFSstxi3gayPzKHGmxh7UPfQd6vEPwz-9JA)

<!-- 
Interim fix for a known bug that adds whitespace to large diagrams: https://github.com/celo-org/docs/pull/331#issuecomment-1155590026

Mermaid diagram: https://mermaid.live/edit#pako:eNqlVc1q3DAQfpXBl-xSZ0lDlhIfAilNoRRCoT0agmzNrkVsSZXkXUzIsbc-QvtyeZKOLNvr9W7akPpg9PNp5puZb6SHKFccoySy-L1GmeMHwdaGVakE-ljulIHrUuQYFjQzTuRCM-mA-eU7lueq9jML12F4iNSsqVC6T9yjvmGllWGmgc_YHGJzJZ0hvx56Y3OjtgurykNcprI7XSiJHvheZScWvrTT27rK0Bw_8BzZECdZSWW3UDslR4baFMDp6dWVRyWwJYvWxwVO-ZUYstr5AXCFVp44KNiGqEnoXTbY-TJIwZl1Njs_u4jhfLmk39nFfM8PudnLbkLmLDz9-hFQt8ohqA2aKUobsWG0d49NDLrOaHdvzDg3aO3U15DLBO6l2h71NMK8ubiEt--WnvYSFotFgKLk0wC72MYB-hT1LveCkwqefv885vV10Q10dmEOMkyAo0NTCSks6YOVZQNrlGjIuoVZbYVcQxBXEMF8ymtk6oWsYDacmXuVdTrb6yFPstd_AhW7R9t7-mvh490hH4xnT1NpV2hmcxBy1EgkSQ5WYy5WjccZanth0LvwUtaGrIPaUi5sIXQX7CgTPfFdkc99fbvfpMj_nfC2iC9omzYvJa4cqFVoUE8hN9jaH3XhLI2sWEuodRr9S5HPNMHr5Dj20rVRm2s7SXZA7y63A2YV03ZKy19AI8NU8GtHgTvmhJK2LTtdbx-Rtwnn082DXPdkR7IqmagGMUIo2N5NPtSTLvmMWB3jeCjTrXAFN2w7lWk4PbwFB1kgNaDY7NrDtkF3RaYUaaKxMqqaaHefUm8-npR-06rRV0dOW8EVeMTk8TcizDUTvE2okNRfhaCbDrck_yBO3isziqOKGoTA9BY_eINpRM4qTKOEhhxXrC5dGsVhq0CxLlzY829VGqXykWzUmpPVGy7oPYuSFSstxi3gayPzKHGmxh7UPfQd6vEPwz-9JA
-->

<!-- Table version of Pros/Cons below -->

You can _deterministically_ generate the `paymentId` (public address) and `private key` using Bob's phone number by:

1. generating a `private key` and a `public key` using [`generateDeterministicInviteCode()`](https://github.com/celo-org/celo-monorepo/blob/6b6ce69fde8f4868b54abd8dd267e5313c3ddedd/packages/sdk/utils/src/account.ts#L412) from [@celo/utils/lib/account](https://github.com/celo-org/celo-monorepo/blob/6b6ce69fde8f4868b54abd8dd267e5313c3ddedd/packages/sdk/utils/src/account.ts) and the recipient's ODIS phone number `pepper` 

    ```ts
    function generateDeterministicInviteCode(
        recipientPhoneHash: string,
    recipientPepper: string,
    addressIndex: number = 0,
    changeIndex: number = 0,
    derivationPath: string = CELO_DERIVATION_PATH_BASE
    ): { privateKey: string; publicKey: string } {
        const seed = keccak256(recipientPhoneHash + recipientPepper) as Buffer
    return generateKeysFromSeed(seed, changeIndex, addressIndex, derivationPath)
    }
    ```

2. converting the `public key` into a `public address` (referred to as the `paymentId` in this context) using [`publicKeyToAddress()`](https://github.com/celo-org/celo-monorepo/blob/6b6ce69fde8f4868b54abd8dd267e5313c3ddedd/packages/sdk/utils/src/address.ts#L38) from [@celo/utils/lib/address](https://github.com/celo-org/celo-monorepo/blob/6b6ce69fde8f4868b54abd8dd267e5313c3ddedd/packages/sdk/utils/src/address.ts).

You can find Valora's implementation of the phone number-based escrow payment in [Github > valora-inc > wallet > src > escrow (> utils.ts)](https://github.com/valora-inc/wallet/blob/2ec5767ac55197c8e97d449c2ea6479c3520859d/src/escrow/utils.ts).

<!-- Arthur todo: add link to attestation overview -->

Here are some links to learn more about attestations, phone number mappings and phone number peppers from ODIS.

## How it works

If Alice wants to send a payment to Bob, who doesn’t yet have an associated address, she will send that payment to this `Escrow` contract and will also create a temporary public/private key pair. The associated temporary address will be referred to as the `paymentId`. Alice will then externally share the newly created temporary private key, also known as an _invitation_, to Bob, who will later use it to claim the payment. This paymentId will now be stored in this contract and will be mapped to relevant details related to this specific payment such as: the value of the payment, an optional identifier of the intended recipient, an optional amount of `attestations` the recipient must have before being able to withdraw the payment, an amount of time after which the payment will expire \(more on that in the “withdrawing” section below\), which asset is being transferred in this payment, etc.

## Withdrawing

The recipient of an escrowed payment can choose to withdraw their payment assuming they have successfully created their own public/private key pair and now have an address. To prove their identity, the recipient must be able to prove ownership of the paymentId’s private key, which should have been given to them by the original sender. If the sender set a minimum number of attestations required to withdraw the payment, that will also be checked in order to successfully withdraw. Following the same example as above, if Bob wants to withdraw the payment Alice sent him, he must sign a message with the private key given to him by Alice. The message will be the address of Bob’s newly created account. Bob will then be able to withdraw his payment by providing the paymentId and the v, r, and s outputs of the generated ECDSA signature.

## Revoking & Reclaiming

Alice sends Bob an escrowed payment. Let’s say Bob never withdraws it, or worse, the temporary private key he needs to withdraw the payment gets lost or sent to the wrong person. For this purpose, Celo’s protocol also allows for senders to reclaim any unclaimed escrowed payment that they sent. After an escrowed payment has expired \(each payment has its own expiry length that is set by the sender upon creation\), the sender of the payment can revoke the payment and reclaim their funds with just the paymentId. -->
