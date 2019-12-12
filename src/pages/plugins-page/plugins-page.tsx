import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { PageHeader, Icons } from 'components';

import styles from './plugins-page.module.scss';

const pluginsPage = BEM(styles);

export const PluginsPage = pluginsPage(({ className }) => (
  <div className={className}>
    <PageHeader title="Plugins library" itemsCount={0} />
    <Content>
      <Icon height={164} width={164} />
      <Title>No plugins available</Title>
      <SubTitle>There are no plugins available in the library at the moment.</SubTitle>
    </Content>
  </div>
));

const Content = pluginsPage.content('div');
const Icon = pluginsPage.icon(Icons.Plugins);
const Title = pluginsPage.title('div');
const SubTitle = pluginsPage.subTitle('div');
