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
import { ReactElement, useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';

import { useAgent } from '../../hooks';
import { usePluginDispatch, setInitialConfig, setAgent } from './store';

interface Props {
  children?: ReactElement;
}

export const InitialConfigController = ({ children }: Props) => {
  const { pathname } = useLocation();
  const { params: { agentId = '', buildVersion = '', pluginId = '' } = {} } = matchPath<{
    agentId: string;
    pluginId: string;
    buildVersion: string;
  }>(pathname, {
    path: '/full-page/:agentId/:buildVersion/:pluginId',
  }) || {};
  const agent = useAgent(agentId) || {};

  const dispatch = usePluginDispatch();
  useEffect(() => {
    dispatch(
      setInitialConfig({
        agentId,
        pluginId,
        buildVersion,
      }),
    );
    dispatch(setAgent(agent));
    // eslint-disable-next-line
  }, [buildVersion]);
  return children as ReactElement<unknown>;
};
