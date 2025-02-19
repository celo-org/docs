---
title: thirdweb SDK
description: Build web3 applications that can interact with your smart contracts using our powerful SDKs.
---

# thirdweb SDK

## Install thirdweb

Thirdweb is a CLI tool that you need to install to create and manage your Web3 applications.

```bash
npx thirdweb install
```

## Create Application

thirdweb offers SDKs for various programming languages, such as React, React Native, TypeScript, Python, Go, and Unity.

1. In your CLI run the following command:

   ```bash
   npx thirdweb create --app
   ```

2. Input your preferences for the command line prompts:
   1. Give your **`project`** a name
   2. Choose your **`network`**: We will choose EVM for Moonbeam
   3. Choose your preferred **`framework`**: Next.js, CRA, Vite, React Native, Node.js, or Express
   4. Choose your preferred **`language`**: JavaScript or TypeScript
   5. We are choosing **Vite** and **TypeScript** for this particular example.
3. Use the React or TypeScript SDK to interact with your application’s functions. See the section on “interact with your contract”

## Get a Thirdweb Client ID  

1. Open the **Thirdweb Dashboard** and click **`Add New`** in the **Projects** section.  
2. Select **`Project`** from the dropdown menu.  
3. Enter a **project name** and add **`localhost:5173`** under **`Allowed Domains`**. Click **`Create`**.  
4. A **`Client ID`** and **`Secret ID`** will be generated. Copy both to a secure location—we’ll only need the **`Client ID`**.

## Create an .env file

1. Create an **`.env`** file on your root folder.
2. Add the following:

```bash
VITE_TEMPLATE_CLIENT_ID=YOUR_THIRDWEB_CLIENT_ID
VITE_TEMPLATE_CONTRACT_ID=YOUR_CONTRACT_ID
```

## Interact With a Contract

### Initialize SDK On Celo

Wrap your application in the `ThirdwebProvider` component and change the `activeChain` to Celo

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ThirdwebProvider } from "thirdweb/react";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
```

### Get Contract

To connect to your contract, use the SDK’s `getContract` method.

```tsx
import { client } from "./client";
import { getContract, createThirdwebClient } from 'thirdweb';
import { celo } from "thirdweb/chains";

export function App() {
  
  const contract = getContract({
    client,
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    chain: celo,
  });
	
  return (
	<div>
	  <h2>{contract.contract}</h2>
	</div>
  );
}
```

Full reference: [getContract](https://portal.thirdweb.com/references/typescript/v5/getContract)

### Calling Contract Functions

- For extension-based functions, use the built-in supported hooks. The following is an example using the NFTs extension to access a list of NFTs owned by an address- `useOwnedNFTs`

  ```tsx
  import React, { useState } from 'react';
  import { client } from "./client";
  import { getContract, createThirdwebClient } from 'thirdweb';
  import { celo } from "thirdweb/chains";
  import { getOwnedNFTs } from "thirdweb/extensions/erc721";

  export function App() {
    const [nftData, setNftData] = useState(null);
  
    const contract = getContract({
      client,
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      chain: celo,
    });
  
    const loadNFTs = async (contractId) => {
      try {
        const nft = await getOwnedNFTs({
          contract,
          start: 0,
          count: 10,
          address: contractId,
        });
        setNftData(nft);
      } catch (error) {
        console.error('Error loading NFT:', error);
      }
    };
  	
    React.useEffect(() => {
      loadNFTs(import.meta.env.VITE_CONTRACT_ADDRESS);
    }, []);  	
  	
	  return (
       <div>
		  <h2>{nftData[0].metadata.name}</h2>
       </div>
	  );
  }
  ```

  Full reference: [https://portal.thirdweb.com/references/typescript/v5/erc721/getOwnedNFTs](https://portal.thirdweb.com/references/typescript/v5/erc721/getOwnedNFTs)

- Use the `useReadContract` hook to call any read functions on your contract by passing in the name of the function you want to use.

  ```tsx
  import React, { useState } from 'react';
  import { client } from "./client";
  import { getContract, createThirdwebClient } from 'thirdweb';
  import { celo } from "thirdweb/chains";
  import { getOwnedNFTs } from "thirdweb/extensions/erc721";
  import { useReadContract } from "thirdweb/react";

  export function App() {
    const [nftData, setNftData] = useState(null);
  
    const contract = getContract({
      client,
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      chain: celo,
    });
  
  const { data, isPending } = useReadContract({
    contract,
    method: "function name() view returns (string)",
    params: [],
  }); 
    	  	
  return (
    <div>
	   <h2>{data}</h2>
	 </div>
  );
  }
  ```

  Full reference: [https://portal.thirdweb.com/references/typescript/v5/useReadContract](https://portal.thirdweb.com/references/typescript/v5/useReadContract)

- Use the `updatemetadata` function to update the **`metadata`** on your contract by passing in the information you want to update.

  ```tsx
  import React, { useState } from 'react';
  import { getContract, createThirdwebClient } from 'thirdweb';
  import { celo } from "thirdweb/chains";
  import { updateMetadata } from "thirdweb/extensions/erc721";

  export function App() {
    const [newName, setNewName] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const client = createThirdwebClient({ 
      clientId: import.meta.env.VITE_TEMPLATE_CLIENT_ID
    });

    const contract = getContract({
      client,
      address: import.meta.env.VITE_CONTRACT_ADDRESS,
      chain: celo,
    });

    const updateContractName = async () => {
      if (!newName) {
        alert("Please enter a new name");
        return;
      }

      setIsUpdating(true);

      try {
        console.log("Updating contract metadata name to:", newName);

        const transaction = await updateMetadata({
          contract,
          metadata: {
            name: newName,
          },
        });

        console.log("Transaction sent:", transaction);
        console.log("Contract metadata updated successfully!");

        alert("Contract metadata updated successfully!");
      } catch (error) {
        console.error('Error updating contract metadata:', error);
        alert("Failed to update contract metadata. Check the console for details.");
      } finally {
        setIsUpdating(false);
      }
    };

    return (
      <div>
        <h2>Update Contract Metadata Name</h2>
        <input
          type="text"
          placeholder="Enter new name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={updateContractName} disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Name"}
        </button>
      </div>
  );
  ```

  Full reference: [https://portal.thirdweb.com/references/typescript/v5/erc721/updateMetadata](https://portal.thirdweb.com/references/typescript/v5/erc721/updateMetadata)

### Connect Wallet

Create a custom connect wallet experience by declaring supported wallets passed to your provider.

```tsx
import React, { useState } from 'react';
import { client } from "./client";
import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";

const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

export function App() {
 
  return (
    <div>
      <ConnectButton client={client} wallets={wallets} />    
    </div>
  );
}
```

Full reference: [https://portal.thirdweb.com/references/typescript/v5/ConnectButton](https://portal.thirdweb.com/references/typescript/v5/ConnectButton)

## Deploy Application

To host your static web application on decentralized storage, run:

```jsx
npx thirdweb deploy --app
```

By running this command, your application is built for production and stored using Storage. The built application is uploaded to IPFS, a decentralized storage network, and a unique URL is generated for your application.

This URL serves as a permanent hosting location for your application on the web.

If you have any further questions or encounter any issues during the process, please reach out to thirdweb support at [support.thirdweb.com](https://support.thirdweb.com).
