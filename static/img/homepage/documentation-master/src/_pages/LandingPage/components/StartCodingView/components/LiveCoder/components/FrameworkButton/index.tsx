import React from 'react';
import styles from './styles.module.css';
import { IconContext } from 'react-icons';
import clsx from 'clsx';

export type FrameworkButtonProps = {
  logo: React.ComponentElement<any, any>;
  color: string;
  active: boolean;
  selectable: boolean;
  notSelectableToolTip?: string;
  onClick?: () => void;
};

const FrameworkButton: React.FC<FrameworkButtonProps> = (props) => {
  const { logo, color, active, selectable, notSelectableToolTip } = props;
  const onClick =
    props.onClick ||
    (() => {
      /* empty function */
    });

  return (
    <div
      className={clsx(styles.Container, { [styles.Container_Active]: active })}
      style={{ cursor: selectable ? 'pointer' : 'default' }}
      onClick={selectable ? onClick : undefined}>
      {!active && <div className={styles.LogoContainerOverlay} />}
      <div
        className={styles.LogoContainer}
        style={{ border: `2px solid ${color}` }}>
        <IconContext.Provider value={{ color: color, size: '1.5rem' }}>
          {logo}
        </IconContext.Provider>
      </div>
      {!selectable && notSelectableToolTip && (
        <span
          className={styles.TooltipText}
          style={{ border: `1px solid ${color}` }}>
          {notSelectableToolTip}
        </span>
      )}
    </div>
  );
};

export default FrameworkButton;
