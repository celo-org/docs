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
        <section className="w-full flex md:flex-row flex-col items-center px-2 md:px-10">
          <div className="md:w-1/2 w-full">
            <span className="text-4xl font-bold text-center space-x-5">
              Build decentralized applications that create the conditions for
              prosperity — for everyone.
            </span>
          </div>
          <img
            className="md:w-1/2 w-full mt-5 md:mt-0"
            src="img/logo-cube-animation.gif"
          />
        </section>

        <section className="mt-12">
          <div className="text-3xl font-bold px-2 w-full">
            Learn How to Build with Celo
          </div>
          <div className="px-2 flex flex-row flex-wrap w-full space-x-0 md:space-x-4 space-y-4 md:space-y-0 mt-8">
            <div className="flex-1 p-6 w-full flex flex-row flex-no-wrap dark:bg-fig bg-gypsum">
              <div className="w-2/3 flex flex-col justify-between h-full">
                <span className="text-3xl font-semibold">
                  Get started with Celo Composer CLI
                </span>
                {buildKnowMoreButton("/developer/deploy")}
              </div>
              <div className="w-1/3">
                <img src="/img/homepage/illustration-1.png" />
              </div>
            </div>

            <div className="flex-1 p-6 w-full flex flex-row flex-no-wrap dark:bg-fig bg-gypsum">
              <div className="w-2/3 flex flex-col justify-between h-full">
                <span className="text-3xl font-semibold">
                  Learn smart contract development with us
                </span>
                {buildKnowMoreButton("/tutorials")}
              </div>
              <div className="w-1/3">
                <img src="/img/homepage/illustration-2.png" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mt-12">
          <div className="text-3xl font-bold mx-2">
            Explore Providers and Frameworks
          </div>
          <div className="px-2 grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-x-4 gap-y-4 mt-8">
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
              href="/developer/deploy/truffle"
              className="hover:no-underline flex-1 p-4 items-center space-x-4 flex flex-row flex-no-wrap dark:bg-fig bg-gypsum font-semibold"
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
        <section className="mt-20 md:p-8 p-4 bg-sand dark:bg-fig">
          <span className="text-3xl font-bold">Start Your Journey</span>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-x-4 gap-y-4 w-full mt-8">
            <a
              href="https://celo.org/developers/faucet"
              target={"_blank"}
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer "
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                Faucet
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                Fund your Testnet Account.
              </span>
            </a>

            <a
              href="https://celoscan.io/"
              target={"_blank"}
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer "
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                Celo Scan
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                Explore transactions on Celo Network.
              </span>
            </a>
            <a
              href="/protocol/bridge"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer "
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                Celo Bridge
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                How to bridge assets accross chains.
              </span>
            </a>

            <Link
              href="/wallet"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer "
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                Wallets
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                Overview of ecosystem wallets.
              </span>
            </Link>

            <Link
              href="/developer/sdks/celo-sdks"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer "
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                Celo Libraries & SDKs
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                Search our vast range of libraries and SDKs.
              </span>
            </Link>

            <Link
              href="/developer/deploy"
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer "
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                Deploy
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                How to build and deploy a dApp.
              </span>
            </Link>
          </div>
        </section>

        {/* section 4 */}

        <section className="mt-20 md:p-8 p-4 bg-sand dark:bg-fig">
          <div className="text-3xl text-center font-bold">
            Browse our Docs by Category
          </div>

          <div className="grid md:grid-cols-4 grid-cols-1 gap-x-6 gap-y-4 w-full mt-8">
            <div className="items-center">
              <div className="text-2xl font-bold text-center">
                Understanding Celo
              </div>
              {/* item 1 */}
              {sectionFourCard(
                "What is Celo?",
                "Learn the basics about our Layer 1 approach",
                "img/doc-images/logos/bullet.svg",
                "/general"
              )}

              {sectionFourCard(
                "Architecture",
                "Overview of our stack and core contracts",
                "img/doc-images/logos/bullet.svg",
                "/general/architecture"
              )}

              {sectionFourCard(
                "Whitepapers",
                "Dive in to understand our protocol and social impact",
                "img/doc-images/logos/bullet.svg",
                "/general/whitepapers"
              )}

              {sectionFourCard(
                "Protocol",
                "Learn about our protocol and its relationship to Ethereum",
                "img/doc-images/logos/bullet.svg",
                "/protocol"
              )}
            </div>

            {/* item 2 */}

            <div className="items-center">
              <div className="text-2xl font-bold text-center">
                Developer Tools
              </div>
              {sectionFourCard(
                "ContractKit",
                "Explore Contractkit usage and features",
                "img/doc-images/logos/bullet.svg",
                "/developer/contractkit"
              )}

              {sectionFourCard(
                "React-celo",
                "Access Contractkit in React applications",
                "img/doc-images/logos/bullet.svg",
                "/developer/react-celo"
              )}

              {sectionFourCard(
                "RainbowKit-celo",
                "Add a wallet connection to dapps using Rainbowkit",
                "img/doc-images/logos/bullet.svg",
                "/developer/rainbowkit-celo"
              )}

              {sectionFourCard(
                "Celo CLI",
                "Interact with Celo Blockchain and its core smart contract",
                "img/doc-images/logos/bullet.svg",
                "/cli"
              )}
            </div>

            <div className="items-center">
              <div className="text-2xl font-bold text-center">
                Build with Celo
              </div>
              {sectionFourCard(
                "Celo composer",
                "Build and deploy your dapp in under 5 minutes",
                "img/doc-images/logos/bullet.svg",
                "developer/deploy"
              )}

              {sectionFourCard(
                "Migrate to Celo",
                "Review the compatibility of Celo and Ethereum",
                "img/doc-images/logos/bullet.svg",
                "/developer/migrate/from-ethereum"
              )}

              {sectionFourCard(
                "Oracles",
                "Check out our on-chain Oracles",
                "img/doc-images/logos/bullet.svg",
                "/protocol/oracle"
              )}
            </div>

            <div className="items-center">
              <div className="text-2xl font-bold text-center">Validators</div>
              {sectionFourCard(
                "Run a Validator",
                "Secure the network by running a validator",
                "img/doc-images/logos/bullet.svg",
                "/validator"
              )}

              {sectionFourCard(
                "Node and Services",
                "Connect to nodes and services",
                "img/doc-images/logos/bullet.svg",
                "/validator/security"
              )}

              {sectionFourCard(
                "Attestation Service",
                "How to run an attestation service",
                "img/doc-images/logos/bullet.svg",
                "/validator/attestation"
              )}
            </div>
          </div>
        </section>

        {/* section 4 end */}

        {/* section 5 */}

        <section className="mt-12">
          <div className="text-4xl font-semibold px-2 w-full">
            Join Our Ecosystem
          </div>
          <div className="px-2 flex flex-row flex-wrap w-full space-x-0 md:space-x-4 space-y-4 md:space-y-0 mt-8 ">
            <div className="flex-1 p-6 w-full flex flex-row flex-no-wrap bg-sand dark:bg-fig hover:cursor-pointer  ">
              <div className="w-2/3 flex flex-col justify-between h-full">
                <span className="text-3xl font-semibold pb-7">
                  Create, Earn, and Grow as a Celo Sage Content Creator
                </span>
                {buildKnowMoreButton("/community/celo-sage")}
              </div>
              {/* <div className="w-8/12">
                <img
                  className="rounded-md"
                  src="/img/homepage/celo-sage.webp"
                />
              </div> */}
            </div>

            <div className="flex-1 p-6 w-full flex flex-row flex-no-wrap bg-sand dark:bg-fig hover:cursor-pointer  ">
              <div className="w-2/3 flex flex-col justify-between h-full">
                <span className="text-3xl font-semibold pb-7">
                  Receive Funding to Build Your Blockchain Projects
                </span>
                {buildKnowMoreButton("/community/grant-playbook")}
              </div>
              {/* <div className="w-1/2">
                <img src="/img/homepage/celo-camp.webp" />
              </div> */}
            </div>
          </div>

          <div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 w-full mt-8">
              {sectionFourCard(
                "Contribute",
                "Our community includes a group of contributors that help develop, write, translate and improve Celo. Anyone is welcome to join the community and contribute their skills to help empower other community members and grow the Celo ecosystem.",
                "img/doc-images/logos/contribute.svg",
                "/community/guidelines"
              )}

              {sectionFourCard(
                "Ambassadors",
                "Celo Ambassadors is a community driven initiative helping grow and support the Celo ecosystem of developers, designers, dreamers, and doers around the world.",
                "img/doc-images/logos/ambassador.svg",
                "https://celocommunity.xyz/join-the-ambassador-program"
              )}

              {sectionFourCard(
                "Connect with our community",
                "Join and connect with our team and community of doers on discord. its a space where you can share and immerse yourself in a wealth of knowledge and information.",
                "img/doc-images/logos/connect.svg",
                "https://celo.org/community"
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
      <Link href={url} target="_blank" className="flex space-x-2 items-center">
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
      </Link>
    );
  }
}

export const sectionFourCard = (
  title: string,
  description: string,
  url: string,
  redirectUrl: string
) => (
  <Link
    href={redirectUrl}
    className="text-black bg-gypsum dark:bg-fig dark:text-white flex items-start gap-x-4 mt-8 hover:bg-forest hover:text-snow dark:hover:bg-forest transition hover:ease-in-out duration-150 pt-5 px-4 cursor-pointer hover:no-underline"
  >
    <img src={url} alt={title} className="w-10 h-10 rounded-full" />
    <div>
      <h4 className="font-bold">{title}</h4>
      <p className="text-sm">{description}</p>
    </div>
  </Link>
);
