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
  itemsCount?: number;
  title?: React.ReactNode;
  actions?: React.ReactNode;
  itemsActions?: React.ReactNode;
}

export const PageHeader = ({
  title, itemsCount, itemsActions, actions,
}: Props) => (
  <div tw="flex items-center w-full h-19.5 border-b border-monochrome-medium-tint">
    <div tw="flex flex-grow items-center mx-6">
      <span tw="text-24 leading-32 font-light">{title}</span>
      <span tw="ml-2 font-light text-18 leading-24 text-monochrome-dark-tint">{itemsCount}</span>
      <div tw="ml-25">{itemsActions}</div>
      <div tw="flex flex-grow justify-end">{actions}</div>
    </div>
  </div>
);
