import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from '../../../components';
import { Card } from './card';
import { useWsConnection } from '../../../hooks';
import { defaultPluginSocket } from '../../../common/connection';

import styles from './coverage-plugin.module.scss';

interface Props {
  className?: string;
}

interface Coverage {
  coverage?: number;
  uncoveredMethodsCount?: number;
}

const coveragePlugin = BEM(styles);

export const CoveragePlugin = coveragePlugin(({ className }: Props) => {
  const coverage = useWsConnection<Coverage>(defaultPluginSocket, '/coverage');

  return (
    <div className={className}>
      <Title>Summary</Title>
      <SummaryWrapper>
        <Card
          title="Code Coverage"
          text={coverage && coverage.coverage ? coverage.coverage.toFixed(1) : 'n/a'}
          secondaryText={
            coverage && coverage.uncoveredMethodsCount ? (
              <>
                <Icons.Warning />
                {`${coverage.uncoveredMethodsCount} methods not covered`}
              </>
            ) : null
          }
        />
        <Card title="Methods, Total" text="n/a" />
      </SummaryWrapper>
    </div>
  );
});

const Title = coveragePlugin.title('div');
const SummaryWrapper = coveragePlugin.summaryWrapper('div');
