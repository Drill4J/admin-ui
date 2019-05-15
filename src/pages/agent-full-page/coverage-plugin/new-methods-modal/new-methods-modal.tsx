import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Modal, Icons, OverflowText } from '../../../../components';
import { useBuildVersion } from '../use-build-version';
import { NewMethod } from '../../../../types/new-method';

import styles from './new-methods-modal.module.scss';

interface Props {
  className?: string;
  agentId: string;
  buildVersion: string;
  isOpen: boolean;
  onToggle: (arg: boolean) => void;
}

const newMethodsModal = BEM(styles);

export const NewMethodsModal = newMethodsModal(
  ({ className, buildVersion, agentId, isOpen, onToggle }: Props) => {
    const methods = useBuildVersion<NewMethod[]>('/new-methods', agentId, buildVersion) || [];
    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Header>
            <Icons.Function height={18} width={18} />
            <span>New methods</span>
            <h2>{methods.length}</h2>
          </Header>
          <Content>
            <MethodsList>
              {methods.map(({ name, desc, coverage = 0 }, index) => (
                <MethodsListItem key={index}>
                  <MethodsListIcon>
                    <Icons.Function />
                  </MethodsListIcon>
                  <MethodSignature>
                    <OverflowText>{name}</OverflowText>
                    <MethodDescriptor>{desc}</MethodDescriptor>
                  </MethodSignature>
                  {getCoverageIcon(coverage)}
                </MethodsListItem>
              ))}
            </MethodsList>
          </Content>
        </div>
      </Modal>
    );
  },
);

const Header = newMethodsModal.header('div');
const Content = newMethodsModal.content('div');
const MethodsList = newMethodsModal.methodsList('div');
const MethodsListItem = newMethodsModal.methodsListItem('div');
const MethodsListIcon = newMethodsModal.methodsListItemIcon('div');
const MethodSignature = newMethodsModal.methodSignature('div');
const MethodDescriptor = newMethodsModal.methodDescriptor(OverflowText);
const CoverageIconWrapper = newMethodsModal.coverageIconWrapper('div');

function getCoverageIcon(coverage: number) {
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
