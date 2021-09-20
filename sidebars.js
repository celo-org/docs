module.exports = {
  docs: [

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>> WELCOME <<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    {
      type: "doc",
      id: "welcome-to-celo",
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        { type: 'doc', label: 'Overview', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Applications', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Glossary', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'FAQ', id: 'community/code-of-conduct'},
      ]
    },

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>> WALLETS <<<<<<<<<<<<<<<<<<<<<<<<<<<*/
    {
      type: 'category',
      label: 'Wallets',
      items: [
        { type: 'doc', label: 'Wallet Guide', id: 'community/code-of-conduct'},
        {
          type: "category",
          label: "Celo Wallet",
          items: [
            { type: 'doc', label: 'Wallet Overview', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Local Wallet', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Wallet Functionality', id: 'community/code-of-conduct'},
          ],
        },
        {
          type: "category",
          label: "Ledger Wallet",
          items: [
            { type: 'doc', label: 'Ledger Wallet Guide', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Connect to Celo Terminal', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Connect to Celo CLI', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Connect to MetaMask', id: 'community/code-of-conduct'},
          ],
        },
        {
          type: "category",
          label: "MetaMask",
          items: [
            { type: 'doc', label: 'MetaMask and Celo', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Manual Setup', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Programmatic Setup', id: 'community/code-of-conduct'},
          ],
        },
        { type: 'doc', label: 'Wallet FAQ', id: 'community/code-of-conduct'},
      ]
    },

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>> STAKING <<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    {
      type: 'category',
      label: 'Staking',
      items: [
        { type: 'doc', label: 'Staking with Celo', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Staking FAQ', id: 'community/code-of-conduct'}
      ]
    },

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>> OWNERS <<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    {
      type: 'category',
      label: 'Owners',
      items: [
        { type: 'doc', label: 'Owner Guide', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Get CELO', id: 'community/code-of-conduct'},
        {
          type: "category",
          label: "Celo Assets",
          items: [
            { type: 'doc', label: 'Asset Management', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'ReleaseGold', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Recover Ethereum from a Celo Address', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Recover Celo from an Ethereum Address', id: 'community/code-of-conduct'}
          ],
        },
        {
          type: "category",
          label: "Governance",
          items: [
            { type: 'doc', label: 'Governance Guide', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Voting on Governance', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Voting for Validator Groups', id: 'community/code-of-conduct'},
          ],
        },
        { type: 'doc', label: 'Owner FAQ', id: 'community/code-of-conduct'},
      ]
    },

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DEVELOPERS <<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    {
      type: 'category',
      label: 'Developers',
      items: [
        { type: 'doc', label: 'Developer Guide', id: 'community/code-of-conduct'},
        {
          type: "category",
          label: "Environment Setup",
          items: [
            { type: 'doc', label: 'Using Mac', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Using Windows', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Using Remix', id: 'community/code-of-conduct'},
          ],
        },
        {
          type: "category",
          label: "Code by Example",
          items: [
            { type: 'doc', label: 'Send Celo & USD', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Deploy a Local Contract', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Deploy an ERC20 Token', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Deploy an NFT', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'React Based dApp', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Create a React Native dApp', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'WalletConnect', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Using Keystores', id: 'community/code-of-conduct'},
          ],
        },
        {
          type: "category",
          label: "Developer Tools",
          items: [
            {
              type: "category",
              label: "Celo Tools",
              items: [
                { type: 'doc', label: 'Blockscout', id: 'community/code-of-conduct'},
                { type: 'doc', label: 'Celo SDK', id: 'community/code-of-conduct'},
                { type: 'doc', label: 'Celo Wallet', id: 'community/code-of-conduct'},
                { type: 'doc', label: 'ContractKit', id: 'community/code-of-conduct'},
                { type: 'doc', label: 'DAppKit', id: 'community/code-of-conduct'},
                { type: 'doc', label: 'Forno', id: 'community/code-of-conduct'}
              ],
            },
            {
              type: "category",
              label: "Crypto Tools",
              items: [
                { type: 'doc', label: 'MetaMask', id: 'community/code-of-conduct'},
                { type: 'doc', label: 'Truffle', id: 'community/code-of-conduct'},
                { type: 'doc', label: 'Remix', id: 'community/code-of-conduct'},
              ],
            },
            {
              type: "category",
              label: "Additional Tools",
              items: [
                { type: 'doc', label: 'Expo', id: 'community/code-of-conduct'},
              ],
            },
          ],
        },
        { type: 'doc', label: 'Ethereum Developers', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Developer FAQ', id: 'community/code-of-conduct'},
      ]
    },

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>> INTEGRATIONS <<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    {
      type: 'category',
      label: 'Integrations',
      items: [
        { type: 'doc', label: 'Integration Guide', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Integration Checklist', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Custody', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Listings', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Using an HSM', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Integration FAQ', id: 'community/code-of-conduct'}
      ]
    },

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VALIDATORS <<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    {
      type: 'category',
      label: 'Validators',
      items: [
        { type: 'doc', label: 'Validator Guide', id: 'community/code-of-conduct'},
        {
          type: "category",
          label: "Running a Node",
          items: [
            { type: 'doc', label: 'Nodes & Services', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Hosted Nodes', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Upgrading a Node', id: 'community/code-of-conduct'}
          ],
        },
        { type: 'doc', label: 'Attestation Service', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Key Management', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Monitoring', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Devops Best Practices', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Run Proxies', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Validator Explorer', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Voting Policy', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Validator FAQ', id: 'community/code-of-conduct'}
      ]
    },

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PLATFORM <<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    {
      type: 'category',
      label: 'Platform',
      items: [
        { type: 'doc', label: 'Platform Guide', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Architecture', id: 'community/code-of-conduct'},
        {
          type: "category",
          label: "Networks",
          items: [
            { type: 'doc', label: 'Mainnet', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Alfajores Testnet', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Baklava Testnet', id: 'community/code-of-conduct'}
          ],
        },
        {
          type: "category",
          label: "Protocol",
          items: [
            { type: 'doc', label: 'Consensus', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Proof-of-Stake', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Penalties', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Governance', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Stability Mechanism', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Transactions', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Identity', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Valora Accounts', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Phone Number Privacy', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Metadata', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Randomness', id: 'community/code-of-conduct'},
            { type: 'doc', label: 'Optics', id: 'community/code-of-conduct'}  
          ],
        },
        { type: 'doc', label: 'Economics', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Platform FAQ', id: 'community/code-of-conduct'}
      ]
    },

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>> LEARN <<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    {
      type: 'category',
      label: 'Learn',
      items: [
        { type: 'doc', label: 'Celo Basics', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Blockchain Basics', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'DeFi Basics', id: 'community/code-of-conduct'},
      ]
    },

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CLI <<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    {
      type: 'category',
      label: 'CLI',
      items: [
        { type: 'doc', label: 'CLI Guide', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Commands', id: 'community/code-of-conduct'},
      ]
    },

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>> COMMUNITY <<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    {
      type: 'category',
      label: 'Community',
      items: [
        { type: 'doc', label: 'Community Guide', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Code of Conduct', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Release Process', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Celo Ecosystem', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Grant Playbook', id: 'community/code-of-conduct'},
        { type: 'doc', label: 'Contribute', id: 'community/code-of-conduct'}
      ]
    }
      ],
};


/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ORIGINAL <<<<<<<<<<<<<<<<<<<<<<<<<<<*/

  //   {
  //     type: "doc",
  //     id: "welcome",
  //   },
  //   {
  //     type: "doc",
  //     id: "overview",
  //   },
  //   {
  //     type: "category",
  //     label: "Getting Started",
  //     items: [
  //       "getting-started/choosing-a-network",
  //       {
  //         type: "category",
  //         label: "Wallets",
  //         items: [
  //           "getting-started/wallets/index",
  //           {
  //             type: "category",
  //             label: "Using MetaMask with Celo",
  //             items: [
  //               "getting-started/wallets/using-metamask-with-celo/index",
  //               "getting-started/wallets/using-metamask-with-celo/manual-setup",
  //               "getting-started/wallets/using-metamask-with-celo/programmatic-setup",
  //               "getting-started/wallets/using-metamask-with-celo/using-a-ledger-with-metamask",
  //             ],
  //           }
  //         ]
  //       },
  //       {
  //         type: "category",
  //         label: "Alfajores Testnet",
  //         items: [
  //           "getting-started/alfajores-testnet/index",
  //           "getting-started/alfajores-testnet/using-the-mobile-wallet",
  //           "getting-started/alfajores-testnet/faucet",
  //           "getting-started/alfajores-testnet/running-a-full-node-in-alfajores",
  //         ],
  //       },
  //       {
  //         type: "category",
  //         label: "Baklava Testnet",
  //         items: [
  //           "getting-started/baklava-testnet/index",
  //           "getting-started/baklava-testnet/running-a-validator-in-baklava",
  //           "getting-started/baklava-testnet/running-a-full-node-in-baklava",
  //         ],
  //       },
  //       {
  //         type: "category",
  //         label: "Mainnet",
  //         items: [
  //           "getting-started/mainnet/index",
  //           "getting-started/mainnet/running-a-validator-in-mainnet",
  //           "getting-started/mainnet/running-a-full-node-in-mainnet",
  //         ],
  //       },
  //       "getting-started/using-the-wallet",
  //       "getting-started/hosted-nodes",
  //       "getting-started/validator-troubleshooting-faq",
  //       "getting-started/glossary",
  //     ],
  //   },
  //   {
  //     type: 'category',
  //     label: 'Celo Owner Guide',
  //     items: [
  //       { type: 'doc', label: 'Quick Start', id: 'celo-holder-guide/quick-start' },
  //       'celo-holder-guide/cusd',
  //       {
  //         type: 'category',
  //         label: 'Using a Ledger Wallet',
  //         items: [
  //           'celo-holder-guide/ledger',
  //           'celo-holder-guide/connecting-ledger-celo-terminal-wallet',
  //           'celo-holder-guide/connecting-ledger-celo-web-wallet',
  //           'celo-holder-guide/connecting-ledger-celocli'
  //         ]
  //       },
  //       'celo-holder-guide/release-gold',
  //       'celo-holder-guide/voting-validators',
  //       { type: 'doc', label: 'Voting on Governance', id: 'celo-holder-guide/voting-governance', },
  //       'celo-holder-guide/governance-cheat-sheet',
  //       'celo-holder-guide/eth-recovery',
  //       'celo-holder-guide/celo-recovery',
  //     ]
  //   },
  //   {
  //     type: 'category',
  //     label: 'Validator Guide',
  //     items: [
  //       'validator-guide/overview',
  //       'validator-guide/attestation-service',
  //       {
  //         type: 'category',
  //         label: 'Key Management',
  //         items: [
  //           'validator-guide/key-management/summary',
  //           'validator-guide/key-management/detailed',
  //           'validator-guide/key-management/key-rotation',
  //         ]
  //       },
  //       'validator-guide/securing-nodes-and-services',
  //       'validator-guide/monitoring',
  //       'validator-guide/devops-best-practices',
  //       'validator-guide/node-upgrades',
  //       'validator-guide/proxy',
  //       'validator-guide/validator-explorer',
  //       'validator-guide/celo-foundation-voting-policy',
  //       'validator-guide/celo-signal',
  //     ]
  //   },
  //   {
  //     type: 'category',
  //     label: 'Developer Guide',
  //     items: [
  //       'developer-resources/overview',
  //       {
  //         type: 'category',
  //         label: 'Code Examples',
  //         items: [
  //           'developer-resources/start',
  //           'developer-resources/walkthroughs/hellocelo',
  //           'developer-resources/walkthroughs/hellocontracts',
  //           'developer-resources/walkthroughs/hello-contract-remote-node',
  //           'developer-resources/walkthroughs/no-code-erc20',
  //           'developer-resources/walkthroughs/no-code-erc721',
  //           'developer-resources/walkthroughs/hello-mobile-dapp',
  //           'developer-resources/develop-on-windows',
  //           'developer-resources/walkthroughs/web-dapp',
  //           { type: 'doc', label: 'WalletConnect', id: 'developer-resources/walkthroughs/wallet-connect'},
  //           { type: 'doc', label: 'Using Keystores', id: 'developer-resources/walkthroughs/using-js-keystores'}
  //         ]
  //       },
  //       {
  //         type: 'category',
  //         label: 'ContractKit',
  //         items: [
  //           'developer-resources/contractkit/index',
  //           'developer-resources/contractkit/setup',
  //           'developer-resources/contractkit/notes-web3-with-contractkit',
  //           'developer-resources/contractkit/contracts-wrappers-registry',
  //           'developer-resources/contractkit/odis',
  //           'developer-resources/contractkit/migrating-to-contractkit-v1',
  //         ]
  //       },
  //       {
  //         type: 'category',
  //         label: 'DAppKit',
  //         items: [
  //           'developer-resources/dappkit/index',
  //           'developer-resources/dappkit/setup',
  //           'developer-resources/dappkit/usage',
  //         ]
  //       },
  //       'developer-resources/forno/index',
  //       'developer-resources/walkthroughs/development-chain',
  //       'developer-resources/celo-for-eth-devs',
  //       'developer-resources/celo-dapp-gallery',
  //       {
  //         type: 'category',
  //         label: 'Integrations',
  //         items: [
  //           'developer-resources/integrations/integrations',
  //           'developer-resources/integrations/general',
  //           'developer-resources/integrations/checklist',
  //           'developer-resources/integrations/custody',
  //           'developer-resources/integrations/listings',
  //           'developer-resources/integrations/cloud-hsm',
  //         ]
  //       },
  //       // TODO: This link will need to be changed when we move all the SDK type docs
  //       { type: 'link', label: 'SDK Code Reference', href: 'https://celo-sdk-docs.readthedocs.io/' },
  //     ]
  //   },
  //   {
  //     type: "category",
  //     label: "Celo CLI",
  //     items: [
  //       {
  //         type: "autogenerated",
  //         dirName: "command-line-interface",
  //       },
  //     ],
  //   },
  //   {
  //     type: 'category',
  //     label: 'Celo Codebase',
  //     items: [
  //       {
  //         type: 'category',
  //         label: 'Celo Protocol',
  //         items: [
  //           { type: 'doc', label: 'Overview', id: 'celo-codebase/protocol/index', },
  //           {
  //             type: 'category',
  //             label: 'Consensus',
  //             items: [
  //               { type: 'doc', label: 'Overview', id: 'celo-codebase/protocol/consensus/index', },
  //               'celo-codebase/protocol/consensus/validator-set-differences',
  //               'celo-codebase/protocol/consensus/locating-nodes',
  //               'celo-codebase/protocol/consensus/ultralight-sync',
  //             ]
  //           },
  //           {
  //             type: 'category',
  //             label: 'Proof-of-Stake',
  //             items: [
  //               { type: 'doc', label: 'Overview', id: 'celo-codebase/protocol/proof-of-stake/index', },
  //               'celo-codebase/protocol/proof-of-stake/validator-groups',
  //               'celo-codebase/protocol/proof-of-stake/locked-gold',
  //               'celo-codebase/protocol/proof-of-stake/validator-elections',
  //               {
  //                 type: 'category',
  //                 label: 'Epoch Rewards',
  //                 items: [
  //                   { type: 'doc', label: 'Overview', id: 'celo-codebase/protocol/proof-of-stake/epoch-rewards', },
  //                   'celo-codebase/protocol/proof-of-stake/validator-rewards',
  //                   'celo-codebase/protocol/proof-of-stake/locked-gold-rewards',
  //                   'celo-codebase/protocol/proof-of-stake/community-fund',
  //                   'celo-codebase/protocol/proof-of-stake/carbon-offsetting-fund',
  //                 ]
  //               },
  //               'celo-codebase/protocol/proof-of-stake/penalties',
  //             ]
  //           },
  //           'celo-codebase/protocol/governance',
  //           {
  //             type: 'category',
  //             label: 'Stability Mechanism',
  //             items: [
  //               { type: 'doc', label: 'Overview', id: 'celo-codebase/protocol/stability/index', },
  //               'celo-codebase/protocol/stability/doto',
  //               'celo-codebase/protocol/stability/granda-mento',
  //               'celo-codebase/protocol/stability/oracles',
  //               'celo-codebase/protocol/stability/stability-fees',
  //               'celo-codebase/protocol/stability/adding_stable_assets',
  //               'celo-codebase/protocol/stability/tobin-tax',
  //             ]
  //           },
  //           {
  //             type: 'category',
  //             label: 'Transactions',
  //             items: [
  //               { type: 'doc', label: 'Overview', id: 'celo-codebase/protocol/transactions/index', },
  //               'celo-codebase/protocol/transactions/native-currency',
  //               'celo-codebase/protocol/transactions/erc20-transaction-fees',
  //               'celo-codebase/protocol/transactions/gas-pricing',
  //               'celo-codebase/protocol/transactions/escrow',
  //               'celo-codebase/protocol/transactions/tx-comment-encryption',
  //               'celo-codebase/protocol/transactions/full-node-incentives',
  //             ]
  //           },
  //           {
  //             type: 'category',
  //             label: 'Identity',
  //             items: [
  //               { type: 'doc', label: 'Overview', id: 'celo-codebase/protocol/identity/index', },
  //               'celo-codebase/protocol/identity/valora-accounts',
  //               'celo-codebase/protocol/identity/phone-number-privacy',
  //               'celo-codebase/protocol/identity/metadata',
  //               'celo-codebase/protocol/identity/randomness',
  //             ]
  //           },
  //           'celo-codebase/protocol/optics',
  //           'celo-codebase/protocol/plumo',
  //         ]
  //       },
  //       {
  //         type: 'category',
  //         label: 'Celo Wallet',
  //         items: [
  //           { type: 'doc', label: 'Overview', id: 'celo-codebase/wallet/index', },
  //           { type: 'doc', label: 'Running the wallet locally', id: 'celo-codebase/wallet/intro', },
  //           { 
  //             type: 'category', 
  //             label: 'Wallet Functionality', 
  //             items: [
  //               { type: 'doc', label: 'Overview', id: 'celo-codebase/wallet/how-the-wallet-works/README', },
  //               'celo-codebase/wallet/how-the-wallet-works/verification',
  //               'celo-codebase/wallet/how-the-wallet-works/invitations',
  //               'celo-codebase/wallet/how-the-wallet-works/sending-and-requesting-payments',
  //               'celo-codebase/wallet/how-the-wallet-works/ultralight-node-sync',
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     type: 'category',
  //     label: 'Community',
  //     items: [
  //       { type: 'doc', label: 'Code of Conduct', id: 'community/code-of-conduct', },
  //       { type: 'doc', label: 'Contributing', id: 'community/contributing', },
  //       { type: 'doc', label: 'Grant Playbook', id: 'community/grant-playbook', },
  //       {
  //         type: 'category',
  //         label: ' Release Process',
  //         items: [
  //           { type: 'doc', label: 'Overview', id: 'community/release-process/README', },
  //           { type: 'doc', label: 'Smart Contracts', id: 'community/release-process/smart-contracts', },
  //           { type: 'doc', label: 'Blockchain Client', id: 'community/release-process/blockchain-client', },
  //           { type: 'doc', label: 'CeloCLI and ContractKit', id: 'community/release-process/base-cli-contractkit-dappkit-utils', },
  //           { type: 'doc', label: 'Attestation Service', id: 'community/release-process/attestation-service', },
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     type: 'category',
  //     label: 'Important Information',
  //     items: [
  //       { type: 'doc', label: 'Alfajores Testnet Disclaimer', id: 'important-information/alfajores-testnet-disclaimer', },
  //       { type: 'doc', label: 'Baklava Testnet Disclaimer', id: 'important-information/baklava-testnet-disclaimer', },
  //       { type: 'doc', label: 'Mainnet Disclaimer', id: 'important-information/mainnet-network-disclaimer', },
  //     ]
  //   }
  // ],
// };
