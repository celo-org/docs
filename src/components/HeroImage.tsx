import { useColorMode } from "@docusaurus/theme-common";
import React from "react";

export default function HeroImage() {
  const { colorMode } = useColorMode();

  if (colorMode === "dark")
    return (
      <img
        className="md:w-1/2 w-full object-contain mt-5 md:mt-0"
        alt="hero-image"
        src="/img/homepage/celo_docs_hero_dark.png"
      />
    );

  return (
    <img
      className="md:w-1/2 w-full object-contain mt-5 md:mt-0"
      alt="hero-image"
      src="/img/homepage/celo_docs_hero_light.png"
    />
  );
}
