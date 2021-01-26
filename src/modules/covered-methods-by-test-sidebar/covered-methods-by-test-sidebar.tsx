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
import { BEM, capitalize } from '@redneckz/react-bem-helper';
import { Modal, OverflowText } from '@drill4j/ui-kit';

import { MethodCoveredByTest } from 'types/method-covered-by-test';
import { useBuildVersion } from 'hooks';
import { MethodsList } from './methods-list';

import styles from './covered-methods-by-test-sidebar.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  testId: string;
  topicCoveredMethodsByTest: string;
}

const coveredMethodsByTestSidebar = BEM(styles);

export const CoveredMethodsByTestSidebar = coveredMethodsByTestSidebar(
  ({
    className, isOpen, onToggle, testId, topicCoveredMethodsByTest,
  }: Props) => {
    const coveredMethodsByTest = useBuildVersion<MethodCoveredByTest[]>(topicCoveredMethodsByTest) || [];
    const filteredMethods = coveredMethodsByTest.find(({ id }) => id === testId) || {};
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
            <div className="d-flex align-items-center w-100">
              <MethodInfoLabel>Test</MethodInfoLabel>
              <MethodInfoValue title={testName}>{testName}</MethodInfoValue>
            </div>
            <div className="d-flex align-items-center w-100">
              <MethodInfoLabel>Type</MethodInfoLabel>
              <MethodInfoValue>{capitalize(testType.toLowerCase())}</MethodInfoValue>
            </div>
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
