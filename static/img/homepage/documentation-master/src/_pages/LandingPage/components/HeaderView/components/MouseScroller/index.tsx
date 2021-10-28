import React from 'react';
import styles from './styles.module.css';

export type Props = {};

const MouseScroller: React.FC<Props> = (props) => {
  return (
    <div className={styles.MouseContainer}>
      <div className={styles.Mouse}>
        <span className={styles.MouseWheel} />
      </div>
      <div className={styles.ScrollText}>Scroll</div>
    </div>
  );
};

export default MouseScroller;
