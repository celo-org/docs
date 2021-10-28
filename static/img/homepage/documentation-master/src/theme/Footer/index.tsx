// File got generated with 'yarn run swizzle @docusaurus/theme-classic Footer --danger'

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';
import GithubButton from '../../components/buttons/GithubButton';
import FooterLink from './components/FooterLink';

const Footer: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const { copyright, links = [] } = siteConfig.themeConfig.footer;
  const hasFooter = !!siteConfig.themeConfig.footer;

  if (!hasFooter) {
    return null;
  }

  return (
    <footer className={clsx('footer', styles.Container)}>
      <div className={styles.InnerContainer}>
        <div className={styles.ContentContainer}>
          {/*Footer Left */}
          <div className={styles.FooterLeft}>
            <div className={styles.BrandContainer}>
              <img
                className={styles.BrandImage}
                alt="AgileTs Logo"
                height={35}
                width={35}
                src="/img/logo.svg"
                title={siteConfig.tagline}
              />
              <div className={styles.BrandText}>AgileTs</div>
            </div>
            <div className={styles.Tagline}>{siteConfig.tagline}</div>
            <GithubButton
              className={styles.GithubButton}
              to={siteConfig.customFields.githubUrl}
            />
          </div>

          {/* Footer Quick Links (Right) */}
          <div className={styles.FooterRight}>
            {links.map((linkItem, i) => (
              <div className={styles.SectionContainer} key={i}>
                {linkItem.title != null && (
                  <li className={styles.LinkItemTitle}>{linkItem.title}</li>
                )}
                {linkItem.items?.map((item) => (
                  <ul
                    className={styles.LinkItemContainer}
                    key={item.href ?? item.to}>
                    <FooterLink {...item} />
                  </ul>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.BottomContainer}>
          <div
            className={styles.CopyrightText}
            dangerouslySetInnerHTML={{ __html: copyright }}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
