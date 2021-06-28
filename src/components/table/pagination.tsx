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
import { Icons } from '@drill4j/ui-kit';
import { Form, Field } from 'react-final-form';
import 'twin.macro';

import { useClickOutside } from 'hooks';
import { PaginationElements } from './pagination-elements';

interface Props {
  pagesLength: number;
  gotoPage: (value: number) => void;
  pageIndex: number;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  rowsCount: number;
}

interface SelectRowsCountDropdownProps {
  values: number[];
  action: (value: number) => void;
  initialValue: number
}

export const Pagination = ({
  pagesLength, gotoPage, pageIndex, previousPage, nextPage, canPreviousPage, canNextPage, pageSize, setPageSize, rowsCount,
}: Props) => {
  const createArray = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

  const currentPage = pageIndex + 1;
  const MAX_PAGES_WITH_ELLIPSIS_COUNT = 7;
  const FIRST_OR_LAST_NUMBER_WITH_ELIPSIS = 2;
  const MAX_LEFT_OR_RIGHT_PAGES_COUNT = MAX_PAGES_WITH_ELLIPSIS_COUNT - FIRST_OR_LAST_NUMBER_WITH_ELIPSIS;

  const renderPage = (page: number) => (
    <PaginationElements.PageNumber active={page === currentPage} onClick={() => gotoPageByPageNumber(page)}>
      {page}
    </PaginationElements.PageNumber>
  );

  const renderPages = (from: number, to: number) => (
    <>
      {createArray(from, to).map(renderPage)}
    </>
  );

  const renderPagesWithEllipsis = () => {
    if (currentPage < MAX_LEFT_OR_RIGHT_PAGES_COUNT) {
      return (
        <>
          {renderPages(1, MAX_LEFT_OR_RIGHT_PAGES_COUNT)}
          <Ellipsis />
          {renderPage(pagesLength)}
        </>
      );
    }

    const lastPagesStart = pagesLength + 1 - MAX_LEFT_OR_RIGHT_PAGES_COUNT;
    if (currentPage > lastPagesStart) {
      return (
        <>
          {renderPage(1)}
          <Ellipsis />
          {renderPages(lastPagesStart, pagesLength)}
        </>
      );
    }

    return (
      <>
        {renderPage(1)}
        <Ellipsis />
        {renderPages(currentPage - 1, currentPage + 1)}
        <Ellipsis />
        {renderPage(pagesLength)}
      </>
    );
  };

  const Pages = () => (pagesLength < MAX_PAGES_WITH_ELLIPSIS_COUNT
    ? renderPages(1, pagesLength)
    : renderPagesWithEllipsis());

  const gotoPageByPageNumber = (pageNumber: number) => gotoPage(pageNumber - 1);

  const Tooltip = () => (
    <div tw="relative w-34 p-4 rounded-lg bg-monochrome-white shadow text-14 leading-32">
      <div tw="flex items-center gap-x-2">
        Go to
        <Form
          onSubmit={({ pageNumber }) => { gotoPage(pageNumber ? pageNumber - 1 : 0); }}
          render={({ handleSubmit }) =>
            (
              <form onSubmit={handleSubmit}>
                <Field name="pageNumber" type="number">
                  {({ input }) => (
                    <PaginationElements.NumberInput
                      {...input}
                      type="number"
                    />
                  )}
                </Field>
              </form>
            )}
        />
      </div>
      <div tw="absolute left-14 w-6 overflow-hidden inline-block" style={{ top: '72px' }}>
        <div tw=" h-3 w-11 bg-monochrome-white -rotate-45 transform origin-top-left" />
      </div>
    </div>
  );

  const Ellipsis = () => {
    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const node = useClickOutside(() => setPopupIsOpen(false));
    return (
      <div ref={node} tw="relative flex items-end h-8 px-3 text-monochrome-default" data-test="table-pagination:dots">
        <PaginationElements.Dots
          tw="cursor-pointer hover:text-blue-medium-tint"
          active={popupIsOpen}
          onClick={() => setPopupIsOpen(!popupIsOpen)}
        >
          ...
        </PaginationElements.Dots>
        {popupIsOpen && (
          <div tw="absolute" style={{ top: '-74px', left: '-46px' }}>
            <Tooltip />
          </div>
        )}
      </div>
    );
  };

  const SelectRowsCountDropdown = ({ values, action, initialValue }: SelectRowsCountDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const node = useClickOutside(() => setIsOpen(false));
    return (
      <div ref={node} tw="relative flex items-center gap-x-1 text-monochrome-black cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <span tw="font-bold" data-test="table-pagination:page-rows">
          {`${initialValue * (currentPage) - initialValue}-${initialValue * (currentPage)}`}
        </span>
        <Icons.Expander width={8} height={8} rotate={isOpen ? 90 : -90} />
        {isOpen && (
          <div tw="absolute -top-24 shadow bg-monochrome-white">
            {values.map((value) => (
              <div tw="flex items-center px-2 w-36 hover:bg-monochrome-light-tint" onClick={(() => action(value))}>
                {initialValue === value && <Icons.Check width={14} height={10} viewBox="0 0 14 10" tw="absolute text-blue-default" />}
                <span tw="ml-6">{`${value} per page`}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div tw="flex justify-between pr-1 pt-4">
      {rowsCount >= 25 && (
        <span data-test="table:displaying-results-count" tw="flex items-center gap-x-1 text-14 leading-32 text-monochrome-default">
          Displaying
          <SelectRowsCountDropdown
            values={[25, 50, 100]}
            action={(value) => setPageSize(Number(value))}
            initialValue={pageSize}
          />
          &nbsp;of
          <span tw="text-monochrome-black font-bold" data-test="table:rows:count">{rowsCount}</span>
          rows
        </span>
      )}
      {pagesLength > 1 && (
        <div tw="flex text-monochrome-default">
          <PaginationElements.PaginationArrow
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
            data-test="table-pagination:pagination-arrow-left"
          >
            <Icons.Expander width={6} height={8} rotate={180} />
          </PaginationElements.PaginationArrow>
          <Pages />
          <PaginationElements.PaginationArrow
            disabled={!canNextPage}
            onClick={() => nextPage()}
            data-test="table-pagination:pagination-arrow-right"
          >
            <Icons.Expander width={6} height={8} />
          </PaginationElements.PaginationArrow>
        </div>
      )}
    </div>
  );
};
