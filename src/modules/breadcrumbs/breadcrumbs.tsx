import { BEM } from '@redneckz/react-bem-helper';
import {
  Link, useHistory, useLocation, matchPath,
} from 'react-router-dom';

import styles from './breadcrumbs.module.scss';

interface Props {
  className?: string;
}

interface CrumbType {
  label: string;
  link?: string;
  state?: { label: string; buildVersion: string; pluginId: string };
}

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

const breadcrumbs = BEM(styles);

export const Breadcrumbs = breadcrumbs(({ className }: Props) => {
  const { location } = useHistory<{ label: string; buildVersion: string; pluginId: string }>();
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

  const registrationLabel = () => {
    switch (registrationType) {
      case 'bulk-registration':
        return 'Agents registration';
      case 'registration':
        return 'Agent registration';
      case 'preregister':
        return 'Preregister offline agent';
      default: return '';
    }
  };

  const crumbs: CrumbType[] = [
    { label: 'Agents', link: agentId || serviceGroupId ? '/' : '' },
    {
      label: `${agentType === 'service-group' ? 'Service Group' : 'Agent'} Settings`,
      link: settings ? `/agents/${agentType}/${agentId}/settings` : '',
    },
    {
      label: registrationLabel(),
      link: registrationType ? '/' : '',
    },
    {
      label: 'Agent: Dashboard',
      link: buildVersion && pluginId === 'dashboard' ? `/full-page/${agentId}/${buildVersion}/dashboard` : '',
    },
    {
      label: 'Agent: Test2Code',
      link: buildVersion && buildVersion !== 'build-list' && pluginId !== 'dashboard'
        ? `/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard`
        : '',
    },
    {
      label: 'Service Group: Dashboard',
      link: serviceGroupId &&
      pluginId === 'service-group-dashboard' ? `/service-group-full-page/${serviceGroupId}/serice-group-dashboard` : '',
    },
    {
      label: 'Service Group: Test2Code',
      link: serviceGroupId &&
      pluginId !== 'service-group-dashboard' ? `/service-group-full-page/${serviceGroupId}/serice-group-dashboard` : '',
    },
    {
      label: 'All builds',
      link: buildVersion ? `/full-page/${agentId}/build-list` : '',
      state: { label: pluginId && pluginId !== 'dashboard' ? 'Agent: Test2Code' : 'Agent: Dashboard', buildVersion, pluginId },
    },
    {
      label: `${buildVersion}`,
      link: buildVersion && buildVersion !== 'build-list' ? `/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard` : '',
    },
    {
      label: 'All scopes',
      link: page === 'scopes' ? `/full-page/${agentId}/${buildVersion}/${pluginId}/scopes` : '',
    },
    {
      label: `${scopeId}`,
      link: scopeId ? `/full-page/${agentId}/${buildVersion}/${pluginId}/scopes/${scopeId}` : '',
    },
    {
      label: 'Tests to Run',
      link: page === 'tests-to-run' ? `/full-page/${agentId}/${buildVersion}/${pluginId}/tests-to-run` : '',
    },
  ];

  const currentPageCrumbs = crumbs.filter(({ link, label }) => link
  || label === location.state?.label)
    .map((currentPageCrumb) => {
      if (currentPageCrumb.link === '') {
        return {
          ...currentPageCrumb,
          link: location.state?.label === 'Agent: Dashboard'
            ? `/full-page/${agentId}/${location.state.buildVersion}/dashboard`
            : `/full-page/${agentId}/${location.state.buildVersion}/${location.state.pluginId}/dashboard`,
        };
      }
      return currentPageCrumb;
    });

  return (
    <div className={className}>
      {currentPageCrumbs.map(({ label, link, state }) => link && (
        <Crumb
          key={label}
          to={{ pathname: link, state }}
          title={label}
        >
          {label}
        </Crumb>
      ))}
    </div>
  );
});

const Crumb = breadcrumbs.crumb(Link);
