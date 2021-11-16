const sidebars = {
  docs: [
    // { type: "doc", label: "Welcome to Celo", id: "welcome",},
    { type: 'doc', label: 'Welcome to Celo', id: 'welcome', },
    {
      type: "category",
      label: "Getting Started",
      items: [
        { type: 'doc', label: 'Introduction', id: 'learn/introduction-to-celo', },
        { type: "doc", label: "DApp Gallery", id: "developer-resources/celo-dapp-gallery",},
        {
          type: 'category',
          label: 'Celo Basics',
          items: [
            { type: 'doc', label: 'Why Celo', id: 'learn/why-celo', },
            { type: 'doc', label: 'Highlights', id: 'learn/celo-highlights', },
            { type: 'doc', label: 'Whitepapers', id: 'learn/celo-whitepapers', },
            { type: 'doc', label: 'Economic Model', id: 'learn/celo-economic-model', },
            { type: 'doc', label: 'Milestones', id: 'learn/celo-milestones', },
            { type: 'doc', label: 'Ecosystem', id: 'learn/celo-ecosystem', },
          ]
        },
        {
          type: 'category',
          label: 'Celo Platform',
          items: [
            { type: 'doc', label: 'Introduction', id: 'overview', },
            { type: 'doc', label: 'Celo Stack', id: 'learn/celo-stack', },
            { type: 'doc', label: 'Network Topology', id: 'learn/topology-of-a-celo-network', },
            { type: 'doc', label: 'Celo Protocol', id: 'learn/celo-protocol', },
          ]
        }, 
        // { type: "doc", label: "Celo Overview", id: "overview", },
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
            { type: 'doc', label: 'Functionality', id: 'celo-codebase/wallet/how-the-wallet-works/README', },
            { type: 'doc', label: 'Verification', id: 'celo-codebase/wallet/how-the-wallet-works/verification', },
            'celo-codebase/wallet/how-the-wallet-works/invitations',
            'celo-codebase/wallet/how-the-wallet-works/sending-and-requesting-payments',
            'celo-codebase/wallet/how-the-wallet-works/ultralight-node-sync',
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
            { type: "doc", label: "Set up a Ledger Wallet", id: 'celo-holder-guide/ledger',},
            { type: "doc", label: "Connect to Celo Terminal", id: "celo-holder-guide/connecting-ledger-celo-terminal-wallet",},
            { type: "doc", label: "Connect to Celo Web Wallet", id: "celo-holder-guide/connecting-ledger-celo-web-wallet",},
            { type: "doc", label: "Connect to Celo CLI", id: "celo-holder-guide/connecting-ledger-celocli",},
          ]
        },
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
            { type: 'doc', label: 'Validator Set Differences', id: 'celo-codebase/protocol/consensus/validator-set-differences', },
            { type: 'doc', label: 'Locating Nodes', id: 'celo-codebase/protocol/consensus/locating-nodes', },
            { type: 'doc', label: 'Ultralight Sync', id: 'celo-codebase/protocol/consensus/ultralight-sync', },
          ]
        },
        {
          type: 'category',
          label: 'Proof-of-Stake',
          items: [
            { type: 'doc', label: 'Overview', id: 'celo-codebase/protocol/proof-of-stake/index', },
            { type: 'doc', label: 'Validator Groups', id: 'celo-codebase/protocol/proof-of-stake/validator-groups', },
            { type: 'doc', label: 'Locked Gold', id: 'celo-codebase/protocol/proof-of-stake/locked-gold', },
            { type: 'doc', label: 'Validator Elections', id: 'celo-codebase/protocol/proof-of-stake/validator-elections', },
            {
              type: 'category',
              label: 'Epoch Rewards',
              items: [
                { type: 'doc', label: 'Overview', id: 'celo-codebase/protocol/proof-of-stake/epoch-rewards', },
                { type: 'doc', label: 'Validator Rewards', id: 'celo-codebase/protocol/proof-of-stake/validator-rewards',},
                { type: 'doc', label: 'Locked Gold Rewards', id: 'celo-codebase/protocol/proof-of-stake/locked-gold-rewards',},
                { type: 'doc', label: 'Community Fund', id: 'celo-codebase/protocol/proof-of-stake/community-fund',},
                { type: 'doc', label: 'Carbon Offsetting Fund', id: 'celo-codebase/protocol/proof-of-stake/carbon-offsetting-fund',},
              ]
            },
            { type: 'doc', label: 'Penalties', id: 'celo-codebase/protocol/proof-of-stake/penalties',},
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
        { type: "doc", label: "Networks", id: "getting-started/choosing-a-network",},
        {
          type: "category",
          label: "Mainnet",
          items: [
            { type: 'doc', label: 'Celo Mainnet', id: "getting-started/mainnet/index", },
            { type: 'doc', label: 'Run Mainnet Validator', id: "getting-started/mainnet/running-a-validator-in-mainnet", },
            { type: 'doc', label: 'Run Mainnet Full Node', id: "getting-started/mainnet/running-a-full-node-in-mainnet", },
          ],
        },
        {
          type: "category",
          label: "Alfajores Testnet",
          items: [
            { type: 'doc', label: 'Alfajores Testnet', id: "getting-started/alfajores-testnet/index", },
            { type: 'doc', label: 'Run Alfajores Full Node', id: "getting-started/alfajores-testnet/running-a-full-node-in-alfajores", },
            { type: 'doc', label: 'Mobile Wallet', id: "getting-started/alfajores-testnet/using-the-mobile-wallet", },
            { type: 'doc', label: 'Testnet Faucet', id: "getting-started/alfajores-testnet/faucet", },
          ],
        },
        {
          type: "category",
          label: "Baklava Testnet",
          items: [
            { type: 'doc', label: 'Baklava Testnet', id: "getting-started/baklava-testnet/index", },
            { type: 'doc', label: 'Run Baklava Validator', id: "getting-started/baklava-testnet/running-a-validator-in-baklava", },
            { type: 'doc', label: 'Run Baklava Full Node', id: "getting-started/baklava-testnet/running-a-full-node-in-baklava", },
          ],
        },
        { type: 'doc', label: 'Hosted Nodes', id: "getting-started/hosted-nodes", },
      ],
    },
    {
      type: 'category',
      label: 'Bridging',
      items: [
        { type: 'doc', label: 'Celo Bridges', id: 'celo-codebase/protocol/bridging/bridging-to-celo', },
        { type: 'doc', label: 'Optics Bridge GUI', id: 'celo-codebase/protocol/bridging/optics-gui', },
        { type: 'doc', label: 'Native Assets with Etherscan', id: 'celo-codebase/protocol/bridging/bridging-native-assets', },
        { type: 'doc', label: 'Tokens with Etherscan', id: 'celo-codebase/protocol/bridging/bridging-tokens-with-etherscan', },
      ]
    },
    { type: "doc", label: "Glossary", id: "getting-started/glossary",},
    { type: 'doc', label: 'FAQ', id: 'faqs', },
    {
      type: 'category',
      label: 'Resources',
      items: [
        { type: 'doc', label: 'Celo Onboarding', id: 'learn/celo-onboarding', },
        { type: 'doc', label: 'Developer Onboarding', id: 'learn/developer-onboarding', },
        {
          type: 'category',
          label: 'Quick Guides',
          items: [
            { type: 'doc', label: 'Celo', id: 'learn/celo-summary', },
            { type: 'doc', label: 'Celo Protocol', id: 'learn/celo-protocol-summary', },
            { type: 'doc', label: 'Valora', id: 'learn/valora-summary', },
            { type: 'doc', label: 'CELO', id: 'learn/CELO-coin-summary', },
            { type: 'doc', label: 'Celo Stablecoins', id: 'learn/platform-native-stablecoins-summary', },
          ]
        },
        { type: 'doc', label: 'Figment Learn', id: 'learn/figment-learn', },
        { type: 'doc', label: 'Celo Resources', id: 'learn/celo-resources', },
      ]
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
        { type: 'doc', label: 'Developers', id: 'developer-resources/overview', },
        // { type: 'doc', label: 'Basics', id: 'developer-resources/developer-basics',}, 
        {
          type: 'category',
          label: 'Build on Celo',
          items: [
            { type: 'doc', label: 'Start Building', id: 'developer-resources/deploy-dapp',},
            'developer-resources/deploy-remix',
            'developer-resources/deploy-truffle',
            'developer-resources/deploy-hardhat',
            'developer-resources/deploy-replit',
          ]
        },       
        {
          type: 'category',
          label: 'Local Environment',
          items: [
            { type: 'doc', label: 'Using Mac', id: 'developer-resources/using-mac',},
            { type: 'doc', label: 'Using Windows', id: 'developer-resources/develop-on-windows',},
          ]
        },
        {
          type: 'category',
          label: 'Code Examples',
          items: [
            { type: 'doc', label: 'Introduction', id: 'developer-resources/start',},
            { type: 'doc', label: 'Sending CELO & cUSD', id: 'developer-resources/walkthroughs/hellocelo',},
            { type: 'doc', label: 'Deploy to a Local Node', id: 'developer-resources/walkthroughs/hellocontracts',},
            { type: 'doc', label: 'Deploy to a Remote Node', id: 'developer-resources/walkthroughs/hello-contract-remote-node',},
            'developer-resources/walkthroughs/no-code-erc20',
            'developer-resources/walkthroughs/no-code-erc721',
            'developer-resources/walkthroughs/web-dapp',
            { type: 'doc', label: 'Valora + Wallet Connect', id: 'developer-resources/walkthroughs/valora-wc-v1',},
            { type: 'doc', label: 'Using Keystores', id: 'developer-resources/walkthroughs/using-js-keystores',},
            { type: 'link', label: 'Figment | Celo 101', href: 'https://learn.figment.io/protocols/celo/' },
            { type: 'link', label: 'Dacade | Celo 101', href: 'https://dacade.org/communities/celo-development-101' }, 
          ]
        },
        {
          type: "category",
          label: "Developer Tools",
          items: [
            { type: 'doc', label: 'Developer Tools', id: 'learn/developer-tools', },
            { type: 'doc', label: 'EVM Tools', id: 'learn/evm-compatible-tooling', },
            {
              type: 'category',
              label: 'ContractKit',
              items: [
                { type: 'doc', label: 'Overview', id: 'developer-resources/contractkit/index',},
                { type: 'doc', label: 'Setup', id: 'developer-resources/contractkit/setup',},
                { type: 'doc', label: 'Use Web3 from ContracKit', id: 'developer-resources/contractkit/notes-web3-with-contractkit',},
                { type: 'doc', label: 'Wrappers & Registry Contracts', id: 'developer-resources/contractkit/contracts-wrappers-registry',},
                { type: 'doc', label: 'Query On-Chain Identifiers with ODIS', id: 'developer-resources/contractkit/odis',},
                { type: 'doc', label: 'Migrate to ContractKit v1', id: 'developer-resources/contractkit/migrating-to-contractkit-v1',},
              ]
            },
            {
              type: 'category',
              label: 'DAppKit',
              items: [
                { type: 'doc', label: 'Overview', id: 'developer-resources/dappkit/index',},
                { type: 'doc', label: 'Setup', id: 'developer-resources/dappkit/setup',},
                { type: 'doc', label: 'Usage', id: 'developer-resources/dappkit/usage',},
              ]
            },
            { type: 'doc', label: 'Forno', id: 'developer-resources/forno/index',},
          ],
        },
        {
          type: 'category',
          label: 'Mobile Development',
          items: [
            { type: 'doc', label: 'Celo Wallet', id: 'celo-codebase/wallet/index', },
            { type: 'doc', label: 'Running the wallet locally', id: 'celo-codebase/wallet/intro', },
            { type: "doc", label: "Using the Wallet", id: "getting-started/using-the-wallet",},
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
    { type: "doc", label: "Validators", id: "validator-guide/overview",}, 
    { type: "doc", label: "Attestation Service", id: 'validator-guide/attestation-service',},
    {
      type: 'category',
      label: 'Key Management',
      items: [
        { type: "doc", label: "Summary", id: 'validator-guide/key-management/summary',},
        { type: "doc", label: "Key Management", id: 'validator-guide/key-management/detailed',},
        { type: "doc", label: "Key Rotation", id: 'validator-guide/key-management/key-rotation',},
      ]
    },
    { type: 'doc', label: 'Run Secure Nodes and Services', id: 'validator-guide/securing-nodes-and-services', },
    { type: 'doc', label: 'Monitoring', id: 'validator-guide/monitoring', },
    { type: 'doc', label: 'DevOps Best Practices', id: 'validator-guide/devops-best-practices', },
    { type: 'doc', label: 'Node Upgrades', id: 'validator-guide/node-upgrades', },
    { type: 'doc', label: 'Running Proxies', id: 'validator-guide/proxy', },
    { type: 'doc', label: 'Validator Explorer', id: 'validator-guide/validator-explorer', },
    { type: 'doc', label: 'Voting Policy', id: 'validator-guide/celo-foundation-voting-policy',},
    { type: 'doc', label: 'Celo Signal', id: 'validator-guide/celo-signal',},
    { type: "doc", label: "Validator FAQ", id: "getting-started/validator-troubleshooting-faq",},
  ],
  // ######################################
  // Owners 
  // ######################################
  own: [  
    { type: 'doc', label: 'Owners', id: 'celo-holder-guide/owners' },
    {
      type: 'category',
      label: 'Manage Assets',
      items: [
        { type: 'doc', label: 'Self-Custody CELO', id: 'celo-holder-guide/quick-start' },
        { type: 'doc', label: 'Asset Management', id: 'celo-holder-guide/cusd' },
        { type: 'doc', label: 'Release Gold', id: 'celo-holder-guide/release-gold' },
        { type: 'doc', label: 'Exchange Celo Assets', id: 'celo-holder-guide/celo-exchange-bot', },
      ]
    },
    {
      type: 'category',
      label: 'Voting',
      items: [
        { type: 'doc', label: 'Voting for Validators', id: 'celo-holder-guide/voting-validators', },
        { type: 'doc', label: 'Voting on Governance', id: 'celo-holder-guide/voting-governance', },
        { type: 'doc', label: 'Governance Cheat Sheet', id: 'celo-holder-guide/governance-cheat-sheet', },
      ]
    },
    {
      type: 'category',
      label: 'Recovery',
      items: [
        { type: 'doc', label: 'ETH Recovery', id: 'celo-holder-guide/eth-recovery', },
        { type: 'doc', label: 'CELO Recovery', id: 'celo-holder-guide/celo-recovery', },
      ]
    },
  ], 
    // ######################################
  // Integration 
  // ######################################
  integrate: [  
    { type: 'doc', label: 'Integrations', id: 'developer-resources/integrations/integrations' },
    { type: 'doc', label: 'General', id: 'developer-resources/integrations/general' },
    { type: 'doc', label: 'Checklist', id: 'developer-resources/integrations/checklist' },
    { type: 'doc', label: 'Custody', id: 'developer-resources/integrations/custody' },
    { type: 'doc', label: 'Listings', id: 'developer-resources/integrations/listings' },
    { type: 'doc', label: 'Cloud HSM', id: 'developer-resources/integrations/cloud-hsm' },
  ], 
  // ######################################
  // Contributors 
  // ######################################
  contributors: [ 
    { type: 'doc', label: 'Community', id: 'community/contributing', },
    {
      type: 'category',
      label: 'Contributors',
      items: [
        { type: 'doc', label: 'Guidelines', id: 'community/guidelines', },
        { type: 'doc', label: 'Protocol', id: 'community/protocol-contributors' },
        { type: 'doc', label: 'Translation', id: 'community/translation-contributors' },
        { type: 'doc', label: 'Documentation ', id: 'community/documentation-contributors' },
        { type: 'doc', label: 'Community Improvements', id: 'community/CIP-contributors' },
      ]
    },
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
    { type: 'doc', label: 'Join the Community', id: 'community/join-the-community', },
  ],  
};
module.exports = sidebars;
