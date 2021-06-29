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
import { Dispatch, SetStateAction, useContext } from 'react';
import { Button, Icons, Spinner } from '@drill4j/ui-kit';
import axios from 'axios';
import 'twin.macro';

import { NotificationManagerContext } from 'notification-manager';
import { StateWatcherData } from 'types/state-watcher';

interface Props {
  agentId: string;
  data: StateWatcherData;
  setData: Dispatch<SetStateAction<StateWatcherData>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  size: 'large' | 'small';
  onClick?: () => void;
}

export const MonitoringButton = ({
  agentId, data, setData, isLoading, setIsLoading, size, onClick,
}: Props) => {
  const { showMessage } = useContext(NotificationManagerContext);

  return (
    <Button
      style={{ minWidth: '178px' }}
      primary
      size={size}
      onClick={async () => {
        try {
          setIsLoading(true);
          const response = await axios.post(`/agents/${agentId}/plugins/state-watcher/dispatch-action`, {
            type: `${data.isMonitoring ? 'STOP' : 'START'}_RECORD`,
          });
          setData((prevState) => (
            {
              ...prevState,
              isMonitoring: response.data.data.payload.isMonitoring,
              breaks: response?.data?.data?.payload?.breaks || prevState.breaks,
            }));
          onClick && onClick();
          setIsLoading(false);
        } catch ({ response: { data: { message } = {} } = {} }) {
          showMessage({ type: 'ERROR', text: message || 'There is some issue with your action. Please try again.' });
          setIsLoading(false);
        }
      }}
    >
      {isLoading && <Spinner />}
      {!isLoading && data.isMonitoring && (
        <>
          <Icons.Pause />
          Pause
        </>
      )}
      {!isLoading && !data.isMonitoring && (
        <>
          <Icons.Play />
          Start
        </>
      )}
      &nbsp;Monitoring
    </Button>
  );
};
