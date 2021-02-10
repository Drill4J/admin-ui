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
import { BEM } from '@redneckz/react-bem-helper';
import { Modal } from '@drill4j/ui-kit';

import { AssociatedTests } from 'types/associated-tests';
import { useBuildVersion } from 'hooks';
import { ItemInfo } from './item-info';
import { TestsList } from './tests-list';

import styles from './associated-test-modal.module.scss';

interface Props {
  className?: string;
  selectedAssocTests: { id: string; assocTestsCount: number; treeLevel: number };
  isOpen: boolean;
  onToggle: (arg: boolean) => void;
  associatedTestsTopic: string;
}

const associatedTestModal = BEM(styles);

export const AssociatedTestModal = associatedTestModal(
  ({
    className, isOpen, onToggle, selectedAssocTests, associatedTestsTopic,
  }: Props) => {
    const associatedTests = useBuildVersion<AssociatedTests[]>(associatedTestsTopic) || [];
    const {
      tests = [], packageName = '', className: testClassName = '', methodName = '',
    } = associatedTests.find((test) => test.id === selectedAssocTests.id) || {};
    const testsMap = tests.reduce((acc, { type = '', name = '' }) =>
      ({ ...acc, [type]: acc[type] ? [...acc[type], name] : [name] }), {} as { [testType: string]: string[] });

    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Header>
            <ModalName>Associated tests</ModalName>
            <TestsCount>{selectedAssocTests.assocTestsCount}</TestsCount>
          </Header>
          <ItemInfo
            packageName={packageName}
            testClassName={testClassName}
            methodName={methodName}
            treeLevel={selectedAssocTests.treeLevel}
          />
          <TestsList associatedTests={{ testsMap, assocTestsCount: selectedAssocTests.assocTestsCount }} />
        </div>
      </Modal>
    );
  },
);

const Header = associatedTestModal.header('div');
const ModalName = associatedTestModal.modalName('span');
const TestsCount = associatedTestModal.testsCount('div');
