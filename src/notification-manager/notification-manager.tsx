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
import { ReactNode, useState, createContext, useMemo } from 'react';
import { MessagePanel } from '@drill4j/ui-kit';

import { Message } from 'types/message';
import { defaultAdminSocket } from 'common/connection';
import { useLocation } from 'react-router-dom';

interface Props {
  className?: string;
  children?: ReactNode;
}

type ContextType = {
  showMessage: (message: Message) => void;
  closeMessage: () => void;
};

export const NotificationManagerContext = createContext<ContextType>({
  showMessage: () => {},
  closeMessage: () => {},
});

export const NotificationManager = ({ children }: Props) => {
  const [message, setMessage] = useState<Message | null>();
  const { pathname = '' } = useLocation();

  function handleShowMessage(incomingMessage: Message) {
    if (incomingMessage.type === 'SUCCESS') {
      setMessage(incomingMessage);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }

    setMessage(incomingMessage);
  }

  defaultAdminSocket.onCloseEvent = () => {
    setMessage({ type: 'ERROR', text: 'Backend connection has been lost. Trying to reconnect...' });
  };
  defaultAdminSocket.onOpenEvent = () =>
    handleShowMessage({
      type: 'SUCCESS',
      text: 'Backend connection has been successfully restored.',
    });

  const contextValue = useMemo(
    () => ({ showMessage: handleShowMessage, closeMessage: () => setMessage(null) }),
    [],
  );
  return (
    <NotificationManagerContext.Provider value={contextValue}>
      {message && pathname !== '/login' && (
        <MessagePanel message={message} onClose={() => setMessage(null)} />
      )}
      {children}
    </NotificationManagerContext.Provider>
  );
};
