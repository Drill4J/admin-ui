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
import tw, { styled } from 'twin.macro';

interface Props {
  active: boolean;
}

export const MonitoringIndicator = ({ active }: Props) => (
  <Content active={active} tw="flex items-center gap-x-1 text-12 leading-16 font-bold">
    <Circle active={active} />
    Monitoring
  </Content>
);

const Content = styled.span`
  ${tw`flex items-center gap-x-1 text-12 leading-16 font-bold`}
  ${({ active }: { active: boolean }) => active && tw`font-regular text-monochrome-black`}
`;

const Circle = styled.div`
  ${tw`w-2.5 h-2.5 rounded-full bg-monochrome-medium-tint`}
  ${({ active }: { active: boolean }) => active && tw`bg-red-default animate-blinker`}
`;
