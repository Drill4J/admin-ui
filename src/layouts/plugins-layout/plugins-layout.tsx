import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

// import { PluginsSidebar } from './pluginsSidebar';

import styles from './plugins-layout.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const pluginsLayout = BEM(styles);

// TODO: ScrollWrapper realization

export const PluginsLayout = pluginsLayout(({ className, children }: Props) => (
  <div className={className}>
    <Content>{children}</Content>
  </div>
));

const Content = pluginsLayout.content('div');
