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

import { ReactComponent as LogoSvg } from './logo.svg';

interface Props {
  baselineBuild?: string;
}

export const Header = ({ baselineBuild }: Props) => (
  <div tw="flex items-center">
    <div tw="relative my-5 w-20 h-20 border-2 rounded-full border-monochrome-black">
      <LogoSvg tw="absolute bottom-0" />
    </div>
    <div tw="flex flex-col justify-center ml-6">
      <div tw="w-full font-bold text-24 leading-24">New Build has Arrived!</div>
      <div tw="flex items-center w-full mt-4 text-12 leading-16 text-monochrome-default">
        Baseline build:&nbsp;
        <div className="text-ellipsis w-80 inline-block font-bold" title={baselineBuild}>{baselineBuild}</div>
      </div>
    </div>
  </div>
);
