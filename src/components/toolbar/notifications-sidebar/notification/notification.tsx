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
import { format } from 'timeago.js';
import { Icons, useHover } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { Notification as NotificationType } from 'types/notificaiton';
import { readNotification, deleteNotification } from '../api';

interface Props {
  notification: NotificationType;
  onError?: (message: string) => void;
}

export const Notification = ({
  notification: {
    agentId, createdAt, read, id = '', message: { currentId: buildVersion } = {},
  },
  onError,
}: Props) => {
  const { ref, isVisible } = useHover();
  return (
    <div ref={ref}>
      <Content>
        <div tw="flex justify-between items-center w-full leading-16">
          <span>{agentId}</span>
          <SinceNotificationArrived isHover={isVisible}>{format(createdAt || Date.now())}</SinceNotificationArrived>
        </div>
        <BuildVersion unread={!read} style={{ fontSize: '13px' }}>
          <div className="flex items-center">
            <NotificationStatusIndicator className="mr-2" unread={!read} />
            <div className="text-ellipsis mr-1" title={`Build ${buildVersion}`}>Build {buildVersion}</div>arrived
          </div>
          <div css={[
            tw`hidden justify-end gap-x-4 items-center`,
            isVisible && tw`flex`,
          ]}
          >
            <MarkAsReadButton
              className="link"
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
          </div>
        </BuildVersion>
        <div className="flex gap-x-4 font-bold h-4">
          <a
            className="link"
            href={`/full-page/${agentId}/${buildVersion}/dashboard`}
            target="_blank"
            rel="noopener noreferrer"
            data-test="notification:notification-button-dashboard"
          >
            Dashboard
          </a>
          <div
            tw="text-blue-default opacity-50 cursor-not-allowed"
            data-test="notification:notification-button-whats-new"
          >
            What’s new
          </div>
        </div>
      </Content>
    </div>
  );
};

const Content = styled.div`
  ${tw`flex flex-col justify-center gap-y-1 px-6 h-20`}
  ${tw`text-12 text-monochrome-default border-b border-monochrome-medium-tint`}
  ${tw`hover:bg-monochrome-default hover:bg-opacity-5`}
`;

const BuildVersion = styled.div(({ unread }: { unread?: boolean}) => [
  tw`grid gap-4 leading-20 text-monochrome-black`,
  'grid-template-columns: 288px 48px;',
  unread && tw`font-bold`,
]);

const NotificationStatusIndicator = styled.div(({ unread }: { unread?: boolean}) => [
  tw`min-w-8px h-2 rounded bg-monochrome-medium-tint`,
  unread && tw`bg-monochrome-default`,
]);

const SinceNotificationArrived = styled.div`
  ${tw`h-4`}
  ${({ isHover }: { isHover: boolean }) => isHover && `
      overflow: hidden;
      white-space: nowrap;
      position: relative;
      background: linear-gradient(90deg,currentColor 40%,transparent 80%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
  `}
`;

const MarkAsReadButton = styled.div(({ read }: { read?: boolean }) => [
  tw`h-4 cursor-pointer`,
  read && tw`hidden`,
]);

const DeleteNotificationButton = styled.div`
  ${tw`h-4 cursor-pointer text-red-default hover:text-red-medium-tint active:text-red-shade`}
`;
