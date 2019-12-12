import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { PageHeader, Icons } from 'components';

import styles from './logs-page.module.scss';

const logsPage = BEM(styles);

export const LogsPage = logsPage(({ className }) => (
  <div className={className}>
    <PageHeader title="Global logs" itemsCount={0} />
    <Content>
      <Icon height={160} width={173} />
      <Title>There are no logs at the moment</Title>
      <SubTitle>
        New records will appear once you enable at least one working widget on at least one agent.
      </SubTitle>
    </Content>
  </div>
));

const Content = logsPage.content('div');
const Icon = logsPage.icon(Icons.Logs);
const Title = logsPage.title('div');
const SubTitle = logsPage.subTitle('div');
