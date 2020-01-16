import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { Panel } from 'layouts';
import { Icons } from 'components';
import { useClickOutside } from 'hooks';
import { Portal } from '../portal';

import styles from './popup.module.scss';

interface Props {
  className?: string;
  children: React.ReactChild;
  header: React.ReactNode;
  onToggle: (isOpen: boolean) => void;
  isOpen: boolean;
  type?: 'info' | 'error';
  closeOnFadeClick?: boolean;
}

const popup = BEM(styles);

export const Popup = popup(
  ({
    className,
    header,
    children,
    onToggle,
    isOpen,
    type = 'info',
    closeOnFadeClick = false,
  }: Props) => {
    const node = useClickOutside(() => closeOnFadeClick && onToggle(!isOpen));

    return (
      <div className={className}>
        <Portal>
          {isOpen && (
            <div className={className}>
              <Content type={type}>
                <div ref={node}>
                  <Header align="space-between">
                    {header}
                    <CloseButton onClick={() => onToggle(!isOpen)} />
                  </Header>
                  {children}
                </div>
              </Content>
              <Fade />
            </div>
          )}
        </Portal>
      </div>
    );
  },
);

const Content = popup.content(div({ type: '' } as { type: string }));
const Header = popup.header(Panel);
const CloseButton = popup.closeButton(Icons.Close);
const Fade = popup.fade('div');
