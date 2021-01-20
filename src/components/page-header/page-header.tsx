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

import styles from './page-header.module.scss';

interface Props {
  className?: string;
  itemsCount?: number;
  title?: React.ReactNode;
  actions?: React.ReactNode;
  itemsActions?: React.ReactNode;
}

const pageHeader = BEM(styles);

export const PageHeader = pageHeader(
  ({
    className, title, itemsCount, itemsActions, actions,
  }: Props) => (
    <div className={className}>
      <Content>
        <Title>{title}</Title>
        <AgentsCount>{itemsCount}</AgentsCount>
        <ItemsActions>{itemsActions}</ItemsActions>
        <Actions>{actions}</Actions>
      </Content>
    </div>
  ),
);

const Content = pageHeader.content('div');
const Title = pageHeader.title('span');
const AgentsCount = pageHeader.itemsCount('span');
const ItemsActions = pageHeader.itemsActions('div');
const Actions = pageHeader.actions('div');
