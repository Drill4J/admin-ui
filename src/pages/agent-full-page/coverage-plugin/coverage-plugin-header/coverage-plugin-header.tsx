import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useHistory, useParams } from 'react-router-dom';
import {
  Button, Icons, Tooltip, Panel, Checkbox,
} from '@drill4j/ui-kit';

import { QualityGatePane } from 'modules';
import { NotificationManagerContext } from 'notification-manager';
import {
  ConditionSetting,
  ConditionSettingByType,
  QualityGate,
  QualityGateSettings,
} from 'types/quality-gate-type';
import { Metrics } from 'types/metrics';
import { useAgent, useBuildVersion } from 'hooks';
import { Baseline } from 'types/baseline';
import { ParentBuild } from 'types/parent-build';
import { ActionSection } from './action-section';
import { BaselineBuildModal } from './baseline-build-modal';
import { RisksModal } from '../risks-modal';
import { toggleBaseline } from '../api';

import styles from './coverage-plugin-header.module.scss';

interface Props {
  className?: string;
}

const coveragePluginHeader = BEM(styles);

export const CoveragePluginHeader = coveragePluginHeader(({ className }: Props) => {
  const [isRisksModalOpen, setIsRisksModalOpen] = React.useState(false);
  const [isOpenQualityGatesPane, setIsOpenQualityGatesPane] = React.useState(false);
  const [isBaselineBuildModalOpened, setIsBaselineBuildModalOpened] = React.useState(false);
  const { showMessage } = React.useContext(NotificationManagerContext);

  const { push } = useHistory();
  const { pluginId = '', agentId = '', buildVersion = '' } = useParams<{
    pluginId: string;
    agentId: string;
    buildVersion: string;
  }>();
  const { buildVersion: activeBuildVersion = '' } = useAgent(agentId) || {};

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
  const configured = conditionSettings.some(({ enabled }) => enabled === true);
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
  const baselineInfo = showBaseline(isBaseline, isActiveBuild, previousBuildVersion);

  return (
    <div className={className}>
      <div>
        <PluginName data-test="coverage-plugin-header:plugin-name">Test2Code</PluginName>
        <Panel>
          <CurrentBuild>
            Build:
            <Version data-test="coverage-plugin-header:build-version">{buildVersion}</Version>
          </CurrentBuild>
          {baselineInfo && (
            <BaselinePanel>
              <Checkbox
                label="Baseline"
                checked={isBaseline}
                onChange={() => setIsBaselineBuildModalOpened(true)}
                disabled={baselineInfo.disabled}
              />
              <Tooltip
                message={(
                  <Panel direction="column">
                    {baselineInfo.info}
                  </Panel>
                )}
              >
                <InfoIcon />
              </Tooltip>
            </BaselinePanel>
          )}
        </Panel>
      </div>
      <Actions>
        {activeBuildVersion === buildVersion && (
          <QualityGateSection>
            <Panel>
              <QualityGateLabel data-test="coverage-plugin-header:quality-gate-label">
                QUALITY GATE
              </QualityGateLabel>
              {!configured && (
                <Tooltip
                  message={(
                    <>
                      <div>Configure quality gate conditions to</div>
                      <div>define whether your build passes or not.</div>
                    </>
                  )}
                >
                  <InfoIcon />
                </Tooltip>
              )}
            </Panel>
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
        <ActionSection label="Risks" count={risksCount} onClick={() => setIsRisksModalOpen(true)} />
        <ActionSection
          label="Tests to run"
          count={testToRunCount}
          onClick={() => push(`/full-page/${agentId}/${buildVersion}/${pluginId}/tests-to-run`)}
        />
      </Actions>
      {isRisksModalOpen && <RisksModal isOpen={isRisksModalOpen} onToggle={setIsRisksModalOpen} />}
      <QualityGatePane
        isOpen={isOpenQualityGatesPane}
        onToggle={() => setIsOpenQualityGatesPane(false)}
        qualityGateSettings={qualityGateSettings}
        agentId={agentId}
        pluginId={pluginId}
      />
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
                ? 'unlinked'
                : 'marked'} as baseline successfully. All subsequent builds will be compared to it.`,
            });
          } catch ({ response: { data: { message } = {} } = {} }) {
            showMessage({
              type: 'ERROR',
              text: message || 'There is some issue with your action. Please try again later.',
            });
          }
        }}
      />
    </div>
  );
});

const PluginName = coveragePluginHeader.pluginName('span');
const CurrentBuild = coveragePluginHeader.currentBuild('div');
const BaselinePanel = coveragePluginHeader.baselinePanel(Panel);
const Version = coveragePluginHeader.version('div');
const QualityGateLabel = coveragePluginHeader.qualityGateLabel('div');
const InfoIcon = coveragePluginHeader.infoIcon(Icons.Info);
const Actions = coveragePluginHeader.actions('div');
const QualityGateSection = coveragePluginHeader.qualityGateSection('div');
const StatusWrapper = coveragePluginHeader.statusWrapper('div');
const StatusTitle = coveragePluginHeader.statusTitle('div');

function showBaseline(isBaseline: boolean, isActiveBuild: boolean, previousBuildVersion: string) {
  if (!previousBuildVersion && isBaseline) {
    return ({
      disabled: true,
      info: (
        <>
          <div>The initial build is marked as baseline by default.</div>
          <div>All subsequent builds are compared with it.</div>
        </>
      ),
    });
  }
  if (isActiveBuild && !isBaseline) {
    return ({
      disabled: false,
      info: (
        <>
          <div>Baseline build is a source for comparing</div>
          <div>the coverage and time savings.</div>
        </>
      ),
    });
  }
  if (previousBuildVersion && isActiveBuild && isBaseline) {
    return ({
      disabled: false,
      info: (
        <>
          <div>This is a baseline build.</div>
          <div>All subsequent builds will be compared to it.</div>
        </>
      ),
    }
    );
  }
  if (previousBuildVersion && !isActiveBuild && isBaseline) {
    return ({
      disabled: true,
      info: (
        <>
          <div>This build is marked as a baseline.</div>
          <div>All subsequent builds are compared with it.</div>
        </>
      ),
    });
  }
  return undefined;
}
