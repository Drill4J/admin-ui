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
import { camelToTitle, percentFormatter } from 'utils';
import 'twin.macro';

interface Props {
  data: Record<string, { total: number, covered: number }>;
}

export const CoverageSectionTooltip = ({ data: { totalCovered: { covered, total }, ...testTypes } }: Props) => (
  <div tw="flex flex-col font-bold text-12">
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center w-full">
        <span tw="uppercase">total covered: {`${covered}/${total}`}</span>
        <span tw="ml-6 leading-20 text-right opacity-50">{`${percentFormatter((covered / total) * 100)}%`}</span>
      </div>
    </div>
    {Object.keys(testTypes).map((testType) => (
      <div className="flex justify-between items-center w-full font-regular" key={testType}>
        <span tw="leading-20">
          {`${camelToTitle(testType)} (${testTypes[testType]
            .covered || 0}/${testTypes[testType].total || 0}`})
        </span>
        <span tw="ml-6 leading-20 text-right opacity-50">
          {`${percentFormatter((testTypes[testType].covered / testTypes[testType].total) * 100)}%`}
        </span>
      </div>
    ))}
  </div>
);
