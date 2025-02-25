import FeatureCard, { FeatureCardType } from "./FeatureCard";

import React from "react";

const features: FeatureCardType[] = [
  {
    title: "Build for MiniPay",
    description:
      "Develop ultra-lightweight mobile dApps for Opera's self-custodial stablecoin wallet.",
    image: "/img/build-for-minipay.png",
    link: "#",
    isReversed: false,
  },
  {
    title: "Extend and integrate with Self Protocol",
    description:
      "Map social identities like phone numbers to decentralized wallet addresses.",
    image: "/img/self-protocol.png",
    link: "#",
    isReversed: true,
  },
  {
    title: "Tap into Stables",
    description:
      "Create stablecoin payment apps using Mento's local digital currencies.",
    image: "/img/tap-into-stables.png",
    link: "#",
    isReversed: false,
  },
  {
    title: "Farcaster Frames",
    description:
      "Build Farcaster Frames for onchain activations with Warpcast.",
    image: null,
    link: "#",
    isReversed: false,
  },
  {
    title: "Develop AI Agents",
    description:
      "Combine blockchain with AI to create decentralized autonomous agents.",
    image: null,
    link: "#",
    isReversed: true,
  },
  {
    title: "Onchain Funding Apps",
    description:
      "Simplify funding with apps that ensure fairness, transparency, and global reach.",
    image: null,
    link: "#",
    isReversed: false,
  },
];

export default function ExploreSection() {
  return (
    <>
      <section className="relative py-56 px-4 bg-violet-950 m-4 rounded-lg hidden md:block">
        <div className="max-w-7xl mx-auto">
          <p
            className={`text-5xl md:text-6xl lg:text-7xl font-advercase mb-16 text-center text-white`}
          >
            Explore
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>
      <div className="md:grid-cols-2 lg:grid-cols-3 gap-3 grid md:hidden p-3 bg-violet-950">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} index={index} />
        ))}
      </div>
    </>
  );
}
