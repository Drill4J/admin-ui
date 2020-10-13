import * as React from 'react';
import { LinkButton, Panel } from '@drill4j/ui-kit';
import { BEM } from '@redneckz/react-bem-helper';
import { Field } from 'react-final-form';

import { Fields } from 'forms';
import { ActiveSession } from 'types/active-session';
import { useSessionsPaneDispatch, useSessionsPaneState, setBulkOperation } from '../store';

import styles from './manage-active-sessions.module.scss';

interface Props {
  className?: string;
  activeSessions: ActiveSession[];
}

const manageActiveSessions = BEM(styles);

export const ManageActiveSessions = manageActiveSessions(({ className, activeSessions }: Props) => {
  const dispatch = useSessionsPaneDispatch();
  const { bulkOperation, singleOperation } = useSessionsPaneState();
  const disabled = bulkOperation.isProcessing || Boolean(singleOperation.id);

  return (
    <div className={className} data-test="manage-active-sessions:search-panel">
      <Content>
        <Panel align="space-between">
          <span>
            Active Sessions
            <Count>{activeSessions.length}</Count>
          </span>
          <ActionsPanel>
            <LinkButton
              size="small"
              onClick={() => dispatch(setBulkOperation('abort', true))}
              data-test="manage-active-sessions:abort-all"
              disabled={disabled}
            >
              Abort all
            </LinkButton>
            <LinkButton
              size="small"
              onClick={() => dispatch(setBulkOperation('finish', true))}
              data-test="manage-active-sessions:finish-all"
              disabled={disabled}
            >
              Finish all
            </LinkButton>
          </ActionsPanel>
        </Panel>
        <form>
          <Field
            name="id"
            component={Fields.Search}
            placeholder="Search session by ID"
            disabled
          />
        </form>
      </Content>
    </div>
  );
});

const Count = manageActiveSessions.count('span');
const ActionsPanel = manageActiveSessions.actionsPanel('div');
const Content = manageActiveSessions.content('div');
