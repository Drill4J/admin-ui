import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { AgentsHeader } from './agents-header';
import { ReactComponent as NoAgentsSvg } from './no-agents.svg';

import styles from './agents-page.module.scss';

interface Props {
  className?: string;
}

const agentsPage = BEM(styles);

export const AgentsPage = agentsPage(({ className }: Props) => (
  <div className={className}>
    <AgentsHeader />
    <Content>
      <NoAgentsSvg />
      <Title>No agents online at the moment</Title>
      <SubTitle>For agent to appear here turn it on in your project folder.</SubTitle>
    </Content>
  </div>
));

const Content = agentsPage.content('div');
const Title = agentsPage.title('div');
const SubTitle = agentsPage.subTitle('div');
