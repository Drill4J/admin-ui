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

const Cell = styled.div(({ disabled }: { disabled?: boolean }) => [
  tw`inline-flex`,
  tw`leading-16 font-bold text-monochrome-black underline cursor-pointer`,
  disabled && tw`no-underline cursor-default pointer-events-none`,
]);

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const ClickableCell = ({ children, ...rest }: Props) => <Cell {...rest}>{children}</Cell>;
