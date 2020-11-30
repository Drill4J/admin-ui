import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import VirtualList from 'react-tiny-virtual-list';
import {
  Panel, Icons, Modal, OverflowText, Inputs,
} from '@drill4j/ui-kit';

import { useElementSize, useBuildVersion } from 'hooks';
import { Risks } from 'types/risks';

import styles from './risks-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  filter?: string;
}

const risksModal = BEM(styles);

export const RisksModal = risksModal(
  ({
    className,
    isOpen,
    onToggle,
    filter = 'all',
  }: Props) => {
    const risks = useBuildVersion<Risks[]>('/build/risks') || [];
    const [selectedSection, setSelectedSection] = React.useState<string>(filter);
    const node = React.useRef<HTMLDivElement>(null);
    const { height: methodsListHeight } = useElementSize(node);
    const newRisks = risks.filter(({ type }) => type === 'NEW');
    const modifiedRisks = risks.filter(({ type }) => type === 'MODIFIED');
    const getRisks = () => {
      switch (selectedSection) {
        case 'new':
          return newRisks;
        case 'modified':
          return modifiedRisks;
        default:
          return risks;
      }
    };

    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Header>
            <Icons.Test height={20} width={18} viewBox="0 0 18 20" />
            <span>Risks</span>
            <h2>{risks.length}</h2>
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
                { value: 'new', label: `Not covered new methods (${newRisks.length})` },
                {
                  value: 'modified',
                  label: `Not covered modified methods (${modifiedRisks.length})`,
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
                  itemCount={getRisks().length}
                  renderItem={({ index, style }) => (
                    <MethodsListItem key={index} style={style as Record<symbol, string>}>
                      <MethodsListItemIcon>
                        <Icons.Function />
                      </MethodsListItemIcon>
                      <MethodInfo>
                        <OverflowText>{getRisks()[index]?.name}</OverflowText>
                        <MethodsPackage>{getRisks()[index]?.ownerClass}</MethodsPackage>
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
