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
      <Title>No testing scope for this build</Title>
      <Instructions>Try to change build version or reload the page.</Instructions>
    </Content>
  </div>
));

const Content = noScopeStub.content('div');
const Title = noScopeStub.title('div');
const Instructions = noScopeStub.instructions('div');
