import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel, Section } from '../../../../layouts';
import { Icons } from '../../../../components';
import { useBuildVersion } from '../use-build-version';
import { CurrentScope } from '../scope';
import { CoverageDetails } from '../coverage-details';
import { CodeCoverageCard } from '../code-coverage-card';
import { ProjectMethodsCard } from '../project-methods-card';
import { PluginContext } from '../store';
import { Coverage } from '../../../../types/coverage';
import { ClassCoverage } from '../../../../types/class-coverage';
import { Methods } from '../../../../types/methods';

import styles from './dashboard.module.scss';

interface Props {
  className?: string;
}

const dashboard = BEM(styles);

export const Dashboard = dashboard(({ className }: Props) => {
  const coverage = useBuildVersion<Coverage>('/build/coverage') || {};
  const buildMethods = useBuildVersion<Methods>('/build/methods') || {};
  const coverageByPackages = useBuildVersion<ClassCoverage[]>('/build/coverage-by-packages') || [];

  return (
    <div className={className}>
      <SummaryPanel align="space-between">
        <CodeCoverageCard header="Build Code Coverage" coverage={coverage} />
        <ProjectMethodsCard header="Build Methods" methods={buildMethods} />
      </SummaryPanel>
      <Section header="Current Scope">
        <CurrentScope />
        <CoverageDetails
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
