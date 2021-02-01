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
import { defaultAdminSocket } from 'common/connection';

import { ServiceGroupEntity } from 'types/service-group-entity';

export function useServiceGroup(id: string) {
  const [data, setData] = useState<ServiceGroupEntity | null>(null);

  useEffect(() => {
    function handleDataChange(newData: ServiceGroupEntity) {
      setData(newData);
    }

    const unsubscribe = defaultAdminSocket.subscribe(
      `/api/groups/${id}`,
      handleDataChange,
    );

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, [id]);

  return data;
}
