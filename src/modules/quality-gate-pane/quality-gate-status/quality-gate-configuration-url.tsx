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
  className?: string;
  agentId: string;
  pluginId: string;
}

const UrlContainer = styled.div`
  min-width: 328px;
  max-width: 328px;
  ${tw`text-blue-default text-12 leading-16 break-all`}

  & > *:not(:first-child) {
    margin-left: 16px;
  }
`;

const CurlFlag = styled.span(({ isRed, invisible }: { isRed?: boolean; invisible?: boolean }) => [
  'min-width: 18px;',
  tw`font-bold text-monochrome-black`,
  isRed && tw`text-red-default`,
  invisible && tw`opacity-0`,
]);

export const QualityGateConfigurationUrl = ({ agentId, pluginId }: Props) => (
  <UrlContainer>
    <div>
      <CurlFlag>
        curl&nbsp;
        <CurlFlag isRed>-</CurlFlag>
        i&nbsp;
        <CurlFlag isRed>-</CurlFlag>
        H&nbsp;
      </CurlFlag>
      &quot;accept: application/json&quot;
      <CurlFlag> \</CurlFlag>
    </div>
    <div>
      <CurlFlag>
        &nbsp;
        <CurlFlag isRed>-</CurlFlag>
        H&nbsp;
      </CurlFlag>
      &quot;content-type: application/json&quot;
      <CurlFlag> \</CurlFlag>
    </div>
    <div className="flex items-start">
      <CurlFlag>
        &nbsp;
        <CurlFlag isRed>
          -<CurlFlag>X</CurlFlag>
        </CurlFlag>
        <CurlFlag invisible>\</CurlFlag>
      </CurlFlag>
      <span data-test="quality-gate-configuration-url">
        <CurlFlag> GET </CurlFlag>
        {`${adminUrl}api/agents/${agentId}/plugins/${pluginId}/data/quality-gate`}
      </span>
    </div>
  </UrlContainer>
);
