import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { PageHeader } from 'components';
import { NotImplementedStub } from 'modules';

import styles from './plugins-page.module.scss';

const pluginsPage = BEM(styles);

export const PluginsPage = pluginsPage(({ className }) => (
  <div className={className}>
    <PageHeader title="Plugins library" itemsCount={0} />
    <Content>
      <NotImplementedStub />
    </Content>
  </div>
));

const Content = pluginsPage.content('div');
