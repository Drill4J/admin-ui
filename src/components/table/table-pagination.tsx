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
import 'twin.macro';

import { Form, Field } from 'react-final-form';
import { Fields } from 'forms';
import { PaginationArrow, PageNumber, Dots } from './table-elements';

interface Props {
  pagesLength: number;
  gotoPage: (value: number) => void;
  pageIndex: number;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
}

export const TablePagination = ({
  pagesLength, gotoPage, pageIndex, previousPage, nextPage, canPreviousPage, canNextPage,
}: Props) => {
  const pages = Array.from({ length: pagesLength }, (_, k) => k + 1);

  const firstFivePages = pages.slice(0, 5);
  const lastFivePages = pages.slice(-5);
  const lastPage = pages[pages.length - 1];

  const Tooltip = () => (
    <div tw="relative w-34 p-4 rounded-lg bg-monochrome-white shadow text-14 leading-32">
      <div tw="flex items-center gap-x-2">
        Go to
        <Form
          onSubmit={({ pageNumber }) => gotoPage(pageNumber ? pageNumber - 1 : 0)}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} style={{ width: '60px' }}>
              <Field name="pageNumber" component={Fields.Input} />
            </form>
          )}
        />
      </div>
      <div tw="absolute left-14 w-6 overflow-hidden inline-block" style={{ top: '72px' }}>
        <div tw=" h-3 w-11 bg-monochrome-white -rotate-45 transform origin-top-left" />
      </div>
    </div>
  );

  const GoToPage = () => {
    const [goToPageModalIsOpen, setGoToPageModalIsOpen] = useState(false);
    return (
      <div tw="relative flex items-end h-8 px-3 text-monochrome-default" data-test="table-pagination:dots">
        <Dots
          tw="cursor-pointer hover:text-blue-medium-tint"
          active={goToPageModalIsOpen}
          onClick={() => setGoToPageModalIsOpen(!goToPageModalIsOpen)}
        >
          ...
        </Dots>
        {goToPageModalIsOpen && (
          <div tw="absolute" style={{ top: '-74px', left: '-46px' }}>
            <Tooltip />
          </div>
        )}
      </div>
    );
  };

  const Pages = () => {
    if (pages.length >= 9 && pageIndex + 1 > 4 && pageIndex < pages.length - 4) {
      return (
        <>
          <PageNumber active={pageIndex + 1 === 1} onClick={() => gotoPage(0)}>
            1
          </PageNumber>
          <GoToPage />
          <>
            <PageNumber onClick={() => previousPage()}>
              {pageIndex}
            </PageNumber>
            <PageNumber active>
              {pageIndex + 1}
            </PageNumber>
            <PageNumber onClick={() => nextPage()}>
              {pageIndex + 2}
            </PageNumber>
          </>
          <GoToPage />
          <PageNumber active={lastPage === pageIndex + 1} onClick={() => gotoPage(lastPage - 1)}>
            {lastPage}
          </PageNumber>
        </>
      );
    }

    if (pages.length > 6 && lastFivePages.includes(pageIndex + 1)) {
      return (
        <>
          <PageNumber active={pageIndex + 1 === 1} onClick={() => gotoPage(0)}>
            1
          </PageNumber>
          <GoToPage />
          {lastFivePages.map((pageNumber) => (
            <PageNumber active={pageNumber === pageIndex + 1} onClick={() => gotoPage(pageNumber - 1)}>
              {pageNumber}
            </PageNumber>
          ))}
        </>
      );
    }

    if (pages.length > 6) {
      return (
        <>
          {firstFivePages.map((pageNumber) => (
            <PageNumber active={pageNumber === pageIndex + 1} onClick={() => gotoPage(pageNumber - 1)}>
              {pageNumber}
            </PageNumber>
          ))}
          <GoToPage />
          <PageNumber active={lastPage === pageIndex + 1} onClick={() => gotoPage(lastPage - 1)}>
            {lastPage}
          </PageNumber>
        </>
      );
    }

    return (
      <>
        {pages.map((pageNumber) => (
          <PageNumber active={pageNumber === pageIndex + 1} onClick={() => gotoPage(pageNumber - 1)}>
            {pageNumber}
          </PageNumber>
        ))}
      </>
    );
  };

  return (
    <div tw="flex text-monochrome-default">
      <PaginationArrow disabled={!canPreviousPage} onClick={() => previousPage()} data-test="table-pagination:pagination-arrow-left">
        <Icons.Expander width={6} height={8} rotate={180} />
      </PaginationArrow>
      <Pages />
      {canNextPage && (
        <PaginationArrow onClick={() => nextPage()} data-test="table-pagination:pagination-arrow-right">
          <Icons.Expander width={6} height={8} />
        </PaginationArrow>
      )}
    </div>
  );
};
