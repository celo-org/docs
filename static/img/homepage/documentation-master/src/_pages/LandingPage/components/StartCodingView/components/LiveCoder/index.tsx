import * as React from 'react';
import styles from './styles.module.css';
import LiveCoderReact from './components/LiveCoderReact';
import { PrismTheme } from 'prism-react-renderer';
import { useState } from 'react';
import LiveCodeNotFound from './components/LiveCodeNotFound';
import { FaReact, FaVuejs } from 'react-icons/fa';
import usePrismTheme from '@theme/hooks/usePrismTheme';
import PlainButton from '../../../../../../components/buttons/PlainButton';
import FrameworkButton from './components/FrameworkButton';

type Props = {
  reactCode: string;
  theme?: PrismTheme;
  transformCode?: (code: string) => string;
};

const codeSections: { [key: string]: CodeSectionInterface } = {
  react: {
    codeComponent: (props) => (
      <LiveCoderReact
        code={props.code}
        transformCode={props.transformCode}
        theme={props.theme}
      />
    ),
    logo: <FaReact />,
    color: '#61DBFB',
    selectable: true,
    sandBoxUrl: 'https://codesandbox.io/s/agilets-first-state-f12cz',
  },
  vue: {
    codeComponent: (props) => <div />,
    logo: <FaVuejs />,
    color: '#42b883',
    selectable: false,
  },
};

const LiveCoder: React.FC<Props> = (props) => {
  const { reactCode, transformCode } = props;
  const theme = props.theme || usePrismTheme();

  const [codeSectionKey, setCodeSectionKey] = useState('react');
  const CurrentCodeComponent = codeSections[codeSectionKey]?.codeComponent;

  return (
    <div className={styles.Container}>
      <div className={styles.FrameworkButtonsContainer}>
        {Object.keys(codeSections).map((key) => {
          return (
            <FrameworkButton
              key={key}
              logo={codeSections[key]?.logo}
              color={codeSections[key]?.color}
              selectable={codeSections[key]?.selectable}
              active={key === codeSectionKey}
              notSelectableToolTip={'Coming Soon'}
              onClick={() => {
                setCodeSectionKey(key);
              }}
            />
          );
        })}
      </div>
      <div className={styles.CodeContainer}>
        {CurrentCodeComponent ? (
          <CurrentCodeComponent
            code={reactCode}
            theme={theme}
            transformCode={transformCode}
          />
        ) : (
          <LiveCodeNotFound name={codeSectionKey} />
        )}
        {codeSections[codeSectionKey]?.sandBoxUrl && (
          <PlainButton
            to={codeSections[codeSectionKey]?.sandBoxUrl}
            name={'Sandbox'}
            className={styles.SandboxButton}
          />
        )}
      </div>
    </div>
  );
};

export interface CodeSectionPropsInterface {
  code: string;
  theme?: PrismTheme;
  transformCode?: (code: string) => string;
}

export interface CodeSectionInterface {
  codeComponent: (
    props: CodeSectionPropsInterface
  ) => React.ComponentElement<any, any>;
  logo: React.ComponentElement<any, any>;
  color: string;
  selectable: boolean;
  sandBoxUrl?: string;
}

export default LiveCoder;
