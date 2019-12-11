import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { TabsPanel, Tab } from 'components';
import { GeneralSettingsForm } from './general-settings-form';
import { Message } from 'types/message';
import { ServiceGroup } from 'types/service-group';

import styles from './service-group-settings.module.scss';

interface Props {
  className?: string;
  showMessage: (message: Message) => void;
  serviceGroup: ServiceGroup;
  type?: string;
}

const agentSettings = BEM(styles);

export const ServiceGroupSettings = agentSettings(
  ({ className, showMessage, serviceGroup }: Props) => {
    const [selectedTab, setSelectedTab] = React.useState('general');
    return (
      <div className={className}>
        <Tabs activeTab={selectedTab} onSelect={setSelectedTab}>
          <Tab name="general">General</Tab>
        </Tabs>
        <GeneralSettingsForm serviceGroup={serviceGroup} showMessage={showMessage} />
      </div>
    );
  },
);

const Tabs = agentSettings.tabsPanel(TabsPanel);
