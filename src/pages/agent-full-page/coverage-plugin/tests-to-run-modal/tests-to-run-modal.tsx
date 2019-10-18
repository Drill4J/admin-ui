import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import axios from 'axios';

import { Icons, Modal } from '../../../../components';
import { Inputs } from '../../../../forms';
import { usePluginState } from '../../store';

import styles from './tests-to-run-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  testsToRun: { [testType: string]: string[] };
  count: number;
}

const testsToRunModal = BEM(styles);

export const TestsToRunModal = testsToRunModal(
  ({ className, isOpen, onToggle, testsToRun, count }: Props) => {
    const allTests = Object.values(testsToRun).reduce((acc, tests) => [...acc, ...tests], []);
    const [selectedFilter, setSelectedFilter] = React.useState('all');
    const { agentId, pluginId } = usePluginState();

    // TODO: should be removed after SSL certificate impl
    const adminUrl = new URL(String(axios.defaults.baseURL));
    adminUrl.port = '8090';
    adminUrl.protocol = 'http';

    const openApiUrl = `curl -i -H "Accept: application/json" -H "Content-Type: application/json"
      -X GET ${adminUrl}/agents/${agentId}/${pluginId}/get-data?type=test-to-run`;

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
            <h2>{count}</h2>
          </Header>
          <NotificaitonPanel>
            <span>These are recommendations for this build updates only.</span>
            <Bold>Use this Curl in your command line to get JSON:</Bold>
            <span>{openApiUrl}</span>
          </NotificaitonPanel>
          <Content>
            <Filter
              items={[
                { value: 'all', label: 'All test types' },
                { value: 'manual', label: `Manual tests (${(testsToRun.MANUAL || []).length})` },
                {
                  value: 'auto',
                  label: `Auto test (${(testsToRun.AUTO || []).length})`,
                },
              ]}
              onChange={({ value }) => setSelectedFilter(value)}
              value={selectedFilter}
            />
            <MethodsList>
              {(getSelectedTests() || []).map((test, index) => (
                <MethodsListItem key={index}>
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
const Bold = testsToRunModal.bold('span');
const Content = testsToRunModal.content('div');
const Filter = testsToRunModal.filter(Inputs.Dropdown);
const MethodsList = testsToRunModal.methodsList('div');
const MethodsListItem = testsToRunModal.methodsListItem('div');
const MethodInfo = testsToRunModal.methodsInfo('div');
const MethodsListItemIcon = testsToRunModal.methodsListItemIcon('div');
