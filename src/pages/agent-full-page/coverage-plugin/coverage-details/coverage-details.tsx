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
import { useCallback, useMemo, useRef } from 'react';
import { Icons } from '@drill4j/ui-kit';
import { Route, useParams, Link } from 'react-router-dom';
import queryString from 'query-string';
import 'twin.macro';
import { useExpanded, useTable } from 'react-table';

import { ClassCoverage } from 'types/class-coverage';
import { FilterList } from 'types/filter-list';
import { useVisibleElementsCount, useBuildVersion } from 'hooks';
import {
  Cells, SearchPanel, Table, TR,
} from 'components';
import {
  useTableActionsState, useTableActionsDispatch, setSearch,
} from 'modules';
import { Package } from 'types/package';
import { NameCell } from './name-cell';
import { AssociatedTestModal } from './associated-test-modal';
import { CoverageCell } from './coverage-cell';

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

  const {
    buildVersion, agentId, pluginId, scopeId, tab,
  } = useParams<{ agentId?: string; pluginId?: string; buildVersion?: string; scopeId?: string; tab: string; }>();

  const getModalLink = (id: string, treeLevel: number) => (scopeId
    ? `/full-page/${agentId}/${buildVersion}/${pluginId}/scope/${scopeId}/${tab}/associated-test-modal/
    ?${queryString.stringify({ testId: id, treeLevel })}`
    : `/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard/${tab}/associated-test-modal/
    ?${queryString.stringify({ testId: id, treeLevel })}`);

  const columns = [
    {
      Header: () => null,
      id: 'expander',
      Cell: ({ row }: any) => (
        <span {...row.getToggleRowExpandedProps?.()} tw="grid place-items-center w-4 h-4 text-blue-default">
          {row.isExpanded ? <Icons.Expander rotate={90} /> : <Icons.Expander />}
        </span>
      ),
      width: '1%',
    },
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({ value = '' }: any) => (
        <NameCell
          icon={<Icons.Package />}
          value={value}
          testContext="package"
        />
      ),
      text: 'left',
      width: '30%',
      maxWidth: '30%',
    },
  ];

  const infoColumns = [
    {
      Header: () => (
        <div className="flex justify-end items-center w-full">
          Coverage, %<Icons.Checkbox tw="ml-4 min-w-16px text-monochrome-default" width={16} height={16} />
        </div>
      ),
      accessor: 'coverage',
      Cell: ({ value = 0 }: { value: number}) => <CoverageCell value={value} showCoverageIcon={showCoverageIcon} />,
      width: '10%',
    },
    {
      Header: 'Methods total',
      accessor: 'totalMethodsCount',
      width: '10%',
    },
    {
      Header: 'Methods covered',
      accessor: 'coveredMethodsCount',
      width: '10%',
    },
    {
      Header: 'Associated tests',
      accessor: 'assocTestsCount',
      Cell: ({ value = '', item: { id = '' } = {} }: any) => (
        <Cells.Clickable
          data-test="coverage-details:associated-tests-count"
          disabled={!value}
        >
          {value ? <Link to={getModalLink(id, 1)}>{value}</Link> : 'n/a'}
        </Cells.Clickable>
      ),
      width: '10%',
    },
  ];

  const ExpandedClasses = ({ parentRow }: any) => {
    const { classes = [] } = useBuildVersion<Package>(`/${classesTopicPrefix}/coverage/packages/${parentRow.values.name}`) || {};
    const expandColumns = [
      {
        id: 'expander',
        Cell: ({ row }: any) => (
          row.canExpand
            ? (
              <span
                {...row.getToggleRowExpandedProps?.()}
                tw="absolute top-2.5 left-13 z-50 grid place-items-center w-4 h-4 text-blue-default"
              >
                {row.isExpanded ? <Icons.Expander rotate={90} /> : <Icons.Expander />}
              </span>
            ) : null
        ),
        width: '1%',
      },
      {
        accessor: 'name',
        Cell: ({ value = '', row }: any) => (
          row.canExpand
            ? (
              <div tw="pl-8">
                <NameCell
                  icon={<Icons.Class />}
                  value={value}
                  testContext="package"
                />
              </div>
            )
            : (
              <div tw="pl-13">
                <Cells.Compound
                  key={value}
                  cellName={value}
                  cellAdditionalInfo={row.original.decl}
                  icon={<Icons.Function />}
                />
              </div>
            )
        ),
        text: 'left',
        width: '30%',
      },
    ];
    const { rows, prepareRow } = useTable(
      {
        columns: useMemo(() => [...expandColumns, ...infoColumns] as any, [columns]),
        data: useMemo(() => classes.map((el) => ({ ...el, subRows: el.methods })), [classes]),
      },
      useExpanded,
    );

    return (
      <>
        {rows.map((row: any) => {
          prepareRow(row);
          return (
            <TR {...row.getRowProps()} tw="h-10 border-b border-monochrome-medium-tint" isExpanded={row.isExpanded}>
              {row.cells.map((cell: any) => (
                <td
                  {...cell.getCellProps()}
                  tw="relative first:px-4 last:px-4"
                  style={{ textAlign: (cell.column as any).text || 'right' }}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </TR>
          );
        })}
      </>
    );
  };

  const renderRowSubComponent = useCallback(
    ({ row }) => <ExpandedClasses parentRow={row} />, [],
  );
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
        <Table
          columns={[...columns, ...infoColumns]}
          data={coverageByPackages}
          renderRowSubComponent={renderRowSubComponent}
        />
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
