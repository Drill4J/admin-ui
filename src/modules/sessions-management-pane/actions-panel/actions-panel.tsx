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
import { Button, Icons, Spinner } from '@drill4j/ui-kit';

import { ActiveSession } from 'types/active-session';
import { useSessionsPaneDispatch, useSessionsPaneState, setIsNewSession } from '../store';

import styles from './actions-panel.module.scss';

const actionsPanel = BEM(styles);

interface Props {
  className?: string;
  activeSessions: ActiveSession[];
  startSessionDisabled: boolean;
  onToggle: (value: boolean) => void;
  handleSubmit: () => void;
  submitting: boolean;
}

export const ActionsPanel = actionsPanel(
  ({
    className, activeSessions, onToggle, startSessionDisabled, handleSubmit, submitting,
  }: Props) => {
    const dispatch = useSessionsPaneDispatch();
    const { singleOperation, isNewSession } = useSessionsPaneState();

    return (
      <div className={className}>
        { isNewSession ? (
          <Button
            className="flex justify-center items-center gap-x-1 w-31"
            type="primary"
            size="large"
            disabled={startSessionDisabled || submitting}
            onClick={handleSubmit}
            data-test="sessions-management-pane:start-session-button"
          >
            {submitting ? <Spinner disabled /> : 'Start Session'}
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
            className="flex gap-x-2"
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
