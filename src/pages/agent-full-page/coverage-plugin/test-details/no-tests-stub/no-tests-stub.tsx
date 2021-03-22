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

import { AGENT_STATUS } from 'common/constants';
import { usePluginState } from '../../../store';

export const NoTestsStub = () => {
  const { agent: { status = '' } = {} } = usePluginState();
  return (
    <div tw="flex flex-col items-center text-monochrome-medium-tint">
      <Icons.Test tw="mt-21" height={104} width={107} />
      <div tw="mt-4 text-20 leading-32 text-monochrome-default">
        {status === AGENT_STATUS.BUSY ? 'Build tests are loading' : 'No tests available yet'}
      </div>
      <div tw="mt-2 w-97 text-14 leading-24 text-center text-monochrome-default">
        {status === AGENT_STATUS.BUSY
          ? 'It may take a few seconds.'
          : 'Information about project tests will appear after the first launch of tests.'}
      </div>
    </div>
  );
};
