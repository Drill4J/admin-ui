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
import { Link } from 'react-router-dom';
import { Icons, Tooltip } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

interface Props {
  value: number;
  link: string;
  testContext?: string;
}

const Value = styled(Link)(({ clickable }: {clickable: boolean}) => [
  tw`inline-flex items-center text-20 text-monochrome-black`,
  clickable && tw`cursor-pointer hover:text-blue-default active:text-blue-shade`,
]);

export const TestToCodeCell = ({
  value, link, testContext,
}: Props) => (
  <div>
    <div tw="pl-4">
      <Value to={link} clickable={Boolean(link)} data-test={`dashboard-cell:value:${testContext}`}>
        {value === undefined ? (
          <Tooltip message={(
            <div className="flex flex-col items-center w-full">
              <div>Test2Code plugin</div>
              <div>is not installed</div>
            </div>
          )}
          >
            n/a
          </Tooltip>
        ) : value}
        {Boolean(link) && <Icons.Expander tw="ml-1 text-blue-default" height={8} />}
      </Value>
    </div>
  </div>
);
