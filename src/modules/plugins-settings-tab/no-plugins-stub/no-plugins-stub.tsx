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

interface Props {
  children: string;
}

export const NoPluginsStub = ({ children }: Props) => (
  <div tw="flex flex-col items-center justify-center h-full">
    <Icons.Plugins tw="text-monochrome-medium-tint" height={160} width={160} />
    <div tw="mt-10 mb-2 text-monochrome-default text-24 leading-32">No plugins installed</div>
    <div tw="text-monochrome-default text-14 leading-24">{children}</div>
  </div>
);
