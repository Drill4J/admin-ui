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
import { useTable, useSortBy, useExpanded } from 'react-table';
import { Icons, useHover } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

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
    useSortBy,
    useExpanded,
  );
  const { ref } = useHover();

  return (
    <table {...getTableProps()} tw="w-full text-14 leading-16 text-monochrome-black">
      {!withoutHeader && (
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} tw="h-13 px-4">
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  tw="first:px-4 last:px-4"
                  style={{ textAlign: (column as any).text || 'right', width: column.width }}
                  ref={ref}
                >
                  <div tw="inline-flex">
                    {(column.isSorted) && (
                      <SortArrow active>
                        <Icons.SortingArrow rotate={column.isSortedDesc ? 0 : 180} />
                      </SortArrow>
                    )}
                    {column.render('Header')}
                  </div>

                </th>
              ))}
            </tr>
          ))}
        </TableHead>
      )}
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row);
          return (
            <>
              <TR {...row.getRowProps()} isExpanded={row.isExpanded}>
                {row.cells.map((cell: any) => (
                  <td
                    {...cell.getCellProps()}
                    tw="text-ellipsis first:px-4 last:px-4"
                    style={{ textAlign: (cell.column as any).text || 'right' }}
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

const SortArrow = styled.div`
  ${tw`h-4 w-4 cursor-pointer text-blue-medium-tint`};

  ${({ active }: { active: boolean }) => active && tw`text-blue-shade`};
`;
