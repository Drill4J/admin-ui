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
import { getDuration } from 'utils';

interface Props {
  value?: number;
}

export const DurationCell = ({ value = 0 }: Props) => {
  const { hours, seconds, minutes, isLessThenOneSecond } = getDuration(value);

  return (
    <div tw="leading-16 text-monochrome-black">
      {isLessThenOneSecond && <span tw="mr-1 text-monochrome-dark-tint">&#60;</span>}
      {`${hours}:${minutes}:${isLessThenOneSecond ? '01' : seconds}`}
    </div>
  );
};
