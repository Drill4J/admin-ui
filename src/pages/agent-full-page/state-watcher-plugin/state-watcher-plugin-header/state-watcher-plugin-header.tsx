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
  items: React.ReactNode;
}

export const StateWatcherPluginHeader = ({ items }: Props) => (
  <div tw="flex justify-between items-center h-20 border-b border-monochrome-medium-tint">
    <span tw="text-24 leading-32 font-light text-monochrome-black">State Watcher</span>
    {items}
  </div>
);
