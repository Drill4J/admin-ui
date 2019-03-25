import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from '../icon';

import styles from './page-header.module.scss';

interface Props {
  className?: string;
  itemsCount?: number;
  title?: React.ReactNode;
  actions?: React.ReactNode;
  itemsActions?: React.ReactNode;
  borderColor?: 'gray' | 'black';
}

const pageHeader = BEM(styles);

export const PageHeader = pageHeader(
  ({ className, title, itemsCount, itemsActions, actions }: Props) => (
    <div className={className}>
      <Content>
        <Title>{title}</Title>
        <AgentsCount>{itemsCount}</AgentsCount>
        {/* <SearchButton /> */}
        <ItemsActions>{itemsActions}</ItemsActions>
        <Actions>{actions}</Actions>
      </Content>
    </div>
  ),
);

const Content = pageHeader.content('div');
const Title = pageHeader.title('span');
const AgentsCount = pageHeader.itemsCount('span');
const SearchButton = pageHeader.searchButton(Icons.Search);
const ItemsActions = pageHeader.itemsActions('div');
const Actions = pageHeader.actions('div');
