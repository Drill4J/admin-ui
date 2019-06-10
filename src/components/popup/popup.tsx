import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from '../../layouts';
import { Portal } from '../portal';
import { Icons } from '../icon';

import styles from './popup.module.scss';

interface Props {
  className?: string;
  children: React.ReactChild;
  header: React.ReactNode;
  onToggle: (isOpen: boolean) => void;
  isOpen: boolean;
  type?: 'info' | 'error';
}

const popup = BEM(styles);

export const Popup = popup(
  ({ className, header, children, onToggle, isOpen, type = 'info' }: Props) => (
    <div className={className}>
      <Portal>
        {isOpen && (
          <div className={className}>
            <Content type={type}>
              <Header align="space-between">
                {header}
                <CloseButton onClick={() => onToggle(!isOpen)} />
              </Header>
              {children}
            </Content>
            <Fade onClick={() => onToggle(!isOpen)} />
          </div>
        )}
      </Portal>
    </div>
  ),
);

const Content = popup.content('div');
const Header = popup.header(Panel);
const CloseButton = popup.closeButton(Icons.Close);
const Fade = popup.fade('div');
