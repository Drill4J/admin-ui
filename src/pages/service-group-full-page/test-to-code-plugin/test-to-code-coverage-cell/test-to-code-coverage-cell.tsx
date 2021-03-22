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
import { Tooltip } from '@drill4j/ui-kit';
import 'twin.macro';

import { percentFormatter } from 'utils';

interface Props {
  value?: number;
}

export const TestToCodeCoverageCell = ({ value = 0 }: Props) => (
  <div>
    <div tw="pl-4">
      <div tw="flex items-center w-full text-20 text-monochrome-black" data-test="dashboard-coverage-cell:value">
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
        ) : `${percentFormatter(value)}%`}
      </div>
    </div>
  </div>
);
