import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from '../icon';
import { Portal } from './portal';

import styles from './modal.module.scss';

interface Props {
  className?: string;
  children: React.ReactChild;
  onToggle: (isOpen: boolean) => void;
  isOpen: boolean;
}

const modal = BEM(styles);

export const Modal = modal(({ className, children, onToggle, isOpen }: Props) => {
  return (
    <Portal>
      {isOpen && (
        <div className={className}>
          <ModalCard>
            <CloseButton onClick={() => onToggle(!isOpen)}>
              <Icons.Close />
            </CloseButton>
            {children}
          </ModalCard>
          <Fade onClick={() => onToggle(!isOpen)} />
        </div>
      )}
    </Portal>
  );
});

const ModalCard = modal.modalCard('div');
const CloseButton = modal.closeButton('div');
const Fade = modal.fade('div');
