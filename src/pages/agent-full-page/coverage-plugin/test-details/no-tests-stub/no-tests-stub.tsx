import * as React from 'react';
import { BEM, not } from '@redneckz/react-bem-helper';

import { Icons } from '../../../../../components';

import styles from './no-tests-stub.module.scss';

interface Props {
  className?: string;
}

const noTestsStub = BEM(styles);

export const NoTestsStub = noTestsStub(({ className }: Props) => (
  <div className={className}>
    <Icon height={104} width={107} />
    <Title>No tests available yet.</Title>
    <Message>
      Information about project tests will appear after the first launch of autotests.
    </Message>
  </div>
));

const Icon = noTestsStub.icon(Icons.Test);
const Title = noTestsStub.title('div');
const Message = noTestsStub.message('div');
