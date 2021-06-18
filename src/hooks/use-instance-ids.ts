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
import { useEffect, useState } from 'react';

import { InstancesInfo } from 'types/state-watcher';

export function useInstanceIds(instancesIds: string[]) {
  const [observableInstances, setObservableInstances] = useState<InstancesInfo>([]);

  const toggleInstanceActiveStatus = (instanceId: string) => setObservableInstances(observableInstances
    .map((instance) => (instance.instanceId === instanceId
      ? ({ ...instance, isActive: !instance.isActive })
      : instance)));

  useEffect(() => {
    setObservableInstances(transformInstancesIds(instancesIds));
  }, [instancesIds.length]);

  return {
    observableInstances,
    toggleInstanceActiveStatus,
  };
}

function transformInstancesIds(instancesIds: string[]): InstancesInfo {
  const colors = ['#F9AE7D', '#76A5E3', '#D599FF', '#EE7785', '#67D5B5'];
  return instancesIds.map((instanceId, i) => ({ instanceId, isActive: true, color: colors[i] }));
}
