import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from '../../../../../layouts';
import { Icons } from '../../../../../components';
import { useBuildVersion } from '../../use-build-version';

import styles from './active-sessions-panel.module.scss';

interface Props {
  className?: string;
  agentId: string;
  buildVersion: string;
}

const activeSessionsPanel = BEM(styles);

export const ActiveSessionsPanel = activeSessionsPanel(
  ({ className, agentId, buildVersion }: Props) => {
    const { testTypes = [] } =
      useBuildVersion<{ testTypes: string[] }>('/active-sessions', agentId, buildVersion) || {};

    return (
      <div className={className}>
        {testTypes.length > 0 && (
          <Content>
            <Panel>
              <Icon height={16} width={16} />
              <WarningMessage>The following test sessions are still being recorded:</WarningMessage>
            </Panel>
            <ActiveSessionTypesList>
              {testTypes.map((type) => (
                <ActiveSessionType key={type}>• {type.toLowerCase()}</ActiveSessionType>
              ))}
            </ActiveSessionTypesList>
            <Instructions>
              If you finish the scope now, these sessions will not be saved.
            </Instructions>
          </Content>
        )}
      </div>
    );
  },
);

const Content = activeSessionsPanel.content('div');
const Icon = activeSessionsPanel.icon(Icons.Warning);
const WarningMessage = activeSessionsPanel.warningMessage('div');
const ActiveSessionTypesList = activeSessionsPanel.activeSessionTypesList('div');
const ActiveSessionType = activeSessionsPanel.activeSessionType('div');
const Instructions = activeSessionsPanel.instructions('div');
