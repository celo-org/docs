import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Celo Basics',
    Svg: require('../../static/img/homepage/svg.svg').default,
    description: (
      <>    
        Learn about blockchain and the basics of the Celo protocol
      </>
    ),
  },
  {
    title: 'Dapp Developers',
    Svg: require('../../static/img/homepage/svg.svg').default,
    description: (
      <>
        Complete information including easy tutorials you need to build, deploy, and manage apps on Polygon.
      </>
    ),
  },
  {
    title: 'Celo SDK',
    Svg: require('../../static/img/homepage/svg.svg').default,
    description: (
      <>
        A modular and extensible framework for building Ethereum-compatible blockchain networks.
      </>
    ),
  },
  {
    title: 'Validators',
    Svg: require('../../static/img/homepage/svg.svg').default,
    description: (
      <>
        Learn how to stake with Celo, and setup your own nodes to maintain the network and earn rewards.
      </>
    ),
  },
  {
    title: 'Integrations',
    Svg: require('../../static/img/homepage/svg.svg').default,
    description: (
      <>
        Key information for projects looking to integrate with Celo. Wallets, developer tools, oracles, and more - get all the info you need.
      </>
    ),
  },
  {
    title: 'Core Contributors',
    Svg: require('../../static/img/homepage/svg.svg').default,
    description: (
      <>
        Contribute and get involved with the Polygon code base. Spin up a local testnet, or just submit a Pull Request on one of our repos.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
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
