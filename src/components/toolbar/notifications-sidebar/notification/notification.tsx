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
import { BEM, tag, div } from '@redneckz/react-bem-helper';
import { format } from 'timeago.js';
import { Icons } from '@drill4j/ui-kit';

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
    <Content className="d-flex flex-column justify-content-center gy-2 px-6">
      <div className="d-flex justify-content-between align-items-center w-100">
        <span>{agentId}</span>
        <SinceNotificationArrived>{format(createdAt || Date.now())}</SinceNotificationArrived>
      </div>
      <BuildVersion unread={!read}>
        <div className="d-flex align-items-center">
          <NotificationStatusIndicator className="mr-2" unread={!read} />
          <div className="text-ellipsis mr-1" title={`Build ${buildVersion}`}>Build {buildVersion}</div>arrived
        </div>
        <ButtonGroup className="justify-content-end gx-4 align-items-center">
          <MarkAsReadButton
            onClick={() => readNotification(id, { onError })}
            read={read}
            data-test="notification:mark-as-read-button"
          >
            <Icons.Success />
          </MarkAsReadButton>
          <DeleteNotificationButton
            onClick={() => deleteNotification(id, { onError })}
            data-test="notification:delete-notification-button"
          >
            <Icons.Cancel />
          </DeleteNotificationButton>
        </ButtonGroup>
      </BuildVersion>
      <div className="d-flex gx-4 bold">
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
const ButtonGroup = notification.buttonGroup('div');
const MarkAsReadButton = notification.markAsReadButton(div({ onClick: () => {} } as { onClick?: () => void; read?: boolean }));
const DeleteNotificationButton = notification.deleteNotificationButton(
  div({ onClick: () => {} } as { onClick?: () => void; read?: boolean }),
);
const LinkToDashboard = notification.linkToDashboard(
  tag('a')({ href: '', rel: '', target: '' } as { href: string; rel: string; target: string }),
);
const NotificationButton = notification.notificationButton('span');
