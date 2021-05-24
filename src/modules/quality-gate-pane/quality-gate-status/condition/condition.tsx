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
import { Icons } from '@drill4j/ui-kit';
import 'twin.macro';

import { percentFormatter } from 'utils';

interface Props {
  passed: boolean;
  type: 'coverage' | 'risks' | 'testsToRun';
  children: React.ReactNode;
  thresholdValue: string;
}

export const Condition = ({ passed, type, children, thresholdValue }: Props) => {
  const title = {
    coverage: 'Build coverage',
    risks: 'Risks',
    testsToRun: 'Suggested “Tests to run” executed',
  };
  return (
    <div tw="flex items-center">
      {passed ? (
        <Icons.Checkbox width={16} height={16} tw="text-green-default" />
      ) : (
        <Icons.Warning width={16} height={16} tw="text-red-default" />
      )}
      <div tw="flex flex-col flex-1 mr-4 ml-4 text-14 leading-16">
        {title[type]}
        {children}
      </div>
      <span tw="font-bold" data-test={`quality-gate-status:condition:${type}`}>
        {type === 'coverage' ? `${percentFormatter(Number(thresholdValue))}%` : thresholdValue}
      </span>
    </div>
  );
};
