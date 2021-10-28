import React from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

type Props = {
  className?: string;
  active: boolean;
  onClick: () => void;
};

const BulletItem: React.FC<Props> = (props) => {
  const { className, active, onClick } = props;
  return (
    <div
      className={clsx(styles.Container, className, {
        [styles.Container__Active]: active,
      })}
      onClick={onClick}
    />
  );
};

export default BulletItem;
