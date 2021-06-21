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

export const Card = styled.div`
  ${tw`flex flex-col justify-between items-center w-full h-23 pt-3 px-4 pb-4`}
  ${tw`border border-monochrome-medium-tint font-bold`}
`;

export const Label = styled.span`
  ${tw`text-12 leading-16 text-monochrome-default`}
`;

export const TotalCount = styled.span`
  ${tw`text-16 leading-16 text-monochrome-black`}
`;
