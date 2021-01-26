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
import { BEM } from '@redneckz/react-bem-helper';
import { NavLink, useParams } from 'react-router-dom';
import { Button, Icons, SessionIndicator } from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { ActiveScope } from 'types/active-scope';
import { useCoveragePluginDispatch, openModal } from '../../store';
import { usePluginState } from '../../../store';

import styles from './active-scope-info.module.scss';

interface Props {
  className?: string;
  scope: ActiveScope | null;
}

const activeScopeInfo = BEM(styles);

export const ActiveScopeInfo = activeScopeInfo(({
  className,
  scope,
}: Props) => {
  const {
    id: scopeId,
    coverage: { percentage = 0 } = {},
  } = scope || {};
  const { agentId, buildVersion, pluginId } = useParams<{agentId: string, buildVersion: string, pluginId: string }>();
  const dispatch = useCoveragePluginDispatch();
  const { loading } = usePluginState();

  return (
    <div className={className}>
      <Title>ACTIVE SCOPE COVERAGE</Title>
      <ScopeInfo className="d-flex align-items-center gx-2 w-100 mt-6 mb-3 ">
        <ScopeCoverage data-test="active-scope-info:scope-coverage">
          {`${percentFormatter(percentage)}%`}
        </ScopeCoverage>
        <SessionIndicator active={loading} />
      </ScopeInfo>
      <FinishScopeButton
        type="primary"
        size="large"
        onClick={() => dispatch(openModal('FinishScopeModal', scope))}
        data-test="active-scope-info:finish-scope-button"
      >
        <Icons.Complete />
        <span>Finish Scope</span>
      </FinishScopeButton>
      <div className="d-flex flex-column align-items-start g-3 w-100 mt-6">
        <Link
          to={`/full-page/${agentId}/${buildVersion}/${pluginId}/scopes/${scopeId}`}
          data-test="active-scope-info:scope-details-link"
        >
          Scope Details
        </Link>
        <Link
          to={`/full-page/${agentId}/${buildVersion}/${pluginId}/scopes/`}
          data-test="active-scope-info:all-scopes-link"
        >
          All Scopes
        </Link>
        <ButtonLink
          onClick={() => dispatch(openModal('SessionsManagementModal', null))}
          data-test="active-scope-info:sessions-management-link"
        >
          Sessions Management
        </ButtonLink>
      </div>
    </div>
  );
});

const Title = activeScopeInfo.title('div');
const ScopeInfo = activeScopeInfo.scopeInfo('div');
const Link = activeScopeInfo.link(NavLink);
const ButtonLink = activeScopeInfo.buttonLink('div');
const ScopeCoverage = activeScopeInfo.scopeCoverage('div');
const FinishScopeButton = activeScopeInfo.finishScopeButton(Button);
