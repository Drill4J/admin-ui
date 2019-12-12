import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Modal } from 'components';
import { Button } from 'forms';
import { useWsConnection } from 'hooks';
import { defaultAdminSocket } from 'common/connection';
import { NotificationManagerContext } from 'notification-manager';
import { SelectableList } from './selectable-list';
import { loadPlugins } from './load-plugins';
import { Plugin } from 'types/plugin';

import styles from './add-plugins-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (arg: boolean) => void;
  agentId: string;
}

const addPluginModal = BEM(styles);

export const AddPluginsModal = addPluginModal(({ className, isOpen, onToggle, agentId }: Props) => {
  const [selectedPlugins, setSelectedPlugins] = React.useState<string[]>([]);
  const { showMessage } = React.useContext(NotificationManagerContext);
  const plugins = useWsConnection<Plugin[]>(defaultAdminSocket, '/get-all-plugins');
  const handleLoadPlugins = loadPlugins(agentId, {
    onSuccess: () => onToggle(false),
    onError: (message: string) => showMessage({ type: 'ERROR', text: message }),
  });

  return (
    <Modal isOpen={isOpen} onToggle={onToggle}>
      <div className={className}>
        <Header>Add new plugin</Header>
        <Content>
          <PluginsList>
            <SelectableList
              data={plugins || []}
              idKey="id"
              selectedRows={selectedPlugins}
              onSelect={setSelectedPlugins}
            />
          </PluginsList>
        </Content>
        <Actions>
          <AddPluginButton
            type="primary"
            onClick={() => handleLoadPlugins(selectedPlugins)}
            disabled={selectedPlugins.length === 0}
          >
            Add plugin
          </AddPluginButton>
          <CandelButton type="secondary" onClick={() => onToggle(!isOpen)}>
            Cancel
          </CandelButton>
        </Actions>
      </div>
    </Modal>
  );
});

const Header = addPluginModal.header('div');
const Content = addPluginModal.content('div');
const PluginsList = addPluginModal.pluginsList('div');
const Actions = addPluginModal.actions('div');
const AddPluginButton = addPluginModal.addPluginButton(Button);
const CandelButton = addPluginModal.cancelButton(Button);
