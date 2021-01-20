/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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

const isNumber = (value: string | number) => !Number.isNaN(parseFloat(String(value)));

export const SingleBar = singleBar(({
  className, width, height, color, percent, icon,
}: Props) => {
  const y = !isNumber(percent) ? height : height - (height * percent) / 100;

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
