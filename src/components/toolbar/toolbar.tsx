import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { TOKEN_KEY } from 'common/constants';

import styles from './toolbar.module.scss';

interface Props {
  className?: string;
  breadcrumbs?: React.ReactNode;
}

const toolbar = BEM(styles);

export const Toolbar = toolbar(({ className, breadcrumbs }: Props) => (
  <div className={className}>
    <Content>
      <BreadcrumbsWrapper>{breadcrumbs}</BreadcrumbsWrapper>
      <UserInfo>
        <Divider />
        Signed in as Guest
        <SingOut
          onClick={() => {
            window.location.href = '/login';
            localStorage.removeItem(TOKEN_KEY);
          }}
          data-test="toolbar:sign-out"
        >
          Sign out
        </SingOut>
      </UserInfo>
    </Content>
  </div>
));

const Content = toolbar.content('div');
const BreadcrumbsWrapper = toolbar.breadcrumbs('div');
const Divider = toolbar.divider('span');
const UserInfo = toolbar.userInfo('div');
const SingOut = toolbar.signOut(
  div({ onClick: () => {}, 'data-test': '' } as { 'data-test': string }),
);
