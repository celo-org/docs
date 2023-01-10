/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { translate } from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import "./index.module.css";

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
      <main className="margin-vert--lg max-w-7xl mx-auto px-4">
        <section className="w-full flex md:flex-row flex-col items-center px-2 md:px-10">
          <div className="md:w-1/2 w-full">
            <span className="text-4xl font-bold text-center space-x-5">
              Build decentralized applications that create the conditions for
              prosperity — for everyone.
            </span>
          </div>
          <img
            className="md:w-1/2 w-full rounded-xl mt-5 md:mt-0"
            src="img/doc-images/logos/hero.webp"
          />
        </section>

        <section className="mt-12">
          <div className="text-3xl font-bold px-2 w-full">
            Learn how to build on Celo
          </div>
          <div className="px-2 flex flex-row flex-wrap w-full space-x-0 md:space-x-4 space-y-4 md:space-y-0 mt-8">
            <div className="flex-1 p-6 w-full flex flex-row flex-no-wrap dark:bg-gray-700 bg-gray-200  rounded-lg">
              <div className="w-2/3 flex flex-col justify-between h-full">
                <span className="text-3xl font-semibold">
                  Use Celo Composer CLI and start building in Celo
                </span>
                {buildKnowMoreButton("https://google.com")}
              </div>
              <div className="w-1/3">
                <img src="/img/homepage/illustration-1.png" />
              </div>
            </div>

            <div className="flex-1 p-6 w-full flex flex-row flex-no-wrap dark:bg-gray-700 bg-gray-200 rounded-lg">
              <div className="w-2/3 flex flex-col justify-between h-full">
                <span className="text-3xl font-semibold">
                  Learn Celo smart contract development from out tutorials
                </span>
                {buildKnowMoreButton("https://google.com")}
              </div>
              <div className="w-1/3">
                <img src="/img/homepage/illustration-2.png" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mt-12">
          <div className="text-3xl font-bold mx-2">Start building</div>
          <div className="px-2 grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-x-4 gap-y-4 mt-8">
            <a
              href="#"
              target="_blank"
              className="hover:no-underline flex-1 p-4  items-center space-x-4 flex flex-row flex-no-wrap dark:bg-gray-700 bg-gray-200 rounded-lg font-semibold"
            >
              <img
                src="img/doc-images/logos/infura-logo.webp"
                alt="Infura Logo"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-black dark:text-white">Infura</span>
            </a>
            <a
              href="#"
              target="_blank"
              className="hover:no-underline flex-1 p-4  items-center space-x-4 flex flex-row flex-no-wrap dark:bg-gray-700 bg-gray-200 rounded-lg font-semibold"
            >
              <img
                src="img/doc-images/logos/quicknode-logo.webp"
                alt="Infura Logo"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-black dark:text-white">QuickNode</span>
            </a>
            <a
              href="#"
              target="_blank"
              className="hover:no-underline flex-1 p-4  items-center space-x-4 flex flex-row flex-no-wrap dark:bg-gray-700 bg-gray-200 rounded-lg font-semibold"
            >
              <img
                src="img/doc-images/logos/hardhat-logo.webp"
                alt="Infura Logo"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-black dark:text-white">Hardhat</span>
            </a>
            <a
              href="#"
              target="_blank"
              className="hover:no-underline flex-1 p-4 items-center space-x-4 flex flex-row flex-no-wrap dark:bg-gray-700 bg-gray-200 rounded-lg font-semibold"
            >
              <img
                src="img/doc-images/logos/truffle-logo.webp"
                alt="Infura Logo"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-black dark:text-white">Truffle</span>
            </a>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mt-20 md:p-8 p-4 bg-gray-300 dark:bg-gray-800 rounded-lg">
          <span className="text-3xl font-bold">
            Jumpstart your build journey
          </span>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-x-4 gap-y-4 w-full mt-8">
            <a
              href="https://celo.org/developers/faucet"
              target={"_blank"}
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gray-100 dark:bg-gray-900 hover:cursor-pointer rounded-lg"
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                Faucet
              </span>
              <span className="text-base text-gray-700 dark:text-gray-200 mt-1">
                Fund your Testnet Account
              </span>
            </a>

            <a
              href="https://celoscan.io/"
              target={"_blank"}
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gray-100 dark:bg-gray-900 hover:cursor-pointer rounded-lg"
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                Celo Scan
              </span>
              <span className="text-base text-gray-700 dark:text-gray-200 mt-1">
                Explore transactions on Celo Network
              </span>
            </a>
            <a
              href="/protocol/bridge"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gray-100 dark:bg-gray-900 hover:cursor-pointer rounded-lg"
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                Celo Bridge
              </span>
              <span className="text-base text-gray-700 dark:text-gray-200 mt-1">
                How to bridge assets from Ethereum, Polygon, and Solana to Celo.
              </span>
            </a>

            <a
              href="/wallet"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gray-100 dark:bg-gray-900 hover:cursor-pointer rounded-lg"
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                Wallets
              </span>
              <span className="text-base text-gray-700 dark:text-gray-200 mt-1">
                Overview of digital wallets available to send, spend, and earn
                Celo assets.
              </span>
            </a>

            <a
              href="/wallet"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gray-100 dark:bg-gray-900 hover:cursor-pointer rounded-lg"
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                Wallets
              </span>
              <span className="text-base text-gray-700 dark:text-gray-200 mt-1">
                Overview of digital wallets available to send, spend, and earn
                Celo assets.
              </span>
            </a>

            <a
              href="/developer/deploy"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gray-100 dark:bg-gray-900 hover:cursor-pointer rounded-lg"
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                Deploy
              </span>
              <span className="text-base text-gray-700 dark:text-gray-200 mt-1">
                How to build and deploy a dApp with Celo.
              </span>
            </a>

            {/* <div className="px-5 py-5 w-1/3 items-start flex flex-col flex-no-wrap bg-gray-100 dark:bg-gray-900 rounded-lg">
              <img
                src="https://img.icons8.com/3d-fluency/94/null/search.png"
                className="bg-gray-200 p-3 rounded-lg"
              />
              <span className="font-semibold text-2xl mt-10">Celo Scan</span>
              <span className="text-sm text-gray-700 dark:text-gray-200 mt-1">
                Explore transactions on Celo Network
              </span>
            </div>

            <div className="px-5 py-5 w-1/3 items-start flex flex-col flex-no-wrap bg-gray-100 dark:bg-gray-900 rounded-lg">
              <img
                src="https://img.icons8.com/3d-fluency/94/null/point-objects.png"
                className="bg-gray-200 p-3 rounded-lg"
              />
              <span className="font-semibold text-2xl mt-10">Celo Bridge</span>
              <span className="text-sm text-gray-700 dark:text-gray-200 mt-1">
                How to bridge assets from Ethereum, Polygon, and Solana to Celo.
              </span>
            </div> */}
          </div>
        </section>

        {/* section 4 */}

        <section className="mt-20 md:p-8 p-4 bg-gray-300 dark:bg-gray-800 rounded-lg">
          <div className="text-3xl text-center font-bold">
            Browse our Docs by Category
          </div>

          <div className="grid md:grid-cols-4 grid-cols-1 gap-x-6 gap-y-4 w-full mt-8">
            <div className="items-center">
              <div className="text-2xl font-bold">Understanding Celo</div>
              {/* item 1 */}
              {sectionFourCard(
                "what is Celo?",
                "Learn the basics about Celo",
                "img/doc-images/logos/color-logo.png"
              )}

              {sectionFourCard(
                "Architecture",
                "Overview of the Celo stack including core contracts and applications",
                "img/doc-images/logos/arch.png"
              )}

              {sectionFourCard(
                "Whitepapers",
                "Overview of the Celo whitepapers describing the Celo protocol and social impact",
                "img/doc-images/logos/whitepaper.png"
              )}

              {sectionFourCard(
                "Protocol",
                "Learn about the Celo protocol and its relationship to Ethereum",
                "img/doc-images/logos/protocol.png"
              )}
            </div>

            {/* item 2 */}

            <div className="items-center">
              <div className="text-2xl font-bold">Developer Tools</div>
              {sectionFourCard(
                "ContractKit",
                "Overview of ContractKit, features and purpose",
                "img/doc-images/logos/contractKit.png"
              )}

              {sectionFourCard(
                "React-celo",
                "Easiest way to access ContractKit in your React applications",
                "img/doc-images/logos/react.png"
              )}

              {sectionFourCard(
                "RainbowKit-celo",
                "Overview of RainbowKit-celo",
                "img/doc-images/logos/rainbow.svg"
              )}

              {sectionFourCard(
                "Celo CLI",
                "Use Celo CLI to interact with the Celo blockchain",
                "img/doc-images/logos/cli.png"
              )}
            </div>

            <div className="items-center">
              <div className="text-2xl font-bold">Build on Celo</div>
              {sectionFourCard(
                "Celo composer",
                "Build and deploy your dApp under 5 minutes",
                "img/doc-images/logos/composer.png"
              )}

              {sectionFourCard(
                "Migrate to Celo",
                "Overview of similarities and differences between Celo and Ethereum",
                "img/doc-images/logos/color-logo.png"
              )}

              {sectionFourCard(
                "Oracles",
                "Explore onchain Oracles on Celo",
                "img/doc-images/logos/oracle.png"
              )}
            </div>

            <div className="items-center">
              <div className="text-2xl font-bold">Validators</div>
              {sectionFourCard(
                "Run a Validator",
                "Secure the Celo network by running a validator",
                "img/doc-images/logos/validate.png"
              )}

              {sectionFourCard(
                "Node and Services",
                "Connect to nodes and services on Celo",
                "img/doc-images/logos/node.png"
              )}

              {sectionFourCard(
                "Attestation Service",
                "How to run an attestation service on Celo",
                "img/doc-images/logos/attest.png"
              )}
            </div>
          </div>
        </section>

        {/* section 4 end */}

        {/* section 5 */}

        <section className="mt-12">
          <div className="text-4xl font-semibold px-2 w-full">
            Join our booming ecosystem
          </div>
          <div className="px-2 flex flex-row flex-wrap w-full space-x-0 md:space-x-4 space-y-4 md:space-y-0 mt-8 ">
            <div className="flex-1 p-6 w-full flex flex-row flex-no-wrap bg-gray-100 dark:bg-gray-900 hover:cursor-pointer  rounded-lg">
              <div className="w-2/3 flex flex-col justify-between h-full">
                <span className="text-3xl font-semibold">
                  Create, earn, and grow as a Celo content creator
                </span>
                {buildKnowMoreButton("https://google.com")}
              </div>
              <div className="w-8/12">
                <img
                  className="rounded-md"
                  src="/img/homepage/celo-sage.webp"
                />
              </div>
            </div>

            <div className="flex-1 p-6 w-full flex flex-row flex-no-wrap bg-gray-100 dark:bg-gray-900 hover:cursor-pointer  rounded-lg">
              <div className="w-2/3 flex flex-col justify-between h-full">
                <span className="text-3xl font-semibold">
                  Receive Funding to Build Your Blockchain Projects
                </span>
                {buildKnowMoreButton("https://google.com")}
              </div>
              <div className="w-1/2">
                <img src="/img/homepage/celo-camp.webp" />
              </div>
            </div>
          </div>

          <div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 w-full mt-8">
              {sectionFourCard(
                "Contribute",
                "Our community includes a group of contributors that help develop, write, translate and improve Celo. Anyone is welcome to join the community and contribute their skills to help empower other community members and grow the Celo ecosystem.",
                "img/doc-images/logos/volunteer.png"
              )}

              {sectionFourCard(
                "Ambassadors",
                "Celo Ambassadors is a community driven initiative helping grow and support the Celo ecosystem of developers, designers, dreamers, and doers around the world.",
                "img/doc-images/logos/ambassador.png"
              )}

              {sectionFourCard(
                "Connect with our community",
                "Join and connect with our team and community of doers on discord. its a space where you can share and immerse yourself in a wealth of knowledge and information.",
                "img/doc-images/logos/connect.png"
              )}
            </div>
          </div>
        </section>

        {/* section 5 end */}
      </main>
    </Layout>
  );

  function buildKnowMoreButton(url: string) {
    return (
      <a href={url} target="_blank" className="flex space-x-2 items-center">
        <span className="text-lg font-semibold">Know more </span>
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
      </a>
    );
  }
}

export const sectionFourCard = (
  title: string,
  description: string,
  url: string
) => (
  <div className="flex items-center gap-x-4 mt-8 hover:text-green-400  transition hover:ease-in-out duration-150">
    <img src={url} alt="Infura Logo" className="w-10 h-10 rounded-full" />
    <div>
      <h4 className="font-bold">{title}</h4>
      <p className="text-sm">{description}</p>
    </div>
  </div>
);
