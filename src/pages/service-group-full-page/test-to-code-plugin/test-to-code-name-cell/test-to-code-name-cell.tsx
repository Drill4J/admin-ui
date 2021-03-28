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
  name: string;
  additionalInformation?: string;
  onClick?: () => void;
}

const Content = styled.div`
  ${tw`grid`}
  grid-template-rows: repeat(2, max-content);
`;

const Name = styled.span(({ onClick }: { onClick?: () => void }) => [
  tw`font-light text-24`,
  onClick && tw`font-bold text-14 cursor-pointer`,
]);

export const TestToCodeNameCell = ({ name, additionalInformation, onClick }: Props) => (
  <Content>
    <div tw="text-ellipsis text-blue-default">
      <Name
        tw="w-max link"
        onClick={onClick}
        data-test="test-to-code-name-cell:name-cell"
        title={name}
      >
        {name}
      </Name>
    </div>
    <div
      tw="text-ellipsis max-w-1/2 mt-1 text-12"
      data-test="test-to-code-name-cell:additional-information"
      title={additionalInformation}
    >
      {additionalInformation}
    </div>
  </Content>
);
