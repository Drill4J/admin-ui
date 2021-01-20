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

import styles from './items-actions.module.scss';

interface Props {
  className?: string;
  itemsCount: number;
  actions: Array<{ label: string; onClick: () => void; count: number }>;
}

const itemsActions = BEM(styles);

export const ItemsActions = itemsActions(({ className, itemsCount, actions }: Props) => (itemsCount > 0 ? (
  <div className={className}>
    <ItemsCount>{`${itemsCount} selected`}</ItemsCount>
    {actions.map(
      ({ count, label, onClick }) => count > 0 && (
        <Action key={label} onClick={onClick}>
          {label}
        </Action>
      ),
    )}
  </div>
) : null));

const ItemsCount = itemsActions.count('span');
const Action = itemsActions.action('span');
