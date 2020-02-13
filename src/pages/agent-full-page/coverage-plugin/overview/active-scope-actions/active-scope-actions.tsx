import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams, useHistory } from 'react-router-dom';

import { Panel } from 'layouts';
import { Icons, Menu } from 'components';
import { Button } from 'forms';
import { ScopeSummary } from 'types/scope-summary';
import { useBuildVersion } from '../../use-build-version';
import { usePluginState } from '../../../store';
import { useCoveragePluginDispatch, openModal } from '../../store';

import styles from './active-scope-actions.module.scss';

interface Props {
  className?: string;
}

const activeScopeActions = BEM(styles);

export const ActiveScopeActions = activeScopeActions(({ className }: Props) => {
  const {
    agentId,
    buildVersion: { id: buildVersion },
  } = usePluginState();
  const { push } = useHistory();
  const scope = useBuildVersion<ScopeSummary>('/active-scope');
  const dispatch = useCoveragePluginDispatch();
  const { pluginId } = useParams();

  return (
    <div className={className}>
      <Panel>
        <ScopeDetails
          onClick={() => push(`/full-page/${agentId}/${buildVersion}/${pluginId}/scopes/${scope && scope.id}`)}
        >
            Scope details &gt;
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
});

const ScopeDetails = activeScopeActions.scopeDetails('span');
const FinishScopeButton = activeScopeActions.finishScopeButton(Button);
