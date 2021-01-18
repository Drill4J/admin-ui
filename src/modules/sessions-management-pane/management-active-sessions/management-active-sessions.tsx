import { LinkButton, Panel } from '@drill4j/ui-kit';
import { BEM } from '@redneckz/react-bem-helper';
import { Field } from 'react-final-form';

import { Fields } from 'forms';
import { ActiveSession } from 'types/active-session';
import { useSessionsPaneDispatch, useSessionsPaneState, setBulkOperation } from '../store';

import styles from './management-active-sessions.module.scss';

interface Props {
  className?: string;
  activeSessions: ActiveSession[];
}

const managementActiveSessions = BEM(styles);

export const ManagementActiveSessions = managementActiveSessions(({ className, activeSessions }: Props) => {
  const dispatch = useSessionsPaneDispatch();
  const { bulkOperation, singleOperation } = useSessionsPaneState();
  const disabled = bulkOperation.isProcessing || Boolean(singleOperation.id);

  return (
    <div className={className} data-test="management-active-sessions:search-panel">
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
              data-test="management-active-sessions:abort-all"
              disabled={disabled}
            >
              Abort all
            </LinkButton>
            <LinkButton
              size="small"
              onClick={() => dispatch(setBulkOperation('finish', true))}
              data-test="management-active-sessions:finish-all"
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

const Count = managementActiveSessions.count('span');
const ActionsPanel = managementActiveSessions.actionsPanel('div');
const Content = managementActiveSessions.content('div');
