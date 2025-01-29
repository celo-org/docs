import React from "react";
import { Button } from "./Button";

export default function StartBuilding() {
  return (
    <section className="pt-24 bg-[#1E002B] text-center">
      <div className="inline-flex items-center gap-2 bg-violet-950 border border-violet-500 border-solid rounded-full px-1 py-1 mb-8">
        <span className="text-[#6941C6] text-xs bg-white border border-[##E9D7FE] rounded-full px-2 py-1 font-semibold">
          Coming Soon
        </span>
        <span className="text-white/80 text-xs font-semibold">
          Celo L1 to Ethereum L2 Migration
        </span>
        <span className="text-white/80 text-sm">→</span>
      </div>

      <p className={`font-advercase text-6xl px-3 text-sand mb-4`}>
        Start Building
      </p>
      <p className="text-sand mb-8 max-w-xl mx-auto text-xl">
        Get started with these developer tools and resources.
      </p>
      <Button
        size="lg"
        className="bg-white text-[#2e1065] hover:bg-white/90 px-8"
      >
        View Docs
      </Button>
    </section>
  );
}
