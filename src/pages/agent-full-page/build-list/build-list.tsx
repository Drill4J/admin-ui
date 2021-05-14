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
import { Icons, Tooltip } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { Table } from 'components';
import { defaultAdminSocket } from 'common/connection';
import {
  useWsConnection, useAgent, useBaselineVersion,
} from 'hooks';
import { dateTimeFormatter } from 'utils';
import { BuildVersion } from 'types/build-version';
import { setBuildVersion, usePluginDispatch } from '../store';

export const BuildList = () => {
  const { agentId = '' } = useParams<{ agentId: string }>();
  const buildVersions = useWsConnection<BuildVersion[]>(defaultAdminSocket, `/agents/${agentId}/builds`) || [];
  const { buildVersion: activeBuildVersion } = useAgent(agentId) || {};
  const { version: baseline } = useBaselineVersion(agentId, activeBuildVersion) || {};
  const dispatch = usePluginDispatch();
  const node = useRef<HTMLDivElement>(null);

  return (
    <div tw="mx-6">
      <div ref={node}>
        <div tw="flex items-center gap-x-2 w-full my-6 font-light text-24 leading-32 text-monochrome-black">
          <span>All builds </span>
          <span tw="text-monochrome-default">{buildVersions.length}</span>
        </div>
        <Table
          isDefaulToggleSortBy
          columns={[
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
              textAlign: 'left',
              width: '30%',
            },
            {
              Header: 'Added',
              accessor: 'detectedAt',
              Cell: ({ value }: any) => <span>{dateTimeFormatter(value)}</span>,
              textAlign: 'left',
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
          ]}
          data={buildVersions}
        />
      </div>
    </div>
  );
};

const NameCell = styled.div`
  ${tw`grid gap-x-2 h-12 items-center`}
  grid-template-columns: minmax(auto, max-content) max-content;
  ${tw`font-bold text-14`}
`;
