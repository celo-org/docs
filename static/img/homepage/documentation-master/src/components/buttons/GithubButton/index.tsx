import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';
import clsx from 'clsx';
import { onServer } from '../../../utils';

export type Props = { to: string; className?: string };

const GithubButton: React.FC<Props> = (props) => {
  const { to, className } = props;
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
      <FaGithub className={styles.GithubIcon} />
      <div>GITHUB</div>
    </button>
  );
};

export default GithubButton;
