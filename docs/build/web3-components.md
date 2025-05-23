---
title: Composer Kit
description: A comprehensive guide to Web3 components to build on Celo, including wallets, smart contracts, and decentralized applicationsComp
---

# Composer Kit

Composer Kit ([@composer-kit/ui](https://github.com/celo-org/composer-kit)) is a **ready-to-use React component library** designed specifically for building web3 applications on the **Celo blockchain**. It provides a comprehensive set of modular, accessible, and customizable UI components that make it easy to integrate wallet connections, token balances, payments, NFT interactions, and more into your dApp. The library aims to accelerate development, ensure design consistency, and reduce the complexity of handling blockchain-specific UI patterns.

**Key Features:**
- Plug-and-play React components for Celo dApps
- Wallet connection, payment, swap, NFT, and identity modules
- Simple installation and configuration
- Optimized for accessibility and responsive design
- Comprehensive documentation and real-world usage examples

Below you'll find detailed documentation and code examples for each component in the library.

## Installation

```bash
# npm
npm install @composer-kit/ui

# pnpm
pnpm add @composer-kit/ui

# yarn
yarn add @composer-kit/ui
```

## Getting Started

To use Composer Kit in your React application, you'll need to configure the `ComposerKitProvider` in your app.

```jsx
import { ComposerKitProvider } from "@composer-kit/ui";

function App() {
  return <ComposerKitProvider>{/* Your app content */}</ComposerKitProvider>;
}
```

## Components

---

## Address

The `Address` component is used to display an Ethereum address. It can be used to display an address in a readable format or to copy the address to the clipboard.

## Props

### `Address`

| Prop             | Type                                   | Description                                                                                                                                                                       | Default     |
| ---------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `isTruncated`    | `boolean` (optional)                   | Determines if the address should be truncated for display. Truncation typically hides the middle part of long addresses.                                                          | `false`     |
| `className`      | `string` (optional)                    | A custom CSS class to apply styles to the component.                                                                                                                              | `-`         |
| `address`        | `string`                               | The actual address to display. This is a required prop.                                                                                                                           | `-`         |
| `copyOnClick`    | `boolean` (optional)                   | If `true`, the address will be copied to the clipboard when clicked.                                                                                                              | `false`     |
| `onCopyComplete` | `(message: string) => void` (optional) | A callback that is triggered after the address is copied. It receives an address in case of success else `Failed to copy address` that can be used for feedback or notifications. | `undefined` |

---

### Example

```tsx
import { Address } from "@composer-kit/ui/address";
import { useState } from "react";

export const Basic = () => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div>
      <Address
        address="0x208B03553D46A8A16ed53e8632743249dd2E79c3"
        className="bg-white dark:bg-black p-2 rounded-md font-semibold"
        onCopyComplete={() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1000);
        }}
      />
      {isCopied && (
        <p className="mt-2 text-white dark:text-black bg-black dark:bg-white p-1 font-medium text-sm text-center w-[4rem] rounded-md">
          Copied
        </p>
      )}
    </div>
  );
};
```

## Balance

The `Balance` component is designed to display and manage token balances seamlessly.

## Props

| Prop         | Type                                         | Description                                                                     |
|--------------|----------------------------------------------|---------------------------------------------------------------------------------|
| children     | React.ReactNode                              | The content to be rendered inside the `Balance` component.                      |
| precision    | number (optional)                            | The number of decimal places to display in the balance. Defaults to `18`.       |
| tokens       | Token[]                                      | An array of `Token` objects to display as selectable options.                   |
| ...          | `React.HTMLAttributes<HTMLParagraphElement>`  | Any additional HTML attributes for the `p` tag, like `className`, `style`, etc. |
| name         | string                                       | The name of the token.                                                          |
| symbol       | string                                       | The symbol of the token.                                                        |
| address      | string                                       | The contract address of the token.                                              |
| decimals     | number                                       | The number of decimal places for the token.                                     |
| icon         | string?                                      | The icon for the token (optional).                                              |
| chainId      | number                                       | Chain ID.                                                                       |

---

### Example

```tsx
import {
  BalanceInput,
  BalanceOptions,
  BalanceText,
  Balance,
} from "@composer-kit/ui/balance";
import { swapableTokens } from "../../utils/constants";

export const BalanceBasic = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-96 p-4 bg-white dark:bg-black rounded-lg shadow-lg">
        <Balance>
          <div className="flex flex-col gap-4">
            <BalanceOptions tokens={swapableTokens} />
            <BalanceInput />
          </div>
          <div className="mt-4">
            <BalanceText />
          </div>
        </Balance>
      </div>
    </div>
  );
};
```

## Identity

The `Identity` component displays user information such as address, name, balance, and social links in a visually appealing way.

## Props

| Prop        | Type                                            | Description                                               |
|-------------|-------------------------------------------------|-----------------------------------------------------------|
| address     | Address                                         | The address of the identity.                              |
| token       | "CELO" | "cUSD" | "USDT" (optional)                | The type of token associated with the identity.           |
| isTruncated | boolean (optional)                              | Whether the name should be truncated.                     |
| tag         | "github" | "twitter" | "url" | "farcaster"           | The social platform tag for the link.                     |
| precison    | number (optional)                               | The precision for displaying the balance.                 |
| ...         | `React.HTMLAttributes<HTMLImageElement>`      | Avatar: All standard image attributes.                    |
| ...         | `React.HTMLAttributes<HTMLDivElement>`            | Avatar: All standard div attributes.                      |
| ...         | `React.HTMLAttributes<HTMLSpanElement> `          | Name: All standard span attributes.                       |

---

### Example

```tsx
import {
  Avatar,
  Balance,
  Identity,
  Name,
  Social,
} from "@composer-kit/ui/identity";

export const IdentityBasic = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-auto p-6 bg-white dark:bg-black rounded-lg shadow-lg min-w-[200px]">
        <Identity
          address="0xE1061b397cC3C381E95a411967e3F053A7c50E70"
          className="flex gap-4 items-center"
          token="cUSD"
        >
          <Avatar />
          <div className="flex flex-col">
            <Name />
            <Balance />
          </div>
          <Social tag="twitter" />
        </Identity>
      </div>
    </div>
  );
};
```

## NFT

The `NFTCard` and `NFTMint` components are designed to display NFT details and provide a minting interface for NFTs.

## Props

| Prop         | Type                      | Description                                                        |
|--------------|---------------------------|--------------------------------------------------------------------|
| className    | string (optional)         | Custom CSS class for styling the NFT card or subcomponents.        |
| style        | `React.CSSProperties`       | Inline styles for custom styling.                                  |
| children     | `React.ReactNode`           | Additional elements inside the card.                               |
| tokenId      | bigint                    | The token ID of the NFT.                                           |
| contractAddress | string                  | The contract address of the NFT.                                   |
| ...          | `React.HTMLAttributes<any>` | Any additional HTML attributes for the elements.                   |

---

### Example: Preview

```tsx
import {
  NFT,
  NFTCard,
  NFTImage,
  NFTMeta,
  NFTTokenId,
} from "@composer-kit/ui/nft";

export const NftPreview = () => {
  return (
    <div className="flex items-center justify-center">
      <NFT
        contractAddress="0xd447209176470be0db276549c7143265a559Fb6b"
        tokenId={BigInt("2334")}
      >
        <NFTCard>
          <NFTMeta />
          <NFTImage />
          <NFTTokenId />
        </NFTCard>
      </NFT>
    </div>
  );
};
```

### Example: Mint

```tsx
import {
  NFT,
  NFTCard,
  NFTImage,
  NFTMeta,
  NFTMint,
  NFTTokenId,
} from "@composer-kit/ui/nft";

export const NftMint = () => {
  return (
    <div className="flex items-center justify-center">
      <NFT
        contractAddress="0xd447209176470be0db276549c7143265a559Fb6b"
        tokenId={BigInt("2334")}
      >
        <NFTCard>
          <NFTMeta />
          <NFTImage />
          <NFTTokenId />
          <NFTMint />
        </NFTCard>
      </NFT>
    </div>
  );
};
```

## Payment

The `Payment` component is designed to send payment to a recipient address with built-in dialog and error handling.

## Props

| Prop               | Type                       | Description                                                    |
|--------------------|----------------------------|----------------------------------------------------------------|
| amount             | string                     | The amount to be paid.                                         |
| tokenAddress       | Address                    | The address of the token being used for the payment.           |
| recipientAddress   | Address                    | The address of the recipient receiving the payment.            |
| onSuccess          | (txHash: string) => void   | Callback function triggered upon successful payment. Optional. |
| onError            | (error: Error) => void     | Callback function triggered when an error occurs. Optional.    |
| children           | `React.ReactNode`            | The children nodes to render inside the provider.              |
| chain              | Chain                      | The blockchain chain to use for the payment.                   |
| open               | boolean                    | Determines whether the dialog is open or not.                  |
| onOpenChange       | (open: boolean) => void    | Callback function triggered when the open state changes.       |
| className          | string                     | CSS class name for styling the button. Optional.               |

---

### Example

```tsx
import { useState } from "react";
import { Payment, PaymentError, PaymentDialog } from "@composer-kit/ui/payment";
import { celo } from "viem/chains";

export const PaymentBasic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [txHash, setTxHash] = useState("");

  return (
    <div className="w-full items-center justify-center flex flex-col gap-4">
      <Payment
        amount="0.001"
        //@ts-ignore
        chain={celo}
        onSuccess={(hash) => {
          setTxHash(hash);
          setIsOpen(false);
        }}
        onError={(error) => {
          console.error("Payment error", error);
        }}
        recipientAddress="0x717F8A0b80CbEDe59EcA195F1E3D8E142C84d4d6"
        tokenAddress="0x765de816845861e75a25fca122bb6898b8b1282a"
      >
        <button
          className="bg-black font-medium dark:bg-white text-white dark:text-black px-4 py-2 rounded"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Paynow
        </button>
        <PaymentDialog
          onOpenChange={() => {
            setIsOpen(!isOpen);
          }}
          open={isOpen}
        />
        <PaymentError />
      </Payment>
      {txHash && <p>{txHash}</p>}
    </div>
  );
};
```

## Swap

The `Swap` component allows users to exchange tokens seamlessly with a simple interface.

## Props

| Prop           | Type               | Description                                                        |
|----------------|--------------------|--------------------------------------------------------------------|
| children       | `React.ReactNode`    | The child components of the Swap container.                        |
| className      | string (optional)  | Optional additional class names.                                   |
| swapableTokens | SwapableTokens[]   | List of tokens available for swapping.                             |
| label          | string             | Label for the SwapToken (e.g., "Sell", "Buy").                  |
| type           | "from" | "to"      | Defines whether it's a "from" or "to" swap token field.           |
| onSwap         | function           | Callback function triggered when the swap button is clicked.        |
| ...            | any                | Any additional props for subcomponents.                             |

---

### Example

```tsx
import {
  Swap,
  SwapButton,
  SwapHeader,
  SwapToggle,
  SwapToken,
} from "@composer-kit/ui/swap";
import { swapableTokens } from "../../utils/constants";

export const SwapBasic = () => {
  return (
    <div className="flex items-center justify-center">
      <Swap>
        <SwapHeader />
        <SwapToken label="Sell" swapableTokens={swapableTokens} type="from" />
        <SwapToggle />
        <SwapToken label="Buy" swapableTokens={swapableTokens} type="to" />
        <SwapButton onSwap={() => {}} />
      </Swap>
    </div>
  );
};
```

## Token Select

The `TokenSelect` component is designed to search in a list of tokens and select a token.

## Props

| Prop           | Type                     | Description                                                           |
|----------------|--------------------------|-----------------------------------------------------------------------|
| children       | `React.ReactNode`          | The children nodes to render inside the select.                       |
| defaultToken   | Token                    | The default token to be selected. Optional.                           |
| delayMs        | number                   | Delay time in milliseconds before updating the select. Optional.      |
| onChange       | (token: Token) => void   | Callback function that is called when the token is changed. Optional. |
| className      | string                   | CSS class name for styling the option or dropdown. Optional.          |
| placeholder    | string                   | The placeholder text to show when the dropdown is empty.              |
| heading        | string                   | The heading to display for the group. Optional.                       |
| emptyMessage   | string                   | The message to display when no tokens are available. Optional.        |
| token          | Token                    | The token associated with the option.                                 |
| onSelect       | (token: Token) => void   | Callback function triggered when the option is selected. Optional.    |
| ...            | `React.HTMLAttributes<any>`| Any additional HTML attributes for the elements.                      |

---

### Example

```tsx
import {
  TokenSelect,
  TokenSelectDropdown,
  TokenSelectGroup,
  TokenSelectInput,
  TokenSelectOption,
} from "@composer-kit/ui/token-select";
import { swapableTokens } from "../../utils/constants";

export const TokenSelectBasic = () => {
  return (
    <div className="flex items-center justify-center">
      <TokenSelect delayMs={300}>
        <TokenSelectDropdown placeholder="Search tokens...">
          <TokenSelectInput />
          <TokenSelectGroup heading="Available tokens">
            {swapableTokens.map((token) => (
              <TokenSelectOption key={token.address} token={token} />
            ))}
          </TokenSelectGroup>
        </TokenSelectDropdown>
      </TokenSelect>
    </div>
  );
};
```

## Transaction

The `Transaction` component facilitates blockchain transactions with a simple interface, providing built-in status tracking and error handling.

## Props

| Prop          | Type                    | Description                                                        |
|---------------|-------------------------|--------------------------------------------------------------------|
| chainId       | number                  | The ID of the blockchain network to use for the transaction.       |
| transaction   | TransactionConfig       | Configuration object for the transaction (see below).              |
| onSuccess     | (result: any) => void   | Callback function triggered upon successful transaction. Optional. |
| onError       | (error: any) => void    | Callback function triggered when an error occurs. Optional.        |
| children      | `React.ReactNode `        | The children nodes to render inside the transaction component.     |
| className     | string                  | CSS class name for styling the button or status. Optional.         |
| abi           | Array                   | The ABI (Application Binary Interface) for the smart contract.     |
| address       | string                  | The address of the smart contract to interact with.                |
| args          | Array                   | Arguments to pass to the smart contract function.                  |
| functionName  | string                  | The name of the function to call on the smart contract.            |

---

### Example

```tsx
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
} from "@composer-kit/ui/transaction";

export const TransactionBasic = () => {
  return (
    <div className="w-full items-center justify-center flex flex-col gap-4">
      <Transaction
        chainId={42220}
        onError={(error: any) => {
          console.log("error", error);
        }}
        onSuccess={(result: any) => {
          console.log("result", result);
        }}
        transaction={{
          abi: [
            {
              name: "transfer",
              type: "function",
              stateMutability: "nonpayable",
              inputs: [
                { name: "recipient", type: "address" },
                { name: "amount", type: "uint256" },
              ],
              outputs: [{ name: "", type: "bool" }],
            },
          ],
          address: "0x765de816845861e75a25fca122bb6898b8b1282a",
          args: ["0x717F8A0b80CbEDe59EcA195F1E3D8E142C84d4d6", 1],
          functionName: "transfer",
        }}
      >
        <TransactionButton>Send</TransactionButton>
        <TransactionStatus />
      </Transaction>
    </div>
  );
};
```

## Wallet

The `Wallet` component provides functionality for connecting wallets and displaying user information.

## Props

| Prop        | Type                                    | Description                                                                                   |
|-------------|-----------------------------------------|-----------------------------------------------------------------------------------------------|
| children    | `React.ReactNode `                        | The content inside the component, typically `Avatar` and `Name`.                              |
| label       | `React.ReactNode `                        | The text or element to display on the connect button. Default is "Connect".                  |
| onConnect   | () => void (optional)                   | A callback function that is triggered when the connection is successful.                      |
| isTruncated | boolean (optional)                      | Whether the name should be truncated (e.g., for display in small spaces). Default is `false`. |
| className   | string (optional)                       | CSS class name for styling the button, avatar, or name. Optional.                             |
| ...         | `React.HTMLAttributes<HTMLDivElement> `    | Avatar: All standard div attributes.                                                          |
| ...         | `React.HTMLAttributes<HTMLSpanElement>`    | Name: All standard span attributes.                                                           |

---

### Example

```tsx
import { Avatar, Connect, Name, Wallet } from "@composer-kit/ui/wallet";

export const WalletBasic = () => {
  return (
    <div className="flex items-center justify-center">
      <Wallet>
        <Connect
          label="Connect Now"
          onConnect={() => {
            console.log("Connected");
          }}
        >
          <Avatar />
          <Name />
        </Connect>
      </Wallet>
    </div>
  );
};
```
----

## Examples

Examples can be found in the [/docs](https://github.com/celo-org/composer-kit/tree/main/apps/docs/examples) folder. 


