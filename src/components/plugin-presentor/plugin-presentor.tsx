import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { Icons } from 'components';
import { Plugin } from 'types/plugin';

import styles from './plugin-presentor.module.scss';

interface Props extends Plugin {
  className?: string;
  selected?: boolean;
  checkbox?: React.ReactNode;
  onClick?: () => void;
}

const pluginPresentor = BEM(styles);

export const PluginPresentor = pluginPresentor(
  ({ className, selected, checkbox, name, description, onClick }: Props) => {
    return (
      <div className={className}>
        <PluginElements selected={selected}>
          {checkbox}
          <PluginsIconWrapper selected={selected}>
            <Icons.TestToCodeMapping />
          </PluginsIconWrapper>
          <div>
            <PluginName onClick={onClick}>{name}</PluginName>
            <PluginDescription>{description}</PluginDescription>
          </div>
        </PluginElements>
      </div>
    );
  },
);

const PluginElements = pluginPresentor.pluginElements(div({} as { selected?: boolean }));
const PluginsIconWrapper = pluginPresentor.pluginsIconWrapper(div({} as { selected?: boolean }));
const PluginName = pluginPresentor.pluginName(
  div({ onClick: () => {} } as { onClick?: () => void }),
);
const PluginDescription = pluginPresentor.pluginDescription('span');
