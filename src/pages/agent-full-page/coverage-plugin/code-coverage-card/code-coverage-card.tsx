import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { Icons, Spinner } from '../../../../components';
import { Panel } from '../../../../layouts';
import { Coverage } from '../../../../types/coverage';
import { percentFormatter } from '../../../../utils';
import { useBuildVersion } from '../use-build-version';
import { CollectionState } from '../../../../types/collection-state';

import styles from './code-coverage-card.module.scss';

interface Props {
  className?: string;
  coverage: Coverage;
  agentId: string;
  buildVersion: string;
}

const codeCoverageCard = BEM(styles);

export const CodeCoverageCard = codeCoverageCard(
  ({ className, coverage, agentId, buildVersion }: Props) => {
    const agentState =
      useBuildVersion<CollectionState>('/collection-state', agentId, buildVersion) || {};
    return (
      <div className={className}>
        <Title>Code Coverage</Title>
        <CodeCoverage type={coverage.arrow}>
          {coverage.coverage !== undefined ? (
            <>
              {`${percentFormatter(coverage.coverage)}%`}
              {coverage.arrow && (
                <Icons.Arrow
                  height={23}
                  width={20}
                  rotate={coverage.arrow === 'INCREASE' ? 270 : 90}
                />
              )}
            </>
          ) : (
            'n/a'
          )}
        </CodeCoverage>
        <MethodsCount>
          {coverage.uncoveredMethodsCount !== undefined ? (
            <>
              {coverage.uncoveredMethodsCount === 0 ? <SuccessIcon /> : <WarningIcon />}
              {` ${coverage.uncoveredMethodsCount} methods not covered`}
            </>
          ) : null}
        </MethodsCount>
        {agentState.state && (
          <SpinnerWrapper>
            <Spinner />
            Gathering data
          </SpinnerWrapper>
        )}
      </div>
    );
  },
);

const Title = codeCoverageCard.title('div');
const CodeCoverage = codeCoverageCard.codeCoverage(
  div({ type: undefined } as { type?: 'INCREASE' | 'DECREASE' }),
);
const MethodsCount = codeCoverageCard.methodsCount('div');
const WarningIcon = codeCoverageCard.warningIcon(Icons.Warning);
const SuccessIcon = codeCoverageCard.successIcon(Icons.Checkbox);
const SpinnerWrapper = codeCoverageCard.spinnerWrapper(Panel);
