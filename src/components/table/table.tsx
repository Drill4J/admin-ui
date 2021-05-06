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
import { useMemo } from 'react';
import { useTable, useExpanded } from 'react-table';
import { useHover, SortArrow } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';
import { setSort, useTableActionsDispatch, useTableActionsState } from 'modules';
import { Order } from 'types/sort';
import { nanoid } from 'nanoid';

export const Table = ({
  columns, data, renderRowSubComponent = null, withoutHeader,
}: any) => {
  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
  } = useTable(
    {
      columns: useMemo(() => columns, [columns]),
      data: useMemo(() => data, [data]),
    },
    useExpanded,
  );
  const { ref, isVisible } = useHover();

  const dispatch = useTableActionsDispatch();
  const { sort: [sort] } = useTableActionsState();

  return (
    <table {...getTableProps()} tw="w-full text-14 leading-16 text-monochrome-black">
      {!withoutHeader && (
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} tw="h-13 px-4" key={nanoid()}>
              {headerGroup.headers.map((column: any) => {
                const active = column.id === sort?.field;
                return (
                  <th
                  // {...column.getHeaderProps(column.getSortByToggleProps())}
                    tw="first:px-4 last:px-4"
                    style={{ textAlign: (column as any).text || 'right', width: column.width }}
                    onClick={() => dispatch(setSort({ order: setOrder(sort?.order), field: column.id }))}
                    key={nanoid()}
                  >
                    <div tw="relative inline-flex items-center cursor-pointer" ref={ref}>
                      {column.id !== 'expander' && (isVisible || active) && (
                        <SortArrow active={active} order={active ? sort.order : null} />
                      )}
                      {column.render('Header')}
                    </div>
                  </th>

                );
              })}
            </tr>
          ))}
        </TableHead>
      )}
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row);
          return (
            <>
              <TR {...row.getRowProps()} isExpanded={row.isExpanded} key={nanoid()}>
                {row.cells.map((cell: any) => (
                  <td
                    {...cell.getCellProps()}
                    tw="text-ellipsis first:px-4 last:px-4"
                    style={{ textAlign: (cell.column as any).text || 'right' }}
                    key={nanoid()}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </TR>
              {(row as any).isExpanded && renderRowSubComponent &&
                renderRowSubComponent({ row })}
            </>
          );
        })}
      </tbody>
    </table>
  );
};

const TableHead = styled.thead`
  ${tw`sticky -top-1 z-40 bg-monochrome-white 
    text-14 leading-20 font-bold 
    border-b border-t-2 border-monochrome-black`};
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
