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
import { FieldInputProps, FieldMetaState } from 'react-final-form';
import { Icons } from '@drill4j/ui-kit';

import { Fields } from 'forms/fields';

import styles from './plugin-list-entry.module.scss';

interface Props {
  className?: string;
  onClick?: () => void;
  input?: FieldInputProps<string>;
  meta?: FieldMetaState<string>;
  icon: keyof typeof Icons;
  description?: string;
  children?: React.ReactNode;
}

const pluginListEntry = BEM(styles);

export const PluginListEntry = pluginListEntry(
  ({
    className, input, meta, description, onClick, icon, children,
  }: Props) => {
    const PluginIcon = Icons[icon] || Icons.Plugins;
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
