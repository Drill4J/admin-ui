import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel, Section } from '../../../../layouts';
import { Icons } from '../../../../components';
import { useBuildVersion } from '../use-build-version';
import { CurrentScope } from '../scope';
import { CoverageDetails } from '../coverage-details';
import { CodeCoverageCard } from '../code-coverage-card';
import { ProjectMethodsCard } from '../project-methods-card';
import { Coverage } from '../../../../types/coverage';
import { NewMethodsCoverage } from '../../../../types/new-methods-coverage';
import { ClassCoverage } from '../../../../types/class-coverage';
import { CoverageByTypes } from '../../../../types/coverage-by-types';

import styles from './dashboard.module.scss';

interface Props {
  className?: string;
  agentId: string;
  buildVersion: string;
}

const dashboard = BEM(styles);

export const Dashboard = dashboard(({ className, agentId, buildVersion }: Props) => {
  const coverage = useBuildVersion<Coverage>('/build/coverage', agentId, buildVersion) || {};
  const newMethodsCoverage =
    useBuildVersion<NewMethodsCoverage>('/build/coverage-new', agentId, buildVersion) || {};
  const coverageByPackages =
    useBuildVersion<ClassCoverage[]>('/build/coverage-by-packages', agentId, buildVersion) || [];
  const coverageByTypes =
    useBuildVersion<CoverageByTypes>('/build/coverage-by-types', agentId, buildVersion) || {};

  return (
    <div className={className}>
      <SummaryPanel align="space-between">
        <CodeCoverageCard
          header="Build Code Coverage"
          coverage={coverage}
          coverageByTypes={coverageByTypes}
        />
        <ProjectMethodsCard
          header="Project Methods"
          coverage={coverage}
          newMethodsCoverage={newMethodsCoverage}
          agentId={agentId}
          buildVersion={buildVersion}
          newMethodsTopic="/build/new-methods"
        />
      </SummaryPanel>
      <Section header="Current Scope">
        <CurrentScope agentId={agentId} buildVersion={buildVersion} />
        <CoverageDetails
          agentId={agentId}
          buildVersion={buildVersion}
          coverageByPackages={coverageByPackages}
          header={
            <>
              <Icons.ProjectTree />
              <span>Project Tree</span>
            </>
          }
          associatedTestsTopic="/build/associated-tests"
        />
      </Section>
    </div>
  );
});

const SummaryPanel = dashboard.summaryPanel(Panel);
