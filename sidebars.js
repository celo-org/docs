const sidebars = {
  docs: [
    {
      type: "doc", label: "Welcome to Celo", id: "welcome",
    },
    {
      type: "category",
      label: "Getting Started",
      items: [
        { type: "doc", label: "Overview", id: "overview", },
        { type: "doc", label: "Applications", id: "developer-resources/celo-dapp-gallery",},
        { type: "doc", label: "Glossary", id: "getting-started/glossary",},
      ],
    },
    {
      type: "category",
      label: "Wallets",
      items: [
        { type: "doc", label: "Digital Wallets", id: "getting-started/wallets/index", },
        {
          type: 'category',
          label: 'Celo Wallet',
          items: [
            { type: 'doc', label: 'Overview', id: 'celo-codebase/wallet/index', },
            { type: 'doc', label: 'Running the wallet locally', id: 'celo-codebase/wallet/intro', },
            { 
              type: 'category', 
              label: 'Wallet Functionality', 
              items: [
                { type: 'doc', label: 'Overview', id: 'celo-codebase/wallet/how-the-wallet-works/README', },
                'celo-codebase/wallet/how-the-wallet-works/verification',
                'celo-codebase/wallet/how-the-wallet-works/invitations',
                'celo-codebase/wallet/how-the-wallet-works/sending-and-requesting-payments',
                'celo-codebase/wallet/how-the-wallet-works/ultralight-node-sync',
              ]
            }
          ]
        },
        {
          type: "category",
          label: "MetaMask",
          items: [
            { type: "doc", label: "MetaMask and Celo", id: "getting-started/wallets/using-metamask-with-celo/index",},
            { type: "doc", label: "Manual Setup", id: "getting-started/wallets/using-metamask-with-celo/manual-setup",},
            { type: "doc", label: "Programmatic Setup", id: "getting-started/wallets/using-metamask-with-celo/programmatic-setup",},
            { type: "doc", label: "MetaMask and Valora", id: "getting-started/wallets/using-metamask-with-celo/metamask-valora-import",},
            { type: "doc", label: "MetaMask and Ledger", id: "getting-started/wallets/using-metamask-with-celo/using-a-ledger-with-metamask",},
          ],
        },
        {
          type: 'category',
          label: 'Ledger Wallet',
          items: [
            'celo-holder-guide/ledger',
            { type: "doc", label: "Connect to Celo Terminal", id: "celo-holder-guide/connecting-ledger-celo-terminal-wallet",},
            { type: "doc", label: "Connect to Celo Web Wallet", id: "celo-holder-guide/connecting-ledger-celo-web-wallet",},
            { type: "doc", label: "Connect to Celo CLI", id: "celo-holder-guide/connecting-ledger-celocli",},
          ]
        },
        { type: "doc", label: "Testnet Wallet", id: "getting-started/using-the-wallet",},
      ],
    },
    {
      type: 'category',
      label: 'Protocol',
      items: [
        { type: 'doc', label: 'Overview', id: 'celo-codebase/protocol/index', },
        {
          type: 'category',
          label: 'Consensus',
          items: [
            { type: 'doc', label: 'Overview', id: 'celo-codebase/protocol/consensus/index', },
            'celo-codebase/protocol/consensus/validator-set-differences',
            'celo-codebase/protocol/consensus/locating-nodes',
            'celo-codebase/protocol/consensus/ultralight-sync',
          ]
        },
        {
          type: 'category',
          label: 'Proof-of-Stake',
          items: [
            { type: 'doc', label: 'Overview', id: 'celo-codebase/protocol/proof-of-stake/index', },
            'celo-codebase/protocol/proof-of-stake/validator-groups',
            'celo-codebase/protocol/proof-of-stake/locked-gold',
            'celo-codebase/protocol/proof-of-stake/validator-elections',
            {
              type: 'category',
              label: 'Epoch Rewards',
              items: [
                { type: 'doc', label: 'Overview', id: 'celo-codebase/protocol/proof-of-stake/epoch-rewards', },
                'celo-codebase/protocol/proof-of-stake/validator-rewards',
                'celo-codebase/protocol/proof-of-stake/locked-gold-rewards',
                'celo-codebase/protocol/proof-of-stake/community-fund',
                'celo-codebase/protocol/proof-of-stake/carbon-offsetting-fund',
              ]
            },
            'celo-codebase/protocol/proof-of-stake/penalties',
          ]
        },
        'celo-codebase/protocol/governance',
        {
          type: 'category',
          label: 'Stability Mechanism',
          items: [
            { type: 'doc', label: 'Overview', id: 'celo-codebase/protocol/stability/index', },
            'celo-codebase/protocol/stability/doto',
            'celo-codebase/protocol/stability/granda-mento',
            'celo-codebase/protocol/stability/oracles',
            'celo-codebase/protocol/stability/stability-fees',
            'celo-codebase/protocol/stability/adding_stable_assets',
            'celo-codebase/protocol/stability/tobin-tax',
          ]
        },
        {
          type: 'category',
          label: 'Transactions',
          items: [
            { type: 'doc', label: 'Overview', id: 'celo-codebase/protocol/transactions/index', },
            'celo-codebase/protocol/transactions/native-currency',
            'celo-codebase/protocol/transactions/erc20-transaction-fees',
            'celo-codebase/protocol/transactions/gas-pricing',
            'celo-codebase/protocol/transactions/escrow',
            'celo-codebase/protocol/transactions/tx-comment-encryption',
            'celo-codebase/protocol/transactions/full-node-incentives',
          ]
        },
        {
          type: 'category',
          label: 'Identity',
          items: [
            { type: 'doc', label: 'Overview', id: 'celo-codebase/protocol/identity/index', },
            'celo-codebase/protocol/identity/valora-accounts',
            'celo-codebase/protocol/identity/phone-number-privacy',
            'celo-codebase/protocol/identity/metadata',
            'celo-codebase/protocol/identity/randomness',
          ]
        },
        'celo-codebase/protocol/optics',
        'celo-codebase/protocol/plumo',
      ]
    },
    {
      type: "category",
      label: "Networks",
      items: [
        { type: "doc", label: "Celo Networks", id: "getting-started/choosing-a-network",},
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
        "getting-started/hosted-nodes",
      ],
    },
    {
      type: "category",
      label: "Command Line",
      items: [
        {
          type: "autogenerated",
          dirName: "command-line-interface",
        },
      ],
    },
  ],
  // ######################################
  // Developers 
  // ######################################
  developers: [
        { type: 'doc', label: 'Overview', id: 'developer-resources/overview', },
        {
          type: 'category',
          label: 'Local Environment',
          items: [
            'developer-resources/develop-on-windows',
            'developer-resources/using-mac',
          ]
        },
        {
          type: "category",
          label: "Developer Tools",
          items: [
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
          ],
        },
        {
          type: 'category',
          label: 'Deploy on Celo',
          items: [
            'developer-resources/deploy-dapp',
            'developer-resources/deploy-remix',
            'developer-resources/deploy-truffle',
            'developer-resources/deploy-hardhat',
            'developer-resources/deploy-replit',
          ]
        },
        {
          type: 'category',
          label: 'Code Examples',
          items: [
            'developer-resources/start',
            'developer-resources/walkthroughs/hellocelo',
            'developer-resources/walkthroughs/hellocontracts',
            'developer-resources/walkthroughs/hello-contract-remote-node',
            'developer-resources/walkthroughs/no-code-erc20',
            'developer-resources/walkthroughs/no-code-erc721',
            'developer-resources/walkthroughs/hello-mobile-dapp',
            'developer-resources/walkthroughs/web-dapp',
            { type: 'doc', label: 'WalletConnect', id: 'developer-resources/walkthroughs/wallet-connect'},
            { type: 'doc', label: 'Using Keystores', id: 'developer-resources/walkthroughs/using-js-keystores'}
          ]
        },
        {
          type: 'category',
          label: 'Bridging',
          items: [
            { type: 'doc', label: 'Bridging to Celo', id: 'celo-codebase/protocol/bridging/bridging-to-celo', },
            'celo-codebase/protocol/bridging/optics-gui',
            'celo-codebase/protocol/bridging/bridging-native-assets',
            'celo-codebase/protocol/bridging/bridging-tokens-with-etherscan',
          ]
        },
        { type: 'doc', label: 'Testnet Wallet', id: 'developer-resources/testnet-wallet', },
        { type: 'doc', label: 'Development Chain', id: 'developer-resources/walkthroughs/development-chain', },
        { type: 'doc', label: 'Ethereum Developers', id: 'developer-resources/celo-for-eth-devs', },
        // TODO: This link will need to be changed when we move all the SDK type docs
        { type: 'link', label: 'SDK Code Reference', href: 'https://celo-sdk-docs.readthedocs.io/' },
  ],
  // ######################################
  // Validators 
  // ######################################
  validators: [  
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
    { type: "doc", label: "Validator FAQ", id: "getting-started/validator-troubleshooting-faq",},
  ],
  // ######################################
  // Integration 
  // ######################################
  integrate: [  
    'developer-resources/integrations/integrations',
    'developer-resources/integrations/general',
    'developer-resources/integrations/checklist',
    'developer-resources/integrations/custody',
    'developer-resources/integrations/listings',
    'developer-resources/integrations/cloud-hsm',
  ], 
  // ######################################
  // Own 
  // ######################################
  own: [  
    { type: 'doc', label: 'Quick Start', id: 'celo-holder-guide/quick-start' },
    'celo-holder-guide/cusd',
    'celo-holder-guide/release-gold',
    'celo-holder-guide/voting-validators',
    { type: 'doc', label: 'Voting on Governance', id: 'celo-holder-guide/voting-governance', },
    'celo-holder-guide/governance-cheat-sheet',
    'celo-holder-guide/eth-recovery',
    'celo-holder-guide/celo-recovery',
  ], 
  // ######################################
  // Learn 
  // ######################################
  // learn: [  
  // ]
  // ######################################
  // Contributors 
  // ######################################
  contributors: [ 
    { type: 'doc', label: 'Contributing', id: 'community/contributing', },
    { type: 'doc', label: 'Code of Conduct', id: 'community/code-of-conduct', },
    { type: 'doc', label: 'Grant Playbook', id: 'community/grant-playbook', },
    {
      type: 'category',
      label: ' Release Process',
      items: [
        { type: 'doc', label: 'Overview', id: 'community/release-process/README', },
        { type: 'doc', label: 'Smart Contracts', id: 'community/release-process/smart-contracts', },
        { type: 'doc', label: 'Blockchain Client', id: 'community/release-process/blockchain-client', },
        { type: 'doc', label: 'CeloCLI and ContractKit', id: 'community/release-process/base-cli-contractkit-dappkit-utils', },
        { type: 'doc', label: 'Attestation Service', id: 'community/release-process/attestation-service', },
      ]
    },
    {
      type: 'category',
      label: 'Important Information',
      items: [
        { type: 'doc', label: 'Alfajores Testnet Disclaimer', id: 'important-information/alfajores-testnet-disclaimer', },
        { type: 'doc', label: 'Baklava Testnet Disclaimer', id: 'important-information/baklava-testnet-disclaimer', },
        { type: 'doc', label: 'Mainnet Disclaimer', id: 'important-information/mainnet-network-disclaimer', },
      ]
    },
  ],  
};
module.exports = sidebars;