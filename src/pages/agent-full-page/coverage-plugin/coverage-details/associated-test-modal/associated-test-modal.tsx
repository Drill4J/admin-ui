import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Modal, Icons, ItemsActions } from '../../../../../components';
import { useWsConnection } from '../../../../../hooks';
import { defaultPluginSocket } from '../../../../../common/connection';
import { AssociatedTests } from '../../../../../types/associated-tests';

import styles from './associated-test-modal.module.scss';

interface Props {
  className?: string;
  id?: string;
  isOpen: boolean;
  onToggle: (arg: boolean) => void;
  agentId?: string;
  buildVersion?: string;
}

const associatedTestModal = BEM(styles);

export const AssociatedTestModal = associatedTestModal(
  ({ className, isOpen, onToggle, id, agentId, buildVersion }: Props) => {
    const associatedTests =
      useWsConnection<AssociatedTests[]>(defaultPluginSocket, '/associated-tests', {
        agentId,
        buildVersion,
      }) || [];

    const filtredAssosiatedTests = associatedTests.filter((test) => test.id === id);

    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Header>
            <Icons.Test height={20} width={18} viewBox="0 0 18 20" />
            <span>Associated tests</span>
            <h2>{filtredAssosiatedTests.length}</h2>
          </Header>
          <Content>
            <TestList>
              {filtredAssosiatedTests.map((test) => (
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
