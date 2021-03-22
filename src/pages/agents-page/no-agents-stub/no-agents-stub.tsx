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

import { ReactComponent as NoAgentsSvg } from './no-agents.svg';

export const NoAgentsStub = () => (
  <div tw="flex flex-col flex-grow justify-center items-center">
    <NoAgentsSvg />
    <div tw="mt-10 mb-2 text-monochrome-default text-24 leading-32 text-center">No agents online at the moment</div>
    <div tw="text-monochrome-default text-14 leading-24 text-center">
      Run your application with Drill4J Agent using&nbsp;
      <a
        tw="text-blue-default"
        href="https://drill4j.github.io/how-to-start/"
        rel="noopener noreferrer"
        target="_blank"
      >
        this guide.
      </a>
    </div>
  </div>
);
