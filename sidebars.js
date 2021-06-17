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
          label: "Wallets",
          items: [
            "getting-started/wallets/index",
            {
              type: "category",
              label: "Using MetaMask with Celo",
              items: [
                "getting-started/wallets/using-metamask-with-celo/index",
                "getting-started/wallets/using-metamask-with-celo/manual-setup",
                "getting-started/wallets/using-metamask-with-celo/programmatic-setup",
                "getting-started/wallets/using-metamask-with-celo/choosing-the-right-gas-price",
                "getting-started/wallets/using-metamask-with-celo/using-a-ledger-with-metamask",
              ],
            }
          ]
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
          label: "Mainnet",
          items: [
            "getting-started/mainnet/index",
            "getting-started/mainnet/running-a-validator-in-mainnet",
            "getting-started/mainnet/running-a-full-node-in-mainnet",
          ],
        },
        "getting-started/using-the-wallet",
        "getting-started/hosted-nodes",
        "getting-started/validator-troubleshooting-faq",
        "getting-started/glossary",
      ],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'Celo Owner Guide',
      items: [
        { type: 'doc', label: 'Quick Start', id: 'celo-holder-guide/quick-start' },
        'celo-holder-guide/cusd',
        'celo-holder-guide/ledger',
        'celo-holder-guide/release-gold',
        'celo-holder-guide/voting-validators',
        { type: 'doc', label: 'Voting on Governance', id: 'celo-holder-guide/voting-governance', },
        'celo-holder-guide/governance-cheat-sheet',
        'celo-holder-guide/eth-recovery',
        'celo-holder-guide/celo-recovery',
      ]
    },
    {
      type: "doc",
      id: "thank-you"
    }
  ],
};
