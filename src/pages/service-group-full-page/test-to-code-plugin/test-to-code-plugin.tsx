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
import { useHistory, useParams } from 'react-router-dom';
import { Menu } from '@drill4j/ui-kit';

import { List, ListColumn } from 'components';
import { SessionsManagementPaneProvider as SessionsManagementPane, TestsToRunModal } from 'modules';
import { percentFormatter } from 'utils';
import { Summary } from 'types/service-group-summary';
import { TestToCodeNameCell } from './test-to-code-name-cell';
import { TestToCodeCoverageCell } from './test-to-code-coverage-cell';
import { TestToCodeCell } from './test-to-code-cell';
import { TestToCodeHeaderCell } from './test-to-code-header-cell';
import { FinishAllScopesModal } from './finish-all-scopes-modal';

import styles from './test-to-code-plugin.module.scss';

type TestToRun = { groupedTests?: { [testType: string]: string[] }; count?: number; agentType?: string; id?: string };

interface Props {
  className?: string;
  summaries?: Summary[];
  aggregated?: {
    coverage?: number;
    risks?: number;
    testsToRun?: TestToRun;
  };
}
const testToCodePlugin = BEM(styles);

export const TestToCodePlugin = testToCodePlugin(
  ({
    className,
    summaries = [],
    aggregated,
  }: Props) => {
    const [testsToRunModalIsOpen, setTestsToRunModalIsOpen] = useState(false);
    const { serviceGroupId = '', pluginId = '' } = useParams<{ serviceGroupId: string, pluginId: string}>();
    const { push } = useHistory();
    const [isSessionsManagementModalOpen, setIsSessionsManagementModalOpen] = useState(false);
    const [isFinishScopesModalOpen, setIsFinishScopesModalOpen] = useState(false);
    const serviceGroupSummaries = summaries
      .map((agentSummary) => ({ ...agentSummary, ...agentSummary.summary }));

    return (
      <div className={className}>
        <List data={serviceGroupSummaries} gridTemplateColumns="3fr repeat(3, 1fr) 50px" testContext="test-to-code-plugin">
          <ListColumn
            name="name"
            Cell={({
              value,
              item: {
                buildVersion,
                id: agentId,
              },
            }: {
              value: string;
              item: { buildVersion?: string; id?: string; };
            }) => (
              <TestToCodeNameCell
                name={value}
                additionalInformation={`Build: ${buildVersion}`}
                onClick={() => push(`/full-page/${agentId}/${buildVersion}/dashboard`)}
              />
            )}
            HeaderCell={() => <TableTitle>Test2Code</TableTitle>}
          />
          <ListColumn
            name="coverage"
            label="Coverage"
            Cell={({ value }) => (
              <TestToCodeCoverageCell value={value} />
            )}
            HeaderCell={() => (
              <TestToCodeHeaderCell
                value={`${percentFormatter(aggregated?.coverage || 0)}%`}
                label="coverage"
              />
            )}
          />
          <ListColumn
            name="risks"
            Cell={({ value }) => (
              <TestToCodeCell
                value={value}
                testContext="risks"
              />
            )}
            HeaderCell={() => (
              <TestToCodeHeaderCell value={aggregated?.risks || 0} label="risks" />
            )}
          />
          <ListColumn
            name="testsToRun"
            Cell={({ value, item: { id: agentId = '', buildVersion = '' } = {} }) => (
              <TestToCodeCell
                value={value?.count}
                onClick={() => push(`/full-page/${agentId}/${buildVersion}/${pluginId}/tests-to-run`)}
                testContext="tests-to-run"
              />
            )}
            HeaderCell={() => (
              <TestToCodeHeaderCell
                value={aggregated?.testsToRun?.count || 0}
                label="tests to run"
                onClick={() => setTestsToRunModalIsOpen(true)}
              />
            )}
          />
          <ListColumn
            name="actions"
            Cell={({
              item: {
                id: agentId = '',
              },
            }) => (
              <Actions
                testContext="test-to-code-plugin:actions:cell"
                items={[
                  {
                    label: 'Builds list',
                    icon: 'BuildList',
                    onClick: () => push(`/full-page/${agentId}/build-list`),
                  },
                  {
                    label: 'Settings',
                    icon: 'Settings',
                    onClick: () => push(`/agents/agent/${agentId}/settings`),
                  },
                ]}
              />
            )}
            HeaderCell={() => (
              <Actions
                testContext="test-to-code-plugin:header-cell:actions"
                items={[
                  {
                    label: 'Finish all scopes',
                    icon: 'Check',
                    onClick: () => setIsFinishScopesModalOpen(true),
                  },
                  {
                    label: 'Sessions Management',
                    icon: 'ManageSessions',
                    onClick: () => setIsSessionsManagementModalOpen(true),
                  },
                ]}
              />
            )}
          />
        </List>
        {isSessionsManagementModalOpen && (
          <SessionsManagementPane
            isOpen={isSessionsManagementModalOpen}
            onToggle={setIsSessionsManagementModalOpen}
          />
        )}
        {isFinishScopesModalOpen && (
          <FinishAllScopesModal
            isOpen={isFinishScopesModalOpen}
            onToggle={setIsFinishScopesModalOpen}
            setIsSessionsManagementModalOpen={setIsSessionsManagementModalOpen}
            serviceGroupId={serviceGroupId}
            agentsCount={serviceGroupSummaries.length}
            pluginId={pluginId}
          />
        )}
        {testsToRunModalIsOpen && (
          <TestsToRunModal
            isOpen={testsToRunModalIsOpen}
            onToggle={setTestsToRunModalIsOpen}
          />
        )}
      </div>
    );
  },
);

const TableTitle = testToCodePlugin.tableTitle('div');
const Actions = testToCodePlugin.actions(Menu);
