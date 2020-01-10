import * as React from 'react';
import { BEM, div, span } from '@redneckz/react-bem-helper';

import { Icons } from 'components';
import { Inputs } from '../../../../../../forms';

import styles from './selectable-list.module.scss';

interface Props {
  className?: string;
  data: Array<{ [key: string]: any }>;
  idKey: string;
  footer?: React.ReactNode;
  selectedRows: string[];
  onSelect: (selectedItems: any) => any;
}

const selectableList = BEM(styles);

export const SelectableList = selectableList(
  ({ className, data, onSelect, idKey, selectedRows }: Props) => {
    return (
      <div className={className}>
        {data.map((plugin) => (
          <Element key={plugin[idKey]} selected={selectedRows.includes(plugin[idKey])}>
            <PluginRelation relation={plugin.relation}>{plugin.relation}</PluginRelation>
            <Plugin
              selected={selectedRows.includes(plugin[idKey])}
              selectable={plugin.relation !== 'Installed'}
            >
              {plugin.relation !== 'Installed' && (
                <Inputs.Checkbox
                  onChange={() => {
                    selectedRows.includes(plugin[idKey])
                      ? onSelect(
                          selectedRows.filter((selectedItem) => selectedItem !== plugin[idKey]),
                        )
                      : onSelect([...selectedRows, plugin[idKey]]);
                  }}
                  checked={selectedRows.includes(plugin[idKey])}
                />
              )}
              <PluginsIconWrapper selected={selectedRows.includes(plugin[idKey])}>
                <Icons.TestToCodeMapping />
              </PluginsIconWrapper>
              <PluginName>{plugin.name}</PluginName>
            </Plugin>
          </Element>
        ))}
      </div>
    );
  },
);

const Element = selectableList.element(div({} as { selected?: boolean }));
const PluginRelation = selectableList.pluginRelation(
  span({ relation: 'Installed' } as { relation?: 'Installed' | 'New' }),
);
const Plugin = selectableList.plugin(div({} as { selected?: boolean; selectable?: boolean }));
const PluginsIconWrapper = selectableList.pluginsIconWrapper(div({} as { selected?: boolean }));
const PluginName = selectableList.pluginName('div');
