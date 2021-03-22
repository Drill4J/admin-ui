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
import { nanoid } from 'nanoid';
import { Icons } from '@drill4j/ui-kit';
import 'twin.macro';

interface Props {
  recommendations?: string[];
}

export const RecommendedActions = ({ recommendations = [] }: Props) => (
  <div tw="w-full h-full">
    <div tw="w-full text-14 leading-32 font-bold pb-2">Recommended actions</div>
    <div tw="py-3 px-4 border border-green-default bg-green-default bg-opacity-5">
      {recommendations.map((action: string) => (
        <span tw="flex items-center text-14 leading-32 text-monochrome-black" key={nanoid()}>
          <Icons.Checkbox tw="flex items-center mr-2 text-green-default" height={16} width={16} />
          {action}
        </span>
      ))}
    </div>
  </div>
);
