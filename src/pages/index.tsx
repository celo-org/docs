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
              <Translate id="home.header.title">
                Build decentralized applications that create the conditions for
                prosperity — for everyone.
              </Translate>
            </span>
          </div>
          <img
            className="md:w-1/2 w-full mt-5 md:mt-0"
            src="img/logo-cube-animation.gif"
          />
        </section>

        <section className="mt-12">
          <div className="text-3xl font-bold px-2 w-full">
            <Translate id="home.section1.title">
              Learn How to Build with Celo
            </Translate>
          </div>
          <div className="px-2 flex flex-row flex-wrap w-full space-x-0 md:space-x-4 space-y-4 md:space-y-0 mt-8">
            <div className="flex-1 p-6 w-full flex flex-row flex-no-wrap dark:bg-fig bg-gypsum">
              <div className="w-2/3 flex flex-col justify-between h-full">
                <span className="text-3xl font-semibold">
                  <Translate id="home.section1.box1">
                    Get started with Celo Composer CLI
                  </Translate>
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
                  <Translate id="home.section1.box2">
                    Learn smart contract development with us
                  </Translate>
                </span>
                {buildKnowMoreButton("/tutorials")}
              </div>
              <div className="w-1/3">
                <img src="/img/homepage/illustration-2.png" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mt-12">
          <div className="text-3xl font-bold mx-2">
            <Translate id="home.section2.title">
              Explore Providers and Frameworks
            </Translate>
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

        {/* Section 4 */}
        <section className="mt-20 md:p-8 p-4 bg-sand dark:bg-fig">
          <span className="text-3xl font-bold">
            <Translate id="home.section3.title">
              Start Your Journey
            </Translate>
          </span>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-x-4 gap-y-4 w-full mt-8">
            <a
              href="https://faucet.celo.org"
              target={"_blank"}
              className="hover:no-underline px-5 py-5 items-start flex flex-col flex-no-wrap bg-gypsum dark:bg-fig hover:cursor-pointer "
            >
              <span className="font-semibold text-2xl text-black dark:text-white">
                <Translate id="home.section3.faucet.title">
                  Faucet
                </Translate>
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
                <Translate id="home.section3.wallets.title">
                  Wallets
                </Translate>
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
                <Translate id="home.section3.deploy.title">
                  Deploy
                </Translate>
              </span>
              <span className="text-base text-black dark:text-prosperity mt-1">
                <Translate id="home.section3.deploy.description">
                  How to build and deploy a dApp.
                </Translate>
              </span>
            </Link>
          </div>
        </section>

        {/* section 5 */}

        <section className="mt-20 md:p-8 p-4 bg-sand dark:bg-fig">
          <div className="text-3xl text-center font-bold">
            <Translate id="home.section4.title">
              Browse our Docs by Category
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
                translate({ id:"home.section4.understanding.whatIs.title" }),
                translate({ id:"home.section4.understanding.whatIs.description" }),
                "img/doc-images/logos/bullet.svg",
                "/general"
              )}

              {sectionFourCard(
                translate({ id:"home.section4.understanding.architecture.title" }),
                translate({ id:"home.section4.understanding.architecture.description" }),
                "img/doc-images/logos/bullet.svg",
                "/general/architecture"
              )}

              {sectionFourCard(
                translate({ id:"home.section4.understanding.whitepapers.title" }),
                translate({ id:"home.section4.understanding.whitepapers.description" }),
                "img/doc-images/logos/bullet.svg",
                "/general/whitepapers"
              )}

              {sectionFourCard(
                translate({ id:"home.section4.understanding.protocol.title" }),
                translate({ id:"home.section4.understanding.protocol.description" }),
                "img/doc-images/logos/bullet.svg",
                "/protocol"
              )}
            </div>

            {/* item 2 */}

            <div className="items-center">
              <div className="text-2xl font-bold text-center">
                <Translate id="home.section4.developer">
                  Developer Tools
                </Translate>
              </div>
              {sectionFourCard(
                translate({ id:"home.section4.developer.contractKit.title" }),
                translate({ id:"home.section4.developer.contractKit.description" }),
                "img/doc-images/logos/bullet.svg",
                "/developer/contractkit"
              )}

              {sectionFourCard(
                translate({ id:"home.section4.developer.reactCelo.title" }),
                translate({ id:"home.section4.developer.reactCelo.description" }),
                "img/doc-images/logos/bullet.svg",
                "/developer/react-celo"
              )}

              {sectionFourCard(
                translate({ id:"home.section4.developer.rainbowKitCelo.title" }),
                translate({ id:"home.section4.developer.rainbowKitCelo.description" }),
                "img/doc-images/logos/bullet.svg",
                "/developer/rainbowkit-celo"
              )}

              {sectionFourCard(
                translate({ id:"home.section4.developer.celoCli.title" }),
                translate({ id:"home.section4.developer.celoCli.description" }),
                "img/doc-images/logos/bullet.svg",
                "/cli"
              )}
            </div>

            <div className="items-center">
              <div className="text-2xl font-bold text-center">
                <Translate id="home.section4.build">
                  Build with Celo
                </Translate>
              </div>
              {sectionFourCard(
                translate({ id:"home.section4.build.celoComposer.title" }),
                translate({ id:"home.section4.build.celoComposer.description" }),
                "img/doc-images/logos/bullet.svg",
                "developer/deploy"
              )}

              {sectionFourCard(
                translate({ id:"home.section4.build.migrate.title" }),
                translate({ id:"home.section4.build.migrate.description" }),
                "img/doc-images/logos/bullet.svg",
                "/developer/migrate/from-ethereum"
              )}

              {sectionFourCard(
                translate({ id:"home.section4.build.oracles.title" }),
                translate({ id:"home.section4.build.oracles.description" }),
                "img/doc-images/logos/bullet.svg",
                "/protocol/oracle"
              )}

              {sectionFourCard(
                translate({ id:"home.section4.build.architecture.title" }),
                translate({ id:"home.section4.build.architecture.description" }),
                "img/doc-images/logos/bullet.svg",
                "/general/web2-to-web3"
              )}
            </div>

            <div className="items-center">
              <div className="text-2xl font-bold text-center">
                <Translate id="home.section4.validators">
                  Validators
                </Translate>
              </div>
              {sectionFourCard(
                translate({ id:"home.section4.validators.run.title" }),
                translate({ id:"home.section4.validators.run.description" }),
                "img/doc-images/logos/bullet.svg",
                "/validator"
              )}

              {sectionFourCard(
                translate({ id:"home.section4.validators.node.title" }),
                translate({ id:"home.section4.validators.node.description" }),
                "img/doc-images/logos/bullet.svg",
                "/validator/security"
              )}

              {sectionFourCard(
                translate({ id:"home.section4.validators.attestation.title" }),
                translate({ id:"home.section4.validators.attestation.description" }),
                "img/doc-images/logos/bullet.svg",
                "/validator/attestation"
              )}
            </div>
          </div>
        </section>

        {/* section 5 end */}

        {/* section 6 */}

        <section className="mt-12">
          <div className="text-4xl font-semibold px-2 w-full">
            <Translate id="home.section5.title">
              Join Our Ecosystem
            </Translate>
          </div>
          <div className="px-2 flex flex-row flex-wrap w-full space-x-0 md:space-x-4 space-y-4 md:space-y-0 mt-8 ">
            <div className="flex-1 p-6 w-full flex flex-row flex-no-wrap bg-sand dark:bg-fig hover:cursor-pointer  ">
              <div className="w-2/3 flex flex-col justify-between h-full">
                <span className="text-3xl font-semibold pb-7">
                  <Translate id="home.section5.box1">
                    Create, Earn, and Grow as a Celo Sage Content Creator
                  </Translate>
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
                  <Translate id="home.section5.box2">
                    Receive Funding to Build Your Blockchain Projects
                  </Translate>
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
                translate({ id:"home.section6.contribute.title" }),
                translate({ id:"home.section6.contribute.description" }),
                "img/doc-images/logos/contribute.svg",
                "/community/guidelines"
              )}

              {sectionFourCard(
                translate({ id:"home.section6.ambassadors.title" }),
                translate({ id:"home.section6.ambassadors.description" }),
                "img/doc-images/logos/ambassador.svg",
                "https://celocommunity.xyz/join-the-ambassador-program"
              )}

              {sectionFourCard(
                translate({ id:"home.section6.connect.title" }),
                translate({ id:"home.section6.connect.description" }),
                "img/doc-images/logos/connect.svg",
                "https://celo.org/community"
              )}
            </div>
          </div>
        </section>

        {/* section 6 end */}
      </main>
    </Layout>
  );

  function buildKnowMoreButton(url: string) {
    return (
      <Link href={url} target="_blank" className="flex space-x-2 items-center">
        <span className="text-lg font-semibold">
          <Translate id="home.general.knowMore">
            Know more
          </Translate>
        </span>
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
