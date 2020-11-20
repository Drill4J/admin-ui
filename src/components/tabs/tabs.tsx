import * as React from 'react';
import { BEM, button } from '@redneckz/react-bem-helper';

import styles from './tabs.module.scss';

interface Props {
  className?: string;
  children: React.ReactElement | React.ReactElement[];
  activeTab: number | string;
  onSelect: (tabName: string) => void;
}

const tabsPanel = BEM(styles);

export const TabsPanel = tabsPanel((props: Props) => {
  const {
    children, className, activeTab, onSelect,
  } = props;

  return (
    <div className={className}>
      {React.Children.map(children, (child: React.ReactElement<any>, index: number) => React.cloneElement(child, {
        onClick: () => onSelect && onSelect(child.props.name || index),
        active: (child.props.name || index) === activeTab,
      }))}
    </div>
  );
});

export const Tab = tabsPanel.tabLabel(button({ name: '' }));
