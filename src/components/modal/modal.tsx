import * as React from 'react';
import { createPortal } from 'react-dom';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from '../icon';

import styles from './modal.module.scss';

interface Props {
  className?: string;
  children: React.ReactChild;
  onToggle: (isOpen: any) => any;
  isOpen: boolean;
}

const modal = BEM(styles);

class Portal extends React.Component {
  public el: any;
  public modalRoot: any;
  constructor(props: any) {
    super(props);
    this.el = document.createElement('div');
    this.modalRoot = document.getElementById('modal');
  }

  public componentDidMount() {
    this.modalRoot.appendChild(this.el);
  }

  public componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }

  public render() {
    return createPortal(this.props.children, this.el);
  }
}

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
