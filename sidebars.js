const sidebars = {
  docs: [
    // General
    {
      type: "category",
      label: "General",
      items: [
        { type: "doc", label: "Overview", id: "general/index" },
        {
          type: "doc",
          label: "Architecture",
          id: "general/architecture",
        },
        {
          type: "doc",
          label: "Web2 to Web3",
          id: "general/web2-to-web3",
        },
        {
          type: "doc",
          label: "Whitepapers",
          id: "general/whitepapers",
        },
        { type: "doc", label: "Glossary", id: "general/glossary" },
        { type: "doc", label: "Gallery", id: "general/gallery" },
        // { type: "doc", label: "FAQs", id: "general/faqs" },
      ],
    },
    // Wallets
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
          type: "link",
          label: "Valora",
          href: "/blog/tutorials/3-simple-steps-to-get-started-with-valora-on-celo",
        },
        {
          type: "category",
          label: "MetaMask",
          items: [
            {
              type: "link",
              label: "MetaMask Setup",
              href: "/blog/tutorials/3-simple-steps-to-connect-your-metamask-wallet-to-celo",
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
          label: "Celo Wallet",
          items: [
            {
              type: "link",
              label: "Celo Wallet Setup",
              href: "https://celowallet.app/",
            },
            {
              type: "doc",
              label: "Functionality",
              id: "wallet/celo-wallet/functionality",
            },
            {
              type: "doc",
              label: "Verification",
              id: "wallet/celo-wallet/verification",
            },
            {
              type: "doc",
              label: "Invitation",
              id: "wallet/celo-wallet/invitation",
            },
            {
              type: "doc",
              label: "Payment",
              id: "wallet/celo-wallet/payment",
            },
            {
              type: "doc",
              label: "Node Sync",
              id: "wallet/celo-wallet/node-sync",
            },
          ],
        },
        {
          type: "category",
          label: "Mobile Wallet",
          items: [
            {
              type: "doc",
              label: "Mobile Wallet Setup",
              id: "wallet/mobile-wallet/setup",
            },
            {
              type: "doc",
              label: "Running the Wallet Locally",
              id: "wallet/mobile-wallet/run-local",
            },
            {
              type: "doc",
              label: "Testnet Faucet",
              id: "wallet/faucet-testnet",
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
          type: "doc",
          label: "Coinbase Wallet",
          id: "wallet/coinbase-wallet",
        },
        {
          type: "link",
          label: "Staking",
          href: "https://medium.com/stake-service/hey-guys-today-well-take-a-look-at-how-you-can-use-the-cello-wallet-to-stake-your-own-cello-92730ac24aa5",
        },
      ],
    },
    // Networks
    {
      type: "category",
      label: "Networks",
      items: [
        { type: "doc", label: "Overview", id: "network/index" },
        // Nodes
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
          label: "Explorers",
          items: [
            {
              type: "link",
              label: "Network Stats",
              href: "https://explorer.celo.org/stats",
            },
            {
              type: "link",
              label: "Blockscout",
              href: "https://explorer.celo.org/",
            },
            {
              type: "link",
              label: "Celoscan",
              href: "https://celoscan.xyz/",
            },
          ],
        },
        {
          type: "category",
          label: "Disclaimers",
          items: [
            {
              type: "doc",
              label: "Mainnet",
              id: "network/mainnet/disclaimer",
            },
            {
              type: "doc",
              label: "Alfajores Testnet",
              id: "network/alfajores/disclaimer",
            },
            {
              type: "doc",
              label: "Baklava Testnet",
              id: "network/baklava/disclaimer",
            },
          ],
        },
      ],
    },
    // Developers
    {
      type: "category",
      label: "Developers",
      items: [
        { type: "doc", label: "Overview", id: "developer/index" },
        {
          type: "category",
          label: "Setup",
          items: [
            {
              type: "doc",
              label: "Overview",
              id: "developer/setup/overview",
            },
            {
              type: "doc",
              label: "Using Mac",
              id: "developer/setup/mac",
            },
            {
              type: "doc",
              label: "Using Windows",
              id: "developer/setup/windows",
            },
            {
              type: "doc",
              label: "Using Replit",
              id: "developer/setup/replit",
            },
            {
              type: "doc",
              label: "Testnet Wallet",
              id: "developer/setup/wallet",
            },
            {
              type: "doc",
              label: "Local Chain",
              id: "developer/setup/development-chain",
            },
          ],
        },
        {
          type: "category",
          label: "Build",
          items: [
            {
              type: "doc",
              label: "Overview",
              id: "developer/deploy/index",
            },
            {
              type: "doc",
              label: "Using Remix",
              id: "developer/deploy/remix",
            },
            {
              type: "doc",
              label: "Using Truffle",
              id: "developer/deploy/truffle",
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
                  label: "Interact with Contracts",
                  id: "developer/walkthrough/hello-contract-remote-node",
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
              label: "react-celo",
              id: "developer/react-celo/index",
            },
            {
              type: "doc",
              label: "rainbowkit-celo",
              id: "developer/rainbowkit-celo/index",
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
              label: "Using Celo Explorer",
              id: "developer/verify/celo-explorer",
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
          label: "Migrate to Celo",
          items: [
            {
              type: "doc",
              label: "Ethereum Developers",
              id: "developer/migrate/from-ethereum",
            },
          ],
        },
        {
          type: "category",
          label: "Code Examples",
          items: [
            {
              type: "link",
              label: "Celo Composer",
              href: "https://github.com/celo-org/celo-composer#celo-composer",
            },
            {
              type: "link",
              label: "Developer Blog",
              href: "https://medium.com/celodevelopers",
            },
            // {
            //   type: "doc",
            //   label: "Code Tutorials",
            //   id: "/blog",
            // },
            {
              type: "link",
              label: "Celo Blog",
              href: "https://medium.com/celoorg",
            },
            {
              type: "link",
              label: "Figment",
              href: "https://learn.figment.io/protocols/celo",
            },
            {
              type: "link",
              label: "Dacade",
              href: "https://dacade.org/communities/celo",
            },
          ],
        },
        {
          type: "doc",
          label: "EVM Tools",
          id: "developer/evm-tools",
        },
        {
          type: "link",
          label: "Explorer",
          href: "https://explorer.celo.org/",
        },
        {
          type: "link",
          label: "Faucet",
          href: "https://faucet.celo.org",
        },
      ],
    },
    // Integrations
    {
      type: "category",
      label: "Integrations",
      items: [
        { type: "doc", label: "Overview", id: "integration/index" },
        { type: "doc", label: "Dapps", id: "integration/dapps" },
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
    // Validators
    {
      type: "category",
      label: "Validators",
      items: [
        { type: "doc", label: "Overview", id: "validator/index" },
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
        {
          type: "doc",
          label: "Attestation Service",
          id: "validator/attestation",
        },
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
      ],
    },
    // Holders
    {
      type: "category",
      label: "Holders",
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
    // Protocol
    {
      type: "category",
      label: "Protocol",
      items: [
        { type: "doc", label: "Overview", id: "protocol/index" },
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
            {
              type: "doc",
              label: "Ultralight Sync",
              id: "protocol/consensus/ultralight-sync",
            },
          ],
        },
        {
          type: "doc",
          label: "Governance",
          id: "protocol/governance",
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
            "protocol/transaction/full-node-incentives",
          ],
        },
        {
          type: "category",
          label: "Stability",
          items: [
            {
              type: "doc",
              label: "Overview",
              id: "protocol/stability/index",
            },
            "protocol/stability/doto",
            "protocol/stability/granda-mento",
            "protocol/stability/oracles",
            "protocol/stability/stability-fees",
            "protocol/stability/adding-stable-assets",
            "protocol/stability/tobin-tax",
          ],
        },
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
              href: "https://github.com/celo-org/identity",
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
          type: "doc",
          label: "Ultralight Client",
          id: "protocol/plumo",
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
    // Bridges
    {
      type: "category",
      label: "Bridges",
      items: [
        { type: "doc", label: "Overview", id: "protocol/bridge/index" },
        {
          type: "category",
          label: "Etherscan",
          items: [
            {
              type: "doc",
              label: "Native Assets with Etherscan",
              id: "protocol/bridge/etherscan-native-asset",
            },
            {
              type: "doc",
              label: "Tokens with Etherscan",
              id: "protocol/bridge/etherscan-token",
            },
          ],
        },
        {
          type: "category",
          label: "Optics",
          items: [
            {
              type: "doc",
              label: "Overview",
              id: "protocol/bridge/optics",
            },
            {
              type: "doc",
              label: "Optics Bridge GUI",
              id: "protocol/bridge/optics-gui",
            },
            {
              type: "doc",
              label: "Add New Token",
              id: "protocol/bridge/optics-add-new-token",
            },
            {
              type: "doc",
              label: "Migrating to Optics v2",
              id: "protocol/bridge/optics-migration-v2",
            },
            {
              type: "doc",
              label: "Optics Bridge FAQ",
              id: "protocol/bridge/optics-faq",
            },
          ],
        },
        {
          type: "link",
          label: "AllBridge",
          href: "https://app.allbridge.io/bridge?from=ETH&to=POL&asset=USDC",
        },
        {
          type: "link",
          label: "Moss",
          href: "https://bridge.moss.earth/",
        },
      ],
    },
    // Oracles
    {
      type: "category",
      label: "Oracles",
      items: [
        { type: "doc", label: "Overview", id: "protocol/oracle/index" },
        { type: "doc", id: "protocol/oracle/band-protocol" },
        { type: "doc", id: "protocol/oracle/redstone" },
        { type: "doc", id: "protocol/oracle/run" },
      ],
    },
    // Addresses
    {
      type: "category",
      label: "Addresses",
      items: [
        { type: "doc", label: "Contracts", id: "contract-addresses" },
        { type: "doc", label: "Tokens", id: "token-addresses" },
      ],
    },
    // Community
    {
      type: "category",
      label: "Community",
      items: [
        {
          type: "doc",
          label: "Contributors",
          id: "community/guidelines",
        },
        {
          type: "category",
          label: "Celo Sage",
          items: [
            {
              type: "doc",
              label: "Celo Sage Program",
              id: "community/celo-sage/celo-sage",
            },
            {
              type: "doc",
              label: "Submit an Application",
              id: "community/celo-sage/submit-application",
            },
            {
              type: "doc",
              label: "Complete your Tutorial",
              id: "community/celo-sage/complete-your-tutorial",
            },
            {
              type: "doc",
              label: "Contribution Guidelines",
              id: "community/celo-sage/contribution-guidelines",
            },
            {
              type: "doc",
              label: "Tutorial Structure",
              id: "community/celo-sage/tutorial-structure",
            },
            {
              type: "doc",
              label: "FAQs",
              id: "community/celo-sage/faq",
            },
          ],
        },
        {
          type: "doc",
          label: "StackShift",
          id: "community/StackShift/StackShift",
        },
        {
          type: "doc",
          label: "Fundraising",
          id: "community/fundraising",
        },
        {
          type: "link",
          label: "Bounties",
          href: "https://gitcoin.co/celo-org/projects",
        },
        {
          type: "doc",
          label: "Grant Playbook",
          id: "community/grant-playbook",
        },
        {
          type: "link",
          label: "Ambassadors",
          href: "https://celocommunity.xyz/join-the-ambassador-program",
        },
        {
          type: "link",
          label: "Code of Conduct",
          href: "https://github.com/celo-org/website/blob/master/src/content/code-of-conduct.md",
        },
      ],
    },
  ],

  // ######################################
  // CLI
  // ######################################

  cli: [
    {
      type: "doc",
      label: "Introduction",
      id: "cli/index",
    },
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
    {
      type: "doc",
      label: "Grandamento",
      id: "cli/grandamento",
    },
    { type: "doc", label: "Help", id: "cli/help" },
    { type: "doc", label: "Identity", id: "cli/identity" },
    {
      type: "doc",
      label: "LockedGold",
      id: "cli/lockedgold",
    },
    { type: "doc", label: "Multisig", id: "cli/multisig" },
    { type: "doc", label: "Network", id: "cli/network" },
    { type: "doc", label: "Node", id: "cli/node" },
    { type: "doc", label: "Oracle", id: "cli/oracle" },
    { type: "doc", label: "Plugins", id: "cli/plugins" },
    {
      type: "doc",
      label: "ReleaseGold",
      id: "cli/releasegold",
    },
    { type: "doc", label: "Reserve", id: "cli/reserve" },
    { type: "doc", label: "Rewards", id: "cli/rewards" },
    { type: "doc", label: "Transfer", id: "cli/transfer" },
    { type: "doc", label: "Validator", id: "cli/validator" },
    {
      type: "doc",
      label: "ValidatorGroup",
      id: "cli/validatorgroup",
    },
  ],
};
module.exports = sidebars;
