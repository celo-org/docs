module.exports = {
  docs: [
    {
      type: "doc",
      id: "welcome",
    },
    {
      type: "doc",
      id: "overview",
    },
    {
      type: "category",
      label: "Getting Started",
      items: [
        "getting-started/choosing-a-network",
        {
          type: "category",
          label: "Mainnet",
          items: [
            "getting-started/mainnet/index",
            "getting-started/mainnet/running-a-validator-in-mainnet",
            "getting-started/mainnet/running-a-full-node-in-mainnet",
          ],
        },
        {
          type: "category",
          label: "Baklava Testnet",
          items: [
            "getting-started/baklava-testnet/index",
            "getting-started/baklava-testnet/running-a-validator-in-baklava",
            "getting-started/baklava-testnet/running-a-full-node-in-baklava",
          ],
        },
        {
          type: "category",
          label: "Alfajores Testnet",
          items: [
            "getting-started/alfajores-testnet/index",
            "getting-started/alfajores-testnet/using-the-mobile-wallet",
            "getting-started/alfajores-testnet/faucet",
            "getting-started/alfajores-testnet/running-a-full-node-in-alfajores",
          ],
        },
        "getting-started/hosted-nodes",
        "getting-started/validator-troubleshooting-faq",
        "getting-started/glossary",
      ],
      collapsed: false,
    },
  ],
};
