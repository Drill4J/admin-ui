import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel, Section } from '../../../../layouts';
import { useBuildVersion } from '../use-build-version';
import { ActiveScope } from '../scope';
import { CoverageDetails } from '../coverage-details';
import { CodeCoverageCard } from './code-coverage-card';
import { ProjectMethodsCard } from './project-methods-card';
import { Coverage } from '../../../../types/coverage';
import { NewMethodsCoverage } from '../../../../types/new-methods-coverage';

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

  return (
    <div className={className}>
      <SummaryPanel align="space-between">
        <CodeCoverageCard coverage={coverage} />
        <ProjectMethodsCard coverage={coverage} newMethodsCoverage={newMethodsCoverage} />
      </SummaryPanel>
      <Section header="Latest Scope">
        <ActiveScope agentId={agentId} buildVersion={buildVersion} />
        <CoverageDetails buildVersion={buildVersion} />
      </Section>
    </div>
  );
});

const SummaryPanel = dashboard.summaryPanel(Panel);
