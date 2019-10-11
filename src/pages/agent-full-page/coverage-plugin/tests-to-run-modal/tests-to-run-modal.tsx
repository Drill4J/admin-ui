import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons, Modal } from '../../../../components';
import { Inputs } from '../../../../forms';
import { TestsToRun } from '../../../../types/tests-to-run';

import styles from './tests-to-run-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  testsToRun: TestsToRun;
  count: number;
}

const testsToRunModal = BEM(styles);

export const TestsToRunModal = testsToRunModal(
  ({ className, isOpen, onToggle, testsToRun: { test: testsToRun = [] }, count }: Props) => {
    const testsMap = testsToRun.reduce(
      (acc, test) => {
        const testName = test.slice(test.indexOf('::') + 2);
        const testType = test.slice(0, test.indexOf('::'));

        return { ...acc, [testType]: acc[testType] ? [...acc[testType], testName] : [testName] };
      },
      {} as { [testType: string]: string[] },
    );
    const allTests = Object.values(testsMap).reduce((acc, tests) => [...acc, ...tests], []);
    const [selectedFilter, setSelectedFilter] = React.useState('all');

    const getSelectedTests = () => {
      switch (selectedFilter) {
        case 'manual':
          return testsMap.MANUAL;
        case 'auto':
          return testsMap.AUTO;
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
          <Content>
            <Filter
              items={[
                { value: 'all', label: 'All test types' },
                { value: 'manual', label: `Manual tests (${(testsMap.MANUAL || []).length})` },
                {
                  value: 'auto',
                  label: `Auto test (${(testsMap.AUTO || []).length})`,
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
const Content = testsToRunModal.content('div');
const Filter = testsToRunModal.filter(Inputs.Dropdown);
const MethodsList = testsToRunModal.methodsList('div');
const MethodsListItem = testsToRunModal.methodsListItem('div');
const MethodInfo = testsToRunModal.methodsInfo('div');
const MethodsListItemIcon = testsToRunModal.methodsListItemIcon('div');
