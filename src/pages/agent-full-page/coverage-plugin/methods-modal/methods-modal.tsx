import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import VirtualList from 'react-tiny-virtual-list';

import { Modal, Icons, OverflowText } from '../../../../components';
import { MethodsDetails } from '../../../../types/methods-details';

import styles from './methods-modal.module.scss';

interface Props {
  className?: string;
  title: string;
  isOpen: boolean;
  onToggle: (arg: boolean) => void;
  methodsDetails?: MethodsDetails[];
}

const methodsModal = BEM(styles);

export const MethodsModal = methodsModal(
  ({ className, isOpen, onToggle, title, methodsDetails = [] }: Props) => {
    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Header>
            <Icons.Function height={18} width={18} />
            <span>{title}</span>
            <h2>{methodsDetails.length}</h2>
          </Header>
          <Content>
            <MethodsList>
              <VirtualList
                itemSize={60}
                height={840}
                itemCount={methodsDetails.length}
                renderItem={({ index, style }) => (
                  <MethodsListItem key={index} style={style as any}>
                    <MethodsListIcon>
                      <Icons.Function />
                    </MethodsListIcon>
                    <MethodSignature>
                      <OverflowText>{methodsDetails[index].name}</OverflowText>
                      <MethodDescriptor>{methodsDetails[index].desc}</MethodDescriptor>
                    </MethodSignature>
                    {getCoverageIcon(methodsDetails[index].coverage)}
                  </MethodsListItem>
                )}
              />
            </MethodsList>
          </Content>
        </div>
      </Modal>
    );
  },
);

const Header = methodsModal.header('div');
const Content = methodsModal.content('div');
const MethodsList = methodsModal.methodsList('div');
const MethodsListItem = methodsModal.methodsListItem('div');
const MethodsListIcon = methodsModal.methodsListItemIcon('div');
const MethodSignature = methodsModal.methodSignature('div');
const MethodDescriptor = methodsModal.methodDescriptor(OverflowText);
const CoverageIconWrapper = methodsModal.coverageIconWrapper('div');

function getCoverageIcon(coverage?: number) {
  if (!coverage) {
    return (
      <CoverageIconWrapper type="error">
        <Icons.Warning height={16} width={16} />
      </CoverageIconWrapper>
    );
  }
  if (coverage === 100) {
    return (
      <CoverageIconWrapper type="success">
        <Icons.Checkbox height={16} width={16} />
      </CoverageIconWrapper>
    );
  }

  return (
    <CoverageIconWrapper type="warning">
      <Icons.Warning height={16} width={16} />
    </CoverageIconWrapper>
  );
}
