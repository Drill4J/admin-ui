import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Card, CardSection } from '../card';
import { useBuildVersion } from '../../use-build-version';
import { MethodsSection } from './methods-section';
import { Coverage } from '../../../../../types/coverage';
import { NewMethodsCoverage } from '../../../../../types/new-methods-coverage';

import styles from './project-methods-card.module.scss';

interface Props {
  className?: string;
  agentId?: string;
  buildVersion?: string;
}

const projectMethodsCard = BEM(styles);

export const ProjectMethodsCard = projectMethodsCard(
  ({ className, agentId, buildVersion }: Props) => {
    const { methodsCount = 0, uncoveredMethodsCount = 0 } =
      useBuildVersion<Coverage>('/build/coverage', agentId, buildVersion) || {};

    const { methodsCount: newMethodsCoverage = 0, methodsCovered = 0 } =
      useBuildVersion<NewMethodsCoverage>('/build-coverage-new', agentId, buildVersion) || {};

    return (
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
    );
  },
);
