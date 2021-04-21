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
import {
  Link, useHistory, useLocation, matchPath,
} from 'react-router-dom';
import tw, { styled } from 'twin.macro';

interface CrumbType {
  label: string;
  link?: string;
  state?: { label: string; buildVersion: string; pluginId: string };
}

const modalsAndTabs = ['session-management-pane', 'quality-gate-pane', 'risks-modal', 'associated-test-modal',
  'tests-to-run-modal', 'finish-all-scopes-modal', 'covered-methods-modal', 'methods', 'tests', 'notification-sidebar'];

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

const BreadcrumbsContainer = styled.div`
  & > * {
    :last-child {
    ${tw`text-monochrome-default`};
  }

  :not(:first-child):before {
    padding: 0 8px;
    ${tw`text-monochrome-default`};
    content: '/';
  }

  :not(:last-child) {
    &:hover {
      ${tw`text-blue-medium-tint`};
    }

    &:active {
        ${tw`text-blue-shade`};
      }
    }
  }
`;

export const Breadcrumbs = () => {
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
      '/agents/:agentType/:agentId/:settings/:tab',
      '/agents/:agentType/:agentId/:settings/:tab/:modal',
      '/service-group-full-page/:serviceGroupId/:pluginId',
      '/service-group-full-page/:serviceGroupId/:pluginId/:modal',
      '/full-page/:agentId/:buildVersion/',
      '/full-page/:agentId/:buildVersion/:pluginId/',
      '/full-page/:agentId/:buildVersion/:pluginId/:page/',
      '/full-page/:agentId/:buildVersion/:pluginId/:page/:scopeId',
      '/full-page/:agentId/:buildVersion/:pluginId/:page/:scopeId/:tab',
      '/full-page/:agentId/:buildVersion/:pluginId/:page/:scopeId/:tab/:modal',
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
    { label: 'Agents', link: (agentId || serviceGroupId) && agentId !== 'notification-sidebar' ? '/' : '' },
    {
      label: `${agentType === 'service-group' ? 'Service Group' : 'Agent'} Settings`,
      link: settings ? `/agents/${agentType}/${agentId}/settings/general` : '',
    },
    {
      label: registrationLabel(),
      link: registrationType && agentId !== 'notification-sidebar' ? '/' : '',
    },
    {
      label: 'Agent: Dashboard',
      link: buildVersion && pluginId === 'dashboard' ? `/full-page/${agentId}/${buildVersion}/dashboard` : '',
    },
    {
      label: 'Agent: Test2Code',
      link: buildVersion && buildVersion !== 'build-list' && pluginId !== 'dashboard'
        ? `/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard/methods`
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
      link: buildVersion && buildVersion !== 'build-list' ? `/full-page/${agentId}/${buildVersion}/${pluginId}/dashboard/methods` : '',
    },
    {
      label: 'All scopes',
      link: page === 'scopes' || page === 'scope' ? `/full-page/${agentId}/${buildVersion}/${pluginId}/scopes` : '',
    },
    {
      label: `${scopeId}`,
      link: scopeId && !modalsAndTabs.includes(scopeId) ? `/full-page/${agentId}/${buildVersion}/${pluginId}/scope/${scopeId}/methods` : '',
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
            : `/full-page/${agentId}/${location.state.buildVersion}/${location.state.pluginId}/dashboard${
              location.state.pluginId === 'test2code' ? '/methods' : ''}`,
        };
      }
      return currentPageCrumb;
    });

  return (
    <BreadcrumbsContainer>
      {currentPageCrumbs.map(({ label, link, state }) => link && (
        <Link
          tw="inline-block max-w-200px text-ellipsis align-middle text-blue-default text-12 font-bold cursor-pointer no-underline"
          key={label}
          to={{ pathname: link, state }}
          title={label}
        >
          {label}
        </Link>
      ))}
    </BreadcrumbsContainer>
  );
};
