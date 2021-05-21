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
import React, { useMemo, useState } from 'react';
import {
  useTable, useExpanded, Column, useSortBy, usePagination,
} from 'react-table';
import { withErrorBoundary } from 'react-error-boundary';
import { Button, Icons } from '@drill4j/ui-kit';

import { TableErrorFallback } from 'components';
import {
  setSearch, setSort, useTableActionsDispatch, useTableActionsState,
} from 'modules';
import { Order } from 'types/sort';
import tw, { styled } from 'twin.macro';
import { SearchPanel } from 'components/search-panel';

type CustomColumn = Column & { textAlign?: string; width?: string; }

interface Props {
  columns: Array<CustomColumn>;
  data: Array<any>;
  totalCount?: number;
  filteredCount?: number;
  placeholder?: string;
  renderRowSubComponent?: ({ row, rowProps }: any) => JSX.Element;
  stub?: React.ReactNode;
  isDefaulToggleSortBy?: boolean;
  columnsDependency?: Array<string | number | boolean | null | undefined>;
  withSearchPanel?: boolean;
}

export const Table = withErrorBoundary(({
  columns,
  data,
  totalCount,
  filteredCount = 0,
  placeholder = 'Search value by name',
  renderRowSubComponent,
  stub = null,
  isDefaulToggleSortBy,
  columnsDependency = [],
  withSearchPanel = true,
}: Props) => {
  const {
    page,
    getTableProps, getTableBodyProps, headerGroups, prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  }: any = useTable(
    {
      columns: useMemo(() => columns, [...columnsDependency]),
      data: useMemo(() => data, [data]),
    },
    useSortBy,
    useExpanded,
    usePagination,
  );

  const dispatch = useTableActionsDispatch();
  const { sort: [sort], search } = useTableActionsState();
  const [searchQuery] = search;

  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  if (typeof data !== 'object') {
    throw new Error('Table received incorrect data');
  }

  return (
    <>
      {withSearchPanel && (
        <div tw="mt-2">
          <SearchPanel
            onSearch={(searchValue) => dispatch(setSearch([{ value: searchValue, field: 'name', op: 'CONTAINS' }]))}
            searchQuery={searchQuery?.value}
            searchResult={filteredCount}
            placeholder={placeholder}
          >
            Displaying {page.length} of {totalCount} packages
          </SearchPanel>
        </div>
      )}
      <div tw="overflow-x-auto">
        <div style={{ minWidth: '1100px' }}>
          <table {...getTableProps()} tw="table-fixed w-full text-14 leading-16 text-monochrome-black">
            <TableHead>
              {headerGroups.map((headerGroup: any) => (
                <tr {...headerGroup.getHeaderGroupProps()} tw="h-13 px-4">
                  {headerGroup.headers.map((column: any) => {
                    const active = column.id === sort?.field;
                    const defaulToggleSortBy = column.getSortByToggleProps().onClick;
                    return (
                      <TH
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        style={{ textAlign: column.textAlign || 'right', width: column.width }}
                        onClick={isDefaulToggleSortBy
                          ? defaulToggleSortBy
                          : () => dispatch(setSort({ order: setOrder(sort?.order), field: column.id }))}
                        data-test={`table-th-${column.id}`}
                      >
                        <div tw="relative inline-flex items-center cursor-pointer">
                          {column.id !== 'expander' && (
                            <SortArrow active={column.isSorted || active}>
                              <Icons.SortingArrow rotate={column.isSortedDesc || (active && sort?.order === 'DESC') ? 0 : 180} />
                            </SortArrow>
                          )}
                          {column.render('Header')}
                        </div>
                      </TH>

                    );
                  })}
                </tr>
              ))}
            </TableHead>
            <tbody {...getTableBodyProps()}>
              {page.map((rawRow: any) => {
                const row = { ...rawRow, isExpanded: expandedRows.includes(rawRow.original.id) };
                prepareRow(row);
                const rowProps = row.getRowProps();
                return (
                  <React.Fragment key={row.original.id}>
                    <TR {...rowProps} isExpanded={row.isExpanded}>
                      {row.cells.map((cell: any) => (
                        <td
                          {...cell.getCellProps()}
                          tw="first:px-4 last:px-4"
                          style={{ textAlign: cell.column.textAlign || 'right' }}
                          data-test={`td-${rowProps.key}-${cell.column.id}`}

                        >
                          <div onClick={() => cell.column.id === 'expander' &&
                        setExpandedRows(row.isExpanded
                          ? expandedRows.filter((id) => id !== row.original.id)
                          : [...expandedRows, row.original.id])}
                          >
                            {cell.render('Cell')}
                          </div>
                        </td>
                      ))}
                    </TR>
                    {row.isExpanded && renderRowSubComponent?.({ row, rowProps })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {stub}
      {pageOptions.length > 10 && (
        <div tw="flex items-center gap-x-4 mt-6">
          <Button primary size="small" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>First</Button>
          <Button secondary size="small" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
          <Button secondary size="small" onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
          <Button primary size="small" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>Last</Button>
          <div tw="flex gap-x-2">
            Page
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </div>
          <NumberInput
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page1 = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page1);
            }}
          />
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50, 100].map(count => (
              <option key={count} value={count}>
                Show {count}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}, {
  FallbackComponent: TableErrorFallback,
});

const TableHead = styled.thead`
  ${tw`bg-monochrome-white text-14 leading-20 font-bold border-b border-t border-monochrome-black`};
`;

const SortArrow = styled.div`
  ${tw`invisible absolute -left-4 grid place-items-center h-4 w-4 text-blue-medium-tint cursor-pointer`};

  ${({ active }: { active: boolean }) => active && tw`visible text-blue-shade`}
`;

const TH = styled.th`
  ${tw`first:px-4 last:px-4`};

  &:hover ${SortArrow} {
    ${tw`visible`};
  }
`;

export const TR = styled.tr`
  ${tw`h-10 border-b border-monochrome-medium-tint`}
  ${({ isExpanded }: { isExpanded: boolean }) => isExpanded && tw`bg-monochrome-light-tint`}
`;

const NumberInput = styled.input`
  width: 60px;
  height: 32px;
  ${tw`py-0 px-2 text-right text-14 leading-22 text-monochrome-black`};
  ${tw`rounded border border-monochrome-medium-tint bg-monochrome-white outline-none`};
  
  :focus {
    ${tw`border border-monochrome-black`};
  }

  ::placeholder {
    ${tw`text-monochrome-default`};
  }
  ${({ disabled }) =>
    disabled &&
    tw`border border-monochrome-medium-tint bg-monochrome-light-tint text-monochrome-default`}
`;

function setOrder(order: Order) {
  switch (order) {
    case 'ASC':
      return 'DESC';
    case 'DESC':
      return null;
    default:
      return 'ASC';
  }
}
