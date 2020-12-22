import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { NavLink, useParams } from 'react-router-dom';
import {
  Panel, Button, Icons, SessionIndicator,
} from '@drill4j/ui-kit';

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
      <ScopeInfo>
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
      <NavigationPanel direction="column" verticalAlign="start">
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
      </NavigationPanel>
    </div>
  );
});

const Title = activeScopeInfo.title('div');
const ScopeInfo = activeScopeInfo.scopeInfo(Panel);
const NavigationPanel = activeScopeInfo.navigationPanel(Panel);
const Link = activeScopeInfo.link(NavLink);
const ButtonLink = activeScopeInfo.buttonLink('div');
const ScopeCoverage = activeScopeInfo.scopeCoverage('div');
const FinishScopeButton = activeScopeInfo.finishScopeButton(Button);
