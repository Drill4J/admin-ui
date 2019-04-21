import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Modal, Icons } from '../../../../../components';
import { useWsConnection } from '../../../../../hooks';
import { defaultPluginSocket } from '../../../../../common/connection';
import { AssociatedTests } from '../../../../../types/associated-tests';

import styles from './associated-test-modal.module.scss';

interface Props {
  className?: string;
  id?: string;
  isOpen: boolean;
  onToggle: (arg: boolean) => void;
}

const associatedTestModal = BEM(styles);

export const AssociatedTestModal = associatedTestModal(
  ({ className, isOpen, onToggle, id }: Props) => {
    const { tests = [] } =
      useWsConnection<AssociatedTests>(defaultPluginSocket, '/associated-tests', {
        id,
      }) || {};

    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Header>
            <Icons.Test height={20} width={18} viewBox="0 0 18 20" />
            <span>Associated tests</span>
            <h2>{tests.length}</h2>
          </Header>
          <Content>
            <TestList>
              {tests.map((test) => (
                <TestListItem>
                  <Icons.Test />
                  {test}
                </TestListItem>
              ))}
            </TestList>
          </Content>
        </div>
      </Modal>
    );
  },
);

const Header = associatedTestModal.header('div');
const Content = associatedTestModal.content('div');
const TestList = associatedTestModal.testList('div');
const TestListItem = associatedTestModal.testListItem('div');
