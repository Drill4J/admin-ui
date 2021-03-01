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
import { useContext, useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Modal, Button, Spinner } from '@drill4j/ui-kit';
import { matchPath, useLocation } from 'react-router-dom';

import { NotificationManagerContext } from 'notification-manager';
import { Plugin } from 'types/plugin';
import { SelectableList } from './selectable-list';
import { loadPlugins } from './load-plugins';

import styles from './add-plugins-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (arg: boolean) => void;
  plugins: Plugin[];
  agentId: string;
  selectedPlugins: string[];
  setSelectedPlugins: (plugins: string[]) => void;
}

const addPluginModal = BEM(styles);

export const AddPluginsModal = addPluginModal(({
  className, isOpen, onToggle, plugins, agentId, setSelectedPlugins, selectedPlugins,
}: Props) => {
  const { showMessage } = useContext(NotificationManagerContext);
  const { pathname } = useLocation();
  const { params: { type = '' } = {} } = matchPath<{ type: 'service-group' | 'agent' }>(pathname, {
    path: '/agents/:type/:id/settings/:tab',
  }) || {};
  const [loading, setLoading] = useState(false);
  const handleLoadPlugins = loadPlugins(
    `/${type === 'agent' ? 'agents' : 'groups'}/${agentId}/plugins`, {
      onSuccess: () => {
        onToggle(false);
        showMessage({ type: 'SUCCESS', text: 'Plugin has been added' });
      },
      onError: () => showMessage({
        type: 'ERROR',
        text: 'On-submit error. Server problem or operation could not be processed in real-time',
      }),
    },
  );

  return (
    <Modal isOpen={isOpen} onToggle={onToggle}>
      <div className={className}>
        <Header>Add new plugin</Header>
        <Content>
          <Title>Choose one or more plugins:</Title>
          <PluginsList>
            <SelectableList
              plugins={plugins}
              selectedRows={selectedPlugins}
              onSelect={setSelectedPlugins}
            />
          </PluginsList>
        </Content>
        <Actions>
          <Button
            className="flex justify-center items-center gap-x-1 w-27"
            type="primary"
            size="large"
            onClick={async () => {
              setLoading(true);
              await handleLoadPlugins(selectedPlugins);
              setLoading(false);
            }}
            disabled={selectedPlugins.length === 0 || loading}
          >
            {loading ? <Spinner disabled /> : 'Add plugin'}
          </Button>
          <Button type="secondary" size="large" onClick={() => onToggle(!isOpen)}>
            Cancel
          </Button>
        </Actions>
      </div>
    </Modal>
  );
});

const Header = addPluginModal.header('div');
const Content = addPluginModal.content('div');
const Title = addPluginModal.title('div');
const PluginsList = addPluginModal.pluginsList('div');
const Actions = addPluginModal.actions('div');
