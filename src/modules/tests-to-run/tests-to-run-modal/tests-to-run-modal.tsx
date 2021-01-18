import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BEM } from '@redneckz/react-bem-helper';
import { nanoid } from 'nanoid';
import {
  Icons, Inputs, Modal, Panel,
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
    const { serviceGroupId = '', pluginId = '' } = useParams<{ serviceGroupId: string, pluginId: string }>();
    const { byType: testsToRun = {} } = usePluginData<GroupedTestToRun>('/service-group/data/tests-to-run', serviceGroupId, pluginId) || {};
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
            <CommandWrapper verticalAlign="end">
              <TestsToRunUrl agentId={serviceGroupId} pluginId={pluginId} agentType="ServiceGroup" />
              <CopyIcon onClick={() => copyToClipboard(getTestsToRunURL(serviceGroupId, pluginId, 'ServiceGroup'))} />
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
