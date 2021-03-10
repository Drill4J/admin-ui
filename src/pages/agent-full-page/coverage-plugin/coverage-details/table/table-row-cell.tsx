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
import tw, { styled } from 'twin.macro';

import { Align } from './table-types';

const Cell = styled.div(({ type }: { type: Align }) => [
  tw`px-4`,
  `&:first-child {
      padding: 0 0;
   }`,
  type === 'start' && tw`w-full justify-self-start`,
  type === 'end' && tw`justify-self-end`,
  type === 'center' && tw`justify-self-center`,
  type === 'stretch' && tw`justify-self-stretch`,
]);

interface Props {
  children: React.ReactNode;
  type: Align;
  style?: Record<symbol, string>;
}

export const TableRowCell = ({ children, ...rest }: Props) => <Cell {...rest}>{children}</Cell>;
