import { BEM } from '@redneckz/react-bem-helper';
import { Modal } from '@drill4j/ui-kit';

import { AssociatedTests } from 'types/associated-tests';
import { useBuildVersion } from 'hooks';
import { ItemInfo } from './item-info';
import { TestsList } from './tests-list';

import styles from './associated-test-modal.module.scss';

interface Props {
  className?: string;
  id?: string;
  isOpen: boolean;
  onToggle: (arg: boolean) => void;
  associatedTestsTopic: string;
}

const associatedTestModal = BEM(styles);

export const AssociatedTestModal = associatedTestModal(
  ({
    className, isOpen, onToggle, id, associatedTestsTopic,
  }: Props) => {
    const associatedTests = useBuildVersion<AssociatedTests[]>(associatedTestsTopic) || [];
    const {
      tests = [], packageName = '', className: testClassName = '', methodName = '',
    } = associatedTests.find((test) => test.id === id) || {};
    const testsMap = tests.reduce((acc, { type = '', name = '' }) =>
      ({ ...acc, [type]: acc[type] ? [...acc[type], name] : [name] }), {} as { [testType: string]: string[] });

    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Header>
            <ModalName>Associated tests</ModalName>
            <TestsCount>{tests.length}</TestsCount>
          </Header>
          <ItemInfo
            packageName={packageName}
            testClassName={testClassName}
            methodName={methodName}
          />
          <TestsList associatedTests={testsMap} />
        </div>
      </Modal>
    );
  },
);

const Header = associatedTestModal.header('div');
const ModalName = associatedTestModal.modalName('span');
const TestsCount = associatedTestModal.testsCount('div');
