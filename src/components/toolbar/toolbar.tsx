import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from 'components';

import styles from './toolbar.module.scss';

interface Props {
  className?: string;
  children?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
}

const toolbar = BEM(styles);

export const Toolbar = toolbar(({ className, children, breadcrumbs }: Props) => (
  <div className={className}>
    <Content>
      <BreadcrumbsWrapper>{breadcrumbs}</BreadcrumbsWrapper>
      <UserInfo>
        <Divider />
        <AccountIcon /> Guest
      </UserInfo>
    </Content>
  </div>
));

const Content = toolbar.content('div');
const BreadcrumbsWrapper = toolbar.breadcrumbs('div');
const Divider = toolbar.divider('span');
const UserInfo = toolbar.userInfo('div');
const AccountIcon = toolbar.accountIcon(Icons.Account);
