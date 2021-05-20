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
  Cells, SearchPanel, Stub, Table, TR,
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
      SubCell: ({ row }: any) => (
        row.canExpand
          ? (
            <span
              {...row.getToggleRowExpandedProps?.()}
              tw="absolute top-2.5 left-11 z-50 grid place-items-center w-4 h-4 text-blue-default"
            >
              {row.isExpanded ? <Icons.Expander rotate={90} /> : <Icons.Expander />}
            </span>
          ) : null
      ),
      width: '44px',
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
      SubCell: ({ value = '', row }: any) => (
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
      textAlign: 'left',
      width: '60%',
    },
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
      Cell: ({ value = '', row }: any) => (
        <Cells.Clickable
          data-test="coverage-details:associated-tests-count"
          disabled={!value}
        >
          {value ? <Link to={getModalLink(row.original.id, 1)}>{value}</Link> : 'n/a'}
        </Cells.Clickable>
      ),
      width: '10%',
    },
  ];

  const ExpandedClasses = ({ parentRow }: any) => {
    const { classes = [] } = useBuildVersion<Package>(`/${classesTopicPrefix}/coverage/packages/${parentRow.values.name}`) || {};
    const { rows, prepareRow } = useTable(
      {
        columns: useMemo(() => columns as any, []),
        data: useMemo(() => classes, [JSON.stringify(classes)]),
        getSubRows: (row) => row.methods || [],
      },
      useExpanded,
    );

    return (
      <>
        {rows.map((row: any) => {
          prepareRow(row);
          const rowProps = row.getRowProps();
          return (
            <TR {...rowProps} isExpanded={row.isExpanded}>
              {row.cells.map((cell: any) => (
                <td
                  {...cell.getCellProps()}
                  tw="relative first:px-4 last:px-4"
                  style={{ textAlign: cell.column.textAlign || 'right' }}
                  data-test={`expanded-td-${rowProps.key}-${cell.column.id}`}
                >
                  {cell.render(cell.column.SubCell ? 'SubCell' : 'Cell')}
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
  const columnDependency = useMemo(() => [showCoverageIcon], [showCoverageIcon]);
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
        <div tw="overflow-x-auto">
          <div style={{ minWidth: '1100px' }}>
            <Table
              columns={columns}
              data={coverageByPackages.slice(0, visibleElementsCount)}
              renderRowSubComponent={renderRowSubComponent}
              columnsDependency={columnDependency}
              stub={coverageByPackages.length === 0 && (
                <Stub
                  icon={<Icons.Package height={104} width={107} />}
                  title="No results found"
                  message="Try adjusting your search or filter to find what you are looking for."
                />
              )}
            />
            <div ref={ref} />
          </div>
        </div>
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
