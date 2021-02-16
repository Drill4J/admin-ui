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
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Column, Icons } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { useBuildVersion, useVisibleElementsCount } from 'hooks';
import { ParentBuild } from 'types/parent-build';
import { Cells, SearchPanel } from 'components';
import { CellProps } from '../coverage-plugin/coverage-details/table/table-types';
import { AssociatedTestModal } from '../coverage-plugin/coverage-details/associated-test-modal';
import { mockedData } from './mocked-data';
import { RiskCoverageCell } from './risk-coverage-cell';
import { RiskCompoundCell } from './risk-compound-cell';

const Subtitle = styled.div`
  ${tw`grid gap-x-1`}
  grid-template-columns: max-content minmax(auto, max-content) max-content minmax(auto, max-content);
  ${tw`font-bold text-14 leading-20 text-monochrome-default`}
`;

export const RisksList = () => {
  const { buildVersion = '' } = useParams<{ buildVersion: string; }>();
  const { version: previousBuildVersion = '' } = useBuildVersion<ParentBuild>('/data/parent') || {};
  const [selectedId, setSelectedId] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const visibleElementsCount = useVisibleElementsCount(ref, 10, 10);
  const [sort, setSort] = useState<{ field: string; order: 'ASC' | 'DESC' | null }>({
    field: '',
    order: 'ASC',
  });

  return (
    <div>
      <div tw="py-3 border-b border-monochrome-medium-tint">
        <div tw="mb-1 font-light text-24 leading-32 text-monochrome-black" data-test="risks-list:title">
          <span>Risks</span>
          <span tw="ml-2 text-monochrome-default">
            {mockedData.filter((risk) => risk.coverage !== 100).length}
          </span>
        </div>
        <Subtitle data-test="risks-list:subtitle">
          <span>Build:</span>
          <span
            className="text-monochrome-black text-ellipsis"
            data-test="risks-list:build-version"
            title={buildVersion}
          >
            {buildVersion}
          </span>
          <span tw="ml-1">Compared to:</span>
          <span
            className="text-monochrome-black text-ellipsis"
            data-test="risks-list:compared-build-version"
            title={`Build ${previousBuildVersion}`}
          >
            Build {previousBuildVersion}
          </span>
        </Subtitle>
      </div>
      <div tw="mt-6 mb-2  font-bold text-12 leading-16 text-monochrome-default" data-test="risks-list:table-title">
        ALL RISK METHODS ({mockedData.length})
      </div>
      <SearchPanel
        searchResult={0}
        searchQuery={searchValue}
        onSearch={setSearchValue}
        placeholder="Search methods by name"
      >
        Displaying {mockedData.slice(0, visibleElementsCount).length} of {mockedData.length} methods
      </SearchPanel>
      <Table
        data={mockedData.slice(0, visibleElementsCount)}
        idKey="name"
        gridTemplateColumns="calc(100% - 420px) 128px 148px 144px"
        sort={sort}
        onSort={(cellSort) => setSort(cellSort)}
      >
        <Column
          label="Name"
          name="name"
          Cell={({
            value = '',
            item: { ownerClass = '', coverage: riskCoverage = 0 } = {},
          }: CellProps<string, {ownerClass?: string, coverage?: number}>) => (
            <RiskCompoundCell
              key={value}
              cellName={value}
              cellAdditionalInfo={ownerClass}
              icon={<Icons.Function />}
              coverage={riskCoverage}
            />
          )}
          align="start"
        />
        <Column
          label="Type"
          name="type"
          Cell={({ value = '', item: { coverage: riskCoverage = 0 } = {} }: CellProps<string, { coverage?: number }>) => (
            <div
              data-test="risks-list:risk-type"
              className={`capitalize ${riskCoverage === 100 && 'text-monochrome-dark-tint'}`}
            >
              {value}
            </div>
          )}
          align="start"
        />
        <Column
          name="coverage"
          label={(
            <div className="flex justify-end items-center gap-x-4  w-full">
              Coverage, %<Icons.Checkbox tw="text-monochrome-default" width={16} height={16} />
            </div>
          )}
          Cell={({ value } : CellProps<number, unknown>) => (
            <RiskCoverageCell
              value={value}
              testContext="risks-list"
            />
          )}
        />
        <Column
          name="associatedTestsCount"
          label="Associated tests"
          Cell={({
            value = '',
            item: { id = '', coverage: riskCoverage = 0 } = {},
          }: CellProps<string, { id?: string; coverage?: number }>) => (
            <div className={riskCoverage === 100 ? 'text-monochrome-dark-tint' : undefined}>
              <Cells.Clickable
                onClick={() => {
                  setSelectedId(id);
                }}
                data-test="risks-list:associated-tests-count"
                disabled={!value}
              >
                {value || 'n/a'}
              </Cells.Clickable>
            </div>
          )}
        />
      </Table>
      <div ref={ref} />
      {selectedId && (
        <AssociatedTestModal
          id={selectedId}
          isOpen={Boolean(selectedId)}
          onToggle={() => setSelectedId('')}
          associatedTestsTopic="/build/associated-tests"
        />
      )}
    </div>
  );
};
