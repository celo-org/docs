import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';
import clsx from 'clsx';
import { onServer } from '../../../utils';

export type Props = { to: string; className?: string };

const PrimaryButton: React.FC<Props> = (props) => {
  const { to, children, className } = props;
  const history = useHistory();

  return (
    <button
      className={clsx(styles.ButtonContainer, className)}
      onClick={() => {
        if (to.startsWith('http') && !onServer()) {
          window.open(to, '_blank');
          return;
        }
        history.push(to);
      }}>
      {children}
    </button>
  );
};

export default PrimaryButton;
