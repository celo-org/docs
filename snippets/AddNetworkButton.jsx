export const AddNetworkButton = ({ network = "mainnet" }) => {
  // Single source of truth for Celo network wallet_addEthereumChain params.
  const NETWORKS = {
    mainnet: {
      title: "Add Celo Mainnet to your wallet",
      desc: "Chain ID 42220 · CELO",
      params: {
        chainId: "0xa4ec", // 42220
        chainName: "Celo Mainnet",
        nativeCurrency: { name: "Celo", symbol: "CELO", decimals: 18 },
        rpcUrls: ["https://forno.celo.org"],
        blockExplorerUrls: ["https://celoscan.io"],
      },
    },
    sepolia: {
      title: "Add Celo Sepolia to your wallet",
      desc: "Chain ID 11142220 · Testnet",
      params: {
        chainId: "0xaa044c", // 11142220 (lowercase hex — MetaMask rejects uppercase)
        chainName: "Celo Sepolia",
        nativeCurrency: { name: "Celo", symbol: "CELO", decimals: 18 },
        rpcUrls: ["https://forno.celo-sepolia.celo-testnet.org"],
        blockExplorerUrls: ["https://celo-sepolia.blockscout.com"],
      },
    },
  };

  const cfg = NETWORKS[network] || NETWORKS.mainnet;

  const [status, setStatus] = useState(null); // { kind: "success" | "error" | "info", text }
  const [pending, setPending] = useState(false);

  const handleClick = async () => {
    setStatus(null);

    // Resolve the injected provider. With several wallets installed,
    // window.ethereum can be a non-MetaMask provider that auto-rejects
    // wallet_addEthereumChain — so prefer MetaMask when a list is exposed
    // (mirrors @metamask/detect-provider, used by the Celo faucet button).
    const eth = window.ethereum;
    const provider =
      eth && Array.isArray(eth.providers) && eth.providers.length
        ? eth.providers.find((p) => p && p.isMetaMask) || eth.providers[0]
        : eth;

    if (!provider || !provider.request) {
      setStatus({
        kind: "info",
        text: "No browser wallet detected. Install MetaMask, then try again.",
      });
      return;
    }

    setPending(true);
    try {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [cfg.params],
      });
      setStatus({ kind: "success", text: `${cfg.params.chainName} added to your wallet.` });
    } catch (err) {
      // Log the raw error so the exact code/message is visible in devtools.
      console.error("wallet_addEthereumChain failed", err);
      // 4001 is the EIP-1193 "user rejected request" code; anything else is a
      // real failure, so surface the wallet's own message rather than masking it.
      const text =
        err && err.code === 4001
          ? "Request cancelled in your wallet."
          : `Couldn't add the network${err && err.message ? `: ${err.message}` : "."}`;
      setStatus({ kind: "error", text });
    } finally {
      setPending(false);
    }
  };

  const descText = pending ? "Opening your wallet…" : status ? status.text : cfg.desc;
  const descColor =
    status && status.kind === "error"
      ? "text-red-600 dark:text-red-400"
      : status && status.kind === "success"
      ? "text-primary dark:text-primary-light"
      : "text-gray-600 dark:text-gray-400";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-label={cfg.title}
      className="card block font-normal group relative my-2 ring-2 ring-transparent rounded-2xl bg-white dark:bg-background-dark border border-gray-950/10 dark:border-white/10 overflow-hidden w-full text-left cursor-pointer hover:!border-primary dark:hover:!border-primary-light disabled:cursor-not-allowed"
    >
      <div className="px-6 py-5 relative">
        <div className="h-6 w-6 text-primary dark:text-primary-light">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 shrink-0"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
        </div>
        <div>
          <h2 className="not-prose font-semibold text-base text-gray-800 dark:text-white mt-4">
            {cfg.title}
          </h2>
          <div className={`prose mt-1 font-normal text-base leading-6 ${descColor}`}>
            <span>{descText}</span>
          </div>
        </div>
      </div>
    </button>
  );
};
