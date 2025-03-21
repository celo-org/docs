const { link } = require("fs");
const { type } = require("os");

const sidebars = {
  // ######################################
  // What is Celo
  // ######################################

  generalSidebar: [
    { type: "doc", label: "Overview", id: "general/index" },
    {
      type: "doc",
      label: "Our History",
      id: "general/history",
    },
    //{
    //  type: "doc",
    //  label: "L1 Architecture",
    //  id: "general/architecture",
    //},
    {
      type: "category",
      label: "Using Celo",
      items: [
        {
          type: "category",
          label: "Holder",
          items: [
            { type: "doc", label: "Overview", id: "holder/index" },
            {
              type: "category",
              label: "Manage",
              items: [
                {
                  type: "doc",
                  label: "Self-Custody",
                  id: "holder/manage/self-custody",
                },
                {
                  type: "doc",
                  label: "Release Gold",
                  id: "holder/manage/release-gold",
                },
                {
                  type: "doc",
                  label: "Exchange Assets",
                  id: "holder/manage/exchange",
                },
                {
                  type: "doc",
                  label: "Asset Management",
                  id: "holder/manage/asset",
                },
              ],
            },
            {
              type: "category",
              label: "Voting",
              items: [
                {
                  type: "doc",
                  label: "Validator Elections",
                  id: "holder/vote/validator",
                },
                {
                  type: "doc",
                  label: "Voting on Governance",
                  id: "holder/vote/governance",
                },
                {
                  type: "doc",
                  label: "Governable Parameters",
                  id: "holder/vote/governance-parameters",
                },
              ],
            },
            {
              type: "category",
              label: "Recovery",
              items: [
                {
                  type: "doc",
                  label: "Recover from ETH Address",
                  id: "holder/recover/from-eth-address",
                },
                {
                  type: "doc",
                  label: "Recover from Celo Address",
                  id: "holder/recover/from-celo-address",
                },
              ],
            },
            {
              type: "link",
              label: "Exchanges",
              href: "https://coinmarketcap.com/currencies/celo/markets/",
            },
          ],
        },
        {
          type: "doc",
          label: "Wallets",
          id: "general/using-celo/wallets",
        },
        {
          type: "doc",
          label: "Gas Fees",
          id: "general/using-celo/gas-fees",
        },
        {
          type: "doc",
          label: "Bridging",
          id: "general/using-celo/bridging",
        },
        {
          type: "doc",
          label: "DEXs",
          id: "general/using-celo/dexes",
        },
        {
          type: "doc",
          label: "Voting",
          id: "general/using-celo/voting",
        },
      ],
    },
    {
      type: "category",
      label: "Joining Celo",
      items: [
        {
          type: "doc",
          label: "Celo Ecosystem",
          id: "general/ecosystem/overview",
        },
        {
          type: "doc",
          label: "Builders",
          id: "general/ecosystem/builders",
        },
        {
          type: "doc",
          label: "Open Source Contributors",
          id: "general/ecosystem/contributors",
        },
        {
          type: "doc",
          label: "Regional DAOs",
          id: "general/ecosystem/daos",
        },
        {
          type: "doc",
          label: "Governance",
          id: "general/ecosystem/governance",
        },
        {
          type: "category",
          label: "Guides",
          items: [
            {
              type: "doc",
              label: "Create a Governance Proposal",
              id: "general/ecosystem/guides/create-proposal",
            },
            {
              type: "doc",
              label: "Fundraising",
              id: "general/ecosystem/guides/fundraising",
            },
            {
              type: "doc",
              label: "Guidelines",
              id: "general/ecosystem/guides/guidelines",
            },
            {
              type: "doc",
              label: "Grant Playbook",
              id: "general/ecosystem/guides/grant-playbook",
            },
            {
              type: "link",
              label: "Code of Conduct",
              href: "https://github.com/celo-org/website/blob/master/src/content/code-of-conduct.md",
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "About Celo L1",
      items: [
        {
          type: "doc",
          label: "Overview",
          id: "general/celo_l1_index",
        },
        {
          type: "doc",
          label: "L1 Architecture",
          id: "general/architecture",
        },
        {
          type: "category",
          label: "Protocol",
          items: [
            {
              type: "doc",
              label: "Overview",
              id: "protocol/index",
            },
            {
              type: "category",
              label: "Proof-of-Stake",
              items: [
                {
                  type: "doc",
                  label: "Overview",
                  id: "protocol/pos/index",
                },
                {
                  type: "doc",
                  label: "Validator Groups",
                  id: "protocol/pos/validator-groups",
                },
                {
                  type: "doc",
                  label: "Locked CELO",
                  id: "protocol/pos/locked-gold",
                },
                {
                  type: "doc",
                  label: "Validator Elections",
                  id: "protocol/pos/validator-elections",
                },
                {
                  type: "category",
                  label: "Epoch Rewards",
                  items: [
                    {
                      type: "doc",
                      label: "Overview",
                      id: "protocol/pos/epoch-rewards",
                    },
                    {
                      type: "doc",
                      label: "Validator Rewards",
                      id: "protocol/pos/epoch-rewards-validator",
                    },
                    {
                      type: "doc",
                      label: "Locked CELO Rewards",
                      id: "protocol/pos/epoch-rewards-locked-gold",
                    },
                    {
                      type: "doc",
                      label: "Community Fund",
                      id: "protocol/pos/epoch-rewards-community-fund",
                    },
                    {
                      type: "doc",
                      label: "Carbon Offsetting Fund",
                      id: "protocol/pos/epoch-rewards-carbon-offsetting-fund",
                    },
                  ],
                },
                {
                  type: "doc",
                  label: "Penalties",
                  id: "protocol/pos/penalties",
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
                  id: "protocol/consensus/index",
                },
                {
                  type: "doc",
                  label: "Validator Set Differences",
                  id: "protocol/consensus/validator-set-differences",
                },
                {
                  type: "doc",
                  label: "Locating Nodes",
                  id: "protocol/consensus/locating-nodes",
                },
              ],
            },
            {
              type: "category",
              label: "Governance",
              items: [
                {
                  type: "doc",
                  label: "Overview",
                  id: "protocol/governance/index",
                },
                {
                  type: "doc",
                  label: "Create Proposal",
                  id: "protocol/governance/create-proposal",
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
                  id: "protocol/transaction/index",
                },
                "protocol/transaction/native-currency",
                "protocol/transaction/erc20-transaction-fees",
                "protocol/transaction/gas-pricing",
                "protocol/transaction/escrow",
                "protocol/transaction/tx-comment-encryption",
                "protocol/transaction/transaction-types",
              ],
            },
//            {
//              type: "category",
//              label: "Stability",
//              items: [
//                {
//                  type: "doc",
//                  label: "Overview",
//                  id: "protocol/stability/index",
//                },
//                "protocol/stability/doto",
//                "protocol/stability/granda-mento",
//                "protocol/stability/oracles",
//                "protocol/stability/stability-fees",
//                "protocol/stability/adding-stable-assets",
//              ],
//            },
            {
              type: "category",
              label: "Identity",
              items: [
                {
                  type: "doc",
                  label: "Overview",
                  id: "protocol/identity/index",
                },
                {
                  type: "link",
                  label: "Social Connect",
                  href: "https://github.com/celo-org/Social-Connect",
                },
                "protocol/identity/metadata",
                "protocol/identity/smart-contract-accounts",
                "protocol/identity/encrypted-cloud-backup",
                {
                  type: "doc",
                  label: "Privacy Research",
                  id: "protocol/identity/privacy-research",
                },
                {
                  type: "category",
                  label: "ODIS",
                  items: [
                    {
                      type: "doc",
                      label: "Overview",
                      id: "protocol/identity/odis",
                    },
                    {
                      type: "category",
                      label: "Use Cases",
                      items: [
                        "protocol/identity/odis-use-case-phone-number-privacy",
                        "protocol/identity/odis-use-case-key-hardening",
                      ],
                    },
                    {
                      type: "category",
                      label: "Domains",
                      items: [
                        {
                          type: "doc",
                          label: "Overview",
                          id: "protocol/identity/odis-domain",
                        },
                        {
                          type: "doc",
                          label: "Sequential Delay Domain",
                          id: "protocol/identity/odis-domain-sequential-delay-domain",
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
              id: "protocol/randomness",
            },
            {
              type: "category",
              label: "Contracts",
              items: [
                {
                  type: "doc",
                  label: "Add A Contract",
                  id: "protocol/contracts/add-contract",
                },
              ],
            },
            {
              type: "category",
              label: " Release Process",
              items: [
                {
                  type: "doc",
                  label: "Overview",
                  id: "community/release-process/index",
                },
                {
                  type: "doc",
                  label: "Smart Contracts",
                  id: "community/release-process/smart-contracts",
                },
                {
                  type: "doc",
                  label: "Blockchain Client",
                  id: "community/release-process/blockchain-client",
                },
                {
                  type: "doc",
                  label: "CeloCLI and ContractKit",
                  id: "community/release-process/base-cli-contractkit-dappkit-utils",
                },
                {
                  type: "doc",
                  label: "Attestation Service",
                  id: "community/release-process/attestation-service",
                },
                {
                  type: "doc",
                  label: "Celo Oracles",
                  id: "community/release-process/celo-oracles",
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
              id: "validator/index",
            },
            {
              type: "category",
              label: "Run a Validator",
              items: [
                {
                  type: "doc",
                  label: "Mainnet Validator",
                  id: "validator/run/mainnet",
                },
                {
                  type: "doc",
                  label: "Baklava Validator",
                  id: "validator/run/baklava",
                },
              ],
            },
            // {
            //   type: "doc",
            //   label: "Attestation Service",
            //   id: "validator/attestation",
            // },
            {
              type: "category",
              label: "Key Management",
              items: [
                {
                  type: "doc",
                  label: "Summary",
                  id: "validator/key-management/summary",
                },
                {
                  type: "doc",
                  label: "Key Management",
                  id: "validator/key-management/detailed",
                },
                {
                  type: "doc",
                  label: "Key Rotation",
                  id: "validator/key-management/key-rotation",
                },
              ],
            },
            {
              type: "doc",
              label: "Nodes and Services",
              id: "validator/security",
            },
            {
              type: "doc",
              label: "Monitoring",
              id: "validator/monitoring",
            },
            {
              type: "doc",
              label: "DevOps Best Practices",
              id: "validator/devops-best-practices",
            },
            {
              type: "doc",
              label: "Node Upgrades",
              id: "validator/node-upgrade",
            },
            {
              type: "doc",
              label: "Running Proxies",
              id: "validator/proxy",
            },
            {
              type: "doc",
              label: "Validator Explorer",
              id: "validator/validator-explorer",
            },
            {
              type: "doc",
              label: "Voting Policy",
              id: "validator/celo-foundation-voting-policy",
            },
            {
              type: "doc",
              label: "Celo Signal",
              id: "validator/celo-signal",
            },
            {
              type: "doc",
              label: "Validator FAQ",
              id: "validator/troubleshooting-faq",
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
    // {
    //   type: "doc",
    //   label: "Web2 to Web3",
    //   id: "general/web2-to-web3",
    // },
    // {
    //   type: "doc",
    //   label: "Whitepapers",
    //   id: "general/whitepapers",
    // },
    // { type: "doc", label: "Glossary", id: "general/glossary" },
    // { type: "doc", label: "Gallery", id: "general/gallery" },
    // { type: "doc", label: "FAQs", id: "general/faqs" },
  ],

  // ######################################
  // Build on Celo
  // ######################################
  buildSidebar: [
    { type: "doc", label: "Overview", id: "build/index" },
    {
      type: "doc",
      label: "Quickstart with Celo Composer",
      id: "build/quickstart",
    },
    {
      type: "category",
      label: "Build with Thirdweb",
      items: [
        {
          type: "doc",
          label: "Overview",
          id: "build/build-with-thirdweb/overview",
        },
        {
          type: "doc",
          label: "One-click Quickstart",
          id: "build/build-with-thirdweb/one-click quickstart",
        },
        {
          type: "doc",
          label: "Celo NFT Drop Tutorial",
          id: "build/build-with-thirdweb/celo-nft-drop-tutorial",
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
          id: "developer/build-on-minipay/overview",
        },
        {
          type: "doc",
          label: "Getting Started",
          id: "developer/build-on-minipay/quickstart",
        },
        {
          type: "category",
          label: "Prerequisites",
          items: [
            {
              type: "doc",
              label: "Ngrok Setup",
              id: "developer/build-on-minipay/prerequisites/ngrok-setup",
            },
          ],
        },
        {
          type: "doc",
          label: "Code Library",
          id: "developer/build-on-minipay/code-library",
        },
        {
          type: "doc",
          label: "MiniPay Deeplinks",
          id: "developer/build-on-minipay/deeplinks",
        },
      ],
    },
    {
      type: "doc",
      label: "Build with Self",
      id: "build/build-with-self",
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
  ],

  // ######################################
  // Developers
  // ######################################

  developersSidebar: [
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
          type: "doc",
          label: "Forno",
          id: "network/node/forno",
        },
        {
          type: "category",
          label: "Run a Node",
          items: [
            {
              type: "doc",
              label: "Mainnet Full Node",
              id: "network/node/run-mainnet",
            },
            {
              type: "doc",
              label: "Alfajores Full Node",
              id: "network/node/run-alfajores",
            },
            {
              type: "doc",
              label: "Baklava Full Node",
              id: "network/node/run-baklava",
            },
            {
              type: "doc",
              label: "Hosted Nodes",
              id: "network/node/run-hosted",
            },
          ],
        },
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
      label: "Bridges",
      id: "protocol/bridges",
    },
    {
      type: "doc",
      label: "Cross Chain Messaging",
      id: "protocol/cross-chain-messaging",
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
        { type: "doc", label: "Overview", id: "developer/indexer/overview" },
        { type: "doc", label: "The Graph", id: "developer/indexer/the-graph" },
        { type: "doc", label: "SubQuery", id: "developer/indexer/subquery" },
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
          type: "doc",
          label: "Using thirdweb",
          id: "developer/deploy/thirdweb",
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
            { type: "doc", label: "Overview", id: "cli/index" },
            { type: "doc", label: "Account", id: "cli/account" },
            { type: "doc", label: "Commands", id: "cli/commands" },
            { type: "doc", label: "Config", id: "cli/config" },
            { type: "doc", label: "DKG", id: "cli/dkg" },
            { type: "doc", label: "Election", id: "cli/election" },
            { type: "doc", label: "Exchange", id: "cli/exchange" },
            {
              type: "doc",
              label: "Governance",
              id: "cli/governance",
            },
            { type: "doc", label: "Help", id: "cli/help" },
            { type: "doc", label: "Identity", id: "cli/identity" },
            {
              type: "doc",
              label: "LockedGold",
              id: "cli/lockedgold",
            },
            { type: "doc", label: "Release CELO", id: "cli/releasecelo" },
            { type: "doc", label: "Multisig", id: "cli/multisig" },
            { type: "doc", label: "Network", id: "cli/network" },
            { type: "doc", label: "Node", id: "cli/node" },
            { type: "doc", label: "Oracle", id: "cli/oracle" },
            { type: "doc", label: "Plugins", id: "cli/plugins" },
            { type: "doc", label: "Rewards", id: "cli/rewards" },
            { type: "doc", label: "Transfer", id: "cli/transfer" },
            { type: "doc", label: "Validator", id: "cli/validator" },
            { type: "doc", label: "Utilities", id: "cli/utils" },
            {
              type: "doc",
              label: "ValidatorGroup",
              id: "cli/validatorgroup",
            },
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
          label: "rainbowkit-celo (deprectated)",
          id: "developer/rainbowkit-celo/index",
        },
        {
          type: "doc",
          label: "Web3.js",
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
      label: "Bridges",
      id: "protocol/bridges",
    },
    {
      type: "doc",
      label: "Cross Chain Messaging",
      id: "protocol/cross-chain-messaging",
    },
    {
      type: "category",
      label: "Oracles",
      items: [
        { type: "doc", label: "Running Oracles", id: "protocol/oracle/run" },
        { type: "doc", label: "Overview", id: "protocol/oracle/index" },
        {
          type: "doc",
          label: "Using Band Protocol",
          id: "protocol/oracle/band-protocol",
        },
        {
          type: "doc",
          label: "Using Chainlink Oracles",
          id: "protocol/oracle/chainlink-oracles",
        },
        {
          type: "doc",
          label: "Using RedStone",
          id: "protocol/oracle/redstone",
        },
        { type: "doc", label: "Using Supra", id: "protocol/oracle/supra" },
      ],
    },
    {
      type: "doc",
      label: "Fee Abstraction",
      id: "developer/fee-currency",
    },
    {
      type: "category",
      label: "Indexers",
      items: [
        { type: "doc", label: "Overview", id: "developer/indexer/overview" },
        { type: "doc", label: "The Graph", id: "developer/indexer/the-graph" },
        { type: "doc", label: "SubQuery", id: "developer/indexer/subquery" },
      ],
    },
    {
      type: "doc",
      label: "EVM Tools",
      id: "developer/evm-tools",
    },
  ],

  // ######################################
  // Integrations
  // ######################################

  // integrationsSidebar: [
  //   { type: "doc", label: "Overview", id: "integration/index" },
  //   { type: "doc", label: "General", id: "integration/general" },
  //   {
  //     type: "doc",
  //     label: "Checklist",
  //     id: "integration/checklist",
  //   },
  //   { type: "doc", label: "Custody", id: "integration/custody" },
  //   { type: "doc", label: "Listings", id: "integration/listings" },
  //   {
  //     type: "doc",
  //     label: "Cloud HSM",
  //     id: "integration/cloud-hsm",
  //   },
  // ],

  //// ######################################
  //// Validators
  //// ######################################

  //validatorsSidebar: [
  //{ type: "doc", label: "Overview", id: "validator/index" },
  //{
  //type: "category",
  //label: "Run a Validator",
  //items: [
  //{
  //type: "doc",
  //label: "Mainnet Validator",
  //id: "validator/run/mainnet",
  //},
  //{
  //type: "doc",
  //label: "Baklava Validator",
  //id: "validator/run/baklava",
  //},
  //],
  //},
  //// {
  ////   type: "doc",
  ////   label: "Attestation Service",
  ////   id: "validator/attestation",
  //// },
  //{
  //type: "category",
  //label: "Key Management",
  //items: [
  //{
  //type: "doc",
  //label: "Summary",
  //id: "validator/key-management/summary",
  //},
  //{
  //type: "doc",
  //label: "Key Management",
  //id: "validator/key-management/detailed",
  //},
  //{
  //type: "doc",
  //label: "Key Rotation",
  //id: "validator/key-management/key-rotation",
  //},
  //],
  //},
  //{
  //type: "doc",
  //label: "Nodes and Services",
  //id: "validator/security",
  //},
  //{
  //type: "doc",
  //label: "Monitoring",
  //id: "validator/monitoring",
  //},
  //{
  //type: "doc",
  //label: "DevOps Best Practices",
  //id: "validator/devops-best-practices",
  //},
  //{
  //type: "doc",
  //label: "Node Upgrades",
  //id: "validator/node-upgrade",
  //},
  //{
  //type: "doc",
  //label: "Running Proxies",
  //id: "validator/proxy",
  //},
  //{
  //type: "doc",
  //label: "Validator Explorer",
  //id: "validator/validator-explorer",
  //},
  //{
  //type: "doc",
  //label: "Voting Policy",
  //id: "validator/celo-foundation-voting-policy",
  //},
  //{
  //type: "doc",
  //label: "Celo Signal",
  //id: "validator/celo-signal",
  //},
  //{
  //type: "doc",
  //label: "Validator FAQ",
  //id: "validator/troubleshooting-faq",
  //},
  //],

  // ######################################
  // Community
  // ######################################

  communitySidebar: [
    {
      type: "doc",
      label: "Contributors",
      id: "community/guidelines",
    },
    {
      type: "doc",
      label: "Fundraising",
      id: "community/fundraising",
    },
    {
      type: "doc",
      label: "Grant Playbook",
      id: "community/grant-playbook",
    },
    {
      type: "link",
      label: "Code of Conduct",
      href: "https://github.com/celo-org/website/blob/master/src/content/code-of-conduct.md",
    },
  ],

  //// ######################################
  //// Protocol
  //// ######################################

  //protocolSidebar: [
  //{ type: "doc", label: "Overview", id: "protocol/index" },
  //{
  //type: "category",
  //label: "Proof-of-Stake",
  //items: [
  //{
  //type: "doc",
  //label: "Overview",
  //id: "protocol/pos/index",
  //},
  //{
  //type: "doc",
  //label: "Validator Groups",
  //id: "protocol/pos/validator-groups",
  //},
  //{
  //type: "doc",
  //label: "Locked CELO",
  //id: "protocol/pos/locked-gold",
  //},
  //{
  //type: "doc",
  //label: "Validator Elections",
  //id: "protocol/pos/validator-elections",
  //},
  //{
  //type: "category",
  //label: "Epoch Rewards",
  //items: [
  //{
  //type: "doc",
  //label: "Overview",
  //id: "protocol/pos/epoch-rewards",
  //},
  //{
  //type: "doc",
  //label: "Validator Rewards",
  //id: "protocol/pos/epoch-rewards-validator",
  //},
  //{
  //type: "doc",
  //label: "Locked CELO Rewards",
  //id: "protocol/pos/epoch-rewards-locked-gold",
  //},
  //{
  //type: "doc",
  //label: "Community Fund",
  //id: "protocol/pos/epoch-rewards-community-fund",
  //},
  //{
  //type: "doc",
  //label: "Carbon Offsetting Fund",
  //id: "protocol/pos/epoch-rewards-carbon-offsetting-fund",
  //},
  //],
  //},
  //{
  //type: "doc",
  //label: "Penalties",
  //id: "protocol/pos/penalties",
  //},
  //],
  //},
  //{
  //type: "category",
  //label: "Consensus",
  //items: [
  //{
  //type: "doc",
  //label: "Overview",
  //id: "protocol/consensus/index",
  //},
  //{
  //type: "doc",
  //label: "Validator Set Differences",
  //id: "protocol/consensus/validator-set-differences",
  //},
  //{
  //type: "doc",
  //label: "Locating Nodes",
  //id: "protocol/consensus/locating-nodes",
  //},
  //],
  //},
  //{
  //type: "category",
  //label: "Governance",
  //items: [
  //{
  //type: "doc",
  //label: "Overview",
  //id: "protocol/governance/index",
  //},
  //{
  //type: "doc",
  //label: "Create Proposal",
  //id: "protocol/governance/create-proposal",
  //},
  //],
  //},
  //{
  //type: "category",
  //label: "Transactions",
  //items: [
  //{
  //type: "doc",
  //label: "Overview",
  //id: "protocol/transaction/index",
  //},
  //"protocol/transaction/native-currency",
  //"protocol/transaction/erc20-transaction-fees",
  //"protocol/transaction/gas-pricing",
  //"protocol/transaction/escrow",
  //"protocol/transaction/tx-comment-encryption",
  //"protocol/transaction/transaction-types",
  //],
  //},
  //{
  //type: "category",
  //label: "Stability",
  //items: [
  //{
  //type: "doc",
  //label: "Overview",
  //id: "protocol/stability/index",
  //},
  //"protocol/stability/doto",
  //"protocol/stability/granda-mento",
  //"protocol/stability/oracles",
  //"protocol/stability/stability-fees",
  //"protocol/stability/adding-stable-assets",
  //],
  //},
  //{
  //type: "category",
  //label: "Identity",
  //items: [
  //{
  //type: "doc",
  //label: "Overview",
  //id: "protocol/identity/index",
  //},
  //{
  //type: "link",
  //label: "Social Connect",
  //href: "https://github.com/celo-org/Social-Connect",
  //},
  //"protocol/identity/metadata",
  //"protocol/identity/smart-contract-accounts",
  //"protocol/identity/encrypted-cloud-backup",
  //{
  //type: "doc",
  //label: "Privacy Research",
  //id: "protocol/identity/privacy-research",
  //},
  //{
  //type: "category",
  //label: "ODIS",
  //items: [
  //{
  //type: "doc",
  //label: "Overview",
  //id: "protocol/identity/odis",
  //},
  //{
  //type: "category",
  //label: "Use Cases",
  //items: [
  //"protocol/identity/odis-use-case-phone-number-privacy",
  //"protocol/identity/odis-use-case-key-hardening",
  //],
  //},
  //{
  //type: "category",
  //label: "Domains",
  //items: [
  //{
  //type: "doc",
  //label: "Overview",
  //id: "protocol/identity/odis-domain",
  //},
  //{
  //type: "doc",
  //label: "Sequential Delay Domain",
  //id: "protocol/identity/odis-domain-sequential-delay-domain",
  //},
  //],
  //},
  //],
  //},
  //],
  //},
  //{
  //type: "doc",
  //label: "Celo Randomness",
  //id: "protocol/randomness",
  //},
  //{
  //type: "category",
  //label: "Contracts",
  //items: [
  //{
  //type: "doc",
  //label: "Add A Contract",
  //id: "protocol/contracts/add-contract",
  //},
  //],
  //},
  //{
  //type: "category",
  //label: " Release Process",
  //items: [
  //{
  //type: "doc",
  //label: "Overview",
  //id: "community/release-process/index",
  //},
  //{
  //type: "doc",
  //label: "Smart Contracts",
  //id: "community/release-process/smart-contracts",
  //},
  //{
  //type: "doc",
  //label: "Blockchain Client",
  //id: "community/release-process/blockchain-client",
  //},
  //{
  //type: "doc",
  //label: "CeloCLI and ContractKit",
  //id: "community/release-process/base-cli-contractkit-dappkit-utils",
  //},
  //{
  //type: "doc",
  //label: "Attestation Service",
  //id: "community/release-process/attestation-service",
  //},
  //{
  //type: "doc",
  //label: "Celo Oracles",
  //id: "community/release-process/celo-oracles",
  //},
  //],
  //},
  //],

  // ######################################
  // CLI
  // ######################################
  //cli: [
  //{
  //type: "doc",
  //label: "Introduction",
  //id: "cli/index",
  //},
  //{ type: "doc", label: "Account", id: "cli/account" },
  //{ type: "doc", label: "Commands", id: "cli/commands" },
  //{ type: "doc", label: "Config", id: "cli/config" },
  //{ type: "doc", label: "DKG", id: "cli/dkg" },
  //{ type: "doc", label: "Election", id: "cli/election" },
  //{ type: "doc", label: "Exchange", id: "cli/exchange" },
  //{
  //type: "doc",
  //label: "Governance",
  //id: "cli/governance",
  //},
  //{ type: "doc", label: "Help", id: "cli/help" },
  //{ type: "doc", label: "Identity", id: "cli/identity" },
  //{
  //type: "doc",
  //label: "LockedGold",
  //id: "cli/lockedgold",
  //},
  //{ type: "doc", label: "Release CELO", id: "cli/releasecelo" },
  //{ type: "doc", label: "Multisig", id: "cli/multisig" },
  //{ type: "doc", label: "Network", id: "cli/network" },
  //{ type: "doc", label: "Node", id: "cli/node" },
  //{ type: "doc", label: "Oracle", id: "cli/oracle" },
  //{ type: "doc", label: "Plugins", id: "cli/plugins" },
  ////{ type: "doc", label: "Reserve", id: "cli/reserve" },
  //{ type: "doc", label: "Rewards", id: "cli/rewards" },
  //{ type: "doc", label: "Transfer", id: "cli/transfer" },
  //{ type: "doc", label: "Validator", id: "cli/validator" },
  //{ type: "doc", label: "Utilities", id: "cli/utils" },
  //{
  //type: "doc",
  //label: "ValidatorGroup",
  //id: "cli/validatorgroup",
  //},
  //],

  cel2: [
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
          type: "category",
          label: "Celo L2 Migration",
          link: {
            type: "doc",
            id: "cel2/notices/l2-migration",
          },
          collapsed: false,
          items: [
            {
              type: "doc",
              label: "Day 1 Partners",
              id: "cel2/notices/day-1-partners",
            },
          ],
        },
        {
          type: "doc",
          label: "Pectra Upgrade",
          id: "cel2/notices/pectra-upgrade",
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
      label: "Validators",
      collapsed: false,
      items: [
        {
          type: "doc",
          label: "Running a Community RPC Node",
          id: "cel2/operators/community-rpc-node",
        },
        {
          type: "doc",
          label: "Community RPC Provider FAQ",
          id: "cel2/operators/validator-rpc-faq",
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
  ],
};
module.exports = sidebars;
