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
import { useRef } from 'react';
import { Icons } from '@drill4j/ui-kit';
import { Route, useParams, Link } from 'react-router-dom';
import queryString from 'query-string';
import 'twin.macro';

import { ClassCoverage } from 'types/class-coverage';
import { FilterList } from 'types/filter-list';
import { useVisibleElementsCount, useBuildVersion } from 'hooks';
import { Cells, SearchPanel, Stub } from 'components';
import {
  useTableActionsState, useTableActionsDispatch, setSearch,
} from 'modules';
import { NameCell } from './name-cell';
import { AssociatedTestModal } from './associated-test-modal';
import { ExpandableTable, Column } from './table';
import { CoverageCell } from './coverage-cell';
import { CellProps } from './table/table-types';

interface Props {
  topic: string;
  associatedTestsTopic: string;
  classesTopicPrefix: string;
  showCoverageIcon: boolean;
}

export const CoverageDetails = ({
  associatedTestsTopic, classesTopicPrefix, topic, showCoverageIcon,
}: Props) => {
  const dispatch = useTableActionsDispatch();
  const { search, sort } = useTableActionsState();
  const {
    items: coverageByPackages = [],
    totalCount = 0,
    filteredCount = 0,
  } = useBuildVersion<FilterList<ClassCoverage>>(topic, search, sort, 'LIST') || {};
  const ref = useRef<HTMLDivElement>(null);
  const visibleElementsCount = useVisibleElementsCount(ref, 10, 10);
  const [searchQuery] = search;
  const expandedColumns = [
    <Column
      name="coverage"
      Cell={({ value = 0 }) => <CoverageCell value={value as number} showCoverageIcon={showCoverageIcon} />}
    />,
    <Column name="totalMethodsCount" testContext="total-methods-count" />,
    <Column name="coveredMethodsCount" testContext="covered-methods-count" />,
  ];
  const {
    buildVersion, agentId, pluginId, scopeId, tab,
  } = useParams<{ agentId?: string; pluginId?: string; buildVersion?: string; scopeId?: string; tab: string; }>();

  const getModalLink = (id: string, treeLevel: number) => (scopeId
    ? `/full-page/${agentId}/${buildVersion}/${pluginId}/scope/${scopeId}/${tab}/associated-test-modal/
    ?${queryString.stringify({ testId: id, treeLevel })}`
    : `/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard/${tab}/associated-test-modal/
    ?${queryString.stringify({ testId: id, treeLevel })}`);

  return (
    <div tw="flex flex-col">
      <>
        <div tw="mt-2">
          <SearchPanel
            onSearch={(searchValue) => dispatch(setSearch([{ value: searchValue, field: 'name', op: 'CONTAINS' }]))}
            searchQuery={searchQuery?.value}
            searchResult={filteredCount}
            placeholder="Search package by name"
          >
            Displaying {coverageByPackages.slice(0, visibleElementsCount).length} of {totalCount} packages
          </SearchPanel>
        </div>
        <ExpandableTable
          data={coverageByPackages.slice(0, visibleElementsCount)}
          idKey="name"
          classesTopicPrefix={classesTopicPrefix}
          tableContentStub={coverageByPackages.length === 0 && (
            <Stub
              icon={<Icons.Package height={104} width={107} />}
              title="No results found"
              message="Try adjusting your search or filter to find what you are looking for."
            />
          )}
          expandedColumns={[
            <Column
              name="name"
              Cell={(({ item: { name = '' } = {} }: CellProps<unknown, { name?: string }>) => (
                <NameCell type="primary" icon={<Icons.Class width={16} height={16} />} value={name} testContext="class" />
              ))}
              align="start"
            />,
            ...expandedColumns,
            <Column
              name="assocTestsCount"
              label="Associated tests"
              Cell={({
                value = '',
                item: { id = '' } = {},
              }: CellProps<string, { id?: string; assocTestsCount?: number }>) => (
                <Cells.Clickable
                  data-test="coverage-details:associated-tests-count"
                  disabled={!value}
                >
                  {value ? <Link to={getModalLink(id, 2)}>{value}</Link> : 'n/a'}
                </Cells.Clickable>
              )}
            />,
          ]}
          secondLevelExpand={[
            <Column
              name="name"
              Cell={({ item: { name = '', decl = '' } = {} }: CellProps<unknown, { name?: string, decl?: string }>) => (
                <div tw="pr-4"><Cells.Compound key={name} cellName={name} cellAdditionalInfo={decl} icon={<Icons.Function />} /></div>
              )}
              align="start"
            />,
            ...expandedColumns,
            <Column
              name="assocTestsCount"
              label="Associated tests"
              Cell={({
                value = '',
                item: { id = '' } = {},
              }: CellProps<string, { id?: string; assocTestsCount?: number }>) => (
                <Cells.Clickable
                  data-test="coverage-details:associated-tests-count"
                  disabled={!value}
                >
                  {value ? <Link to={getModalLink(id, 3)}>{value}</Link> : 'n/a'}
                </Cells.Clickable>
              )}
            />,
          ]}
          expandedContentKey="name"
          hasSecondLevelExpand
        >
          <Column
            name="name"
            label="Name"
            Cell={({ value = '' }: CellProps<string, unknown>) => (
              <NameCell
                icon={<Icons.Package />}
                value={value}
                testContext="package"
              />
            )}
            align="start"
          />
          <Column
            name="coverage"
            label={(
              <div className="flex justify-end items-center w-full">
                Coverage, %<Icons.Checkbox tw="ml-4 min-w-16px text-monochrome-default" width={16} height={16} />
              </div>
            )}
            Cell={({ value = 0 }) => <CoverageCell value={value as number} showCoverageIcon={showCoverageIcon} />}
          />
          <Column name="totalMethodsCount" label="Methods total" testContext="total-methods-count" />
          <Column name="coveredMethodsCount" label="Methods covered" testContext="covered-methods-count" />
          <Column
            name="assocTestsCount"
            label="Associated tests"
            Cell={({ value = '', item: { id = '' } = {} }: CellProps<string, { id?: string; assocTestsCount?: number }>) => (
              <Cells.Clickable
                data-test="coverage-details:associated-tests-count"
                disabled={!value}
              >
                {value ? <Link to={getModalLink(id, 1)}>{value}</Link> : 'n/a'}
              </Cells.Clickable>
            )}
          />
        </ExpandableTable>
        <div ref={ref} />
      </>
      <Route
        path={[
          '/full-page/:agentId/:buildVersion/:pluginId/dashboard/:tab/associated-test-modal',
          '/full-page/:agentId/:buildVersion/:pluginId/scope/:scopeId/:tab/associated-test-modal',
        ]}
        render={() => (
          <AssociatedTestModal
            associatedTestsTopic={associatedTestsTopic}
          />
        )}
      />
    </div>
  );
};
