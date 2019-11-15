import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from '../../../../../layouts';
import { Icons, Menu } from '../../../../../components';
import { Button } from '../../../../../forms';
import { useBuildVersion } from '../../use-build-version';
import { usePluginState } from '../../../store';
import { useCoveragePluginDispatch, openModal } from '../../store';
import { ScopeSummary } from '../../../../../types/scope-summary';

import styles from './active-scope-actions.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
}

const activeScopeActions = BEM(styles);

export const ActiveScopeActions = withRouter(
  activeScopeActions(({ className, history: { push } }: Props) => {
    const {
      agentId,
      pluginId,
      buildVersion: { id: buildVersion },
    } = usePluginState();
    const scope = useBuildVersion<ScopeSummary>('/active-scope');
    const dispatch = useCoveragePluginDispatch();

    return (
      <div className={className}>
        <Panel>
          <ScopeDetails
            onClick={() =>
              push(`/full-page/${agentId}/${buildVersion}/${pluginId}/scopes/${scope && scope.id}`)
            }
            data-test="active-scope-actions:scope-details"
          >
            Scope details >
          </ScopeDetails>
          <FinishScopeButton
            type="primary"
            onClick={() => dispatch(openModal('FinishScopeModal', scope))}
            data-test="active-scope-actions:finish-scope-button"
          >
            <Icons.Check height={10} width={14} />
            Finish scope
          </FinishScopeButton>
          <Menu
            items={[
              {
                label: 'Manage sessions',
                icon: 'ManageSessions',
                onClick: () => dispatch(openModal('ManageSessionsModal', null)),
              },
              {
                label: 'Rename',
                icon: 'Edit',
                onClick: () => dispatch(openModal('RenameScopeModal', scope)),
              },
              {
                label: 'Cancel',
                icon: 'Delete',
                onClick: () => dispatch(openModal('DeleteScopeModal', scope)),
              },
            ]}
          />
        </Panel>
      </div>
    );
  }),
);

const ScopeDetails = activeScopeActions.scopeDetails('span');
const FinishScopeButton = activeScopeActions.finishScopeButton(Button);
