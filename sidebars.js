const whatIsCeloSidebar = [
  { type: "doc", label: "Overview", id: "what-is-celo/index" },
  {
    type: "doc",
    label: "Our History",
    id: "what-is-celo/history",
  },
  {
    type: "category",
    label: "Using Celo",
    items: [
      { type: "doc", label: "Overview", id: "what-is-celo/using-celo/index" },
      {
        type: "category",
        label: "Protocol",
        items: [
          {
            type: "doc",
            label: "Overview",
            id: "what-is-celo/using-celo/protocol/index",
          },
          {
            type: "category",
            label: "Governance",
            items: [
              {
                type: "doc",
                label: "Overview",
                id: "what-is-celo/using-celo/protocol/governance/overview",
              },
              {
                type: "doc",
                label: "Create a Governance Proposal",
                id: "what-is-celo/using-celo/protocol/governance/create-governance-proposal",
              },
              {
                type: "doc",
                label: "Voting in Governance",
                id: "what-is-celo/using-celo/protocol/governance/voting-in-governance",
              },
              {
                type: "doc",
                label: "Voting with Celo Mondo",
                id: "what-is-celo/using-celo/protocol/governance/voting-in-governance-using-mondo",
              },
              {
                type: "doc",
                label: "Governable Parameters",
                id: "what-is-celo/using-celo/protocol/governance/governable-parameters",
              },
            ],
          },
          {
            type: "doc",
            label: "Penalties",
            id: "what-is-celo/using-celo/protocol/penalties",
          },
          {
            type: "doc",
            label: "Consensus",
            id: "what-is-celo/using-celo/protocol/consensus",
          },
          {
            type: "doc",
            label: "Celo Token",
            id: "what-is-celo/using-celo/protocol/celo-token",
          },
          {
            type: "doc",
            label: "Escrow",
            id: "what-is-celo/using-celo/protocol/escrow",
          },
          {
            type: "category",
            label: "Epoch Rewards",
            items: [
              {
                type: "doc",
                label: "Overview",
                id: "what-is-celo/using-celo/protocol/epoch-rewards/index",
              },
              {
                type: "doc",
                label: "Community Fund",
                id: "what-is-celo/using-celo/protocol/epoch-rewards/community-fund",
              },
              {
                type: "doc",
                label: "Carbon Offsetting Fund",
                id: "what-is-celo/using-celo/protocol/epoch-rewards/carbon-offsetting-fund",
              },
            ],
          },
          {
            type: "category",
            label: "Transactions",
            items: [
              {
                type: "doc",
                label: "Overview",
                id: "what-is-celo/using-celo/protocol/transaction/overview",
              },
              {
                type: "doc",
                label: "TX Comment Encryption",
                id: "what-is-celo/using-celo/protocol/transaction/tx-comment-encryption",
              },
              {
                type: "doc",
                label: "Transaction Types",
                id: "what-is-celo/using-celo/protocol/transaction/transaction-types",
              },
            ],
          },
        ],
      },
      {
        type: "category",
        label: "Manage",
        items: [
          {
            type: "doc",
            label: "Self-Custody",
            id: "what-is-celo/using-celo/manage/self-custody",
          },
          {
            type: "doc",
            label: "Release Gold",
            id: "what-is-celo/using-celo/manage/release-gold",
          },
          {
            type: "doc",
            label: "Exchange Assets",
            id: "what-is-celo/using-celo/manage/exchange",
          },
          {
            type: "doc",
            label: "Asset Management",
            id: "what-is-celo/using-celo/manage/asset",
          },
        ],
      },
      {
        type: "doc",
        label: "Gas Fees",
        id: "what-is-celo/using-celo/gas-fees",
      },
      {
        type: "category",
        label: "Bridging",
        link: { type: "doc",  id: "what-is-celo/using-celo/bridges", },
        items: [
          {
            type: "doc",
            label: "Bridging Native ETH to Celo",
            id: "what-is-celo/using-celo/native-ETH-bridging",
          },
        ],
      },
      {
        type: "doc",
        label: "Exchanges",
        id: "what-is-celo/using-celo/exchanges",
      },
      {
        type: "doc",
        label: "Glossary",
        id: "what-is-celo/using-celo/glossary",
      },
    ],
  },
  {
    type: "category",
    label: "Joining Celo",
    items: [
      {
        type: "doc",
        label: "Overview",
        id: "what-is-celo/joining-celo/index",
      },
      {
        type: "doc",
        label: "Builders",
        id: "what-is-celo/joining-celo/builders",
      },
      {
        type: "doc",
        label: "Regional DAOs",
        id: "what-is-celo/joining-celo/daos",
      },
      {
        type: "category",
        label: "Contributors",
        items: [
          {
            type: "doc",
            label: "Overview",
            id: "what-is-celo/joining-celo/contributors/overview",
          },
          {
            type: "doc",
            label: "Code Contributors",
            id: "what-is-celo/joining-celo/contributors/code-contributors",
          },
          {
            type: "doc",
            label: "CIP Contributors",
            id: "what-is-celo/joining-celo/contributors/cip-contributors",
          },
          {
            type: "doc",
            label: "Documentation Contributors",
            id: "what-is-celo/joining-celo/contributors/documentation-contributors",
          },
          {
            type: "category",
            label: "Release Process",
            items: [
              {
                type: "doc",
                label: "Overview",
                id: "what-is-celo/joining-celo/contributors/release-process/index",
              },
              {
                type: "doc",
                label: "Smart Contracts",
                id: "what-is-celo/joining-celo/contributors/release-process/smart-contracts",
              },
              {
                type: "doc",
                label: "Blockchain Client",
                id: "what-is-celo/joining-celo/contributors/release-process/blockchain-client",
              },
              {
                type: "doc",
                label: "CeloCLI and ContractKit",
                id: "what-is-celo/joining-celo/contributors/release-process/base-cli-contractkit-dappkit-utils",
              },
              {
                type: "doc",
                label: "Attestation Service",
                id: "what-is-celo/joining-celo/contributors/release-process/attestation-service",
              },
            ],
          },
        ],
      },
      {
        type: "link",
        label: "Code of Conduct",
        href: "https://github.com/celo-org/website/blob/master/src/content/code-of-conduct.md",
      },
    ],
  },
  {
    type: "category",
    label: "Community RPC Nodes",
    collapsed: false,
    items: [
      // TODO add intro to RPC
      // TODO también está https://docs.celo.org/cel2/operators/run-node?
      // TODOs
      {
        type: "doc",
        label: "Registering as a Community RPC Node",
        id: "cel2/operators/registering-as-rpc-node",
      },
      {
        type: "doc",
        label: "Operating a Community RPC Node",
        id: "cel2/operators/community-rpc-node",
      },
      {
        type: "doc",
        label: "Community RPC Provider FAQ",
        id: "cel2/operators/validator-rpc-faq",
      },
      {
        type: "doc",
        label: "How it works",
        id: "cel2/operators/how-it-works",
      },
      // TODO
      // {
      //   type: "doc",
      //   label: "Using public RPC nodes", 
      //   id: "cel2/operators/community-rpc-node",
      // },
    ],
  },
  {
    type: "category",
    label: "About Celo L1",
    items: [
      {
        type: "doc",
        label: "Overview",
        id: "what-is-celo/about-celo-l1/overview",
      },
      {
        type: "doc",
        label: "L1 Architecture",
        id: "what-is-celo/about-celo-l1/l1-architecture",
      },
      {
        type: "link",
        label: "Whitepapers",
        href: "https://celo.org/papers",
      },
      {
        type: "category",
        label: "Protocol",
        items: [
          {
            type: "doc",
            label: "Overview",
            id: "what-is-celo/about-celo-l1/protocol/index",
          },
          {
            type: "category",
            label: "Proof-of-Stake",
            items: [
              {
                type: "doc",
                label: "Overview",
                id: "what-is-celo/about-celo-l1/protocol/pos/index",
              },
              {
                type: "doc",
                label: "Validator Groups",
                id: "what-is-celo/about-celo-l1/protocol/pos/validator-groups",
              },
              {
                type: "doc",
                label: "Locked CELO",
                id: "what-is-celo/about-celo-l1/protocol/pos/locked-gold",
              },
              {
                type: "doc",
                label: "Validator Elections",
                id: "what-is-celo/about-celo-l1/protocol/pos/validator-elections",
              },
              {
                type: "category",
                label: "Epoch Rewards",
                items: [
                  {
                    type: "doc",
                    label: "Overview",
                    id: "what-is-celo/about-celo-l1/protocol/pos/epoch-rewards",
                  },
                  {
                    type: "doc",
                    label: "Validator Rewards",
                    id: "what-is-celo/about-celo-l1/protocol/pos/epoch-rewards-validator",
                  },
                  {
                    type: "doc",
                    label: "Locked CELO Rewards",
                    id: "what-is-celo/about-celo-l1/protocol/pos/epoch-rewards-locked-gold",
                  },
                  {
                    type: "doc",
                    label: "Community Fund",
                    id: "what-is-celo/about-celo-l1/protocol/pos/epoch-rewards-community-fund",
                  },
                  {
                    type: "doc",
                    label: "Carbon Offsetting Fund",
                    id: "what-is-celo/about-celo-l1/protocol/pos/epoch-rewards-carbon-offsetting-fund",
                  },
                ],
              },
              {
                type: "doc",
                label: "Penalties",
                id: "what-is-celo/about-celo-l1/protocol/pos/penalties",
              },
            ],
          },
          {
            type: "category",
            label: "Consensus",
            items: [
              {
                type: "doc",
                label: "Overview",
                id: "what-is-celo/about-celo-l1/protocol/consensus/index",
              },
              {
                type: "doc",
                label: "Validator Set Differences",
                id: "what-is-celo/about-celo-l1/protocol/consensus/validator-set-differences",
              },
              {
                type: "doc",
                label: "Locating Nodes",
                id: "what-is-celo/about-celo-l1/protocol/consensus/locating-nodes",
              },
            ],
          },
          {
            type: "category",
            label: "Transactions",
            items: [
              {
                type: "doc",
                label: "Overview",
                id: "what-is-celo/about-celo-l1/protocol/transaction/index",
              },
              "what-is-celo/about-celo-l1/protocol/transaction/native-currency",
              "what-is-celo/about-celo-l1/protocol/transaction/erc20-transaction-fees",
              "what-is-celo/about-celo-l1/protocol/transaction/gas-pricing",
              "what-is-celo/about-celo-l1/protocol/transaction/escrow",
              "what-is-celo/about-celo-l1/protocol/transaction/tx-comment-encryption",
              "what-is-celo/about-celo-l1/protocol/transaction/transaction-types",
            ],
          },
          {
            type: "category",
            label: "Stability",
            items: [
              {
                type: "doc",
                label: "Overview",
                id: "what-is-celo/about-celo-l1/protocol/stability/index",
              },
              "what-is-celo/about-celo-l1/protocol/stability/doto",
              "what-is-celo/about-celo-l1/protocol/stability/granda-mento",
              "what-is-celo/about-celo-l1/protocol/stability/oracles",
              "what-is-celo/about-celo-l1/protocol/stability/stability-fees",
              "what-is-celo/about-celo-l1/protocol/stability/adding-stable-assets",
            ],
          },
          {
            type: "category",
            label: "Identity",
            items: [
              {
                type: "doc",
                label: "Overview",
                id: "what-is-celo/about-celo-l1/protocol/identity/index",
              },
              "what-is-celo/about-celo-l1/protocol/identity/metadata",
              "what-is-celo/about-celo-l1/protocol/identity/smart-contract-accounts",
              "what-is-celo/about-celo-l1/protocol/identity/encrypted-cloud-backup",
              {
                type: "doc",
                label: "Privacy Research",
                id: "what-is-celo/about-celo-l1/protocol/identity/privacy-research",
              },
              {
                type: "category",
                label: "ODIS",
                items: [
                  {
                    type: "doc",
                    label: "Overview",
                    id: "what-is-celo/about-celo-l1/protocol/identity/odis",
                  },
                  {
                    type: "category",
                    label: "Use Cases",
                    items: [
                      "what-is-celo/about-celo-l1/protocol/identity/odis-use-case-phone-number-privacy",
                      "what-is-celo/about-celo-l1/protocol/identity/odis-use-case-key-hardening",
                    ],
                  },
                  {
                    type: "category",
                    label: "Domains",
                    items: [
                      {
                        type: "doc",
                        label: "Overview",
                        id: "what-is-celo/about-celo-l1/protocol/identity/odis-domain",
                      },
                      {
                        type: "doc",
                        label: "Sequential Delay Domain",
                        id: "what-is-celo/about-celo-l1/protocol/identity/odis-domain-sequential-delay-domain",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "doc",
            label: "Celo Randomness",
            id: "what-is-celo/about-celo-l1/protocol/randomness",
          },
          {
            type: "category",
            label: "Contracts",
            items: [
              {
                type: "doc",
                label: "Add A Contract",
                id: "what-is-celo/about-celo-l1/protocol/contracts/add-contract",
              },
            ],
          },
        ],
      },
      {
        type: "category",
        label: "Validator",
        items: [
          {
            type: "doc",
            label: "Overview",
            id: "what-is-celo/about-celo-l1/validator/index",
          },
          {
            type: "doc",
            label: "Voting for Validator Groups",
            id: "what-is-celo/about-celo-l1/validator/voting",
          },
          {
            type: "category",
            label: "Run a Validator",
            items: [
              {
                type: "doc",
                label: "Mainnet Validator",
                id: "what-is-celo/about-celo-l1/validator/run/mainnet",
              },
              // {
              //   type: "doc",
              //   label: "Baklava Validator",
              //   id: "what-is-celo/about-celo-l1/validator/run/baklava",
              // },
            ],
          },
          {
            type: "category",
            label: "Key Management",
            items: [
              {
                type: "doc",
                label: "Summary",
                id: "what-is-celo/about-celo-l1/validator/key-management/summary",
              },
              {
                type: "doc",
                label: "Key Management",
                id: "what-is-celo/about-celo-l1/validator/key-management/detailed",
              },
              {
                type: "doc",
                label: "Key Rotation",
                id: "what-is-celo/about-celo-l1/validator/key-management/key-rotation",
              },
            ],
          },
          {
            type: "doc",
            label: "Nodes and Services",
            id: "what-is-celo/about-celo-l1/validator/security",
          },
          {
            type: "doc",
            label: "Monitoring",
            id: "what-is-celo/about-celo-l1/validator/monitoring",
          },
          {
            type: "doc",
            label: "DevOps Best Practices",
            id: "what-is-celo/about-celo-l1/validator/devops-best-practices",
          },
          {
            type: "doc",
            label: "Node Upgrades",
            id: "what-is-celo/about-celo-l1/validator/node-upgrade",
          },
          {
            type: "doc",
            label: "Running Proxies",
            id: "what-is-celo/about-celo-l1/validator/proxy",
          },
          {
            type: "doc",
            label: "Validator Explorer",
            id: "what-is-celo/about-celo-l1/validator/validator-explorer",
          },
          {
            type: "doc",
            label: "Voting Policy",
            id: "what-is-celo/about-celo-l1/validator/celo-foundation-voting-policy",
          },
          {
            type: "doc",
            label: "Celo Signal",
            id: "what-is-celo/about-celo-l1/validator/celo-signal",
          },
          {
            type: "doc",
            label: "Validator FAQ",
            id: "what-is-celo/about-celo-l1/validator/troubleshooting-faq",
          },
          {
            type: "link",
            label: "Celo Website",
            href: "https://celo.org",
          },
          {
            type: "link",
            label: "Celo Discord",
            href: "https://discord.com/invite/celo",
          },
        ],
      },
    ],
  },
  {
    type: "link",
    label: "Celo Website",
    href: "https://celo.org",
  },
];

const buildOnCeloSidebar = [
  { type: "doc", label: "Overview", id: "build/index" },
  {
    type: "doc",
    label: "Quickstart with Celo Composer",
    id: "build/quickstart",
  },
  {
    type: "doc",
    label: "Composer Kit UI",
    id: "build/composer-kit",
  },
  {
    type: "category",
    label: "Celo MCPs",
    items: [
      {
        type: "doc",
        label: "Celo MCP Server",
        id: "build/mcp/celo-mcp",
      },
      {
        type: "doc",
        label: "Composer MCP Server",
        id: "build/mcp/composer-mcp",
      },
    ],
  },
  {
    type: "category",
    label: "Build with AI",
    items: [
      {
        type: "doc",
        label: "Overview",
        id: "build/build-with-ai/overview",
      },
      {
        type: "category",
        label: "Build with GOAT",
        items: [
          {
            type: "doc",
            label: "Build a TokenSwap Agent",
            id: "build/build-with-ai/build-with-goat/token-swap-agent",
          },
          {
            type: "doc",
            label: "Build an NFT Minting Agent",
            id: "build/build-with-ai/build-with-goat/mint-nft-agent",
          },
          {
            type: "doc",
            label: "Build a Token Sending Agent",
            id: "build/build-with-ai/build-with-goat/send-token-agent",
          },
        ],
      },
      {
        type: "doc",
        label: "Resources",
        id: "build/build-with-ai/resources",
      },
      {
        type: "doc",
        label: "Tools & Infra",
        id: "build/build-with-ai/tools",
      },
      {
        type: "doc",
        label: "Use Cases",
        id: "build/build-with-ai/usecases",
      },
      {
        type: "category",
        label: "Examples",
        items: [
          {
            type: "doc",
            label: "Launch AI Agent Memecoins",
            id: "build/build-with-ai/examples/ai-memecoins",
          },
          {
            type: "doc",
            label: "Using GOAT Framework",
            id: "build/build-with-ai/examples/building_with_goat",
          },
          {
            type: "doc",
            label: "ERC-20 Token Deployer with Nebula",
            id: "build/build-with-ai/examples/build-with-nebula",
          },
        ],
      },
    ],
  },
  // {
  //   type: "doc",
  //   label: "Build with AI",
  //   id: "developer/build-with-ai/overview",
  // },
  {
    type: "category",
    label: "Build on MiniPay",
    items: [
      {
        type: "doc",
        label: "Overview",
        id: "build/build-on-minipay/overview",
      },
      {
        type: "doc",
        label: "Getting Started",
        id: "build/build-on-minipay/quickstart",
      },
      {
        type: "category",
        label: "Prerequisites",
        items: [
          {
            type: "doc",
            label: "Ngrok Setup",
            id: "build/build-on-minipay/prerequisites/ngrok-setup",
          },
        ],
      },
      {
        type: "doc",
        label: "Code Library",
        id: "build/build-on-minipay/code-library",
      },
      {
        type: "doc",
        label: "MiniPay Deeplinks",
        id: "build/build-on-minipay/deeplinks",
      },
    ],
  },
  {
    type: "doc",
    label: "Build with Self",
    id: "build/build-with-self",
  },
  {
    type: "doc",
    label: "Build with DeFi",
    id: "build/build-with-defi",
  },
  {
    type: "category",
    label: "Integrate with Celo",
    items: [
      { type: "doc", label: "Overview", id: "integration/index" },
      { type: "doc", label: "General", id: "integration/general" },
      {
        type: "doc",
        label: "Checklist",
        id: "integration/checklist",
      },
      { type: "doc", label: "Custody", id: "integration/custody" },
      { type: "doc", label: "Listings", id: "integration/listings" },
      {
        type: "doc",
        label: "Cloud HSM",
        id: "integration/cloud-hsm",
      },
    ],
  },
  {
    type: "doc",
    label: "Fund your Project",
    id: "build/fund-your-project",
  },
  {
    type: "doc",
    label: "Launch Checklist",
    id: "developer/launch-checklist",
  },
  {
    type: "doc",
    label: "Get Support",
    id: "build/support",
  },
];

const toolingSidebar = [
  { type: "doc", label: "Overview", id: "developer/index" },
  { type: "doc", label: "Network Information", id: "network/index" },
  {
    type: "category",
    label: "Nodes",
    items: [
      {
        type: "doc",
        label: "Overview",
        id: "network/node/overview",
      },
      {
        type: "link",
        label: "Run a Celo Node",
        href: "https://docs.celo.org/cel2/operators/run-node",
      },
      {
        type: "doc",
        label: "Hosted Nodes",
        id: "network/node/run-hosted",
      },
      {
        type: "doc",
        label: "Forno",
        id: "network/node/forno",
      },
      // {
      //   type: "category",
      //   label: "Run a Node",
      //   items: [
        // {
        //   type: "doc",
        //   label: "Mainnet Full Node",
        //   id: "network/node/run-mainnet",
        // },
        // {
        //   type: "doc",
        //   label: "Alfajores Full Node",
        //   id: "network/node/run-alfajores",
        // },
        // {
        //   type: "doc",
        //   label: "Baklava Full Node",
        //   id: "network/node/run-baklava",
        // },
      //   ],
      // },
    ],
  },
  {
    type: "category",
    label: "Contracts",
    items: [
      {
        type: "doc",
        label: "Core Contracts",
        id: "contracts/core-contracts",
      },
      {
        type: "doc",
        label: "Token Contracts",
        id: "contracts/token-contracts",
      },
      {
        type: "doc",
        label: "Uniswap Contracts",
        id: "contracts/uniswap-contracts",
      },
    ],
  },
  {
    type: "category",
    label: "Wallets",
    items: [
      {
        type: "doc",
        label: "Overview",
        id: "wallet/index",
      },
      {
        type: "category",
        label: "MetaMask",
        items: [
          {
            type: "doc",
            label: "Add Celo to MetaMask",
            id: "wallet/metamask/add-celo-testnet-to-metamask",
          },
          {
            type: "doc",
            label: "Programmatic Setup",
            id: "wallet/metamask/setup",
          },
          {
            type: "doc",
            label: "Metmask and Celo",
            id: "wallet/metamask/use",
          },
          {
            type: "doc",
            label: "MetaMask and Valora",
            id: "wallet/metamask/import",
          },
        ],
      },
      {
        type: "category",
        label: "Ledger Wallet",
        items: [
          {
            type: "doc",
            label: "Ledger Wallet Setup",
            id: "wallet/ledger/setup",
          },
          {
            type: "doc",
            label: "Connect to Celo Terminal",
            id: "wallet/ledger/to-celo-terminal",
          },
          {
            type: "doc",
            label: "Connect to Celo Web Wallet",
            id: "wallet/ledger/to-celo-web",
          },
          {
            type: "doc",
            label: "Connect to Celo CLI",
            id: "wallet/ledger/to-celo-cli",
          },
        ],
      },
      {
        type: "link",
        label: "Staking",
        href: "https://medium.com/stake-service/hey-guys-today-well-take-a-look-at-how-you-can-use-the-cello-wallet-to-stake-your-own-cello-92730ac24aa5",
      },
    ],
  },
  {
    type: "doc",
    label: "Bridging",
    id: "developer/bridges/bridges",
  },
  {
    type: "doc",
    label: "Cross Chain Messaging",
    id: "developer/bridges/cross-chain-messaging",
  },
  {
    type: "category",
    label: "Explorers",
    items: [
      {
        type: "doc",
        label: "Overview",
        id: "developer/explorers/overview",
      },
      {
        type: "doc",
        label: "Block Explorers",
        id: "developer/explorers/block-explorers",
      },
      {
        type: "doc",
        label: "Analytics",
        id: "developer/explorers/analytics",
      },
      {
        type: "link",
        label: "Blockscout",
        href: "https://explorer.celo.org/",
      },
      {
        type: "link",
        label: "Celoscan",
        href: "https://celoscan.io/",
      },
    ],
  },
  {
    type: "category",
    label: "Indexers",
    items: [
      { type: "doc", label: "Overview", id: "developer/indexers/overview" },
      { type: "doc", label: "The Graph", id: "developer/indexers/the-graph" },
      { type: "doc", label: "SubQuery", id: "developer/indexers/subquery" },
      { type: "doc", label: "Envio", id: "developer/indexers/envio" },
    ],
  },
  {
    type: "category",
    label: "Dev Environments",
    items: [
      {
        type: "doc",
        label: "Overview",
        id: "developer/deploy/index",
      },
      {
        type: "doc",
        label: "Using Foundry",
        id: "developer/deploy/foundry",
      },
      {
        type: "category",
        label: "Using thirdweb",
        items: [
          { type: "doc", label: "Overview", id: "developer/deploy/thirdweb/overview" },
          { type: "doc", label: "Deploy with Thirdweb CLI", id: "developer/deploy/thirdweb/thirdweb" },
          { type: "doc", label: "One-Click Deploy", id: "developer/deploy/thirdweb/one-click-deploy" },
        ],
      },
      {
        type: "doc",
        label: "Using Remix",
        id: "developer/deploy/remix",
      },
      {
        type: "doc",
        label: "Using Hardhat",
        id: "developer/deploy/hardhat",
      },
    ],
  },
  {
    type: "category",
    label: "Libraries & SDKs",
    items: [
      {
        type: "doc",
        label: "Overview",
        id: "developer/sdks/celo-sdks",
      },
      {
        type: "category",
        label: "CLI",
        items: [
          { type: "doc", label: "Introduction", id: "cli/index", },
          // TOPICS
          { type: "doc", label: "Account", id: "cli/account" },
          { type: "doc", label: "Config", id: "cli/config" },
          { type: "doc", label: "DKG", id: "cli/dkg" },
          { type: "doc", label: "Election", id: "cli/election" },
          { type: "doc", label: "Epochs", id: "cli/epochs" },
          { type: "doc", label: "Exchange", id: "cli/exchange" },
          { type: "doc", label: "Governance", id: "cli/governance" },
          { type: "doc", label: "Identity", id: "cli/identity" },
          { type: "doc", label: "LockedCelo", id: "cli/lockedcelo", },
          { type: "doc", label: "LockedGold", id: "cli/lockedgold", },
          { type: "doc", label: "Multisig", id: "cli/multisig" },
          { type: "doc", label: "Network", id: "cli/network" },
          { type: "doc", label: "Node", id: "cli/node" },
          { type: "doc", label: "Oracle", id: "cli/oracle" },
          { type: "doc", label: "Release CELO", id: "cli/releasecelo" },
          { type: "doc", label: "Rewards", id: "cli/rewards" },
          { type: "doc", label: "Transfer", id: "cli/transfer" },
          { type: "doc", label: "Validator", id: "cli/validator" },
          { type: "doc", label: "Validator Group", id: "cli/validatorgroup" },
          // COMMANDS
          { type: "doc", label: "Autocomplete", id: "cli/autocomplete" },
          { type: "doc", label: "Commands", id: "cli/commands" },
          { type: "doc", label: "Help", id: "cli/help" },   
          { type: "doc", label: "Plugins", id: "cli/plugins" },
        ],
      },
      {
        type: "doc",
        label: "viem",
        id: "developer/viem/index",
      },
      {
        type: "doc",
        label: "thirdweb SDK",
        id: "developer/thirdweb-sdk/index",
      },
      {
        type: "doc",
        label: "Ethers.js",
        id: "developer/ethers/index",
      },
      {
        type: "category",
        label: "Web3Modal SDK",
        items: [
          {
            type: "doc",
            label: "Overview",
            id: "developer/web3modal/index",
          },
          {
            type: "doc",
            label: "Wagmi",
            id: "developer/web3modal/wagmi",
          },
          {
            type: "doc",
            label: "Ethers",
            id: "developer/web3modal/ethers",
          },
        ],
      },
      {
        type: "doc",
        label: "Particle Network",
        id: "developer/particle-network/index",
      },
      {
        type: "category",
        label: "ContractKit",
        items: [
          {
            type: "doc",
            label: "Overview",
            id: "developer/contractkit/index",
          },
          {
            type: "doc",
            label: "Setup",
            id: "developer/contractkit/setup",
          },
          {
            type: "doc",
            label: "Using the Kit",
            id: "developer/contractkit/usage",
          },
          {
            type: "doc",
            label: "Core Contracts Registry",
            id: "developer/contractkit/contracts-wrappers-registry",
          },
          {
            type: "doc",
            label: "Query On-Chain Identifiers with ODIS",
            id: "developer/contractkit/odis",
          },
        ],
      },
      {
        type: "doc",
        label: "rainbowkit-celo (deprectated)",
        id: "developer/rainbowkit-celo/index",
      },
      {
        type: "doc",
        label: "Web3.js (deprecated)",
        id: "developer/web3/index",
      },
    ],
  },
  {
    type: "link",
    label: "Faucet",
    href: "https://faucet.celo.org",
  },
  {
    type: "category",
    label: "Verification",
    items: [
      {
        type: "doc",
        label: "Overview",
        id: "developer/verify/index",
      },
      {
        type: "doc",
        label: "Using Blockscout",
        id: "developer/verify/blockscout",
      },
      {
        type: "doc",
        label: "Using Celoscan",
        id: "developer/verify/celoscan",
      },
      {
        type: "doc",
        label: "Using Remix",
        id: "developer/verify/remix",
      },
      {
        type: "doc",
        label: "Using Hardhat",
        id: "developer/verify/hardhat",
      },
    ],
  },
  {
    type: "category",
    label: "Oracles",
    items: [
      {
        type: "doc",
        label: "Running Oracles",
        id: "developer/oracles/run",
      },
      {
        type: "doc",
        label: "Overview",
        id: "developer/oracles/index",
      },
      {
        type: "doc",
        label: "Using Band Protocol",
        id: "developer/oracles/band-protocol",
      },
      {
        type: "doc",
        label: "Using Chainlink Oracles",
        id: "developer/oracles/chainlink-oracles",
      },
      {
        type: "doc",
        label: "Using RedStone",
        id: "developer/oracles/redstone",
      },
      {
        type: "doc",
        label: "Using Supra",
        id: "developer/oracles/supra",
      },
      {
        type: "doc",
        label: "Using Quex",
        id: "developer/oracles/quex-oracles",
      },
    ],
  },
  {
    type: "doc",
    label: "Fee Abstraction",
    id: "developer/fee-abstraction",
  },
];

const celoL2Sidebar = [
  {
    type: "doc",
    label: "Overview",
    id: "cel2/index",
  },
  {
    type: "category",
    label: "Notices",
    collapsed: false,
    items: [
      {
        type: "doc",
        label: "Isthmus Upgrade",
        id: "cel2/notices/isthmus-upgrade",
      },
      {
        type: "doc",
        label: "Celo L2 Migration",
        id: "cel2/notices/l2-migration",
      },
    ],
  },
  {
    type: "doc",
    label: "Builders",
    id: "cel2/builders",
  },
  {
    type: "category",
    label: "Node operators",
    link: {
      type: "doc",
      id: "cel2/operators/overview",
    },
    collapsed: false,
    items: [
      {
        type: "doc",
        label: "Architecture",
        id: "cel2/operators/architecture",
      },
      {
        type: "doc",
        label: "Running a Celo Node",
        id: "cel2/operators/run-node",
      },
      {
        type: "doc",
        label: "Migrating an L1 Node",
        id: "cel2/operators/migrate-node",
      },
    ],
  },
  {
    type: "category",
    label: "What's Changed?",
    link: { type: "doc", id: "cel2/whats-changed/overview" },
    collapsed: false,
    items: [
      "cel2/whats-changed/cel2-architecture",
      "cel2/whats-changed/l1-l2",
      "cel2/whats-changed/op-l2",
    ],
  },
  {
    type: "category",
    label: "Guides",
    collapsed: true,
    items: [
      {
        type: "doc",
        label: "Bridging CELO from L1 to L2",
        id: "cel2/guides/bridging-celo-from-l1-to-l2",
      },
      {
        type: "doc",
        label: "Withdrawing CELO from L2 to L1",
        id: "cel2/guides/withdrawing-celo-from-l2-to-l1",
      },
      {
        type: "doc",
        label: "Fee Abstraction on Celo L2",
        id: "cel2/guides/fee-abstraction",
      },
    ],
  },
  { type: "doc", label: "FAQ", id: "cel2/faq" },
  { type: "link", label: "Celo L2 Specs", href: "https://specs.celo.org/" },
];

const sidebars = {
  whatisCeloSidebar: whatIsCeloSidebar,
  buildOnCeloSidebar: buildOnCeloSidebar,
  toolingSidebar: toolingSidebar,
  celoL2Sidebar: celoL2Sidebar,
};

module.exports = sidebars;
