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

import { ScopeTimer } from '../..';

import styles from './scope-status.module.scss';

interface Props {
  className?: string;
  active: boolean;
  loading: boolean;
  enabled: boolean;
  started: number;
  finished: number;
}

const scopeStatus = BEM(styles);

export const ScopeStatus = scopeStatus(({
  className, active, enabled, started, finished,
}: Props) => (
  <div className={className}>
    {active
      ? <Active data-test="scope-status:active">Active</Active>
      : (
        <>
          {enabled
            ? <span data-test="scope-status:finished">Finished</span>
            : <span data-test="scope-status:ignored">Ignored</span>}
        </>
      )}
    <ScopeTimer started={started} finished={finished} active={active} size="small" />
  </div>
));

const Active = scopeStatus.active('div');
