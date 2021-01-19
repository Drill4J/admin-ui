import { BEM } from '@redneckz/react-bem-helper';
import { Field } from 'react-final-form';
import { Panel, Icons } from '@drill4j/ui-kit';

import { PluginListEntry } from 'components';
import { useWsConnection } from 'hooks';
import { defaultAdminSocket } from 'common/connection';
import { Plugin } from 'types/plugin';

import styles from './install-plugins-step.module.scss';

interface Props {
  className?: string;
  formValues?: { plugins?: string[] };
  infoPanel?: React.ReactNode;
}

const installPluginsStep = BEM(styles);

export const InstallPluginsStep = installPluginsStep(
  ({ className, infoPanel, formValues: { plugins: pluginsFormValue = [] } = {} }: Props) => {
    const plugins = useWsConnection<Plugin[]>(defaultAdminSocket, '/plugins') || [];
    return (
      <div className={className}>
        {infoPanel}
        <SelectedPluginsInfo>
          {pluginsFormValue.length}
          &nbsp;of&nbsp;
          {plugins.length}
          &nbsp;selected
        </SelectedPluginsInfo>
        <PluginsList>
          {plugins.map(({
            id = '', name, description, version,
          }) => (
            <Field
              name="plugins"
              type="checkbox"
              value={id}
              key={id}
              render={({ input, meta }) => (
                <PluginListEntry
                  description={description}
                  input={input}
                  meta={meta}
                  icon={name as keyof typeof Icons}
                  onClick={() => input.onChange({
                    target: {
                      type: 'checkbox',
                      checked: !input.checked,
                    },
                  })}
                >
                  <PluginInfo>
                    <PluginName>{name}&nbsp;</PluginName>
                    {version && <PluginVersion>({version})</PluginVersion>}
                  </PluginInfo>
                </PluginListEntry>
              )}
            />
          ))}
        </PluginsList>
      </div>
    );
  },
);

const SelectedPluginsInfo = installPluginsStep.selectedPluginsInfo('div');
const PluginsList = installPluginsStep.pluginsList('div');
const PluginInfo = installPluginsStep.pluginInfo(Panel);
const PluginName = installPluginsStep.pluginName('div');
const PluginVersion = installPluginsStep.pluginVersion('div');
