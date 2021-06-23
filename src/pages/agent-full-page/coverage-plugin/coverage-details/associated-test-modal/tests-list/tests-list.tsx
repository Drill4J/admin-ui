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
import VirtualList from 'react-tiny-virtual-list';
import { Icons, Inputs } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { useElementSize } from 'hooks';

interface Props {
  associatedTests: { testsMap: Record<string, string[]>; assocTestsCount: number; };
}

const TestItem = styled.div`
  ${tw`flex flex-col justify-center min-h-40px px-6`}
  ${tw`text-14 break-normal`}
`;

export const TestsList = ({ associatedTests }: Props) => {
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
    <div tw="flex flex-col h-full overflow-y-auto">
      <Inputs.Dropdown
        tw="my-4 mx-6"
        items={[
          { value: 'all', label: 'All tests' },
          { value: 'auto', label: `Auto (${autoTests.length})` },
          { value: 'manual', label: `Manual (${manualTests.length})` },
        ]}
        onChange={({ value }) => setSelectedSection(String(value))}
        value={selectedSection}
      />
      <div tw="flex flex-col flex-grow pt-2 overflow-y-auto border-t border-monochrome-medium-tint">
        <div ref={node} style={{ height: '100%' }}>
          <VirtualList
            itemSize={56}
            height={Math.floor(testsListHeight)}
            itemCount={tests.length || associatedTests.assocTestsCount}
            renderItem={({ index, style }) => (
              <TestItem key={tests[index]} style={style as Record<symbol, string>}>
                {tests.length > 0 && (
                  <>
                    <div tw="flex flex-row items-center h-5">
                      <Icons.Test tw="flex self-center min-w-12px min-h-16px" />
                      <div tw="text-ellipsis ml-4 text-14 leading-20 text-monochrome-black" title={tests[index]}>{tests[index]}</div>
                    </div>
                    <div tw="text-ellipsis pl-7 text-12 text-monochrome-default" title="&ndash;">&ndash;</div>
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
      </div>
    </div>
  );
};
