import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from '../../../components';
import { Card } from './card';
import { useWsConnection } from '../../../hooks';
import { defaultPluginSocket } from '../../../common/connection';
import { CoverageDetails } from './coverage-details';
import { Coverage } from '../../../types/coverage';
import { NewMethodsCoverage } from '../../../types/new-methods-coverage';
import { percentFormatter } from '../../../utils';

import styles from './coverage-plugin.module.scss';

interface Props {
  className?: string;
}

const coveragePlugin = BEM(styles);

export const CoveragePlugin = coveragePlugin(({ className }: Props) => {
  const coverage = useWsConnection<Coverage>(defaultPluginSocket, '/coverage') || {};
  const newMethodsCoverage =
    useWsConnection<NewMethodsCoverage>(defaultPluginSocket, '/coverage-new') || {};

  return (
    <div className={className}>
      <Title>Summary</Title>
      <SummaryWrapper>
        <Card
          title="Code Coverage"
          text={coverage.coverage !== undefined ? percentFormatter(coverage.coverage) : 'n/a'}
          secondaryText={
            coverage.uncoveredMethodsCount !== undefined ? (
              <>
                <Icons.Warning />
                {` ${coverage.uncoveredMethodsCount} methods not covered`}
              </>
            ) : null
          }
        />
        <Card
          title="Methods, Total"
          text={
            newMethodsCoverage.methodsCount !== undefined ? newMethodsCoverage.methodsCount : 'n/a'
          }
          secondaryText={
            newMethodsCoverage.methodsCount !== undefined ? (
              <>
                <Icons.Warning />
                {` ${newMethodsCoverage.methodsCount} new methods (${
                  newMethodsCoverage.methodsCovered
                } covered)`}
              </>
            ) : null
          }
        />
      </SummaryWrapper>
      <CoverageDetails />
    </div>
  );
});

const Title = coveragePlugin.title('div');
const SummaryWrapper = coveragePlugin.summaryWrapper('div');
