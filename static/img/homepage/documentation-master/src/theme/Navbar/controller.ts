import { useHistoryPopHandler, useThemeConfig } from '@docusaurus/theme-common';
import useWindowSize from '@theme/hooks/useWindowSize';
import { useCallback, useEffect, useState } from 'react';

export const DefaultNavItemPosition = 'right'; // If split links by left/right

export const splitNavItemsByPosition = (items) => {
  const leftItems = items.filter(
    (item) => (item.position ?? DefaultNavItemPosition) === 'left'
  );
  const rightItems = items.filter(
    (item) => (item.position ?? DefaultNavItemPosition) === 'right'
  );
  return {
    leftItems,
    rightItems,
  };
};

export const useNavbarItems = () => {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
};

export const useMobileSidebar = () => {
  const windowSize = useWindowSize();

  // Mobile sidebar not visible on hydration: can avoid SSR rendering
  const shouldRender = windowSize === 'mobile'; // || windowSize === 'ssr';

  const [shown, setShown] = useState(false);

  // Close mobile sidebar on navigation pop
  // Most likely firing when using the Android back button (but not only)
  useHistoryPopHandler(() => {
    if (shown) {
      setShown(false);
      // Should we prevent the navigation here?
      // See https://github.com/facebook/docusaurus/pull/5462#issuecomment-911699846
      return false; // prevent pop navigation
    }
    return undefined;
  });

  const toggle = useCallback(() => {
    setShown((s) => !s);
  }, []);

  useEffect(() => {
    if (windowSize === 'desktop') {
      setShown(false);
    }
  }, [windowSize]);

  return { shouldRender, toggle, shown };
};
