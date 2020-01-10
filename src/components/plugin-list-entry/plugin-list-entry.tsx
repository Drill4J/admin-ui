import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { FieldInputProps, FieldMetaState } from 'react-final-form';

import { Icons } from 'components';
import { Fields } from 'forms/fields';
import { Plugin } from 'types/plugin';

import styles from './plugin-list-entry.module.scss';

interface Props extends Plugin {
  className?: string;
  onClick?: () => void;
  input?: FieldInputProps<any>;
  meta?: FieldMetaState<any>;
  icon: keyof typeof Icons;
  children?: React.ReactNode;
}

const pluginListEntry = BEM(styles);

export const PluginListEntry = pluginListEntry(
  ({ className, input, meta, description, onClick, icon, children }: Props) => {
    const PluginIcon = Icons[icon];
    return (
      <div className={className}>
        <PluginElements onClick={onClick} selected={input && input.checked}>
          {input && meta && <Fields.Checkbox input={input} meta={meta} />}
          <PluginsIconWrapper selected={input && input.checked}>
            <PluginIcon />
          </PluginsIconWrapper>
          <div>
            {children}
            <PluginDescription>{description}</PluginDescription>
          </div>
        </PluginElements>
      </div>
    );
  },
);

const PluginElements = pluginListEntry.pluginElements(
  div({ onClick: () => {} } as { onClick?: () => void; selected?: boolean }),
);
const PluginsIconWrapper = pluginListEntry.pluginsIconWrapper(div({} as { selected?: boolean }));
const PluginDescription = pluginListEntry.pluginDescription('span');
