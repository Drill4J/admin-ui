import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { LinkButton } from '@drill4j/ui-kit';
import { useParams } from 'react-router-dom';

import { InfoCard } from 'components';
import { TestsToRunModal } from 'modules';
import { percentFormatter } from 'utils';
import { TestTypeSummary } from 'types/test-type-summary';
import { TestSummary } from 'types/test-summary';
import { TestTypeCount } from 'types/test-type-count';
import { TestsInfo } from 'types/tests-info';
import { TestsToRun } from 'types/tests-to-run';
import { useBuildVersion } from '../use-build-version';

import styles from './project-tests-cards.module.scss';

interface Props {
  className?: string;
  allTests: TestSummary;
  testsByType: TestTypeSummary[];
  testsToRun?: TestTypeCount[];
}

interface TestToRunByType {
  [key: string]: TestTypeCount;
}

const projectTestsCards = BEM(styles);

export const ProjectTestsCards = projectTestsCards(
  ({
    className, allTests, testsByType, testsToRun = [],
  }: Props) => {
    const [testsFilter, setTestsFilter] = React.useState<string>('');
    const { agentId = '', pluginId = '' } = useParams<{ agentId: string, pluginId: string }>();
    const testsInfo: TestsInfo = testsByType.reduce((test, testType) => ({ ...test, [testType.type]: testType }), {});
    const testsToRunByType: TestToRunByType = testsToRun.reduce((test, testType) => ({ ...test, [testType.type]: testType }), {});
    const { testTypeToNames = {} } = useBuildVersion<TestsToRun>('/build/tests-to-run') || {};
    return (
      <div className={className}>
        <InfoCard
          label="TOTAL"
          covered={`${percentFormatter(allTests.coverage?.percentage || 0)}%`}
          totalCount={allTests.testCount}
        />
        <InfoCard
          label="AUTOMATED"
          covered={`${percentFormatter(testsInfo?.AUTO?.summary?.coverage?.percentage || 0)}%`}
          totalCount={testsInfo?.AUTO?.summary?.testCount}
        >
          {Boolean(testsToRunByType?.AUTO?.count) && (
            <LinkButton size="small" onClick={() => setTestsFilter('auto')} data-test="info-card:link-button:auto">
              {testsToRunByType?.AUTO?.count} to run
            </LinkButton>
          )}
        </InfoCard>
        <InfoCard
          label="MANUAL"
          covered={`${percentFormatter(testsInfo?.MANUAL?.summary?.coverage?.percentage || 0)}%`}
          totalCount={testsInfo?.MANUAL?.summary?.testCount}
        >
          {Boolean(testsToRunByType?.MANUAL?.count) && (
            <LinkButton size="small" onClick={() => setTestsFilter('manual')} data-test="info-card:link-button:manual">
              {testsToRunByType?.MANUAL?.count} to run
            </LinkButton>
          )}
        </InfoCard>
        {testsFilter && (
          <TestsToRunModal
            isOpen={Boolean(testsFilter)}
            onToggle={() => setTestsFilter('')}
            testsToRun={testTypeToNames}
            filter={testsFilter}
            agentId={agentId}
            pluginId={pluginId}
          />
        )}
      </div>
    );
  },
);
