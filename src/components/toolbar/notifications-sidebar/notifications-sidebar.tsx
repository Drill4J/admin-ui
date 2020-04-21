import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import nanoid from 'nanoid';

import { Panel } from 'layouts';
import { Icons, Modal } from 'components';
import { Notification as NotificationType } from 'types/notificaiton';
import { Notification } from './notification/notification';

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
    const [errorMessage, setErrorMessage] = React.useState('');

    return (
      <Modal isOpen={isOpen} onToggle={onToggle}>
        <div className={className}>
          <Header>
            <Icons.Notification />
            <span>Notifications</span>
          </Header>
          {notifications.length > 0 ? (
            <Content>
              <ActionsPanel align="end">
                <span onClick={() => {}} data-test="notification-sidebar:mark-all-as-read">Mark all as read</span>
                <span onClick={() => {}} data-test="notification-sidebar:clear-all">Clear all</span>
              </ActionsPanel>
              {errorMessage && (
                <ErrorMessage>
                  <ErrorMessageIcon />
                  {errorMessage}
                </ErrorMessage>
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
const ActionsPanel = notificationsSidebar.actionsPanel(Panel);
const ErrorMessage = notificationsSidebar.errorMessage(Panel);
const ErrorMessageIcon = notificationsSidebar.errorMessageIcon(Icons.Warning);
const NotificationsList = notificationsSidebar.notificationsList('div');
const EmptyNotificationPanel = notificationsSidebar.emptyNotificationPanel('div');
const Title = notificationsSidebar.title('div');
const SubTitle = notificationsSidebar.subTitle('div');
