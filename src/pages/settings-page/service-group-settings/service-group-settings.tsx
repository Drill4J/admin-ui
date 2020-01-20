import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { TabsPanel, Tab } from 'components';
import { Message } from 'types/message';
import { CommonEntity } from 'types/common-entity';
import { GeneralSettingsForm } from './general-settings-form';

import styles from './service-group-settings.module.scss';

interface Props {
  className?: string;
  showMessage: (message: Message) => void;
  serviceGroup: CommonEntity;
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
