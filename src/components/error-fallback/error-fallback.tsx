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
import { LinkButton } from '@drill4j/ui-kit';
import 'twin.macro';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div role="alert" tw="p-4">
    <h1 tw="text-24 font-bold">Something went wrong:</h1>
    <pre>Message: {error.message}</pre>
    <pre>{error.stack}</pre>
    <LinkButton type="button" onClick={resetErrorBoundary}>Go to agents apage</LinkButton>
  </div>
);
