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

export const NoTestsToRunStub = () => (
  <div tw="flex flex-col items-center justify-center h-full">
    <Icons.Test tw="text-monochrome-medium-tint" width={80} height={80} />
    <div tw="mt-4 text-20 leading-32 text-monochrome-default">
      No suggested tests
    </div>
    <div tw="mt-2 text-center text-14 leading-20 text-monochrome-default">
      There is no information about the suggested to run tests<br /> in this build.
    </div>
  </div>
);
