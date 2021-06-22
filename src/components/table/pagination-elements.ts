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

const PaginationArrow = styled.div`
  ${tw`flex items-center justify-center w-8 h-8 cursor-pointer hover:text-blue-medium-tint`};

  ${({ disabled }: { disabled?: boolean }) =>
    disabled && tw`text-monochrome-medium-tint cursor-default hover:text-monochrome-medium-tint`};
`;

const PageNumber = styled.div`
  ${tw`flex items-center justify-center h-8 px-3 cursor-pointer font-bold text-14 leading-24 hover:text-blue-medium-tint`};

  ${({ active }: { active?: boolean}) => active && tw`text-blue-default border-b-2 border-blue-default cursor-default`}
`;

const Dots = styled.div`
  ${tw`relative cursor-pointer hover:text-blue-medium-tint`};

  ${({ active }: { active: boolean}) => active && tw`text-blue-default`}
`;

const NumberInput = styled.input`
  width: 60px;
  height: 40px;
  ${tw`py-0 px-2 text-14 leading-22 text-monochrome-black`};
  ${tw`rounded border border-monochrome-medium-tint bg-monochrome-white outline-none`};


  -moz-appearance: textfield;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  
  :focus {
    ${tw`border border-monochrome-black`};
  }
`;

export const PaginationElements = {
  PaginationArrow,
  PageNumber,
  Dots,
  NumberInput,
};
