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
import { Link, useParams } from 'react-router-dom';
import { Button, Icons, SessionIndicator } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { percentFormatter } from 'utils';
import { ActiveScope } from 'types/active-scope';
import { useCoveragePluginDispatch, openModal } from '../../store';
import { usePluginState } from '../../../store';

interface Props {
  scope: ActiveScope | null;
}

const Content = styled.div`
  ${tw`block justify-between pt-4 px-6 pb-6 w-80 h-full text-14 leading-16 bg-monochrome-light-tint text-monochrome-default`}
`;

export const ActiveScopeInfo = ({ scope }: Props) => {
  const { id: scopeId, coverage: { percentage = 0 } = {} } = scope || {};
  const { agentId, buildVersion, pluginId, tab } =
    useParams<{ agentId: string; buildVersion: string; pluginId: string; tab: string }>();
  const dispatch = useCoveragePluginDispatch();
  const { loading } = usePluginState();

  return (
    <Content>
      <div>
        <div tw="font-bold text-12">ACTIVE SCOPE COVERAGE</div>
        <div className="flex items-center gap-x-2 w-full h-10 mt-6 mb-3 ">
          <div
            tw="text-32 leading-40 text-monochrome-black"
            data-test="active-scope-info:scope-coverage"
          >
            {`${percentFormatter(percentage)}%`}
          </div>
          <SessionIndicator active={loading} />
        </div>
        <Button
          tw="flex justify-center gap-x-2 w-68"
          primary
          size="large"
          onClick={() => dispatch(openModal('FinishScopeModal', scope))}
          data-test="active-scope-info:finish-scope-button"
        >
          <Icons.Complete />
          <span>Finish Scope</span>
        </Button>
      </div>
      <div className="flex flex-col items-start justify-between w-full gap-y-3 mt-6 font-bold leading-20">
        <Link
          className="link"
          to={`/full-page/${agentId}/${buildVersion}/${pluginId}/scope/${scopeId}/methods`}
          data-test="active-scope-info:scope-details-link"
        >
          Scope Details
        </Link>
        <Link
          className="link"
          to={`/full-page/${agentId}/${buildVersion}/${pluginId}/scopes`}
          data-test="active-scope-info:all-scopes-link"
        >
          All Scopes
        </Link>
        <Link
          tw="link"
          to={`/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard/${tab}/session-management-pane`}
          data-test="active-scope-info:sessions-management-link"
        >
          Sessions Management
        </Link>
      </div>
    </Content>
  );
};
