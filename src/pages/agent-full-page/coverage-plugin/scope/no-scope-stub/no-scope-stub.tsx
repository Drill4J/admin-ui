import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './no-scope-stub.module.scss';

interface Props {
  className?: string;
}

const noScopeStub = BEM(styles);

export const NoScopeStub = noScopeStub(({ className }: Props) => (
  <div className={className}>
    <Content>
      <Title>No active scope for this build</Title>
    </Content>
  </div>
));

const Content = noScopeStub.content('div');
const Title = noScopeStub.title('div');
