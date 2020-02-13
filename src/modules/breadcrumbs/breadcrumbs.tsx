import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import {
  useLocation, matchPath, Link,
} from 'react-router-dom';

import styles from './breadcrumbs.module.scss';

interface Props {
  className?: string;
}

const breadcrumbs = BEM(styles);

type MatchType = {
  agentId: string;
  pluginId: string;
  serviceGroupId: string;
  settings: string;
  agentType: string;
  registrationType: string;
  buildVersion: string;
  page: string;
  scopeId: string;
};

export const Breadcrumbs = breadcrumbs(({ className }: Props) => {
  const { pathname } = useLocation();
  const {
    params: {
      agentId = '',
      settings = '',
      agentType = '',
      registrationType = '',
      buildVersion = '',
      pluginId = '',
      serviceGroupId = '',
      page = '',
      scopeId = '',
    } = {},
  } = matchPath<MatchType>(pathname, {
    path: [
      '/:registrationType/:agentId',
      '/agents/:agentType/:agentId/:settings',
      '/service-group-full-page/:serviceGroupId/:pluginId',
      '/full-page/:agentId/:buildVersion/',
      '/full-page/:agentId/:buildVersion/:pluginId/',
      '/full-page/:agentId/:buildVersion/:pluginId/:page/',
      '/full-page/:agentId/:buildVersion/:pluginId/:page/:scopeId',
    ],
    exact: true,
  }) || {};

  return (
    <div className={className}>
      {(agentId || serviceGroupId) && <Crumb to="/">Agents</Crumb>}
      {settings &&
        <Crumb to={`/agents/${agentType}/${agentId}/settings`}>{agentType === 'service-group' ? 'Service Group' : 'Agent'} Settings</Crumb>}
      {registrationType === 'registration' && <Crumb to="/">Agent registration</Crumb>}
      {registrationType === 'bulk-registration' && <Crumb to="/">Agents registration</Crumb>}
      {buildVersion && pluginId === 'dashboard' && <Crumb to={`/full-page/${agentId}/${buildVersion}/dashboard`}>Agent: Dashboard</Crumb>}
      {buildVersion && pluginId !== 'dashboard'
        && <Crumb to={`/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard`}>Agent: Test2Code</Crumb>}
      {serviceGroupId &&
        pluginId === 'service-group-dashboard' &&
          <Crumb to={`/service-group-full-page/${serviceGroupId}/serice-group-dashboard`}>Service Group: Dashboard</Crumb>}
      {serviceGroupId &&
        pluginId !== 'service-group-dashboard'
          && <Crumb to={`/service-group-full-page/${serviceGroupId}/serice-group-dashboard`}>Service Group: Test2Code</Crumb>}
      {buildVersion && <Crumb to={`/full-page/${agentId}/build-list`}>All builds</Crumb>}
      {buildVersion && buildVersion !== 'build-list'
        && <Crumb to={`/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard`}>{buildVersion}</Crumb>}
      {page === 'scopes' && <Crumb to={`/full-page/${agentId}/${buildVersion}/${pluginId}/scopes`}>Scopes</Crumb>}
      {scopeId && <Crumb to={`/full-page/${agentId}/${buildVersion}/${pluginId}/scopes/${scopeId}`}>{scopeId}</Crumb>}
    </div>
  );
});

const Crumb = breadcrumbs.crumb(Link);
