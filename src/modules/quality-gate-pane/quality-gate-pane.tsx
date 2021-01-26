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
import { useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import {
  Button, Modal, Icons, GeneralAlerts,
} from '@drill4j/ui-kit';
import { Form } from 'react-final-form';

import {
  composeValidators,
  numericLimits,
  positiveInteger,
} from 'forms';
import {
  QualityGateSettings as QualityGate, ConditionSettingByType,
} from 'types/quality-gate-type';
import { useGeneralAlertMessage } from 'hooks';
import { QualityGateStatus } from './quality-gate-status';
import { QualityGateSettings } from './quality-gate-settings';
import { updateQualityGateSettings } from './api';

import styles from './quality-gate-pane.module.scss';

const validateQualityGate = (formValues: ConditionSettingByType) => composeValidators(
  formValues.coverage?.enabled ? numericLimits({
    fieldName: 'coverage.condition.value',
    fieldAlias: 'Build coverage',
    unit: 'percentages',
    min: 0.1,
    max: 100,
  }) : () => undefined,
  formValues.risks?.enabled ? positiveInteger('risks.condition.value', 'Risks') : () => undefined,
  formValues.tests?.enabled ? positiveInteger('tests.condition.value', 'Tests to run') : () => undefined,
)(formValues);

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  qualityGateSettings: QualityGate;
  agentId: string;
  pluginId: string;
}

const qualityGatePane = BEM(styles);

export const QualityGatePane = qualityGatePane(
  ({
    className,
    isOpen,
    onToggle,
    qualityGateSettings: {
      configured, conditionSettingByType, qualityGate, metrics,
    },
    agentId,
    pluginId,
  }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const { generalAlertMessage, showGeneralAlertMessage } = useGeneralAlertMessage();
    const StatusIcon = Icons[qualityGate.status];

    const handleOnToggle = () => {
      onToggle(false);
      setIsEditing(false);
    };

    return (
      <Modal isOpen={isOpen} onToggle={handleOnToggle}>
        <div className={className}>
          <Form
            onSubmit={(values) => {
              updateQualityGateSettings(agentId, pluginId, showGeneralAlertMessage)(values);
              setIsEditing(false);
            }}
            initialValues={{
              coverage: {
                enabled: conditionSettingByType.coverage?.enabled,
                condition: {
                  ...conditionSettingByType.coverage?.condition,
                  value: conditionSettingByType.coverage?.enabled ? String(conditionSettingByType.coverage.condition.value) : undefined,
                },
              },
              risks: {
                enabled: conditionSettingByType.risks?.enabled,
                condition: {
                  ...conditionSettingByType.risks?.condition,
                  value: conditionSettingByType.risks?.enabled ? String(conditionSettingByType.risks.condition.value) : undefined,
                },
              },
              tests: {
                enabled: conditionSettingByType.tests?.enabled,
                condition: {
                  ...conditionSettingByType.tests?.condition,
                  value: conditionSettingByType.tests?.enabled ? String(conditionSettingByType.tests.condition.value) : undefined,
                },
              },
            }}
            initialValuesEqual={(prevValues, nextValues) => JSON.stringify(prevValues) === JSON.stringify(nextValues)}
            validate={validateQualityGate}
            render={({
              values, handleSubmit, invalid, pristine,
            }) => (
              <>
                <Header className="d-flex justify-content-between align-items-center px-6">
                  <Title data-test="quality-gate-pane:header-title">Quality Gate</Title>
                  {configured && !isEditing && (
                    <StatusIconWrapper type={qualityGate.status}>
                      <StatusIcon width={24} height={24} data-test="quality-gate-pane:header-status-icon" />
                    </StatusIconWrapper>
                  )}
                </Header>
                <GeneralAlerts type="INFO" data-test="quality-gate-pane:general-alerts:info">
                  {configured && !isEditing
                    ? 'Meet all conditions to pass the quality gate.'
                    : 'Choose the metrics and define their threshold.'}
                </GeneralAlerts>
                {generalAlertMessage?.type && (
                  <GeneralAlerts type={generalAlertMessage.type}>
                    {generalAlertMessage.text}
                  </GeneralAlerts>
                )}
                {configured && !isEditing
                  ? (
                    <QualityGateStatus
                      qualityGateSettings={{
                        conditionSettingByType,
                        qualityGate,
                        metrics,
                      }}
                      agentId={agentId}
                      pluginId={pluginId}
                    />
                  )
                  : (
                    <QualityGateSettings conditionSettingByType={values} />
                  )}
                <ActionsPanel>
                  {configured && !isEditing ? (
                    <Button
                      type="primary"
                      size="large"
                      onClick={() => setIsEditing(true)}
                      data-test="quality-gate-pane:edit-button"
                    >
                      Edit
                    </Button>
                  )
                    : (
                      <Button
                        type="primary"
                        size="large"
                        disabled={invalid || pristine}
                        onClick={handleSubmit}
                        data-test="quality-gate-pane:save-button"
                      >
                        Save
                      </Button>
                    )}
                  {configured && isEditing && (
                    <Button
                      type="secondary"
                      size="large"
                      onClick={() => setIsEditing(false)}
                      data-test="quality-gate-pane:back-button"
                    >
                      <Icons.Expander width={8} height={14} rotate={180} />
                      <span>Back</span>
                    </Button>
                  )}
                  <Button
                    type="secondary"
                    size="large"
                    onClick={handleOnToggle}
                    data-test="quality-gate-pane:cancel-button"
                  >
                    Cancel
                  </Button>
                </ActionsPanel>
              </>
            )}
          />
        </div>
      </Modal>
    );
  },
);

const Header = qualityGatePane.header('div');
const StatusIconWrapper = qualityGatePane.statusIconWrapper('div');
const Title = qualityGatePane.title('div');
const ActionsPanel = qualityGatePane.actionsPanel('div');
