/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import "./index.module.css";

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroImage from "../components/HeroImage";

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
      <main className="margin-vert--lg max-w-7xl mx-auto px-4">
        <section className="w-full justify-between flex md:flex-row flex-col items-center px-2 md:px-10">
          <div className="md:w-1/2 w-full">
            <span className="text-5xl font-bold text-center space-x-5">
              Build for the Real World on Celo
            </span>
            <br />
            <br />
            {/*
            <span className="text-2xl font-bold text-center space-x-5">
              Celo is an emerging mobile-first Ethereum L2 optimized for fast, low-cost transactions worldwide
            </span>
            */}
            <Link
              href={"/build/mcp/celo-mcp"}
              className="flex space-x-2 items-center mt-2"
            >
              <span className="text-lg font-semibold">Start building</span>
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
            <p className="mt-6 max-w-md">
              Build your first app on Celo. No coding experience required.
            </p>
          </div>
          <div className="flex justify-center md:w-1/2 w-full h-full ">
            <HeroImage />
          </div>
        </section>

        <section className="mt-12">
          <div className="text-3xl font-semibold px-2 w-full">
            <Translate id="home2.section1.title">
              Celo is Scaling Ethereum With Real World Use Cases
            </Translate>
          </div>
          <div className="px-2 flex flex-row flex-wrap w-full space-x-0 md:space-x-4 space-y-4 md:space-y-0 mt-8">
            <div className="flex-1 p-6 w-full flex flex-row flex-no-wrap dark:bg-fig bg-gypsum">
              <div className="w-2/3 flex flex-col justify-between h-full">
                <span className="text-3xl font-semibold">
                  <Translate id="home2.section1.box1">
                    Learn about Celo
                  </Translate>
                </span>
                {buildKnowMoreButton("/build", "Explore Docs")}
              </div>
              <div className="w-1/3">
                <img src="/img/homepage/illustration-1.png" />
              </div>
            </div>
            <div className="flex-1 p-6 w-full flex flex-row flex-no-wrap dark:bg-fig bg-gypsum">
              <div className="w-2/3 flex flex-col justify-between h-full">
                <span className="text-3xl font-semibold">
                  <Translate id="home2.section1.box2">
                    Fund your Project
                  </Translate>
                </span>
                {buildKnowMoreButton("/build/fund-your-project")}
              </div>
              <div className="w-1/3">
                {/* biome-ignore lint/a11y/useAltText: <explanation> */}
                <img src="/img/homepage/illustration-2.png" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mt-20 md:p-8 p-4 bg-sand dark:bg-fig">
          <span className="text-3xl font-bold">
            <Translate id="home2.section3.title">
              Discover What You Can Build on Celo
            </Translate>
          </span>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-x-4 gap-y-4 w-full mt-8">
            <a
              href="/build/mcp"
              target="_blank"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer relative"
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                <Translate id="home2.section3.mcp.title">
                  Build with Celo MCP Servers
                </Translate>
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                <Translate id="home2.section3.mcp.description">
                  Vibe Code your first Celo dApp with Celo MCP Servers
                </Translate>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute bottom-5 right-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>

            <a
              href="/developer/build-on-minipay/overview"
              target="_blank"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer relative"
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                <Translate id="home2.section3.minipay.title">
                  Build on MiniPay
                </Translate>
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                <Translate id="home2.section3.minipay.description">
                  Create a mobile-first Mini App
                </Translate>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute bottom-5 right-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>

            <a
              href="/build/build-with-self"
              target={"_blank"}
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer relative"
              rel="noreferrer"
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                <Translate id="home2.section3.self.title">
                  Build with Self
                </Translate>
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                <Translate id="home2.section3.self.description">
                  Verify real users with ZK
                </Translate>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute bottom-5 right-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>

            <a
              href="/build/build-with-ai/overview"
              target="_blank"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer relative"
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                <Translate id="home2.section3.celoBridge.title">
                  Build with AI
                </Translate>
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                <Translate id="home2.section3.celoBridge.description">
                  Launch agents for an onchain economy
                </Translate>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute bottom-5 right-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>

            <a
              href="/build/quickstart"
              target="_blank"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer relative"
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                <Translate id="home2.section3.composer.title">
                  Build with Celo Composer
                </Translate>
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                <Translate id="home2.section3.composer.description">
                  Quickstart your dApp
                </Translate>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute bottom-5 right-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>

            <a
              href="https://github.com/celo-org/celo-farcaster-frames/issues"
              target="_blank"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer relative"
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                <Translate id="home2.section3.farcaster.celoLibraries.title">
                  Build with Farcaster
                </Translate>
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                <Translate id="home2.section3.farcaster.celoLibraries.description">
                  Create Farcaster MiniApps on Celo
                </Translate>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute bottom-5 right-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>

            <a
              href="/build/build-with-defi"
              target="_blank"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer relative"
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                <Translate id="home2.section3.celoLibraries.defi.title">
                  Build with DeFi
                </Translate>
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                <Translate id="home2.section3.celoLibraries.defi.description">
                  Build with DeFi protocols, stablecoins and for FX
                </Translate>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute bottom-5 right-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>

            <a
              href="https://www.mento.org/"
              target="_blank"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer relative"
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                <Translate id="home2.section3.deploy.title">
                  Build with Mento
                </Translate>
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                <Translate id="home2.section3.deploy.description">
                  Use local stablecoins
                </Translate>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute bottom-5 right-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>

            <a
              href="/build/fund-your-project"
              target="_blank"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer relative"
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                <Translate id="home2.section3.celoLibraries.title">
                  Get Funding
                </Translate>
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                <Translate id="home2.section3.celoLibraries.description">
                  Get funding for your project
                </Translate>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 absolute bottom-5 right-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* Section 3 */}
        {/* <section className="mt-12">
          <div className="text-3xl font-bold mx-2">
            <Translate id="home.section2.title">
              Explore Providers and Frameworks
            </Translate>
          </div>
          <div className="px-2 grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-x-4 gap-y-4 mt-8">
            <a
              href="https://thirdweb.com"
              target="_blank"
              className="hover:no-underline flex-1 p-4 items-center space-x-4 flex flex-row flex-no-wrap dark:bg-fig bg-gypsum font-semibold"
            >
              <img
                src="img/thirdweb.svg"
                alt="thirdweb Logo"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-black dark:text-white">thirdweb</span>
            </a>
            <a
              href="https://docs.infura.io/infura/"
              target="_blank"
              className="hover:no-underline flex-1 p-4 items-center space-x-4 flex flex-row flex-no-wrap dark:bg-fig bg-gypsum font-semibold"
            >
              <img
                src="img/doc-images/logos/infura-logo.webp"
                alt="Infura Logo"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-black dark:text-white">Infura</span>
            </a>
            <a
              href="https://www.quicknode.com/chains/celo"
              target="_blank"
              className="hover:no-underline flex-1 p-4  items-center space-x-4 flex flex-row flex-no-wrap dark:bg-fig bg-gypsum font-semibold"
            >
              <img
                src="img/doc-images/logos/quicknode-logo.webp"
                alt="Infura Logo"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-black dark:text-white">QuickNode</span>
            </a>
            <Link
              href="/developer/deploy/hardhat"
              className="hover:no-underline flex-1 p-4  items-center space-x-4 flex flex-row flex-no-wrap dark:bg-fig bg-gypsum font-semibold"
            >
              <img
                src="img/doc-images/logos/hardhat-logo.webp"
                alt="Infura Logo"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-black dark:text-white">Hardhat</span>
            </Link>

            <a
              href="https://www.lavanet.xyz/"
              className="hover:no-underline flex-1 p-4 items-center space-x-4 flex flex-row flex-no-wrap dark:bg-fig bg-gypsum font-semibold"
            >
              <img
                src="img/doc-images/logos/lava-logo.png"
                alt="Lava Logo"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-black dark:text-white">Lava</span>
            </a>
          </div>
        </section> */}

        {/* Section 4 */}
        {/* <section className="mt-20 md:p-8 p-4 bg-sand dark:bg-fig">
          <span className="text-3xl font-bold">
            <Translate id="home.section3.title">Start Your Journey</Translate>
          </span>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-x-4 gap-y-4 w-full mt-8">
            <a
              href="https://faucet.celo.org"
              target={"_blank"}
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer "
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                <Translate id="home.section3.faucet.title">Faucet</Translate>
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                <Translate id="home.section3.faucet.description">
                  Fund your Testnet Account.
                </Translate>
              </span>
            </a>

            <a
              href="https://celoscan.io/"
              target={"_blank"}
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer "
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                <Translate id="home.section3.celoScan.title">
                  Celo Scan
                </Translate>
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                <Translate id="home.section3.celoScan.description">
                  Explore transactions on Celo Network.
                </Translate>
              </span>
            </a>
            <a
              href="/protocol/bridge"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer "
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                <Translate id="home.section3.celoBridge.title">
                  Celo Bridge
                </Translate>
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                <Translate id="home.section3.celoBridge.description">
                  How to bridge assets accross chains.
                </Translate>
              </span>
            </a>

            <Link
              href="/wallet"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer "
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                <Translate id="home.section3.wallets.title">Wallets</Translate>
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                <Translate id="home.section3.wallets.description">
                  Overview of ecosystem wallets.
                </Translate>
              </span>
            </Link>

            <Link
              href="/developer/sdks/celo-sdks"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer "
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                <Translate id="home.section3.celoLibraries.title">
                  Celo Libraries & SDKs
                </Translate>
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                <Translate id="home.section3.celoLibraries.description">
                  Search our vast range of libraries and SDKs.
                </Translate>
              </span>
            </Link>

            <Link
              href="/developer/deploy"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer "
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                <Translate id="home.section3.deploy.title">Deploy</Translate>
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                <Translate id="home.section3.deploy.description">
                  How to build and deploy a dApp.
                </Translate>
              </span>
            </Link>
          </div>
        </section> */}

        {/* section 5 */}

        <section className="mt-20 md:p-8 p-4 bg-sand dark:bg-fig">
          <div className="text-3xl text-center font-bold">
            <Translate id="home.section4.title">
              Explore Developer Tools & Resources
            </Translate>
          </div>

          <div className="grid md:grid-cols-4 grid-cols-1 gap-x-6 gap-y-4 w-full mt-8">
            <div className="items-center">
              <div className="text-2xl font-bold text-center">
                <Translate id="home.section4.understanding">
                  Understanding Celo
                </Translate>
              </div>
              {/* item 1 */}
              {sectionFourCard(
                translate({ id: "home.section4.understanding.whatIs.title" }),
                translate({
                  id: "Discover how Celo L2 is scaling real world use cases on Ethereum",
                }),
                "img/homepage/icons/WhatIsCelo_White.svg",
                "/what-is-celo",
              )}

              {sectionFourCard(
                translate({
                  id: "home.section4.understanding.architecture.title",
                }),
                translate({
                  id: "home.section4.understanding.architecture.description",
                }),
                "img/homepage/icons/Architechture_White.svg",
                "/what-is-celo/about-celo-l1/l1-architecture",
              )}

              {sectionFourCard(
                translate({
                  id: "home.section4.understanding.whitepapers.title",
                }),
                translate({
                  id: "home.section4.understanding.whitepapers.description",
                }),
                "img/homepage/icons/WhitePapers_white.svg",
                "https://celo.org/papers",
              )}

              {sectionFourCard(
                translate({ id: "home.section4.understanding.protocol.title" }),
                translate({
                  id: "home.section4.understanding.protocol.description",
                }),
                "img/homepage/icons/Protocol_White.svg",
                "/what-is-celo/about-celo-l1/protocol",
              )}
            </div>

            {/* item 2 */}

            <div className="items-center">
              <div className="text-2xl font-bold text-center">
                <Translate id="home.section4.build">Build with Celo</Translate>
              </div>
              {sectionFourCard(
                translate({ id: "home.section4.build.celoComposer.title" }),
                translate({
                  id: "home.section4.build.celoComposer.description",
                }),
                "img/homepage/icons/CLI_White.svg",
                "/build/quickstart",
              )}

              {sectionFourCard(
                translate({ id: "home.section4.build.migrate.title" }),
                translate({ id: "home.section4.build.migrate.description" }),
                "img/homepage/icons/NewToWeb3_White.svg",
                "/build",
              )}

              {sectionFourCard(
                translate({ id: "home.section4.build.oracles.title" }),
                translate({ id: "home.section4.build.oracles.description" }),
                "img/homepage/icons/ContractKit_White.svg",
                "/integration",
              )}

              {/*
              {sectionFourCard(
                translate({ id: "home.section4.build.architecture.title" }),
                translate({
                  id: "home.section4.build.architecture.description",
                }),
                "img/homepage/icons/NewToWeb3_White.svg",
                "/general/web2-to-web3",
              )}
              */}
            </div>

            <div className="items-center">
              <div className="text-2xl font-bold text-center">
                <Translate id="home.section4.developer">
                  Developer Tools
                </Translate>
              </div>
              {sectionFourCard(
                translate({ id: "home.section4.developer.faucet.title" }),
                translate({
                  id: "home.section4.developer.faucet.description",
                }),
                "img/homepage/icons/CeloComposer_White.svg",
                "https://faucet.celo.org/alfajores",
              )}

              {sectionFourCard(
                translate({
                  id: "home.section4.developer.rainbowKitCelo.title",
                }),
                translate({
                  id: "home.section4.developer.rainbowKitCelo.description",
                }),
                "img/homepage/icons/Oracle_White.svg",
                "/developer/explorers/overview",
              )}

              {sectionFourCard(
                translate({ id: "home.section4.developer.bridge.title" }),
                translate({
                  id: "home.section4.developer.bridge.description",
                }),
                "img/homepage/icons/Rainbow_White.svg",
                "/developer/bridges",
              )}

              {sectionFourCard(
                translate({ id: "home.section4.developer.deploy.title" }),
                translate({
                  id: "home.section4.developer.deploy.description",
                }),
                "img/homepage/icons/Migration_White.svg",
                "/developer/deploy",
              )}
            </div>

            <div className="items-center">
              <div className="text-2xl font-bold text-center">
                <Translate id="home.section4.validators">
                  Grow your Project
                </Translate>
              </div>
              {sectionFourCard(
                translate({
                  id: "home.section4.growYourProject.funding.title",
                }),
                translate({
                  id: "home.section4.growYourProject.funding.description",
                }),
                "img/homepage/icons/Validator_White.svg",
                "/build/fund-your-project",
              )}

              {sectionFourCard(
                translate({
                  id: "home.section4.growYourProject.distribution.title",
                }),
                translate({
                  id: "home.section4.growYourProject.distribution.description",
                }),
                "img/homepage/icons/Node_White.svg",
                "/developer/launch-checklist",
              )}
            </div>
          </div>
        </section>

        {/* section 5 end */}

        {/* section 6 */}

        <section className="mt-12">
          <div className="text-4xl font-semibold px-2 w-full">
            <Translate id="home2.section5.title">
              Join the Celo Builder Ecosystem
            </Translate>
          </div>
          <div className="text-xl font-medium px-2 w-full mt-2">
            <Translate id="home2.section5.subheader">
              Discover the many ways to connect with our growing community of
              developers
            </Translate>
          </div>

          <div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 w-full mt-2">
              {sectionFourCard(
                "Join the Newsletter",
                "Stay updated on the latest news, grants, and opportunities.",
                "img/homepage/ambassador.svg",
                "https://embeds.beehiiv.com/eeadfef4-2f0c-45ce-801c-b920827d5cd2",
              )}
              {sectionFourCard(
                "Connect with the Community",
                "Join our Discord",
                "img/homepage/connect.svg",
                "https://discord.com/invite/celo",
              )}
              {sectionFourCard(
                "Bring Your Ideas to Life",
                "Sign up for upcoming hackathons and workshops",
                "img/homepage/contribute.svg",
                "https://celo.lemonade.social/",
              )}
              {sectionFourCard(
                "Join Proof of Ship",
                "Build your onchain reputation to unlock exclusive rewards",
                "img/homepage/connect.svg",
                "https://celoplatform.notion.site/Build-With-Celo-Proof-of-Ship-17cd5cb803de8060ba10d22a72b549f8",
              )}
              {sectionFourCard(
                "Make your Voice Heard",
                "Vote on Governance Proposals",
                "img/homepage/connect.svg",
                "/what-is-celo/using-celo/protocol/governance/voting-in-governance",
              )}
              {sectionFourCard(
                "Get Daily Updates",
                "Follow our CeloDev on X",
                "img/homepage/ambassador.svg",
                "https://x.com/CeloDevs",
              )}
            </div>
          </div>
        </section>

        {/* <section className="mt-12">
          <div className="text-4xl font-semibold px-2 w-full">
            <Translate id="home.section5.title">Join Our Ecosystem</Translate>
          </div>
          <div className="px-2 flex flex-row flex-wrap w-full space-x-0 md:space-x-4 space-y-4 md:space-y-0 mt-8 ">
            <div className="flex-1 p-6 w-full flex flex-row flex-no-wrap bg-sand dark:bg-fig hover:cursor-pointer  ">
              <div className="w-2/3 flex flex-col justify-between h-full">
                <span className="text-3xl font-semibold pb-7">
                  <Translate id="home.section5.box2">
                    Receive Funding to Build Your Blockchain Projects
                  </Translate>
                </span>
                {buildKnowMoreButton("/community/grant-playbook")}
              </div>
            </div>
          </div>

          <div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 w-full mt-8">
              {sectionFourCard(
                "Celo dApp Launch Checklist",
                "A comprehensive guide to assist you in launching dapps on Celo.",
                "img/doc-images/logos/connect.svg",
                "/developer/launch-checklist",
              )}
              {sectionFourCard(
                translate({ id: "home.section6.contribute.title" }),
                translate({ id: "home.section6.contribute.description" }),
                "img/doc-images/logos/contribute.svg",
                "/what-is-celo/joining-celo",
              )}

              {sectionFourCard(
                translate({ id: "home.section6.connect.title" }),
                translate({ id: "home.section6.connect.description" }),
                "img/doc-images/logos/connect.svg",
                "https://celo.org/community",
              )}
            </div>
          </div>
        </section> */}

        {/* section 6 end */}
      </main>
    </Layout>
  );

  function buildKnowMoreButton(url: string, buttonText: string = "Learn more") {
    return (
      <Link href={url} target="_blank" className="flex space-x-2 items-center">
        <span className="text-lg font-semibold">{buttonText}</span>
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
