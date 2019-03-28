import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import axios from 'axios';

import { Modal, Button } from '../../../components';
import { SelectableList } from './selectable-list';
import { useWsConnection } from '../../../hooks';
import { Plugin } from '../../../types/plugin';

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
  const plugins = useWsConnection<Plugin[]>('/get-all-plugins');

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
