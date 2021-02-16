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
import 'twin.macro';

interface Props {
  cellName: string;
  cellAdditionalInfo?: string;
  icon?: React.ReactNode;
  coverage?: number;
}

export const RiskCompoundCell = ({
  icon, cellName, cellAdditionalInfo, coverage,
}: Props) => (
  <div className={`flex gap-2 py-2 text-monochrome-black ${coverage === 100 && 'text-monochrome-dark-tint'}`}>
    <div>{icon}</div>
    <div tw="w-full font-bold">
      <div tw="h-4 leading-16 font-bold" data-test="compound-cell:name" title={cellName}>{cellName}</div>
      <div
        className={`h-5 mt-1 font-regular text-12 leading-20 text-monochrome-default ${coverage === 100 && 'text-monochrome-dark-tint'}`}
        data-test="compound-cell:additional-info"
        title={cellAdditionalInfo}
      >
        {cellAdditionalInfo}
      </div>
    </div>
  </div>
);
