import * as React from 'react';
import { BEM, tag } from '@redneckz/react-bem-helper';

import styles from './single-bar.module.scss';

interface Props {
  className?: string;
  width: number;
  height: number;
  color: string;
  percent: number;
  icon?: React.ReactNode;
}

const singleBar = BEM(styles);

export const SingleBar = singleBar(({ className, width, height, color, percent, icon }: Props) => {
  const y = isNaN(percent) ? height : height - (height * percent) / 100;

  return (
    <div className={className}>
      <Content style={{ width: `${width}px`, height: `${height}px` }}>
        <Icon>{icon}</Icon>
        <svg width={`${width}px`} height={`${height}px`}>
          <Path d={`M 0 ${height} L 0 ${y} L ${width} ${y} l ${width} ${height} Z`} fill={color} />
        </svg>
      </Content>
    </div>
  );
});

const Path = singleBar.path(tag('path')({ d: '', fill: '' } as { d: string; fill: string }));
const Content = singleBar.content('div');
const Icon = singleBar.icon('div');
