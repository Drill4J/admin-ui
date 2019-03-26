import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from '../../components';

import styles from './toolbar.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const toolbar = BEM(styles);

export const Toolbar = toolbar(({ className, children }: Props) => (
  <div className={className}>
    <Content>
      <BreadcrumbsWrapper />
      <Panel>{children}</Panel>
    </Content>
  </div>
));

const Content = toolbar.content('div');
const BreadcrumbsWrapper = toolbar.breadcrumbs('div');
const Panel = toolbar.panel('div');
const Divider = toolbar.divider('span');
const Username = toolbar.username('div');
