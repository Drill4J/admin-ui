import { useEffect, useState } from 'react';

import { useWsConnection } from 'hooks';
import { defaultAdminSocket } from 'common/connection';
import { Notification } from 'types/notificaiton';
import { NewBuildNotification } from 'types/new-build-notification';

export function useNotification() {
  const [notification = {}] = useWsConnection<Notification[]>(defaultAdminSocket, '/notifications') || [];
  const [newBuildNotification, setNewBuildNotification] = useState<NewBuildNotification>({});

  useEffect(() => {
    function handleSetNotification(newBuildNotificaiton: NewBuildNotification) {
      setNewBuildNotification(newBuildNotificaiton);
    }

    if (notification.type === 'BUILD' && !notification.read) {
      const additionalInfo = notification.message ? JSON.parse(notification.message) : {};
      handleSetNotification({ ...notification, additionalInfo } as NewBuildNotification);
    }
    // eslint-disable-next-line
  }, [notification]);

  return newBuildNotification;
}
