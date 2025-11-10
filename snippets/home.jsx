export const CeloHero = ({
  title = "Build for the Real World on Celo",
  subtitle = "Build your first app on Celo. No coding experience required.",
  ctaText = "Start building",
  ctaHref = "/build/mcp/celo-mcp",
  imgLight = "/img/homepage/celo_docs_hero_light.png",
  imgDark = "/img/homepage/celo_docs_hero_dark.png",
}) => {
  return (
    <div className="w-full bg-transparent mt-5">
      <section
        className="
          max-w-[1400px] h-[340px] mx-auto
          flex items-center justify-between gap-6
          text-gray-900 dark:text-white
          bg-transparent
        "
        aria-label="Celo hero"
      >
        {/* LEFT: copy (won't overflow) */}
        <div className="basis-1/2 min-w-0 flex flex-col justify-center">
          <h1 className="font-bold tracking-tight text-[40px] sm:text-[48px] leading-tight">{title}</h1>

          <a
            href={ctaHref}
            className="group inline-flex items-center gap-2 mt-4 text-[#476520] dark:text-yellow-300 font-semibold hover:underline"
          >
            <span className="text-lg">{ctaText}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="w-5 h-5 transition-transform group-hover:translate-x-0.5"
              fill="none"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </a>

          <p className="mt-4 max-w-xl text-base text-gray-700 dark:text-gray-300">{subtitle}</p>
        </div>

        {/* RIGHT: artwork (strictly fits inside) */}
        <div className="basis-1/2 h-full flex items-center justify-center overflow-hidden">
          {/* Light image */}
          <img
            src={imgLight}
            alt="Celo hero"
            className="
              block dark:hidden
              pointer-events-none select-none
              object-contain
              h-[300px] max-h-full
              w-auto max-w-[620px]
            "
          />
          {/* Dark image */}
          <img
            src={imgDark}
            alt="Celo hero (dark)"
            className="
              hidden dark:block
              pointer-events-none select-none
              object-contain
              h-[300px] max-h-full
              w-auto max-w-[620px]
            "
          />
        </div>
      </section>
    </div>
  );
};

export const CeloUseCases = ({
  title = "Celo is Scaling Ethereum With Real World Use Cases",
  items = [
    {
      heading: "Learn about Celo",
      ctaText: "Explore Docs",
      href: "/build",
      img: "/img/homepage/illustration-1.png",
      external: true,
    },
    {
      heading: "Fund your Project",
      ctaText: "Learn more",
      href: "/build/fund-your-project",
      img: "/img/homepage/illustration-2.png",
      external: true,
    },
  ],
}) => {
  return (
    <section className="w-full mt-12 bg-transparent text-gray-900 dark:text-white">
      {/* Title */}
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold">{title}</h2>
      </div>

      {/* Cards */}
      <div
        className="
          max-w-[1400px] mx-auto mt-8
          grid grid-cols-1 md:grid-cols-2 gap-4
        "
      >
        {items.map((item, i) => (
          <a
            key={i}
            href={item.href}
            rel={item.external ? "noreferrer" : undefined}
            className="
              group
              flex items-center justify-between
              p-6 md:p-8
              rounded-lg
              border border-black/10 dark:border-white/10
              bg-gypsum dark:bg-fig
              min-h-[220px]
              transition-[border-color,transform,box-shadow]
              hover:border-[#476520] dark:hover:border-yellow-300/60
              hover:shadow-sm
            "
          >
            {/* Left copy */}
            <div className="w-2/3 pr-4 flex flex-col justify-between gap-6">
              <div className="text-2xl md:text-3xl font-semibold">{item.heading}</div>

              <div className="inline-flex items-center gap-2 text-[#476520] dark:text-yellow-300 font-semibold">
                <span className="text-lg">{item.ctaText}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  className="w-5 h-5 translate-x-0 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
            </div>

            {/* Right graphic */}
            <div className="w-1/3 flex justify-end">
              <img
                src={item.img}
                alt=""
                className="h-40 md:h-44 w-auto object-contain pointer-events-none select-none"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export const CeloDiscoverGrid = ({
  title = "Discover What You Can Build on Celo",
  items = [
    {
      label: "Build with Celo MCP Servers",
      desc: "Vibe Code your first Celo dApp with Celo MCP Servers",
      href: "build/build-with-ai/mcp/index",
      external: true,
    },
    {
      label: "Build on MiniPay",
      desc: "Create a mobile-first Mini App",
      href: "/build/build-on-minipay/overview",
      external: true,
    },
    {
      label: "Build with Self",
      desc: "Verify real users with ZK",
      href: "/build/build-with-self",
      external: true,
    },
    {
      label: "Build with AI",
      desc: "Launch agents for an onchain economy",
      href: "/build/build-with-ai/overview",
      external: true,
    },
    {
      label: "Build with Celo Composer",
      desc: "Quickstart your dApp",
      href: "/build/quickstart",
      external: true,
    },
    {
      label: "Build with Farcaster",
      desc: "Create Farcaster MiniApps on Celo",
      href: "https://github.com/celo-org/celo-farcaster-frames/issues",
      external: true,
    },
    {
      label: "Build with DeFi",
      desc: "Build with DeFi protocols, stablecoins and for FX",
      href: "/build/build-with-defi",
      external: true,
    },
    {
      label: "Build with Mento",
      desc: "Use local stablecoins",
      href: "https://www.mento.org/",
      external: true,
    },
    {
      label: "Get Funding",
      desc: "Get funding for your project",
      href: "/build/fund-your-project",
      external: true,
    },
  ],
}) => {
  return (
    <section className="mt-20 bg-sand dark:bg-fig text-gray-900 dark:text-white">
      <div
        className="
          max-w-[1400px] mx-auto md:p-8 p-4
          border border-black/10 dark:border-white/10
          bg-[#E7E3D4] dark:bg-transparent
        "
      >
        <h2 className="text-3xl font-bold">{title}</h2>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 w-full mt-8">
          {items.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              rel={item.external ? "noreferrer" : undefined}
              className="
                hover:no-underline
                relative px-5 py-5
                flex flex-col items-start
                bg-[#FCF6F1] dark:bg-transparent
                border border-black/10 dark:border-white/10
                hover:border-[#476520] dark:hover:border-yellow-300/60
                transition-[border-color,box-shadow,transform]
              "
            >
              <span className="font-semibold text-2xl text-black dark:text-white">{item.label}</span>

              <span className="text-base text-black dark:text-yellow-300 mt-1 pr-8">{item.desc}</span>

              {/* Arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="w-5 h-5 absolute bottom-5 right-5 text-[#476520] dark:text-yellow-300"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CeloDeveloperResources = ({
  title = "Explore Developer Tools & Resources",
  columns = [
    {
      heading: "Understanding Celo",
      links: [
        {
          label: "What is Celo?",
          desc: "Discover how Celo L2 is scaling real world use cases on Ethereum",
          href: "/home/index",
          icon: "img/homepage/icons/WhatIsCelo_White.svg",
        },
        {
          label: "Architecture",
          desc: "Overview of our stack and core contracts",
          href: "/build-on-celo/cel2-architecture",
          icon: "img/homepage/icons/Architechture_White.svg",
        },
        {
          label: "Whitepapers",
          desc: "Dive in to understand our protocol and social impact",
          href: "https://celo.org/papers",
          external: true,
          icon: "img/homepage/icons/Whitepapers_White.svg",
        },
        {
          label: "Protocol",
          desc: "Learn about our protocol and its relationship to Ethereum",
          href: "/home/protocol",
          icon: "img/homepage/icons/Protocol_White.svg",
        },
      ],
    },
    {
      heading: "Build with Celo",
      links: [
        {
          label: "Quickstart",
          desc: "Build & Deploy your dApps in under 5 minutes",
          href: "/build/quickstart",
          icon: "img/homepage/icons/CLI_White.svg",
        },
        {
          label: "Tutorials",
          desc: "Explore Celo Tutorials",
          href: "/build",
          icon: "img/homepage/icons/NewToWeb3_White.svg",
        },
        {
          label: "Integrate",
          desc: "Connect Celo to your application",
          href: "/infra-partners/integration/index",
          icon: "img/homepage/icons/ContractKit_White.svg",
        },
      ],
    },
    {
      heading: "Developer Tools",
      links: [
        {
          label: "Faucet",
          desc: "Explore Contractkit usage and features",
          href: "https://faucet.celo.org",
          external: true,
          icon: "img/homepage/icons/CeloComposer_White.svg",
        },
        {
          label: "Explorer",
          desc: "Explore transactions on Celo",
          href: "/developer/explorers/overview",
          icon: "img/homepage/icons/Oracle_White.svg",
        },
        {
          label: "Bridge",
          desc: "Bridge Assets across chains",
          href: "/home/bridged-tokens/bridges",
          icon: "img/homepage/icons/Rainbow_White.svg",
        },
        {
          label: "Deploy",
          desc: "Deploy your contract on Celo",
          href: "/developer/deploy",
          icon: "img/homepage/icons/Migration_White.svg",
        },
      ],
    },
    {
      heading: "Grow Your Project",
      links: [
        {
          label: "Get Funding",
          desc: "Discover grant opportunities in the Celo ecosystem.",
          href: "/build/fund-your-project",
          icon: "img/homepage/icons/Validator_White.svg",
        },
        {
          label: "Distribution",
          desc: "Get more awareness about your project.",
          href: "/build/launch-checklist",
          icon: "img/homepage/icons/Node_White.svg",
        },
      ],
    },
  ],
}) => {
  const CardLink = ({ href, external, icon, label, desc }) => (
    <a
      href={href}
      rel={external ? "noopener noreferrer" : undefined}
      className="
      group relative flex items-start gap-4
      px-4 pt-5 pb-4
      border border-black/15 dark:border-white/15
      bg-[#FCF6F1] dark:bg-transparent
      transition-all duration-300
      hover:!bg-[#476520] hover:!border-[#476520]
      hover:no-underline
      min-h-[104px]
    "
    >
      <img
        src={icon}
        alt=""
        className="
        w-10 h-10 shrink-0
        transition duration-300
        group-hover:invert group-hover:brightness-0 group-hover:contrast-200
      "
      />
      <div className="pr-2">
        <h4
          className="
          font-bold 
          text-gray-900 dark:text-yellow-300
          group-hover:text-white
        "
        >
          {label}
        </h4>
        <p
          className="
          text-sm mt-1
          text-gray-700 dark:text-yellow-300
          group-hover:text-white/90
        "
        >
          {desc}
        </p>
      </div>
    </a>
  );

  return (
    <section className="mt-20 bg-sand dark:bg-fig text-gray-900 dark:text-white">
      <div
        className="
          max-w-[1400px] mx-auto md:p-8 p-4 bg-[#E7E3D4] dark:bg-transparent
          border border-black/10 dark:border-white/10
        "
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center">{title}</h2>

        {/* Columns */}
        <div className="grid md:grid-cols-4 grid-cols-1 gap-x-10 gap-y-12 mt-10">
          {columns.map((col, i) => (
            <div key={i}>
              <div className="text-2xl font-bold text-center mb-6">{col.heading}</div>

              <div className="space-y-6">
                {col.links.map((l, j) => (
                  <CardLink key={j} {...l} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CeloBuilderEcosystem = ({
  heading = "Join the Celo Builder Ecosystem",
  subheading = "Discover the many ways to connect with our growing community of developers",
  items = [
    {
      title: "Join the Newsletter",
      desc: "Stay updated on the latest news, grants, and opportunities.",
      href: "https://embeds.beehiiv.com/eeadfef4-2f0c-45ce-801c-b920827d5cd2",
      external: true,
      icon: "img/homepage/ambassador.svg",
    },
    {
      title: "Connect with the Community",
      desc: "Join our Discord",
      href: "https://discord.com/invite/celo",
      external: true,
      icon: "img/homepage/connect.svg",
    },
    {
      title: "Bring Your Ideas to Life",
      desc: "Sign up for upcoming hackathons and workshops",
      href: "https://lemonade.social/celo",
      external: true,
      icon: "img/homepage/contribute.svg",
    },
    {
      title: "Join Proof of Ship",
      desc: "Build your onchain reputation to unlock exclusive rewards",
      href: "https://celoplatform.notion.site/Build-With-Celo-Proof-of-Ship-17cd5cb803de8060ba10d22a72b549f8",
      external: true,
      icon: "img/homepage/connect.svg",
    },
    {
      title: "Make your Voice Heard",
      desc: "Vote on Governance Proposals",
      href: "/home/protocol/governance/voting-in-governance-using-mondo",
      external: false,
      icon: "img/homepage/connect.svg",
    },
    {
      title: "Get Daily Updates",
      desc: "Follow our CeloDev on X",
      href: "https://x.com/CeloDevs",
      external: true,
      icon: "img/homepage/ambassador.svg",
    },
  ],
}) => {
  const EcosystemCard = ({ href, external, icon, title, desc }) => (
    <a
      href={href}
      rel={external ? "noopener noreferrer" : undefined}
      className="
      group flex items-start gap-4 mt-8 px-4 pt-5 pb-4
      bg-gypsum dark:bg-fig
      border border-black/15 dark:border-white/15
      transition-all duration-300 ease-in-out
      hover:!bg-[#476520] hover:!border-[#476520]
      hover:no-underline cursor-pointer
    "
    >
      <img
        src={icon}
        alt=""
        className="
        w-10 h-10 shrink-0
        transition duration-300
        group-hover:invert group-hover:brightness-0 group-hover:contrast-200
      "
      />
      <div className="pr-2">
        <h4 className="font-bold text-gray-900 dark:text-yellow-300 group-hover:!text-white">{title}</h4>
        <p className="text-sm  text-gray-900 dark:text-yellow-300 group-hover:!text-white/90 mt-1">{desc}</p>
      </div>
    </a>
  );
  return (
    <section className="mt-12 bg-transparent text-gray-900 dark:text-white mb-10">
      <div className="max-w-[1400px] mx-auto px-2 mb-10">
        <h2 className="text-4xl font-semibold">{heading}</h2>
        <p className="text-xl font-medium mt-2">{subheading}</p>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 w-full mt-2">
          {items.map((it, i) => (
            <EcosystemCard key={i} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
};
