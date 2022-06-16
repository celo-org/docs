---
title: Celo's Escrow Contract
description: Introduction to the Celo Escrow contract and how to use it to transfer, withdraw, and revoke funds.
---
# Escrow 

Introduction to the Celo Escrow contract and how to use it to transfer, withdraw, and revoke funds.

___

## Overview

The Escrow smart contract ([escrow.sol](https://github.com/celo-org/celo-monorepo/blob/6b6ce69fde8f4868b54abd8dd267e5313c3ddedd/packages/protocol/contracts/identity/Escrow.sol)) is a [Core Contract](../../../learn/celo-stack#celo-core-contracts) on Celo that lets users make escrowed payments. In short, Alice can make a payment to Bob, before Bob has a Celo account. This is particularly useful when Alice wants to invite Bob to Celo by making an escrowed payment he claim after creating an account.

The contract provides two options for making escrowed payments:

1. using the recipient's phone number as proof of identity
2. using a secret private key shared by the sender as proof of identity

The payments are stored in the contract and can be withdrawn by the recipient or the sender (more in this below).

## Payment flows

For ease of reference, here is some terminology for this page:

- Alice is the "**sender**"
- Bob is the "**recipient**"
- a `private key` and a `public key` are referred to as "**keys**", and
- with the associated `public address` they are altogether referred to as an "**account**"
- a temporary `private key` and `public key` are referred to as "**temporary keys**", and
- the associated temporary `public address` is referred to as a "**`paymentId`**"
- the keys are generated **randomly** or **deterministically** depending on the payment flow of choice \(more on this below\)
- a proof of ownership over a phone number is referred to as an "**attestation**"

### Option 1: Private key-based proof of identity

Scenario:

- Alice wants pay to Bob, but Bob doesn't have an account yet.
- The payment is facilitated by secretly exchanging a private key

[![Flow diagram for private key-based payment and proof of identity](https://mermaid.ink/img/pako:eNqtVU1r3DAQ_SuDLt0FJ4QlufgQSGkOpbSX9GgoY2vWFrElV5J3MSHH3voT2j-XX9KR5c3a67QNpcti9PE082bes_wgCiNJpMLR1450Qe8UlhabTAP_sPDGwk2tCooLLVqvCtWi9oBh-QsWhenCzMFNHC6RLfYNaf9eBtRnalpj0fbwgfoltjDaW84boLeusGZ_7ky9xOUm_23uSPutyTM9LnTe6K7Jycb5UBGcnV1fB1QKe47oAk3wJqwkkHc-DEAacvqNhwp3BKjhkLKnMZcl5mrLfLW5uExgc3XFj4vL9SwPp5k1K-VwDp5-fIuoT8YTmB3ZU1Rr1Q557576BNou593ZGKW05FyMQlqeMhrJTBmFmgKfSfsiG23g6ef3U0Iz2L_ROfbg2QYpWNTSNHUPJWmyHNSBo8IemnokMDnzyvSwej4z1jw3amByMFkKDd6TO2Rh9f-oSHI8V2BdK10CT7Xbkl2tQemFYU8F2QQtxsfCIoMTYxe4Ma5Crmb-tsBqpxDuPt4l0HClWAYGjuwuhGDHoza-YtJ77NcTFV5h1KHgmrYezDYSCUZhKoM0E9-vMuFUqaFrM_E3S71g8P_gp0O6iRY1quYoYudiW0IjT_o3NJVvoZzJnFILr_1S373ylbS4f1nf58tqUT93m9TuaC0Xjmvas7Kxq3J-Zb18L8V5i0oOZee0NZag4j_KiSrnIhEN2YZxfJM_hFiZYCc0lImUh5K22NU-E0ncqkiVlY974WrMRKYfOUbXSmZ2KxVfnyLdYu0oGQB3vS5E6m1HB9D4mRhRj78A75cbgw)](https://mermaid.live/edit#pako:eNqtVU1r3DAQ_SuDLt0FJ4QlufgQSGkOpbSX9GgoY2vWFrElV5J3MSHH3voT2j-XX9KR5c3a67QNpcti9PE082bes_wgCiNJpMLR1450Qe8UlhabTAP_sPDGwk2tCooLLVqvCtWi9oBh-QsWhenCzMFNHC6RLfYNaf9eBtRnalpj0fbwgfoltjDaW84boLeusGZ_7ky9xOUm_23uSPutyTM9LnTe6K7Jycb5UBGcnV1fB1QKe47oAk3wJqwkkHc-DEAacvqNhwp3BKjhkLKnMZcl5mrLfLW5uExgc3XFj4vL9SwPp5k1K-VwDp5-fIuoT8YTmB3ZU1Rr1Q557576BNou593ZGKW05FyMQlqeMhrJTBmFmgKfSfsiG23g6ef3U0Iz2L_ROfbg2QYpWNTSNHUPJWmyHNSBo8IemnokMDnzyvSwej4z1jw3amByMFkKDd6TO2Rh9f-oSHI8V2BdK10CT7Xbkl2tQemFYU8F2QQtxsfCIoMTYxe4Ma5Crmb-tsBqpxDuPt4l0HClWAYGjuwuhGDHoza-YtJ77NcTFV5h1KHgmrYezDYSCUZhKoM0E9-vMuFUqaFrM_E3S71g8P_gp0O6iRY1quYoYudiW0IjT_o3NJVvoZzJnFILr_1S373ylbS4f1nf58tqUT93m9TuaC0Xjmvas7Kxq3J-Zb18L8V5i0oOZee0NZag4j_KiSrnIhEN2YZxfJM_hFiZYCc0lImUh5K22NU-E0ncqkiVlY974WrMRKYfOUbXSmZ2KxVfnyLdYu0oGQB3vS5E6m1HB9D4mRhRj78A75cbgw)

<!-- 
Interim fix for a known bug that adds whitespace to large diagrams: https://github.com/celo-org/docs/pull/331#issuecomment-1155590026

Mermaid diagram: https://mermaid.live/edit#pako:eNqtVU1r3DAQ_SuDLt0FJ4QlufgQSGkOpbSX9GgoY2vWFrElV5J3MSHH3voT2j-XX9KR5c3a67QNpcti9PE082bes_wgCiNJpMLR1450Qe8UlhabTAP_sPDGwk2tCooLLVqvCtWi9oBh-QsWhenCzMFNHC6RLfYNaf9eBtRnalpj0fbwgfoltjDaW84boLeusGZ_7ky9xOUm_23uSPutyTM9LnTe6K7Jycb5UBGcnV1fB1QKe47oAk3wJqwkkHc-DEAacvqNhwp3BKjhkLKnMZcl5mrLfLW5uExgc3XFj4vL9SwPp5k1K-VwDp5-fIuoT8YTmB3ZU1Rr1Q557576BNou593ZGKW05FyMQlqeMhrJTBmFmgKfSfsiG23g6ef3U0Iz2L_ROfbg2QYpWNTSNHUPJWmyHNSBo8IemnokMDnzyvSwej4z1jw3amByMFkKDd6TO2Rh9f-oSHI8V2BdK10CT7Xbkl2tQemFYU8F2QQtxsfCIoMTYxe4Ma5Crmb-tsBqpxDuPt4l0HClWAYGjuwuhGDHoza-YtJ77NcTFV5h1KHgmrYezDYSCUZhKoM0E9-vMuFUqaFrM_E3S71g8P_gp0O6iRY1quYoYudiW0IjT_o3NJVvoZzJnFILr_1S373ylbS4f1nf58tqUT93m9TuaC0Xjmvas7Kxq3J-Zb18L8V5i0oOZee0NZag4j_KiSrnIhEN2YZxfJM_hFiZYCc0lImUh5K22NU-E0ncqkiVlY974WrMRKYfOUbXSmZ2KxVfnyLdYu0oGQB3vS5E6m1HB9D4mRhRj78A75cbgw
-->

You can **randomly** generate the `paymentId` (public address), `private key` and `public key` by:

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

### Option 2: Phone number-based proof of identity

Scenario:

- Alice wants pay to Bob, but Bob doesn't have an account yet.
- The payment is facilitated by using Bob's phone number

[![Flow diagram for phone number-based payment and proof of identity](https://mermaid.ink/img/pako:eNqlVc1q3DAQfpXBl-xSZ0lDlhIfAilNoRRCoT0agmzNrkVsSZXkXUzIsbc-QvtyeZKOLNvr9W7akPpg9PNp5puZb6SHKFccoySy-L1GmeMHwdaGVakE-ljulIHrUuQYFjQzTuRCM-mA-eU7lueq9jML12F4iNSsqVC6T9yjvmGllWGmgc_YHGJzJZ0hvx56Y3OjtgurykNcprI7XSiJHvheZScWvrTT27rK0Bw_8BzZECdZSWW3UDslR4baFMDp6dWVRyWwJYvWxwVO-ZUYstr5AXCFVp44KNiGqEnoXTbY-TJIwZl1Njs_u4jhfLmk39nFfM8PudnLbkLmLDz9-hFQt8ohqA2aKUobsWG0d49NDLrOaHdvzDg3aO3U15DLBO6l2h71NMK8ubiEt--WnvYSFotFgKLk0wC72MYB-hT1LveCkwqefv885vV10Q10dmEOMkyAo0NTCSks6YOVZQNrlGjIuoVZbYVcQxBXEMF8ymtk6oWsYDacmXuVdTrb6yFPstd_AhW7R9t7-mvh490hH4xnT1NpV2hmcxBy1EgkSQ5WYy5WjccZanth0LvwUtaGrIPaUi5sIXQX7CgTPfFdkc99fbvfpMj_nfC2iC9omzYvJa4cqFVoUE8hN9jaH3XhLI2sWEuodRr9S5HPNMHr5Dj20rVRm2s7SXZA7y63A2YV03ZKy19AI8NU8GtHgTvmhJK2LTtdbx-Rtwnn082DXPdkR7IqmagGMUIo2N5NPtSTLvmMWB3jeCjTrXAFN2w7lWk4PbwFB1kgNaDY7NrDtkF3RaYUaaKxMqqaaHefUm8-npR-06rRV0dOW8EVeMTk8TcizDUTvE2okNRfhaCbDrck_yBO3isziqOKGoTA9BY_eINpRM4qTKOEhhxXrC5dGsVhq0CxLlzY829VGqXykWzUmpPVGy7oPYuSFSstxi3gayPzKHGmxh7UPfQd6vEPwz-9JA)](https://mermaid.live/edit#pako:eNqlVc1q3DAQfpXBl-xSZ0lDlhIfAilNoRRCoT0agmzNrkVsSZXkXUzIsbc-QvtyeZKOLNvr9W7akPpg9PNp5puZb6SHKFccoySy-L1GmeMHwdaGVakE-ljulIHrUuQYFjQzTuRCM-mA-eU7lueq9jML12F4iNSsqVC6T9yjvmGllWGmgc_YHGJzJZ0hvx56Y3OjtgurykNcprI7XSiJHvheZScWvrTT27rK0Bw_8BzZECdZSWW3UDslR4baFMDp6dWVRyWwJYvWxwVO-ZUYstr5AXCFVp44KNiGqEnoXTbY-TJIwZl1Njs_u4jhfLmk39nFfM8PudnLbkLmLDz9-hFQt8ohqA2aKUobsWG0d49NDLrOaHdvzDg3aO3U15DLBO6l2h71NMK8ubiEt--WnvYSFotFgKLk0wC72MYB-hT1LveCkwqefv885vV10Q10dmEOMkyAo0NTCSks6YOVZQNrlGjIuoVZbYVcQxBXEMF8ymtk6oWsYDacmXuVdTrb6yFPstd_AhW7R9t7-mvh490hH4xnT1NpV2hmcxBy1EgkSQ5WYy5WjccZanth0LvwUtaGrIPaUi5sIXQX7CgTPfFdkc99fbvfpMj_nfC2iC9omzYvJa4cqFVoUE8hN9jaH3XhLI2sWEuodRr9S5HPNMHr5Dj20rVRm2s7SXZA7y63A2YV03ZKy19AI8NU8GtHgTvmhJK2LTtdbx-Rtwnn082DXPdkR7IqmagGMUIo2N5NPtSTLvmMWB3jeCjTrXAFN2w7lWk4PbwFB1kgNaDY7NrDtkF3RaYUaaKxMqqaaHefUm8-npR-06rRV0dOW8EVeMTk8TcizDUTvE2okNRfhaCbDrck_yBO3isziqOKGoTA9BY_eINpRM4qTKOEhhxXrC5dGsVhq0CxLlzY829VGqXykWzUmpPVGy7oPYuSFSstxi3gayPzKHGmxh7UPfQd6vEPwz-9JA)

<!-- 
Interim fix for a known bug that adds whitespace to large diagrams: https://github.com/celo-org/docs/pull/331#issuecomment-1155590026

Mermaid diagram: https://mermaid.live/edit#pako:eNqlVc1q3DAQfpXBl-xSZ0lDlhIfAilNoRRCoT0agmzNrkVsSZXkXUzIsbc-QvtyeZKOLNvr9W7akPpg9PNp5puZb6SHKFccoySy-L1GmeMHwdaGVakE-ljulIHrUuQYFjQzTuRCM-mA-eU7lueq9jML12F4iNSsqVC6T9yjvmGllWGmgc_YHGJzJZ0hvx56Y3OjtgurykNcprI7XSiJHvheZScWvrTT27rK0Bw_8BzZECdZSWW3UDslR4baFMDp6dWVRyWwJYvWxwVO-ZUYstr5AXCFVp44KNiGqEnoXTbY-TJIwZl1Njs_u4jhfLmk39nFfM8PudnLbkLmLDz9-hFQt8ohqA2aKUobsWG0d49NDLrOaHdvzDg3aO3U15DLBO6l2h71NMK8ubiEt--WnvYSFotFgKLk0wC72MYB-hT1LveCkwqefv885vV10Q10dmEOMkyAo0NTCSks6YOVZQNrlGjIuoVZbYVcQxBXEMF8ymtk6oWsYDacmXuVdTrb6yFPstd_AhW7R9t7-mvh490hH4xnT1NpV2hmcxBy1EgkSQ5WYy5WjccZanth0LvwUtaGrIPaUi5sIXQX7CgTPfFdkc99fbvfpMj_nfC2iC9omzYvJa4cqFVoUE8hN9jaH3XhLI2sWEuodRr9S5HPNMHr5Dj20rVRm2s7SXZA7y63A2YV03ZKy19AI8NU8GtHgTvmhJK2LTtdbx-Rtwnn082DXPdkR7IqmagGMUIo2N5NPtSTLvmMWB3jeCjTrXAFN2w7lWk4PbwFB1kgNaDY7NrDtkF3RaYUaaKxMqqaaHefUm8-npR-06rRV0dOW8EVeMTk8TcizDUTvE2okNRfhaCbDrck_yBO3isziqOKGoTA9BY_eINpRM4qTKOEhhxXrC5dGsVhq0CxLlzY829VGqXykWzUmpPVGy7oPYuSFSstxi3gayPzKHGmxh7UPfQd6vEPwz-9JA
-->

You can **deterministically** generate the `paymentId` (public address) and `private key` using Bob's phone number by:

1. generating a `private key` and a `public key` using [`generateDeterministicInviteCode()`](https://github.com/celo-org/celo-monorepo/blob/6b6ce69fde8f4868b54abd8dd267e5313c3ddedd/packages/sdk/utils/src/account.ts#L412) from [@celo/utils/lib/account](https://github.com/celo-org/celo-monorepo/blob/6b6ce69fde8f4868b54abd8dd267e5313c3ddedd/packages/sdk/utils/src/account.ts) and the recipient's phone number `pepper` from ODIS

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

<!-- Here are also some links to learn more about attestations, phone number mappings and phone number peppers from ODIS. -->

### Comparison

|       | Private key-based escrow                                                        | Phone number-based escrow                                                       |
|-------|---------------------------------------------------------------------------|---------------------------------------------------------------------------|
| Pro ✅ | Privacy preserving (cannot be tied to a user's identity)                  | Simply requires proving ownership over phone number                       |
| Con ❌ | Requires secretely sharing private key via SMS, messaging service or another method | Payment can be linked to a user with knowledge of their phone number |

### Revoking an escrow payment

The contract allows Alice (the sender) to revoke an unclaimed escrow payment she made and reclaim the funds. This is important if Bob never withdraws the escrow payment, or worse, the temporary key is lost or sent to an unintended recipient.

Every escrow payment has an expiry time set by the sender upon creation. After an escrow payment has expired, Alice can revoke the payment, after which the payment is returned to her and deleted from the escrow contract.

[![Revocation payment flow](https://mermaid.ink/img/pako:eNqdlF1L5DAUhv_KITc6UEVEb3ohKOvFIuzNellYTpMz02CT1Hw4W8T_vvloZ1oHWXAuhiZ5857nvE36zrgRxGrm6DWQ5vRD4s6iajTEH3JvLNz3klOZGNB6yeWA2gOm6T_IuQlp5OC-PJ4qBxwVaf9TJNUzqcFYtCM80Xiq5UZ7G-sm6aPj1uwvnelPda1pv6xdsB9M2-hpInijg2rJlnHuCC4u7u4O9eppch_NHXgDlt7MCwFqoIwxd1FBSxyDo1QAOnT6LFL3KBUJkB5G8peHuquI1uUUCpo9i_qX8QTmjex6X3Xcw7Hvpd5BHGq3JXu-AakXMUVaAY58hH8N0kYg-jvIGLWPdDBTWYrx2l17fn17W8H11U3-25TFZa5rYCEFaDP1OpOndj_TLywW7Hvpuwi7BEqk7TgFX1xIi1PMTDixbv6fbHlz7rvhlu2foy0uh9OZKq6MatgGLRygTX2lA4r8JZ2jxe1ZNHc0Sk5ZU0_VDtFKN7GI_F6P_tk60uVtZ3GuILCKKbIKpYj3-T3VaZjvSFHD6vgoaIuh9w2rylJHctf5spYuSMMa_RE9wiDQ06OQ8RKxeou9oyoLfo-as9rbQLNo-lhMqo9_PQd5Dg)](https://mermaid.live/edit#pako:eNqdlF1L5DAUhv_KITc6UEVEb3ohKOvFIuzNellYTpMz02CT1Hw4W8T_vvloZ1oHWXAuhiZ5857nvE36zrgRxGrm6DWQ5vRD4s6iajTEH3JvLNz3klOZGNB6yeWA2gOm6T_IuQlp5OC-PJ4qBxwVaf9TJNUzqcFYtCM80Xiq5UZ7G-sm6aPj1uwvnelPda1pv6xdsB9M2-hpInijg2rJlnHuCC4u7u4O9eppch_NHXgDlt7MCwFqoIwxd1FBSxyDo1QAOnT6LFL3KBUJkB5G8peHuquI1uUUCpo9i_qX8QTmjex6X3Xcw7Hvpd5BHGq3JXu-AakXMUVaAY58hH8N0kYg-jvIGLWPdDBTWYrx2l17fn17W8H11U3-25TFZa5rYCEFaDP1OpOndj_TLywW7Hvpuwi7BEqk7TgFX1xIi1PMTDixbv6fbHlz7rvhlu2foy0uh9OZKq6MatgGLRygTX2lA4r8JZ2jxe1ZNHc0Sk5ZU0_VDtFKN7GI_F6P_tk60uVtZ3GuILCKKbIKpYj3-T3VaZjvSFHD6vgoaIuh9w2rylJHctf5spYuSMMa_RE9wiDQ06OQ8RKxeou9oyoLfo-as9rbQLNo-lhMqo9_PQd5Dg)

<!-- 
Interim fix for a known bug that adds whitespace to large diagrams: https://github.com/celo-org/docs/pull/331#issuecomment-1155590026

Mermaid diagram: https://mermaid.live/edit#pako:eNqdlF1L5DAUhv_KITc6UEVEb3ohKOvFIuzNellYTpMz02CT1Hw4W8T_vvloZ1oHWXAuhiZ5857nvE36zrgRxGrm6DWQ5vRD4s6iajTEH3JvLNz3klOZGNB6yeWA2gOm6T_IuQlp5OC-PJ4qBxwVaf9TJNUzqcFYtCM80Xiq5UZ7G-sm6aPj1uwvnelPda1pv6xdsB9M2-hpInijg2rJlnHuCC4u7u4O9eppch_NHXgDlt7MCwFqoIwxd1FBSxyDo1QAOnT6LFL3KBUJkB5G8peHuquI1uUUCpo9i_qX8QTmjex6X3Xcw7Hvpd5BHGq3JXu-AakXMUVaAY58hH8N0kYg-jvIGLWPdDBTWYrx2l17fn17W8H11U3-25TFZa5rYCEFaDP1OpOndj_TLywW7Hvpuwi7BEqk7TgFX1xIi1PMTDixbv6fbHlz7rvhlu2foy0uh9OZKq6MatgGLRygTX2lA4r8JZ2jxe1ZNHc0Sk5ZU0_VDtFKN7GI_F6P_tk60uVtZ3GuILCKKbIKpYj3-T3VaZjvSFHD6vgoaIuh9w2rylJHctf5spYuSMMa_RE9wiDQ06OQ8RKxeou9oyoLfo-as9rbQLNo-lhMqo9_PQd5Dg
-->

## Smart contract details

The [escrow.sol](https://github.com/celo-org/celo-monorepo/blob/6b6ce69fde8f4868b54abd8dd267e5313c3ddedd/packages/protocol/contracts/identity/Escrow.sol) contract stores funds in a mapping from `paymentId` addresses to `EscrowedPayment` structs. Each `EscrowedPayment` struct has the following attributes:

```solidity
struct EscrowedPayment {
  bytes32 recipientIdentifier; // Optional: Bob's obfuscated phone number
  address sender; // Alice
  address token; // Token being sent
  uint256 value; // Value being sent
  uint256 sentIndex; // Location of this payment in sender's list of sent payments.
  uint256 receivedIndex; // Location of this payment in receivers's list of received payments.
  uint256 timestamp; // Time of escrow payment
  uint256 expirySeconds; // Expiry of payment
  uint256 minAttestations; // Optional: Required proof(s) of ownership over Bob's phone number
}
```

The contract emits the following events:

```solidity
event Transfer(
  address indexed from,
  bytes32 indexed identifier,
  address indexed token,
  uint256 value,
  address paymentId,
  uint256 minAttestations
);
```

:::caution Forthcoming change to Event Emitted in Escrow.sol

In a forthcoming Escrow.sol upgrade, we are proposing to change the data emitted in the `to` from `payment.sender` to `msg.sender`. [Read more on GitHub Discussions](https://github.com/celo-org/identity/discussions/25). 

:::

```solidity
event Withdrawal(
  bytes32 indexed identifier,
  address indexed to,
  address indexed token,
  uint256 value,
  address paymentId
);
```

```solidity
event Revocation(
  bytes32 indexed identifier,
  address indexed by,
  address indexed token,
  uint256 value,
  address paymentId
);
```
