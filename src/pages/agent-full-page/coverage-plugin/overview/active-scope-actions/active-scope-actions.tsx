import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from '../../../../../layouts';
import { Icons, Menu } from '../../../../../components';
import { Button } from '../../../../../forms';
import { useBuildVersion } from '../../use-build-version';
import { useCoveragePluginDispatch, openModal } from '../../store';
import { ScopeSummary } from '../../../../../types/scope-summary';

import styles from './active-scope-actions.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
}

const activeScopeActions = BEM(styles);

export const ActiveScopeActions = withRouter(
  activeScopeActions(({ className }: Props) => {
    const scope = useBuildVersion<ScopeSummary>('/active-scope');
    const dispatch = useCoveragePluginDispatch();

    return (
      <div className={className}>
        <Panel>
          <FinishScopeButton
            type="primary"
            onClick={() => dispatch(openModal('FinishScopeModal', scope))}
          >
            <Icons.Check height={10} width={14} />
            Finish scope
          </FinishScopeButton>
          <Menu
            items={[
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

const FinishScopeButton = activeScopeActions.finishScopeButton(Button);
