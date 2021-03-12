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
import { BEM, div } from '@redneckz/react-bem-helper';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { Button, Icons, Tooltip } from '@drill4j/ui-kit';
import 'twin.macro';

import { QualityGatePane } from 'modules';
import { NotificationManagerContext } from 'notification-manager';
import {
  ConditionSetting,
  ConditionSettingByType,
  QualityGate,
  QualityGateSettings,
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

import styles from './coverage-plugin-header.module.scss';

interface Props {
  className?: string;
  previousBuildTests: TestTypeSummary[];
}

const coveragePluginHeader = BEM(styles);

export const CoveragePluginHeader = coveragePluginHeader(({ className, previousBuildTests = [] }: Props) => {
  const [isRisksModalOpen, setIsRisksModalOpen] = useState(false);
  const [isOpenQualityGatesPane, setIsOpenQualityGatesPane] = useState(false);
  const [isBaselineBuildModalOpened, setIsBaselineBuildModalOpened] = useState(false);
  const { showMessage } = useContext(NotificationManagerContext);

  const { push } = useHistory();
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
    <div className={className}>
      <PluginName data-test="coverage-plugin-header:plugin-name">Test2Code</PluginName>
      {agentStatus === AGENT_STATUS.ONLINE && (
        <BaselinePanel>
          <div>Current build: </div>
          <div className="flex items-center w-full">
            <CurrentBuildVersion className="text-ellipsis" title={buildVersion}>{buildVersion}</CurrentBuildVersion>
            <Tooltip message={<TooltipMessage>{info}</TooltipMessage>} position="top-center">
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
                <ParentBuildVersion
                  className="inline link"
                  to={`/full-page/${agentId}/${previousBuildVersion}/dashboard`}
                  title={previousBuildVersion}
                >
                  {previousBuildVersion}
                </ParentBuildVersion>
              </div>
            ) : <span>&ndash;</span>}
        </BaselinePanel>
      )}
      <div className="flex justify-end items-center">
        {activeBuildVersion === buildVersion && agentStatus === AGENT_STATUS.ONLINE && (
          <QualityGateSection>
            <div className="flex items-center w-full">
              <QualityGateLabel data-test="coverage-plugin-header:quality-gate-label">
                QUALITY GATE
              </QualityGateLabel>
              {!configured && (
                <Tooltip
                  message={(
                    <>
                      <div tw="text-center">Configure quality gate conditions to</div>
                      <div>define whether your build passes or not.</div>
                    </>
                  )}
                >
                  <InfoIcon />
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
              <StatusWrapper type={status} onClick={() => setIsOpenQualityGatesPane(true)}>
                <StatusIcon />
                <StatusTitle data-test="coverage-plugin-header:quality-gate-status">
                  {status}
                </StatusTitle>
              </StatusWrapper>
            )}
          </QualityGateSection>
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
              <LinkIcon width={8} height={8} />
            </Count>
          ) : (
            <NoRisksCount
              className="flex items-center w-full"
              data-test="action-section:no-risks-count"
            >
              {risksCount}
            </NoRisksCount>
          )}
        </ActionSection>
        <ActionSection
          label="tests to run"
          previousBuild={{ previousBuildVersion, previousBuildTests }}
        >
          {previousBuildTests.length > 0 ? (
            <Count
              className="flex items-center w-full"
              onClick={() => push(`/full-page/${agentId}/${buildVersion}/${pluginId}/tests-to-run`)}
              data-test="action-section:count:tests-to-run"
            >
              {testToRunCount}
              <LinkIcon width={8} height={8} />
            </Count>
          ) : <NoValue data-test="action-section:no-value:tests-to-run">&ndash;</NoValue>}
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
    </div>
  );
});

const PluginName = coveragePluginHeader.pluginName('div');
const BaselinePanel = coveragePluginHeader.baselinePanel('div');
const CurrentBuildVersion = coveragePluginHeader.currentBuildVersion('div');
const ParentBuildVersion = coveragePluginHeader.parentBuildVersion(NavLink);
const FlagWrapper = coveragePluginHeader.flagWrapper(div({ onClick: () => {} } as { onClick: () => void; active: boolean }));
const QualityGateLabel = coveragePluginHeader.qualityGateLabel('div');
const InfoIcon = coveragePluginHeader.infoIcon(Icons.Info);
const QualityGateSection = coveragePluginHeader.qualityGateSection('div');
const StatusWrapper = coveragePluginHeader.statusWrapper('div');
const StatusTitle = coveragePluginHeader.statusTitle('div');
const Count = coveragePluginHeader.count('div');
const NoRisksCount = coveragePluginHeader.noRisksCount('div');
const LinkIcon = coveragePluginHeader.linkIcon(Icons.Expander);
const NoValue = coveragePluginHeader.noValue('div');
const TooltipMessage = coveragePluginHeader.tooltipMessage('div');

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
