import React from 'react';
import styles from './PageRef.module.css';

type PageRefProps = {
  url: string,
  pageName: string,
}

export default function PageRef({ url, pageName } : PageRefProps) {
  return (
    <a
      className={styles.pageRef}
      href={url}
    >
      <div className={styles.left}>
        <div className={styles.arrow}>&#8594;</div>
        <div className={styles.pageName}>{pageName}</div>
      </div>
      <div className={styles.url}>{url}</div>
    </a>
  )
}
