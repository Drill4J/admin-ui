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

import { CellProps } from '../table/table-types';

interface Props extends CellProps<string, unknown>{
  icon?: React.ReactNode;
  type?: 'primary' | 'secondary';
}

export const NameCell = ({ icon, value, testContext }: Props) => (
  <span tw="flex items-center">
    {icon && <div tw="flex items-center mr-2">{icon}</div>}
    <div className="text-ellipsis text-14 text-monochrome-black" data-test={`name-cell:content:${testContext}`} title={value}>{value}</div>
  </span>
);
