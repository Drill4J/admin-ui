import * as React from 'react';

import { MessagePanel } from 'components';
import { Message } from 'types/message';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const NotificationManagerContext = React.createContext<{
  showMessage: (message: Message) => void;
  closeMessage: () => void;
}>({ showMessage: () => {}, closeMessage: () => {} });

export const NotificationManager = ({ children }: Props) => {
  const [message, setMessage] = React.useState<Message | null>();

  function handleShowMessage(incommingMessage: Message) {
    if (incommingMessage.type === 'SUCCESS') {
      setMessage(incommingMessage);
      setTimeout(() => {
        setMessage(null);
      }, 1500);
    }

    setMessage(incommingMessage);
  }
  const contextValue = { showMessage: handleShowMessage, closeMessage: () => setMessage(null) };
  return (
    <NotificationManagerContext.Provider value={contextValue}>
      {message && <MessagePanel message={message} onClose={() => setMessage(null)} />}
      {children}
    </NotificationManagerContext.Provider>
  );
};
