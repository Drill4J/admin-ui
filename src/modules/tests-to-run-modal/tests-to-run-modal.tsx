import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import nanoid from 'nanoid';
import {
  Icons, Inputs, Modal, Panel,
} from '@drill4j/ui-kit';

import { copyToClipboard } from 'utils';
import { TestsToRunUrl } from './test-to-run-url';
import { getTestToRunURL } from './get-test-to-run-url';

import styles from './tests-to-run-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  testsToRun: { [testType: string]: string[] };
  agentId: string;
  pluginId: string;
  agentType?: string;
  filter?: string;
}

const testsToRunModal = BEM(styles);

export const TestsToRunModal = testsToRunModal(
  ({
    className, isOpen, onToggle, testsToRun, agentId, pluginId, agentType, filter = 'all',
  }: Props) => {
    const allTests = Object.values(testsToRun).reduce((acc, tests) => [...acc, ...tests], []);
    const [selectedFilter, setSelectedFilter] = React.useState(filter);

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
            <CommandWrapper verticalAlign="end">
              <TestsToRunUrl agentId={agentId} pluginId={pluginId} agentType={agentType} />
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
const Content = testsToRunModal.content('div');
const Filter = testsToRunModal.filter(Inputs.Dropdown);
const MethodsList = testsToRunModal.methodsList('div');
const MethodsListItem = testsToRunModal.methodsListItem('div');
const MethodInfo = testsToRunModal.methodsInfo('div');
const MethodsListItemIcon = testsToRunModal.methodsListItemIcon('div');
const CommandWrapper = testsToRunModal.commandWrapper(Panel);
const CopyIcon = testsToRunModal.copyIcon(Icons.Copy);
