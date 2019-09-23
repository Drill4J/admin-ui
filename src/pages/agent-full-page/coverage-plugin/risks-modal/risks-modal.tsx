import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons, Modal, TabsPanel, Tab, OverflowText } from '../../../../components';
import { Risks } from '../../../../types/risks';

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
    const [selectedSection, setSelectedSection] = React.useState('new');

    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Header>
            <Icons.Test height={20} width={18} viewBox="0 0 18 20" />
            <span>Risks</span>
            <h2>{count}</h2>
          </Header>
          <Content>
            <Tabs activeTab={selectedSection} onSelect={setSelectedSection}>
              <Tab name="new">New methods</Tab>
              <Tab name="modified">Modified methods</Tab>
            </Tabs>
            {selectedSection === 'new' ? (
              <MethodsList>
                {newMethods.map((method) => (
                  <MethodsListItem>
                    <MethodsListItemIcon>
                      <Icons.Function />
                    </MethodsListItemIcon>
                    <MethodInfo>
                      {method.name}
                      <MethodsPackage>{method.ownerClass}</MethodsPackage>
                    </MethodInfo>
                  </MethodsListItem>
                ))}
              </MethodsList>
            ) : (
              <MethodsList>
                {modifiedMethods.map((method) => (
                  <MethodsListItem>
                    <MethodsListItemIcon>
                      <Icons.Function />
                    </MethodsListItemIcon>
                    <MethodInfo>
                      {method.name}
                      <MethodsPackage>{method.ownerClass}</MethodsPackage>
                    </MethodInfo>
                  </MethodsListItem>
                ))}
              </MethodsList>
            )}
          </Content>
        </div>
      </Modal>
    );
  },
);

const Header = risksModal.header('div');
const Content = risksModal.content('div');
const Tabs = risksModal.tabsPanel(TabsPanel);
const MethodsList = risksModal.methodsList('div');
const MethodsListItem = risksModal.methodsListItem('div');
const MethodInfo = risksModal.methodsInfo('div');
const MethodsPackage = risksModal.methodsPackage(OverflowText);
const MethodsListItemIcon = risksModal.methodsListItemIcon('div');
