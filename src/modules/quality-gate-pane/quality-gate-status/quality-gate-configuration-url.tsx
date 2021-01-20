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
import { Panel } from '@drill4j/ui-kit';

import { adminUrl } from './admin-url';

import styles from './quality-gate-configuration-url.module.scss';

interface Props {
  className?: string;
  agentId: string;
  pluginId: string;
}

const qualityGateConfigurationUrl = BEM(styles);

export const QualityGateConfigurationUrl = qualityGateConfigurationUrl(
  ({
    className, agentId, pluginId,
  }: Props) => (
    <span className={className}>
      <div>
        <CurlFlag>
          curl&nbsp;
          <CurlFlag color="red">-</CurlFlag>
          i&nbsp;
          <CurlFlag color="red">-</CurlFlag>
          H&nbsp;
        </CurlFlag>
        &quot;accept: application/json&quot;
        <CurlFlag> \</CurlFlag>
      </div>
      <div>
        <CurlFlag>
          &nbsp;
          <CurlFlag color="red">-</CurlFlag>
          H&nbsp;
        </CurlFlag>
        &quot;content-type: application/json&quot;
        <CurlFlag> \</CurlFlag>
      </div>
      <Panel verticalAlign="start">
        <CurlFlag>
          &nbsp;
          <CurlFlag color="red">
            -
            <CurlFlag>X</CurlFlag>
          </CurlFlag>
          <CurlFlag invisible>\</CurlFlag>
        </CurlFlag>
        <span data-test="quality-gate-configuration-url">
          <CurlFlag> GET </CurlFlag>
          {`${adminUrl}api/agents/${agentId}/plugins/${pluginId}/data/quality-gate`}
        </span>
      </Panel>
    </span>
  ),
);

const CurlFlag = qualityGateConfigurationUrl.curlFlag(span({} as {invisible?: boolean; color?: 'red'}));
