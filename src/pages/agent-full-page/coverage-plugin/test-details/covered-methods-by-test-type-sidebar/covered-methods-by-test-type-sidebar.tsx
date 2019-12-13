import * as React from 'react';
import { BEM, capitalize } from '@redneckz/react-bem-helper';

import { Panel } from 'layouts';
import { Icons, Modal } from 'components';
import { MethodsList } from '../methods-list';
import { MethodCoveredByTest } from 'types/method-covered-by-test';

import styles from './covered-methods-by-test-type-sidebar.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  testType: string;
  coveredMethods: MethodCoveredByTest[];
}

const coveredMethodsByTestTypeSidebar = BEM(styles);

export const CoveredMethodsByTestTypeSidebar = coveredMethodsByTestTypeSidebar(
  ({ className, isOpen, onToggle, testType, coveredMethods = [] }: Props) => {
    const filtredMethods = coveredMethods.find(({ testType: type }) => type === testType) || {};
    const {
      newMethods = [],
      modifiedMethods = [],
      unaffectedMethods = [],
      testsCount,
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
              <MethodInfoLabel>Test type</MethodInfoLabel>
              <MethodInfoValue>{capitalize(testType.toLowerCase())}</MethodInfoValue>
            </Panel>
            <Panel>
              <MethodInfoLabel># of tests</MethodInfoLabel>
              <MethodInfoValue>{testsCount}</MethodInfoValue>
            </Panel>
          </Info>
          <MethodsList coveredMethods={filtredMethods} />
        </div>
      </Modal>
    );
  },
);

const Header = coveredMethodsByTestTypeSidebar.header('div');
const Info = coveredMethodsByTestTypeSidebar.info('div');
const MethodInfoLabel = coveredMethodsByTestTypeSidebar.methodInfoLabel('div');
const MethodInfoValue = coveredMethodsByTestTypeSidebar.methodInfoValue('div');
