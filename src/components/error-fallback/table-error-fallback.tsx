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
import { FallbackProps } from 'react-error-boundary';
import { Icons } from '@drill4j/ui-kit';
import 'twin.macro';
import { Stub } from '../stub';

export const TableErrorFallback = ({ error }: FallbackProps) => (
  <div role="alert" tw="p-4">
    <Stub
      icon={<Icons.FAILED height={80} width={80} />}
      title="Table load failed"
      message={error.message}
    />
  </div>
);
