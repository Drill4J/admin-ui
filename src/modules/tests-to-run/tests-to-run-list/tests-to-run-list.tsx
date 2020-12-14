import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import {
  Table, Column, Icons, Panel, Legend,
} from '@drill4j/ui-kit';
import { useParams } from 'react-router-dom';

import { ParentBuild } from 'types/parent-build';
import { Cells, SearchPanel } from 'components';
import { TestCoverageInfo } from 'types/test-coverage-info';
import { FilterList } from 'types/filter-list';
import { Metrics } from 'types/metrics';
import { Search } from 'types/search';
import { useBuildVersion, useAgent } from 'hooks';
import { CoveredMethodsByTestSidebar } from 'modules';
import { capitalize } from 'utils';
import { DATA_VISUALIZATION_COLORS } from 'common/constants';
import { TestsToRunHeader } from './tests-to-run-header';
import { BarChart } from './bar-chart';

import styles from './tests-to-run-list.module.scss';

interface Props {
  className?: string;
  agentType?: string;
}

const testsToRunList = BEM(styles);

export const TestsToRunList = testsToRunList(({ className, agentType = 'Agent' }: Props) => {
  const [selectedTest, setSelectedTest] = React.useState('');
  const [search, setSearch] = React.useState<Search[]>([{ field: 'name', value: '', op: 'CONTAINS' }]);
  const {
    items: testsToRun = [],
    filteredCount = 0,
    totalCount = 0,
  } = useBuildVersion<FilterList<TestCoverageInfo>>('/build/tests-to-run', search, undefined, 'LIST') || {};
  const { tests: testToRunCount = 0 } = useBuildVersion<Metrics>('/data/stats') || {};
  const [searchQuery] = search;
  const { buildVersion = '', agentId = '' } = useParams<{ buildVersion: string; agentId: string; }>();
  const { buildVersion: activeBuildVersion = '' } = useAgent(agentId) || {};
  const { version: previousBuildVersion = '' } = useBuildVersion<ParentBuild>('/data/parent') || {};

  return (
    <div className={className}>
      <TestsToRunHeader
        agentInfo={{
          agentType, buildVersion, previousBuildVersion, activeBuildVersion,
        }}
        testsToRunCount={testToRunCount}
      />
      <Panel align="space-between">
        <Title data-test="tests-to-run-list:title">SAVED TIME HISTORY</Title>
        <Legend
          legendItems={[
            { label: 'No data', borderColor: DATA_VISUALIZATION_COLORS.SAVED_TIME, color: 'transparent' },
            { label: 'Saved time', color: DATA_VISUALIZATION_COLORS.SAVED_TIME },
            { label: 'Duration with Drill4J', color: DATA_VISUALIZATION_COLORS.DURATION_WITH_D4J },
          ]}
        />
      </Panel>
      <BarChart buildVersion={{ activeBuildVersion, previousBuildVersion }} />
      <Title data-test="tests-to-run-list:title">ALL SUGGESTED TESTS ({totalCount})</Title>
      <div>
        <SearchPanel
          onSearch={(value) => setSearch([{ ...searchQuery, value }])}
          searchQuery={searchQuery.value}
          searchResult={filteredCount}
          placeholder="Search tests by name"
        >
          Displaying {filteredCount} of {totalCount} tests
        </SearchPanel>
        <Table data={testsToRun} idKey="name" columnsSize="medium">
          <Column
            name="name"
            label="Name"
            Cell={({ value }) => (
              <Cells.Compound cellName={value} cellAdditionalInfo="&ndash;" icon={<Icons.Test />} />
            )}
          />
          <Column
            name="type"
            label="Test type"
            width="108px"
            Cell={({ value }) => (
              <>
                {capitalize(value)}
              </>
            )}
          />
          <Column
            name="stats.result"
            label="State"
            Cell={({ item: { toRun } }) => (
              toRun ? <>To run</> : <Done>Done</Done>
            )}
            width="68px"
          />
          <Column
            name="coverage.percentage"
            label="Coverage, %"
            Cell={({ value, item: { toRun } }) => (toRun ? null : <Cells.Coverage value={value} />)}
            align="right"
            width="98px"
          />
          <Column
            name="coverage.methodCount.covered"
            label="Methods covered"
            Cell={({ value, item: { id = '', toRun } }) => (
              toRun ? null : (
                <Cells.Clickable
                  onClick={() => setSelectedTest(id)}
                  disabled={!value}
                >
                  {value}
                </Cells.Clickable>
              )
            )}
            align="right"
            width="162px"
          />
          <Column
            name="stats.duration"
            label="Duration"
            Cell={({ value, item: { toRun } }) => (toRun ? null : <Cells.Duration value={value} />)}
            align="right"
            width="118px"
          />,
        </Table>
      </div>
      {Boolean(selectedTest) && (
        <CoveredMethodsByTestSidebar
          isOpen={Boolean(selectedTest)}
          onToggle={() => setSelectedTest('')}
          testId={selectedTest}
          topicCoveredMethodsByTest="/build/tests/covered-methods"
        />
      )}
    </div>
  );
});

const Title = testsToRunList.title('span');
const Done = testsToRunList.done('span');
