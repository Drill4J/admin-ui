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
import { StateWatcherData, InstancesInfoById, Series } from 'types/state-watcher';

export function useStateWatcher(agentId: string, buildVersion: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<StateWatcherData>({
    isMonitoring: false,
    maxHeap: 0,
    start: 0,
    brakes: [],
    series: [],
  });
  console.log(data);

  const [observableInstances, setObservableInstances] = useState<InstancesInfoById | null>(null);

  const toggleInstanceActiveStatus = (instanceId: string) =>
    setObservableInstances((prevState) =>
      (prevState
        ? {
          ...prevState,
          [instanceId]: {
            ...prevState[instanceId],
            isActive: !prevState[instanceId].isActive,
          },
        }
        : null));

  const { showMessage } = useContext(NotificationManagerContext);

  useEffect(() => {
    function handleDataChange(newData: StateWatcherData) {
      newData &&
        setData((prevState) => ({
          ...prevState,
          ...newData,
          series: prevState.series.map(({ instanceId, data: prevSeriesData }) => ({
            instanceId,
            data: [
              ...prevSeriesData,
              ...(newData.series.find(
                ({ instanceId: newDataInstanceId }) => newDataInstanceId === instanceId,
              )?.data || []),
            ].slice(-10),
          })),
        }));
    }

    (async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `/agents/${agentId}/plugins/state-watcher/dispatch-action`,
          {
            type: 'RECORD_DATA',
          },
        );
        const responseData: StateWatcherData = response.data.data;
        console.log(responseData.series[0].data.length);
        setData({ ...responseData, series: responseData.series.map((x) => ({ ...x, data: x.data.slice(-10) })) });

        responseData?.series && setObservableInstances(transformSeries(responseData.series));

        setIsLoading(false);
      } catch ({ response: { data: { message } = {} } = {} }) {
        showMessage(message || 'There is some issue with your action. Please try again.');
        setIsLoading(false);
      }
    })();

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

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    observableInstances,
    toggleInstanceActiveStatus,
  };
}

function transformSeries(series: Series): InstancesInfoById {
  return series.reduce((acc, { instanceId }, i) => {
    const colors = ['#F9AE7D', '#76A5E3', '#D599FF', '#EE7785', '#67D5B5'];
    return {
      ...acc,
      [instanceId]: {
        isActive: true,
        color: colors[i],
      },
    };
  }, {});
}
