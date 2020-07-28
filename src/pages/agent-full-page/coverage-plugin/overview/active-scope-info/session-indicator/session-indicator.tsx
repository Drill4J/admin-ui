import * as React from 'react';
import { BEM, tag } from '@redneckz/react-bem-helper';

import { path as circlePath } from './circle.path';
import { path as eyePath } from './eye.path';

import styles from './session-indicator.module.scss';

interface Props {
  className?: string;
  active?: boolean;
}

const sessionIndicator = BEM(styles);

export const SessionIndicator = sessionIndicator(({
  className,
  active,
}: Props) => (
  <svg className={className} viewBox="0 0 32 32">
    <g fillRule="nonzero" stroke="none" strokeWidth="1" fill="none">
      <CirclePath d={circlePath} />
      {active
        ? <EyePath d={eyePath} active />
        : <EyePath d={eyePath} />}
    </g>
  </svg>
));

const CirclePath = sessionIndicator.circlePath(tag('path')({ d: '' } as { d: string }));
const EyePath = sessionIndicator.eyePath(tag('path')({ d: '' } as { d: string; active?: boolean }));
