// File got generated with 'yarn run swizzle @docusaurus/theme-classic Layout --danger'

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import LayoutProviders from '@theme/LayoutProviders';
import { ToastContainer } from 'react-toastify';
import LayoutHead from '@theme/LayoutHead';
import SkipToContent from '@theme/SkipToContent';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import clsx from 'clsx';
import styles from './styles.module.css';

type Props = {
  noFooter?: boolean;
  wrapperClassName: string;
};

const Layout: React.FC<Props> = (props) => {
  const { children, noFooter, wrapperClassName } = props;

  return (
    <LayoutProviders>
      <ToastContainer />

      <LayoutHead {...props} />

      <SkipToContent />

      <AnnouncementBar />

      <Navbar />

      <div className={clsx(styles.Wrapper, wrapperClassName)}>{children}</div>

      {!noFooter && <Footer />}
    </LayoutProviders>
  );
};

export default Layout;
