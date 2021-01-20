/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Children, cloneElement, ReactElement } from 'react';
import { BEM, button } from '@redneckz/react-bem-helper';

import styles from './tabs.module.scss';

interface Props {
  className?: string;
  children: ReactElement | ReactElement[];
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
      {Children.map(children, (child: ReactElement, index: number) => cloneElement(child, {
        onClick: () => onSelect && onSelect(child.props.name || index),
        active: (child.props.name || index) === activeTab,
      }))}
    </div>
  );
});

export const Tab = tabsPanel.tabLabel(button({ name: '' }));
