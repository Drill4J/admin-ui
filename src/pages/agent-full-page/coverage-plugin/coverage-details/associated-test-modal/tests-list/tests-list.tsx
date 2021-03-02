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
import { BEM } from '@redneckz/react-bem-helper';
import { useRef, useState } from 'react';
import VirtualList from 'react-tiny-virtual-list';
import { Icons, Inputs } from '@drill4j/ui-kit';

import { useElementSize } from 'hooks';
import 'twin.macro';

import styles from './tests-list.module.scss';

interface Props {
  className?: string;
  associatedTests: { testsMap: Record<string, string[]>; assocTestsCount: number; };
}

const testsList = BEM(styles);

export const TestsList = testsList(({ className, associatedTests }: Props) => {
  const { AUTO: autoTests = [], MANUAL: manualTests = [] } = associatedTests.testsMap;
  const node = useRef<HTMLDivElement>(null);
  const [selectedSection, setSelectedSection] = useState('all');
  const { height: testsListHeight } = useElementSize(node);

  const getTests = (): string[] => {
    switch (selectedSection) {
      case 'auto':
        return autoTests;
      case 'manual':
        return manualTests;
      default:
        return [...autoTests, ...manualTests];
    }
  };
  const tests = getTests();

  return (
    <div className={className}>
      <Filter
        items={[
          { value: 'all', label: 'All tests' },
          { value: 'auto', label: `Auto (${autoTests.length})` },
          { value: 'manual', label: `Manual (${manualTests.length})` },
        ]}
        onChange={({ value }) => setSelectedSection(value)}
        value={selectedSection}
      />
      <Content>
        <div ref={node} style={{ height: '100%' }}>
          <VirtualList
            itemSize={56}
            height={Math.floor(testsListHeight)}
            itemCount={tests.length || associatedTests.assocTestsCount}
            renderItem={({ index, style }) => (
              <TestItem key={tests[index]} style={style as Record<symbol, string>}>
                {tests.length > 0 && (
                  <>
                    <TestInfo>
                      <TestItemIcon />
                      <TestName className="text-ellipsis" title={tests[index]}>{tests[index]}</TestName>
                    </TestInfo>
                    <TestId className="text-ellipsis" title="&ndash;">&ndash;</TestId>
                  </>
                )}
                {Object.keys(associatedTests.testsMap).length === 0 && (
                  <div tw="flex space-x-2 animate-pulse">
                    <div tw="rounded-full bg-monochrome-medium-tint h-6 w-6" />
                    <div tw="flex-1 space-y-4 py-1">
                      <div tw="space-y-2">
                        <div tw="h-4 bg-monochrome-medium-tint rounded" />
                        <div tw="h-3 bg-monochrome-medium-tint rounded" />
                      </div>
                    </div>
                  </div>
                )}
              </TestItem>
            )}
          />
        </div>
      </Content>
    </div>
  );
});

const Content = testsList.content('div');
const Filter = testsList.filter(Inputs.Dropdown);
const TestItem = testsList.testItem('div');
const TestInfo = testsList.testInfo('div');
const TestName = testsList.testName('div');
const TestId = testsList.testId('div');
const TestItemIcon = testsList.testItemIcon(Icons.Test);
