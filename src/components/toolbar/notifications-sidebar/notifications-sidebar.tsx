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
import { useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { nanoid } from 'nanoid';
import { Icons, Modal, GeneralAlerts } from '@drill4j/ui-kit';

import { Notification as NotificationType } from 'types/notificaiton';
import { Notification } from './notification';
import { deleteAllNotifications, readAllNotifications } from './api';

import styles from './notifications-sidebar.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  notifications: NotificationType[];
}

const notificationsSidebar = BEM(styles);

export const NotificationsSidebar = notificationsSidebar(
  ({
    className,
    isOpen,
    onToggle,
    notifications,
  }: Props) => {
    const [errorMessage, setErrorMessage] = useState('');

    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Header>
            <Icons.Notification />
            <span>Notifications</span>
          </Header>
          {notifications.length > 0 ? (
            <Content>
              <ActionsPanel className="d-flex justify-content-end align-items-center w-100">
                <span
                  onClick={() => readAllNotifications({ onError: setErrorMessage })}
                  data-test="notification-sidebar:mark-all-as-read"
                >
                  Mark all as read
                </span>
                <span
                  onClick={() => deleteAllNotifications({ onError: setErrorMessage })}
                  data-test="notification-sidebar:clear-all"
                >
                  Clear all
                </span>
              </ActionsPanel>
              {errorMessage && (
                <GeneralAlerts type="ERROR">
                  {errorMessage}
                </GeneralAlerts>
              )}
              <NotificationsList>
                {notifications.map((notification) =>
                  <Notification notification={notification} key={nanoid()} onError={setErrorMessage} />)}
              </NotificationsList>
            </Content>
          ) : (
            <EmptyNotificationPanel>
              <Icons.Notification width={120} height={130} />
              <Title>There are no notifications</Title>
              <SubTitle>No worries, we’ll keep you posted!</SubTitle>
            </EmptyNotificationPanel>
          )}
        </div>
      </Modal>
    );
  },
);

const Header = notificationsSidebar.header('div');
const Content = notificationsSidebar.content('div');
const ActionsPanel = notificationsSidebar.actionsPanel('div');
const NotificationsList = notificationsSidebar.notificationsList('div');
const EmptyNotificationPanel = notificationsSidebar.emptyNotificationPanel('div');
const Title = notificationsSidebar.title('div');
const SubTitle = notificationsSidebar.subTitle('div');
