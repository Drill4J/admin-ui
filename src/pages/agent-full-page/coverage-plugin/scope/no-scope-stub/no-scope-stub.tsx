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
import { BEM } from '@redneckz/react-bem-helper';
import { Icons } from '@drill4j/ui-kit';

import styles from './no-scope-stub.module.scss';

interface Props {
  className?: string;
}

const noScopeStub = BEM(styles);

export const NoScopeStub = noScopeStub(({ className }: Props) => (
  <div className={className}>
    <div className="d-flex flex-column align-items-center w-100">
      <Icons.Scope width={157} height={157} data-test="no-scope-stub:test-icon" />
      <Title data-test="no-scope-stub:title">No scopes found</Title>
      <Message data-test="no-scope-stub:message">There are no scopes with finished test sessions in this build.</Message>
    </div>
  </div>
));

const Title = noScopeStub.title('div');
const Message = noScopeStub.message('div');
