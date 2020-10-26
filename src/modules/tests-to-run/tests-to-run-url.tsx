import * as React from 'react';
import { BEM, span } from '@redneckz/react-bem-helper';
import { Panel } from '@drill4j/ui-kit';

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
    <span className={className}>
      <div>
        <CurlFlag>curl <CurlFlag color="red">-</CurlFlag>i <CurlFlag color="red">-</CurlFlag>H </CurlFlag>
        &quot;accept: application/json&quot;<CurlFlag> \</CurlFlag>
      </div>
      <div>
        <CurlFlag> <CurlFlag color="red">-</CurlFlag>H </CurlFlag>
        &quot;content-type: application/json&quot;<CurlFlag> \</CurlFlag>
      </div>
      <Panel verticalAlign="start">
        <CurlFlag> <CurlFlag color="red">-</CurlFlag>X <CurlFlag invisible>\</CurlFlag></CurlFlag>
        <span>
          <CurlFlag> GET </CurlFlag>{`${adminUrl}api/${agentType === 'ServiceGroup'
            ? 'service-groups' : 'agents'}/${agentId}/plugins/${pluginId}/data/tests-to-run`}
        </span>
      </Panel>
    </span>
  ),
);

const CurlFlag = testsToRunUrl.curlFlag(span({} as {invisible?: boolean; color?: 'red'}));
