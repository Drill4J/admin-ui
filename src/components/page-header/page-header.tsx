import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from '../icon';

import styles from './page-header.module.scss';

interface Props {
  className?: string;
  itemsCount?: number;
  title?: string;
  actions?: React.ReactNode;
}

const pageHeader = BEM(styles);

export const PageHeader = pageHeader(({ className, title, itemsCount, actions }: Props) => (
  <div className={className}>
    <Content>
      <Title>{title}</Title>
      <AgentsCount>{itemsCount}</AgentsCount>
      <SearchButton />
      <Actions>{actions}</Actions>
    </Content>
  </div>
));

const Content = pageHeader.content('div');
const Title = pageHeader.title('span');
const AgentsCount = pageHeader.itemsCount('span');
const SearchButton = pageHeader.searchButton(Icons.Search);
const Actions = pageHeader.actions('div');
