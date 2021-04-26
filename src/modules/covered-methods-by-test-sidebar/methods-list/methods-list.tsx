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
import {
  Inputs, Icons,
} from '@drill4j/ui-kit';

import { MethodsDetails } from 'types/methods-details';
import { MethodCounts, MethodsCoveredByTestSummary } from 'types/methods-covered-by-test-summary';
import { useBuildVersion, useElementSize } from 'hooks';
import { CoverageRateIcon } from 'components';
import 'twin.macro';

interface Props {
  summary: MethodsCoveredByTestSummary;
  topicCoveredMethodsByTest: string;
}

export const MethodsList = ({ topicCoveredMethodsByTest, summary }: Props) => {
  const [selectedSection, setSelectedSection] = useState<keyof MethodCounts>('all');
  const methods = useBuildVersion<MethodsDetails[]>(
    `${topicCoveredMethodsByTest}/${selectedSection}`,
  ) || [];
  const node = useRef<HTMLDivElement>(null);
  const { height: methodsListHeight } = useElementSize(node);
  const selectedMethodsCount = getMethodsCount(summary?.methodCounts, selectedSection) || 0;
  const methodsCount = methods.length || selectedMethodsCount;
  const isShowSceleton = !Object.keys(summary).length || (Number(selectedMethodsCount) > 0 && methods.length === 0);

  return (
    <div tw="flex-col h-full overflow-hidden">
      <Inputs.Dropdown
        tw="pt-2 pb-2 pr-6 pl-6 leading-32 text-monochrome-default border-b border-monochrome-medium-tint"
        items={[
          { value: 'all', label: 'All methods' },
          { value: 'new', label: `New methods (${summary?.methodCounts?.new})` },
          {
            value: 'modified',
            label: `Modified methods (${summary?.methodCounts?.modified})`,
          },
          {
            value: 'unaffected',
            label: `Unaffected methods (${summary?.methodCounts?.unaffected})`,
          },
        ]}
        onChange={({ value }) => setSelectedSection(value as keyof MethodCounts)}
        value={selectedSection}
      />
      <div tw="h-full w-full mb-4 overflow-y-hidden">
        <div tw="flex flex-col h-full text-14">
          <div ref={node} style={{ height: 'calc(100% - 40px)' }}>
            <VirtualList
              itemSize={56}
              height={Math.ceil(methodsListHeight)}
              itemCount={methodsCount}
              renderItem={({ index, style }) => (!isShowSceleton ? (
                <div
                  tw="flex flex-col justify-center pl-6 pr-6 text-12"
                  key={`${methods[index]?.name}${index}`}
                  style={style as Record<symbol, string>}
                >
                  <div className="flex items-center w-full h-20px">
                    <div className="flex items-center w-full gap-4">
                      <Icons.Function tw="h-4" />
                      <div
                        tw="max-w-280px text-monochrome-black text-14 text-ellipsis"
                        title={methods[index]?.name as string}
                      >
                        {methods[index]?.name}
                      </div>
                    </div>
                    <CoverageRateIcon tw="h-4" coverageRate={methods[index]?.coverageRate} />
                  </div>
                  <div
                    tw="max-w-280px ml-8 text-monochrome-default text-12 text-ellipsis"
                    title={methods[index]?.ownerClass}
                  >
                    {methods[index]?.ownerClass}
                  </div>
                </div>
              ) : (
                <div
                  tw="flex flex-col justify-center pl-6 pr-6 text-12"
                  key={index}
                  style={style as Record<symbol, string>}
                >
                  <div tw="flex space-x-2 animate-pulse">
                    <div tw="rounded-full bg-monochrome-medium-tint h-6 w-6" />
                    <div tw="flex-1 space-y-4 py-1">
                      <div tw="space-y-2">
                        <div tw="h-4 bg-monochrome-medium-tint rounded" />
                        <div tw="h-3 bg-monochrome-medium-tint rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              )
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export function getMethodsCount(methodsCount: MethodCounts = {}, key: keyof MethodCounts) {
  return methodsCount[key];
}
