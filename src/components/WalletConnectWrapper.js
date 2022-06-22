import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
// import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function WalletConnectWrapper() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        const WC = require("./WalletConnect").default;
        return <WC />;
      }}
    </BrowserOnly>
  );
}
