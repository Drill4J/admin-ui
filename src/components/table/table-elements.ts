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

const TableHead = styled.thead`
  ${tw`bg-monochrome-white text-14 leading-20 font-bold border-b border-t border-monochrome-black`};
`;

const SortArrow = styled.div`
  ${tw`invisible absolute -left-4 grid place-items-center h-4 w-4 text-blue-medium-tint cursor-pointer`};

  ${({ active }: { active: boolean }) => active && tw`visible text-blue-shade`}
`;

const TH = styled.th`
  ${tw`first:px-4 last:px-4`};

  &:hover ${SortArrow} {
    ${tw`visible`};
  }
`;

const TR = styled.tr`
  ${tw`h-10 border-b border-monochrome-medium-tint`}
  ${({ isExpanded }: { isExpanded: boolean }) => isExpanded && tw`bg-monochrome-light-tint`}
`;

export const TableElements = {
  TableHead,
  SortArrow,
  TH,
  TR,
};