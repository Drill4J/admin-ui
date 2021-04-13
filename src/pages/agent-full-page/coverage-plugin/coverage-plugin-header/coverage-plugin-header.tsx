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
import { useContext, useState } from 'react';
import {
  NavLink, useParams, Link,
} from 'react-router-dom';
import { Button, Icons, Tooltip } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { QualityGatePane } from 'modules';
import { NotificationManagerContext } from 'notification-manager';
import {
  ConditionSetting,
  ConditionSettingByType,
  QualityGate,
  QualityGateSettings, QualityGateStatus,
} from 'types/quality-gate-type';
import { AGENT_STATUS } from 'common/constants';
import { Metrics } from 'types/metrics';
import { useAgent, useBuildVersion } from 'hooks';
import { Baseline } from 'types/baseline';
import { ParentBuild } from 'types/parent-build';
import { TestTypeSummary } from 'types/test-type-summary';
import { ActionSection } from './action-section';
import { BaselineBuildModal } from './baseline-build-modal';
import { RisksModal } from '../risks-modal';
import { toggleBaseline } from '../api';

interface Props {
  previousBuildTests: TestTypeSummary[];
}

const Content = styled.div`
  ${tw`grid items-center w-full h-20 border-b border-monochrome-medium-tint`}
  grid-template-columns: max-content auto max-content;
`;
const BaselinePanel = styled.div`
  ${tw`grid gap-x-2 pl-6`}
  ${tw`border-l border-monochrome-medium-tint font-bold text-12 leading-24 text-monochrome-default`}
  grid-template-columns: max-content minmax(64px, 60%);
  grid-template-rows: repeat(2, 1fr);
`;
const FlagWrapper = styled.div(({ active }: { active?: boolean }) => [
  tw`flex ml-2 text-monochrome-default`,
  active && tw`text-blue-default cursor-pointer`,
]);
const StatusWrapper = styled.div(({ status }: { status?: QualityGateStatus }) => [
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
const Count = styled.div`
  ${tw`flex items-center w-full text-20 leading-32 cursor-pointer`}
  ${tw`text-monochrome-black hover:text-blue-medium-tint active:text-blue-shade`}
`;

export const CoveragePluginHeader = ({ previousBuildTests = [] }: Props) => {
  const [isRisksModalOpen, setIsRisksModalOpen] = useState(false);
  const [isOpenQualityGatesPane, setIsOpenQualityGatesPane] = useState(false);
  const [isBaselineBuildModalOpened, setIsBaselineBuildModalOpened] = useState(false);
  const { showMessage } = useContext(NotificationManagerContext);
  const { pluginId = '', agentId = '', buildVersion = '' } = useParams<{
    pluginId: string;
    agentId: string;
    buildVersion: string;
  }>();
  const { buildVersion: activeBuildVersion = '', status: agentStatus } = useAgent(agentId) || {};

  const conditionSettings = useBuildVersion<ConditionSetting[]>('/data/quality-gate-settings') || [];
  const {
    status = 'FAILED',
    results = { coverage: false, risks: false, tests: false },
  } = useBuildVersion<QualityGate>('/data/quality-gate') || {};
  const { coverage = 0, risks: risksCount = 0, tests: testToRunCount = 0 } = useBuildVersion<Metrics>('/data/stats') || {};

  const conditionSettingByType = conditionSettings.reduce(
    (conditionSetting, measureType) => ({
      ...conditionSetting,
      [measureType.condition.measure]: measureType,
    }),
    {} as ConditionSettingByType,
  );
  const configured = conditionSettings.some(({ enabled }) => enabled);
  const qualityGateSettings: QualityGateSettings = {
    configured,
    conditionSettingByType,
    qualityGate: { status, results },
    metrics: { coverage, risks: risksCount, tests: testToRunCount },
  };
  const StatusIcon = Icons[status];
  const { version: baseline } = useBuildVersion<Baseline>('/data/baseline', undefined, undefined, undefined, activeBuildVersion) || {};
  const { version: previousBuildVersion = '' } = useBuildVersion<ParentBuild>('/data/parent') || {};
  const isBaseline = baseline === buildVersion;
  const isActiveBuild = activeBuildVersion === buildVersion;
  const { Flag, disabled, info } = showBaseline(isBaseline, isActiveBuild, previousBuildVersion);

  return (
    <Content>
      <div
        tw="mr-6 font-light text-24 leading-32"
        data-test="coverage-plugin-header:plugin-name"
      >
        Test2Code
      </div>
      {agentStatus === AGENT_STATUS.ONLINE && (
        <BaselinePanel>
          <div>Current build: </div>
          <div className="flex items-center w-full">
            <div className="text-ellipsis text-monochrome-black" title={buildVersion}>{buildVersion}</div>
            <Tooltip message={<div tw="text-center">{info}</div>} position="top-center">
              <FlagWrapper
                active={Boolean(isActiveBuild && previousBuildVersion)}
                onClick={() => !disabled && setIsBaselineBuildModalOpened(true)}
              >
                <Flag />
              </FlagWrapper>
            </Tooltip>
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
      <div className="flex justify-end items-center">
        {activeBuildVersion === buildVersion && agentStatus === AGENT_STATUS.ONLINE && (
          <div tw="pl-4 pr-10 border-l border-monochrome-medium-tint text-monochrome-default">
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
              <StatusWrapper>
                <Button
                  data-test="coverage-plugin-header:configure-button"
                  type="primary"
                  size="small"
                  onClick={() => setIsOpenQualityGatesPane(true)}
                >
                  Configure
                </Button>
              </StatusWrapper>
            ) : (
              <StatusWrapper status={status} onClick={() => setIsOpenQualityGatesPane(true)}>
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
              className="flex items-center w-full"
              onClick={() => setIsRisksModalOpen(true)}
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
            <Link to={`/full-page/${agentId}/${buildVersion}/${pluginId}/tests-to-run`}>
              <Count
                className="flex items-center w-full"
                data-test="action-section:count:tests-to-run"
              >
                {testToRunCount}
                <Icons.Expander tw="ml-1 text-blue-default" width={8} height={8} />
              </Count>
            </Link>
          ) : <div tw="text-20 leading-32 text-monochrome-black" data-test="action-section:no-value:tests-to-run">&ndash;</div>}
        </ActionSection>
      </div>
      {isRisksModalOpen && <RisksModal isOpen={isRisksModalOpen} onToggle={setIsRisksModalOpen} />}
      <QualityGatePane
        isOpen={isOpenQualityGatesPane}
        onToggle={() => setIsOpenQualityGatesPane(false)}
        qualityGateSettings={qualityGateSettings}
        agentId={agentId}
        pluginId={pluginId}
      />
      {isBaselineBuildModalOpened && (
        <BaselineBuildModal
          isOpen={isBaselineBuildModalOpened}
          onToggle={setIsBaselineBuildModalOpened}
          isBaseline={isBaseline}
          toggleBaseline={async () => {
            try {
              await toggleBaseline(agentId, pluginId);
              showMessage({
                type: 'SUCCESS',
                text: `Current build has been ${isBaseline
                  ? 'unset as baseline successfully. All subsequent builds won\'t be compared to it.'
                  : 'set as baseline successfully. All subsequent builds will be compared to it.'}`,
              });
            } catch ({ response: { data: { message } = {} } = {} }) {
              showMessage({
                type: 'ERROR',
                text: message || 'There is some issue with your action. Please try again later.',
              });
            }
          }}
        />
      )}
    </Content>
  );
};

function showBaseline(isBaseline: boolean, isActiveBuild: boolean, previousBuildVersion: string) {
  if (!previousBuildVersion && isBaseline) {
    return ({
      disabled: true,
      info: (
        <>
          The initial build is set as baseline by default. All methods <br />
          and key metrics of subsequent builds are compared with it.
        </>
      ),
      Flag: Icons.Flag,
    });
  }
  if (isActiveBuild && !isBaseline) {
    return ({
      disabled: false,
      info: 'Set as Baseline',
      Flag: Icons.Flag,
    });
  }
  if (isActiveBuild && isBaseline) {
    return ({
      disabled: false,
      info: 'Unset as Baseline',
      Flag: Icons.FilledFlag,
    });
  }
  if (!isActiveBuild && isBaseline) {
    return ({
      disabled: true,
      info: (
        <>
          This build is set as baseline. <br />
          All subsequent builds are compared with it.
        </>
      ),
      Flag: Icons.Flag,
    });
  }

  return {
    disabled: true,
    info: null,
    Flag: () => null,
  };
}
