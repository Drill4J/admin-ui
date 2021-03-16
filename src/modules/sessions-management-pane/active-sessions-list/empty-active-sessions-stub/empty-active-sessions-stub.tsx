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

export const EmptyActiveSessionsStub = () => (
  <div tw="grid place-items-center h-full text-monochrome-medium-tint">
    <div className="flex flex-col items-center w-full">
      <Icons.Test width={120} height={134} viewBox="0 0 18 20" data-test="empty-active-sessions-stub:test-icon" />
      <div
        tw="mt-7 mb-2 text-20 leading-32 text-monochrome-default"
        data-test="empty-active-sessions-stub:title"
      >
        There are no active sessions
      </div>
      <div
        tw="text-14 leading-20 text-monochrome-default text-center"
        data-test="empty-active-sessions-stub:message"
      >
        You can use this menu to start new.
      </div>
    </div>
  </div>
);
