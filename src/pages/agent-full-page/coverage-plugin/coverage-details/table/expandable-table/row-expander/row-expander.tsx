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
import tw, { styled } from 'twin.macro';

interface Props {
  expanded?: boolean;
  onClick: () => void;
}

const IconWrapper = styled.div`
  ${tw`grid place-items-center w-4 h-4 text-blue-default`}
  ${tw`text-blue-default`}
  ${({ expanded }: { expanded: boolean }) => expanded && tw`transform rotate-90`}
`;

export const RowExpander = ({ expanded, onClick }: Props) => (
  <div tw="cursor-pointer" onClick={onClick}>
    <IconWrapper expanded={Boolean(expanded)} data-test="row-expander">
      <Icons.Expander />
    </IconWrapper>
  </div>
);
