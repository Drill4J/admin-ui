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
import { ClassCoverage } from '../../../../types/class-coverage';
import { Methods } from '../../../../types/methods';

import styles from './dashboard.module.scss';

interface Props {
  className?: string;
  agentId: string;
  buildVersion: string;
}

const dashboard = BEM(styles);

export const Dashboard = dashboard(({ className, agentId, buildVersion }: Props) => {
  const coverage = useBuildVersion<Coverage>('/build/coverage', agentId, buildVersion) || {};
  const buildMethods = useBuildVersion<Methods>('/build/methods', agentId, buildVersion) || {};
  const coverageByPackages =
    useBuildVersion<ClassCoverage[]>('/build/coverage-by-packages', agentId, buildVersion) || [];

  return (
    <div className={className}>
      <SummaryPanel align="space-between">
        <CodeCoverageCard header="Build Code Coverage" coverage={coverage} />
        <ProjectMethodsCard header="Build Methods" methods={buildMethods} />
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
