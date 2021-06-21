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
import {
  NavLink, useParams, Link, Route,
} from 'react-router-dom';
import {
  Button, Icons, Tooltip,
} from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { QualityGatePane } from 'modules';
import { ConditionSetting, QualityGate, QualityGateStatus } from 'types/quality-gate-type';
import { AGENT_STATUS } from 'common/constants';
import { useAgent, useBuildVersion } from 'hooks';
import { ParentBuild } from 'types/parent-build';
import { Metrics } from 'types/metrics';
import { ActionSection } from './action-section';
import { BaselineBuildModal } from './baseline-build-modal';
import { BaselineTooltip } from './baseline-tooltip';
import { usePreviousBuildCoverage } from '../use-previous-build-coverage';

const Content = styled.div`
  ${tw`grid grid-rows-2 lg:grid-rows-1 grid-cols-4 items-center gap-2 py-4 w-full border-b border-monochrome-medium-tint`}
  @media screen and (min-width: 1024px) {
    grid-template-columns: max-content auto max-content max-content max-content !important;
  }
`;
const BaselinePanel = styled.div`
  ${tw`grid gap-x-2 lg:pl-6`}
  ${tw`lg:border-l border-monochrome-medium-tint font-bold text-12 leading-24 text-monochrome-default`}
  grid-template-columns: max-content minmax(64px, 60%);
  grid-template-rows: repeat(2, 1fr);
`;
const StatusWrapper = styled(Link)(({ status }: { status?: QualityGateStatus }) => [
  tw`flex items-center h-8 text-14`,
  status === 'PASSED' && tw`text-green-default cursor-pointer`,
  status === 'FAILED' && tw`text-red-default cursor-pointer`,
]);
const StatusTitle = styled.div`
  ${tw`ml-2 font-bold lowercase`}
  &::first-letter {
    ${tw`uppercase`}
  }
`;
const Count = styled(Link)`
  ${tw`flex items-center w-full text-20 leading-32 cursor-pointer`}
  ${tw`text-monochrome-black hover:text-blue-medium-tint active:text-blue-shade`}
`;

export const CoveragePluginHeader = () => {
  const {
    pluginId = '', agentId = '', buildVersion = '', tab = '',
  } = useParams<{
    pluginId: string;
    agentId: string;
    buildVersion: string;
    tab: string;
  }>();

  const { buildVersion: activeBuildVersion = '', status: agentStatus } = useAgent(agentId) || {};

  const { risks: risksCount = 0, tests: testToRunCount = 0 } = useBuildVersion<Metrics>('/data/stats') || {};
  const { version: previousBuildVersion = '' } = useBuildVersion<ParentBuild>('/data/parent') || {};
  const conditionSettings = useBuildVersion<ConditionSetting[]>('/data/quality-gate-settings') || [];
  const { status = 'FAILED' } = useBuildVersion<QualityGate>('/data/quality-gate') || {};

  const { byTestType: previousBuildTests = [] } = usePreviousBuildCoverage(previousBuildVersion) || {};

  const configured = conditionSettings.some(({ enabled }) => enabled);

  const StatusIcon = Icons[status];

  return (
    <Content>
      <div tw="col-span-4 lg:col-span-1 mr-6 font-light text-24 leading-32" data-test="coverage-plugin-header:plugin-name">Test2Code</div>
      {agentStatus === AGENT_STATUS.ONLINE && (
        <BaselinePanel>
          <div>Current build:</div>
          <div className="flex items-center w-full">
            <div className="text-ellipsis text-monochrome-black" title={buildVersion}>{buildVersion}</div>
            <BaselineTooltip />
          </div>
          <div>Parent build:</div>
          {previousBuildVersion
            ? (
              <div className="text-ellipsis mr-6">
                <NavLink
                  className="inline link"
                  to={`/full-page/${agentId}/${previousBuildVersion}/dashboard`}
                  title={previousBuildVersion}
                >
                  {previousBuildVersion}
                </NavLink>
              </div>
            ) : <span>&ndash;</span>}
        </BaselinePanel>
      )}
      {activeBuildVersion === buildVersion && agentStatus === AGENT_STATUS.ONLINE && (
        <div tw="pl-4 pr-4 lg:mr-10 border-l border-monochrome-medium-tint text-monochrome-default">
          <div className="flex items-center w-full">
            <div tw="mr-2 text-12 leading-16 font-bold" data-test="coverage-plugin-header:quality-gate-label">
              QUALITY GATE
            </div>
            {!configured && (
              <Tooltip
                message={(
                  <>
                    <div tw="text-center">Configure quality gate conditions to</div>
                    <div>define whether your build passes or not.</div>
                  </>
                )}
              >
                <Icons.Info tw="flex text-monochrome-default" />
              </Tooltip>
            )}
          </div>
          {!configured ? (
            <StatusWrapper
              to={`/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard/${tab}/quality-gate-pane`}
              data-test="coverage-plugin-header:configure-button"
            >
              <Button
                primary
                size="small"
              >
                Configure
              </Button>
            </StatusWrapper>
          ) : (
            <StatusWrapper
              to={`/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard/${tab}/quality-gate-pane`}
              status={status}
            >
              <StatusIcon />
              <StatusTitle data-test="coverage-plugin-header:quality-gate-status">
                {status}
              </StatusTitle>
            </StatusWrapper>
          )}
        </div>
      )}
      <ActionSection
        label="risks"
        previousBuild={{ previousBuildVersion, previousBuildTests }}
      >
        {risksCount > 0 ? (
          <Count
            to={`/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard/${tab}/risks-modal`}
            className="flex items-center w-full"
            data-test="action-section:count:risks"
          >
            {risksCount}
            <Icons.Expander tw="ml-1 text-blue-default" width={8} height={8} />
          </Count>
        ) : (
          <div
            tw="flex items-center w-full text-20 leading-32 text-monochrome-black"
            data-test="action-section:no-risks-count"
          >
            {risksCount}
          </div>
        )}
      </ActionSection>
      <ActionSection
        label="tests to run"
        previousBuild={{ previousBuildVersion, previousBuildTests }}
      >
        {previousBuildTests.length > 0 ? (
          <Count
            to={`/full-page/${agentId}/${buildVersion}/${pluginId}/tests-to-run`}
            className="flex items-center w-full"
            data-test="action-section:count:tests-to-run"
          >
            {testToRunCount}
            <Icons.Expander tw="ml-1 text-blue-default" width={8} height={8} />
          </Count>
        ) : (
          <div
            tw="text-20 leading-32 text-monochrome-black"
            data-test="action-section:no-value:tests-to-run"
          >&ndash;
          </div>
        )}
      </ActionSection>
      <Route
        path="/full-page/:agentId/:buildVersion/:pluginId/dashboard/:tab/baseline-build-modal"
        render={() => <BaselineBuildModal />}
      />
      <Route
        path="/full-page/:agentId/:buildVersion/:pluginId/dashboard/:tab/quality-gate-pane"
        render={() => <QualityGatePane />}
      />
    </Content>
  );
};
