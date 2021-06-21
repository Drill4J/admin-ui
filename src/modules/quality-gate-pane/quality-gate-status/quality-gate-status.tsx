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
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Icons } from '@drill4j/ui-kit';
import tw from 'twin.macro';

import { copyToClipboard, percentFormatter } from 'utils';
import { ConditionSettingByType, QualityGate } from 'types/quality-gate-type';
import { useBuildVersion } from 'hooks';
import { Metrics } from 'types/metrics';
import { QualityGateConfigurationUrl } from './quality-gate-configuration-url';
import { getQualityGateConfigurationUrl } from './get-quality-gate-configuration-url';
import { Condition } from './condition';

interface Props {
  conditionSettingByType: ConditionSettingByType;
}

export const QualityGateStatus = ({ conditionSettingByType }: Props) => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 5000);
    copied && timeout;
    return () => clearTimeout(timeout);
  }, [copied]);

  const { pluginId = '', agentId = '' } = useParams<{ pluginId: string; agentId: string; }>();
  const { results = { coverage: false, risks: false, tests: false } } = useBuildVersion<QualityGate>('/data/quality-gate') || {};
  const { coverage = 0, risks: risksCount = 0, tests: testToRunCount = 0 } = useBuildVersion<Metrics>('/data/stats') || {};
  return (
    <>
      <div tw="p-6 space-y-6">
        {conditionSettingByType.coverage?.enabled && (
          <Condition
            passed={Boolean(results.coverage)}
            type="coverage"
            thresholdValue={conditionSettingByType.coverage.condition.value}
          >
            <div tw="block text-monochrome-default text-10 leading-16" data-test="quality-gate-status:condition-status:coverage">
              {results.coverage ? 'Passed' : 'Failed'}. Your coverage is&nbsp;
              <span tw="font-bold" data-test="quality-gate-status:condition-status:coverage">
                {percentFormatter(coverage || 0)}
              </span>
              %
            </div>
          </Condition>
        )}
        {conditionSettingByType.risks?.enabled && (
          <Condition
            passed={Boolean(results.risks)}
            type="risks"
            thresholdValue={conditionSettingByType.risks.condition.value}
          >
            <div tw="block text-monochrome-default text-10 leading-16" data-test="quality-gate-status:condition-status:risks">
              {results.risks ? 'Passed' : 'Failed'}. You have&nbsp;
              <span tw="font-bold" data-test="quality-gate-status:condition-status:risks">{risksCount}</span>
              &nbsp;risks
            </div>
          </Condition>
        )}
        {conditionSettingByType.tests?.enabled && (
          <Condition
            passed={Boolean(results.tests)}
            type="testsToRun"
            thresholdValue={conditionSettingByType.tests.condition.value}
          >
            <div tw="block text-monochrome-default text-10 leading-16" data-test="quality-gate-status:condition-status:tests">
              {results.tests ? 'Passed' : 'Failed'}. You have&nbsp;
              <span tw="font-bold" data-test="quality-gate-status:condition-status:tests">{testToRunCount}</span>
              {results.tests ? ' Tests to run' : ' not executed tests to run'}
            </div>
          </Condition>
        )}
      </div>
      <div
        css={[
          tw`relative flex flex-col gap-y-4 pt-2 pb-2 pr-6 pl-6`,
          tw`text-14 leading-20 bg-monochrome-light-tint break-words text-monochrome-default`,
        ]}
        data-test="quality-gate-status:info-panel"
      >
        <span>
          This is quality gate configuration for this build.
          Use this Curl in your command line to get JSON:
        </span>
        <QualityGateConfigurationUrl agentId={agentId} pluginId={pluginId} />
        <div tw="absolute top-16 right-6 text-blue-default cursor-pointer active:text-blue-shade">
          {copied
            ? (
              <div className="flex items-center gap-x-1 text-10 leading-16 primary-blue-default">
                <span className="monochrome-black">Copied to clipboard.</span>
                <Icons.Check height={10} width={14} viewBox="0 0 14 10" />
              </div>
            )
            : (
              <Icons.Copy
                data-test="quality-gate-status:copy-icon"
                onClick={() => { copyToClipboard(getQualityGateConfigurationUrl(agentId, pluginId)); setCopied(true); }}
              />
            )}
        </div>
      </div>
    </>
  );
};
