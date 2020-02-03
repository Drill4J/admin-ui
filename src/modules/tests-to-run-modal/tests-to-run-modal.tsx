import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import nanoid from 'nanoid';

import { Icons, Modal } from 'components';
import { Inputs } from 'forms';
import { Panel } from 'layouts';
import { copyToClipboard } from 'utils';
import { getTestToRunURL } from './get-test-to-run-url';

import styles from './tests-to-run-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  testsToRun: { [testType: string]: string[] };
  count: number;
  agentId: string;
  pluginId: string;
  agentType?: string;
}

const testsToRunModal = BEM(styles);

export const TestsToRunModal = testsToRunModal(
  ({
    className, isOpen, onToggle, testsToRun, count, agentId, pluginId, agentType,
  }: Props) => {
    const allTests = Object.values(testsToRun).reduce((acc, tests) => [...acc, ...tests], []);
    const [selectedFilter, setSelectedFilter] = React.useState('all');

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
            <CommandWrapper align="space-between">
              <CurlCommand>{getTestToRunURL(agentId, pluginId, agentType)}</CurlCommand>
              <CopyIcon onClick={() => copyToClipboard(getTestToRunURL(agentId, pluginId, agentType))} />
            </CommandWrapper>
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
const Bold = testsToRunModal.bold('span');
const Content = testsToRunModal.content('div');
const Filter = testsToRunModal.filter(Inputs.Dropdown);
const MethodsList = testsToRunModal.methodsList('div');
const MethodsListItem = testsToRunModal.methodsListItem('div');
const MethodInfo = testsToRunModal.methodsInfo('div');
const MethodsListItemIcon = testsToRunModal.methodsListItemIcon('div');
const CommandWrapper = testsToRunModal.commandWrapper(Panel);
const CopyIcon = testsToRunModal.copyIcon(Icons.Copy);
const CurlCommand = testsToRunModal.curlCommand('span');
