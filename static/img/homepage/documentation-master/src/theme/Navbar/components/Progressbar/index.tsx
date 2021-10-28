import React, { useState } from 'react';
import styles from './styles.module.css';
import { useScroll } from '../../../../hooks/useScroll';

export type Props = {};

const Progressbar: React.FC<Props> = (props) => {
  const [scrollbarId] = useState('scrollbar2000');
  useScroll(scrollbarId);

  return (
    <div className={styles.ProgressbarContainer}>
      <div className={styles.Progressbar} id={scrollbarId} />
    </div>
  );
};

export default Progressbar;
