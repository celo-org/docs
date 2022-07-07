const sidebars = {
  docs: [
    { type: "doc", label: "Welcome to Celo", id: "welcome" },
    // Addresses
    {
      type: "category",
      label: " Overview",
      items: [
        { type: "doc", label: "What is Celo?", id: "learn/why-celo" },
        { type: "doc", label: "Architecture", id: "learn/celo-stack" },
        { type: "doc", label: "Whitepapers", id: "learn/celo-whitepapers" },
        { type: "doc", label: "Glossary", id: "getting-started/glossary" },
        {
          type: "doc",
          label: "Gallery",
          id: "developer-resources/celo-dapp-gallery",
        },
        { type: "doc", label: "FAQs", id: "faqs" },
      ],
    },
    // Wallets
    {
      type: "category",
      label: "Wallets",
      items: [
        {
          type: "link",
          label: "Valora",
          href:
            "https://medium.com/celodevelopers/4-simple-steps-to-get-started-with-valora-on-celo-58f92f801d89",
        },
        {
          type: "category",
          label: "MetaMask",
          items: [
            // {
            //   type: "doc",
            //   label: "MetaMask and Celo",
            //   id: "getting-started/wallets/using-metamask-with-celo/index",
            // },
            {
              type: "link",
              label: "MetaMask Setup",
              href:
                "https://medium.com/celodevelopers/3-simple-steps-to-connect-your-metamask-wallet-to-celo-732d4a139587",
            },
            {
              type: "doc",
              label: "Programmatic Setup",
              id:
                "getting-started/wallets/using-metamask-with-celo/programmatic-setup",
            },
            {
              type: "doc",
              label: "MetaMask and Valora",
              id:
                "getting-started/wallets/using-metamask-with-celo/metamask-valora-import",
            },
            {
              type: "doc",
              label: "MetaMask and Ledger",
              id:
                "getting-started/wallets/using-metamask-with-celo/using-a-ledger-with-metamask",
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
              id: "celo-codebase/wallet/how-the-wallet-works/README",
            },
            {
              type: "doc",
              label: "Verification",
              id: "celo-codebase/wallet/how-the-wallet-works/verification",
            },
            "celo-codebase/wallet/how-the-wallet-works/invitations",
            "celo-codebase/wallet/how-the-wallet-works/sending-and-requesting-payments",
            "celo-codebase/wallet/how-the-wallet-works/ultralight-node-sync",
          ],
        },
        {
          type: "category",
          label: "Mobile Wallet",
          items: [
            {
              type: "doc",
              label: "Mobile Wallet Setup",
              id: "getting-started/alfajores-testnet/using-the-mobile-wallet",
            },
            {
              type: "doc",
              label: "Running the Wallet Locally",
              id: "celo-codebase/wallet/intro",
            },
            {
              type: "doc",
              label: "Testnet Faucet",
              id: "getting-started/alfajores-testnet/faucet",
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
              id: "celo-holder-guide/ledger",
            },
            {
              type: "doc",
              label: "Connect to Celo Terminal",
              id: "celo-holder-guide/connecting-ledger-celo-terminal-wallet",
            },
            {
              type: "doc",
              label: "Connect to Celo Web Wallet",
              id: "celo-holder-guide/connecting-ledger-celo-web-wallet",
            },
            {
              type: "doc",
              label: "Connect to Celo CLI",
              id: "celo-holder-guide/connecting-ledger-celocli",
            },
          ],
        },
        {
          type: "doc",
          label: "Digital Wallets",
          id: "getting-started/wallets/index",
        },
        {
          type: "link",
          label: "Staking",
          href:
            "https://medium.com/stake-service/hey-guys-today-well-take-a-look-at-how-you-can-use-the-cello-wallet-to-stake-your-own-cello-92730ac24aa5",
        },
      ],
    },
    // Networks
    {
      type: "category",
      label: "Networks",
      items: [
        {
          type: "doc",
          label: "Overview",
          id: "getting-started/choosing-a-network",
        },
        // Nodes
        {
          type: "category",
          label: "Nodes",
          items: [
            {
              type: "doc",
              label: "Forno",
              id: "developer-resources/forno/index",
            },
            {
              type: "category",
              label: "Providers",
              items: [
                {
                  type: "link",
                  label: "Ankr",
                  href: "https://www.ankr.com/protocol/public/celo/",
                },
                {
                  type: "link",
                  label: "Tatum",
                  href: "https://pages.tatum.io/celo",
                },
                {
                  type: "link",
                  label: "Figment",
                  href: "https://www.figment.io/datahub/celo",
                },
                {
                  type: "link",
                  label: "Quicknode",
                  href: "https://www.quicknode.com/chains/celo",
                },
                {
                  type: "link",
                  label: "All that Node",
                  href: "https://www.allthatnode.com/celo.dsrv",
                },
              ],
            },
            // {
            //   type: "doc",
            //   label: "Wallet Connection",
            //   id: "developer-resources/walkthroughs/wallet-test",
            // },
            {
              type: "category",
              label: "Run a Node",
              items: [
                {
                  type: "doc",
                  label: "Mainnet Full Node",
                  id: "getting-started/mainnet/running-a-full-node-in-mainnet",
                },
                {
                  type: "doc",
                  label: "Alfajores Full Node",
                  id:
                    "getting-started/alfajores-testnet/running-a-full-node-in-alfajores",
                },
                {
                  type: "doc",
                  label: "Baklava Full Node",
                  id:
                    "getting-started/baklava-testnet/running-a-full-node-in-baklava",
                },
                {
                  type: "doc",
                  label: "Hosted Nodes",
                  id: "getting-started/hosted-nodes",
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
        // {
        //   type: "doc",
        //   label: "Celo Mainnet",
        //   id: "getting-started/mainnet/index",
        // },
        // {
        //   type: "doc",
        //   label: "Alfajores Testnet",
        //   id: "getting-started/alfajores-testnet/index",
        // },
        // {
        //   type: "doc",
        //   label: "Baklava Testnet",
        //   id: "getting-started/baklava-testnet/index",
        // },
        {
          type: "category",
          label: "Disclaimers",
          items: [
            {
              type: "doc",
              label: "Mainnet",
              id: "important-information/mainnet-network-disclaimer",
            },
            {
              type: "doc",
              label: "Alfajores Testnet",
              id: "important-information/alfajores-testnet-disclaimer",
            },
            {
              type: "doc",
              label: "Baklava Testnet",
              id: "important-information/baklava-testnet-disclaimer",
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
        { type: "doc", label: "Overview", id: "developer-resources/overview" },
        {
          type: "category",
          label: "Local Environment",
          items: [
            {
              type: "doc",
              label: "Using Mac",
              id: "developer-resources/using-mac",
            },
            {
              type: "doc",
              label: "Using Windows",
              id: "developer-resources/develop-on-windows",
            },
            {
              type: "doc",
              label: "Testnet Wallet",
              id: "developer-resources/testnet-wallet",
            },
          ],
        },
        {
          type: "category",
          label: "Deploy on Celo",
          items: [
            {
              type: "doc",
              label: "Overview",
              id: "developer-resources/deploy-dapp",
            },
            {
              type: "doc",
              label: "Using Remix",
              id: "developer-resources/deploy-remix",
            },
            {
              type: "doc",
              label: "Using Truffle",
              id: "developer-resources/deploy-truffle",
            },
            {
              type: "doc",
              label: "Using Hardhat",
              id: "developer-resources/deploy-hardhat",
            },
            {
              type: "doc",
              label: "Using Replit",
              id: "developer-resources/deploy-replit",
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
              id: "developer-resources/celo-for-eth-devs",
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
        // {
        //   type: "doc",
        //   label: "Wallet Connection",
        //   id: "developer-resources/walkthroughs/wallet-test",
        // },
        {
          type: "doc",
          label: "EVM Tools",
          id: "learn/evm-compatible-tooling",
        },
        {
          type: "link",
          label: "Explorer",
          href: "https://explorer.celo.org/",
        },
        {
          type: "link",
          label: "Faucet",
          href: "https://celo.org/developers/faucet",
        },
      ],
    },
    // Integrations
    {
      type: "category",
      label: "Integrations",
      items: [
        {
          type: "doc",
          label: "Overview",
          id: "developer-resources/integrations/integrations",
        },
        {
          type: "doc",
          label: "Dapps",
          id: "developer-resources/integrations/dapps",
        },
        {
          type: "doc",
          label: "General",
          id: "developer-resources/integrations/general",
        },
        {
          type: "doc",
          label: "Checklist",
          id: "developer-resources/integrations/checklist",
        },
        {
          type: "doc",
          label: "Custody",
          id: "developer-resources/integrations/custody",
        },
        {
          type: "doc",
          label: "Listings",
          id: "developer-resources/integrations/listings",
        },
        {
          type: "doc",
          label: "Cloud HSM",
          id: "developer-resources/integrations/cloud-hsm",
        },
      ],
    },
    // Validators
    {
      type: "category",
      label: "Validators",
      items: [
        { type: "doc", label: "Overview", id: "validator-guide/overview" },
        {
          type: "category",
          label: "Run a Validator",
          items: [
            {
              type: "doc",
              label: "Mainnet Validator",
              id: "getting-started/mainnet/running-a-validator-in-mainnet",
            },
            {
              type: "doc",
              label: "Baklava Validator",
              id:
                "getting-started/baklava-testnet/running-a-validator-in-baklava",
            },
          ],
        },
        {
          type: "doc",
          label: "Attestation Service",
          id: "validator-guide/attestation-service",
        },
        {
          type: "category",
          label: "Key Management",
          items: [
            {
              type: "doc",
              label: "Summary",
              id: "validator-guide/key-management/summary",
            },
            {
              type: "doc",
              label: "Key Management",
              id: "validator-guide/key-management/detailed",
            },
            {
              type: "doc",
              label: "Key Rotation",
              id: "validator-guide/key-management/key-rotation",
            },
          ],
        },
        {
          type: "doc",
          label: "Nodes and Services",
          id: "validator-guide/securing-nodes-and-services",
        },
        { type: "doc", label: "Monitoring", id: "validator-guide/monitoring" },
        {
          type: "doc",
          label: "DevOps Best Practices",
          id: "validator-guide/devops-best-practices",
        },
        {
          type: "doc",
          label: "Node Upgrades",
          id: "validator-guide/node-upgrades",
        },
        { type: "doc", label: "Running Proxies", id: "validator-guide/proxy" },
        {
          type: "doc",
          label: "Validator Explorer",
          id: "validator-guide/validator-explorer",
        },
        {
          type: "doc",
          label: "Voting Policy",
          id: "validator-guide/celo-foundation-voting-policy",
        },
        {
          type: "doc",
          label: "Celo Signal",
          id: "validator-guide/celo-signal",
        },
        {
          type: "doc",
          label: "Validator FAQ",
          id: "getting-started/validator-troubleshooting-faq",
        },
      ],
    },
    // Holders
    {
      type: "category",
      label: "Holders",
      items: [
        { type: "doc", label: "Overview", id: "celo-holder-guide/owners" },
        {
          type: "category",
          label: "Manage",
          items: [
            {
              type: "doc",
              label: "Self-Custody",
              id: "celo-holder-guide/quick-start",
            },
            {
              type: "doc",
              label: "Release Gold",
              id: "celo-holder-guide/release-gold",
            },
            {
              type: "doc",
              label: "Exchange Assets",
              id: "celo-holder-guide/celo-exchange-bot",
            },
            {
              type: "doc",
              label: "Asset Management",
              id: "celo-holder-guide/cusd",
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
              id: "celo-holder-guide/voting-validators",
            },
            {
              type: "doc",
              label: "Voting on Governance",
              id: "celo-holder-guide/voting-governance",
            },
            {
              type: "doc",
              label: "Governable Parameters",
              id: "celo-holder-guide/governance-cheat-sheet",
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
              id: "celo-holder-guide/eth-recovery",
            },
            {
              type: "doc",
              label: "Recover from Celo Address",
              id: "celo-holder-guide/celo-recovery",
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
        { type: "doc", label: "Overview", id: "celo-codebase/protocol/index" },
        {
          type: "category",
          label: "Proof-of-Stake",
          items: [
            {
              type: "doc",
              label: "Overview",
              id: "celo-codebase/protocol/proof-of-stake/index",
            },
            {
              type: "doc",
              label: "Validator Groups",
              id: "celo-codebase/protocol/proof-of-stake/validator-groups",
            },
            {
              type: "doc",
              label: "Locked CELO",
              id: "celo-codebase/protocol/proof-of-stake/locked-gold",
            },
            {
              type: "doc",
              label: "Validator Elections",
              id: "celo-codebase/protocol/proof-of-stake/validator-elections",
            },
            {
              type: "category",
              label: "Epoch Rewards",
              items: [
                {
                  type: "doc",
                  label: "Overview",
                  id: "celo-codebase/protocol/proof-of-stake/epoch-rewards",
                },
                {
                  type: "doc",
                  label: "Validator Rewards",
                  id: "celo-codebase/protocol/proof-of-stake/validator-rewards",
                },
                {
                  type: "doc",
                  label: "Locked CELO Rewards",
                  id:
                    "celo-codebase/protocol/proof-of-stake/locked-gold-rewards",
                },
                {
                  type: "doc",
                  label: "Community Fund",
                  id: "celo-codebase/protocol/proof-of-stake/community-fund",
                },
                {
                  type: "doc",
                  label: "Carbon Offsetting Fund",
                  id:
                    "celo-codebase/protocol/proof-of-stake/carbon-offsetting-fund",
                },
              ],
            },
            {
              type: "doc",
              label: "Penalties",
              id: "celo-codebase/protocol/proof-of-stake/penalties",
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
              id: "celo-codebase/protocol/consensus/index",
            },
            {
              type: "doc",
              label: "Validator Set Differences",
              id: "celo-codebase/protocol/consensus/validator-set-differences",
            },
            {
              type: "doc",
              label: "Locating Nodes",
              id: "celo-codebase/protocol/consensus/locating-nodes",
            },
            {
              type: "doc",
              label: "Ultralight Sync",
              id: "celo-codebase/protocol/consensus/ultralight-sync",
            },
          ],
        },
        {
          type: "doc",
          label: "Governance",
          id: "celo-codebase/protocol/governance",
        },
        {
          type: "category",
          label: "Transactions",
          items: [
            {
              type: "doc",
              label: "Overview",
              id: "celo-codebase/protocol/transactions/index",
            },
            "celo-codebase/protocol/transactions/native-currency",
            "celo-codebase/protocol/transactions/erc20-transaction-fees",
            "celo-codebase/protocol/transactions/gas-pricing",
            "celo-codebase/protocol/transactions/escrow",
            "celo-codebase/protocol/transactions/tx-comment-encryption",
            "celo-codebase/protocol/transactions/full-node-incentives",
          ],
        },
        {
          type: "category",
          label: "Stability",
          items: [
            {
              type: "doc",
              label: "Overview",
              id: "celo-codebase/protocol/stability/index",
            },
            "celo-codebase/protocol/stability/doto",
            "celo-codebase/protocol/stability/granda-mento",
            "celo-codebase/protocol/stability/oracles",
            "celo-codebase/protocol/stability/stability-fees",
            "celo-codebase/protocol/stability/adding_stable_assets",
            "celo-codebase/protocol/stability/tobin-tax",
          ],
        },
        {
          type: "category",
          label: "Identity",
          items: [
            {
              type: "doc",
              label: "Overview",
              id: "celo-codebase/protocol/identity/index",
            },
            "celo-codebase/protocol/identity/metadata",
            "celo-codebase/protocol/identity/randomness",
            "celo-codebase/protocol/identity/smart-contract-accounts",
            "celo-codebase/protocol/identity/encrypted-cloud-backup",
            {
              type: "category",
              label: "ODIS",
              items: [
                {
                  type: "doc",
                  label: "Overview",
                  id: "celo-codebase/protocol/odis/index",
                },
                {
                  type: "category",
                  label: "Use Cases",
                  items: [
                    "celo-codebase/protocol/odis/use-cases/phone-number-privacy",
                    "celo-codebase/protocol/odis/use-cases/key-hardening",
                  ],
                },
                {
                  type: "category",
                  label: "Domains",
                  items: [
                    {
                      type: "doc",
                      label: "Overview",
                      id: "celo-codebase/protocol/odis/domains/index",
                    },
                    "celo-codebase/protocol/odis/domains/sequential-delay-domain",
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "doc",
          label: "Ultralight Client",
          id: "celo-codebase/protocol/plumo",
        },
        {
          type: "category",
          label: " Release Process",
          items: [
            {
              type: "doc",
              label: "Overview",
              id: "community/release-process/README",
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
              id:
                "community/release-process/base-cli-contractkit-dappkit-utils",
            },
            {
              type: "doc",
              label: "Attestation Service",
              id: "community/release-process/attestation-service",
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
        {
          type: "doc",
          label: "Celo Bridges",
          id: "celo-codebase/protocol/bridging/bridging-to-celo",
        },
        {
          type: "category",
          label: "Etherscan",
          items: [
            {
              type: "doc",
              label: "Native Assets with Etherscan",
              id: "celo-codebase/protocol/bridging/bridging-native-assets",
            },
            {
              type: "doc",
              label: "Tokens with Etherscan",
              id:
                "celo-codebase/protocol/bridging/bridging-tokens-with-etherscan",
            },
          ],
        },
        {
          type: "category",
          label: "Optics",
          items: [
            {
              type: "doc",
              label: "Optics Bridge GUI",
              id: "celo-codebase/protocol/bridging/optics-gui",
            },
            {
              type: "doc",
              label: "Optics Bridge",
              id: "celo-codebase/protocol/optics",
            },
            {
              type: "doc",
              label: "Migrating to Optics v2",
              id: "celo-codebase/protocol/bridging/migrating-to-optics-v2",
            },
            {
              type: "doc",
              label: "Optics Bridge FAQ",
              id: "celo-codebase/protocol/bridging/optics-bridge-faq",
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
        {
          type: "doc",
          label: "Celo Oracles",
          id: "celo-codebase/protocol/oracles/oracles-on-celo",
        },
        {
          type: "doc",
          id: "celo-codebase/protocol/oracles/band-protocol-how-to",
        },
        {
          type: "doc",
          id: "celo-codebase/protocol/oracles/redstone-protocol-how-to",
        },
      ],
    },
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
        // { type: "doc", label: "Contributors", id: "community/contributing" },
        // {
        //   type: "doc",
        //   label: "Developer Events",
        //   id: "community/developer-events",
        // },
        // {
        //   type: "doc",
        //   label: "Code",
        //   id: "community/code-contributors",
        // },
        // {
        //   type: "doc",
        //   label: "Translations",
        //   id: "community/translation-contributors",
        // },
        // {
        //   type: "doc",
        //   label: "Docs",
        //   id: "community/documentation-contributors",
        // },
        // {
        //   type: "doc",
        //   label: "CIPs",
        //   id: "community/CIP-contributors",
        // },
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
          href:
            "https://github.com/celo-org/website/blob/master/src/content/code-of-conduct.md",
        },
        // {
        //   type: "category",
        //   label: "Resources",
        //   items: [
        //     {
        //       type: "category",
        //       label: "Quick Guides",
        //       items: [
        //         { type: "doc", label: "Celo", id: "learn/celo-summary" },
        //         {
        //           type: "doc",
        //           label: "Celo Protocol",
        //           id: "learn/celo-protocol-summary",
        //         },
        //         { type: "doc", label: "Valora", id: "learn/valora-summary" },
        //         { type: "doc", label: "CELO", id: "learn/CELO-coin-summary" },
        //         {
        //           type: "doc",
        //           label: "Celo Stablecoins",
        //           id: "learn/platform-native-stablecoins-summary",
        //         },
        //       ],
        //     },
        //     {
        //       type: "doc",
        //       label: "Celo Resources",
        //       id: "learn/celo-resources",
        //     },
        //   ],
        // },
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
      id: "command-line-interface/introduction",
    },
    { type: "doc", label: "Account", id: "command-line-interface/account" },
    { type: "doc", label: "Commands", id: "command-line-interface/commands" },
    { type: "doc", label: "Config", id: "command-line-interface/config" },
    { type: "doc", label: "DKG", id: "command-line-interface/dkg" },
    { type: "doc", label: "Election", id: "command-line-interface/election" },
    { type: "doc", label: "Exchange", id: "command-line-interface/exchange" },
    {
      type: "doc",
      label: "Governance",
      id: "command-line-interface/governance",
    },
    {
      type: "doc",
      label: "Grandamento",
      id: "command-line-interface/grandamento",
    },
    { type: "doc", label: "Help", id: "command-line-interface/help" },
    { type: "doc", label: "Identity", id: "command-line-interface/identity" },
    {
      type: "doc",
      label: "LockedGold",
      id: "command-line-interface/lockedgold",
    },
    { type: "doc", label: "Multisig", id: "command-line-interface/multisig" },
    { type: "doc", label: "Network", id: "command-line-interface/network" },
    { type: "doc", label: "Node", id: "command-line-interface/node" },
    { type: "doc", label: "Oracle", id: "command-line-interface/oracle" },
    { type: "doc", label: "Plugins", id: "command-line-interface/plugins" },
    {
      type: "doc",
      label: "ReleaseGold",
      id: "command-line-interface/releasegold",
    },
    { type: "doc", label: "Reserve", id: "command-line-interface/reserve" },
    { type: "doc", label: "Rewards", id: "command-line-interface/rewards" },
    { type: "doc", label: "Transfer", id: "command-line-interface/transfer" },
    { type: "doc", label: "Validator", id: "command-line-interface/validator" },
    {
      type: "doc",
      label: "ValidatorGroup",
      id: "command-line-interface/validatorgroup",
    },
  ],
};
module.exports = sidebars;
