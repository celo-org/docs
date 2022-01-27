import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Learn the basics',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Join the mission to build a financial system that creates the conditions for prosperity—for everyone.</>
    ),
    link: (
      <a href="/welcome">Get started with Celo</a>
    ),
  },
  {
    title: 'Build on Celo',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Build, deploy, and manage applications on the Celo network.</>
    ),
    link: (
      <a href="/developer-guide/overview">Start building</a>
    ),
  },
  {
    title: 'Secure the network',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Setup Celo nodes to maintain the network and earn rewards.</>
    ),
    link: (
      <a href="/validator-guide/overview">Run a node</a>
    ),
  },
  {
    title: 'Contribute to Celo',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Start sending, spending, and earning crypto from your mobile phone.</>
    ),
    link: (
      <a href="/community/contributing">Use the Celo network</a>
    ),
  },
  {
    title: 'Learn by coding',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Gain the skills you need to get the most from the Celo platform.</>
    ),
    link: (
      // <a href="https://deploy-preview-154--celo-docs.netlify.app/learn/celo-overview">Learn Celo</a>
      <a href="/blog/">Learn more with Celo</a>
    ),
  },
  {
    title: 'Join the Discussion',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Join a community of developers, designers, dreamers, and doers.</>
    ),
    link: (
      <a href="https://discord.com/invite/atBpDfqQqX">Join Discord</a>
    ),
  },
];

function Feature({title, description, link}) {
  return (
    <div className={clsx('col col--4')}>
      {/* <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div> */}
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{link}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
