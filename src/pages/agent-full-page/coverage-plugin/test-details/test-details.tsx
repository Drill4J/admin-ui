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
import { useState, useRef } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import {
  Icons, Column, Table,
} from '@drill4j/ui-kit';
import 'twin.macro';

import { capitalize } from 'utils';
import { TestCoverageInfo } from 'types/test-coverage-info';
import { FilterList } from 'types/filter-list';
import { Cells, SearchPanel } from 'components';
import {
  CoveredMethodsByTestSidebar, NoResultsFoundSub, setSearch, useTableActionsDispatch, useTableActionsState,
} from 'modules';
import { useVisibleElementsCount } from 'hooks';
import { NoTestsStub } from './no-tests-stub';

import styles from './test-details.module.scss';

interface Props {
  className?: string;
  tests: FilterList<TestCoverageInfo>;
  topicCoveredMethodsByTest: string;
}

const testDetails = BEM(styles);

export const TestDetails = testDetails(
  ({
    className, topicCoveredMethodsByTest, tests: { items: tests = [], totalCount = 0, filteredCount = 0 },
  }: Props) => {
    const [selectedTest, setSelectedTest] = useState<null | { id: string; covered: number }>(null);
    const ref = useRef<HTMLDivElement>(null);
    const visibleElementsCount = useVisibleElementsCount(ref, 10, 10);
    const dispatch = useTableActionsDispatch();
    const { search } = useTableActionsState();
    const [searchQuery] = search;

    return (
      <div className={className}>
        <>
          <div tw="mt-2">
            <SearchPanel
              onSearch={(searchValue) => dispatch(setSearch([{ value: searchValue, field: 'name', op: 'CONTAINS' }]))}
              searchQuery={searchQuery?.value}
              searchResult={filteredCount}
              placeholder="Search tests by name"
            >
              Displaying {tests.slice(0, visibleElementsCount).length} of {totalCount} tests
            </SearchPanel>
          </div>
          <Table
            data={tests.slice(0, visibleElementsCount)}
            idKey="name"
            gridTemplateColumns="calc(100% - 664px) 130px 76px 152px 186px 120px"
          >
            <Column
              name="testName"
              label="Name"
              Cell={({ item: { name } }) => (
                <Cells.Compound cellName={name} cellAdditionalInfo="&ndash;" icon={<Icons.Test height={16} width={16} />} />
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
              label="Status"
              Cell={({ value }) => (
                <Cells.TestStatus
                  type={value}
                >
                  {capitalize(value)}
                </Cells.TestStatus>
              )}
              align="start"
            />
            <Column
              name="coverage.percentage"
              label="Coverage, %"
              Cell={Cells.Coverage}
            />
            <Column
              name="coverage.methodCount.covered"
              label="Methods covered"
              Cell={({ value, item: { id = '', coverage: { methodCount: { covered = 0 } = {} } = {} } = {} }) => (
                <Cells.Clickable
                  onClick={() => setSelectedTest({ id, covered })}
                  data-test="test-actions:view-curl:id"
                  disabled={!value}
                >
                  {value}
                </Cells.Clickable>
              )}
            />
            <Column
              name="stats.duration"
              label="Duration"
              Cell={Cells.Duration}
            />,
          </Table>
        </>
        {!tests.length && !searchQuery?.value && <NoTestsStub />}
        {!filteredCount && searchQuery?.value && <NoResultsFoundSub><Icons.Test height={104} width={107} /></NoResultsFoundSub>}
        {selectedTest !== null && (
          <CoveredMethodsByTestSidebar
            isOpen={Boolean(selectedTest)}
            onToggle={() => setSelectedTest(null)}
            testInfo={selectedTest}
            topicCoveredMethodsByTest={topicCoveredMethodsByTest}
          />
        )}
        <div ref={ref} />
      </div>
    );
  },
);
