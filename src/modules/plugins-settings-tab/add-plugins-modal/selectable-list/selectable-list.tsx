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
import { BEM, div } from '@redneckz/react-bem-helper';
import {
  Badge, Icons, Inputs,
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
          <Plugin className="d-flex align-items-center g-4 p-4 w-100">
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
            <div className="d-flex flex-column align-items-start">
              <div className="d-flex align-items-center w-100">
                <PluginName>{name}</PluginName>
                {!available && <PluginRelation color="gray">Installed</PluginRelation>}
                {version && <PluginVersion>{version}</PluginVersion>}
              </div>
              <PluginDescription title={description}>
                {description}
              </PluginDescription>
            </div>
          </Plugin>
        </Element>
      ))}
    </div>
  ),
);

const Element = selectableList.element(div({} as { selected?: boolean }));
const PluginRelation = selectableList.pluginRelation(Badge);
const Plugin = selectableList.plugin('div');
const PluginsIcon = selectableList.pluginsIcon(div({} as { selected?: boolean }));
const PluginName = selectableList.pluginName('div');
const PluginVersion = selectableList.pluginVersion('div');
const PluginDescription = selectableList.pluginDescription('span');
