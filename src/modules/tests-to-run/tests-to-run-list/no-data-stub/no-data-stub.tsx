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
import 'twin.macro';

export const NoDataStub = () => (
  <div tw="flex flex-col items-center justify-center mt-6 mb-8">
    <Icons.Graph tw="text-monochrome-medium-tint" width={70} height={75} />
    <div tw="mt-4 text-monochrome-default text-20 leading-32">
      No data about saved time
    </div>
    <div tw="mt-2 text-center text-14 leading-20 text-monochrome-default">
      There is no information about Auto Tests duration in the parent build.
    </div>
  </div>
);
