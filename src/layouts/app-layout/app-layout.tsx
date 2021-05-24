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

import { Toolbar } from 'components';
import { Breadcrumbs } from 'modules';

interface Props {
  children?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
}

export const AppLayout = ({ sidebar, children, footer }: Props) => (
  <div tw="flex flex-row w-full h-full overflow-hidden">
    <div tw="w-20 h-full">{sidebar}</div>
    <div tw="flex flex-col flex-grow">
      <div tw="flex-shrink-0 w-full h-12 border-b border-monochrome-medium-tint">
        <Toolbar breadcrumbs={<Breadcrumbs />} />
      </div>
      <div tw="flex flex-grow overflow-y-auto">{children}</div>
      <div tw="w-full">{footer}</div>
    </div>
  </div>
);
