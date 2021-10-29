import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Celo Basics',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Learn about blockchain and the basics of the Celo protocol.</>
    ),
    link: (
      <a href="https://deploy-preview-154--celo-docs.netlify.app/learn/celo-overview">Learn Celo</a>
    ),
  },
  {
    title: 'Developers',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Create, deploy, and manage applications on the Celo network.</>
    ),
    link: (
      <a href="https://deploy-preview-154--celo-docs.netlify.app/developer-guide/overview">Build on Celo</a>
    ),
  },
  {
    title: 'Validators',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Setup your own nodes to maintain the network and earn rewards.</>
    ),
    link: (
      <a href="https://deploy-preview-154--celo-docs.netlify.app/validator-guide/overview">Run a Node</a>
    ),
  },
  {
    title: 'Integrations',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Integrate your application, service, or exchange with the Celo network.</>
    ),
    link: (
      <a href="https://deploy-preview-154--celo-docs.netlify.app/celo-owner-guide/quick-start">Integrate with Celo</a>
    ),
  },
  {
    title: 'Owners',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Start sending, spending, and earning crypto from your mobile phone.</>
    ),
    link: (
      <a href="https://deploy-preview-154--celo-docs.netlify.app/developer-guide/integrations">Get CELO</a>
    ),
  },
  {
    title: 'Contributors',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Join a community of developers, designers, dreamers, and doers.</>
    ),
    link: (
      <a href="https://deploy-preview-154--celo-docs.netlify.app/community/contributing">Contribute to Celo</a>
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
