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

import styles from './empty-active-sessions-stub.module.scss';

interface Props {
  className?: string;
}

const emptyActiveSessionsStub = BEM(styles);

export const EmptyActiveSessionsStub = emptyActiveSessionsStub(
  ({ className }: Props) => (
    <div className={className}>
      <div className="flex flex-column items-center w-full">
        <Icons.Test width={120} height={134} viewBox="0 0 18 20" data-test="empty-active-sessions-stub:test-icon" />
        <Title data-test="empty-active-sessions-stub:title">There are no active sessions</Title>
        <Message data-test="empty-active-sessions-stub:message">You can use this menu to start new.</Message>
      </div>
    </div>
  ),
);

const Title = emptyActiveSessionsStub.title('div');
const Message = emptyActiveSessionsStub.message('div');
