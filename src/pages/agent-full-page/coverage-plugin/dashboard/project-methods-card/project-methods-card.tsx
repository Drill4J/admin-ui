import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Card } from '../card';
import { MethodsSection } from './methods-section';
import { Coverage } from '../../../../../types/coverage';
import { NewMethodsCoverage } from '../../../../../types/new-methods-coverage';

import styles from './project-methods-card.module.scss';

interface Props {
  className?: string;
  agentId?: string;
  buildVersion?: string;
  coverage: Coverage;
  newMethodsCoverage: NewMethodsCoverage;
}

const projectMethodsCard = BEM(styles);

export const ProjectMethodsCard = projectMethodsCard(
  ({
    className,
    coverage: { methodsCount = 0, uncoveredMethodsCount = 0 },
    newMethodsCoverage: { methodsCount: newMethodsCoverage = 0, methodsCovered = 0 },
  }: Props) => (
    <div className={className}>
      <Card header="Project Methods">
        <MethodsSection
          header="TOTAL"
          totalCount={methodsCount}
          coveredMethodsCount={methodsCount - uncoveredMethodsCount}
          missedMethodsCount={0}
          excludedMethodsCount={0}
        />
        <MethodsSection
          header="MODIFIED & NEW"
          totalCount={newMethodsCoverage}
          coveredMethodsCount={methodsCovered}
          missedMethodsCount={0}
          excludedMethodsCount={0}
        />
      </Card>
    </div>
  ),
);
