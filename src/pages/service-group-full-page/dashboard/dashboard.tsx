import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Plugin } from 'types/plugin';
import { ServiceGroupSummary } from 'types/service-group-summary';
import { usePluginData } from '../use-plugin-data';
import { PluginCard } from './plugin-card';
import {
  CoverageSection, RisksSection, TestsToRunSection,
} from './sections';


import styles from './dashboard.module.scss';

interface Props {
  className?: string;
  serviceGroupId: string;
  plugins: Plugin[];
}

const dashboard = BEM(styles);

export const Dashboard = dashboard(({
  className, serviceGroupId, plugins,
}: Props) => (
  <div className={className}>
    <Header>Dashboard</Header>
    <Content>
      {plugins.map(({ id: pluginId = '', name }) => {
        const serviceGroup = usePluginData<ServiceGroupSummary>(serviceGroupId, pluginId) || {};

        return (
          <PluginCard
            label={name}
            pluginLink={`/service-group-full-page/${serviceGroupId}/${pluginId}/dashboard`}
            key={pluginId}
          >
            <CoverageSection coverage={serviceGroup?.aggregatedData?.coverage} arrow={serviceGroup?.aggregatedData?.arrow} />
            <RisksSection risks={serviceGroup?.aggregatedData?.risks} />
            <TestsToRunSection testsToRun={serviceGroup?.aggregatedData?.testsToRun} />
          </PluginCard>
        );
      })}
    </Content>
  </div>
));

const Header = dashboard.header('div');
const Content = dashboard.content('div');
