import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useLockBodyScroll from '@theme/hooks/useLockBodyScroll';
import clsx from 'clsx';
import styles from '../../styles.module.css';
import QuickSocialLinksView from '../QuickSocialLinksView';
import NavbarItem from '@theme/NavbarItem';
import { useNavbarItems } from '../../controller';

type Props = {
  toggleSidebar: () => void;
  sidebarShown: boolean;
};

const NavbarMobileSidebar: React.FC<Props> = (props) => {
  const { toggleSidebar, sidebarShown } = props;
  const { siteConfig } = useDocusaurusContext();
  const items = useNavbarItems();
  useLockBodyScroll(sidebarShown);

  return (
    <div className="navbar-sidebar">
      <div className="navbar-sidebar__brand">
        <a
          className={clsx('navbar__brand', styles.BrandText)}
          onClick={toggleSidebar}>
          {siteConfig.title}
        </a>
        <QuickSocialLinksView />
      </div>
      <div className="navbar-sidebar__items">
        <div className="menu">
          <ul className="menu__list">
            {items.map((item, i) => (
              <NavbarItem {...item} mobile onClick={toggleSidebar} key={i} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobileSidebar;
