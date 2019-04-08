import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import styles from './tabs.module.scss';

interface Props {
  className?: string;
  children: Array<typeof Tab>;
}

const tabsContainer = BEM(styles);

export const TabsContainer = tabsContainer(({ className, children }: Props) => (
  <div className={className}>
    <TabPanel>{children}</TabPanel>
  </div>
));

export const TabPanel = tabsContainer.tabsPanel('div');
export const Tab = tabsContainer.tab(
  div({ onClick: () => {}, active: undefined } as { onClick?: () => void; active?: boolean }),
);
