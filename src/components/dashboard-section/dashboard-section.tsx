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

import { spacesToDashes } from 'utils';

interface Props {
  graph?: React.ReactNode | React.ReactNode[];
  info?: React.ReactNode;
  label?: string;
  additionalInfo?: React.ReactNode;
}

export const DashboardSection = ({
  graph, info, label = '', additionalInfo,
}: Props) => (
  <div tw="flex gap-x-4 w-full">
    <div tw="w-1/2">
      <div tw="mb-4 font-regular text-14 leading-20 text-monochrome-default">{label}</div>
      <div
        tw="mb-6 font-light text-48 leading-48 text-monochrome-black"
        data-test={`dashboard:${spacesToDashes(label)}:main-info`}
      >
        {info}
      </div>
      <div
        tw="text-12 leading-20 text-monochrome-default"
        data-test={`dashboard:${spacesToDashes(label)}:additional-info`}
      >
        {additionalInfo}
      </div>
    </div>
    <div tw="w-1/2 flex justify-end cursor-pointer">{graph}</div>
  </div>
);
