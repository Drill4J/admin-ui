import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import { Field } from 'react-final-form';

import { Panel } from 'layouts';
import { Icons, PluginPresentor } from 'components';
import { Fields } from 'forms';
import { useWsConnection } from 'hooks';
import { defaultAdminSocket } from 'common/connection';
import { Plugin } from 'types/plugin';

import styles from './install-plugins-step.module.scss';

interface Props {
  className?: string;
  formValues?: { plugins?: string[] };
}

const installPluginsStep = BEM(styles);

export const InstallPluginsStep = installPluginsStep(
  ({ className, formValues: { plugins: pluginsFormValue = [] } = {} }: Props) => {
    const plugins = useWsConnection<Plugin[]>(defaultAdminSocket, '/get-all-plugins') || [];
    return (
      <div className={className}>
        <InfoPanel align="space-between">
          <Panel>
            <InfoIcon />
            Choose plugins to install on your agent. You will also be able to add them later on
            Agent’s page or Plugins Library.
          </Panel>
        </InfoPanel>
        <SelectedPluginsInfo>
          {pluginsFormValue.length} of {plugins.length} selected
        </SelectedPluginsInfo>
        <PluginsList>
          {plugins.map(({ id = '', name, description }) => (
            <Field
              name="plugins"
              type="checkbox"
              value={id}
              key={id}
              render={({ input, meta }) => (
                <PluginPresentor
                  selected={input.checked}
                  checkbox={<Fields.Checkbox input={input} meta={meta} />}
                  name={name}
                  description={description}
                />
              )}
            />
          ))}
        </PluginsList>
      </div>
    );
  },
);

const InfoPanel = installPluginsStep.infoPanel(Panel);
const InfoIcon = installPluginsStep.infoIcon(Icons.Info);
const SelectedPluginsInfo = installPluginsStep.selectedPluginsInfo('div');
const PluginsList = installPluginsStep.pluginsList('div');
