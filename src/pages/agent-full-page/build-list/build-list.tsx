import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useHistory, useParams } from 'react-router-dom';

import { Panel } from 'layouts';
import { Table, Column } from 'components';
import { defaultAdminSocket } from 'common/connection';
import { useWsConnection, useElementSize } from 'hooks';
import { dateFormatter } from 'utils';
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
              <Table
                data={buildVersions}
                defaultSortField="buildVersion"
                combinedColumn={
                  {
                    name: 'Methods',
                    columns: [
                      <Column name="totalMethods" label="Total" />,
                      <Column name="newMethods" label="New" />,
                      <Column name="modifiedMethods" label="Modified" />,
                      <Column name="unaffectedMethods" label="Unaffected" />,
                      <Column name="deletedMethods" label="Deleted" />,
                    ],
                  }
                }
              >
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
                  name="detectedAt"
                  label="Added"
                  Cell={({ value }) => <span>{dateFormatter(value)}</span>}
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
