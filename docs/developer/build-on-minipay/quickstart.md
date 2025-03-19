---
title: Build on MiniPay Quickstart
description: A quickstart guide for building on MiniPay and Celo.
---

# Get Started Building on MiniPay

A step-by-step guide to setting up, building, and testing your MiniPay Mini App.

---

## 1. Installing MiniPay

MiniPay is designed for mainstream adoption, making digital payments simple and easy to use. 

#### Key Features:
- **Currency Display**: Balances appear in your local currency.
- **Stablecoin Support**: Only stablecoins (cUSD, USDC, and USDT) are supported.
- **Simple Swaps**: The pocket swap feature allows for easy swaps between stablecoins by dragging one pocket into another.

:::info
MiniPay is only available on Celo and Celo Alfajores Testnet. Other blockchain networks are not supported.
:::

#### How to Access MiniPay:
- [**Opera Mini Browser**](https://www.opera.com/pl/products/minipay) (Android) 
- [**Standalone App**](https://play.google.com/store/apps/details?id=com.opera.minipay) (Android, iOS coming soon)

#### Set Up MiniPay:

- **Install the MiniPay Standalone App:** [Download here.](https://play.google.com/store/apps/details?id=com.opera.minipay)
- **Create an Account:** Sign up using your Google account and phone number.

## 2. Build Your MiniPay Mini App

#### For creating a new app:

- Use the [Celo Composer MiniPay Template](https://github.com/celo-org/minipay-template) to start building.

```bash
npx @celo/celo-composer@latest create -t minipay
```
- Follow the [Quickstart Guide](/build/quickstart.md) for a step-by-step tutorial.

#### For integrating an existing app:

- Follow the [Helpful Tips Guide](#helpful-tips-to-make-your-mini-app-minipay-compatible) to ensure your app is MiniPay compatible.

## 3. Get Testnet Tokens

Request testnet tokens from the Celo [faucet](https://faucet.celo.org/) to test your Mini App.

## 4. Test your Mini App inside MiniPay

:::warning
You cannot test MiniPay using the Android Studio Emulator. Use an Android mobile device.
:::

### Enable Developer Mode:
1. Open the MiniPay app on your phone and navigate to settings.

<img
  src={"/img/doc-images/minipay/build-on-minipay/choose-settings.jpg"}
  style={{ width: 250 }}
  alt="Open MiniPay dApp store"
/>

2. In the **About** section, tap the **Version** number repeatedly until the confirmation message appears.

<img
  src={"/img/doc-images/minipay/build-on-minipay/activate-developer-mode.jpg"}
  style={{ width: 250 }}
  alt="Open MiniPay dApp test page"
/>

3. Return to **Settings**, then select **Developer Settings**.

<img
  src={"/img/doc-images/minipay/build-on-minipay/choose-developer-settings.jpg"}
  style={{ width: 250 }}
  alt="MiniPay dApp testing"
/>

4. Enable **Developer Mode** and toggle **Use Testnet** to connect to Alfajores L2 testnet.

<img
  src={"/img/doc-images/minipay/build-on-minipay/choose-testnet.jpg"}
  style={{ width: 250 }}
  alt="MiniPay dApp testing"
/>


### Load Your Mini App:
1. In **Developer Settings,** tap **Load Test Page.** 
2. Enter your **Mini App URL.**
    - If testing a local deployment, use [ngrok](#testing-local-development-with-minipay) to expose your localhost.

<img
  src={"/img/doc-images/minipay/build-on-minipay/enter-url.jpg"}
  style={{ width: 250 }}
  alt="MiniPay dApp testing"
/>

6. Click **Go** to launch and test your Mini App.

<img
  src={"/img/doc-images/minipay/build-on-minipay/site-tester-opening.jpg"}
  style={{ width: 250 }}
  alt="MiniPay dApp testing"
/>

---

## Helpful Tips to Make Your Mini App MiniPay Compatible

:::warning
MiniPay uses Custom [Fee Abstraction](../fee-currency.md) based transactions, which is not supported by Ethers.js. Use viem or wagmi instead. If you are using Web3.js, use our [custom built plugin for fee abstraction](../web3/index.mdx).
:::

#### 1. Using Viem

```js
import { createWalletClient, custom } from "viem";
import { celo, celoAlfajores } from "viem/chains";

const client = createWalletClient({
  chain: celo,
  // chain: celoAlfajores, // For Celo Testnet
  transport: custom(window.ethereum),
});

const [address] = await client.getAddresses();
```

#### 2. Using Wagmi

```js
import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const { connect } = useConnect({
  connector: new InjectedConnector(),
});

useEffect(() => {
  connect();
}, []);
```

This code sets up an `InjectedConnector` and then utilizes the `connect` method from the `useConnect` hook. The `useEffect` ensures that the connection is established when the page loads.

In the Viem example, we're creating a wallet client that specifies the chain and a custom transport using `window.ethereum`. The `getAddresses` method then retrieves the connected addresses.

### Important Notes

Ensure the "Connect Wallet" button is hidden when your DApp is loaded inside the MiniPay app, as the wallet connection is implicit.

_Code Example to hide Connect Wallet button if the user is using MiniPay wallet_

```jsx
export default function Header() {
  // State variable that determines whether to hide the button or not.
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect();

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      // User is using MiniPay so hide connect wallet button.
      setHideConnectBtn(true);

      connect({ connector: injected({ target: "metaMask" }) });
    }
  }, []);

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      {/* Conditional rendering of Connect Wallet button */}
      {!hideConnectBtn && (
        <ConnectButton
          showBalance={{
            smallScreen: true,
            largeScreen: false,
          }}
        />
      )}
    </div>
  );
}
```

- Always verify the existence of `window.provider` before initializing your web3 library to ensure seamless compatibility with the MiniPay wallet.
- When using `ngrok`, remember that the tunneling URL is temporary. You'll get a new URL every time you restart ngrok.
- Be cautious about exposing sensitive information or functionality when using public tunneling services like ngrok. Always use them in a controlled environment.
- MiniPay currently supports setting the `feeCurrency` property when running `eth_sendTransaction`. However, currency support is limited to `cUSD`. More currencies might be supported in future.
- MiniPay only accepts legacy transactions at the moment. EIP-1559 properties won't be considered when handling requests.


## Testing Local Development with MiniPay

If you're developing your MiniApp locally (e.g., on `localhost:3000`), use `ngrok` to tunnel traffic over HTTP, for real-time testing. 

#### Set Up ngrok
- **Install ngrok:** If you haven't already, install ngrok. You can find instructions on their [official website](https://ngrok.com/download).
- **Start Your Local Server:** Ensure your local development server is running. For instance, if you're using Next.js, you might run `npm run dev` to start your server at `localhost:3000`.
- **Tunnel Traffic with ngrok:** In your terminal, run the following command to start an ngrok tunnel:

```bash
ngrok http 3000
```

This will provide you with a public URL that tunnels to your localhost.

For a more in depth guide, check out the official [ngrok setup](./prerequisites/ngrok-setup.mdx).

- **Test in MiniPay:** Copy the provided ngrok URL and use it inside the MiniPay app to test your DApp.