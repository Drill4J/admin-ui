import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { ActiveScope } from 'types/active-scope';
import { percentFormatter } from 'utils';

import styles from './scope-summary.module.scss';

interface Props {
  className?: string;
  scope: ActiveScope;
  testsCount: number;
}

const scopeSummary = BEM(styles);

export const ScopeSummary = scopeSummary(({ className, scope, testsCount }: Props) => {
  const { coverage: { percentage = 0 } = {}, started } = scope || {};
  return (
    <div className={className}>
      <Title>Scope Summary</Title>
      <Element>
        Code coverage
        <ElementValue>
          {`${percentFormatter(percentage)}%`}
        </ElementValue>
      </Element>
      <Element>
        Tests
        <ElementValue>{testsCount}</ElementValue>
      </Element>
      <Element>
        Duration
        <ElementValue>{getTimeString(started)}</ElementValue>
      </Element>
    </div>
  );
});

const Title = scopeSummary.title('div');
const Element = scopeSummary.element('div');
const ElementValue = scopeSummary.elementValue('div');

function getTimeString(started?: number) {
  const duration = started ? Date.now() - started : 0;

  const days = Math.floor(duration / 86400000);
  const hours = Math.floor((duration - days * 86400000) / 3600000);
  const minutes = Math.floor((duration - days * 86400000 - hours * 3600000) / 60000);

  return `${days}d ${hours}h ${minutes}m`;
}
