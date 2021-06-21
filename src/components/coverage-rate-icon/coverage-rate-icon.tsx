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

type CoverageRate = 'MISSED' | 'PARTLY' | 'FULL'

interface Props {
  coverageRate?: CoverageRate;
}

const IconWrapper = styled.div(({ rate }: { rate?: CoverageRate }) => [
  tw`h-4`,
  rate === 'FULL' && tw`text-monochrome-dark-tint`,
  rate === 'MISSED' && tw`text-red-default`,
  rate === 'PARTLY' && tw`text-orange-default`,
]);

export const CoverageRateIcon = ({ coverageRate }: Props) => (
  <div>
    <IconWrapper rate={coverageRate}>
      {coverageRate === 'FULL' ? (
        <Icons.Checkbox height={16} width={16} />
      ) : (
        <Icons.Warning height={16} width={16} />
      )}
    </IconWrapper>
  </div>
);
