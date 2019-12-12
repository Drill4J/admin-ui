import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from 'layouts';
import { Table, Column, Menu } from 'components';
import { defaultAdminSocket } from 'common/connection';
import { useWsConnection, useElementSize } from 'hooks';
import { setBuildVersion, usePluginDispatch } from '../store';
import { RenameBuildVersionModal } from './rename-build-version-modal';
import { dateFormatter } from 'utils';
import { BuildVersion } from 'types/build-version';

import styles from './build-list.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const buildList = BEM(styles);

export const BuildList = withRouter(
  buildList(
    ({
      className,
      match: {
        params: { agentId },
      },
      history: { push },
    }: Props) => {
      const buildVersions =
        useWsConnection<BuildVersion[]>(defaultAdminSocket, `/${agentId}/builds`) || [];
      const dispatch = usePluginDispatch();
      const [isModalOpened, setIsModalOpened] = React.useState(false);
      const [selectedItem, setSelectedItem] = React.useState<BuildVersion>({});
      const node = React.useRef<HTMLDivElement>(null);
      const { width: contentWidth } = useElementSize(node);
      const columnWidth = `${(contentWidth - 48) / 10}px`;

      return (
        <div className={className}>
          <Content>
            <div ref={node}>
              <Title>
                <span>Builds list </span>
                <BuildCount>{buildVersions.length}</BuildCount>
              </Title>
              <Table data={buildVersions as any}>
                <Column
                  name="alias"
                  label="Name"
                  Cell={({ value, item: { buildVersion } }) => (
                    <NameCell
                      onClick={() => {
                        dispatch(setBuildVersion({ id: buildVersion, name: value }));
                        push(`/full-page/${agentId}/${buildVersion}/dashboard`);
                      }}
                    >
                      {value || buildVersion}
                    </NameCell>
                  )}
                />
                <Column
                  name="addedDate"
                  label="Added"
                  Cell={({ value }) => <span>{dateFormatter(value)}</span>}
                />
                <Column
                  name="totalMethods"
                  HeaderCell={() => (
                    <HeaderCell>
                      <HeaderLabel>Total</HeaderLabel>
                      <div>Methods</div>
                    </HeaderCell>
                  )}
                  width={columnWidth}
                />
                <Column
                  name="newMethods"
                  HeaderCell={() => (
                    <HeaderCell>
                      <HeaderLabel>New</HeaderLabel>
                    </HeaderCell>
                  )}
                  width={columnWidth}
                />
                <Column
                  name="modifiedMethods"
                  HeaderCell={() => (
                    <HeaderCell>
                      <HeaderLabel>Modified</HeaderLabel>
                    </HeaderCell>
                  )}
                  width={columnWidth}
                />
                <Column
                  name="unaffectedMethods"
                  HeaderCell={() => (
                    <HeaderCell>
                      <HeaderLabel>Not Modified</HeaderLabel>
                    </HeaderCell>
                  )}
                  width={columnWidth}
                />
                <Column
                  name="deletedMethods"
                  HeaderCell={() => (
                    <HeaderCell>
                      <HeaderLabel>Deleted</HeaderLabel>
                    </HeaderCell>
                  )}
                  width={columnWidth}
                />
                <Column
                  name="actions"
                  HeaderCell={() => null}
                  Cell={({ item: { buildVersion, alias } }) => (
                    <ActionCell>
                      <Menu
                        items={[
                          {
                            label: 'Rename',
                            icon: 'Edit',
                            onClick: () => {
                              setSelectedItem({ id: buildVersion, name: alias });
                              setIsModalOpened(true);
                            },
                          },
                        ]}
                      />
                    </ActionCell>
                  )}
                />
              </Table>
            </div>
          </Content>
          {isModalOpened && (
            <RenameBuildVersionModal
              agentId={agentId}
              isOpen={isModalOpened}
              onToggle={setIsModalOpened}
              buildVersion={selectedItem}
            />
          )}
        </div>
      );
    },
  ),
);

const Content = buildList.content('div');
const Title = buildList.title(Panel);
const BuildCount = buildList.itemsCount('span');
const NameCell = buildList.nameCell('div');
const HeaderCell = buildList.headerCell('div');
const HeaderLabel = buildList.headerLabel('div');
const ActionCell = buildList.actionCell('div');
