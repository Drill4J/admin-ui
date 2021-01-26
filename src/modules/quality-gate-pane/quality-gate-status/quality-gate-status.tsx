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
import { Icons } from '@drill4j/ui-kit';

import { copyToClipboard, percentFormatter } from 'utils';
import { QualityGateSettings } from 'types/quality-gate-type';
import { QualityGateConfigurationUrl } from './quality-gate-configuration-url';
import { getQualityGateConfigurationUrl } from './get-quality-gate-configuration-url';
import { Condition } from './condition';

import styles from './quality-gate-status.module.scss';

interface Props {
  className?: string;
  qualityGateSettings: Omit<QualityGateSettings, 'configured'>;
  agentId: string;
  pluginId: string;
}

const qualityGateStatus = BEM(styles);

export const QualityGateStatus = qualityGateStatus(
  ({
    className,
    qualityGateSettings: {
      conditionSettingByType, qualityGate, metrics,
    },
    agentId,
    pluginId,
  }: Props) => (
    <div className={className}>
      <Conditions>
        {conditionSettingByType.coverage?.enabled && (
          <Condition
            passed={Boolean(qualityGate?.results?.coverage)}
            type="coverage"
            thresholdValue={conditionSettingByType.coverage.condition.value}
          >
            <CondtionStatus data-test="quality-gate-status:condition-status:coverage">
              {qualityGate?.results?.coverage ? 'Passed' : 'Failed'}. Your coverage is&nbsp;
              <Value data-test="quality-gate-status:condition-status:coverage">{percentFormatter(metrics?.coverage || 0)}</Value>
              %
            </CondtionStatus>
          </Condition>
        )}
        {conditionSettingByType.risks?.enabled && (
          <Condition
            passed={Boolean(qualityGate?.results?.risks)}
            type="risks"
            thresholdValue={conditionSettingByType.risks.condition.value}
          >
            <CondtionStatus data-test="quality-gate-status:condition-status:risks">
              {qualityGate?.results?.risks ? 'Passed' : 'Failed'}. You have&nbsp;
              <Value data-test="quality-gate-status:condition-status:risks">{metrics?.risks}</Value>
              &nbsp;risks
            </CondtionStatus>
          </Condition>
        )}
        {conditionSettingByType.tests?.enabled && (
          <Condition
            passed={Boolean(qualityGate?.results?.tests)}
            type="testsToRun"
            thresholdValue={conditionSettingByType.tests.condition.value}
          >
            <CondtionStatus data-test="quality-gate-status:condition-status:tests">
              {qualityGate?.results?.tests ? 'Passed' : 'Failed'}. You have&nbsp;
              <Value data-test="quality-gate-status:condition-status:tests">{metrics?.tests}</Value>
              {qualityGate?.results?.tests ? ' Tests to run' : ' not executed tests to run'}
            </CondtionStatus>
          </Condition>
        )}
      </Conditions>
      <InfoPanel data-test="quality-gate-status:info-panel">
        <span>
          This is quality gate configuration for this build.
          Use this Curl in your command line to get JSON:
        </span>
        <CommandWrapper className="d-flex align-items-end">
          <QualityGateConfigurationUrl agentId={agentId} pluginId={pluginId} />
          <CopyIcon
            data-test="quality-gate-status:copy-icon"
            onClick={() => copyToClipboard(getQualityGateConfigurationUrl(agentId, pluginId))}
          />
        </CommandWrapper>
      </InfoPanel>
    </div>
  ),
);

const Conditions = qualityGateStatus.conditions('div');
const CondtionStatus = qualityGateStatus.condtionStatus('div');
const Value = qualityGateStatus.value('span');
const InfoPanel = qualityGateStatus.infoPanel('div');
const CommandWrapper = qualityGateStatus.commandWrapper('div');
const CopyIcon = qualityGateStatus.copyIcon(Icons.Copy);
