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
import { Panel, Icons } from '@drill4j/ui-kit';

import { useCoveragePluginState } from '../../store';

import styles from './active-sessions-panel.module.scss';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const activeSessionsPanel = BEM(styles);

export const ActiveSessionsPanel = activeSessionsPanel(({ className, children }: Props) => {
  const {
    activeSessions: { testTypes = [] },
  } = useCoveragePluginState();

  return (
    <div className={className}>
      {testTypes.length > 0 && (
        <Content>
          <div className="d-flex align-items-center w-100">
            <Icon height={16} width={16} />
            <WarningMessage>The following test sessions are still being recorded:</WarningMessage>
          </div>
          <ActiveSessionTypesList>
            {testTypes.map((type) => (
              <ActiveSessionType key={type}>
                {type.toLowerCase()}
              </ActiveSessionType>
            ))}
          </ActiveSessionTypesList>
          <Instructions>
            {children}
          </Instructions>
        </Content>
      )}
    </div>
  );
});

const Content = activeSessionsPanel.content('div');
const Icon = activeSessionsPanel.icon(Icons.Warning);
const WarningMessage = activeSessionsPanel.warningMessage('div');
const ActiveSessionTypesList = activeSessionsPanel.activeSessionTypesList('div');
const ActiveSessionType = activeSessionsPanel.activeSessionType('div');
const Instructions = activeSessionsPanel.instructions('div');
