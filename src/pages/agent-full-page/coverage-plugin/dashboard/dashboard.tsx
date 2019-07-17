import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel, Section } from '../../../../layouts';
import { ActiveScope } from '../scope';
import { CoverageDetails } from '../coverage-details';
import { CodeCoverageCard } from './code-coverage-card';
import { ProjectMethodsCard } from './project-methods-card';

import styles from './dashboard.module.scss';

interface Props {
  className?: string;
  agentId: string;
  buildVersion: string;
}

const dashboard = BEM(styles);

export const Dashboard = dashboard(({ className, agentId, buildVersion }: Props) => {
  return (
    <div className={className}>
      <SummaryPanel align="space-between">
        <CodeCoverageCard agentId={agentId} buildVersion={buildVersion} />
        <ProjectMethodsCard agentId={agentId} buildVersion={buildVersion} />
      </SummaryPanel>
      <Section header="Latest Scope">
        <ActiveScope agentId={agentId} buildVersion={buildVersion} />
        <CoverageDetails buildVersion={buildVersion} />
      </Section>
    </div>
  );
});

const SummaryPanel = dashboard.summaryPanel(Panel);
