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
import { BEM, span } from '@redneckz/react-bem-helper';

import { adminUrl } from './admin-url';

import styles from './tests-to-run-url.module.scss';

interface Props {
  className?: string;
  agentId: string;
  pluginId: string;
  agentType?: string;
}

const testsToRunUrl = BEM(styles);

export const TestsToRunUrl = testsToRunUrl(
  ({
    className, agentId, pluginId, agentType,
  }: Props) => (
    <span
      className={`${className} ${agentType === 'ServiceGroup' ? 'text-12' : 'text-14'}`}
      style={{ width: agentType === 'ServiceGroup' ? '300px' : undefined }}
    >
      <div>
        <CurlFlag>curl <CurlFlag color="red">-</CurlFlag>i <CurlFlag color="red">-</CurlFlag>H </CurlFlag>
        &quot;accept: application/json&quot;<CurlFlag> \</CurlFlag>
      </div>
      <div>
        <CurlFlag> <CurlFlag color="red">-</CurlFlag>H </CurlFlag>
        &quot;content-type: application/json&quot;<CurlFlag> \</CurlFlag>
      </div>
      <div className="flex items-start">
        <CurlFlag> <CurlFlag color="red">-</CurlFlag>X <CurlFlag invisible>\</CurlFlag></CurlFlag>
        <span>
          <CurlFlag> GET </CurlFlag>{`${adminUrl}api/${agentType === 'ServiceGroup'
            ? 'groups' : 'agents'}/${agentId}/plugins/${pluginId}/data/tests-to-run`}
        </span>
      </div>
    </span>
  ),
);

const CurlFlag = testsToRunUrl.curlFlag(span({} as {invisible?: boolean; color?: 'red'}));
