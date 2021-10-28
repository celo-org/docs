import React, { useLayoutEffect } from 'react';
import useKeyboardNavigation from '@theme/hooks/useKeyboardNavigation';
import { onServer } from '../../utils';

// https://docusaurus.io/docs/using-themes#wrapper-your-site-with-root
const Root: React.FC = (props) => {
  // Allow navigating with the Keyboard
  useKeyboardNavigation();

  return (
    <>
      {/* Import Font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin={'anonymous'}
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"
      />

      {props.children}
    </>
  );
};

export default Root;
