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
import { adminUrl } from './admin-url';

interface Props {
  agentId: string;
  pluginId: string;
  agentType?: string;
}

const UrlContainer = styled.div`
  width: 390px;
  ${tw`text-blue-default break-all`}

  & > *:not(:first-child) {
    margin-left: 16px;
  }
`;

const CurlFlag = styled.span(({ isRed, invisible }: { isRed?: boolean; invisible?: boolean}) => [
  'min-width: 18px;',
  tw`font-bold text-monochrome-black`,
  isRed && tw`text-red-default`,
  invisible && tw`opacity-0`,
]);

export const TestsToRunUrl = ({ agentId, pluginId, agentType }: Props) => (
  <UrlContainer
    className={`${agentType === 'ServiceGroup' ? 'text-12' : 'text-14'}`}
    style={{ width: agentType === 'ServiceGroup' ? '300px' : undefined }}
  >
    <div>
      <CurlFlag>curl <CurlFlag isRed>-</CurlFlag>i <CurlFlag isRed>-</CurlFlag>H </CurlFlag>
      &quot;accept: application/json&quot;<CurlFlag> \</CurlFlag>
    </div>
    <div>
      <CurlFlag> <CurlFlag isRed>-</CurlFlag>H </CurlFlag>
      &quot;content-type: application/json&quot;<CurlFlag> \</CurlFlag>
    </div>
    <div className="flex items-start">
      <CurlFlag> <CurlFlag isRed>-</CurlFlag>X <CurlFlag invisible>\</CurlFlag></CurlFlag>
      <span>
        <CurlFlag> GET </CurlFlag>{`${adminUrl}api/${agentType === 'ServiceGroup'
          ? 'groups' : 'agents'}/${agentId}/plugins/${pluginId}/data/tests-to-run`}
      </span>
    </div>
  </UrlContainer>
);
