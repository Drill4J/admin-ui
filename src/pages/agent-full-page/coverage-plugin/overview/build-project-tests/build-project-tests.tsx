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
import tw, { styled } from 'twin.macro';

import { BuildTestsCard } from 'components';
import { TestTypeSummary } from 'types/test-type-summary';
import { TestsInfo } from 'types/tests-info';
import { AgentStatus } from 'types/agent-status';
import { useActiveScope, useBuildVersion } from 'hooks';
import { AGENT_STATUS } from 'common/constants';
import { ActiveBuildTestsInfo } from '../../active-build-tests-info';
import { ActiveScopeInfo } from '../active-scope-info';

const Content = styled.div`
  ${tw`grid gap-8`}
  grid-template-columns: 1fr 320px;
  @media screen and (min-width: 1024px) {
    grid-template-columns: auto max-content;
  }
`;

const ActiveBuildTestsBar = styled.div<{ isShowActiveScopeInfo?: boolean }>`
  ${tw`col-start-1 col-span-2 lg:col-span-1`}
  ${({ isShowActiveScopeInfo }) => !isShowActiveScopeInfo && tw`col-span-2 lg:col-span-2`}
`;

const Cards = styled.div<{ isShowActiveScopeInfo?: boolean }>`
  ${tw`grid gap-2 gap-y-8 col-start-1 lg:grid-cols-2`}
  ${({ isShowActiveScopeInfo }) => !isShowActiveScopeInfo && tw`col-span-2 grid-cols-2`}

  & > div {
    ${({ isShowActiveScopeInfo }) => isShowActiveScopeInfo && tw`h-full`}
  }
`;

interface Props {
  status?: AgentStatus;
}

export const BuildProjectTests = ({ status }: Props) => {
  const testsByType = useBuildVersion<TestTypeSummary[]>('/build/summary/tests/by-type') || [];
  const testsInfo: TestsInfo = testsByType.reduce(
    (test, testType) => ({ ...test, [testType.type]: testType }),
    {},
  );
  const scope = useActiveScope();
  const isShowActiveScopeInfo = scope?.active && status === AGENT_STATUS.ONLINE;

  return (
    <Content>
      <ActiveBuildTestsBar isShowActiveScopeInfo={isShowActiveScopeInfo}>
        <ActiveBuildTestsInfo testsInfo={testsInfo} />
      </ActiveBuildTestsBar>
      <Cards isShowActiveScopeInfo={isShowActiveScopeInfo}>
        <BuildTestsCard label="AUTO" testTypeSummary={testsInfo.AUTO} />
        <BuildTestsCard label="MANUAL" testTypeSummary={testsInfo.MANUAL} />
      </Cards>
      {isShowActiveScopeInfo && (
        <div tw="lg:col-start-2 lg:row-start-1 lg:row-end-3">
          <ActiveScopeInfo scope={scope} />
        </div>
      )}
    </Content>
  );
};
