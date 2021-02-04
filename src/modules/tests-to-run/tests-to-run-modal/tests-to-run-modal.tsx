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
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BEM } from '@redneckz/react-bem-helper';
import { nanoid } from 'nanoid';
import {
  Icons, Inputs, Modal,
} from '@drill4j/ui-kit';

import { copyToClipboard } from 'utils';
import { usePluginData } from 'pages/service-group-full-page/use-plugin-data';
import { TestsToRunUrl } from '../tests-to-run-url';
import { getTestsToRunURL } from '../get-tests-to-run-url';

import styles from './tests-to-run-modal.module.scss';

interface GroupedTestToRun {
  byType?: Record<string, string[]>;
  totalCount?: number;
}

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
}

const testsToRunModal = BEM(styles);

export const TestsToRunModal = testsToRunModal(
  ({
    className, isOpen, onToggle,
  }: Props) => {
    const [copied, setCopied] = useState(false);
    useEffect(() => {
      const timeout = setTimeout(() => setCopied(false), 5000);
      copied && timeout;
      return () => clearTimeout(timeout);
    }, [copied]);

    const { serviceGroupId = '', pluginId = '' } = useParams<{ serviceGroupId: string, pluginId: string }>();
    const { byType: testsToRun = {} } = usePluginData<GroupedTestToRun>('/group/data/tests-to-run', serviceGroupId, pluginId) || {};
    const allTests = Object.values(testsToRun).reduce((acc, tests) => [...acc, ...tests], []);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const getSelectedTests = () => {
      switch (selectedFilter) {
        case 'manual':
          return testsToRun.MANUAL;
        case 'auto':
          return testsToRun.AUTO;
        default:
          return allTests;
      }
    };

    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Header>
            <Icons.Test height={20} width={18} viewBox="0 0 18 20" />
            <span>Tests to run</span>
            <h2>{allTests.length}</h2>
          </Header>
          <NotificaitonPanel>
            <span>
              These are recommendations for this build updates only.
              Use this Curl in your command line to get JSON:
            </span>
            <TestsToRunUrl agentId={serviceGroupId} pluginId={pluginId} agentType="ServiceGroup" />
            <CopyIcon>
              {copied
                ? (
                  <div className="flex items-center gx-1 fs-10 lh-16 primary-blue-default">
                    <span className="monochrome-black">Copied to clipboard.</span>
                    <Icons.Check height={10} width={14} viewBox="0 0 14 10" />
                  </div>
                )
                : (
                  <Icons.Copy
                    data-test="quality-gate-status:copy-icon"
                    onClick={() => { copyToClipboard(getTestsToRunURL(serviceGroupId, pluginId, 'ServiceGroup')); setCopied(true); }}
                  />
                )}
            </CopyIcon>
          </NotificaitonPanel>
          <Content>
            <Filter
              items={[
                { value: 'all', label: 'All test types' },
                { value: 'manual', label: `Manual tests (${(testsToRun.MANUAL || []).length})` },
                {
                  value: 'auto',
                  label: `Auto tests (${(testsToRun.AUTO || []).length})`,
                },
              ]}
              onChange={({ value }) => setSelectedFilter(value)}
              value={selectedFilter}
            />
            <MethodsList>
              {(getSelectedTests() || []).map((test) => (
                <MethodsListItem key={nanoid()}>
                  <MethodsListItemIcon>
                    <Icons.Test />
                  </MethodsListItemIcon>
                  <MethodInfo>{test}</MethodInfo>
                </MethodsListItem>
              ))}
            </MethodsList>
          </Content>
        </div>
      </Modal>
    );
  },
);

const Header = testsToRunModal.header('div');
const NotificaitonPanel = testsToRunModal.notificationPanel('div');
const Content = testsToRunModal.content('div');
const Filter = testsToRunModal.filter(Inputs.Dropdown);
const MethodsList = testsToRunModal.methodsList('div');
const MethodsListItem = testsToRunModal.methodsListItem('div');
const MethodInfo = testsToRunModal.methodsInfo('div');
const MethodsListItemIcon = testsToRunModal.methodsListItemIcon('div');
const CopyIcon = testsToRunModal.copyIcon('div');
