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
import { Tooltip } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

interface Props {
  percentage?: number;
  previousBuildAutoTestsCount: number;
  message: React.ReactNode;
  children: React.ReactNode;
  label: React.ReactNode;
}

const Percentage = styled.span`
  ${tw`font-bold`};

  &::before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 16px;
    margin: auto 8px auto 0;
    ${tw`bg-monochrome-black`};
  }
`;

export const SavedTimeSection = ({
  label,
  percentage,
  message,
  children,
  previousBuildAutoTestsCount,
}: Props) => (
  <div tw="border-l border-monochrome-medium-tint text-monochrome-default">
    <div tw="ml-4" data-test={`information-section:${label}`}>
      <Tooltip
        message={message && <div className="flex items-center w-full text-center">{message}</div>}
      >
        <div tw="text-12 leading-16 font-bold uppercase">{label}</div>
        <div tw="flex items-center gap-2 mt-2 w-full text-20 leading-20 text-monochrome-black">
          <span tw="font-regular">{previousBuildAutoTestsCount ? children : 'n/a'}</span>
          {typeof percentage === 'number' && <Percentage>{percentage}%</Percentage>}
        </div>
      </Tooltip>
    </div>
  </div>
);
