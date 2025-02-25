import React from "react";
import DiscoverPattern from "./Pattern/DiscoverPattern";

export interface FeatureCardType {
  title: string;
  description: string;
  image: string | null;
  link: string;
  isReversed?: boolean;
}

export default function FeatureCard({
  title,
  description,
  image,
  link,
  index,
  isReversed = false,
}: FeatureCardType & { index: number }) {
  const isMobile = window.innerWidth < 768;
  isMobile && (isReversed = false);
  return (
    <a
      href={link}
      className="block bg-gypsum rounded-2xl overflow-hidden hover:opacity-90 transition-opacity h-full"
    >
      <>
        {isReversed ? (
          <div className="flex flex-col h-full">
            <div className="relative aspect-[4/3]">
              {image ? (
                <img
                  src={image || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-fig p-8 ">
                  <div className="w-32 h-32">
                    <DiscoverPattern />
                  </div>
                </div>
              )}
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="font-advercase text-3xl mb-3 text-[#2E1065] font-medium">
                {title}
              </h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="p-8 flex flex-col flex-1">
              <h3 className="font-advercase text-3xl mb-3 text-[#2E1065] font-medium">
                {title}
              </h3>
              <p className="text-gray-600">{description}</p>
            </div>
            <div className="relative aspect-[4/3]">
              {image ? (
                <img
                  src={image || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-full "
                />
              ) : (
                <div className="w-full h-full bg-fig p-8 ">
                  <div className="w-32 h-32">
                    <DiscoverPattern />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    </a>
  );
}
