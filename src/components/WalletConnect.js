import React from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default class WalletConnect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provider: null,
      kit: null,
      someAddress: "0x5038ae19CDf0B623e6e8015249ecF58A1165D653",
    };

    this.connect = this.connect.bind(this);
    this.sendcUSD = this.sendcUSD.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  connect = async () => {
    const provider = new WalletConnectProvider({
      rpc: {
        44787: "https://alfajores-forno.celo-testnet.org",
        42220: "https://forno.celo.org",
      },
    });

    await provider.enable();
    const web3 = new Web3(provider);
    let kit = newKitFromWeb3(web3);

    kit.defaultAccount = provider.accounts[0];

    provider.on("accountsChanged", (accounts) => {
      console.log(accounts);
    });

    this.setState({ provider, kit });
  };

  sendcUSD = async () => {
    let kit = this.state.kit;

    let amount = kit.web3.utils.toWei("0.001", "ether");

    const stabletoken = await kit.contracts.getStableToken();
    const tx = await stabletoken
      .transfer(this.state.someAddress, amount)
      .send();
    const receipt = await tx.waitReceipt();

    console.log(receipt);
  };

  disconnect = async () => {
    await this.state.provider.disconnect();
  };

  render() {
    let button, account;

    if (this.state.provider !== null) {
      button = (
        <div>
          <button onClick={() => this.sendcUSD()}>Send 0.001 cUSD</button>
        </div>
      );
    } else {
      button = (
        <div>
          <button onClick={() => this.connect()}>Connect</button>
        </div>
      );
    }

    if (this.state.kit !== null) {
      account = this.state.kit.defaultAccount;
    }

    return (
      <div>
        {button}
        <p>{account}</p>
        <button onClick={() => this.disconnect()}>Disconnect</button>
      </div>
    );
  }
}
