import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { PageHeader } from 'components';
import { NotImplementedStub } from 'modules';

import styles from './logs-page.module.scss';

const logsPage = BEM(styles);

export const LogsPage = logsPage(({ className }) => (
  <div className={className}>
    <PageHeader title="Global logs" itemsCount={0} />
    <Content>
      <NotImplementedStub />
    </Content>
  </div>
));

const Content = logsPage.content('div');
