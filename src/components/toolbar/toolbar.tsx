import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { TOKEN_KEY } from 'common/constants';
import { Icons } from 'components';
import { useWsConnection } from 'hooks';
import { defaultAdminSocket } from 'common/connection';
import { Notification } from 'types/notificaiton';
import { NotificationsSidebar } from './notifications-sidebar';

import styles from './toolbar.module.scss';

interface Props {
  className?: string;
  breadcrumbs?: React.ReactNode;
}

const toolbar = BEM(styles);

export const Toolbar = toolbar(({ className, breadcrumbs }: Props) => {
  const [isNotificationPaneOpen, setIsNotificationPaneOpen] = React.useState(false);
  const notifications = useWsConnection<Notification[]>(defaultAdminSocket, '/notifications') || [];
  const unreadNotifications = notifications.filter(notification => !notification.read);
  return (
    <div className={className}>
      <Content>
        <BreadcrumbsWrapper>{breadcrumbs}</BreadcrumbsWrapper>
        <UserInfo>
          <IconNotification
            onClick={() => setIsNotificationPaneOpen(!isNotificationPaneOpen)}
            data-test="tolbar:icon-notification"
          />
          <NotificationCount unread={unreadNotifications.length > 0} data-test="tolbar:notification-count">
            {unreadNotifications.length}
          </NotificationCount>
          <Divider />
          Signed in as Guest
          <SingOut
            onClick={() => {
              window.location.href = '/login';
              localStorage.removeItem(TOKEN_KEY);
            }}
            data-test="toolbar:sign-out"
          >
            Sign out
          </SingOut>
        </UserInfo>
      </Content>
      {isNotificationPaneOpen && (
        <NotificationsSidebar
          notifications={notifications}
          isOpen={isNotificationPaneOpen}
          onToggle={setIsNotificationPaneOpen}
        />
      )}
    </div>
  );
});

const Content = toolbar.content('div');
const BreadcrumbsWrapper = toolbar.breadcrumbs('div');
const Divider = toolbar.divider('span');
const UserInfo = toolbar.userInfo('div');
const IconNotification = toolbar.iconNotification(Icons.Notification);
const NotificationCount = toolbar.notificationCount(div({} as {unread?: boolean}));
const SingOut = toolbar.signOut(
  div({ onClick: () => {}, 'data-test': '' } as { 'data-test': string }),
);
