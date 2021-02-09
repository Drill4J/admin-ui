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

export const NoScopeStub = () => (
  <div tw="flex flex-col justify-center items-center  w-full h-full">
    <Icons.Scope tw="text-monochrome-medium-tint" width={157} height={157} data-test="no-scope-stub:test-icon" />
    <div tw="mt-10 mb-2 text-24 leading-32 text-monochrome-default" data-test="no-scope-stub:title">No scopes found</div>
    <div
      tw="text-14 leading-20 text-monochrome-default"
      data-test="no-scope-stub:message"
    >
      There are no scopes with finished test sessions in this build.
    </div>
  </div>
);
