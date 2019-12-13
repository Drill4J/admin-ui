import * as React from 'react';
import { BEM, capitalize } from '@redneckz/react-bem-helper';

import { Panel } from 'layouts';
import { Icons, Modal } from 'components';
import { MethodsList } from '../methods-list';
import { MethodCoveredByTest } from 'types/method-covered-by-test';

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
  ({ className, isOpen, onToggle, testId, coveredMethods = [] }: Props) => {
    const filtredMethods = coveredMethods.find(({ id }) => id === testId) || {};
    const {
      testName,
      testType = '',
      newMethods = [],
      modifiedMethods = [],
      unaffectedMethods = [],
    } = filtredMethods;

    const allMethods = newMethods.concat(modifiedMethods, unaffectedMethods);

    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Header>
            <Icons.Function height={18} width={18} />
            <span>Covered methods</span>
            <h2>{allMethods.length}</h2>
          </Header>
          <Info>
            <Panel>
              <MethodInfoLabel>Test</MethodInfoLabel>
              <MethodInfoValue>{testName}</MethodInfoValue>
            </Panel>
            <Panel>
              <MethodInfoLabel>Type</MethodInfoLabel>
              <MethodInfoValue>{capitalize(testType.toLowerCase())}</MethodInfoValue>
            </Panel>
          </Info>
          <MethodsList coveredMethods={filtredMethods} />
        </div>
      </Modal>
    );
  },
);

const Header = coveredMethodsByTestSidebar.header('div');
const Info = coveredMethodsByTestSidebar.info('div');
const MethodInfoLabel = coveredMethodsByTestSidebar.methodInfoLabel('div');
const MethodInfoValue = coveredMethodsByTestSidebar.methodInfoValue('div');
