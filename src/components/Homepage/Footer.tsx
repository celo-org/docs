import React from "react";
import { Button } from "./Button";
import CeloLogo from "./icons/CeloLogo";

const footerLinks = {
  docs: [
    { name: "Home", href: "#" },
    { name: "Docs GitHub", href: "#" },
  ],
  community: [
    { name: "Contributors", href: "#" },
    { name: "Celo Signal Mailing List", href: "#" },
    { name: "Celo Signal Calendar", href: "#" },
    { name: "Community Calendar", href: "#" },
  ],
  ecosystem: [
    { name: "Celo Foundation", href: "#" },
    { name: "Medium Blog", href: "#" },
    { name: "The Celo", href: "#" },
    { name: "Celo Hub", href: "#" },
    { name: "Career", href: "#" },
  ],
  connect: [
    { name: "Discord", href: "#" },
    { name: "X (Twitter)", href: "#" },
    { name: "Reddit", href: "#" },
  ],
};

const communityLinks = [
  {
    title: "Discord",
    description: "Connect with the Community",
    action: "Join our Discord →",
    href: "#",
    blockColor: ["prosperity", "lavender", "forest"],
  },
  {
    title: "Developer Events",
    description: "Bring Your Ideas to Life",
    action: "Register for Upcoming Hackathons →",
    href: "#",
    blockColor: ["white", "fig", "white"],
  },
  {
    title: "Celo Camp",
    description: "Scale Your Project",
    action: "Apply for Celo Camp →",
    href: "#",
    blockColor: ["forest", "sky", "forest"],
  },
  {
    title: "Grants",
    description: "Explore Grants Opportunities",
    action: "Learn about public goods funding programs →",
    href: "#",
    blockColor: ["disabled", "sand", "disabled"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1E002B] text-white pt-24 pb-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <div className="flex flex-col justify-between">
            <div>
              <p className={`font-advercase text-7xl text-sand mb-4`}>
                Join the Celo ecosystem.
              </p>
              <p className="text-xl font-extralight text-slate-400 mt-3 mb-8">
                Build together with a global community of passionate developers.
              </p>
            </div>
            <div>
              <p className={`font-advercase text-4xl mb-6 max-w-md`}>
                Sign up for developer updates
              </p>
              <div className="flex flex-col gap-1 mb-16">
                <span>Email*</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-transparent border border-violet-800 border-solid rounded w-52"
                />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col space-y-3">
            {communityLinks.map((link, index) => (
              <div className="flex flex-row w-full" key={index}>
                {index === 0 && (
                  <div className="flex flex-col justify-evenly flex-nowrap w-2 bg-white">
                    <div key={index} className={`h-full bg-prosperity`}></div>
                    <div key={index} className={`h-full bg-lavender`}></div>
                    <div key={index} className={`h-full bg-forest`}></div>
                  </div>
                )}
                {index === 1 && (
                  <div className="flex flex-col justify-evenly flex-nowrap w-2 bg-white">
                    <div key={index} className={`h-full bg-white`}></div>
                    <div key={index} className={`h-full bg-fig`}></div>
                    <div key={index} className={`h-full bg-white`}></div>
                  </div>
                )}
                {index === 2 && (
                  <div className="flex flex-col justify-evenly flex-nowrap w-2 bg-white">
                    <div key={index} className={`h-full bg-forest`}></div>
                    <div key={index} className={`h-full bg-sky`}></div>
                    <div key={index} className={`h-full bg-forest`}></div>
                  </div>
                )}
                {index === 3 && (
                  <div className="flex flex-col justify-evenly flex-nowrap w-2 bg-white">
                    <div key={index} className={`h-full bg-disabled`}></div>
                    <div key={index} className={`h-full bg-sand`}></div>
                    <div key={index} className={`h-full bg-disabled`}></div>
                  </div>
                )}
                <div className="border border-violet-950 border-solid p-8 w-full">
                  <h3 className="font-advercase font-normal text-3xl mb-1">
                    {link.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-2">
                    {link.description}
                  </p>
                  <Button
                    size="lg"
                    className="mt-4 bg-violet-950 text-violet-400 hover:text-[#7C3AED]/80"
                  >
                    {link.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <CeloLogo />
      </div>
    </footer>
  );
}
