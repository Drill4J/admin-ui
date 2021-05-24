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

import { percentFormatter } from 'utils';
import { Count } from 'types/count';

interface Props {
  coveredMethods: Count;
}

export const MethodsTooltip = ({ coveredMethods: { covered = 0, total = 0 } }: Props) => (
  <div tw="font-bold text-12 uppercase">
    <div className="flex items-center w-full">
      <div>
        covered methods: {covered}/{total}
      </div>
      <div tw="ml-8 text-monochrome-default">{percentFormatter((covered / total) * 100)}%</div>
    </div>
  </div>
);
