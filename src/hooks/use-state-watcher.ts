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
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { defaultStateWatcherPluginSocket } from 'common/connection/default-ws-connection';
import { NotificationManagerContext } from 'notification-manager';
import { StateWatcherData } from 'types/state-watcher';

interface Payload {
  instanceIds: string[];
  from: number;
  to: number;
}

export function useStateWatcher(agentId: string, buildVersion: string, payload: Payload) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<StateWatcherData>({
    isMonitoring: false,
    maxHeap: 0,
    start: 0,
    brakes: [],
    series: [],
  });

  const { showMessage } = useContext(NotificationManagerContext);

  useEffect(() => {
    function handleDataChange(newData: StateWatcherData) {
      newData && setData((prevState) => ({
        ...prevState,
        ...newData,
        series: prevState.series.length > 0
          ? prevState.series.map(({ instanceId, data: prevSeriesData }) => ({
            instanceId,
            data: [
              ...prevSeriesData,
              ...(newData.series.find(
                ({ instanceId: newDataInstanceId }) => newDataInstanceId === instanceId,
              )?.data || []),
            ],
          }))
          : newData.series,
      }));
    }

    const unsubscribe = defaultStateWatcherPluginSocket.subscribe(
      '/metrics/heap/update',
      handleDataChange,
      {
        agentId,
        buildVersion,
        type: 'AGENT',
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `/agents/${agentId}/plugins/state-watcher/dispatch-action`,
          {
            type: 'RECORD_DATA',
            payload,
          },
        );
        const responseData: StateWatcherData = response.data.data;

        setData(responseData);

        setIsLoading(false);
      } catch ({ response: { data: { message } = {} } = {} }) {
        showMessage({ type: 'ERROR', text: message || 'There is some issue with your action. Please try again.' });
        setIsLoading(false);
      }
    })();
  }, [payload?.from, payload?.to, payload?.instanceIds.length]);

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
  };
}
