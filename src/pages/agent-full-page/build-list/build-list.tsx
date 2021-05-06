/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Table, Column, Icons, Tooltip,
} from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { Table as ReTable } from 'components';
import { defaultAdminSocket } from 'common/connection';
import {
  useWsConnection, useAgent, useBaselineVersion,
} from 'hooks';
import { dateTimeFormatter } from 'utils';
import { BuildVersion } from 'types/build-version';
import { setBuildVersion, usePluginDispatch } from '../store';

const NameCell = styled.div`
  ${tw`grid gap-x-2 h-12 items-center`}
  grid-template-columns: minmax(auto, max-content) max-content;
  ${tw`font-bold text-14`}
`;

export const BuildList = () => {
  const { agentId = '' } = useParams<{ agentId: string }>();
  const buildVersions = useWsConnection<BuildVersion[]>(defaultAdminSocket, `/agents/${agentId}/builds`) || [];
  const { buildVersion: activeBuildVersion } = useAgent(agentId) || {};
  const { version: baseline } = useBaselineVersion(agentId, activeBuildVersion) || {};
  const dispatch = usePluginDispatch();
  const node = useRef<HTMLDivElement>(null);

  const columns = [
    {
      // Make an expander cell
      Header: () => null, // No header
      id: 'expander', // It needs an ID
      Cell: ({ row }: any) => (
        // Use Cell to render an expander for each row.
        // We can use the getToggleRowExpandedProps prop-getter
        // to build the expander.
        <span {...row.getToggleRowExpandedProps()}>
          {row.isExpanded ? '👇' : '👉'}
        </span>
      ),
    },
    {
      Header: 'Name',
      accessor: 'buildVersion',
      Cell: ({ value: buildVersion }: any) => (
        <NameCell
          onClick={() => dispatch(setBuildVersion(buildVersion))}
          title={buildVersion}
        >
          <Link tw="link text-ellipsis" to={`/full-page/${agentId}/${buildVersion}/dashboard`}>{buildVersion}</Link>
          {baseline === buildVersion && (
            <Tooltip
              message={(
                <span>
                  This build is set as baseline.<br />
                  All subsequent builds are compared with it.
                </span>
              )}
              position="top-right"
            >
              <Icons.Flag tw="flex items-center text-monochrome-default" />
            </Tooltip>
          )}
        </NameCell>
      ),
      text: 'left',
      width: '30%',
    },
    {
      Header: 'Added',
      accessor: 'detectedAt',
      Cell: ({ value }: any) => <span>{dateTimeFormatter(value)}</span>,
      text: 'left',
      width: '20%',
    },
    {
      Header: 'Total methods',
      accessor: 'summary.total',
      width: '10%',
    },
    {
      Header: 'New',
      accessor: 'summary.new',
      width: '10%',
    },
    {
      Header: 'Modified',
      accessor: 'summary.modified',
      width: '10%',
    },
    {
      Header: 'Unaffected',
      accessor: 'summary.unaffected',
      width: '10%',
    },
    {
      Header: 'Deleted',
      accessor: 'summary.deleted',
      width: '10%',
    },
  ];

  return (
    <div tw="mx-6">
      <div ref={node}>
        <div tw="flex items-center gap-x-2 w-full my-6 font-light text-24 leading-32 text-monochrome-black">
          <span>All builds </span>
          <span tw="text-monochrome-default">{buildVersions.length}</span>
        </div>
        <Table data={buildVersions} gridTemplateColumns="30% 20% repeat(5, 1fr)">
          <Column
            name="buildVersion"
            label="Name"
            Cell={({ value: buildVersion }) => (
              <NameCell
                onClick={() => dispatch(setBuildVersion(buildVersion))}
                title={buildVersion}
              >
                <Link tw="link text-ellipsis" to={`/full-page/${agentId}/${buildVersion}/dashboard`}>{buildVersion}</Link>
                {baseline === buildVersion && (
                  <Tooltip
                    message={(
                      <span>
                        This build is set as baseline.<br />
                        All subsequent builds are compared with it.
                      </span>
                    )}
                    position="top-right"
                  >
                    <Icons.Flag tw="flex items-center text-monochrome-default" />
                  </Tooltip>
                )}
              </NameCell>
            )}
            align="start"
          />
          <Column
            name="detectedAt"
            label="Added"
            Cell={({ value }) => <span>{dateTimeFormatter(value)}</span>}
            align="start"
          />
          <Column
            name="summary.total"
            label="Total methods"
          />
          <Column
            name="summary.new"
            label="New"
          />
          <Column
            name="summary.modified"
            label="Modified"
          />
          <Column
            name="summary.unaffected"
            label="Unaffected"
          />
          <Column
            name="summary.deleted"
            label="Deleted"
          />
        </Table>
        <ReTable
          columns={columns}
          data={buildVersions}
        />
      </div>
    </div>
  );
};
