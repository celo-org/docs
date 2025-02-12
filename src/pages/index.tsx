import "./index.module.css";

import React, { useEffect } from "react";

import { Button } from "../components/Homepage/Button";
import DevResources from "../components/Homepage/DevResources";
import DiscoverSection from "../components/Homepage/DiscoverSection";
import ExploreSection from "../components/Homepage/ExploreSection";
import Footer from "../components/Homepage/Footer";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import { useLocation } from "react-router-dom";
import StartBuilding from "../components/Homepage/StartBuilding";

const TITLE = translate({ message: "Celo Documentation" });
const DESCRIPTION = translate({
  message:
    "Build decentralized applications that create the conditions for prosperity — for everyone.",
});
const EDIT_URL = "/developer/deploy";

type UserState = {
  scrollTopPosition: number;
  focusedElementId: string | undefined;
};

function restoreUserState(userState: UserState | null) {
  const { scrollTopPosition, focusedElementId } = userState ?? {
    scrollTopPosition: 0,
    focusedElementId: undefined,
  };
  document.getElementById(focusedElementId)?.focus();
  window.scrollTo({ top: scrollTopPosition });
}

export default function HomePage(): JSX.Element {
  const location = useLocation<UserState>();
  useEffect(() => {
    restoreUserState(location.state);
  }, [location]);

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@CeloOrg" />
        <meta name="twitter:title" content="Celo Documentation" />
        <meta
          name="twitter:description"
          content="Build decentralized applications that create the conditions for
              prosperity — for everyone."
        />
        <meta
          name="twitter:image"
          content="https://github.com/celo-org/docs/blob/main/static/img/preview.png?raw=true"
        />
      </Head>
      <main className="min-h-screen bg-fig text-white relative">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center bg-gypsum text-fig px-4 overflow-hidden h-screen md:h-[800px] m-4 rounded-lg">
          <h1
            className={`font-advercase font-normal text-7xl md:text-7xl lg:text-7xl mb-6 max-w-2xl mx-auto text-center`}
          >
            Build for the Real World on Celo
          </h1>
          <p className="text-lg text-slate-500 mb-8 max-w-lg mx-auto text-center">
            Create mobile-first decentralized applications accessible to
            everyone, everywhere.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="default" size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              View Docs
            </Button>
          </div>
        </section>

        {/* Discover Section */}
        <DiscoverSection />

        {/* Explore Section */}
        <ExploreSection />

        {/* Start Building Section */}
        <StartBuilding />

        {/* Dev Resources Section */}
        <DevResources />

        {/* Footer */}
        <Footer />
      </main>
    </Layout>
  );

  function buildKnowMoreButton(url: string) {
    return (
      <Link href={url} target="_blank" className="flex space-x-2 items-center">
        <span className="text-lg font-semibold">Learn more</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </Link>
    );
  }
}

export const sectionFourCard = (
  title: string,
  description: string,
  url: string,
  redirectUrl: string,
) => (
  <Link
    href={redirectUrl}
    className="text-black bg-gypsum dark:bg-fig dark:text-white flex items-start gap-x-4 mt-8 hover:bg-forest hover:text-snow dark:hover:bg-forest transition hover:ease-in-out duration-150 pt-5 px-4 cursor-pointer hover:no-underline"
  >
    <img src={url} alt={title} className="w-10 h-10" />
    <div>
      <h4 className="font-bold">{title}</h4>
      <p className="text-sm">{description}</p>
    </div>
  </Link>
);
