import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from '../../../components';

import styles from './agents-header.module.scss';

interface Props {
  className?: string;
}

const agentsHeader = BEM(styles);

export const AgentsHeader = agentsHeader(({ className }: Props) => (
  <div className={className}>
    <Content>
      <Title>Agents</Title>
      <AgentsCount>0</AgentsCount>
      <SearchButton />
    </Content>
  </div>
));

const Content = agentsHeader.content('div');
const Title = agentsHeader.title('span');
const AgentsCount = agentsHeader.agentsCount('span');
const SearchButton = agentsHeader.searchButton(Icons.Search);
