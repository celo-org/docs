import React from "react";
import Layout from "@theme/Layout";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "../components/HomepageFeatures";
import Card from "./components/Card";
import TutorialCard from "./components/TutorialCrad/index";
import { data } from "./components/TutorialCrad/data";
import { sectionA, sectionB, sectionC, sectionD } from "./dummyData";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      {/* container start */}
      <div className="container">
        {/* top div */}
        <div className={styles.topSection}>
          <div className={styles.headerDiv}>
            <h1 className={styles.headerTitle}>Celo Developer Documentation</h1>
            <h2>Overview</h2>
          </div>
          <div className={styles.overview}>
            <p className={styles.overviewText}>
              Celo is a mobile-first blockchain that makes decentralized
              financial (DeFi) tools and services accessible to anyone with a
              mobile phone. It aims to break down barriers by bringing the
              powerful benefits of DeFi to the users of the 6 billion
              smartphones in circulation today. Use this documentation as your
              guide into the Celo ecosystem!
            </p>

            <button className={styles.button}>Get started on Celo </button>
          </div>
        </div>
        {/* top div */}

        {/* setup and five mins */}
        <div className={styles.section}>
          <h2>Set up your environment and get started on building on Celo</h2>
        </div>
        <div>
          <div className={styles.container}>
            {sectionA.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </div>
        </div>
        {/* setup and five mins */}

        {/* learn celo and explore sdk */}
        <div className={styles.section}>
          <h2>Learn about Celo and explore our SDKs</h2>
        </div>
        <div>
          <div className={styles.container}>
            {sectionB.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </div>
        </div>
        {/* learn celo and explore sdk */}

        {/* next section */}
        <div className={styles.section}>
          <h2>Run a Celo Node</h2>
        </div>
        <div>
          <div className={styles.container}>
            {sectionC.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </div>
        </div>
        {/* next section */}

        {/* las section */}
        <div className={styles.section}>
          <h2>Build Dapps with SDKs and KITs</h2>
        </div>
        <div>
          <div className={styles.container}>
            {sectionD.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </div>
        </div>
        {/* last section */}

        {/* exolore tutorial */}
        <div className={styles.tutorialSection}>
          <div>
            <h2>Browse through our curated tutorials </h2>
            <p>
              Dive in and explore our array of tutorials on building on Celo to
              get you ramped up in no time!
            </p>
          </div>

          <div className={styles.tutorial}>
            {data.map((item, index) => (
              <TutorialCard key={index} item={item} />
            ))}
          </div>
        </div>
        {/* explre tutorials */}

        {/* as question and contribute */}

        <div className={styles.engage}>
          <div className={styles.engageHeader}>
            <h2 className={styles.engageHeaderText}>Enagage and Network</h2>
          </div>
          <div className={styles.engageBody}>
            <p>
              Join our discord channel and engage with our community of
              developers. We have something for everyone and every stack. Ask
              our team questions and answer questions others might have.
              Collaborate and build great things!
            </p>
          </div>
        </div>
        {/* as question and contribute */}

        {/* Explore and Contribute*/}

        <div className={styles.engage}>
          <div className={styles.engageHeader}>
            <h2 className={styles.engageHeaderText}>Explore and Contribute</h2>
          </div>
          <div className={styles.engageBody}>
            <p>
              Explore our vast array of tooling and projects and create PRs to
              contribute! We look forward to your contributions to our various
              repositories and payout bounties for accepted contributions!{" "}
            </p>
            <h4> check out some notable projects you can contribute to: </h4>
            <ul>
              <li>Celo composer</li>
              <li>Rect Celo</li>
              <li>Go Celo</li>
              <li>Celo Sage</li>
            </ul>
          </div>
        </div>
        {/* as question and contribute */}

        {/* connect */}

        <div className={styles.engage}>
          <div className={styles.engageHeader}>
            <h2 className={styles.engageHeaderText}>Connect with us</h2>
          </div>
          <div className={styles.engageBody}>
            <p>
              Connect with us on various platforms and also join our weekly
              office hours on discord!
            </p>
            <ul>
              <li>Discord</li>
              <li>Twitter</li>
              <li>Medium</li>
              <li>Telegram</li>
              <li>Forum</li>
            </ul>
          </div>
        </div>
        {/* connect */}

        {/* container end */}
      </div>
    </header>
  );
}

function HomePageSection() {
  return <div></div>;
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main>
        <HomepageHeader />

        <HomePageSection />
      </main>
    </Layout>
  );
}
