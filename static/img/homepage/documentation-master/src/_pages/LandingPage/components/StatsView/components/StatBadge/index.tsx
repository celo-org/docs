import React from 'react';
import styles from './styles.module.css';
import Icons, { IconTypes } from '../../../../../../components/other/Icons';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { onServer } from '../../../../../../utils';

export type Props = {
  icon?: IconTypes;
  number: number;
  text: string;
  to: string;
  className?: string;
};

const StatBadge: React.FC<Props> = (props) => {
  const { icon, number, text, to, className } = props;
  const history = useHistory();

  return (
    <div
      className={clsx(styles.Container, className)}
      onClick={() => {
        if (to.startsWith('http') && !onServer()) {
          window.open(to, '_blank');
          return;
        }
        history.push(to);
      }}>
      {icon && (
        <div className={styles.IconContainer}>
          <Icons type={icon} className={styles.Icon} />
        </div>
      )}
      <div className={styles.ContentContainer}>
        <div className={styles.Number}>{number}</div>
        <div className={styles.Text}>{text}</div>
      </div>
    </div>
  );
};

export default StatBadge;
