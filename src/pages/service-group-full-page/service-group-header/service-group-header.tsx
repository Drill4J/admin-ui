import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams, useHistory } from 'react-router-dom';

import { Icons } from 'components';
import { ServiceGroupSummary } from 'types/service-group-summary';
import { ReactComponent as LogoSvg } from './service-group-logo.svg';

import styles from './service-group-header.module.scss';

interface Props {
  className?: string;
  serviceGroup?: ServiceGroupSummary;
}

const serviceGroupHeader = BEM(styles);

export const ServiceGroupHeader = serviceGroupHeader(
  ({
    className,
    serviceGroup: { name, count } = {},
  }: Props) => {
    const { id = '' } = useParams();
    const { push } = useHistory();

    return (
      <div className={className}>
        <Logo />
        <Content>
          <AgentInfo>
            <ServiceGroupName>{name}</ServiceGroupName>
            <AgentsCount>
              {`${count} agents`}
            </AgentsCount>
          </AgentInfo>
          <SettingsButton
            onClick={() => push(`/agents/service-group/${id}/settings`)}
            data-test="service-group-header:settings-button"
          >
            <Icons.Settings />
          </SettingsButton>
        </Content>
      </div>
    );
  },
);

const Logo = serviceGroupHeader.logo(LogoSvg);
const Content = serviceGroupHeader.content('div');
const AgentInfo = serviceGroupHeader.agentInfo('div');
const ServiceGroupName = serviceGroupHeader.serviceGroupName('div');
const AgentsCount = serviceGroupHeader.agentsCount('div');
const SettingsButton = serviceGroupHeader.settingsButton('div');
