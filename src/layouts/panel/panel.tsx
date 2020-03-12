import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import styles from './panel.module.scss';

interface Attrs {
  className?: string;
  align?: 'space-between' | 'end' | 'center';
  verticalAlign?: 'center' | 'stretch' | 'start' | 'end';
  direction?: 'row' | 'row-reverse' |'column';
  'data-test'?: string;
}

const panel = BEM(styles);

export const Panel = panel(div({ 'data-test': '', style: undefined, onClick: () => {} } as Attrs));
export const PanelItem = panel.item(
  div({ onClick: () => {} } as {
    className?: string;
    children?: React.ReactNode;
    onClick: () => void;
  }),
);
export const PanelSpread = panel.spread(
  div({} as { className?: string; children?: React.ReactNode }),
);
