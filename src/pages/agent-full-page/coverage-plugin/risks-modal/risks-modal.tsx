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
import { useRef, useState } from 'react';
import VirtualList from 'react-tiny-virtual-list';
import {
  Icons, Modal, OverflowText, Inputs,
} from '@drill4j/ui-kit';

import { useElementSize, useBuildVersion } from 'hooks';
import { Risks } from 'types/risks';

import styles from './risks-modal.module.scss';

interface Props {
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  filter?: string;
}

const risksModal = BEM(styles);

export const RisksModal = ({ isOpen, onToggle, filter = 'all' }: Props) => {
  const risks = useBuildVersion<Risks[]>('/build/risks') || [];
  const [selectedSection, setSelectedSection] = useState<string>(filter);
  const node = useRef<HTMLDivElement>(null);
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
      <div className="d-flex flex-column h-100">
        <Header>
          <Icons.Test height={20} width={18} viewBox="0 0 18 20" />
          <span>Risks</span>
          <h2>{risks.length}</h2>
        </Header>
        <NotificationPanel className="d-flex align-items-center">
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
                      <OverflowText title={getRisks()[index]?.name}>{getRisks()[index]?.name}</OverflowText>
                      <MethodsPackage title={getRisks()[index]?.ownerClass}>{getRisks()[index]?.ownerClass}</MethodsPackage>
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
};

const Header = risksModal.header('div');
const Content = risksModal.content('div');
const Filter = risksModal.filter(Inputs.Dropdown);
const NotificationPanel = risksModal.notificationPanel('div');
const Bold = risksModal.bold('span');
const MethodsList = risksModal.methodsList('div');
const MethodsListItem = risksModal.methodsListItem('div');
const MethodInfo = risksModal.methodsInfo('div');
const MethodsPackage = risksModal.methodsPackage(OverflowText);
const MethodsListItemIcon = risksModal.methodsListItemIcon('div');
