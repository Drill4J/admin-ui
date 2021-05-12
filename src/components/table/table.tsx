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
import React, { useMemo } from 'react';
import {
  useTable, useExpanded, Column,
} from 'react-table';
import { Icons } from '@drill4j/ui-kit';

import { setSort, useTableActionsDispatch, useTableActionsState } from 'modules';
import { Order } from 'types/sort';
import { nanoid } from 'nanoid';
import tw, { styled } from 'twin.macro';

type CustomColumn = Column & { textAlign?: string; width?: string; }

interface Props {
  columns: Array<CustomColumn>;
  data: Array<any>;
  renderRowSubComponent?: ({ row, rowProps }: any) => JSX.Element;
  stub?: React.ReactNode;
}

export const Table = ({
  columns, data, renderRowSubComponent, stub = null,
}: Props) => {
  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
  } = useTable(
    {
      columns: useMemo(() => columns, [columns]),
      data: useMemo(() => data, [data]),
    },
    useExpanded,
  );

  const dispatch = useTableActionsDispatch();
  const { sort: [sort] } = useTableActionsState();

  return (
    <>
      <table {...getTableProps()} tw="table-fixed w-full text-14 leading-16 text-monochrome-black">
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} tw="h-13 px-4" key={nanoid()}>
              {headerGroup.headers.map((column: any) => {
                const active = column.id === sort?.field;
                return (
                  <TH
                    style={{ textAlign: column.textAlign || 'right', width: column.width }}
                    onClick={() => dispatch(setSort({ order: setOrder(sort?.order), field: column.id }))}
                    key={nanoid()}
                  >
                    <div tw="relative inline-flex items-center cursor-pointer">
                      {column.id !== 'expander' && (
                        <SortArrow active={active}>
                          <Icons.SortingArrow rotate={sort?.order === 'DESC' ? 0 : 180} />
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
          {rows.map((row: any) => {
            prepareRow(row);
            const rowProps = row.getRowProps();
            return (
              <React.Fragment key={nanoid()}>
                <TR {...rowProps} isExpanded={row.isExpanded}>
                  {row.cells.map((cell: any) => (
                    <td
                      {...cell.getCellProps()}
                      tw="text-ellipsis first:px-4 last:px-4"
                      style={{ textAlign: cell.column.textAlign || 'right' }}
                      key={nanoid()}
                    >
                      {cell.render('Cell', { value: cell.value ? cell.value : null })}
                    </td>
                  ))}
                </TR>
                {row.isExpanded && renderRowSubComponent?.({ row, rowProps })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      {stub}
    </>
  );
};

const TableHead = styled.thead`
  ${tw`sticky -top-1 z-40 bg-monochrome-white 
    text-14 leading-20 font-bold 
    border-b border-t-2 border-monochrome-black`};
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
