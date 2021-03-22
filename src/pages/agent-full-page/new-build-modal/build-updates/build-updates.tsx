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
import { nanoid } from 'nanoid';
import { Icons } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { BuildInfo } from 'types/build-info';

interface Props {
  buildInfo?: BuildInfo;
}

const Content = styled.div`
  ${tw`flex p-4 border border-monochrome-medium-tint`}
  & > :not(:last-child) {
    ${tw`mr-21`}
  }
`;

const IconsWrapper = styled.div(({ type }: {type: string }) => [
  type === 'deleted' && tw`text-red-default`,
  type === 'modified' && tw`text-orange-default`,
  type === 'new' && tw`text-green-default`,
]);

export const BuildUpdates = ({ buildInfo = {} }: Props) => (
  <div tw="w-full h-full">
    <div tw="font-bold mb-6 text-14 leading-20">Build updates</div>
    <Content>
      {Object.keys(buildInfo).map((methodType) => (
        <div key={nanoid()}>
          <div className="flex items-center w-full">
            <IconsWrapper type={methodType}>{getMethodsIcon(methodType)}</IconsWrapper>
            <span tw="ml-2 text-12 leading-24 text-monochrome-default uppercase">{methodType}</span>
          </div>
          <div tw="mt-4 font-light text-36 leading-32 text-monochrome-black">{buildInfo[methodType]}</div>
        </div>
      ))}
    </Content>
  </div>
);

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
