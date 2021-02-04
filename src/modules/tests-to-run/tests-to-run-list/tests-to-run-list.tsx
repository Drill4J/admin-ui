/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import {
  Table, Column, Icons, Legend,
} from '@drill4j/ui-kit';
import { useParams } from 'react-router-dom';

import { ParentBuild } from 'types/parent-build';
import { Cells, SearchPanel } from 'components';
import { TestCoverageInfo } from 'types/test-coverage-info';
import { FilterList } from 'types/filter-list';
import { Search } from 'types/search';
import { BuildSummary } from 'types/build-summary';
import { TestsInfo } from 'types/tests-info';
import { useBuildVersion, useAgent } from 'hooks';
import { CoveredMethodsByTestSidebar } from 'modules';
import { capitalize } from 'utils';
import { DATA_VISUALIZATION_COLORS } from 'common/constants';
import { TestsToRunSummary } from 'types/tests-to-run-summary';
import { TestsToRunHeader } from './tests-to-run-header';
import { BarChart } from './bar-chart';
import { NoTestsToRunStub } from './no-tests-to-run-stub';
import { NoDataStub } from './no-data-stub';

import styles from './tests-to-run-list.module.scss';

interface Props {
  className?: string;
  agentType?: string;
}

const testsToRunList = BEM(styles);

export const TestsToRunList = testsToRunList(({ className, agentType = 'Agent' }: Props) => {
  const [selectedTest, setSelectedTest] = useState('');
  const [search, setSearch] = useState<Search[]>([{ field: 'name', value: '', op: 'CONTAINS' }]);
  const {
    items: testsToRun = [],
    filteredCount = 0,
    totalCount = 0,
  } = useBuildVersion<FilterList<TestCoverageInfo>>('/build/tests-to-run', search, undefined, 'LIST') || {};
  const [searchQuery] = search;
  const { buildVersion = '', agentId = '' } = useParams<{ buildVersion: string; agentId: string; }>();
  const { buildVersion: activeBuildVersion = '' } = useAgent(agentId) || {};
  const { version: previousBuildVersion = '' } = useBuildVersion<ParentBuild>('/data/parent') || {};
  const summaryTestsToRun = useBuildVersion<TestsToRunSummary>('/build/summary/tests-to-run') || {};
  const { tests: previousBuildTests = [], testDuration: totalDuration = 1 } = useBuildVersion<BuildSummary>(
    '/build/summary', undefined, undefined, undefined, previousBuildVersion,
  ) || {};
  const { AUTO } = previousBuildTests
    .reduce((test, testType) => ({ ...test, [testType.type]: testType }), {}) as TestsInfo;
  const previousBuildAutoTestsCount = AUTO?.summary?.testCount || 0;
  return (
    <div className={className}>
      <TestsToRunHeader
        agentInfo={{
          agentType, buildVersion, previousBuildVersion, activeBuildVersion,
        }}
        summaryTestsToRun={summaryTestsToRun}
        previousBuildTestsDuration={totalDuration}
        previousBuildAutoTestsCount={previousBuildAutoTestsCount}
      />
      <div className="flex justify-between items-start w-full">
        <BarTitle data-test="tests-to-run-list:bar-title">SAVED TIME HISTORY</BarTitle>
        <Legend
          legendItems={[
            { label: 'No data', borderColor: DATA_VISUALIZATION_COLORS.SAVED_TIME, color: 'transparent' },
            { label: 'Saved time', color: DATA_VISUALIZATION_COLORS.SAVED_TIME },
            { label: 'Duration with Drill4J', color: DATA_VISUALIZATION_COLORS.DURATION_WITH_D4J },
          ]}
        />
      </div>
      {previousBuildAutoTestsCount ? (
        <BarChart
          activeBuildVersion={activeBuildVersion}
          totalDuration={totalDuration}
          summaryTestsToRun={summaryTestsToRun}
        />
      ) : <NoDataStub />}
      <div>
        <TableTitle data-test="tests-to-run-list:table-title">ALL SUGGESTED TESTS ({totalCount})</TableTitle>
        <div>
          <SearchPanel
            onSearch={(value) => setSearch([{ ...searchQuery, value }])}
            searchQuery={searchQuery.value}
            searchResult={filteredCount}
            placeholder="Search tests by name"
          >
            Displaying {filteredCount} of {totalCount} tests
          </SearchPanel>
          <Table data={testsToRun} idKey="name" gridTemplateColumns="calc(100% - 664px) 130px 76px 152px 186px 120px">
            <Column
              name="name"
              label="Name"
              Cell={({ value }) => (
                <Cells.Compound cellName={value} cellAdditionalInfo="&ndash;" icon={<Icons.Test height={16} width={16} />} />
              )}
              align="start"
            />
            <Column
              name="type"
              label="Test type"
              Cell={({ value }) => (
                <>
                  {capitalize(value)}
                </>
              )}
              align="start"
            />
            <Column
              name="stats.result"
              label="State"
              Cell={({ item: { toRun } }) => (
                <StateCell>{toRun ? 'To run' : <Done>Done</Done>}</StateCell>
              )}
              align="start"
            />
            <Column
              name="coverage.percentage"
              label="Coverage, %"
              Cell={({ value, item: { toRun } }) => (toRun ? null : <Cells.Coverage value={value} />)}
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
            />
            <Column
              name="stats.duration"
              label="Duration"
              Cell={({ value, item: { toRun } }) => (toRun ? null : <Cells.Duration value={value} />)}
            />,
          </Table>
        </div>
      </div>
      {!testsToRun.length && <NoTestsToRunStub />}
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

const BarTitle = testsToRunList.barTitle('span');
const TableTitle = testsToRunList.tableTitle('span');
const Done = testsToRunList.done('span');
const StateCell = testsToRunList.stateCell('span');
