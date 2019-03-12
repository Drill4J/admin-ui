import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { PageHeader, SelectableTable, Column, Toggler, OverflowText } from '../../components';
import { WsConnection } from '../../common/connection';
import { Agent } from './agent-types';
import { LayoutSwitch } from './layout-switch';

import styles from './agents-page.module.scss';

interface Props {
  className?: string;
}

interface State {
  agents: Agent[];
}

const agentsPage = BEM(styles);

export const AgentsPage = agentsPage(
  class extends React.Component<Props, State> {
    public connection: any;
    public state = { agents: [] };

    public componentDidMount() {
      this.connection = new WsConnection().onOpen(() =>
        this.connection.subscribe('get-all-agents', this.onMessage),
      );
    }

    public onMessage = (agents: any) => {
      this.setState({ agents });
    };

    public render() {
      const { className } = this.props;
      const { agents } = this.state;
      return (
        <div className={className}>
          <PageHeader title="Agents" itemsCount={agents.length} />
          <LayoutSwitch />
          <Content>
            <SelectableTable data={agents}>
              <Column
                name="agentName"
                label="Name"
                Cell={({ value }) => <NameColumn>{value}</NameColumn>}
              />
              <Column
                name="agentDescription"
                label="Description"
                Cell={({ value }) => (
                  <OverflowText style={{ width: '382px' }}>{value}</OverflowText>
                )}
              />
              <Column name="agentAddress" label="IP Address" />
              <Column name="agentGroupName" label="Group" />
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
      );
    }
  },
);

const Content = agentsPage.content('div');
const NameColumn = agentsPage.nameColumn('div');
