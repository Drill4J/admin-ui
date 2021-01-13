import * as React from 'react';
import { MessagePanel } from '@drill4j/ui-kit';

import { Message } from 'types/message';
import { defaultAdminSocket } from 'common/connection';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

type ContextType = {
  showMessage: (message: Message) => void;
  closeMessage: () => void;
};

export const NotificationManagerContext = React.createContext<ContextType>({ showMessage: () => {}, closeMessage: () => {} });

export const NotificationManager = ({ children }: Props) => {
  const [message, setMessage] = React.useState<Message | null>();

  function handleShowMessage(incomingMessage: Message) {
    if (incomingMessage.type === 'SUCCESS') {
      setMessage(incomingMessage);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }

    setMessage(incomingMessage);
  }

  defaultAdminSocket.onCloseEvent = () => setMessage(
    { type: 'ERROR', text: 'Backend connection has been lost. Please, try to refresh the page.' },
  );

  const contextValue = { showMessage: handleShowMessage, closeMessage: () => setMessage(null) };
  return (
    <NotificationManagerContext.Provider value={contextValue}>
      {message && <MessagePanel message={message} onClose={() => setMessage(null)} />}
      {children}
    </NotificationManagerContext.Provider>
  );
};
