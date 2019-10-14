import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Table, Column, Menu } from '../../../components';
import { defaultAdminSocket } from '../../../common/connection';
import { useWsConnection } from '../../../hooks';
import { setBuildVersion, usePluginDispatch } from '../store';
import { RenameBuildVersionModal } from './rename-build-version-modal';

import styles from './build-list.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const buildList = BEM(styles);

export const BuildList = withRouter(
  buildList(({ className, match: { params: { agentId } }, history: { push } }: Props) => {
    const buildVersions = useWsConnection(defaultAdminSocket, `/${agentId}/builds`) || [];
    const dispatch = usePluginDispatch();
    const [isModalOpened, setIsModalOpened] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState({});

    return (
      <div className={className}>
        <Content>
          <Table data={buildVersions as any}>
            <Column
              name="alias"
              label="Name"
              Cell={({ value, item: { buildVersion } }) => (
                <NameCell
                  onClick={() => {
                    dispatch(setBuildVersion(buildVersion));
                    push(`/full-page/${agentId}/dashboard`);
                  }}
                >
                  {value || buildVersion}
                </NameCell>
              )}
            />
            <Column
              name="addedDate"
              label="Added"
              Cell={({ value }) => <span>{new Date(value).toLocaleDateString()}</span>}
            />
            <Column
              name="totalMethods"
              HeaderCell={() => (
                <HeaderCell>
                  <HeaderLabel>Total</HeaderLabel>
                  <div>Metods</div>
                </HeaderCell>
              )}
            />
            <Column
              name="newMethods"
              HeaderCell={() => (
                <HeaderCell>
                  <HeaderLabel>New</HeaderLabel>
                </HeaderCell>
              )}
            />
            <Column
              name="modifiedMethods"
              HeaderCell={() => (
                <HeaderCell>
                  <HeaderLabel>Modified</HeaderLabel>
                </HeaderCell>
              )}
            />
            <Column
              name="unaffectedMethods"
              HeaderCell={() => (
                <HeaderCell>
                  <HeaderLabel>Not Modified</HeaderLabel>
                </HeaderCell>
              )}
            />
            <Column
              name="deletedMethods"
              HeaderCell={() => (
                <HeaderCell>
                  <HeaderLabel>Deleted</HeaderLabel>
                </HeaderCell>
              )}
            />
            <Column
              name="actions"
              HeaderCell={() => null}
              Cell={({ item }) => (
                <ActionCell>
                  <Menu
                    items={[
                      {
                        label: 'Rename',
                        icon: 'Edit',
                        onClick: () => {
                          setSelectedItem(item);
                          setIsModalOpened(true);
                        },
                      },
                    ]}
                  />
                </ActionCell>
              )}
            />
          </Table>
        </Content>
        {isModalOpened && (
          <RenameBuildVersionModal
            isOpen={isModalOpened}
            onToggle={setIsModalOpened}
            buildVersion={selectedItem}
          />
        )}
      </div>
    );
  }),
);

const Content = buildList.content('div');
const NameCell = buildList.nameCell('div');
const HeaderCell = buildList.headerCell('div');
const HeaderLabel = buildList.headerLabel('div');
const ActionCell = buildList.actionCell('div');
