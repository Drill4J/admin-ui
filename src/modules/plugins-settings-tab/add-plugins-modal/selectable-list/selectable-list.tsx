import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import {
  Badge, Icons, Inputs, Panel,
} from '@drill4j/ui-kit';

import { Plugin as PluginType } from 'types/plugin';

import styles from './selectable-list.module.scss';

interface Props {
  className?: string;
  plugins: PluginType[];
  footer?: React.ReactNode;
  selectedRows: string[];
  onSelect: (selectedItems: string[]) => void;
}

const selectableList = BEM(styles);

export const SelectableList = selectableList(
  ({
    className, plugins, onSelect, selectedRows,
  }: Props) => (
    <div className={className}>
      {plugins.map(({
        id = '', available, description, version, name,
      }) => (
        <Element key={id} selected={selectedRows.includes(id)}>
          <Plugin verticalAlign="center">
            {available && (
              <Inputs.Checkbox
                onChange={() => {
                  selectedRows.includes(id)
                    ? onSelect(selectedRows.filter((selectedItem) => selectedItem !== id))
                    : onSelect([...selectedRows, id]);
                }}
                checked={selectedRows.includes(id)}
              />
            )}
            <PluginsIcon selected={selectedRows.includes(id)}>
              <Icons.Test2Code />
            </PluginsIcon>
            <Panel direction="column" verticalAlign="start">
              <Panel>
                <PluginName>{name}</PluginName>
                {!available && <PluginRelation color="gray">Installed</PluginRelation>}
                {version && <PluginVersion>{version}</PluginVersion>}
              </Panel>
              <PluginDescription title={description}>
                {description}
              </PluginDescription>
            </Panel>
          </Plugin>
        </Element>
      ))}
    </div>
  ),
);

const Element = selectableList.element(div({} as { selected?: boolean }));
const PluginRelation = selectableList.pluginRelation(Badge);
const Plugin = selectableList.plugin(Panel);
const PluginsIcon = selectableList.pluginsIcon(div({} as { selected?: boolean }));
const PluginName = selectableList.pluginName('div');
const PluginVersion = selectableList.pluginVersion('div');
const PluginDescription = selectableList.pluginDescription('span');
