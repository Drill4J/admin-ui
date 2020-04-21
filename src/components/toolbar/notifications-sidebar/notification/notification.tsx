import * as React from 'react';
import { BEM, tag, div } from '@redneckz/react-bem-helper';
import { format } from 'timeago.js';

import { Panel } from 'layouts';
import { Icons } from 'components';
import { Notification as NotificationType } from 'types/notificaiton';
import { readNotification, deleteNotification } from '../api';

import styles from './notification.module.scss';

interface Props {
  className?: string;
  notification: NotificationType;
  onError?: (message: string) => void;
}

const notification = BEM(styles);

export const Notification = notification(({
  className, notification: {
    agentId, createdAt, read, id = '', message: { currentId: buildVersion } = {},
  },
  onError,
}: Props) => (
  <div className={className}>
    <Content>
      <Panel align="space-between">
        <span>{agentId}</span>
        <SinceNotificationArrived>{format(createdAt || Date.now())}</SinceNotificationArrived>
      </Panel>
      <BuildVersion unread={!read}>
        <Panel>
          <NotificationStatusIndicator unread={!read} />
          Build {buildVersion} arrived
        </Panel>
        <ButtonGroup align="space-between">
          <MarkAsReadButton
            onClick={() => readNotification(id, { onError })}
            read={read}
            data-test="notification:mark-as-read-button"
          >
            <Icons.Success />
          </MarkAsReadButton>
          <DeleteNotificationButton
            onClick={() => deleteNotification(id, { onError })}
            read={read}
            data-test="notification:delete-notification-button"
          >
            <Icons.Cancel />
          </DeleteNotificationButton>
        </ButtonGroup>
      </BuildVersion>
      <div>
        <LinkToDashboard
          href={`/full-page/${agentId}/${buildVersion}/dashboard`}
          target="_blank"
          rel="noopener noreferrer"
          data-test="notification:notification-button-dashboard"
        >
          Dashboard
        </LinkToDashboard>
        <NotificationButton onClick={() => {}} data-test="notification:notification-button-whats-new">
          What’s new
        </NotificationButton>
      </div>
    </Content>
  </div>
));

const Content = notification.content('div');
const SinceNotificationArrived = notification.sinceNotificationArrived('span');
const BuildVersion = notification.buildVersion(div({} as { unread?: boolean}));
const NotificationStatusIndicator = notification.notificationStatusIndicator(div({} as { unread?: boolean}));
const ButtonGroup = notification.buttonGroup(Panel);
const MarkAsReadButton = notification.markAsReadButton(div({ onClick: () => {} } as { onClick?: () => void; read?: boolean }));
const DeleteNotificationButton = notification.deleteNotificationButton(
  div({ onClick: () => {} } as { onClick?: () => void; read?: boolean }),
);
const LinkToDashboard = notification.linkToDashboard(
  tag('a')({ href: '', rel: '', target: '' } as { href: string; rel: string; target: string }),
);
const NotificationButton = notification.notificationButton('span');
