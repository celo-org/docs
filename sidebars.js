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
      type: 'category',
      label: 'Validator Guide',
      items: [
        'validator-guide/overview',
        'validator-guide/attestation-service',
        {
          type: 'category',
          label: 'Key Management',
          items: [
            'validator-guide/key-management/summary',
            'validator-guide/key-management/detailed',
            'validator-guide/key-management/key-rotation',
          ]
        },
        'validator-guide/securing-nodes-and-services',
        'validator-guide/monitoring',
        'validator-guide/devops-best-practices',
        'validator-guide/node-upgrades',
        'validator-guide/proxy',
        'validator-guide/validator-explorer',
        'validator-guide/celo-foundation-voting-policy',
        'validator-guide/celo-signal',
      ]
    },
    {
      type: 'category',
      label: 'Developer Guide',
      items: [
        'developer-resources/overview',
        {
          type: 'category',
          label: 'Code Examples',
          items: [
            'developer-resources/start',
            'developer-resources/walkthroughs/hellocelo',
            'developer-resources/walkthroughs/hellocontracts',
            'developer-resources/walkthroughs/hello-contract-remote-node',
            'developer-resources/walkthroughs/hello-mobile-dapp',
            'developer-resources/develop-on-windows',
            'developer-resources/walkthroughs/web-dapp',
            { type: 'doc', label: 'WalletConnect', id: 'developer-resources/walkthroughs/wallet-connect'}
          ]
        },
        {
          type: 'category',
          label: 'ContractKit',
          items: [
            'developer-resources/contractkit/index',
            'developer-resources/contractkit/setup',
            'developer-resources/contractkit/notes-web3-with-contractkit',
            'developer-resources/contractkit/contracts-wrappers-registry',
            'developer-resources/contractkit/odis',
            'developer-resources/contractkit/migrating-to-contractkit-v1',
          ]
        },
        {
          type: 'category',
          label: 'DAppKit',
          items: [
            'developer-resources/dappkit/index',
            'developer-resources/dappkit/setup',
            'developer-resources/dappkit/usage',
          ]
        },
        'developer-resources/forno/index',
        'developer-resources/walkthroughs/development-chain',
        'developer-resources/celo-for-eth-devs',
        'developer-resources/celo-dapp-gallery',
        {
          type: 'category',
          label: 'Integrations',
          items: [
            'developer-resources/integrations/integrations',
            'developer-resources/integrations/general',
            'developer-resources/integrations/checklist',
            'developer-resources/integrations/custody',
            'developer-resources/integrations/listings',
            'developer-resources/integrations/cloud-hsm',
          ]
        },
        // TODO: This link will need to be changed when we move all the SDK type docs
        { type: 'link', label: 'SDK Code Reference', href: 'https://docs.celo.org/developer-guide/sdk-code-reference' },
      ]
    },
  ],
};
