import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import axios from 'axios';

import { WsConnection } from '../../../common/connection';
import { Modal, Button } from '../../../components';
import { SelectableList } from './selectable-list';

import styles from './add-plugins-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (arg: boolean) => void;
  agentId: string;
}

const addPluginModal = BEM(styles);

export const AddPluginsModal = addPluginModal(({ className, isOpen, onToggle, agentId }: Props) => {
  const [plugins, setPlugins] = React.useState([]);
  const [selectedPlugins, setSelectedPlugins] = React.useState<string[]>([]);

  React.useEffect(() => {
    const connection = new WsConnection().onOpen(() => {
      connection.subscribe('/get-all-plugins', setPlugins);
    });

    return () => {
      connection.unsubscribe('/get-all-plugins');
    };
  }, []);

  return (
    <Modal isOpen={isOpen} onToggle={onToggle}>
      <div className={className}>
        <Header>Add new plugin</Header>
        <Content>
          <PluginsList>
            <SelectableList
              data={[
                {
                  name: 'Custom plugin',
                  id: 'custom',
                  description: 'This is the awesome custom plugin',
                },
                {
                  name: 'Exceptions pligun',
                  id: 'except-ions',
                  description: 'Plugin for catching exceptions',
                },
              ]}
              idKey="id"
              selectedRows={selectedPlugins}
              onSelect={setSelectedPlugins}
            />
          </PluginsList>
        </Content>
        <Actions>
          <AddPluginButton
            type="primary"
            onClick={() =>
              loadPlugins({
                agentId,
                selectedPlugins,
                setSelectedPlugins,
                setIsAddPluginOpen: onToggle,
              })
            }
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

const loadPlugins = ({
  agentId,
  selectedPlugins,
  setSelectedPlugins,
  setIsAddPluginOpen,
}: {
  agentId: string;
  selectedPlugins: string[];
  setSelectedPlugins: (arg: any) => any;
  setIsAddPluginOpen: (arg: any) => any;
}) => {
  selectedPlugins.map((pluginId) => {
    axios.post(`/agents/${agentId}/load-plugin`, { pluginId });
  });
  setSelectedPlugins([]);
  setIsAddPluginOpen(false);
};
