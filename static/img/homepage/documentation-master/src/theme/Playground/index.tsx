// File got generated with 'yarn run swizzle @docusaurus/theme-live-codeblock Playground --danger'

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import clsx from 'clsx';
import styles from './styles.module.css';
import Spacer from '../../components/other/Spacer';
import { PrismTheme } from 'prism-react-renderer';
import usePrismTheme from '@theme/hooks/usePrismTheme';

type Props = {
  children: string;
  theme?: PrismTheme;
  transformCode?: (code: string) => string;
};

const Playground: React.FC<Props> = (props) => {
  const { children, transformCode } = props;
  const theme = props.theme || usePrismTheme();

  return (
    <LiveProvider
      code={children.replace(/\n$/, '')}
      transformCode={transformCode || ((code) => `${code};`)}
      theme={theme}
      noInline={true}
      {...props}>
      <div className={clsx(styles.Header, styles.EditorHeader)}>
        Live Editor
      </div>
      <LiveEditor className={styles.Editor} />
      <Spacer height={30} />
      <div className={clsx(styles.Header, styles.PreviewHeader)}>Result</div>
      <div className={styles.PreviewContainer}>
        <LivePreview />
        <LiveError />
      </div>
    </LiveProvider>
  );
};

export default Playground;
