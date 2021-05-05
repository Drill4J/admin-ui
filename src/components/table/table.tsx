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
import { useTable, useSortBy, useExpanded } from 'react-table';
import { Icons, useHover } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

export const Table = ({ columns, data }: any) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useExpanded,
  );

  // Render the UI for your table
  const { ref, isVisible } = useHover();

  return (
    <table {...getTableProps()} tw="w-full text-14 leading-16 text-monochrome-black">
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} tw="h-13 px-4">
            {headerGroup.headers.map((column: any) => {
              console.log(column);
              return (
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
              );
            })}
          </tr>
        ))}
      </TableHead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} tw="min-h-40px border-b border-monochrome-medium-tint">
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  tw="first:px-4 last:px-4"
                  style={{ textAlign: (cell.column as any).text || 'right' }}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
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

const SortArrow = styled.div`
  ${tw`h-4 w-4 cursor-pointer text-blue-medium-tint`};

  color: ${({ active }: { active: boolean }) => active && tw`text-blue-shade`};
`;
