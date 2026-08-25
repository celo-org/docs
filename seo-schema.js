// Injects brand-level Organization JSON-LD linking docs.celo.org to the Celo
// entity (celo.org) and its public profiles. Mintlify's auto-generated schema
// names the Organization "Celo Docs" with no sameAs, which leaves the docs
// disconnected from the brand entity that search and AI engines resolve (#2283).
//
// Mintlify loads every .js file in the content directory on each page, after
// the page becomes interactive. Limitation: because this runs client-side,
// Google and other DOM-rendering crawlers see the block, but plain-fetch
// crawlers do not. Static head injection is not available on the current plan.
(function () {
  var data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://celo.org/#organization",
        name: "Celo",
        url: "https://celo.org",
        logo: "https://docs.celo.org/images/CeloDocs_LogoLight.svg",
        description:
          "Celo is an Ethereum Layer 2 built for real-world use: fast, low-cost payments in stablecoins, mobile-first apps, and infrastructure for AI agents.",
        sameAs: [
          "https://github.com/celo-org",
          "https://x.com/Celo",
          "https://www.youtube.com/@CeloOrg",
          "https://discord.com/invite/celo",
          "https://forum.celo.org",
          "https://www.coingecko.com/en/coins/celo",
          "https://defillama.com/chain/celo",
          "https://l2beat.com/scaling/projects/celo"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://docs.celo.org/#celo-docs",
        name: "Celo Documentation",
        url: "https://docs.celo.org",
        publisher: { "@id": "https://celo.org/#organization" }
      }
    ]
  };
  var s = document.createElement("script");
  s.type = "application/ld+json";
  s.text = JSON.stringify(data);
  document.head.appendChild(s);
})();
