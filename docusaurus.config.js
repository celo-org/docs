/** @type {import('@docusaurus/types').DocusaurusConfig} */
const path = require("path");
const math = require("remark-math");
const katex = require("rehype-katex");
const { docs, developers } = require("./sidebars");
const DefaultLocale = "en";

module.exports = {
  title: "Celo Documentation",
  tagline: "Documentation for the Celo platform.",
  url: "https://docs.celo.org",
  baseUrl: "/",
  trailingSlash: false,
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/color-favicon.png",
  organizationName: "celo-org", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.
   i18n: {
     defaultLocale: "en",
     locales: ["en"],
    //  locales: ["en", "es"],
   },
  themes: ["@docusaurus/theme-live-codeblock"],
  scripts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/web3/1.6.0/web3.min.js",
      async: true,
    },
  ],
  plugins: [
    require.resolve("docusaurus-plugin-hubspot"),
    require.resolve("docusaurus-plugin-fathom"),
    path.resolve(__dirname, "src/plugins/aliases.ts"),
    path.resolve(__dirname, "src/plugins/web3-polyfill.ts"),
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to:
              "/network/baklava/run-full-node",
            from: [
              "/getting-started/running-a-full-node",
              "/getting-started/running-a-validator",
              "/getting-started/running-a-full-node-in-baklava",
            ],
          },
          {
            to: "/holder/manage/release-gold",
            from: "/celo-codebase/protocol/release-gold",
          },
          {
            to: "/developer/",
            from: [
              "/developer-guide/overview/introduction",
              "/developer-resources/overview",
            ],
          },
          {
            to: "/developer/setup/development-chain",
            from: ["/developer-guide/start/development-chain"],
          },
          {
            to: "/network/mainnet/disclaimer",
            from: ["/important-information/rc-network-disclaimer"],
          },
          {
            to: "/network/mainnet/",
            from: ["/getting-started/rc1"],
          },
          {
            to: "/network/mainnet/run-full-node",
            from: [
              "/getting-started/rc1/running-a-full-node-in-rc1",
              "/getting-started/running-a-full-node-in-mainnet",
            ],
          },
          {
            to: "/network/mainnet/run-validator",
            from: [
              "/getting-started/rc1/running-a-validator-in-rc1",
              "/getting-started/running-a-validator-in-mainnet",
            ],
          },
          {
            to: "/holder/",
            from: [
              "/celo-gold-holder-guide/quick-start",
              "/celo-holder-guide/quick-start",
            ],
          },
          {
            to: "/holder/vote/governance",
            from: "/celo-gold-holder-guide/voting-governance"
          },
          {
            to: "/holder/vote/validator",
            from: "/celo-gold-holder-guide/voting-validators"
          },
          {
            to: "/holder/recover/from-eth-address",
            from: ["/celo-owner-guide/eth-recovery"],
          },
          {
            to: "/developer/",
            from: ["/v/master/developer-guide/overview"],
          },
          {
            to: "/developer/",
            from: ["/v/master/developer-guide/start"],
          },
          {
            to: "/cli/account",
            from: ["/cli/commands/account"],
          },
          {
            to: "/cli/autocomplete",
            from: ["/cli/commands/autocomplete"],
          },
          {
            to: "/cli/commands",
            from: ["/cli/commands/commands"],
          },
          {
            to: "/cli/config",
            from: ["/cli/commands/config"],
          },
          {
            to: "/cli/dkg",
            from: ["/cli/commands/dkg"],
          },
          {
            to: "/cli/election",
            from: ["/cli/commands/election"],
          },
          {
            to: "/cli/exchange",
            from: ["/cli/commands/exchange"],
          },
          {
            to: "/cli/governance",
            from: ["/cli/commands/governance"],
          },
          {
            to: "/cli/help",
            from: ["/cli/commands/help"],
          },
          {
            to: "/cli/identity",
            from: ["/cli/commands/identity"],
          },
          {
            to: "/cli/lockedgold",
            from: ["/cli/commands/lockedgold"],
          },
          {
            to: "/cli/multisig",
            from: ["/cli/commands/multisig"],
          },
          {
            to: "/cli/network",
            from: ["/cli/commands/network"],
          },
          {
            to: "/cli/node",
            from: ["/cli/commands/node"],
          },
          {
            to: "/cli/oracle",
            from: ["/cli/commands/oracle"],
          },
          {
            to: "/cli/plugins",
            from: ["/cli/commands/plugins"],
          },
          {
            to: "/cli",
            from: [
              "/cli/commands/registry",
              "/cli/registry",
            ],
          },
          {
            to: "/cli/releasegold",
            from: ["/cli/commands/releasegold"],
          },
          {
            to: "/cli/reserve",
            from: ["/cli/commands/reserve"],
          },
          {
            to: "/cli/rewards",
            from: ["/cli/commands/rewards"],
          },
          {
            to: "/cli/transfer",
            from: ["/cli/commands/transfer"],
          },
          {
            to: "/cli/validator",
            from: ["/cli/commands/validator"],
          },
          {
            to: "/cli/validatorgroup",
            from: ["/cli/commands/validatorgroup"],
          },
          {
            to: "/protocol/identity/odis-use-case-phone-number-privacy",
            from: ["/celo-codebase/protocol/identity/phone-number-privacy"],
          },
          {
            to: "/protocol/identity/smart-contract-accounts",
            from: ["/celo-codebase/protocol/identity/valora-accounts"],
          },
          // re-links between pre and post re-structure
          {
            to: "/wallet/mobile-wallet/run-local",
            from: "/celo-codebase/wallet/intro"
          },
          {
            to: "/wallet/celo-wallet/invitation",
            from: "/celo-codebase/wallet/how-the-wallet-works/invitations"
          },
          {
            to: "/wallet/celo-wallet/functionality",
            from: "/celo-codebase/wallet/how-the-wallet-works/README"
          },
          {
            to: "/wallet/celo-wallet/payment",
            from: "/celo-codebase/wallet/how-the-wallet-works/sending-and-requesting-payments"
          },
          {
            to: "/wallet/celo-wallet/node-sync",
            from: "/celo-codebase/wallet/how-the-wallet-works/ultralight-node-sync"
          },
          {
            to: "/wallet/celo-wallet/verification",
            from: "/celo-codebase/wallet/how-the-wallet-works/verification"
          },
          {
            to: "/protocol/plumo",
            from: "/celo-codebase/protocol/plumo"
          },
          {
            to: "/protocol/bridge/optics",
            from: "/celo-codebase/protocol/optics"
          },
          {
            to: "/protocol/",
            from: "/celo-codebase/protocol/index"
          },
          {
            to: "/protocol/governance",
            from: "/celo-codebase/protocol/governance"
          },
          {
            to: "/protocol/transaction/erc20-transaction-fees",
            from: "/celo-codebase/protocol/transactions/erc20-transaction-fees"
          },
          {
            to: "/protocol/transaction/escrow",
            from: "/celo-codebase/protocol/transactions/escrow"
          },
          {
            to: "/protocol/transaction/full-node-incentives",
            from: "/celo-codebase/protocol/transactions/full-node-incentives"
          },
          {
            to: "/protocol/transaction/gas-pricing",
            from: "/celo-codebase/protocol/transactions/gas-pricing"
          },
          {
            to: "/protocol/transaction/",
            from: "/celo-codebase/protocol/transactions/index"
          },
          {
            to: "/protocol/transaction/native-currency",
            from: "/celo-codebase/protocol/transactions/native-currency"
          },
          {
            to: "/protocol/transaction/tx-comment-encryption",
            from: "/celo-codebase/protocol/transactions/tx-comment-encryption"
          },
          {
            to: "/protocol/stability/adding-stable-assets",
            from: "/celo-codebase/protocol/stability/adding_stable_assets"
          },
          {
            to: "/protocol/stability/doto",
            from: "/celo-codebase/protocol/stability/doto"
          },
          {
            to: "/protocol/stability/granda-mento",
            from: "/celo-codebase/protocol/stability/granda-mento"
          },
          {
            to: "/protocol/stability/",
            from: "/celo-codebase/protocol/stability/index"
          },
          {
            to: "/protocol/stability/oracles",
            from: "/celo-codebase/protocol/stability/oracles"
          },
          {
            to: "/protocol/stability/stability-fees",
            from: "/celo-codebase/protocol/stability/stability-fees"
          },
          {
            to: "/protocol/stability/tobin-tax",
            from: "/celo-codebase/protocol/stability/tobin-tax"
          },
          {
            to: "/protocol/pos/becoming-a-validator",
            from: "/celo-codebase/protocol/proof-of-stake/becoming-a-validator"
          },
          {
            to: "/protocol/pos/epoch-rewards-carbon-offsetting-fund",
            from: ["/celo-codebase/protocol/proof-of-stake/carbon-offsetting-fund", "/celo-codebase/protocol/proof-of-stake/epoch-rewards/carbon-offsetting-fund"]
          },
          {
            to: "/protocol/pos/epoch-rewards-community-fund",
            from: "/celo-codebase/protocol/proof-of-stake/community-fund"
          },
          {
            to: "/protocol/pos/epoch-rewards",
            from: "/celo-codebase/protocol/proof-of-stake/epoch-rewards"
          },
          {
            to: "/protocol/pos/",
            from: "/celo-codebase/protocol/proof-of-stake/index"
          },
          {
            to: "/protocol/pos/epoch-rewards-locked-gold",
            from: "/celo-codebase/protocol/proof-of-stake/locked-gold-rewards"
          },
          {
            to: "/protocol/pos/locked-gold",
            from: "/celo-codebase/protocol/proof-of-stake/locked-gold"
          },
          {
            to: "/protocol/pos/penalties",
            from: "/celo-codebase/protocol/proof-of-stake/penalties"
          },
          {
            to: "/protocol/pos/validator-elections",
            from: "/celo-codebase/protocol/proof-of-stake/validator-elections"
          },
          {
            to: "/protocol/pos/validator-groups",
            from: "/celo-codebase/protocol/proof-of-stake/validator-groups"
          },
          {
            to: "/protocol/pos/epoch-rewards-validator",
            from: "/celo-codebase/protocol/proof-of-stake/validator-rewards"
          },
          {
            to: "/protocol/oracle/band-protocol",
            from: "/celo-codebase/protocol/oracles/band-protocol-how-to"
          },
          {
            to: "/protocol/oracle/",
            from: "/celo-codebase/protocol/oracles/oracles-on-celo"
          },
          {
            to: "/protocol/oracle/redstone",
            from: "/celo-codebase/protocol/oracles/redstone-protocol-how-to"
          },
          {
            to: "/protocol/identity/odis",
            from: "/celo-codebase/protocol/odis/index"
          },
          {
            to: "/protocol/identity/odis-use-case-key-hardening",
            from: "/celo-codebase/protocol/odis/use-cases/key-hardening"
          },
          {
            to: "/protocol/identity/odis-use-case-phone-number-privacy",
            from: "/celo-codebase/protocol/odis/use-cases/phone-number-privacy"
          },
          {
            to: "/protocol/identity/odis-domain",
            from: "/celo-codebase/protocol/odis/domains/index"
          },
          {
            to: "/protocol/identity/odis-domain-sequential-delay-domain",
            from: "/celo-codebase/protocol/odis/domains/sequential-delay-domain"
          },
          {
            to: "/protocol/identity/encrypted-cloud-backup",
            from: "/celo-codebase/protocol/identity/encrypted-cloud-backup"
          },
          {
            to: "/protocol/identity/",
            from: "/celo-codebase/protocol/identity/index"
          },
          {
            to: "/protocol/identity/metadata",
            from: "/celo-codebase/protocol/identity/metadata"
          },
          {
            to: "/protocol/identity/privacy-research",
            from: "/celo-codebase/protocol/identity/privacy-research"
          },
          {
            to: "/protocol/identity/randomness",
            from: "/celo-codebase/protocol/identity/randomness"
          },
          {
            to: "/protocol/identity/smart-contract-accounts",
            from: "/celo-codebase/protocol/identity/smart-contract-accounts"
          },
          {
            to: "/protocol/consensus/",
            from: "/celo-codebase/protocol/consensus/index"
          },
          {
            to: "/protocol/consensus/locating-nodes",
            from: "/celo-codebase/protocol/consensus/locating-nodes"
          },
          {
            to: "/protocol/consensus/ultralight-sync",
            from: "/celo-codebase/protocol/consensus/ultralight-sync"
          },
          {
            to: "/protocol/consensus/validator-set-differences",
            from: "/celo-codebase/protocol/consensus/validator-set-differences"
          },
          {
            to: "/protocol/bridge/etherscan-native-asset",
            from: "/celo-codebase/protocol/bridging/bridging-native-assets"
          },
          {
            to: "/protocol/bridge/",
            from: "/celo-codebase/protocol/bridging/bridging-to-celo"
          },
          {
            to: "/protocol/bridge/etherscan-token",
            from: "/celo-codebase/protocol/bridging/bridging-tokens-with-etherscan"
          },
          {
            to: "/protocol/bridge/optics-migration-v2",
            from: "/celo-codebase/protocol/bridging/migrating-to-optics-v2"
          },
          {
            to: "/protocol/bridge/optics-faq",
            from: "/celo-codebase/protocol/bridging/optics-bridge-faq"
          },
          {
            to: "/protocol/bridge/optics-gui-kr",
            from: "/celo-codebase/protocol/bridging/optics-gui-kr"
          },
          {
            to: "/protocol/bridge/optics-gui-zh-cn",
            from: "/celo-codebase/protocol/bridging/optics-gui-zh_cn"
          },
          {
            to: "/protocol/bridge/optics-gui",
            from: "/celo-codebase/protocol/bridging/optics-gui"
          },
          {
            to: "/holder/manage/exchange",
            from: ["/celo-holder-guide/celo-exchange-bot", "/celo-owner-guide/celo-exchange-bot"]
          },
          {
            to: "/holder/recover/from-celo-address",
            from: ["/celo-holder-guide/celo-recovery", "/celo-owner-guide/celo-recovery"]
          },
          {
            to: "/wallet/ledger/to-celo-terminal",
            from: "/celo-holder-guide/connecting-ledger-celo-terminal-wallet"
          },
          {
            to: "/wallet/ledger/to-celo-web",
            from: "/celo-holder-guide/connecting-ledger-celo-web-wallet"
          },
          {
            to: "/wallet/ledger/to-celo-cli",
            from: "/celo-holder-guide/connecting-ledger-celocli"
          },
          {
            to: "/holder/manage/asset",
            from: ["/celo-holder-guide/cusd", "/celo-owner-guide/cusd"]
          },
          {
            to: "/holder/recover/from-eth-address",
            from: "/celo-holder-guide/eth-recovery"
          },
          {
            to: "/holder/vote/governance-parameters",
            from: ["/celo-holder-guide/governance-cheat-sheet", "/celo-owner-guide/governance-cheat-sheet"]
          },
          {
            to: "/wallet/ledger/setup",
            from: ["/celo-holder-guide/ledger", "/celo-owner-guide/ledger"]
          },
          {
            to: "/holder/",
            from: "/celo-holder-guide/owners"
          },
          {
            to: "/holder/manage/release-gold",
            from: ["/celo-holder-guide/release-gold", "/celo-owner-guide/release-gold"]
          },
          {
            to: "/holder/vote/governance",
            from: ["/celo-holder-guide/voting-governance", "/celo-owner-guide/voting-governance"]
          },
          {
            to: "/holder/vote/validator",
            from: ["/celo-holder-guide/voting-validators", "/celo-owner-guide/voting-validators"]
          },
          {
            to: "/developer/setup/mac",
            from: "/developer-resources/using-mac"
          },
          {
            to: "/developer/setup/wallet",
            from: "/developer-resources/testnet-wallet"
          },
          {
            to: "/developer/",
            from: "/developer-guide/overview"
          },
          {
            to: "/developer/setup/windows",
            from: ["/developer-resources/develop-on-windows", "/developer-guide/start/develop-on-windows"]
          },
          {
            to: "/developer/deploy/truffle",
            from: "/developer-resources/deploy-truffle"
          },
          {
            to: "/developer/setup/replit",
            from: "/developer-resources/deploy-replit"
          },
          {
            to: "/developer/deploy/remix",
            from: "/developer-resources/deploy-remix"
          },
          {
            to: "/developer/deploy/hardhat",
            from: "/developer-resources/deploy-hardhat"
          },
          {
            to: "/developer/deploy/",
            from: "/developer-resources/deploy-dapp"
          },
          {
            to: "/developer/migrate/from-ethereum",
            from: ["/developer-resources/celo-for-eth-devs", "/developer-guide/celo-for-eth-devs"]
          },
          {
            to: "/general/gallery",
            from: ["/developer-resources/celo-dapp-gallery", "/developer-guide/celo-dapp-gallery"]
          },
          {
            to: "/developer/setup/development-chain",
            from: ["/developer-resources/walkthroughs/development-chain", "/developer-guide/development-chain"]
          },
          {
            to: "/developer/walkthrough/hello-contract-remote-node",
            from: ["/developer-resources/walkthroughs/hello-contract-remote-node", "/developer-guide/start/hello-contract-remote-node"]
          },
          {
            to: "/developer/walkthrough/hello-celo",
            from: ["/developer-resources/walkthroughs/hellocelo", "/developer-guide/start/hellocelo"]
          },
          {
            to: "/developer/walkthrough/hello-contracts",
            from: ["/developer-resources/walkthroughs/hellocontracts", "/developer-guide/start/hellocontracts"]
          },
          {
            to: "/developer/walkthrough/no-code-erc20",
            from: "/developer-resources/walkthroughs/no-code-erc20"
          },
          {
            to: "/developer/walkthrough/no-code-erc721",
            from: "/developer-resources/walkthroughs/no-code-erc721"
          },
          {
            to: "/network/alfajores/",
            from: "/developer-resources/networks/alfajores-testnet"
          },
          {
            to: "/network/baklava/",
            from: "/developer-resources/networks/baklava-testnet"
          },
          {
            to: "/network/mainnet/",
            from: "/developer-resources/networks/celo-mainnet"
          },
          {
            to: "/integration/checklist",
            from: ["/developer-resources/integrations/checklist", "/developer-guide/integrations/checklist"]
          },
          {
            to: "/integration/cloud-hsm",
            from: ["/developer-resources/integrations/cloud-hsm", "/developer-guide/integrations/cloud-hsm"]
          },
          {
            to: "/integration/custody",
            from: ["/developer-resources/integrations/custody", "/developer-guide/integrations/custody"]
          },
          {
            to: "/integration/dapps",
            from: ["/developer-resources/integrations/dapps", "/developer-guide/integrations/dapps"]
          },
          {
            to: "/integration/general",
            from: ["/developer-resources/integrations/general", "/developer-guide/integrations/general"]
          },
          {
            to: "/integration/",
            from: ["/developer-resources/integrations/integrations", "/developer-guide/integrations/integrations"]
          },
          {
            to: "/integration/listings",
            from: ["/developer-resources/integrations/listings", "/developer-guide/integrations/listings"]
          },
          {
            to: "/network/node/forno",
            from: ["/developer-resources/forno/index", "/developer-guide/forno"]
          },
          {
            to: "/developer/dappkit/",
            from: ["/developer-resources/dappkit/index", "/developer-guide/dappkit"]
          },
          {
            to: "/developer/dappkit/setup",
            from: ["/developer-resources/dappkit/setup", "/developer-guide/dappkit/setup"]
          },
          {
            to: "/developer/dappkit/usage",
            from: ["/developer-resources/dappkit/usage", "/developer-guide/dappkit/usage"]
          },
          {
            to: "/developer/contractkit/contracts-wrappers-registry",
            from: ["/developer-resources/contractkit/contracts-wrappers-registry", "/developer-guide/contractkit/contracts-wrappers-registry"]
          },
          {
            to: "/developer/contractkit/data-encryption-key",
            from: "/developer-resources/contractkit/data-encryption-key"
          },
          {
            to: "/developer/contractkit/",
            from: ["/developer-resources/contractkit/index", "/developer-guide/contractkit"]
          },
          {
            to: "/developer/contractkit/migrating-to-contractkit-v1",
            from: ["/developer-resources/contractkit/migrating-to-contractkit-v1", "/developer-guide/contractkit/migrating-to-contractkit-v1"]
          },
          {
            to: "/developer/contractkit/migrating-to-contractkit-v2",
            from: ["/developer-resources/contractkit/migrating-to-contractkit-v2", "/developer-guide/contractkit/migrating-to-contractkit-v2"]
          },
          {
            to: "/developer/contractkit/notes-web3-with-contractkit",
            from: ["/developer-resources/contractkit/notes-web3-with-contractkit", "/developer-guide/contractkit/notes-web3-with-contractkit"]
          },
          {
            to: "/developer/contractkit/odis",
            from: ["/developer-resources/contractkit/odis", "/developer-guide/contractkit/odis"]
          },
          {
            to: "/developer/contractkit/setup",
            from: ["/developer-resources/contractkit/setup", "/developer-guide/contractkit/setup"]
          },
          {
            to: "/developer/contractkit/setup",
            from: ["/developer-resources/contractkit/usage", "/developer-guide/contractkit/usage"]
          },
          {
            to: "/validator/troubleshooting-faq",
            from: "/getting-started/validator-troubleshooting-faq"
          },
          {
            to: "/protocol/oracle/run",
            from: "/getting-started/running-oracles"
          },
          {
            to: "/network/node/run-hosted",
            from: "/getting-started/hosted-nodes"
          },
          {
            to: "/general/glossary",
            from: "/getting-started/glossary"
          },
          {
            to: "/network/",
            from: "/getting-started/choosing-a-network"
          },
          {
            to: "/wallet/",
            from: "/getting-started/wallets/index"
          },
          {
            to: "/wallet/ledger/to-metamask",
            from: "/getting-started/wallets/using-metamask-with-celo/using-a-ledger-with-metamask"
          },
          {
            to: "/network/mainnet/",
            from: "/getting-started/mainnet/index"
          },
          {
            to: "/network/mainnet/run-full-node",
            from: "/getting-started/mainnet/running-a-full-node-in-mainnet"
          },
          {
            to: "/network/mainnet/run-validator",
            from: "/getting-started/mainnet/running-a-validator-in-mainnet"
          },
          {
            to: "/network/baklava/",
            from: "/getting-started/baklava-testnet/index"
          },
          {
            to: "/network/baklava/run-full-node",
            from: "/getting-started/baklava-testnet/running-a-full-node-in-baklava"
          },
          {
            to: "/network/baklava/run-validator",
            from: "/getting-started/baklava-testnet/running-a-validator-in-baklava"
          },
          {
            to: "/network/alfajores/",
            from: "/getting-started/alfajores-testnet/index"
          },
          {
            to: "/network/alfajores/run-full-node",
            from: "/getting-started/alfajores-testnet/running-a-full-node-in-alfajores"
          },
          {
            to: "/network/alfajores/faucet",
            from: "/getting-started/alfajores-testnet/faucet"
          },
          {
            to: "/network/alfajores/use-mobile-wallet",
            from: "/getting-started/alfajores-testnet/using-the-mobile-wallet"
          },
          {
            to: "/network/alfajores/disclaimer",
            from: "/important-information/alfajores-testnet-disclaimer"
          },
          {
            to: "/network/baklava/disclaimer",
            from: "/important-information/baklava-testnet-disclaimer"
          },
          {
            to: "/network/mainnet/disclaimer",
            from: "/important-information/mainnet-testnet-disclaimer"
          },
          {
            to: "/validator/validator-explorer",
            from: "/validator-guide/validator-explorer"
          },
          {
            to: "/validator/security",
            from: "/validator-guide/securing-nodes-and-services"
          },
          {
            to: "/validator/proxy",
            from: "/validator-guide/proxy"
          },
          {
            to: "/validator/",
            from: "/validator-guide/overview"
          },
          {
            to: "/validator/node-upgrade",
            from: "/validator-guide/node-upgrades"
          },
          {
            to: "/validator/monitoring",
            from: "/validator-guide/monitoring"
          },
          {
            to: "/validator/devops-best-practices",
            from: "/validator-guide/devops-best-practices"
          },
          {
            to: "/validator/celo-signal",
            from: "/validator-guide/celo-signal"
          },
          {
            to: "/validator/celo-foundation-voting-policy",
            from: "/validator-guide/celo-foundation-voting-policy"
          },
          {
            to: "/validator/attestation",
            from: "/validator-guide/attestation-service"
          },
          {
            to: "/validator/key-management/detailed",
            from: "/validator-guide/key-management/detailed"
          },
          {
            to: "/validator/key-management/key-rotation",
            from: "/validator-guide/key-management/key-rotation"
          },
          {
            to: "/validator/key-management/summary",
            from: "/validator-guide/key-management/summary"
          },
          {
            to: "/cli/",
            from: "/command-line-interface/introduction"
          },
          {
            to: "/cli/account",
            from: "/command-line-interface/account"
          },
          {
            to: "/cli/autocomplete",
            from: "/command-line-interface/autocomplete"
          },
          {
            to: "/cli/commands",
            from: "/command-line-interface/commands"
          },
          {
            to: "/cli/config",
            from: "/command-line-interface/config"
          },
          {
            to: "/cli/dkg",
            from: "/command-line-interface/dkg"
          },
          {
            to: "/cli/election",
            from: "/command-line-interface/election"
          },
          {
            to: "/cli/exchange",
            from: "/command-line-interface/exchange"
          },
          {
            to: "/cli/governance",
            from: "/command-line-interface/governance"
          },
          {
            to: "/cli/grandamento",
            from: "/command-line-interface/grandamento"
          },
          {
            to: "/cli/help",
            from: "/command-line-interface/help"
          },
          {
            to: "/cli/identity",
            from: "/command-line-interface/identity"
          },
          {
            to: "/cli/lockedgold",
            from: "/command-line-interface/lockedgold"
          },
          {
            to: "/cli/multisig",
            from: "/command-line-interface/multisig"
          },
          {
            to: "/cli/network",
            from: "/command-line-interface/network"
          },
          {
            to: "/cli/node",
            from: "/command-line-interface/node"
          },
          {
            to: "/cli/oracle",
            from: "/command-line-interface/oracle"
          },
          {
            to: "/cli/plugins",
            from: "/command-line-interface/plugins"
          },
          {
            to: "/cli/releasegold",
            from: "/command-line-interface/releasegold"
          },
          {
            to: "/cli/reserve",
            from: "/command-line-interface/reserve"
          },
          {
            to: "/cli/rewards",
            from: "/command-line-interface/rewards"
          },
          {
            to: "/cli/transfer",
            from: "/command-line-interface/transfer"
          },
          {
            to: "/cli/validator",
            from: "/command-line-interface/validator"
          },
          {
            to: "/cli/validatorgroup",
            from: "/command-line-interface/validatorgroup"
          },
        ],
      },
    ],
    [
      "ideal-image",
      /** @type {import('@docusaurus/plugin-ideal-image').PluginOptions} */
      ({
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        // Use false to debug, but it incurs huge perf costs
        disableInDev: true,
      }),
    ],
  ],
  themeConfig: {
    announcementBar: {
      id: "support_us",
      content:
        '🌱 If you like Celo, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/celo-org/celo-monorepo">GitHub</a> and follow <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/CeloDevs">@CeloDevs</a> and <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/CeloOrg">@CeloOrg </a> 🌱',
      backgroundColor: "#18191A",
      textColor: "#ffffff",
      isCloseable: false,
    },
    docs: {
      sidebar: { hideable: true },
    },
    prism: {
      additionalLanguages: ["solidity"],
      theme: require("prism-react-renderer/themes/dracula"),
    },
    colorMode: {
      defaultMode: "dark",
    },
    navbar: {
      title: "Celo Docs",
      logo: {
        alt: "Celo Logo",
        src: "img/color-logo.png",
      },
      items: [
        // {
        //     "to": "welcome",
        //     "label": "Basics",
        //     "position": "left"
        // },
        {
          to: "developer/",
          label: "Developers",
          position: "left",
        },
        {
          to: "validator/",
          label: "Validators",
          position: "left",
        },
        {
          to: "integration/",
          label: "Integrations",
          position: "left",
        },
        // {
        //   to: "/community/contributing",
        //   label: "Stake",
        //   position: "left",
        // },
        // {
        //   to: "/blog",
        //   label: "Learn",
        //   position: "left",
        // },
        { to: "showcase", label: "Showcase", position: "left" },
        {
          to: "/blog",
          label: "Tutorials",
          position: "left",
        },
        // {
        //   type: "dropdown",
        //   position: "left",
        //   label: "Tutorials",
        //   items: [
        //     {
        //       label: "Code Tutorials",
        //       to: "blog",
        //     },
        //     {
        //       label: "Developer Blog",
        //       to: "https://medium.com/celodevelopers/",
        //     },
        //     {
        //       label: "EVM Basics",
        //       to: "https://ethereum.org/en/developers/docs/",
        //     },
        //     {
        //       label: "Celo Blog",
        //       to: "https://medium.com/celoorg",
        //     },
        //     {
        //       label: "Figment",
        //       to: "https://learn.figment.io/protocols/celo",
        //     },
        //     {
        //       label: "Dacade",
        //       to: "https://dacade.org/communities/celo",
        //     },
        //   ],
        // },
        {
          type: "localeDropdown",
          position: "right",
          dropdownItemsAfter: [
            {
              to: "https://celo.crowdin.com/",
              label: "Help us translate",
            },
          ],
        },
        {
          type: "dropdown",
          position: "right",
          label: "Support",
          items: [
            {
              to: "https://forum.celo.org/",
              label: "View the Forum",
            },
            {
              to: "https://github.com/celo-org/docs/issues/new",
              label: "Create an Issue",
            },
          ],
        },
        {
          type: "dropdown",
          position: "right",
          label: "APIs & SDKs",
          items: [
            { to: "cli/", label: "CLI" },
            {
              to: "https://celo-sdk-docs.readthedocs.io/en/latest/",
              label: "SDK",
            },
            {
              to: "https://github.com/heymateag/celoiossdk",
              label: "iOS",
            },
            {
              to: "https://github.com/blaize-tech/celo-sdk-java",
              label: "Java",
            },
            { to: "https://github.com/celo-org/react-celo", label: "React" },
            { to: "https://docs.flutter.dev/", label: "Flutter" },
            {
              to: "https://github.com/blaize-tech/celo-sdk-py/",
              label: "Python",
            },
            {
              to:
                "https://github.com/celo-org/celo-monorepo/tree/master/packages/sdk/contractkit",
              label: "JavaScript",
            },
            {
              to:
                "https://github.com/celo-org/celo-composer/tree/main/packages/react-native-app",
              label: "React Native",
            },
            {
              label: "Celo Composer",
              to: "https://github.com/celo-org/celo-composer#celo-composer",
            },
          ],
        },
        {
          href: "https://github.com/celo-org",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
    algolia: {
      appId: "55M4I38S60",
      apiKey: "baed78b52be14ac907688f1dd70b41d5",
      indexName: "celo",
      contextualSearch: true,
      debug: false,
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Home",
              to: "/",
            },
            // {
            //   label: "Blog",
            //   to: "/blog",
            // },
            // {
            //   href: "https://celo.crowdin.com/celo-docs",
            //   label: "Help translate",
            // },
            {
              label: "Docs GitHub",
              href: "https://github.com/celo-org/docs",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              href: "/community/contributing",
              label: "Contributors",
            },
            {
              label: "Forum",
              href: "https://forum.celo.org/",
            },
            {
              label: "Discord",
              href: "https://chat.celo.org",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/CeloOrg",
            },
            {
              label: "Reddit",
              href: "https://www.reddit.com/r/celo/",
            },
            {
              label: "Celo GitHub",
              href: "https://github.com/celo-org",
            },
          ],
        },
        {
          title: "Ecosystem",
          items: [
            {
              label: "Celo Foundation",
              href: "https://celo.org",
            },
            {
              label: "Medium Blog",
              href: "https://medium.com/celoorg",
            },
            {
              label: "The Celo",
              href: "https://thecelo.com/",
            },
            {
              label: "Celo Hub",
              href: "https://celohub.org/",
            },
            {
              label: "Careers",
              href: "https://celo.org/jobs",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Celo Foundation, Inc. Built with Docusaurus.`,
    },
    fathomAnalytics: {
      siteId: "AZMFWALB",
    },
    hubspot: {
      accountId: 8568019,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/celo-org/docs/edit/main/",
          editUrl: ({ locale, versionDocsDirPath, docPath }) => {
            // Link to Crowdin for French docs
            if (locale !== DefaultLocale) {
              return `https://celo.crowdin.com/celo-docs/${locale}`;
            }
            // Link to Github for English docs
            return `https://github.com/celo-org/docs/edit/main/docs/${docPath}`;
          },
          routeBasePath: "/",
          remarkPlugins: [
            math,
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
            require("mdx-mermaid"),
          ],
          rehypePlugins: [katex],
        },
        gtag: {
          // You can also use your "G-" Measurement ID here.
          trackingID: "G-0CXEKQ81V2",
          // Optional fields.
          anonymizeIP: true, // Should IPs be anonymized?
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        // blog: {
        //   blogTitle: "Celo Tutorials",
        //   blogSidebarTitle: "All posts",
        //   // blogSidebarCount: "ALL",
        //   showReadingTime: false,
        //   blogListComponent: require.resolve(
        //     "./src/components/CustomBlogListPage.module.tsx"
        //   ),
        //   readingTime: ({ content, frontMatter, defaultReadingTime }) =>
        //     // allows per post reading time override in frontmatter
        //     frontMatter.hide_reading_time
        //       ? undefined
        //       : defaultReadingTime({
        //           content,
        //           options: { wordsPerMinute: 300 },
        //         }),
        // },
        blog: {
          blogTitle: 'Celo Tutorials',
          blogDescription: 'A Docusaurus powered blog!',
          postsPerPage: 'ALL',
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
      integrity:
        "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    },
  ],
};
