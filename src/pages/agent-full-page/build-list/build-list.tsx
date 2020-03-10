import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useHistory, useParams } from 'react-router-dom';

import { Panel } from 'layouts';
import { Table, Column } from 'components';
import { defaultAdminSocket } from 'common/connection';
import { useWsConnection, useElementSize } from 'hooks';
import { BuildVersion } from 'types/build-version';
import { setBuildVersion, usePluginDispatch } from '../store';

import styles from './build-list.module.scss';

interface Props {
  className?: string;
}

const buildList = BEM(styles);

export const BuildList =
  buildList(
    ({
      className,
    }: Props) => {
      const { agentId = '' } = useParams();
      const { push } = useHistory();
      const buildVersions = useWsConnection<BuildVersion[]>(defaultAdminSocket, `/agents/${agentId}/builds`) || [];
      const dispatch = usePluginDispatch();
      const node = React.useRef<HTMLDivElement>(null);
      const { width: contentWidth } = useElementSize(node);
      const columnWidth = `${(contentWidth - 48) / 10}px`;

      return (
        <div className={className}>
          <Content>
            <div ref={node}>
              <Title>
                <span>All builds </span>
                <BuildCount>{buildVersions.length}</BuildCount>
              </Title>
              <Table data={buildVersions}>
                <Column
                  name="buildVersion"
                  label="Name"
                  Cell={({ value: buildVersion }) => (
                    <NameCell
                      onClick={() => {
                        dispatch(setBuildVersion(buildVersion));
                        push(`/full-page/${agentId}/${buildVersion}/dashboard`);
                      }}
                    >
                      {buildVersion}
                    </NameCell>
                  )}
                  width={columnWidth}
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
                      <HeaderLabel>Unaffected</HeaderLabel>
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
              </Table>
            </div>
          </Content>
        </div>
      );
    },
  );

const Content = buildList.content('div');
const Title = buildList.title(Panel);
const BuildCount = buildList.itemsCount('span');
const NameCell = buildList.nameCell('div');
const HeaderCell = buildList.headerCell('div');
const HeaderLabel = buildList.headerLabel('div');
