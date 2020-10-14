import * as React from 'react';
import { BEM, capitalize } from '@redneckz/react-bem-helper';
import {
  Panel, Modal, OverflowText,
} from '@drill4j/ui-kit';

import { MethodCoveredByTest } from 'types/method-covered-by-test';
import { MethodsList } from '../methods-list';

import styles from './covered-methods-by-test-sidebar.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  testId: string;
  coveredMethods: MethodCoveredByTest[];
}

const coveredMethodsByTestSidebar = BEM(styles);

export const CoveredMethodsByTestSidebar = coveredMethodsByTestSidebar(
  ({
    className, isOpen, onToggle, testId, coveredMethods = [],
  }: Props) => {
    const filteredMethods = coveredMethods.find(({ id }) => id === testId) || {};
    const {
      testName = '',
      testType = '',
      allMethods = [],
    } = filteredMethods;

    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Header>
            <ModalName>Covered methods</ModalName>
            <MethodsCount>{allMethods.length}</MethodsCount>
          </Header>
          <Info>
            <Panel>
              <MethodInfoLabel>Test</MethodInfoLabel>
              <MethodInfoValue title={testName}>{testName}</MethodInfoValue>
            </Panel>
            <Panel>
              <MethodInfoLabel>Type</MethodInfoLabel>
              <MethodInfoValue>{capitalize(testType.toLowerCase())}</MethodInfoValue>
            </Panel>
          </Info>
          <MethodsList coveredMethods={filteredMethods} />
        </div>
      </Modal>
    );
  },
);

const Header = coveredMethodsByTestSidebar.header('div');
const Info = coveredMethodsByTestSidebar.info('div');
const ModalName = coveredMethodsByTestSidebar.modalName('span');
const MethodsCount = coveredMethodsByTestSidebar.methodsCount('span');
const MethodInfoLabel = coveredMethodsByTestSidebar.methodInfoLabel('div');
const MethodInfoValue = coveredMethodsByTestSidebar.methodInfoValue(OverflowText);
