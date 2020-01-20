import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import styles from './tooltip.module.scss';

export interface Props {
  className?: string;
  position?: 'top' | 'left' | 'right' | 'bottom';
  message: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
}

export interface TooltipStyle {
  [key: string]: string;
}
const tooltip = BEM(styles);

export const Tooltip = tooltip(({
  className, position = 'top', message, children,
}: Props) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const toggle = () => setIsVisible(!isVisible);
  const node = React.useRef<HTMLDivElement>(null);

  const style: TooltipStyle = {};
  if (node.current && node.current.offsetWidth) {
    if (position === 'top' || position === 'bottom') {
      style.left = `${String(node.current.offsetWidth / 2)}px`;
    } else {
      style.top = `${String(node.current.offsetHeight / 2)}px`;
    }
  }

  return (
    <div className={className}>
      <div onMouseOverCapture={toggle} onMouseOut={toggle} onBlur={toggle} ref={node}>
        {children}
      </div>
      {isVisible && message && (
        <Message style={style} position={position}>
          {message}
        </Message>
      )}
    </div>
  );
});

const Message = tooltip.message(div({ style: {} } as { position: string; style: TooltipStyle }));
