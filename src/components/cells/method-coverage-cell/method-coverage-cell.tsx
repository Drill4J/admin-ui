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
  value?: number;
  testContext?: string;
}

export const MethodCoverageCell = ({ value = 0, testContext }: Props) => (
  <div tw="inline-flex items-center gap-x-4 font-bold">
    <span data-test={`${testContext}:coverage`}>{`${percentFormatter(value)}%`}</span>
    {getCoverageIcon(value)}
  </div>
);

function getCoverageIcon(coverage: number) {
  if (!coverage) {
    return (
      <div tw="flex items-center text-red-default">
        <Icons.Cancel height={16} width={16} />
      </div>
    );
  }
  if (coverage === 100) {
    return (
      <div tw="flex items-center text-monochrome-default">
        <Icons.Checkbox height={16} width={16} />
      </div>
    );
  }

  return (
    <div tw="flex items-center text-orange-default">
      <Icons.Warning height={16} width={16} />
    </div>
  );
}
