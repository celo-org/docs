import React from "react";
import { Button } from "./Button";
import ComposerCliIcon from "./icons/ComposerCliIcon";
import LearnIcon from "./icons/LearnIcon";
import NetworkIcon from "./icons/NetworkIcon";
import SmartPhoneIcon from "./icons/SmartPhoneIcon";
import DiscoverPatternAlt from "./Pattern/DiscoverPatternAlt";
const resources = [
  {
    icon: ComposerCliIcon,
    title: "Quickstart with Celo Composer CLI",
    description: "Get started with these developer tools and resources.",
    link: "#",
  },
  {
    icon: NetworkIcon,
    title: "Integrate the Celo network",
    description: "Resources to deploy your dApp on Celo",
    link: "#",
  },
  {
    icon: SmartPhoneIcon,
    title: "Enhance your User Interface",
    description: "Pre-built component library for a seamless user experience",
    link: "#",
  },
  {
    icon: LearnIcon,
    title: "Learn by Building",
    description: "Step-by-step guides and tutorials",
    link: "#",
  },
];

export default function DevResources() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <div
              key={index}
              className={`${index === 3 ? "bg-black" : "bg-transparent"} relative p-8 rounded-xl h-full flex flex-col justify-end border border-violet-950 border-solid`}
            >
              {index === 3 && (
                <div className="absolute top-8 right-16 w-32 h-32 opacity-20">
                  <DiscoverPatternAlt />
                </div>
              )}
              <div>
                <Icon className="w-16 h-16 text-[#7C3AED] mb-6 mt-32" />
                <p
                  className={`${index === 3 ? "text-violet-600" : "text-white"} font-advercase text-5xl md:text-6xl lg:text-7xl mb-4`}
                >
                  {resource.title}
                </p>
                <p className="text-white/80 mb-6 text-lg">
                  {resource.description}
                </p>
              </div>
              <div>
                <Button
                  size="lg"
                  className={`${index === 3 ? "bg-black text-white hover:bg-violet-600/90 border-2 border-violet-600 border-solid" : "bg-slate-600 text-white hover:bg-white/20"} px-8`}
                >
                  Get Started
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
