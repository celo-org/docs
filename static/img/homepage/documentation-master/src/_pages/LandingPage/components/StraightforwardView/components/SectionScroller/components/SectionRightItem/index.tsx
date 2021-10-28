import React, { useRef } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';
import Icons, {
  IconTypes,
} from '../../../../../../../../components/other/Icons';
import { useSpring, animated } from 'react-spring';

export type Props = {
  icon?: IconTypes;
  title: string;
  description: string;
  onClick: () => void;
  active: boolean;
};

const SectionRightItem: React.FC<Props> = (props) => {
  const { icon, title, description, onClick, active } = props;
  const descriptionRef = useRef(null);

  const animatedDescriptionProps = useSpring({
    to: {
      height: active ? descriptionRef.current?.clientHeight || 'auto' : 0,
      marginTop: active ? 5 : 0,
    },
    config: { tension: 2000, friction: 100, precision: 1 },
  });

  return (
    <div
      className={clsx(styles.Container, {
        [styles.Container_Active]: active,
      })}
      onClick={onClick}>
      <h3 className={styles.Header}>
        {icon && <Icons type={icon} className={styles.Icon} />}
        {title}
      </h3>
      <animated.div
        className={styles.Description}
        style={animatedDescriptionProps}>
        <p ref={descriptionRef}>{description}</p>
      </animated.div>
    </div>
  );
};

export default SectionRightItem;
