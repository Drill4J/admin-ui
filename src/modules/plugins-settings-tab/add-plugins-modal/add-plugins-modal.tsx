import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Modal, Button } from '@drill4j/ui-kit';
import { useParams } from 'react-router-dom';

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
  const { showMessage } = React.useContext(NotificationManagerContext);
  const { type } = useParams<{ type: 'service-group' | 'agent' }>();
  const handleLoadPlugins = loadPlugins(
    `/${type === 'agent' ? 'agents' : 'service-groups'}/${agentId}/plugins`, {
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
            type="primary"
            size="large"
            onClick={() => handleLoadPlugins(selectedPlugins)}
            disabled={selectedPlugins.length === 0}
          >
            Add plugin
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
