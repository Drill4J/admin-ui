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
import { capitalize } from '@redneckz/react-bem-helper';
import { Modal } from '@drill4j/ui-kit';

import { MethodCoveredByTest } from 'types/method-covered-by-test';
import { useBuildVersion } from 'hooks';
import tw, { styled } from 'twin.macro';
import { MethodsList } from './methods-list';

interface Props {
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  testInfo: { id: string; covered: number };
  topicCoveredMethodsByTest: string;
}

const MethodInfoValue = styled.div(({ sceleton }: { sceleton?: boolean }) =>
  [tw`text-monochrome-default text-14 break-all`, sceleton && tw`h-4 animate-pulse w-full bg-monochrome-medium-tint rounded`]);

const MethodInfoLabel = styled.div(tw`min-w-32px text-left text-14 leading-32 font-bold text-monochrome-black`);

export const CoveredMethodsByTestSidebar = ({
  isOpen, onToggle, testInfo, topicCoveredMethodsByTest,
}: Props) => {
  const coveredMethodsByTest = useBuildVersion<MethodCoveredByTest[]>(topicCoveredMethodsByTest) || [];
  const filteredMethods = coveredMethodsByTest.find(({ id }) => id === testInfo.id) || {};
  const {
    testName = '',
    testType = '',
  } = filteredMethods;
  const showSceleton = !coveredMethodsByTest.length;
  return (
    <Modal isOpen={isOpen} onToggle={onToggle}>
      <div tw="flex flex-col h-full">
        <header tw="flex gap-2 items-center h-16 pl-6 pr-6 leading-32 border-b-0 border-monochrome-light-tint">
          <div tw="text-20 text-monochrome-black">Covered methods</div>
          <div tw="text-monochrome-default text-16 leading-24" style={{ height: '20px' }}>{testInfo.covered}</div>
        </header>
        <section tw="h-20 pt-2 pb-2 pr-6 pl-6 bg-monochrome-light-tint border-b-0 border-monochrome-medium-tint">
          <div tw="flex items-center w-full gap-4">
            <MethodInfoLabel>Test</MethodInfoLabel>
            <MethodInfoValue sceleton={showSceleton} className="text-ellipsis" title={testName}>{testName}</MethodInfoValue>
          </div>
          <div tw="flex items-center w-full gap-4">
            <MethodInfoLabel>Type</MethodInfoLabel>
            <MethodInfoValue sceleton={showSceleton} className="text-ellipsis">{capitalize(testType.toLowerCase())}</MethodInfoValue>
          </div>
        </section>
        <MethodsList methods={{ coveredMethods: filteredMethods, covered: testInfo.covered }} />
      </div>
    </Modal>
  );
};
