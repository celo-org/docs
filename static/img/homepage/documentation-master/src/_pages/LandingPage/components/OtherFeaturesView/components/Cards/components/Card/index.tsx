import React from 'react';
import { CardInterface } from '../../index';
import styles from './styles.module.css';
import PlainButton from '../../../../../../../../components/buttons/PlainButton';
import clsx from 'clsx';

type Props = {
  data: CardInterface;
  active: boolean;
  className?: string;
  width?: number | string;
  height?: number;
};

const Card: React.FC<Props> = (props) => {
  const { data, className, active, width, height } = props;

  return (
    <div
      className={clsx(styles.Container, className, {
        [styles.Container_Active]: active,
      })}
      style={{ maxWidth: width, height }}>
      <div className={styles.ContentContainer}>
        <img
          alt={data.imagePath}
          src={data.imagePath}
          className={styles.Image}
        />
        <div className={styles.TextContainer}>
          <h3 className={styles.Title}>{data.title}</h3>
          <p className={styles.Description}>{data.description}</p>
        </div>
      </div>
      <PlainButton
        className={styles.MoreButton}
        to={data.to}
        name={'Learn more'}
      />
    </div>
  );
};

export default Card;
