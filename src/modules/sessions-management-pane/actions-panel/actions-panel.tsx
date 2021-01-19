import { BEM } from '@redneckz/react-bem-helper';
import { Button, Icons } from '@drill4j/ui-kit';

import { ActiveSession } from 'types/active-session';
import { useSessionsPaneDispatch, useSessionsPaneState, setIsNewSession } from '../store';

import styles from './actions-panel.module.scss';

const actionsPanel = BEM(styles);

interface Props {
  className?: string;
  activeSessions: ActiveSession[];
  startSessionDisabled: boolean;
  onToggle: (value: boolean) => void;
  handleSubmit: () => void
}

export const ActionsPanel = actionsPanel(
  ({
    className, activeSessions, onToggle, startSessionDisabled, handleSubmit,
  }: Props) => {
    const dispatch = useSessionsPaneDispatch();
    const { singleOperation, isNewSession } = useSessionsPaneState();

    return (
      <div className={className}>
        { isNewSession ? (
          <Button
            type="primary"
            size="large"
            disabled={startSessionDisabled}
            onClick={handleSubmit}
            data-test="sessions-management-pane:start-session-button"
          >
            Start Session
          </Button>
        ) : (
          <Button
            type="primary"
            size="large"
            onClick={() => dispatch(setIsNewSession(true))}
            data-test="sessions-management-pane:start-new-session-button"
            disabled={Boolean(singleOperation.id)}
          >
            Start New Session
          </Button>
        )}
        { activeSessions.length > 0 && isNewSession && (
          <Button
            type="secondary"
            size="large"
            onClick={() => dispatch(setIsNewSession(false))}
            data-test="sessions-management-pane:back-button"
          >
            <Icons.Expander width={8} height={14} rotate={180} />
            <span>Back</span>
          </Button>
        )}
        <Button
          type="secondary"
          size="large"
          onClick={() => onToggle(false)}
          data-test="sessions-management-pane:cancel-button"
        >
          Cancel
        </Button>
      </div>
    );
  },
);
