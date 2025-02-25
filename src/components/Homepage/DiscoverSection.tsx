import React from "react";
import { Button } from "./Button";
import DiscoverPattern from "./Pattern/DiscoverPattern";

export default function DiscoverSection() {
  return (
    <section className="relative bg-gradient-to-r to-[#650091] from-[#1E002B] overflow-hidden h-screen md:h-[800px] m-4 rounded-lg">
      <div className="absolute -bottom-4 right-0 h-auto">
        <div className="relative w-full object-contain">
          <img
            src="/img/smart-phone.png"
            alt="Mobile app interface"
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="h-full">
        <div className="max-w-7xl mx-auto px-8 h-full">
          <div className="relative h-full flex items-center">
            <div className="relative z-10 flex flex-col justify-start md:justify-end h-full max-w-lg py-16">
              <div className="hidden md:block">
                <DiscoverPattern />
              </div>
              <p
                className={`mt-8 font-advercase text-7xl md:text-6xl lg:text-7xl text-sand mb-6 leading-[1.1]`}
              >
                Discover what you can build on Celo
              </p>
              <p className="text-lg text-slate-300 mb-8 max-w-xl">
                Create apps for mobile wallets, social connections, AI agents,
                funding, local stablecoins, and more!
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-white text-[#2e1065] hover:bg-white/90 px-8"
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/10"
                >
                  View Docs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
