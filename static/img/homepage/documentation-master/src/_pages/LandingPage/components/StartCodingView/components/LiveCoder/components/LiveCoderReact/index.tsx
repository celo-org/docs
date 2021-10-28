import * as React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styles from './styles.module.css';
import { CodeSectionPropsInterface } from '../../index';
import ReactLiveScope from '@theme/ReactLiveScope';
import { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useWindowSize } from '../../../../../../../../hooks/useWindowSize';

type Props = CodeSectionPropsInterface;

const LiveCoderReact: React.FC<Props> = (props) => {
  const { code, theme, transformCode } = props;
  const { windowWidth } = useWindowSize();
  const [showCodeLabel, setShowCodeLabel] = useState(true);
  const [displayCodeLabel, setDisplayCodeLabel] = useState(true);
  const labelShowAnimationProps = useSpring({
    to: {
      opacity: showCodeLabel ? 1 : 0,
    },
    onRest: () => {
      if (!showCodeLabel) setDisplayCodeLabel(showCodeLabel);
    },
    onStart: () => {
      if (showCodeLabel) setDisplayCodeLabel(showCodeLabel);
    },
  });

  const [mounted, setMounted] = useState(false);
  // The Prism theme on SSR is always the default theme but the site theme
  // can be in a different mode. React hydration doesn't update DOM styles
  // that come from SSR. Hence force a re-render after mounting to apply the
  // current relevant styles. There will be a flash seen of the original
  // styles seen using this current approach but that's probably ok. Fixing
  // the flash will require changing the theming approach and is not worth it
  // at this point.
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <LiveProvider
      key={String(mounted)}
      code={code.replace(/\n$/, '')}
      transformCode={transformCode || ((code) => `${code};`)}
      theme={theme}
      noInline={true}
      scope={ReactLiveScope}>
      <div
        className={styles.EditorContainer}
        onMouseEnter={() => {
          if (windowWidth <= 800) setShowCodeLabel(false);
        }}
        onMouseLeave={() => setShowCodeLabel(true)}>
        <LiveEditor className={styles.Editor} />
        <animated.div
          className={styles.LiveLabel}
          style={{
            ...labelShowAnimationProps,
            ...{ display: displayCodeLabel ? 'block' : 'none' },
          }}>
          Live
        </animated.div>
      </div>
      <div className={styles.PreviewOuterContainer}>
        <div className={styles.PreviewContainer}>
          <LivePreview />
          <LiveError />
        </div>
        <div className={styles.Label}>Preview</div>
      </div>
    </LiveProvider>
  );
};

export default LiveCoderReact;
