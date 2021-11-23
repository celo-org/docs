import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Developers',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Build, deploy, and manage applications on the Celo network.</>
    ),
    link: (
      <a href="/developer-guide/overview">Build on Celo</a>
    ),
  },
  {
    title: 'Validators',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Setup Celo nodes to maintain the network and earn rewards.</>
    ),
    link: (
      <a href="/validator-guide/overview">Run a Node</a>
    ),
  },
  {
    title: 'Owners',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Start sending, spending, and earning crypto from your mobile phone.</>
    ),
    link: (
      <a href="/celo-holder-guide/owners">Get CELO</a>
    ),
  },
  {
    title: 'Integrations',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Integrate your application, service, or exchange with the Celo network.</>
    ),
    link: (
      <a href="/developer-guide/integrations">Integrate with Celo</a>
    ),
  },
  {
    title: 'Contributors',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Join a community of developers, designers, dreamers, and doers.</>
    ),
    link: (
      <a href="/community/contributing">Contribute to Celo</a>
    ),
  },
  {
    title: 'Additional Resources',
    // Svg: require('../../static/img/homepage/1.svg').default,
    description: (
      <>Gain the skills you need to get the most from the Celo platform.</>
    ),
    link: (
      // <a href="https://deploy-preview-154--celo-docs.netlify.app/learn/celo-overview">Learn Celo</a>
      <a href="/learn/celo-onboarding">Find Celo Resources</a>
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
