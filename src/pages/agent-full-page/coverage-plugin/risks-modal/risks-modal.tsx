import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import VirtualList from 'react-tiny-virtual-list';
import {
  Panel, Icons, Modal, OverflowText, Inputs,
} from '@drill4j/ui-kit';

import { useElementSize } from 'hooks';
import { Risks } from 'types/risks';

import styles from './risks-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  risks: Risks;
  count: number;
}

const risksModal = BEM(styles);

export const RisksModal = risksModal(
  ({
    className,
    isOpen,
    onToggle,
    risks: { newMethods = [], modifiedMethods = [] },
    count,
  }: Props) => {
    const [selectedSection, setSelectedSection] = React.useState('all');
    const allMethods = newMethods.concat(modifiedMethods);
    const node = React.useRef<HTMLDivElement>(null);
    const { height: methodsListHeight } = useElementSize(node);
    const getMethods = () => {
      switch (selectedSection) {
        case 'new':
          return newMethods;
        case 'modified':
          return modifiedMethods;
        default:
          return allMethods;
      }
    };
    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Header>
            <Icons.Test height={20} width={18} viewBox="0 0 18 20" />
            <span>Risks</span>
            <h2>{count}</h2>
          </Header>
          <NotificationPanel>
            Risks are not covered
            <Bold>New</Bold>
            and
            <Bold>Modified</Bold>
            methods.
          </NotificationPanel>
          <Content>
            <Filter
              items={[
                { value: 'all', label: 'All risks' },
                { value: 'new', label: `Not covered new methods (${newMethods.length})` },
                {
                  value: 'modified',
                  label: `Not covered modified methods (${modifiedMethods.length})`,
                },
              ]}
              onChange={({ value }) => setSelectedSection(value)}
              value={selectedSection}
            />
            <MethodsList>
              <div ref={node} style={{ height: '100%' }}>
                <VirtualList
                  itemSize={60}
                  height={methodsListHeight}
                  itemCount={getMethods().length}
                  renderItem={({ index, style }) => (
                    <MethodsListItem key={index} style={style as any}>
                      <MethodsListItemIcon>
                        <Icons.Function />
                      </MethodsListItemIcon>
                      <MethodInfo>
                        <OverflowText>{getMethods()[index].name}</OverflowText>
                        <MethodsPackage>{getMethods()[index].ownerClass}</MethodsPackage>
                      </MethodInfo>
                    </MethodsListItem>
                  )}
                />
              </div>
            </MethodsList>
          </Content>
        </div>
      </Modal>
    );
  },
);

const Header = risksModal.header('div');
const Content = risksModal.content('div');
const Filter = risksModal.filter(Inputs.Dropdown);
const NotificationPanel = risksModal.notificationPanel(Panel);
const Bold = risksModal.bold('span');
const MethodsList = risksModal.methodsList('div');
const MethodsListItem = risksModal.methodsListItem('div');
const MethodInfo = risksModal.methodsInfo('div');
const MethodsPackage = risksModal.methodsPackage(OverflowText);
const MethodsListItemIcon = risksModal.methodsListItemIcon('div');
