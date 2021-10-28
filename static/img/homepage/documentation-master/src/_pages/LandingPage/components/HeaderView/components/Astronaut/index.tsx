import { animated, useSpring } from 'react-spring';
import React, { useState } from 'react';
import { useAgile } from '@agile-ts/react';
import core from '../../../../../../core';
import styles from './styles.module.css';
import clsx from 'clsx';
import AstronautDark from './astronauts/AstronautDark';
import AstronautLight from './astronauts/AstronautLight';

type Props = { className?: string };

const Astronaut: React.FC<Props> = (props) => {
  const { className } = props;
  const [isRaised, setIsRaised] = useState(false);
  const [inAnimation, setInAnimation] = useState(false);
  const [triggeredAnimationColor, setTriggeredAnimationColor] = useState(false);
  const dark = useAgile(core.ui.ASTRONAUT_DARK);
  const animatedAstronautProps = useSpring({
    to: { x: isRaised ? 0 : 1 },
    config: {
      mass: 1,
      tension: 400,
      friction: 15,
      duration: 500,
    },
    onRest: () => {
      if (inAnimation) {
        setInAnimation(false);
        setTriggeredAnimationColor(false);
      }
    },
    onFrame: (frame) => {
      if (frame.x >= 0.45 && frame.x <= 0.5 && !triggeredAnimationColor) {
        core.ui.toggleAstronautColor(!dark);
        setTriggeredAnimationColor(true);
      }
    },
  });

  const onMouseEnter = () => {
    if (!inAnimation) {
      setInAnimation(true);
      setIsRaised(!isRaised);
    }
  };

  return (
    <div className={clsx(styles.Container, className)}>
      <animated.div
        style={{
          transform: (animatedAstronautProps as any).x.interpolate({
            range: [0, 0.5, 1],
            output: [
              `translateY(${0}px)`,
              `translateY(-${30}px)`,
              `translateY(${0}px)`,
            ],
          }),
        }}
        className={styles.ImageContainer}>
        {dark ? (
          <AstronautDark onMouseEnter={onMouseEnter} />
        ) : (
          <AstronautLight onMouseEnter={onMouseEnter} />
        )}
      </animated.div>
      <p className={styles.Text}>Poke me 👆 to mutate my color State.</p>
    </div>
  );
};

export default Astronaut;
