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
import { BEM } from '@redneckz/react-bem-helper';
import { nanoid } from 'nanoid';
import { Icons } from '@drill4j/ui-kit';

import { BuildInfo } from 'types/build-info';

import styles from './build-updates.module.scss';

interface Props {
  className?: string;
  buildInfo?: BuildInfo;
}

const buildUpdates = BEM(styles);

export const BuildUpdates = buildUpdates(({ className, buildInfo = {} }: Props) => (
  <div className={className}>
    <Title>Build updates</Title>
    <Content>
      {Object.keys(buildInfo).map((methodType) => (
        <div key={nanoid()}>
          <div className="d-flex items-center w-full">
            <IconsWrapper type={methodType}>{getMethodsIcon(methodType)}</IconsWrapper>
            <MethodsType>{methodType}</MethodsType>
          </div>
          <MethodsCount>{buildInfo[methodType]}</MethodsCount>
        </div>
      ))}
    </Content>
  </div>
));

const Title = buildUpdates.title('div');
const Content = buildUpdates.content('div');
const IconsWrapper = buildUpdates.iconsWrapper('div');
const MethodsType = buildUpdates.methodsType('span');
const MethodsCount = buildUpdates.methodsCount('div');

function getMethodsIcon(methodType?: string) {
  switch (methodType) {
    case 'new':
      return <Icons.Add height={16} width={16} />;
    case 'modified':
      return <Icons.Edit height={15} width={16} viewBox="0 0 15 16" />;
    default:
      return <Icons.Delete height={16} width={16} />;
  }
}
