import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import {
  Button, Modal, GeneralAlerts, Panel, Icons,
} from '@drill4j/ui-kit';
import { Form } from 'react-final-form';

import { QualityGateSettings as QualityGate, ConditionSettingByType } from 'types/quality-gate-type';
import { QualityGateStatus } from './quality-gate-status';
import { QualityGateSettings } from './quality-gate-settings';
import { validateQualityGate } from './validate-quality-gate';
import { updateQualityGateSettings } from './api';

import styles from './quality-gate-pane.module.scss';

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
    const [errorMessage, setErrorMessage] = React.useState('');
    const StatusIcon = Icons[qualityGate.status];

    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Form
            onSubmit={(
              values: ConditionSettingByType & { configured: boolean },
            ) => updateQualityGateSettings(agentId, pluginId, setErrorMessage)(values)}
            initialValues={{ configured, ...conditionSettingByType }}
            validate={validateQualityGate}
            render={({
              values, handleSubmit, invalid, form,
            }) => (
              <>
                <Header align="space-between">
                  <Title data-test="quality-gate-pane:header-title">Quality Gate</Title>
                  {values.configured && (
                    <StatusIconWrapper type={qualityGate.status}>
                      <StatusIcon width={24} height={24} data-test="quality-gate-pane:header-status-icon" />
                    </StatusIconWrapper>
                  )}
                </Header>
                <GeneralAlerts type="INFO" data-test="quality-gate-pane:general-alerts:info">
                  {values.configured
                    ? 'Meet all conditions to pass the quality gates.'
                    : 'Choose the metrics and define their threshold.'}
                </GeneralAlerts>
                {errorMessage && (
                  <GeneralAlerts type="ERROR">
                    {errorMessage}
                  </GeneralAlerts>
                )}
                {values.configured
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
                  : <QualityGateSettings conditionSettingByType={values} />}
                <ActionsPanel>
                  {values.configured ? (
                    <Button
                      type="primary"
                      size="large"
                      onClick={() => form.change('configured', !values.configured)}
                      data-test="quality-gate-pane:edit-button"
                    >
                      Edit
                    </Button>
                  )
                    : (
                      <Button
                        type="primary"
                        size="large"
                        disabled={invalid}
                        onClick={handleSubmit}
                        data-test="quality-gate-pane:save-button"
                      >
                        Save
                      </Button>
                    )}
                  <Button
                    type="secondary"
                    size="large"
                    onClick={() => onToggle(false)}
                    data-test="quality-gate-pane:close-button"
                  >
                    {values.configured ? 'Close' : 'Cancel'}
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

const Header = qualityGatePane.header(Panel);
const StatusIconWrapper = qualityGatePane.statusIconWrapper('div');
const Title = qualityGatePane.title('div');
const ActionsPanel = qualityGatePane.actionsPanel('div');
