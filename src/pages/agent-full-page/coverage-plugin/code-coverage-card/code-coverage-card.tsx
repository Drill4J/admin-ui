import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { Icons } from '../../../../components';
import { Coverage } from '../../../../types/coverage';
import { percentFormatter } from '../../../../utils';

import styles from './code-coverage-card.module.scss';

interface Props {
  className?: string;
  coverage: Coverage;
}

const codeCoverageCard = BEM(styles);

export const CodeCoverageCard = codeCoverageCard(({ className, coverage }: Props) => (
  <div className={className}>
    <Title>Code Coverage</Title>
    <CodeCoverage type={coverage.arrow}>
      {coverage.coverage !== undefined ? (
        <>
          {`${percentFormatter(coverage.coverage)}%`}
          {coverage.arrow && (
            <Icons.Arrow height={23} width={20} rotate={coverage.arrow === 'INCREASE' ? 270 : 90} />
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
  </div>
));

const Title = codeCoverageCard.title('div');
const CodeCoverage = codeCoverageCard.codeCoverage(
  div({ type: undefined } as { type?: 'INCREASE' | 'DECREASE' }),
);
const MethodsCount = codeCoverageCard.methodsCount('div');
const WarningIcon = codeCoverageCard.warningIcon(Icons.Warning);
const SuccessIcon = codeCoverageCard.successIcon(Icons.Checkbox);
