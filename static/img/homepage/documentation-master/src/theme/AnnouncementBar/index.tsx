// File got generated with 'yarn run swizzle @docusaurus/theme-classic AnnouncementBar --danger'

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import clsx from 'clsx';
import useUserPreferencesContext from '@theme/hooks/useUserPreferencesContext';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useInterval } from '../../hooks/useInterval';

const AnnouncementBar: React.FC = () => {
  const {
    isAnnouncementBarClosed,
    closeAnnouncementBar,
  } = useUserPreferencesContext();
  const { siteConfig } = useDocusaurusContext();
  const { announcementBar } = siteConfig.customFields;

  if (!announcementBar) {
    return null;
  }

  const { id, content, isCloseable, random, interval } = announcementBar;
  const isArrayContent = Array.isArray(content);
  const [currentAnnouncement, setCurrentAnnouncement] = useState<string>(
    isArrayContent ? content[0] : content
  );

  if (!content || (isCloseable && isAnnouncementBarClosed)) {
    return null;
  }

  if (interval != null) {
    useInterval(() => {
      if (!isArrayContent) return;

      // Set currentAnnouncement to random content
      if (random && isArrayContent) {
        setCurrentAnnouncement(
          content[Math.floor(Math.random() * content.length)]
        );
        return;
      }

      // Set currentAnnouncement to next content item in the array
      const currentIndex = content.indexOf(currentAnnouncement);
      const nextIndex =
        currentIndex + 1 < content.length ? currentIndex + 1 : 0;

      setCurrentAnnouncement(content[nextIndex]);
    }, interval);
  }

  return (
    <div className={styles.AnnouncementBar} role="banner">
      <div
        className={clsx(styles.AnnouncementBarContent, {
          [styles.AnnouncementBarCloseable]: isCloseable,
        })} // Developer provided the HTML, so assume it's safe.
        dangerouslySetInnerHTML={{
          __html: currentAnnouncement,
        }}
      />
      {isCloseable ? (
        <button
          type="button"
          className={styles.AnnouncementBarClose}
          onClick={closeAnnouncementBar}
          aria-label={translate({
            id: id,
            message: 'Close',
            description: 'The ARIA label for close button of announcement bar',
          })}>
          <span aria-hidden="true">×</span>
        </button>
      ) : null}
    </div>
  );
};

export default AnnouncementBar;
