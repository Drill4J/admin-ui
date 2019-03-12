import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { PageHeader, SelectableTable, Column, Toggler, OverflowText } from '../../components';
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
      {/* {agents.length > 0 ? (
        agents.map(({ id, ...agent }) => <AgentCard key={id} {...agent} />)
      ) : (
        <>
          <NoAgentsSvg />
          <Title>No agents online at the moment</Title>
          <SubTitle>For agent to appear here turn it on in your project folder.</SubTitle>
        </>
      )} */}

      <SelectableTable data={agents}>
        <Column name="name" label="Name" Cell={({ value }) => <NameColumn>{value}</NameColumn>} />
        <Column
          name="description"
          label="Description"
          Cell={({ value }) => <OverflowText style={{ width: '382px' }}>{value}</OverflowText>}
        />
        <Column name="address" label="IP Address" />
        <Column name="group" label="Group" />
        <Column name="status" label="Drill4J" Cell={Toggler} />
        <Column
          name="pluginsCount"
          HeaderCell={() => (
            <span>
              Plugins <br /> on / total
            </span>
          )}
        />
      </SelectableTable>
    </Content>
  </div>
));

const Content = agentsPage.content('div');
const Title = agentsPage.title('div');
const SubTitle = agentsPage.subTitle('div');
const NameColumn = agentsPage.nameColumn('div');
