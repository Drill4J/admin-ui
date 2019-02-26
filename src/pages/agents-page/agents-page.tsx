import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { PageHeader } from '../../components';
import { AgentCard } from './agent-card';
import { ReactComponent as NoAgentsSvg } from './no-agents.svg';
import { agents } from './agents';

import styles from './agents-page.module.scss';

interface Props {
  className?: string;
}

const agentsPage = BEM(styles);

export const AgentsPage = agentsPage(({ className }: Props) => (
  <div className={className}>
    <PageHeader title="Agents" itemsCount={agents.length} />
    <Content>
      {agents.length > 0 ? (
        agents.map(({ id, ...agent }) => <AgentCard key={id} {...agent} />)
      ) : (
        <>
          <NoAgentsSvg />
          <Title>No agents online at the moment</Title>
          <SubTitle>For agent to appear here turn it on in your project folder.</SubTitle>
        </>
      )}
    </Content>
  </div>
));

const Content = agentsPage.content('div');
const Title = agentsPage.title('div');
const SubTitle = agentsPage.subTitle('div');
