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
import { Button, Icons, Spinner } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { ActiveSession } from 'types/active-session';
import { useSessionsPaneDispatch, useSessionsPaneState, setIsNewSession } from '../store';

const Content = styled.div`
  ${tw`grid gap-4 items-center h-full`}
  grid-template-columns: max-content max-content max-content;
`;

interface Props {
  activeSessions: ActiveSession[];
  startSessionDisabled: boolean;
  onToggle: (value: boolean) => void;
  handleSubmit: () => void;
  submitting: boolean;
}

export const ActionsPanel = ({
  activeSessions, onToggle, startSessionDisabled, handleSubmit, submitting,
}: Props) => {
  const dispatch = useSessionsPaneDispatch();
  const { singleOperation, isNewSession } = useSessionsPaneState();

  return (
    <Content>
      { isNewSession ? (
        <Button
          tw="flex justify-center items-center gap-x-1 w-31"
          primary
          size="large"
          disabled={startSessionDisabled || submitting}
          onClick={handleSubmit}
          data-test="sessions-management-pane:start-session-button"
        >
          {submitting ? <Spinner disabled /> : 'Start Session'}
        </Button>
      ) : (
        <Button
          primary
          size="large"
          onClick={(e: any) => {
            e.preventDefault();
            dispatch(setIsNewSession(true));
          }}
          data-test="sessions-management-pane:start-new-session-button"
          disabled={Boolean(singleOperation.id)}
        >
          Start New Session
        </Button>
      )}
      { activeSessions.length > 0 && isNewSession && (
        <Button
          tw="flex gap-x-2"
          secondary
          size="large"
          onClick={() => dispatch(setIsNewSession(false))}
          data-test="sessions-management-pane:back-button"
        >
          <Icons.Expander width={8} height={14} rotate={180} />
          <span>Back</span>
        </Button>
      )}
      <Button
        secondary
        size="large"
        onClick={() => onToggle(false)}
        data-test="sessions-management-pane:cancel-button"
      >
        Cancel
      </Button>
    </Content>
  );
};
