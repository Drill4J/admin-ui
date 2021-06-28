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

import { ReactComponent as NotFoundSvg } from './not-found.svg';

interface Props {
  children?: React.ReactNode
}

export const NotFoundPage = ({ children }: Props) => (
  <div tw="flex flex-row flex-grow w-full h-full">
    <div tw="flex-1 mt-22 ml-27">
      <div tw="mb-6 text-monochrome-black text-64 leading-86">Oops!</div>
      <div tw="text-monochrome-default text-16 leading-28">Sorry, we cannot find the page you’re looking for.</div>
      <div tw="text-monochrome-black text-14 leading-40 font-bold">Error code: 404</div>
      {children}
    </div>
    <div tw="flex justify-end items-end flex-1 mr-25 mb-25">
      <NotFoundSvg />
    </div>
  </div>
);
