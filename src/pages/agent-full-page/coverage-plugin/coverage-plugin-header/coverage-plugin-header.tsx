import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams } from 'react-router-dom';
import {
  Button, Icons, Tooltip, Panel,
} from '@drill4j/ui-kit';

import { TestsToRunModal } from 'modules';
import { QualityGatePane } from 'components';
import {
  ConditionSetting, ConditionSettingByType, QualityGate, QualityGateSettings,
} from 'types/quality-gate-type';
import { Metrics } from 'types/metrics';
import { useAgent } from 'hooks';
import { TestsToRun } from 'types/tests-to-run';
import { isActiveBuild } from '../../is-active-build';
import { usePluginState } from '../../store';
import { useBuildVersion } from '../use-build-version';
import { ActionSection } from './action-section';
import { RisksModal } from '../risks-modal';

import styles from './coverage-plugin-header.module.scss';

interface Props {
  className?: string;
}

const coveragePluginHeader = BEM(styles);

export const CoveragePluginHeader = coveragePluginHeader(({ className }: Props) => {
  const [isRisksModalOpen, setIsRisksModalOpen] = React.useState(false);
  const [isTestsToRunModalOpen, setIsTestToRunModalOpen] = React.useState(false);
  const [isOpenQualityGatesPane, setIsOpenQualityGatesPane] = React.useState(false);

  const { pluginId = '' } = useParams<{ pluginId: string }>();
  const { agentId, buildVersion } = usePluginState();
  const { buildVersion: activeBuildVersion } = useAgent(agentId) || {};

  const { testTypeToNames = {} } = useBuildVersion<TestsToRun>('/build/tests-to-run') || {};
  const conditionSettings = useBuildVersion<ConditionSetting[]>('/data/quality-gate-settings') || [];
  const {
    status = 'FAILED',
    results = { coverage: false, risks: false, tests: false },
  } = useBuildVersion<QualityGate>('/data/quality-gate') || {};
  const { coverage = 0, risks: risksCount = 0, tests: testToRunCount = 0 } = useBuildVersion<Metrics>('/data/stats') || {};

  const conditionSettingByType = conditionSettings
    .reduce((conditionSetting, measureType) =>
      ({ ...conditionSetting, [measureType.condition.measure]: measureType }),
    {} as ConditionSettingByType);
  const configured = conditionSettings.some(({ enabled }) => enabled === true);
  const qualityGateSettings: QualityGateSettings = {
    configured,
    conditionSettingByType,
    qualityGate: { status, results },
    metrics: { coverage, risks: risksCount, tests: testToRunCount },
  };
  const StatusIcon = Icons[status];

  return (
    <div className={className}>
      <div>
        <PluginName data-test="coverage-plugin-header:plugin-name">Test2Code</PluginName>
        <CurrentBuild>
          Build:
          <Version data-test="coverage-plugin-header:build-version">{buildVersion}</Version>
        </CurrentBuild>
      </div>
      <Actions>
        {isActiveBuild(activeBuildVersion, buildVersion) && (
          <QualityGateSection>
            <Panel>
              <QualityGateLabel data-test="coverage-plugin-header:quality-gate-label">QUALITY GATE</QualityGateLabel>
              <Tooltip
                position="top"
                customStyle={{ bottom: '24px', left: '16px' }}
                message={(
                  <>
                    <div>Configure quality gate conditions to</div>
                    <div>define whether your build passes or not.</div>
                  </>
                )}
              >
                <InfoIcon />
              </Tooltip>
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
            )
              : (
                <StatusWrapper type={status} onClick={() => setIsOpenQualityGatesPane(true)}>
                  <StatusIcon />
                  <StatusTitle data-test="coverage-plugin-header:quality-gate-status">{status}</StatusTitle>
                </StatusWrapper>
              )}
          </QualityGateSection>
        )}
        <ActionSection
          label="Risks"
          count={risksCount}
          onClick={() => setIsRisksModalOpen(true)}
        />
        <ActionSection
          label="Tests to run"
          count={testToRunCount}
          onClick={() => setIsTestToRunModalOpen(true)}
        />
      </Actions>
      {isRisksModalOpen && (
        <RisksModal
          isOpen={isRisksModalOpen}
          onToggle={setIsRisksModalOpen}
        />
      )}
      {isTestsToRunModalOpen && (
        <TestsToRunModal
          testsToRun={testTypeToNames}
          isOpen={isTestsToRunModalOpen}
          onToggle={setIsTestToRunModalOpen}
          agentId={agentId}
          pluginId={pluginId}
        />
      )}
      <QualityGatePane
        isOpen={isOpenQualityGatesPane}
        onToggle={() => setIsOpenQualityGatesPane(false)}
        qualityGateSettings={qualityGateSettings}
        agentId={agentId}
        pluginId={pluginId}
      />
    </div>
  );
});

const PluginName = coveragePluginHeader.pluginName('span');
const CurrentBuild = coveragePluginHeader.currentBuild('div');
const Version = coveragePluginHeader.version('div');
const QualityGateLabel = coveragePluginHeader.qualityGateLabel('div');
const InfoIcon = coveragePluginHeader.infoIcon(Icons.Info);
const Actions = coveragePluginHeader.actions('div');
const QualityGateSection = coveragePluginHeader.qualityGateSection('div');
const StatusWrapper = coveragePluginHeader.statusWrapper('div');
const StatusTitle = coveragePluginHeader.statusTitle('div');
