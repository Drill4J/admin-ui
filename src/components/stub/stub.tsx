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

interface Props {
  className?: string;
  children: React.ReactNode;
  title: React.ReactNode;
  message: React.ReactNode;
}

export const Stub = ({
  children, title, message, className,
}: Props) => (
  <div tw="flex flex-col justify-center items-center w-full h-full flex-grow text-monochrome-medium-tint py-10" className={className}>
    { children }
    <div
      tw="mt-4 mb-2 text-20 leading-32 text-monochrome-default"
      data-test="stub:title"
    >
      { title }
    </div>
    <div
      tw="mt-2 text-14 leading-20 text-monochrome-default text-center"
      data-test="stub:message"
    >
      { message }
    </div>
  </div>
);
